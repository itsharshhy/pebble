# Content and voice
*Phase: Design · Every word Pebble says. Words are UI: they can calm or alarm.*

## Voice: who Pebble sounds like
**A calm friend who's good at listening.** Not a doctor (clinical), not a coach (pushy), not a
cheerleader (over-excited), not a robot (cold).

| Pebble is | Pebble is not |
|---|---|
| Gentle | Clinical ("symptoms", "disorder", "log") |
| Plain | Jargon ("cognitive distortion", "metrics") |
| Brief | Wordy |
| Warm but steady | Gushing ("Amazing!! 🎉") |
| Honest | Falsely reassuring ("Everything will be fine") |

## Tone shifts by moment
| Moment | Tone | Example |
|---|---|---|
| Capturing | Inviting, light | "What's on your mind?" |
| Waiting | Patient, no pressure | "Your pebbles are resting." |
| Check-back | Steady, neutral | "Did it happen?" |
| Didn't happen | Calm acknowledgement | "That one didn't happen. Noted." |
| Better than feared | Quiet, factual | "Better than you feared. Noted." |
| Happened | Compassionate, no fixing | "That happened. That's hard. You got through it." |
| Worse than feared | Compassionate + gentle door to help | "That sounds really hard. If it's weighing on you, talking to someone can help." + help link |
| Let it go | Releasing | "Let go. You won't be asked about it again." |
| Errors | Calm, practical, blameless | "Pebble couldn't read that file. Nothing was changed." |
| Returning after a gap | Welcoming, zero guilt | "Welcome back." |

## Writing rules
1. **Sentence case** everywhere ("Set a pebble down", not "Set A Pebble Down").
2. **Second person:** "you", "your". Pebble rarely says "I" or "we".
3. **Short:** most lines under 10 words. One idea per sentence.
4. **No exclamation marks.** Ever.
5. **No emoji** in system text. Users may use them in their own pebbles.
6. **Numbers:** words for one to nine in sentences ("Three days ago"), digits in the Garden ("31 of 34").
7. **Dates:** relative when near ("Tomorrow", "Saturday", "Next week"); full date beyond 2 weeks ("12 November").
8. **Never blame the user** in errors. Say what happened and what's safe.

## Word list
| ✅ Use | ❌ Avoid | Why |
|---|---|---|
| pebble | entry, item, record, log | The metaphor; less clinical |
| set it down | submit, log, save | Release, not admin |
| look back / check back | review, evaluate | Gentle |
| ready when you are | due, overdue, pending | No pressure |
| let it go | delete, dismiss, skip | Release, not destruction |
| didn't happen | false, wrong, incorrect | Non-judgemental of the user |
| your garden | stats, dashboard, analytics | Warm, personal |
| delete everything (Settings only) | — | Here clarity beats softness: it's destructive |

## Microcopy library (v1)
| Location | Text |
|---|---|
| Today greeting | Good morning · Good afternoon · Good evening |
| Today, empty | Nothing to carry today. |
| Today, resting | Your pebbles are resting. |
| Today, due (1) | One pebble is ready to look at. No rush. |
| Today, due (n) | {n} pebbles are ready when you are. |
| Main action | Set a pebble down |
| New worry title | What's on your mind? |
| Input placeholder | Say it in one line |
| Date question | When should we look back? |
| Chips | Tomorrow · In 3 days · In a week · Pick a date |
| Optional fold | Add more (optional) |
| Feeling label | Name the feeling |
| Next step label | One small next step? |
| Friend prompt | What would you tell a friend who wrote this? |
| Save button | Set it down |
| Cancel confirm | Leave without saving? · Keep writing / Leave |
| Breath intro | Before we look back |
| Breath labels | Breathe in · and slowly out |
| Breath done | When you're ready |
| Check-back lead | {Three days ago} you wrote |
| Question | Did it happen? |
| Answers | It didn't happen · Better than I feared · It happened |
| Follow-up | Was it worse than you feared? · Yes · About what I expected |
| Undo | Undo |
| Done | Done |
| Garden lead | Since you started |
| Garden line | pebbles you checked didn't happen. |
| Garden small | Your garden is just starting. Check back on a few pebbles and it'll fill in. |
| Garden footer | No streaks. No scores. Just a record that's yours. |
| Delete all confirm | Delete every pebble and setting on this device? This can't be undone. Export a backup first if you might want them. · Keep my pebbles / Delete everything |
| Storage error | Pebble can't save on this browser right now. Try exporting a backup. |
| Import invalid | Pebble couldn't read that file. Nothing was changed. |
| Not medical care | Pebble is a reflection tool, not medical care. If you're struggling, please reach out to someone you trust or a professional. |

## Localisation readiness
- All strings live in one object in `app.js` (`STRINGS`), never inline in logic.
- Leave room: translations can be 30–40% longer than English.
- Avoid idioms that don't translate; "set it down" is concrete enough to translate well.

## Done when
Every user-facing string in the app appears in this library, and none breaks the writing rules.
