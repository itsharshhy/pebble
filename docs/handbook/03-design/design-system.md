# Design system
*Phase: Design · Every visual value Pebble uses. Change a rule only by replacing its reason.*

Living reference: [`design/preview.html`](../../../design/preview.html). Tokens are CSS custom
properties defined once in `:root` and reused everywhere. **No hard-coded colours in components.**

## 1. Colour
**Why this palette:** low saturation and high brightness feel less arousing and more pleasant;
green and blue hues rate as pleasant ([S9](../00-foundation/science.md#s9)). We avoid red entirely,
because it's the universal alarm colour.

| Token | Day | Evening | Use |
|---|---|---|---|
| `--bg` | `#F6F3EE` warm paper | `#1B201F` | Page background |
| `--surface` | `#FFFDF9` | `#232A28` | Cards, phone frame |
| `--ink` | `#2F3833` | `#E7E3DB` | Main text |
| `--ink-soft` | `#5F6963` | `#A9B1AB` | Secondary text |
| `--sage` | `#8FA89A` | `#7F9A8B` | Pebble shapes and decoration **only** |
| `--sage-deep` | `#56705F` | `#8FAF9C` | Primary button background |
| `--sage-wash` | `#E3EBE5` | `#2C3632` | Soft buttons, "didn't happen" |
| `--mist` | `#DCE5EA` | `#2A3338` | Sky, info |
| `--sand` | `#EADFCF` | `#3A342C` | Warm highlights |
| `--clay` | `#C9A48E` | `#B08E79` | The only "attention" hue: used gently for "It happened" |

### Verified contrast (WCAG relative luminance; measured 2026-10-13)
| Pair | Ratio | Requirement | Result |
|---|---|---|---|
| ink on bg (day) | 10.94:1 | 4.5:1 text | ✅ |
| ink-soft on bg (day) | 5.15:1 | 4.5:1 | ✅ |
| ink-soft on surface (day) | 5.61:1 | 4.5:1 | ✅ |
| white on sage-deep (day button) | 5.41:1 | 4.5:1 | ✅ |
| white on sage (day) | 2.55:1 | 4.5:1 | ❌ **never put text on `--sage`** |
| ink on bg (evening) | 12.89:1 | 4.5:1 | ✅ |
| ink-soft on bg (evening) | 7.51:1 | 4.5:1 | ✅ |
| ink-soft on surface (evening) | 6.67:1 | 4.5:1 | ✅ |
| `#12201A` on sage-deep (evening button) | 7.04:1 | 4.5:1 | ✅ |

**Rules:** re-measure any new pair before use; never pure `#000`/`#FFF` for large areas; never
convey meaning by colour alone (pair with words or shapes).

## 2. Typography
- **Family:** `ui-rounded, "SF Pro Rounded", system-ui, "Segoe UI", sans-serif` ([ADR-003](decisions.md)).
- **Scale (px):** 14 caption · 16 secondary · **18 body** · 22 question · 28 title · 44 Garden number.
- **Line height:** 1.6 body, 1.2 large numbers. WCAG 1.4.12 requires layouts to survive 1.5.
- **Line length:** 45–70 characters (max content width 560 px).
- **Weights:** 400 regular, 600 semibold. Nothing else.
- **Never:** ALL CAPS, italics for long text, centred paragraphs over 2 lines, text under 14 px.

## 3. Shape
**Why:** people prefer curved forms ([S10](../00-foundation/science.md#s10)).
| Element | Radius |
|---|---|
| Phone frame / page sections | 40 px |
| Cards | 24 px |
| Inputs | 16 px |
| Buttons, chips | 999 px (pill) |
| Pebble shapes | organic: `border-radius: 55% 45% 50% 50% / 60% 55% 45% 40%` |

No sharp corners anywhere a user looks. No hard divider lines; use space instead (one soft 1 px line only above the nav).

## 4. Space
Scale: **4 · 8 · 12 · 16 · 20 · 24 · 32 · 48 · 64**. Card padding 20–24; screen padding 24;
gap between cards 12–20. White space is a feature: it lowers visual clutter.

## 5. Elevation
One soft shadow only: `0 1px 2px rgba(47,56,51,.04), 0 8px 24px rgba(47,56,51,.06)` (stronger
in the evening palette). No stacked shadows, no glows.

## 6. Components
| Component | Spec |
|---|---|
| **Primary button** | Pill, `--sage-deep` bg, white text (day) / `#12201A` (evening), min 44 px tall, full width on mobile. One per screen. |
| **Soft button** | Pill, `--sage-wash` or `--bg` bg, `--ink` text. |
| **Text link** | `--ink-soft`, underline offset 4 px. For Cancel, Skip, Let it go. |
| **Card** | `--bg` on `--surface`, radius 24, padding 20, pebble icon + text. |
| **Chip** | Pill, 40 px+ tall, `--bg` → selected `--sage-wash` + 2 px `--sage-deep` ring. |
| **Input** | Radius 16, `--bg`, no border at rest; 2 px `--sage` ring on focus. |
| **Pebble** | 44×36 organic shape, `--sage` / `--sand` / `--mist`. Decorative: `aria-hidden`. |
| **Focus ring** | 3 px `--sage` outline, 3 px offset, on every interactive element (`:focus-visible`). |

## 7. Iconography and illustration
- Line icons only where words alone aren't enough; 1.75 px stroke, rounded caps and joins.
- Illustrations: flat pond, stones, soft horizon. Max 3 colours from the palette. No faces, no people, no symbols of distress (rain clouds, broken hearts).
- All SVG, inline, < 4 KB each.

## 8. Evening palette
- Follows the system setting by default; manual choice in Settings.
- Not a health claim: offered for comfort ([Science: what we don't claim](../00-foundation/science.md#things-we-deliberately-dont-claim)).

## Done when
Every colour, size and radius in `style.css` comes from a token on this page.
