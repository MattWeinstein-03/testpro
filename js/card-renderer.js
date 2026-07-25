(function(root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.CardRenderer = factory();
  }
}(typeof window !== 'undefined' ? window : this, function() {
  'use strict';

  // Resource icon SVG templates (small inline SVGs for cost display)
  var resourceIcons = {
    Capital: function() {
      return '<svg viewBox="0 0 16 16" width="16" height="16"><circle cx="8" cy="8" r="7" fill="url(#capGrad)"/><text x="8" y="12" text-anchor="middle" font-size="9" font-weight="bold" fill="#654">$</text><defs><radialGradient id="capGrad"><stop offset="0%" stop-color="#fff3a1"/><stop offset="100%" stop-color="#FFD700"/></radialGradient></defs></svg>';
    },
    Labor: function() {
      return '<svg viewBox="0 0 16 16" width="16" height="16"><circle cx="8" cy="8" r="7" fill="url(#labGrad)"/><text x="8" y="12" text-anchor="middle" font-size="9" font-weight="bold" fill="#432">L</text><defs><radialGradient id="labGrad"><stop offset="0%" stop-color="#e8c89a"/><stop offset="100%" stop-color="#CD853F"/></radialGradient></defs></svg>';
    },
    Fuel: function() {
      return '<svg viewBox="0 0 16 16" width="16" height="16"><circle cx="8" cy="8" r="7" fill="url(#fuelGrad)"/><text x="8" y="12" text-anchor="middle" font-size="9" font-weight="bold" fill="#521">F</text><defs><radialGradient id="fuelGrad"><stop offset="0%" stop-color="#ff9a8a"/><stop offset="100%" stop-color="#FF6347"/></radialGradient></defs></svg>';
    },
    Data: function() {
      return '<svg viewBox="0 0 16 16" width="16" height="16"><circle cx="8" cy="8" r="7" fill="url(#dataGrad)"/><text x="8" y="12" text-anchor="middle" font-size="9" font-weight="bold" fill="#034">D</text><defs><radialGradient id="dataGrad"><stop offset="0%" stop-color="#7fffff"/><stop offset="100%" stop-color="#00CED1"/></radialGradient></defs></svg>';
    },
    Time: function() {
      return '<svg viewBox="0 0 16 16" width="16" height="16"><circle cx="8" cy="8" r="7" fill="url(#timeGrad)"/><text x="8" y="12" text-anchor="middle" font-size="9" font-weight="bold" fill="#524">T</text><defs><radialGradient id="timeGrad"><stop offset="0%" stop-color="#f0d4f0"/><stop offset="100%" stop-color="#DDA0DD"/></radialGradient></defs></svg>';
    }
  };

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
        html += resourceIcons[res]();
        html += '</span>';
      }
    }
    return html;
  }

  function formatAbilityText(abilities) {
    if (!abilities) return '';
    // Split on periods followed by space for separate ability clauses
    var text = escapeHtml(abilities);
    // Bold keywords before colons (like "Tap:", "Deploy:", "Transit:", "Instant:")
    text = text.replace(/\b(Tap|Deploy|Transit|Instant|Sorcery|Passive|Activate|Trigger|When|At the beginning of|Whenever)(:|\b)/g, '<span class="card-keyword">$1$2</span>');
    return '<div class="card-ability">' + text + '</div>';
  }

  function formatFlavorText(flavorText) {
    if (!flavorText) return '';
    return '<div class="card-flavor">"' + escapeHtml(flavorText) + '"</div>';
  }

  function renderStats(card) {
    if (!card.stats) return '';
    var type = card.type;
    var statsHtml = '';

    if (type === 'Infrastructure' && card.stats.capacity !== undefined) {
      statsHtml = '<span class="stat-badge">Capacity: ' + card.stats.capacity + '</span>';
    } else if (type === 'Workforce' && card.stats.power !== undefined) {
      statsHtml = '<span class="stat-badge">' + card.stats.power + '/' + card.stats.toughness + '</span>';
    } else if (type === 'Fleet') {
      var parts = [];
      if (card.stats.capacity !== undefined) parts.push('Cap: ' + card.stats.capacity);
      if (card.stats.speed !== undefined) parts.push('Spd: ' + card.stats.speed);
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
    html += formatAbilityText(card.abilities);
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

  return {
    renderCard: renderCard
  };
}));
