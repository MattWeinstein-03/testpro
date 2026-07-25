(function(root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.CardData = factory();
  }
}(typeof window !== 'undefined' ? window : this, function() {
  'use strict';

  var cards = [
  {
    "id": "001",
    "name": "Raw Material Mine",
    "subtype": "Facility",
    "rarity": "Common",
    "cost": {
      "Capital": 1,
      "Labor": 1,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": {
      "capacity": 2
    },
    "abilities": "When Raw Material Mine enters your Supply Zone, generate 1 Capital during each Procurement Phase. Tap: Add 1 raw material token to any connected Infrastructure.",
    "flavorText": "Where every supply chain begins.",
    "keywords": [
      "Automated"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "002",
    "name": "Textile Mill",
    "subtype": "Facility",
    "rarity": "Common",
    "cost": {
      "Capital": 1,
      "Labor": 1,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": {
      "capacity": 2
    },
    "abilities": "Tap: Convert 1 raw material token into 1 processed goods token. Processed goods count double toward Contracts requiring manufactured items.",
    "flavorText": "Thread by thread, the world is clothed.",
    "keywords": [
      "Automated"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "003",
    "name": "Regional Warehouse",
    "subtype": "Storage",
    "rarity": "Common",
    "cost": {
      "Capital": 1,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 1
    },
    "stats": {
      "capacity": 3
    },
    "abilities": "Store up to 3 goods tokens. During Transit Phase, you may move 1 goods token from Regional Warehouse to any Fleet card in your Logistics Zone without paying Fuel costs.",
    "flavorText": "Close enough to matter, big enough to count.",
    "keywords": [],
    "type": "Infrastructure"
  },
  {
    "id": "004",
    "name": "Cross-Dock Facility",
    "subtype": "Facility",
    "rarity": "Common",
    "cost": {
      "Capital": 1,
      "Labor": 1,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": {
      "capacity": 2
    },
    "abilities": "Goods passing through Cross-Dock Facility do not consume storage capacity. During Transit Phase, redirect 1 shipment from any Fleet card directly to another Fleet card.",
    "flavorText": "In one door, out the other. No shelf time.",
    "keywords": [
      "Rush"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "005",
    "name": "Cold Storage Unit",
    "subtype": "Storage",
    "rarity": "Uncommon",
    "cost": {
      "Capital": 2,
      "Labor": 0,
      "Fuel": 1,
      "Data": 0,
      "Time": 0
    },
    "stats": {
      "capacity": 3
    },
    "abilities": "Required for Cold Chain Contracts. Goods stored here never spoil. Tap: Preserve 1 perishable goods token indefinitely. Other Infrastructure cannot store perishable goods.",
    "flavorText": "Minus forty keeps the world fresh.",
    "keywords": [
      "Specialized"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "006",
    "name": "Container Port",
    "subtype": "Hub",
    "rarity": "Uncommon",
    "cost": {
      "Capital": 2,
      "Labor": 1,
      "Fuel": 0,
      "Data": 0,
      "Time": 1
    },
    "stats": {
      "capacity": 5
    },
    "abilities": "Fleet cards with the Ship subtype gain +2 Speed when departing from Container Port. During Procurement Phase, you may import 1 goods token from the Global Market at reduced cost (-1 Capital).",
    "flavorText": "Mountains of steel boxes, rivers of commerce.",
    "keywords": [
      "Hub"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "007",
    "name": "Inland Rail Terminal",
    "subtype": "Hub",
    "rarity": "Common",
    "cost": {
      "Capital": 1,
      "Labor": 1,
      "Fuel": 0,
      "Data": 0,
      "Time": 1
    },
    "stats": {
      "capacity": 4
    },
    "abilities": "Fleet cards with the Rail subtype gain +1 Speed when connected to Inland Rail Terminal. Tap: Move up to 2 goods tokens between any connected Infrastructure cards.",
    "flavorText": "Steel rails carry the nation's heartbeat.",
    "keywords": [],
    "type": "Infrastructure"
  },
  {
    "id": "008",
    "name": "Automated Sortation Center",
    "subtype": "Facility",
    "rarity": "Uncommon",
    "cost": {
      "Capital": 2,
      "Labor": 0,
      "Fuel": 0,
      "Data": 1,
      "Time": 1
    },
    "stats": {
      "capacity": 4
    },
    "abilities": "During Transit Phase, automatically route up to 2 goods tokens to their optimal destination without paying Labor costs. Reduces fulfillment time on all Contracts by 1 turn.",
    "flavorText": "A thousand decisions per second, zero mistakes.",
    "keywords": [
      "Automated"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "009",
    "name": "Bonded Warehouse",
    "subtype": "Storage",
    "rarity": "Common",
    "cost": {
      "Capital": 1,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 1
    },
    "stats": {
      "capacity": 3
    },
    "abilities": "Goods stored in Bonded Warehouse are exempt from Tariff Disruptions. Tap: Delay customs inspection on 1 shipment, keeping it in transit for 1 additional turn without penalty.",
    "flavorText": "Duty deferred, opportunity preserved.",
    "keywords": [
      "Specialized"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "010",
    "name": "Fulfillment Center",
    "subtype": "Facility",
    "rarity": "Uncommon",
    "cost": {
      "Capital": 2,
      "Labor": 1,
      "Fuel": 0,
      "Data": 1,
      "Time": 0
    },
    "stats": {
      "capacity": 5
    },
    "abilities": "When you complete a Contract, if goods were processed through Fulfillment Center, gain 1 additional Fulfillment Point. Tap: Pack and ship 2 goods tokens simultaneously.",
    "flavorText": "Pick, pack, ship. The modern mantra.",
    "keywords": [
      "Automated",
      "Hub"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "011",
    "name": "Micro-Fulfillment Hub",
    "subtype": "Facility",
    "rarity": "Common",
    "cost": {
      "Capital": 1,
      "Labor": 1,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": {
      "capacity": 2
    },
    "abilities": "Last-mile Fleet cards gain +1 Speed when connected to Micro-Fulfillment Hub. Tap: Complete 1 Same-Day Delivery Contract requirement without needing additional Fleet capacity.",
    "flavorText": "Small footprint, big impact.",
    "keywords": [
      "Rush"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "012",
    "name": "Assembly Plant",
    "subtype": "Facility",
    "rarity": "Common",
    "cost": {
      "Capital": 2,
      "Labor": 1,
      "Fuel": 0,
      "Data": 0,
      "Time": 1
    },
    "stats": {
      "capacity": 3
    },
    "abilities": "Tap: Convert 2 raw material tokens into 1 finished goods token. Finished goods are worth double toward Contract fulfillment requirements.",
    "flavorText": "Parts become products on the assembly line.",
    "keywords": [],
    "type": "Infrastructure"
  },
  {
    "id": "013",
    "name": "Pharmaceutical Clean Room",
    "subtype": "Facility",
    "rarity": "Rare",
    "cost": {
      "Capital": 3,
      "Labor": 1,
      "Fuel": 0,
      "Data": 1,
      "Time": 1
    },
    "stats": {
      "capacity": 2
    },
    "abilities": "Required for Pharmaceutical Contracts. Goods produced here cannot be affected by Contamination Event disruptions. Tap: Produce 1 pharmaceutical token worth 2 FP toward medical Contracts.",
    "flavorText": "Sterility is not optional.",
    "keywords": [
      "Specialized",
      "Fragile"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "014",
    "name": "Oil Refinery",
    "subtype": "Facility",
    "rarity": "Uncommon",
    "cost": {
      "Capital": 2,
      "Labor": 1,
      "Fuel": 0,
      "Data": 0,
      "Time": 1
    },
    "stats": {
      "capacity": 3
    },
    "abilities": "During Procurement Phase, generate 2 Fuel resources instead of 1 from this card. All Fleet cards you control reduce their Fuel costs by 1 (minimum 0).",
    "flavorText": "Black gold transformed into motion.",
    "keywords": [
      "Automated"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "015",
    "name": "Solar-Powered Depot",
    "subtype": "Storage",
    "rarity": "Common",
    "cost": {
      "Capital": 1,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 1
    },
    "stats": {
      "capacity": 3
    },
    "abilities": "Solar-Powered Depot does not require Fuel to operate. During Procurement Phase, generate 1 additional resource of any type. Immune to Fuel Price Spike disruptions.",
    "flavorText": "The sun charges no tariffs.",
    "keywords": [
      "Sustainable"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "016",
    "name": "Free Trade Zone",
    "subtype": "Hub",
    "rarity": "Rare",
    "cost": {
      "Capital": 3,
      "Labor": 0,
      "Fuel": 0,
      "Data": 1,
      "Time": 1
    },
    "stats": {
      "capacity": 4
    },
    "abilities": "All goods moving through Free Trade Zone ignore Tariff War and Customs Seizure disruptions. Reduce Capital cost of all Contracts fulfilled from this zone by 1.",
    "flavorText": "Where borders dissolve and commerce flows free.",
    "keywords": [
      "Hub"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "017",
    "name": "Dry Port",
    "subtype": "Hub",
    "rarity": "Common",
    "cost": {
      "Capital": 1,
      "Labor": 1,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": {
      "capacity": 3
    },
    "abilities": "Connects inland Infrastructure to Container Port benefits. Fleet cards transiting through Dry Port may switch between Rail and Truck subtypes for routing purposes.",
    "flavorText": "The ocean reaches inland.",
    "keywords": [
      "Hub"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "018",
    "name": "Returns Processing Center",
    "subtype": "Facility",
    "rarity": "Common",
    "cost": {
      "Capital": 1,
      "Labor": 1,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": {
      "capacity": 2
    },
    "abilities": "When an opponent plays a Disruption that destroys goods tokens, recover 1 destroyed token and place it here. Tap: Convert 1 returned goods token into 1 Capital resource.",
    "flavorText": "One customer's return is another's opportunity.",
    "keywords": [],
    "type": "Infrastructure"
  },
  {
    "id": "019",
    "name": "Packaging Line",
    "subtype": "Facility",
    "rarity": "Common",
    "cost": {
      "Capital": 1,
      "Labor": 1,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": {
      "capacity": 2
    },
    "abilities": "Tap: Package up to 2 goods tokens, adding +1 value each toward Contract fulfillment. Packaged goods occupy 1 less capacity during transit.",
    "flavorText": "The last touch before the journey begins.",
    "keywords": [
      "Automated"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "020",
    "name": "Quarantine Inspection Bay",
    "subtype": "Facility",
    "rarity": "Common",
    "cost": {
      "Capital": 1,
      "Labor": 0,
      "Fuel": 0,
      "Data": 1,
      "Time": 0
    },
    "stats": {
      "capacity": 2
    },
    "abilities": "Goods passing through Quarantine Inspection Bay are immune to Contamination Event and Counterfeit Goods disruptions for the remainder of the game. Slows transit by 1 turn.",
    "flavorText": "Trust, but verify.",
    "keywords": [
      "Specialized"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "021",
    "name": "Data Center",
    "subtype": "Digital",
    "rarity": "Uncommon",
    "cost": {
      "Capital": 2,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 1
    },
    "stats": {
      "capacity": 3
    },
    "abilities": "During Procurement Phase, generate 2 Data resources. Tap: Grant any 1 Infrastructure card the Automated keyword until end of turn, allowing it to operate without Labor costs.",
    "flavorText": "Ones and zeros that move mountains.",
    "keywords": [
      "Automated"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "022",
    "name": "Control Tower",
    "subtype": "Digital",
    "rarity": "Rare",
    "cost": {
      "Capital": 2,
      "Labor": 0,
      "Fuel": 0,
      "Data": 2,
      "Time": 1
    },
    "stats": {
      "capacity": 2
    },
    "abilities": "You may look at the top 3 cards of any player's deck at any time. During Transit Phase, reroute any 1 shipment in your Logistics Zone to a different destination without paying additional costs.",
    "flavorText": "See everything. Direct everything.",
    "keywords": [
      "Automated"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "023",
    "name": "Blockchain Ledger Node",
    "subtype": "Digital",
    "rarity": "Uncommon",
    "cost": {
      "Capital": 1,
      "Labor": 0,
      "Fuel": 0,
      "Data": 2,
      "Time": 0
    },
    "stats": {
      "capacity": 2
    },
    "abilities": "All your goods tokens gain Track and Trace. Opponents cannot play Cargo Theft or Counterfeit Goods targeting goods registered on your Blockchain Ledger. Tap: Verify 1 Contract for instant completion.",
    "flavorText": "Immutable truth in an uncertain world.",
    "keywords": [
      "Automated"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "024",
    "name": "3D Printing Facility",
    "subtype": "Facility",
    "rarity": "Uncommon",
    "cost": {
      "Capital": 2,
      "Labor": 0,
      "Fuel": 0,
      "Data": 1,
      "Time": 1
    },
    "stats": {
      "capacity": 2
    },
    "abilities": "Tap: Create 1 custom goods token matching any Contract requirement without needing raw materials. Limit once per turn. Custom goods cannot be stored or transferred.",
    "flavorText": "Design today, deliver tomorrow.",
    "keywords": [
      "Automated"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "025",
    "name": "Vertical Farm",
    "subtype": "Facility",
    "rarity": "Common",
    "cost": {
      "Capital": 1,
      "Labor": 1,
      "Fuel": 0,
      "Data": 0,
      "Time": 1
    },
    "stats": {
      "capacity": 2
    },
    "abilities": "During Procurement Phase, produce 1 perishable goods token. Perishable tokens spoil after 3 turns unless stored in Cold Storage. Counts toward food-related Contract requirements.",
    "flavorText": "Forty floors of fresh produce.",
    "keywords": [
      "Sustainable"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "026",
    "name": "LNG Terminal",
    "subtype": "Hub",
    "rarity": "Uncommon",
    "cost": {
      "Capital": 2,
      "Labor": 1,
      "Fuel": 0,
      "Data": 0,
      "Time": 1
    },
    "stats": {
      "capacity": 4
    },
    "abilities": "During Procurement Phase, generate 3 Fuel resources. Ship-subtype Fleet cards docked here gain +1 Capacity. Vulnerable to Natural Disaster disruptions (destroyed instead of damaged).",
    "flavorText": "Liquid energy awaiting transformation.",
    "keywords": [
      "Hub",
      "Fragile"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "027",
    "name": "Customs Brokerage Office",
    "subtype": "Facility",
    "rarity": "Common",
    "cost": {
      "Capital": 1,
      "Labor": 1,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": {
      "capacity": 1
    },
    "abilities": "Reduce the impact of Tariff War by 1 resource per turn. Tap: Clear 1 shipment through customs immediately, bypassing any inspection delay. Prevents Customs Seizure on 1 shipment per turn.",
    "flavorText": "Paperwork is our superpower.",
    "keywords": [],
    "type": "Infrastructure"
  },
  {
    "id": "028",
    "name": "Intermodal Transfer Yard",
    "subtype": "Hub",
    "rarity": "Common",
    "cost": {
      "Capital": 1,
      "Labor": 1,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": {
      "capacity": 3
    },
    "abilities": "Fleet cards may transfer goods between different vehicle types here without spending a Transit Phase action. Tap: Move 1 goods token from any Fleet card to any other Fleet card you control.",
    "flavorText": "Ship to rail to truck, seamlessly.",
    "keywords": [
      "Hub"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "029",
    "name": "Reverse Logistics Depot",
    "subtype": "Facility",
    "rarity": "Common",
    "cost": {
      "Capital": 1,
      "Labor": 1,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": {
      "capacity": 2
    },
    "abilities": "When a Contract is failed or canceled, return goods tokens here instead of discarding them. Tap: Recycle 2 goods tokens into 1 resource of any type.",
    "flavorText": "Nothing is truly wasted here.",
    "keywords": [
      "Sustainable"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "030",
    "name": "Drone Launch Pad",
    "subtype": "Facility",
    "rarity": "Uncommon",
    "cost": {
      "Capital": 2,
      "Labor": 0,
      "Fuel": 1,
      "Data": 1,
      "Time": 0
    },
    "stats": {
      "capacity": 2
    },
    "abilities": "Drone-subtype Fleet cards deployed from here gain +2 Speed and Rush keyword. Tap: Launch 1 emergency delivery, fulfilling 1 last-mile Contract requirement instantly.",
    "flavorText": "Vertical takeoff, horizontal disruption.",
    "keywords": [
      "Automated"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "031",
    "name": "Chip Fabrication Plant",
    "subtype": "Facility",
    "rarity": "Rare",
    "cost": {
      "Capital": 3,
      "Labor": 1,
      "Fuel": 0,
      "Data": 1,
      "Time": 1
    },
    "stats": {
      "capacity": 2
    },
    "abilities": "Required for Electronics Launch Contract. Tap: Produce 1 semiconductor token. Semiconductor tokens are worth 3 toward electronics Contracts. If destroyed, all your Automated cards lose their keyword for 2 turns.",
    "flavorText": "Nanometers of precision, billions in value.",
    "keywords": [
      "Specialized",
      "Fragile"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "032",
    "name": "Grain Elevator",
    "subtype": "Storage",
    "rarity": "Common",
    "cost": {
      "Capital": 1,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 1
    },
    "stats": {
      "capacity": 4
    },
    "abilities": "Can only store agricultural goods tokens. Capacity is doubled for grain products. Tap: Load 2 agricultural goods onto any Fleet card connected to this facility.",
    "flavorText": "Towering sentinels of the heartland.",
    "keywords": [
      "Specialized"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "033",
    "name": "Hazmat Containment Facility",
    "subtype": "Storage",
    "rarity": "Uncommon",
    "cost": {
      "Capital": 2,
      "Labor": 1,
      "Fuel": 0,
      "Data": 0,
      "Time": 1
    },
    "stats": {
      "capacity": 2
    },
    "abilities": "Required for Hazmat Disposal Contract. Hazardous goods stored here cannot trigger Contamination Events. Tap: Safely dispose of 1 hazardous token, gaining 1 FP.",
    "flavorText": "Safety protocols are written in someone else's tragedy.",
    "keywords": [
      "Specialized"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "034",
    "name": "Autonomous Warehouse",
    "subtype": "Storage",
    "rarity": "Rare",
    "cost": {
      "Capital": 3,
      "Labor": 0,
      "Fuel": 0,
      "Data": 2,
      "Time": 1
    },
    "stats": {
      "capacity": 6
    },
    "abilities": "Does not require Workforce cards to operate. During Transit Phase, automatically load and unload up to 3 goods tokens without player action. Immune to Union Negotiation Breakdown.",
    "flavorText": "No lights needed. The robots prefer the dark.",
    "keywords": [
      "Automated"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "035",
    "name": "Pop-Up Distribution Point",
    "subtype": "Facility",
    "rarity": "Common",
    "cost": {
      "Capital": 0,
      "Labor": 1,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": {
      "capacity": 1
    },
    "abilities": "Flash: May be deployed during Transit Phase instead of Deployment Phase. Sacrifice at end of turn. While active, all your last-mile deliveries cost 1 less Fuel.",
    "flavorText": "Here today, delivering today, gone tomorrow.",
    "keywords": [
      "Rush",
      "Fragile"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "036",
    "name": "Mega-Port Complex",
    "subtype": "Hub",
    "rarity": "Rare",
    "cost": {
      "Capital": 3,
      "Labor": 2,
      "Fuel": 0,
      "Data": 1,
      "Time": 0
    },
    "stats": {
      "capacity": 8
    },
    "abilities": "All Ship and Rail Fleet cards gain +1 Speed and +2 Capacity while connected. During Procurement Phase, import up to 3 goods tokens from Global Market at standard cost. Hub for intercontinental routes.",
    "flavorText": "Where the world's goods converge.",
    "keywords": [
      "Hub"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "037",
    "name": "Hyperloop Terminal",
    "subtype": "Hub",
    "rarity": "Mythic Rare",
    "cost": {
      "Capital": 4,
      "Labor": 0,
      "Fuel": 0,
      "Data": 2,
      "Time": 0
    },
    "stats": {
      "capacity": 4
    },
    "abilities": "Fleet cards departing from Hyperloop Terminal have their transit time reduced to 0 turns (arrive instantly). Limit 2 shipments per turn. Connected Infrastructure within 2 links gains +1 Capacity.",
    "flavorText": "Distance is just a number now.",
    "keywords": [
      "Automated",
      "Hub"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "038",
    "name": "Orbital Drop Platform",
    "subtype": "Facility",
    "rarity": "Mythic Rare",
    "cost": {
      "Capital": 4,
      "Labor": 0,
      "Fuel": 2,
      "Data": 1,
      "Time": 0
    },
    "stats": {
      "capacity": 3
    },
    "abilities": "Tap: Deliver any goods token to any location on the board instantly, bypassing all Disruptions and route requirements. Costs 2 Fuel per use. Immune to all ground-based Disruptions.",
    "flavorText": "Gravity does the heavy lifting.",
    "keywords": [
      "Rush",
      "Automated"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "039",
    "name": "Underground Bunker Vault",
    "subtype": "Storage",
    "rarity": "Rare",
    "cost": {
      "Capital": 3,
      "Labor": 1,
      "Fuel": 0,
      "Data": 0,
      "Time": 1
    },
    "stats": {
      "capacity": 4
    },
    "abilities": "Goods stored here are immune to ALL Disruptions. Cannot be targeted by opponent abilities. Goods take 1 additional turn to retrieve. Tap: Store up to 2 goods tokens safely.",
    "flavorText": "When the world burns, the supply chain endures.",
    "keywords": [
      "Specialized"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "040",
    "name": "The Global Nexus",
    "subtype": "Hub",
    "rarity": "Mythic Rare",
    "cost": {
      "Capital": 4,
      "Labor": 1,
      "Fuel": 1,
      "Data": 2,
      "Time": 1
    },
    "stats": {
      "capacity": 10
    },
    "abilities": "All your Infrastructure cards are considered connected. All Fleet cards gain +2 Speed. During Procurement Phase, generate 1 of each resource type. When you fulfill a Contract, gain 1 additional FP. Legendary - limit 1 per deck.",
    "flavorText": "The center of everything, connected to everywhere.",
    "keywords": [
      "Automated",
      "Hub",
      "Legendary"
    ],
    "type": "Infrastructure"
  },
  {
    "id": "041",
    "name": "Forklift Operator",
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
    "abilities": "Tap: Move 1 goods token between any two Infrastructure cards in your Supply Zone. Forklift Operator can load/unload Fleet cards without spending a Transit Phase action.",
    "flavorText": "Master of the warehouse ballet.",
    "keywords": [],
    "type": "Workforce"
  },
  {
    "id": "042",
    "name": "Long-Haul Trucker",
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
    "abilities": "When assigned to a Truck-subtype Fleet card, that vehicle gains +1 Speed and +1 Capacity. During Combat Phase, Long-Haul Trucker deals 2 damage to blocking Disruptions.",
    "flavorText": "Midnight miles and diesel dreams.",
    "keywords": [],
    "type": "Workforce"
  },
  {
    "id": "043",
    "name": "Warehouse Associate",
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
    "abilities": "Tap: Pick and pack 1 goods token, making it ready for shipment. When assigned to a Fulfillment Center, that Infrastructure gains +1 Capacity.",
    "flavorText": "Ten thousand steps a day, ten thousand orders filled.",
    "keywords": [],
    "type": "Workforce"
  },
  {
    "id": "044",
    "name": "Customs Agent",
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
    "abilities": "Prevents Customs Seizure disruptions on any 1 shipment per turn. Tap: Clear 1 international shipment through customs instantly, bypassing normal inspection delay.",
    "flavorText": "Stamp of approval, gateway to the world.",
    "keywords": [
      "Specialized"
    ],
    "type": "Workforce"
  },
  {
    "id": "045",
    "name": "Supply Chain Analyst",
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
    "abilities": "During Planning Phase, look at the top 2 cards of your deck and rearrange them. Tap: Reveal an opponent's hand card. Generate 1 Data resource during Procurement Phase.",
    "flavorText": "The numbers tell stories others cannot hear.",
    "keywords": [],
    "type": "Workforce"
  },
  {
    "id": "046",
    "name": "Procurement Manager",
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
    "abilities": "During Procurement Phase, reduce the cost of purchasing 1 goods token from Global Market by 1 Capital. Tap: Negotiate a bulk deal, buying 3 goods tokens for the price of 2.",
    "flavorText": "Never pay list price. Ever.",
    "keywords": [],
    "type": "Workforce"
  },
  {
    "id": "047",
    "name": "Dock Worker",
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
    "abilities": "When assigned to a Container Port or Mega-Port, increase that Hub's loading speed: move 2 additional goods tokens during Transit Phase. Gains +1 Power during Combat with Piracy disruptions.",
    "flavorText": "Strong back, steady hands, ships to fill.",
    "keywords": [],
    "type": "Workforce"
  },
  {
    "id": "048",
    "name": "Freight Broker",
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
    "abilities": "Tap: Assign any Fleet card you control to a route it normally couldn't access. During Procurement Phase, reduce Fuel cost of 1 Fleet card by 1 this turn.",
    "flavorText": "A phone call away from solving any logistics puzzle.",
    "keywords": [],
    "type": "Workforce"
  },
  {
    "id": "049",
    "name": "Last-Mile Courier",
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
    "abilities": "Rush: May act on the turn deployed. Tap: Deliver 1 goods token directly to fulfill a Contract requirement, bypassing Fleet card requirements for packages weighing 1 or less.",
    "flavorText": "Sprinting the final hundred meters.",
    "keywords": [
      "Rush"
    ],
    "type": "Workforce"
  },
  {
    "id": "050",
    "name": "Inventory Controller",
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
    "abilities": "All your Infrastructure cards gain +1 effective Capacity while Inventory Controller is active. Tap: Reorganize goods in any 1 Infrastructure, making room for 1 additional token this turn.",
    "flavorText": "Every slot accounted for, every item in its place.",
    "keywords": [],
    "type": "Workforce"
  },
  {
    "id": "051",
    "name": "Quality Inspector",
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
    "abilities": "Tap: Inspect 1 goods token. Inspected goods are immune to Counterfeit Goods and Contamination disruptions. Contracts fulfilled with inspected goods grant +1 bonus FP.",
    "flavorText": "Acceptable is never good enough.",
    "keywords": [
      "Specialized"
    ],
    "type": "Workforce"
  },
  {
    "id": "052",
    "name": "Route Optimizer",
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
    "abilities": "All Fleet cards you control gain +1 Speed. Tap: Recalculate route for 1 Fleet card, reducing its transit time by 1 turn. During Planning Phase, you may view all opponent Fleet positions.",
    "flavorText": "The shortest path is rarely a straight line.",
    "keywords": [
      "Automated"
    ],
    "type": "Workforce"
  },
  {
    "id": "053",
    "name": "Night Shift Crew",
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
    "abilities": "Tap during opponent's turn: Perform 1 loading/unloading action at any Infrastructure you control. Night Shift Crew effectively doubles your operational throughput each round.",
    "flavorText": "The supply chain never sleeps.",
    "keywords": [],
    "type": "Workforce"
  },
  {
    "id": "054",
    "name": "Hazmat Handler",
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
    "abilities": "Required to transport hazardous goods tokens. When assigned to a Hazmat Containment Facility, that card gains +2 Capacity. Prevents Contamination Event from spreading to adjacent Infrastructure.",
    "flavorText": "Certified, trained, and fearless.",
    "keywords": [
      "Specialized"
    ],
    "type": "Workforce"
  },
  {
    "id": "055",
    "name": "Port Crane Operator",
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
    "abilities": "Tap: Load or unload 3 goods tokens from a Ship-subtype Fleet card in a single action (normally limited to 1). Doubles Container Port throughput when assigned there.",
    "flavorText": "Sixty tons, sixty meters, sixty seconds.",
    "keywords": [],
    "type": "Workforce"
  },
  {
    "id": "056",
    "name": "Logistics Coordinator",
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
    "abilities": "During Planning Phase, you may take 1 additional Transit Phase action. Tap: Reassign 1 Workforce card from one Infrastructure to another without spending a Deployment action.",
    "flavorText": "Orchestrating chaos into order.",
    "keywords": [],
    "type": "Workforce"
  },
  {
    "id": "057",
    "name": "Union Steward",
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
    "abilities": "All your Workforce cards gain +1 Toughness. Prevents Union Negotiation Breakdown from affecting your workers for 2 turns. Tap: Protect 1 Workforce card from being discarded this turn.",
    "flavorText": "Workers united, supply chain protected.",
    "keywords": [],
    "type": "Workforce"
  },
  {
    "id": "058",
    "name": "Seasonal Temp Worker",
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
    "abilities": "Flash: Deploy during any phase. Sacrifice at end of next turn. While active, assigned Infrastructure gains +2 Capacity. Cannot be assigned the Automated keyword.",
    "flavorText": "Here for the holiday rush, gone by January.",
    "keywords": [
      "Rush",
      "Fragile"
    ],
    "type": "Workforce"
  },
  {
    "id": "059",
    "name": "AI Operations Manager",
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
    "abilities": "All Infrastructure with the Automated keyword gain +2 Capacity. During Planning Phase, automatically optimize all routes (all Fleet gain +1 Speed). Immune to Driver Shortage. Generate 1 Data each Procurement Phase.",
    "flavorText": "I process therefore I optimize.",
    "keywords": [
      "Automated"
    ],
    "type": "Workforce"
  },
  {
    "id": "060",
    "name": "Chief Supply Chain Officer",
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
    "abilities": "All your Workforce cards gain +1 Power. During Planning Phase, draw 1 additional card. Once per game: restructure your entire Supply Zone, rearranging all goods tokens and Workforce assignments.",
    "flavorText": "Vision from the top floor, impact on every floor.",
    "keywords": [],
    "type": "Workforce"
  },
  {
    "id": "061",
    "name": "Drone Pilot",
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
    "abilities": "Required to operate Drone-subtype Fleet cards. When assigned to Drone Launch Pad, all Drone Fleet cards gain +1 Speed. Tap: Survey any route, revealing hidden Disruptions.",
    "flavorText": "Eyes in the sky, packages in the air.",
    "keywords": [],
    "type": "Workforce"
  },
  {
    "id": "062",
    "name": "Refrigeration Technician",
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
    "abilities": "Prevents Cold Storage Unit and Refrigerated Truck from malfunctioning. Perishable goods under this worker's care gain +2 turns before spoiling. Tap: Repair 1 damaged cold chain Infrastructure.",
    "flavorText": "Guardian of the cold chain.",
    "keywords": [
      "Specialized"
    ],
    "type": "Workforce"
  },
  {
    "id": "063",
    "name": "Security Guard",
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
    "abilities": "Assigned Infrastructure is immune to Cargo Theft. During Combat Phase, Security Guard blocks 1 Disruption targeting your Supply Zone, dealing 2 damage to it.",
    "flavorText": "Vigilance is the price of full shelves.",
    "keywords": [],
    "type": "Workforce"
  },
  {
    "id": "064",
    "name": "Compliance Officer",
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
    "abilities": "Prevents Regulatory Fine from affecting you. All your operations satisfy regulatory requirements automatically. Tap: Cancel 1 Sanctions disruption targeting your supply chain.",
    "flavorText": "Every regulation known, every form filed.",
    "keywords": [
      "Specialized"
    ],
    "type": "Workforce"
  },
  {
    "id": "065",
    "name": "Master Planner",
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
    "abilities": "During Planning Phase, look at the top 4 cards of your deck and put them back in any order. Once per game: take an extra Planning Phase this turn. All Contracts you attempt gain -1 turn to completion.",
    "flavorText": "Thirty moves ahead, always.",
    "keywords": [],
    "type": "Workforce"
  },
  {
    "id": "066",
    "name": "Cross-Trained Associate",
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
    "abilities": "May be assigned to any Infrastructure type without restriction. Gains the specialty keyword of whatever Infrastructure it is assigned to. Tap: Perform any Workforce tap ability on the same Infrastructure.",
    "flavorText": "Jack of all trades, master of survival.",
    "keywords": [],
    "type": "Workforce"
  },
  {
    "id": "067",
    "name": "Negotiator",
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
    "abilities": "Tap: Reduce the resource cost of any 1 card you play this turn by 2 (distributed across any resource types). During Procurement Phase, buy 1 goods token at half cost (rounded up).",
    "flavorText": "Everything has a price. Usually lower than posted.",
    "keywords": [],
    "type": "Workforce"
  },
  {
    "id": "068",
    "name": "Expeditor",
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
    "abilities": "Rush: Acts on deployment turn. Tap: Give any 1 Fleet card the Rush keyword this turn. When assigned to a Contract, reduce its completion time by 1 turn.",
    "flavorText": "Fast is a way of life.",
    "keywords": [
      "Rush"
    ],
    "type": "Workforce"
  },
  {
    "id": "069",
    "name": "Data Scientist",
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
    "abilities": "Generate 2 Data resources during Procurement Phase. Tap: Analyze demand patterns - look at next 3 Contracts in the Contract deck. Predictive Analytics costs 1 less when Data Scientist is active.",
    "flavorText": "Patterns emerge for those who know where to look.",
    "keywords": [
      "Automated"
    ],
    "type": "Workforce"
  },
  {
    "id": "070",
    "name": "Robotics Engineer",
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
    "abilities": "Tap: Give any 1 Infrastructure or Fleet card the Automated keyword permanently. Automated cards don't need Workforce to operate. Once per game: deploy 1 Autonomous card from your deck directly.",
    "flavorText": "Teaching machines to replace us all.",
    "keywords": [
      "Automated"
    ],
    "type": "Workforce"
  },
  {
    "id": "071",
    "name": "Ship Captain",
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
    "abilities": "Required for Ship-subtype Fleet cards. Assigned Ship gains +1 Speed and +2 Capacity. During Combat Phase, Ship Captain has +2 Power against Piracy disruptions.",
    "flavorText": "Commander of steel, master of tides.",
    "keywords": [],
    "type": "Workforce"
  },
  {
    "id": "072",
    "name": "Pilot",
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
    "abilities": "Required for Air-subtype Fleet cards. Assigned aircraft gains +2 Speed. Air Fleet cards with Pilot ignore weather-based Disruptions. Tap: Emergency landing - save cargo from 1 destroyed air Fleet.",
    "flavorText": "Above the storms, beyond the delays.",
    "keywords": [],
    "type": "Workforce"
  },
  {
    "id": "073",
    "name": "Train Engineer",
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
    "abilities": "Required for Rail-subtype Fleet cards. Assigned train gains +2 Capacity. Tap: Couple additional cars, adding +3 Capacity to 1 Rail Fleet card for this transit.",
    "flavorText": "Miles of steel, tons of purpose.",
    "keywords": [],
    "type": "Workforce"
  },
  {
    "id": "074",
    "name": "Autonomous Vehicle AI",
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
    "abilities": "Replaces Workforce requirements for any 1 Fleet card (does not need a driver/pilot/captain). Assigned Fleet gains Automated keyword and +1 Speed. Immune to Driver Shortage disruption.",
    "flavorText": "No breaks, no sleep, no complaints.",
    "keywords": [
      "Automated"
    ],
    "type": "Workforce"
  },
  {
    "id": "075",
    "name": "The Legendary Dispatcher",
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
    "abilities": "All your Fleet cards gain +2 Speed and Rush. During Transit Phase, take 2 additional routing actions. Once per game: reroute all shipments in play to instantly fulfill 1 Contract. Legendary - limit 1 per deck.",
    "flavorText": "They say no shipment was ever late under the Dispatcher's watch.",
    "keywords": [
      "Rush",
      "Legendary"
    ],
    "type": "Workforce"
  },
  {
    "id": "076",
    "name": "Swarm of Delivery Bots",
    "subtype": "Digital",
    "rarity": "Uncommon",
    "cost": {
      "Capital": 1,
      "Labor": 0,
      "Fuel": 1,
      "Data": 1,
      "Time": 0
    },
    "stats": {
      "power": 3,
      "toughness": 1
    },
    "abilities": "Acts as both Workforce and Fleet simultaneously. Tap: Deliver up to 3 small goods tokens within your last-mile zone. Fragile: destroyed by any Combat damage. Does not need Workforce to operate.",
    "flavorText": "A thousand tiny wheels, a thousand tiny deliveries.",
    "keywords": [
      "Automated",
      "Rush",
      "Fragile"
    ],
    "type": "Workforce"
  },
  {
    "id": "077",
    "name": "Veteran Logistics General",
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
    "abilities": "All Workforce cards gain +1 Power and +1 Toughness. During Combat Phase, choose how your Workforce cards block Disruptions. Tap: Military Precision - all your operations this turn cost 1 less resource.",
    "flavorText": "Supply lines win wars. I've won three.",
    "keywords": [],
    "type": "Workforce"
  },
  {
    "id": "078",
    "name": "Gig Economy Fleet",
    "subtype": "Worker",
    "rarity": "Common",
    "cost": {
      "Capital": 1,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": {
      "power": 2,
      "toughness": 1
    },
    "abilities": "Rush: Deploys and acts immediately. Counts as both Workforce and Fleet for last-mile deliveries. Sacrifice at end of turn unless you pay 1 Capital. Cannot be assigned to Infrastructure.",
    "flavorText": "Rating: 4.8 stars. Acceptance rate: 73%.",
    "keywords": [
      "Rush",
      "Fragile"
    ],
    "type": "Workforce"
  },
  {
    "id": "079",
    "name": "Crisis Response Team",
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
    "abilities": "Flash: Deploy during any phase in response to a Disruption. When deployed, cancel 1 Disruption currently in play. Tap: Reduce damage from any Disruption by 2 this turn. Sacrifice after 3 turns.",
    "flavorText": "When everything goes wrong, we go right.",
    "keywords": [
      "Rush"
    ],
    "type": "Workforce"
  },
  {
    "id": "080",
    "name": "Quantum Logistics Savant",
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
    "abilities": "During Planning Phase, look at all face-down cards in play. All your operations happen simultaneously (no phase restrictions). Once per game: solve any Contract instantly if you have the required goods anywhere in your supply chain. Legendary - limit 1 per deck.",
    "flavorText": "Computing all possible futures, choosing the best one.",
    "keywords": [
      "Automated",
      "Legendary"
    ],
    "type": "Workforce"
  },
  {
    "id": "081",
    "name": "Inventory Auditor",
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
    "abilities": "Tap: Count all goods tokens in your supply chain. For every 5 tokens, generate 1 Data resource. Reveals hidden Counterfeit Goods in any Infrastructure you control.",
    "flavorText": "Every discrepancy tells a story.",
    "keywords": [],
    "type": "Workforce"
  },
  {
    "id": "082",
    "name": "Lean Sensei",
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
    "abilities": "All your Infrastructure cards operate at +1 efficiency (reduce resource costs by 1, minimum 0). Tap: Eliminate waste - discard 1 unnecessary goods token to draw 1 card. Kaizen Event costs 1 less to play.",
    "flavorText": "Muda, muri, mura - eliminated.",
    "keywords": [],
    "type": "Workforce"
  },
  {
    "id": "083",
    "name": "Emergency Dispatcher",
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
    "abilities": "Flash: Deploy instantly in response to a Disruption. Tap: Redirect 1 active Disruption from your Supply Zone to opponent's. During Transit Phase, grant 1 Fleet card +3 Speed for emergency routing.",
    "flavorText": "Code red means someone's about to have a very long night.",
    "keywords": [
      "Rush"
    ],
    "type": "Workforce"
  },
  {
    "id": "084",
    "name": "Sustainability Director",
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
    "abilities": "All cards with the Sustainable keyword gain +1 to all stats. Green Logistics Grant costs 0 when Sustainability Director is active. Tap: Convert 1 Fuel cost to 0 for any card this turn.",
    "flavorText": "Profit and planet, finally aligned.",
    "keywords": [
      "Sustainable"
    ],
    "type": "Workforce"
  },
  {
    "id": "085",
    "name": "The Board of Directors",
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
    "abilities": "All your cards cost 1 less Capital. During Planning Phase, draw 2 additional cards. Once per game: take an additional full turn after this one. All Contracts you fulfill grant +1 FP. Legendary - limit 1 per deck.",
    "flavorText": "The final word in every decision that matters.",
    "keywords": [
      "Legendary"
    ],
    "type": "Workforce"
  },
  {
    "id": "086",
    "name": "Box Truck",
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
    "abilities": "Standard last-mile delivery vehicle. Tap: Transport up to 2 goods tokens along any ground route to a destination Infrastructure. Requires Trucker or Driver workforce to operate.",
    "flavorText": "The workhorse of every delivery fleet.",
    "keywords": [],
    "type": "Fleet"
  },
  {
    "id": "087",
    "name": "18-Wheeler",
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
    "abilities": "Long-haul ground transport. Tap: Move up to 5 goods tokens along highways between Hubs. Requires Long-Haul Trucker workforce. Cannot access last-mile routes.",
    "flavorText": "King of the highway, lord of the lane.",
    "keywords": [],
    "type": "Fleet"
  },
  {
    "id": "088",
    "name": "Refrigerated Truck",
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
    "abilities": "Can transport perishable goods without spoilage timer advancing. Required for Cold Chain Contracts during ground transit. Tap: Deliver up to 3 perishable goods tokens.",
    "flavorText": "Keeping it cool from farm to fork.",
    "keywords": [
      "Specialized"
    ],
    "type": "Fleet"
  },
  {
    "id": "089",
    "name": "Sprinter Van",
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
    "abilities": "Rush: Can deliver on the turn it is deployed. Tap: Deliver 1 goods token to any last-mile destination. +1 Speed in urban routes. Ideal for Same-Day Delivery Contracts.",
    "flavorText": "Small, fast, everywhere at once.",
    "keywords": [
      "Rush"
    ],
    "type": "Fleet"
  },
  {
    "id": "090",
    "name": "Cargo Bicycle",
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
    "abilities": "Costs no Fuel to operate. Tap: Deliver 1 small goods token within last-mile zone. Immune to Fuel Price Spike. Cannot be affected by traffic-based Disruptions.",
    "flavorText": "Zero emissions, infinite determination.",
    "keywords": [
      "Sustainable"
    ],
    "type": "Fleet"
  },
  {
    "id": "091",
    "name": "Flatbed Trailer",
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
    "abilities": "Can carry oversized goods that other vehicles cannot. Tap: Transport up to 4 goods tokens or 1 oversized token. -1 Speed for every 3 goods tokens loaded beyond 2.",
    "flavorText": "If it's too big for a box, put it on a flatbed.",
    "keywords": [
      "Specialized"
    ],
    "type": "Fleet"
  },
  {
    "id": "092",
    "name": "Tanker Truck",
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
      "capacity": 3,
      "speed": 2
    },
    "abilities": "Can transport liquid and hazardous cargo. Required for fuel and chemical deliveries. Tap: Transport up to 3 liquid goods tokens. If destroyed, causes Contamination Event in adjacent zone.",
    "flavorText": "Handle with extreme care.",
    "keywords": [
      "Specialized",
      "Fragile"
    ],
    "type": "Fleet"
  },
  {
    "id": "093",
    "name": "Container Ship",
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
    "abilities": "Intercontinental transport. Tap: Move up to 8 goods tokens between any two Port-type Infrastructure. Takes 2 turns to arrive. Requires Ship Captain workforce.",
    "flavorText": "Three football fields of floating commerce.",
    "keywords": [],
    "type": "Fleet"
  },
  {
    "id": "094",
    "name": "Feeder Vessel",
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
    "abilities": "Connects smaller ports to Mega-Port Complex. Tap: Transport up to 4 goods tokens between coastal Infrastructure. Can access ports too small for Container Ships.",
    "flavorText": "The little ships that feed the big ones.",
    "keywords": [],
    "type": "Fleet"
  },
  {
    "id": "095",
    "name": "Cargo Airplane",
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
    "abilities": "Fastest standard transport. Tap: Deliver up to 3 goods tokens to any location in 1 turn regardless of distance. Requires Pilot workforce. Grounded by Natural Disaster disruptions.",
    "flavorText": "When time is worth more than fuel.",
    "keywords": [],
    "type": "Fleet"
  },
  {
    "id": "096",
    "name": "Freight Train",
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
    "abilities": "High-capacity ground transport along rail routes. Tap: Move up to 6 goods tokens between Rail Terminal type Infrastructure. Requires Train Engineer. Cannot deviate from rail routes.",
    "flavorText": "A mile of cars, a mountain of cargo.",
    "keywords": [],
    "type": "Fleet"
  },
  {
    "id": "097",
    "name": "High-Speed Rail",
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
    "abilities": "Premium rail transport. Tap: Move up to 3 goods tokens along rail routes at Speed 4. Can connect to Hyperloop Terminal for additional +1 Speed. Immune to traffic Disruptions.",
    "flavorText": "Bullet speed, cargo precision.",
    "keywords": [],
    "type": "Fleet"
  },
  {
    "id": "098",
    "name": "Drone Swarm",
    "subtype": "Drone",
    "rarity": "Uncommon",
    "cost": {
      "Capital": 1,
      "Labor": 0,
      "Fuel": 1,
      "Data": 1,
      "Time": 0
    },
    "stats": {
      "capacity": 3,
      "speed": 3
    },
    "abilities": "Automated: does not require Workforce to operate. Tap: Deliver up to 3 small goods tokens to any last-mile destinations simultaneously. Cannot carry items over 5kg each.",
    "flavorText": "The sky darkens with commerce.",
    "keywords": [
      "Automated",
      "Fragile"
    ],
    "type": "Fleet"
  },
  {
    "id": "099",
    "name": "River Barge",
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
    "abilities": "Cheap bulk transport along inland waterways. Tap: Move up to 6 goods tokens between Infrastructure connected by rivers. Lowest fuel cost per goods token transported.",
    "flavorText": "Slow and steady carries the tonnage.",
    "keywords": [
      "Sustainable"
    ],
    "type": "Fleet"
  },
  {
    "id": "100",
    "name": "Pipeline",
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
    "abilities": "Permanent fixed route between two Infrastructure cards. Once placed, continuously moves up to 4 liquid goods tokens per turn with no Fuel cost. Cannot be rerouted. Tap is automatic.",
    "flavorText": "Invisible, constant, essential.",
    "keywords": [
      "Automated",
      "Specialized"
    ],
    "type": "Fleet"
  },
  {
    "id": "101",
    "name": "Electric Delivery Van",
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
    "abilities": "Costs 0 Fuel to operate. Tap: Deliver up to 2 goods tokens along any ground route. Immune to Fuel Price Spike. Sustainable: counts toward Green Logistics bonus.",
    "flavorText": "Silent, clean, and on time.",
    "keywords": [
      "Sustainable"
    ],
    "type": "Fleet"
  },
  {
    "id": "102",
    "name": "Autonomous Truck",
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
    "abilities": "Automated: does not require Workforce. Tap: Transport up to 4 goods tokens along highway routes. Immune to Driver Shortage. Cannot navigate unpaved or emergency routes.",
    "flavorText": "No cab, no driver, no problem.",
    "keywords": [
      "Automated"
    ],
    "type": "Fleet"
  },
  {
    "id": "103",
    "name": "Military Convoy",
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
    "abilities": "Immune to Piracy, Cargo Theft, and all Combat damage. Tap: Transport up to 4 goods tokens through any route, ignoring Disruptions that block movement. Required for Military Resupply Contract.",
    "flavorText": "Nothing stops a convoy with armed escort.",
    "keywords": [
      "Specialized"
    ],
    "type": "Fleet"
  },
  {
    "id": "104",
    "name": "Icebreaker Freighter",
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
    "abilities": "Can navigate Arctic routes inaccessible to other ships. Tap: Transport up to 4 goods tokens via polar route, reducing transit time by 1 turn for intercontinental shipping. Immune to weather Disruptions.",
    "flavorText": "Where others see ice, we see a shortcut.",
    "keywords": [
      "Specialized"
    ],
    "type": "Fleet"
  },
  {
    "id": "105",
    "name": "Submarine Cargo Vessel",
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
    "abilities": "Cannot be targeted by Piracy or Sanctions disruptions (undetectable). Tap: Transport up to 3 goods tokens via any sea route while completely hidden. Opponents cannot see cargo contents.",
    "flavorText": "Beneath the waves, beyond the law.",
    "keywords": [
      "Specialized"
    ],
    "type": "Fleet"
  },
  {
    "id": "106",
    "name": "Zeppelin Freighter",
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
    "abilities": "Low fuel cost for air transport. Tap: Transport up to 4 goods tokens via air route at reduced speed. Can hover over destination, delivering without landing infrastructure.",
    "flavorText": "The skies are patient for those who float.",
    "keywords": [
      "Sustainable"
    ],
    "type": "Fleet"
  },
  {
    "id": "107",
    "name": "Hyperloop Pod",
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
    "abilities": "Fastest ground transport. Requires Hyperloop Terminal at both ends. Tap: Instantly deliver up to 2 goods tokens between connected Hyperloop Terminals. Automated: no Workforce needed.",
    "flavorText": "Near-vacuum speed, zero-carbon delivery.",
    "keywords": [
      "Automated"
    ],
    "type": "Fleet"
  },
  {
    "id": "108",
    "name": "Rocket Cargo",
    "subtype": "Air",
    "rarity": "Mythic Rare",
    "cost": {
      "Capital": 4,
      "Labor": 0,
      "Fuel": 3,
      "Data": 1,
      "Time": 0
    },
    "stats": {
      "capacity": 2,
      "speed": 8
    },
    "abilities": "Deliver to any location on the board in 0 transit time. Tap: Instantly deliver up to 2 goods tokens anywhere, bypassing all routes and Disruptions. Single use: sacrifice after activation.",
    "flavorText": "Point-to-point, pole-to-pole, in thirty minutes.",
    "keywords": [
      "Rush",
      "Fragile"
    ],
    "type": "Fleet"
  },
  {
    "id": "109",
    "name": "Mega-Container Ship",
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
    "abilities": "Largest cargo capacity in the game. Tap: Transport up to 12 goods tokens between Mega-Port Complexes. Takes 3 turns to arrive. If Suez Canal Blockage is active, cannot move.",
    "flavorText": "Twenty thousand containers, one destination.",
    "keywords": [],
    "type": "Fleet"
  },
  {
    "id": "110",
    "name": "Convoy Formation",
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
    "abilities": "Counts as multiple trucks traveling together. Tap: Transport up to 8 goods tokens along highway routes. All goods in convoy share protection - Cargo Theft only affects 1 token instead of all.",
    "flavorText": "Strength in numbers, efficiency in formation.",
    "keywords": [],
    "type": "Fleet"
  },
  {
    "id": "111",
    "name": "Amphibious Transport",
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
    "abilities": "Can use both ground and water routes. Tap: Transport up to 3 goods tokens, switching between land and sea routes mid-transit without stopping at transfer points.",
    "flavorText": "Where roads end, it keeps going.",
    "keywords": [],
    "type": "Fleet"
  },
  {
    "id": "112",
    "name": "Mag-Lev Cargo Sled",
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
    "abilities": "Automated: no Workforce needed. Tap: Transport up to 3 goods tokens at extreme speed along magnetic rail routes. Zero friction means zero Fuel cost. Requires dedicated rail infrastructure.",
    "flavorText": "Floating on magnetic fields at 500 mph.",
    "keywords": [
      "Automated",
      "Specialized"
    ],
    "type": "Fleet"
  },
  {
    "id": "113",
    "name": "Horse and Cart",
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
    "abilities": "Costs nothing to deploy or operate. Tap: Transport 1 goods token along any ground route. Immune to Fuel Price Spike, Cyber Attack, and IT System Failure. The original delivery vehicle.",
    "flavorText": "Tried, true, and still delivering.",
    "keywords": [
      "Sustainable"
    ],
    "type": "Fleet"
  },
  {
    "id": "114",
    "name": "Flying Warehouse",
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
    "abilities": "Acts as both Fleet AND Infrastructure simultaneously. Stores up to 6 goods tokens while airborne. Tap: Deploy goods to any ground location below. Can reposition each Transit Phase to optimize delivery range.",
    "flavorText": "The warehouse that comes to you.",
    "keywords": [
      "Automated",
      "Hub"
    ],
    "type": "Fleet"
  },
  {
    "id": "115",
    "name": "Ghost Fleet",
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
    "abilities": "Cannot be targeted by any Disruption or opponent ability (phased out). Tap: Transport up to 10 goods tokens via sea route. Goods loaded on Ghost Fleet are hidden from all opponents until delivered.",
    "flavorText": "Ships that sail unseen, cargo that arrives unannounced.",
    "keywords": [
      "Automated",
      "Legendary"
    ],
    "type": "Fleet"
  },
  {
    "id": "116",
    "name": "Tugboat",
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
    "abilities": "Tap: Assist 1 Ship-subtype Fleet card, granting it +1 Speed this turn. Can tow disabled Ships back to port. When Container Ship or Mega-Container Ship is blocked, Tugboat can clear the route.",
    "flavorText": "Small but mighty, the harbor's unsung hero.",
    "keywords": [],
    "type": "Fleet"
  },
  {
    "id": "117",
    "name": "Convoy Escort",
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
    "abilities": "Cannot carry goods but protects other Fleet cards. Assign to any Fleet card: that card becomes immune to Piracy, Cargo Theft, and Combat damage. Tap: Block 1 Disruption targeting a Fleet card in your zone.",
    "flavorText": "No cargo, all protection.",
    "keywords": [],
    "type": "Fleet"
  },
  {
    "id": "118",
    "name": "Autonomous Drone Mothership",
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
    "abilities": "Automated: no Workforce needed. Carries and deploys Drone-subtype Fleet cards. Tap: Launch up to 3 drone deliveries from current position, each delivering 1 goods token to separate destinations within range.",
    "flavorText": "One ship, a hundred deliveries.",
    "keywords": [
      "Automated",
      "Hub"
    ],
    "type": "Fleet"
  },
  {
    "id": "119",
    "name": "Bicycle Courier Network",
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
    "abilities": "Costs no Fuel. Tap: Deliver up to 3 small goods tokens within urban last-mile zone. Immune to all traffic and fuel Disruptions. Counts as Sustainable for Green Logistics bonuses.",
    "flavorText": "Pedal power moves the city.",
    "keywords": [
      "Sustainable"
    ],
    "type": "Fleet"
  },
  {
    "id": "120",
    "name": "Teleportation Array",
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
    "abilities": "Requires Teleportation Array at both origin and destination. Tap: Instantly transport up to 4 goods tokens between Arrays with no transit time, no fuel cost, and complete Disruption immunity. Legendary - limit 1 per deck.",
    "flavorText": "The final evolution of logistics: making distance irrelevant.",
    "keywords": [
      "Automated",
      "Legendary"
    ],
    "type": "Fleet"
  },
  {
    "id": "121",
    "name": "Rush Shipment",
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
    "abilities": "Instant: Play during Transit Phase. Target Fleet card gains +3 Speed and Rush this turn. That shipment arrives 1 turn early. Draw 1 card.",
    "flavorText": "Pay more, arrive sooner. Simple math.",
    "keywords": [
      "Rush"
    ],
    "type": "Operations"
  },
  {
    "id": "122",
    "name": "Bulk Discount",
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
    "abilities": "During Procurement Phase, purchase up to 4 goods tokens from Global Market at half cost (rounded up). Goods must all be the same type. Cannot be used with Negotiator bonus.",
    "flavorText": "Volume has its privileges.",
    "keywords": [],
    "type": "Operations"
  },
  {
    "id": "123",
    "name": "Demand Forecast",
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
    "abilities": "Look at the top 5 cards of the Contract deck. Put 1 on top and the rest on the bottom in any order. Draw 1 card from your deck. Knowledge is preparation.",
    "flavorText": "Knowing what they'll want before they want it.",
    "keywords": [],
    "type": "Operations"
  },
  {
    "id": "124",
    "name": "Just-In-Time Delivery",
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
    "abilities": "Until end of turn, your Infrastructure cards do not need stored goods to fulfill Contracts. Goods in transit count as delivered if they will arrive within 1 turn. Gain +1 FP for each Contract fulfilled this way.",
    "flavorText": "Not a moment too soon, not a cent in excess.",
    "keywords": [],
    "type": "Operations"
  },
  {
    "id": "125",
    "name": "Safety Stock",
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
    "abilities": "Place 3 goods tokens from Global Market into any Infrastructure you control. These tokens cannot be used for Contracts but prevent Demand Collapse from affecting you for 3 turns.",
    "flavorText": "Buffer against the unknown.",
    "keywords": [],
    "type": "Operations"
  },
  {
    "id": "126",
    "name": "Overtime Shift",
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
    "abilities": "Untap all Workforce cards you control. They may be used again this turn. Each Workforce card used during Overtime gains -1 Toughness permanently. Draw 1 card.",
    "flavorText": "Double time, double pay, double output.",
    "keywords": [],
    "type": "Operations"
  },
  {
    "id": "127",
    "name": "Emergency Reroute",
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
    "abilities": "Instant: Play when a Disruption blocks a route. Redirect 1 Fleet card to an alternate route, avoiding the Disruption. The Fleet card loses 1 Speed this turn but arrives safely.",
    "flavorText": "When plan A fails, engage plan B through Z.",
    "keywords": [],
    "type": "Operations"
  },
  {
    "id": "128",
    "name": "Consolidation",
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
    "abilities": "Combine goods from up to 3 different Fleet cards into 1 Fleet card (up to its Capacity). The consolidated shipment gains +1 effective value toward Contract fulfillment. Return empty Fleet cards to Supply Zone.",
    "flavorText": "Fewer trips, fuller trucks, lower costs.",
    "keywords": [],
    "type": "Operations"
  },
  {
    "id": "129",
    "name": "Track and Trace",
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
    "abilities": "All your goods tokens in transit become visible and tracked. Tracked goods cannot be affected by Cargo Theft or Counterfeit Goods disruptions. Lasts until end of next turn. Draw 1 card.",
    "flavorText": "Scanned, tracked, verified. Every step of the way.",
    "keywords": [],
    "type": "Operations"
  },
  {
    "id": "130",
    "name": "Insurance Claim",
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
    "abilities": "Play after a Disruption destroys goods tokens or Infrastructure. Recover Capital equal to the destroyed card's original cost. Draw 2 cards. Cannot be played if Disruption was Piracy.",
    "flavorText": "At least someone's paying for this mess.",
    "keywords": [],
    "type": "Operations"
  },
  {
    "id": "131",
    "name": "Lean Inventory",
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
    "abilities": "Discard all goods tokens from 1 Infrastructure you control. For each discarded token, generate 1 resource of any type. That Infrastructure gains +2 Capacity for the rest of the game.",
    "flavorText": "Less stock, more flow, maximum value.",
    "keywords": [],
    "type": "Operations"
  },
  {
    "id": "132",
    "name": "Vendor Managed Inventory",
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
    "abilities": "Choose 1 Infrastructure. For the next 3 turns, it automatically restocks from Global Market during Procurement Phase at no cost (1 goods token per turn). You cannot manually add goods to it.",
    "flavorText": "Let the supplier worry about stock levels.",
    "keywords": [
      "Automated"
    ],
    "type": "Operations"
  },
  {
    "id": "133",
    "name": "Split Shipment",
    "subtype": "Tactic",
    "rarity": "Common",
    "cost": {
      "Capital": 0,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": null,
    "abilities": "Divide goods from 1 Fleet card across 2 different Fleet cards. Each partial shipment can go to a different destination. Both shipments count toward the same Contract if applicable.",
    "flavorText": "Don't put all your eggs in one container.",
    "keywords": [],
    "type": "Operations"
  },
  {
    "id": "134",
    "name": "Nearshoring Initiative",
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
    "abilities": "Permanently reduce transit time by 1 turn for all shipments between your Infrastructure cards. Does not stack. All your Fleet cards are considered 1 link closer to their destinations.",
    "flavorText": "Bring production closer, reduce risk further.",
    "keywords": [],
    "type": "Operations"
  },
  {
    "id": "135",
    "name": "Dynamic Pricing",
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
    "abilities": "When fulfilling a Contract this turn, gain +2 additional FP if completed on the same turn it was drawn. If not completed this turn, the Contract's FP reward decreases by 1.",
    "flavorText": "The right price at the right moment.",
    "keywords": [],
    "type": "Operations"
  },
  {
    "id": "136",
    "name": "Surge Capacity",
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
    "abilities": "Until end of turn, all your Infrastructure cards gain +3 Capacity and all Fleet cards gain +2 Capacity. At end of turn, discard 1 goods token from each Infrastructure used at surge capacity.",
    "flavorText": "Push past limits, deal with consequences later.",
    "keywords": [],
    "type": "Operations"
  },
  {
    "id": "137",
    "name": "Trade Lane Agreement",
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
    "abilities": "Establish a permanent trade lane between 2 Infrastructure cards. Fleet cards traveling this route gain +2 Speed and -1 Fuel cost. Only 1 Trade Lane Agreement can be active at a time.",
    "flavorText": "Preferred routes for preferred partners.",
    "keywords": [],
    "type": "Operations"
  },
  {
    "id": "138",
    "name": "Fuel Hedge",
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
    "abilities": "For the next 5 turns, you are immune to Fuel Price Spike disruptions. All your Fuel costs are locked at current rates. If no Fuel Price Spike occurs, gain 2 Capital at end of duration.",
    "flavorText": "Betting against volatility, locking in stability.",
    "keywords": [],
    "type": "Operations"
  },
  {
    "id": "139",
    "name": "Digital Twin Simulation",
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
    "abilities": "Look at all face-down cards and the top 5 cards of all decks. Rearrange the top 3 cards of your own deck. You may play 1 additional Operations card this turn at no cost.",
    "flavorText": "Test every scenario before committing a single truck.",
    "keywords": [
      "Automated"
    ],
    "type": "Operations"
  },
  {
    "id": "140",
    "name": "Warehouse Blitz",
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
    "abilities": "Untap all Infrastructure cards you control. Each may perform 1 additional loading/unloading action this turn. All goods moved this turn gain +1 value toward Contract fulfillment.",
    "flavorText": "All hands on deck, all bays active, all systems go.",
    "keywords": [
      "Rush"
    ],
    "type": "Operations"
  },
  {
    "id": "141",
    "name": "Reverse Auction",
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
    "abilities": "When deploying a Fleet card this turn, reduce its Capital cost by 2 (minimum 0). The Fleet card enters play tapped. Draw 1 card.",
    "flavorText": "Who wants the contract? Going down: five, four, three...",
    "keywords": [],
    "type": "Operations"
  },
  {
    "id": "142",
    "name": "Backhaul Optimization",
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
    "abilities": "When a Fleet card delivers goods and would return empty, load it with up to its Capacity in goods from the destination Infrastructure. These goods may be delivered to their origin on the return trip.",
    "flavorText": "An empty truck is a wasted opportunity.",
    "keywords": [],
    "type": "Operations"
  },
  {
    "id": "143",
    "name": "Emergency Procurement",
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
    "abilities": "Instant: Play during any phase. Immediately acquire up to 3 goods tokens of any type from Global Market and place them in any Infrastructure you control. Costs 1 extra Capital per token.",
    "flavorText": "Money talks when deadlines loom.",
    "keywords": [
      "Rush"
    ],
    "type": "Operations"
  },
  {
    "id": "144",
    "name": "Load Balancing",
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
    "abilities": "Redistribute all goods tokens among your Infrastructure cards in any way you choose (respecting Capacity limits). Each Infrastructure with exactly half capacity filled gains +1 efficiency bonus this turn.",
    "flavorText": "Even distribution, optimal performance.",
    "keywords": [],
    "type": "Operations"
  },
  {
    "id": "145",
    "name": "Carrier Rate Lock",
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
    "abilities": "For the next 4 turns, all your Fleet card Fuel costs are reduced by 1 (minimum 0). Does not stack with other cost reductions. If Fuel Price Spike occurs during this time, you are unaffected.",
    "flavorText": "Locked in while others scramble.",
    "keywords": [],
    "type": "Operations"
  },
  {
    "id": "146",
    "name": "Supply Chain Visibility",
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
    "abilities": "Reveal all opponents' hands and face-down cards for 2 turns. All your goods gain tracking protection (immune to Cargo Theft, Counterfeit Goods). You may respond to opponent actions with Instants before they resolve.",
    "flavorText": "See everything, anticipate everything.",
    "keywords": [],
    "type": "Operations"
  },
  {
    "id": "147",
    "name": "Green Logistics Grant",
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
    "abilities": "Gain 2 Capital immediately. For each card with the Sustainable keyword you control, gain 1 additional Capital. All Sustainable cards you control gain +1 to their primary stat until end of game.",
    "flavorText": "Doing good and doing well, simultaneously.",
    "keywords": [
      "Sustainable"
    ],
    "type": "Operations"
  },
  {
    "id": "148",
    "name": "Reshoring",
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
    "abilities": "Deploy 1 Infrastructure card from your hand at half cost (rounded up). That Infrastructure is considered domestic - all routes to it are 1 turn shorter. Immune to Tariff War and Sanctions.",
    "flavorText": "Bringing it all back home.",
    "keywords": [],
    "type": "Operations"
  },
  {
    "id": "149",
    "name": "Predictive Analytics",
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
    "abilities": "Look at the next 5 cards you would draw. Take any 2 into your hand and put the rest back in any order. For 3 turns, you may play 1 card face-down (hidden from opponents) before revealing it.",
    "flavorText": "The future is calculable for those with enough data.",
    "keywords": [
      "Automated"
    ],
    "type": "Operations"
  },
  {
    "id": "150",
    "name": "Six Sigma Black Belt",
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
    "abilities": "Permanently remove 1 inefficiency from your supply chain: choose either +1 Capacity to all Infrastructure, +1 Speed to all Fleet, or -1 cost to all Operations. Cannot be reversed or duplicated.",
    "flavorText": "3.4 defects per million. Perfection is a process.",
    "keywords": [],
    "type": "Operations"
  },
  {
    "id": "151",
    "name": "Force Majeure Clause",
    "subtype": "Tactic",
    "rarity": "Uncommon",
    "cost": {
      "Capital": 0,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": null,
    "abilities": "Instant: Play when a Disruption would cause you to fail a Contract. The Contract is suspended (not failed) for 2 turns instead. Resume fulfillment when Disruption ends. No FP penalty.",
    "flavorText": "The clause nobody reads until everything falls apart.",
    "keywords": [],
    "type": "Operations"
  },
  {
    "id": "152",
    "name": "Multimodal Transfer",
    "subtype": "Tactic",
    "rarity": "Common",
    "cost": {
      "Capital": 0,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": null,
    "abilities": "Transfer goods between any 2 Fleet cards at any Hub Infrastructure without spending a Transit Phase action. Both Fleet cards gain +1 Speed until end of turn.",
    "flavorText": "Ship to rail to truck in one seamless motion.",
    "keywords": [],
    "type": "Operations"
  },
  {
    "id": "153",
    "name": "White Glove Service",
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
    "abilities": "1 goods token delivered this turn is worth triple toward Contract fulfillment. That delivery is immune to all Disruptions during transit. Gain +1 FP bonus if Contract is luxury-tier.",
    "flavorText": "Premium care for premium cargo.",
    "keywords": [
      "Specialized"
    ],
    "type": "Operations"
  },
  {
    "id": "154",
    "name": "Total Quality Management",
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
    "abilities": "Permanently: all goods produced by your Infrastructure gain the Inspected quality. Inspected goods are immune to Contamination and Counterfeit disruptions and are worth +1 toward all Contracts.",
    "flavorText": "Quality is not an act, it is a habit.",
    "keywords": [],
    "type": "Operations"
  },
  {
    "id": "155",
    "name": "Strategic Reserve Release",
    "subtype": "Tactic",
    "rarity": "Rare",
    "cost": {
      "Capital": 0,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": null,
    "abilities": "Gain 3 of any single resource type immediately. OR gain 1 of each resource type. Can only be played once per game. If played during Procurement Phase, double the gained resources.",
    "flavorText": "Break glass in case of emergency.",
    "keywords": [],
    "type": "Operations"
  },
  {
    "id": "156",
    "name": "Agile Pivot",
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
    "abilities": "Instant: Change the destination of 1 shipment currently in transit. Redirect to any valid Infrastructure without resetting transit timer. The goods adapt to the new Contract requirements.",
    "flavorText": "The plan changed. So did we.",
    "keywords": [],
    "type": "Operations"
  },
  {
    "id": "157",
    "name": "Supply Chain Finance",
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
    "abilities": "Immediately gain 4 Capital. However, for the next 3 turns, 1 Capital from each Procurement Phase goes to paying interest. Net gain: 1 Capital. Allows early deployment of expensive cards.",
    "flavorText": "Borrow from the future to build the present.",
    "keywords": [],
    "type": "Operations"
  },
  {
    "id": "158",
    "name": "Kaizen Event",
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
    "abilities": "Choose 1 Infrastructure card. It permanently gains +2 Capacity and its Workforce requirements are reduced by 1. If Lean Sensei is active, also draw 2 cards.",
    "flavorText": "Continuous improvement is infinite opportunity.",
    "keywords": [],
    "type": "Operations"
  },
  {
    "id": "159",
    "name": "The Bullwhip Crack",
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
    "abilities": "Target all opponents: their Demand Forecasts are inverted for 3 turns (goods they produce go to wrong destinations). Your supply chain gains perfect information - see all opponents' planned actions. Draw 3 cards.",
    "flavorText": "A small fluctuation at retail becomes a tsunami at the source.",
    "keywords": [],
    "type": "Operations"
  },
  {
    "id": "160",
    "name": "Omniscient Orchestration",
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
    "abilities": "For 3 turns: all your operations cost 0 resources, all Fleet have +3 Speed, all Infrastructure has +3 Capacity, and you take 2 additional actions each phase. Legendary - limit 1 per deck. Exile after use.",
    "flavorText": "When the entire supply chain moves as one perfect organism.",
    "keywords": [
      "Automated",
      "Legendary"
    ],
    "type": "Operations"
  },
  {
    "id": "161",
    "name": "Port Workers Strike",
    "subtype": "Event",
    "rarity": "Common",
    "cost": {
      "Capital": 0,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": null,
    "abilities": "All Port and Dock-type Infrastructure cards are disabled for 2 turns. Ship-subtype Fleet cards cannot load or unload during this time. Players with Union Steward reduce duration to 1 turn.",
    "flavorText": "Solidarity shuts down the world's ports.",
    "keywords": [],
    "type": "Disruptions"
  },
  {
    "id": "162",
    "name": "Suez Canal Blockage",
    "subtype": "Event",
    "rarity": "Rare",
    "cost": {
      "Capital": 0,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": null,
    "abilities": "All Ship-subtype Fleet cards in transit add 3 turns to their arrival time OR must reroute at double Fuel cost. Lasts 2 turns. Icebreaker Freighters are unaffected.",
    "flavorText": "One ship sideways, and the world holds its breath.",
    "keywords": [],
    "type": "Disruptions"
  },
  {
    "id": "163",
    "name": "Cyber Attack",
    "subtype": "Event",
    "rarity": "Uncommon",
    "cost": {
      "Capital": 0,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": null,
    "abilities": "All cards with the Automated keyword are disabled for 2 turns. Digital-subtype Infrastructure cannot generate Data resources. Blockchain Ledger Node is destroyed if unprotected.",
    "flavorText": "The screens go dark, the conveyors stop.",
    "keywords": [],
    "type": "Disruptions"
  },
  {
    "id": "164",
    "name": "Tariff War",
    "subtype": "Event",
    "rarity": "Uncommon",
    "cost": {
      "Capital": 0,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": null,
    "abilities": "All international shipments cost +2 Capital per goods token for 3 turns. Players must pay the tariff or return goods to origin. Free Trade Zone Infrastructure is exempt.",
    "flavorText": "Borders become walls, costs become cliffs.",
    "keywords": [],
    "type": "Disruptions"
  },
  {
    "id": "165",
    "name": "Fuel Price Spike",
    "subtype": "Event",
    "rarity": "Common",
    "cost": {
      "Capital": 0,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": null,
    "abilities": "All Fuel costs are doubled for 3 turns. Fleet cards with Fuel cost 3+ cannot be activated unless player pays the premium. Electric and Sustainable vehicles are unaffected.",
    "flavorText": "The price at the pump just broke the budget.",
    "keywords": [],
    "type": "Disruptions"
  },
  {
    "id": "166",
    "name": "Cargo Theft",
    "subtype": "Event",
    "rarity": "Common",
    "cost": {
      "Capital": 0,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": null,
    "abilities": "Target player discards 2 goods tokens from any Fleet card currently in transit. If goods are tracked (Track and Trace active), only 1 token is stolen. Security Guard prevents this entirely.",
    "flavorText": "Vanished between waypoints. No witnesses.",
    "keywords": [],
    "type": "Disruptions"
  },
  {
    "id": "167",
    "name": "Piracy",
    "subtype": "Event",
    "rarity": "Uncommon",
    "cost": {
      "Capital": 0,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": null,
    "abilities": "Target 1 Ship-subtype Fleet card. It must engage in Combat: Power 3, Toughness 2. If the ship loses, all goods are discarded and the ship is disabled for 2 turns. Military Convoy is immune.",
    "flavorText": "Black flags on the horizon.",
    "keywords": [],
    "type": "Disruptions"
  },
  {
    "id": "168",
    "name": "Contamination Event",
    "subtype": "Event",
    "rarity": "Uncommon",
    "cost": {
      "Capital": 0,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": null,
    "abilities": "Target 1 Infrastructure. All goods tokens stored there become contaminated and must be discarded unless Quality Inspector or Pharmaceutical Clean Room is present. Spreads to adjacent Infrastructure next turn if not contained.",
    "flavorText": "One breach, and the whole batch is compromised.",
    "keywords": [],
    "type": "Disruptions"
  },
  {
    "id": "169",
    "name": "Natural Disaster",
    "subtype": "Event",
    "rarity": "Uncommon",
    "cost": {
      "Capital": 0,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": null,
    "abilities": "Destroy 1 target Infrastructure card and all goods stored there. All Fleet cards within 1 route of the destroyed Infrastructure are delayed 2 turns. Underground Bunker Vault is immune.",
    "flavorText": "Nature reminds us who truly holds power.",
    "keywords": [],
    "type": "Disruptions"
  },
  {
    "id": "170",
    "name": "Regulatory Fine",
    "subtype": "Event",
    "rarity": "Common",
    "cost": {
      "Capital": 0,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": null,
    "abilities": "Target player loses 3 Capital immediately. If they cannot pay, they must sacrifice 1 Infrastructure card instead. Compliance Officer prevents this entirely.",
    "flavorText": "The audit found violations. The fine is non-negotiable.",
    "keywords": [],
    "type": "Disruptions"
  },
  {
    "id": "171",
    "name": "Pandemic Lockdown",
    "subtype": "Event",
    "rarity": "Rare",
    "cost": {
      "Capital": 0,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": null,
    "abilities": "All Workforce cards without the Automated keyword are disabled for 3 turns (workers stay home). Infrastructure capacity halved. Only Automated and Digital operations continue normally.",
    "flavorText": "The world stops turning, but goods must still flow.",
    "keywords": [],
    "type": "Disruptions"
  },
  {
    "id": "172",
    "name": "Demand Collapse",
    "subtype": "Event",
    "rarity": "Common",
    "cost": {
      "Capital": 0,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": null,
    "abilities": "All active Contracts are worth -1 FP (minimum 1) for 2 turns. Safety Stock goods tokens cannot be used. Overproduced goods spoil: discard 1 goods token from each Infrastructure at full capacity.",
    "flavorText": "The orders stopped. The warehouses fill.",
    "keywords": [],
    "type": "Disruptions"
  },
  {
    "id": "173",
    "name": "Driver Shortage",
    "subtype": "Event",
    "rarity": "Common",
    "cost": {
      "Capital": 0,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": null,
    "abilities": "All Vehicle-subtype Fleet cards without assigned Workforce cannot be activated for 2 turns. Autonomous vehicles and Automated Fleet are unaffected. Players may pay +2 Labor per Fleet card to override.",
    "flavorText": "Nobody behind the wheel means nothing moves.",
    "keywords": [],
    "type": "Disruptions"
  },
  {
    "id": "174",
    "name": "Customs Seizure",
    "subtype": "Event",
    "rarity": "Common",
    "cost": {
      "Capital": 0,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": null,
    "abilities": "Target 1 international shipment. All goods on that Fleet card are seized (removed from game) unless player has Customs Agent or pays 3 Capital fine. Bonded Warehouse goods are exempt.",
    "flavorText": "Detained at the border. Paperwork insufficient.",
    "keywords": [],
    "type": "Disruptions"
  },
  {
    "id": "175",
    "name": "Warehouse Fire",
    "subtype": "Event",
    "rarity": "Uncommon",
    "cost": {
      "Capital": 0,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": null,
    "abilities": "Target 1 Storage-subtype Infrastructure. Destroy half its stored goods tokens (rounded up). The Infrastructure is disabled for 1 turn. Hazmat goods destroyed this way trigger secondary Contamination Event.",
    "flavorText": "Alarms ring, sprinklers fail, inventory burns.",
    "keywords": [],
    "type": "Disruptions"
  },
  {
    "id": "176",
    "name": "Shipping Container Shortage",
    "subtype": "Event",
    "rarity": "Uncommon",
    "cost": {
      "Capital": 0,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": null,
    "abilities": "All Ship-subtype Fleet cards have their Capacity halved (rounded down) for 3 turns. Container Port throughput reduced by 50%. Players with Mega-Port Complex reduce duration to 2 turns.",
    "flavorText": "The boxes are all in the wrong places.",
    "keywords": [],
    "type": "Disruptions"
  },
  {
    "id": "177",
    "name": "Counterfeit Goods",
    "subtype": "Event",
    "rarity": "Common",
    "cost": {
      "Capital": 0,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": null,
    "abilities": "Replace 2 goods tokens in target player's Infrastructure with counterfeit tokens (look identical). Counterfeit goods cause Contract failure when delivered. Quality Inspector reveals and removes counterfeits.",
    "flavorText": "Identical on the outside, worthless on the inside.",
    "keywords": [],
    "type": "Disruptions"
  },
  {
    "id": "178",
    "name": "Black Swan Event",
    "subtype": "Event",
    "rarity": "Mythic Rare",
    "cost": {
      "Capital": 0,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": null,
    "abilities": "All players simultaneously: discard top 3 cards of their decks, lose 2 resources of each type, and all Fleet cards in transit are delayed 2 turns. The player with fewest Disruptions in discard pile draws 3 cards.",
    "flavorText": "The thing that couldn't happen just did.",
    "keywords": [],
    "type": "Disruptions"
  },
  {
    "id": "179",
    "name": "Sanctions",
    "subtype": "Event",
    "rarity": "Uncommon",
    "cost": {
      "Capital": 0,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": null,
    "abilities": "Choose 1 type of goods. That goods type cannot be traded, transported, or used for Contract fulfillment for 3 turns across all players. Submarine Cargo Vessel ignores this restriction.",
    "flavorText": "By order of government, this trade route is closed.",
    "keywords": [],
    "type": "Disruptions"
  },
  {
    "id": "180",
    "name": "IT System Failure",
    "subtype": "Event",
    "rarity": "Common",
    "cost": {
      "Capital": 0,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": null,
    "abilities": "All Digital-subtype Infrastructure disabled for 1 turn. Data resource generation stopped for 2 turns. Cards requiring Data to operate are suspended. Blockchain Ledger Node prevents this for its controller.",
    "flavorText": "Error 500: Supply chain not found.",
    "keywords": [],
    "type": "Disruptions"
  },
  {
    "id": "181",
    "name": "Earthquake",
    "subtype": "Event",
    "rarity": "Uncommon",
    "cost": {
      "Capital": 0,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": null,
    "abilities": "Destroy 1 Infrastructure card. All Infrastructure within 1 link takes damage: -2 Capacity for 2 turns. Ground-based Fleet cards in the area are delayed 2 turns. Underground Bunker Vault survives.",
    "flavorText": "The ground splits, foundations crumble.",
    "keywords": [],
    "type": "Disruptions"
  },
  {
    "id": "182",
    "name": "Union Negotiation Breakdown",
    "subtype": "Event",
    "rarity": "Uncommon",
    "cost": {
      "Capital": 0,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": null,
    "abilities": "All Worker-subtype Workforce cards go on strike for 2 turns (cannot be tapped or used). Specialists and Executives are unaffected. Pay +3 Capital to end strike 1 turn early.",
    "flavorText": "Talks broke down at 2 AM. The picket line formed at 6.",
    "keywords": [],
    "type": "Disruptions"
  },
  {
    "id": "183",
    "name": "Chip Shortage",
    "subtype": "Event",
    "rarity": "Rare",
    "cost": {
      "Capital": 0,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": null,
    "abilities": "All Automated cards lose their keyword for 3 turns (require Workforce to operate). Chip Fabrication Plant is shut down. Electronics-related Contracts cannot be fulfilled. Data generation reduced by half.",
    "flavorText": "A fingernail-sized component holds the world hostage.",
    "keywords": [],
    "type": "Disruptions"
  },
  {
    "id": "184",
    "name": "Supply Chain Cascade Failure",
    "subtype": "Event",
    "rarity": "Mythic Rare",
    "cost": {
      "Capital": 0,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": null,
    "abilities": "Chain reaction: each player reveals top card of deck. If it's Infrastructure, that card is destroyed. If Fleet, it's delayed 3 turns. If Workforce, it's disabled 2 turns. If Operations, it's discarded. Repeats once for each Disruption already in play.",
    "flavorText": "One failure begets another, begets another, begets collapse.",
    "keywords": [],
    "type": "Disruptions"
  },
  {
    "id": "185",
    "name": "Acts of God",
    "subtype": "Event",
    "rarity": "Mythic Rare",
    "cost": {
      "Capital": 0,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": null,
    "abilities": "All players simultaneously lose their highest-cost Infrastructure card and highest-Capacity Fleet card. All Contracts in play have their deadlines extended by 2 turns. Cannot be prevented by any card effect except Force Majeure Clause.",
    "flavorText": "Beyond human control, beyond human preparation.",
    "keywords": [
      "Legendary"
    ],
    "type": "Disruptions"
  },
  {
    "id": "186",
    "name": "Same-Day Delivery",
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
    "abilities": "Deliver using a Fleet with Speed 3 or higher. A fast courier is all you need to close this deal.",
    "flavorText": "Ordered at breakfast, delivered by dinner.",
    "keywords": [
      "Rush"
    ],
    "requirements": {
      "fleetSpeed": 3
    },
    "fpReward": 2,
    "type": "Contracts"
  },
  {
    "id": "187",
    "name": "Bulk Grain Export",
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
    "abilities": "Deliver using a Fleet with total capacity of 4 or more routed through a Hub-type Infrastructure. Large volume, simple logistics.",
    "flavorText": "Feeding a nation across the ocean.",
    "keywords": [],
    "requirements": {
      "fleetCapacity": 4,
      "infrastructure": [
        "Hub"
      ]
    },
    "fpReward": 2,
    "type": "Contracts"
  },
  {
    "id": "188",
    "name": "Cold Chain Pharmaceuticals",
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
    "abilities": "Deliver using a Vehicle-subtype Fleet while Cold Storage Unit is in your Source Zone. Temperature-sensitive cargo requires specialized handling.",
    "flavorText": "2 to 8 degrees Celsius. Not one degree more.",
    "keywords": [
      "Specialized"
    ],
    "requirements": {
      "infrastructure": [
        "Cold Storage Unit"
      ],
      "fleetType": "Vehicle",
      "fleetCapacity": 3
    },
    "fpReward": 3,
    "type": "Contracts"
  },
  {
    "id": "189",
    "name": "E-Commerce Rush",
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
    "abilities": "Deliver using 2 separate Fleet cards in the Customer Zone. Multiple deliveries happening in parallel to meet demand.",
    "flavorText": "Add to cart, buy now, where is my package?",
    "keywords": [
      "Rush"
    ],
    "requirements": {
      "fleetCards": 2
    },
    "fpReward": 2,
    "type": "Contracts"
  },
  {
    "id": "190",
    "name": "Military Resupply",
    "subtype": "Contract",
    "rarity": "Uncommon",
    "cost": {
      "Capital": 1,
      "Labor": 1,
      "Fuel": 1,
      "Data": 0,
      "Time": 0
    },
    "stats": null,
    "abilities": "Deliver using a Vehicle-subtype Fleet with capacity 5+ and at least 2 Workforce cards deployed. Heavy logistics requiring manpower and heavy vehicles.",
    "flavorText": "Failure is not an option. Literally.",
    "keywords": [
      "Specialized"
    ],
    "requirements": {
      "fleetType": "Vehicle",
      "fleetCapacity": 5,
      "workforce": 2
    },
    "fpReward": 3,
    "type": "Contracts"
  },
  {
    "id": "191",
    "name": "Luxury White Glove",
    "subtype": "Contract",
    "rarity": "Uncommon",
    "cost": {
      "Capital": 2,
      "Labor": 1,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": null,
    "abilities": "Deliver using a Fleet with Speed 2+ while you have at least 1 Workforce with 'Specialist' subtype deployed. Careful handling by trained professionals.",
    "flavorText": "Handle as if it were made of dreams and crystal.",
    "keywords": [
      "Specialized"
    ],
    "requirements": {
      "fleetSpeed": 2,
      "workforce": [
        "Specialist"
      ]
    },
    "fpReward": 2,
    "type": "Contracts"
  },
  {
    "id": "192",
    "name": "Global Electronics Launch",
    "subtype": "Contract",
    "rarity": "Rare",
    "cost": {
      "Capital": 2,
      "Labor": 0,
      "Fuel": 1,
      "Data": 1,
      "Time": 0
    },
    "stats": null,
    "abilities": "Deliver using an Air-subtype Fleet with capacity 4+ while a Digital-type Infrastructure is in play. High-tech coordination for a worldwide product launch.",
    "flavorText": "Midnight launches across every timezone.",
    "keywords": [],
    "requirements": {
      "infrastructure": [
        "Digital"
      ],
      "fleetType": "Air",
      "fleetCapacity": 4
    },
    "fpReward": 3,
    "type": "Contracts"
  },
  {
    "id": "193",
    "name": "Humanitarian Aid",
    "subtype": "Contract",
    "rarity": "Common",
    "cost": {
      "Capital": 0,
      "Labor": 0,
      "Fuel": 0,
      "Data": 0,
      "Time": 0
    },
    "stats": null,
    "abilities": "Deliver using any Fleet card. No special requirements - just get supplies to those in need. The simplest contract with the greatest impact.",
    "flavorText": "When profit pauses for compassion.",
    "keywords": [
      "Rush"
    ],
    "requirements": {
      "fleetCapacity": 1
    },
    "fpReward": 2,
    "type": "Contracts"
  },
  {
    "id": "194",
    "name": "Subscription Box",
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
    "abilities": "Deliver using a Fleet with Speed 2+ and a Storage-type Infrastructure in your Source Zone. Regular deliveries need reliable storage and moderate speed.",
    "flavorText": "Monthly surprises, quarterly revenue.",
    "keywords": [],
    "requirements": {
      "fleetSpeed": 2,
      "infrastructure": [
        "Storage"
      ]
    },
    "fpReward": 2,
    "type": "Contracts"
  },
  {
    "id": "195",
    "name": "Hazmat Disposal",
    "subtype": "Contract",
    "rarity": "Uncommon",
    "cost": {
      "Capital": 1,
      "Labor": 1,
      "Fuel": 1,
      "Data": 0,
      "Time": 0
    },
    "stats": null,
    "abilities": "Deliver using a Ship-subtype Fleet with capacity 3+ and at least 2 Workforce cards deployed. Hazardous materials demand specialized vessels and trained crews.",
    "flavorText": "Safely moving what others fear to touch.",
    "keywords": [
      "Specialized"
    ],
    "requirements": {
      "fleetType": "Ship",
      "fleetCapacity": 3,
      "workforce": 2
    },
    "fpReward": 2,
    "type": "Contracts"
  },
  {
    "id": "196",
    "name": "Next-Hour Nexus",
    "subtype": "Contract",
    "rarity": "Rare",
    "cost": {
      "Capital": 2,
      "Labor": 0,
      "Fuel": 2,
      "Data": 1,
      "Time": 0
    },
    "stats": null,
    "abilities": "Deliver using a Fleet with Speed 5+ and a Hub-type Infrastructure in your Source Zone. Ultra-fast logistics requiring advanced distribution networks.",
    "flavorText": "One hour. Any destination. No excuses.",
    "keywords": [
      "Rush"
    ],
    "requirements": {
      "fleetSpeed": 5,
      "infrastructure": [
        "Hub"
      ]
    },
    "fpReward": 3,
    "type": "Contracts"
  },
  {
    "id": "197",
    "name": "Auto Manufacturing JIT",
    "subtype": "Contract",
    "rarity": "Rare",
    "cost": {
      "Capital": 1,
      "Labor": 1,
      "Fuel": 0,
      "Data": 1,
      "Time": 1
    },
    "stats": null,
    "abilities": "Deliver using a Rail-subtype Fleet with capacity 5+ while a Facility-type Infrastructure is in play and you have 3 Workforce cards deployed. Just-in-time manufacturing demands precise coordination.",
    "flavorText": "Precision timing. Zero buffer. Maximum efficiency.",
    "keywords": [
      "Specialized"
    ],
    "requirements": {
      "infrastructure": [
        "Facility"
      ],
      "fleetType": "Rail",
      "fleetCapacity": 5,
      "workforce": 3
    },
    "fpReward": 3,
    "type": "Contracts"
  },
  {
    "id": "198",
    "name": "Pandemic Vaccine Distribution",
    "subtype": "Contract",
    "rarity": "Rare",
    "cost": {
      "Capital": 2,
      "Labor": 1,
      "Fuel": 2,
      "Data": 1,
      "Time": 0
    },
    "stats": null,
    "abilities": "Deliver using an Air-subtype Fleet with Speed 4+ while Cold Storage Unit and a Hub Infrastructure are both in your Source Zone. Cold chain air logistics on a global scale.",
    "flavorText": "The world's most important delivery.",
    "keywords": [
      "Specialized",
      "Rush"
    ],
    "requirements": {
      "infrastructure": [
        "Cold Storage Unit",
        "Hub"
      ],
      "fleetType": "Air",
      "fleetSpeed": 4,
      "fleetCards": 2
    },
    "fpReward": 3,
    "type": "Contracts"
  },
  {
    "id": "199",
    "name": "The Infinite Subscription",
    "subtype": "Contract",
    "rarity": "Mythic Rare",
    "cost": {
      "Capital": 2,
      "Labor": 1,
      "Fuel": 1,
      "Data": 2,
      "Time": 0
    },
    "stats": null,
    "abilities": "Deliver using 3 Fleet cards in the Customer Zone with total capacity 8+ and at least 4 Workforce cards deployed. A massive recurring fulfillment operation requiring a fully staffed logistics army.",
    "flavorText": "The contract that never ends, the profits that never stop.",
    "keywords": [
      "Legendary"
    ],
    "requirements": {
      "fleetCards": 3,
      "fleetCapacity": 8,
      "workforce": 4
    },
    "fpReward": 4,
    "type": "Contracts"
  },
  {
    "id": "200",
    "name": "The Perfect Supply Chain",
    "subtype": "Contract",
    "rarity": "Mythic Rare",
    "cost": {
      "Capital": 3,
      "Labor": 2,
      "Fuel": 2,
      "Data": 2,
      "Time": 1
    },
    "stats": null,
    "abilities": "Win condition: Control at least 1 Infrastructure of each subtype (Facility, Storage, Hub, Digital) and 1 Fleet of each subtype (Vehicle, Ship, Air, Rail, Drone, Fixed), plus 5 Workforce cards. The ultimate supply chain mastery challenge. Legendary - limit 1 per deck.",
    "flavorText": "The impossible made inevitable through flawless execution.",
    "keywords": [
      "Legendary"
    ],
    "requirements": {
      "infrastructureTypes": "all",
      "fleetTypes": "all",
      "workforce": 5
    },
    "fpReward": 5,
    "type": "Contracts"
  }
];

  return cards;
}));
