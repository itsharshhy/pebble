# Tech stack
*Phase: Implementation · What we use, and why each choice fits a beginner-built calm app.*

| Layer | Choice | Why | Decision |
|---|---|---|---|
| Structure | **HTML5** | Semantic elements give accessibility for free | — |
| Style | **CSS** (custom properties, grid, flexbox, `color-mix()`, media queries) | Tokens in one place; no preprocessor needed | [ADR-001](../03-design/decisions.md) |
| Behaviour | **JavaScript** (ES2020+, ES modules) | Runs in every browser; no build step | ADR-001 |
| Storage | **localStorage** → IndexedDB (v2) | Simple, local, no server | ADR-002 |
| Fonts | **System fonts** | Private, instant | ADR-003 |
| Routing | **Hash routing** | Works on static hosting | ADR-006 |
| Hosting | **GitHub Pages** | Free, from the repo | [Deployment](../06-release/deployment.md) |
| Version control | **Git + GitHub** | Industry standard | [Git workflow](git-workflow.md) |
| Testing | **Manual checklists + browser DevTools + Lighthouse**; small in-browser test page for pure functions | No tooling to install | [Test strategy](../05-testing/test-strategy.md) |
| Crypto (v2) | **Web Crypto API** | Built in, audited by browser vendors | [Privacy and security](../03-design/privacy-security.md) |

## Browser features we rely on (all broadly supported since 2023)
| Feature | Used for | Fallback |
|---|---|---|
| CSS custom properties | Design tokens | None needed (universal) |
| `color-mix()` | Soft tints (e.g. "It happened") | Declare a plain hex first; `color-mix` line after it overrides where supported |
| `prefers-reduced-motion` | Calm fallback | Default to motion only inside `@media (prefers-reduced-motion: no-preference)` |
| `prefers-color-scheme` | Evening palette | Day palette |
| `:focus-visible` | Focus rings for keyboard users | `:focus` |
| `<dialog>` | Confirmations | Universal in modern browsers |
| ES modules (`type="module"`) | Splitting `app.js` later | — |

## What we deliberately don't use (and when we'd reconsider)
| Not using | Reconsider when |
|---|---|
| React / Vue / Svelte | More than ~10 screens or complex shared state |
| npm packages | Never for v1; any future dependency needs an ADR |
| TypeScript | When a contributor joins and types would prevent real bugs |
| CSS frameworks (Tailwind, Bootstrap) | Never. Our design system *is* the framework |
| Analytics | Never ([Principles](../00-foundation/principles.md)) |

## Done when
`index.html` loads with zero third-party files and works in the latest Chrome, Firefox and Safari.
