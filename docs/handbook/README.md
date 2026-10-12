# The Pebble Handbook

The single source of truth for building Pebble, a calm, private prediction tracker for overthinkers.
Every page belongs to one phase of the **Software Development Life Cycle (SDLC)**. Anyone working on
Pebble, human or AI, follows these pages. If the code and the handbook disagree, fix one of them
in the same change.

> **For overthinkers (including the maintainer):** you never need the whole handbook at once.
> Read the **Foundation** once. After that, open only the page for the phase you're in. Every page
> ends with **"Done when"**. When that's true, stop polishing and move on.

## Map

```
00 Foundation ─▶ 01 Planning ─▶ 02 Requirements ─▶ 03 Design ─▶ 04 Implementation
                                                                       │
     08 Safety & Ethics (applies to every phase)                      ▼
                                 07 Maintenance ◀── 06 Release ◀── 05 Testing
```

### 00 · Foundation: why we exist and what we believe
| Page | What it answers |
|---|---|
| [Vision](00-foundation/vision.md) | What is Pebble, who is it for, what does success look like? |
| [Principles](00-foundation/principles.md) | The 7 rules every decision is checked against |
| [Science](00-foundation/science.md) | The research behind every feature, with honest strength ratings |
| [Glossary](00-foundation/glossary.md) | Plain-language meanings of every technical word |
| [References](00-foundation/references.md) | Full citations |

### 01 · Planning: how we work
| Page | What it answers |
|---|---|
| [Process model](01-planning/process-model.md) | Our SDLC, the build loop, Definition of Ready and Done |
| [Roadmap](01-planning/roadmap.md) | Versions v0 to v3, each with exit criteria |
| [Risk register](01-planning/risk-register.md) | What could go wrong and what we do about it |
| [Dev environment](01-planning/dev-environment.md) | Tools to install, and how to run Pebble locally |

### 02 · Requirements: what we build
| Page | What it answers |
|---|---|
| [Personas](02-requirements/personas.md) | Who we design for, and who we don't |
| [User stories](02-requirements/user-stories.md) | Every feature, with acceptance criteria |
| [Non-functional requirements](02-requirements/non-functional.md) | Privacy, speed, accessibility, offline: measurable targets |
| [Scope](02-requirements/scope.md) | In, out, and how to handle new ideas |

### 03 · Design: how it works and how it feels
| Page | What it answers |
|---|---|
| [Architecture](03-design/architecture.md) | How the pieces fit together |
| [Decisions (ADRs)](03-design/decisions.md) | Why we chose what we chose |
| [Data model](03-design/data-model.md) | What we store and how |
| [Screens](03-design/screens.md) | Every screen, specified |
| [Design system](03-design/design-system.md) | Colour, type, shape, spacing, components |
| [Motion, sound and haptics](03-design/motion-sound-haptics.md) | How things move, and why slowly |
| [Content and voice](03-design/content-and-voice.md) | Every word Pebble says, and how |
| [Accessibility](03-design/accessibility.md) | WCAG 2.2 AA, made concrete |
| [Privacy and security](03-design/privacy-security.md) | Threat model and protections |

### 04 · Implementation: how we write code
| Page | What it answers |
|---|---|
| [Tech stack](04-implementation/tech-stack.md) | What we use and why |
| [Project structure](04-implementation/project-structure.md) | Where every file goes |
| [Coding standards](04-implementation/coding-standards.md) | How code should look |
| [Git workflow](04-implementation/git-workflow.md) | Saving, branching, pushing |
| [Build plan](04-implementation/build-plan.md) | The exact order we build v1 |

### 05 · Testing: how we know it works and feels calm
| Page | What it answers |
|---|---|
| [Test strategy](05-testing/test-strategy.md) | What we test, when, and how |
| [Manual checklist](05-testing/manual-checklist.md) | Run before every release |
| [Accessibility testing](05-testing/accessibility-testing.md) | Keyboard, screen reader, zoom, motion |
| [Calm Audit](05-testing/calm-audit.md) | The 8 questions every feature must pass |
| [Usability testing](05-testing/usability-testing.md) | Testing with real people, ethically |

### 06 · Release: getting it to people
| Page | What it answers |
|---|---|
| [Deployment](06-release/deployment.md) | Hosting on GitHub Pages |
| [Versioning and changelog](06-release/versioning.md) | Version numbers and release notes |
| [Going public](06-release/going-public.md) | The checklist before the repo becomes public |

### 07 · Maintenance: keeping it healthy
| Page | What it answers |
|---|---|
| [Issue triage](07-maintenance/triage.md) | Handling bugs, ideas and feedback |
| [Contributing](07-maintenance/contributing.md) | How others can help |
| [Security and updates](07-maintenance/security-and-updates.md) | Keeping users safe over time |
| [Maintainer wellbeing](07-maintenance/maintainer-wellbeing.md) | Not burning out on a calm app |

### 08 · Safety and ethics: applies to every phase
| Page | What it answers |
|---|---|
| [User safety](08-safety-ethics/safety.md) | Crisis, vulnerability, "not medical care" |
| [Ethics and claims](08-safety-ethics/ethics-and-claims.md) | What we may and may not say |

---
*Handbook version 2.0 · last reviewed 2026-10-13*
