/**
 * Playtest view.
 *
 * This file renders state and dispatches actions. It holds NO rules: every
 * decision goes through Rules.legalActions / Rules.apply, which is what lets
 * the same game run headless in sim/simulate.js. If you find yourself adding a
 * rule here, it belongs in js/rules.js.
 */
(function(root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(require('./rules.js'), require('./card-data.js'));
  } else {
    root.Playtest = factory(root.Rules, root.CardData);
  }
}(typeof window !== 'undefined' ? window : this, function(Rules, CardData) {
  'use strict';

  var PHASES = Rules.PHASES;
  var RESOURCES = Rules.RESOURCES;

  var state = null;
  var options = { archetypes: ['balanced', 'balanced'], seed: null, passDevice: true };
  var awaitingPass = false;

  function esc(s) {
    return CardRenderer.escapeHtml(String(s === undefined || s === null ? '' : s));
  }

  // ---------------------------------------------------------------------------
  // Action dispatch
  // ---------------------------------------------------------------------------
  function legal() {
    return state ? Rules.legalActions(state) : [];
  }

  function findAction(pred) {
    var acts = legal();
    for (var i = 0; i < acts.length; i++) if (pred(acts[i])) return acts[i];
    return null;
  }

  /**
   * uids arrive from DOM data-attributes as strings but live in state as
   * numbers, so they must never be compared with ===. Getting this wrong makes
   * the action silently never fire while remaining legal, which reads as a
   * frozen board.
   */
  function sameUid(a, b) {
    return String(a) === String(b);
  }

  function dispatch(action, failMessage) {
    if (!action) { if (failMessage) showMessage(failMessage); return false; }
    var before = state.currentPlayer;
    var res = Rules.apply(state, action);
    if (!res.ok) { if (failMessage) showMessage(failMessage); return false; }
    if (options.passDevice && state.currentPlayer !== before && !state.gameOver) {
      awaitingPass = true;
    }
    render();
    if (state.gameOver) showWinOverlay();
    return true;
  }


  function playCard(handIndex) {
    var player = state.players[Rules.actingPlayer(state)];
    var card = player.hand[handIndex];
    var action = findAction(function(a) { return a.k === 'play' && a.hand === handIndex; });
    if (!action && card) {
      var missing = Rules.missingResources(player, card);
      if (missing.length) {
        // Name the shortfall. The old build showed a flat "Insufficient
        // Resources", which is how an ungenerable resource went unnoticed.
        showMessage('Need ' + missing.map(function(m) { return m.amount + ' more ' + m.resource; }).join(' and ') +
          ' to play ' + card.name);
        return;
      }
      showMessage('Cannot play ' + card.name + ' right now (Main Phase only)');
      return;
    }
    dispatch(action);
  }

  function transitFleet(uid) {
    dispatch(findAction(function(a) { return a.k === 'transit' && sameUid(a.uid, uid); }),
      'That Fleet cannot transit: it needs Fuel, an available crew, a Transit action, and to be untapped.');
  }

  function tapCard(uid) {
    dispatch(findAction(function(a) { return a.k === 'tap' && sameUid(a.uid, uid); }),
      'That card cannot be tapped now (needs a Main Phase, an untapped and rested card, and any Goods its ability costs).');
  }

  function attackWith(uid) {
    dispatch(findAction(function(a) { return a.k === 'attack' && sameUid(a.uid, uid); }),
      'That Workforce cannot attack (Combat Phase only, and not the turn it arrives unless it has Rush).');
  }

  function blockWith(attackerUid, blockerUid) {
    dispatch(findAction(function(a) {
      return a.k === 'block' && sameUid(a.attacker, attackerUid) && sameUid(a.blocker, blockerUid);
    }), 'That card cannot block.');
  }

  function fulfill(uid) {
    dispatch(findAction(function(a) { return a.k === 'fulfill' && sameUid(a.uid, uid); }),
      'That Contract\'s requirements are not met yet.');
  }

  function doneBlocking() {
    dispatch(findAction(function(a) { return a.k === 'doneBlocking'; }));
  }

  function requisition(handIndex, resource) {
    dispatch({ k: 'requisition', hand: handIndex, resource: resource, actor: Rules.actingPlayer(state) },
      'Requisition is once per turn, during a Main Phase.');
  }


  function advancePhase() {
    if (!state || state.gameOver) return;
    if (state.combat.awaiting) { showMessage('Declare blockers first.'); return; }
    dispatch({ k: 'nextPhase', actor: Rules.actingPlayer(state) });
  }

  /**
   * End Turn runs every phase it passes through, including Delivery, and
   * auto-fulfills any Contract whose clauses are met. The old button jumped
   * straight to the End Step and silently forfeited the turn's only FP chance.
   */
  function endTurn() {
    if (!state || state.gameOver) return;
    dispatch({ k: 'endTurn', actor: state.currentPlayer });
  }

  // ---------------------------------------------------------------------------
  // Rendering
  // ---------------------------------------------------------------------------
  function render() {
    if (!state) return;
    var el = document.getElementById('pass-device');
    if (el) el.style.display = awaitingPass ? 'flex' : 'none';
    if (awaitingPass) {
      var who = document.getElementById('pass-device-name');
      if (who) who.textContent = state.players[state.currentPlayer].name;
      return;
    }
    renderPhaseBar();
    renderPlayerPanels();
    renderZones();
    renderHand();
    renderContracts();
    renderCombatPrompt();
    renderLog();
    renderControls();
  }

  function renderPhaseBar() {
    var bar = document.getElementById('phase-bar');
    if (!bar) return;
    var html = '';
    for (var i = 0; i < PHASES.length; i++) {
      var cls = 'phase-step' + (i === state.phase ? ' active' : '') + (i < state.phase ? ' done' : '');
      html += '<div class="' + cls + '">' + esc(PHASES[i]) + '</div>';
    }
    bar.innerHTML = html;
  }


  /** The seat whose hand and zones are on screen. */
  function viewIndex() {
    return Rules.actingPlayer(state);
  }

  /**
   * Both panels are rendered from ONE perspective: the bottom panel is always
   * the player whose board is on the bottom. Previously the zones followed
   * currentPlayer while the panels were bound to player index, so on Player 2's
   * turn the bottom of the screen showed P2's board under a "Player 1" panel.
   */
  function renderPlayerPanels() {
    renderPanel('p1', viewIndex(), true);
    renderPanel('p2', 1 - viewIndex(), false);
  }

  function renderPanel(prefix, playerIndex, isViewer) {
    var player = state.players[playerIndex];
    function set(id, value) {
      var el = document.getElementById(prefix + id);
      if (el) el.textContent = value;
    }
    set('-name', player.name + (isViewer ? ' (you)' : '') +
      (playerIndex === state.currentPlayer ? ' - active turn' : ''));
    set('-health', player.health);
    set('-fp', player.fp + ' / ' + state.config.winFp);
    set('-deck-count', player.deck.length);

    var resEl = document.getElementById(prefix + '-resources');
    if (resEl) {
      var html = '';
      for (var i = 0; i < RESOURCES.length; i++) {
        var res = RESOURCES[i];
        html += '<span class="res-counter res-' + res.toLowerCase() + '" title="' + res + '">';
        html += '<span class="res-icon">' + res.charAt(0) + '</span>';
        html += '<span class="res-value">' + player.resources[res] + '</span></span>';
      }
      html += '<span class="res-counter res-goods" title="Goods in storage">' +
        '<span class="res-icon">G</span><span class="res-value">' + Rules.storedGoods(player) + '</span></span>';
      resEl.innerHTML = html;
    }

    var infoEl = document.getElementById(prefix + '-info');
    if (infoEl) {
      infoEl.classList.toggle('active-player', playerIndex === state.currentPlayer);
    }
  }


  function renderZones() {
    var me = state.players[viewIndex()];
    var them = state.players[1 - viewIndex()];
    renderZoneCards('source-zone', me.source, true);
    renderZoneCards('network-zone', me.network, true);
    renderZoneCards('customer-zone', me.customer, true);
    renderZoneCards('opp-source-zone', them.source, false);
    renderZoneCards('opp-network-zone', them.network, false);
    renderZoneCards('opp-customer-zone', them.customer, false);
  }

  /** Badges make the physical state of a card visible: tokens, tapped, disabled. */
  function badges(card) {
    var html = '';
    if (card.type === 'Infrastructure' && card.stored) {
      html += '<div class="badge badge-goods" title="Goods stored">' + card.stored + ' Goods</div>';
    }
    if (card.type === 'Fleet' && card.carrying) {
      html += '<div class="badge badge-cargo" title="Goods loaded">' + card.carrying + ' Cargo</div>';
    }
    if (card.tapped) html += '<div class="badge badge-tapped">Tapped</div>';
    if (card.disabledFor > 0) html += '<div class="badge badge-disabled">Disabled ' + card.disabledFor + '</div>';
    if (!card.ready && card.type !== 'Contracts') html += '<div class="badge badge-new">Arriving</div>';
    if (card.attacked) html += '<div class="badge badge-attacked">Attacked</div>';
    return html;
  }

  function actionFor(card) {
    var acts = legal();
    for (var i = 0; i < acts.length; i++) {
      var a = acts[i];
      if (a.uid === card.uid && (a.k === 'transit' || a.k === 'attack' || a.k === 'tap')) return a;
    }
    return null;
  }

  function renderZoneCards(elementId, cards, interactive) {
    var el = document.getElementById(elementId);
    if (!el) return;
    if (!cards.length) { el.innerHTML = '<div class="zone-empty">Empty</div>'; return; }
    var html = '';
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var action = interactive ? actionFor(card) : null;
      var cls = 'zone-card' + (action ? ' clickable action-' + action.k : '') + (card.tapped ? ' is-tapped' : '');
      html += '<div class="' + cls + '" data-uid="' + card.uid + '"' +
        (action ? ' data-action="' + action.k + '"' : '') +
        ' title="' + esc(card.name + ' - ' + (card.rulesText || '')) + '">';
      html += CardRenderer.renderCached(card, { size: 'small' });
      html += badges(card);
      if (action) html += '<div class="action-hint">' + esc(actionLabel(action)) + '</div>';
      html += '</div>';
    }
    el.innerHTML = html;
  }

  function actionLabel(action) {
    if (action.k === 'transit') return 'Transit ->';
    if (action.k === 'attack') return 'Attack';
    if (action.k === 'tap') return 'Tap';
    return action.k;
  }


  function renderHand() {
    var el = document.getElementById('player-hand');
    if (!el) return;
    var player = state.players[viewIndex()];
    if (!player.hand.length) { el.innerHTML = '<div class="hand-empty">No cards in hand</div>'; return; }
    var playableIdx = {};
    legal().forEach(function(a) { if (a.k === 'play') playableIdx[a.hand] = true; });

    var html = '';
    for (var i = 0; i < player.hand.length; i++) {
      var card = player.hand[i];
      var playable = !!playableIdx[i];
      html += '<div class="hand-card' + (playable ? ' playable' : ' unplayable') + '" data-index="' + i + '"' +
        (playable ? ' data-action="play"' : '') + '>';
      html += CardRenderer.renderCached(card, { size: 'small' });
      if (!playable) {
        var missing = Rules.missingResources(player, card);
        if (missing.length) {
          // Name the missing resource on the card itself.
          html += '<div class="card-overlay-cost">Need ' +
            missing.map(function(m) { return m.amount + ' ' + m.resource; }).join(', ') + '</div>';
        }
      }
      html += '<button class="zoom-btn" data-zoom="' + i + '" title="Enlarge card">+</button>';
      html += '</div>';
    }
    el.innerHTML = html;
  }

  /**
   * Contracts show every clause with met/unmet state. A player can now plan
   * against a Contract instead of reading a name and an FP number.
   */
  function renderContracts() {
    var el = document.getElementById('active-contracts');
    if (!el) return;
    var pi = viewIndex();
    var player = state.players[pi];
    if (!player.contracts.length) {
      el.innerHTML = '<div class="contracts-empty">No active contracts. Play a Contract card in a Main Phase.</div>';
      return;
    }
    var fulfillable = {};
    legal().forEach(function(a) { if (a.k === 'fulfill') fulfillable[a.uid] = true; });

    var html = '';
    player.contracts.forEach(function(card) {
      var clauses = Rules.contractStatus(state, pi, card);
      var met = clauses.filter(function(c) { return c.met; }).length;
      html += '<div class="contract-card' + (fulfillable[card.uid] ? ' ready' : '') + '">';
      html += '<div class="contract-head"><span class="contract-name">' + esc(card.name) + '</span>' +
        '<span class="contract-reward">' + Number(card.fpReward) + ' FP</span>' +
        '<span class="contract-progress">' + met + '/' + clauses.length + '</span></div>';
      html += '<ul class="contract-clauses">';
      clauses.forEach(function(c) {
        html += '<li class="' + (c.met ? 'clause-met' : 'clause-unmet') + '">' +
          (c.met ? '\u2713 ' : '\u2717 ') + esc(c.label) + '</li>';
      });
      html += '</ul>';
      if (fulfillable[card.uid]) {
        html += '<button class="btn-fulfill" data-fulfill="' + card.uid + '">Fulfill for ' +
          Number(card.fpReward) + ' FP</button>';
      }
      html += '</div>';
    });
    el.innerHTML = html;
  }


  /** The defender's block step gets an explicit prompt. */
  function renderCombatPrompt() {
    var el = document.getElementById('combat-prompt');
    if (!el) return;
    if (!state.combat.awaiting) { el.style.display = 'none'; el.innerHTML = ''; return; }
    el.style.display = 'block';
    var defenderIndex = 1 - state.currentPlayer;
    var attacker = state.players[state.currentPlayer];
    var blocks = state.combat.blocks;
    var html = '<h4>' + esc(state.players[defenderIndex].name) + ': declare blockers</h4>';
    state.combat.attackers.forEach(function(uid) {
      var att = Rules.find(attacker.network, uid);
      if (!att) return;
      var blockerUid = blocks[uid];
      html += '<div class="block-row"><span class="block-attacker">' + esc(att.name) + ' (Power ' +
        Number(att.stats.power) + ')</span>';
      if (blockerUid) {
        var blk = Rules.find(state.players[defenderIndex].network, blockerUid);
        html += '<span class="block-assigned">blocked by ' + esc(blk ? blk.name : '?') + '</span>';
      } else {
        var choices = legal().filter(function(a) { return a.k === 'block' && a.attacker === uid; });
        if (!choices.length) html += '<span class="block-none">unblocked</span>';
        else {
          html += '<select class="block-select" data-attacker="' + uid + '">' +
            '<option value="">-- leave unblocked --</option>';
          choices.forEach(function(a) {
            var card = Rules.find(state.players[defenderIndex].network, a.blocker);
            html += '<option value="' + a.blocker + '">' + esc(card.name) + ' (' +
              (card.type === 'Fleet' ? '0/' + Number(card.stats.capacity) + ' barricade'
                : Number(card.stats.power) + '/' + Number(card.stats.toughness)) + ')</option>';
          });
          html += '</select>';
        }
      }
      html += '</div>';
    });
    html += '<button class="btn-primary" id="btn-done-blocking">Resolve Combat</button>';
    el.innerHTML = html;
  }

  function renderLog() {
    var el = document.getElementById('game-log');
    if (!el) return;
    // Grouped by turn and generous: auto phases emit several lines each, and the
    // 15-entry window scrolled away the explanation of the turn.
    var entries = state.log.slice(-60);
    var html = '';
    var lastKey = null;
    entries.forEach(function(entry) {
      var key = entry.turn + '|' + entry.phase;
      if (key !== lastKey) {
        html += '<div class="log-head">Turn ' + entry.turn + ' - ' + esc(entry.phase) + '</div>';
        lastKey = key;
      }
      html += '<div class="log-entry">' + esc(entry.msg) + '</div>';
    });
    el.innerHTML = html;
    el.scrollTop = el.scrollHeight;
  }


  function renderControls() {
    var nextBtn = document.getElementById('btn-next-phase');
    var endBtn = document.getElementById('btn-end-turn');
    var blocking = state.combat.awaiting;
    if (nextBtn) {
      nextBtn.disabled = state.gameOver || blocking;
      var next = PHASES[state.phase + 1];
      nextBtn.textContent = blocking ? 'Waiting for blockers'
        : 'Next Phase' + (next ? ' (' + next + ')' : ' (End Turn)');
    }
    if (endBtn) {
      endBtn.disabled = state.gameOver || blocking;
      endBtn.title = 'Runs the remaining phases, including Delivery';
    }
    var info = document.getElementById('turn-info');
    if (info) {
      info.textContent = 'Turn ' + state.turn + ' - ' + state.players[state.currentPlayer].name +
        ' - ' + PHASES[state.phase] +
        ' | Transit actions left: ' + state.players[state.currentPlayer].transitBudget;
    }
    var reqBar = document.getElementById('requisition-bar');
    if (reqBar) {
      var canReq = legal().some(function(a) { return a.k === 'requisition'; });
      reqBar.style.display = canReq ? 'flex' : 'none';
      if (canReq && !reqBar.dataset.built) {
        reqBar.dataset.built = '1';
        var html = '<span class="req-label">Requisition (discard 1 card for 1 resource, once per turn):</span>';
        RESOURCES.forEach(function(res) {
          html += '<button data-requisition="' + res + '">' + res + '</button>';
        });
        reqBar.innerHTML = html;
      }
    }
  }

  function showMessage(msg) {
    var el = document.getElementById('playtest-message');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('visible');
    clearTimeout(el._timer);
    el._timer = setTimeout(function() { el.classList.remove('visible'); }, 3200);
  }

  function showWinOverlay() {
    var overlay = document.getElementById('win-overlay');
    if (!overlay) return;
    var title = overlay.querySelector('.win-title');
    var sub = overlay.querySelector('.win-subtitle');
    if (title) title.textContent = state.winner === null ? 'Draw' : state.players[state.winner].name + ' wins!';
    if (sub) sub.textContent = state.winReason || '';
    overlay.classList.add('visible');
  }

  function hideWinOverlay() {
    var overlay = document.getElementById('win-overlay');
    if (overlay) overlay.classList.remove('visible');
  }

  // ---------------------------------------------------------------------------
  // Click-to-zoom. Board and hand cards render at card-small, which sets rules
  // text to 7px - unreadable exactly where decisions get made. Any card on
  // screen can be enlarged to the full frame.
  // ---------------------------------------------------------------------------
  function allVisibleCards() {
    if (!state) return [];
    var out = [];
    state.players.forEach(function(p) {
      out = out.concat(p.hand, p.source, p.network, p.customer, p.contracts);
    });
    return out;
  }

  function findByUid(uid) {
    var all = allVisibleCards();
    for (var i = 0; i < all.length; i++) {
      if (String(all[i].uid) === String(uid)) return all[i];
    }
    return null;
  }

  function showZoom(card) {
    if (!card) return;
    var overlay = document.getElementById('zoom-overlay');
    var body = document.getElementById('zoom-body');
    if (!overlay || !body) return;
    var html = CardRenderer.renderCard(card, { size: 'large' });
    if (card.loreText) html += '<div class="zoom-lore">' + esc(card.loreText) + '</div>';
    if (card.keywords && card.keywords.length) {
      html += '<div class="zoom-keywords">';
      card.keywords.forEach(function(kw) {
        html += '<div class="zoom-keyword"><strong>' + esc(kw) + '</strong>: ' +
          esc(Rules.Glossary.KEYWORDS[kw] || '') + '</div>';
      });
      html += '</div>';
    }
    body.innerHTML = html;
    overlay.classList.add('visible');
  }

  function hideZoom() {
    var overlay = document.getElementById('zoom-overlay');
    if (overlay) overlay.classList.remove('visible');
  }


  // ---------------------------------------------------------------------------
  // Event wiring. All board interaction is delegated from stable containers so
  // re-rendering innerHTML never drops a listener.
  // ---------------------------------------------------------------------------
  function bindEvents() {
    var board = document.getElementById('playtest-board');
    if (board && !board.dataset.bound) {
      board.dataset.bound = '1';
      board.addEventListener('click', onBoardClick);
      board.addEventListener('change', onBoardChange);
    }

    var pass = document.getElementById('btn-pass-continue');
    if (pass && !pass.dataset.bound) {
      pass.dataset.bound = '1';
      pass.addEventListener('click', function() {
        awaitingPass = false;
        render();
      });
    }

    var zoomClose = document.getElementById('zoom-close');
    if (zoomClose && !zoomClose.dataset.bound) {
      zoomClose.dataset.bound = '1';
      zoomClose.addEventListener('click', hideZoom);
    }
    var zoomOverlay = document.getElementById('zoom-overlay');
    if (zoomOverlay && !zoomOverlay.dataset.bound) {
      zoomOverlay.dataset.bound = '1';
      zoomOverlay.addEventListener('click', function(e) {
        if (e.target === zoomOverlay) hideZoom();
      });
    }
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') hideZoom();
    });
  }

  function onBoardClick(e) {
    if (!state) return;

    var zoomBtn = e.target.closest('[data-zoom]');
    if (zoomBtn) {
      e.stopPropagation();
      var player = state.players[viewIndex()];
      showZoom(player.hand[Number(zoomBtn.getAttribute('data-zoom'))]);
      return;
    }


    var fulfillBtn = e.target.closest('[data-fulfill]');
    if (fulfillBtn) { fulfill(fulfillBtn.getAttribute('data-fulfill')); return; }

    var reqBtn = e.target.closest('[data-requisition]');
    if (reqBtn) { requisition(0, reqBtn.getAttribute('data-requisition')); return; }

    if (e.target.id === 'btn-done-blocking') { doneBlocking(); return; }

    var handCard = e.target.closest('.hand-card');
    if (handCard) {
      playCard(Number(handCard.getAttribute('data-index')));
      return;
    }

    var zoneCard = e.target.closest('.zone-card');
    if (zoneCard) {
      var uid = zoneCard.getAttribute('data-uid');
      var action = zoneCard.getAttribute('data-action');
      // A card with no available action zooms instead of doing nothing silently.
      if (action === 'transit') transitFleet(uid);
      else if (action === 'attack') attackWith(uid);
      else if (action === 'tap') tapCard(uid);
      else showZoom(findByUid(uid));
      return;
    }
  }

  /** Blocker assignment comes from the select elements in the combat prompt. */
  function onBoardChange(e) {
    var sel = e.target.closest('.block-select');
    if (!sel || !sel.value) return;
    blockWith(sel.getAttribute('data-attacker'), sel.value);
  }

  // ---------------------------------------------------------------------------
  // Game lifecycle
  // ---------------------------------------------------------------------------
  function readOptions() {
    function val(id, fallback) {
      var el = document.getElementById(id);
      return el && el.value ? el.value : fallback;
    }
    options.archetypes = [val('deck-p1', 'balanced'), val('deck-p2', 'balanced')];
    var seedRaw = val('game-seed', '');
    options.seed = seedRaw === '' ? (Date.now() % 2147483647) : Rules.Rng.hash(seedRaw);
    var passEl = document.getElementById('pass-device-toggle');
    options.passDevice = passEl ? !!passEl.checked : true;
  }


  function startGame() {
    readOptions();
    state = Rules.createGame({
      pool: CardData,
      seed: options.seed,
      archetypes: options.archetypes,
      names: ['Player 1', 'Player 2']
    });
    awaitingPass = false;
    hideWinOverlay();
    var setup = document.getElementById('playtest-setup');
    var board = document.getElementById('playtest-board');
    if (setup) setup.style.display = 'none';
    if (board) board.style.display = 'block';
    var seedOut = document.getElementById('seed-readout');
    if (seedOut) seedOut.textContent = 'Seed ' + state.seed;
    bindEvents();
    render();
  }

  function newGame() {
    state = null;
    awaitingPass = false;
    hideWinOverlay();
    hideZoom();
    var setup = document.getElementById('playtest-setup');
    var board = document.getElementById('playtest-board');
    if (setup) setup.style.display = 'block';
    if (board) board.style.display = 'none';
  }

  /** Populate the deck-archetype selects from the rules core, not a hard-coded list. */
  function populateSetup() {
    ['deck-p1', 'deck-p2'].forEach(function(id) {
      var sel = document.getElementById(id);
      if (!sel || sel.options.length) return;
      Rules.ARCHETYPES.forEach(function(name) {
        var opt = document.createElement('option');
        opt.value = name;
        opt.textContent = name.charAt(0).toUpperCase() + name.slice(1);
        sel.appendChild(opt);
      });
      sel.value = 'balanced';
    });
  }


  function init() {
    // One shared <defs> for every cost pip on the page, instead of one per pip.
    if (!document.getElementById('sc-sprite-defs')) {
      var holder = document.createElement('div');
      holder.id = 'sc-sprite-defs';
      holder.innerHTML = CardRenderer.spriteDefs();
      document.body.appendChild(holder);
    }
    populateSetup();
    bindEvents();
  }

  return {
    init: init,
    startGame: startGame,
    newGame: newGame,
    advancePhase: advancePhase,
    endTurn: endTurn,
    // Exposed so the state is reachable for debugging and for the headless
    // harness. The old build kept `game` module-private, which is why the
    // review had to patch the file before it could simulate a single game.
    getState: function() { return state; },
    setState: function(next) { state = next; render(); },
    legalActions: legal,
    apply: function(action) { return dispatch(action); },
    render: render
  };
}));
