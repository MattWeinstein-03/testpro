/**
 * SUPPLY CHAIN: The Gathering - card set (200 cards).
 *
 * GENERATED FILE. Edit js/card-data.source.js (authored design text) or
 * tools/build-card-data.js (mechanical tables), then run:
 *   node tools/build-card-data.js
 *
 * Field notes:
 *   produces  - resources yielded each Upkeep. Independent of cost.
 *   goods     - Goods yielded each Upkeep, capped by stats.capacity.
 *   effects   - { trigger, condition, action } read by js/rules.js.
 *   rulesText - generated from effects; authoritative on the card face.
 *   loreText  - original design text, kept for flavor and intent.
 */
(function(root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.CardData = factory();
  }
}(typeof window !== 'undefined' ? window : this, function() {
  'use strict';
  return [
    {
      "id": "001",
      "name": "Raw Material Mine",
      "type": "Infrastructure",
      "subtype": "Facility",
      "rarity": "Common",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 2
      },
      "keywords": [
        "Automated"
      ],
      "rulesText": "Automated. Upkeep: Produce 1 Capital and 1 Goods (up to Capacity 2). Tap: Remove 1 Goods from your Source Zone. Gain 1 Capital.",
      "loreText": "When Raw Material Mine enters your Source Zone, generate 1 Capital during each Upkeep. Tap: Add 1 Goods to any connected Infrastructure.",
      "flavorText": "Where every supply chain begins.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Capital",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "goods": 1
    },
    {
      "id": "002",
      "name": "Textile Mill",
      "type": "Infrastructure",
      "subtype": "Facility",
      "rarity": "Common",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 2
      },
      "keywords": [
        "Automated"
      ],
      "rulesText": "Automated. Upkeep: Produce 1 Capital and 1 Goods (up to Capacity 2). Tap: Remove 1 Goods from your Source Zone. Gain 1 Capital.",
      "loreText": "Tap: Convert 1 Goods into 1 processed Goods. Processed goods count double toward Contracts requiring manufactured items.",
      "flavorText": "Thread by thread, the world is clothed.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Capital",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "goods": 1
    },
    {
      "id": "003",
      "name": "Regional Warehouse",
      "type": "Infrastructure",
      "subtype": "Storage",
      "rarity": "Common",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 3
      },
      "keywords": [],
      "rulesText": "Upkeep: Produce 1 Time and 1 Goods (up to Capacity 3). Tap: Remove 1 Goods from your Source Zone. Gain 1 Time.",
      "loreText": "Store up to 3 Goods. During Transit Phase, you may move 1 Goods from Regional Warehouse to any Fleet card in your Network Zone without paying Fuel costs.",
      "flavorText": "Close enough to matter, big enough to count.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Time",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 1
      },
      "goods": 1
    },
    {
      "id": "004",
      "name": "Cross-Dock Facility",
      "type": "Infrastructure",
      "subtype": "Facility",
      "rarity": "Common",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 2
      },
      "keywords": [
        "Rush"
      ],
      "rulesText": "Rush. Upkeep: Produce 1 Labor and 1 Goods (up to Capacity 2). Tap: Remove 1 Goods from your Source Zone. Gain 1 Labor.",
      "loreText": "Goods passing through Cross-Dock Facility do not consume storage capacity. During Transit Phase, redirect 1 shipment from any Fleet card directly to another Fleet card.",
      "flavorText": "In one door, out the other. No shelf time.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Labor",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "goods": 1
    },
    {
      "id": "005",
      "name": "Cold Storage Unit",
      "type": "Infrastructure",
      "subtype": "Storage",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 2,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 3
      },
      "keywords": [
        "Specialized"
      ],
      "rulesText": "Specialized. Upkeep: Produce 1 Time and 2 Goods (up to Capacity 3). Tap: Remove 1 Goods from your Source Zone. Gain 1 Time.",
      "loreText": "Required for Cold Chain Contracts. Goods stored here never spoil. Tap: Preserve 1 perishable Goods indefinitely. Other Infrastructure cannot store perishable goods.",
      "flavorText": "Minus forty keeps the world fresh.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Time",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 1
      },
      "goods": 2
    },
    {
      "id": "006",
      "name": "Container Port",
      "type": "Infrastructure",
      "subtype": "Hub",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 3,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 5
      },
      "keywords": [
        "Hub"
      ],
      "rulesText": "Hub. Upkeep: Produce 2 Fuel and 1 Goods (up to Capacity 5). Tap: Remove 1 Goods from your Source Zone. Gain 1 Fuel.",
      "loreText": "Fleet cards with the Ship subtype gain +2 Speed when departing from Container Port. During Upkeep, you may import 1 Goods from the the Source Zone at reduced cost (-1 Capital).",
      "flavorText": "Mountains of steel boxes, rivers of commerce.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Fuel",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 2,
        "Data": 0,
        "Time": 0
      },
      "goods": 1
    },
    {
      "id": "007",
      "name": "Inland Rail Terminal",
      "type": "Infrastructure",
      "subtype": "Hub",
      "rarity": "Common",
      "cost": {
        "Capital": 2,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 4
      },
      "keywords": [],
      "rulesText": "Upkeep: Produce 1 Fuel and 1 Goods (up to Capacity 4). Tap: Remove 1 Goods from your Source Zone. Gain 1 Fuel.",
      "loreText": "Fleet cards with the Rail subtype gain +1 Speed when connected to Inland Rail Terminal. Tap: Move up to 2 Goods between any connected Infrastructure cards.",
      "flavorText": "Steel rails carry the nation's heartbeat.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Fuel",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 1,
        "Data": 0,
        "Time": 0
      },
      "goods": 1
    },
    {
      "id": "008",
      "name": "Automated Sortation Center",
      "type": "Infrastructure",
      "subtype": "Facility",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 3,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 4
      },
      "keywords": [
        "Automated"
      ],
      "rulesText": "Automated. Upkeep: Produce 1 Data and 1 Goods (up to Capacity 4). Tap: Remove 1 Goods from your Source Zone. Gain 1 Data.",
      "loreText": "During Transit Phase, automatically route up to 2 Goods to their optimal destination without paying Labor costs. Reduces fulfillment time on all Contracts by 1 turn.",
      "flavorText": "A thousand decisions per second, zero mistakes.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Data",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 1,
        "Time": 0
      },
      "goods": 1
    },
    {
      "id": "009",
      "name": "Bonded Warehouse",
      "type": "Infrastructure",
      "subtype": "Storage",
      "rarity": "Common",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 3
      },
      "keywords": [
        "Specialized"
      ],
      "rulesText": "Specialized. Upkeep: Produce 1 Time and 2 Goods (up to Capacity 3). Tap: Remove 1 Goods from your Source Zone. Gain 1 Time.",
      "loreText": "Goods stored in Bonded Warehouse are exempt from Tariff Disruptions. Tap: Delay customs inspection on 1 shipment, keeping it in transit for 1 additional turn without penalty.",
      "flavorText": "Duty deferred, opportunity preserved.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Time",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 1
      },
      "goods": 2
    },
    {
      "id": "010",
      "name": "Fulfillment Center",
      "type": "Infrastructure",
      "subtype": "Facility",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 3,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 5
      },
      "keywords": [
        "Automated",
        "Hub"
      ],
      "rulesText": "Automated, Hub. Upkeep: Produce 2 Labor and 1 Goods (up to Capacity 5). Tap: Remove 1 Goods from your Source Zone. Gain 1 Labor.",
      "loreText": "When you complete a Contract, if goods were processed through Fulfillment Center, gain 1 additional Fulfillment Point. Tap: Pack and ship 2 Goods simultaneously.",
      "flavorText": "Pick, pack, ship. The modern mantra.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Labor",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 0,
        "Labor": 2,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "goods": 1
    },
    {
      "id": "011",
      "name": "Micro-Fulfillment Hub",
      "type": "Infrastructure",
      "subtype": "Facility",
      "rarity": "Common",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 2
      },
      "keywords": [
        "Rush"
      ],
      "rulesText": "Rush. Upkeep: Produce 1 Labor and 1 Goods (up to Capacity 2). Tap: Remove 1 Goods from your Source Zone. Gain 1 Labor.",
      "loreText": "Last-mile Fleet cards gain +1 Speed when connected to Micro-Fulfillment Hub. Tap: Complete 1 Same-Day Delivery Contract requirement without needing additional Fleet capacity.",
      "flavorText": "Small footprint, big impact.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Labor",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "goods": 1
    },
    {
      "id": "012",
      "name": "Assembly Plant",
      "type": "Infrastructure",
      "subtype": "Facility",
      "rarity": "Common",
      "cost": {
        "Capital": 2,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 3
      },
      "keywords": [],
      "rulesText": "Upkeep: Produce 1 Capital and 1 Goods (up to Capacity 3). Tap: Remove 1 Goods from your Source Zone. Gain 1 Capital.",
      "loreText": "Tap: Convert 2 Goods into 1 finished Goods. Finished goods are worth double toward Contract fulfillment requirements.",
      "flavorText": "Parts become products on the assembly line.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Capital",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "goods": 1
    },
    {
      "id": "013",
      "name": "Pharmaceutical Clean Room",
      "type": "Infrastructure",
      "subtype": "Facility",
      "rarity": "Rare",
      "cost": {
        "Capital": 2,
        "Labor": 0,
        "Fuel": 0,
        "Data": 1,
        "Time": 0
      },
      "stats": {
        "capacity": 2
      },
      "keywords": [
        "Specialized",
        "Fragile"
      ],
      "rulesText": "Specialized, Fragile. Upkeep: Produce 2 Data and 3 Goods (up to Capacity 2). Tap: Remove 1 Goods from your Source Zone. Gain 1 Data.",
      "loreText": "Required for Pharmaceutical Contracts. Goods produced here cannot be affected by Contamination Event disruptions. Tap: Produce 1 pharmaceutical token worth 2 FP toward medical Contracts.",
      "flavorText": "Sterility is not optional.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Data",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 2,
        "Time": 0
      },
      "goods": 3
    },
    {
      "id": "014",
      "name": "Oil Refinery",
      "type": "Infrastructure",
      "subtype": "Facility",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 3,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 3
      },
      "keywords": [
        "Automated"
      ],
      "rulesText": "Automated. Upkeep: Produce 1 Fuel and 1 Goods (up to Capacity 3). Tap: Remove 1 Goods from your Source Zone. Gain 1 Fuel.",
      "loreText": "During Upkeep, generate 2 Fuel resources instead of 1 from this card. All Fleet cards you control reduce their Fuel costs by 1 (minimum 0).",
      "flavorText": "Black gold transformed into motion.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Fuel",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 1,
        "Data": 0,
        "Time": 0
      },
      "goods": 1
    },
    {
      "id": "015",
      "name": "Solar-Powered Depot",
      "type": "Infrastructure",
      "subtype": "Storage",
      "rarity": "Common",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 3
      },
      "keywords": [
        "Sustainable"
      ],
      "rulesText": "Sustainable. Upkeep: Produce 1 Fuel and 1 Goods (up to Capacity 3). Tap: Remove 1 Goods from your Source Zone. Gain 1 Fuel.",
      "loreText": "Solar-Powered Depot does not require Fuel to operate. During Upkeep, generate 1 additional resource of any type. Immune to Fuel Price Spike disruptions.",
      "flavorText": "The sun charges no tariffs.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Fuel",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 1,
        "Data": 0,
        "Time": 0
      },
      "goods": 1
    },
    {
      "id": "016",
      "name": "Free Trade Zone",
      "type": "Infrastructure",
      "subtype": "Hub",
      "rarity": "Rare",
      "cost": {
        "Capital": 3,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 4
      },
      "keywords": [
        "Hub"
      ],
      "rulesText": "Hub. Upkeep: Produce 3 Capital and 2 Goods (up to Capacity 4). Tap: Remove 1 Goods from your Source Zone. Gain 1 Capital.",
      "loreText": "All goods moving through Free Trade Zone ignore Tariff War and Customs Seizure disruptions. Reduce Capital cost of all Contracts fulfilled from this zone by 1.",
      "flavorText": "Where borders dissolve and commerce flows free.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Capital",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 3,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "goods": 2
    },
    {
      "id": "017",
      "name": "Dry Port",
      "type": "Infrastructure",
      "subtype": "Hub",
      "rarity": "Common",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 3
      },
      "keywords": [
        "Hub"
      ],
      "rulesText": "Hub. Upkeep: Produce 2 Fuel and 1 Goods (up to Capacity 3). Tap: Remove 1 Goods from your Source Zone. Gain 1 Fuel.",
      "loreText": "Connects inland Infrastructure to Container Port benefits. Fleet cards transiting through Dry Port may switch between Rail and Truck subtypes for routing purposes.",
      "flavorText": "The ocean reaches inland.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Fuel",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 2,
        "Data": 0,
        "Time": 0
      },
      "goods": 1
    },
    {
      "id": "018",
      "name": "Returns Processing Center",
      "type": "Infrastructure",
      "subtype": "Facility",
      "rarity": "Common",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 2
      },
      "keywords": [],
      "rulesText": "Upkeep: Produce 1 Labor and 1 Goods (up to Capacity 2). Tap: Remove 1 Goods from your Source Zone. Gain 1 Labor.",
      "loreText": "When an opponent plays a Disruption that destroys Goods, recover 1 destroyed token and place it here. Tap: Convert 1 returned Goods into 1 Capital resource.",
      "flavorText": "One customer's return is another's opportunity.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Labor",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "goods": 1
    },
    {
      "id": "019",
      "name": "Packaging Line",
      "type": "Infrastructure",
      "subtype": "Facility",
      "rarity": "Common",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 2
      },
      "keywords": [
        "Automated"
      ],
      "rulesText": "Automated. Upkeep: Produce 1 Capital and 1 Goods (up to Capacity 2). Tap: Remove 1 Goods from your Source Zone. Gain 1 Capital.",
      "loreText": "Tap: Package up to 2 Goods, adding +1 value each toward Contract fulfillment. Packaged goods occupy 1 less capacity during transit.",
      "flavorText": "The last touch before the journey begins.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Capital",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "goods": 1
    },
    {
      "id": "020",
      "name": "Quarantine Inspection Bay",
      "type": "Infrastructure",
      "subtype": "Facility",
      "rarity": "Common",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 2
      },
      "keywords": [
        "Specialized"
      ],
      "rulesText": "Specialized. Upkeep: Produce 1 Data and 2 Goods (up to Capacity 2). Tap: Remove 1 Goods from your Source Zone. Gain 1 Data.",
      "loreText": "Goods passing through Quarantine Inspection Bay are immune to Contamination Event and Counterfeit Goods disruptions for the remainder of the game. Slows transit by 1 turn.",
      "flavorText": "Trust, but verify.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Data",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 1,
        "Time": 0
      },
      "goods": 2
    },
    {
      "id": "021",
      "name": "Data Center",
      "type": "Infrastructure",
      "subtype": "Digital",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 2,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 3
      },
      "keywords": [
        "Automated"
      ],
      "rulesText": "Automated. Upkeep: Produce 1 Data and 1 Goods (up to Capacity 3). Tap: Remove 1 Goods from your Source Zone. Gain 1 Data.",
      "loreText": "During Upkeep, generate 2 Data resources. Tap: Grant any 1 Infrastructure card the Automated keyword until end of turn, allowing it to operate without Labor costs.",
      "flavorText": "Ones and zeros that move mountains.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Data",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 1,
        "Time": 0
      },
      "goods": 1
    },
    {
      "id": "022",
      "name": "Control Tower",
      "type": "Infrastructure",
      "subtype": "Digital",
      "rarity": "Rare",
      "cost": {
        "Capital": 3,
        "Labor": 0,
        "Fuel": 0,
        "Data": 1,
        "Time": 0
      },
      "stats": {
        "capacity": 2
      },
      "keywords": [
        "Automated"
      ],
      "rulesText": "Automated. Upkeep: Produce 2 Data and 2 Goods (up to Capacity 2). Tap: Remove 1 Goods from your Source Zone. Gain 1 Data.",
      "loreText": "You may look at the top 3 cards of any player's deck at any time. During Transit Phase, reroute any 1 shipment in your Network Zone to a different destination without paying additional costs.",
      "flavorText": "See everything. Direct everything.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Data",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 2,
        "Time": 0
      },
      "goods": 2
    },
    {
      "id": "023",
      "name": "Blockchain Ledger Node",
      "type": "Infrastructure",
      "subtype": "Digital",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 2,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 2
      },
      "keywords": [
        "Automated"
      ],
      "rulesText": "Automated. Upkeep: Produce 1 Data and 1 Goods (up to Capacity 2). Tap: Remove 1 Goods from your Source Zone. Gain 1 Data.",
      "loreText": "All your Goods gain Track and Trace. Opponents cannot play Cargo Theft or Counterfeit Goods targeting goods registered on your Blockchain Ledger. Tap: Verify 1 Contract for instant completion.",
      "flavorText": "Immutable truth in an uncertain world.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Data",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 1,
        "Time": 0
      },
      "goods": 1
    },
    {
      "id": "024",
      "name": "3D Printing Facility",
      "type": "Infrastructure",
      "subtype": "Facility",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 3,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 2
      },
      "keywords": [
        "Automated"
      ],
      "rulesText": "Automated. Upkeep: Produce 1 Capital and 1 Goods (up to Capacity 2). Tap: Remove 1 Goods from your Source Zone. Gain 1 Capital.",
      "loreText": "Tap: Create 1 custom Goods matching any Contract requirement without needing Goods. Limit once per turn. Custom goods cannot be stored or transferred.",
      "flavorText": "Design today, deliver tomorrow.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Capital",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "goods": 1
    },
    {
      "id": "025",
      "name": "Vertical Farm",
      "type": "Infrastructure",
      "subtype": "Facility",
      "rarity": "Common",
      "cost": {
        "Capital": 2,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 2
      },
      "keywords": [
        "Sustainable"
      ],
      "rulesText": "Sustainable. Upkeep: Produce 1 Labor and 1 Goods (up to Capacity 2). Tap: Remove 1 Goods from your Source Zone. Gain 1 Labor.",
      "loreText": "During Upkeep, produce 1 perishable Goods. Perishable tokens spoil after 3 turns unless stored in Cold Storage. Counts toward food-related Contract requirements.",
      "flavorText": "Forty floors of fresh produce.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Labor",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "goods": 1
    },
    {
      "id": "026",
      "name": "LNG Terminal",
      "type": "Infrastructure",
      "subtype": "Hub",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 2,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 4
      },
      "keywords": [
        "Hub",
        "Fragile"
      ],
      "rulesText": "Hub, Fragile. Upkeep: Produce 2 Fuel and 1 Goods (up to Capacity 4). Tap: Remove 1 Goods from your Source Zone. Gain 1 Fuel.",
      "loreText": "During Upkeep, generate 3 Fuel resources. Ship-subtype Fleet cards docked here gain +1 Capacity. Vulnerable to Natural Disaster disruptions (destroyed instead of damaged).",
      "flavorText": "Liquid energy awaiting transformation.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Fuel",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 2,
        "Data": 0,
        "Time": 0
      },
      "goods": 1
    },
    {
      "id": "027",
      "name": "Customs Brokerage Office",
      "type": "Infrastructure",
      "subtype": "Facility",
      "rarity": "Common",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 1
      },
      "keywords": [],
      "rulesText": "Upkeep: Produce 1 Time and 1 Goods (up to Capacity 1). Tap: Remove 1 Goods from your Source Zone. Gain 1 Time.",
      "loreText": "Reduce the impact of Tariff War by 1 resource per turn. Tap: Clear 1 shipment through customs immediately, bypassing any inspection delay. Prevents Customs Seizure on 1 shipment per turn.",
      "flavorText": "Paperwork is our superpower.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Time",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 1
      },
      "goods": 1
    },
    {
      "id": "028",
      "name": "Intermodal Transfer Yard",
      "type": "Infrastructure",
      "subtype": "Hub",
      "rarity": "Common",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 3
      },
      "keywords": [
        "Hub"
      ],
      "rulesText": "Hub. Upkeep: Produce 2 Fuel and 1 Goods (up to Capacity 3). Tap: Remove 1 Goods from your Source Zone. Gain 1 Fuel.",
      "loreText": "Fleet cards may transfer goods between different vehicle types here without spending a Transit Phase action. Tap: Move 1 Goods from any Fleet card to any other Fleet card you control.",
      "flavorText": "Ship to rail to truck, seamlessly.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Fuel",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 2,
        "Data": 0,
        "Time": 0
      },
      "goods": 1
    },
    {
      "id": "029",
      "name": "Reverse Logistics Depot",
      "type": "Infrastructure",
      "subtype": "Facility",
      "rarity": "Common",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 2
      },
      "keywords": [
        "Sustainable"
      ],
      "rulesText": "Sustainable. Upkeep: Produce 1 Labor and 1 Goods (up to Capacity 2). Tap: Remove 1 Goods from your Source Zone. Gain 1 Labor.",
      "loreText": "When a Contract is failed or canceled, return Goods here instead of discarding them. Tap: Recycle 2 Goods into 1 resource of any type.",
      "flavorText": "Nothing is truly wasted here.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Labor",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "goods": 1
    },
    {
      "id": "030",
      "name": "Drone Launch Pad",
      "type": "Infrastructure",
      "subtype": "Facility",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 3,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 2
      },
      "keywords": [
        "Automated"
      ],
      "rulesText": "Automated. Upkeep: Produce 1 Fuel and 1 Goods (up to Capacity 2). Tap: Remove 1 Goods from your Source Zone. Gain 1 Fuel.",
      "loreText": "Drone-subtype Fleet cards deployed from here gain +2 Speed and Rush keyword. Tap: Launch 1 emergency delivery, fulfilling 1 last-mile Contract requirement instantly.",
      "flavorText": "Vertical takeoff, horizontal disruption.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Fuel",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 1,
        "Data": 0,
        "Time": 0
      },
      "goods": 1
    },
    {
      "id": "031",
      "name": "Chip Fabrication Plant",
      "type": "Infrastructure",
      "subtype": "Facility",
      "rarity": "Rare",
      "cost": {
        "Capital": 2,
        "Labor": 0,
        "Fuel": 0,
        "Data": 1,
        "Time": 0
      },
      "stats": {
        "capacity": 2
      },
      "keywords": [
        "Specialized",
        "Fragile"
      ],
      "rulesText": "Specialized, Fragile. Upkeep: Produce 2 Data and 3 Goods (up to Capacity 2). Tap: Remove 1 Goods from your Source Zone. Gain 1 Data.",
      "loreText": "Required for Electronics Launch Contract. Tap: Produce 1 semiconductor token. Semiconductor tokens are worth 3 toward electronics Contracts. If destroyed, all your Automated cards lose their keyword for 2 turns.",
      "flavorText": "Nanometers of precision, billions in value.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Data",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 2,
        "Time": 0
      },
      "goods": 3
    },
    {
      "id": "032",
      "name": "Grain Elevator",
      "type": "Infrastructure",
      "subtype": "Storage",
      "rarity": "Common",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 4
      },
      "keywords": [
        "Specialized"
      ],
      "rulesText": "Specialized. Upkeep: Produce 1 Time and 2 Goods (up to Capacity 4). Tap: Remove 1 Goods from your Source Zone. Gain 1 Time.",
      "loreText": "Can only store agricultural Goods. Capacity is doubled for grain products. Tap: Load 2 agricultural goods onto any Fleet card connected to this facility.",
      "flavorText": "Towering sentinels of the heartland.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Time",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 1
      },
      "goods": 2
    },
    {
      "id": "033",
      "name": "Hazmat Containment Facility",
      "type": "Infrastructure",
      "subtype": "Storage",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 3,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 2
      },
      "keywords": [
        "Specialized"
      ],
      "rulesText": "Specialized. Upkeep: Produce 1 Time and 2 Goods (up to Capacity 2). Tap: Remove 1 Goods from your Source Zone. Gain 1 Time.",
      "loreText": "Required for Hazmat Disposal Contract. Hazardous goods stored here cannot trigger Contamination Events. Tap: Safely dispose of 1 hazardous token, gaining 1 FP.",
      "flavorText": "Safety protocols are written in someone else's tragedy.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Time",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 1
      },
      "goods": 2
    },
    {
      "id": "034",
      "name": "Autonomous Warehouse",
      "type": "Infrastructure",
      "subtype": "Storage",
      "rarity": "Rare",
      "cost": {
        "Capital": 3,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 1
      },
      "stats": {
        "capacity": 6
      },
      "keywords": [
        "Automated"
      ],
      "rulesText": "Automated. Upkeep: Produce 2 Time and 2 Goods (up to Capacity 6). Tap: Remove 1 Goods from your Source Zone. Gain 1 Time.",
      "loreText": "Does not require Workforce cards to operate. During Transit Phase, automatically load and unload up to 3 Goods without player action. Immune to Union Negotiation Breakdown.",
      "flavorText": "No lights needed. The robots prefer the dark.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Time",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 2
      },
      "goods": 2
    },
    {
      "id": "035",
      "name": "Pop-Up Distribution Point",
      "type": "Infrastructure",
      "subtype": "Facility",
      "rarity": "Common",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 1
      },
      "keywords": [
        "Rush",
        "Fragile"
      ],
      "rulesText": "Rush, Fragile. Upkeep: Produce 1 Labor and 1 Goods (up to Capacity 1). Tap: Remove 1 Goods from your Source Zone. Gain 1 Labor.",
      "loreText": "Flash: May be deployed during Transit Phase instead of Deployment Phase. Sacrifice at end of turn. While active, all your last-mile deliveries cost 1 less Fuel.",
      "flavorText": "Here today, delivering today, gone tomorrow.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Labor",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "goods": 1
    },
    {
      "id": "036",
      "name": "Mega-Port Complex",
      "type": "Infrastructure",
      "subtype": "Hub",
      "rarity": "Rare",
      "cost": {
        "Capital": 3,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 8
      },
      "keywords": [
        "Hub"
      ],
      "rulesText": "Hub. Upkeep: Produce 3 Labor and 2 Goods (up to Capacity 8). Tap: Remove 1 Goods from your Source Zone. Gain 1 Labor.",
      "loreText": "All Ship and Rail Fleet cards gain +1 Speed and +2 Capacity while connected. During Upkeep, import up to 3 Goods from the Source Zone at standard cost. Hub for intercontinental routes.",
      "flavorText": "Where the world's goods converge.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Labor",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 0,
        "Labor": 3,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "goods": 2
    },
    {
      "id": "037",
      "name": "Hyperloop Terminal",
      "type": "Infrastructure",
      "subtype": "Hub",
      "rarity": "Mythic Rare",
      "cost": {
        "Capital": 4,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 2
      },
      "stats": {
        "capacity": 4
      },
      "keywords": [
        "Automated",
        "Hub"
      ],
      "rulesText": "Automated, Hub. Upkeep: Produce 4 Time and 2 Goods (up to Capacity 4). Tap: Remove 1 Goods from your Source Zone. Gain 1 Time.",
      "loreText": "Fleet cards departing from Hyperloop Terminal have their transit time reduced to 0 turns (arrive instantly). Limit 2 shipments per turn. Connected Infrastructure within 2 links gains +1 Capacity.",
      "flavorText": "Distance is just a number now.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Time",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 4
      },
      "goods": 2
    },
    {
      "id": "038",
      "name": "Orbital Drop Platform",
      "type": "Infrastructure",
      "subtype": "Facility",
      "rarity": "Mythic Rare",
      "cost": {
        "Capital": 4,
        "Labor": 0,
        "Fuel": 2,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 3
      },
      "keywords": [
        "Rush",
        "Automated"
      ],
      "rulesText": "Rush, Automated. Upkeep: Produce 3 Fuel and 2 Goods (up to Capacity 3). Tap: Remove 1 Goods from your Source Zone. Gain 1 Fuel.",
      "loreText": "Tap: Deliver any Goods to any location on the board instantly, bypassing all Disruptions and route requirements. Costs 2 Fuel per use. Immune to all ground-based Disruptions.",
      "flavorText": "Gravity does the heavy lifting.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Fuel",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 3,
        "Data": 0,
        "Time": 0
      },
      "goods": 2
    },
    {
      "id": "039",
      "name": "Underground Bunker Vault",
      "type": "Infrastructure",
      "subtype": "Storage",
      "rarity": "Rare",
      "cost": {
        "Capital": 3,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 1
      },
      "stats": {
        "capacity": 4
      },
      "keywords": [
        "Specialized"
      ],
      "rulesText": "Specialized. Upkeep: Produce 2 Time and 3 Goods (up to Capacity 4). Tap: Remove 1 Goods from your Source Zone. Gain 1 Time.",
      "loreText": "Goods stored here are immune to ALL Disruptions. Cannot be targeted by opponent abilities. Goods take 1 additional turn to retrieve. Tap: Store up to 2 Goods safely.",
      "flavorText": "When the world burns, the supply chain endures.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "Time",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 2
      },
      "goods": 3
    },
    {
      "id": "040",
      "name": "The Global Nexus",
      "type": "Infrastructure",
      "subtype": "Hub",
      "rarity": "Mythic Rare",
      "cost": {
        "Capital": 4,
        "Labor": 0,
        "Fuel": 0,
        "Data": 1,
        "Time": 1
      },
      "stats": {
        "capacity": 10
      },
      "keywords": [
        "Automated",
        "Hub",
        "Legendary"
      ],
      "rulesText": "Automated, Hub, Legendary. Upkeep: Produce 1 Capital, 1 Labor, 1 Fuel, 1 Data, 1 Time and 2 Goods (up to Capacity 10). Tap: Remove 1 Goods from your Source Zone. Gain 1 resource of any type.",
      "loreText": "All your Infrastructure cards are considered connected. All Fleet cards gain +2 Speed. During Upkeep, generate 1 of each resource type. When you fulfill a Contract, gain 1 additional FP. Legendary - limit 1 per deck.",
      "flavorText": "The center of everything, connected to everywhere.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -1
            },
            {
              "do": "gain",
              "resource": "any",
              "amount": 1
            }
          ]
        }
      ],
      "produces": {
        "Capital": 1,
        "Labor": 1,
        "Fuel": 1,
        "Data": 1,
        "Time": 1
      },
      "goods": 2
    },
    {
      "id": "041",
      "name": "Forklift Operator",
      "type": "Workforce",
      "subtype": "Worker",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "power": 1,
        "toughness": 2
      },
      "keywords": [],
      "rulesText": "Tap: Add 1 Goods to Infrastructure you control.",
      "loreText": "Tap: Move 1 Goods between any two Infrastructure cards in your Source Zone. Forklift Operator can load/unload Fleet cards without spending a Transit Phase action.",
      "flavorText": "Master of the warehouse ballet.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "042",
      "name": "Long-Haul Trucker",
      "type": "Workforce",
      "subtype": "Worker",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 1,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "power": 2,
        "toughness": 2
      },
      "keywords": [],
      "rulesText": "Tap: Add 1 Goods to Infrastructure you control.",
      "loreText": "When assigned to a Truck-subtype Fleet card, that vehicle gains +1 Speed and +1 Capacity. During Combat Phase, Long-Haul Trucker deals 2 damage to blocking Disruptions.",
      "flavorText": "Midnight miles and diesel dreams.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "043",
      "name": "Warehouse Associate",
      "type": "Workforce",
      "subtype": "Worker",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "power": 1,
        "toughness": 1
      },
      "keywords": [],
      "rulesText": "Tap: Add 1 Goods to Infrastructure you control.",
      "loreText": "Tap: Pick and pack 1 Goods, making it ready for shipment. When assigned to a Fulfillment Center, that Infrastructure gains +1 Capacity.",
      "flavorText": "Ten thousand steps a day, ten thousand orders filled.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "044",
      "name": "Customs Agent",
      "type": "Workforce",
      "subtype": "Specialist",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 0,
        "Data": 1,
        "Time": 0
      },
      "stats": {
        "power": 1,
        "toughness": 2
      },
      "keywords": [
        "Specialized"
      ],
      "rulesText": "Specialized. Tap: Reduce the Cargo required by your Contracts by 1 this turn.",
      "loreText": "Prevents Customs Seizure disruptions on any 1 shipment per turn. Tap: Clear 1 international shipment through customs instantly, bypassing normal inspection delay.",
      "flavorText": "Stamp of approval, gateway to the world.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "cargoDiscount",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "045",
      "name": "Supply Chain Analyst",
      "type": "Workforce",
      "subtype": "Specialist",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 1,
        "Labor": 1,
        "Fuel": 0,
        "Data": 1,
        "Time": 0
      },
      "stats": {
        "power": 1,
        "toughness": 1
      },
      "keywords": [],
      "rulesText": "Tap: Reduce the Cargo required by your Contracts by 1 this turn.",
      "loreText": "During Planning Phase, look at the top 2 cards of your deck and rearrange them. Tap: Reveal an opponent's hand card. Generate 1 Data resource during Upkeep.",
      "flavorText": "The numbers tell stories others cannot hear.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "cargoDiscount",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "046",
      "name": "Procurement Manager",
      "type": "Workforce",
      "subtype": "Specialist",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 1,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "power": 1,
        "toughness": 2
      },
      "keywords": [],
      "rulesText": "Tap: Reduce the Cargo required by your Contracts by 1 this turn.",
      "loreText": "During Upkeep, reduce the cost of purchasing 1 Goods from the Source Zone by 1 Capital. Tap: Negotiate a bulk deal, buying 3 Goods for the price of 2.",
      "flavorText": "Never pay list price. Ever.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "cargoDiscount",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "047",
      "name": "Dock Worker",
      "type": "Workforce",
      "subtype": "Worker",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "power": 2,
        "toughness": 2
      },
      "keywords": [],
      "rulesText": "Tap: Add 1 Goods to Infrastructure you control.",
      "loreText": "When assigned to a Container Port or Mega-Port, increase that Hub's loading speed: move 2 additional Goods during Transit Phase. Gains +1 Power during Combat with Piracy disruptions.",
      "flavorText": "Strong back, steady hands, ships to fill.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "048",
      "name": "Freight Broker",
      "type": "Workforce",
      "subtype": "Specialist",
      "rarity": "Common",
      "cost": {
        "Capital": 1,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "power": 1,
        "toughness": 1
      },
      "keywords": [],
      "rulesText": "Tap: Reduce the Cargo required by your Contracts by 1 this turn.",
      "loreText": "Tap: Assign any Fleet card you control to a route it normally couldn't access. During Upkeep, reduce Fuel cost of 1 Fleet card by 1 this turn.",
      "flavorText": "A phone call away from solving any logistics puzzle.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "cargoDiscount",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "049",
      "name": "Last-Mile Courier",
      "type": "Workforce",
      "subtype": "Worker",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "power": 1,
        "toughness": 1
      },
      "keywords": [
        "Rush"
      ],
      "rulesText": "Rush. Tap: Add 1 Goods to Infrastructure you control.",
      "loreText": "Rush: May act on the turn deployed. Tap: Deliver 1 Goods directly to fulfill a Contract requirement, bypassing Fleet card requirements for packages weighing 1 or less.",
      "flavorText": "Sprinting the final hundred meters.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "050",
      "name": "Inventory Controller",
      "type": "Workforce",
      "subtype": "Specialist",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 0,
        "Data": 1,
        "Time": 0
      },
      "stats": {
        "power": 1,
        "toughness": 1
      },
      "keywords": [],
      "rulesText": "Tap: Reduce the Cargo required by your Contracts by 1 this turn.",
      "loreText": "All your Infrastructure cards gain +1 effective Capacity while Inventory Controller is active. Tap: Reorganize goods in any 1 Infrastructure, making room for 1 additional token this turn.",
      "flavorText": "Every slot accounted for, every item in its place.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "cargoDiscount",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "051",
      "name": "Quality Inspector",
      "type": "Workforce",
      "subtype": "Specialist",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "power": 1,
        "toughness": 1
      },
      "keywords": [
        "Specialized"
      ],
      "rulesText": "Specialized. Tap: Reduce the Cargo required by your Contracts by 1 this turn.",
      "loreText": "Tap: Inspect 1 Goods. Inspected goods are immune to Counterfeit Goods and Contamination disruptions. Contracts fulfilled with inspected goods grant +1 bonus FP.",
      "flavorText": "Acceptable is never good enough.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "cargoDiscount",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "052",
      "name": "Route Optimizer",
      "type": "Workforce",
      "subtype": "Specialist",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 0,
        "Data": 2,
        "Time": 0
      },
      "stats": {
        "power": 1,
        "toughness": 1
      },
      "keywords": [
        "Automated"
      ],
      "rulesText": "Automated. Tap: Reduce the Cargo required by your Contracts by 1 this turn.",
      "loreText": "All Fleet cards you control gain +1 Speed. Tap: Recalculate route for 1 Fleet card, reducing its transit time by 1 turn. During Planning Phase, you may view all opponent Fleet positions.",
      "flavorText": "The shortest path is rarely a straight line.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "cargoDiscount",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "053",
      "name": "Night Shift Crew",
      "type": "Workforce",
      "subtype": "Worker",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 2,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "power": 2,
        "toughness": 1
      },
      "keywords": [],
      "rulesText": "Tap: Add 1 Goods to Infrastructure you control.",
      "loreText": "Tap during opponent's turn: Perform 1 loading/unloading action at any Infrastructure you control. Night Shift Crew effectively doubles your operational throughput each round.",
      "flavorText": "The supply chain never sleeps.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "054",
      "name": "Hazmat Handler",
      "type": "Workforce",
      "subtype": "Specialist",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 0,
        "Data": 1,
        "Time": 0
      },
      "stats": {
        "power": 1,
        "toughness": 2
      },
      "keywords": [
        "Specialized"
      ],
      "rulesText": "Specialized. Tap: Reduce the Cargo required by your Contracts by 1 this turn.",
      "loreText": "Required to transport hazardous Goods. When assigned to a Hazmat Containment Facility, that card gains +2 Capacity. Prevents Contamination Event from spreading to adjacent Infrastructure.",
      "flavorText": "Certified, trained, and fearless.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "cargoDiscount",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "055",
      "name": "Port Crane Operator",
      "type": "Workforce",
      "subtype": "Worker",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 1,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "power": 2,
        "toughness": 2
      },
      "keywords": [],
      "rulesText": "Tap: Add 1 Goods to Infrastructure you control.",
      "loreText": "Tap: Load or unload 3 Goods from a Ship-subtype Fleet card in a single action (normally limited to 1). Doubles Container Port throughput when assigned there.",
      "flavorText": "Sixty tons, sixty meters, sixty seconds.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "056",
      "name": "Logistics Coordinator",
      "type": "Workforce",
      "subtype": "Specialist",
      "rarity": "Common",
      "cost": {
        "Capital": 1,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "power": 1,
        "toughness": 1
      },
      "keywords": [],
      "rulesText": "Tap: Reduce the Cargo required by your Contracts by 1 this turn.",
      "loreText": "During Planning Phase, you may take 1 additional Transit Phase action. Tap: Reassign 1 Workforce card from one Infrastructure to another without spending a Deployment action.",
      "flavorText": "Orchestrating chaos into order.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "cargoDiscount",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "057",
      "name": "Union Steward",
      "type": "Workforce",
      "subtype": "Specialist",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 0,
        "Labor": 2,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "power": 1,
        "toughness": 3
      },
      "keywords": [],
      "rulesText": "Tap: Reduce the Cargo required by your Contracts by 1 this turn.",
      "loreText": "All your Workforce cards gain +1 Toughness. Prevents Union Negotiation Breakdown from affecting your workers for 2 turns. Tap: Protect 1 Workforce card from being discarded this turn.",
      "flavorText": "Workers united, supply chain protected.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "cargoDiscount",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "058",
      "name": "Seasonal Temp Worker",
      "type": "Workforce",
      "subtype": "Worker",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "power": 1,
        "toughness": 1
      },
      "keywords": [
        "Rush",
        "Fragile"
      ],
      "rulesText": "Rush, Fragile. Tap: Add 1 Goods to Infrastructure you control.",
      "loreText": "Flash: Deploy during any phase. Sacrifice at end of next turn. While active, assigned Infrastructure gains +2 Capacity. Cannot be assigned the Automated keyword.",
      "flavorText": "Here for the holiday rush, gone by January.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "059",
      "name": "AI Operations Manager",
      "type": "Workforce",
      "subtype": "Specialist",
      "rarity": "Rare",
      "cost": {
        "Capital": 2,
        "Labor": 0,
        "Fuel": 0,
        "Data": 2,
        "Time": 0
      },
      "stats": {
        "power": 2,
        "toughness": 1
      },
      "keywords": [
        "Automated"
      ],
      "rulesText": "Automated. Tap: Reduce the Cargo required by your Contracts by 1 this turn.",
      "loreText": "All Infrastructure with the Automated keyword gain +2 Capacity. During Planning Phase, automatically optimize all routes (all Fleet gain +1 Speed). Immune to Driver Shortage. Generate 1 Data each Upkeep.",
      "flavorText": "I process therefore I optimize.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "cargoDiscount",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "060",
      "name": "Chief Supply Chain Officer",
      "type": "Workforce",
      "subtype": "Executive",
      "rarity": "Rare",
      "cost": {
        "Capital": 2,
        "Labor": 1,
        "Fuel": 0,
        "Data": 1,
        "Time": 1
      },
      "stats": {
        "power": 2,
        "toughness": 3
      },
      "keywords": [],
      "rulesText": "Tap: Gain 1 Capital.",
      "loreText": "All your Workforce cards gain +1 Power. During Planning Phase, draw 1 additional card. Once per game: restructure your entire Source Zone, rearranging all Goods and Workforce assignments.",
      "flavorText": "Vision from the top floor, impact on every floor.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "gain",
              "resource": "Capital",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "061",
      "name": "Drone Pilot",
      "type": "Workforce",
      "subtype": "Specialist",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 0,
        "Data": 1,
        "Time": 0
      },
      "stats": {
        "power": 1,
        "toughness": 1
      },
      "keywords": [],
      "rulesText": "Tap: Reduce the Cargo required by your Contracts by 1 this turn.",
      "loreText": "Required to operate Drone-subtype Fleet cards. When assigned to Drone Launch Pad, all Drone Fleet cards gain +1 Speed. Tap: Survey any route, revealing hidden Disruptions.",
      "flavorText": "Eyes in the sky, packages in the air.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "cargoDiscount",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "062",
      "name": "Refrigeration Technician",
      "type": "Workforce",
      "subtype": "Specialist",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "power": 1,
        "toughness": 1
      },
      "keywords": [
        "Specialized"
      ],
      "rulesText": "Specialized. Tap: Reduce the Cargo required by your Contracts by 1 this turn.",
      "loreText": "Prevents Cold Storage Unit and Refrigerated Truck from malfunctioning. Perishable goods under this worker's care gain +2 turns before spoiling. Tap: Repair 1 damaged cold chain Infrastructure.",
      "flavorText": "Guardian of the cold chain.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "cargoDiscount",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "063",
      "name": "Security Guard",
      "type": "Workforce",
      "subtype": "Worker",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "power": 2,
        "toughness": 2
      },
      "keywords": [],
      "rulesText": "Tap: Add 1 Goods to Infrastructure you control.",
      "loreText": "Assigned Infrastructure is immune to Cargo Theft. During Combat Phase, Security Guard blocks 1 Disruption targeting your Source Zone, dealing 2 damage to it.",
      "flavorText": "Vigilance is the price of full shelves.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "064",
      "name": "Compliance Officer",
      "type": "Workforce",
      "subtype": "Specialist",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 1,
        "Labor": 1,
        "Fuel": 0,
        "Data": 1,
        "Time": 0
      },
      "stats": {
        "power": 0,
        "toughness": 2
      },
      "keywords": [
        "Specialized"
      ],
      "rulesText": "Specialized. Tap: Reduce the Cargo required by your Contracts by 1 this turn.",
      "loreText": "Prevents Regulatory Fine from affecting you. All your operations satisfy regulatory requirements automatically. Tap: Cancel 1 Sanctions disruption targeting your supply chain.",
      "flavorText": "Every regulation known, every form filed.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "cargoDiscount",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "065",
      "name": "Master Planner",
      "type": "Workforce",
      "subtype": "Specialist",
      "rarity": "Rare",
      "cost": {
        "Capital": 1,
        "Labor": 1,
        "Fuel": 0,
        "Data": 2,
        "Time": 0
      },
      "stats": {
        "power": 1,
        "toughness": 2
      },
      "keywords": [],
      "rulesText": "Tap: Reduce the Cargo required by your Contracts by 1 this turn.",
      "loreText": "During Planning Phase, look at the top 4 cards of your deck and put them back in any order. Once per game: take an extra Planning Phase this turn. All Contracts you attempt gain -1 turn to completion.",
      "flavorText": "Thirty moves ahead, always.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "cargoDiscount",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "066",
      "name": "Cross-Trained Associate",
      "type": "Workforce",
      "subtype": "Worker",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "power": 1,
        "toughness": 2
      },
      "keywords": [],
      "rulesText": "Tap: Add 1 Goods to Infrastructure you control.",
      "loreText": "May be assigned to any Infrastructure type without restriction. Gains the specialty keyword of whatever Infrastructure it is assigned to. Tap: Perform any Workforce tap ability on the same Infrastructure.",
      "flavorText": "Jack of all trades, master of survival.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "067",
      "name": "Negotiator",
      "type": "Workforce",
      "subtype": "Specialist",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 1,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "power": 1,
        "toughness": 1
      },
      "keywords": [],
      "rulesText": "Tap: Reduce the Cargo required by your Contracts by 1 this turn.",
      "loreText": "Tap: Reduce the resource cost of any 1 card you play this turn by 2 (distributed across any resource types). During Upkeep, buy 1 Goods at half cost (rounded up).",
      "flavorText": "Everything has a price. Usually lower than posted.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "cargoDiscount",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "068",
      "name": "Expeditor",
      "type": "Workforce",
      "subtype": "Specialist",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 1,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "power": 1,
        "toughness": 1
      },
      "keywords": [
        "Rush"
      ],
      "rulesText": "Rush. Tap: Reduce the Cargo required by your Contracts by 1 this turn.",
      "loreText": "Rush: Acts on deployment turn. Tap: Give any 1 Fleet card the Rush keyword this turn. When assigned to a Contract, reduce its completion time by 1 turn.",
      "flavorText": "Fast is a way of life.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "cargoDiscount",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "069",
      "name": "Data Scientist",
      "type": "Workforce",
      "subtype": "Specialist",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 0,
        "Data": 2,
        "Time": 0
      },
      "stats": {
        "power": 1,
        "toughness": 1
      },
      "keywords": [
        "Automated"
      ],
      "rulesText": "Automated. Tap: Reduce the Cargo required by your Contracts by 1 this turn.",
      "loreText": "Generate 2 Data resources during Upkeep. Tap: Analyze demand patterns - look at next 3 Contracts in the Contract deck. Predictive Analytics costs 1 less when Data Scientist is active.",
      "flavorText": "Patterns emerge for those who know where to look.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "cargoDiscount",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "070",
      "name": "Robotics Engineer",
      "type": "Workforce",
      "subtype": "Specialist",
      "rarity": "Rare",
      "cost": {
        "Capital": 2,
        "Labor": 1,
        "Fuel": 0,
        "Data": 1,
        "Time": 0
      },
      "stats": {
        "power": 1,
        "toughness": 1
      },
      "keywords": [
        "Automated"
      ],
      "rulesText": "Automated. Tap: Reduce the Cargo required by your Contracts by 1 this turn.",
      "loreText": "Tap: Give any 1 Infrastructure or Fleet card the Automated keyword permanently. Automated cards don't need Workforce to operate. Once per game: deploy 1 Autonomous card from your deck directly.",
      "flavorText": "Teaching machines to replace us all.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "cargoDiscount",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "071",
      "name": "Ship Captain",
      "type": "Workforce",
      "subtype": "Specialist",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 1,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "power": 2,
        "toughness": 2
      },
      "keywords": [],
      "rulesText": "Tap: Reduce the Cargo required by your Contracts by 1 this turn.",
      "loreText": "Required for Ship-subtype Fleet cards. Assigned Ship gains +1 Speed and +2 Capacity. During Combat Phase, Ship Captain has +2 Power against Piracy disruptions.",
      "flavorText": "Commander of steel, master of tides.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "cargoDiscount",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "072",
      "name": "Pilot",
      "type": "Workforce",
      "subtype": "Specialist",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 1,
        "Labor": 1,
        "Fuel": 1,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "power": 1,
        "toughness": 1
      },
      "keywords": [],
      "rulesText": "Tap: Reduce the Cargo required by your Contracts by 1 this turn.",
      "loreText": "Required for Air-subtype Fleet cards. Assigned aircraft gains +2 Speed. Air Fleet cards with Pilot ignore weather-based Disruptions. Tap: Emergency landing - save cargo from 1 destroyed air Fleet.",
      "flavorText": "Above the storms, beyond the delays.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "cargoDiscount",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "073",
      "name": "Train Engineer",
      "type": "Workforce",
      "subtype": "Specialist",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 1,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "power": 1,
        "toughness": 2
      },
      "keywords": [],
      "rulesText": "Tap: Reduce the Cargo required by your Contracts by 1 this turn.",
      "loreText": "Required for Rail-subtype Fleet cards. Assigned train gains +2 Capacity. Tap: Couple additional cars, adding +3 Capacity to 1 Rail Fleet card for this transit.",
      "flavorText": "Miles of steel, tons of purpose.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "cargoDiscount",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "074",
      "name": "Autonomous Vehicle AI",
      "type": "Workforce",
      "subtype": "Digital",
      "rarity": "Rare",
      "cost": {
        "Capital": 2,
        "Labor": 0,
        "Fuel": 0,
        "Data": 2,
        "Time": 0
      },
      "stats": {
        "power": 2,
        "toughness": 1
      },
      "keywords": [
        "Automated"
      ],
      "rulesText": "Automated. Tap: Gain 1 Data.",
      "loreText": "Replaces Workforce requirements for any 1 Fleet card (does not need a driver/pilot/captain). Assigned Fleet gains Automated keyword and +1 Speed. Immune to Driver Shortage disruption.",
      "flavorText": "No breaks, no sleep, no complaints.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "gain",
              "resource": "Data",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "075",
      "name": "The Legendary Dispatcher",
      "type": "Workforce",
      "subtype": "Executive",
      "rarity": "Mythic Rare",
      "cost": {
        "Capital": 2,
        "Labor": 2,
        "Fuel": 0,
        "Data": 2,
        "Time": 0
      },
      "stats": {
        "power": 3,
        "toughness": 4
      },
      "keywords": [
        "Rush",
        "Legendary"
      ],
      "rulesText": "Rush, Legendary. Tap: Gain 1 Capital.",
      "loreText": "All your Fleet cards gain +2 Speed and Rush. During Transit Phase, take 2 additional routing actions. Once per game: reroute all shipments in play to instantly fulfill 1 Contract. Legendary - limit 1 per deck.",
      "flavorText": "They say no shipment was ever late under the Dispatcher's watch.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "gain",
              "resource": "Capital",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "076",
      "name": "Swarm of Delivery Bots",
      "type": "Workforce",
      "subtype": "Digital",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 1,
        "Data": 1,
        "Time": 0
      },
      "stats": {
        "power": 3,
        "toughness": 1
      },
      "keywords": [
        "Automated",
        "Rush",
        "Fragile"
      ],
      "rulesText": "Automated, Rush, Fragile. Tap: Gain 1 Data.",
      "loreText": "Acts as both Workforce and Fleet simultaneously. Tap: Deliver up to 3 small Goods within your last-mile zone. Fragile: destroyed by any Combat damage. Does not need Workforce to operate.",
      "flavorText": "A thousand tiny wheels, a thousand tiny deliveries.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "gain",
              "resource": "Data",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "077",
      "name": "Veteran Logistics General",
      "type": "Workforce",
      "subtype": "Executive",
      "rarity": "Rare",
      "cost": {
        "Capital": 2,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 1
      },
      "stats": {
        "power": 3,
        "toughness": 3
      },
      "keywords": [],
      "rulesText": "Tap: Gain 1 Capital.",
      "loreText": "All Workforce cards gain +1 Power and +1 Toughness. During Combat Phase, choose how your Workforce cards block Disruptions. Tap: Military Precision - all your operations this turn cost 1 less resource.",
      "flavorText": "Supply lines win wars. I've won three.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "gain",
              "resource": "Capital",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "078",
      "name": "Gig Economy Fleet",
      "type": "Workforce",
      "subtype": "Worker",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "power": 2,
        "toughness": 1
      },
      "keywords": [
        "Rush",
        "Fragile"
      ],
      "rulesText": "Rush, Fragile. Tap: Add 1 Goods to Infrastructure you control.",
      "loreText": "Rush: Deploys and acts immediately. Counts as both Workforce and Fleet for last-mile deliveries. Sacrifice at end of turn unless you pay 1 Capital. Cannot be assigned to Infrastructure.",
      "flavorText": "Rating: 4.8 stars. Acceptance rate: 73%.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "079",
      "name": "Crisis Response Team",
      "type": "Workforce",
      "subtype": "Specialist",
      "rarity": "Rare",
      "cost": {
        "Capital": 2,
        "Labor": 2,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "power": 2,
        "toughness": 3
      },
      "keywords": [
        "Rush"
      ],
      "rulesText": "Rush. Tap: Reduce the Cargo required by your Contracts by 1 this turn.",
      "loreText": "Flash: Deploy during any phase in response to a Disruption. When deployed, cancel 1 Disruption currently in play. Tap: Reduce damage from any Disruption by 2 this turn. Sacrifice after 3 turns.",
      "flavorText": "When everything goes wrong, we go right.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "cargoDiscount",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "080",
      "name": "Quantum Logistics Savant",
      "type": "Workforce",
      "subtype": "Executive",
      "rarity": "Mythic Rare",
      "cost": {
        "Capital": 3,
        "Labor": 0,
        "Fuel": 0,
        "Data": 3,
        "Time": 0
      },
      "stats": {
        "power": 2,
        "toughness": 2
      },
      "keywords": [
        "Automated",
        "Legendary"
      ],
      "rulesText": "Automated, Legendary. Tap: Gain 1 Capital.",
      "loreText": "During Planning Phase, look at all face-down cards in play. All your operations happen simultaneously (no phase restrictions). Once per game: solve any Contract instantly if you have the required goods anywhere in your supply chain. Legendary - limit 1 per deck.",
      "flavorText": "Computing all possible futures, choosing the best one.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "gain",
              "resource": "Capital",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "081",
      "name": "Inventory Auditor",
      "type": "Workforce",
      "subtype": "Specialist",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "power": 0,
        "toughness": 1
      },
      "keywords": [],
      "rulesText": "Tap: Reduce the Cargo required by your Contracts by 1 this turn.",
      "loreText": "Tap: Count all Goods in your supply chain. For every 5 tokens, generate 1 Data resource. Reveals hidden Counterfeit Goods in any Infrastructure you control.",
      "flavorText": "Every discrepancy tells a story.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "cargoDiscount",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "082",
      "name": "Lean Sensei",
      "type": "Workforce",
      "subtype": "Executive",
      "rarity": "Rare",
      "cost": {
        "Capital": 2,
        "Labor": 1,
        "Fuel": 0,
        "Data": 1,
        "Time": 0
      },
      "stats": {
        "power": 1,
        "toughness": 2
      },
      "keywords": [],
      "rulesText": "Tap: Gain 1 Capital.",
      "loreText": "All your Infrastructure cards operate at +1 efficiency (reduce resource costs by 1, minimum 0). Tap: Eliminate waste - discard 1 unnecessary Goods to draw 1 card. Kaizen Event costs 1 less to play.",
      "flavorText": "Muda, muri, mura - eliminated.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "gain",
              "resource": "Capital",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "083",
      "name": "Emergency Dispatcher",
      "type": "Workforce",
      "subtype": "Specialist",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 0,
        "Data": 1,
        "Time": 0
      },
      "stats": {
        "power": 1,
        "toughness": 2
      },
      "keywords": [
        "Rush"
      ],
      "rulesText": "Rush. Tap: Reduce the Cargo required by your Contracts by 1 this turn.",
      "loreText": "Flash: Deploy instantly in response to a Disruption. Tap: Redirect 1 active Disruption from your Source Zone to opponent's. During Transit Phase, grant 1 Fleet card +3 Speed for emergency routing.",
      "flavorText": "Code red means someone's about to have a very long night.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "cargoDiscount",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "084",
      "name": "Sustainability Director",
      "type": "Workforce",
      "subtype": "Executive",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 1,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "power": 0,
        "toughness": 2
      },
      "keywords": [
        "Sustainable"
      ],
      "rulesText": "Sustainable. Tap: Gain 1 Capital.",
      "loreText": "All cards with the Sustainable keyword gain +1 to all stats. Green Logistics Grant costs 0 when Sustainability Director is active. Tap: Convert 1 Fuel cost to 0 for any card this turn.",
      "flavorText": "Profit and planet, finally aligned.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "gain",
              "resource": "Capital",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "085",
      "name": "The Board of Directors",
      "type": "Workforce",
      "subtype": "Executive",
      "rarity": "Mythic Rare",
      "cost": {
        "Capital": 3,
        "Labor": 2,
        "Fuel": 0,
        "Data": 1,
        "Time": 1
      },
      "stats": {
        "power": 1,
        "toughness": 5
      },
      "keywords": [
        "Legendary"
      ],
      "rulesText": "Legendary. Tap: Gain 1 Capital.",
      "loreText": "All your cards cost 1 less Capital. During Planning Phase, draw 2 additional cards. Once per game: take an additional full turn after this one. All Contracts you fulfill grant +1 FP. Legendary - limit 1 per deck.",
      "flavorText": "The final word in every decision that matters.",
      "effects": [
        {
          "trigger": "tap",
          "condition": null,
          "action": [
            {
              "do": "gain",
              "resource": "Capital",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "086",
      "name": "Box Truck",
      "type": "Fleet",
      "subtype": "Vehicle",
      "rarity": "Common",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 1,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 2,
        "speed": 2
      },
      "keywords": [],
      "rulesText": "Transit: Move to your Customer Zone carrying up to 2 Goods. Costs 1 Fuel and a crew.",
      "loreText": "Standard last-mile delivery vehicle. Tap: Transport up to 2 Goods along any ground route to a destination Infrastructure. Requires Trucker or Driver workforce to operate.",
      "flavorText": "The workhorse of every delivery fleet.",
      "effects": []
    },
    {
      "id": "087",
      "name": "18-Wheeler",
      "type": "Fleet",
      "subtype": "Vehicle",
      "rarity": "Common",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 2,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 5,
        "speed": 2
      },
      "keywords": [],
      "rulesText": "Transit: Move to your Customer Zone carrying up to 5 Goods. Costs 1 Fuel and a crew.",
      "loreText": "Long-haul ground transport. Tap: Move up to 5 Goods along highways between Hubs. Requires Long-Haul Trucker workforce. Cannot access last-mile routes.",
      "flavorText": "King of the highway, lord of the lane.",
      "effects": []
    },
    {
      "id": "088",
      "name": "Refrigerated Truck",
      "type": "Fleet",
      "subtype": "Vehicle",
      "rarity": "Common",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 2,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 3,
        "speed": 2
      },
      "keywords": [
        "Specialized"
      ],
      "rulesText": "Specialized. Transit: Move to your Customer Zone carrying up to 3 Goods. Costs 1 Fuel and a crew.",
      "loreText": "Can transport perishable goods without spoilage timer advancing. Required for Cold Chain Contracts during ground transit. Tap: Deliver up to 3 perishable Goods.",
      "flavorText": "Keeping it cool from farm to fork.",
      "effects": []
    },
    {
      "id": "089",
      "name": "Sprinter Van",
      "type": "Fleet",
      "subtype": "Vehicle",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 1,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 1,
        "speed": 3
      },
      "keywords": [
        "Rush"
      ],
      "rulesText": "Rush. Transit: Move to your Customer Zone carrying up to 1 Goods. Costs 1 Fuel and a crew.",
      "loreText": "Rush: Can deliver on the turn it is deployed. Tap: Deliver 1 Goods to any last-mile destination. +1 Speed in urban routes. Ideal for Same-Day Delivery Contracts.",
      "flavorText": "Small, fast, everywhere at once.",
      "effects": []
    },
    {
      "id": "090",
      "name": "Cargo Bicycle",
      "type": "Fleet",
      "subtype": "Vehicle",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 1,
        "speed": 1
      },
      "keywords": [
        "Sustainable"
      ],
      "rulesText": "Sustainable. Transit: Move to your Customer Zone carrying up to 1 Goods. Costs 1 Fuel (waived: Sustainable) and a crew.",
      "loreText": "Costs no Fuel to operate. Tap: Deliver 1 small Goods within last-mile zone. Immune to Fuel Price Spike. Cannot be affected by traffic-based Disruptions.",
      "flavorText": "Zero emissions, infinite determination.",
      "effects": []
    },
    {
      "id": "091",
      "name": "Flatbed Trailer",
      "type": "Fleet",
      "subtype": "Vehicle",
      "rarity": "Common",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 1,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 4,
        "speed": 1
      },
      "keywords": [
        "Specialized"
      ],
      "rulesText": "Specialized. Transit: Move to your Customer Zone carrying up to 4 Goods. Costs 1 Fuel and a crew.",
      "loreText": "Can carry oversized goods that other vehicles cannot. Tap: Transport up to 4 Goods or 1 oversized token. -1 Speed for every 3 Goods loaded beyond 2.",
      "flavorText": "If it's too big for a box, put it on a flatbed.",
      "effects": []
    },
    {
      "id": "092",
      "name": "Tanker Truck",
      "type": "Fleet",
      "subtype": "Vehicle",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 1,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 3,
        "speed": 2
      },
      "keywords": [
        "Specialized",
        "Fragile"
      ],
      "rulesText": "Specialized, Fragile. Transit: Move to your Customer Zone carrying up to 3 Goods. Costs 1 Fuel and a crew.",
      "loreText": "Can transport liquid and hazardous cargo. Required for fuel and chemical deliveries. Tap: Transport up to 3 liquid Goods. If destroyed, causes Contamination Event in adjacent zone.",
      "flavorText": "Handle with extreme care.",
      "effects": []
    },
    {
      "id": "093",
      "name": "Container Ship",
      "type": "Fleet",
      "subtype": "Ship",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 2,
        "Labor": 0,
        "Fuel": 2,
        "Data": 0,
        "Time": 1
      },
      "stats": {
        "capacity": 8,
        "speed": 1
      },
      "keywords": [],
      "rulesText": "Transit: Move to your Customer Zone carrying up to 8 Goods. Costs 1 Fuel and a crew.",
      "loreText": "Intercontinental transport. Tap: Move up to 8 Goods between any two Port-type Infrastructure. Takes 2 turns to arrive. Requires Ship Captain workforce.",
      "flavorText": "Three football fields of floating commerce.",
      "effects": []
    },
    {
      "id": "094",
      "name": "Feeder Vessel",
      "type": "Fleet",
      "subtype": "Ship",
      "rarity": "Common",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 1,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 4,
        "speed": 2
      },
      "keywords": [],
      "rulesText": "Transit: Move to your Customer Zone carrying up to 4 Goods. Costs 1 Fuel and a crew.",
      "loreText": "Connects smaller ports to Mega-Port Complex. Tap: Transport up to 4 Goods between coastal Infrastructure. Can access ports too small for Container Ships.",
      "flavorText": "The little ships that feed the big ones.",
      "effects": []
    },
    {
      "id": "095",
      "name": "Cargo Airplane",
      "type": "Fleet",
      "subtype": "Air",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 2,
        "Labor": 0,
        "Fuel": 3,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 3,
        "speed": 5
      },
      "keywords": [],
      "rulesText": "Transit: Move to your Customer Zone carrying up to 3 Goods. Costs 1 Fuel and a crew.",
      "loreText": "Fastest standard transport. Tap: Deliver up to 3 Goods to any location in 1 turn regardless of distance. Requires Pilot workforce. Grounded by Natural Disaster disruptions.",
      "flavorText": "When time is worth more than fuel.",
      "effects": []
    },
    {
      "id": "096",
      "name": "Freight Train",
      "type": "Fleet",
      "subtype": "Rail",
      "rarity": "Common",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 1,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 6,
        "speed": 2
      },
      "keywords": [],
      "rulesText": "Transit: Move to your Customer Zone carrying up to 6 Goods. Costs 1 Fuel and a crew.",
      "loreText": "High-capacity ground transport along rail routes. Tap: Move up to 6 Goods between Rail Terminal type Infrastructure. Requires Train Engineer. Cannot deviate from rail routes.",
      "flavorText": "A mile of cars, a mountain of cargo.",
      "effects": []
    },
    {
      "id": "097",
      "name": "High-Speed Rail",
      "type": "Fleet",
      "subtype": "Rail",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 2,
        "Labor": 0,
        "Fuel": 1,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 3,
        "speed": 4
      },
      "keywords": [],
      "rulesText": "Transit: Move to your Customer Zone carrying up to 3 Goods. Costs 1 Fuel and a crew.",
      "loreText": "Premium rail transport. Tap: Move up to 3 Goods along rail routes at Speed 4. Can connect to Hyperloop Terminal for additional +1 Speed. Immune to traffic Disruptions.",
      "flavorText": "Bullet speed, cargo precision.",
      "effects": []
    },
    {
      "id": "098",
      "name": "Drone Swarm",
      "type": "Fleet",
      "subtype": "Drone",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 1,
        "Data": 1,
        "Time": 0
      },
      "stats": {
        "capacity": 3,
        "speed": 3
      },
      "keywords": [
        "Automated",
        "Fragile"
      ],
      "rulesText": "Automated, Fragile. Transit: Move to your Customer Zone carrying up to 3 Goods. Costs 1 Fuel and a crew (waived: Automated).",
      "loreText": "Automated: does not require Workforce to operate. Tap: Deliver up to 3 small Goods to any last-mile destinations simultaneously. Cannot carry items over 5kg each.",
      "flavorText": "The sky darkens with commerce.",
      "effects": []
    },
    {
      "id": "099",
      "name": "River Barge",
      "type": "Fleet",
      "subtype": "Ship",
      "rarity": "Common",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 1,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 6,
        "speed": 1
      },
      "keywords": [
        "Sustainable"
      ],
      "rulesText": "Sustainable. Transit: Move to your Customer Zone carrying up to 6 Goods. Costs 1 Fuel (waived: Sustainable) and a crew.",
      "loreText": "Cheap bulk transport along inland waterways. Tap: Move up to 6 Goods between Infrastructure connected by rivers. Lowest fuel cost per Goods transported.",
      "flavorText": "Slow and steady carries the tonnage.",
      "effects": []
    },
    {
      "id": "100",
      "name": "Pipeline",
      "type": "Fleet",
      "subtype": "Fixed",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 2,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 1
      },
      "stats": {
        "capacity": 4,
        "speed": 3
      },
      "keywords": [
        "Automated",
        "Specialized"
      ],
      "rulesText": "Automated, Specialized. Transit: Move to your Customer Zone carrying up to 4 Goods. Costs 1 Fuel and a crew (waived: Automated).",
      "loreText": "Permanent fixed route between two Infrastructure cards. Once placed, continuously moves up to 4 liquid Goods per turn with no Fuel cost. Cannot be rerouted. Tap is automatic.",
      "flavorText": "Invisible, constant, essential.",
      "effects": []
    },
    {
      "id": "101",
      "name": "Electric Delivery Van",
      "type": "Fleet",
      "subtype": "Vehicle",
      "rarity": "Common",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 2,
        "speed": 2
      },
      "keywords": [
        "Sustainable"
      ],
      "rulesText": "Sustainable. Transit: Move to your Customer Zone carrying up to 2 Goods. Costs 1 Fuel (waived: Sustainable) and a crew.",
      "loreText": "Costs 0 Fuel to operate. Tap: Deliver up to 2 Goods along any ground route. Immune to Fuel Price Spike. Sustainable: counts toward Green Logistics bonus.",
      "flavorText": "Silent, clean, and on time.",
      "effects": []
    },
    {
      "id": "102",
      "name": "Autonomous Truck",
      "type": "Fleet",
      "subtype": "Vehicle",
      "rarity": "Rare",
      "cost": {
        "Capital": 2,
        "Labor": 0,
        "Fuel": 1,
        "Data": 2,
        "Time": 0
      },
      "stats": {
        "capacity": 4,
        "speed": 3
      },
      "keywords": [
        "Automated"
      ],
      "rulesText": "Automated. Transit: Move to your Customer Zone carrying up to 4 Goods. Costs 1 Fuel and a crew (waived: Automated).",
      "loreText": "Automated: does not require Workforce. Tap: Transport up to 4 Goods along highway routes. Immune to Driver Shortage. Cannot navigate unpaved or emergency routes.",
      "flavorText": "No cab, no driver, no problem.",
      "effects": []
    },
    {
      "id": "103",
      "name": "Military Convoy",
      "type": "Fleet",
      "subtype": "Vehicle",
      "rarity": "Rare",
      "cost": {
        "Capital": 2,
        "Labor": 1,
        "Fuel": 2,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 4,
        "speed": 2
      },
      "keywords": [
        "Specialized"
      ],
      "rulesText": "Specialized. Transit: Move to your Customer Zone carrying up to 4 Goods. Costs 1 Fuel and a crew.",
      "loreText": "Immune to Piracy, Cargo Theft, and all Combat damage. Tap: Transport up to 4 Goods through any route, ignoring Disruptions that block movement. Required for Military Resupply Contract.",
      "flavorText": "Nothing stops a convoy with armed escort.",
      "effects": []
    },
    {
      "id": "104",
      "name": "Icebreaker Freighter",
      "type": "Fleet",
      "subtype": "Ship",
      "rarity": "Rare",
      "cost": {
        "Capital": 2,
        "Labor": 0,
        "Fuel": 2,
        "Data": 0,
        "Time": 1
      },
      "stats": {
        "capacity": 4,
        "speed": 1
      },
      "keywords": [
        "Specialized"
      ],
      "rulesText": "Specialized. Transit: Move to your Customer Zone carrying up to 4 Goods. Costs 1 Fuel and a crew.",
      "loreText": "Can navigate Arctic routes inaccessible to other ships. Tap: Transport up to 4 Goods via polar route, reducing transit time by 1 turn for intercontinental shipping. Immune to weather Disruptions.",
      "flavorText": "Where others see ice, we see a shortcut.",
      "effects": []
    },
    {
      "id": "105",
      "name": "Submarine Cargo Vessel",
      "type": "Fleet",
      "subtype": "Ship",
      "rarity": "Rare",
      "cost": {
        "Capital": 3,
        "Labor": 0,
        "Fuel": 2,
        "Data": 1,
        "Time": 0
      },
      "stats": {
        "capacity": 3,
        "speed": 2
      },
      "keywords": [
        "Specialized"
      ],
      "rulesText": "Specialized. Transit: Move to your Customer Zone carrying up to 3 Goods. Costs 1 Fuel and a crew.",
      "loreText": "Cannot be targeted by Piracy or Sanctions disruptions (undetectable). Tap: Transport up to 3 Goods via any sea route while completely hidden. Opponents cannot see cargo contents.",
      "flavorText": "Beneath the waves, beyond the law.",
      "effects": []
    },
    {
      "id": "106",
      "name": "Zeppelin Freighter",
      "type": "Fleet",
      "subtype": "Air",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 1,
        "Data": 0,
        "Time": 1
      },
      "stats": {
        "capacity": 4,
        "speed": 2
      },
      "keywords": [
        "Sustainable"
      ],
      "rulesText": "Sustainable. Transit: Move to your Customer Zone carrying up to 4 Goods. Costs 1 Fuel (waived: Sustainable) and a crew.",
      "loreText": "Low fuel cost for air transport. Tap: Transport up to 4 Goods via air route at reduced speed. Can hover over destination, delivering without landing infrastructure.",
      "flavorText": "The skies are patient for those who float.",
      "effects": []
    },
    {
      "id": "107",
      "name": "Hyperloop Pod",
      "type": "Fleet",
      "subtype": "Rail",
      "rarity": "Rare",
      "cost": {
        "Capital": 3,
        "Labor": 0,
        "Fuel": 0,
        "Data": 2,
        "Time": 0
      },
      "stats": {
        "capacity": 2,
        "speed": 6
      },
      "keywords": [
        "Automated"
      ],
      "rulesText": "Automated. Transit: Move to your Customer Zone carrying up to 2 Goods. Costs 1 Fuel and a crew (waived: Automated).",
      "loreText": "Fastest ground transport. Requires Hyperloop Terminal at both ends. Tap: Instantly deliver up to 2 Goods between connected Hyperloop Terminals. Automated: no Workforce needed.",
      "flavorText": "Near-vacuum speed, zero-carbon delivery.",
      "effects": []
    },
    {
      "id": "108",
      "name": "Rocket Cargo",
      "type": "Fleet",
      "subtype": "Air",
      "rarity": "Mythic Rare",
      "cost": {
        "Capital": 3,
        "Labor": 0,
        "Fuel": 3,
        "Data": 1,
        "Time": 0
      },
      "stats": {
        "capacity": 2,
        "speed": 8
      },
      "keywords": [
        "Rush",
        "Fragile"
      ],
      "rulesText": "Rush, Fragile. Transit: Move to your Customer Zone carrying up to 2 Goods. Costs 1 Fuel and a crew.",
      "loreText": "Deliver to any location on the board in 0 transit time. Tap: Instantly deliver up to 2 Goods anywhere, bypassing all routes and Disruptions. Single use: sacrifice after activation.",
      "flavorText": "Point-to-point, pole-to-pole, in thirty minutes.",
      "effects": []
    },
    {
      "id": "109",
      "name": "Mega-Container Ship",
      "type": "Fleet",
      "subtype": "Ship",
      "rarity": "Rare",
      "cost": {
        "Capital": 3,
        "Labor": 1,
        "Fuel": 3,
        "Data": 0,
        "Time": 1
      },
      "stats": {
        "capacity": 12,
        "speed": 1
      },
      "keywords": [],
      "rulesText": "Transit: Move to your Customer Zone carrying up to 12 Goods. Costs 1 Fuel and a crew.",
      "loreText": "Largest cargo capacity in the game. Tap: Transport up to 12 Goods between Mega-Port Complexes. Takes 3 turns to arrive. If Suez Canal Blockage is active, cannot move.",
      "flavorText": "Twenty thousand containers, one destination.",
      "effects": []
    },
    {
      "id": "110",
      "name": "Convoy Formation",
      "type": "Fleet",
      "subtype": "Vehicle",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 2,
        "Data": 1,
        "Time": 0
      },
      "stats": {
        "capacity": 8,
        "speed": 2
      },
      "keywords": [],
      "rulesText": "Transit: Move to your Customer Zone carrying up to 8 Goods. Costs 1 Fuel and a crew.",
      "loreText": "Counts as multiple trucks traveling together. Tap: Transport up to 8 Goods along highway routes. All goods in convoy share protection - Cargo Theft only affects 1 token instead of all.",
      "flavorText": "Strength in numbers, efficiency in formation.",
      "effects": []
    },
    {
      "id": "111",
      "name": "Amphibious Transport",
      "type": "Fleet",
      "subtype": "Vehicle",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 2,
        "Labor": 0,
        "Fuel": 2,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 3,
        "speed": 2
      },
      "keywords": [],
      "rulesText": "Transit: Move to your Customer Zone carrying up to 3 Goods. Costs 1 Fuel and a crew.",
      "loreText": "Can use both ground and water routes. Tap: Transport up to 3 Goods, switching between land and sea routes mid-transit without stopping at transfer points.",
      "flavorText": "Where roads end, it keeps going.",
      "effects": []
    },
    {
      "id": "112",
      "name": "Mag-Lev Cargo Sled",
      "type": "Fleet",
      "subtype": "Rail",
      "rarity": "Rare",
      "cost": {
        "Capital": 3,
        "Labor": 0,
        "Fuel": 0,
        "Data": 2,
        "Time": 0
      },
      "stats": {
        "capacity": 3,
        "speed": 5
      },
      "keywords": [
        "Automated",
        "Specialized"
      ],
      "rulesText": "Automated, Specialized. Transit: Move to your Customer Zone carrying up to 3 Goods. Costs 1 Fuel and a crew (waived: Automated).",
      "loreText": "Automated: no Workforce needed. Tap: Transport up to 3 Goods at extreme speed along magnetic rail routes. Zero friction means zero Fuel cost. Requires dedicated rail infrastructure.",
      "flavorText": "Floating on magnetic fields at 500 mph.",
      "effects": []
    },
    {
      "id": "113",
      "name": "Horse and Cart",
      "type": "Fleet",
      "subtype": "Vehicle",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 1,
        "speed": 1
      },
      "keywords": [
        "Sustainable"
      ],
      "rulesText": "Sustainable. Transit: Move to your Customer Zone carrying up to 1 Goods. Costs 1 Fuel (waived: Sustainable) and a crew.",
      "loreText": "Costs nothing to deploy or operate. Tap: Transport 1 Goods along any ground route. Immune to Fuel Price Spike, Cyber Attack, and IT System Failure. The original delivery vehicle.",
      "flavorText": "Tried, true, and still delivering.",
      "effects": []
    },
    {
      "id": "114",
      "name": "Flying Warehouse",
      "type": "Fleet",
      "subtype": "Air",
      "rarity": "Mythic Rare",
      "cost": {
        "Capital": 4,
        "Labor": 0,
        "Fuel": 2,
        "Data": 2,
        "Time": 1
      },
      "stats": {
        "capacity": 6,
        "speed": 3
      },
      "keywords": [
        "Automated",
        "Hub"
      ],
      "rulesText": "Automated, Hub. Transit: Move to your Customer Zone carrying up to 6 Goods. Costs 1 Fuel and a crew (waived: Automated).",
      "loreText": "Acts as both Fleet AND Infrastructure simultaneously. Stores up to 6 Goods while airborne. Tap: Deploy goods to any ground location below. Can reposition each Transit Phase to optimize delivery range.",
      "flavorText": "The warehouse that comes to you.",
      "effects": []
    },
    {
      "id": "115",
      "name": "Ghost Fleet",
      "type": "Fleet",
      "subtype": "Ship",
      "rarity": "Mythic Rare",
      "cost": {
        "Capital": 3,
        "Labor": 0,
        "Fuel": 1,
        "Data": 0,
        "Time": 1
      },
      "stats": {
        "capacity": 10,
        "speed": 2
      },
      "keywords": [
        "Automated",
        "Legendary"
      ],
      "rulesText": "Automated, Legendary. Transit: Move to your Customer Zone carrying up to 10 Goods. Costs 1 Fuel and a crew (waived: Automated).",
      "loreText": "Cannot be targeted by any Disruption or opponent ability (phased out). Tap: Transport up to 10 Goods via sea route. Goods loaded on Ghost Fleet are hidden from all opponents until delivered.",
      "flavorText": "Ships that sail unseen, cargo that arrives unannounced.",
      "effects": []
    },
    {
      "id": "116",
      "name": "Tugboat",
      "type": "Fleet",
      "subtype": "Ship",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 1,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 1,
        "speed": 1
      },
      "keywords": [],
      "rulesText": "Transit: Move to your Customer Zone carrying up to 1 Goods. Costs 1 Fuel and a crew.",
      "loreText": "Tap: Assist 1 Ship-subtype Fleet card, granting it +1 Speed this turn. Can tow disabled Ships back to port. When Container Ship or Mega-Container Ship is blocked, Tugboat can clear the route.",
      "flavorText": "Small but mighty, the harbor's unsung hero.",
      "effects": []
    },
    {
      "id": "117",
      "name": "Convoy Escort",
      "type": "Fleet",
      "subtype": "Vehicle",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 1,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 0,
        "speed": 3
      },
      "keywords": [],
      "rulesText": "Transit: Move to your Customer Zone carrying up to 0 Goods. Costs 1 Fuel and a crew.",
      "loreText": "Cannot carry goods but protects other Fleet cards. Assign to any Fleet card: that card becomes immune to Piracy, Cargo Theft, and Combat damage. Tap: Block 1 Disruption targeting a Fleet card in your zone.",
      "flavorText": "No cargo, all protection.",
      "effects": []
    },
    {
      "id": "118",
      "name": "Autonomous Drone Mothership",
      "type": "Fleet",
      "subtype": "Air",
      "rarity": "Rare",
      "cost": {
        "Capital": 3,
        "Labor": 0,
        "Fuel": 2,
        "Data": 2,
        "Time": 0
      },
      "stats": {
        "capacity": 6,
        "speed": 3
      },
      "keywords": [
        "Automated",
        "Hub"
      ],
      "rulesText": "Automated, Hub. Transit: Move to your Customer Zone carrying up to 6 Goods. Costs 1 Fuel and a crew (waived: Automated).",
      "loreText": "Automated: no Workforce needed. Carries and deploys Drone-subtype Fleet cards. Tap: Launch up to 3 drone deliveries from current position, each delivering 1 Goods to separate destinations within range.",
      "flavorText": "One ship, a hundred deliveries.",
      "effects": []
    },
    {
      "id": "119",
      "name": "Bicycle Courier Network",
      "type": "Fleet",
      "subtype": "Vehicle",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": {
        "capacity": 3,
        "speed": 2
      },
      "keywords": [
        "Sustainable"
      ],
      "rulesText": "Sustainable. Transit: Move to your Customer Zone carrying up to 3 Goods. Costs 1 Fuel (waived: Sustainable) and a crew.",
      "loreText": "Costs no Fuel. Tap: Deliver up to 3 small Goods within urban last-mile zone. Immune to all traffic and fuel Disruptions. Counts as Sustainable for Green Logistics bonuses.",
      "flavorText": "Pedal power moves the city.",
      "effects": []
    },
    {
      "id": "120",
      "name": "Teleportation Array",
      "type": "Fleet",
      "subtype": "Fixed",
      "rarity": "Mythic Rare",
      "cost": {
        "Capital": 5,
        "Labor": 0,
        "Fuel": 0,
        "Data": 3,
        "Time": 1
      },
      "stats": {
        "capacity": 4,
        "speed": 10
      },
      "keywords": [
        "Automated",
        "Legendary"
      ],
      "rulesText": "Automated, Legendary. Transit: Move to your Customer Zone carrying up to 4 Goods. Costs 1 Fuel and a crew (waived: Automated).",
      "loreText": "Requires Teleportation Array at both origin and destination. Tap: Instantly transport up to 4 Goods between Arrays with no transit time, no fuel cost, and complete Disruption immunity. Legendary - limit 1 per deck.",
      "flavorText": "The final evolution of logistics: making distance irrelevant.",
      "effects": []
    },
    {
      "id": "121",
      "name": "Rush Shipment",
      "type": "Operations",
      "subtype": "Tactic",
      "rarity": "Common",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 1,
        "Data": 0,
        "Time": 0
      },
      "stats": null,
      "keywords": [
        "Rush"
      ],
      "rulesText": "Rush. Take 1 extra Transit action this turn. Draw 1 card.",
      "loreText": "Instant: Play during Transit Phase. Target Fleet card gains +3 Speed and Rush this turn. That shipment arrives 1 turn early. Draw 1 card.",
      "flavorText": "Pay more, arrive sooner. Simple math.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "extraTransit",
              "amount": 1
            },
            {
              "do": "draw",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "122",
      "name": "Bulk Discount",
      "type": "Operations",
      "subtype": "Tactic",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 1
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Add 2 Goods to Infrastructure you control.",
      "loreText": "During Upkeep, purchase up to 4 Goods from the Source Zone at half cost (rounded up). Goods must all be the same type. Cannot be used with Negotiator bonus.",
      "flavorText": "Volume has its privileges.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": 2
            }
          ]
        }
      ]
    },
    {
      "id": "123",
      "name": "Demand Forecast",
      "type": "Operations",
      "subtype": "Strategy",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 1,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Draw 2 cards. you discard 1 card.",
      "loreText": "Look at the top 5 cards of the Contract deck. Put 1 on top and the rest on the bottom in any order. Draw 1 card from your deck. Knowledge is preparation.",
      "flavorText": "Knowing what they'll want before they want it.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "draw",
              "amount": 2
            },
            {
              "do": "discard",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "124",
      "name": "Just-In-Time Delivery",
      "type": "Operations",
      "subtype": "Strategy",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 1,
        "Time": 1
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Reduce the Cargo required by your Contracts by 2 this turn.",
      "loreText": "Until end of turn, your Infrastructure cards do not need stored goods to fulfill Contracts. Goods in transit count as delivered if they will arrive within 1 turn. Gain +1 FP for each Contract fulfilled this way.",
      "flavorText": "Not a moment too soon, not a cent in excess.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "cargoDiscount",
              "amount": 2
            }
          ]
        }
      ]
    },
    {
      "id": "125",
      "name": "Safety Stock",
      "type": "Operations",
      "subtype": "Strategy",
      "rarity": "Common",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Add 3 Goods to Infrastructure you control.",
      "loreText": "Place 3 Goods from the Source Zone into any Infrastructure you control. These tokens cannot be used for Contracts but prevent Demand Collapse from affecting you for 3 turns.",
      "flavorText": "Buffer against the unknown.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": 3
            }
          ]
        }
      ]
    },
    {
      "id": "126",
      "name": "Overtime Shift",
      "type": "Operations",
      "subtype": "Tactic",
      "rarity": "Common",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Untap all Workforce you control. Draw 1 card.",
      "loreText": "Untap all Workforce cards you control. They may be used again this turn. Each Workforce card used during Overtime gains -1 Toughness permanently. Draw 1 card.",
      "flavorText": "Double time, double pay, double output.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "untap",
              "what": "Workforce"
            },
            {
              "do": "draw",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "127",
      "name": "Emergency Reroute",
      "type": "Operations",
      "subtype": "Tactic",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 1,
        "Data": 0,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Take 1 extra Transit action this turn. Prevent the next Disruption targeting you for 1 turn.",
      "loreText": "Instant: Play when a Disruption blocks a route. Redirect 1 Fleet card to an alternate route, avoiding the Disruption. The Fleet card loses 1 Speed this turn but arrives safely.",
      "flavorText": "When plan A fails, engage plan B through Z.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "extraTransit",
              "amount": 1
            },
            {
              "do": "shield",
              "turns": 1
            }
          ]
        }
      ]
    },
    {
      "id": "128",
      "name": "Consolidation",
      "type": "Operations",
      "subtype": "Strategy",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Add 1 Goods to Infrastructure you control. Reduce the Cargo required by your Contracts by 1 this turn.",
      "loreText": "Combine goods from up to 3 different Fleet cards into 1 Fleet card (up to its Capacity). The consolidated shipment gains +1 effective value toward Contract fulfillment. Return empty Fleet cards to Source Zone.",
      "flavorText": "Fewer trips, fuller trucks, lower costs.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": 1
            },
            {
              "do": "cargoDiscount",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "129",
      "name": "Track and Trace",
      "type": "Operations",
      "subtype": "Strategy",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 1,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Prevent the next Disruption targeting you for 2 turns. Draw 1 card.",
      "loreText": "All your Goods in transit become visible and tracked. Tracked goods cannot be affected by Cargo Theft or Counterfeit Goods disruptions. Lasts until end of next turn. Draw 1 card.",
      "flavorText": "Scanned, tracked, verified. Every step of the way.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "shield",
              "turns": 2
            },
            {
              "do": "draw",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "130",
      "name": "Insurance Claim",
      "type": "Operations",
      "subtype": "Tactic",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 1
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Gain 2 Capital. Draw 1 card.",
      "loreText": "Play after a Disruption destroys Goods or Infrastructure. Recover Capital equal to the destroyed card's original cost. Draw 2 cards. Cannot be played if Disruption was Piracy.",
      "flavorText": "At least someone's paying for this mess.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "gain",
              "resource": "Capital",
              "amount": 2
            },
            {
              "do": "draw",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "131",
      "name": "Lean Inventory",
      "type": "Operations",
      "subtype": "Strategy",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 1,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Remove 2 Goods from your Source Zone. Gain 3 resources of any type.",
      "loreText": "Discard all Goods from 1 Infrastructure you control. For each discarded token, generate 1 resource of any type. That Infrastructure gains +2 Capacity for the rest of the game.",
      "flavorText": "Less stock, more flow, maximum value.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": -2
            },
            {
              "do": "gain",
              "resource": "any",
              "amount": 3
            }
          ]
        }
      ]
    },
    {
      "id": "132",
      "name": "Vendor Managed Inventory",
      "type": "Operations",
      "subtype": "Strategy",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 1,
        "Time": 0
      },
      "stats": null,
      "keywords": [
        "Automated"
      ],
      "rulesText": "Automated. Add 2 Goods to Infrastructure you control.",
      "loreText": "Choose 1 Infrastructure. For the next 3 turns, it automatically restocks from the Source Zone during Upkeep at no cost (1 Goods per turn). You cannot manually add goods to it.",
      "flavorText": "Let the supplier worry about stock levels.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": 2
            }
          ]
        }
      ]
    },
    {
      "id": "133",
      "name": "Split Shipment",
      "type": "Operations",
      "subtype": "Tactic",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Take 1 extra Transit action this turn.",
      "loreText": "Divide goods from 1 Fleet card across 2 different Fleet cards. Each partial shipment can go to a different destination. Both shipments count toward the same Contract if applicable.",
      "flavorText": "Don't put all your eggs in one container.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "extraTransit",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "134",
      "name": "Nearshoring Initiative",
      "type": "Operations",
      "subtype": "Strategy",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 2,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 1
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Gain 2 Fuel. Take 1 extra Transit action this turn.",
      "loreText": "Permanently reduce transit time by 1 turn for all shipments between your Infrastructure cards. Does not stack. All your Fleet cards are considered 1 link closer to their destinations.",
      "flavorText": "Bring production closer, reduce risk further.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "gain",
              "resource": "Fuel",
              "amount": 2
            },
            {
              "do": "extraTransit",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "135",
      "name": "Dynamic Pricing",
      "type": "Operations",
      "subtype": "Tactic",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 2,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Gain 1 Fulfillment Point.",
      "loreText": "When fulfilling a Contract this turn, gain +2 additional FP if completed on the same turn it was drawn. If not completed this turn, the Contract's FP reward decreases by 1.",
      "flavorText": "The right price at the right moment.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "fp",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "136",
      "name": "Surge Capacity",
      "type": "Operations",
      "subtype": "Tactic",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 2,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Add 3 Goods to Infrastructure you control.",
      "loreText": "Until end of turn, all your Infrastructure cards gain +3 Capacity and all Fleet cards gain +2 Capacity. At end of turn, discard 1 Goods from each Infrastructure used at surge capacity.",
      "flavorText": "Push past limits, deal with consequences later.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": 3
            }
          ]
        }
      ]
    },
    {
      "id": "137",
      "name": "Trade Lane Agreement",
      "type": "Operations",
      "subtype": "Strategy",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 1
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Gain 2 Fuel. Take 1 extra Transit action this turn.",
      "loreText": "Establish a permanent trade lane between 2 Infrastructure cards. Fleet cards traveling this route gain +2 Speed and -1 Fuel cost. Only 1 Trade Lane Agreement can be active at a time.",
      "flavorText": "Preferred routes for preferred partners.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "gain",
              "resource": "Fuel",
              "amount": 2
            },
            {
              "do": "extraTransit",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "138",
      "name": "Fuel Hedge",
      "type": "Operations",
      "subtype": "Strategy",
      "rarity": "Common",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Gain 3 Fuel.",
      "loreText": "For the next 5 turns, you are immune to Fuel Price Spike disruptions. All your Fuel costs are locked at current rates. If no Fuel Price Spike occurs, gain 2 Capital at end of duration.",
      "flavorText": "Betting against volatility, locking in stability.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "gain",
              "resource": "Fuel",
              "amount": 3
            }
          ]
        }
      ]
    },
    {
      "id": "139",
      "name": "Digital Twin Simulation",
      "type": "Operations",
      "subtype": "Strategy",
      "rarity": "Rare",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 0,
        "Data": 3,
        "Time": 0
      },
      "stats": null,
      "keywords": [
        "Automated"
      ],
      "rulesText": "Automated. Draw 3 cards.",
      "loreText": "Look at all face-down cards and the top 5 cards of all decks. Rearrange the top 3 cards of your own deck. You may play 1 additional Operations card this turn at no cost.",
      "flavorText": "Test every scenario before committing a single truck.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "draw",
              "amount": 3
            }
          ]
        }
      ]
    },
    {
      "id": "140",
      "name": "Warehouse Blitz",
      "type": "Operations",
      "subtype": "Tactic",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 1,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": null,
      "keywords": [
        "Rush"
      ],
      "rulesText": "Rush. Untap all Infrastructure you control. Add 2 Goods to Infrastructure you control.",
      "loreText": "Untap all Infrastructure cards you control. Each may perform 1 additional loading/unloading action this turn. All goods moved this turn gain +1 value toward Contract fulfillment.",
      "flavorText": "All hands on deck, all bays active, all systems go.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "untap",
              "what": "Infrastructure"
            },
            {
              "do": "goods",
              "amount": 2
            }
          ]
        }
      ]
    },
    {
      "id": "141",
      "name": "Reverse Auction",
      "type": "Operations",
      "subtype": "Tactic",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 1,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Gain 2 Capital. Draw 1 card.",
      "loreText": "When deploying a Fleet card this turn, reduce its Capital cost by 2 (minimum 0). The Fleet card enters play tapped. Draw 1 card.",
      "flavorText": "Who wants the contract? Going down: five, four, three...",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "gain",
              "resource": "Capital",
              "amount": 2
            },
            {
              "do": "draw",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "142",
      "name": "Backhaul Optimization",
      "type": "Operations",
      "subtype": "Strategy",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 1,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Add 2 Goods to Infrastructure you control.",
      "loreText": "When a Fleet card delivers goods and would return empty, load it with up to its Capacity in goods from the destination Infrastructure. These goods may be delivered to their origin on the return trip.",
      "flavorText": "An empty truck is a wasted opportunity.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": 2
            }
          ]
        }
      ]
    },
    {
      "id": "143",
      "name": "Emergency Procurement",
      "type": "Operations",
      "subtype": "Tactic",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 2,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": null,
      "keywords": [
        "Rush"
      ],
      "rulesText": "Rush. Gain 2 resources of any type. Add 1 Goods to Infrastructure you control.",
      "loreText": "Instant: Play during any phase. Immediately acquire up to 3 Goods of any type from the Source Zone and place them in any Infrastructure you control. Costs 1 extra Capital per token.",
      "flavorText": "Money talks when deadlines loom.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "gain",
              "resource": "any",
              "amount": 2
            },
            {
              "do": "goods",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "144",
      "name": "Load Balancing",
      "type": "Operations",
      "subtype": "Strategy",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 1,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Add 1 Goods to Infrastructure you control. Draw 1 card.",
      "loreText": "Redistribute all Goods among your Infrastructure cards in any way you choose (respecting Capacity limits). Each Infrastructure with exactly half capacity filled gains +1 efficiency bonus this turn.",
      "flavorText": "Even distribution, optimal performance.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": 1
            },
            {
              "do": "draw",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "145",
      "name": "Carrier Rate Lock",
      "type": "Operations",
      "subtype": "Strategy",
      "rarity": "Common",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Gain 2 Fuel.",
      "loreText": "For the next 4 turns, all your Fleet card Fuel costs are reduced by 1 (minimum 0). Does not stack with other cost reductions. If Fuel Price Spike occurs during this time, you are unaffected.",
      "flavorText": "Locked in while others scramble.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "gain",
              "resource": "Fuel",
              "amount": 2
            }
          ]
        }
      ]
    },
    {
      "id": "146",
      "name": "Supply Chain Visibility",
      "type": "Operations",
      "subtype": "Strategy",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 2,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Draw 2 cards. Prevent the next Disruption targeting you for 1 turn.",
      "loreText": "Reveal all opponents' hands and face-down cards for 2 turns. All your goods gain tracking protection (immune to Cargo Theft, Counterfeit Goods). You may respond to opponent actions with Instants before they resolve.",
      "flavorText": "See everything, anticipate everything.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "draw",
              "amount": 2
            },
            {
              "do": "shield",
              "turns": 1
            }
          ]
        }
      ]
    },
    {
      "id": "147",
      "name": "Green Logistics Grant",
      "type": "Operations",
      "subtype": "Strategy",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 1
      },
      "stats": null,
      "keywords": [
        "Sustainable"
      ],
      "rulesText": "Sustainable. Gain 2 Capital, plus 1 for each Sustainable card you control.",
      "loreText": "Gain 2 Capital immediately. For each card with the Sustainable keyword you control, gain 1 additional Capital. All Sustainable cards you control gain +1 to their primary stat until end of game.",
      "flavorText": "Doing good and doing well, simultaneously.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "gain",
              "resource": "Capital",
              "amount": 2,
              "perKeyword": "Sustainable"
            }
          ]
        }
      ]
    },
    {
      "id": "148",
      "name": "Reshoring",
      "type": "Operations",
      "subtype": "Strategy",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 2,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 1
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Gain 3 Capital.",
      "loreText": "Deploy 1 Infrastructure card from your hand at half cost (rounded up). That Infrastructure is considered domestic - all routes to it are 1 turn shorter. Immune to Tariff War and Sanctions.",
      "flavorText": "Bringing it all back home.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "gain",
              "resource": "Capital",
              "amount": 3
            }
          ]
        }
      ]
    },
    {
      "id": "149",
      "name": "Predictive Analytics",
      "type": "Operations",
      "subtype": "Strategy",
      "rarity": "Rare",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 3,
        "Time": 0
      },
      "stats": null,
      "keywords": [
        "Automated"
      ],
      "rulesText": "Automated. Draw 3 cards. you discard 1 card.",
      "loreText": "Look at the next 5 cards you would draw. Take any 2 into your hand and put the rest back in any order. For 3 turns, you may play 1 card face-down (hidden from opponents) before revealing it.",
      "flavorText": "The future is calculable for those with enough data.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "draw",
              "amount": 3
            },
            {
              "do": "discard",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "150",
      "name": "Six Sigma Black Belt",
      "type": "Operations",
      "subtype": "Strategy",
      "rarity": "Rare",
      "cost": {
        "Capital": 1,
        "Labor": 1,
        "Fuel": 0,
        "Data": 1,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Your Infrastructure permanently produces +1 resource.",
      "loreText": "Permanently remove 1 inefficiency from your supply chain: choose either +1 Capacity to all Infrastructure, +1 Speed to all Fleet, or -1 cost to all Operations. Cannot be reversed or duplicated.",
      "flavorText": "3.4 defects per million. Perfection is a process.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "buff",
              "what": "Infrastructure",
              "stat": "produce",
              "amount": 1,
              "duration": "game"
            }
          ]
        }
      ]
    },
    {
      "id": "151",
      "name": "Force Majeure Clause",
      "type": "Operations",
      "subtype": "Tactic",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 1
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Prevent the next Disruption targeting you for 3 turns.",
      "loreText": "Instant: Play when a Disruption would cause you to fail a Contract. The Contract is suspended (not failed) for 2 turns instead. Resume fulfillment when Disruption ends. No FP penalty.",
      "flavorText": "The clause nobody reads until everything falls apart.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "shield",
              "turns": 3
            }
          ]
        }
      ]
    },
    {
      "id": "152",
      "name": "Multimodal Transfer",
      "type": "Operations",
      "subtype": "Tactic",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 1,
        "Data": 0,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Take 2 extra Transit actions this turn.",
      "loreText": "Transfer goods between any 2 Fleet cards at any Hub Infrastructure without spending a Transit Phase action. Both Fleet cards gain +1 Speed until end of turn.",
      "flavorText": "Ship to rail to truck in one seamless motion.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "extraTransit",
              "amount": 2
            }
          ]
        }
      ]
    },
    {
      "id": "153",
      "name": "White Glove Service",
      "type": "Operations",
      "subtype": "Tactic",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 2,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": null,
      "keywords": [
        "Specialized"
      ],
      "rulesText": "Specialized. Reduce the Cargo required by your Contracts by 2 this turn. Gain 1 Fulfillment Point.",
      "loreText": "1 Goods delivered this turn is worth triple toward Contract fulfillment. That delivery is immune to all Disruptions during transit. Gain +1 FP bonus if Contract is luxury-tier.",
      "flavorText": "Premium care for premium cargo.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "cargoDiscount",
              "amount": 2
            },
            {
              "do": "fp",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "154",
      "name": "Total Quality Management",
      "type": "Operations",
      "subtype": "Strategy",
      "rarity": "Rare",
      "cost": {
        "Capital": 1,
        "Labor": 1,
        "Fuel": 0,
        "Data": 1,
        "Time": 1
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Your Infrastructure permanently produces +1 Goods.",
      "loreText": "Permanently: all goods produced by your Infrastructure gain the Inspected quality. Inspected goods are immune to Contamination and Counterfeit disruptions and are worth +1 toward all Contracts.",
      "flavorText": "Quality is not an act, it is a habit.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "buff",
              "what": "Infrastructure",
              "stat": "goods",
              "amount": 1,
              "duration": "game"
            }
          ]
        }
      ]
    },
    {
      "id": "155",
      "name": "Strategic Reserve Release",
      "type": "Operations",
      "subtype": "Tactic",
      "rarity": "Rare",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Gain 3 resources of any type.",
      "loreText": "Gain 3 of any single resource type immediately. OR gain 1 of each resource type. Can only be played once per game. If played during Upkeep, double the gained resources.",
      "flavorText": "Break glass in case of emergency.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "gain",
              "resource": "any",
              "amount": 3
            }
          ]
        }
      ]
    },
    {
      "id": "156",
      "name": "Agile Pivot",
      "type": "Operations",
      "subtype": "Tactic",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 1,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Take 1 extra Transit action this turn. Draw 1 card.",
      "loreText": "Instant: Change the destination of 1 shipment currently in transit. Redirect to any valid Infrastructure without resetting transit timer. The goods adapt to the new Contract requirements.",
      "flavorText": "The plan changed. So did we.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "extraTransit",
              "amount": 1
            },
            {
              "do": "draw",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "157",
      "name": "Supply Chain Finance",
      "type": "Operations",
      "subtype": "Strategy",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 1
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Gain 3 Capital.",
      "loreText": "Immediately gain 4 Capital. However, for the next 3 turns, 1 Capital from each Upkeep goes to paying interest. Net gain: 1 Capital. Allows early deployment of expensive cards.",
      "flavorText": "Borrow from the future to build the present.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "gain",
              "resource": "Capital",
              "amount": 3
            }
          ]
        }
      ]
    },
    {
      "id": "158",
      "name": "Kaizen Event",
      "type": "Operations",
      "subtype": "Strategy",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 1
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Add 2 Goods to Infrastructure you control. Draw 1 card.",
      "loreText": "Choose 1 Infrastructure card. It permanently gains +2 Capacity and its Workforce requirements are reduced by 1. If Lean Sensei is active, also draw 2 cards.",
      "flavorText": "Continuous improvement is infinite opportunity.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "goods",
              "amount": 2
            },
            {
              "do": "draw",
              "amount": 1
            }
          ]
        }
      ]
    },
    {
      "id": "159",
      "name": "The Bullwhip Crack",
      "type": "Operations",
      "subtype": "Tactic",
      "rarity": "Mythic Rare",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 2,
        "Time": 1
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Draw 3 cards. opponent discards 2 cards.",
      "loreText": "Target all opponents: their Demand Forecasts are inverted for 3 turns (goods they produce go to wrong destinations). Your supply chain gains perfect information - see all opponents' planned actions. Draw 3 cards.",
      "flavorText": "A small fluctuation at retail becomes a tsunami at the source.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "draw",
              "amount": 3
            },
            {
              "do": "discard",
              "amount": 2,
              "who": "opponent"
            }
          ]
        }
      ]
    },
    {
      "id": "160",
      "name": "Omniscient Orchestration",
      "type": "Operations",
      "subtype": "Strategy",
      "rarity": "Mythic Rare",
      "cost": {
        "Capital": 2,
        "Labor": 0,
        "Fuel": 0,
        "Data": 4,
        "Time": 0
      },
      "stats": null,
      "keywords": [
        "Automated",
        "Legendary"
      ],
      "rulesText": "Automated, Legendary. Gain 4 resources of any type. Draw 2 cards. Take 3 extra Transit actions this turn.",
      "loreText": "For 3 turns: all your operations cost 0 resources, all Fleet have +3 Speed, all Infrastructure has +3 Capacity, and you take 2 additional actions each phase. Legendary - limit 1 per deck. Exile after use.",
      "flavorText": "When the entire supply chain moves as one perfect organism.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "gain",
              "resource": "any",
              "amount": 4
            },
            {
              "do": "draw",
              "amount": 2
            },
            {
              "do": "extraTransit",
              "amount": 3
            }
          ]
        }
      ]
    },
    {
      "id": "161",
      "name": "Port Workers Strike",
      "type": "Disruptions",
      "subtype": "Event",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Disable 1 Fleet opponent controls for 2 turns.",
      "loreText": "All Port and Dock-type Infrastructure cards are disabled for 2 turns. Ship-subtype Fleet cards cannot load or unload during this time. Players with Union Steward reduce duration to 1 turn.",
      "flavorText": "Solidarity shuts down the world's ports.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "disable",
              "what": "Fleet",
              "who": "opponent",
              "count": 1,
              "turns": 2
            }
          ]
        }
      ]
    },
    {
      "id": "162",
      "name": "Suez Canal Blockage",
      "type": "Disruptions",
      "subtype": "Event",
      "rarity": "Rare",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 2,
        "Data": 0,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Disable 2 Fleet opponent controls for 2 turns.",
      "loreText": "All Ship-subtype Fleet cards in transit add 3 turns to their arrival time OR must reroute at double Fuel cost. Lasts 2 turns. Icebreaker Freighters are unaffected.",
      "flavorText": "One ship sideways, and the world holds its breath.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "disable",
              "what": "Fleet",
              "who": "opponent",
              "count": 2,
              "turns": 2
            }
          ]
        }
      ]
    },
    {
      "id": "163",
      "name": "Cyber Attack",
      "type": "Disruptions",
      "subtype": "Event",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 2,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Disable 2 Infrastructure opponent controls for 1 turn. opponent loses 2 Goods.",
      "loreText": "All cards with the Automated keyword are disabled for 2 turns. Digital-subtype Infrastructure cannot generate Data resources. Blockchain Ledger Node is destroyed if unprotected.",
      "flavorText": "The screens go dark, the conveyors stop.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "disable",
              "what": "Infrastructure",
              "who": "opponent",
              "count": 2,
              "turns": 1
            },
            {
              "do": "loseGoods",
              "amount": 2,
              "who": "opponent"
            }
          ]
        }
      ]
    },
    {
      "id": "164",
      "name": "Tariff War",
      "type": "Disruptions",
      "subtype": "Event",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 2,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "opponent loses 3 Capital.",
      "loreText": "All international shipments cost +2 Capital per Goods for 3 turns. Players must pay the tariff or return goods to origin. Free Trade Zone Infrastructure is exempt.",
      "flavorText": "Borders become walls, costs become cliffs.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "drain",
              "resource": "Capital",
              "amount": 3,
              "who": "opponent"
            }
          ]
        }
      ]
    },
    {
      "id": "165",
      "name": "Fuel Price Spike",
      "type": "Disruptions",
      "subtype": "Event",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 1,
        "Data": 0,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "opponent loses 2 Fuel.",
      "loreText": "All Fuel costs are doubled for 3 turns. Fleet cards with Fuel cost 3+ cannot be activated unless player pays the premium. Electric and Sustainable vehicles are unaffected.",
      "flavorText": "The price at the pump just broke the budget.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "drain",
              "resource": "Fuel",
              "amount": 2,
              "who": "opponent"
            }
          ]
        }
      ]
    },
    {
      "id": "166",
      "name": "Cargo Theft",
      "type": "Disruptions",
      "subtype": "Event",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 1
      },
      "stats": null,
      "keywords": [],
      "rulesText": "opponent loses 2 Goods.",
      "loreText": "Target player discards 2 Goods from any Fleet card currently in transit. If goods are tracked (Track and Trace active), only 1 token is stolen. Security Guard prevents this entirely.",
      "flavorText": "Vanished between waypoints. No witnesses.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "loseGoods",
              "amount": 2,
              "who": "opponent"
            }
          ]
        }
      ]
    },
    {
      "id": "167",
      "name": "Piracy",
      "type": "Disruptions",
      "subtype": "Event",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 1,
        "Data": 0,
        "Time": 1
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Destroy 1 Fleet opponent controls.",
      "loreText": "Target 1 Ship-subtype Fleet card. It must engage in Combat: Power 3, Toughness 2. If the ship loses, all goods are discarded and the ship is disabled for 2 turns. Military Convoy is immune.",
      "flavorText": "Black flags on the horizon.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "destroy",
              "what": "Fleet",
              "who": "opponent",
              "count": 1
            }
          ]
        }
      ]
    },
    {
      "id": "168",
      "name": "Contamination Event",
      "type": "Disruptions",
      "subtype": "Event",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 1,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "opponent loses 4 Goods.",
      "loreText": "Target 1 Infrastructure. All Goods stored there become contaminated and must be discarded unless Quality Inspector or Pharmaceutical Clean Room is present. Spreads to adjacent Infrastructure next turn if not contained.",
      "flavorText": "One breach, and the whole batch is compromised.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "loseGoods",
              "amount": 4,
              "who": "opponent"
            }
          ]
        }
      ]
    },
    {
      "id": "169",
      "name": "Natural Disaster",
      "type": "Disruptions",
      "subtype": "Event",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 2
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Destroy 1 Infrastructure opponent controls.",
      "loreText": "Destroy 1 target Infrastructure card and all goods stored there. All Fleet cards within 1 route of the destroyed Infrastructure are delayed 2 turns. Underground Bunker Vault is immune.",
      "flavorText": "Nature reminds us who truly holds power.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "destroy",
              "what": "Infrastructure",
              "who": "opponent",
              "count": 1
            }
          ]
        }
      ]
    },
    {
      "id": "170",
      "name": "Regulatory Fine",
      "type": "Disruptions",
      "subtype": "Event",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 1,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "opponent loses 3 Capital.",
      "loreText": "Target player loses 3 Capital immediately. If they cannot pay, they must sacrifice 1 Infrastructure card instead. Compliance Officer prevents this entirely.",
      "flavorText": "The audit found violations. The fine is non-negotiable.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "drain",
              "resource": "Capital",
              "amount": 3,
              "who": "opponent"
            }
          ]
        }
      ]
    },
    {
      "id": "171",
      "name": "Pandemic Lockdown",
      "type": "Disruptions",
      "subtype": "Event",
      "rarity": "Rare",
      "cost": {
        "Capital": 0,
        "Labor": 2,
        "Fuel": 0,
        "Data": 0,
        "Time": 1
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Disable 3 Workforce opponent controls for 2 turns.",
      "loreText": "All Workforce cards without the Automated keyword are disabled for 3 turns (workers stay home). Infrastructure capacity halved. Only Automated and Digital operations continue normally.",
      "flavorText": "The world stops turning, but goods must still flow.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "disable",
              "what": "Workforce",
              "who": "opponent",
              "count": 3,
              "turns": 2
            }
          ]
        }
      ]
    },
    {
      "id": "172",
      "name": "Demand Collapse",
      "type": "Disruptions",
      "subtype": "Event",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 1
      },
      "stats": null,
      "keywords": [],
      "rulesText": "opponent discards 2 cards.",
      "loreText": "All active Contracts are worth -1 FP (minimum 1) for 2 turns. Safety Stock Goods cannot be used. Overproduced goods spoil: discard 1 Goods from each Infrastructure at full capacity.",
      "flavorText": "The orders stopped. The warehouses fill.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "discard",
              "amount": 2,
              "who": "opponent"
            }
          ]
        }
      ]
    },
    {
      "id": "173",
      "name": "Driver Shortage",
      "type": "Disruptions",
      "subtype": "Event",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Disable 2 Fleet opponent controls for 1 turn.",
      "loreText": "All Vehicle-subtype Fleet cards without assigned Workforce cannot be activated for 2 turns. Autonomous vehicles and Automated Fleet are unaffected. Players may pay +2 Labor per Fleet card to override.",
      "flavorText": "Nobody behind the wheel means nothing moves.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "disable",
              "what": "Fleet",
              "who": "opponent",
              "count": 2,
              "turns": 1
            }
          ]
        }
      ]
    },
    {
      "id": "174",
      "name": "Customs Seizure",
      "type": "Disruptions",
      "subtype": "Event",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 1
      },
      "stats": null,
      "keywords": [],
      "rulesText": "opponent loses 2 Goods. opponent loses 1 Capital.",
      "loreText": "Target 1 international shipment. All goods on that Fleet card are seized (removed from game) unless player has Customs Agent or pays 3 Capital fine. Bonded Warehouse goods are exempt.",
      "flavorText": "Detained at the border. Paperwork insufficient.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "loseGoods",
              "amount": 2,
              "who": "opponent"
            },
            {
              "do": "drain",
              "resource": "Capital",
              "amount": 1,
              "who": "opponent"
            }
          ]
        }
      ]
    },
    {
      "id": "175",
      "name": "Warehouse Fire",
      "type": "Disruptions",
      "subtype": "Event",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 1,
        "Data": 0,
        "Time": 1
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Destroy 1 Infrastructure opponent controls.",
      "loreText": "Target 1 Storage-subtype Infrastructure. Destroy half its stored Goods (rounded up). The Infrastructure is disabled for 1 turn. Hazmat goods destroyed this way trigger secondary Contamination Event.",
      "flavorText": "Alarms ring, sprinklers fail, inventory burns.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "destroy",
              "what": "Infrastructure",
              "who": "opponent",
              "count": 1
            }
          ]
        }
      ]
    },
    {
      "id": "176",
      "name": "Shipping Container Shortage",
      "type": "Disruptions",
      "subtype": "Event",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 2
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Disable 2 Fleet opponent controls for 2 turns.",
      "loreText": "All Ship-subtype Fleet cards have their Capacity halved (rounded down) for 3 turns. Container Port throughput reduced by 50%. Players with Mega-Port Complex reduce duration to 2 turns.",
      "flavorText": "The boxes are all in the wrong places.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "disable",
              "what": "Fleet",
              "who": "opponent",
              "count": 2,
              "turns": 2
            }
          ]
        }
      ]
    },
    {
      "id": "177",
      "name": "Counterfeit Goods",
      "type": "Disruptions",
      "subtype": "Event",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 1,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "opponent loses 2 Goods.",
      "loreText": "Replace 2 Goods in target player's Infrastructure with counterfeit tokens (look identical). Counterfeit goods cause Contract failure when delivered. Quality Inspector reveals and removes counterfeits.",
      "flavorText": "Identical on the outside, worthless on the inside.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "loseGoods",
              "amount": 2,
              "who": "opponent"
            }
          ]
        }
      ]
    },
    {
      "id": "178",
      "name": "Black Swan Event",
      "type": "Disruptions",
      "subtype": "Event",
      "rarity": "Mythic Rare",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 2,
        "Time": 2
      },
      "stats": null,
      "keywords": [],
      "rulesText": "each player mills 3 cards. each player loses 2 of each resource. Deal 2 damage to opposing Supply Chain Health.",
      "loreText": "All players simultaneously: discard top 3 cards of their decks, lose 2 resources of each type, and all Fleet cards in transit are delayed 2 turns. The player with fewest Disruptions in discard pile draws 3 cards.",
      "flavorText": "The thing that couldn't happen just did.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "mill",
              "amount": 3,
              "who": "both"
            },
            {
              "do": "drain",
              "resource": "all",
              "amount": 2,
              "who": "both"
            },
            {
              "do": "damage",
              "amount": 2
            }
          ]
        }
      ]
    },
    {
      "id": "179",
      "name": "Sanctions",
      "type": "Disruptions",
      "subtype": "Event",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 2,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "opponent loses 1 of each resource.",
      "loreText": "Choose 1 type of goods. That goods type cannot be traded, transported, or used for Contract fulfillment for 3 turns across all players. Submarine Cargo Vessel ignores this restriction.",
      "flavorText": "By order of government, this trade route is closed.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "drain",
              "resource": "all",
              "amount": 1,
              "who": "opponent"
            }
          ]
        }
      ]
    },
    {
      "id": "180",
      "name": "IT System Failure",
      "type": "Disruptions",
      "subtype": "Event",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 1,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Disable 1 Infrastructure opponent controls for 2 turns. opponent loses 1 Data.",
      "loreText": "All Digital-subtype Infrastructure disabled for 1 turn. Data resource generation stopped for 2 turns. Cards requiring Data to operate are suspended. Blockchain Ledger Node prevents this for its controller.",
      "flavorText": "Error 500: Supply chain not found.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "disable",
              "what": "Infrastructure",
              "who": "opponent",
              "count": 1,
              "turns": 2
            },
            {
              "do": "drain",
              "resource": "Data",
              "amount": 1,
              "who": "opponent"
            }
          ]
        }
      ]
    },
    {
      "id": "181",
      "name": "Earthquake",
      "type": "Disruptions",
      "subtype": "Event",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 2
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Destroy 1 Infrastructure opponent controls. opponent loses 2 Goods.",
      "loreText": "Destroy 1 Infrastructure card. All Infrastructure within 1 link takes damage: -2 Capacity for 2 turns. Ground-based Fleet cards in the area are delayed 2 turns. Underground Bunker Vault survives.",
      "flavorText": "The ground splits, foundations crumble.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "destroy",
              "what": "Infrastructure",
              "who": "opponent",
              "count": 1
            },
            {
              "do": "loseGoods",
              "amount": 2,
              "who": "opponent"
            }
          ]
        }
      ]
    },
    {
      "id": "182",
      "name": "Union Negotiation Breakdown",
      "type": "Disruptions",
      "subtype": "Event",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 0,
        "Labor": 2,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Disable 2 Workforce opponent controls for 2 turns.",
      "loreText": "All Worker-subtype Workforce cards go on strike for 2 turns (cannot be tapped or used). Specialists and Executives are unaffected. Pay +3 Capital to end strike 1 turn early.",
      "flavorText": "Talks broke down at 2 AM. The picket line formed at 6.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "disable",
              "what": "Workforce",
              "who": "opponent",
              "count": 2,
              "turns": 2
            }
          ]
        }
      ]
    },
    {
      "id": "183",
      "name": "Chip Shortage",
      "type": "Disruptions",
      "subtype": "Event",
      "rarity": "Rare",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 3,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Disable 3 Infrastructure opponent controls for 2 turns.",
      "loreText": "All Automated cards lose their keyword for 3 turns (require Workforce to operate). Chip Fabrication Plant is shut down. Electronics-related Contracts cannot be fulfilled. Data generation reduced by half.",
      "flavorText": "A fingernail-sized component holds the world hostage.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "disable",
              "what": "Infrastructure",
              "who": "opponent",
              "count": 3,
              "turns": 2
            }
          ]
        }
      ]
    },
    {
      "id": "184",
      "name": "Supply Chain Cascade Failure",
      "type": "Disruptions",
      "subtype": "Event",
      "rarity": "Mythic Rare",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 2,
        "Data": 0,
        "Time": 2
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Destroy 1 Infrastructure opponent controls. Destroy 1 Fleet opponent controls. each player mills 2 cards.",
      "loreText": "Chain reaction: each player reveals top card of deck. If it's Infrastructure, that card is destroyed. If Fleet, it's delayed 3 turns. If Workforce, it's disabled 2 turns. If Operations, it's discarded. Repeats once for each Disruption already in play.",
      "flavorText": "One failure begets another, begets another, begets collapse.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "destroy",
              "what": "Infrastructure",
              "who": "opponent",
              "count": 1
            },
            {
              "do": "destroy",
              "what": "Fleet",
              "who": "opponent",
              "count": 1
            },
            {
              "do": "mill",
              "amount": 2,
              "who": "both"
            }
          ]
        }
      ]
    },
    {
      "id": "185",
      "name": "Acts of God",
      "type": "Disruptions",
      "subtype": "Event",
      "rarity": "Mythic Rare",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 3
      },
      "stats": null,
      "keywords": [
        "Legendary"
      ],
      "rulesText": "Legendary. Destroy 1 Infrastructure with the highest cost each player control. Destroy 1 Fleet with the highest Capacity each player control.",
      "loreText": "All players simultaneously lose their highest-cost Infrastructure card and highest-Capacity Fleet card. All Contracts in play have their deadlines extended by 2 turns. Cannot be prevented by any card effect except Force Majeure Clause.",
      "flavorText": "Beyond human control, beyond human preparation.",
      "effects": [
        {
          "trigger": "cast",
          "condition": null,
          "action": [
            {
              "do": "destroy",
              "what": "Infrastructure",
              "who": "both",
              "count": 1,
              "pick": "highestCost"
            },
            {
              "do": "destroy",
              "what": "Fleet",
              "who": "both",
              "count": 1,
              "pick": "highestCapacity"
            }
          ]
        }
      ]
    },
    {
      "id": "186",
      "name": "Same-Day Delivery",
      "type": "Contracts",
      "subtype": "Contract",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 1,
        "Data": 0,
        "Time": 0
      },
      "stats": null,
      "keywords": [
        "Rush"
      ],
      "rulesText": "Rush. Delivery: Requires 1 Fleet in Customer Zone; a Speed 3+ Fleet. Consumes 2 Goods. Reward 2 FP.",
      "loreText": "Deliver using a Fleet with Speed 3 or higher. A fast courier is all you need to close this deal.",
      "flavorText": "Ordered at breakfast, delivered by dinner.",
      "effects": [],
      "requirements": {
        "fleetCards": 1,
        "fleetSpeed": 3
      },
      "cargo": 2,
      "fpReward": 2
    },
    {
      "id": "187",
      "name": "Bulk Grain Export",
      "type": "Contracts",
      "subtype": "Contract",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 1
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Delivery: Requires 1 Fleet in Customer Zone; Capacity 4+ total; a Hub Infrastructure. Consumes 3 Goods. Reward 2 FP.",
      "loreText": "Deliver using a Fleet with total capacity of 4 or more routed through a Hub-type Infrastructure. Large volume, simple logistics.",
      "flavorText": "Feeding a nation across the ocean.",
      "effects": [],
      "requirements": {
        "fleetCards": 1,
        "fleetCapacity": 4,
        "infrastructureSubtypes": [
          "Hub"
        ]
      },
      "cargo": 3,
      "fpReward": 2
    },
    {
      "id": "188",
      "name": "Cold Chain Pharmaceuticals",
      "type": "Contracts",
      "subtype": "Contract",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 1,
        "Data": 0,
        "Time": 0
      },
      "stats": null,
      "keywords": [
        "Specialized"
      ],
      "rulesText": "Specialized. Delivery: Requires 1 Fleet in Customer Zone; Capacity 3+ total; a Vehicle Fleet; a Storage Infrastructure. Consumes 3 Goods. Reward 3 FP.",
      "loreText": "Deliver using a Vehicle-subtype Fleet while Cold Storage Unit is in your Source Zone. Temperature-sensitive cargo requires specialized handling.",
      "flavorText": "2 to 8 degrees Celsius. Not one degree more.",
      "effects": [],
      "requirements": {
        "fleetCards": 1,
        "fleetCapacity": 3,
        "fleetSubtypes": [
          "Vehicle"
        ],
        "infrastructureSubtypes": [
          "Storage"
        ]
      },
      "cargo": 3,
      "fpReward": 3
    },
    {
      "id": "189",
      "name": "E-Commerce Rush",
      "type": "Contracts",
      "subtype": "Contract",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 1,
        "Time": 0
      },
      "stats": null,
      "keywords": [
        "Rush"
      ],
      "rulesText": "Rush. Delivery: Requires 2 Fleet in Customer Zone. Consumes 2 Goods. Reward 2 FP.",
      "loreText": "Deliver using 2 separate Fleet cards in the Customer Zone. Multiple deliveries happening in parallel to meet demand.",
      "flavorText": "Add to cart, buy now, where is my package?",
      "effects": [],
      "requirements": {
        "fleetCards": 2
      },
      "cargo": 2,
      "fpReward": 2
    },
    {
      "id": "190",
      "name": "Military Resupply",
      "type": "Contracts",
      "subtype": "Contract",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 1,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": null,
      "keywords": [
        "Specialized"
      ],
      "rulesText": "Specialized. Delivery: Requires 1 Fleet in Customer Zone; Capacity 5+ total; a Vehicle Fleet; 2 Workforce. Consumes 4 Goods. Reward 3 FP.",
      "loreText": "Deliver using a Vehicle-subtype Fleet with capacity 5+ and at least 2 Workforce cards deployed. Heavy logistics requiring manpower and heavy vehicles.",
      "flavorText": "Failure is not an option. Literally.",
      "effects": [],
      "requirements": {
        "fleetCards": 1,
        "fleetCapacity": 5,
        "fleetSubtypes": [
          "Vehicle"
        ],
        "workforce": 2
      },
      "cargo": 4,
      "fpReward": 3
    },
    {
      "id": "191",
      "name": "Luxury White Glove",
      "type": "Contracts",
      "subtype": "Contract",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 1,
        "Labor": 1,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": null,
      "keywords": [
        "Specialized"
      ],
      "rulesText": "Specialized. Delivery: Requires 1 Fleet in Customer Zone; a Speed 2+ Fleet; a Specialist Workforce. Consumes 2 Goods. Reward 2 FP.",
      "loreText": "Deliver using a Fleet with Speed 2+ while you have at least 1 Workforce with 'Specialist' subtype deployed. Careful handling by trained professionals.",
      "flavorText": "Handle as if it were made of dreams and crystal.",
      "effects": [],
      "requirements": {
        "fleetCards": 1,
        "fleetSpeed": 2,
        "workforceSubtypes": [
          "Specialist"
        ]
      },
      "cargo": 2,
      "fpReward": 2
    },
    {
      "id": "192",
      "name": "Global Electronics Launch",
      "type": "Contracts",
      "subtype": "Contract",
      "rarity": "Rare",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 0,
        "Data": 1,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Delivery: Requires 1 Fleet in Customer Zone; Capacity 4+ total; an Air Fleet; a Digital Infrastructure. Consumes 3 Goods. Reward 3 FP.",
      "loreText": "Deliver using an Air-subtype Fleet with capacity 4+ while a Digital-type Infrastructure is in play. High-tech coordination for a worldwide product launch.",
      "flavorText": "Midnight launches across every timezone.",
      "effects": [],
      "requirements": {
        "fleetCards": 1,
        "fleetCapacity": 4,
        "fleetSubtypes": [
          "Air"
        ],
        "infrastructureSubtypes": [
          "Digital"
        ]
      },
      "cargo": 3,
      "fpReward": 3
    },
    {
      "id": "193",
      "name": "Humanitarian Aid",
      "type": "Contracts",
      "subtype": "Contract",
      "rarity": "Common",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 0,
        "Data": 0,
        "Time": 0
      },
      "stats": null,
      "keywords": [
        "Rush"
      ],
      "rulesText": "Rush. Delivery: Requires 1 Fleet in Customer Zone. Consumes 1 Goods. Reward 2 FP.",
      "loreText": "Deliver using any Fleet card. No special requirements - just get supplies to those in need. The simplest contract with the greatest impact.",
      "flavorText": "When profit pauses for compassion.",
      "effects": [],
      "requirements": {
        "fleetCards": 1
      },
      "cargo": 1,
      "fpReward": 2
    },
    {
      "id": "194",
      "name": "Subscription Box",
      "type": "Contracts",
      "subtype": "Contract",
      "rarity": "Common",
      "cost": {
        "Capital": 0,
        "Labor": 0,
        "Fuel": 0,
        "Data": 1,
        "Time": 0
      },
      "stats": null,
      "keywords": [],
      "rulesText": "Delivery: Requires 1 Fleet in Customer Zone; a Speed 2+ Fleet; a Storage Infrastructure. Consumes 2 Goods. Reward 2 FP.",
      "loreText": "Deliver using a Fleet with Speed 2+ and a Storage-type Infrastructure in your Source Zone. Regular deliveries need reliable storage and moderate speed.",
      "flavorText": "Monthly surprises, quarterly revenue.",
      "effects": [],
      "requirements": {
        "fleetCards": 1,
        "fleetSpeed": 2,
        "infrastructureSubtypes": [
          "Storage"
        ]
      },
      "cargo": 2,
      "fpReward": 2
    },
    {
      "id": "195",
      "name": "Hazmat Disposal",
      "type": "Contracts",
      "subtype": "Contract",
      "rarity": "Uncommon",
      "cost": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 1,
        "Data": 0,
        "Time": 0
      },
      "stats": null,
      "keywords": [
        "Specialized"
      ],
      "rulesText": "Specialized. Delivery: Requires 1 Fleet in Customer Zone; Capacity 3+ total; a Ship Fleet; 2 Workforce. Consumes 3 Goods. Reward 3 FP.",
      "loreText": "Deliver using a Ship-subtype Fleet with capacity 3+ and at least 2 Workforce cards deployed. Hazardous materials demand specialized vessels and trained crews.",
      "flavorText": "Safely moving what others fear to touch.",
      "effects": [],
      "requirements": {
        "fleetCards": 1,
        "fleetCapacity": 3,
        "fleetSubtypes": [
          "Ship"
        ],
        "workforce": 2
      },
      "cargo": 3,
      "fpReward": 3
    },
    {
      "id": "196",
      "name": "Next-Hour Nexus",
      "type": "Contracts",
      "subtype": "Contract",
      "rarity": "Rare",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 1,
        "Data": 1,
        "Time": 0
      },
      "stats": null,
      "keywords": [
        "Rush"
      ],
      "rulesText": "Rush. Delivery: Requires 1 Fleet in Customer Zone; a Speed 4+ Fleet; a Hub Infrastructure. Consumes 3 Goods. Reward 4 FP.",
      "loreText": "Deliver using a Fleet with Speed 5+ and a Hub-type Infrastructure in your Source Zone. Ultra-fast logistics requiring advanced distribution networks.",
      "flavorText": "One hour. Any destination. No excuses.",
      "effects": [],
      "requirements": {
        "fleetCards": 1,
        "fleetSpeed": 4,
        "infrastructureSubtypes": [
          "Hub"
        ]
      },
      "cargo": 3,
      "fpReward": 4
    },
    {
      "id": "197",
      "name": "Auto Manufacturing JIT",
      "type": "Contracts",
      "subtype": "Contract",
      "rarity": "Rare",
      "cost": {
        "Capital": 0,
        "Labor": 1,
        "Fuel": 0,
        "Data": 1,
        "Time": 1
      },
      "stats": null,
      "keywords": [
        "Specialized"
      ],
      "rulesText": "Specialized. Delivery: Requires 1 Fleet in Customer Zone; Capacity 5+ total; a Rail Fleet; a Facility Infrastructure; 3 Workforce. Consumes 4 Goods. Reward 4 FP.",
      "loreText": "Deliver using a Rail-subtype Fleet with capacity 5+ while a Facility-type Infrastructure is in play and you have 3 Workforce cards deployed. Just-in-time manufacturing demands precise coordination.",
      "flavorText": "Precision timing. Zero buffer. Maximum efficiency.",
      "effects": [],
      "requirements": {
        "fleetCards": 1,
        "fleetCapacity": 5,
        "fleetSubtypes": [
          "Rail"
        ],
        "infrastructureSubtypes": [
          "Facility"
        ],
        "workforce": 3
      },
      "cargo": 4,
      "fpReward": 4
    },
    {
      "id": "198",
      "name": "Pandemic Vaccine Distribution",
      "type": "Contracts",
      "subtype": "Contract",
      "rarity": "Rare",
      "cost": {
        "Capital": 1,
        "Labor": 0,
        "Fuel": 1,
        "Data": 1,
        "Time": 0
      },
      "stats": null,
      "keywords": [
        "Specialized",
        "Rush"
      ],
      "rulesText": "Specialized, Rush. Delivery: Requires 2 Fleet in Customer Zone; a Speed 3+ Fleet; an Air Fleet; a Storage and Hub Infrastructure. Consumes 4 Goods. Reward 4 FP.",
      "loreText": "Deliver using an Air-subtype Fleet with Speed 4+ while Cold Storage Unit and a Hub Infrastructure are both in your Source Zone. Cold chain air logistics on a global scale.",
      "flavorText": "The world's most important delivery.",
      "effects": [],
      "requirements": {
        "fleetCards": 2,
        "fleetSpeed": 3,
        "fleetSubtypes": [
          "Air"
        ],
        "infrastructureSubtypes": [
          "Storage",
          "Hub"
        ]
      },
      "cargo": 4,
      "fpReward": 4
    },
    {
      "id": "199",
      "name": "The Infinite Subscription",
      "type": "Contracts",
      "subtype": "Contract",
      "rarity": "Mythic Rare",
      "cost": {
        "Capital": 1,
        "Labor": 1,
        "Fuel": 0,
        "Data": 1,
        "Time": 0
      },
      "stats": null,
      "keywords": [
        "Legendary"
      ],
      "rulesText": "Legendary. Delivery: Requires 3 Fleet in Customer Zone; Capacity 8+ total; 4 Workforce. Consumes 5 Goods. Reward 5 FP.",
      "loreText": "Deliver using 3 Fleet cards in the Customer Zone with total capacity 8+ and at least 4 Workforce cards deployed. A massive recurring fulfillment operation requiring a fully staffed logistics army.",
      "flavorText": "The contract that never ends, the profits that never stop.",
      "effects": [],
      "requirements": {
        "fleetCards": 3,
        "fleetCapacity": 8,
        "workforce": 4
      },
      "cargo": 5,
      "fpReward": 5
    },
    {
      "id": "200",
      "name": "The Perfect Supply Chain",
      "type": "Contracts",
      "subtype": "Contract",
      "rarity": "Mythic Rare",
      "cost": {
        "Capital": 2,
        "Labor": 1,
        "Fuel": 0,
        "Data": 1,
        "Time": 1
      },
      "stats": null,
      "keywords": [
        "Legendary"
      ],
      "rulesText": "Legendary. Delivery: Requires 2 Fleet in Customer Zone; a Vehicle, Ship and Air Fleet; a Facility, Storage, Hub and Digital Infrastructure; 5 Workforce. Consumes 5 Goods. Reward 6 FP.",
      "loreText": "Win condition: Control at least 1 Infrastructure of each subtype (Facility, Storage, Hub, Digital) and 1 Fleet of each subtype (Vehicle, Ship, Air, Rail, Drone, Fixed), plus 5 Workforce cards. The ultimate supply chain mastery challenge. Legendary - limit 1 per deck.",
      "flavorText": "The impossible made inevitable through flawless execution.",
      "effects": [],
      "requirements": {
        "fleetCards": 2,
        "fleetSubtypes": [
          "Vehicle",
          "Ship",
          "Air"
        ],
        "infrastructureSubtypes": [
          "Facility",
          "Storage",
          "Hub",
          "Digital"
        ],
        "workforce": 5
      },
      "cargo": 5,
      "fpReward": 6
    }
  ];
}));
