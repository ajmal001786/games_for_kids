/**
 * Kid profile persistence (name, age, quiz level, avatar, rewards).
 * Mirrors the active slot into the individual kidsGame_* keys so QuizSystem
 * and other readers keep working without changes.
 */
import { CONFIG } from "../data/config.js";
import { DEFAULT_AVATAR_ID, getAvatarById } from "../data/avatars.js";

export const PROFILE_KEYS = {
  NAME: "kidsGame_name",
  AGE: "kidsGame_age",
  LEVEL: "kidsGame_level",
  AVATAR: "kidsGame_avatar",
  PROFILES: "kidsGame_profiles",
  ACTIVE: "kidsGame_activeProfile",
  REWARDS: "kidsGame_rewards",
};

export function ageToLevel(age) {
  if (age == null || age === "") return null;
  const n = Number(age);
  if (!Number.isFinite(n) || n <= 0) return null;
  if (n <= 7) return "easy";
  if (n <= 9) return "medium";
  return "hard";
}

export function defaultRewardStats() {
  return {
    racesFinished: 0,
    runsStarted: 0,
    totalCorrect: 0,
    maxStreak: 0,
    bestScore: 0,
    playDays: [],
    correctByCategory: {},
  };
}

function normalizeStats(raw) {
  const base = defaultRewardStats();
  if (!raw || typeof raw !== "object") return base;
  const days = Array.isArray(raw.playDays) ? raw.playDays.filter((x) => typeof x === "string") : [];
  const cats = raw.correctByCategory && typeof raw.correctByCategory === "object"
    ? { ...raw.correctByCategory }
    : {};
  return {
    racesFinished: Number(raw.racesFinished) || 0,
    runsStarted: Number(raw.runsStarted) || 0,
    totalCorrect: Number(raw.totalCorrect) || 0,
    maxStreak: Number(raw.maxStreak) || 0,
    bestScore: Number(raw.bestScore) || 0,
    playDays: days,
    correctByCategory: cats,
  };
}

function safeGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key, val) {
  try {
    localStorage.setItem(key, String(val));
  } catch {
    /* quota / private mode */
  }
}

export function makeEmptyProfile(slot) {
  return {
    id: `p${slot}`,
    slot,
    name: "",
    age: null,
    level: null,
    avatar: DEFAULT_AVATAR_ID,
    rewards: [],
    stats: defaultRewardStats(),
  };
}

function normalizeProfile(raw, slot) {
  const base = makeEmptyProfile(slot);
  if (!raw || typeof raw !== "object") return base;
  const age = raw.age == null || raw.age === "" ? null : Number(raw.age);
  const validAge = Number.isFinite(age) && age > 0 ? age : null;
  const avatarId = typeof raw.avatar === "string" ? raw.avatar : DEFAULT_AVATAR_ID;
  const avatar = getAvatarById(avatarId);
  return {
    ...base,
    ...raw,
    id: `p${slot}`,
    slot,
    name: typeof raw.name === "string" ? raw.name.slice(0, CONFIG.PROFILE.NAME_MAX) : "",
    age: validAge,
    level: validAge != null ? ageToLevel(validAge) : null,
    avatar: avatar ? avatar.id : DEFAULT_AVATAR_ID,
    rewards: Array.isArray(raw.rewards) ? [...new Set(raw.rewards.map(String))] : [],
    stats: normalizeStats(raw.stats),
  };
}

export function loadProfiles() {
  const max = CONFIG.PROFILE.MAX_SLOTS;
  let list = [];
  try {
    const raw = safeGet(PROFILE_KEYS.PROFILES);
    if (raw) list = JSON.parse(raw);
  } catch {
    list = [];
  }
  if (!Array.isArray(list)) list = [];
  const out = [];
  for (let i = 0; i < max; i++) {
    const existing = list.find((p) => p && (p.slot === i || p.id === `p${i}`));
    out.push(normalizeProfile(existing, i));
  }
  return out;
}

export function saveProfiles(list) {
  safeSet(PROFILE_KEYS.PROFILES, JSON.stringify(list));
}

export function getActiveSlot() {
  const n = Number(safeGet(PROFILE_KEYS.ACTIVE));
  if (Number.isInteger(n) && n >= 0 && n < CONFIG.PROFILE.MAX_SLOTS) return n;
  return 0;
}

function mirrorProfileToKeys(p) {
  if (!p) return;
  safeSet(PROFILE_KEYS.NAME, p.name || "");
  if (p.age != null) safeSet(PROFILE_KEYS.AGE, String(p.age));
  else {
    try {
      localStorage.removeItem(PROFILE_KEYS.AGE);
    } catch {
      /* ignore */
    }
  }
  if (p.level) safeSet(PROFILE_KEYS.LEVEL, p.level);
  else {
    try {
      localStorage.removeItem(PROFILE_KEYS.LEVEL);
    } catch {
      /* ignore */
    }
  }
  safeSet(PROFILE_KEYS.AVATAR, p.avatar || DEFAULT_AVATAR_ID);
  try {
    safeSet(PROFILE_KEYS.REWARDS, JSON.stringify(Array.isArray(p.rewards) ? p.rewards : []));
  } catch {
    /* ignore */
  }
}

export function setActiveSlot(slot) {
  const s = Math.max(0, Math.min(CONFIG.PROFILE.MAX_SLOTS - 1, Number(slot) || 0));
  safeSet(PROFILE_KEYS.ACTIVE, String(s));
  const p = loadProfiles()[s];
  mirrorProfileToKeys(p);
  return p;
}

export function getActiveProfile() {
  return loadProfiles()[getActiveSlot()];
}

export function updateActiveProfile(patch) {
  const list = loadProfiles();
  const slot = getActiveSlot();
  const next = normalizeProfile({ ...list[slot], ...patch }, slot);
  if (patch.age != null) next.level = ageToLevel(patch.age);
  list[slot] = next;
  saveProfiles(list);
  mirrorProfileToKeys(next);
  return next;
}

/** Copy leftover kidsGame_* keys from the earlier setup attempt into slot 0. */
export function hydrateProfiles() {
  const list = loadProfiles();
  const hasAny = list.some((p) => p.name || p.age);
  if (!hasAny) {
    const name = safeGet(PROFILE_KEYS.NAME) || "";
    const ageRaw = safeGet(PROFILE_KEYS.AGE);
    const age = ageRaw ? Number(ageRaw) : null;
    const avatar = safeGet(PROFILE_KEYS.AVATAR) || DEFAULT_AVATAR_ID;
    const level = safeGet(PROFILE_KEYS.LEVEL) || ageToLevel(age);
    if (name || age) {
      list[0] = normalizeProfile({ ...list[0], name, age, level, avatar }, 0);
      saveProfiles(list);
    }
  }
  const active = list[getActiveSlot()];
  mirrorProfileToKeys(active);
  return active;
}

export function displayName(profile) {
  const n = profile && profile.name ? profile.name.trim() : "";
  return n || "Racer";
}

export function escapeHtml(str) {
  return String(str == null ? "" : str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
