# Non-functional requirements
*Phase: Requirements · How well Pebble must work. Every line is measurable.*

Functional requirements say *what* Pebble does. Non-functional requirements say *how well*. If you
can't measure a requirement, it's a wish, not a requirement. "Fast" is defined here.

| ID | Area | Requirement | How we measure |
|---|---|---|---|
| N1 | **Privacy** | Zero network requests, ever. No analytics, fonts, CDNs, update checks or crash reports. | Inspector → Network in `cargo tauri dev`; a firewall log on a release build |
| N2 | **Privacy** | No personal data in the window's address (no worry text in the hash). | Code review; inspector |
| N3 | **Speed** | Every interaction gives visible feedback in < 100 ms (saving happens in the background). | Inspector → Performance recording |
| N4 | **Speed** | Cold start to a usable Today screen in < 1 s on a 5-year-old laptop. | Stopwatch, three runs, median |
| N5 | **Size** | Interface (`ui/`) < 150 KB uncompressed; `.exe`, `.msi`, `.dmg`, `.deb`, `.rpm` < 15 MB. The Linux `.AppImage` carries its own web engine (≈ 80 MB) and is exempt. | File sizes; workflow artifacts |
| N6 | **Memory** | Idle memory < 350 MB total, counting the app and its web-engine helper processes. | Task Manager / Activity Monitor / `ps` (add up `pebble`, `WebKit*` or `msedgewebview2`) |
| N7 | **Accessibility** | WCAG 2.2 level AA. | [Accessibility testing](../05-testing/accessibility-testing.md) |
| N8 | **Accessibility** | Lighthouse Accessibility ≥ 95 (run on the browser preview). | Lighthouse |
| N9 | **Offline** | Works with no internet at all, always. | Turn off Wi-Fi and use every screen |
| N10 | **Reliability** | No data loss on quit, crash, power cut, update or reinstall. Saves are atomic; the previous save is kept. | `cargo test`; manual checklist (force-quit test) |
| N11 | **Compatibility** | Windows 10 and 11 (x64), macOS 10.15+ (Apple Silicon and Intel), Ubuntu 22.04+ / Fedora 38+ (x64). | Manual checklist on each |
| N12 | **Window sizes** | Usable from 360 × 560 to full screen; no horizontal scroll; works at 200% zoom. | Resize the window; Ctrl/Cmd + plus |
| N13 | **Calm** | Every screen passes the Calm Audit. | [Calm Audit](../05-testing/calm-audit.md) |
| N14 | **Maintainability** | Each JS function ≤ 40 lines, each file ≤ 300 lines; no interface dependencies; each Rust crate justified in [Tech stack](../04-implementation/tech-stack.md). | Code review; `cargo clippy -D warnings` |
| N15 | **Security** | User text is never inserted as HTML; imports are validated; the interface has only `core:default` permissions. | [Privacy and security](../03-design/privacy-security.md) tests |
| N16 | **Portability** | Export is human-readable JSON; import accepts any valid export from an earlier version, including exports from the browser preview. | Round-trip test |

## Why these numbers
- **100 ms:** below this, actions feel instant. Easy because everything is local ([S12](../00-foundation/science.md#s12)).
- **1 s start:** a worry should be captured before it slips away. Tauri apps start fast because they reuse the system's web engine.
- **15 MB installer:** a fraction of an Electron app (80 to 150 MB). A calm app shouldn't weigh on the computer either.
- **Lighthouse 95:** automated tools catch only part of accessibility issues, so 95 is the floor, not the goal.
- **350 MB memory:** web engines run in helper processes. Measured on Linux on 2026-10-12: 332 MB resident across `pebble` + `WebKitWebProcess` + `WebKitNetworkProcess` (software rendering, shared libraries counted more than once). Re-measure on Windows and macOS and tighten the target if they're lower.

## Measured (2026-10-12, Linux x64, release build)
| Measure | Result |
|---|---|
| `.deb` / `.rpm` | 2.45 MB each ✅ |
| `.AppImage` | 77.6 MB (bundles WebKitGTK; exempt) |
| App binary | 6.3 MB |
| Interface (`ui/`) | about 98 KB ✅ |
| Memory, idle on Today | 332 MB total ✅ |
| Saves | Atomic; `pebble.previous.json` kept ✅ |

## Done when
Every N-requirement has been measured at least once per system and recorded in the release notes.
