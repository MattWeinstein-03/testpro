/**
 * Policies used by the batch simulator.
 *
 * Each policy is `function(state, actions, rng) -> action`. They exist to make
 * balance claims measurable: if "Disruption spam" is still the dominant line,
 * the `disruption` policy will show it in the win table.
 */
(function(root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(require('../js/rules.js'));
  } else {
    root.Policies = factory(root.Rules);
  }
}(typeof window !== 'undefined' ? window : this, function(Rules) {
  'use strict';

  function cardOf(state, action) {
    var p = state.players[action.actor];
    if (action.k === 'play') return p.hand[action.hand];
    if (action.k === 'tap' || action.k === 'transit' || action.k === 'attack') {
      return Rules.find(p.source, action.uid) || Rules.find(p.network, action.uid);
    }
    return null;
  }

  /** Untapped Workforce left if we tap this one - they are our blockers. */
  function blockersLeft(state, action) {
    var p = state.players[action.actor];
    return p.network.filter(function(c) {
      return c.type === 'Workforce' && !c.attacked && c.disabledFor === 0 && c.uid !== action.uid;
    }).length;
  }

  function threatLevel(state, actor) {
    var opp = state.players[1 - actor];
    return opp.network.filter(function(c) { return c.type === 'Workforce'; })
      .reduce(function(n, c) { return n + (c.stats.power || 0); }, 0);
  }

  /** Shared scoring; weights differ per policy. */
  function score(state, action, weights) {
    var p = state.players[action.actor];
    var card = cardOf(state, action);
    switch (action.k) {
      case 'fulfill': return 1000 + (action.fp || 0);
      case 'transit': return 400;
      case 'play':
        if (!card) return 0;
        return (weights[card.type] || 10) - Rules.totalCost(card);
      case 'tap':
        // Tapping a Workforce for value costs you a Fleet crew, and tapping an
        // Infrastructure spends the Goods a Fleet would have carried. A skilled
        // line therefore taps in Main Phase 2, after Transit and Delivery.
        if (Rules.PHASES[state.phase] === 'Main Phase 1') return -1000;
        // ...and holds back enough Workforce to block what is coming back.
        if (card && card.type === 'Workforce' && threatLevel(state, action.actor) > 0 &&
            blockersLeft(state, action) < weights.blockReserve) return -1000;
        return weights.tap;
      case 'attack': return weights.attack;
      case 'block': return weights.block;
      case 'requisition': return weights.requisition;
      case 'doneBlocking': return -1;
      case 'nextPhase': return -100;
      default: return 0;
    }
  }

  function makePolicy(weights) {
    return function(state, actions, rng) {
      var best = null, bestScore = -Infinity;
      for (var i = 0; i < actions.length; i++) {
        var s = score(state, actions[i], weights) + rng.next() * 0.5;
        if (s > bestScore) { bestScore = s; best = actions[i]; }
      }
      return best;
    };
  }


  var POLICIES = {
    /** Builds a delivery engine: Infrastructure first, then Fleet and Contracts. */
    delivery: makePolicy({
      Infrastructure: 90, Contracts: 80, Fleet: 70, Workforce: 60,
      Operations: 30, Disruptions: 20,
      tap: 25, attack: 5, block: 50, requisition: 1, blockReserve: 2
    }),
    /** Attacks with Workforce and burns the opponent down. */
    aggro: makePolicy({
      Workforce: 90, Infrastructure: 60, Disruptions: 55, Fleet: 30,
      Operations: 25, Contracts: 20,
      tap: 10, attack: 200, block: 40, requisition: 1, blockReserve: 0
    }),
    /** The old degenerate line: lead on Disruptions. */
    disruption: makePolicy({
      Disruptions: 200, Infrastructure: 70, Operations: 30, Workforce: 25,
      Fleet: 20, Contracts: 15,
      tap: 10, attack: 60, block: 40, requisition: 1, blockReserve: 1
    }),
    /** Resource engine: maximum Infrastructure, taps everything. */
    engine: makePolicy({
      Infrastructure: 120, Operations: 60, Contracts: 55, Fleet: 45,
      Workforce: 40, Disruptions: 10,
      tap: 60, attack: 20, block: 50, requisition: 1, blockReserve: 2
    }),
    /** Generic "play everything affordable" baseline. */
    greedy: makePolicy({
      Infrastructure: 80, Workforce: 70, Fleet: 70, Contracts: 70,
      Operations: 60, Disruptions: 60,
      tap: 30, attack: 120, block: 50, requisition: 1, blockReserve: 1
    }),
    /** Control: uniform random legal action. */
    random: function(state, actions, rng) {
      return actions[rng.int(actions.length)];
    }
  };

  return { POLICIES: POLICIES, NAMES: Object.keys(POLICIES), makePolicy: makePolicy };
}));
