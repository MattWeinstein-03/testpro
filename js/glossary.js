/**
 * SUPPLY CHAIN: The Gathering - Frozen Glossary
 *
 * This file is the single source of truth for rules vocabulary. Card text,
 * the rules core and the UI must all use these exact terms. Adding a term
 * here is a deliberate act; using a term that is not here is a bug that
 * `card-schema.js` will report at load time.
 */
(function(root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.Glossary = factory();
  }
}(typeof window !== 'undefined' ? window : this, function() {
  'use strict';

  var PHASES = ['Upkeep', 'Draw', 'Main Phase 1', 'Transit', 'Delivery', 'Combat', 'Main Phase 2', 'End Step'];
  var RESOURCES = ['Capital', 'Labor', 'Fuel', 'Data', 'Time'];
  var ZONES = ['Source Zone', 'Network Zone', 'Customer Zone'];
  var TYPES = ['Infrastructure', 'Workforce', 'Fleet', 'Operations', 'Disruptions', 'Contracts'];
  var RARITIES = ['Common', 'Uncommon', 'Rare', 'Mythic Rare'];

  var SUBTYPES = {
    Infrastructure: ['Facility', 'Storage', 'Hub', 'Digital'],
    Workforce: ['Worker', 'Specialist', 'Executive', 'Digital'],
    Fleet: ['Vehicle', 'Ship', 'Air', 'Rail', 'Drone', 'Fixed'],
    Operations: ['Tactic', 'Strategy'],
    Disruptions: ['Event'],
    Contracts: ['Contract']
  };

  /** The seven archetype keywords, each with a mechanical definition. */
  var KEYWORDS = {
    Automated: 'Does not require a crew. Automated Fleet may transit without tapping a Workforce; Automated Infrastructure produces even while Disabled.',
    Rush: 'May attack or use a Tap ability the turn it arrives. (Fleet may always transit the turn they arrive; Workforce may always block.)',
    Specialized: 'Counts twice when a Contract counts cards of its type, carries or produces 1 extra Goods, and satisfies any Fleet or Workforce subtype clause on a Contract.',
    Hub: 'Produces 1 extra resource, and satisfies any Infrastructure subtype clause on a Contract.',
    Sustainable: 'Pays no Fuel. Deploying and transiting this card costs 0 Fuel.',
    Fragile: 'Costs 1 less Capital to deploy, but is destroyed by the first Disruption that resolves against its controller.',
    Legendary: 'Limit 1 per deck. You may not control two cards with the same name.'
  };

  /**
   * Rules that apply to every game and are printed once in the rulebook rather
   * than reprinted on every card. Anything the engine enforces MUST appear
   * here or on a card face - a rule that exists only in code cannot ship on
   * cardboard, because a player at a table has no way to discover it.
   */
  var GLOBAL_RULES = [
    'Turn sequence: Upkeep, Draw, Main Phase 1, Transit, Delivery, Combat, Main Phase 2, End Step.',
    'Each player starts on 20 Supply Chain Health. You win by reaching 10 Fulfillment Points, or when your opponent\'s Supply Chain Health reaches 0.',
    'If you must draw a card and your deck is empty, you lose the game.',
    'A deck is 52 cards. No more than 3 copies of a card, and 1 copy of any Legendary card.',
    'Opening hand is 7 cards. Draw 3 cards in your Draw step; the player going first draws 1 fewer card on their first turn.',
    'Hand limit is 7 cards. Discard down to 7 during your End Step.',
    'Upkeep income: take 3 Capital plus 1 resource of your choice, before Infrastructure produces.',
    'End Step: keep up to 3 of each resource and return the rest. Resources are a small reserve, not an unlimited bank.',
    'Upkeep: untap all your cards, clear attack markers, and each Infrastructure you control produces the resources and Goods printed on it.',
    'Goods are produced onto Infrastructure in your Source Zone. Transit loads Goods from Source onto a Fleet, up to that Fleet\'s Capacity.',
    'Transit: pay 1 Fuel and exhaust one untapped Workforce as crew, then move the Fleet to your Customer Zone. Automated Fleet need no crew.',
    'Standing haulage: the first Transit of your turn costs no Fuel. Later Transits that turn pay 1 Fuel each as normal.',
    'Transit budget: you may Transit 3 Fleet each turn, however many Fleet you control. Operations that grant extra Transit actions add to your budget for that turn.',
    'You may fulfil as many Contracts in your Delivery step as you can pay the Goods for.',
    'Fulfilling a Contract consumes the printed Goods from Fleet in your Customer Zone. The Fleet used returns to your Network Zone exhausted.',
    'Combat: attackers exhaust. The defender may block with any Workforce that did not attack, or with an untapped Fleet acting as a barricade (Power 0, Toughness 2).',
    'Damage hits your stored Goods before your Supply Chain Health: the first 1 damage you take each turn removes 1 stored Goods instead. Inventory is a buffer, and a thin one.',
    'A blocked attacker deals no damage to the defending player. Attacker and blocker deal damage equal to Power; a card with damage equal to or above its Toughness is destroyed.',
    'A card that arrived this turn is Arriving: it cannot attack or use a Tap ability unless it has Rush. An Arriving Workforce may still crew a Fleet and may still block.',
    'Requisition: once per turn during a Main Phase you may discard a card from hand to gain 1 resource of your choice.'
  ];

  /** Effect DSL vocabulary. `trigger` says when, `condition` says whether, `action` says what. */
  var TRIGGERS = ['cast', 'deploy', 'upkeep', 'tap', 'delivery', 'endStep', 'attack', 'death'];

  var ACTIONS = ['damage', 'heal', 'gain', 'drain', 'draw', 'discard', 'mill', 'fp', 'goods',
    'loseGoods', 'destroy', 'disable', 'untap', 'buff', 'shield', 'extraTransit', 'cargoDiscount'];

  return {
    PHASES: PHASES,
    RESOURCES: RESOURCES,
    ZONES: ZONES,
    TYPES: TYPES,
    RARITIES: RARITIES,
    SUBTYPES: SUBTYPES,
    KEYWORDS: KEYWORDS,
    KEYWORD_LIST: Object.keys(KEYWORDS),
    GLOBAL_RULES: GLOBAL_RULES,
    TRIGGERS: TRIGGERS,
    ACTIONS: ACTIONS
  };
}));
