# Risk register
*Phase: Planning · Review monthly. Add a risk the moment you notice one.*

**Likelihood (L)** and **Impact (I)** are rated 1 (low) to 3 (high). **Score = L × I.**
Anything scoring 6 or more needs an active mitigation before the next release.

| # | Risk | L | I | Score | Mitigation | Owner |
|---|---|---|---|---|---|---|
| R1 | **The app increases anxiety** for some users (e.g. reminders of worries) | 2 | 3 | **6** | One-line check-backs only; "Let it go"; no guilt copy; safety notice; usability tests ask "how did that feel?" | Maintainer |
| R2 | **Data loss**: user clears browser data and loses everything | 3 | 2 | **6** | Export in Settings; monthly backup note (v1.x); IndexedDB + PWA in v2; clear warning in About | Dev |
| R3 | **Scope creep**: features keep growing; v1 never ships | 3 | 2 | **6** | [Scope](../02-requirements/scope.md) change process; max 1 item in "Doing" | Maintainer |
| R4 | **Maintainer burnout or perfectionism** | 2 | 3 | **6** | [Maintainer wellbeing](../07-maintenance/maintainer-wellbeing.md); "Done when" lines; weekly loops | Maintainer |
| R5 | **Overclaiming** the science (legal or ethical exposure) | 2 | 3 | **6** | [Ethics and claims](../08-safety-ethics/ethics-and-claims.md) review before any public text | Maintainer |
| R6 | **Privacy leak** via a third-party script, font or analytics | 1 | 3 | 3 | Zero dependencies; CSP; Network-tab check in Definition of Done | Dev |
| R7 | **XSS** via worry text or an imported file | 2 | 2 | 4 | `textContent` only; validate imports; see [Privacy and security](../03-design/privacy-security.md) | Dev |
| R8 | **Shoulder-surfing** on a shared device | 2 | 2 | 4 | Neutral app name and icon; passcode in v2 | Dev |
| R9 | **Timezone bug**: check-backs appear a day early or late | 2 | 2 | 4 | Store dates as local `YYYY-MM-DD` strings; see [Data model](../03-design/data-model.md) | Dev |
| R10 | **Browser support gaps** (e.g. `color-mix()` on old browsers) | 1 | 1 | 1 | Fallback colours; test on Chrome, Firefox, Safari | Dev |
| R11 | **GitHub Pages needs a public repo** (free plan) | 3 | 1 | 3 | Decide on going public before v1 launch; see [Deployment](../06-release/deployment.md) | Maintainer |
| R12 | **Name conflict**: "Pebble" is used by other products | 2 | 1 | 2 | Treat as working name; check before going public | Maintainer |
| R13 | **Low adoption** | 3 | 1 | 3 | Accepted. Success level 1 is personal use ([Vision](../00-foundation/vision.md)). | — |

## Review log
| Date | Change |
|---|---|
| 2026-10-13 | Register created. |

## Done when
Every risk scoring ≥ 6 has a mitigation that's actually implemented, not just written down.
