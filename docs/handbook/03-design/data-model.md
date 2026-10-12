# Data model
*Phase: Design · Exactly what Pebble stores, and the rules for it.*

## Storage location
- **Desktop app:** one file, `pebble.json`, in the app's data folder ([ADR-010](decisions.md)):
  - Windows `%APPDATA%\app.pebble.desktop\` · macOS `~/Library/Application Support/app.pebble.desktop/` · Linux `~/.local/share/app.pebble.desktop/`
  - Written **atomically** by Rust (temporary file → flush → rename), so a crash never leaves half a file.
  - The save before the latest one is kept as `pebble.previous.json`.
  - Unreadable data is kept as `pebble.corrupt.<unix-seconds>.json`, never deleted silently.
- **Browser preview only** ([ADR-014](decisions.md)): key `pebble.v1` in `localStorage`.
- **Value:** one JSON document (below). **Settings** live in the same document so a single export captures everything.

## Document shape
```json
{
  "version": 1,
  "settings": {
    "theme": "system",
    "breathPause": false,
    "seenWelcome": true
  },
  "worries": [
    {
      "id": "w_lq3x9k2a",
      "text": "The presentation will go badly",
      "createdAt": "2026-10-13T21:04:00.000Z",
      "checkOn": "2026-10-16",
      "feeling": "nervous",
      "nextStep": "Rehearse once tomorrow",
      "area": null,
      "status": "open",
      "resolvedAt": null
    }
  ]
}
```

## Field rules
| Field | Type | Rules |
|---|---|---|
| `version` | integer | Schema version. Currently `1`. Increment on breaking change. |
| `settings.theme` | `"system"` · `"light"` · `"evening"` | Default `"system"`. |
| `settings.breathPause` | boolean | Default `false` (U9). |
| `settings.seenWelcome` | boolean | Default `false`. Set when the person taps **Begin** on the first-run cards, so they're never shown again. Missing in older files = `false`. |
| `id` | string | `"w_"` + random base-36. Unique. Never reused. |
| `text` | string | 1–140 chars after trimming. Required. |
| `createdAt` | ISO 8601 UTC string | Set once; used for ordering and "3 days ago" text. |
| `checkOn` | `"YYYY-MM-DD"` **local** date | Required. ≥ creation date; ≤ 1 year ahead. See [ADR-008](decisions.md). |
| `feeling` | string or `null` | One of: `nervous, uneasy, dread, unsure, tense, sad`. |
| `nextStep` | string or `null` | 1–100 chars, or null. |
| `area` | string or `null` | v1.x: `work, health, people, money, other`. |
| `status` | enum | `open`, `didnt`, `better`, `happened`, `worse`, `letgo`. |
| `resolvedAt` | ISO string or `null` | Set when status leaves `open`. Cleared by Undo. |

## Status lifecycle
```
            answer: didnt / better / happened / worse
   open ─────────────────────────────────────────────▶ resolved
     │                                                     │
     └──── let go ──▶ letgo                    undo (8 s) ─┘──▶ open
```

## Derived values (computed, never stored)
- **Due:** `status === "open" && checkOn <= todayLocal()`.
- **Checked:** status in `didnt, better, happened, worse`.
- **Didn't happen (for the Garden):** status in `didnt, better`. *"Better than I feared" counts as the feared outcome not happening*, which is consistent with the Worry Outcome Journal's coding. State it in the About page.
- **Let go** is excluded from both numerator and denominator.

## Validation (on every load and import)
0. Rust refuses anything that isn't JSON or is over 5 MB, before writing or after reading a backup.
1. Parse JSON inside `try/catch`.
2. Check `version` is a known integer.
3. For each worry: required fields present, types correct, enums valid, lengths in range.
4. Invalid worries are **skipped and counted**, not silently dropped: "2 pebbles couldn't be read and were left out."
5. Unknown fields are dropped; duplicate ids keep the first copy; bad settings fall back to defaults.
6. Never `eval`, never insert text as HTML.

## Migrations
When `version` changes, `storage.migrate(doc)` upgrades step by step (1→2→3). Rules:
- Always back up the old document (as `pebble.backup.v<old>.json` next to `pebble.json`) before migrating.
- Migrations are pure functions with tests.
- Imports from older versions go through the same migration path.

## Size estimate
A worry with all fields is about 300 bytes as JSON. Pebble caps the file at 5 MB: roughly
15,000 pebbles, more than 10 years at 4 a day. Saving the whole file takes a few milliseconds.

## Export format
The export file *is* the document above, pretty-printed (2-space indent), suggested as
`pebble-backup-YYYY-MM-DD.json` in the system's **Save** dialog. The person chooses where it goes. Readable in any text editor and importable into spreadsheets via
online JSON-to-CSV tools (a CSV export is planned for v1.x).

## Done when
A round trip (export → delete all → import) restores every pebble exactly.
