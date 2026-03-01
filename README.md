# Lingo - Learn Languages

A beautiful language learning app with a glass-like interface inspired by Apple's design.

## What it does

Learn 6 different languages through interactive exercises:
- Spanish, French, German, Italian, Portuguese, Japanese

Practice with different exercise types:
- Multiple choice translation
- Build sentences from word banks
- Type what you hear
- Fill in the blanks

Track your progress:
- Experience points for correct answers
- Daily streak counter
- Lives system to keep you focused
- Lesson progress tracking

## How to use it

Open the file in your browser:
```bash
open index.html
```

Or serve it locally:
```bash
python -m http.server 8000
# Then visit http://localhost:8000
```

## How it's built

Everything is in a single HTML file - no build steps or dependencies needed. Just HTML, CSS, and JavaScript.

The interface uses modern CSS features like backdrop filters and gradients to create the glass effect. Progress saves locally in your browser.

## Project structure

```
lingo/
├── index.html    # The entire app
├── README.md     # This file
├── CLAUDE.md     # Technical notes
└── .gitignore    # Git config
```

## Adding languages

Add new language lessons to the `questions` object in the JavaScript:

```javascript
const questions = {
  newlanguage: [
    {
      type: 'translation',
      question: 'Hello',
      answer: 'Translation',
      choices: ['Translation', 'Wrong1', 'Wrong2', 'Wrong3']
    }
  ]
}
```

## Browser support

Works in modern browsers (Chrome, Safari, Firefox, Edge) from the last few years. Needs support for CSS backdrop filters and modern JavaScript.

## License

MIT - Use it however you want.

## Author

Built by Joshua Trommel as a modern take on language learning interfaces.
