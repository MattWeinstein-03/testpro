/**
 * Card schema validation at the load boundary.
 *
 * The old set was 4261 lines of inline JSON where a typo'd requirement key was
 * silently ignored (which made a contract easier, not harder). Validation runs
 * once at startup and in the test suite, and reports every problem it finds
 * rather than throwing on the first.
 */
(function(root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(require('./glossary.js'));
  } else {
    root.CardSchema = factory(root.Glossary);
  }
}(typeof window !== 'undefined' ? window : this, function(Glossary) {
  'use strict';

  var R = Glossary.RESOURCES;

  var REQUIREMENT_KEYS = ['fleetCards', 'fleetCapacity', 'fleetSpeed', 'fleetSubtypes',
    'infrastructureSubtypes', 'workforce', 'workforceSubtypes'];

  function validateCard(card, errors) {
    function bad(msg) { errors.push(card.id + ' ' + (card.name || '?') + ': ' + msg); }

    if (!card.id || !/^\d{3}$/.test(card.id)) bad('id must be a 3-digit string');
    if (!card.name) bad('missing name');
    if (Glossary.TYPES.indexOf(card.type) === -1) bad('unknown type "' + card.type + '"');
    if (Glossary.RARITIES.indexOf(card.rarity) === -1) bad('unknown rarity "' + card.rarity + '"');

    var subs = Glossary.SUBTYPES[card.type];
    if (subs && subs.indexOf(card.subtype) === -1) bad('subtype "' + card.subtype + '" not valid for ' + card.type);

    if (!card.cost) bad('missing cost');
    else {
      for (var i = 0; i < R.length; i++) {
        if (typeof card.cost[R[i]] !== 'number') bad('cost.' + R[i] + ' must be a number');
      }
    }

    (card.keywords || []).forEach(function(kw) {
      if (Glossary.KEYWORD_LIST.indexOf(kw) === -1) bad('unknown keyword "' + kw + '"');
    });

    if (card.type === 'Workforce' && (!card.stats || card.stats.power === undefined || card.stats.toughness === undefined)) {
      bad('Workforce needs stats.power and stats.toughness');
    }
    if (card.type === 'Fleet' && (!card.stats || card.stats.capacity === undefined || card.stats.speed === undefined)) {
      bad('Fleet needs stats.capacity and stats.speed');
    }

    if (card.type === 'Infrastructure') {
      if (!card.stats || card.stats.capacity === undefined) bad('Infrastructure needs stats.capacity');
      if (!card.produces) bad('Infrastructure needs an explicit produces map');
      else {
        var total = 0;
        for (var p = 0; p < R.length; p++) {
          if (typeof card.produces[R[p]] !== 'number') bad('produces.' + R[p] + ' must be a number');
          else total += card.produces[R[p]];
        }
        if (total === 0) bad('produces nothing - Infrastructure must produce something');
      }
      if (typeof card.goods !== 'number' || card.goods < 1) bad('Infrastructure needs goods >= 1');
    }

    if (card.type === 'Contracts') {
      if (typeof card.fpReward !== 'number' || card.fpReward < 1) bad('Contract needs fpReward >= 1');
      if (typeof card.cargo !== 'number' || card.cargo < 1) bad('Contract needs cargo >= 1');
      if (!card.requirements) bad('Contract needs requirements');
      else {
        Object.keys(card.requirements).forEach(function(k) {
          if (REQUIREMENT_KEYS.indexOf(k) === -1) bad('unknown requirement key "' + k + '"');
        });
        checkSubtypeList(card, 'fleetSubtypes', 'Fleet', bad);
        checkSubtypeList(card, 'infrastructureSubtypes', 'Infrastructure', bad);
        checkSubtypeList(card, 'workforceSubtypes', 'Workforce', bad);
      }
    }

    (card.effects || []).forEach(function(e) {
      if (Glossary.TRIGGERS.indexOf(e.trigger) === -1) bad('unknown trigger "' + e.trigger + '"');
      if (!Array.isArray(e.action)) bad('effect action must be an array');
      else e.action.forEach(function(a) {
        if (Glossary.ACTIONS.indexOf(a.do) === -1) bad('unknown action "' + a.do + '"');
        if (a.resource && a.resource !== 'any' && a.resource !== 'all' && R.indexOf(a.resource) === -1) {
          bad('unknown resource "' + a.resource + '"');
        }
      });
    });
  }

  function checkSubtypeList(card, key, type, bad) {
    var list = card.requirements[key];
    if (list === undefined) return;
    if (!Array.isArray(list)) { bad(key + ' must be an array of subtypes (never "all")'); return; }
    list.forEach(function(s) {
      if (Glossary.SUBTYPES[type].indexOf(s) === -1) bad(key + ' contains "' + s + '", not a ' + type + ' subtype');
    });
  }


  /**
   * Validate a whole set. Returns { ok, errors, warnings }.
   * Also runs set-level checks the per-card pass cannot see.
   */
  function validateSet(cards) {
    var errors = [];
    var warnings = [];
    var seen = {};

    cards.forEach(function(card) {
      if (seen[card.id]) errors.push('duplicate id ' + card.id);
      seen[card.id] = true;
      validateCard(card, errors);
    });

    // Every resource must have at least one producer payable with Capital
    // alone, otherwise that resource cannot be bootstrapped.
    R.forEach(function(res) {
      var bootstrap = cards.filter(function(card) {
        if (card.type !== 'Infrastructure' || !card.produces || !card.produces[res]) return false;
        return R.every(function(r) { return r === 'Capital' || !card.cost[r]; });
      });
      if (bootstrap.length === 0) {
        errors.push('economy: no Capital-payable producer of ' + res);
      } else if (bootstrap.length < 3) {
        warnings.push('economy: only ' + bootstrap.length + ' Capital-payable producer(s) of ' + res);
      }
    });

    // Contract clauses must be satisfiable by the printed pool.
    cards.filter(function(c) { return c.type === 'Contracts'; }).forEach(function(card) {
      var reqs = card.requirements || {};
      (reqs.fleetSubtypes || []).forEach(function(sub) {
        var n = cards.filter(function(c) { return c.type === 'Fleet' && c.subtype === sub; }).length;
        if (n < 4) warnings.push(card.id + ' ' + card.name + ' requires Fleet subtype ' + sub + ' with only ' + n + ' printed cards');
      });
      if (reqs.fleetSpeed) {
        var fast = cards.filter(function(c) { return c.type === 'Fleet' && c.stats.speed >= reqs.fleetSpeed; }).length;
        if (fast < 4) warnings.push(card.id + ' ' + card.name + ' requires Speed ' + reqs.fleetSpeed + ' met by only ' + fast + ' cards');
      }
    });

    return { ok: errors.length === 0, errors: errors, warnings: warnings };
  }

  return { validateCard: validateCard, validateSet: validateSet, REQUIREMENT_KEYS: REQUIREMENT_KEYS };
}));
