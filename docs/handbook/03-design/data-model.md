# Data model
*Phase: Design · Exactly what Pebble stores, and the rules for it.*

## Storage location
- **Key:** `pebble.v1` in `localStorage`.
- **Value:** one JSON document (below).
- **Settings** live in the same document so a single export captures everything.

## Document shape
```json
{
  "version": 1,
  "settings": {
    "theme": "system",
    "breathPause": false
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
1. Parse JSON inside `try/catch`.
2. Check `version` is a known integer.
3. For each worry: required fields present, types correct, enums valid, lengths in range.
4. Invalid worries are **skipped and counted**, not silently dropped: "2 pebbles couldn't be read and were left out."
5. Never `eval`, never insert text as HTML.

## Migrations
When `version` changes, `storage.migrate(doc)` upgrades step by step (1→2→3). Rules:
- Always back up the old document under `pebble.backup.v<old>` before migrating.
- Migrations are pure functions with tests.
- Imports from older versions go through the same migration path.

## Size estimate
A worry with all fields is about 300 bytes as JSON. At about 5 MB per origin, that's roughly
15,000 pebbles: more than 10 years at 4 a day.

## Export format
The export file *is* the document above, pretty-printed (2-space indent), named
`pebble-backup-YYYY-MM-DD.json`. Readable in any text editor and importable into spreadsheets via
online JSON-to-CSV tools (a CSV export is planned for v1.x).

## Done when
A round trip (export → delete all → import) restores every pebble exactly.
