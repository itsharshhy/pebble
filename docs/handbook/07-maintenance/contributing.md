# Contributing
*Phase: Maintenance · How others can help. Becomes `CONTRIBUTING.md` when the repo goes public.*

## Welcome
Thank you for wanting to help. Pebble is small on purpose and calm on purpose. Good
contributions often *remove* things.

## Before you start
1. Read [Principles](../00-foundation/principles.md) (2 minutes).
2. Look for issues labelled `good first issue`.
3. For anything bigger than a bug fix, **open an issue first** and describe the idea. This saves you building something we can't accept.

## Ground rules
- **No dependencies.** No npm packages, CDNs, fonts or analytics. ([ADR-001](../03-design/decisions.md))
- **No network requests.** The CSP blocks them anyway.
- **Every psychological feature needs a [Science](../00-foundation/science.md) entry** with an honest strength rating.
- **Every UI change passes the [Calm Audit](../05-testing/calm-audit.md)**. Include the record in your pull request.
- **Every string goes in `strings.js`** and follows [Content and voice](../03-design/content-and-voice.md).
- **Accessibility isn't optional.** Keyboard test at minimum.

## Pull request checklist
- [ ] Linked issue
- [ ] Conventional Commit messages ([Git workflow](../04-implementation/git-workflow.md))
- [ ] Manual checklist items affected: ticked
- [ ] Calm Audit: all ✅ (pasted in PR)
- [ ] Network tab: no new requests
- [ ] Handbook updated if behaviour changed
- [ ] Screenshots in both palettes for UI changes

## Code of conduct
We follow the **Contributor Covenant 2.1**. In short: be kind, assume good intent, and remember
that some contributors are here because they struggle with anxiety themselves.

## Recognition
All contributors are listed in the README. Small fixes count.

## Done when
A newcomer can make a correct first pull request using only this page.
