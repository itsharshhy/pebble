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

### Cloud sessions (Claude Code on the web): primary way of working
The maintainer works mainly in **cloud sessions**, which start from a fresh clone of this repo.
Nothing from earlier local sessions exists there. **This file and the handbook are the only memory.**
- The Windows-specific rows above (gh.exe path, long paths) apply to local sessions only. Cloud runs Linux.
- Set the commit identity at the start of every cloud session (noreply address; never a personal email):
  `git config user.name "itsharshhy"` and `git config user.email "95523979+itsharshhy@users.noreply.github.com"`
- Push docs changes to `main` as agreed in §3. **If the environment only allows pushing to a branch**, push to a branch and open a pull request, then tell the maintainer in one plain sentence.
- To preview the app, use the local preview command above, or describe what you changed if no browser is available.
- **At the end of every session**, update §5 (status) and §6 (decision log) and push, so the next session knows where things stand.

## 5. Current status (update at the end of every session)
- **Done:** Loop 0 (repo, 37-page handbook, design preview, AGENTS.md/CLAUDE.md).
- **Next for the maintainer (no code):** v0, the 14-day worry test on paper or phone notes ([Roadmap](docs/handbook/01-planning/roadmap.md#v0-prove-it-no-code)). Suggested, not yet confirmed as started.
- **Next for code:** Loop 1, a static Today screen in `index.html` + `style.css` with all tokens, matching `design/preview.html` ([Build plan](docs/handbook/04-implementation/build-plan.md)). Only begin when the maintainer asks.
- **Open decisions:** final name ("Pebble" is a working name); when to go public (needed for free GitHub Pages hosting).

## 5a. How to start any new session (for the agent)
1. Read this file fully, then [docs/handbook/README.md](docs/handbook/README.md).
2. Read the handbook pages for the phase you're working in.
3. Tell the maintainer in 2–3 plain sentences where the project stands (from §5) and what you propose next. Wait for a yes before writing code.
4. Work in small steps, explaining each one. Push docs immediately; push code once the maintainer has seen it.
5. Before ending: update §5 and §6, commit, push.

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
| 2026-10-13 | v0 (14-day paper test) comes before any code | Proves the loop helps before investing build time; the data decides, not opinions |
| 2026-10-13 | CLAUDE.md added as a one-line pointer (`@AGENTS.md`); work continues in cloud sessions | Cloud sessions start from a fresh clone, so all context must live in the repo |

## 7. Research summary (details in the handbook's Science page)
- Worry Outcome Journal: 91.4% of tracked worries didn't come true (n = 29, GAD; small sample, **don't generalise**).
- Self-guided mental-health apps have small effects (anxiety g ≈ 0.20, 176 RCTs), so claims stay humble.
- Venting-only writing can maintain rumination, so every flow ends in a step forward.
- Market gap (researched 2026-10-13):

| Existing | What it does | Gap Pebble fills |
|---|---|---|
| Pragma, Worry Watch, Scribble (iOS/Android) | Worry → check outcome later | Closed source, phone-only |
| decision-journal-electron, decision-diary, muse (GitHub) | Decision → review outcome | About decisions, not fears |
| Memex, Lotti, ai-journal, Rosebud | AI summarises entries, finds patterns | Never checks whether fears came true |
| Joplin, Logseq, jrnl, Memos, StoryPad | Write and store | No follow-up loop |

- Honest position: the core loop is a published CBT exercise, not a new invention. The novelty is the combination of open source, local-first, calm design and long-term personal record. Never claim "no one has done this".
- Audience: everyday non-clinical overthinkers, privacy-conscious journalers, therapy clients with worry-log homework. Not for acute crisis.
