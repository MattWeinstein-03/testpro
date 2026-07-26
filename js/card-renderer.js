(function(root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.CardRenderer = factory();
  }
}(typeof window !== 'undefined' ? window : this, function() {
  'use strict';

  /**
   * Resource pips. Each pip used to carry its own <defs> with a fixed gradient
   * id, so a gallery of 200 cards emitted hundreds of duplicate DOM ids and
   * which gradient a pip resolved to was undefined. The gradients now live once
   * in a shared <defs> block that the page injects via `spriteDefs()`.
   */
  var PIP_STYLE = {
    Capital: { grad: 'scCapGrad', glyph: '$', ink: '#654', from: '#fff3a1', to: '#FFD700' },
    Labor: { grad: 'scLabGrad', glyph: 'L', ink: '#432', from: '#e8c89a', to: '#CD853F' },
    Fuel: { grad: 'scFuelGrad', glyph: 'F', ink: '#521', from: '#ff9a8a', to: '#FF6347' },
    Data: { grad: 'scDataGrad', glyph: 'D', ink: '#034', from: '#7fffff', to: '#00CED1' },
    Time: { grad: 'scTimeGrad', glyph: 'T', ink: '#524', from: '#f0d4f0', to: '#DDA0DD' }
  };

  /** One hidden SVG holding every pip gradient. Injected once per page. */
  function spriteDefs() {
    var svg = '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>';
    Object.keys(PIP_STYLE).forEach(function(res) {
      var s = PIP_STYLE[res];
      svg += '<radialGradient id="' + s.grad + '">' +
        '<stop offset="0%" stop-color="' + s.from + '"/>' +
        '<stop offset="100%" stop-color="' + s.to + '"/></radialGradient>';
    });
    return svg + '</defs></svg>';
  }

  function pip(res) {
    var s = PIP_STYLE[res];
    return '<svg viewBox="0 0 16 16" width="16" height="16"><circle cx="8" cy="8" r="7" fill="url(#' +
      s.grad + ')"/><text x="8" y="12" text-anchor="middle" font-size="9" font-weight="bold" fill="' +
      s.ink + '">' + s.glyph + '</text></svg>';
  }

  var rarityClassMap = {
    'Common': 'rarity-common',
    'Uncommon': 'rarity-uncommon',
    'Rare': 'rarity-rare',
    'Mythic Rare': 'rarity-mythic'
  };

  var typeClassMap = {
    'Infrastructure': 'card-infrastructure',
    'Workforce': 'card-workforce',
    'Fleet': 'card-fleet',
    'Operations': 'card-operations',
    'Disruptions': 'card-disruptions',
    'Contracts': 'card-contracts'
  };

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
  }

  function renderCostIcons(cost) {
    if (!cost) return '';
    var html = '';
    var resources = ['Capital', 'Labor', 'Fuel', 'Data', 'Time'];
    for (var i = 0; i < resources.length; i++) {
      var res = resources[i];
      var amount = cost[res] || 0;
      for (var j = 0; j < amount; j++) {
        html += '<span class="cost-icon cost-' + res.toLowerCase() + '" title="' + res + '">';
        html += pip(res);
        html += '</span>';
      }
    }
    return html;
  }

  /**
   * The card face shows `rulesText`, which is generated from the card's effects,
   * so what a player reads is exactly what the engine does. `loreText` (the
   * original long-form design text) is shown as secondary intent text.
   */
  function formatAbilityText(card) {
    var rules = card.rulesText || card.abilities || '';
    if (!rules) return '';
    var text = escapeHtml(rules);
    text = text.replace(/\b(Tap|Deploy|Upkeep|Transit|Delivery|Instant|Passive|When|Whenever)(:|\b)/g,
      '<span class="card-keyword">$1$2</span>');
    return '<div class="card-ability">' + text + '</div>';
  }

  /**
   * Contract requirements as readable clauses. The gallery used to run
   * escapeHtml() over the requirements OBJECT, printing "[object Object]" on
   * all 15 Contracts.
   */
  function andList(items) {
    if (items.length === 1) return items[0];
    return items.slice(0, -1).join(', ') + ' and ' + items[items.length - 1];
  }

  function article(word) {
    return /^[AEIOU]/i.test(word) ? 'an' : 'a';
  }

  function formatRequirements(card) {
    var reqs = card.requirements;
    if (!reqs || typeof reqs !== 'object') return '';
    var parts = [];
    // Wording is kept identical to the printed text produced by
    // tools/build-card-data.js. A player must not have to learn two phrasings
    // for the same clause - one on the card, one on screen.
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
      parts.push(article(reqs.workforceSubtypes[0]) + ' ' +
        andList(reqs.workforceSubtypes) + ' Workforce');
    }
    if (card.cargo) parts.push('consumes ' + card.cargo + ' Goods');
    return parts.join('; ');
  }

  function formatFlavorText(flavorText) {
    if (!flavorText) return '';
    return '<div class="card-flavor">"' + escapeHtml(flavorText) + '"</div>';
  }

  function renderStats(card) {
    if (!card.stats) return '';
    var type = card.type;
    var statsHtml = '';

    // Numeric fields are coerced through Number() rather than interpolated raw,
    // so an imported deck list cannot inject markup through a stats field.
    function num(v) { return String(Number(v) || 0); }

    if (type === 'Infrastructure' && card.stats.capacity !== undefined) {
      statsHtml = '<span class="stat-badge">Capacity: ' + num(card.stats.capacity) + '</span>';
    } else if (type === 'Workforce' && card.stats.power !== undefined) {
      statsHtml = '<span class="stat-badge">' + num(card.stats.power) + '/' + num(card.stats.toughness) + '</span>';
    } else if (type === 'Fleet') {
      var parts = [];
      if (card.stats.capacity !== undefined) parts.push('Cap: ' + num(card.stats.capacity));
      if (card.stats.speed !== undefined) parts.push('Spd: ' + num(card.stats.speed));
      if (parts.length > 0) {
        statsHtml = '<span class="stat-badge">' + parts.join(' / ') + '</span>';
      }
    }

    if (!statsHtml) return '';
    return '<div class="card-stats">' + statsHtml + '</div>';
  }

  function getCardArt(card) {
    // Use SvgArt global in browser, or return placeholder
    if (typeof SvgArt !== 'undefined' && SvgArt.generateCardArt) {
      return SvgArt.generateCardArt(card);
    }
    // Fallback for Node.js or if SvgArt not loaded
    return '<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="200" fill="#1a1a2e"/><text x="150" y="105" text-anchor="middle" fill="#555" font-size="14">Art</text></svg>';
  }

  /**
   * Render a card object into a complete HTML string.
   * @param {Object} card - Card data object
   * @param {Object} [options] - Rendering options
   * @param {string} [options.size='normal'] - Size variant: 'small', 'normal', or 'large'
   * @returns {string} HTML string of the rendered card
   */
  function renderCard(card, options) {
    options = options || {};
    var size = options.size || 'normal';

    var typeClass = typeClassMap[card.type] || '';
    var rarityClass = rarityClassMap[card.rarity] || 'rarity-common';
    var sizeClass = size === 'normal' ? '' : (size === 'large' ? ' card-large' : ' card-small');

    var html = '';
    html += '<div class="card-frame ' + typeClass + sizeClass + '" data-card-id="' + escapeHtml(card.id) + '">';

    // Header: name + cost
    html += '<div class="card-header">';
    html += '<span class="card-name" title="' + escapeHtml(card.name) + '">' + escapeHtml(card.name) + '</span>';
    html += '<span class="card-cost">' + renderCostIcons(card.cost) + '</span>';
    html += '</div>';

    // Art frame
    html += '<div class="card-art">' + getCardArt(card) + '</div>';

    // Type line with rarity gem
    html += '<div class="card-type-line">';
    html += '<span class="card-type-text">' + escapeHtml(card.type) + (card.subtype ? ' - ' + escapeHtml(card.subtype) : '') + '</span>';
    html += '<span class="rarity-gem ' + rarityClass + '" title="' + escapeHtml(card.rarity) + '"></span>';
    html += '</div>';

    // Rules text box
    html += '<div class="card-text-box">';
    // Contract requirements are already part of the printed `rulesText`, so
    // they are NOT repeated here. Printing them twice wasted the text box that
    // the physical card has to fit inside.
    html += formatAbilityText(card);
    html += formatFlavorText(card.flavorText);
    html += '</div>';

    // Stats (only for types that have them)
    html += renderStats(card);

    // Footer with card number
    html += '<div class="card-footer">';
    html += '<span class="card-number">#' + escapeHtml(card.id) + '</span>';
    html += '<span>' + escapeHtml(card.rarity) + '</span>';
    html += '</div>';

    html += '</div>';

    return html;
  }

  /**
   * Shared render cache keyed by card id and size. The gallery cached its HTML
   * while the playtest view regenerated every SVG on every click; both now read
   * the same cache.
   */
  var cache = {};

  function renderCached(card, options) {
    options = options || {};
    var key = card.id + '|' + (options.size || 'normal') + '|' + (options.showRequirements === false ? 'n' : 'y');
    if (!cache[key]) cache[key] = renderCard(card, options);
    return cache[key];
  }

  function clearCache() { cache = {}; }

  return {
    renderCard: renderCard,
    renderCached: renderCached,
    clearCache: clearCache,
    formatRequirements: formatRequirements,
    spriteDefs: spriteDefs,
    escapeHtml: escapeHtml
  };
}));
