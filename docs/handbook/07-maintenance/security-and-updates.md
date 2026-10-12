# Security and updates
*Phase: Maintenance · Keeping users safe over time.*

## Our advantage
With **no server, no interface dependencies and a handful of Rust crates**, the usual sources of
security work (server patches, leaked databases, hundreds of packages) mostly don't exist. Our
job is to keep it that way, keep the crates updated, and keep our own code safe.

## Reporting vulnerabilities (becomes `SECURITY.md`)
> Please report security problems privately via GitHub's **"Report a vulnerability"** button
> (Security tab → Advisories), not in a public issue. We aim to reply within 7 days.
> Please don't include any personal journal content in reports.

Enable it: repo → Settings → Code security → **Private vulnerability reporting** (available on
public repos).

## Monthly security check (15 minutes)
- [ ] `cargo install cargo-audit` once, then `cargo audit` in `src-tauri/`: no known vulnerabilities (or each one explained)
- [ ] `cargo update` for patch versions of Tauri and its plugins; run all checks; commit `Cargo.lock`
- [ ] Inspector Network tab: still no outside requests
- [ ] CSP in `tauri.conf.json` and `index.html` unchanged; capabilities still `core:default`
- [ ] Search the code for `innerHTML`, `eval`, `new Function`, `document.write`: each must be absent or reviewed
- [ ] Review any new browser API in use against [Privacy and security](../03-design/privacy-security.md)

## Browser changes to watch
- **Tauri security advisories** (github.com/tauri-apps/tauri/security). Patch releases are small; take them promptly.
- **WebView2 / WebKitGTK / WKWebView** updates come with the operating system, so people get engine security fixes without us.
- **Deprecations** of APIs we use (rare for our stack).

## If a security bug is found (S1)
1. Fix privately on a branch.
2. Release a PATCH version with a **Security** section in the changelog (no exploit details).
3. Credit the reporter (with permission).
4. Write an ADR if the fix changes architecture.

## Done when
The monthly check is logged in an issue each month.
