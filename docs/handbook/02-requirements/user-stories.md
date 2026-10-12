# User stories
*Phase: Requirements · Every feature, with testable acceptance criteria.*

**Format:** *As [persona], I want [action], so that [benefit].*
**Acceptance criteria** use **Given / When / Then**, so each line is directly testable.
**Priority (MoSCoW):** Must · Should · Could · Won't (this version).

---

## U1: Set a pebble down · Must · v1
*As Asha, I want to write a worry in one short line, so that capturing it takes under 20 seconds.*
- **Given** I'm on Today, **when** I choose "Set a pebble down", **then** the New Worry screen opens with the cursor in the text field.
- **Given** I type, **then** a gentle counter appears only after 120 characters, and input stops at 140.
- **Given** the field is empty or only spaces, **then** Save is disabled (not an error message).
- **When** I save, **then** I return to Today and the pebble appears, with no confirmation popup.

## U2: Choose when to look back · Must · v1
*As Asha, I want to pick a check-back date, so that I don't have to remember it.*
- **Given** New Worry, **then** I see 3 chips: *Tomorrow*, *In 3 days*, *In a week*, plus *Pick a date*.
- **Default** is *In 3 days* (long enough for most everyday worries to resolve).
- **Given** *Pick a date*, **then** past dates can't be chosen; the latest is 1 year ahead.
- Dates are stored as local `YYYY-MM-DD` ([Data model](../03-design/data-model.md)).

## U3: Check back · Must · v1
*As Asha, I want to answer whether the worry happened, so that I collect real evidence.*
- **Given** today ≥ a pebble's check date, **then** Today shows it under "Ready to look at".
- **When** I open it, **then** I see **only** the one-line text and when I wrote it, never extra notes.
- **Then** I can answer: *It didn't happen* · *Better than I feared* · *It happened*. A fourth option, *Worse than I feared*, sits behind "It happened" as a follow-up, to keep 3 primary choices ([Science S11](../00-foundation/science.md#s11)).
- **When** I answer, **then** a calm closing line appears ([Content](../03-design/content-and-voice.md)) and I return to Today after I tap Done, never automatically.
- **Given** I don't open it, **then** nothing nags me. It waits quietly. No "overdue" label.

## U4: Let it go · Must · v1
*As Asha, I want to release a worry without answering, so that I'm never forced to revisit it.*
- **Given** Check-back, **then** a quiet "Let it go" link is visible.
- **When** I choose it, **then** the pebble sinks into the pond (or fades, with reduced motion), status becomes `letgo`, and it's never shown as due again.
- Let-go pebbles are **not** counted as "didn't happen" in the Garden.

## U5: See my garden · Must · v1
*As Leo, I want an honest summary, so that I can see my real hit rate.*
- **Then** the Garden shows: "**X of Y** pebbles you checked didn't happen," where Y = answered (excluding let-go and open).
- **Given** Y < 5, **then** it shows "Your garden is just starting" instead of a ratio (small numbers mislead).
- No charts, streaks, scores, rankings or comparisons with other people.

## U6: Own my data · Must · v1
*As Leo, I want to export and delete everything, so that I'm never locked in.*
- **When** I choose Export, **then** my system's Save dialog opens, suggesting `pebble-backup-YYYY-MM-DD.json`; the file I save contains all data.
- **When** I choose Import and pick a valid file in my system's Open dialog, **then** I'm shown "This will replace N pebbles with M pebbles" and must confirm.
- **Given** an invalid file, **then** nothing changes, and a calm message explains.
- **When** I choose Delete everything, **then** I must type or confirm in a dialog; after that, storage is empty.

## U14: Install and keep it on my computer · Must · v1
*As Leo, I want to install Pebble like any other app, so that it works offline and my data stays on my machine.*
- **Given** Windows 10/11, macOS 10.15+ or a common Linux, **then** an installer for my system exists ([Deployment](../06-release/deployment.md)).
- **When** I open Pebble with no internet, **then** everything works.
- **When** I quit and reopen, or the computer restarts, **then** every pebble is still there.
- **Given** the app crashes mid-save, **then** the last complete save is intact (atomic writes).

## U7: Name the feeling · Should · v1
*As Asha, I want to optionally pick one feeling word, so that naming it takes the edge off.* ([S4](../00-foundation/science.md#s4))
- Folded under "Add more (optional)". Chips: nervous, uneasy, dread, unsure, tense, sad. One choice only; tap again to clear.

## U8: One small next step · Should · v1
*As Asha, I want to optionally write one small step, so that my mind can let the worry rest.* ([S2](../00-foundation/science.md#s2))
- Folded under "Add more (optional)". One line, max 100 characters. Placeholder: "e.g. Rehearse once tomorrow".
- Shown on Today under the pebble, in soft text.

## U9: Breath pause · Should · v1
*As Asha, I want an optional pause before check-backs, so that I look back from a calmer place.* ([S5](../00-foundation/science.md#s5))
- Setting, **off by default**. When on, Check-back starts with 3 slow breaths (4 s in, 6 s out). "Skip" is always visible.
- With reduced motion, the circle doesn't animate. Text guides instead.

## U10: Evening unload · Could · v1.x
*As Asha, I want a pre-sleep mode to quickly unload tomorrow's worries and tasks, so that I fall asleep more easily.* ([S3](../00-foundation/science.md#s3))

## U11: Areas · Could · v1.x
*As Leo, I want to tag pebbles (work, health, people, money, other), so that I see which areas my forecasts are least accurate in.*

## U12: Passcode and encryption · Could · v2
*As Mira, I want to lock Pebble, so that someone using my device can't read my worries.*

## U13: Undo · Should · v1
*As any user, I want to undo my last answer, so that a mis-tap isn't stressful.*
- After answering or letting go, an "Undo" option stays visible for 8 seconds.

## Won't (any version, unless the Principles change)
Sharing, social features, streaks, push notifications by default, AI chat, ads, accounts.

## Done when
Every Must and Should story in a version has all criteria passing, verified with the [manual checklist](../05-testing/manual-checklist.md).
