# Screens
*Phase: Design · The specification of every screen. Build exactly this.*

Pebble is a desktop window (default 480 × 820, minimum 360 × 560). Visual reference: the app
itself and the [Design system](design-system.md). Words for every screen: [Content and voice](content-and-voice.md).

## Navigation map
```
             ┌───────────────── bottom nav ─────────────────┐
             │     Today          Garden          Settings  │
             └──────────────────────────────────────────────┘
 Today ──"Set a pebble down"──▶ New worry ──Save──▶ Today
 Today ──tap a ready pebble──▶ [Breath pause]* ──▶ Check-back ──Done──▶ Today
 Settings ──"About & safety"──▶ About
 * only if the setting is on
```
Every screen has **one main action**, shown as the only filled (deep sage) button. The nav is
hidden on the welcome, New worry and breath screens so each task has one way forward and one
quiet way out.

**Keyboard shortcut:** Ctrl+N (Cmd+N on macOS) opens New worry from anywhere, for capture in
seconds. Esc closes any dialog.

---

## 1. Today `#today`
**Purpose:** a calm home. Show only what's relevant now.
**Layout (top to bottom):**
1. Greeting by time of day ("Good evening"), in the display serif.
2. One soft status line (see states below).
3. **Ready to look at:** due pebbles (max 3 shown; "and 2 more" link if more).
4. **Resting:** upcoming pebbles, soft text with relative date ("Saturday", "Next week"), max 5, collapsed beyond.
5. Main action: **Set a pebble down**, pinned above the nav.
6. Bottom nav.

| State | Status line |
|---|---|
| First ever visit | Welcome card (see First run) |
| Nothing at all | "Nothing to carry today." + the dusk pond illustration |
| Pebbles resting, none due | "Your pebbles are resting." |
| Some due | "One pebble is ready to look at. No rush." / "3 pebbles are ready when you are." |

**Never:** counts in red, "overdue", badges on the nav.

## 2. New worry `#new`
**Purpose:** capture in under 20 seconds.
1. Title: "What's on your mind?"
2. One-line text field (auto-focus, 140 max, counter after 120).
3. "When should we look back?" chips: Tomorrow · **In 3 days** (default) · In a week · Pick a date.
4. Collapsed: "Add more (optional)" → feeling chips · "One small next step?" · "What would you tell a friend?" (a prompt to think about, with no field; nothing is saved in v1).
5. Main action: **Set it down** (disabled until text exists).
6. Secondary: "Cancel" (text link). If text was typed, Cancel asks: "Leave without saving?"

## 3. Breath pause `#check/<id>` (pre-step, optional)
**Purpose:** arrive at the check-back calmer ([S5](../00-foundation/science.md#s5)).
- Circle grows 4 s, shrinks 6 s; "Breathe in" / "and slowly out"; 3 cycles (30 s).
- "I'm ready" always available; "Skip" always visible.
- Reduced motion: static circle + "Take three slow breaths."

## 4. Check-back `#check/<id>`
**Purpose:** one honest answer, then release.
1. Soft line: "Three days ago you wrote"
2. The worry text in a quote card with its pebble. **Only the text.** Next step shown softly below if it exists. On answering, one ripple spreads from the pebble; on "Let it go", the pebble sinks.
3. Question: "Did it happen?"
4. Three answers: **It didn't happen** · **Better than I feared** · **It happened**.
   - "It happened" reveals a quiet follow-up: "Was it worse than you feared?" Yes / No, it was about what I expected.
5. Quiet link: **Let it go**
6. After answering: closing line + **Done** + Undo (8 s).

## 5. Garden `#garden`
**Purpose:** the evidence, gently.
- "Since you started" → big number "**31 of 34**" → "pebbles you checked didn't happen."
- Dusk pond illustration: one small stone per checked pebble resting in the water (max 60 drawn; beyond that, density only). Stones farther back are smaller.
- Fewer than 5 checked: "Your garden is just starting. Check back on a few pebbles and it'll fill in."
- Footer line: "No streaks. No scores. Just a record that's yours."
- **No** charts, percentages to decimals, trends, or "your best week".

## 6. Settings `#settings`
Grouped list:
- **Comfort:** Palette (Follow system · Day · Evening) · Breath pause (on/off)
- **Your data:** Export backup · Import backup · Delete everything
- **About & safety:** opens About

## 7. About `#about`
- What Pebble is (2 lines) · How the Garden counts (didn't + better; let-go excluded)
- "Not medical care" + help: the helpline directory opens in the person's own browser; Tele-MANAS is shown as plain text (a desktop can't dial) ([Safety](../08-safety-ethics/safety.md))
- Privacy in one sentence: "Everything stays on this device. We never see it." plus where the file lives and the backup advice
- Version number, licence, link to source.

## First run (overlay on Today)
Three short cards with the dusk pond illustration and a "Next" button:
1. "Set your worries down, one line at a time."
2. "On the day you choose, Pebble asks: did it happen?"
3. "Everything stays on this device. Pebble isn't medical care. If you're struggling, please reach out to someone." (+ help link)
Button: **Begin**. Never shown again (stored as a setting).

## Responsive behaviour (window sizes)
- ≤ 600 px wide: single column, nav at the bottom, buttons full width.
- > 600 px: content max width 560 px, centred on the oat page; nav still at the bottom of the content column (keeps one mental model).

## Done when
Each screen in the app matches this spec, and the spec is updated whenever the app changes.
