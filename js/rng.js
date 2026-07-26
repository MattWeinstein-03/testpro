/**
 * Seedable RNG. Every random decision in the rules core draws from one of
 * these so a game is exactly reproducible from its seed.
 */
(function(root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.Rng = factory();
  }
}(typeof window !== 'undefined' ? window : this, function() {
  'use strict';

  /** mulberry32 - small, fast, good enough for shuffling and policy noise. */
  function create(seed) {
    var s = (typeof seed === 'number' ? seed : hash(String(seed))) >>> 0;
    var api = {
      seed: s,
      /** float in [0,1) */
      next: function() {
        s = (s + 0x6D2B79F5) >>> 0;
        var t = s;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      },
      /** integer in [0,n) */
      int: function(n) { return Math.floor(api.next() * n); },
      pick: function(arr) { return arr.length ? arr[api.int(arr.length)] : undefined; },
      shuffle: function(arr) {
        for (var i = arr.length - 1; i > 0; i--) {
          var j = api.int(i + 1);
          var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
        }
        return arr;
      }
    };
    return api;
  }

  function hash(str) {
    var h = 2166136261 >>> 0;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  return { create: create, hash: hash };
}));
