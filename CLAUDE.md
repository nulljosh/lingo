# CLAUDE.md - Lingo Language Learning Platform

## Overview
Modern language learning web app with Apple-inspired liquid glass UI. Single-file architecture for simplicity.

## Current Checkpoint
- Core app still works as a local learning app.
- We started a PocketBase migration for real accounts and cloud-style sync, but it is not finished.
- Files added/changed for that work:
  - `js/lingo-app.js`
  - `index.html`
  - `pb_migrations/1773284000_init_lingo.js`
  - `scripts/dev-pocketbase.sh`
  - `scripts/setup-pocketbase-superuser.sh`
- Known blocker:
  - PocketBase bootstraps a default `users` auth collection before our custom schema logic is fully applied.
  - The migration needs to mutate/extend the existing `users` collection correctly and then be verified against the live API.
- Do not assume accounts/sync are working until CLI verification proves:
  - register works
  - login works
  - profile fields persist
  - XP/streak/trophies/SRS persist

## Next Session Priority
1. Stabilize PocketBase schema first.
2. Verify the backend contract from CLI before touching the browser UI.
3. Create the first real Lingo account only after the schema is correct.
4. Then fix frontend/API mismatches and polish UI.

## Architecture Decisions
- **Single HTML file + JS modules**: Zero build process, GitHub Pages deployment
- **No frameworks**: Pure vanilla JS for maximum performance
- **Current stable storage**: LocalStorage
- **Target storage upgrade in progress**: PocketBase-backed auth + synced user progress
- **Liquid Glass UI**: Modern glassmorphism with Apple design language

## Project Structure
```
index.html          # Entry point (HTML only, links external CSS)
css/lingo.css       # All styles (extracted from inline)
js/lingo-app.js     # Application logic
js/lingo-data.js    # Questions database (39 subjects)
js/sw.js            # Service worker (cache-first)
assets/icon.svg     # Project icon
manifest.json       # PWA manifest
```

## Key Features to Maintain
1. **Visual hierarchy** - Blur/transparency layers create depth
2. **Smooth animations** - All transitions under 300ms
3. **Touch-friendly** - Minimum 44px tap targets
4. **Accessibility** - Focus states, keyboard navigation

## Expansion Ideas
- [ ] Speech recognition for pronunciation practice
- [ ] Spaced repetition algorithm
- [ ] User accounts with cloud sync
- [ ] Native mobile app wrapper
- [ ] AI-generated exercises
- [ ] Multiplayer challenges
- [ ] Achievement system

## Design Principles
- **Clarity**: Interface disappears, content shines
- **Deference**: UI supports content, never competes
- **Depth**: Layered glass creates spatial hierarchy
- **Simplicity**: One primary action per screen

## Color System
- Primary gradient: Purple to Pink (#667eea → #764ba2)
- Glass tint: White with 5-20% opacity
- Success: Green (#4caf50)
- Error: Red (#f44336)
- Text: Dark gray (#1d1d1f) on light
- **Dark mode**: Deep navy bg (#1a1a2e), muted card surfaces (#1e1e32), subtle borders (#2a2a3e)
- Theme toggle in header, persists via localStorage, respects `prefers-color-scheme`

## Animation Timing
- Micro: 150ms (hover states)
- Standard: 300ms (transitions)
- Emphasis: 500ms (page changes)
- Spring: cubic-bezier(0.68, -0.55, 0.265, 1.55)

## Performance Targets
- First paint: <1s
- Interactive: <2s
- Smooth: 60fps animations
- File size: <100KB total

## Testing Checklist
- [ ] Mobile responsive (320px+)
- [ ] Keyboard navigable
- [ ] Progress persists on refresh
- [ ] Animations respect prefers-reduced-motion
- [ ] Works offline
- [ ] Touch gestures work

## Maintenance Notes
- Question database is in-memory JS object
- Could extract to separate JSON file if grows large
- Consider IndexedDB for larger datasets
- WebAudio API for future pronunciation features

## Quick Commands
- `./scripts/simplify.sh`
- `./scripts/monetize.sh . --write`
- `./scripts/audit.sh .`
- `./scripts/ship.sh .`
