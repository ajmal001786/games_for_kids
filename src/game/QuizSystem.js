import { getQuestions } from "../data/questions.js";

const STORAGE_KEY = "builtToAutomate_askedQuestionIds";
// Chosen difficulty level, written by the name/age setup screen.
// Values: "easy" | "medium" | "hard". If unset/null, all questions are used.
const LEVEL_KEY = "kidsGame_level";

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function loadLevel() {
  try {
    return localStorage.getItem(LEVEL_KEY) || null;
  } catch { /* ignore */ }
  return null;
}

function loadAskedIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw));
  } catch { /* ignore */ }
  return new Set();
}

function saveAskedIds(idSet) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...idSet]));
  } catch { /* ignore */ }
}

export class QuizSystem {
  constructor() {
    this._pool = [];
    this._askedIds = loadAskedIds();
  }

  resetPool() {
    if (this._pool.length > 0) return;
    this._refillPool();
  }

  _refillPool() {
    let all = getQuestions();

    // Filter to the chosen difficulty level (age 7 = easy, 9 = medium, 11 = hard).
    // Safety net: if the level is unset or no questions match it, fall back to all.
    const level = loadLevel();
    if (level) {
      const filtered = all.filter((q) => q.level === level);
      if (filtered.length > 0) all = filtered;
    }

    const unseen = all.filter((q) => !this._askedIds.has(q.id));

    if (unseen.length >= 4) {
      this._pool = shuffle([...unseen]);
    } else {
      // Only clear the ids for the questions we're recycling, so other
      // levels' history isn't wiped when this level runs out.
      for (const q of all) this._askedIds.delete(q.id);
      saveAskedIds(this._askedIds);
      this._pool = shuffle([...all]);
    }
  }

  nextQuestion() {
    if (this._pool.length === 0) this._refillPool();

    const raw = this._pool.pop();
    this._askedIds.add(raw.id);
    saveAskedIds(this._askedIds);

    // Shuffle options for however many this question has (2, 3, or 4),
    // and remap the correct-answer index to its new position.
    const indices = raw.options.map((_, i) => i);
    shuffle(indices);
    const shuffledOptions = indices.map((i) => raw.options[i]);
    const newAnswer = indices.indexOf(raw.answer);

    return {
      ...raw,
      options: shuffledOptions,
      answer: newAnswer,
    };
  }

  isCorrect(question, optionIndex) {
    return optionIndex === question.answer;
  }
}
