# Build plan
*Phase: Implementation · The exact order we build v1. One row = one weekly loop.*

Each loop follows the [Process model](../01-planning/process-model.md). Each lists what you'll
**learn**, so the project teaches you as it grows.

| Loop | Build | Stories | You'll learn | Done when |
|---|---|---|---|---|
| **0** | Repo, handbook, design preview | — | Git, GitHub, Markdown | ✅ Done 2026-10-13 |
| **1** | Static Today screen with fake data: `index.html` + `style.css` with all tokens | — | HTML structure, CSS variables, layout | Looks like the preview at 375 px and 1280 px |
| **2** | Add a worry → save → show on Today | U1, U2 | JS basics, events, `localStorage`, JSON | Reload keeps the pebble |
| **3** | Date helpers + due logic + Check-back with 3 answers, follow-up, Undo | U3, U13 | Functions, dates, timezones, state | All U3 criteria pass, including the timezone test |
| **4** | Let it go + sink animation + reduced motion | U4 | CSS animation, media queries | Works with reduced motion on and off |
| **5** | Garden | U5 | Derived data, counting, SVG | Numbers match manual count |
| **6** | Settings: export, import (validated), delete all, palette | U6 | Files, Blob, validation, `<dialog>` | Round-trip test passes |
| **7** | Optional fields: feeling, next step, friend prompt | U7, U8 | Progressive disclosure, accessible chips | Keyboard-only use works |
| **8** | Breath pause | U9 | Keyframes, `aria-live` | 6 breaths/min verified with a stopwatch |
| **9** | First run, About & safety, CSP, polish | — | Security headers, content | Full [manual checklist](../05-testing/manual-checklist.md) passes |
| **10** | Accessibility + usability testing, fixes | — | Testing with people | [v1 exit criteria](../01-planning/roadmap.md#v1-the-core-loop) met |

## Rules for every loop
- Start by reading the matching handbook pages (linked in each story).
- The AI helper proposes the plan for the loop in plain words before writing code.
- End with the Calm Audit and a 5-minute reflection.
- If a loop takes more than 2 weeks, split it. That's normal and not a failure.

## Done when
All loops 1–10 are ticked and v1 is live.
