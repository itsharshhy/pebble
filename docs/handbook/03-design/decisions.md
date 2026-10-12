# Architecture Decision Records (ADRs)
*Phase: Design · Why we chose what we chose. Add one for every significant decision.*

An ADR is a short, permanent note. Future you (or a contributor) will ask "why didn't they just
use X?" The ADR answers it. **Never edit an accepted ADR. Supersede it with a new one.**

**Template:**
```
## ADR-NNN: Title
Status: Proposed | Accepted | Superseded by ADR-NNN
Date: YYYY-MM-DD
Context: what situation forced a decision
Decision: what we chose
Consequences: what gets easier, what gets harder
```

---

## ADR-001: No framework, no build step
**Status:** Accepted, amended by ADR-009 · **Date:** 2026-10-13
*Amendment: the interface in `ui/` still has no framework and no build step. The desktop shell
is compiled by Cargo (ADR-009).*
**Context:** The maintainer is learning to code. v1 has 5 screens. Frameworks (React, Vue) add
concepts, tooling (Node, npm, bundlers) and hundreds of dependencies.
**Decision:** Plain HTML, CSS and JavaScript (ES2020+). Files are served as-is.
**Consequences:** + Learn fundamentals; zero dependencies to patch; tiny and fast. − More manual DOM code; revisit if screens exceed ~10.

## ADR-002: localStorage for v1, IndexedDB in v2
**Status:** Superseded by ADR-010 · **Date:** 2026-10-13
**Context:** Need on-device storage with no server.
**Decision:** v1 stores one JSON document in `localStorage` under key `pebble.v1`.
**Consequences:** + Simple, synchronous, universal. − About 5 MB limit; can be cleared with browser data; Safari may evict storage for sites unused for 7 days unless installed. Mitigated by export, backup reminders, and the v2 PWA.

## ADR-003: System fonts only
**Status:** Accepted · **Date:** 2026-10-13
**Context:** Web fonts from CDNs leak the user's IP address to third parties (a German court found
this violated GDPR in 2022). Self-hosting adds weight.
**Decision:** `ui-rounded, "SF Pro Rounded", system-ui, "Segoe UI", sans-serif`.
**Consequences:** + Private, instant, native feel. − Slight look differences per OS (accepted).

## ADR-004: No notifications in v1
**Status:** Accepted · **Date:** 2026-10-13
**Context:** Notifications raise inattention ([S8](../00-foundation/science.md#s8)) and could
deliver a worry reminder at a bad moment. Web push also requires a server.
**Decision:** v1 has no notifications. Due pebbles wait quietly on Today.
**Consequences:** + Calm, no server. − Users must open the app to see due pebbles. v2 may add one opt-in local daily digest.

## ADR-005: MIT licence
**Status:** Accepted · **Date:** 2026-10-13
**Context:** Want maximum reuse with minimal friction.
**Decision:** MIT.
**Consequences:** + Anyone can use, including commercially. − Others could build closed versions (accepted).

## ADR-006: Hash-based routing
**Status:** Accepted · **Date:** 2026-10-13 (still valid inside the desktop app, see ADR-009)
**Context:** GitHub Pages serves static files only; path-based routing would need server rewrites.
**Decision:** `#today`, `#new`, `#check/<id>`, `#garden`, `#settings`.
**Consequences:** + Works anywhere; back button works. − Slightly less pretty URLs.

## ADR-007: One-line worries (140-character cap)
**Status:** Accepted · **Date:** 2026-10-13
**Context:** Long venting can maintain rumination ([S7](../00-foundation/science.md#s7)); check-backs should show one line.
**Decision:** Worry text max 140 characters; next step max 100.
**Consequences:** + Fast capture, calm check-backs. − Some users want more room. Pebble is not a long-form journal.

## ADR-008: Dates as local calendar strings
**Status:** Accepted · **Date:** 2026-10-13
**Context:** `new Date().toISOString()` gives UTC. In India (UTC+5:30), a worry saved at 2 a.m.
would get yesterday's date, so check-backs would shift by a day.
**Decision:** Store `checkOn` as a local `YYYY-MM-DD` string built from local date parts; store
`createdAt`/`resolvedAt` as full ISO timestamps (for ordering only).
**Consequences:** + Check-backs always match the user's calendar. − Must use the helper `todayLocal()` everywhere; never compare dates with `toISOString()`.

## ADR-009: Pebble is a desktop app built with Tauri 2 (Rust)
**Status:** Accepted · **Date:** 2026-10-12
**Context:** The maintainer wants Pebble to be a fast, installable app for Windows, macOS and
Linux that runs fully on the person's computer, with no website to host. Options considered:
- **Electron:** ships a whole Chromium per app (installers of 80 to 150 MB, 150 MB+ memory). Rejected: heavy and slow to start.
- **Pure-Rust interfaces (egui, iced, Slint):** fast, but premium typography, illustration and accessible screen-reader support take far more work, and the existing interface would be thrown away.
- **Tauri 2:** a small Rust program that shows the interface in the operating system's own web view (WebView2 on Windows, WKWebView on macOS, WebKitGTK on Linux). Installers are usually under 15 MB.

**Decision:** Tauri 2. The interface stays plain HTML, CSS and JavaScript in `ui/` (ADR-001).
Rust in `src-tauri/` owns everything that touches the disk or the outside world: saving, backups,
export, import and opening help links.
**Consequences:** + Small, fast, native installers for all three systems; Rust's safety for the
code that guards the data; the interface keeps working in a plain browser for previews and tests.
− Three web engines to test instead of one; installers must be built on each system (done by
GitHub Actions, see [Deployment](../06-release/deployment.md)); unsigned apps show warnings on
macOS and Windows until we pay for code signing (risk R11); Rust is a new language for the
maintainer (risk R16).

## ADR-010: Data lives in one JSON file on disk, written by Rust
**Status:** Accepted · **Date:** 2026-10-12 · **Supersedes:** ADR-002
**Context:** Browser storage can be wiped with "clear browsing data" and Safari evicts it after
7 days (old risk R2). A desktop app can own a real file.
**Decision:** The document from the [Data model](data-model.md) is saved as `pebble.json` in the
app's data folder. Rust writes it **atomically** (temporary file → flush → rename) and keeps the
previous save as `pebble.previous.json`. Validation of the contents stays in `ui/js/model.js`
(one place, tested); Rust only checks the text is JSON and under 5 MB.
**Consequences:** + Data survives browser cleanups, crashes and power cuts; easy to back up by
copying a file. − Data stays on disk after uninstalling on some systems (documented in About and
the manual checklist). The browser preview still uses localStorage (ADR-014).

## ADR-011: No web hosting; installers are built by GitHub Actions
**Status:** Accepted · **Date:** 2026-10-12
**Context:** With a desktop app there is nothing to host. Each operating system's installer
must be built on that system.
**Decision:** `.github/workflows/ci.yml` checks every push (JavaScript tests, Rust tests, lint).
`.github/workflows/build.yml` builds installers for Windows, macOS (Apple Silicon and Intel) and
Linux when run by hand or when a version tag is pushed, and stores them as workflow artifacts.
Publishing a GitHub Release stays a manual, approved step (AGENTS.md §3.7).
**Consequences:** + No server, no hosting bill, no website to secure. − Uses GitHub Actions
minutes (macOS minutes count ten times on private repos); people must download and install.

## ADR-012: A system serif for display text
**Status:** Accepted · **Date:** 2026-10-12 · **Extends:** ADR-003
**Context:** The maintainer asked for a premium, beautifully crafted feel. A few calm "display"
moments (greeting, check-back quote, Garden number) read warmer in a serif.
**Decision:** `--font-display: ui-serif, "New York", "Iowan Old Style", Georgia, "Noto Serif", serif`.
Body text stays in the rounded system sans. Still nothing is downloaded.
**Consequences:** + Warmer, editorial feel at zero cost. − The serif differs slightly per system
(Georgia on Windows, New York on macOS, Noto or DejaVu Serif on Linux). Accepted.

## ADR-013: Focus ring and selected states use `--sage-deep`
**Status:** Accepted · **Date:** 2026-10-12
**Context:** `--sage` on the page background measures about 2.4:1, below the 3:1 that WCAG
1.4.11 asks of focus indicators.
**Decision:** Focus rings, selected chips and switches use `--sage-deep` (5.2:1 or more on every
background). `--sage` stays decorative only.
**Consequences:** + Keyboard users can always see where they are. − Slightly stronger rings than
the original mock-up.

## ADR-014: The interface still runs in a plain browser, for previews and tests
**Status:** Accepted · **Date:** 2026-10-12
**Context:** Building the desktop app takes minutes; trying a CSS change should take seconds.
Automated browser tests also need a page they can open.
**Decision:** `ui/js/storage.js` checks for Tauri (`window.__TAURI__`). Inside the desktop app it
calls Rust; in a plain browser it falls back to localStorage and normal downloads. The browser
preview is **for development only** and is never published.
**Consequences:** + Instant previews with `python -m http.server`; end-to-end tests without a
desktop build. − Two storage paths to keep in step; the Rust path is covered by `cargo test` and
the manual checklist.
