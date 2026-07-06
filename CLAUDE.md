# Session Indicator — Project Rules

See README.md for what this project is, the tech stack, architecture, and file list.

## File structure
This project must always stay as one single self-contained index.html.
Never suggest splitting it into multiple files or adding a build process
(no bundler, no npm install, no separate JS/CSS files). React is loaded
from CDN inline. This is a portfolio prototype — simplicity of "open the
file in a browser" is the point.

## Session behavior rules
- Dismiss: error → idle (never removes session)
- Cancel: waiting → idle (never removes session)
- Continue: waiting → active
- Retry: error → active
- Done sessions clear when popover closes with no open terminal
- Minimize hides window completely, reopens from popover row click

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

## Gotchas
- No localStorage/sessionStorage — this is a static prototype with no
  persistence; state must always start fresh on page load.
- No unicode characters anywhere in the file (not even in comments or
  strings rendered to the page) — use HTML entities (&mdash; &middot;
  &rarr;) instead, or characters can render as boxes on some systems.
- Z-index is controlled only through the zCounter in state — never set
  z-index directly in CSS or inline styles, or windows will stack
  incorrectly relative to click order.
- Dragging only works from title bars (.term-chrome / popover headers) —
  clicking elsewhere on a window must not start a drag.

## Before every code change
There are no automated tests. Playwright in package.json exists for the
video recording pipeline (record/), not testing — do not claim test runs.
Verify by opening index.html in a browser: cycle variations (V, 1-8),
add sessions (S), check dark and light mode. Only change what is needed.

## GitHub
Repo: git@github.com:ladanjohari/session-indicator.git
After any change: git add -A && git commit -m "description" && git push origin main
