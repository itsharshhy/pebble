# Deployment: building and sharing installers
*Phase: Release · Getting Pebble onto people's computers. There's no website to host ([ADR-011](../03-design/decisions.md)).*

## How installers are made
An installer must be built **on** the system it's for, so GitHub Actions rents one of each.
| Workflow | Runs when | Does |
|---|---|---|
| `.github/workflows/ci.yml` | Every push and pull request | JavaScript tests, Rust tests, `clippy`, `rustfmt` on Linux |
| `.github/workflows/build.yml` | By hand (**Actions → Build installers → Run workflow**) or when a tag like `v1.0.0` is pushed | Builds installers on Windows, macOS (Apple Silicon + Intel) and Linux, uploads them as **artifacts**, and, only if **publish** is ticked or a version tag was pushed, creates the GitHub Release `v<version>` with the installers and `.github/release-notes.md`. Versions starting with `0.` are marked pre-release |

## What each system gets
| System | Files | Notes |
|---|---|---|
| **Windows 10/11** | `Pebble_x.y.z_x64-setup.exe` (NSIS), `Pebble_x.y.z_x64_en-US.msi` | If WebView2 is missing (rare on Windows 10), the installer downloads it from Microsoft once, during installation only |
| **macOS 10.15+** | `Pebble_x.y.z_universal.dmg` | One file for Apple Silicon and Intel |
| **Linux** | `.AppImage` (runs anywhere), `.deb` (Debian/Ubuntu), `.rpm` (Fedora/openSUSE) | Needs WebKitGTK 4.1; `.deb`/`.rpm` install it automatically |

## Getting the installers (private repo)
1. GitHub → **Actions** → **Build installers** → **Run workflow** → `main`.
2. Wait about 15 to 25 minutes.
3. Open the finished run → **Artifacts** → download `pebble-windows`, `pebble-macos` or `pebble-linux`.

Artifacts are visible only to people with access to the repo and are kept 30 days.

## Code signing: the honest situation
Unsigned apps work, but the systems warn people the first time:
| System | What people see | Workaround | Proper fix |
|---|---|---|---|
| macOS | "Pebble can't be opened because Apple cannot check it" | Right-click the app → **Open** → **Open** | Apple Developer Program (about USD 99/year) + notarisation |
| Windows | SmartScreen: "Windows protected your PC" | **More info** → **Run anyway** | A code-signing certificate (yearly cost) |
| Linux | No warning | — | — |

Signing is a **maintainer decision with a cost** (risk R11). Until then, the README explains the
workaround in plain words. Never ask people to turn off their system's security entirely.

## Releasing a version (public-facing: needs approval every time)
1. Pre-release checklist below passes.
2. Update the version in **three** places: `src-tauri/tauri.conf.json`, `src-tauri/Cargo.toml`, `VERSION` in `ui/app.js` ([Versioning](versioning.md)).
3. Add the `CHANGELOG.md` section. Commit.
4. **With the maintainer's explicit approval only:** run **Build installers** with **publish** ticked (or push a tag `v1.0.0`). The workflow builds all installers and creates the release `v<version>` with them attached.
5. Check the release page: every system's file is there and downloads.

## Pre-release checklist
- [ ] [Manual checklist](../05-testing/manual-checklist.md) passed on **each** system (Windows, macOS, Linux)
- [ ] Calm Audit recorded for changed screens
- [ ] CI green on the release commit
- [ ] Version matches in all three places and the About screen
- [ ] No `console.log`, test data or TODOs in user-visible text
- [ ] CSP in `tauri.conf.json` unchanged (or changed with an ADR)
- [ ] Help numbers re-verified ([Safety](../08-safety-ethics/safety.md))

## Post-install checks (on a real machine)
- [ ] Installs and opens without a terminal window
- [ ] Add a test pebble, quit, reopen: it's still there
- [ ] Export a backup to the Desktop, delete everything, import it: identical
- [ ] Inspector Network tab (dev build) or a firewall log: zero outside requests

## Rolling back
If a release breaks something, revert the commit (`git revert <id>`), tag a PATCH version and
rebuild. People's data stays in their data folder, and `pebble.previous.json` holds the save
before the last one. **Schema migrations can't be undone automatically**, which is why
migrations always back up first ([Data model](../03-design/data-model.md#migrations)).

## Done when
A person who has never seen the repo can install Pebble from the artifact on their system,
use it, quit, reopen, and find their pebbles.
