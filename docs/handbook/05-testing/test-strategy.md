# Test strategy
*Phase: Testing · What we test, when, and how, without installing any test tools.*

## What "working" means for Pebble
Pebble works when it is **correct** (does what the stories say), **safe** (no data leaves, no
data lost, no XSS), **accessible** (WCAG 2.2 AA), and **calm** (passes the Calm Audit). A
feature that's correct but stressful has failed.

## Test layers
| Layer | What | How | When |
|---|---|---|---|
| **1. Unit** | Pure functions: dates, validation, migration, Garden counting | `tests/index.html`, a tiny in-browser runner using `console.assert` and a results list. Open it in the browser; green = pass | Every loop that touches these functions |
| **2. Manual functional** | Every acceptance criterion | [Manual checklist](manual-checklist.md) | Every loop (affected items); full list before release |
| **3. Accessibility** | Keyboard, screen reader, zoom, motion, contrast | [Accessibility testing](accessibility-testing.md) | Every loop (keyboard); full before release |
| **4. Calm** | Emotional quality | [Calm Audit](calm-audit.md) | Every loop |
| **5. Usability** | Real people, real reactions | [Usability testing](usability-testing.md) | Before v1 release, then each major version |
| **6. Privacy** | Zero outbound requests; CSP present | DevTools → Network | Every loop |

## High-risk areas (test these hardest)
| Area | Why risky | Key tests |
|---|---|---|
| **Dates** | Timezones shift days ([ADR-008](../03-design/decisions.md)) | Change the OS timezone to UTC+5:30, UTC−8 and UTC+13; create a worry at 23:30 and 00:30; confirm `checkOn` matches the local calendar |
| **Storage** | Data loss is the worst bug | Reload, close and reopen the browser, full storage, private mode, corrupt JSON in DevTools |
| **Import** | Untrusted input | Empty file, non-JSON, wrong version, missing fields, 10 MB file, `<script>` in text |
| **Garden maths** | Trust depends on honesty | Hand-count a known dataset and compare |

## Unit test example
```js
// tests/index.html, plain JS, no libraries
test('todayLocal returns YYYY-MM-DD', () => {
  assert(/^\d{4}-\d{2}-\d{2}$/.test(todayLocal()));
});
test('let-go pebbles are excluded from the Garden', () => {
  const ws = [{ status: 'didnt' }, { status: 'letgo' }, { status: 'happened' }];
  const g = gardenCounts(ws);
  assert(g.checked === 2 && g.didntHappen === 1);
});
```

## Bug severity
| Level | Meaning | Response |
|---|---|---|
| **S1 Critical** | Data loss, data leak, XSS, or harmful content | Stop everything; fix; release a patch |
| **S2 Major** | A Must story broken | Fix before next release |
| **S3 Minor** | Cosmetic or Should story issue | Schedule |
| **S4 Calm** | Fails the Calm Audit | Treat as S2 (calm is a requirement, not polish) |

## Done when
All six layers have been run for the release, and there are no open S1, S2 or S4 bugs.
