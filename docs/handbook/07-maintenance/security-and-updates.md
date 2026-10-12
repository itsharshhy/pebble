# Security and updates
*Phase: Maintenance · Keeping users safe over time.*

## Our advantage
With **zero dependencies and no server**, the usual sources of security work (outdated packages,
server patches, leaked databases) don't exist. Our job is to keep it that way, and to keep our
own code safe.

## Reporting vulnerabilities (becomes `SECURITY.md`)
> Please report security problems privately via GitHub's **"Report a vulnerability"** button
> (Security tab → Advisories), not in a public issue. We aim to reply within 7 days.
> Please don't include any personal journal content in reports.

Enable it: repo → Settings → Code security → **Private vulnerability reporting** (available on
public repos).

## Monthly security check (10 minutes)
- [ ] Network tab on the live site: still same-origin only
- [ ] CSP still present and unchanged
- [ ] Search the code for `innerHTML`, `eval`, `new Function`, `document.write`: each must be absent or reviewed
- [ ] Review any new browser API in use against [Privacy and security](../03-design/privacy-security.md)

## Browser changes to watch
- **Storage policies:** e.g. Safari's eviction of script-written storage after 7 days without user interaction. If policies tighten, prioritise the v2 PWA.
- **Deprecations** of APIs we use (rare for our stack).

## If a security bug is found (S1)
1. Fix privately on a branch.
2. Release a PATCH version with a **Security** section in the changelog (no exploit details).
3. Credit the reporter (with permission).
4. Write an ADR if the fix changes architecture.

## Done when
The monthly check is logged in an issue each month.
