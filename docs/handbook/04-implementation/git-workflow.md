# Git workflow
*Phase: Implementation · Saving, branching and pushing. Five commands cover 95% of it.*

## The mental model
```
 your files ──git add──▶ staging ──git commit──▶ local history ──git push──▶ GitHub
   (edit)                (choose)               (snapshot)                 (backup + share)
```

## The everyday five
```bash
git status
```
What changed? Always run this first.
```bash
git add .
```
Stage everything you changed.
```bash
git commit -m "feat: add check-back screen"
```
Save a snapshot with a message.
```bash
git push
```
Upload to GitHub.
```bash
git log --oneline -10
```
See the last 10 snapshots.

## Commit messages: Conventional Commits
Format: `type: short description in present tense`
| Type | Use for | Example |
|---|---|---|
| `feat` | New feature | `feat: add let it go animation` |
| `fix` | Bug fix | `fix: use local date for check-backs` |
| `docs` | Handbook, README | `docs: add accessibility page` |
| `style` | CSS or formatting only | `style: soften card shadow` |
| `refactor` | Restructure, no behaviour change | `refactor: split storage into its own file` |
| `test` | Tests | `test: cover date helpers` |
| `chore` | Housekeeping | `chore: update .gitignore` |

## Branches
- `main` is always working. Never commit half-finished features directly to it.
- One branch per feature loop:
```bash
git switch -c feat/garden
```
- When the loop's Definition of Done passes, merge (via a pull request once there are contributors):
```bash
git switch main
```
```bash
git merge feat/garden
```
```bash
git push
```
- **Exception:** documentation-only changes may go straight to `main`.

## Automatic push rule (project agreement)
Any handbook or documentation change made by the AI helper is **committed and pushed
immediately** without waiting to be asked. Code changes are pushed once the maintainer has seen
them working. See [AGENTS.md](../../../AGENTS.md).

## Privacy in Git
- Commits use the GitHub **noreply** email so a personal address never becomes public.
- Never commit backups or real worries. `.gitignore` blocks `pebble-backup*.json`.
- If something private is ever committed, deleting it in a new commit **does not** remove it from history. Stop and ask for help before pushing.

## Undo cheatsheet (safe ones)
| Situation | Command |
|---|---|
| Unstage a file | `git restore --staged <file>` |
| Throw away uncommitted changes to a file | `git restore <file>` (⚠️ permanent) |
| Fix the last commit message (before push) | `git commit --amend -m "new message"` |
| Undo a pushed commit safely | `git revert <commit-id>` (creates an opposite commit) |

Avoid `git push --force` and `git reset --hard` unless you fully understand them.

## Done when
`git status` says "nothing to commit, working tree clean" and `git log` matches GitHub.
