# Roadmap
*Phase: Planning · Where we're going, and how we know each step is finished.*

Every version has **exit criteria**. We move on only when they're true, not when it "feels ready".

## v0: Prove it (no code)
**Goal:** find out whether the core loop helps *you*.
- For 14 days, write each noticed worry in one line with a check date (paper or phone notes).
- On each date, mark: didn't happen / happened / better / worse / let go.

**Exit criteria:** 14 days done; at least 10 worries checked; you can answer *"Did the count
surprise me?"* Status: suggested; the maintainer chose to build in parallel (decision log, 2026-10-12).
The app itself can now serve as the v0 tool.

## v1: The desktop app
**Goal:** a calm, private, fast desktop app for Windows, macOS and Linux that does one thing well.
- Must stories U1–U6, U14 and Should stories U7–U9, U13 ([User stories](../02-requirements/user-stories.md)).
- Tauri 2 shell; data in a local file written safely ([ADR-009](../03-design/decisions.md), [ADR-010](../03-design/decisions.md)).
- Light and evening palettes, premium dusk-pond illustration, reduced motion, keyboard accessible.
- Installers built by GitHub Actions ([Deployment](../06-release/deployment.md)).

**Exit criteria:** Definition of Done met for every story; manual checklist passed on Windows,
macOS and Linux; Lighthouse Accessibility ≥ 95; you used it daily for 14 days; 3 testers called it calm.

## v1.x: Comfort
- Evening unload (U10, [Science S3](../00-foundation/science.md#s3)).
- Areas such as work, health, people, money (U11).
- Gentle monthly "Save a backup?" note.
- Printable summary for therapy sessions (print to PDF from the app).
- A quiet way to change an answer later from the Garden.
- Remember window size and position.

**Exit criteria:** each feature passes the Calm Audit; nothing increases the screen count beyond 6.

## v2: Trust
- Optional passcode and encrypted storage (Rust, AES-256-GCM) (U12).
- Code-signed and notarised installers (needs a budget decision, risk R11).
- Optional single daily digest as a local system notification at a user-chosen time, off by default ([Science S8](../00-foundation/science.md#s8)).
- Optional worry window ([Science S13](../00-foundation/science.md#s13)), labelled "may help some people".
- Optional "check for updates" button (manual, never automatic), with an ADR.

**Exit criteria:** zero data-loss bugs across migration testing; security review of encryption.

## v3: Optional AI (only if v1–v2 succeed)
- Local-model option (e.g. via Ollama on the same computer) that *suggests* worries from free-form journaling, so zero data leaves the device.
- Bring-your-own-key cloud option only with consent each session, showing exactly what will be sent.
- Off by default.

**Exit criteria:** an ethics review against [Ethics and claims](../08-safety-ethics/ethics-and-claims.md); opt-in rate is not a goal.

## Maybe, someday
Translations (Hindi first?), therapist-shareable reports, mobile apps (Tauri 2 can target
Android and iOS, but each needs its own design and Calm Audit).

## What would make us stop or change course
- The loop doesn't help, even for the maintainer.
- Testers report Pebble makes them *more* anxious. Principle 1 overrides everything.

## Done when
Each version's exit criteria are ticked in its GitHub milestone.
