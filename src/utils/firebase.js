// src/utils/firebase.js
// Local-only leaderboard — no Firebase, no network, no API keys.
// Scores are saved in the player's browser via localStorage.
// Keeps the SAME exported function names (submitGlobalScore, fetchGlobalLeaderboard)
// so Game.js and UI.js need zero changes.

const STORAGE_KEY = "kids_game_leaderboard";
const MAX_ENTRIES = 50;

function _read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function _write(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    /* storage full or unavailable — ignore */
  }
}

// Save a score. Accepts either submitGlobalScore(name, score)
// or submitGlobalScore({ name, score, ...extra }) so it works
// no matter how Game.js calls it.
export async function submitGlobalScore(nameOrObj, score) {
  let entry;
  if (nameOrObj && typeof nameOrObj === "object") {
    entry = {
      name: nameOrObj.name != null ? nameOrObj.name : "Player",
      score: Number(nameOrObj.score) || 0,
      ...nameOrObj,
    };
  } else {
    entry = {
      name: nameOrObj != null ? nameOrObj : "Player",
      score: Number(score) || 0,
    };
  }
  entry.ts = Date.now();

  const list = _read();
  list.push(entry);
  list.sort((a, b) => (b.score || 0) - (a.score || 0));
  const trimmed = list.slice(0, MAX_ENTRIES);
  _write(trimmed);
  return entry;
}

// Return the top scores (highest first). Optional limit, default 10.
export async function fetchGlobalLeaderboard(limit = 10) {
  const list = _read();
  list.sort((a, b) => (b.score || 0) - (a.score || 0));
  return list.slice(0, limit);
}
