---
name: portfolio-ui
description: Use this skill whenever building or styling an interactive HTML/React prototype, macOS-style UI, or portfolio piece that should match Ladan's established visual language — a dark, glassy, Apple-inspired aesthetic with subtle motion. Triggers include "make this look like my other prototypes", "use my design system", "style this like a macOS app", or any new portfolio prototype that needs colors, blur, cards, or animation choices made for it. Load this skill before writing any CSS for that kind of project.
---

# Portfolio UI Design System

This is the visual language extracted from the Session Indicator prototype
(index.html). It is the reference aesthetic for Ladan's portfolio work —
apply it by default whenever a new prototype calls for the same look, so the
colors, blur, motion, and card treatments stay consistent across projects
without re-explaining them each time.

The look: a dark, glassy, restrained macOS-native aesthetic. Nothing shouts.
Hierarchy comes from opacity, not color. Motion is small, slow, and never
synchronized.

---

## Typography

```css
font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif;
```

Monospace (terminals, technical labels):
```css
font-family: 'SF Mono', 'Menlo', 'Monaco', 'Courier New', monospace;
```

- Body text sizes are small: 10–13px for UI chrome, 18px max for hero/problem statements.
- Section labels: 11px, font-weight 500, uppercase, letter-spacing .08em, low opacity (~0.28).
- `-webkit-font-smoothing: antialiased` always on.

---

## Color system: opacity-based hierarchy, not a palette

The base is near-black (`#0a0a0a` background, `#fff` text) or near-white in
light mode. Almost everything else is **white (or black) at varying alpha**,
not distinct hues. This is the single most important trait to copy: text,
borders, and fills all derive from the same one or two base colors at
different opacities, which is what makes the UI feel cohesive and "quiet."

Reference scale (dark mode, white-based):
| Role | Value |
|---|---|
| Primary text | `rgba(255,255,255,0.82)` |
| Secondary text | `rgba(255,255,255,0.5)` |
| Tertiary / muted text | `rgba(255,255,255,0.28)` |
| Faint / disabled text | `rgba(255,255,255,0.18–0.22)` |
| Hover background | `rgba(255,255,255,0.07–0.13)` |
| Resting surface fill | `rgba(255,255,255,0.025–0.05)` |
| Border (subtle) | `rgba(255,255,255,0.06–0.1)` |
| Border (visible) | `rgba(255,255,255,0.13–0.18)` |

In light mode, flip to `rgba(0,0,0, alpha)` with roughly the same alpha steps
(slightly higher alpha on text for equivalent contrast, e.g. primary text
`rgba(0,0,0,0.82)`).

Define these as CSS custom properties on `:root` and override them in a
`body.lm` (light mode) block, so every component just references the
variable and the whole UI flips with one class toggle:

```css
:root{
  --color-text-primary: rgba(255,255,255,0.82);
  --color-text-secondary: rgba(255,255,255,0.28);
  --color-border-tertiary: rgba(255,255,255,0.06);
  --color-background-secondary: rgba(255,255,255,0.04);
}
body.lm{
  --color-text-primary: rgba(0,0,0,0.82);
  --color-text-secondary: rgba(0,0,0,0.3);
  --color-border-tertiary: rgba(0,0,0,0.07);
  --color-background-secondary: rgba(0,0,0,0.04);
}
```

### Accent colors — used ONLY for status, never decoration

Color means "pay attention to this," nothing else. Reserve saturated color
for state/status indicators exclusively:

| Meaning | Color |
|---|---|
| Success / done | `#34C759` (green) |
| Error / needs attention | `#FF3B30` (red) |
| Waiting / warning | `#E8952A` (amber) |
| Info / link accent | `#007AFF` / `rgba(74,176,255,...)` (blue) |
| Active / running | plain white `#fff` (communicated via motion, not color) |

Pair each accent with low-alpha tinted background + border variants for
badges and callouts, e.g.:
```css
--ok-bg: rgba(52,199,89,0.08); --ok-fg:#34C759; --ok-bd: rgba(52,199,89,0.25);
--gap-bg: rgba(255,59,48,0.08); --gap-fg:#FF3B30; --gap-bd: rgba(255,59,48,0.25);
```

**Rule: motion = state, color = exception.** "Active/running" is shown with
animation (shimmer) on plain white — not a color. Color is reserved for
things that need the viewer's attention (errors, warnings, success), so it
never gets diluted by overuse.

---

## Blur and glass effects

Frosted-glass surfaces are central to the look — menu bars, popovers, and
floating cards all use `backdrop-filter: blur()`:

```css
backdrop-filter: blur(40px);          /* menu bar — heavy blur over wallpaper */
-webkit-backdrop-filter: blur(40px);

backdrop-filter: blur(20px);           /* cards/panels — lighter blur */
-webkit-backdrop-filter: blur(20px);
```

Glass surfaces combine blur with a semi-opaque dark fill and a hairline
border so they read as physical layered material:
```css
background: rgba(36,36,36,0.97);
border: .5px solid rgba(255,255,255,0.13);
```

Note the `.5px` borders throughout — not `1px`. This is deliberate; it's
what gives the hairline, native-macOS-chrome feel on retina displays.

---

## Cards, surfaces, and elevation

- Border radius scale: `4–5px` (small controls) → `8–10px` (pills, buttons,
  inputs) → `12–14px` (cards, windows, popovers, screens).
- Surfaces are built from three layers: a near-transparent fill
  (`rgba(255,255,255,0.025–0.07)`), a hairline border
  (`.5px solid rgba(255,255,255,0.06–0.13)`), and a soft drop shadow.
- Shadows are large, soft, and dark — they create depth without hard edges:
```css
box-shadow: 0 32px 80px rgba(0,0,0,0.7), 0 0 0 .5px rgba(255,255,255,0.08);   /* hero/screen */
box-shadow: 0 10px 50px rgba(0,0,0,0.55);                                     /* popover */
box-shadow: 0 20px 60px rgba(0,0,0,0.65), 0 0 0 .5px rgba(255,255,255,0.1);   /* floating window */
```
A common pairing is a large soft outer shadow plus a `0 0 0 .5px` "shadow"
that doubles as a crisp hairline edge — cheaper and crisper than a real
border at fractional pixel widths.

---

## Motion principles

**Every animation is small, slow, and independent.** Nothing pulses in
unison; staggered delays make groups feel alive rather than mechanical.

Core easing/duration vocabulary:
- Hover/press feedback: `transition: background .1s–.12s` (near-instant)
- Panel/popover entrance: `.14s–.2s ease-out`, combined with a slight
  translate + scale (springy "pop," not a fade alone)
- Ambient/looping states: `1.6s–2.8s ease-in-out infinite`, scale and/or
  opacity only — never position, to avoid layout jitter

Signature keyframes to reuse:
```css
/* "Active/running" — the signature shimmer. Used everywhere something is "live". */
@keyframes shimmer {
  0%, 100% { transform: scale(1);    opacity: 1; }
  50%      { transform: scale(0.35); opacity: 0.15; }
}
.dot.active { background: #fff; animation: shimmer 1.6s ease-in-out infinite; }

/* Panel/popover entrance — pop in from slightly above and smaller */
@keyframes popIn {
  from { opacity: 0; transform: translateY(-5px) scale(.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* Floating window entrance — simpler slide-fade */
@keyframes termIn {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Terminal cursor blink */
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
.cursor { animation: blink 1.1s step-end infinite; }
```

When animating a *group* of similar elements (e.g. multiple status dots,
waveform bars, sequence indicators), stagger them with per-element delays so
they're visibly out of phase:
```css
.item.s1 { animation: pulse 2s ease-in-out 0s    infinite; }
.item.s2 { animation: pulse 2s ease-in-out .28s  infinite; }
.item.s3 { animation: pulse 2s ease-in-out .55s  infinite; }
```

**Never synchronize animations across independent instances.** If there are
multiple of the same component on screen (dots, cards, terminals), vary
timing slightly per-instance (e.g. derive a small per-item offset from its
id/index) so the UI feels organic rather than templated.

---

## Dark / light mode

Always implement both. The pattern: define semantic CSS custom properties on
`:root` for dark mode (the default), then override the same variable names
inside a `body.lm` selector for light mode. Components reference only the
variables — never hardcode `rgba(255,255,255,...)` inside a component rule
if the value should flip with the mode.

For one-off rules that can't be expressed as a variable (e.g. swapping a
background image), write an explicit `body.lm .selector { ... }` override
immediately after the dark-mode rule so the pairing stays easy to scan.

Wallpaper / hero backgrounds: keep the background image at full color and
saturation; only dim the *chrome* (menu bar items, icons) on top of it, e.g.
`opacity: 0.45` in dark mode / `0.55` in light mode. The content stays vivid;
only the UI overlay recedes.

---

## macOS chrome conventions

When simulating a macOS surface (menu bar, window, traffic lights), match
real system proportions and behavior, not invented ones:

- Menu bar: `height: 24px`, `background: rgba(22,22,22,0.88)`,
  `backdrop-filter: blur(40px)`, hairline bottom border.
- Window title bar / "chrome": `height: 32px`, `background: #252525`,
  draggable (`cursor: grab`, `cursor: grabbing` while dragging), centered
  title, traffic-light buttons (`12px` circles, `8px` gap) on the left.
- Status pill (menu bar indicator): small rounded rect, `height: 16px`,
  `border-radius: 10px`, dark translucent fill with a faint border —
  contains independent status dots (see "the pill is the pattern" below).
- Notch: a small dark rounded rectangle centered at the top of the screen,
  purely decorative — reinforces "this is a real Mac display."

---

## Component patterns

### The pill (status group)
For any indicator that shows multiple parallel states: a small rounded
container (the "pill") holding independent dots, one per instance. Each dot
animates on its own schedule based on its own state — never synchronized.
Cap visible dots (e.g. 4) and show a `+N` badge for overflow. This pattern
generalizes beyond agent sessions to any "show me N things and their
status at a glance" UI.

### Status dots
`6–7px` circles, `border-radius: 50%`, color encodes state per the accent
table above, and only the "active/running" state animates (shimmer). Idle
state is a low-alpha neutral (`rgba(255,255,255,0.16)`), not a color.

### Buttons
Two tiers:
- Secondary: transparent fill, `.5px` border at `rgba(255,255,255,0.14–0.18)`,
  muted text, subtle hover fill.
- Primary: brighter border (`rgba(255,255,255,0.3+)`) and text
  (`rgba(255,255,255,0.85+)`), still no solid fill — emphasis comes from
  contrast/opacity, not color blocking.

Border radius `5px` for compact toolbar buttons, `20px` (pill-shaped) for
prominent actions and badges.

### Rows / lists
List rows (e.g. session rows in a popover): flex layout, `7–13px` vertical
padding, subtle hover background (`rgba(255,255,255,0.04–0.05)`), name
truncates with ellipsis, secondary metadata (status, time) right-aligned in
progressively lower-opacity text.

---

## Layout

- Content max-width: `780px`, centered, generous vertical rhythm
  (`56–80px` section padding).
- Hero "screen" simulation: `aspect-ratio: 16/10`, `border-radius: 14px`,
  `overflow: hidden`, large soft shadow (see Cards section).
- Section labels precede content: small uppercase, low-opacity, `.08em`
  letter-spacing, generous bottom margin (`32–36px`) before the content
  it labels.

---

## Hard constraints (carry over from Session Indicator)

- **No unicode characters** — use HTML entities (`&mdash;`, `&middot;`,
  `&rarr;`) so nothing renders as a box on systems missing the glyph.
- **No localStorage / sessionStorage** — these are static, stateless
  prototypes; everything resets on reload by design.
- **Self-contained single HTML file** — no build step, no bundler, React
  (if used) loaded from CDN. The file should open directly in a browser.
- **`.5px` hairline borders**, not `1px` — part of the native-chrome feel.
- **Footer convention** for working documents: "Working Document &middot;
  Not for distribution".

---

## Quick-start checklist for a new prototype

- [ ] Define dark-mode CSS variables on `:root`, light-mode overrides on `body.lm`
- [ ] Base font is `-apple-system, BlinkMacSystemFont, 'SF Pro Text', ...`
- [ ] All non-status colors are white/black at varying alpha — no invented hues
- [ ] Accent colors (`#34C759` / `#FF3B30` / `#E8952A` / `#007AFF`) used only for status
- [ ] Borders are `.5px`, surfaces use blur + low-alpha fill + soft shadow
- [ ] Animations are slow (1.6–2.8s), ease-in-out, scale/opacity only, and staggered across instances
- [ ] Both dark and light mode implemented and tested
- [ ] No unicode, no localStorage, single self-contained file
