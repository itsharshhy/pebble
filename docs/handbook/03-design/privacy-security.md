# Privacy and security
*Phase: Design · What we protect, from whom, and how.*

Pebble stores some of the most personal text a person writes. Our privacy promise is simple and
**verifiable**: *everything stays on this device, and we never see it.*

## Threat model
| # | Threat | Who / how | Protection (v1) | Later |
|---|---|---|---|---|
| T1 | **Data sent to third parties** | Analytics, fonts, CDNs, embedded widgets | Zero dependencies; system fonts; CSP blocks external loads; Network-tab check in Definition of Done | — |
| T2 | **XSS**: text runs as code | Malicious text in a worry or imported file | Render user text **only** with `textContent`; never `innerHTML` with user data; strict CSP | — |
| T3 | **Malicious import file** | Someone shares a crafted "backup" | Validate every field and type; ignore unknown fields; size cap 5 MB; never eval | — |
| T4 | **Shoulder-surfing / shared device** | Family member, partner, colleague | Neutral name and icon; nothing on Today beyond one-line text | Passcode + encryption (v2) |
| T5 | **Data loss** | Browser data cleared; Safari storage eviction | Export, backup reminder (v1.x) | PWA install + IndexedDB (v2) |
| T6 | **Malicious fork or impersonation** | Someone hosts a modified Pebble that collects data | Clear official URL in README; signed release tags (later) | — |
| T7 | **Supply-chain attack** | Compromised dependency | None to compromise: zero dependencies ([ADR-001](decisions.md)) | Keep it that way |
| T8 | **Personal data in URLs** | Worry text in history, logs, referrers | IDs only in the hash; never text (N2) | — |

## Content Security Policy (v1)
Delivered as a `<meta>` tag in `index.html`:
```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self'; style-src 'self';
               img-src 'self' data:; connect-src 'none'; form-action 'none';
               base-uri 'none'; object-src 'none'">
```
- `connect-src 'none'`: the app physically **cannot** send data anywhere. This is the strongest proof of our privacy promise.
- No inline scripts in the real app (the design preview is an exception, since it isn't the product).

## Safe rendering rule (memorise this)
```js
// ✅ Safe: the browser treats it as plain text
card.textContent = worry.text;

// ❌ Never: the browser would run any <script> or onerror= inside
card.innerHTML = worry.text;
```

## Encryption plan (v2), for the record
- Passcode → key via **PBKDF2** (SHA-256, ≥ 600,000 iterations, per OWASP 2023 guidance) with a random salt.
- Data encrypted with **AES-GCM** (256-bit) using a fresh random IV per save.
- All through the browser's built-in **Web Crypto API**. No crypto libraries.
- **Honest limit:** if the user forgets the passcode, the data is unrecoverable. Say so plainly before they enable it.

## Privacy statement (for About and README)
> Pebble has no servers and no accounts. Everything you write stays in this browser on this
> device. Pebble can't send data anywhere; its security settings block it. If you clear your
> browser data, your pebbles are deleted. Export a backup to keep them.

## Done when
DevTools shows zero outbound requests, the XSS test in the [manual checklist](../05-testing/manual-checklist.md) passes, and the CSP is present.
