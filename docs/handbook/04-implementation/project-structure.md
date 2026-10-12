# Project structure
*Phase: Implementation · Where every file lives. If you're unsure where something goes, it's here.*

```
pebble/
├── ui/                          The interface (shown inside the desktop app's web view)
│   ├── index.html               All screens as <section>s, hidden until routed; shared SVG gradients
│   ├── style.css                1) tokens  2) base  3) components  4) screens  5) motion
│   ├── app.js                   Entry point: loads state, wires views, starts the router; VERSION
│   ├── js/
│   │   ├── strings.js           Every user-facing string (STRINGS)
│   │   ├── dates.js             todayLocal(), addDays(), relative labels (ADR-008)
│   │   ├── model.js             Data shape, validation, migration, Garden counts (pure)
│   │   ├── storage.js           Tauri commands in the app; localStorage in the browser preview
│   │   ├── state.js             The document in memory + actions + ordered background saves
│   │   ├── router.js            Hash → screen
│   │   ├── dom.js               Shared helpers: plain-text rendering, dialogs, notices, theme
│   │   └── views/
│   │       ├── today.js         Today + first-run welcome
│   │       ├── new-worry.js     New worry
│   │       ├── check-back.js    Breath pause + Check-back
│   │       ├── garden.js        Garden
│   │       └── settings.js      Settings + About
│   └── assets/
│       └── icon.svg             Window/tab icon (copy of design/icon.svg)
├── src-tauri/                   The Rust desktop shell
│   ├── Cargo.toml               Rust package and crate list (each crate needs a reason)
│   ├── Cargo.lock               Exact crate versions (committed)
│   ├── build.rs                 Tauri's build step
│   ├── tauri.conf.json          Window, security policy (CSP), bundle settings, version
│   ├── capabilities/
│   │   └── default.json         What the interface may ask for: core:default only
│   ├── icons/                   App icons for every system (generated, see below)
│   └── src/
│       ├── main.rs              Starts the app
│       ├── lib.rs               The seven commands the interface can call
│       └── storage.rs           Atomic file writes, backups, size cap + tests
├── tests/
│   ├── index.html               In-browser test page (open via the local server)
│   └── tests.js                 Tests for dates, validation, Garden maths, words, routes
├── design/
│   ├── icon.svg                 Source of the app icon
│   ├── icon-1024.png            Rendered icon used to generate src-tauri/icons
│   └── preview.html             The original v0 design mock-up (historical reference)
├── .github/workflows/
│   ├── ci.yml                   Tests and lint on every push
│   └── build.yml                Installers for Windows, macOS and Linux
├── docs/handbook/               This handbook, one folder per SDLC phase
├── AGENTS.md                    Instructions + project memory for AI helpers
├── CLAUDE.md                    Points to AGENTS.md
├── README.md                    The front door
├── CHANGELOG.md                 Release notes
├── LICENSE                      MIT
└── .gitignore                   Keeps exports, build output and OS clutter out of Git
```

## Regenerating the icons
Edit `design/icon.svg`, render it to `design/icon-1024.png` (any SVG tool, 1024×1024), then:
```bash
cargo tauri icon design/icon-1024.png --output src-tauri/icons
```
Delete the `android/` and `ios/` folders it creates: Pebble is desktop-only.

## Rules
1. **One concern per file.** If you can't describe a file in one line, split it. Files ≤ 300 lines.
2. **Strings live in `ui/js/strings.js`**, never inline in logic ([Content](../03-design/content-and-voice.md#localisation-readiness)). HTML uses `data-s="key"`.
3. **Disk, dialogs and links live in Rust.** The interface never gets file or network permissions.
4. **No user data in the repo.** Exports are git-ignored (`pebble-backup*.json`), and so is `src-tauri/target/`.
5. **Docs move with code.** Changing behaviour means updating the matching handbook page in the same commit.
6. **Names:** files `kebab-case` (Rust files `snake_case`), JS `camelCase`, CSS classes `kebab-case`, constants `UPPER_SNAKE`.

## Done when
Every file in the repo has a home listed above (or the tree is updated).
