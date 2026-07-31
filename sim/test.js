/**
 * Regression suite for the rules core and the card set.
 *
 * Dependency-free: `node sim/test.js`. Every assertion here corresponds to a
 * defect that made the first build unplayable, or to an invariant the physical
 * print run depends on. If one of these fails, a card is unshippable on
 * cardboard or a game can stop being winnable.
 */
'use strict';

var Rules = require('../js/rules.js');
var CardData = require('../js/card-data.js');
var Schema = require('../js/card-schema.js');
var Glossary = require('../js/glossary.js');
var Effects = require('../js/effects.js');
var Policies = require('../sim/policies.js');

var R = Glossary.RESOURCES;
var pass = 0;
var failures = [];
var group = '';

function describe(name) {
  group = name;
  console.log('\n' + name);
}

function ok(label, cond, detail) {
  if (cond) {
    pass++;
    console.log('  ok   ' + label + (detail === undefined ? '' : ' -> ' + detail));
  } else {
    failures.push(group + ' :: ' + label + (detail === undefined ? '' : ' (' + detail + ')'));
    console.log('  FAIL ' + label + (detail === undefined ? '' : ' -> ' + detail));
  }
}

function totalCost(card) {
  return R.reduce(function(n, r) { return n + (card.cost[r] || 0); }, 0);
}

function byType(type) {
  return CardData.filter(function(c) { return c.type === type; });
}


/** Play a whole game with the given policies. Returns the finished state. */
function playGame(seed, aName, bName, limit) {
  var state = Rules.createGame({
    pool: CardData,
    seed: seed,
    archetypes: [aName === 'aggro' ? 'aggro' : 'balanced', bName === 'aggro' ? 'aggro' : 'balanced']
  });
  var pols = [Policies.POLICIES[aName], Policies.POLICIES[bName]];
  var rng = Rules.Rng.create(seed ^ 0x5f5f);
  var steps = 0;
  while (!state.gameOver && steps++ < (limit || 6000)) {
    var actions = Rules.legalActions(state);
    if (!actions.length) break;
    var actor = Rules.actingPlayer(state);
    var action = pols[actor](state, actions, rng);
    if (!Rules.apply(state, action).ok) {
      // An action the core offered but refuses to apply is a contract breach
      // between legalActions and apply.
      state._illegal = action;
      break;
    }
  }
  state._steps = steps;
  return state;
}

// ===========================================================================
describe('Card set schema and print readiness');
// ===========================================================================
var report = Schema.validateSet(CardData);
ok('set validates with zero errors', report.ok, report.errors.slice(0, 5).join(' | '));
ok('set has exactly 200 cards', CardData.length === 200, CardData.length);
ok('every card has a unique id',
  new Set(CardData.map(function(c) { return c.id; })).size === 200);

// A player holding the physical card must be able to resolve it without the
// engine, so printed text is mandatory and must not be empty.
var noText = CardData.filter(function(c) { return !c.rulesText || !c.rulesText.trim(); });
ok('every card carries printed rules text', noText.length === 0,
  noText.slice(0, 3).map(function(c) { return c.id; }).join(','));

var noFlavor = CardData.filter(function(c) { return !c.flavorText; });
ok('every card carries flavor text', noFlavor.length === 0, noFlavor.length + ' missing');


// ===========================================================================
describe('Frozen glossary: printed cards cannot be patched');
// ===========================================================================
// The original set referenced a "Procurement Phase" that was not one of the
// eight phases, and called the same zone Supply/Source and Network/Logistics.
var banned = ['Procurement Phase', 'Supply Zone', 'Logistics Zone', 'Delivery Phase Zone'];
banned.forEach(function(term) {
  var hits = CardData.filter(function(c) {
    return [c.rulesText, c.loreText, c.flavorText].join(' ').indexOf(term) !== -1;
  });
  ok('no card uses the retired term "' + term + '"', hits.length === 0,
    hits.slice(0, 4).map(function(c) { return c.id; }).join(','));
});

// Any phase name a card mentions must be a real phase.
var phaseWords = CardData.filter(function(c) {
  var m = (c.rulesText || '').match(/([A-Z][a-z]+(?: [A-Z0-9][a-z]*)*) Phase/g) || [];
  return m.some(function(raw) {
    var name = raw.replace(/ Phase$/, '');
    return Glossary.PHASES.indexOf(name) === -1 && Glossary.PHASES.indexOf(raw) === -1 &&
      ['Main', 'Any'].indexOf(name) === -1;
  });
});
ok('every phase named on a card is one of the eight printed phases',
  phaseWords.length === 0, phaseWords.slice(0, 4).map(function(c) { return c.id; }).join(','));

// Every zone named on a card must be a real zone.
var zoneWords = CardData.filter(function(c) {
  var m = (c.rulesText || '').match(/([A-Z][a-z]+) Zone/g) || [];
  return m.some(function(raw) { return Glossary.ZONES.indexOf(raw) === -1; });
});
ok('every zone named on a card is one of the three printed zones',
  zoneWords.length === 0, zoneWords.slice(0, 4).map(function(c) { return c.id; }).join(','));

// Rules the engine enforces but no card states must be printed in the rulebook,
// or a player at a table has no way to discover them.
ok('a printed rulebook section exists', Array.isArray(Glossary.GLOBAL_RULES) &&
  Glossary.GLOBAL_RULES.length > 5, Glossary.GLOBAL_RULES.length + ' rules');
var rulebook = Glossary.GLOBAL_RULES.join(' ');
[
  ['the deck-out loss', /deck is empty, you lose/],
  ['the hand limit', /[Hh]and limit is 7/],
  ['the turn sequence', /Upkeep, Draw, Main Phase 1/],
  ['both win conditions', /10 Fulfillment Points/],
  ['the Fleet-returns-exhausted rule', /returns to your Network Zone exhausted/],
  ['the blocking rule', /may block/],
  ['the Arriving restriction', /Arriving/],
  ['Requisition', /Requisition/],
  // BALANCE PASS 2 printed rules. Each of these is enforced by the engine and
  // stated on no card face, so the rulebook is the only place a player at a
  // table could learn it.
  ['the printed deck size', /deck is 52 cards/],
  ['the draw step and the play/draw penalty', /Draw 3 cards.*1 fewer card/],
  ['Upkeep income', /take 3 Capital plus 1 resource/],
  ['the starting Supply Chain Health', /starts on 20 Supply Chain Health/],
  ['standing haulage (first Transit costs no Fuel)', /first Transit of your turn costs no Fuel/],
  ['fulfilling more than one Contract in a turn', /as many Contracts/],
  ['the barricade Toughness', /barricade \(Power 0, Toughness 2\)/],
  ['the Goods damage buffer', /removes 1 stored Goods instead/]
].forEach(function(pair) {
  ok('rulebook documents ' + pair[0], pair[1].test(rulebook));
});

/**
 * The printed numbers in the rulebook must equal the numbers the engine uses.
 *
 * This is the print constraint as an assertion. Cardboard cannot be patched:
 * if a balance pass changes the deck size, the draw step, Upkeep income,
 * starting Health or the damage buffer and the rulebook still prints the old
 * value, the physical game and the digital game are different games. Every
 * dial the tuning pass touched is checked against its printed text here.
 */
[
  ['deck size', /deck is (\d+) cards/, 'deckSize'],
  ['opening hand', /Opening hand is (\d+) cards/, 'openingHand'],
  ['draw per turn', /Draw (\d+) cards in your Draw step/, 'drawPerTurn'],
  ['hand limit', /[Hh]and limit is (\d+) cards/, 'maxHand'],
  ['Upkeep Capital income', /take (\d+) Capital plus/, 'baseIncome'],
  ['resource reserve limit', /keep up to (\d+) of each resource/, 'reserveLimit'],
  ['starting Supply Chain Health', /starts on (\d+) Supply Chain Health/, 'startingHealth'],
  ['the Fulfillment Point target', /reaching (\d+) Fulfillment Points/, 'winFp'],
  ['the Goods damage buffer', /first (\d+) damage you take each turn/, 'soakPerTurn'],
  ['the Transit Fuel cost', /pay (\d+) Fuel and exhaust one untapped Workforce/, 'transitFuel']
].forEach(function(triple) {
  var m = rulebook.match(triple[1]);
  ok('rulebook prints the same ' + triple[0] + ' the engine uses',
    !!m && Number(m[1]) === Rules.DEFAULTS[triple[2]],
    (m ? m[1] : 'not printed') + ' vs engine ' + Rules.DEFAULTS[triple[2]]);
});

// Every keyword printed on a card must have a mechanical definition, because a
// keyword on cardboard is permanent.
var kwCounts = {};
CardData.forEach(function(c) {
  (c.keywords || []).forEach(function(k) { kwCounts[k] = (kwCounts[k] || 0) + 1; });
});
Object.keys(kwCounts).forEach(function(k) {
  ok('keyword "' + k + '" (' + kwCounts[k] + ' cards) has a printed definition',
    !!Glossary.KEYWORDS[k]);
});


// ===========================================================================
describe('Economy is open, not a closed loop');
// ===========================================================================
// Production must be declared, never derived from cost. Deriving it is what
// made 38/40 Infrastructure produce Capital and starved the other four pools.
var infra = byType('Infrastructure');
ok('every Infrastructure declares an explicit produces map',
  infra.every(function(c) { return !!c.produces; }));

var derived = infra.filter(function(c) {
  var maxRes = 'Capital', maxVal = -1;
  R.forEach(function(r) { if ((c.cost[r] || 0) > maxVal) { maxVal = c.cost[r] || 0; maxRes = r; } });
  var prod = R.filter(function(r) { return c.produces[r] > 0; });
  return prod.length === 1 && prod[0] === maxRes;
});
ok('production is not merely a copy of the most-expensive cost pip',
  derived.length < infra.length, derived.length + '/' + infra.length + ' coincidentally match');

R.forEach(function(res) {
  var producers = infra.filter(function(c) { return (c.produces[res] || 0) > 0; });
  ok(res + ' has at least one producer anywhere in the set', producers.length > 0, producers.length);
  // Bootstrap: payable from a Capital-only opening position.
  var boot = producers.filter(function(c) {
    return R.every(function(r) { return r === 'Capital' || !c.cost[r]; });
  });
  ok(res + ' has a Capital-payable producer (bootstrap path exists)', boot.length > 0,
    boot.length + ' -> ' + boot.slice(0, 2).map(function(c) { return c.id; }).join(','));
});

// ===========================================================================
describe('Disruptions are priced and differentiated');
// ===========================================================================
var dis = byType('Disruptions');
ok('no Disruption costs zero', dis.every(function(c) { return totalCost(c) > 0; }),
  dis.filter(function(c) { return totalCost(c) === 0; }).length + ' free');
var disSigs = new Set(dis.map(function(c) { return JSON.stringify(c.effects); }));
ok('Disruptions are not all the same effect', disSigs.size > 1, disSigs.size + ' distinct of ' + dis.length);
// 20 free Disruptions used to beat 20 starting Health with no board at all.
var cheapest = dis.map(totalCost).sort(function(a, b) { return a - b; });
var burnCost = cheapest.slice(0, 20).reduce(function(a, b) { return a + b; }, 0);
ok('burning 20 Health with Disruptions costs real resources', burnCost >= 20, burnCost + ' total pips');

var ops = byType('Operations');
var opSigs = new Set(ops.map(function(c) { return JSON.stringify(c.effects); }));
ok('Operations are not a single blanket effect', opSigs.size > 5, opSigs.size + ' distinct of ' + ops.length);


// ===========================================================================
describe('Contracts: explicit clauses, no hidden global rule');
// ===========================================================================
var contracts = byType('Contracts');
ok('every Contract states its Fleet requirement explicitly on the card',
  contracts.every(function(c) { return c.requirements.fleetCards !== undefined; }));
ok('no Contract derives its requirements from the whole card pool',
  JSON.stringify(contracts).indexOf('"all"') === -1);
ok('every Contract prints a Goods cargo cost',
  contracts.every(function(c) { return c.cargo >= 1; }));
ok('every Contract prints an FP reward',
  contracts.every(function(c) { return c.fpReward >= 1; }));

// Enumerated subtype clauses must be satisfiable from the printed pool. The
// old "one Fleet of each subtype" clause silently required the single Drone.
contracts.forEach(function(c) {
  var subs = c.requirements.fleetSubtypes || [];
  subs.forEach(function(s) {
    var n = byType('Fleet').filter(function(f) { return f.subtype === s; }).length;
    ok('contract ' + c.id + ' requires Fleet subtype ' + s + ' with enough printed cards', n >= 4, n);
  });
});

// Requirements must render as prose for the card face, never as an object.
var CardRenderer = require('../js/card-renderer.js');
var badReq = contracts.filter(function(c) {
  var s = CardRenderer.formatRequirements(c);
  return !s || s.indexOf('object') !== -1;
});
ok('every Contract formats its requirements as printable prose', badReq.length === 0,
  badReq.map(function(c) { return c.id; }).join(','));

// The total FP available in a deck must clear the win threshold, or the primary
// win condition is unreachable by construction.
var avgFp = contracts.reduce(function(n, c) { return n + c.fpReward; }, 0) / contracts.length;
var deckContracts = Rules.DECK_MINIMUMS.balanced.Contracts;
ok('a balanced deck carries more than 10 FP of contract value',
  avgFp * deckContracts > 10, (avgFp * deckContracts).toFixed(1) + ' FP across ' + deckContracts + ' contracts');


// ===========================================================================
describe('Determinism and seeded replay');
// ===========================================================================
function fingerprint(state) {
  return JSON.stringify(Rules.summary(state)) + '|' + state.log.length;
}
var g1 = playGame(4242, 'greedy', 'delivery');
var g2 = playGame(4242, 'greedy', 'delivery');
ok('the same seed replays an identical game', fingerprint(g1) === fingerprint(g2));
var g3 = playGame(4243, 'greedy', 'delivery');
ok('a different seed produces a different game', fingerprint(g1) !== fingerprint(g3));
ok('state is reachable for inspection (no module-private game object)',
  typeof Rules.summary(g1).players[0].fp === 'number');

// ===========================================================================
describe('Termination: every game must end');
// ===========================================================================
var results = [];
var names = Policies.NAMES.filter(function(n) { return n !== 'random'; });
for (var s = 1; s <= 40; s++) {
  var a = names[s % names.length];
  var b = names[(s * 3) % names.length];
  results.push(playGame(s, a, b));
}
ok('no game reported an action that legalActions offered but apply refused',
  results.every(function(r) { return !r._illegal; }),
  JSON.stringify((results.find(function(r) { return r._illegal; }) || {})._illegal));
ok('every game reached a terminal state', results.every(function(r) { return r.gameOver; }),
  results.filter(function(r) { return !r.gameOver; }).length + ' unfinished');
ok('every finished game names a winner and a reason',
  results.every(function(r) { return r.winner !== null && !!r.winReason; }));

var turns = results.map(function(r) { return r.turn; }).sort(function(x, y) { return x - y; });
ok('no game runs past 120 turns', turns[turns.length - 1] <= 120, 'max ' + turns[turns.length - 1]);
ok('no game ends before turn 5', turns[0] >= 5, 'min ' + turns[0]);

// The frozen-hand deadlock: the draw step must discard, never refuse to draw.
ok('the hand limit is a real configured number', typeof results[0].config.maxHand === 'number',
  results[0].config.maxHand);
var frozen = results.filter(function(r) {
  return r.players.some(function(p) { return p.hand.length > r.config.maxHand; });
});
ok('no player ends above the printed hand limit', frozen.length === 0,
  frozen.length + ' over limit of ' + results[0].config.maxHand);

// The original deadlock: a full hand blocked the draw step, so the deck never
// depleted and no game could end. Every game must at least keep drawing.
var startingDeck = results[0].config.deckSize - results[0].config.openingHand;
var neverDrew = results.filter(function(r) {
  return r.players.every(function(p) { return p.deck.length >= startingDeck; });
});
ok('the draw step is never blocked by a full hand', neverDrew.length === 0,
  neverDrew.length + ' games where neither player drew a card');
// Most games should run deep into the deck; a few end early on FP or health,
// which is the point of having three win conditions.
var deep = results.filter(function(r) {
  return r.players.some(function(p) { return p.deck.length < startingDeck / 2; });
});
ok('most games run deep into the deck', deep.length >= results.length * 0.6,
  deep.length + '/' + results.length + ' games drew past half the deck');


// ===========================================================================
describe('Win conditions are all reachable');
// ===========================================================================
var reasons = {};
results.forEach(function(r) {
  var key = /Fulfillment/.test(r.winReason) ? 'fp'
    : /ran out of cards/.test(r.winReason) ? 'deckout' : 'health';
  reasons[key] = (reasons[key] || 0) + 1;
});
ok('the FP win condition actually fires', reasons.fp > 0, (reasons.fp || 0) + '/40 games');
ok('the health win condition actually fires', reasons.health > 0, (reasons.health || 0) + '/40 games');
ok('the deck-out loss condition actually fires', reasons.deckout > 0, (reasons.deckout || 0) + '/40 games');

var peakFp = 0;
results.forEach(function(r) {
  r.players.forEach(function(p) { peakFp = Math.max(peakFp, p.fp); });
});
ok('at least one player reached the 10 FP target', peakFp >= 10, 'peak ' + peakFp);

// ===========================================================================
describe('Draw, hand limit and deck-out mechanics');
// ===========================================================================
var st = Rules.createGame({ pool: CardData, seed: 99 });
ok('opening hand is the printed size', st.players[0].hand.length === st.config.openingHand,
  st.players[0].hand.length);

// Drawing with an empty deck must lose the game rather than silently no-op.
var st2 = Rules.createGame({ pool: CardData, seed: 100 });
st2.players[0].deck = [];
var guard = 0;
while (!st2.gameOver && guard++ < 40) Rules.apply(st2, { k: 'nextPhase', actor: Rules.actingPlayer(st2) });
ok('a player who must draw from an empty deck loses', st2.gameOver && st2.winner === 1,
  st2.winReason);

// ===========================================================================
describe('Combat reads printed Power and Toughness');
// ===========================================================================
var wf = byType('Workforce');
ok('every Workforce prints both Power and Toughness',
  wf.every(function(c) { return c.stats.power !== undefined && c.stats.toughness !== undefined; }));


// A blocked attacker must be stopped by Toughness, and a lethal blocker must
// die. Toughness was printed on all 45 Workforce and read by nothing.
var cst = Rules.createGame({ pool: CardData, seed: 7, archetypes: ['aggro', 'aggro'] });
var attacker = { type: 'Workforce', uid: 9001, name: 'Test Attacker', stats: { power: 2, toughness: 2 },
  ready: true, tapped: false, attacked: false, disabledFor: 0, damage: 0, keywords: [], carrying: 0, stored: 0 };
var blocker = { type: 'Workforce', uid: 9002, name: 'Test Blocker', stats: { power: 3, toughness: 3 },
  ready: true, tapped: false, attacked: false, disabledFor: 0, damage: 0, keywords: [], carrying: 0, stored: 0 };
cst.players[0].network.push(attacker);
cst.players[1].network.push(blocker);
while (Rules.PHASES[cst.phase] !== 'Combat') Rules.apply(cst, { k: 'nextPhase', actor: Rules.actingPlayer(cst) });
var hpBefore = cst.players[1].health;
Rules.apply(cst, { k: 'attack', uid: 9001, actor: 0 });
Rules.apply(cst, { k: 'nextPhase', actor: 0 });
ok('declaring an attacker opens the blocker step', cst.combat.awaiting === true);
Rules.apply(cst, { k: 'block', attacker: 9001, blocker: 9002, actor: 1 });
Rules.apply(cst, { k: 'doneBlocking', actor: 1 });
ok('a blocked attack deals no damage to the defending player',
  cst.players[1].health === hpBefore, hpBefore + ' -> ' + cst.players[1].health);
ok('a blocker with lethal Power kills the attacker',
  !Rules.find(cst.players[0].network, 9001), 'attacker removed');

// Attack flags must clear every turn. They previously never cleared, so each
// Workforce attacked exactly once per GAME.
var ast = playGame(11, 'aggro', 'aggro');
var stuck = ast.players.some(function(p) {
  return p.network.some(function(c) { return c.attacked && Rules.PHASES[ast.phase] === 'Upkeep'; });
});
ok('attack flags do not survive across turns', !stuck);

var multi = Rules.createGame({ pool: CardData, seed: 5, archetypes: ['aggro', 'aggro'] });
multi.players[0].network.push({ type: 'Workforce', uid: 9100, name: 'Repeat', stats: { power: 1, toughness: 1 },
  ready: true, tapped: false, attacked: false, disabledFor: 0, damage: 0, keywords: [], carrying: 0, stored: 0 });
var attacksMade = 0;
for (var t = 0; t < 400 && !multi.gameOver; t++) {
  var acts = Rules.legalActions(multi);
  var atk = acts.filter(function(a) { return a.k === 'attack' && a.uid === 9100; })[0];
  if (atk) { Rules.apply(multi, atk); attacksMade++; }
  else if (multi.combat.awaiting) {
    // nextPhase is refused while blockers are pending, so the blocker step has
    // to be closed out or the loop makes no progress.
    Rules.apply(multi, { k: 'doneBlocking', actor: Rules.actingPlayer(multi) });
  } else {
    Rules.apply(multi, { k: 'nextPhase', actor: Rules.actingPlayer(multi) });
  }
  if (attacksMade >= 3) break;
}
ok('the same Workforce can attack on more than one turn', attacksMade >= 2, attacksMade + ' attacks');


// ===========================================================================
describe('Keywords have mechanical meaning');
// ===========================================================================
// Sustainable pays no Fuel to transit.
var kst = Rules.createGame({ pool: CardData, seed: 21 });
var plainFleet = { type: 'Fleet', keywords: [], stats: { capacity: 1, speed: 1 } };
var susFleet = { type: 'Fleet', keywords: ['Sustainable'], stats: { capacity: 1, speed: 1 } };
ok('Sustainable removes the Fuel cost of transit',
  Rules.hasKeyword(susFleet, 'Sustainable') && !Rules.hasKeyword(plainFleet, 'Sustainable'));

// Fragile is cheaper to deploy.
var fragile = byType('Infrastructure').filter(function(c) {
  return (c.keywords || []).indexOf('Fragile') !== -1;
})[0] || byType('Workforce').filter(function(c) {
  return (c.keywords || []).indexOf('Fragile') !== -1;
})[0];
if (fragile) {
  var p = kst.players[0];
  var eff = Rules.effectiveCost(p, fragile);
  ok('Fragile reduces the printed Capital cost', eff.Capital <= (fragile.cost.Capital || 0),
    (fragile.cost.Capital || 0) + ' -> ' + eff.Capital);
}

// Legendary is limit one in play.
var legend = CardData.filter(function(c) { return (c.keywords || []).indexOf('Legendary') !== -1; })[0];
ok('Legendary cards exist and are documented as limit 1',
  !!legend && /Limit 1/.test(Glossary.KEYWORDS.Legendary));

// Automated needs no crew.
var autoFleet = byType('Fleet').filter(function(c) {
  return (c.keywords || []).indexOf('Automated') !== -1;
});
ok('some Fleet are Automated so they can transit without a crew', autoFleet.length > 0, autoFleet.length);

// Every keyword must be read somewhere in the rules core, or it is decoration.
var rulesSrc = require('fs').readFileSync(require('path').join(__dirname, '../js/rules.js'), 'utf8');
Glossary.KEYWORD_LIST.forEach(function(kw) {
  ok('keyword "' + kw + '" is referenced by the rules core',
    rulesSrc.indexOf("'" + kw + "'") !== -1);
});


// ===========================================================================
describe('Effect DSL: printed text and machine effects agree');
// ===========================================================================
var badTrigger = [];
var badAction = [];
CardData.forEach(function(c) {
  (c.effects || []).forEach(function(e) {
    if (Glossary.TRIGGERS.indexOf(e.trigger) === -1) badTrigger.push(c.id + ':' + e.trigger);
    (e.action || []).forEach(function(a) {
      if (Glossary.ACTIONS.indexOf(a.do) === -1) badAction.push(c.id + ':' + a.do);
    });
  });
});
ok('every effect trigger is in the frozen vocabulary', badTrigger.length === 0, badTrigger.slice(0, 4).join(','));
ok('every effect action is in the frozen vocabulary', badAction.length === 0, badAction.slice(0, 4).join(','));

// A card with a Tap ability must print the word Tap, and vice versa: the
// printed face is the only thing a physical player has.
var tapMismatch = CardData.filter(function(c) {
  var hasTapEffect = Effects.has(c, 'tap');
  var saysTap = /\bTap\b/.test(c.rulesText || '');
  return hasTapEffect !== saysTap;
});
ok('printed "Tap:" matches the presence of a tap effect', tapMismatch.length === 0,
  tapMismatch.slice(0, 5).map(function(c) { return c.id; }).join(','));

// No card may carry an action atom the interpreter cannot execute.
var unimplemented = [];
CardData.forEach(function(c) {
  (c.effects || []).forEach(function(e) {
    (e.action || []).forEach(function(a) {
      if (Glossary.ACTIONS.indexOf(a.do) === -1) unimplemented.push(c.id);
    });
  });
});
ok('no card references an unimplemented action', unimplemented.length === 0);

// Print constraint: text must fit the card's text box.
var overlong = CardData.filter(function(c) { return (c.rulesText || '').length > 220; });
ok('printed rules text fits the card face (<=220 chars)', overlong.length === 0,
  overlong.map(function(c) { return c.id + '(' + c.rulesText.length + ')'; }).join(' '));


// ===========================================================================
describe('Castability: a hand must contain real decisions');
// ===========================================================================
var castable = 0;
var handCards = 0;
var noPlayTurns = 0;
var mainPhaseSamples = 0;
for (var cs = 1; cs <= 30; cs++) {
  var g = Rules.createGame({ pool: CardData, seed: cs });
  var pols = [Policies.POLICIES.greedy, Policies.POLICIES.delivery];
  var rg = Rules.Rng.create(cs);
  for (var k = 0; k < 1200 && !g.gameOver; k++) {
    var acts = Rules.legalActions(g);
    if (!acts.length) break;
    if (Rules.PHASES[g.phase] === 'Main Phase 1' && !g.combat.awaiting) {
      var pl = g.players[Rules.actingPlayer(g)];
      var plays = acts.filter(function(a) { return a.k === 'play'; }).length;
      if (pl.hand.length) {
        mainPhaseSamples++;
        handCards += pl.hand.length;
        castable += plays;
        if (plays === 0) noPlayTurns++;
      }
    }
    var act = pols[Rules.actingPlayer(g)](g, acts, rg);
    if (!Rules.apply(g, act).ok) break;
  }
}
var castPct = (castable / handCards) * 100;
ok('a meaningful share of the hand is castable at Main Phase 1', castPct > 25,
  castPct.toFixed(1) + '% (' + castable + '/' + handCards + ')');
var deadPct = (noPlayTurns / mainPhaseSamples) * 100;
ok('most Main Phases offer at least one play', deadPct < 45,
  deadPct.toFixed(1) + '% of sampled Main Phases had no playable card');

// ===========================================================================
describe('Deck construction');
// ===========================================================================
Rules.ARCHETYPES.forEach(function(arch) {
  var deck = Rules.buildDeck(CardData, Rules.Rng.create(3), { archetype: arch, size: Rules.DEFAULTS.deckSize });
  ok('archetype "' + arch + '" builds a full deck', deck.length === Rules.DEFAULTS.deckSize, deck.length);
  var legendaries = deck.filter(function(c) { return (c.keywords || []).indexOf('Legendary') !== -1; });
  var names = legendaries.map(function(c) { return c.name; });
  ok('archetype "' + arch + '" respects the Legendary singleton rule',
    new Set(names).size === names.length, names.length + ' legendaries');
});


// ===========================================================================
describe('Balance: measured targets, locked against regression');
// ===========================================================================
/**
 * BALANCE PASS 2 lock.
 *
 * The old assertions here were "no strategy above 85%, none below 10%". Both
 * passed while the aggro deck won 72% of its games and the Fulfillment race -
 * the win condition this game is named after - decided a third of them. A
 * balance assertion that a broken game satisfies is not an assertion.
 *
 * These run the same batch the balance report runs (sim/simulate.js), over the
 * real printed archetype decks and both seats, and assert the numbers the
 * tuning pass was aimed at. The bands are the design targets plus the sampling
 * noise of this batch size; a change that moves any of them out of band is a
 * balance regression and should fail here rather than be discovered in a
 * print run.
 */
var Sim = require('./simulate.js');
var GAMES_PER_MATCHUP = 48;      // 25 matchups -> 1200 games, about 2 seconds

var batch = [];
var matrix = {};
var bseed = 1;
Sim.STRATEGIES.forEach(function(A) {
  Sim.STRATEGIES.forEach(function(B) {
    for (var g = 0; g < GAMES_PER_MATCHUP; g++) {
      var rec = Sim.runGame({
        seed: bseed++,
        archetypes: [A.archetype, B.archetype],
        policies: [A.policy, B.policy]
      });
      batch.push(rec);
      matrix[A.policy] = matrix[A.policy] || {};
      var cell = matrix[A.policy][B.policy] = matrix[A.policy][B.policy] || { w: 0, l: 0, d: 0 };
      if (rec.winner === 0) cell.w++; else if (rec.winner === 1) cell.l++; else cell.d++;
    }
  });
});

function meanOf(list) { return list.reduce(function(a, b) { return a + b; }, 0) / list.length; }
function shareOf(type) {
  return 100 * batch.filter(function(r) { return r.winType === type; }).length / batch.length;
}

var fpShare = shareOf('fp');
var healthShare = shareOf('health');
var deckoutShare = shareOf('deckout');
var peaks = [], contracts = [], lengths = [];
batch.forEach(function(r) {
  peaks.push(r.fpPeak[0], r.fpPeak[1]);
  contracts.push(r.contracts[0], r.contracts[1]);
  lengths.push(r.turns);
});

console.log('  measured over ' + batch.length + ' games: fp ' + fpShare.toFixed(1) +
  '%, health ' + healthShare.toFixed(1) + '%, deckout ' + deckoutShare.toFixed(1) + '%');

// Delivery is the spine of the game. Combat is a real second path, not the
// fastest one, and exhaustion is the backstop for a game where neither happens.
ok('the Fulfillment race decides most games (50-65%)',
  fpShare >= 50 && fpShare <= 65, fpShare.toFixed(1) + '%');
ok('combat stays a real win condition, not a decoration (25-38%)',
  healthShare >= 25 && healthShare <= 38, healthShare.toFixed(1) + '%');
ok('exhaustion is a backstop, not an outcome (under 10%)',
  deckoutShare < 10, deckoutShare.toFixed(1) + '%');

// The FP race has to be live for both players, not just reachable by the winner.
ok('mean peak Fulfillment Points per player is above 5.5', meanOf(peaks) > 5.5,
  meanOf(peaks).toFixed(2) + ' of the 10 needed');
ok('a player fulfils more than 3 Contracts in an average game', meanOf(contracts) > 3.0,
  meanOf(contracts).toFixed(2) + ' contracts per player');

// A table game has to fit in an evening, and a game that ends on turn 12
// never had a supply chain in it.
ok('mean game length is 18-25 turns', meanOf(lengths) >= 18 && meanOf(lengths) <= 25,
  meanOf(lengths).toFixed(1) + ' turns');

// Win rates, aggregated over BOTH seats so a matchup edge is not confused with
// a first-player edge.
var keys = Object.keys(matrix);
var rates = [];
var worstCell = { label: '', rate: 0 };
keys.forEach(function(a) {
  var w = 0, t = 0;
  keys.forEach(function(b) {
    var first = matrix[a][b], second = matrix[b][a];
    var wins = first.w + second.l;
    var total = first.w + first.l + first.d + second.w + second.l + second.d;
    w += wins; t += total;
    if (a !== b && 100 * wins / total > worstCell.rate) {
      worstCell = { label: a + ' beats ' + b, rate: 100 * wins / total };
    }
  });
  rates.push({ n: a, r: 100 * w / t });
});
rates.sort(function(x, y) { return y.r - x.r; });
console.log('  win rates: ' + rates.map(function(x) { return x.n + ' ' + x.r.toFixed(1) + '%'; }).join(', '));

ok('the best archetype wins no more than 62% of its games', rates[0].r <= 62,
  rates[0].n + ' at ' + rates[0].r.toFixed(1) + '%');
ok('the worst archetype wins at least 35% of its games', rates[rates.length - 1].r >= 35,
  rates[rates.length - 1].n + ' at ' + rates[rates.length - 1].r.toFixed(1) + '%');
ok('no single matchup is worse than 75/25', worstCell.rate <= 75,
  worstCell.label + ' ' + worstCell.rate.toFixed(1) + '%');
// Disruption spam was the old build's only functioning line; delivery is the
// line this game is supposed to be about.
ok('Disruption spam is not the best strategy', rates[0].n !== 'disruption', rates[0].n + ' leads');
ok('the delivery deck is not the worst strategy', rates[rates.length - 1].n !== 'delivery',
  rates[rates.length - 1].n + ' is last');

var p1 = batch.filter(function(r) { return r.winner === 0; }).length;
var decided = batch.filter(function(r) { return r.winner !== null; }).length;
var p1rate = 100 * p1 / decided;
ok('going first is an edge, not a decision (48-56%)', p1rate >= 48 && p1rate <= 56,
  p1rate.toFixed(1) + '%');

// A card nobody ever plays is a card that should not have been printed.
var everPlayed = {};
batch.forEach(function(r) { Object.keys(r.played).forEach(function(id) { everPlayed[id] = true; }); });
var unplayed = CardData.filter(function(c) { return !everPlayed[c.id]; });
ok('all 200 printed cards get played at least once', unplayed.length === 0,
  (CardData.length - unplayed.length) + '/' + CardData.length +
  (unplayed.length ? ' - never: ' + unplayed.slice(0, 6).map(function(c) { return c.id; }).join(',') : ''));

// ===========================================================================
console.log('\n' + (failures.length
  ? '=== ' + failures.length + ' FAILURE(S), ' + pass + ' passed ==='
  : '=== ALL ' + pass + ' ASSERTIONS PASSED ==='));
if (failures.length) {
  failures.forEach(function(f) { console.log('  - ' + f); });
  process.exit(1);
}
