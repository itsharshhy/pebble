# Risk register
*Phase: Planning · Review monthly. Add a risk the moment you notice one.*

**Likelihood (L)** and **Impact (I)** are rated 1 (low) to 3 (high). **Score = L × I.**
Anything scoring 6 or more needs an active mitigation before the next release.

| # | Risk | L | I | Score | Mitigation | Owner |
|---|---|---|---|---|---|---|
| R1 | **The app increases anxiety** for some users (e.g. reminders of worries) | 2 | 3 | **6** | One-line check-backs only; "Let it go"; no guilt copy; safety notice; usability tests ask "how did that feel?" | Maintainer |
| R2 | **Data loss**: crash, disk error, uninstall, or a bad save | 1 | 3 | 3 | Atomic file writes in Rust; `pebble.previous.json`; corrupt copies kept; export to any folder; backup advice in About; monthly backup note (v1.x). *Was 6 when data lived in browser storage; lowered by [ADR-010](../03-design/decisions.md).* | Dev |
| R3 | **Scope creep**: features keep growing; v1 never ships | 3 | 2 | **6** | [Scope](../02-requirements/scope.md) change process; max 1 item in "Doing" | Maintainer |
| R4 | **Maintainer burnout or perfectionism** | 2 | 3 | **6** | [Maintainer wellbeing](../07-maintenance/maintainer-wellbeing.md); "Done when" lines; weekly loops | Maintainer |
| R5 | **Overclaiming** the science (legal or ethical exposure) | 2 | 3 | **6** | [Ethics and claims](../08-safety-ethics/ethics-and-claims.md) review before any public text | Maintainer |
| R6 | **Privacy leak** via a script, font, crate or plugin | 1 | 3 | 3 | No interface dependencies; few justified crates; CSP limited to IPC; no updater or HTTP plugin; Network check in Definition of Done | Dev |
| R7 | **XSS** via worry text or an imported file | 2 | 2 | 4 | `textContent` only; validate imports; see [Privacy and security](../03-design/privacy-security.md) | Dev |
| R8 | **Shoulder-surfing** on a shared computer | 2 | 2 | 4 | Neutral app name and icon; passcode in v2 | Dev |
| R9 | **Timezone bug**: check-backs appear a day early or late | 2 | 2 | 4 | Store dates as local `YYYY-MM-DD` strings; see [Data model](../03-design/data-model.md) | Dev |
| R10 | **Web view differences**: WebView2 (Chromium), WKWebView and WebKitGTK render or behave differently | 2 | 2 | 4 | Fallbacks for newer CSS; manual checklist on all three systems; CI builds on all three | Dev |
| R11 | **Unsigned installers** trigger macOS Gatekeeper and Windows SmartScreen warnings, which can scare people | 3 | 2 | **6** | README explains the safe "Open anyway" steps in plain words; budget decision on code signing before v1.0 public release ([Deployment](../06-release/deployment.md)) | Maintainer |
| R12 | **Name conflict**: "Pebble" is used by other products | 2 | 1 | 2 | Treat as working name; check before going public | Maintainer |
| R13 | **Low adoption** | 3 | 1 | 3 | Accepted. Success level 1 is personal use ([Vision](../00-foundation/vision.md)). | — |
| R14 | **Supply-chain risk** in Rust crates or GitHub Actions | 1 | 3 | 3 | Few crates; `Cargo.lock` committed; `--locked` builds; monthly `cargo audit`; well-known actions only | Dev |
| R15 | **GitHub Actions minutes run out** (macOS minutes count 10× on private repos) | 2 | 1 | 2 | Installers built by hand or on tags only; CI on Linux only | Maintainer |
| R16 | **Rust learning curve** for a new coder | 2 | 2 | 4 | Rust kept small (three files) and heavily commented; most changes happen in `ui/`; AI helper explains every Rust change line by line | Maintainer |

## Review log
| Date | Change |
|---|---|
| 2026-10-13 | Register created. |
| 2026-10-12 | Desktop move (ADR-009/010/011): R2 lowered from 6 to 3; R10, R11 rewritten; R14–R16 added. |

## Done when
Every risk scoring ≥ 6 has a mitigation that's actually implemented, not just written down.
