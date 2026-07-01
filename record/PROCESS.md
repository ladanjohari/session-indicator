# Session Indicator — Recording Process

This folder produces the silent walkthrough video for the portfolio case study.
Everything is reproducible from scratch with the commands below.

---

## Tools

| Tool | Version | What it does |
|---|---|---|
| **Playwright** (`playwright` npm pkg) | 1.61.1 | Launches a real headful Chromium browser, drives it with scripted clicks and keyboard events, and captures the result as a `.webm` video via the `recordVideo` context option. No screen capture software needed — the video is rendered internally from the browser's compositor frames. |
| **npx serve** | (zero-install via npx) | Serves `index.html` over `http://localhost:3456`. Playwright works on `http://` rather than `file://` so that the page's JS event loop behaves exactly as it does on the live site. |
| **ffmpeg** | system (Homebrew) | Converts `.webm` → `.mp4` (H.264). Playwright's output codec (VP8/VP9) isn't universally supported in `<video>` tags or QuickTime. The conversion flags are chosen for maximum compatibility and visual losslessness. |

---

## Files

```
record/
  choreography.js   ← Playwright script: launches browser, runs the demo sequence, saves .webm
  convert.sh        ← ffmpeg wrapper: .webm → .mp4 with correct flags
  record.sh         ← One-shot wrapper: server + choreography + convert
  PROCESS.md        ← This file
  recordings/       ← Raw .webm output (gitignored)
  output/           ← Final .mp4 (gitignored)
```

---

## How to run

**One command (recommended):**
```bash
bash record/record.sh
```

**Step by step (for debugging):**
```bash
# 1. Start local server
npx serve . -p 3456 &

# 2. Run the choreography
node record/choreography.js

# 3. Kill the server
kill %1

# 4. Convert to mp4
bash record/convert.sh
```

---

## Choreography sequence

The script in `choreography.js` performs this sequence, matching the video script in `SI redesign/session-indicator-video-script.md`:

| Step | Action | Wait (ms) | What the viewer sees |
|---|---|---|---|
| 0 | Page load, cursor moves to pill | 3000 | Initial state: 4 sessions in various states |
| 1 | Click pill | 1500 | Popover opens with `popIn` animation |
| 2 | Hover waiting session row | 1000 | Row highlights |
| 3 | Click Approve button | 1800 | Session state transitions, dot changes color |
| 4 | Click session name | 1500 | Terminal slides in |
| 5 | Press `S` | 2000 | Second session + terminal appears |
| 6 | Click first terminal | 1800 | Focus/dimming: first is bright, second dims |
| 7 | Click second terminal | 2000 | Focus swaps |
| 8 | Click pill (close popover) | 3000 | Wide shot of full UI — editor trims here |

---

## ffmpeg flags explained

```bash
ffmpeg -i input.webm \
  -c:v libx264 \        # H.264 codec — supported everywhere
  -crf 18 \             # Quality: 0=lossless, 51=worst. 18 is visually lossless for UI
  -pix_fmt yuv420p \    # Required for QuickTime / iOS / Safari compatibility
  -movflags +faststart \ # Moves metadata to file start → video plays before fully downloaded
  -an \                 # No audio (screen recording has none; avoids silent audio track)
  output.mp4
```

---

## Iterating on the choreography

To change the demo sequence, edit `choreography.js`:

- **Add a step:** insert a `moveTo(page, selector)` + `wait(ms)` + a click/keyboard action.
- **Slow it down:** increase the `wait()` values — 1500–2000ms per beat is comfortable.
- **Change the window size:** edit `viewport` and `recordVideo.size` (keep them matching).
- **Different starting state:** the prototype state is controlled by the reducer in `index.html`. You can press keyboard shortcuts (dispatched via `page.keyboard.press()`) to set up a specific state before recording begins.

After editing, re-run `bash record/record.sh`. New `.webm` files get unique timestamps so nothing is overwritten.

---

## Output spec

| Property | Value |
|---|---|
| Resolution | 1280×800 (2× deviceScaleFactor = 2560×1600 source) |
| Codec | H.264 (libx264) |
| Container | MP4 |
| Audio | None |
| Typical file size | 3–8 MB for a 30–60s recording at CRF 18 |

---

## Gitignore

`recordings/` and `output/` are gitignored (binary files, regenerable). Commit only the scripts and this doc.
