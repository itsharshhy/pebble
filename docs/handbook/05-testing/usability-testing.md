# Usability testing
*Phase: Testing · Watching real people use Pebble, ethically and kindly.*

## Why five people
Nielsen & Landauer (1993) modelled that about 5 testers find roughly 85% of usability problems
in a design. Testing 5, fixing, then testing 5 more beats testing 15 once.

## Ethics first (this is a mental-health-adjacent app)
- **Never ask testers about their real worries.** Give them a made-up worry to type.
- Explain beforehand: "We're testing the app, not you. You can stop any time."
- Don't test with anyone who's currently in a hard period. Ask gently, and accept "not now".
- Delete test data from the device afterwards, in front of them.
- No recordings without explicit, written consent. Notes are enough.

## Script (about 15 minutes)
1. **Intro (1 min):** "This is a small app for setting worries down. I'll give you a pretend worry. Please think out loud. There are no wrong answers."
2. **Task A:** "Add this worry: *My friend didn't reply, I think they're upset.* Set it to check back tomorrow."
3. **Task B:** (pre-loaded data with a due pebble) "One of your pebbles is ready. Look at it, and say it didn't happen."
4. **Task C:** "Find out how many of your worries didn't happen."
5. **Task D:** "Make a backup of your pebbles."
6. **Debrief:**
   - "How did that feel?" (**most important question**)
   - "Was anything stressful, confusing or too much?"
   - "If this was your real worry, would you use it again?"
   - "Describe the app in three words."

## What to watch for
| Signal | Meaning |
|---|---|
| Hesitation > 3 s | Unclear label or layout |
| "Where do I…?" | Navigation problem |
| A sigh, frown, or "hmm" on the check-back | Possible emotional friction. Explore gently |
| Reads words aloud with a flat tone | Copy feels cold |
| Smiles at the pond or ripple | The metaphor works |

## Recording findings
| # | Task | What happened | Severity (S1–S4) | Fix idea |
|---|---|---|---|---|

Turn every S1–S2 and S4 (calm) finding into a GitHub Issue.

## Success criteria for v1
- 4 of 5 testers complete Tasks A–D unaided.
- At least 3 of 5 use a calm word ("calm", "soft", "peaceful", "gentle") in their three words.
- Zero testers report feeling worse.

## Done when
Two rounds of 5 testers have met the success criteria.
