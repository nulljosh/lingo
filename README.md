# Lingo - Modern Language Learning Platform

A beautiful, Apple-inspired language learning web application with liquid glass UI design.

## Features

- 🌍 **6 Languages** - Spanish, French, German, Italian, Portuguese, Japanese
- 🎯 **Multiple Exercise Types**
  - Translation (multiple choice)
  - Sentence construction (word bank)
  - Listening comprehension
  - Fill in the blanks
- 📊 **Progress Tracking**
  - XP system
  - Daily streaks
  - Heart/life system
  - Lesson progress
- 🎨 **Liquid Glass UI**
  - Apple-inspired design
  - Glassmorphism effects
  - Smooth animations
  - Fully responsive

## Quick Start

```bash
# Clone the repository
git clone https://github.com/nulljosh/lingo.git

# Open in browser
open index.html

# Or serve locally
python -m http.server 8000
# Visit http://localhost:8000
```

## Tech Stack

- Pure HTML/CSS/JavaScript (no dependencies)
- LocalStorage for progress persistence
- CSS Grid & Flexbox for layouts
- Modern CSS features (backdrop-filter, gradients)

## Project Structure

```
lingo/
├── index.html          # Main application
├── README.md          # Documentation
├── CLAUDE.md          # AI assistant context
└── .gitignore         # Git ignore file
```

## Development

The entire app is contained in a single `index.html` file for simplicity. All styles are embedded for easy customization and zero build process.

### Adding New Languages

Add language data to the `questions` object:

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

### Customizing Themes

Modify CSS variables in the `:root` selector for easy theme changes.

## Browser Support

- Chrome 90+
- Safari 15+
- Firefox 90+
- Edge 90+

Requires support for:
- CSS backdrop-filter
- CSS Grid
- LocalStorage
- ES6 JavaScript

## License

MIT License - Feel free to use for any purpose.

## Credits

Built by Joshua Trommel as a modern take on language learning interfaces.
