# Motion, sound and haptics
*Phase: Design · How Pebble moves and sounds. Default answer: slowly and quietly.*

## Motion principles
1. **Motion explains, never decorates.** It shows where something came from or went.
2. **Slow and soft.** Nothing bounces, flashes, shakes or spins.
3. **Optional by design.** `prefers-reduced-motion: reduce` turns all movement into short fades (WCAG 2.3.3).
4. **Nothing moves by itself** except the breath circle, and only while the user is on that screen.

## Timing tokens
| Token | Value | Use |
|---|---|---|
| `--dur-quick` | 200 ms | Button press feedback, chip select |
| `--dur-base` | 300 ms | Screen fades, closing line appearing |
| `--dur-slow` | 600 ms | Palette change, card entering |
| `--dur-release` | 1200 ms | Pebble sinking / ripple ("Let it go") |
| `--ease` | `cubic-bezier(.4, 0, .2, 1)` | Everything (gentle ease-in-out) |

## Signature motions
| Moment | Motion | Reduced-motion fallback |
|---|---|---|
| Screen change | Fade + 8 px rise, 300 ms | Fade only, 200 ms |
| Save a pebble | New card fades in at the top of Resting | Fade |
| Answer a check-back | Closing line fades in; one ripple crosses the pond | Fade |
| Let it go | Pebble sinks and shrinks, ripples fade (1.2 s) | Pebble fades out |
| Breath pause | Circle scale 0.7 → 1.15 over 4 s, back over 6 s | Static circle + text |
| Button hover | 1 px lift | None |

## The breath circle (science-linked)
- 4 s inhale + 6 s exhale = 10 s cycle = **6 breaths/min**, exhale longer than inhale ([S5](../00-foundation/science.md#s5)).
- Label switches "Breathe in" → "and slowly out" in sync. The label is in an `aria-live="polite"` region, announced once per phase, not continuously.
- 3 cycles, then "When you're ready" + button. Never forced.

## Things we never animate
Numbers counting up (feels like a slot machine), confetti, shaking on error, pulsing badges,
auto-scrolling, parallax.

## Sound
- **Silent by default.** No sound in v1.
- v1.x option: a single soft chime on "Let it go" (≤ 0.5 s, low volume, user-enabled only).
- Never autoplay; never sound on errors.

## Haptics (future native wrapper / supported browsers)
- One light tap on "Let it go" only, if the user enables it.
- `navigator.vibrate` is unsupported on iOS Safari; treat haptics as optional enhancement.

## Done when
With reduced motion on, nothing in the app moves except opacity.
