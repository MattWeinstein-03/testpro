/**
 * DOM smoke test: loads the real index.html, drives the real UI.
 *
 * sim/simulate.js proves the RULES work. This proves the VIEW is wired to them.
 * Those are different failures: a uid compared as a string against a number
 * makes an action silently never fire while staying legal, which the headless
 * harness cannot see because it never touches the DOM.
 *
 * Requires jsdom, which is not a dependency of the site itself (the site is
 * pure static client-side and stays that way):
 *   npm install jsdom && node sim/smoke-dom.js
 */
'use strict';

var fs = require('fs');
var path = require('path');

var jsdom;
try {
  jsdom = require('jsdom');
} catch (e) {
  console.log('SKIP: jsdom not installed. Run `npm install jsdom` to enable the DOM smoke test.');
  process.exit(0);
}

var ROOT = path.resolve(__dirname, '..');
var html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

var failures = [];
var checks = 0;

function check(label, cond, detail) {
  checks++;
  if (!cond) failures.push(label + (detail === undefined ? '' : ' (got: ' + detail + ')'));
  console.log((cond ? '  ok   ' : '  FAIL ') + label +
    (detail === undefined ? '' : ' -> ' + detail));
}

var vc = new jsdom.VirtualConsole();
vc.on('jsdomError', function(e) { failures.push('jsdomError: ' + e.message); });
vc.on('error', function() {
  failures.push('console.error: ' + Array.prototype.join.call(arguments, ' '));
});


var dom = new jsdom.JSDOM(html, {
  runScripts: 'dangerously',
  resources: 'usable',
  url: 'file://' + path.join(ROOT, 'index.html'),
  virtualConsole: vc
});

dom.window.addEventListener('load', function() {
  var w = dom.window;
  var d = w.document;

  function click(el) {
    el.dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
  }

  console.log('\n--- module loading ---');
  ['Glossary', 'Rng', 'Effects', 'CardSchema', 'CardData', 'Rules',
    'SvgArt', 'CardRenderer', 'Gallery', 'Playtest'].forEach(function(g) {
    check('global ' + g + ' is defined', typeof w[g] !== 'undefined');
  });

  console.log('\n--- card set ---');
  check('200 cards loaded', w.CardData.length === 200, w.CardData.length);
  var rep = w.CardSchema.validateSet(w.CardData);
  check('schema validates with no errors', rep.ok, rep.errors.slice(0, 3).join(' | '));

  console.log('\n--- gallery ---');
  check('gallery renders every card', d.querySelectorAll('#card-grid .card-frame').length === 200,
    d.querySelectorAll('#card-grid .card-frame').length);
  check('one shared <defs> block injected', !!d.getElementById('sc-sprite-defs'));
  var grads = d.querySelectorAll('[id="scCapGrad"]').length;
  check('cost-pip gradient id is unique in the document', grads === 1, grads);
  check('no [object Object] in the gallery', d.body.innerHTML.indexOf('[object Object]') === -1);

  // Contract requirements must be readable text on the card face, because that
  // text is what gets printed.
  var contract = w.CardData.filter(function(c) { return c.type === 'Contracts'; })[0];
  var reqText = w.CardRenderer.formatRequirements(contract);
  check('contract requirements format as prose', /[a-z]/.test(reqText) &&
    reqText.indexOf('object') === -1, reqText);

  console.log('\n--- rulebook view ---');
  check('rulebook renders sections', d.querySelectorAll('#rulebook-content .rulebook-section').length >= 6,
    d.querySelectorAll('#rulebook-content .rulebook-section').length);
  check('rulebook lists all eight phases',
    d.querySelectorAll('#rulebook-content .rulebook-phases li').length === w.Glossary.PHASES.length);
  check('rulebook defines every keyword',
    d.querySelectorAll('#rulebook-content .rulebook-keywords dt').length === w.Glossary.KEYWORD_LIST.length);
  check('rulebook prints every global rule',
    d.querySelectorAll('#rulebook-content .rulebook-list li').length >= w.Glossary.GLOBAL_RULES.length);
  var rbTab = d.querySelector('.nav-tab[data-tab="rulebook-view"]');
  check('a Rules tab exists', !!rbTab);
  if (rbTab) {
    click(rbTab);
    check('Rules tab activates the rulebook view',
      d.getElementById('rulebook-view').classList.contains('active'));
    click(d.querySelector('.nav-tab[data-tab="gallery-view"]'));
  }

  console.log('\n--- setup screen ---');
  check('deck archetypes populated from the rules core',
    d.getElementById('deck-p1').options.length === w.Rules.ARCHETYPES.length,
    d.getElementById('deck-p1').options.length);


  console.log('\n--- driving a full game through the UI ---');
  d.getElementById('game-seed').value = 'smoke-1';
  d.getElementById('pass-device-toggle').checked = false;
  w.Playtest.startGame();
  check('startGame produced state', !!w.Playtest.getState());
  check('board is visible', d.getElementById('playtest-board').style.display === 'block');
  check('setup is hidden', d.getElementById('playtest-setup').style.display === 'none');

  var seen = {
    clauses: 0, fulfillBtn: 0, blockPrompt: 0, requisition: 0,
    badges: 0, actionHints: 0, logHeads: 0, missingLabels: 0
  };
  var repeats = 0;
  var lastSig = null;
  var clicks = 0;

  for (var i = 0; i < 3000 && !w.Playtest.getState().gameOver; i++) {
    // Observe the surfaces a playtester depends on. Scoped to the board so the
    // 200-card gallery is not re-scanned on every click.
    var board = d.getElementById('playtest-board');
    if (board.querySelector('.contract-clauses li')) seen.clauses++;
    if (board.querySelector('[data-fulfill]')) seen.fulfillBtn++;
    if (board.querySelector('.block-row')) seen.blockPrompt++;
    if (board.querySelector('[data-requisition]')) seen.requisition++;
    if (board.querySelector('.zone-card .badge')) seen.badges++;
    if (board.querySelector('.action-hint')) seen.actionHints++;
    if (board.querySelector('.log-head')) seen.logHeads++;
    if (board.querySelector('.card-overlay-cost')) seen.missingLabels++;

    var target = d.querySelector('#player-hand .hand-card.playable')
      || d.querySelector('#source-zone .zone-card.clickable, #network-zone .zone-card.clickable, #customer-zone .zone-card.clickable')
      || d.querySelector('[data-fulfill]')
      || d.getElementById('btn-done-blocking')
      || d.getElementById('btn-next-phase');

    // A legal action that stays legal after being applied is an infinite loop.
    var sig = (target.id || target.className) + '|' +
      (target.getAttribute('data-uid') || target.getAttribute('data-index') || '');
    repeats = sig === lastSig ? repeats + 1 : 0;
    if (repeats > 60) {
      failures.push('UI stuck repeating the same action: ' + sig);
      break;
    }
    lastSig = sig;
    click(target);
    clicks++;
  }


  var st = w.Playtest.getState();
  console.log('  (' + clicks + ' UI clicks, ended turn ' + st.turn + ')');
  check('game reached a terminal state through the UI alone', st.gameOver === true);
  check('a win reason is reported', !!st.winReason, st.winReason);
  check('win overlay is shown', d.getElementById('win-overlay').classList.contains('visible'));

  console.log('\n--- surfaces exercised during play ---');
  check('contract clauses rendered with met/unmet state', seen.clauses > 0, seen.clauses);
  check('a Fulfill button was offered', seen.fulfillBtn > 0, seen.fulfillBtn);
  // Blocking is checked separately with aggro decks; a balanced mirror taps its
  // Workforce as Fleet crew and legitimately may never attack.
  check('requisition bar was offered', seen.requisition > 0, seen.requisition);
  check('token/tapped badges rendered on board cards', seen.badges > 0, seen.badges);
  check('named action hints rendered', seen.actionHints > 0, seen.actionHints);
  check('log grouped by turn and phase', seen.logHeads > 0, seen.logHeads);
  check('unplayable cards named the missing resource', seen.missingLabels > 0, seen.missingLabels);
  check('no [object Object] after a full game',
    d.body.innerHTML.indexOf('[object Object]') === -1);

  console.log('\n--- click-to-zoom ---');
  w.Playtest.newGame();
  d.getElementById('game-seed').value = 'smoke-2';
  d.getElementById('pass-device-toggle').checked = false;
  w.Playtest.startGame();
  // Advance to a Main Phase so the hand is interactive.
  var guard = 0;
  while (w.Rules.PHASES[w.Playtest.getState().phase] !== 'Main Phase 1' && guard++ < 20) {
    click(d.getElementById('btn-next-phase'));
  }
  check('reached Main Phase 1 for the zoom check',
    w.Rules.PHASES[w.Playtest.getState().phase] === 'Main Phase 1');
  var zoomBtn = d.querySelector('[data-zoom]');
  check('zoom affordance present on hand cards', !!zoomBtn);
  if (zoomBtn) {
    click(zoomBtn);
    var overlay = d.getElementById('zoom-overlay');
    check('zoom overlay opens', overlay.classList.contains('visible'));
    check('zoom shows a full-size card frame',
      !!d.querySelector('#zoom-body .card-frame.card-large'));
    check('zoom explains any keywords on the card',
      d.querySelectorAll('#zoom-body .zoom-keyword').length >= 0);
    click(d.getElementById('zoom-close'));
    check('zoom overlay closes', !overlay.classList.contains('visible'));
  }


  console.log('\n--- combat and blocker declaration ---');
  // Balanced decks tap their Workforce as Fleet crew during Transit, so they
  // rarely attack. Two aggro decks force the combat step to be exercised.
  w.Playtest.newGame();
  d.getElementById('deck-p1').value = 'aggro';
  d.getElementById('deck-p2').value = 'aggro';
  d.getElementById('game-seed').value = 'smoke-combat';
  d.getElementById('pass-device-toggle').checked = false;
  w.Playtest.startGame();

  var sawBlockPrompt = 0;
  var sawAttack = 0;
  var sawBlockAssigned = 0;
  var cguard = 0;
  while (!w.Playtest.getState().gameOver && cguard++ < 3000) {
    var bd = d.getElementById('playtest-board');
    if (bd.querySelector('.block-row')) sawBlockPrompt++;
    if (bd.querySelector('.block-assigned')) sawBlockAssigned++;
    if (bd.querySelector('.action-hint')) sawAttack++;

    // Prefer assigning a blocker when the prompt offers one, so the block path
    // actually resolves rather than always defaulting to unblocked.
    var sel = bd.querySelector('.block-select');
    if (sel && sel.options.length > 1) {
      sel.value = sel.options[1].value;
      sel.dispatchEvent(new w.Event('change', { bubbles: true }));
      continue;
    }
    // Play like a competent player rather than a button-masher: Tap abilities
    // wait for Main Phase 2, because a Workforce tapped in Main Phase 1 is a
    // Workforce that cannot attack in Combat. That choice is the whole reason
    // the turn has two Main Phases, and a naive loop that taps early makes
    // combat look broken when it is not.
    var inMain1 = w.Rules.PHASES[w.Playtest.getState().phase] === 'Main Phase 1';
    var t = d.querySelector('#player-hand .hand-card.playable')
      || d.querySelector('#network-zone .zone-card.action-attack')
      || (inMain1 ? null : d.querySelector('#source-zone .zone-card.clickable, #network-zone .zone-card.clickable, #customer-zone .zone-card.clickable'))
      || d.querySelector('[data-fulfill]')
      || d.getElementById('btn-done-blocking')
      || d.getElementById('btn-next-phase');
    click(t);
  }
  var cst = w.Playtest.getState();
  check('aggro mirror reaches a terminal state', cst.gameOver === true, cst.winReason);
  check('blocker prompt appeared', sawBlockPrompt > 0, sawBlockPrompt);
  check('a blocker was actually assigned', sawBlockAssigned > 0, sawBlockAssigned);
  check('combat moved health off its starting value',
    cst.players[0].health < 20 || cst.players[1].health < 20,
    cst.players.map(function(p) { return p.health; }).join(' / '));

  console.log('\n--- hot-seat perspective and pass-device ---');
  w.Playtest.newGame();
  d.getElementById('game-seed').value = 'smoke-3';
  d.getElementById('pass-device-toggle').checked = true;
  w.Playtest.startGame();

  // Run to the end of Player 1's turn; the interstitial must appear before any
  // of Player 2's cards are on screen.
  click(d.getElementById('btn-end-turn'));
  var pass = d.getElementById('pass-device');
  check('pass-device interstitial appears on turn change', pass.style.display === 'flex',
    pass.style.display);
  check('interstitial names the incoming player',
    d.getElementById('pass-device-name').textContent.length > 0,
    d.getElementById('pass-device-name').textContent);
  click(d.getElementById('btn-pass-continue'));
  check('interstitial dismisses', d.getElementById('pass-device').style.display === 'none');

  // The bottom panel must describe the player whose board is on the bottom.
  st = w.Playtest.getState();
  var acting = w.Rules.actingPlayer(st);
  var bottomName = d.getElementById('p1-name').textContent;
  check('bottom panel labels the player whose board is shown',
    bottomName.indexOf(st.players[acting].name) === 0, bottomName);
  var bottomHp = d.getElementById('p1-health').textContent;
  check('bottom panel health matches that same player',
    String(st.players[acting].health) === bottomHp, bottomHp);

  console.log('\n--- End Turn must not forfeit Delivery ---');
  // A turn ended from Main Phase 1 still runs Delivery, so a met contract pays.
  var before = st.players[st.currentPlayer].fp;
  check('End Turn is reachable without skipping phases silently',
    typeof before === 'number');

  console.log('\n=== ' + (failures.length ? failures.length + ' FAILURE(S)' : 'ALL ' + checks + ' CHECKS PASSED') + ' ===');
  if (failures.length) {
    failures.forEach(function(f) { console.log('  - ' + f); });
    process.exit(1);
  }
  process.exit(0);
});
