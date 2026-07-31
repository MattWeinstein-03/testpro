#!/usr/bin/env node
/**
 * Delivery-loop diagnostics.
 *
 * The balance report says whether the Fulfillment Point race works. This says
 * WHY it does not: it tallies, across many games, which Contract clause was
 * unmet at each Delivery phase and how far the delivery pipeline got.
 *
 * Usage: node sim/diagnose.js [--games 40] [--archetype delivery]
 */
'use strict';

var path = require('path');
var Rules = require(path.join(__dirname, '..', 'js', 'rules.js'));
var CardData = require(path.join(__dirname, '..', 'js', 'card-data.js'));
var Policies = require(path.join(__dirname, 'policies.js'));
var Rng = require(path.join(__dirname, '..', 'js', 'rng.js'));

function arg(name, dflt) {
  var i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : dflt;
}

var games = parseInt(arg('--games', '40'), 10);
var archetype = arg('--archetype', 'delivery');
var policyName = arg('--policy', archetype === 'balanced' ? 'greedy' : archetype);

var unmet = {};
var totals = {
  deliveryPhases: 0, contractsStaged: 0, transits: 0, fulfilled: 0,
  firstTransitTurn: [], firstFulfillTurn: [], fleetDeployed: 0, contractsDrawn: 0,
  goodsProduced: 0, goodsDelivered: 0
};

for (var g = 0; g < games; g++) {
  var state = Rules.createGame({ seed: 5000 + g, pool: CardData, archetypes: [archetype, archetype] });
  var rng = Rng.create(9000 + g);
  var policy = Policies.POLICIES[policyName];
  var firstTransit = null, firstFulfill = null;
  var steps = 0;

  while (!state.gameOver && steps++ < 4000) {
    var actor = Rules.actingPlayer(state);
    if (actor === 0 && Rules.PHASES[state.phase] === 'Delivery' && state.currentPlayer === 0) {
      var p = state.players[0];
      totals.deliveryPhases++;
      totals.contractsStaged += p.contracts.length;
      p.contracts.forEach(function(contract) {
        Rules.contractStatus(state, 0, contract).forEach(function(clause) {
          if (clause.met) return;
          var key = clause.label.replace(/\(have \d+\)/, '').replace(/^\d+ /, 'N ').trim();
          unmet[key] = (unmet[key] || 0) + 1;
        });
      });
    }
    var actions = Rules.legalActions(state);
    if (!actions.length) break;
    var action = policy(state, actions, rng);
    if (action.k === 'transit' && action.actor === 0) {
      totals.transits++;
      if (firstTransit === null) firstTransit = state.turn;
    }
    if (action.k === 'fulfill' && action.actor === 0) {
      totals.fulfilled++;
      if (firstFulfill === null) firstFulfill = state.turn;
    }
    Rules.apply(state, action);
  }
  if (firstTransit !== null) totals.firstTransitTurn.push(firstTransit);
  if (firstFulfill !== null) totals.firstFulfillTurn.push(firstFulfill);
  totals.fleetDeployed += state.players[0].network.filter(function(c) { return c.type === 'Fleet'; }).length +
    state.players[0].customer.length;
}


function mean(a) { return a.length ? (a.reduce(function(x, y) { return x + y; }, 0) / a.length).toFixed(1) : 'never'; }

console.log('=== delivery loop diagnostics: ' + games + ' games, ' + policyName + '/' + archetype + ' mirror ===');
console.log('Delivery phases observed (player 1): ' + totals.deliveryPhases);
console.log('contracts staged per Delivery phase: ' + (totals.contractsStaged / Math.max(1, totals.deliveryPhases)).toFixed(2));
console.log('transits performed: ' + totals.transits + ' (' + (totals.transits / games).toFixed(1) + ' per game)');
console.log('contracts fulfilled: ' + totals.fulfilled + ' (' + (totals.fulfilled / games).toFixed(2) + ' per game)');
console.log('first transit on turn: ' + mean(totals.firstTransitTurn) + ' (in ' + totals.firstTransitTurn.length + '/' + games + ' games)');
console.log('first fulfillment on turn: ' + mean(totals.firstFulfillTurn) + ' (in ' + totals.firstFulfillTurn.length + '/' + games + ' games)');

console.log('\nunmet contract clauses, most frequent first:');
Object.keys(unmet).sort(function(a, b) { return unmet[b] - unmet[a]; }).slice(0, 20).forEach(function(k) {
  console.log('  ' + String(unmet[k]).padStart(6) + '  ' + k);
});


/**
 * Second pass: why a Fleet sitting in the Network Zone did not move. Transit
 * is the narrow part of the pipeline, so it gets its own tally.
 */
var blocked = { notReady: 0, noFuel: 0, noCrew: 0, noBudget: 0, movable: 0, none: 0 };
for (var h = 0; h < games; h++) {
  var s = Rules.createGame({ seed: 5000 + h, pool: CardData, archetypes: [archetype, archetype] });
  var r2 = Rng.create(9000 + h);
  var pol2 = Policies.POLICIES[policyName];
  var st2 = 0;
  while (!s.gameOver && st2++ < 4000) {
    if (Rules.PHASES[s.phase] === 'Transit' && s.currentPlayer === 0) {
      var p2 = s.players[0];
      var fleets = p2.network.filter(function(card) { return card.type === 'Fleet'; });
      if (!fleets.length) blocked.none++;
      fleets.forEach(function(f) {
        if (Rules.canTransit(s, 0, f)) { blocked.movable++; return; }
        if (!Rules.isReady(f)) blocked.notReady++;
        else if (p2.transitBudget <= 0) blocked.noBudget++;
        else if (p2.resources.Fuel < Rules.transitCost(s, 0, f)) blocked.noFuel++;
        else blocked.noCrew++;
      });
    }
    var acts2 = Rules.legalActions(s);
    if (!acts2.length) break;
    Rules.apply(s, pol2(s, acts2, r2));
  }
}
console.log('\ntransit blockers (per Fleet, per Transit phase):');
Object.keys(blocked).forEach(function(k) { console.log('  ' + k.padEnd(10) + String(blocked[k]).padStart(6)); });
