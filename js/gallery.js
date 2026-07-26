(function(root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.Gallery = factory();
  }
}(typeof window !== 'undefined' ? window : this, function() {
  'use strict';

  var state = {
    cards: [],
    filteredCards: [],
    activeTypes: [],
    activeRarities: [],
    searchQuery: '',
    sortMode: 'number'
  };

  var elements = {};
  var svgCache = {}; // Cache SVG art by card ID
  var searchDebounceTimer = null;
  var SEARCH_DEBOUNCE_MS = 200;

  function init() {
    if (typeof CardData === 'undefined' || typeof CardRenderer === 'undefined') {
      console.error('Gallery: CardData or CardRenderer not loaded');
      return;
    }

    state.cards = CardData;
    state.filteredCards = state.cards.slice();

    cacheElements();
    bindEvents();
    renderCards();
    updateCount();
    setupTabs();
  }

  function cacheElements() {
    elements.grid = document.getElementById('card-grid');
    elements.searchInput = document.getElementById('gallery-search');
    elements.cardCount = document.getElementById('card-count');
    elements.modal = document.getElementById('card-modal');
    elements.modalContent = document.getElementById('modal-card-content');
    elements.modalDetails = document.getElementById('modal-details');
    elements.typeFilters = document.querySelectorAll('.filter-btn[data-type]');
    elements.rarityFilters = document.querySelectorAll('.filter-btn[data-rarity]');
    elements.sortButtons = document.querySelectorAll('.sort-btn[data-sort]');
  }

  function bindEvents() {
    // Search with debounce
    if (elements.searchInput) {
      elements.searchInput.addEventListener('input', function() {
        var self = this;
        if (searchDebounceTimer) {
          clearTimeout(searchDebounceTimer);
        }
        searchDebounceTimer = setTimeout(function() {
          state.searchQuery = self.value.toLowerCase().trim();
          applyFilters();
        }, SEARCH_DEBOUNCE_MS);
      });
    }

    // Type filters
    for (var i = 0; i < elements.typeFilters.length; i++) {
      elements.typeFilters[i].addEventListener('click', function() {
        var type = this.getAttribute('data-type');
        toggleFilter(state.activeTypes, type, this);
        applyFilters();
      });
    }

    // Rarity filters
    for (var j = 0; j < elements.rarityFilters.length; j++) {
      elements.rarityFilters[j].addEventListener('click', function() {
        var rarity = this.getAttribute('data-rarity');
        toggleFilter(state.activeRarities, rarity, this);
        applyFilters();
      });
    }

    // Sort buttons
    for (var k = 0; k < elements.sortButtons.length; k++) {
      elements.sortButtons[k].addEventListener('click', function() {
        var sort = this.getAttribute('data-sort');
        state.sortMode = sort;
        // Update active state
        for (var s = 0; s < elements.sortButtons.length; s++) {
          elements.sortButtons[s].classList.remove('active');
        }
        this.classList.add('active');
        applyFilters();
      });
    }

    // Modal close
    if (elements.modal) {
      elements.modal.addEventListener('click', function(e) {
        if (e.target === elements.modal || e.target.classList.contains('modal-close')) {
          closeModal();
        }
      });
    }

    // Escape key closes modal
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeModal();
      }
    });

    // Card click delegation
    if (elements.grid) {
      elements.grid.addEventListener('click', function(e) {
        var cardEl = e.target.closest('.card-frame');
        if (cardEl) {
          var cardId = cardEl.getAttribute('data-card-id');
          openModal(cardId);
        }
      });
    }
  }

  function toggleFilter(arr, value, btnEl) {
    var idx = arr.indexOf(value);
    if (idx === -1) {
      arr.push(value);
      btnEl.classList.add('active');
    } else {
      arr.splice(idx, 1);
      btnEl.classList.remove('active');
    }
  }

  function applyFilters() {
    var filtered = state.cards.filter(function(card) {
      // Type filter
      if (state.activeTypes.length > 0 && state.activeTypes.indexOf(card.type) === -1) {
        return false;
      }
      // Rarity filter
      if (state.activeRarities.length > 0 && state.activeRarities.indexOf(card.rarity) === -1) {
        return false;
      }
      // Search filter
      var haystack = (card.name + ' ' + (card.rulesText || '') + ' ' + (card.loreText || '')).toLowerCase();
      if (state.searchQuery && haystack.indexOf(state.searchQuery) === -1) {
        return false;
      }
      return true;
    });

    // Sort
    filtered.sort(function(a, b) {
      switch (state.sortMode) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'cost':
          return getTotalCost(a) - getTotalCost(b);
        case 'number':
        default:
          return parseInt(a.id, 10) - parseInt(b.id, 10);
      }
    });

    state.filteredCards = filtered;
    renderCards();
    updateCount();
  }

  function getTotalCost(card) {
    if (!card.cost) return 0;
    return (card.cost.Capital || 0) + (card.cost.Labor || 0) +
           (card.cost.Fuel || 0) + (card.cost.Data || 0) + (card.cost.Time || 0);
  }

  function renderCards() {
    if (!elements.grid) return;
    var html = '';
    for (var i = 0; i < state.filteredCards.length; i++) {
      var card = state.filteredCards[i];
      // Shared with the playtest board via CardRenderer's cache.
      html += CardRenderer.renderCached(card, { size: 'normal' });
    }
    elements.grid.innerHTML = html;
  }

  function updateCount() {
    if (!elements.cardCount) return;
    elements.cardCount.textContent = 'Showing ' + state.filteredCards.length + ' of ' + state.cards.length + ' cards';
  }

  function openModal(cardId) {
    var card = null;
    for (var i = 0; i < state.cards.length; i++) {
      if (state.cards[i].id === cardId) {
        card = state.cards[i];
        break;
      }
    }
    if (!card || !elements.modal) return;

    // Render large card
    if (elements.modalContent) {
      elements.modalContent.innerHTML = CardRenderer.renderCard(card, { size: 'large' });
    }

    // Render details
    if (elements.modalDetails) {
      var detailsHtml = '';
      detailsHtml += '<h3>' + escapeHtml(card.name) + '</h3>';
      detailsHtml += '<p><span class="detail-label">Type:</span> ' + escapeHtml(card.type) + ' - ' + escapeHtml(card.subtype || '') + '</p>';
      detailsHtml += '<p><span class="detail-label">Rarity:</span> ' + escapeHtml(card.rarity) + '</p>';
      detailsHtml += '<p><span class="detail-label">Cost:</span> ' + formatCostText(card.cost) + '</p>';

      if (card.rulesText) {
        detailsHtml += '<p><span class="detail-label">Rules:</span> ' + escapeHtml(card.rulesText) + '</p>';
      }

      if (card.produces) {
        var prod = Object.keys(card.produces).filter(function(r) { return card.produces[r]; })
          .map(function(r) { return card.produces[r] + ' ' + r; }).join(', ');
        if (prod) {
          detailsHtml += '<p><span class="detail-label">Produces each Upkeep:</span> ' +
            escapeHtml(prod) + ' and ' + Number(card.goods || 0) + ' Goods</p>';
        }
      }

      if (card.loreText) {
        detailsHtml += '<p><span class="detail-label">Design intent:</span> <span style="color:#9aa">' +
          escapeHtml(card.loreText) + '</span></p>';
      }

      if (card.flavorText) {
        detailsHtml += '<p style="font-style:italic;color:#888;">"' + escapeHtml(card.flavorText) + '"</p>';
      }

      if (card.keywords && card.keywords.length > 0) {
        detailsHtml += '<div class="modal-keywords">';
        for (var k = 0; k < card.keywords.length; k++) {
          detailsHtml += '<span class="keyword-tag">' + escapeHtml(card.keywords[k]) + '</span>';
        }
        detailsHtml += '</div>';
      }

      // Contract-specific details
      if (card.type === 'Contracts') {
        if (card.requirements) {
          // Was escapeHtml(object) -> "[object Object]" on all 15 Contracts.
          detailsHtml += '<p><span class="detail-label">Requirements:</span> ' +
            escapeHtml(CardRenderer.formatRequirements(card)) + '</p>';
        }
        if (card.fpReward !== undefined) {
          detailsHtml += '<p><span class="detail-label">FP Reward:</span> ' + Number(card.fpReward) + '</p>';
        }
      }

      elements.modalDetails.innerHTML = detailsHtml;
    }

    elements.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!elements.modal) return;
    elements.modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function formatCostText(cost) {
    if (!cost) return 'Free';
    var parts = [];
    if (cost.Capital) parts.push(cost.Capital + ' Capital');
    if (cost.Labor) parts.push(cost.Labor + ' Labor');
    if (cost.Fuel) parts.push(cost.Fuel + ' Fuel');
    if (cost.Data) parts.push(cost.Data + ' Data');
    if (cost.Time) parts.push(cost.Time + ' Time');
    return parts.length > 0 ? parts.join(', ') : 'Free';
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;')
                      .replace(/</g, '&lt;')
                      .replace(/>/g, '&gt;')
                      .replace(/"/g, '&quot;');
  }

  function setupTabs() {
    var tabs = document.querySelectorAll('.nav-tab');
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener('click', function() {
        var target = this.getAttribute('data-tab');
        // Remove active from all tabs
        for (var t = 0; t < tabs.length; t++) {
          tabs[t].classList.remove('active');
        }
        this.classList.add('active');
        // Show/hide sections
        var sections = document.querySelectorAll('.view-section');
        for (var s = 0; s < sections.length; s++) {
          sections[s].classList.remove('active');
        }
        var targetSection = document.getElementById(target);
        if (targetSection) {
          targetSection.classList.add('active');
        }
      });
    }
  }

  return {
    init: init
  };
}));
