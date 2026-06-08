# Session Indicator

A proposed native macOS menu bar component for monitoring AI agent sessions.

**[View live prototype](https://ladanjohari.github.io/session-indicator)**

## Pages
- [Prototype](https://ladanjohari.github.io/session-indicator) — interactive macOS desktop demo
- [Variations](https://ladanjohari.github.io/session-indicator/indicator-variations.html) — 8 visual design directions
- [Competitive Research](https://ladanjohari.github.io/session-indicator/competitive-landscape.html) — prior art audit
- [Design Spec](https://ladanjohari.github.io/session-indicator/session-indicator-spec.html) — state vocabulary and design principles

## About
Designed as a response to the friction of supervising multiple parallel AI agent sessions.
Built as a portfolio piece demonstrating end-to-end product thinking from problem statement to interactive prototype.

## Tech stack
- React 18 loaded from CDN
- Self-contained single HTML file (index.html)
- Playwright tests in tests/prototype.spec.js
- Wallpapers: helios-dark.jpg and helios-light.jpg (local files)
- Deployed on GitHub Pages at https://ladanjohari.github.io/session-indicator

## Architecture
useReducer at root. Sessions array with id, name, state, time, shimmerSpeed.
Session states: idle, active, waiting, error, done.
UI state: openTerminals, controlsVisible, activeVariation, popoverOpen, zCounter.

## Active variations
8 visual treatments of the indicator dot/pill: Pulse, Pixel Heart, Pixel Art,
Pixel Flame, Waveform, Agent Meter, Orbital, Claude Native.

## Files in this project
- index.html (main prototype)
- indicator-variations.html (variation showcase)
- competitive-landscape.html (competitive research)
- session-indicator-spec.html (design spec)
- tests/prototype.spec.js (Playwright tests)
- SKILL.md (portfolio design skill)
- project-prompts.md (starter prompts)
