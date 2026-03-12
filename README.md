<div align="center">

# Lingo

<img src="icon.svg" alt="Lingo" width="120" />

A language and skill learning platform with Apple-inspired liquid glass UI.

[lingo.heyitsmejosh.com](https://lingo.heyitsmejosh.com)

</div>

![version](https://img.shields.io/badge/version-v0.3.0-blue)

## Latest Update

- March 7, 2026: Dark mode with toggle button, respects system preference, persists via localStorage.
- March 11, 2026: Began migration from local-only progress toward PocketBase-backed accounts, profiles, avatars, trophies, and synced progress. This work is not finished or verified end-to-end yet.

## Current State

- Core learning app is still intact and usable.
- Auth/profile/trophy UI scaffolding has been added in [index.html](/Users/joshua/Documents/Code/lingo/index.html) and [js/lingo-app.js](/Users/joshua/Documents/Code/lingo/js/lingo-app.js).
- PocketBase local scripts exist:
  - `scripts/dev-pocketbase.sh`
  - `scripts/setup-pocketbase-superuser.sh`
- PocketBase migration work exists in `pb_migrations/1773284000_init_lingo.js`.
- This backend migration is incomplete. The `users` auth collection/schema is not verified working yet.
- Nothing in the account/sync flow should be considered production-ready yet.

## Resume Plan

1. Finish the PocketBase `users` auth collection schema so it includes all Lingo profile/progress fields.
2. Start PocketBase from CLI only and verify the schema from the live API.
3. Create a real Lingo account from CLI and verify login.
4. Verify profile edits and progress writes persist correctly.
5. Clean up the frontend contract and CSS after the backend contract is stable.

## Architecture

![Architecture](architecture.svg)

## What it does

Learn languages, programming, math, science, and more through interactive exercises:

**Languages (12):** Spanish, French, German, Italian, Portuguese, Japanese, Chinese, Korean, Russian, Arabic, Hindi, Dutch

**Programming (7):** JavaScript, Python, Rust, C++, Java, Go, SQL

**Math (10):** Arithmetic, Algebra, Geometry, Trigonometry, Pre-Calculus 11/12, Calculus, Statistics, Linear Algebra, Logic

**Science (5):** Physics, Chemistry, Biology, Anatomy & Physiology, Astronomy

**Skills (5+):** Chess, Music Theory, Music History, World History, Geography

## Features

- Multiple exercise types: translation, sentence building, typing, math problems
- Experience points and daily streak tracking
- Lives system to maintain focus
- Beautiful glassmorphism effects with animated backgrounds
- Instant feedback with visual animations
- Progress persistence via localStorage
- Dark mode with system preference detection
- 40+ topics, 330+ questions

## Quick Start

```bash
git clone https://github.com/nulljosh/lingo.git
cd lingo
open index.html
```

Or visit the [live site](https://lingo.heyitsmejosh.com) directly.

## Project Structure

```
lingo/
├── index.html        # Main application (HTML + CSS)
├── js/
│   ├── lingo-app.js  # Application logic
│   └── lingo-data.js # Questions and categories database
├── assets/
│   └── icon.svg      # Project icon
├── README.md
└── CLAUDE.md
```

## Adding Content

Add new questions to `js/lingo-data.js`:

```javascript
questions.newTopic = [
    {
        type: 'mathChoice',
        question: 'Your question',
        answer: 'Correct answer',
        choices: ['Correct answer', 'Wrong 1', 'Wrong 2', 'Wrong 3']
    }
];
```

## Tech Stack

- Pure HTML/CSS/JavaScript (no build process)
- CSS glassmorphism with backdrop filters
- LocalStorage for current stable progress persistence
- PocketBase integration in progress for server-backed auth/sync
- Vercel deployment

## Browser Support

Works in modern browsers (2020+) with support for:
- CSS backdrop-filter
- CSS Grid & Flexbox
- ES6 JavaScript
- LocalStorage

## License

MIT

---

Built by Joshua Trommel

## Roadmap

- [ ] Spaced repetition algorithm
- [ ] Audio pronunciation
- [ ] Leaderboard system
- [ ] Offline mode (service worker)
- [ ] User accounts + cloud sync
- [ ] Custom course builder

## Quick Commands
- `./scripts/simplify.sh` - normalize project structure
- `./scripts/monetize.sh . --write` - generate monetization plan (if available)
- `./scripts/audit.sh .` - run fast project audit (if available)
- `./scripts/ship.sh .` - run checks and ship (if available)
