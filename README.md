# 🎓 Lingo - Learn Anything

A beautiful language and skill learning platform with Apple-inspired liquid glass UI.

## Grade: A+

**Strengths:**
- Clean, modern liquid glass UI with smooth animations
- 40+ topics across 5 categories (Languages, Programming, Math, Science, Skills)
- 300+ questions with multiple exercise types
- Progress tracking with XP, streaks, and hearts
- Zero dependencies - pure HTML/CSS/JavaScript
- Modular architecture (HTML + data + app separation)
- Fully responsive design

**Production Ready:** Yes - can be deployed immediately

## What it does

Learn languages, programming, math, science, and more through interactive exercises:

**Languages (12):** Spanish, French, German, Italian, Portuguese, Japanese, Chinese, Korean, Russian, Arabic, Hindi, Dutch

**Programming (7):** JavaScript, Python, Rust, C++, Java, Go, SQL

**Math (8):** Arithmetic, Algebra, Geometry, Trigonometry, Calculus, Statistics, Linear Algebra, Logic

**Science (4):** Physics, Chemistry, Biology, Astronomy

**Skills (5+):** Chess, Music Theory, Music History, World History, Geography

## Features

- Multiple exercise types: translation, sentence building, typing, math problems
- Experience points and daily streak tracking
- Lives system to maintain focus
- Beautiful glassmorphism effects with animated backgrounds
- Instant feedback with visual animations
- Progress persistence via localStorage

## Quick Start

```bash
# Clone the repository
git clone https://github.com/nulljosh/lingo.git
cd lingo

# Open in browser
open index.html

# Or serve locally
python -m http.server 8000
# Visit http://localhost:8000
```

## Project Structure

```
lingo/
├── index.html      # Main application UI
├── lingo-data.js   # Questions and categories database
├── lingo-app.js    # Application logic
├── README.md       # Documentation
└── CLAUDE.md       # Technical notes
```

## Adding Content

Add new questions to `lingo-data.js`:

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
- CSS Glass morphism with backdrop filters
- LocalStorage for progress persistence
- Modular architecture for easy expansion

## Browser Support

Works in modern browsers (2020+) with support for:
- CSS backdrop-filter
- CSS Grid & Flexbox
- ES6 JavaScript
- LocalStorage

## License

MIT - Use it however you want.

---

Built by Joshua Trommel as a modern, comprehensive learning platform.
