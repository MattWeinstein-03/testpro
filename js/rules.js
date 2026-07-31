/**
 * SUPPLY CHAIN: The Gathering - rules core.
 *
 * Pure: no `document`, no globals, no timers. Every random decision comes from
 * the seeded RNG carried in state, so `createGame({seed})` plus a list of
 * actions replays a game exactly. The view (js/playtest.js) and the batch
 * simulator (sim/simulate.js) are both clients of this file.
 *
 *   card-data.js --> rules.js (pure) --> playtest.js (DOM)
 *                        ^
 *                        +------------- sim/simulate.js (headless)
 */
(function(root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(require('./glossary.js'), require('./rng.js'), require('./effects.js'));
  } else {
    root.Rules = factory(root.Glossary, root.Rng, root.Effects);
  }
}(typeof window !== 'undefined' ? window : this, function(Glossary, Rng, Effects) {
  'use strict';

  var PHASES = Glossary.PHASES;
  var R = Glossary.RESOURCES;

  /**
   * The printed global dials. BALANCE PASS 2 changed five of them, and each
   * change is stated in Glossary.GLOBAL_RULES because a dial the engine reads
   * and the rulebook does not print is a rule a player at a table cannot know.
   *
   *   drawPerTurn 2 -> 3   The single biggest lever in the pass. At two draws a
   *                        turn the average game ran 30 turns and a delivery
   *                        deck spent the first seven of them waiting for its
   *                        second Fleet. Three draws took the mean game from
   *                        29.6 turns to 20.3 and took Contracts fulfilled per
   *                        player from 1.6 to 3.3.
   *   baseIncome  2 -> 3   The ramp, for the same reason: one more Capital a
   *                        turn is one more early Infrastructure, and the
   *                        delivery engine is built out of Infrastructure.
   *   deckSize   50 -> 52  Follows the draw step; see DECK_MINIMUMS below.
   *   soakPerTurn 2 -> 1   Stored Goods soaked so much damage that combat won
   *                        21% of games. One is still a buffer; two was armour.
   *   freeTransits    1    New printed rule: your first Transit each turn costs
   *                        no Fuel.
   */
  var DEFAULTS = {
    startingHealth: 20,
    winFp: 10,
    maxHand: 7,
    deckSize: 52,
    openingHand: 7,
    drawPerTurn: 3,         // three cards a turn keeps a table game moving
    baseIncome: 3,          // Capital per Upkeep before any Infrastructure
    /**
     * Plus 1 resource of the player's choice each Upkeep. At a table this is
     * "take 3 Capital and any 1 resource". It is what stops a hand of Labor
     * cards from being dead before your first Labor producer lands, and it is
     * the difference between a 31% and a 50% castable hand.
     */
    flexIncome: 1,
    /**
     * Resources are neither a pure per-turn refresh nor an unbounded bank. At
     * End Step you keep up to `reserveLimit` of each resource and return the
     * rest. Banking gave the old build 60 idle Capital; a hard refresh made any
     * 2-Fuel card unpayable without two Fuel producers. A small reserve lets a
     * player save toward one expensive card without costs ever ceasing to
     * matter - and at a table it is just "discard down to 3 of each".
     */
    reserveLimit: 3,
    transitBudget: 3,       // Fleet movements per turn before Operations
    soakPerTurn: 1,         // damage absorbed by stored Goods each turn
    transitFuel: 1,         // Fuel per transit, waived by Sustainable
    /**
     * The first Transit of your turn pays no Fuel - a standing haulage
     * agreement. Measured: Fuel was the single most common reason a Fleet sat
     * in the Network Zone doing nothing (326 blocked movements across 60
     * games, more than crew, readiness and the Transit budget combined), and
     * a delivery deck that cannot move cannot use the game's primary win
     * condition. The exemption is deliberately the FIRST movement only, so
     * running a wide fleet still costs Fuel and Fuel-producing Infrastructure
     * still matters. It is printed in Glossary.GLOBAL_RULES.
     */
    freeTransits: 1,
    halfTurnLimit: 400      // hard stop; deck-out normally ends games first
  };

  /**
   * Deck recipes, 52 cards each - the printed deck size, and yes, the size of
   * a deck of playing cards.
   *
   * It was 50 at two draws a turn. At three draws a turn, 50 put the empty-deck
   * wall inside the body of a normal game and exhaustion decided 10% of
   * results; 60 pushed the wall past the end of almost every game and dropped
   * exhaustion to 1%, which sounds better but is worse: with the Fulfillment
   * race capped at 60% of wins and combat at 35%, something has to decide the
   * remaining games, and a deck that never runs out means a grindy stalemate
   * has no clock at all. 52 puts the wall just past the long tail: 5-7% of
   * games end there, and a player who neither delivers nor attacks loses to
   * their own inventory running dry. Every recipe below sums to exactly 52.
   */
  /**
   * BALANCE PASS 2. These are printed deck lists, so a recipe is as much a
   * balance lever as a card's cost - and two of them were unwinnable.
   *
   *   disruption ran 18 Disruptions, 6 Workforce and 4 Contracts: it could
   *     dismantle a supply chain and then had nothing to win with. It measured
   *     33.9%. It now runs 10 Disruptions and 8 Contracts - still the densest
   *     Disruption deck in the box, but with a clock of its own.
   *   engine ran 4 Contracts on 18 Infrastructure: it built the best economy
   *     in the game and could not spend it. 33.3%. Now 9 Contracts and 10
   *     Fleet, paid for out of Infrastructure and Disruptions.
   *   aggro measured 70.3% on 18 Workforce. Now 15, and the freed slots go to
   *     Fleet and Contracts, so an aggro deck that wants to race also has to
   *     load cargo.
   *   every deck now carries at least 7 Contracts and 8 Fleet, because a deck
   *     with no delivery package cannot use the game's primary win condition.
   */
  var DECK_MINIMUMS = {
    balanced:  { Infrastructure: 12, Workforce: 10, Fleet: 11, Operations: 6, Disruptions: 4, Contracts: 9 },
    delivery:  { Infrastructure: 12, Workforce: 12, Fleet: 11, Operations: 3, Disruptions: 3, Contracts: 11 },
    aggro:     { Infrastructure: 10, Workforce: 15, Fleet: 8, Operations: 5, Disruptions: 7, Contracts: 7 },
    engine:    { Infrastructure: 16, Workforce: 10, Fleet: 10, Operations: 5, Disruptions: 2, Contracts: 9 },
    disruption:{ Infrastructure: 11, Workforce: 10, Fleet: 9, Operations: 4, Disruptions: 10, Contracts: 8 }
  };

  // ---------------------------------------------------------------------------
  // Small helpers
  // ---------------------------------------------------------------------------
  function zeroRes() {
    var o = {};
    for (var i = 0; i < R.length; i++) o[R[i]] = 0;
    return o;
  }

  function hasKw(card, kw) {
    return (card.keywords || []).indexOf(kw) !== -1;
  }


  /**
   * TABLETOP CONSTRAINT: this game ships as physical cards, so every piece of
   * runtime state below must be representable at a table.
   *   goods       -> Goods tokens placed on the card
   *   tapped      -> the card is rotated 90 degrees
   *   damage      -> damage counters, cleared at end of turn
   *   disabledFor -> a Disabled marker with a countdown, removed at Upkeep
   *   readyTurn   -> the card arrived this turn; it is "unpacked" next Upkeep
   * Nothing here requires arithmetic a player cannot do in their head.
   */
  function instance(card, uid) {
    var c = JSON.parse(JSON.stringify(card));
    c.uid = uid;
    c.tapped = false;
    c.stored = 0;      // Goods tokens sitting on this Infrastructure
    c.carrying = 0;    // Goods tokens loaded onto this Fleet
    c.damage = 0;
    c.attacked = false;
    c.disabledFor = 0;
    c.ready = false;
    return c;
  }

  function isReady(card) {
    return card.ready && !card.tapped && card.disabledFor === 0;
  }

  /**
   * Any Workforce that did not attack this turn may block, tapped or not.
   *
   * This is deliberately not the Magic rule. Crewing a Fleet and working a Tap
   * ability both tap a Workforce, and those are exactly the things a delivery
   * deck must do every turn. Requiring untapped blockers meant building a
   * supply chain was the same as leaving the door open, and the measured result
   * was an 80% win rate for a wall of cheap Workforce. Crewing now costs you
   * offense, not defense. At a table: "a crew on shift still defends the depot;
   * only Workforce that attacked cannot block."
   */
  function canBlockWith(card) {
    if (card.disabledFor !== 0) return false;
    if (card.type === 'Workforce') return !card.attacked;
    // Fleet parked in the Network Zone can form a barricade: Power 0 and the
    // printed barricade Toughness of 2 (see blockToughness - it used to be the
    // Fleet's Capacity, which made a 12-Capacity hauler an unkillable wall).
    // A delivery deck still defends with the cards it was already playing,
    // which is the structural answer to a wall of cheap Workforce, but a real
    // attacker can now break through and take the hauler with it.
    return card.type === 'Fleet' && !card.tapped;
  }

  function blockPower(card) {
    return card.stats && card.stats.power !== undefined ? card.stats.power : 0;
  }

  /**
   * Toughness for combat. A Fleet has no printed Toughness, so a barricading
   * Fleet uses the printed barricade value of 2 - NOT its Capacity.
   *
   * Capacity was the wrong number: the set contains Fleet with Capacity 8, 10
   * and 12, so a delivery deck's biggest hauler was also an unkillable wall,
   * and combat measured 21% of wins against a 70% Fulfillment race. A flat 2
   * keeps the barricade a real answer to a swarm of 1-Power Workforce while
   * letting a serious attacker break through and take the hauler with it -
   * which is the pressure combat is supposed to apply to a supply chain.
   * Printed in Glossary.GLOBAL_RULES.
   */
  function blockToughness(card) {
    if (!card.stats) return 1;
    if (card.stats.toughness !== undefined) return card.stats.toughness;
    return 2;
  }

  function isActive(card) {
    // Disabled Infrastructure still produces if it is Automated.
    return card.disabledFor === 0 || hasKw(card, 'Automated');
  }

  function permanents(player) {
    return player.source.concat(player.network, player.customer);
  }

  function buffValue(player, type, stat) {
    var total = 0;
    for (var i = 0; i < player.buffs.length; i++) {
      var b = player.buffs[i];
      if (b.what === type && b.stat === stat) total += b.amount;
    }
    return total;
  }

  // ---------------------------------------------------------------------------
  // Deck building
  // ---------------------------------------------------------------------------
  /**
   * Build a deck from an archetype recipe. Duplicates are allowed (up to 3 of a
   * card, 1 for Legendary) so the rarity system and the singleton rule are
   * actually exercised - and so a printed deck list is buildable from boosters.
   */
  function buildDeck(pool, rng, opts) {
    opts = opts || {};
    var archetype = opts.archetype || 'balanced';
    var recipe = DECK_MINIMUMS[archetype] || DECK_MINIMUMS.balanced;
    var size = opts.size || DEFAULTS.deckSize;
    var maxCopies = opts.maxCopies || 3;


    var byType = {};
    pool.forEach(function(card) {
      (byType[card.type] = byType[card.type] || []).push(card);
    });

    var deck = [];
    var counts = {};
    function copiesAllowed(card) {
      return hasKw(card, 'Legendary') ? 1 : maxCopies;
    }
    function tryAdd(card) {
      var n = counts[card.id] || 0;
      if (n >= copiesAllowed(card)) return false;
      counts[card.id] = n + 1;
      deck.push(card);
      return true;
    }

    Object.keys(recipe).forEach(function(type) {
      var want = recipe[type];
      var candidates = rng.shuffle((byType[type] || []).slice());
      var guard = 0;
      while (want > 0 && candidates.length && guard++ < 500) {
        var card = candidates[rng.int(candidates.length)];
        if (tryAdd(card)) want--;
      }
    });

    var all = pool.slice();
    var guard2 = 0;
    while (deck.length < size && guard2++ < 2000) {
      tryAdd(all[rng.int(all.length)]);
    }

    rng.shuffle(deck);
    return deck;
  }

  // ---------------------------------------------------------------------------
  // State construction
  // ---------------------------------------------------------------------------
  function createPlayer(name, archetype) {
    return {
      name: name,
      archetype: archetype || 'balanced',
      deck: [], hand: [], discard: [], exile: [],
      health: DEFAULTS.startingHealth,
      fp: 0,
      resources: zeroRes(),
      source: [], network: [], customer: [], contracts: [],
      buffs: [],
      shieldTurns: 0,
      cargoDiscount: 0,
      transitBudget: 0,
      freeTransitsLeft: 0,
      requisitionUsed: false,
      soakUsed: 0,
      turnStats: { contractsFulfilled: 0, goodsDelivered: 0 },
      played: {}
    };
  }


  function createGame(opts) {
    opts = opts || {};
    var pool = opts.pool || [];
    var seed = opts.seed === undefined ? 1 : opts.seed;
    var rng = Rng.create(seed);
    var config = {};
    Object.keys(DEFAULTS).forEach(function(k) { config[k] = DEFAULTS[k]; });
    Object.keys(opts.config || {}).forEach(function(k) { config[k] = opts.config[k]; });

    var names = opts.names || ['Player 1', 'Player 2'];
    var archetypes = opts.archetypes || ['balanced', 'balanced'];
    var state = {
      seed: seed,
      rng: rng,
      config: config,
      turn: 1,
      halfTurns: 1,
      currentPlayer: 0,
      phase: 0,
      players: [createPlayer(names[0], archetypes[0]), createPlayer(names[1], archetypes[1])],
      log: [],
      events: [],
      gameOver: false,
      winner: null,
      winReason: null,
      combat: { attackers: [], blocks: {}, awaiting: false },
      uidSeq: 1,
      firstDrawSkipped: false
    };

    for (var p = 0; p < 2; p++) {
      var player = state.players[p];
      var list = (opts.decks && opts.decks[p]) || buildDeck(pool, rng, { archetype: archetypes[p], size: config.deckSize });
      player.deck = list.map(function(card) { return instance(card, state.uidSeq++); });
      for (var i = 0; i < config.openingHand && player.deck.length; i++) {
        player.hand.push(player.deck.pop());
      }
    }

    log(state, '===== Game start: ' + state.players[0].name + ' (' + archetypes[0] + ') vs ' +
      state.players[1].name + ' (' + archetypes[1] + ') =====');
    log(state, '--- Turn 1: ' + state.players[0].name + ' --- Upkeep');
    enterPhase(state);
    return state;
  }

  function clone(state) {
    var copy = JSON.parse(JSON.stringify({
      seed: state.seed, config: state.config, turn: state.turn, halfTurns: state.halfTurns,
      currentPlayer: state.currentPlayer, phase: state.phase, players: state.players,
      log: state.log, gameOver: state.gameOver, winner: state.winner, winReason: state.winReason,
      combat: state.combat, uidSeq: state.uidSeq, firstDrawSkipped: state.firstDrawSkipped
    }));
    copy.rng = Rng.create(state.rng.seed);
    copy.events = [];
    return copy;
  }


  // ---------------------------------------------------------------------------
  // Logging / events
  // ---------------------------------------------------------------------------
  function log(state, msg) {
    state.log.push({ turn: state.turn, phase: PHASES[state.phase], msg: msg });
    if (state.log.length > 400) state.log = state.log.slice(-200);
    state.events.push(msg);
  }

  function other(state, player) {
    return state.players[state.players[0] === player ? 1 : 0];
  }

  // ---------------------------------------------------------------------------
  // State operations, injected into the effect interpreter
  // ---------------------------------------------------------------------------
  function makeOps(state) {
    var ops = {
      log: function(msg) { log(state, msg); },

      gain: function(player, res, n) {
        if (n <= 0) return;
        player.resources[res] += n;
        log(state, player.name + ' gains ' + n + ' ' + res);
      },

      /** "Resources of any type": spread evenly, remainder into Capital. */
      gainFlexible: function(player, n) {
        var order = ['Capital', 'Labor', 'Fuel', 'Data', 'Time'];
        for (var i = 0; i < n; i++) player.resources[order[i % order.length]] += 1;
        log(state, player.name + ' gains ' + n + ' resource(s) of choice');
      },

      drain: function(player, res, n) {
        var lost = Math.min(player.resources[res], n);
        player.resources[res] -= lost;
        if (lost) log(state, player.name + ' loses ' + lost + ' ' + res);
      },

      /**
       * Damage hits your inventory buffer before your Supply Chain Health.
       * Stored Goods soak 1 damage each - a rival capturing market share has to
       * burn through your stock first. This is what makes Goods a defensive
       * asset as well as the delivery currency. The per-turn buffer is 1, not
       * 2: at 2, combat could not get through a delivery deck's stockpile and
       * won only 21% of games, which made the second win condition ornamental.
       * Printed in Glossary.GLOBAL_RULES.
       * At a table: "remove Goods tokens first, then move the Health dial".
       */
      damage: function(player, n, source) {
        // The buffer is capped per turn, so it protects a delivery engine
        // without letting a stockpile become an unbreakable wall - and without
        // stripping the cargo the engine needs to score.
        var budget = Math.max(0, state.config.soakPerTurn - player.soakUsed);
        var soaked = 0;
        for (var i = 0; i < player.source.length && soaked < n && soaked < budget; i++) {
          while (player.source[i].stored > 0 && soaked < n && soaked < budget) {
            player.source[i].stored--; soaked++;
          }
        }
        player.soakUsed += soaked;
        var toHealth = n - soaked;
        player.health -= toHealth;
        log(state, player.name + ' takes ' + n + ' damage' + (source ? ' from ' + source.name : '') +
          (soaked ? ' - ' + soaked + ' absorbed by stored Goods' : '') +
          ' (Health ' + player.health + ')');
        checkWin(state);
      },

      addFp: function(player, n, source) {
        player.fp += n;
        log(state, player.name + ' gains ' + n + ' FP' + (source ? ' from ' + source.name : '') +
          ' (total ' + player.fp + ')');
        checkWin(state);
      },


      draw: function(player, n) {
        for (var i = 0; i < n; i++) {
          if (!player.deck.length) {
            // Deck-out is a loss. This is the termination guarantee: two 52
            // card decks and three draws per turn means every game ends.
            state.gameOver = true;
            state.winner = state.players[0] === player ? 1 : 0;
            state.winReason = player.name + ' ran out of cards';
            log(state, player.name + ' cannot draw - ' + player.name + ' loses');
            return;
          }
          var card = player.deck.pop();
          player.hand.push(card);
          log(state, player.name + ' draws ' + card.name);
        }
      },

      discard: function(player, n) {
        for (var i = 0; i < n && player.hand.length; i++) {
          // Discard the most expensive card: the physical rule is "player's
          // choice"; the engine picks deterministically so replays are stable.
          var idx = 0, worst = -1;
          for (var h = 0; h < player.hand.length; h++) {
            var t = totalCost(player.hand[h]);
            if (t > worst) { worst = t; idx = h; }
          }
          var card = player.hand.splice(idx, 1)[0];
          player.discard.push(card);
          log(state, player.name + ' discards ' + card.name);
        }
      },

      mill: function(player, n) {
        for (var i = 0; i < n && player.deck.length; i++) {
          player.discard.push(player.deck.pop());
        }
        log(state, player.name + ' mills ' + n);
      },

      addGoods: function(player, n) {
        var added = 0;
        for (var i = 0; i < player.source.length && added < n; i++) {
          var infra = player.source[i];
          var cap = infra.stats.capacity + buffValue(player, 'Infrastructure', 'capacity');
          while (infra.stored < cap && added < n) { infra.stored++; added++; }
        }
        if (added) log(state, player.name + ' stores ' + added + ' Goods');
        return added;
      },


      removeGoods: function(player, n, preferTransit) {
        var removed = 0;
        function fromTransit() {
          for (var f = 0; f < player.customer.length && removed < n; f++) {
            while (player.customer[f].carrying > 0 && removed < n) { player.customer[f].carrying--; removed++; }
          }
        }
        function fromStorage() {
          for (var i = 0; i < player.source.length && removed < n; i++) {
            while (player.source[i].stored > 0 && removed < n) { player.source[i].stored--; removed++; }
          }
        }
        if (preferTransit) { fromTransit(); fromStorage(); } else { fromStorage(); fromTransit(); }
        if (removed) log(state, player.name + ' loses ' + removed + ' Goods');
        return removed;
      },

      destroy: function(player, what, count, pick) {
        for (var n = 0; n < count; n++) {
          var zones = ['source', 'network', 'customer'];
          var best = null, bestZone = null, bestScore = -1;
          for (var z = 0; z < zones.length; z++) {
            var list = player[zones[z]];
            for (var i = 0; i < list.length; i++) {
              if (list[i].type !== what) continue;
              var score = pick === 'highestCapacity' ? (list[i].stats.capacity || 0) : totalCost(list[i]);
              if (score > bestScore) { bestScore = score; best = list[i]; bestZone = zones[z]; }
            }
          }
          if (!best) return;
          player[bestZone].splice(player[bestZone].indexOf(best), 1);
          player.discard.push(best);
          log(state, best.name + ' is destroyed (' + player.name + ')');
        }
      },

      disable: function(player, what, count, turns) {
        var done = 0;
        var zones = ['source', 'network', 'customer'];
        for (var z = 0; z < zones.length && done < count; z++) {
          var list = player[zones[z]];
          for (var i = 0; i < list.length && done < count; i++) {
            if (list[i].type !== what || list[i].disabledFor > 0) continue;
            list[i].disabledFor = turns;
            done++;
            log(state, list[i].name + ' is Disabled for ' + turns + ' turn(s) (' + player.name + ')');
          }
        }
      },

      untap: function(player, what) {
        permanents(player).forEach(function(card) {
          if (card.type === what) { card.tapped = false; card.ready = true; }
        });
        log(state, player.name + ' untaps all ' + what);
      },


      countKeyword: function(player, kw) {
        return permanents(player).filter(function(c) { return hasKw(c, kw); }).length;
      },

      countType: function(player, type) {
        return permanents(player).filter(function(c) { return c.type === type; }).length;
      }
    };
    return ops;
  }

  function ctxFor(state, playerIndex, card) {
    return {
      state: state,
      me: state.players[playerIndex],
      opp: state.players[1 - playerIndex],
      card: card,
      ops: makeOps(state)
    };
  }

  function totalCost(card) {
    var t = 0;
    for (var i = 0; i < R.length; i++) t += (card.cost[R[i]] || 0);
    return t;
  }

  // ---------------------------------------------------------------------------
  // Costs
  // ---------------------------------------------------------------------------
  function effectiveCost(player, card) {
    var cost = {};
    for (var i = 0; i < R.length; i++) cost[R[i]] = card.cost[R[i]] || 0;
    if (hasKw(card, 'Sustainable')) cost.Fuel = 0;   // Sustainable pays no Fuel
    return cost;
  }

  function canPay(player, card) {
    var cost = effectiveCost(player, card);
    for (var i = 0; i < R.length; i++) {
      if (cost[R[i]] > player.resources[R[i]]) return false;
    }
    return true;
  }

  /** Which resources are short, and by how much. Surfaced in the UI so a
   *  player can see "needs 2 Labor" instead of a flat "insufficient". */
  function missingResources(player, card) {
    var cost = effectiveCost(player, card);
    var missing = [];
    for (var i = 0; i < R.length; i++) {
      var short = cost[R[i]] - player.resources[R[i]];
      if (short > 0) missing.push({ resource: R[i], amount: short });
    }
    return missing;
  }


  function payCost(player, card) {
    var cost = effectiveCost(player, card);
    for (var i = 0; i < R.length; i++) player.resources[R[i]] -= (cost[R[i]] || 0);
  }

  // ---------------------------------------------------------------------------
  // Contracts
  // ---------------------------------------------------------------------------
  /**
   * Per-clause evaluation. Returns a list of { label, met } so the board can
   * show a player exactly which clause is blocking, and so nothing about a
   * contract's difficulty is derived from the global card pool.
   */
  function contractStatus(state, playerIndex, contract) {
    var player = state.players[playerIndex];
    var reqs = contract.requirements || {};
    var fleets = player.customer.filter(function(c) { return c.type === 'Fleet'; });
    var workers = player.network.filter(function(c) { return c.type === 'Workforce'; });
    var infra = player.source.filter(function(c) { return c.type === 'Infrastructure'; });
    var out = [];

    function countWith(list) {
      // Specialized counts twice when a Contract counts cards.
      return list.reduce(function(n, c) { return n + (hasKw(c, 'Specialized') ? 2 : 1); }, 0);
    }

    if (reqs.fleetCards !== undefined) {
      out.push({ label: reqs.fleetCards + ' Fleet in Customer Zone', met: countWith(fleets) >= reqs.fleetCards });
    }
    if (reqs.fleetCapacity !== undefined) {
      var cap = fleets.reduce(function(n, c) { return n + (c.stats.capacity || 0); }, 0);
      out.push({ label: 'Fleet Capacity ' + reqs.fleetCapacity + '+ (have ' + cap + ')', met: cap >= reqs.fleetCapacity });
    }
    if (reqs.fleetSpeed !== undefined) {
      out.push({
        label: 'a Fleet with Speed ' + reqs.fleetSpeed + '+',
        met: fleets.some(function(c) { return (c.stats.speed || 0) >= reqs.fleetSpeed; })
      });
    }
    // Specialized satisfies any Fleet subtype clause, exactly as Hub does for
    // Infrastructure. Measured: subtype clauses were the wall the delivery
    // clock kept hitting - Air (204 unmet), Ship (140), Vehicle (122) and Rail
    // (84) across 60 games - because an 11-Fleet deck drawn from a pool with
    // 5 Air and 4 Rail cards rarely has the named subtype in the Customer Zone
    // on the turn the Contract is in hand. Specialized is the printed answer:
    // a specialist carrier can take the job.
    (reqs.fleetSubtypes || []).forEach(function(sub) {
      out.push({
        label: sub + ' Fleet delivering',
        met: fleets.some(function(c) { return c.subtype === sub || hasKw(c, 'Specialized'); })
      });
    });
    (reqs.infrastructureSubtypes || []).forEach(function(sub) {
      out.push({
        label: sub + ' Infrastructure in Source Zone',
        // Hub satisfies any Infrastructure subtype clause.
        met: infra.some(function(c) { return c.subtype === sub || hasKw(c, 'Hub'); })
      });
    });
    if (reqs.workforce !== undefined) {
      out.push({ label: reqs.workforce + ' Workforce deployed', met: countWith(workers) >= reqs.workforce });
    }
    (reqs.workforceSubtypes || []).forEach(function(sub) {
      out.push({
        label: sub + ' Workforce deployed',
        met: workers.some(function(c) { return c.subtype === sub || hasKw(c, 'Specialized'); })
      });
    });


    var cargo = requiredCargo(player, contract);
    var delivered = fleets.reduce(function(n, c) { return n + c.carrying; }, 0);
    out.push({ label: cargo + ' Goods delivered (have ' + delivered + ')', met: delivered >= cargo });
    return out;
  }

  function requiredCargo(player, contract) {
    return Math.max(1, (contract.cargo || 1) - player.cargoDiscount);
  }

  function contractMet(state, playerIndex, contract) {
    return contractStatus(state, playerIndex, contract).every(function(c) { return c.met; });
  }

  /**
   * Fulfillment consumes Goods and exhausts the Fleet that carried them: the
   * Fleet returns to the Network Zone tapped and un-ready, so it cannot deliver
   * again next turn without being re-crewed. Delivery is no longer free.
   */
  function fulfillContract(state, playerIndex, uid) {
    var player = state.players[playerIndex];
    var idx = -1;
    for (var i = 0; i < player.contracts.length; i++) {
      if (player.contracts[i].uid === uid) idx = i;
    }
    if (idx < 0) return false;
    var contract = player.contracts[idx];
    if (!contractMet(state, playerIndex, contract)) return false;

    var need = requiredCargo(player, contract);
    var used = [];
    var fleets = player.customer.filter(function(c) { return c.type === 'Fleet' && c.carrying > 0; });
    fleets.sort(function(a, b) { return a.carrying - b.carrying; });
    for (var f = 0; f < fleets.length && need > 0; f++) {
      var take = Math.min(need, fleets[f].carrying);
      fleets[f].carrying -= take;
      need -= take;
      used.push(fleets[f]);
    }

    player.contracts.splice(idx, 1);
    player.discard.push(contract);
    used.forEach(function(fleet) {
      player.customer.splice(player.customer.indexOf(fleet), 1);
      fleet.tapped = true;
      fleet.ready = false;
      player.network.push(fleet);
    });
    player.turnStats.contractsFulfilled++;
    player.turnStats.goodsDelivered += requiredCargo(player, contract);
    log(state, player.name + ' fulfills ' + contract.name + ' (' + used.length + ' Fleet returned exhausted)');
    makeOps(state).addFp(player, contract.fpReward, contract);
    return true;
  }


  // ---------------------------------------------------------------------------
  // Phases
  // ---------------------------------------------------------------------------
  /**
   * enterPhase runs the effects of the phase you are ENTERING. The old engine
   * ran the phase you were leaving, so the indicator always named a phase whose
   * effects had not happened yet.
   */
  function enterPhase(state) {
    if (state.gameOver) return;
    var name = PHASES[state.phase];
    var player = state.players[state.currentPlayer];
    switch (name) {
      case 'Upkeep': runUpkeep(state, player); break;
      case 'Draw': runDraw(state, player); break;
      case 'Combat': state.combat = { attackers: [], blocks: {}, awaiting: false }; break;
      case 'End Step': runEndStep(state, player); break;
    }
  }

  function runUpkeep(state, player) {
    var ops = makeOps(state);
    player.cargoDiscount = 0;
    player.requisitionUsed = false;
    player.soakUsed = 0;
    player.transitBudget = state.config.transitBudget;
    player.freeTransitsLeft = state.config.freeTransits;
    player.turnStats = { contractsFulfilled: 0, goodsDelivered: 0 };
    if (player.shieldTurns > 0) player.shieldTurns--;

    permanents(player).forEach(function(card) {
      card.tapped = false;
      card.attacked = false;
      card.damage = 0;
      card.ready = true;                       // arrived last turn, now unpacked
      if (card.disabledFor > 0) card.disabledFor--;
    });

    player.resources.Capital += state.config.baseIncome;
    for (var fx = 0; fx < state.config.flexIncome; fx++) {
      var choice = mostNeededResource(player);
      player.resources[choice] += 1;
    }
    var produceBonus = buffValue(player, 'Infrastructure', 'produce');
    var goodsBonus = buffValue(player, 'Infrastructure', 'goods');

    var producedAny = false;
    player.source.forEach(function(infra) {
      if (infra.type !== 'Infrastructure' || !isActive(infra)) return;
      var any = false;
      for (var i = 0; i < R.length; i++) {
        var amount = infra.produces[R[i]] || 0;
        if (amount) { player.resources[R[i]] += amount + produceBonus; any = true; }
      }
      // Goods are physical tokens on the card, capped by printed Capacity.
      var cap = infra.stats.capacity + buffValue(player, 'Infrastructure', 'capacity');
      infra.stored = Math.min(cap, infra.stored + (infra.goods || 1) + goodsBonus);
      if (any) producedAny = true;
    });
    log(state, player.name + ' Upkeep: ' + describeResources(player.resources));
  }


  /**
   * The flexible Upkeep resource is the player's choice. The engine needs a
   * deterministic stand-in for that choice, so it picks the resource that the
   * cards in hand are most short of. The UI lets a human override it.
   */
  function mostNeededResource(player) {
    var deficit = zeroRes();
    player.hand.forEach(function(card) {
      for (var i = 0; i < R.length; i++) {
        var short = (card.cost[R[i]] || 0) - player.resources[R[i]];
        if (short > 0) deficit[R[i]] += short;
      }
    });
    var best = 'Capital', bestVal = -1;
    for (var i = 0; i < R.length; i++) {
      if (deficit[R[i]] > bestVal) { bestVal = deficit[R[i]]; best = R[i]; }
    }
    return bestVal <= 0 ? 'Capital' : best;
  }

  function describeResources(res) {
    var bits = [];
    for (var i = 0; i < R.length; i++) if (res[R[i]]) bits.push(res[R[i]] + ' ' + R[i]);
    return bits.length ? bits.join(', ') : 'nothing';
  }

  function runDraw(state, player) {
    // The starting player skips their first draw, the standard compensation for
    // playing first.
    if (state.halfTurns === 1 && !state.firstDrawSkipped) {
      state.firstDrawSkipped = true;
      // One card fewer, not one card total. At two draws a turn those were the
      // same number; at three, "draw 1" handed the second player a two-card
      // head start and measured a 49.5% first-player win rate.
      var reduced = Math.max(1, state.config.drawPerTurn - 1);
      log(state, player.name + ' draws ' + reduced + ' instead of ' + state.config.drawPerTurn + ' (on the play)');
      makeOps(state).draw(player, reduced);
      return;
    }
    makeOps(state).draw(player, state.config.drawPerTurn);
  }

  function runEndStep(state, player) {
    var ops = makeOps(state);
    // Draw no longer refuses at 7; the hand limit is enforced here, where it
    // belongs, so the deck always depletes and games always terminate.
    while (player.hand.length > state.config.maxHand) {
      ops.discard(player, 1);
    }
    // Return everything above the reserve limit.
    var returned = 0;
    for (var i = 0; i < R.length; i++) {
      if (player.resources[R[i]] > state.config.reserveLimit) {
        returned += player.resources[R[i]] - state.config.reserveLimit;
        player.resources[R[i]] = state.config.reserveLimit;
      }
    }
    if (returned) log(state, player.name + ' returns ' + returned + ' unspent resource(s) above the reserve limit');
    player.buffs = player.buffs.filter(function(b) { return b.duration === 'game'; });
  }

  function endTurn(state) {
    var player = state.players[state.currentPlayer];
    permanents(player).forEach(function(card) { card.damage = 0; });
    state.currentPlayer = 1 - state.currentPlayer;
    state.halfTurns++;
    state.turn++;
    state.phase = 0;
    state.combat = { attackers: [], blocks: {}, awaiting: false };
    if (state.halfTurns > state.config.halfTurnLimit) {
      state.gameOver = true;
      state.winner = null;
      state.winReason = 'half-turn limit reached';
      log(state, 'Game ends: half-turn limit reached');
      return;
    }
    log(state, '--- Turn ' + state.turn + ': ' + state.players[state.currentPlayer].name + ' --- Upkeep');
    enterPhase(state);
    checkWin(state);
  }


  /** Who may act right now. During block declaration this is the DEFENDER. */
  function actingPlayer(state) {
    return state.combat.awaiting ? 1 - state.currentPlayer : state.currentPlayer;
  }

  function nextPhase(state) {
    if (state.gameOver) return false;
    if (state.combat.awaiting) return false;      // blockers must be declared
    if (PHASES[state.phase] === 'Combat' && state.combat.attackers.length && !state.combat.resolved) {
      state.combat.awaiting = true;
      log(state, state.players[1 - state.currentPlayer].name + ' declares blockers');
      return true;
    }
    state.phase++;
    if (state.phase >= PHASES.length) {
      endTurn(state);
    } else {
      log(state, '-- ' + PHASES[state.phase] + ' --');
      enterPhase(state);
    }
    return true;
  }

  /**
   * Combat with a real defense step. Unblocked attackers hit Supply Chain
   * Health; blocked attackers trade damage with the blocker and printed
   * Toughness finally means something.
   */
  function resolveCombat(state) {
    var attacker = state.players[state.currentPlayer];
    var defender = state.players[1 - state.currentPlayer];
    var ops = makeOps(state);
    var dead = [];

    state.combat.attackers.forEach(function(uid) {
      var att = find(attacker.network, uid);
      if (!att) return;
      var blockerUid = state.combat.blocks[uid];
      var blk = blockerUid ? find(defender.network, blockerUid) : null;
      var power = (att.stats.power || 0) + buffValue(attacker, 'Workforce', 'power');
      if (!blk) {
        ops.damage(defender, power, att);
        return;
      }
      log(state, blk.name + ' blocks ' + att.name);
      blk.damage += power;
      att.damage += blockPower(blk);
      if (blk.damage >= blockToughness(blk) || hasKw(blk, 'Fragile')) dead.push([defender, blk]);
      if (att.damage >= blockToughness(att) || hasKw(att, 'Fragile')) dead.push([attacker, att]);
    });

    dead.forEach(function(pair) {
      var owner = pair[0], card = pair[1];
      var i = owner.network.indexOf(card);
      if (i >= 0) {
        owner.network.splice(i, 1);
        owner.discard.push(card);
        log(state, card.name + ' is destroyed in combat');
      }
    });
    state.combat.resolved = true;
    state.combat.awaiting = false;
  }


  function find(list, uid) {
    for (var i = 0; i < list.length; i++) if (list[i].uid === uid) return list[i];
    return null;
  }

  function checkWin(state) {
    if (state.gameOver) return;
    for (var i = 0; i < 2; i++) {
      var p = state.players[i];
      if (p.fp >= state.config.winFp) {
        state.gameOver = true; state.winner = i;
        state.winReason = p.name + ' reached ' + p.fp + ' Fulfillment Points';
        log(state, '*** ' + state.winReason + ' ***');
        return;
      }
      if (p.health <= 0) {
        state.gameOver = true; state.winner = 1 - i;
        state.winReason = p.name + '\'s Supply Chain collapsed';
        log(state, '*** ' + state.winReason + ' ***');
        return;
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Playing cards
  // ---------------------------------------------------------------------------
  function isMainPhase(state) {
    var n = PHASES[state.phase];
    return n === 'Main Phase 1' || n === 'Main Phase 2';
  }

  function legendaryConflict(player, card) {
    if (!hasKw(card, 'Legendary')) return false;
    return permanents(player).some(function(c) { return c.name === card.name; });
  }

  function playCard(state, playerIndex, handIndex) {
    var player = state.players[playerIndex];
    var card = player.hand[handIndex];
    if (!card || !isMainPhase(state) || playerIndex !== state.currentPlayer) return false;
    if (!canPay(player, card) || legendaryConflict(player, card)) return false;

    payCost(player, card);
    player.hand.splice(handIndex, 1);
    player.played[card.id] = (player.played[card.id] || 0) + 1;
    var ctx = ctxFor(state, playerIndex, card);

    switch (card.type) {
      case 'Infrastructure':
        card.ready = hasKw(card, 'Rush');
        player.source.push(card);
        log(state, player.name + ' deploys ' + card.name + ' to the Source Zone');
        Effects.trigger(card, 'deploy', ctx);
        break;
      case 'Fleet':
        // A Fleet may move the turn it arrives. The tempo cost of a delivery
        // network is already paid in Fuel, a crew, and a Transit action; adding
        // a turn of delay put the FP win a full clock behind the combat win.
        card.ready = true;
        player.network.push(card);
        log(state, player.name + ' deploys ' + card.name + ' to the Network Zone');
        Effects.trigger(card, 'deploy', ctx);
        break;
      case 'Workforce':
        // Workforce still need a turn before they attack or work a Tap ability
        // (Rush waives it) - but they can block immediately.
        card.ready = hasKw(card, 'Rush');
        player.network.push(card);
        log(state, player.name + ' deploys ' + card.name + ' to the Network Zone');
        Effects.trigger(card, 'deploy', ctx);
        break;

      case 'Contracts':
        player.contracts.push(card);
        log(state, player.name + ' signs Contract ' + card.name + ' (' + card.fpReward + ' FP)');
        break;
      case 'Operations':
        log(state, player.name + ' plays ' + card.name);
        Effects.trigger(card, 'cast', ctx);
        player.discard.push(card);
        break;
      case 'Disruptions':
        log(state, player.name + ' plays ' + card.name);
        var opp = state.players[1 - playerIndex];
        if (opp.shieldTurns > 0) {
          opp.shieldTurns--;
          log(state, card.name + ' is prevented - ' + opp.name + ' was shielded');
        } else {
          Effects.trigger(card, 'cast', ctx);
          breakFragile(state, opp);
        }
        player.discard.push(card);
        break;
      default:
        player.discard.push(card);
    }
    checkWin(state);
    return true;
  }

  /** Fragile: the first Disruption that resolves against you breaks something. */
  function breakFragile(state, player) {
    var zones = ['source', 'network', 'customer'];
    for (var z = 0; z < zones.length; z++) {
      var list = player[zones[z]];
      for (var i = 0; i < list.length; i++) {
        if (hasKw(list[i], 'Fragile')) {
          var card = list.splice(i, 1)[0];
          player.discard.push(card);
          log(state, card.name + ' is Fragile and breaks under the Disruption');
          return;
        }
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Activated abilities
  // ---------------------------------------------------------------------------
  function tapCost(card) {
    var need = 0;
    (card.effects || []).forEach(function(e) {
      if (e.trigger !== 'tap') return;
      e.action.forEach(function(a) { if (a.do === 'goods' && a.amount < 0) need += -a.amount; });
    });
    return need;
  }


  function storedGoods(player) {
    return player.source.reduce(function(n, c) { return n + c.stored; }, 0);
  }

  function canTap(state, playerIndex, card) {
    var player = state.players[playerIndex];
    if (!Effects.has(card, 'tap') || !isReady(card)) return false;
    if (!isMainPhase(state)) return false;
    return storedGoods(player) >= tapCost(card);
  }

  function tapAbility(state, playerIndex, uid) {
    var player = state.players[playerIndex];
    var card = find(player.source, uid) || find(player.network, uid);
    if (!card || playerIndex !== state.currentPlayer || !canTap(state, playerIndex, card)) return false;
    card.tapped = true;
    log(state, player.name + ' taps ' + card.name);
    Effects.trigger(card, 'tap', ctxFor(state, playerIndex, card));
    checkWin(state);
    return true;
  }

  /**
   * Requisition: once per turn, scrap a card from hand for 1 resource of your
   * choice. A physical, no-bookkeeping smoothing valve so a hand of the wrong
   * colours is never a dead turn.
   */
  function requisition(state, playerIndex, handIndex, resource) {
    var player = state.players[playerIndex];
    if (playerIndex !== state.currentPlayer || !isMainPhase(state)) return false;
    if (player.requisitionUsed || !player.hand[handIndex]) return false;
    if (R.indexOf(resource) === -1) return false;
    var card = player.hand.splice(handIndex, 1)[0];
    player.discard.push(card);
    player.requisitionUsed = true;
    player.resources[resource] += 1;
    log(state, player.name + ' requisitions ' + card.name + ' for 1 ' + resource);
    return true;
  }

  // ---------------------------------------------------------------------------
  // Transit
  // ---------------------------------------------------------------------------
  /**
   * Fuel a movement actually costs. Sustainable pays nothing ever; everyone
   * gets their first movement of the turn free.
   */
  function transitFuel(state, player, fleet) {
    if (hasKw(fleet, 'Sustainable')) return 0;
    if (player.freeTransitsLeft > 0) return 0;
    return state.config.transitFuel;
  }

  /** Exported so the diagnostics agree with the engine about why a Fleet stayed put. */
  function transitCost(state, playerIndex, fleet) {
    return transitFuel(state, state.players[playerIndex], fleet);
  }

  /**
   * Who can crew a Fleet.
   *
   * Deliberately NOT isReady(): a Workforce that arrived this turn may crew.
   * Measured, crew was the last throttle on the delivery loop - 356 blocked
   * movements across 60 games, against 13 for Fuel and 3 for the Transit
   * budget - because a Workforce could not do anything at all on the turn it
   * arrived, so every new hire cost a full turn before a Fleet could move.
   * A new hire can load a truck; what they cannot do is work a shift as a
   * lead (a Tap ability) or fight (attack). Those still need Rush. This makes
   * the delivery clock a turn faster without touching the combat clock at
   * all, which is exactly the asymmetry this pass wanted.
   * Printed in Glossary.GLOBAL_RULES under Arriving.
   */
  function availableCrew(player) {
    return player.network.filter(function(c) {
      return c.type === 'Workforce' && !c.tapped && c.disabledFor === 0 && !c.attacked;
    });
  }

  function canTransit(state, playerIndex, fleet) {
    var player = state.players[playerIndex];
    if (PHASES[state.phase] !== 'Transit' || fleet.type !== 'Fleet' || !isReady(fleet)) return false;
    if (player.transitBudget <= 0) return false;
    if (player.resources.Fuel < transitFuel(state, player, fleet)) return false;
    if (!hasKw(fleet, 'Automated') && availableCrew(player).length === 0) return false;
    return true;
  }


  function transit(state, playerIndex, uid, crewUid) {
    var player = state.players[playerIndex];
    var fleet = find(player.network, uid);
    if (!fleet || playerIndex !== state.currentPlayer || !canTransit(state, playerIndex, fleet)) return false;

    var fuelPaid = transitFuel(state, player, fleet);
    player.resources.Fuel -= fuelPaid;
    // The free movement is consumed by any Fleet that would otherwise have
    // paid; Sustainable Fleet never spend it, so they do not use it up.
    if (!fuelPaid && !hasKw(fleet, 'Sustainable') && player.freeTransitsLeft > 0) {
      player.freeTransitsLeft--;
    }
    var crewNote = '';
    if (!hasKw(fleet, 'Automated')) {
      var crew = crewUid ? find(player.network, crewUid) : null;
      if (!crew || crew.type !== 'Workforce' || crew.tapped || crew.disabledFor !== 0 || crew.attacked) {
        crew = availableCrew(player)[0];
      }
      if (!crew) return false;
      crew.tapped = true;
      crewNote = ', crewed by ' + crew.name;
    } else {
      crewNote = ' (Automated)';
    }

    // Load Goods out of storage, up to printed Capacity (+ Specialized bonus).
    var capacity = (fleet.stats.capacity || 0) + (hasKw(fleet, 'Specialized') ? 1 : 0);
    var loaded = 0;
    for (var i = 0; i < player.source.length && loaded < capacity; i++) {
      while (player.source[i].stored > 0 && loaded < capacity) { player.source[i].stored--; loaded++; }
    }
    fleet.carrying += loaded;
    fleet.tapped = true;
    player.transitBudget--;
    player.network.splice(player.network.indexOf(fleet), 1);
    player.customer.push(fleet);
    log(state, player.name + ' transits ' + fleet.name + ' carrying ' + loaded + ' Goods' + crewNote);
    return true;
  }

  // ---------------------------------------------------------------------------
  // Combat actions
  // ---------------------------------------------------------------------------
  function canAttack(state, playerIndex, card) {
    if (PHASES[state.phase] !== 'Combat' || state.combat.awaiting) return false;
    return card.type === 'Workforce' && isReady(card) && !card.attacked;
  }

  function declareAttacker(state, playerIndex, uid) {
    var player = state.players[playerIndex];
    var card = find(player.network, uid);
    if (!card || playerIndex !== state.currentPlayer || !canAttack(state, playerIndex, card)) return false;
    card.attacked = true;
    card.tapped = true;
    state.combat.attackers.push(uid);
    log(state, player.name + '\'s ' + card.name + ' attacks (Power ' + card.stats.power + ')');
    return true;
  }


  function declareBlocker(state, defenderIndex, attackerUid, blockerUid) {
    if (!state.combat.awaiting || defenderIndex !== 1 - state.currentPlayer) return false;
    var defender = state.players[defenderIndex];
    var blocker = find(defender.network, blockerUid);
    if (!blocker || !canBlockWith(blocker)) return false;
    if (state.combat.attackers.indexOf(attackerUid) === -1) return false;
    var already = Object.keys(state.combat.blocks).some(function(k) {
      return state.combat.blocks[k] === blockerUid;
    });
    if (already || state.combat.blocks[attackerUid]) return false;
    state.combat.blocks[attackerUid] = blockerUid;
    blocker.tapped = true;
    log(state, defender.name + ' assigns ' + blocker.name + ' to block');
    return true;
  }

  function finishBlocking(state) {
    if (!state.combat.awaiting) return false;
    resolveCombat(state);
    checkWin(state);
    if (!state.gameOver) nextPhase(state);
    return true;
  }

  // ---------------------------------------------------------------------------
  // Legal actions - the simulator's whole view of the game
  // ---------------------------------------------------------------------------
  function legalActions(state) {
    var out = [];
    if (state.gameOver) return out;
    var pi = actingPlayer(state);
    var player = state.players[pi];
    var phase = PHASES[state.phase];

    if (state.combat.awaiting) {
      var assigned = {};
      Object.keys(state.combat.blocks).forEach(function(k) { assigned[state.combat.blocks[k]] = true; });
      state.combat.attackers.forEach(function(auid) {
        if (state.combat.blocks[auid]) return;
        player.network.forEach(function(card) {
          // A blocker already assigned to another attacker is not available.
          if (canBlockWith(card) && !assigned[card.uid]) {
            out.push({ k: 'block', attacker: auid, blocker: card.uid, actor: pi });
          }
        });
      });
      out.push({ k: 'doneBlocking', actor: pi });
      return out;
    }

    if (isMainPhase(state)) {
      player.hand.forEach(function(card, i) {
        if (canPay(player, card) && !legendaryConflict(player, card)) {
          out.push({ k: 'play', hand: i, actor: pi, card: card.id, name: card.name });
        }
      });
      player.source.concat(player.network).forEach(function(card) {
        if (canTap(state, pi, card)) out.push({ k: 'tap', uid: card.uid, actor: pi, name: card.name });
      });
      if (!player.requisitionUsed && player.hand.length > 1) {
        R.forEach(function(res) { out.push({ k: 'requisition', hand: 0, resource: res, actor: pi }); });
      }
    }


    if (phase === 'Transit') {
      player.network.forEach(function(card) {
        if (card.type === 'Fleet' && canTransit(state, pi, card)) {
          out.push({ k: 'transit', uid: card.uid, actor: pi, name: card.name });
        }
      });
    }

    if (phase === 'Delivery') {
      player.contracts.forEach(function(card) {
        if (contractMet(state, pi, card)) {
          out.push({ k: 'fulfill', uid: card.uid, actor: pi, name: card.name, fp: card.fpReward });
        }
      });
    }

    if (phase === 'Combat') {
      player.network.forEach(function(card) {
        if (canAttack(state, pi, card)) out.push({ k: 'attack', uid: card.uid, actor: pi, name: card.name });
      });
    }

    out.push({ k: 'nextPhase', actor: pi });
    return out;
  }

  /** Apply one action. Returns the events it produced, for the UI log. */
  function apply(state, action) {
    state.events = [];
    var pi = action.actor === undefined ? actingPlayer(state) : action.actor;
    var ok = false;
    switch (action.k) {
      case 'play': ok = playCard(state, pi, action.hand); break;
      case 'tap': ok = tapAbility(state, pi, action.uid); break;
      case 'requisition': ok = requisition(state, pi, action.hand, action.resource); break;
      case 'transit': ok = transit(state, pi, action.uid, action.crew); break;
      case 'fulfill': ok = fulfillContract(state, pi, action.uid); break;
      case 'attack': ok = declareAttacker(state, pi, action.uid); break;
      case 'block': ok = declareBlocker(state, pi, action.attacker, action.blocker); break;
      case 'doneBlocking': ok = finishBlocking(state); break;
      case 'nextPhase': ok = nextPhase(state); break;
      case 'endTurn': ok = runToEndOfTurn(state); break;
      default: ok = false;
    }
    return { ok: ok, events: state.events.slice() };
  }

  /**
   * End Turn now RUNS the phases it skips past instead of silently forfeiting
   * them. Pressing it can no longer cost you the turn's Delivery step.
   */
  function runToEndOfTurn(state) {
    var startTurn = state.turn;
    var guard = 0;
    while (!state.gameOver && state.turn === startTurn && guard++ < 40) {
      if (state.combat.awaiting) { finishBlocking(state); continue; }
      if (PHASES[state.phase] === 'Delivery') {
        var acts = legalActions(state).filter(function(a) { return a.k === 'fulfill'; });
        if (acts.length) { apply(state, acts[0]); continue; }
      }
      nextPhase(state);
    }
    return true;
  }


  // ---------------------------------------------------------------------------
  // Reporting
  // ---------------------------------------------------------------------------
  function summary(state) {
    return {
      turn: state.turn,
      halfTurns: state.halfTurns,
      phase: PHASES[state.phase],
      gameOver: state.gameOver,
      winner: state.winner,
      winReason: state.winReason,
      players: state.players.map(function(p) {
        return {
          name: p.name, archetype: p.archetype, health: p.health, fp: p.fp,
          resources: p.resources, hand: p.hand.length, deck: p.deck.length,
          source: p.source.length, network: p.network.length, customer: p.customer.length,
          contracts: p.contracts.length, stored: storedGoods(p),
          carrying: p.customer.reduce(function(n, c) { return n + c.carrying; }, 0)
        };
      })
    };
  }

  return {
    PHASES: PHASES,
    RESOURCES: R,
    DEFAULTS: DEFAULTS,
    DECK_MINIMUMS: DECK_MINIMUMS,
    ARCHETYPES: Object.keys(DECK_MINIMUMS),
    Glossary: Glossary,
    Effects: Effects,
    Rng: Rng,

    buildDeck: buildDeck,
    createGame: createGame,
    clone: clone,
    legalActions: legalActions,
    apply: apply,
    summary: summary,
    actingPlayer: actingPlayer,

    // queries used by both the view and the simulator
    canPay: canPay,
    canTap: canTap,
    canTransit: canTransit,
    transitCost: transitCost,
    canAttack: canAttack,
    missingResources: missingResources,
    effectiveCost: effectiveCost,
    contractStatus: contractStatus,
    contractMet: contractMet,
    requiredCargo: requiredCargo,
    storedGoods: storedGoods,
    isReady: isReady,
    isActive: isActive,
    hasKeyword: hasKw,
    totalCost: totalCost,
    find: find
  };
}));
