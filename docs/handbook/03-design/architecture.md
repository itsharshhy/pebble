# Architecture
*Phase: Design · How the pieces fit together. Simple on purpose.*

Pebble is a **desktop app** for Windows, macOS and Linux built with **Tauri 2** ([ADR-009](decisions.md)).
It has two halves that talk to each other on the person's own computer. Nothing ever leaves it.

## The big picture
```
 ┌─────────────────────────── Pebble.app / Pebble.exe / pebble ───────────────────────────┐
 │                                                                                        │
 │  ui/  (the interface, shown in the system web view)                                    │
 │    index.html ── every screen as a <section>, hidden until shown                       │
 │    style.css  ── design tokens + components + motion                                   │
 │    app.js     ── starts everything                                                     │
 │      ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌───────────┐                        │
 │      │  router  │──▶│  views   │◀──│  state   │◀─▶│  storage  │                        │
 │      │ (#hash)  │   │ (render) │   │ (memory) │   │ (adapter) │                        │
 │      └──────────┘   └──────────┘   └──────────┘   └─────┬─────┘                        │
 │                                                          │ Tauri IPC (invoke)           │
 │ ─────────────────────────────────────────────────────────┼──────────────────────────── │
 │  src-tauri/  (Rust)                                       ▼                              │
 │    lib.rs      ── 7 commands: load, save, keep corrupt copy, delete everything,          │
 │                   export (Save dialog), import (Open dialog), open a fixed help link     │
 │    storage.rs  ── atomic file writes, previous-save backup, 5 MB cap                     │
 │                                                          │                               │
 │                                       app data folder ◀──┘  pebble.json                  │
 └────────────────────────────────────────────────────────────────────────────────────────┘
                  No server · No account · No network (the CSP forbids it)
```

## Why two halves
| Half | Language | Job | Why there |
|---|---|---|---|
| **Interface** (`ui/`) | HTML, CSS, JavaScript | Everything the person sees and touches | Accessible by default (screen readers, keyboard, zoom); premium type and motion are easy; no build step ([ADR-001](decisions.md)) |
| **Shell** (`src-tauri/`) | Rust | Disk, native dialogs, opening links, the window | Fast, memory-safe, small; the interface itself is given **no** file or network permissions |

## Interface modules (`ui/js/`)
| Module | Job | Knows about |
|---|---|---|
| **storage.js** | Load and save the document. Inside the app it calls Rust; in a plain browser it uses localStorage ([ADR-014](decisions.md)) | model, dates |
| **model.js** | Data shape, validation, migration, Garden counting. Pure functions, unit-tested | dates |
| **state.js** | Holds the document in memory; actions `addWorry`, `answer`, `letGo`, `undo`, `updateSettings`, `replaceDocument`, `deleteEverything` | storage, model |
| **views/** | One file per screen; draws from state; never writes to storage | state (read), strings, dom |
| **router.js** | Reads `location.hash` (`#today`, `#new`, `#check/<id>`, `#garden`, `#settings`, `#about`) | — |
| **strings.js** | Every word Pebble says (`STRINGS`) | — |
| **dates.js** | Local calendar dates ([ADR-008](decisions.md)) | — |
| **dom.js** | Small shared helpers (plain-text rendering, dialogs, notices, theme) | strings |

**Rule:** data flows one way. A user action calls a **state** action → state updates memory and
re-renders the **views** immediately (under 100 ms) → state queues a **save** in the background.
Saves run one after another, never out of order. Views never write to storage.

## Rust commands (`src-tauri/src/lib.rs`)
| Command | Does | Safety |
|---|---|---|
| `load_document` | Reads `pebble.json` (or nothing on first run) | Size cap |
| `save_document` | Writes the document atomically, keeps `pebble.previous.json` | Must be valid JSON under 5 MB |
| `keep_corrupt_copy` | Saves unreadable data as `pebble.corrupt.<time>.json` | Never silently delete |
| `delete_everything` | Removes every `pebble*.json` file Pebble wrote | Only files Pebble owns |
| `export_backup` | Opens the native **Save** dialog, writes the backup there | The person picks the place |
| `import_backup` | Opens the native **Open** dialog, returns the text | Size cap; the interface validates every field |
| `open_link` | Opens one of two fixed addresses (helpline directory, source code) in the person's browser | Fixed list in Rust; the interface can't pass an address |

The interface's permissions (`src-tauri/capabilities/default.json`) are only `core:default`: no
file system, shell, HTTP or opener access. Everything risky goes through the commands above.

## Where the data file lives
| System | Folder |
|---|---|
| Windows | `%APPDATA%\app.pebble.desktop\` |
| macOS | `~/Library/Application Support/app.pebble.desktop/` |
| Linux | `~/.local/share/app.pebble.desktop/` |

The system web engine also keeps its own housekeeping folders there (for example `WebKitCache`
on Linux). Pebble never writes worry text to them: it doesn't use browser storage in the app.

## Data flow for one action: answering a check-back
1. The person clicks "It didn't happen" → `views/check-back.js` calls `state.answer(id, 'didnt')`.
2. State updates the pebble (`status`, `resolvedAt`) and remembers the old value for Undo.
3. Views show the closing line and Undo right away.
4. In the background, state asks storage to save; storage calls Rust's `save_document`; Rust writes the file atomically.
5. If the save fails, a calm message appears ("Pebble can't save right now. Try exporting a backup.").
6. The person clicks Done → router goes to `#today` → Today re-renders.

## Why hash routing (still)
`#today`, `#garden` and so on switch screens without reloading the page, in the app and in the
browser preview alike ([ADR-006](decisions.md)). **No worry text ever goes in the hash** (N2).

## Error handling philosophy
- **Never show raw errors.** Log them with `console.warn` (interface) or return a short `Err` string (Rust).
- If saving fails: calm message, the change stays on screen, export still works.
- If stored data is unreadable: keep a copy (`pebble.corrupt.<time>.json`), start fresh, say so calmly. **Never silently delete.**
- If some pebbles are invalid: skip and **count** them, keep a copy of the original, tell the person.

## Future architecture (v2)
- **Encryption layer** between state and storage: passcode → key (PBKDF2 or Argon2 in Rust) → AES-GCM. The interface never sees the key on disk.
- **Optional local reminder** (one daily digest, off by default) through Tauri's notification plugin, with an ADR and a Science check first ([S8](../00-foundation/science.md#s8)).
- **Optional updates check**, off by default, only after an ADR (it would be Pebble's first network request).

## Done when
You can point at any line of code and say which half and which module it belongs to.
