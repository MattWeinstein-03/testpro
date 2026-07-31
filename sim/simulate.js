#!/usr/bin/env node
/**
 * Headless batch simulator.
 *
 * Balance claims about this set should be measured, not asserted. This runs
 * thousands of seeded games through the same rules core the browser uses and
 * reports the numbers a designer needs before ordering a print run:
 *
 *   - game length distribution      (is a match the right length for a table?)
 *   - win rate by archetype         (is any one line dominant?)
 *   - win condition split           (is the 10 FP race actually reachable?)
 *   - castable card percentage      (does a hand do anything?)
 *   - per-card play rate            (which of the 200 cards never get played?)
 *
 * Usage:
 *   node sim/simulate.js                     # default sweep
 *   node sim/simulate.js --games 400         # more games per matchup
 *   node sim/simulate.js --seed 99 --cards   # include the per-card table
 */
'use strict';

var path = require('path');
var Rules = require(path.join(__dirname, '..', 'js', 'rules.js'));
var CardData = require(path.join(__dirname, '..', 'js', 'card-data.js'));
var Schema = require(path.join(__dirname, '..', 'js', 'card-schema.js'));
var Policies = require(path.join(__dirname, 'policies.js'));
var Rng = require(path.join(__dirname, '..', 'js', 'rng.js'));

var MAX_ACTIONS = 6000;

/** Play one game to completion. Deterministic in `seed`. */
function runGame(opts) {
  var seed = opts.seed;
  var archetypes = opts.archetypes;
  var policies = opts.policies.map(function(name) { return Policies.POLICIES[name]; });
  var state = Rules.createGame({
    seed: seed, pool: CardData, archetypes: archetypes,
    names: [opts.policies[0] + '/' + archetypes[0], opts.policies[1] + '/' + archetypes[1]]
  });
  var rng = Rng.create(seed ^ 0x9e3779b9);

  var rec = {
    seed: seed, archetypes: archetypes, policies: opts.policies,
    actions: 0, handSamples: 0, handPlayable: 0, handSize: 0,
    played: {}, drawn: {}, fpPeak: [0, 0], contracts: [0, 0], stalled: false
  };
  var sampledPhase = -1;


  while (!state.gameOver && rec.actions < MAX_ACTIONS) {
    var actor = Rules.actingPlayer(state);

    // Sample "how much of my hand can I actually play" once per Main Phase 1.
    var key = state.halfTurns * 10 + state.phase;
    if (Rules.PHASES[state.phase] === 'Main Phase 1' && key !== sampledPhase) {
      sampledPhase = key;
      var p = state.players[actor];
      var playable = p.hand.filter(function(card) { return Rules.canPay(p, card); }).length;
      rec.handSamples++;
      rec.handPlayable += playable;
      rec.handSize += p.hand.length;
    }

    var actions = Rules.legalActions(state);
    if (!actions.length) { rec.stalled = true; break; }
    var action = policies[actor](state, actions, rng);
    if (!action) { rec.stalled = true; break; }
    if (action.k === 'play') {
      var card = state.players[actor].hand[action.hand];
      if (card) rec.played[card.id] = (rec.played[card.id] || 0) + 1;
    }
    if (action.k === 'fulfill') rec.contracts[actor]++;
    var res = Rules.apply(state, action);
    // A legal action that refuses to apply means legalActions and the action
    // handlers disagree - that is an engine bug, not a game state, so surface
    // it loudly instead of spinning until the action cap.
    if (!res.ok) {
      rec.rejected = (rec.rejected || 0) + 1;
      if (rec.rejected > 20) { rec.stalled = true; rec.bug = action.k; break; }
    } else {
      rec.rejected = 0;
    }
    rec.actions++;
    for (var i = 0; i < 2; i++) rec.fpPeak[i] = Math.max(rec.fpPeak[i], state.players[i].fp);
  }

  rec.turns = state.turn;
  rec.halfTurns = state.halfTurns;
  rec.winner = state.winner;
  rec.reason = state.winReason || 'unfinished';
  rec.finished = state.gameOver;
  rec.fp = [state.players[0].fp, state.players[1].fp];
  rec.health = [state.players[0].health, state.players[1].health];
  rec.boards = [state.players[0].source.length, state.players[1].source.length];
  rec.winType = classify(state);
  return rec;
}

function classify(state) {
  if (!state.gameOver) return 'unfinished';
  var r = state.winReason || '';
  if (r.indexOf('Fulfillment') !== -1) return 'fp';
  if (r.indexOf('collapsed') !== -1) return 'health';
  if (r.indexOf('ran out of cards') !== -1) return 'deckout';
  return 'limit';
}


// ---------------------------------------------------------------------------
// Reporting helpers
// ---------------------------------------------------------------------------
function pct(n, d) { return d ? (100 * n / d).toFixed(1) + '%' : 'n/a'; }

function histogram(values, buckets) {
  var counts = buckets.map(function() { return 0; });
  values.forEach(function(v) {
    for (var i = buckets.length - 1; i >= 0; i--) {
      if (v >= buckets[i]) { counts[i]++; return; }
    }
    counts[0]++;
  });
  return counts;
}

function median(values) {
  if (!values.length) return 0;
  var s = values.slice().sort(function(a, b) { return a - b; });
  return s[Math.floor(s.length / 2)];
}

function mean(values) {
  if (!values.length) return 0;
  return values.reduce(function(a, b) { return a + b; }, 0) / values.length;
}

function bar(n, max, width) {
  var w = max ? Math.round(width * n / max) : 0;
  return new Array(w + 1).join('#');
}

function table(rows) {
  var widths = [];
  rows.forEach(function(r) {
    r.forEach(function(cell, i) { widths[i] = Math.max(widths[i] || 0, String(cell).length); });
  });
  return rows.map(function(r) {
    return r.map(function(cell, i) {
      var s = String(cell);
      return i === 0 ? s + new Array(widths[i] - s.length + 1).join(' ')
        : new Array(widths[i] - s.length + 1).join(' ') + s;
    }).join('  ');
  }).join('\n');
}


// ---------------------------------------------------------------------------
// Batch driver
// ---------------------------------------------------------------------------
var STRATEGIES = [
  { policy: 'delivery', archetype: 'delivery' },
  { policy: 'aggro', archetype: 'aggro' },
  { policy: 'disruption', archetype: 'disruption' },
  { policy: 'engine', archetype: 'engine' },
  { policy: 'greedy', archetype: 'balanced' }
];

function run(argv) {
  var games = parseInt(getArg(argv, '--games', '120'), 10);
  var baseSeed = parseInt(getArg(argv, '--seed', '1'), 10);
  var showCards = argv.indexOf('--cards') !== -1;

  var check = Schema.validateSet(CardData);
  console.log('=== SUPPLY CHAIN: The Gathering - balance report ===');
  console.log('set: ' + CardData.length + ' cards, schema ' + (check.ok ? 'VALID' : 'INVALID (' +
    check.errors.length + ' errors)'));
  check.errors.slice(0, 10).forEach(function(e) { console.log('  ERROR ' + e); });
  check.warnings.forEach(function(w) { console.log('  warn  ' + w); });

  var all = [];
  var matrix = {};
  var seed = baseSeed;

  for (var a = 0; a < STRATEGIES.length; a++) {
    for (var b = 0; b < STRATEGIES.length; b++) {
      var perMatchup = Math.max(2, Math.round(games / STRATEGIES.length));
      for (var g = 0; g < perMatchup; g++) {
        var rec = runGame({
          seed: seed++,
          archetypes: [STRATEGIES[a].archetype, STRATEGIES[b].archetype],
          policies: [STRATEGIES[a].policy, STRATEGIES[b].policy]
        });
        all.push(rec);
        var kA = STRATEGIES[a].policy, kB = STRATEGIES[b].policy;
        matrix[kA] = matrix[kA] || {};
        matrix[kA][kB] = matrix[kA][kB] || { w: 0, l: 0, d: 0 };
        if (rec.winner === 0) matrix[kA][kB].w++;
        else if (rec.winner === 1) matrix[kA][kB].l++;
        else matrix[kA][kB].d++;
      }
    }
  }
  report(all, matrix, showCards);
  return all;
}

function getArg(argv, name, dflt) {
  var i = argv.indexOf(name);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : dflt;
}


function report(all, matrix, showCards) {
  var n = all.length;
  console.log('\n--- termination (' + n + ' games) ---');
  var finished = all.filter(function(r) { return r.finished; }).length;
  var stalled = all.filter(function(r) { return r.stalled; }).length;
  console.log('finished: ' + finished + '/' + n + ' (' + pct(finished, n) + '), stalled with no legal action: ' + stalled);

  console.log('\n--- game length (turns, both players) ---');
  var turns = all.map(function(r) { return r.turns; });
  console.log('mean ' + mean(turns).toFixed(1) + '  median ' + median(turns) +
    '  min ' + Math.min.apply(null, turns) + '  max ' + Math.max.apply(null, turns));
  var buckets = [0, 10, 15, 20, 25, 30, 40, 60, 90];
  var hist = histogram(turns, buckets);
  var maxH = Math.max.apply(null, hist);
  buckets.forEach(function(b, i) {
    var hi = buckets[i + 1] ? buckets[i + 1] - 1 : '+';
    console.log(('  ' + b + '-' + hi).padEnd(10) + String(hist[i]).padStart(5) + '  ' + bar(hist[i], maxH, 40));
  });

  console.log('\n--- win condition split ---');
  var types = {};
  all.forEach(function(r) { types[r.winType] = (types[r.winType] || 0) + 1; });
  Object.keys(types).forEach(function(k) {
    console.log('  ' + k.padEnd(12) + String(types[k]).padStart(5) + '  ' + pct(types[k], n));
  });

  console.log('\n--- Fulfillment Point reachability ---');
  var peaks = [];
  all.forEach(function(r) { peaks.push(r.fpPeak[0], r.fpPeak[1]); });
  console.log('peak FP per player: mean ' + mean(peaks).toFixed(2) + '  median ' + median(peaks) +
    '  max ' + Math.max.apply(null, peaks));
  var reached = peaks.filter(function(v) { return v >= 10; }).length;
  console.log('players reaching 10 FP: ' + reached + '/' + peaks.length + ' (' + pct(reached, peaks.length) + ')');
  // NOTE ON THIS NUMBER: it cannot exceed half the FP win share. The game ends
  // the instant a player reaches the FP target, so exactly one player per
  // FP-decided game ever touches 10, and the denominator here counts both
  // seats. "Players reaching 10 FP" is therefore FP-win-share / 2 by
  // construction - it measures nothing the win split does not already say.
  // What a designer actually wants to know is whether the race was live for
  // the player who lost it, so that is measured directly below.
  var losers = [];
  all.forEach(function(r) {
    if (r.winner === null) return;
    losers.push(r.fpPeak[1 - r.winner]);
  });
  console.log('peak FP of the LOSING player: mean ' + mean(losers).toFixed(2) + '  median ' + median(losers) +
    '  within 3 FP of the target: ' + pct(losers.filter(function(v) { return v >= 7; }).length, losers.length) +
    '  (this is the real "was the race live" measure)');
  var contracts = [];
  all.forEach(function(r) { contracts.push(r.contracts[0], r.contracts[1]); });
  console.log('contracts fulfilled per player: mean ' + mean(contracts).toFixed(2) +
    '  max ' + Math.max.apply(null, contracts));

  console.log('\n--- castable cards ---');
  var samples = all.reduce(function(a, r) { return a + r.handSamples; }, 0);
  var playable = all.reduce(function(a, r) { return a + r.handPlayable; }, 0);
  var handTotal = all.reduce(function(a, r) { return a + r.handSize; }, 0);
  console.log('playable share of hand at Main Phase 1: ' + pct(playable, handTotal) +
    ' (' + (playable / samples).toFixed(2) + ' of ' + (handTotal / samples).toFixed(2) + ' cards)');


  // Aggregate each strategy over BOTH seats. Reading only the player-1 row
  // confuses a matchup edge with a first-player edge.
  console.log('\n--- win rate by strategy (both seats, row beats column) ---');
  var keys = Object.keys(matrix);
  var rows = [['vs'].concat(keys).concat(['overall'])];
  keys.forEach(function(a) {
    var row = [a];
    var w = 0, t = 0;
    keys.forEach(function(b) {
      // a as player 1 vs b, plus a as player 2 vs b.
      var asFirst = matrix[a][b];
      var asSecond = matrix[b][a];
      var wins = asFirst.w + asSecond.l;
      var total = asFirst.w + asFirst.l + asFirst.d + asSecond.w + asSecond.l + asSecond.d;
      w += wins; t += total;
      row.push(pct(wins, total));
    });
    row.push(pct(w, t));
    rows.push(row);
  });
  console.log(table(rows));

  var p1wins = all.filter(function(r) { return r.winner === 0; }).length;
  var decided = all.filter(function(r) { return r.winner !== null; }).length;
  console.log('first-player win rate: ' + pct(p1wins, decided) +
    ' (target 50-55%; higher means the play/draw penalty is too small)');

  console.log('\n--- per-card play rate ---');
  var plays = {};
  all.forEach(function(r) {
    Object.keys(r.played).forEach(function(id) { plays[id] = (plays[id] || 0) + r.played[id]; });
  });
  var never = CardData.filter(function(c) { return !plays[c.id]; });
  console.log('cards played at least once: ' + (CardData.length - never.length) + '/' + CardData.length +
    ' (' + pct(CardData.length - never.length, CardData.length) + ')');
  if (never.length) {
    console.log('never played: ' + never.slice(0, 25).map(function(c) { return c.id + ' ' + c.name; }).join(', ') +
      (never.length > 25 ? ' ... (+' + (never.length - 25) + ')' : ''));
  }
  if (showCards) {
    var ranked = Object.keys(plays).sort(function(x, y) { return plays[y] - plays[x]; });
    console.log('top 15 by plays:');
    ranked.slice(0, 15).forEach(function(id) {
      var card = CardData.filter(function(c) { return c.id === id; })[0];
      console.log('  ' + id + ' ' + card.name.padEnd(30) + String(plays[id]).padStart(5));
    });
  }
  printReadiness();
}


/**
 * Print readiness. The digital build exists to de-risk a physical print run,
 * so the report also checks the things that are expensive to get wrong on
 * cardboard: rarity spread, the cost curve, how many tokens a game needs, and
 * whether the rules text fits in a text box.
 */
function printReadiness() {
  console.log('\n--- print readiness ---');
  var byRarity = {}, byType = {}, curve = {}, kw = {};
  var overlong = [];
  var TEXT_BUDGET = 180;   // characters that fit a standard 63x88mm text box

  CardData.forEach(function(card) {
    byRarity[card.rarity] = (byRarity[card.rarity] || 0) + 1;
    byType[card.type] = (byType[card.type] || 0) + 1;
    var t = Rules.totalCost(card);
    curve[t] = (curve[t] || 0) + 1;
    (card.keywords || []).forEach(function(k) { kw[k] = (kw[k] || 0) + 1; });
    var len = (card.rulesText || '').length;
    if (len > TEXT_BUDGET) overlong.push({ id: card.id, name: card.name, len: len });
  });

  console.log('rarity:   ' + Object.keys(byRarity).map(function(k) { return k + ' ' + byRarity[k]; }).join(', '));
  console.log('type:     ' + Object.keys(byType).map(function(k) { return k + ' ' + byType[k]; }).join(', '));
  console.log('cost curve (total pips): ' + Object.keys(curve).sort(function(a, b) { return a - b; })
    .map(function(k) { return k + ':' + curve[k]; }).join('  '));
  console.log('keywords: ' + Object.keys(kw).map(function(k) { return k + ' ' + kw[k]; }).join(', '));
  console.log('components needed per 2-player game: 40 Goods tokens, 2 Health dials (' +
    Rules.DEFAULTS.startingHealth + '), 2 FP trackers (' + Rules.DEFAULTS.winFp + '),');
  console.log('  25 resource tokens per type (Capital/Labor/Fuel/Data/Time), Disabled markers x8');
  console.log('rules text over ' + TEXT_BUDGET + ' chars: ' + overlong.length + '/' + CardData.length +
    (overlong.length ? ' -> ' + overlong.slice(0, 8).map(function(o) { return o.id + '(' + o.len + ')'; }).join(', ') : ''));
}

module.exports = { runGame: runGame, run: run, STRATEGIES: STRATEGIES };

if (require.main === module) {
  run(process.argv.slice(2));
}
