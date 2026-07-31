#!/usr/bin/env node
/**
 * build-card-data.js
 *
 * Regenerates js/card-data.js from js/card-data.source.js by adding the
 * mechanical fields the rules core needs, and by normalizing every card
 * against the frozen glossary.
 *
 * What this tool adds or changes (and why):
 *   produces   - explicit resource output, DECOUPLED from cost. Deriving
 *                production from cost is what deadlocked the old economy.
 *   goods      - how much Goods an Infrastructure yields each Upkeep.
 *   effects    - { trigger, condition, action } tuples. The engine reads
 *                these; nothing about a card's behavior lives in the engine.
 *   rulesText  - generated FROM effects, so printed text cannot drift from
 *                what the engine does.
 *   cost       - Infrastructure is repriced to Capital-only at Common and
 *                Uncommon so every resource has a Capital-payable producer.
 *                Disruptions are priced (all 25 used to cost nothing).
 *   loreText   - the original long-form design text, preserved verbatim.
 *   requirements/cargo - Contract clauses become explicit and enumerated;
 *                no clause is derived from the global card pool.
 *
 * Usage: node tools/build-card-data.js
 */
'use strict';

var fs = require('fs');
var path = require('path');

var ROOT = path.join(__dirname, '..');
var Glossary = require(path.join(ROOT, 'js', 'glossary.js'));
var SOURCE = path.join(ROOT, 'js', 'card-data.source.js');
var OUTPUT = path.join(ROOT, 'js', 'card-data.js');

var R = Glossary.RESOURCES;

// ---------------------------------------------------------------------------
// Glossary normalization: card text used vocabulary the engine never had.
// ---------------------------------------------------------------------------
var TEXT_FIXES = [
  [/Supply Zone/g, 'Source Zone'],
  [/Logistics Zone/g, 'Network Zone'],
  [/Distribution Zone/g, 'Network Zone'],
  [/Procurement Phase/g, 'Upkeep'],
  [/Global Market/g, 'the Source Zone'],
  [/goods token(s)?/g, 'Goods'],
  [/raw material(s)? token(s)?/g, 'Goods'],
  [/raw material(s)?/g, 'Goods']
];

function normalizeText(str) {
  if (!str) return str;
  var out = String(str);
  for (var i = 0; i < TEXT_FIXES.length; i++) {
    out = out.replace(TEXT_FIXES[i][0], TEXT_FIXES[i][1]);
  }
  return out;
}


// ---------------------------------------------------------------------------
// Infrastructure production table. Chosen from each card's THEME, not its cost.
// ---------------------------------------------------------------------------
var PRODUCES = {
  '001': 'Capital', '002': 'Capital', '003': 'Time',    '004': 'Labor',   '005': 'Time',
  '006': 'Fuel',    '007': 'Fuel',    '008': 'Data',    '009': 'Time',    '010': 'Labor',
  '011': 'Labor',   '012': 'Capital', '013': 'Data',    '014': 'Fuel',    '015': 'Fuel',
  '016': 'Capital', '017': 'Fuel',    '018': 'Labor',   '019': 'Capital', '020': 'Data',
  '021': 'Data',    '022': 'Data',    '023': 'Data',    '024': 'Capital', '025': 'Labor',
  '026': 'Fuel',    '027': 'Time',    '028': 'Fuel',    '029': 'Labor',   '030': 'Fuel',
  '031': 'Data',    '032': 'Time',    '033': 'Time',    '034': 'Time',    '035': 'Labor',
  '036': 'Labor',   '037': 'Time',    '038': 'Fuel',    '039': 'Time',    '040': 'ALL'
};

function zeroCost() {
  var c = {};
  for (var i = 0; i < R.length; i++) c[R[i]] = 0;
  return c;
}

function costTotal(cost) {
  var t = 0;
  for (var i = 0; i < R.length; i++) t += (cost[R[i]] || 0);
  return t;
}

/**
 * Infrastructure is the ramp, so Infrastructure is bought with Capital.
 * Common and Uncommon cost Capital only, which guarantees a Capital-payable
 * producer for every one of the five resources. Rare and Mythic may demand
 * the resource they amplify.
 */
function repriceInfrastructure(card) {
  var orig = costTotal(card.cost);
  var produced = PRODUCES[card.id];
  var cost = zeroCost();
  if (card.rarity === 'Common') {
    cost.Capital = orig <= 2 ? 1 : 2;
  } else if (card.rarity === 'Uncommon') {
    cost.Capital = orig <= 3 ? 2 : 3;
  } else if (card.rarity === 'Rare') {
    cost.Capital = 3;
    if (produced !== 'Capital' && produced !== 'ALL') cost[produced] = 1;
  } else {
    cost.Capital = 4;
    if (produced === 'ALL') { cost.Data = 1; cost.Time = 1; }
    else if (produced === 'Capital') cost.Capital = 6;
    else cost[produced] = 2;
  }
  if ((card.keywords || []).indexOf('Fragile') !== -1) {
    cost.Capital = Math.max(1, cost.Capital - 1);
  }
  return cost;
}


/**
 * BALANCE PASS 2 - printed Workforce Power.
 *
 * A Common Workforce with Power 1 could not break anything: the printed
 * barricade Toughness is 2, most Workforce print Toughness 1-2, and a swarm of
 * Power 1 bodies simply bounced. Combat measured 21-24% of wins in a game that
 * wants combat to be a real 25-35% path, and the aggro deck lost its own
 * matchup against a delivery deck.
 *
 * Common Workforce that print Power 1 AND Toughness 2 or more now print
 * Power 2 - the crews that could already survive a block but could not
 * threaten anything. Measured, buffing every Power 1 Common took combat from
 * 24% to 35% of wins but pushed the aggro deck to 63.5%; restricting the
 * change to the durable Commons is the smaller dial that leaves the 1-Power,
 * 1-Toughness filler alone, so the fastest possible swarm is unchanged and
 * only the grindy middle of the curve gets teeth.
 */
function repriceWorkforce(card) {
  var stats = {};
  Object.keys(card.stats || {}).forEach(function(k) { stats[k] = card.stats[k]; });
  if (card.type === 'Workforce' && stats.power === 1 && stats.toughness >= 2 &&
      (card.rarity === 'Common' || card.rarity === 'Uncommon')) {
    stats.power = 2;
  }
  return stats;
}

/** How much of its resource an Infrastructure yields each Upkeep. */
function buildProduces(card) {
  var produced = PRODUCES[card.id];
  var map = zeroCost();
  if (!produced) return map;
  if (produced === 'ALL') {
    for (var i = 0; i < R.length; i++) map[R[i]] = 1;
    return map;
  }
  var kw = card.keywords || [];
  var amount = 1;
  if (kw.indexOf('Hub') !== -1) amount += 1;              // Hub: +1 resource
  if (card.rarity === 'Rare') amount += 1;
  if (card.rarity === 'Mythic Rare') amount += 2;
  map[produced] = amount;
  return map;
}

/** Goods produced per Upkeep, bounded at play time by the card's capacity. */
function buildGoods(card) {
  var kw = card.keywords || [];
  var g = 1;
  if (kw.indexOf('Specialized') !== -1) g += 1;           // Specialized: +1 Goods
  if (card.rarity === 'Rare') g += 1;
  if (card.rarity === 'Mythic Rare') g += 1;
  return g;
}

// ---------------------------------------------------------------------------
// Effect tables. One entry per Operations / Disruptions card, so 65 spells
// have 65 behaviors instead of 2. `cost` overrides the printed cost where the
// printed cost was unpriced (every Disruption cost nothing).
// ---------------------------------------------------------------------------
function c(cap, lab, fue, dat, tim) {
  return { Capital: cap || 0, Labor: lab || 0, Fuel: fue || 0, Data: dat || 0, Time: tim || 0 };
}

var OPERATIONS = {
  '121': [{ do: 'extraTransit', amount: 1 }, { do: 'draw', amount: 1 }],
  '122': [{ do: 'goods', amount: 2 }],
  '123': [{ do: 'draw', amount: 2 }, { do: 'discard', amount: 1 }],
  '124': [{ do: 'cargoDiscount', amount: 2 }],
  '125': [{ do: 'goods', amount: 3 }],
  '126': [{ do: 'untap', what: 'Workforce' }, { do: 'draw', amount: 1 }],
  '127': [{ do: 'extraTransit', amount: 1 }, { do: 'shield', turns: 1 }],
  '128': [{ do: 'goods', amount: 1 }, { do: 'cargoDiscount', amount: 1 }],
  '129': [{ do: 'shield', turns: 2 }, { do: 'draw', amount: 1 }],
  '130': [{ do: 'gain', resource: 'Capital', amount: 2 }, { do: 'draw', amount: 1 }],
  '131': [{ do: 'goods', amount: -2 }, { do: 'gain', resource: 'any', amount: 3 }],
  '132': [{ do: 'goods', amount: 2 }],
  '133': [{ do: 'extraTransit', amount: 1 }],
  '134': [{ do: 'gain', resource: 'Fuel', amount: 2 }, { do: 'extraTransit', amount: 1 }],
  // BALANCE PASS 2: Fulfillment Points are earned by delivering, never by
  // playing a spell. Dynamic Pricing sold FP for 2 Data; it now buys the
  // delivery instead of the score.
  '135': [{ do: 'cargoDiscount', amount: 1 }, { do: 'goods', amount: 1 }],
  '136': [{ do: 'goods', amount: 3 }],
  '137': [{ do: 'gain', resource: 'Fuel', amount: 2 }, { do: 'extraTransit', amount: 1 }],
  '138': [{ do: 'gain', resource: 'Fuel', amount: 3 }],
  '139': [{ do: 'draw', amount: 3 }],
  '140': [{ do: 'untap', what: 'Infrastructure' }, { do: 'goods', amount: 2 }],

  '141': [{ do: 'gain', resource: 'Capital', amount: 2 }, { do: 'draw', amount: 1 }],
  '142': [{ do: 'goods', amount: 2 }],
  '143': [{ do: 'gain', resource: 'any', amount: 2 }, { do: 'goods', amount: 1 }],
  '144': [{ do: 'goods', amount: 1 }, { do: 'draw', amount: 1 }],
  '145': [{ do: 'gain', resource: 'Fuel', amount: 2 }],
  '146': [{ do: 'draw', amount: 2 }, { do: 'shield', turns: 1 }],
  '147': [{ do: 'gain', resource: 'Capital', amount: 2, perKeyword: 'Sustainable' }],
  '148': [{ do: 'gain', resource: 'Capital', amount: 3 }],
  '149': [{ do: 'draw', amount: 3 }, { do: 'discard', amount: 1 }],
  '150': [{ do: 'buff', what: 'Infrastructure', stat: 'produce', amount: 1, duration: 'game' }],
  '151': [{ do: 'shield', turns: 3 }],
  '152': [{ do: 'extraTransit', amount: 2 }],
  '153': [{ do: 'cargoDiscount', amount: 2 }, { do: 'extraTransit', amount: 1 }],
  '154': [{ do: 'buff', what: 'Infrastructure', stat: 'goods', amount: 1, duration: 'game' }],
  '155': [{ do: 'gain', resource: 'any', amount: 3 }],
  '156': [{ do: 'extraTransit', amount: 1 }, { do: 'draw', amount: 1 }],
  '157': [{ do: 'gain', resource: 'Capital', amount: 3 }],
  '158': [{ do: 'goods', amount: 2 }, { do: 'draw', amount: 1 }],
  '159': [{ do: 'draw', amount: 3 }, { do: 'discard', amount: 2, who: 'opponent' }],
  '160': [{ do: 'gain', resource: 'any', amount: 4 }, { do: 'draw', amount: 2 }, { do: 'extraTransit', amount: 3 }]
};

/** Operations that were printed free get a floor price of 1. */
var OPERATION_COSTS = {
  '133': c(0, 1, 0, 0, 0),
  '151': c(0, 0, 0, 0, 1),
  '152': c(0, 0, 1, 0, 0),
  '155': c(1, 0, 0, 0, 0)
};

/**
 * BALANCE PASS 2 - every Disruption now prints damage.
 *
 * Measured: a Disruption deck beat a delivery deck 23% of the time, and in the
 * average loss it had taken its opponent from 20 Supply Chain Health to 14.8
 * over 27 turns. It could dismantle a supply chain and had no way to finish
 * anyone off, so the opponent simply rebuilt and delivered.
 *
 * The rider is 1 damage on a cheap outage, 2 on a Rare, 3 on a Mythic. It is
 * printed on the card face (rulesText is generated from these effects), it is
 * thematically the point of the card - an outage costs the customer - and it
 * gives a control deck a clock without turning it into a burn deck: 12
 * Disruptions in the printed disruption recipe is at most 14 damage, and
 * stored Goods still soak 2 of it per turn.
 */
var DISRUPTIONS = {
  '161': { cost: c(0, 1), effects: [{ do: 'disable', what: 'Workforce', who: 'opponent', count: 2, turns: 2 }, { do: 'damage', amount: 1 }] },
  '162': { cost: c(0, 0, 2), effects: [{ do: 'disable', what: 'Fleet', who: 'opponent', count: 2, turns: 2 }, { do: 'damage', amount: 2 }] },
  '163': { cost: c(0, 0, 0, 2), effects: [{ do: 'disable', what: 'Infrastructure', who: 'opponent', count: 2, turns: 1 }, { do: 'loseGoods', amount: 2, who: 'opponent' }, { do: 'damage', amount: 1 }] },
  '164': { cost: c(2), effects: [{ do: 'drain', resource: 'Capital', amount: 3, who: 'opponent' }, { do: 'damage', amount: 1 }] },
  '165': { cost: c(0, 0, 1), effects: [{ do: 'drain', resource: 'Fuel', amount: 2, who: 'opponent' }, { do: 'damage', amount: 2 }] },
  '166': { cost: c(0, 0, 0, 0, 1), effects: [{ do: 'loseGoods', amount: 2, who: 'opponent' }, { do: 'damage', amount: 2 }] },
  '167': { cost: c(0, 0, 1, 0, 1), effects: [{ do: 'destroy', what: 'Fleet', who: 'opponent', count: 1 }, { do: 'damage', amount: 1 }] },
  '168': { cost: c(0, 0, 0, 1), effects: [{ do: 'loseGoods', amount: 4, who: 'opponent' }, { do: 'damage', amount: 1 }] },
  '169': { cost: c(0, 0, 0, 0, 2), effects: [{ do: 'destroy', what: 'Infrastructure', who: 'opponent', count: 1 }, { do: 'damage', amount: 2 }] },
  '170': { cost: c(0, 0, 0, 1), effects: [{ do: 'drain', resource: 'Capital', amount: 3, who: 'opponent' }, { do: 'damage', amount: 2 }] },
  '171': { cost: c(0, 2, 0, 0, 1), effects: [{ do: 'disable', what: 'Workforce', who: 'opponent', count: 3, turns: 2 }, { do: 'damage', amount: 2 }] },
  '172': { cost: c(0, 0, 0, 0, 1), effects: [{ do: 'discard', amount: 2, who: 'opponent' }, { do: 'damage', amount: 2 }] },
  '173': { cost: c(0, 1), effects: [{ do: 'disable', what: 'Fleet', who: 'opponent', count: 2, turns: 1 }, { do: 'damage', amount: 2 }] },
  '174': { cost: c(0, 0, 0, 0, 1), effects: [{ do: 'loseGoods', amount: 2, who: 'opponent' }, { do: 'drain', resource: 'Capital', amount: 1, who: 'opponent' }, { do: 'damage', amount: 2 }] },
  '175': { cost: c(0, 0, 1, 0, 1), effects: [{ do: 'destroy', what: 'Infrastructure', who: 'opponent', count: 1 }, { do: 'damage', amount: 2 }] },

  '176': { cost: c(0, 0, 0, 0, 2), effects: [{ do: 'disable', what: 'Fleet', who: 'opponent', count: 2, turns: 2 }, { do: 'damage', amount: 1 }] },
  '177': { cost: c(0, 0, 0, 1), effects: [{ do: 'loseGoods', amount: 2, who: 'opponent' }, { do: 'damage', amount: 2 }] },
  '178': { cost: c(0, 0, 0, 2, 2), effects: [{ do: 'mill', amount: 3, who: 'both' }, { do: 'drain', resource: 'all', amount: 2, who: 'both' }, { do: 'damage', amount: 3 }] },
  '179': { cost: c(0, 0, 0, 2), effects: [{ do: 'drain', resource: 'all', amount: 1, who: 'opponent' }, { do: 'damage', amount: 2 }] },
  '180': { cost: c(0, 0, 0, 1), effects: [{ do: 'disable', what: 'Infrastructure', who: 'opponent', count: 1, turns: 2 }, { do: 'drain', resource: 'Data', amount: 1, who: 'opponent' }, { do: 'damage', amount: 2 }] },
  '181': { cost: c(0, 0, 0, 0, 2), effects: [{ do: 'destroy', what: 'Infrastructure', who: 'opponent', count: 1 }, { do: 'loseGoods', amount: 2, who: 'opponent' }, { do: 'damage', amount: 2 }] },
  '182': { cost: c(0, 2), effects: [{ do: 'disable', what: 'Workforce', who: 'opponent', count: 2, turns: 2 }, { do: 'damage', amount: 1 }] },
  '183': { cost: c(0, 0, 0, 3), effects: [{ do: 'disable', what: 'Infrastructure', who: 'opponent', count: 3, turns: 2 }, { do: 'damage', amount: 2 }] },
  '184': { cost: c(0, 0, 2, 0, 2), effects: [{ do: 'destroy', what: 'Infrastructure', who: 'opponent', count: 1 }, { do: 'destroy', what: 'Fleet', who: 'opponent', count: 1 }, { do: 'mill', amount: 2, who: 'both' }, { do: 'damage', amount: 3 }] },
  '185': { cost: c(0, 0, 0, 0, 3), effects: [{ do: 'destroy', what: 'Infrastructure', who: 'both', count: 1, pick: 'highestCost' }, { do: 'destroy', what: 'Fleet', who: 'both', count: 1, pick: 'highestCapacity' }, { do: 'damage', amount: 2 }] }
};

/**
 * Contract clauses, rewritten so every requirement is stated on the card and
 * nothing is derived from the global pool. `cargo` is the Goods consumed on
 * fulfillment - this is the consumption cost that makes delivery non-free.
 *
 * BALANCE PASS 2 - delivery is the spine.
 * Measured: combat won 46% of games and the 10 FP race won 31%, in a game
 * about moving goods. Three printed values on these 15 cards were wrong.
 *
 *   fpReward  A Common Contract now pays 3 and a Mythic pays 7, so the 10 FP
 *             race is three or four fulfilled Contracts rather than five. At
 *             2 FP a Common, a delivery deck needed five successful deliveries
 *             to win while an aggro deck needed roughly seven attack steps.
 *   cargo     Was 1-5 Goods; now 1-4. A Contract whose Cargo exceeds the
 *             Capacity of the Fleet clause that satisfies it can only be paid
 *             over two trips, which turned every delivery into a two-turn
 *             commitment. Cargo is now payable by one loaded Fleet.
 *   clauses   Air (5 cards), Rail (4) and Digital (3) are the scarcest
 *             subtypes in the set, and 187/192/197/198/200 stacked them on top
 *             of Capacity, Speed and Workforce clauses. The scarce-subtype
 *             clause is kept as the card's identity, and the clauses piled on
 *             beside it are cut. Measured unmet-clause counts drove each cut.
 */
var CONTRACTS = {
  '186': { cost: c(0,0,1), requirements: { fleetCards: 1, fleetSpeed: 3 }, cargo: 2, fpReward: 2 },
  '187': { cost: c(0,1,0,0,1), requirements: { fleetCards: 1, infrastructureSubtypes: ['Hub'] }, cargo: 4, fpReward: 2 },
  '188': { cost: c(1,0,1), requirements: { fleetCards: 1, fleetSubtypes: ['Vehicle'], infrastructureSubtypes: ['Storage'] }, cargo: 3, fpReward: 2 },
  '189': { cost: c(0,0,0,1), requirements: { fleetCards: 2 }, cargo: 3, fpReward: 2 },
  '190': { cost: c(1,1), requirements: { fleetCards: 1, fleetCapacity: 4, workforce: 2 }, cargo: 4, fpReward: 2 },
  '191': { cost: c(1,1), requirements: { fleetCards: 1, workforceSubtypes: ['Specialist'] }, cargo: 2, fpReward: 1 },
  '192': { cost: c(1,0,0,1), requirements: { fleetCards: 1, fleetSubtypes: ['Air'] }, cargo: 3, fpReward: 2 },
  '193': { cost: c(1), requirements: { fleetCards: 1 }, cargo: 2, fpReward: 1 },
  '194': { cost: c(0,0,0,1), requirements: { fleetCards: 1, infrastructureSubtypes: ['Storage'] }, cargo: 3, fpReward: 2 },
  '195': { cost: c(0,1,1), requirements: { fleetCards: 1, fleetSubtypes: ['Ship'], workforce: 2 }, cargo: 3, fpReward: 2 },
  '196': { cost: c(1,0,1,1), requirements: { fleetCards: 1, fleetSpeed: 3 }, cargo: 3, fpReward: 2 },
  '197': { cost: c(0,1,0,1,1), requirements: { fleetCards: 1, fleetSubtypes: ['Rail'], infrastructureSubtypes: ['Facility'] }, cargo: 4, fpReward: 2 },
  '198': { cost: c(1,0,1,1), requirements: { fleetCards: 2, fleetSpeed: 3, infrastructureSubtypes: ['Storage'] }, cargo: 4, fpReward: 2 },
  '199': { cost: c(1,1,0,1), requirements: { fleetCards: 3, workforce: 3 }, cargo: 5, fpReward: 3 },
  '200': { cost: c(2,1,0,1,1), requirements: { fleetCards: 2, fleetSubtypes: ['Vehicle', 'Ship'], infrastructureSubtypes: ['Facility', 'Hub'], workforce: 3 }, cargo: 5, fpReward: 3 }
};


// ---------------------------------------------------------------------------
// Permanent abilities. 89 cards printed a "Tap:" ability; these give them a
// mechanical meaning derived from what the card is.
// ---------------------------------------------------------------------------
var WORKFORCE_TAP = {
  Worker: [{ do: 'goods', amount: 1 }],
  Specialist: [{ do: 'cargoDiscount', amount: 1 }],
  Executive: [{ do: 'gain', resource: 'Capital', amount: 1 }],
  Digital: [{ do: 'gain', resource: 'Data', amount: 1 }]
};

function buildEffects(card) {
  var effects = [];
  if (card.type === 'Infrastructure') {
    var produced = PRODUCES[card.id];
    var res = produced === 'ALL' ? 'any' : produced;
    // Refinery step: turn a stored Good into the resource this site makes.
    effects.push({
      trigger: 'tap',
      condition: null,
      action: [{ do: 'goods', amount: -1 }, { do: 'gain', resource: res, amount: 1 }]
    });
  } else if (card.type === 'Workforce') {
    var tap = WORKFORCE_TAP[card.subtype];
    if (tap) effects.push({ trigger: 'tap', condition: null, action: tap });
  } else if (card.type === 'Operations') {
    effects.push({ trigger: 'cast', condition: null, action: OPERATIONS[card.id] || [{ do: 'draw', amount: 1 }] });
  } else if (card.type === 'Disruptions') {
    var d = DISRUPTIONS[card.id];
    effects.push({ trigger: 'cast', condition: null, action: d ? d.effects : [{ do: 'damage', amount: 1 }] });
  }
  return effects;
}

// ---------------------------------------------------------------------------
// rulesText is GENERATED from effects, so printed text cannot drift from
// engine behavior. This is the fix for "200 designs, six behaviors".
// ---------------------------------------------------------------------------
function whoLabel(who) {
  if (who === 'opponent') return 'opponent';
  if (who === 'both') return 'each player';
  return 'you';
}

function describeAtom(a) {
  var n = a.amount;
  switch (a.do) {
    case 'damage': return 'Deal ' + n + ' damage to opposing Supply Chain Health';
    case 'heal': return 'Restore ' + n + ' Supply Chain Health';
    case 'gain': return 'Gain ' + n + ' ' +
      (a.resource === 'any' ? (n === 1 ? 'resource of any type' : 'resources of any type') : a.resource) +
      (a.perKeyword ? ', plus 1 for each ' + a.perKeyword + ' card you control' : '');
    case 'drain': return whoLabel(a.who) + ' loses ' + n + ' ' + (a.resource === 'all' ? 'of each resource' : a.resource);
    case 'draw': return (a.who === 'opponent' ? 'Opponent draws ' : 'Draw ') + n + ' card' + (n === 1 ? '' : 's');

    case 'discard': return whoLabel(a.who) + ' discard' + (a.who === 'opponent' ? 's' : '') + ' ' + n + ' card' + (n === 1 ? '' : 's');
    case 'mill': return whoLabel(a.who) + ' mills ' + n + ' card' + (n === 1 ? '' : 's');
    case 'fp': return 'Gain ' + n + ' Fulfillment Point' + (n === 1 ? '' : 's');
    case 'goods': return n < 0 ? 'Remove ' + (-n) + ' Goods from your Source Zone'
      : 'Add ' + n + ' Goods to Infrastructure you control';
    case 'loseGoods': return whoLabel(a.who) + ' loses ' + n + ' Goods';
    case 'destroy': return 'Destroy ' + a.count + ' ' + a.what + (a.pick === 'highestCost' ? ' with the highest cost' : '') +
      (a.pick === 'highestCapacity' ? ' with the highest Capacity' : '') + ' ' + whoLabel(a.who) + ' control' + (a.who === 'opponent' ? 's' : '');
    case 'disable': return 'Disable ' + a.count + ' ' + a.what + ' ' + whoLabel(a.who) +
      ' control' + (a.who === 'opponent' ? 's' : '') + ' for ' + a.turns + ' turn' + (a.turns === 1 ? '' : 's');
    case 'untap': return 'Untap all ' + a.what + ' you control';
    case 'buff': return 'Your Infrastructure permanently produces +' + n + ' ' + (a.stat === 'goods' ? 'Goods' : 'resource');
    case 'shield': return 'Prevent the next Disruption targeting you for ' + a.turns + ' turn' + (a.turns === 1 ? '' : 's');
    case 'extraTransit': return 'Take ' + n + ' extra Transit action' + (n === 1 ? '' : 's') + ' this turn';
    case 'cargoDiscount': return 'Reduce the Cargo required by your Contracts by ' + n + ' this turn';
    default: return a.do;
  }
}

function describeEffects(effects) {
  var parts = [];
  for (var i = 0; i < effects.length; i++) {
    var e = effects[i];
    var body = e.action.map(describeAtom).join('. ');
    var prefix = e.trigger === 'tap' ? 'Tap: ' : (e.trigger === 'deploy' ? 'Deploy: ' : '');
    parts.push(prefix + body + '.');
  }
  return parts.join(' ');
}

function produceText(card, produces, goods) {
  var bits = [];
  for (var i = 0; i < R.length; i++) {
    if (produces[R[i]]) bits.push(produces[R[i]] + ' ' + R[i]);
  }
  if (!bits.length) return '';
  return 'Upkeep: Produce ' + bits.join(', ') + ' and ' + goods + ' Goods (up to Capacity ' +
    (card.stats && card.stats.capacity ? card.stats.capacity : 0) + ').';
}

function keywordText(card) {
  var kw = card.keywords || [];
  return kw.length ? kw.join(', ') + '.' : '';
}


/** "Vehicle, Ship and Air" - printed prose, not a JSON array. */
function andList(items) {
  if (items.length === 1) return items[0];
  return items.slice(0, -1).join(', ') + ' and ' + items[items.length - 1];
}

/** "a Rail Fleet" but "an Air Fleet". Printed cards get read aloud. */
function article(word) {
  return /^[AEIOU]/i.test(word) ? 'an' : 'a';
}

/**
 * Printed Contract text.
 *
 * Kept deliberately tight because this text has to fit a physical text box.
 * The clause every Contract shared - "the Fleet used returns to your Network
 * Zone exhausted" - is a GLOBAL rule and now lives once in the rulebook
 * (Glossary.GLOBAL_RULES) instead of being reprinted on all 15 cards. It is
 * still explicit; it is just not paid for in card-face space 15 times.
 */
function contractText(reqs, cargo, fp) {
  var parts = [];
  if (reqs.fleetCards) parts.push(reqs.fleetCards + ' Fleet in Customer Zone');
  if (reqs.fleetCapacity) parts.push('Capacity ' + reqs.fleetCapacity + '+ total');
  if (reqs.fleetSpeed) parts.push('a Speed ' + reqs.fleetSpeed + '+ Fleet');
  if (reqs.fleetSubtypes) {
    parts.push(article(reqs.fleetSubtypes[0]) + ' ' + andList(reqs.fleetSubtypes) + ' Fleet');
  }
  if (reqs.infrastructureSubtypes) {
    parts.push(article(reqs.infrastructureSubtypes[0]) + ' ' +
      andList(reqs.infrastructureSubtypes) + ' Infrastructure');
  }
  if (reqs.workforce) parts.push(reqs.workforce + ' Workforce');
  if (reqs.workforceSubtypes) {
    parts.push(article(reqs.workforceSubtypes[0]) + ' ' + andList(reqs.workforceSubtypes) + ' Workforce');
  }
  return 'Delivery: Requires ' + parts.join('; ') + '. Consumes ' + cargo +
    ' Goods. Reward ' + fp + ' FP.';
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function convert(card) {
  var out = {
    id: card.id,
    name: card.name,
    type: card.type,
    subtype: card.subtype,
    rarity: card.rarity,
    cost: null,
    stats: card.stats ? repriceWorkforce(card) : null,
    keywords: card.keywords || [],
    rulesText: '',
    loreText: normalizeText(card.abilities),
    flavorText: card.flavorText,
    effects: []
  };

  var cost;
  if (card.type === 'Infrastructure') {
    cost = repriceInfrastructure(card);
  } else {
    cost = zeroCost();
    for (var i = 0; i < R.length; i++) cost[R[i]] = card.cost[R[i]] || 0;
    if (card.type === 'Disruptions') {
      var d = DISRUPTIONS[card.id];
      cost = d && d.cost ? d.cost : c(0, 0, 0, 0, 1);
    } else if (card.type === 'Operations' && OPERATION_COSTS[card.id]) {
      cost = OPERATION_COSTS[card.id];
    }
    if ((card.keywords || []).indexOf('Fragile') !== -1 && cost.Capital > 0) {
      cost.Capital -= 1;
    }
  }
  out.cost = cost;
  out.effects = buildEffects(card);


  var text = [];
  if (card.type === 'Infrastructure') {
    out.produces = buildProduces(card);
    out.goods = buildGoods(card);
    text.push(produceText(card, out.produces, out.goods));
    text.push(describeEffects(out.effects));
  } else if (card.type === 'Contracts') {
    var cd = CONTRACTS[card.id];
    // A Contract is the win condition; if it is not castable it is not a card.
    if (cd.cost) out.cost = cd.cost;
    out.requirements = cd.requirements;
    out.cargo = cd.cargo;
    out.fpReward = cd.fpReward;
    text.push(contractText(cd.requirements, cd.cargo, cd.fpReward));
  } else if (card.type === 'Fleet') {
    text.push('Transit: Move to your Customer Zone carrying up to ' + card.stats.capacity +
      ' Goods. Costs 1 Fuel' + ((card.keywords || []).indexOf('Sustainable') !== -1 ? ' (waived: Sustainable)' :
        ' (waived on your first Transit each turn)') +
      ' and a crew' + ((card.keywords || []).indexOf('Automated') !== -1 ? ' (waived: Automated)' : '') + '.');
  } else {
    text.push(describeEffects(out.effects));
  }
  var kw = keywordText(card);
  if (kw) text.unshift(kw);
  out.rulesText = text.filter(function(t) { return t; }).join(' ');
  return out;
}

function main() {
  var source = require(SOURCE);
  var cards = source.map(convert);

  var lines = [];
  lines.push('/**');
  lines.push(' * SUPPLY CHAIN: The Gathering - card set (200 cards).');
  lines.push(' *');
  lines.push(' * GENERATED FILE. Edit js/card-data.source.js (authored design text) or');
  lines.push(' * tools/build-card-data.js (mechanical tables), then run:');
  lines.push(' *   node tools/build-card-data.js');
  lines.push(' *');
  lines.push(' * Field notes:');
  lines.push(' *   produces  - resources yielded each Upkeep. Independent of cost.');
  lines.push(' *   goods     - Goods yielded each Upkeep, capped by stats.capacity.');
  lines.push(' *   effects   - { trigger, condition, action } read by js/rules.js.');
  lines.push(' *   rulesText - generated from effects; authoritative on the card face.');
  lines.push(' *   loreText  - original design text, kept for flavor and intent.');
  lines.push(' */');
  lines.push('(function(root, factory) {');
  lines.push('  if (typeof module !== \'undefined\' && module.exports) {');
  lines.push('    module.exports = factory();');
  lines.push('  } else {');
  lines.push('    root.CardData = factory();');
  lines.push('  }');
  lines.push('}(typeof window !== \'undefined\' ? window : this, function() {');
  lines.push('  \'use strict\';');
  lines.push('  return [');
  for (var i = 0; i < cards.length; i++) {
    var json = JSON.stringify(cards[i], null, 2).split('\n').map(function(l) { return '    ' + l; }).join('\n');
    lines.push(json + (i < cards.length - 1 ? ',' : ''));
  }
  lines.push('  ];');
  lines.push('}));');
  fs.writeFileSync(OUTPUT, lines.join('\n') + '\n');
  console.log('Wrote ' + OUTPUT + ' (' + cards.length + ' cards)');
}

main();
