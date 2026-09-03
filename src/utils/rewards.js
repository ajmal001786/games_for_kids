/**
 * Per-profile collectibles. Kids keep everything they earn; nothing is removed.
 */
import { REWARD_DEFS } from "../data/rewards.js";
import { getActiveProfile, updateActiveProfile, defaultRewardStats } from "./profile.js";

export { defaultRewardStats };

function todayStamp() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function mergeStats(raw) {
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

function persistStats(stats, extra = {}) {
  return updateActiveProfile({ stats, ...extra });
}

function grantMatching(stats) {
  const p = getActiveProfile();
  const have = new Set(Array.isArray(p.rewards) ? p.rewards : []);
  const newly = [];
  for (const def of REWARD_DEFS) {
    if (have.has(def.id)) continue;
    try {
      if (def.test(stats)) {
        have.add(def.id);
        newly.push(def);
      }
    } catch {
      /* skip a broken test rather than losing the rest */
    }
  }
  if (newly.length) {
    persistStats(stats, { rewards: [...have] });
  }
  return newly;
}

export function applyRunStarted() {
  const stats = mergeStats(getActiveProfile().stats);
  stats.runsStarted += 1;
  const day = todayStamp();
  if (!stats.playDays.includes(day)) stats.playDays.push(day);
  persistStats(stats);
  return grantMatching(stats);
}

export function applyQuizCorrect({ category = "", streak = 0 } = {}) {
  const stats = mergeStats(getActiveProfile().stats);
  stats.totalCorrect += 1;
  stats.maxStreak = Math.max(stats.maxStreak, Number(streak) || 0);
  const raw = String(category || "").trim().toLowerCase();
  const aliases = { "healthy habits": "healthy", healthyhabits: "healthy" };
  const key = aliases[raw] || raw;
  if (key) {
    stats.correctByCategory[key] = (Number(stats.correctByCategory[key]) || 0) + 1;
  }
  persistStats(stats);
  return grantMatching(stats);
}

export function applyRaceFinished({ score = 0 } = {}) {
  const stats = mergeStats(getActiveProfile().stats);
  stats.racesFinished += 1;
  stats.bestScore = Math.max(stats.bestScore, Math.floor(Number(score) || 0));
  persistStats(stats);
  return grantMatching(stats);
}

export function applyRunScore({ score = 0 } = {}) {
  const stats = mergeStats(getActiveProfile().stats);
  stats.bestScore = Math.max(stats.bestScore, Math.floor(Number(score) || 0));
  persistStats(stats);
  return grantMatching(stats);
}

export { mergeStats };
