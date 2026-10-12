# Privacy and security
*Phase: Design · What we protect, from whom, and how.*

Pebble stores some of the most personal text a person writes. Our privacy promise is simple and
**verifiable**: *everything stays on this computer, and we never see it.*

## Threat model
| # | Threat | Who / how | Protection (v1) | Later |
|---|---|---|---|---|
| T1 | **Data sent to third parties** | Analytics, fonts, CDNs, update checks | No network code anywhere; system fonts; the CSP sets `connect-src` to Pebble's own IPC only; no updater plugin | — |
| T2 | **XSS**: text runs as code | Malicious text in a worry or imported file | User text rendered **only** with `textContent`; strict CSP (`script-src 'self'`); `freezePrototype` on | — |
| T3 | **Malicious import file** | Someone shares a crafted "backup" | Rust refuses files over 5 MB; the interface validates every field and type, ignores unknown fields, never evals | — |
| T4 | **Shoulder-surfing / shared computer** | Family member, partner, colleague | Neutral name and icon; nothing on Today beyond one-line text | Passcode + encryption (v2) |
| T5 | **Data loss** | Crash, power cut, disk error, uninstall | Atomic writes; `pebble.previous.json`; export to any folder | Monthly "Save a backup?" note (v1.x) |
| T6 | **Malicious fork or impersonation** | Someone ships a modified Pebble that collects data | Official download location stated in README; signed builds when funded (R11) | Signed release tags |
| T7 | **Supply-chain attack** | A compromised Rust crate | Few crates, each justified ([Tech stack](../04-implementation/tech-stack.md)); `Cargo.lock` committed; monthly `cargo audit` | — |
| T8 | **Personal data in URLs** | Worry text in history or logs | IDs only in the hash; never text (N2) | — |
| T9 | **The interface asking Rust for too much** | A bug or injected script calls commands | The interface gets only `core:default` permissions (no file system, shell, HTTP or opener); Rust exposes seven narrow commands; links come from a fixed list in Rust | — |
| T10 | **Other apps reading the data file** | Malware or another user on the same computer | The file sits in the person's own profile folder, protected by the operating system's user permissions | Encryption at rest (v2) |

## Content Security Policy
Set in `src-tauri/tauri.conf.json` (the app enforces it) and repeated as a `<meta>` tag in
`ui/index.html` (so the browser preview is protected too):
```
default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self';
connect-src ipc: http://ipc.localhost; form-action 'none'; base-uri 'none';
object-src 'none'; frame-src 'none'
```
- `connect-src ipc: http://ipc.localhost`: the interface can talk **only** to Pebble's own Rust side. It physically cannot send data to the internet. This is the strongest proof of our privacy promise.
- No inline scripts or `style` attributes. (Setting a style from JavaScript through `element.style` is allowed by CSP and used once, for stone timing in the Garden.)

## Tauri permissions (capabilities)
`src-tauri/capabilities/default.json` grants the window only `core:default`. Changing it needs an
ADR. Never add `fs`, `shell`, `http` or `opener` permissions to the interface: do the work in a
narrow Rust command instead.

## Safe rendering rule (memorise this)
```js
// ✅ Safe: the browser treats it as plain text
card.textContent = worry.text;

// ❌ Never: the browser would run any <script> or onerror= inside
card.innerHTML = worry.text;
```

## Encryption plan (v2), for the record
- Passcode → key with **Argon2id** (or PBKDF2-SHA-256 with ≥ 600,000 iterations) and a random salt, in Rust.
- Data encrypted with **AES-256-GCM**, a fresh random nonce per save.
- Crates chosen through an ADR; no home-made crypto.
- **Honest limit:** forget the passcode and the data is unrecoverable. Say so plainly before it's turned on.

## Privacy statement (for About and README)
> Pebble has no servers and no accounts. Everything you write stays in a file on this computer.
> Pebble can't send data anywhere; its security settings block it. Export a backup from time to
> time to keep your pebbles safe.

## Done when
The inspector shows zero outbound requests, the XSS test in the [manual checklist](../05-testing/manual-checklist.md)
passes, the CSP is in both places, and the capability file grants only `core:default`.
