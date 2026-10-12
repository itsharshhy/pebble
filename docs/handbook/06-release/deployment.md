# Deployment
*Phase: Release · Putting Pebble on the web with GitHub Pages.*

## Important fact first
**GitHub Pages on a private repository requires a paid plan** (GitHub Pro, Team or Enterprise).
On the free plan, Pages works only for **public** repositories. So before v1 launch, either:
- **Make the repo public** (follow [Going public](going-public.md) first), or
- Use a paid plan, or
- Use another free static host that can deploy from a private repo (e.g. Cloudflare Pages, Netlify). Each needs its own privacy review: no analytics may be enabled.

Until then, run Pebble locally ([Dev environment](../01-planning/dev-environment.md)).

## Deploy with GitHub Pages (once the repo is public)
1. GitHub → repo → **Settings → Pages**.
2. **Source:** Deploy from a branch → Branch: `main` → Folder: `/ (root)` → **Save**.
3. Wait 1–2 minutes. Pebble goes live at **https://itsharshhy.github.io/pebble/**.
4. Every push to `main` redeploys automatically.

Or from the terminal:
```bash
gh api repos/itsharshhy/pebble/pages -X POST -f "source[branch]=main" -f "source[path]=/"
```

## Pre-deploy checklist
- [ ] [Manual checklist](../05-testing/manual-checklist.md) passed on `main`
- [ ] Calm Audit recorded for changed screens
- [ ] Version number updated in About and `CHANGELOG.md` ([Versioning](versioning.md))
- [ ] No `console.log`, no test data, no TODOs in user-visible text
- [ ] CSP `<meta>` present

## Post-deploy checks (on the live URL)
- [ ] Loads over HTTPS (GitHub Pages enforces it)
- [ ] Network tab: same-origin only
- [ ] Add a test pebble, reload, then delete everything
- [ ] Lighthouse on the live URL ≥ 95 accessibility

## Rolling back
If a release breaks something:
```bash
git revert <bad-commit-id>
```
```bash
git push
```
Pages redeploys the previous behaviour within minutes. User data is unaffected because it lives in
their browser, but **schema migrations can't be rolled back automatically**. That's why migrations
always back up first ([Data model](../03-design/data-model.md#migrations)).

## Custom domain (optional, later)
A custom domain (e.g. `pebble.app`) costs money yearly and adds DNS setup. Not needed for v1.

## Done when
The live URL passes the post-deploy checks.
