(function(root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.SvgArt = factory();
  }
}(typeof window !== 'undefined' ? window : this, function() {
  'use strict';

  // Deterministic pseudo-random number generator (mulberry32)
  function createRng(seed) {
    var s = seed | 0;
    return function() {
      s = (s + 0x6D2B79F5) | 0;
      var t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function seedFromId(id) {
    var n = parseInt(id, 10);
    return n * 2654435761;
  }

  // Color palettes by type
  var palettes = {
    Infrastructure: {
      bg: ['#2c3e50', '#34495e', '#1a252f', '#2d3436'],
      fg: ['#95a5a6', '#bdc3c7', '#7f8c8d', '#ecf0f1', '#dfe6e9'],
      accent: ['#f39c12', '#e67e22', '#d35400']
    },
    Workforce: {
      bg: ['#7d5a00', '#8d6708', '#5d4037', '#4e342e'],
      fg: ['#f39c12', '#f1c40f', '#e67e22', '#ffab00', '#ffd54f'],
      accent: ['#fff176', '#ffe082', '#ffcc80']
    },
    Fleet: {
      bg: ['#1a5276', '#154360', '#0d3445', '#1b4f72'],
      fg: ['#3498db', '#2980b9', '#1abc9c', '#76d7c4', '#85c1e9'],
      accent: ['#00bcd4', '#4dd0e1', '#80deea']
    },
    Operations: {
      bg: ['#1e4d2b', '#145a32', '#0b3d1f', '#186a3b'],
      fg: ['#2ecc71', '#27ae60', '#1abc9c', '#82e0aa', '#a9dfbf'],
      accent: ['#00e676', '#69f0ae', '#b9f6ca']
    },
    Disruptions: {
      bg: ['#641e16', '#78281f', '#4a0e0e', '#6e2c00'],
      fg: ['#e74c3c', '#c0392b', '#e67e22', '#f39c12', '#ff7043'],
      accent: ['#ff5252', '#ff867c', '#ffab91']
    },
    Contracts: {
      bg: ['#4a235a', '#512e5f', '#301934', '#6c3483'],
      fg: ['#9b59b6', '#8e44ad', '#bb8fce', '#d2b4de', '#a569bd'],
      accent: ['#ea80fc', '#ce93d8', '#e1bee7']
    }
  };

  function pick(arr, rng) {
    return arr[Math.floor(rng() * arr.length)];
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  // Shape generators by type
  function drawInfrastructure(rng, palette) {
    var shapes = '';
    var numBuildings = 2 + Math.floor(rng() * 3);
    for (var i = 0; i < numBuildings; i++) {
      var bx = 30 + rng() * 200;
      var bw = 20 + rng() * 40;
      var bh = 40 + rng() * 80;
      var by = 180 - bh;
      var color = pick(palette.fg, rng);
      shapes += '<rect x="' + bx + '" y="' + by + '" width="' + bw + '" height="' + bh + '" fill="' + color + '" opacity="0.8"/>';
      // Windows
      var rows = Math.floor(bh / 15);
      var cols = Math.floor(bw / 12);
      for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
          if (rng() > 0.4) {
            shapes += '<rect x="' + (bx + 4 + c * 12) + '" y="' + (by + 5 + r * 15) + '" width="6" height="8" fill="' + pick(palette.accent, rng) + '" opacity="0.6"/>';
          }
        }
      }
    }
    // Conveyor lines
    if (rng() > 0.5) {
      var cy = 140 + rng() * 30;
      shapes += '<line x1="20" y1="' + cy + '" x2="280" y2="' + cy + '" stroke="' + pick(palette.accent, rng) + '" stroke-width="2" stroke-dasharray="8,4"/>';
      for (var d = 0; d < 5; d++) {
        shapes += '<circle cx="' + (40 + d * 55) + '" cy="' + cy + '" r="4" fill="' + pick(palette.fg, rng) + '"/>';
      }
    }
    return shapes;
  }

  function drawWorkforce(rng, palette) {
    var shapes = '';
    var numPeople = 2 + Math.floor(rng() * 3);
    for (var i = 0; i < numPeople; i++) {
      var px = 40 + i * 60 + rng() * 20;
      var py = 100 + rng() * 40;
      var color = pick(palette.fg, rng);
      // Head
      shapes += '<circle cx="' + px + '" cy="' + (py - 25) + '" r="10" fill="' + color + '"/>';
      // Body
      shapes += '<rect x="' + (px - 8) + '" y="' + (py - 15) + '" width="16" height="30" rx="4" fill="' + color + '" opacity="0.9"/>';
      // Hardhat
      if (rng() > 0.5) {
        shapes += '<rect x="' + (px - 12) + '" y="' + (py - 37) + '" width="24" height="6" rx="2" fill="' + pick(palette.accent, rng) + '"/>';
      }
      // Tool
      if (rng() > 0.4) {
        var toolColor = pick(palette.accent, rng);
        shapes += '<rect x="' + (px + 10) + '" y="' + (py - 10) + '" width="4" height="25" fill="' + toolColor + '"/>';
      }
    }
    // Gear icon
    if (rng() > 0.3) {
      var gx = 220 + rng() * 50;
      var gy = 50 + rng() * 40;
      var gr = 15 + rng() * 10;
      shapes += '<circle cx="' + gx + '" cy="' + gy + '" r="' + gr + '" fill="none" stroke="' + pick(palette.accent, rng) + '" stroke-width="3"/>';
      shapes += '<circle cx="' + gx + '" cy="' + gy + '" r="' + (gr * 0.4) + '" fill="' + pick(palette.accent, rng) + '"/>';
      for (var t = 0; t < 8; t++) {
        var angle = (t / 8) * Math.PI * 2;
        var tx1 = gx + Math.cos(angle) * (gr - 3);
        var ty1 = gy + Math.sin(angle) * (gr - 3);
        var tx2 = gx + Math.cos(angle) * (gr + 5);
        var ty2 = gy + Math.sin(angle) * (gr + 5);
        shapes += '<line x1="' + tx1 + '" y1="' + ty1 + '" x2="' + tx2 + '" y2="' + ty2 + '" stroke="' + pick(palette.accent, rng) + '" stroke-width="4"/>';
      }
    }
    return shapes;
  }

  /**
   * Fleet artwork follows the card's printed subtype. It used to be chosen from
   * the RNG, so Ship cards frequently showed a truck and contradicted their own
   * type line - which matters a great deal once these are printed.
   */
  function fleetForm(subtype) {
    switch (subtype) {
      case 'Ship': return 'ship';
      case 'Air': return 'air';
      case 'Drone': return 'air';
      case 'Rail': return 'ground';
      case 'Fixed': return 'ground';
      default: return 'ground';
    }
  }

  function drawFleet(rng, palette, subtype) {
    var shapes = '';
    var form = fleetForm(subtype);
    if (form === 'ground') {
      // Truck/vehicle
      var tx = 50 + rng() * 50;
      var ty = 100 + rng() * 30;
      var color = pick(palette.fg, rng);
      shapes += '<rect x="' + tx + '" y="' + ty + '" width="120" height="40" rx="5" fill="' + color + '"/>';
      shapes += '<rect x="' + (tx + 100) + '" y="' + (ty - 15) + '" width="40" height="55" rx="3" fill="' + pick(palette.fg, rng) + '"/>';
      // Wheels
      shapes += '<circle cx="' + (tx + 25) + '" cy="' + (ty + 45) + '" r="10" fill="#2c3e50"/>';
      shapes += '<circle cx="' + (tx + 95) + '" cy="' + (ty + 45) + '" r="10" fill="#2c3e50"/>';
      shapes += '<circle cx="' + (tx + 120) + '" cy="' + (ty + 45) + '" r="10" fill="#2c3e50"/>';
      // Road
      shapes += '<rect x="0" y="160" width="300" height="40" fill="#34495e"/>';
      shapes += '<line x1="0" y1="178" x2="300" y2="178" stroke="#f1c40f" stroke-width="2" stroke-dasharray="15,10"/>';
    } else if (form === 'ship') {
      // Ship
      var sx = 30;
      var sy = 90;
      var color = pick(palette.fg, rng);
      shapes += '<path d="M' + sx + ' ' + (sy + 40) + ' L' + (sx + 20) + ' ' + (sy + 60) + ' L' + (sx + 200) + ' ' + (sy + 60) + ' L' + (sx + 240) + ' ' + (sy + 40) + ' Z" fill="' + color + '"/>';
      shapes += '<rect x="' + (sx + 60) + '" y="' + sy + '" width="100" height="40" fill="' + pick(palette.fg, rng) + '"/>';
      // Containers on deck
      for (var c = 0; c < 4; c++) {
        shapes += '<rect x="' + (sx + 65 + c * 23) + '" y="' + (sy + 5) + '" width="20" height="15" fill="' + pick(palette.accent, rng) + '" opacity="0.8"/>';
      }
      // Waves
      for (var w = 0; w < 5; w++) {
        var wy = 155 + rng() * 20;
        shapes += '<path d="M' + (w * 65) + ' ' + wy + ' Q' + (w * 65 + 15) + ' ' + (wy - 8) + ' ' + (w * 65 + 30) + ' ' + wy + ' T' + (w * 65 + 60) + ' ' + wy + '" fill="none" stroke="' + pick(palette.fg, rng) + '" stroke-width="2" opacity="0.5"/>';
      }
    } else {
      // Aircraft
      var ax = 80;
      var ay = 70;
      var color = pick(palette.fg, rng);
      shapes += '<ellipse cx="' + (ax + 60) + '" cy="' + (ay + 30) + '" rx="70" ry="12" fill="' + color + '"/>';
      // Wings
      shapes += '<polygon points="' + (ax + 40) + ',' + (ay + 30) + ' ' + (ax + 70) + ',' + (ay + 5) + ' ' + (ax + 100) + ',' + (ay + 30) + '" fill="' + pick(palette.fg, rng) + '"/>';
      shapes += '<polygon points="' + (ax + 40) + ',' + (ay + 30) + ' ' + (ax + 70) + ',' + (ay + 55) + ' ' + (ax + 100) + ',' + (ay + 30) + '" fill="' + pick(palette.fg, rng) + '"/>';
      // Tail
      shapes += '<polygon points="' + (ax - 5) + ',' + (ay + 30) + ' ' + (ax + 10) + ',' + (ay + 10) + ' ' + (ax + 20) + ',' + (ay + 30) + '" fill="' + pick(palette.accent, rng) + '"/>';
      // Clouds
      for (var cl = 0; cl < 3; cl++) {
        var clx = 20 + rng() * 250;
        var cly = 140 + rng() * 40;
        shapes += '<ellipse cx="' + clx + '" cy="' + cly + '" rx="' + (15 + rng() * 20) + '" ry="' + (8 + rng() * 8) + '" fill="' + pick(palette.fg, rng) + '" opacity="0.3"/>';
      }
    }
    return shapes;
  }

  function drawOperations(rng, palette) {
    var shapes = '';
    // Arrows and flow lines
    var numArrows = 3 + Math.floor(rng() * 3);
    for (var i = 0; i < numArrows; i++) {
      var startX = 20 + rng() * 100;
      var startY = 40 + rng() * 120;
      var endX = 150 + rng() * 120;
      var endY = 40 + rng() * 120;
      var midX = (startX + endX) / 2;
      var midY = startY - 20 - rng() * 40;
      var color = pick(palette.fg, rng);
      shapes += '<path d="M' + startX + ' ' + startY + ' Q' + midX + ' ' + midY + ' ' + endX + ' ' + endY + '" fill="none" stroke="' + color + '" stroke-width="2.5" opacity="0.8"/>';
      // Arrowhead
      var angle = Math.atan2(endY - midY, endX - midX);
      var ax1 = endX - 8 * Math.cos(angle - 0.4);
      var ay1 = endY - 8 * Math.sin(angle - 0.4);
      var ax2 = endX - 8 * Math.cos(angle + 0.4);
      var ay2 = endY - 8 * Math.sin(angle + 0.4);
      shapes += '<polygon points="' + endX + ',' + endY + ' ' + ax1 + ',' + ay1 + ' ' + ax2 + ',' + ay2 + '" fill="' + color + '"/>';
    }
    // Chart/graph element
    if (rng() > 0.3) {
      var chartX = 60 + rng() * 100;
      var chartY = 130;
      shapes += '<rect x="' + chartX + '" y="' + (chartY - 60) + '" width="120" height="60" fill="none" stroke="' + pick(palette.fg, rng) + '" stroke-width="1" opacity="0.5"/>';
      // Bars or line
      for (var b = 0; b < 6; b++) {
        var bh = 10 + rng() * 45;
        shapes += '<rect x="' + (chartX + 5 + b * 19) + '" y="' + (chartY - bh) + '" width="14" height="' + bh + '" fill="' + pick(palette.accent, rng) + '" opacity="0.7"/>';
      }
    }
    // Gear
    var gx = 40 + rng() * 60;
    var gy = 40 + rng() * 40;
    var gr = 12 + rng() * 8;
    shapes += '<circle cx="' + gx + '" cy="' + gy + '" r="' + gr + '" fill="none" stroke="' + pick(palette.fg, rng) + '" stroke-width="2.5"/>';
    for (var t = 0; t < 6; t++) {
      var ta = (t / 6) * Math.PI * 2;
      shapes += '<line x1="' + (gx + Math.cos(ta) * gr * 0.7) + '" y1="' + (gy + Math.sin(ta) * gr * 0.7) + '" x2="' + (gx + Math.cos(ta) * (gr + 4)) + '" y2="' + (gy + Math.sin(ta) * (gr + 4)) + '" stroke="' + pick(palette.fg, rng) + '" stroke-width="3"/>';
    }
    return shapes;
  }

  function drawDisruptions(rng, palette) {
    var shapes = '';
    // Jagged cracks
    var crackX = 50 + rng() * 100;
    for (var i = 0; i < 4; i++) {
      var x1 = crackX + rng() * 20 - 10;
      var y1 = 20 + i * 40;
      var x2 = crackX + rng() * 40 - 20;
      var y2 = 40 + i * 40;
      shapes += '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + pick(palette.accent, rng) + '" stroke-width="3"/>';
      crackX = x2;
    }
    // Flames or explosion
    for (var f = 0; f < 5; f++) {
      var fx = 100 + rng() * 120;
      var fy = 80 + rng() * 60;
      var fs = 10 + rng() * 20;
      var color = pick(palette.fg, rng);
      shapes += '<path d="M' + fx + ' ' + (fy + fs) + ' Q' + (fx - fs * 0.5) + ' ' + fy + ' ' + fx + ' ' + (fy - fs) + ' Q' + (fx + fs * 0.5) + ' ' + fy + ' ' + fx + ' ' + (fy + fs) + '" fill="' + color + '" opacity="0.7"/>';
    }
    // Warning triangle
    var wx = 180 + rng() * 60;
    var wy = 40 + rng() * 30;
    var ws = 20 + rng() * 15;
    shapes += '<polygon points="' + wx + ',' + (wy - ws) + ' ' + (wx - ws) + ',' + (wy + ws * 0.7) + ' ' + (wx + ws) + ',' + (wy + ws * 0.7) + '" fill="none" stroke="' + pick(palette.accent, rng) + '" stroke-width="3"/>';
    shapes += '<text x="' + wx + '" y="' + (wy + ws * 0.3) + '" text-anchor="middle" font-size="' + (ws * 0.8) + '" fill="' + pick(palette.accent, rng) + '" font-weight="bold">!</text>';
    // Broken chain links
    if (rng() > 0.4) {
      for (var ch = 0; ch < 3; ch++) {
        var cx = 40 + ch * 50 + rng() * 20;
        var cy = 150 + rng() * 20;
        shapes += '<ellipse cx="' + cx + '" cy="' + cy + '" rx="12" ry="7" fill="none" stroke="' + pick(palette.fg, rng) + '" stroke-width="2.5"/>';
      }
      // Break in chain
      shapes += '<line x1="' + (90 + rng() * 20) + '" y1="145" x2="' + (110 + rng() * 20) + '" y2="170" stroke="' + pick(palette.bg, rng) + '" stroke-width="5"/>';
    }
    return shapes;
  }

  function drawContracts(rng, palette) {
    var shapes = '';
    // Scroll/document
    var sx = 80 + rng() * 40;
    var sy = 30 + rng() * 20;
    var sw = 100 + rng() * 40;
    var sh = 100 + rng() * 30;
    shapes += '<rect x="' + sx + '" y="' + sy + '" width="' + sw + '" height="' + sh + '" rx="3" fill="' + pick(palette.fg, rng) + '" opacity="0.9"/>';
    // Scroll curls
    shapes += '<ellipse cx="' + sx + '" cy="' + (sy + 5) + '" rx="6" ry="8" fill="' + pick(palette.fg, rng) + '"/>';
    shapes += '<ellipse cx="' + (sx + sw) + '" cy="' + (sy + sh - 5) + '" rx="6" ry="8" fill="' + pick(palette.fg, rng) + '"/>';
    // Text lines
    for (var l = 0; l < 5; l++) {
      var lw = 40 + rng() * (sw - 60);
      shapes += '<rect x="' + (sx + 15) + '" y="' + (sy + 15 + l * 16) + '" width="' + lw + '" height="3" fill="' + pick(palette.bg, rng) + '" opacity="0.5"/>';
    }
    // Stamp/seal
    var stampX = sx + sw * 0.65;
    var stampY = sy + sh * 0.65;
    var stampR = 15 + rng() * 8;
    shapes += '<circle cx="' + stampX + '" cy="' + stampY + '" r="' + stampR + '" fill="none" stroke="' + pick(palette.accent, rng) + '" stroke-width="2.5"/>';
    shapes += '<circle cx="' + stampX + '" cy="' + stampY + '" r="' + (stampR * 0.6) + '" fill="' + pick(palette.accent, rng) + '" opacity="0.5"/>';
    // Checkmark
    if (rng() > 0.4) {
      shapes += '<path d="M' + (stampX - 5) + ' ' + stampY + ' L' + (stampX - 1) + ' ' + (stampY + 5) + ' L' + (stampX + 7) + ' ' + (stampY - 5) + '" fill="none" stroke="' + pick(palette.accent, rng) + '" stroke-width="2.5" stroke-linecap="round"/>';
    }
    // Ribbon
    if (rng() > 0.5) {
      var rx = 50 + rng() * 30;
      var ry = 150 + rng() * 20;
      shapes += '<path d="M' + rx + ' ' + ry + ' Q' + (rx + 30) + ' ' + (ry - 15) + ' ' + (rx + 60) + ' ' + ry + ' Q' + (rx + 90) + ' ' + (ry + 15) + ' ' + (rx + 120) + ' ' + ry + '" fill="none" stroke="' + pick(palette.accent, rng) + '" stroke-width="4" opacity="0.6"/>';
    }
    return shapes;
  }

  // Pattern overlay generator
  function drawPattern(rng, palette) {
    var pattern = '';
    var patternType = rng();
    if (patternType < 0.33) {
      // Dot grid
      for (var px = 10; px < 300; px += 20) {
        for (var py = 10; py < 200; py += 20) {
          if (rng() > 0.7) {
            pattern += '<circle cx="' + px + '" cy="' + py + '" r="1.5" fill="' + pick(palette.fg, rng) + '" opacity="0.2"/>';
          }
        }
      }
    } else if (patternType < 0.66) {
      // Diagonal lines
      for (var d = -200; d < 400; d += 15) {
        if (rng() > 0.6) {
          pattern += '<line x1="' + d + '" y1="0" x2="' + (d + 200) + '" y2="200" stroke="' + pick(palette.fg, rng) + '" stroke-width="0.5" opacity="0.15"/>';
        }
      }
    } else {
      // Hexagon grid
      for (var hx = 0; hx < 320; hx += 40) {
        for (var hy = 0; hy < 220; hy += 35) {
          if (rng() > 0.7) {
            var offset = (Math.floor(hy / 35) % 2) * 20;
            pattern += '<polygon points="' + hexPoints(hx + offset, hy, 10) + '" fill="none" stroke="' + pick(palette.fg, rng) + '" stroke-width="0.5" opacity="0.2"/>';
          }
        }
      }
    }
    return pattern;
  }

  function hexPoints(cx, cy, r) {
    var pts = [];
    for (var i = 0; i < 6; i++) {
      var a = (i / 6) * Math.PI * 2 - Math.PI / 6;
      pts.push((cx + r * Math.cos(a)).toFixed(1) + ',' + (cy + r * Math.sin(a)).toFixed(1));
    }
    return pts.join(' ');
  }

  function generateCardArt(card) {
    var rng = createRng(seedFromId(card.id));
    var type = card.type || 'Infrastructure';
    var palette = palettes[type] || palettes.Infrastructure;

    var bgColor1 = pick(palette.bg, rng);
    var bgColor2 = pick(palette.bg, rng);

    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="300" height="200">';

    // Background gradient
    var gradId = 'grad-' + card.id;
    svg += '<defs><linearGradient id="' + gradId + '" x1="0%" y1="0%" x2="100%" y2="100%">';
    svg += '<stop offset="0%" style="stop-color:' + bgColor1 + ';stop-opacity:1"/>';
    svg += '<stop offset="100%" style="stop-color:' + bgColor2 + ';stop-opacity:1"/>';
    svg += '</linearGradient></defs>';
    svg += '<rect width="300" height="200" fill="url(#' + gradId + ')"/>';

    // Pattern overlay
    svg += drawPattern(rng, palette);

    // Type-specific foreground shapes
    switch (type) {
      case 'Infrastructure':
        svg += drawInfrastructure(rng, palette);
        break;
      case 'Workforce':
        svg += drawWorkforce(rng, palette);
        break;
      case 'Fleet':
        svg += drawFleet(rng, palette, card.subtype);
        break;
      case 'Operations':
        svg += drawOperations(rng, palette);
        break;
      case 'Disruptions':
        svg += drawDisruptions(rng, palette);
        break;
      case 'Contracts':
        svg += drawContracts(rng, palette);
        break;
    }

    // Rarity indicator (subtle corner glow)
    if (card.rarity === 'Mythic Rare') {
      svg += '<circle cx="280" cy="20" r="12" fill="' + pick(palette.accent, rng) + '" opacity="0.8"/>';
      svg += '<circle cx="280" cy="20" r="8" fill="#fff" opacity="0.4"/>';
    } else if (card.rarity === 'Rare') {
      svg += '<circle cx="280" cy="20" r="8" fill="' + pick(palette.accent, rng) + '" opacity="0.6"/>';
    }

    svg += '</svg>';
    return svg;
  }

  return { generateCardArt: generateCardArt };
}));