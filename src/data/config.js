/**
 * Tuning constants — Life Skills Quiz Racing Game
 */
export const CONFIG = {
  // Lanes: world X positions (center = 0)
  LANES: [-3.2, 0, 3.2],
  LANE_INDEX: { LEFT: 0, CENTER: 1, RIGHT: 2 },

  // Movement
  BASE_SPEED: 28.5,
  /** Units per second²-ish scaling for forward speed over time */
  SPEED_RAMP: 0.145,
  /** Max multiplier on base speed from ramp + boosts */
  MAX_SPEED_MULT: 2.4,
  /** Pickup speed stacking cap (1.75 = max +75%) */
  MAX_PICKUP_SPEED_MULT: 1.75,
  LANE_LERP: 8,

  // Player hitbox (forgiving, slightly smaller than mesh)
  PLAYER_HALF_WIDTH: 0.55,
  PLAYER_HALF_DEPTH: 0.9,
  PLAYER_Y: 0.6,

  // Spawning (Z is forward; obstacles start negative, move +Z)
  SPAWN_Z: -95,
  DESPAWN_Z: 12,
  /** Minimum |Δz| between two obstacles in the same lane (fairness) */
  MIN_OBSTACLE_ALONG_Z: 26,
  /** Base interval (seconds) — lowered after warmup */
  OBSTACLE_SPAWN_BASE: 1.6,
  OBSTACLE_SPAWN_MIN: 0.7,
  PICKUP_SPAWN_BASE: 0.35,
  PICKUP_SPAWN_MIN: 0.15,
  /** First ~15s: easier spawns */
  WARMUP_SECONDS: 15,

  // Single hazard type (MVP clarity)
  OBSTACLE_KIND: "OUTAGE",
  /** Display name for HUD legend */
  OBSTACLE_NAME: "Puddle",
  OBSTACLE_DAMAGE: 25,

  // Health (run survival meter)
  STARTING_HEALTH: 100,
  REMEDIATION_WRONG_PENALTY: 5,
  REMEDIATION_RESTORE: 10,

  // Scoring (per second / tick feel)
  SCORE_PER_SECOND: 12,
  SCORE_PER_UNIT_DISTANCE: 0.35,
  PICKUP_SCORE: {
    PLAYBOOK: 100,
    COLLECTION: 150,
  },
  BOOST_QUIZ_CORRECT: 250,
  BOOST_QUIZ_WRONG: 25,
  REMEDIATION_CORRECT_STREAK: 1,

  // Boost token quiz (gameplay pauses while answering)
  MAX_REMEDIATIONS: 3,

  BOOST_DURATION: 2.8,
  /** Seconds added to an active boost when collecting a playbook/collection */
  BOOST_EXTEND_ON_PICKUP: 1.0,
  /** Speed multiplier during boost */
  BOOST_SPEED_MULT: 1.85,

  // Manual boost (W / Up)
  MANUAL_BOOST_DURATION: 2.5,
  MANUAL_BOOST_MULT: 1.4,
  MANUAL_BOOST_COOLDOWN: 8,

  // Brake (S / Down)
  BRAKE_SPEED_MULT: 0.45,

  // Crash recovery quiz (same — full pause)

  // Automation Flow (streak of 3 correct)
  STREAK_FOR_FLOW: 3,
  FLOW_DURATION: 8,
  FLOW_SCORE_MULT: 1.2,
  /** Pickup pull strength toward player X */
  FLOW_MAGNET: 2.8,

  // Combo multiplier
  COMBO_WINDOW: 3,
  COMBO_BONUS: 25,

  // Near-miss
  NEAR_MISS_MARGIN: 1.2,
  NEAR_MISS_BONUS: 25,

  // School bus (Level F only)
  BUS_SPEED_MULT: 1.2,
  BUS_DAMAGE: 35,

  // Level completion
  LEVEL_DURATION: 60,

  // UI
  STATUS_MESSAGE_MS: 2200,
  STATUS_HIT_MS: 3800,
  /** How long CORRECT / WRONG result screen shows before applying & resuming */
  QUIZ_RESULT_DISPLAY_MS: 1000,
  /** Seconds kids have to answer a quiz question before it auto-skips */
  QUIZ_ANSWER_SECONDS: 30,

  /** Kid profile slots on the main menu (name / age / avatar). */
  PROFILE: {
    MAX_SLOTS: 3,
    NAME_MAX: 16,
    DEFAULT_AVATAR: "animals_fox",
  },

  /**
   * Collectible unlock thresholds (per kid profile).
   * Tune freely — kids never lose items they already earned.
   */
  REWARDS: {
    RUNS_FOR_WHEEL: 1,
    RACES_FOR_STAR: 1,
    RACES_FOR_RIBBON: 3,
    RACES_FOR_CUP: 5,
    STREAK_FOR_BOLT: 3,
    CORRECT_FOR_BOOK: 5,
    CORRECT_FOR_MEDAL: 10,
    CORRECT_FOR_CROWN: 20,
    SCORE_FOR_PARTY: 2000,
    SCORE_FOR_GEM: 5000,
    SCORE_FOR_TROPHY: 10000,
    DAYS_FOR_SUN: 2,
    THEME_CORRECT: 5,
  },
};

/** Kid-friendly labels for HUD, menus, and tutorials (internal pickup keys stay the same). */
export const DISPLAY = {
  OBSTACLE: "Puddle",
  RIVAL: "Rival car",
  STAR: "Star",
  GEM: "Gem",
  SHIELD: "Shield",
  BOOST: "Quiz Boost",
  FLOW: "Super Streak",
  REMEDIATION: "Second Chance",
  HEALTH_HINT: "Your energy bar — puddles drain it. At 0, game over.",
  FLOW_HINT: "3 correct answers in a row triggers 8s of 1.2× score + pickup magnet",
};

export const DRIVERS = {
  anshul: {
    id: "anshul",
    name: "Zoom Zoom",
    car: "f1",
    country: "CA",
    photo: "./assets/anshul_tron.png",
    origin: "Maple Town",
    bio: "Loves brain teasers, bike rides, and crossing the finish line with a grin.",
  },
  andrius: {
    id: "andrius",
    name: "Turbo Ted",
    car: "f1_maroon",
    country: "US",
    photo: "./assets/andrius_tron.png",
    origin: "Hilltop Hills",
    bio: "Big laugh, bigger heart. Keeps snacks in the glove box for friends.",
  },
  justin: {
    id: "justin",
    name: "Jazzy Jay",
    car: "f1_black_gold",
    country: "US",
    photo: "./assets/justin_tron.png",
    origin: "Sunset City",
    bio: "Tells silly jokes at red lights and always shares the last cookie.",
  },
  remy: {
    id: "remy",
    name: "Rocket Remy",
    car: "f1_turquoise",
    country: "US",
    speedMult: 1.1,
    photo: "./assets/remy_tron.png",
    origin: "River Ridge",
    bio: "A little faster than everyone else — and the first to cheer you on.",
  },
  leo: {
    id: "leo",
    name: "Lucky Leo",
    car: "f1_purple",
    country: "AR",
    photo: "./assets/leo_tron.png",
    origin: "Rainbow Valley",
    bio: "Soccer star on weekends, quiz champ on the track. Never gives up.",
  },
  michele: {
    id: "michele",
    name: "Mighty Mia",
    car: "f1_pink_gold",
    country: "US",
    photo: "./assets/michele_tron.png",
    origin: "Sandy Shores",
    bio: "Beach-day expert who knows every shortcut and every kindness trick.",
  },
  roger: {
    id: "roger",
    name: "Racer Roy",
    car: "delorean",
    country: "US",
    photo: "./assets/roger_tron.png",
    origin: "Clockwork Cove",
    bio: "Inventor of wild gadgets. His car has a very cool glow button.",
  },
  nuno: {
    id: "nuno",
    name: "Nifty Nuno",
    car: "truck",
    country: "ZA",
    photo: "./assets/nuno_tron.png",
    origin: "Safari Springs",
    bio: "Adventure kid with a pickup full of helpful tools and stickers.",
  },
  hicham: {
    id: "hicham",
    name: "Happy Hicham",
    car: "lightcycle",
    country: "CA",
    photo: "./assets/hicham_tron.png",
    origin: "Frostbite Falls",
    bio: "Hockey fan who streaks down the track like a neon comet.",
  },
  matt: {
    id: "matt",
    name: "Mellow Matt",
    car: "f1_blue_white",
    country: "US",
    photo: "./assets/matt_tron.png",
    origin: "Pine Grove",
    bio: "Skateboarder at heart. Calm, clean, and always on time for dinner.",
  },
  aubrey: {
    id: "aubrey",
    name: "Awesome Aubrey",
    car: "f1_pink",
    country: "US",
    photo: "./assets/aubrey_tron.png",
    origin: "Garden Glen",
    bio: "Organizes group hugs and color-codes her homework. Pink car, golden heart.",
  },
  alex: {
    id: "alex",
    name: "Ace Alex",
    car: "f1_yellow",
    country: "US",
    photo: "./assets/alex_tron.png",
    origin: "Starlight Suburb",
    bio: "Youngest on the grid and already the fastest puzzle solver in class.",
  },
};

export const PICKUP_TYPES = [
  "PLAYBOOK",
  "CERTIFIED_COLLECTION",
  "POLICY_SHIELD",
  "BOOST_TOKEN",
];

export const TUTORIAL_STEPS = [
  { type: "PLAYBOOK", kind: "pickup", lane: 1, tip: "Collect Stars for +100 points!", label: "Collect a Star" },
  { type: "CERTIFIED_COLLECTION", kind: "pickup", lane: 1, tip: "Gems are worth +150 points!", label: "Grab a Gem" },
  { type: "OUTAGE", kind: "obstacle", lane: 1, tip: "Dodge puddles — they drain your energy!", label: "Dodge a Puddle" },
  { type: "BRAKE", kind: "lesson", lane: -1, tip: "Hold S or ↓ to brake and slow down.", label: "Learn to Brake" },
  { type: "POLICY_SHIELD", kind: "pickup", lane: 1, tip: "The purple pickup is a Shield — grab it!", label: "Pick up a Shield" },
  { type: "OUTAGE", kind: "obstacle", lane: 1, tip: "Shield active! Hit this puddle to test it.", label: "Test the Shield", mustHit: true },
  { type: "BOOST_TOKEN", kind: "pickup", lane: 1, tip: "Quiz Boosts pause for a question — answer for speed!", label: "Ace a Quiz Boost" },
];

export const TUTORIAL_QUIZ_QUESTION = {
  prompt: "What should you do before crossing the street?",
  options: [
    "Run without looking",
    "Stop, look, and listen",
    "Close your eyes and hope",
    "Text your friends",
  ],
  answer: 1,
  explanation: "Always stop, look both ways, and listen before you cross.",
};

export const TUTORIAL_SPAWN_Z = -60;
export const TUTORIAL_TIP_Z = -18;

export const LEVELS = {
  A: {
    id: "A",
    pathSegment: "AIOps",
    name: "City Cruise",
    subtitle: "Neon streets & bright lights",
    road:     0x556070,
    roadEmissive: 0x1a2030,
    edge:     0x1a1a2e,
    edgeEmissive: 0x220044,
    laneMarker: 0x00ffcc,
    side:     0x0a0e18,
    sideEmissive: 0x0c1830,
    fog:      0x0a0e18,
    sky:      0x050510,
    sceneBg:  0x0a0e18,
    scenery: "city",
    billboards: [
      { id: "a1", label: "Be kind to others!", accent: 0x00ffcc },
      { id: "a2", label: "Look both ways!", accent: 0xff99cc },
      { id: "a3", label: "Share with friends", accent: 0xffdd44 },
    ],
  },
  B: {
    id: "B",
    pathSegment: "Workflows",
    name: "Forest Trail",
    subtitle: "Trees, trails & fresh air",
    road:     0x555960,
    roadEmissive: 0x0a0a0c,
    edge:     0x446633,
    edgeEmissive: 0x112200,
    laneMarker: 0xffffff,
    side:     0x2a5520,
    sideEmissive: 0x0a2200,
    fog:      0x88aacc,
    sky:      0x6699bb,
    sceneBg:  0x7799aa,
    scenery: "forest",
    music: "./assets/audio/bgm-alpine.m4a",
    billboards: [
      { id: "b1", label: "Stay on the path", accent: 0x44bb66 },
      { id: "b2", label: "Wash your hands", accent: 0x88cc88 },
      { id: "b3", label: "Drink water!", accent: 0xaaddff },
    ],
  },
  C: {
    id: "C",
    pathSegment: "Developer-Experience",
    name: "Sunny Desert",
    subtitle: "Golden sand & warm breeze",
    road:     0x8b7355,
    roadEmissive: 0x1a1208,
    edge:     0xc4a84a,
    edgeEmissive: 0x332800,
    laneMarker: 0xffeecc,
    side:     0xd4b85a,
    sideEmissive: 0x332800,
    fog:      0xd4c09a,
    sky:      0xccaa77,
    sceneBg:  0xc4a870,
    scenery: "desert",
    music: "./assets/audio/bgm-desert.m4a",
    billboards: [
      { id: "c1", label: "Wear sunscreen", accent: 0xff8844 },
      { id: "c2", label: "Take breaks in the shade", accent: 0xffcc66 },
      { id: "c3", label: "Save water", accent: 0x44ccaa },
    ],
  },
  D: {
    id: "D",
    pathSegment: "Policy-and-governance",
    name: "Marshland",
    subtitle: "Frogs, reeds & squishy mud",
    road:     0x3a3828,
    roadEmissive: 0x0a0a04,
    edge:     0x4a5530,
    edgeEmissive: 0x1a2200,
    laneMarker: 0x88cc66,
    side:     0x2a3a1a,
    sideEmissive: 0x0a1a04,
    fog:      0x4a5a3a,
    sky:      0x556644,
    sceneBg:  0x3a4a2a,
    scenery: "swamp",
    music: "./assets/audio/bgm-swamp.m4a",
    billboards: [
      { id: "d1", label: "Tell a trusted adult", accent: 0xaacc22 },
      { id: "d2", label: "Never share passwords", accent: 0x44aa88 },
      { id: "d3", label: "Ask before you go", accent: 0x88aa66 },
    ],
  },
  E: {
    id: "E",
    pathSegment: "Infrastructure-and-network",
    name: "Ocean Drive",
    subtitle: "Beach waves & salty air",
    road:     0x445566,
    roadEmissive: 0x060810,
    edge:     0x3388aa,
    edgeEmissive: 0x0a2244,
    laneMarker: 0xffffff,
    side:     0x2266aa,
    sideEmissive: 0x0a1844,
    fog:      0x6699bb,
    sky:      0x4488bb,
    sceneBg:  0x5599bb,
    scenery: "water",
    music: "./assets/audio/bgm-ocean.m4a",
    billboards: [
      { id: "e1", label: "Swim with a buddy", accent: 0x44aaff },
      { id: "e2", label: "Wear a life jacket", accent: 0xaaddff },
      { id: "e3", label: "Respect the ocean", accent: 0x6688cc },
    ],
  },
  F: {
    id: "F",
    pathSegment: "AAP-on-cloud",
    name: "Snowy Peaks",
    subtitle: "Sparkly ice & chilly fun",
    road:     0x667788,
    roadEmissive: 0x0a0c10,
    edge:     0x8899aa,
    edgeEmissive: 0x112244,
    laneMarker: 0xccddff,
    side:     0xdde8f0,
    sideEmissive: 0x2a3040,
    fog:      0xc8d8e8,
    sky:      0xaabbcc,
    sceneBg:  0xbccada,
    scenery: "snow",
    music: "./assets/audio/bgm-snow.m4a",
    billboards: [
      { id: "f1", label: "Bundle up warm!", accent: 0x22ccff },
      { id: "f2", label: "Walk carefully on ice", accent: 0x44ffcc },
      { id: "f3", label: "Help shovel the path", accent: 0x88aaff },
    ],
  },
  G: {
    id: "G",
    pathSegment: "Metrics-and-telemetry",
    name: "Coastal Highway",
    subtitle: "Cliffs, coast & sunshine",
    road:     0x555555,
    roadEmissive: 0x080808,
    edge:     0xcc8844,
    edgeEmissive: 0x331800,
    laneMarker: 0xffdd44,
    side:     0x7a6a50,
    sideEmissive: 0x1a1408,
    fog:      0x8aAAcc,
    sky:      0x6699cc,
    sceneBg:  0x88aacc,
    scenery: "coast",
    music: "./assets/audio/bgm-coast.m4a",
    curve: { amplitude: 5, frequency: 0.018 },
    billboards: [
      { id: "g1", label: "Save your pocket money", accent: 0xff8822 },
      { id: "g2", label: "Needs before wants", accent: 0xffcc44 },
      { id: "g3", label: "Count your coins", accent: 0xffaa66 },
    ],
  },
  H: {
    id: "H",
    pathSegment: "AAP-101",
    name: "Meadow Loop",
    subtitle: "Rolling hills & wildflowers",
    road:     0x5a5e6a,
    roadEmissive: 0x161a24,
    edge:     0x1a1a2e,
    edgeEmissive: 0x110022,
    laneMarker: 0xffcc00,
    side:     0x1a2218,
    sideEmissive: 0x0a1208,
    fog:      0x2a3548,
    sky:      0x182840,
    sceneBg:  0x1a2838,
    scenery: "durham",
    music: "./assets/audio/bgm-durham.m4a",
    billboards: [
      { id: "h1", label: "Eat your veggies!", accent: 0xcc0000 },
      { id: "h2", label: "Brush your teeth", accent: 0x0088cc },
      { id: "h3", label: "Get plenty of sleep", accent: 0xff9900 },
    ],
  },
  DS: {
    id: "DS",
    pathSegment: "Death-Star-Trench",
    name: "Star Canyon",
    subtitle: "Night sky dash",
    road:     0x5c5e68,
    roadEmissive: 0x181c24,
    edge:     0x6a6c78,
    edgeEmissive: 0x22242c,
    laneMarker: 0xa8aeb8,
    side:     0x4a4c58,
    sideEmissive: 0x1a1c28,
    fog:      0x040508,
    sky:      0x000000,
    sceneBg:  0x000000,
    scenery: "trench",
    music: "./assets/audio/trench-run.m4a",
    billboards: [
      { id: "ds1", label: "Dream big!", accent: 0xffcc00 },
      { id: "ds2", label: "Reach for the stars", accent: 0xcc3333 },
      { id: "ds3", label: "Stay curious", accent: 0x4488ff },
    ],
  },
};

/** Legacy — summit booth links removed for kids build. */
export function getSummitBoothThemeUrl() {
  return null;
}
