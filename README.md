# Life Skills Racers

A kid-friendly quiz racing game built with Three.js. Race through colorful tracks, dodge puddles, collect stars and gems, and answer life-skills questions about money, safety, kindness, healthy habits, and responsibility.

No build step — serve the folder as static files and play in the browser.

## Quick start

```bash
python3 -m http.server 8765
```

Open [http://127.0.0.1:8765/](http://127.0.0.1:8765/)

## For kids

1. **Pick your profile** — choose P1/P2/P3, type your name, pick your age (7, 9, or 11), and choose an avatar.
2. **Start Run** — race to the finish line before your energy runs out.
3. **Answer quizzes** — boost tokens and second-chance questions use age-appropriate life-skills questions.
4. **My Collection** — earn stickers, badges, and bonus avatars that stay on your profile forever.

## Age → quiz difficulty

| Age button | Question level |
|------------|----------------|
| 7          | Easy           |
| 9          | Medium         |
| 11         | Hard           |

## Controls

- **Steer:** ← / → or A / D (swipe left/right on touch)
- **Boost:** W or ↑ (cooldown bar)
- **Brake:** S or ↓
- **Horn / car click:** Space or tap the car
- **Pause:** Esc or Backspace

## On the road

| Item | What it does |
|------|----------------|
| **Puddle** | Hazard — dodge it or lose energy |
| **Rival car** | Hazard — dodge or crash |
| **Star** | +100 score |
| **Gem** | +150 score |
| **Shield** | Blocks the next hit |
| **Quiz Boost** | Answer a question for a speed burst |
| **Super Streak** | 3 correct answers → 8s of 1.2× score + pickup magnet |
| **Second Chance** | After a hit, answer a question to recover energy |

## Tracks

Nine themed tracks with friendly billboard tips (City Cruise, Forest Trail, Sunny Desert, Marshland, Ocean Drive, Snowy Peaks, Coastal Highway, Meadow Loop, and Star Canyon).

## Question themes

120 offline questions in `src/data/questions.json`:

- Money (uses €)
- Safety
- Kindness
- Healthy Habits
- Responsibility

## Tech notes

- Plain ES modules via CDN import map (Three.js only)
- No npm, bundler, or build step
- Profiles, scores, and collections stored in `localStorage`
- Forked from the open-source arcade racer "Built to Automate" and re-themed for kids

## Project layout

```
index.html          Main page and menus
style.css           UI styles
src/main.js         Bootstraps the game
src/game/           Game loop, UI, quiz, spawner, track
src/data/           config, questions, avatars, rewards
src/utils/          profile, storage, rewards helpers
assets/             Audio, textures, driver photos
```
