# New Project Starter Prompt

Paste this at the beginning of any new design or portfolio project chat.
Fill in the brackets before sending.

---

```
We are starting a new design project and I want to work the same way I built the Session Indicator — as a design team where you are a senior designer and engineer, not just an executor.

Before we build anything, I need us to lock four things:
1. Problem statement — one sentence, specific friction
2. Who sees this — exec, engineer, design team, portfolio visitor
3. What we are delivering — prototype, one-pager, spec doc, or all three
4. What we are NOT doing

Here is the project context:
[DESCRIBE YOUR IDEA IN A FEW SENTENCES — what it is, who it's for, what problem it solves]

Here are any references I have:
[PASTE LINKS, UPLOAD SKETCHES, OR DESCRIBE INSPIRATION — or say "none yet"]

My goal for the portfolio:
[WHAT SHOULD SOMEONE THINK AFTER SEEING THIS — e.g. "this person thinks at product and design level", "this shows I can ship end-to-end"]

Working style reminders:
- Give me your professional opinion before executing anything
- Push back if something can be improved, with a reason
- When there are multiple valid directions, show all of them with pros/cons
- Output should be Apple-level — the kind of thing you would hand to an Apple designer and they would not immediately reject it
- All prototypes are self-contained HTML files, dark and light mode, controls hidden by default
- Document the design thinking, not just the final answer
- Use HTML entities not unicode characters in all output files

What should we do first?
```

---

# Existing Project Continuation Prompt

Paste this when picking up a previous project in a new chat.

---

```
We are continuing a design project. I want to work the same way — you are a senior designer and engineer on the team, not just an executor.

Project name: [NAME]
What we built: [BRIEF DESCRIPTION OF WHAT EXISTS]
GitHub / file location: [URL OR PATH]
Last completed step: [WHAT WAS THE LAST THING FINISHED]
Outstanding items: [LIST ANYTHING STILL TO DO]

Here is the current file for context:
[ATTACH index.html OR PASTE THE RELEVANT SECTION]

Working style reminders:
- Give me your professional opinion before executing anything
- Push back if something can be improved, with a reason
- All changes go through a CLI prompt you write for me to run in Claude Code
- After any CLI prompt is run, I will share the result here for review before the next step
- Quality checklist before anything is shared: no unicode artifacts, no overlapping text, dark and light mode tested, animations run on load, file self-contained

What I want to work on today: [NEXT STEP OR OPEN QUESTION]
```

---

# Portfolio Improvement Prompt

Paste this when you want to retrofit an existing project into the portfolio style.

---

```
I have an existing project I want to bring up to the same standard as the Session Indicator portfolio piece.

Project: [NAME AND BRIEF DESCRIPTION]
What exists now: [LINK, FILE, OR DESCRIPTION OF CURRENT STATE]
What is missing: [E.G. "no interactive prototype", "no design rationale", "no one-pager"]

I want to end up with:
- A self-contained HTML one-pager with an interactive demo
- A problem statement
- A design principles section
- A prior art / competitor audit section
- Dark and light mode
- Ready to publish on GitHub Pages

Let's start by auditing what exists and identifying the gaps.
Give me your honest assessment of what needs to be built from scratch vs what can be refined.
```
