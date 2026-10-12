# AGENTS.md: Pebble

Instructions **and project memory** for any AI agent (Claude Code or others) working on Pebble.
This file is the persistent memory for the project: decisions, agreements and context live
here, not in tool-specific files. Read it fully before doing anything.

## 1. What Pebble is
A calm, private, open-source web app for overthinkers. The user writes a worry in one line, picks
a check-back date, and on that day answers "Did it happen?". Over time they build a private record
of how often their worries came true. Based on the Worry Outcome Journal (LaFreniere & Newman, 2020).
Positioning: **"A prediction tracker for overthinkers. Your brain makes forecasts; this keeps score."**

## 2. The handbook is the law
**Source of truth: [docs/handbook/README.md](docs/handbook/README.md).** One page per topic, grouped by SDLC phase.
- Before any work, read the handbook pages for that phase (the [build plan](docs/handbook/04-implementation/build-plan.md) links them).
- Every change must satisfy: [Principles](docs/handbook/00-foundation/principles.md) → [Definition of Done](docs/handbook/01-planning/process-model.md#definition-of-done-before-it-counts-as-finished) → [Calm Audit](docs/handbook/05-testing/calm-audit.md).
- If code and handbook disagree, update one of them **in the same commit**.
- New psychological features need a [Science](docs/handbook/00-foundation/science.md) entry first.

## 3. Working agreements (standing instructions from the maintainer)
1. **Auto-push docs.** After writing or changing the handbook or any documentation, commit and push to `origin main` immediately. Don't wait to be asked.
2. **Code changes:** explain what and why in plain language first; keep each change small; push once the maintainer has seen it working.
3. **The maintainer is new to coding.** Teach as you go: explain each step and avoid jargon (or link the [Glossary](docs/handbook/00-foundation/glossary.md)).
4. **Be a devil's advocate mentor.** Be honest, evidence-based, no sugarcoating; challenge weak ideas with facts. Be decisive: give one recommendation, not ten options.
5. **Project memory lives here** in AGENTS.md. Update §6 (Decision log) when significant decisions are made.
6. **No personal information** about the maintainer in this repo. Project facts only.
7. **Public-facing actions need explicit approval every time:** making the repo public, publishing releases, posting anywhere.
8. **Never** add dependencies, analytics, external fonts or network requests without an ADR and approval.

## 4. Technical facts for agents
| Fact | Detail |
|---|---|
| Repo | `itsharshhy/pebble` (**private**) |
| Default branch | `main` |
| GitHub CLI on Windows | `C:\Program Files\GitHub CLI\gh.exe` (may not be on PATH in agent shells) |
| Commit identity | Repo-local config; GitHub **noreply** email. Never use a personal email. |
| Long paths | `git config core.longpaths true` is set (the app's working folder has very long paths) |
| Commit style | Conventional Commits (`feat:`, `fix:`, `docs:`…) |
| Local preview | `python -m http.server 5317 --bind 127.0.0.1` from the repo root |
| Stack | Plain HTML/CSS/JS, no build, no dependencies ([ADR-001](docs/handbook/03-design/decisions.md)) |
| Design tokens | [Design system](docs/handbook/03-design/design-system.md); living preview in `design/preview.html` |
| Hosting caveat | GitHub Pages on a private repo needs a paid plan ([Deployment](docs/handbook/06-release/deployment.md)) |

## 5. Current status
- **Phase:** Loop 0 done (repo + handbook + design preview). Next: v0 14-day paper test by the maintainer, then Loop 1 (static Today screen).
- **Open decisions:** final name ("Pebble" is a working name); when to go public.

## 6. Decision log
| Date | Decision | Why |
|---|---|---|
| 2026-10-13 | Project idea: worry outcome tracking, open source, local-first | Closed-source apps (Pragma, Worry Watch) exist; open-source decision journals exist but don't track worries; evidence from LaFreniere & Newman 2020 |
| 2026-10-13 | Repositioned from "worry journal" to "prediction tracker for overthinkers" | Critique: avoidant users fear revisiting worries. Check-backs show one line only; "Let it go"; no guilt |
| 2026-10-13 | Working name "Pebble" | Metaphor: setting down a pebble you've carried; drives calm visuals and copy |
| 2026-10-13 | Repo created private at itsharshhy/pebble | Maintainer decides on going public later |
| 2026-10-13 | `--sage-deep` (#56705F) added for primary buttons | White on `--sage` measured 2.55:1 (fails WCAG); white on sage-deep is 5.41:1 |
| 2026-10-13 | Handbook split into one page per topic per SDLC phase (v2.0) | Maintainer request: every aspect gets its own deep page; agents follow it literally |
| 2026-10-13 | Docs auto-pushed after every change; project memory kept in AGENTS.md | Maintainer standing instruction |

## 7. Research summary (details in the handbook's Science page)
- Worry Outcome Journal: 91.4% of tracked worries didn't come true (n = 29, GAD; small sample, **don't generalise**).
- Self-guided mental-health apps have small effects (anxiety g ≈ 0.20, 176 RCTs), so claims stay humble.
- Venting-only writing can maintain rumination, so every flow ends in a step forward.
- Market gap (2026-10): closest apps are closed-source iOS; open-source journals don't do outcome tracking.
