# Dev environment
*Phase: Planning · Set up once. About 30 minutes, most of it waiting for downloads.*

Pebble is a Tauri 2 desktop app ([ADR-009](../03-design/decisions.md)): a Rust shell plus a plain
HTML/CSS/JS interface. You need **Rust** and the **Tauri CLI**. You do **not** need Node.js.

## 1. Tools for every system
| Tool | Why | Install |
|---|---|---|
| **Git** | Saves versions | git-scm.com |
| **GitHub CLI (`gh`)** | Talks to GitHub from the terminal | cli.github.com |
| **Rust** (via `rustup`) | Compiles the desktop shell | rustup.rs, then `rustup default stable` |
| **Tauri CLI** | Runs and builds the app | `cargo install tauri-cli --version "^2" --locked` (about 5 minutes) |
| **Python 3** | Tiny local web server for the browser preview | python.org (already on most setups) |
| **VS Code** *(optional)* | Editor | code.visualstudio.com, plus the **rust-analyzer** extension |

## 2. System-specific requirements
### Windows 10 / 11
- **Microsoft C++ Build Tools**: install "Visual Studio Build Tools" and tick **Desktop development with C++**.
- **WebView2**: already on Windows 11. On Windows 10, install the "Evergreen Bootstrapper" from Microsoft if `cargo tauri dev` complains.
- If `gh` isn't on the PATH: `C:\Program Files\GitHub CLI\gh.exe` (see AGENTS.md §4).

### macOS
```bash
xcode-select --install
```
That installs the compilers. WKWebView is built in.

### Linux (Debian / Ubuntu)
```bash
sudo apt update
```
```bash
sudo apt install libwebkit2gtk-4.1-dev build-essential curl wget file libxdo-dev libssl-dev libayatana-appindicator3-dev librsvg2-dev
```
(Fedora, Arch and others: see the Tauri "Prerequisites" guide for the matching package names.)

## 3. Get the code
```bash
gh repo clone itsharshhy/pebble
```
```bash
cd pebble
```

## 4. Run Pebble
### As the real desktop app (recommended)
```bash
cargo tauri dev
```
Run it from the `src-tauri` folder or the repo root. The first run compiles for a few minutes;
later runs take seconds. The window reloads when you save a file in `ui/`.

### As a quick browser preview (interface only)
```bash
python -m http.server 5317 --bind 127.0.0.1 --directory ui
```
Open **http://localhost:5317**. Data goes to browser storage instead of a file ([ADR-014](../03-design/decisions.md)).
Use it for fast CSS and copy changes and for Lighthouse. Press **Ctrl + C** to stop.

## 5. Run the checks
JavaScript tests (Node 22 or newer):
```bash
node tests/tests.js
```
Or in a browser: serve the repo root with `python -m http.server 5317 --bind 127.0.0.1` and open
**http://localhost:5317/tests/** (green means pass).

Rust tests, lint and formatting:
```bash
cargo test --manifest-path src-tauri/Cargo.toml
```
```bash
cargo clippy --manifest-path src-tauri/Cargo.toml --all-targets -- -D warnings
```
```bash
cargo fmt --manifest-path src-tauri/Cargo.toml --check
```

## 6. Build an installer for your own system
```bash
cargo tauri build
```
Output: `src-tauri/target/release/bundle/` (`.msi`/`.exe` on Windows, `.dmg`/`.app` on macOS,
`.deb`/`.rpm`/`.AppImage` on Linux). Installers for all three systems come from GitHub Actions
([Deployment](../06-release/deployment.md)).

## Developer tools inside the app
In `cargo tauri dev`, right-click → **Inspect Element** (or Ctrl+Shift+I / Cmd+Option+I) opens the
web inspector. Use it like browser DevTools:
| Tab | Use it for |
|---|---|
| **Elements** | See and live-edit HTML and CSS |
| **Console** | See interface errors |
| **Network** | Confirm **zero** outside requests |
| **Rendering** (Chromium) | Emulate reduced motion and dark mode |
Release builds have the inspector turned off.

## Cloud sessions (AI helpers)
Cloud sessions run Linux. Install the Linux packages above, `cargo install tauri-cli`, then
`cargo test` and `cargo tauri build` work. There's no screen, so check the interface with the
browser preview and a headless browser.

## Done when
`cargo tauri dev` opens the Pebble window, `cargo test` and `node tests/tests.js` pass, and the
inspector's Network tab shows zero outside requests.
