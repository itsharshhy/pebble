# Build plan
*Phase: Implementation · The order we build v1 of the desktop app. One row = one loop.*

Each loop follows the [Process model](../01-planning/process-model.md) and lists what you'll
**learn**, so the project teaches you as it grows. Status is updated at the end of every session.

| Loop | Build | Stories | You'll learn | Done when | Status |
|---|---|---|---|---|---|
| **0** | Repo, handbook, design preview | — | Git, GitHub, Markdown | Handbook v2 pushed | ✅ 2026-10-13 |
| **1** | Interface: all screens, tokens, strings | U1–U9, U13 | HTML, CSS variables, JS modules | Every screen matches [Screens](../03-design/screens.md) | ✅ 2026-10-12 |
| **2** | Data: model, validation, dates, Garden counts + unit tests | U2, U5, U6 | Pure functions, timezones | `node tests/tests.js` green in UTC, UTC+5:30, UTC−8, UTC+13 | ✅ 2026-10-12 |
| **3** | Desktop shell: Tauri 2, Rust storage (atomic writes, previous save), commands | U6 | Rust basics, Cargo, IPC | `cargo test` green; `cargo tauri dev` opens the window | ✅ 2026-10-12 (Linux) |
| **4** | Native export/import dialogs, fixed help links, CSP, capabilities | U6 | Tauri plugins, permissions | Round-trip test passes in the app | ✅ code done; manual run on each system pending |
| **5** | Premium visual pass: warm palette, display serif, dusk-pond illustrations, nav icons, motion | — | SVG, gradients, motion tokens | Calm Audit all ✅ in both palettes | ✅ 2026-10-12 |
| **6** | CI and installers for Windows, macOS, Linux | — | GitHub Actions | `build.yml` produces all installers | ✅ workflows written; first run pending |
| **7** | Manual checklist on Windows, macOS and Linux; fixes | all | Cross-platform testing | Full [manual checklist](../05-testing/manual-checklist.md) on each system | ⏳ Next |
| **8** | Accessibility + usability testing, fixes | — | Testing with people | [v1 exit criteria](../01-planning/roadmap.md#v1-the-desktop-app) met | ⏳ |
| **9** | Release 1.0.0 (with approval) | — | Tags, releases | Installers attached to a GitHub Release | ⏳ |

## Rules for every loop
- Start by reading the matching handbook pages (linked in each story).
- The AI helper explains the plan in plain words before writing code.
- Run the checks before every push: `node tests/tests.js`, `cargo test`, `cargo clippy -- -D warnings`, `cargo fmt --check`.
- End with the Calm Audit and a 5-minute reflection.
- If a loop takes more than 2 weeks, split it. That's normal, not a failure.

## Done when
All loops are ticked and v1.0.0 installers exist for all three systems.
