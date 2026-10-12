# Architecture
*Phase: Design · How the pieces fit together. Simple on purpose.*

## The big picture
```
 ┌──────────────────────── The user's browser ────────────────────────┐
 │                                                                    │
 │  index.html ── structure of all screens (hidden until shown)        │
 │  style.css  ── design tokens + components                           │
 │  app.js     ── four small modules:                                  │
 │                                                                    │
 │     ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐       │
 │     │  router  │──▶│   view   │◀──│  state   │◀─▶│ storage  │       │
 │     │ (#hash)  │   │ (render) │   │ (memory) │   │ (local)  │       │
 │     └──────────┘   └──────────┘   └──────────┘   └────┬─────┘       │
 │                                                       ▼             │
 │                                               localStorage          │
 └────────────────────────────────────────────────────────────────────┘
           No server · No database · No network after load
```

## Modules (inside `app.js`)
| Module | Job | Knows about |
|---|---|---|
| **storage** | Load and save JSON to localStorage; validate; migrate old versions | Data model only |
| **state** | Holds the worries in memory; offers actions (`addWorry`, `answer`, `letGo`, `undo`) | storage |
| **view** | Draws screens from state; never changes data directly | state (read only) |
| **router** | Reads `location.hash` (`#today`, `#new`, `#check/<id>`, `#garden`, `#settings`) and tells view what to show | view |

**Rule:** data flows one way. A user action calls a **state** action, state saves via **storage**,
then **view** re-renders. View never writes to storage. This makes bugs easy to find: if data
is wrong, look in state; if display is wrong, look in view.

## Why hash routing
`#today`, `#garden` and so on change the screen without reloading and work on GitHub Pages with
no server config. The back button works naturally. **No worry text ever goes in the hash** (N2).

## Data flow for one action: answering a check-back
1. User taps "It didn't happen" → view calls `state.answer(id, "didnt")`.
2. State updates the worry (`status`, `resolvedAt`) and keeps the old value for Undo.
3. State calls `storage.save(data)`.
4. View shows the closing line and the Undo option.
5. User taps Done → router goes to `#today` → view renders Today.

## Error handling philosophy
- **Never show raw errors** to users. Log them to the console for developers.
- If storage fails (full or disabled): calm message, "Pebble can't save on this browser right now. Your last pebble is still on screen. Try exporting a backup."
- If stored data is corrupt: keep a copy under a separate key (`pebble.corrupt.<date>`), start fresh, and tell the user calmly with an export option. **Never silently delete.**

## Future architecture (v2)
- **Storage → IndexedDB** behind the same storage interface, so state and view don't change.
- **Service worker** caches the files for offline use and installability.
- **Encryption layer** between state and storage (Web Crypto, AES-GCM, key derived from passcode with PBKDF2).

Keeping the four modules separate now makes all of this a swap, not a rewrite.

## Done when
You can point at any line of `app.js` and say which module it belongs to.
