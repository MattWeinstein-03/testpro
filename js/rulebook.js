/**
 * Rulebook view.
 *
 * This renders the SAME frozen glossary the engine reads, so the rules a player
 * sees on screen and the rules the engine enforces cannot drift apart. When the
 * game goes to print, this page is the rulebook insert: nothing here is
 * computed from the digital build, it is all authored vocabulary.
 */
(function(root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(require('./glossary.js'));
  } else {
    root.Rulebook = factory(root.Glossary);
  }
}(typeof window !== 'undefined' ? window : this, function(Glossary) {
  'use strict';

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function list(items) {
    return '<ol class="rulebook-list">' + items.map(function(t) {
      return '<li>' + esc(t) + '</li>';
    }).join('') + '</ol>';
  }

  function chips(items) {
    return '<div class="rulebook-chips">' + items.map(function(t) {
      return '<span class="rulebook-chip">' + esc(t) + '</span>';
    }).join('') + '</div>';
  }

  function render() {
    var el = document.getElementById('rulebook-content');
    if (!el) return;
    var html = '';

    html += '<section class="rulebook-section">';
    html += '<h3>Object of the game</h3>';
    html += '<p>Build a supply chain that delivers. You win the moment you reach ' +
      '<strong>10 Fulfillment Points</strong>, or when your opponent\'s ' +
      '<strong>Supply Chain Health</strong> reaches 0. If you must draw from an ' +
      'empty deck, you lose.</p>';
    html += '</section>';


    html += '<section class="rulebook-section">';
    html += '<h3>The turn</h3>';
    html += '<p>Eight phases, in this order. Two Main Phases is deliberate: a ' +
      'Workforce you tap for an ability in Main Phase 1 cannot attack in Combat, ' +
      'so hold your Tap abilities until Main Phase 2 if you intend to attack.</p>';
    html += '<ol class="rulebook-phases">';
    Glossary.PHASES.forEach(function(p, i) {
      html += '<li><span class="phase-num">' + (i + 1) + '</span>' + esc(p) + '</li>';
    });
    html += '</ol></section>';

    html += '<section class="rulebook-section">';
    html += '<h3>Resources</h3>';
    html += '<p>Five resources. Infrastructure in your Source Zone produces them ' +
      'during Upkeep, and every resource has at least one producer you can afford ' +
      'with Capital alone, so no colour can lock you out.</p>';
    html += chips(Glossary.RESOURCES);
    html += '</section>';

    html += '<section class="rulebook-section">';
    html += '<h3>Zones</h3>';
    html += '<p>Goods flow left to right: produced in the Source Zone, moved by ' +
      'Fleet through the Network Zone, consumed in the Customer Zone to fulfil ' +
      'Contracts.</p>';
    html += chips(Glossary.ZONES);
    html += '</section>';

    html += '<section class="rulebook-section">';
    html += '<h3>Card types</h3>';
    html += chips(Glossary.TYPES);
    html += '</section>';

    html += '<section class="rulebook-section">';
    html += '<h3>Rules reference</h3>';
    html += '<p>Every rule the game enforces is printed here or on a card face. ' +
      'Nothing is hidden in the software.</p>';
    html += list(Glossary.GLOBAL_RULES);
    html += '</section>';


    html += '<section class="rulebook-section">';
    html += '<h3>Keywords</h3>';
    html += '<p>These seven words are permanent once printed. Each one has a single ' +
      'fixed meaning wherever it appears.</p>';
    html += '<dl class="rulebook-keywords">';
    Glossary.KEYWORD_LIST.forEach(function(kw) {
      html += '<dt>' + esc(kw) + '</dt><dd>' + esc(Glossary.KEYWORDS[kw]) + '</dd>';
    });
    html += '</dl></section>';

    el.innerHTML = html;
  }

  function init() {
    render();
  }

  return { init: init, render: render };
}));
