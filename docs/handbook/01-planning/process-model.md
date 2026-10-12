# Process model
*Phase: Planning · How every piece of work moves from idea to done.*

## The SDLC we use: iterative and incremental
The classic **waterfall** model runs each phase once, in a long line: all requirements, then all
design, then all code. It fails when you learn things late, and beginners learn everything late.

Pebble uses **iterative and incremental** development, the base of Agile practice:
- **Incremental:** the app grows one feature at a time.
- **Iterative:** each feature goes through *every* phase in a small loop.

```
 ┌──────────────── one loop = one feature, about 1 week ────────────────┐
 │ 1 Pick ─▶ 2 Specify ─▶ 3 Design ─▶ 4 Build ─▶ 5 Test ─▶ 6 Ship ─▶ 7 Reflect │
 └───────────────────────────────────────────────────────────────────────┘
                                   ↺ next feature
```

## The loop, step by step
| Step | What happens | Handbook page | Output |
|---|---|---|---|
| **1 Pick** | Choose the next item from the [Build plan](../04-implementation/build-plan.md) | Roadmap, Build plan | One GitHub Issue |
| **2 Specify** | Confirm the user story and acceptance criteria | [User stories](../02-requirements/user-stories.md) | Criteria in the Issue |
| **3 Design** | Sketch the screen; pick tokens and words | [Screens](../03-design/screens.md), [Design system](../03-design/design-system.md), [Content](../03-design/content-and-voice.md) | Sketch or notes |
| **4 Build** | Write the code on a branch | [Coding standards](../04-implementation/coding-standards.md), [Git workflow](../04-implementation/git-workflow.md) | Commits |
| **5 Test** | Checklist, accessibility, Calm Audit | [Testing](../05-testing/test-strategy.md) | Ticked checklist |
| **6 Ship** | Merge to main and push | [Deployment](../06-release/deployment.md) | Live change |
| **7 Reflect** | 5 minutes: what was hard? What would I change? | This page | One line in the Issue |

## Definition of Ready (before building starts)
An item is ready when:
- [ ] It's a user story with acceptance criteria.
- [ ] It passes the [Principles](../00-foundation/principles.md).
- [ ] Any psychological element has an entry in [Science](../00-foundation/science.md).
- [ ] It's small enough to finish in one week.

## Definition of Done (before it counts as finished)
- [ ] All acceptance criteria pass.
- [ ] The [manual checklist](../05-testing/manual-checklist.md) items affected by the change pass.
- [ ] The [Calm Audit](../05-testing/calm-audit.md) passes.
- [ ] Keyboard-only use works.
- [ ] No new network requests (DevTools → Network).
- [ ] The handbook is updated if behaviour changed.
- [ ] Committed with a Conventional Commit message and pushed.

## Roles
| Role | Who | Responsibilities |
|---|---|---|
| **Maintainer / product owner** | The project owner | Decides what gets built; approves every change; final say on calm |
| **AI pair programmer** | Claude (or another agent) | Explains before acting; writes small changes; follows this handbook; pushes after handbook or code changes |
| **Contributors** | Future volunteers | Follow [Contributing](../07-maintenance/contributing.md) |

## Working agreement between maintainer and AI
1. The AI explains **what** and **why** in plain words before changing code.
2. Each change is small enough to understand in 5 minutes.
3. The maintainer runs it and sees it before it's merged.
4. Handbook and documentation changes are committed and pushed automatically.
5. Anything public-facing (making the repo public, publishing a release, posting) needs explicit approval every time.

## Cadence
- **Weekly:** one loop. Pick on day 1, ship by day 7.
- **Monthly:** 30-minute review of the [Roadmap](roadmap.md) and the [Risk register](risk-register.md).
- **No deadlines with guilt.** If a week slips, the loop continues next week. See [Maintainer wellbeing](../07-maintenance/maintainer-wellbeing.md).

## Planning board (GitHub Projects)
Columns: **Ideas → Ready → Doing (max 1) → Testing → Done**.
"Doing" holds **one** item at a time. Limiting work in progress is a core Kanban practice, and it
also protects an overthinking mind from juggling.

## Done when
You can take one item from Ready to Done using only this page as a guide.
