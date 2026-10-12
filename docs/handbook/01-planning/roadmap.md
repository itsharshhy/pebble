# Roadmap
*Phase: Planning · Where we're going, and how we know each step is finished.*

Every version has **exit criteria**. We move on only when they're true, not when it "feels ready".

## v0: Prove it (no code)
**Goal:** find out whether the core loop helps *you* before building anything.
- For 14 days, write each noticed worry in one line with a check date (paper or phone notes).
- On each date, mark: didn't happen / happened / better / worse / let go.

**Exit criteria:** 14 days done; at least 10 worries checked; you can answer *"Did the count
surprise me?"* If the answer is a flat no, revisit the idea before writing code.

## v1: The core loop
**Goal:** a calm, private web app that does one thing well.
- Must stories U1–U6 and Should stories U7–U9 ([User stories](../02-requirements/user-stories.md)).
- Light and evening palettes, reduced motion, keyboard accessible.
- Hosted on GitHub Pages ([Deployment](../06-release/deployment.md)).

**Exit criteria:** Definition of Done met for every story; Lighthouse Accessibility ≥ 95; you
used it daily for 14 days; 3 testers called it calm.

## v1.x: Comfort
- Evening unload (U10, [Science S3](../00-foundation/science.md#s3)).
- Areas such as work, health, people, money (U11).
- Gentle monthly "Save a backup?" note.
- Printable summary for therapy sessions.

**Exit criteria:** each feature passes the Calm Audit; nothing increases the screen count beyond 6.

## v2: Trust
- Installable PWA with offline support (service worker).
- Move storage from localStorage to IndexedDB, with automatic migration.
- Optional passcode and encrypted storage (Web Crypto API, AES-GCM) (U12).
- Optional single daily digest at a user-chosen time ([Science S8](../00-foundation/science.md#s8)).
- Optional worry window ([Science S13](../00-foundation/science.md#s13)), labelled "may help some people".

**Exit criteria:** zero data-loss bugs across migration testing; security review of encryption.

## v3: Optional AI (only if v1–v2 succeed)
- Bring-your-own-key AI that *suggests* worries from free-form journaling.
- Off by default; asks consent each session; shows exactly what will be sent.
- Local-model option (e.g. via Ollama) for zero data leaving the device.

**Exit criteria:** an ethics review against [Ethics and claims](../08-safety-ethics/ethics-and-claims.md); opt-in rate is not a goal.

## Maybe, someday
Translations (Hindi first?), therapist-shareable reports, Android/iOS wrappers.

## What would make us stop or change course
- v0 shows the loop doesn't help, even for the maintainer.
- Testers report Pebble makes them *more* anxious. Principle 1 overrides everything.

## Done when
Each version's exit criteria are ticked in its GitHub milestone.
