/**
 * Avatar catalog for the player-setup chooser.
 * Add a new face by appending an object to a set's `avatars` array:
 *   { id: "animals_koala", name: "Koala", emoji: "🐨", color: "#7a9a6a" }
 * Optional `unlock` (string) hides the avatar until that reward id is earned.
 * IDs are stable localStorage values — never URLs.
 */

export const DEFAULT_AVATAR_ID = "animals_fox";

export const AVATAR_SETS = [
  {
    id: "animals",
    label: "Animals",
    avatars: [
      { id: "animals_fox", name: "Fox", emoji: "🦊", color: "#e07a3d" },
      { id: "animals_panda", name: "Panda", emoji: "🐼", color: "#3d4a55" },
      { id: "animals_dino", name: "Dino", emoji: "🦕", color: "#3cb371" },
      { id: "animals_cat", name: "Cat", emoji: "🐱", color: "#f4c56e" },
      { id: "animals_owl", name: "Owl", emoji: "🦉", color: "#8b6914" },
      { id: "animals_bunny", name: "Bunny", emoji: "🐰", color: "#f3c6d8" },
      { id: "animals_frog", name: "Frog", emoji: "🐸", color: "#6bcb77" },
      { id: "animals_tiger", name: "Tiger", emoji: "🐯", color: "#f08a24" },
    ],
  },
  {
    id: "heroes",
    label: "Heroes",
    avatars: [
      { id: "heroes_zap", name: "Zap", emoji: "⚡", color: "#5b8cff" },
      { id: "heroes_starbeam", name: "Starbeam", emoji: "🌟", color: "#ffd24a" },
      { id: "heroes_kindcap", name: "Kindcap", emoji: "🦸", color: "#e85d75" },
      { id: "heroes_shieldlet", name: "Shieldlet", emoji: "🛡️", color: "#4ecdc4" },
      { id: "heroes_nightowl", name: "Nightowl", emoji: "🌙", color: "#6c5ce7" },
      { id: "heroes_spark", name: "Spark", emoji: "✨", color: "#ff9ff3" },
      { id: "heroes_comet", name: "Comet", emoji: "☄️", color: "#ff6b35" },
      { id: "heroes_giga", name: "Giga", emoji: "💪", color: "#20c997" },
    ],
  },
  {
    id: "silly",
    label: "Silly",
    avatars: [
      { id: "silly_wobbleblob", name: "Wobbleblob", emoji: "🫠", color: "#ffb347" },
      { id: "silly_goofnut", name: "Goofnut", emoji: "🤪", color: "#c77dff" },
      { id: "silly_bloop", name: "Bloop", emoji: "🫧", color: "#7bdff2" },
      { id: "silly_chonk", name: "Chonk", emoji: "🍩", color: "#ff8fab" },
      { id: "silly_zibble", name: "Zibble", emoji: "🤓", color: "#90be6d" },
      { id: "silly_glerp", name: "Glerp", emoji: "👾", color: "#b8e0d2" },
      { id: "silly_boingus", name: "Boingus", emoji: "🤡", color: "#f94144" },
      { id: "silly_squibble", name: "Squibble", emoji: "🐙", color: "#9b5de5" },
    ],
  },
  {
    id: "bonus",
    label: "Bonus",
    avatars: [
      { id: "bonus_unicorn", name: "Unicorn", emoji: "🦄", color: "#e0aaff", unlock: "avatar_unicorn" },
      { id: "bonus_dragon", name: "Dragon", emoji: "🐲", color: "#4caf50", unlock: "avatar_dragon" },
      { id: "bonus_rainbow", name: "Rainbow", emoji: "🌈", color: "#ff6b9d", unlock: "avatar_rainbow" },
      { id: "bonus_robot", name: "Robot", emoji: "🤖", color: "#90caf9", unlock: "avatar_robot" },
    ],
  },
];

const _byId = new Map();
for (const set of AVATAR_SETS) {
  for (const av of set.avatars) {
    _byId.set(av.id, { ...av, setId: set.id });
  }
}

export function getAvatarById(id) {
  if (id && _byId.has(id)) return _byId.get(id);
  return _byId.get(DEFAULT_AVATAR_ID);
}

export function getAvatarSet(setId) {
  return AVATAR_SETS.find((s) => s.id === setId) || AVATAR_SETS[0];
}

/**
 * Avatars the player may pick right now.
 * `unlockedIds` is a list of reward/avatar ids earned in the collection.
 */
export function getSelectableAvatars(setId, unlockedIds = []) {
  const set = getAvatarSet(setId);
  const unlocked = new Set(unlockedIds);
  return set.avatars.filter((av) => !av.unlock || unlocked.has(av.unlock) || unlocked.has(av.id));
}

export function getSetIdForAvatar(id) {
  const av = getAvatarById(id);
  return av ? av.setId : AVATAR_SETS[0].id;
}

/** Tiny inline SVG badge — no files, no network. */
export function avatarSvg(id, size = 40) {
  const av = getAvatarById(id);
  const color = av.color || "#445566";
  const emoji = av.emoji || "🙂";
  return (
    `<svg class="avatar-svg" width="${size}" height="${size}" viewBox="0 0 64 64" aria-hidden="true">` +
    `<circle cx="32" cy="32" r="30" fill="${color}"/>` +
    `<text x="32" y="42" text-anchor="middle" font-size="28">${emoji}</text>` +
    `</svg>`
  );
}
