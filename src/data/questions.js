let _questions = [];
let _loaded = false;

const KIDS_CATEGORIES = new Set([
  "Money",
  "Safety",
  "Kindness",
  "Healthy Habits",
  "Responsibility",
]);

/** Reject any leftover IT/automation trivia if an old cache slips through. */
const BLOCKED_TEXT =
  /ansible|forrester|yaml ain't|playbook|red hat|rhel|inventory in|state:\s*present|ansible\.builtin/i;

function isValidKidsQuestion(q) {
  if (!q || typeof q.prompt !== "string") return false;
  if (!KIDS_CATEGORIES.has(q.category)) return false;
  if (!["easy", "medium", "hard"].includes(q.level)) return false;
  if (!Array.isArray(q.options) || q.options.length < 2 || q.options.length > 4) return false;
  if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length) return false;
  const blob = `${q.prompt} ${q.explanation || ""}`;
  if (BLOCKED_TEXT.test(blob)) return false;
  return true;
}

export async function loadQuestions() {
  if (_loaded) return _questions;
  try {
    const resp = await fetch("./src/data/questions.json", { cache: "no-store" });
    const raw = await resp.json();
    _questions = Array.isArray(raw) ? raw.filter(isValidKidsQuestion) : [];
    if (_questions.length === 0) {
      console.warn("No kid-friendly questions loaded from questions.json");
    }
  } catch {
    console.warn("Failed to load questions.json, using empty pool");
    _questions = [];
  }
  _loaded = true;
  return _questions;
}

export function getQuestions() {
  return _questions;
}
