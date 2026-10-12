# User safety
*Phase: Safety and ethics · Applies to every phase. Overrides everything except the law.*

Pebble touches people's worries. Most users are everyday overthinkers, but some will be
struggling more than they show. This page defines what Pebble does to keep them safe and what
it must **never** pretend to do.

## Pebble is not medical care
This is stated clearly in four places: the README, first run (card 3), About, and the "Worse than I
feared" response. Wording ([Content](../03-design/content-and-voice.md)):
> Pebble is a reflection tool, not medical care. If you're struggling, please reach out to someone
> you trust or a professional.

## Help resources (About screen)
| Region | Resource |
|---|---|
| Worldwide | **findahelpline.com**: free directory of helplines by country |
| India | **Tele-MANAS: 14416** or 1-800-891-4416 (national mental health helpline, free, 24/7; telemanas.mohfw.gov.in) |
| Emergency | Local emergency number |

Rules:
- Verify every number **before each release**. Wrong numbers in a crisis are harm.
- Verification log: 2026-10-12, Tele-MANAS 14416 confirmed (Ministry of Health and Family Welfare programme, NIMHANS nodal centre); findahelpline.com in use.
- In the desktop app, the helpline directory opens in the person's own browser; phone numbers are plain text (computers can't dial).
- Contributors may add their country's verified line via pull request, with a source link.
- No help links inside notifications or pop-ups. They live calmly in About and the "worse" response.

## Built-in safeguards
| Risk | Safeguard |
|---|---|
| Rumination from rereading | Check-backs show one line only; no "read all my worries" view in v1 |
| Pressure to engage | No notifications, streaks or guilt copy |
| Being forced to revisit | "Let it go" on every check-back; never shown again |
| A worry came true and was worse | Compassionate response + quiet help link; no "fixing", no positivity |
| Writing right after trauma | First-run note: "If something very hard just happened, it's OK to wait before writing about it." ([S7](../00-foundation/science.md#s7)) |
| Self-harm content typed into Pebble | Pebble doesn't read or analyse text (it can't; it's all local). We don't pretend to detect risk. The help link is always one tap away in About. |

## What Pebble must never do
- Claim to diagnose, treat, or prevent anything.
- Detect, score, or label a user's mental state.
- Tell someone their worry is "irrational" or "wrong". It only reflects what they themselves recorded.
- Replace or discourage professional help.
- Use crisis language for engagement or marketing.

## If a user reports harm
1. Thank them and take it seriously. Reply within 48 hours.
2. Label `calm` + `S1`.
3. Fix or remove the feature before anything else ships.
4. Add the lesson to the [Risk register](../01-planning/risk-register.md).

## Done when
All four "not medical care" placements exist, help numbers are verified for the release, and every safeguard above is implemented.
