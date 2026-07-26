/**
 * Effect DSL interpreter.
 *
 * Card behavior lives in data as { trigger, condition, action } tuples; this
 * file is the only place that knows what an action atom means. The rules core
 * injects an `ops` object so this stays a pure interpreter with no knowledge of
 * turn structure, and adding a card never means editing the engine.
 */
(function(root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(require('./glossary.js'));
  } else {
    root.Effects = factory(root.Glossary);
  }
}(typeof window !== 'undefined' ? window : this, function(Glossary) {
  'use strict';

  var R = Glossary.RESOURCES;

  /** Resolve the `who` field of an atom into a list of player objects. */
  function targets(atom, ctx) {
    var who = atom.who || 'self';
    if (who === 'self') return [ctx.me];
    if (who === 'opponent') return [ctx.opp];
    return [ctx.me, ctx.opp];
  }

  /** Conditions are deliberately tiny: enough to gate an effect, no more. */
  function conditionMet(cond, ctx) {
    if (!cond) return true;
    var ops = ctx.ops;
    if (cond.controlsKeyword) return ops.countKeyword(ctx.me, cond.controlsKeyword) >= (cond.min || 1);
    if (cond.controlsType) return ops.countType(ctx.me, cond.controlsType) >= (cond.min || 1);
    if (cond.fulfilledThisTurn) return ctx.me.turnStats.contractsFulfilled >= (cond.min || 1);
    return true;
  }

  function applyAtom(atom, ctx) {
    var ops = ctx.ops;
    var me = ctx.me;
    var n = atom.amount;
    var i, list;

    switch (atom.do) {
      case 'damage':
        ops.damage(ctx.opp, n, ctx.card);
        break;
      case 'heal':
        me.health += n;
        ops.log(me.name + ' restores ' + n + ' Supply Chain Health');
        break;
      case 'gain':
        var amount = n;
        if (atom.perKeyword) amount += ops.countKeyword(me, atom.perKeyword);
        if (atom.resource === 'any') ops.gainFlexible(me, amount);
        else if (atom.resource === 'all') { for (i = 0; i < R.length; i++) ops.gain(me, R[i], amount); }
        else ops.gain(me, atom.resource, amount);
        break;
      case 'drain':
        list = targets(atom, ctx);
        for (i = 0; i < list.length; i++) {
          if (atom.resource === 'all') {
            for (var r = 0; r < R.length; r++) ops.drain(list[i], R[r], n);
          } else ops.drain(list[i], atom.resource, n);
        }
        break;

      case 'draw':
        list = targets(atom, ctx);
        for (i = 0; i < list.length; i++) ops.draw(list[i], n);
        break;
      case 'discard':
        list = targets(atom, ctx);
        for (i = 0; i < list.length; i++) ops.discard(list[i], n);
        break;
      case 'mill':
        list = targets(atom, ctx);
        for (i = 0; i < list.length; i++) ops.mill(list[i], n);
        break;
      case 'fp':
        ops.addFp(me, n, ctx.card);
        break;
      case 'goods':
        // A cost paid by the controller comes out of storage, never off a
        // Fleet that is mid-delivery.
        if (n >= 0) ops.addGoods(me, n);
        else ops.removeGoods(me, -n, false);
        break;
      case 'loseGoods':
        // A raid hits cargo in transit first - that is the point of the card.
        list = targets(atom, ctx);
        for (i = 0; i < list.length; i++) ops.removeGoods(list[i], n, true);
        break;
      case 'destroy':
        list = targets(atom, ctx);
        for (i = 0; i < list.length; i++) ops.destroy(list[i], atom.what, atom.count || 1, atom.pick);
        break;
      case 'disable':
        list = targets(atom, ctx);
        for (i = 0; i < list.length; i++) ops.disable(list[i], atom.what, atom.count || 1, atom.turns || 1);
        break;
      case 'untap':
        ops.untap(me, atom.what);
        break;
      case 'buff':
        me.buffs.push({ what: atom.what, stat: atom.stat, amount: n, duration: atom.duration || 'turn' });
        ops.log(me.name + ' gains a permanent +' + n + ' ' + atom.stat + ' bonus on ' + atom.what);
        break;
      case 'shield':
        me.shieldTurns = Math.max(me.shieldTurns, atom.turns || 1);
        ops.log(me.name + ' is shielded from Disruptions for ' + me.shieldTurns + ' turn(s)');
        break;
      case 'extraTransit':
        me.transitBudget += n;
        ops.log(me.name + ' gains ' + n + ' extra Transit action(s)');
        break;
      case 'cargoDiscount':
        me.cargoDiscount += n;
        ops.log(me.name + ' reduces Contract Cargo by ' + n + ' this turn');
        break;
      default:
        ops.log('unimplemented action: ' + atom.do);
    }
  }


  /**
   * Run every effect on `card` whose trigger matches, in printed order.
   * Returns the number of effects that actually resolved.
   */
  function trigger(card, triggerName, ctx) {
    var effects = card.effects || [];
    var resolved = 0;
    for (var i = 0; i < effects.length; i++) {
      var e = effects[i];
      if (e.trigger !== triggerName) continue;
      if (!conditionMet(e.condition, ctx)) continue;
      for (var a = 0; a < e.action.length; a++) applyAtom(e.action[a], ctx);
      resolved++;
    }
    return resolved;
  }

  /** Does this card have any effect with this trigger? Used for legal actions. */
  function has(card, triggerName) {
    var effects = card.effects || [];
    for (var i = 0; i < effects.length; i++) {
      if (effects[i].trigger === triggerName) return true;
    }
    return false;
  }

  return { trigger: trigger, has: has, applyAtom: applyAtom, conditionMet: conditionMet };
}));
