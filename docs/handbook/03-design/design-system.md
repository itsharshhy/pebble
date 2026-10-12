# Design system
*Phase: Design · Every visual value Pebble uses. Change a rule only by replacing its reason.*

Living reference: the app itself (`ui/style.css`, section 1 "Tokens"). `design/preview.html` is the
original v0 mock-up, kept for history. Tokens are CSS custom properties defined once in `:root`
and reused everywhere. **No hard-coded colours in components.**

## The feeling we're after
**A warm evening by still water.** Oat paper, moss, a low apricot sun, smooth stones. Premium
means *crafted and quiet*: generous space, soft depth, careful type, motion that explains. It
never means glossy, loud or busy.

## 1. Colour
**Why this palette:** low saturation and high brightness feel less arousing and more pleasant;
green and blue hues rate as pleasant ([S9](../00-foundation/science.md#s9)). We avoid red
entirely, because it's the universal alarm colour. Warmth comes from oat, sand and apricot.

### Interface tokens
| Token | Day | Evening | Use |
|---|---|---|---|
| `--bg` | `#F5EFE6` oat paper | `#191E1C` | Page background |
| `--surface` | `#FFFBF5` | `#212725` | Cards, inputs, dialogs |
| `--ink` | `#2C332E` | `#EDE7DD` | Main text |
| `--ink-soft` | `#5C645E` | `#AEB5AE` | Secondary text |
| `--sage` | `#93AB98` | `#7F9A8B` | Pebble shapes and decoration **only** |
| `--sage-deep` | `#4E6A57` | `#93B4A0` | Primary button, focus ring, selected chips and switches |
| `--on-primary` | `#FFFFFF` | `#10201A` | Text on `--sage-deep` |
| `--sage-wash` | `#E3EADF` | `#2B3531` | Soft buttons, "It didn't happen", selected chip fill |
| `--mist` | `#DCE6E4` | `#28323A` | Notices |
| `--sand` | `#EEDFCA` | `#3B342B` | Warm highlights |
| `--clay` | `#CF9F82` | `#B48C74` | The only "attention" hue, used gently for "It happened" |
| `--clay-wash` | `#F3E5DA` | `#463F38` | Fallback for `color-mix(clay 25%, surface)` |
| `--pebble-sand`, `--pebble-mist` | `#DCC7A9`, `#B6C9CC` | `#8C7E6A`, `#6F8590` | Stone colours on cards |
| `--line` | ink at 8% | ink at 8% | Hairline edges instead of borders |

### Illustration tokens (decorative only; never behind text)
`--sky-top`, `--sky-bottom`, `--glow`, `--sun`, `--hill-far`, `--hill-near`, `--water-top`,
`--water-bottom`, `--water-line`, `--reed`, `--stone-light`, `--stone-dark`, `--garden-stone-0..2`.
Day is a dusk sky over still water; evening is a moonlit version of the same scene.

### Verified contrast (WCAG relative luminance; measured 2026-10-12)
| Pair | Day | Evening | Requirement |
|---|---|---|---|
| ink on bg | 11.34 | 13.73 | 4.5 ✅ |
| ink on surface | 12.57 | 12.36 | 4.5 ✅ |
| ink-soft on bg | 5.34 | 8.06 | 4.5 ✅ |
| ink-soft on surface | 5.92 | 7.25 | 4.5 ✅ |
| ink-soft on sage-wash | 4.97 | 6.05 | 4.5 ✅ |
| ink-soft on mist | 4.79 | 6.23 | 4.5 ✅ |
| on-primary on sage-deep | 5.96 | 7.46 | 4.5 ✅ |
| ink on clay-wash ("It happened") | 10.51 | 8.42 | 4.5 ✅ |
| sage-deep (focus ring) on surface / bg / sage-wash | 5.78 / 5.21 / 4.85 | 6.71 / 7.46 / 5.60 | 3 ✅ ([ADR-013](decisions.md)) |
| white on `--sage` | ≈ 2.5 | — | ❌ **never put text on `--sage`** |

**Rules:** re-measure any new pair before use; never pure `#000`/`#FFF` for large areas; never
convey meaning by colour alone (pair with words or shapes).

## 2. Typography
- **Reading:** `ui-rounded, "SF Pro Rounded", system-ui, "Segoe UI", sans-serif` ([ADR-003](decisions.md)).
- **Display** (greeting, screen titles, check-back quote and question, closing line, Garden number, welcome text): `ui-serif, "New York", "Iowan Old Style", Georgia, "Noto Serif", serif` ([ADR-012](decisions.md)).
- **Scale (px):** 14 caption · 16 secondary · **18 body** · 22 question · 28 title · 44 Garden number.
- **Line height:** 1.6 body, 1.2 large numbers. Layouts must survive 1.5 (WCAG 1.4.12).
- **Line length:** 45–70 characters (max content width 560 px).
- **Weights:** 400 regular, 600 semibold. Nothing else.
- **Never:** ALL CAPS, italics for long text, centred paragraphs over 2 lines, text under 14 px.

## 3. Shape
**Why:** people prefer curved forms ([S10](../00-foundation/science.md#s10)).
| Element | Radius |
|---|---|
| Welcome card, illustrations, page sections | 40 px |
| Cards, dialogs | 24 px |
| Inputs | 16 px |
| Buttons, chips, switches | 999 px (pill) |
| Pebble shapes | organic: `55% 45% 50% 50% / 60% 55% 45% 40%`, with a soft top-left highlight |

No sharp corners anywhere a person looks. No hard divider lines; use space and 1 px `--line`
hairlines instead (plus one soft line above the nav).

## 4. Space
Scale: **4 · 8 · 12 · 16 · 20 · 24 · 32 · 48 · 64** (`--space-1` … `--space-9`). Card padding 20–24;
screen padding 24; gap between cards 12. White space is a feature: it lowers visual clutter.

## 5. Elevation
Two soft shadows only: `--shadow` (cards that can be clicked, primary buttons) and
`--shadow-lift` (hover, dialogs). Stronger in the evening palette. No glows, no stacked shadows.

## 6. Components
| Component | Spec |
|---|---|
| **Primary button** | Pill, `--sage-deep`, `--on-primary` text, semibold, 48 px tall, soft inner highlight. **One per screen.** Full width in narrow windows, at least 260 px wide in wider ones |
| **Soft button** | Pill, `--sage-wash`, `--surface` or `--bg`, `--ink` text |
| **Text link** | `--ink-soft`, underline offset 4 px, half-strength underline. For Cancel, Skip, Let it go |
| **Card** | `--surface`, radius 24, padding 20, hairline edge, pebble + text. Ready cards add `--shadow` and lift 1 px on hover |
| **Chip** | Pill, 44 px+ tall, hairline edge → selected: `--sage-wash` fill + 2 px `--sage-deep` inner ring + semibold |
| **Input** | Radius 16, `--surface`, hairline edge, 52 px tall; 2 px `--sage-deep` outline on focus |
| **Switch** | Pill track with `--ink-soft` ring; on: `--sage-deep` fill, knob slides right. `role="switch"` |
| **Pebble** | 44×36 organic shape, `--sage` / `--pebble-sand` / `--pebble-mist` chosen from the id. Decorative: `aria-hidden` |
| **Nav** | Sticky bottom, frosted `--bg` (82%) with blur; line icons (1.75 px stroke) above 14 px labels; current item `--ink` + semibold + `--sage-deep` icon |
| **Notice** | `--mist` card at the top of the screen, `role="status"` |
| **Dialog** | `<dialog>`, `--surface`, radius 24, `--shadow-lift`, blurred dim backdrop; safe choice focused first |
| **Focus ring** | 3 px `--sage-deep` outline, 3 px offset, on every interactive element (`:focus-visible`) |

## 7. Iconography and illustration
- Line icons only where words alone aren't enough (nav); 1.75 px stroke, rounded caps and joins; always paired with a text label.
- **The dusk pond** is Pebble's one illustration, drawn as inline SVG in `ui/index.html`: sky gradient, low sun with glow, two soft hills, reeds, still water with light lines, and a smooth stone. Used on the welcome cards, the empty Today screen and the Garden (where the stones are the person's checked pebbles).
- Shared gradients live once at the top of `index.html`; colours come from illustration tokens, so both palettes work.
- No faces, no people, no symbols of distress (rain clouds, broken hearts, storms).
- App icon: the same scene in a rounded square (`design/icon.svg`).

## 8. Evening palette
- Follows the system setting by default; manual choice in Settings (Follow system · Day · Evening).
- Not a health claim: offered for comfort ([Science: what we don't claim](../00-foundation/science.md#things-we-deliberately-dont-claim)).

## 9. Window
Default 480 × 820, minimum 360 × 560, centred, resizable. Wider windows keep the 560 px column
centred on the oat page with a soft top glow.

## Done when
Every colour, size and radius in `ui/style.css` comes from a token on this page, and every text
pair on this page has a measured contrast.
