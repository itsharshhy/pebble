# Going public
*Phase: Release · The checklist before the repository becomes public. The maintainer decides; nobody else.*

Making a repo public is **hard to undo**: forks, clones and caches can keep copies forever. So we
check everything first.

## 1. Nothing private in the history
- [ ] Search all commits for personal info: `git log -p | grep -i -E "password|token|@gmail|phone"`
- [ ] All commits use the noreply email: `git log --format='%ae' | sort -u`
- [ ] No real worries, exports or screenshots of personal data anywhere in history
- [ ] If anything private is found: **stop**. History must be rewritten *before* going public (ask for help; never improvise this).

## 2. The front door is ready
- [ ] README: what, why, "not medical care", privacy promise, how to install on each system (including the unsigned-app steps), link to the handbook
- [ ] LICENSE present (MIT)
- [ ] `CONTRIBUTING.md` ([Contributing](../07-maintenance/contributing.md))
- [ ] `CODE_OF_CONDUCT.md` (Contributor Covenant 2.1)
- [ ] `SECURITY.md`: how to report vulnerabilities privately ([Security](../07-maintenance/security-and-updates.md))
- [ ] Issue templates: Bug, Idea (with a Calm Audit question)

## 3. Claims are honest
- [ ] Every claim in the README and About passes [Ethics and claims](../08-safety-ethics/ethics-and-claims.md)
- [ ] Help links work and are current

## 4. Name check
- [ ] Search GitHub, app stores and trademarks for "Pebble" in the journaling and wellness space
- [ ] Decide: keep, or rename now (much cheaper before launch than after)

## 5. Settings on GitHub
- [ ] Repo description and topics (`journaling`, `mental-health`, `privacy`, `local-first`, `calm-technology`)
- [ ] Issues on; Discussions optional; Wiki off (the handbook is the wiki)
- [ ] Branch protection on `main` once there are contributors

## 6. The switch
```bash
gh repo edit itsharshhy/pebble --visibility public --accept-visibility-change-consequences
```
Then publish installers as a GitHub Release, with approval ([Deployment](deployment.md)). No website hosting is needed.

## Done when
Every box is ticked **and** the maintainer has said, in their own words, "make it public".
