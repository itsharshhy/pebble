# Coding standards
*Phase: Implementation · How code should look, so a beginner can read all of it.*

## The three golden rules
1. **Clear over clever.** If you need a comment to explain *what* a line does, rewrite the line.
2. **Comments explain *why*.** `// 3 days: long enough for most everyday worries to resolve`
3. **Small pieces.** Functions ≤ 40 lines, doing one thing. Files ≤ 300 lines.

## HTML
- Semantic elements first: `<main>`, `<nav>`, `<section>`, `<h1>`, `<button>`, `<label>`, `<dialog>`.
- A `<button>` for actions, an `<a href>` for navigation. **Never a clickable `<div>`.**
- Every input has a `<label for>`.
- Each screen: `<section id="screen-today" hidden>` with exactly one `<h1 tabindex="-1">`.

## CSS
- File order: **tokens → base → components → screens → motion**.
- Only tokens for colour, space, radius and duration: `padding: var(--space-5)`, never `padding: 23px`.
- Class names describe *what it is*, not how it looks: `.pebble-card`, not `.green-box`.
- Motion inside `@media (prefers-reduced-motion: no-preference) { … }` so reduced motion is the default.
- No `!important` except in the reduced-motion override.

## JavaScript
```js
// ✅ Good: named, small, one job, explains why
/** Returns today's date as YYYY-MM-DD in the user's local timezone.
 *  Why not toISOString()? It uses UTC and shifts the date near midnight (ADR-008). */
function todayLocal() {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
}

// ❌ Bad: cryptic names, hidden UTC bug
const t = () => new Date().toISOString().slice(0, 10);
```
- `const` by default, `let` when reassigned, **never `var`**.
- Strict equality `===` always.
- Names: verbs for functions (`addWorry`, `renderToday`), nouns for data (`worries`, `checkOn`).
- Booleans read as questions: `isDue`, `hasNextStep`.
- No global variables except one `app` namespace.
- **User text: `textContent` only.** ([Privacy and security](../03-design/privacy-security.md))
- Handle errors where they happen: `try/catch` around `JSON.parse` and `localStorage` calls.
- No `console.log` left in committed code (use `console.warn` for real warnings only).

## Formatting
- 2-space indentation, single quotes in JS, semicolons on, line length ≤ 100.
- Prettier in the editor keeps this automatic (editor setting, not a project dependency).

## Review checklist (self or AI review before commit)
- [ ] Could a beginner explain what this does?
- [ ] Any user text going into `innerHTML`? (Must be no.)
- [ ] Any hard-coded colour or size? (Use a token.)
- [ ] Any new string not in `STRINGS`?
- [ ] Any date compared with `toISOString()`? (Use `todayLocal()`.)
- [ ] Handbook page updated if behaviour changed?

## Done when
The review checklist passes for every commit.
