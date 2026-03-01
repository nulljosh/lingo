# CLAUDE.md - Lingua Language Learning Platform

## Overview
Modern language learning web app with Apple-inspired liquid glass UI. Single-file architecture for simplicity.

## Architecture Decisions
- **Single HTML file**: Zero build process, instant deployment
- **No frameworks**: Pure vanilla JS for maximum performance
- **LocalStorage**: Client-side progress persistence
- **Liquid Glass UI**: Modern glassmorphism with Apple design language

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
