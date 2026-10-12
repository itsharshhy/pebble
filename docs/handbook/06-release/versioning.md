# Versioning and changelog
*Phase: Release · Version numbers people can trust, and release notes people can read.*

## Semantic Versioning (SemVer 2.0.0)
Version = **MAJOR.MINOR.PATCH**, e.g. `1.4.2`.
| Bump | When | Example |
|---|---|---|
| **MAJOR** | A change that could break existing data or habits (schema change needing migration, removed feature) | `1.x` → `2.0.0` (encrypted storage format) |
| **MINOR** | New feature, nothing broken | `1.0.0` → `1.1.0` (Evening unload) |
| **PATCH** | Bug fix only | `1.1.0` → `1.1.1` (timezone fix) |

Before `1.0.0`, anything may change. v1 launch = `1.0.0`.

## Tagging a release
```bash
git tag -a v1.0.0 -m "Pebble 1.0.0"
```
```bash
git push --tags
```
Then create a GitHub Release from the tag, pasting the changelog section. **Publishing a release is
public-facing, so the maintainer approves each one.**

## CHANGELOG.md (Keep a Changelog 1.1.0)
Written for users, not developers. Calm, plain words.
```markdown
## [1.1.0] - 2026-12-01
### Added
- Evening unload: a gentle space to empty your mind before sleep.
### Fixed
- Pebbles saved just after midnight now show the right check-back day.
```
Sections: **Added · Changed · Fixed · Removed · Security**. Newest on top.

## Where the version appears
Keep these **four** in step (a release checklist item):
- `src-tauri/tauri.conf.json` → `"version"` (installer file names and the system's "About this app")
- `src-tauri/Cargo.toml` → `version`
- `VERSION` in `ui/app.js` (the About screen reads it: "Pebble 1.1.0")
- `CHANGELOG.md`

## Done when
The tag, the installers, the GitHub Release, the About screen and the changelog all show the same version.
