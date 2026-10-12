# Accessibility
*Phase: Design · WCAG 2.2 level AA, made concrete for Pebble.*

Accessibility isn't an extra. A calm app that a blind user can't operate isn't calm for them.
Many "accessibility" features (big targets, clear words, reduced motion) also help tired and
stressed users, which is exactly when Pebble gets used.

## The rules (with the WCAG criterion each one satisfies)
### Perceivable
| Rule | WCAG |
|---|---|
| Text contrast ≥ 4.5:1; large text and UI parts ≥ 3:1 (see [verified table](design-system.md#verified-contrast-wcag-relative-luminance-measured-2026-10-13)) | 1.4.3, 1.4.11 |
| Never use colour alone: answers have words, statuses have text | 1.4.1 |
| Decorative pebbles and illustrations: `aria-hidden="true"` | 1.1.1 |
| Meaningful images have `alt` text | 1.1.1 |
| Works at 200% zoom and 320 px width without horizontal scroll | 1.4.4, 1.4.10 |
| Survives increased line, letter and word spacing | 1.4.12 |

### Operable
| Rule | WCAG |
|---|---|
| Everything works with a keyboard (Tab, Shift+Tab, Enter, Space, Esc) | 2.1.1 |
| No keyboard traps; dialogs return focus to the trigger on close | 2.1.2 |
| Visible focus ring on every interactive element (3 px `--sage`) | 2.4.7 |
| Focus not hidden behind sticky nav | 2.4.11 |
| Touch targets ≥ 44×44 px (exceeds 24×24 minimum) | 2.5.8 |
| No time limits, except Undo (8 s). Undo is a bonus, not required to avoid loss: answers can be changed later from the Garden list (v1.x). | 2.2.1 |
| Reduced motion respected; nothing flashes | 2.3.1, 2.3.3 |
| Logical focus order follows visual order | 2.4.3 |
| Page `<title>` changes with each screen ("Today · Pebble") | 2.4.2 |

### Understandable
| Rule | WCAG |
|---|---|
| `<html lang="en">` | 3.1.1 |
| Consistent navigation and labels across screens | 3.2.3, 3.2.4 |
| Every input has a visible label (not placeholder-only) | 3.3.2 |
| Errors described in text, with how to fix | 3.3.1, 3.3.3 |
| Destructive actions confirmed (Delete everything, Import replace) | 3.3.4 |

### Robust
| Rule | WCAG |
|---|---|
| Semantic HTML first: `<button>`, `<nav>`, `<main>`, `<h1>`, `<label>` | 4.1.2 |
| Status messages (closing line, "Saved") in `aria-live="polite"` regions | 4.1.3 |
| Chips are `<button aria-pressed>` or a radio group, never clickable `<div>`s | 4.1.2 |

## Pebble-specific patterns
- **Screen change:** move focus to the new screen's `<h1>` (with `tabindex="-1"`) so screen-reader users hear where they are.
- **Breath pause:** the instruction is announced once per phase, not every second.
- **Garden number:** read as a sentence: `aria-label="31 of 34 pebbles you checked didn't happen"`.
- **Pond of stones:** `aria-hidden`; the sentence carries the meaning.

## Done when
Every rule above is checked in [Accessibility testing](../05-testing/accessibility-testing.md) for the release.
