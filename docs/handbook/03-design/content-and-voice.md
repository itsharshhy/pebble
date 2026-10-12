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
Source of truth in code: `ui/js/strings.js`. This table must match it.

### Today and navigation
| Location | Text |
|---|---|
| Window and page titles | {Screen} · Pebble (Welcome, Today, New pebble, Breath pause, Look back, Garden, Settings, About & safety) |
| Nav | Today · Garden · Settings |
| Today greeting | Good morning · Good afternoon · Good evening |
| Today, empty | Nothing to carry today. (+ dusk pond illustration) |
| Today, resting | Your pebbles are resting. |
| Today, due (1) | One pebble is ready to look at. No rush. |
| Today, due (n) | {Three} pebbles are ready when you are. |
| List headings | Ready to look at · Resting |
| Ready card | Ready when you are |
| Resting card dates | Tomorrow · {Saturday} · Next week · {12 November} |
| More / fewer | And {two} more · Show fewer |
| Main action | Set a pebble down |

### New worry
| Location | Text |
|---|---|
| Title (also the field's label) | What's on your mind? |
| Input placeholder | Say it in one line |
| Counter (after 120 characters) | {20} left |
| Date question | When should we look back? |
| Chips | Tomorrow · In 3 days · In a week · Pick a date |
| Date field label · hint | Choose a day · Any day from today to a year from now. |
| Optional fold | Add more (optional) |
| Feeling label · chips | Name the feeling · nervous, uneasy, dread, unsure, tense, sad |
| Next step label · placeholder | One small next step? · e.g. Rehearse once tomorrow |
| Friend prompt · hint | What would you tell a friend who wrote this? · Just something to think about. It isn't saved. |
| Save button | Set it down |
| Cancel | Cancel |
| Cancel confirm | Leave without saving? · Keep writing / Leave |

### Breath pause and check-back
| Location | Text |
|---|---|
| Breath intro | Before we look back |
| Breath labels | Breathe in · and slowly out |
| Breath reduced motion | Take three slow breaths. |
| Breath done | When you're ready |
| Breath buttons | I'm ready · Skip |
| Check-back lead | Today you wrote · Yesterday you wrote · {Three} days ago you wrote · On {12 November} you wrote |
| Question | Did it happen? |
| Answers | It didn't happen · Better than I feared · It happened |
| Follow-up | Was it worse than you feared? · Yes · About what I expected |
| Let go | Let it go |
| Closing, didn't happen | That one didn't happen. Noted. |
| Closing, better | Better than you feared. Noted. |
| Closing, happened | That happened. That's hard. You got through it. |
| Closing, worse | That sounds really hard. If it's weighing on you, talking to someone can help. + "Not medical care" + Find support |
| Closing, let go | Let go. You won't be asked about it again. |
| After answering | Done · Undo |

### Garden
| Location | Text |
|---|---|
| Garden lead | Since you started |
| Garden number · line | {31} of {34} · pebbles you checked didn't happen. |
| Screen-reader sentence | {31} of {34} pebbles you checked didn't happen |
| Garden small | Your garden is just starting. Check back on a few pebbles and it'll fill in. |
| Garden footer | No streaks. No scores. Just a record that's yours. |

### Settings, data and About
| Location | Text |
|---|---|
| Comfort | Comfort · Palette: Follow system / Day / Evening · Breath pause: "Three slow breaths before you look back. Off by default." |
| Your data | Your data · Your pebbles live only on this computer. A backup keeps them safe. |
| Data buttons | Export backup · Import backup · Delete everything |
| Export results | Backup saved. · Pebble couldn't save the backup. Your pebbles are unchanged. |
| Import confirm | This will replace {one pebble} with {12 pebbles}. · Replace / Keep what I have |
| Import skipped | {Two pebbles} in the file couldn't be read and will be left out. |
| Import done · invalid | Your backup is in place. · Pebble couldn't read that file. Nothing was changed. |
| Delete all confirm | Delete every pebble and setting on this device? This can't be undone. Export a backup first if you might want them. · Keep my pebbles / Delete everything |
| After deleting | Everything on this device was deleted. |
| Save failed | Pebble can't save right now. Try exporting a backup. |
| Unreadable saved data | Pebble couldn't read what was saved before. It kept a copy on this device and started fresh. Nothing was deleted. |
| Some pebbles unreadable | {Two pebbles} couldn't be read and were left out. A copy was kept on this device. |
| About link | About Pebble, privacy and support |
| About: what | Pebble is a small, private place to set worries down, one line at a time. On the day you choose, it asks if the worry happened, and keeps an honest record. |
| About: support | If you're struggling · "Not medical care" · Find a free helpline in your country · India: Tele-MANAS, call 14416 (free, 24/7) · In an emergency, call your local emergency number. |
| About: privacy | Everything stays on this device. We never see it. + Pebble has no servers and no accounts, and its security settings block it from sending data anywhere. Your pebbles are saved in a file on this computer. Export a backup from time to time to keep them safe. |
| About: counting | How the garden counts · It counts the pebbles you answered. "It didn't happen" and "Better than I feared" both count as didn't happen, because the outcome you feared didn't come true. Pebbles you let go aren't counted at all. |
| About: idea | Where the idea comes from · Pebble is based on the Worry Outcome Journal, a technique studied in anxiety research (LaFreniere & Newman, 2020). In that small study, 91.4% of tracked worries didn't come true. Your own record may look different, and that's fine. |
| About: footer | Pebble {0.1.0} · MIT licence · Source code · Back to settings |
| Not medical care | Pebble is a reflection tool, not medical care. If you're struggling, please reach out to someone you trust or a professional. |

### First run
| Location | Text |
|---|---|
| Step | {One} of three |
| Card 1 | Set your worries down, one line at a time. |
| Card 2 | On the day you choose, Pebble asks: did it happen? |
| Card 3 | Everything stays on this device. Pebble isn't medical care. If you're struggling, please reach out to someone. + Find support |
| Card 3 note | If something very hard just happened, it's OK to wait before writing about it. |
| Buttons | Next · Begin |

Not yet used: "Welcome back." (returning after a gap). Pebble doesn't track visits, so it has no
way to know about a gap. Keep it in the tone table as an example only.

## Localisation readiness
- All strings live in one object in `ui/js/strings.js` (`STRINGS`), never inline in logic. HTML pulls them in with `data-s="key"`. Unit tests check that no string has an exclamation mark, an emoji or a guilt word.
- Leave room: translations can be 30–40% longer than English.
- Avoid idioms that don't translate; "set it down" is concrete enough to translate well.

## Done when
Every user-facing string in the app appears in this library, and none breaks the writing rules.
