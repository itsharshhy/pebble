# Non-functional requirements
*Phase: Requirements · How well Pebble must work. Every line is measurable.*

Functional requirements say *what* Pebble does. Non-functional requirements say *how well*. If you
can't measure a requirement, it's a wish, not a requirement.

| ID | Area | Requirement | How we measure |
|---|---|---|---|
| N1 | **Privacy** | Zero network requests after the first page load. No analytics, fonts, CDNs or third-party scripts. | DevTools → Network, filter "All", after reload: only same-origin files |
| N2 | **Privacy** | No personal data in URLs (no worry text in query strings or hashes). | Code review; Network tab |
| N3 | **Performance** | Every interaction gives visible feedback in < 100 ms. | DevTools → Performance recording |
| N4 | **Performance** | First load < 1 s on "Fast 4G" throttling. | DevTools → Network throttling |
| N5 | **Size** | Whole app (HTML + CSS + JS + SVG) < 100 KB uncompressed. | File sizes |
| N6 | **Accessibility** | WCAG 2.2 level AA. | [Accessibility testing](../05-testing/accessibility-testing.md) |
| N7 | **Accessibility** | Lighthouse Accessibility score ≥ 95. | Lighthouse |
| N8 | **Offline** | After first visit, works without internet (v2 PWA; v1 works if the tab stays open). | Turn off Wi-Fi |
| N9 | **Reliability** | No data loss on reload, browser restart or app update. | Manual checklist; migration tests |
| N10 | **Compatibility** | Latest 2 versions of Chrome, Edge, Firefox and Safari (desktop and mobile). | Manual test on each |
| N11 | **Responsiveness** | Usable from 320 px to 1440 px width; no horizontal scroll. | DevTools device toolbar |
| N12 | **Calm** | Every screen passes the Calm Audit. | [Calm Audit](../05-testing/calm-audit.md) |
| N13 | **Maintainability** | No dependencies; no build step; each JS function ≤ 40 lines. | Code review |
| N14 | **Security** | User text is never inserted as HTML; imports are validated. | [Privacy and security](../03-design/privacy-security.md) tests |
| N15 | **Portability** | Export is human-readable JSON; import accepts any valid export from an earlier version. | Round-trip test |

## Why these numbers
- **100 ms:** below this, actions feel instant. Our tighter target, under Doherty's 400 ms ([S12](../00-foundation/science.md#s12)), is easy because everything is local.
- **100 KB:** a beginner can read the whole codebase; it loads instantly on slow phones.
- **Lighthouse 95:** automated tools catch roughly a third of accessibility issues, so 95 is the floor, not the goal. Manual testing does the rest.

## Done when
Every N-requirement has been measured at least once and recorded in the release notes.
