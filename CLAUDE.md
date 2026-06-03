# Session Indicator — Project Context

## What this is
A macOS menu bar status indicator prototype for AI agent sessions.
Interactive HTML prototype built in React. Portfolio piece.

## Tech stack
- React 18 loaded from CDN
- Self-contained single HTML file (index.html)
- Playwright tests in tests/prototype.spec.js
- Wallpapers: helios-dark.jpg and helios-light.jpg (local files)
- Deployed on GitHub Pages at https://ladanjohari.github.io/session-indicator

## State architecture
useReducer at root. Sessions array with id, name, state, time, shimmerSpeed.
States: idle, active, waiting, error, done.
UI state: openTerminals, controlsVisible, activeVariation, popoverOpen, zCounter.

## Session behavior rules
- Dismiss: error → idle (never removes session)
- Cancel: waiting → idle (never removes session)  
- Continue: waiting → active
- Retry: error → active
- Done sessions clear when popover closes with no open terminal
- Minimize hides window completely, reopens from popover row click

## Active variations (8 total)
Pulse, Pixel Heart, Pixel Art, Pixel Flame, Waveform, Agent Meter, Orbital, Claude Native
Cycle with V key. Select directly with keys 1-8.

## Keyboard shortcuts
S: add new session (unique name)
V: cycle variation
1-8: select variation directly
P: toggle controls panel
Y: approve in focused waiting terminal
N: reject in focused waiting terminal

## Pill behavior
Max 4 dots visible. Overflow shows +N badge.
Each dot independent — no synchronized animations.

## Design rules
- Never use localStorage or sessionStorage
- No unicode characters — use HTML entities
- All windows draggable by title bar
- Z-index managed by last-clicked order
- Wallpaper full color, menu bar items slightly dimmed except the pill

## Before every code change
Run existing Playwright tests first.
Only change what is needed.
Run tests again after change.
Fix failures before moving on.

## Files in this project
- index.html (main prototype)
- indicator-variations.html (variation showcase)
- competitive-landscape.html (competitive research)
- session-indicator-spec.html (design spec)
- tests/prototype.spec.js (Playwright tests)
- SKILL.md (portfolio design skill)
- project-prompts.md (starter prompts)

## GitHub
Repo: git@github.com:ladanjohari/session-indicator.git
After any change: git add -A && git commit -m "description" && git push origin main
