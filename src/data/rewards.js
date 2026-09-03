/**
 * Unlockable collectibles. Add a new item by appending to REWARD_DEFS
 * and (if needed) a matching threshold in CONFIG.REWARDS.
 * Art is emoji only — no files, no network.
 */
import { CONFIG } from "./config.js";

function catCount(stats, key) {
  const map = (stats && stats.correctByCategory) || {};
  return Number(map[key] || map[key && key.toLowerCase()] || 0) || 0;
}

export const REWARD_DEFS = [
  {
    id: "sticker_wheel",
    name: "Wheel Sticker",
    emoji: "🛞",
    hint: "Start 1 race",
    test: (s) => (s.runsStarted || 0) >= CONFIG.REWARDS.RUNS_FOR_WHEEL,
  },
  {
    id: "sticker_heart",
    name: "Kind Heart sticker",
    emoji: "💖",
    hint: "Get 1 quiz answer right",
    test: (s) => (s.totalCorrect || 0) >= 1,
  },
  {
    id: "sticker_star",
    name: "Gold Star sticker",
    emoji: "⭐",
    hint: "Win 1 race (reach the finish)",
    test: (s) => (s.racesFinished || 0) >= CONFIG.REWARDS.RACES_FOR_STAR,
  },
  {
    id: "badge_ribbon",
    name: "Winner Ribbon",
    emoji: "🎀",
    hint: `Win ${CONFIG.REWARDS.RACES_FOR_RIBBON} races`,
    test: (s) => (s.racesFinished || 0) >= CONFIG.REWARDS.RACES_FOR_RIBBON,
  },
  {
    id: "trophy_cup",
    name: "Champion Cup",
    emoji: "🏆",
    hint: `Win ${CONFIG.REWARDS.RACES_FOR_CUP} races`,
    test: (s) => (s.racesFinished || 0) >= CONFIG.REWARDS.RACES_FOR_CUP,
  },
  {
    id: "sticker_bolt",
    name: "Lightning sticker",
    emoji: "⚡",
    hint: `Get ${CONFIG.REWARDS.STREAK_FOR_BOLT} answers right in a row`,
    test: (s) => (s.maxStreak || 0) >= CONFIG.REWARDS.STREAK_FOR_BOLT,
  },
  {
    id: "hat_party",
    name: "Party Hat",
    emoji: "🎉",
    hint: `Score ${CONFIG.REWARDS.SCORE_FOR_PARTY.toLocaleString()} in one race`,
    test: (s) => (s.bestScore || 0) >= CONFIG.REWARDS.SCORE_FOR_PARTY,
  },
  {
    id: "gem_blue",
    name: "Blue Gem",
    emoji: "💎",
    hint: `Score ${CONFIG.REWARDS.SCORE_FOR_GEM.toLocaleString()} in one race`,
    test: (s) => (s.bestScore || 0) >= CONFIG.REWARDS.SCORE_FOR_GEM,
  },
  {
    id: "trophy_gold",
    name: "Gold Trophy",
    emoji: "🥇",
    hint: `Score ${CONFIG.REWARDS.SCORE_FOR_TROPHY.toLocaleString()} in one race`,
    test: (s) => (s.bestScore || 0) >= CONFIG.REWARDS.SCORE_FOR_TROPHY,
  },
  {
    id: "badge_book",
    name: "Quiz Book badge",
    emoji: "📚",
    hint: `Get ${CONFIG.REWARDS.CORRECT_FOR_BOOK} answers right`,
    test: (s) => (s.totalCorrect || 0) >= CONFIG.REWARDS.CORRECT_FOR_BOOK,
  },
  {
    id: "medal_star",
    name: "Smart Medal",
    emoji: "🏅",
    hint: `Get ${CONFIG.REWARDS.CORRECT_FOR_MEDAL} answers right`,
    test: (s) => (s.totalCorrect || 0) >= CONFIG.REWARDS.CORRECT_FOR_MEDAL,
  },
  {
    id: "crown_quiz",
    name: "Quiz Crown",
    emoji: "👑",
    hint: `Get ${CONFIG.REWARDS.CORRECT_FOR_CROWN} answers right`,
    test: (s) => (s.totalCorrect || 0) >= CONFIG.REWARDS.CORRECT_FOR_CROWN,
  },
  {
    id: "sticker_sun",
    name: "Sunny Day sticker",
    emoji: "☀️",
    hint: `Play on ${CONFIG.REWARDS.DAYS_FOR_SUN} different days`,
    test: (s) => (s.playDays || []).length >= CONFIG.REWARDS.DAYS_FOR_SUN,
  },
  {
    id: "theme_money",
    name: "Money Wise badge",
    emoji: "💶",
    hint: `Get ${CONFIG.REWARDS.THEME_CORRECT} Money answers right`,
    test: (s) => catCount(s, "money") >= CONFIG.REWARDS.THEME_CORRECT,
  },
  {
    id: "theme_safety",
    name: "Safety badge",
    emoji: "🛡️",
    hint: `Get ${CONFIG.REWARDS.THEME_CORRECT} Safety answers right`,
    test: (s) => catCount(s, "safety") >= CONFIG.REWARDS.THEME_CORRECT,
  },
  {
    id: "theme_kindness",
    name: "Kindness badge",
    emoji: "🤗",
    hint: `Get ${CONFIG.REWARDS.THEME_CORRECT} Kindness answers right`,
    test: (s) => catCount(s, "kindness") >= CONFIG.REWARDS.THEME_CORRECT,
  },
  {
    id: "theme_healthy",
    name: "Healthy Habits badge",
    emoji: "🥗",
    hint: `Get ${CONFIG.REWARDS.THEME_CORRECT} Healthy Habits answers right`,
    test: (s) => catCount(s, "healthy") >= CONFIG.REWARDS.THEME_CORRECT,
  },
  {
    id: "theme_responsibility",
    name: "Responsibility badge",
    emoji: "✅",
    hint: `Get ${CONFIG.REWARDS.THEME_CORRECT} Responsibility answers right`,
    test: (s) => catCount(s, "responsibility") >= CONFIG.REWARDS.THEME_CORRECT,
  },
  {
    id: "avatar_unicorn",
    name: "Unicorn avatar",
    emoji: "🦄",
    hint: `Win ${CONFIG.REWARDS.RACES_FOR_RIBBON} races`,
    grantsAvatar: "bonus_unicorn",
    test: (s) => (s.racesFinished || 0) >= CONFIG.REWARDS.RACES_FOR_RIBBON,
  },
  {
    id: "avatar_dragon",
    name: "Dragon avatar",
    emoji: "🐲",
    hint: `Get ${CONFIG.REWARDS.CORRECT_FOR_MEDAL} answers right`,
    grantsAvatar: "bonus_dragon",
    test: (s) => (s.totalCorrect || 0) >= CONFIG.REWARDS.CORRECT_FOR_MEDAL,
  },
  {
    id: "avatar_rainbow",
    name: "Rainbow avatar",
    emoji: "🌈",
    hint: `Play on ${CONFIG.REWARDS.DAYS_FOR_SUN} different days`,
    grantsAvatar: "bonus_rainbow",
    test: (s) => (s.playDays || []).length >= CONFIG.REWARDS.DAYS_FOR_SUN,
  },
  {
    id: "avatar_robot",
    name: "Robot avatar",
    emoji: "🤖",
    hint: `Score ${CONFIG.REWARDS.SCORE_FOR_GEM.toLocaleString()} in one race`,
    grantsAvatar: "bonus_robot",
    test: (s) => (s.bestScore || 0) >= CONFIG.REWARDS.SCORE_FOR_GEM,
  },
];

export function getRewardById(id) {
  return REWARD_DEFS.find((d) => d.id === id) || null;
}
