# Lingo

<img src="assets/icon.svg" width="128" height="128" align="right">

A beautiful language and skill learning platform with Apple-inspired liquid glass UI.

**[Live Site](https://heyitsmejosh.com/lingo/)**

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
- 40+ topics, 330+ questions

## Quick Start

```bash
git clone https://github.com/nulljosh/lingo.git
cd lingo
open index.html
```

Or visit the [live site](https://heyitsmejosh.com/lingo/) directly.

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
- LocalStorage for progress persistence
- GitHub Pages deployment (zero config)

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
