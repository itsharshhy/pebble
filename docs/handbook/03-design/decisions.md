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
**Status:** Accepted · **Date:** 2026-10-13
**Context:** The maintainer is learning to code. v1 has 5 screens. Frameworks (React, Vue) add
concepts, tooling (Node, npm, bundlers) and hundreds of dependencies.
**Decision:** Plain HTML, CSS and JavaScript (ES2020+). Files are served as-is.
**Consequences:** + Learn fundamentals; zero dependencies to patch; tiny and fast. − More manual DOM code; revisit if screens exceed ~10.

## ADR-002: localStorage for v1, IndexedDB in v2
**Status:** Accepted · **Date:** 2026-10-13
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
**Status:** Accepted · **Date:** 2026-10-13
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
