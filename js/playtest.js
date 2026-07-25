(function(root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.Playtest = factory();
  }
}(typeof window !== 'undefined' ? window : this, function() {
  'use strict';

  // ---------- Constants ----------
  var PHASES = ['Upkeep', 'Draw', 'Main Phase 1', 'Transit', 'Delivery', 'Combat', 'Main Phase 2', 'End Step'];
  var RESOURCES = ['Capital', 'Labor', 'Fuel', 'Data', 'Time'];
  var STARTING_HEALTH = 20;
  var STARTING_FP = 0;
  var MAX_HAND_SIZE = 7;
  var DECK_SIZE = 40;
  var WIN_FP = 10;

  // Minimum card counts for balanced deck
  var DECK_MINIMUMS = {
    'Infrastructure': 8,
    'Workforce': 8,
    'Fleet': 6,
    'Operations': 8,
    'Disruptions': 5,
    'Contracts': 3
  };

  // ---------- Game State ----------
  var game = null;

  function createPlayerState(playerNum) {
    return {
      name: 'Player ' + playerNum,
      deck: [],
      hand: [],
      discard: [],
      health: STARTING_HEALTH,
      fp: STARTING_FP,
      resources: { Capital: 0, Labor: 0, Fuel: 0, Data: 0, Time: 0 },
      sourceZone: [],
      networkZone: [],
      customerZone: [],
      contracts: []
    };
  }

  function createGameState() {
    return {
      players: [createPlayerState(1), createPlayerState(2)],
      currentPlayer: 0,
      currentPhase: 0,
      turn: 1,
      started: false,
      gameOver: false,
      winner: null,
      log: []
    };
  }

  // ---------- Deck Building ----------
  function buildRandomBalancedDeck() {
    var allCards = typeof CardData !== 'undefined' ? CardData : [];
    if (allCards.length === 0) return [];

    var byType = {};
    for (var i = 0; i < allCards.length; i++) {
      var card = allCards[i];
      if (!byType[card.type]) byType[card.type] = [];
      byType[card.type].push(card);
    }

    var deck = [];
    var types = Object.keys(DECK_MINIMUMS);

    // Fill minimum requirements
    for (var t = 0; t < types.length; t++) {
      var type = types[t];
      var pool = byType[type] ? byType[type].slice() : [];
      shuffleArray(pool);
      var count = DECK_MINIMUMS[type];
      for (var c = 0; c < count && c < pool.length; c++) {
        deck.push(JSON.parse(JSON.stringify(pool[c])));
      }
    }

    // Fill remaining slots from all cards
    var remaining = DECK_SIZE - deck.length;
    var deckIds = {};
    for (var d = 0; d < deck.length; d++) {
      deckIds[deck[d].id] = true;
    }

    var extras = allCards.filter(function(card) {
      return !deckIds[card.id];
    });
    shuffleArray(extras);

    for (var e = 0; e < remaining && e < extras.length; e++) {
      deck.push(JSON.parse(JSON.stringify(extras[e])));
    }

    shuffleArray(deck);
    return deck;
  }

  function shuffleArray(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  // ---------- Game Actions ----------
  function drawCard(player) {
    if (player.deck.length === 0) {
      addLog(player.name + ' has no cards to draw!');
      return false;
    }
    if (player.hand.length >= MAX_HAND_SIZE) {
      addLog(player.name + '\'s hand is full!');
      return false;
    }
    var card = player.deck.pop();
    player.hand.push(card);
    addLog(player.name + ' drew ' + card.name);
    return true;
  }

  function drawInitialHand(player) {
    for (var i = 0; i < MAX_HAND_SIZE && player.deck.length > 0; i++) {
      player.hand.push(player.deck.pop());
    }
  }

  function canPayCost(player, card) {
    if (!card.cost) return true;
    for (var i = 0; i < RESOURCES.length; i++) {
      var res = RESOURCES[i];
      if ((card.cost[res] || 0) > player.resources[res]) {
        return false;
      }
    }
    return true;
  }

  function payCost(player, card) {
    if (!card.cost) return;
    for (var i = 0; i < RESOURCES.length; i++) {
      var res = RESOURCES[i];
      player.resources[res] -= (card.cost[res] || 0);
    }
  }

  function getPrimaryResource(card) {
    if (!card.cost) return 'Capital';
    var maxRes = 'Capital';
    var maxVal = 0;
    for (var i = 0; i < RESOURCES.length; i++) {
      var res = RESOURCES[i];
      var val = card.cost[res] || 0;
      if (val > maxVal) {
        maxVal = val;
        maxRes = res;
      }
    }
    return maxRes;
  }

  function playCard(handIndex) {
    if (!game || game.gameOver) return;

    var phase = PHASES[game.currentPhase];
    if (phase !== 'Main Phase 1' && phase !== 'Main Phase 2') {
      showMessage('You can only play cards during Main Phases!');
      return;
    }

    var player = game.players[game.currentPlayer];
    var card = player.hand[handIndex];
    if (!card) return;

    if (!canPayCost(player, card)) {
      showMessage('Not enough resources to play ' + card.name + '!');
      return;
    }

    // Pay cost
    payCost(player, card);

    // Remove from hand
    player.hand.splice(handIndex, 1);

    // Place card based on type
    switch (card.type) {
      case 'Infrastructure':
        player.sourceZone.push(card);
        addLog(player.name + ' deployed ' + card.name + ' to Source Zone');
        break;
      case 'Workforce':
        player.networkZone.push(card);
        addLog(player.name + ' deployed ' + card.name + ' to Network Zone');
        break;
      case 'Fleet':
        player.networkZone.push(card);
        addLog(player.name + ' deployed ' + card.name + ' to Network Zone');
        break;
      case 'Operations':
        addLog(player.name + ' played ' + card.name + ' (effect resolves)');
        // Operations resolve immediately - give a small resource bonus
        var bonusRes = getPrimaryResource(card);
        player.resources[bonusRes] += 2;
        addLog(card.name + ' grants +2 ' + bonusRes);
        player.discard.push(card);
        break;
      case 'Disruptions':
        addLog(player.name + ' played ' + card.name + ' (disrupting opponent)');
        var opponent = game.players[1 - game.currentPlayer];
        // Disruptions deal 1 damage to opponent health
        opponent.health -= 1;
        addLog(card.name + ' deals 1 damage to ' + opponent.name);
        player.discard.push(card);
        checkWinCondition();
        break;
      case 'Contracts':
        player.contracts.push(card);
        addLog(player.name + ' placed Contract: ' + card.name);
        break;
      default:
        player.discard.push(card);
        break;
    }

    render();
  }

  function transitFleet(zoneIndex) {
    if (!game || game.gameOver) return;
    var phase = PHASES[game.currentPhase];
    if (phase !== 'Transit') {
      showMessage('Fleet can only transit during the Transit Phase!');
      return;
    }

    var player = game.players[game.currentPlayer];
    if (zoneIndex < 0 || zoneIndex >= player.networkZone.length) return;

    var card = player.networkZone[zoneIndex];
    if (card.type !== 'Fleet') {
      showMessage('Only Fleet cards can transit!');
      return;
    }

    // Move Fleet from Network to Customer Zone
    player.networkZone.splice(zoneIndex, 1);
    player.customerZone.push(card);
    addLog(player.name + ' moved ' + card.name + ' to Customer Zone');
    render();
  }

  function attackWithWorkforce(zoneIndex) {
    if (!game || game.gameOver) return;
    var phase = PHASES[game.currentPhase];
    if (phase !== 'Combat') {
      showMessage('Combat only happens during the Combat Phase!');
      return;
    }

    var player = game.players[game.currentPlayer];
    if (zoneIndex < 0 || zoneIndex >= player.networkZone.length) return;

    var card = player.networkZone[zoneIndex];
    if (card.type !== 'Workforce') {
      showMessage('Only Workforce cards can attack!');
      return;
    }

    var power = (card.stats && card.stats.power) ? card.stats.power : 1;
    var opponent = game.players[1 - game.currentPlayer];
    opponent.health -= power;
    addLog(player.name + '\'s ' + card.name + ' attacks for ' + power + ' damage!');
    card._attacked = true;
    checkWinCondition();
    render();
  }

  // ---------- Phase Logic ----------
  function runUpkeep() {
    var player = game.players[game.currentPlayer];

    // Generate resources from Infrastructure
    for (var i = 0; i < player.sourceZone.length; i++) {
      var infra = player.sourceZone[i];
      var res = getPrimaryResource(infra);
      player.resources[res] += 1;
    }

    // Base resource income: 1 Capital per turn
    player.resources.Capital += 1;

    if (player.sourceZone.length > 0) {
      addLog(player.name + ' gained resources from ' + player.sourceZone.length + ' Infrastructure');
    }
    addLog(player.name + ' gained 1 Capital (base income)');
  }

  function runDraw() {
    var player = game.players[game.currentPlayer];
    drawCard(player);
  }

  function runTransit() {
    // Transit is player-driven - they click Fleet cards to move them
    addLog('Transit Phase - click Fleet cards in Network Zone to move them');
  }

  function checkContractRequirements(player, contract) {
    var reqs = contract.requirements;
    if (!reqs) return true; // No requirements means auto-fulfill

    var fleetInCustomer = player.customerZone.filter(function(c) { return c.type === 'Fleet'; });

    // Check fleet capacity requirement
    if (reqs.fleetCapacity !== undefined) {
      var totalCapacity = 0;
      for (var i = 0; i < fleetInCustomer.length; i++) {
        totalCapacity += (fleetInCustomer[i].stats && fleetInCustomer[i].stats.capacity) ? fleetInCustomer[i].stats.capacity : 0;
      }
      if (totalCapacity < reqs.fleetCapacity) return false;
    }

    // Check fleet speed requirement
    if (reqs.fleetSpeed !== undefined) {
      var hasSpeed = false;
      for (var s = 0; s < fleetInCustomer.length; s++) {
        if (fleetInCustomer[s].stats && fleetInCustomer[s].stats.speed >= reqs.fleetSpeed) {
          hasSpeed = true;
          break;
        }
      }
      if (!hasSpeed) return false;
    }

    // Check fleet type requirement (subtype match)
    if (reqs.fleetType) {
      var hasType = false;
      for (var ft = 0; ft < fleetInCustomer.length; ft++) {
        if (fleetInCustomer[ft].subtype && fleetInCustomer[ft].subtype.toLowerCase().indexOf(reqs.fleetType.toLowerCase()) !== -1) {
          hasType = true;
          break;
        }
      }
      if (!hasType) return false;
    }

    // Check fleetTypes: "all" - player must have at least one Fleet card of each
    // unique Fleet subtype present across all zones (Source, Network, Customer)
    if (reqs.fleetTypes === 'all') {
      var allFleetCards = player.sourceZone.concat(player.networkZone, player.customerZone)
        .filter(function(c) { return c.type === 'Fleet'; });
      var fleetSubtypes = {};
      for (var fta = 0; fta < allFleetCards.length; fta++) {
        if (allFleetCards[fta].subtype) {
          fleetSubtypes[allFleetCards[fta].subtype.toLowerCase()] = true;
        }
      }
      // Need at least one Fleet card of each unique subtype that exists in the card pool
      // We check against the subtypes the player actually has available in their zones
      var allCards = typeof CardData !== 'undefined' ? CardData : [];
      var allFleetSubtypes = {};
      for (var afs = 0; afs < allCards.length; afs++) {
        if (allCards[afs].type === 'Fleet' && allCards[afs].subtype) {
          allFleetSubtypes[allCards[afs].subtype.toLowerCase()] = true;
        }
      }
      var requiredFleetSubs = Object.keys(allFleetSubtypes);
      for (var rfs = 0; rfs < requiredFleetSubs.length; rfs++) {
        if (!fleetSubtypes[requiredFleetSubs[rfs]]) return false;
      }
    }

    // Check minimum fleet card count
    if (reqs.fleetCards !== undefined) {
      if (fleetInCustomer.length < reqs.fleetCards) return false;
    }

    // Check infrastructure requirements (specific subtypes in source zone)
    if (reqs.infrastructure && Array.isArray(reqs.infrastructure)) {
      for (var inf = 0; inf < reqs.infrastructure.length; inf++) {
        var needed = reqs.infrastructure[inf].toLowerCase();
        var found = false;
        for (var si = 0; si < player.sourceZone.length; si++) {
          var infraCard = player.sourceZone[si];
          if (infraCard.type === 'Infrastructure' &&
              infraCard.subtype && infraCard.subtype.toLowerCase().indexOf(needed) !== -1) {
            found = true;
            break;
          }
          // Also check by name
          if (infraCard.type === 'Infrastructure' &&
              infraCard.name && infraCard.name.toLowerCase().indexOf(needed) !== -1) {
            found = true;
            break;
          }
        }
        if (!found) return false;
      }
    }

    // Check infrastructureTypes: "all" - player must have at least one Infrastructure
    // card of each unique Infrastructure subtype present across all zones
    if (reqs.infrastructureTypes === 'all') {
      var allInfraCards = player.sourceZone.concat(player.networkZone, player.customerZone)
        .filter(function(c) { return c.type === 'Infrastructure'; });
      var infraSubtypes = {};
      for (var ita = 0; ita < allInfraCards.length; ita++) {
        if (allInfraCards[ita].subtype) {
          infraSubtypes[allInfraCards[ita].subtype.toLowerCase()] = true;
        }
      }
      // Check against all Infrastructure subtypes in the card pool
      var allCardsInfra = typeof CardData !== 'undefined' ? CardData : [];
      var allInfraSubtypes = {};
      for (var ais = 0; ais < allCardsInfra.length; ais++) {
        if (allCardsInfra[ais].type === 'Infrastructure' && allCardsInfra[ais].subtype) {
          allInfraSubtypes[allCardsInfra[ais].subtype.toLowerCase()] = true;
        }
      }
      var requiredInfraSubs = Object.keys(allInfraSubtypes);
      for (var ris = 0; ris < requiredInfraSubs.length; ris++) {
        if (!infraSubtypes[requiredInfraSubs[ris]]) return false;
      }
    }

    // Check workforce requirements (specific subtypes/names in network zone)
    if (reqs.workforce) {
      if (Array.isArray(reqs.workforce)) {
        for (var w = 0; w < reqs.workforce.length; w++) {
          var neededWorker = reqs.workforce[w].toLowerCase();
          var workerFound = false;
          for (var nw = 0; nw < player.networkZone.length; nw++) {
            var wCard = player.networkZone[nw];
            if (wCard.type === 'Workforce') {
              if ((wCard.subtype && wCard.subtype.toLowerCase().indexOf(neededWorker) !== -1) ||
                  (wCard.name && wCard.name.toLowerCase().indexOf(neededWorker) !== -1)) {
                workerFound = true;
                break;
              }
            }
          }
          if (!workerFound) return false;
        }
      } else if (typeof reqs.workforce === 'number') {
        // Numeric workforce requirement: need at least N workforce cards
        var workforceCount = player.networkZone.filter(function(c) { return c.type === 'Workforce'; }).length;
        if (workforceCount < reqs.workforce) return false;
      }
    }

    // Must have at least one fleet in customer zone as the basic delivery mechanism
    if (fleetInCustomer.length === 0) return false;

    return true;
  }

  function runDelivery() {
    var player = game.players[game.currentPlayer];

    // Check if any contracts can be fulfilled
    if (player.customerZone.length > 0 && player.contracts.length > 0) {
      for (var i = player.contracts.length - 1; i >= 0; i--) {
        var contract = player.contracts[i];

        if (!checkContractRequirements(player, contract)) {
          continue; // This contract's requirements are not met
        }

        var fleetInCustomer = player.customerZone.filter(function(c) { return c.type === 'Fleet'; });
        var fpReward = contract.fpReward || 2;
        player.fp += fpReward;
        addLog(player.name + ' fulfilled ' + contract.name + ' for ' + fpReward + ' FP!');
        player.discard.push(contract);
        player.contracts.splice(i, 1);

        // Return fleet to network zone
        var fleet = fleetInCustomer[0];
        var fleetIdx = player.customerZone.indexOf(fleet);
        if (fleetIdx >= 0) {
          player.customerZone.splice(fleetIdx, 1);
          player.networkZone.push(fleet);
        }

        checkWinCondition();
        break;
      }
    }
  }

  function runCombat() {
    // Combat is player-driven - they click Workforce cards to attack
    var player = game.players[game.currentPlayer];
    // Reset attack flags
    for (var i = 0; i < player.networkZone.length; i++) {
      if (player.networkZone[i].type === 'Workforce') {
        player.networkZone[i]._attacked = false;
      }
    }
    addLog('Combat Phase - click Workforce cards to attack');
  }

  function runEndStep() {
    var player = game.players[game.currentPlayer];
    // Discard down to max hand size
    while (player.hand.length > MAX_HAND_SIZE) {
      var discarded = player.hand.pop();
      player.discard.push(discarded);
      addLog(player.name + ' discarded ' + discarded.name + ' (hand size limit)');
    }
  }

  function advancePhase() {
    if (!game || game.gameOver) return;

    // Run current phase logic first if it is auto
    var phase = PHASES[game.currentPhase];
    switch (phase) {
      case 'Upkeep': runUpkeep(); break;
      case 'Draw': runDraw(); break;
      case 'Transit': /* player-driven */ break;
      case 'Delivery': runDelivery(); break;
      case 'Combat': /* player-driven */ break;
      case 'End Step': runEndStep(); break;
    }

    // Advance to next phase
    game.currentPhase++;

    if (game.currentPhase >= PHASES.length) {
      // End of turn - switch player
      endTurn();
    } else {
      addLog('--- ' + PHASES[game.currentPhase] + ' ---');
      // Auto-advance non-interactive phases
      var nextPhase = PHASES[game.currentPhase];
      if (nextPhase === 'Upkeep' || nextPhase === 'Draw' || nextPhase === 'Delivery' || nextPhase === 'End Step') {
        render();
        setTimeout(function() { advancePhase(); }, 400);
        return;
      }
    }

    render();
  }

  function endTurn() {
    game.currentPlayer = 1 - game.currentPlayer;
    game.currentPhase = 0;
    game.turn++;
    addLog('========== Turn ' + game.turn + ': ' + game.players[game.currentPlayer].name + ' ==========');
    render();
  }

  function checkWinCondition() {
    if (!game) return;

    for (var i = 0; i < game.players.length; i++) {
      var player = game.players[i];
      var opponent = game.players[1 - i];

      if (player.fp >= WIN_FP) {
        game.gameOver = true;
        game.winner = i;
        addLog(player.name + ' wins with ' + player.fp + ' Fulfillment Points!');
        showWinOverlay(player.name + ' wins!', player.fp + ' Fulfillment Points reached!');
        return;
      }
      if (opponent.health <= 0) {
        game.gameOver = true;
        game.winner = i;
        addLog(player.name + ' wins! ' + opponent.name + '\'s Supply Chain collapsed!');
        showWinOverlay(player.name + ' wins!', opponent.name + '\'s Supply Chain Health reached 0!');
        return;
      }
    }
  }

  // ---------- Logging ----------
  function addLog(msg) {
    if (!game) return;
    game.log.push(msg);
    if (game.log.length > 100) {
      game.log = game.log.slice(-50);
    }
  }

  // ---------- UI Messages ----------
  function showMessage(msg) {
    var el = document.getElementById('playtest-message');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('visible');
    setTimeout(function() {
      el.classList.remove('visible');
    }, 2500);
  }

  function showWinOverlay(title, subtitle) {
    var overlay = document.getElementById('win-overlay');
    if (!overlay) return;
    var h2 = overlay.querySelector('.win-title');
    var p = overlay.querySelector('.win-subtitle');
    if (h2) h2.textContent = title;
    if (p) p.textContent = subtitle;
    overlay.classList.add('visible');
  }

  function hideWinOverlay() {
    var overlay = document.getElementById('win-overlay');
    if (overlay) overlay.classList.remove('visible');
  }

  // ---------- Rendering ----------
  function render() {
    if (!game) return;
    renderPhaseBar();
    renderPlayerInfo(0);
    renderPlayerInfo(1);
    renderZones();
    renderHand();
    renderContracts();
    renderLog();
    renderControls();
  }

  function renderPhaseBar() {
    var bar = document.getElementById('phase-bar');
    if (!bar) return;
    var html = '';
    for (var i = 0; i < PHASES.length; i++) {
      var active = i === game.currentPhase ? ' active' : '';
      var done = i < game.currentPhase ? ' done' : '';
      html += '<div class="phase-step' + active + done + '">' + PHASES[i] + '</div>';
    }
    bar.innerHTML = html;
  }

  function renderPlayerInfo(playerIndex) {
    var player = game.players[playerIndex];
    var prefix = playerIndex === 0 ? 'p1' : 'p2';

    var nameEl = document.getElementById(prefix + '-name');
    var healthEl = document.getElementById(prefix + '-health');
    var fpEl = document.getElementById(prefix + '-fp');
    var resEl = document.getElementById(prefix + '-resources');
    var deckEl = document.getElementById(prefix + '-deck-count');

    if (nameEl) nameEl.textContent = player.name;
    if (healthEl) healthEl.textContent = player.health;
    if (fpEl) fpEl.textContent = player.fp;
    if (deckEl) deckEl.textContent = player.deck.length;

    if (resEl) {
      var html = '';
      for (var i = 0; i < RESOURCES.length; i++) {
        var res = RESOURCES[i];
        html += '<span class="res-counter res-' + res.toLowerCase() + '">';
        html += '<span class="res-icon">' + res.charAt(0) + '</span>';
        html += '<span class="res-value">' + player.resources[res] + '</span>';
        html += '</span>';
      }
      resEl.innerHTML = html;
    }

    // Highlight active player
    var infoEl = document.getElementById(prefix + '-info');
    if (infoEl) {
      if (playerIndex === game.currentPlayer) {
        infoEl.classList.add('active-player');
      } else {
        infoEl.classList.remove('active-player');
      }
    }
  }

  function renderZones() {
    var player = game.players[game.currentPlayer];
    var opponent = game.players[1 - game.currentPlayer];

    renderZoneCards('source-zone', player.sourceZone, 'source');
    renderZoneCards('network-zone', player.networkZone, 'network');
    renderZoneCards('customer-zone', player.customerZone, 'customer');
    renderZoneCards('opp-source-zone', opponent.sourceZone, 'opp-source');
    renderZoneCards('opp-network-zone', opponent.networkZone, 'opp-network');
    renderZoneCards('opp-customer-zone', opponent.customerZone, 'opp-customer');
  }

  function renderZoneCards(elementId, cards, zoneType) {
    var el = document.getElementById(elementId);
    if (!el) return;

    if (cards.length === 0) {
      el.innerHTML = '<div class="zone-empty">Empty</div>';
      return;
    }

    var html = '';
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var clickable = '';
      var phase = PHASES[game.currentPhase];

      // Add interactivity based on phase and zone
      if (zoneType === 'network' && card.type === 'Fleet' && phase === 'Transit') {
        clickable = ' class="zone-card clickable" data-action="transit" data-index="' + i + '"';
      } else if (zoneType === 'network' && card.type === 'Workforce' && phase === 'Combat' && !card._attacked) {
        clickable = ' class="zone-card clickable" data-action="attack" data-index="' + i + '"';
      } else {
        clickable = ' class="zone-card"';
      }

      html += '<div' + clickable + '>';
      html += CardRenderer.renderCard(card, { size: 'small' });
      if (card._attacked) {
        html += '<div class="attacked-badge">Attacked</div>';
      }
      html += '</div>';
    }
    el.innerHTML = html;
  }

  function renderHand() {
    var el = document.getElementById('player-hand');
    if (!el) return;

    var player = game.players[game.currentPlayer];
    if (player.hand.length === 0) {
      el.innerHTML = '<div class="hand-empty">No cards in hand</div>';
      return;
    }

    var phase = PHASES[game.currentPhase];
    var isMainPhase = (phase === 'Main Phase 1' || phase === 'Main Phase 2');

    var html = '';
    for (var i = 0; i < player.hand.length; i++) {
      var card = player.hand[i];
      var playable = isMainPhase && canPayCost(player, card);
      var classes = 'hand-card' + (playable ? ' playable' : ' unplayable');
      var dataAttrs = playable ? ' data-action="play" data-index="' + i + '"' : '';
      html += '<div class="' + classes + '"' + dataAttrs + '>';
      html += CardRenderer.renderCard(card, { size: 'small' });
      if (!playable && isMainPhase) {
        html += '<div class="card-overlay-cost">Insufficient Resources</div>';
      }
      html += '</div>';
    }
    el.innerHTML = html;
  }

  function renderContracts() {
    var el = document.getElementById('active-contracts');
    if (!el) return;

    var player = game.players[game.currentPlayer];
    if (player.contracts.length === 0) {
      el.innerHTML = '<div class="contracts-empty">No active contracts</div>';
      return;
    }

    var html = '';
    for (var i = 0; i < player.contracts.length; i++) {
      var card = player.contracts[i];
      html += '<div class="contract-card">';
      html += '<span class="contract-name">' + escapeHtml(card.name) + '</span>';
      html += '<span class="contract-reward">FP: ' + (card.fpReward || 2) + '</span>';
      html += '</div>';
    }
    el.innerHTML = html;
  }

  function renderLog() {
    var el = document.getElementById('game-log');
    if (!el) return;

    var entries = game.log.slice(-15);
    var html = '';
    for (var i = 0; i < entries.length; i++) {
      html += '<div class="log-entry">' + escapeHtml(entries[i]) + '</div>';
    }
    el.innerHTML = html;
    el.scrollTop = el.scrollHeight;
  }

  function renderControls() {
    var nextBtn = document.getElementById('btn-next-phase');
    var endBtn = document.getElementById('btn-end-turn');

    if (nextBtn) {
      if (game.gameOver) {
        nextBtn.disabled = true;
      } else {
        nextBtn.disabled = false;
        nextBtn.textContent = 'Next Phase (' + (PHASES[game.currentPhase + 1] || 'End Turn') + ')';
      }
    }
    if (endBtn) {
      endBtn.disabled = game.gameOver;
    }

    // Show current turn info
    var turnInfo = document.getElementById('turn-info');
    if (turnInfo) {
      turnInfo.textContent = 'Turn ' + game.turn + ' - ' + game.players[game.currentPlayer].name + ' - ' + PHASES[game.currentPhase];
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;')
                      .replace(/</g, '&lt;')
                      .replace(/>/g, '&gt;')
                      .replace(/"/g, '&quot;');
  }

  // ---------- Setup & Initialization ----------
  function showSetup() {
    var setup = document.getElementById('playtest-setup');
    var board = document.getElementById('playtest-board');
    if (setup) setup.style.display = 'block';
    if (board) board.style.display = 'none';
    hideWinOverlay();
  }

  function showBoard() {
    var setup = document.getElementById('playtest-setup');
    var board = document.getElementById('playtest-board');
    if (setup) setup.style.display = 'none';
    if (board) board.style.display = 'grid';
    bindBoardEvents();
  }

  function bindBoardEvents() {
    // Event delegation for zone cards
    var zones = ['network-zone', 'source-zone', 'customer-zone'];
    for (var z = 0; z < zones.length; z++) {
      var zoneEl = document.getElementById(zones[z]);
      if (zoneEl && !zoneEl._delegated) {
        zoneEl._delegated = true;
        zoneEl.addEventListener('click', function(e) {
          var zoneCard = e.target.closest('.zone-card[data-action]');
          if (!zoneCard) return;
          var action = zoneCard.getAttribute('data-action');
          var index = parseInt(zoneCard.getAttribute('data-index'), 10);
          if (isNaN(index)) return;
          if (action === 'transit') {
            transitFleet(index);
          } else if (action === 'attack') {
            attackWithWorkforce(index);
          }
        });
      }
    }

    // Event delegation for hand cards
    var handEl = document.getElementById('player-hand');
    if (handEl && !handEl._delegated) {
      handEl._delegated = true;
      handEl.addEventListener('click', function(e) {
        var handCard = e.target.closest('.hand-card[data-action]');
        if (!handCard) return;
        var action = handCard.getAttribute('data-action');
        var index = parseInt(handCard.getAttribute('data-index'), 10);
        if (isNaN(index)) return;
        if (action === 'play') {
          playCard(index);
        }
      });
    }
  }

  function startGame() {
    game = createGameState();

    // Build decks for both players
    game.players[0].deck = buildRandomBalancedDeck();
    game.players[1].deck = buildRandomBalancedDeck();

    // Draw initial hands
    drawInitialHand(game.players[0]);
    drawInitialHand(game.players[1]);

    game.started = true;
    addLog('========== Game Start! ==========');
    addLog('Turn 1: ' + game.players[0].name);
    addLog('--- ' + PHASES[0] + ' ---');

    showBoard();
    render();
  }

  function newGame() {
    game = null;
    hideWinOverlay();
    showSetup();
  }

  function init() {
    showSetup();
  }

  // ---------- Public API ----------
  return {
    init: init,
    startGame: startGame,
    newGame: newGame,
    playCard: playCard,
    advancePhase: advancePhase,
    transitFleet: transitFleet,
    attackWithWorkforce: attackWithWorkforce,
    endTurn: function() {
      if (!game || game.gameOver) return;
      // Skip remaining phases and end turn
      game.currentPhase = PHASES.length - 1;
      runEndStep();
      endTurn();
    }
  };
}));
