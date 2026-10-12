# AGENTS.md — Pebble (working name; formerly "Worry Ledger")

Instructions and context for any AI agent working on this project.

**Source of truth: [docs/HANDBOOK.md](docs/HANDBOOK.md).** Read §1 Principles, §5.4 Calm Design
System, and §7.3 Calm Audit before changing anything. Design tokens live in `design/preview.html`.
The maintainer is new to coding: explain every change in plain language before making it,
keep changes small, and never add dependencies, analytics or network requests without asking.

## What it is
An open-source, local-first journal for overthinkers. You write as usual. The app
pulls out the worries and predictions in your entries ("I think the interview will go
badly"), asks you on a set date "Did this happen?", and over months builds a
personal record of how often your fears actually came true, broken down by topic
(work, health, people, money...).

One-line pitch: **"Your journal remembers what you were afraid of — and checks back."**

## Why it should exist (evidence)
- Worry Outcome Journal method: LaFreniere & Newman (2020), *Behavior Therapy* 51(3), 413–423.
  91.4% of tracked worries did not come true; people with more untrue worries saw larger
  symptom drops. Caveat: 29 participants with diagnosed GAD, 30-day follow-up. Do NOT
  market it as "91% of everyone's worries never happen."
- Journaling apps lose most users fast; common reasons are the blank page, slow invisible
  payoff, and entries that pile up unread. This design gives a visible payoff (your own
  accuracy record) and a reason to look back (check-backs).

## Market gap (researched 2026-10-13)
| Existing | What it does | Gap |
|---|---|---|
| Pragma, Worry Watch, Scribble (iOS/Android) | Worry → check outcome later | Closed source, phone-only, separate form not your journal |
| sinameraji/decision-journal-electron, decision-diary, muse | Decision → review outcome | About decisions, not fears; macOS/Android only |
| Memex, Lotti, ai-journal, Rosebud | AI summarizes & finds patterns | Tells you what you felt, never checks if fears were right |
| Joplin, Logseq, jrnl, Memos, StoryPad | Write & store | No follow-up loop at all |

Honest position: the core loop is not new (it's a published CBT exercise). The new part is the
combination: open source + local-first + works on your normal free-form journal + long-term
personal calibration record. Novelty is in execution, not the concept.

## Positioning (revised 2026-10-13 after critique)
Do NOT market as a "worry journal" — that framing scares off the avoidant users it targets.
Position as: **"A prediction tracker for overthinkers. Your brain makes forecasts; this keeps score."**
Audience: everyday non-clinical overthinkers, privacy-conscious journalers, therapy clients
assigned worry logs as CBT homework. Not for people in acute crisis.

Risks the design must answer (evidence):
- Venting-only writing can maintain rumination; one COVID-era trial found expressive writing raised stress.
- Writing soon after trauma/major upheaval may do harm.
- Self-guided anxiety apps have small average effects (g ≈ 0.20, Linardon 2024, 176 RCTs). Don't overpromise.
- Avoidance: only ~41% of people with anxiety disorders recognize a need for care (Alonso 2018).

## Design rules (non-negotiable)
1. Check-backs show one short line, never the full original entry. No re-reading.
2. User chooses what is tracked; nothing auto-extracted without consent.
3. "Let it go" button: archive a worry without answering; never asked again.
4. No streaks, no guilt messages, no "you missed X days".
5. Every flow ends in a next step (coping / problem-solving), not pure venting.
6. Visible "not a medical tool / not for crisis" notice with link to professional help.

## Build plan (beginner-friendly)
- **v0 (no code, week 1):** Markdown/spreadsheet template. Founder uses it personally for 2–4 weeks.
  If they don't use it, stop or change the idea.
- **v1 (single file):** One `index.html` with plain HTML/CSS/JavaScript. Data in browser
  `localStorage` + export/import JSON. No server, no accounts, no tracking. Host free on GitHub Pages.
  Features: write entry → mark sentences as worries → set check date → "Due today" list →
  answer Happened / Didn't / Better than feared / Worse → stats page.
- **v2 (optional):** Bring-your-own-key AI that suggests which sentences are worries. Off by default.
  Entries never leave the device without explicit opt-in.

## Rules for agents
- Privacy first: no analytics, no telemetry, no backend in v1.
- Keep code simple enough for a beginner to read; comment the *why*.
- Not a medical tool. README must say so and point to professional help for anxiety disorders.
- License: MIT (simple, permissive).
