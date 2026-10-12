# Science
*Phase: Foundation · Consult before adding or changing any psychological feature or claim.*

Pebble uses only ideas with research behind them, and states **how strong** that research is.

| Rating | Meaning | Allowed use |
|---|---|---|
| 🟢 **Strong** | Replicated; meta-analyses or many studies | Core features; may be mentioned carefully |
| 🟡 **Moderate** | Solid studies, but limited samples or settings | Features yes; claims only with caveats |
| 🟠 **Preliminary** | Small, mixed, or single studies | Optional features only; **never** in marketing |

Each entry: **finding → source → strength → how Pebble uses it → limits.**

---

### S1
**Worry outcome tracking.** In a Worry Outcome Journal study, 91.4% of tracked worries did not come
true; the most common per-person rate was 100%. People with a higher share of untrue worries had
larger symptom reductions.
- **Source:** LaFreniere & Newman (2020), *Behavior Therapy* 51(3). n = 29, all with GAD; 10 days of logging, 30-day follow-up.
- **Strength:** 🟡
- **Pebble:** the core loop (worry → check date → "Did it happen?") and the Garden summary.
- **Limits:** small clinical sample. **Never** say "91% of everyone's worries never happen."

### S2
**Making a plan quiets intrusive thoughts.** Unfinished goals keep coming to mind (the Zeigarnik
effect); writing a specific plan removed those intrusions even before any work was done.
- **Source:** Masicampo & Baumeister (2011), *JPSP* 101(4). Multiple lab experiments.
- **Strength:** 🟡
- **Pebble:** optional "One small next step?" field.
- **Limits:** lab tasks, not clinical worry; the authors' 2012 follow-up shows over-specific plans can make people close-minded.

### S3
**Bedtime to-do lists help sleep onset.** Writing a specific list of tomorrow's tasks before bed
led to falling asleep faster than writing about completed tasks.
- **Source:** Scullin et al. (2018), *J. Exp. Psych.: General* 147(1). n = 57, sleep lab.
- **Strength:** 🟡
- **Pebble:** "Evening unload" mode (v1.x).
- **Limits:** one study of healthy young adults.

### S4
**Affect labeling.** Putting feelings into words reduces amygdala response.
- **Source:** Lieberman et al. (2007), *Psychological Science* 18(5), and many follow-ups.
- **Strength:** 🟢
- **Pebble:** optional single feeling word (chips: *nervous, uneasy, dread, unsure, tense, sad*).
- **Limits:** effect is in-the-moment; long-term benefit from apps is unproven.

### S5
**Slow, exhale-focused breathing.** In a 28-day RCT, 5 min/day of cyclic sighing (longer exhale)
improved mood and lowered respiratory rate more than mindfulness meditation.
- **Source:** Balban et al. (2023), *Cell Reports Medicine* 4(1). n = 108. Background: Lehrer & Gevirtz (2014) on slow breathing near 6 breaths/min.
- **Strength:** 🟡
- **Pebble:** optional 3-breath pause; animation 4 s in / 6 s out (6 breaths/min, longer exhale).
- **Limits:** modest effects; the trial wasn't powered to prove one arm superior; anxiety reduction was similar to meditation.

### S6
**Self-distancing.** Reflecting on a problem from an outside view ("What would you tell a friend?")
reduces emotional reactivity.
- **Source:** Kross & Ayduk (2017), *Advances in Experimental Social Psychology* 55 (review).
- **Strength:** 🟢
- **Pebble:** optional prompt in the New Worry screen.

### S7
**Venting-only writing can keep people stuck.** Expressive writing usually causes short-term
distress that's generally harmless; writing that seeks understanding or coping helps more than
pure venting; a COVID-era trial found increased stress.
- **Source:** Baikie & Wilhelm (2005), *Advances in Psychiatric Treatment* 11(5); Frontiers in Psychology (2020) trial.
- **Strength:** 🟡
- **Pebble:** 140-character limit; every flow ends in a step forward; no "write more about it" prompts.

### S8
**Notifications increase inattention.** One week with alerts off reduced inattention and
hyperactivity symptoms; batching to 3×/day beat both constant and zero notifications.
- **Source:** Kushlev, Proulx & Dunn (2016), *CHI* (n = 221); Fitz et al. (2019), *Computers in Human Behavior*.
- **Strength:** 🟡 (a later Berlin study didn't replicate parts)
- **Pebble:** no notifications in v1; later at most one opt-in daily digest at a user-chosen time.

### S9
**Colour and arousal.** Saturation and brightness drive felt arousal more than hue; less saturated,
brighter colours feel more pleasant and less arousing; blue and green hues rate as pleasant.
- **Source:** Valdez & Mehrabian (1994), *J. Exp. Psych.: General* 123(4).
- **Strength:** 🟡
- **Pebble:** low-saturation sage, mist and sand palette; no red ([Design system](../03-design/design-system.md)).
- **Limits:** ratings of colour samples in a lab; culture shapes colour meaning.

### S10
**Preference for curves.** People prefer curved objects; sharp angles may signal mild threat.
- **Source:** Bar & Neta (2006), *Psychological Science* 17(8).
- **Strength:** 🟡
- **Pebble:** large corner radii, pill buttons, organic pebble shapes.

### S11
**More choices, slower decisions.** Decision time rises with the number of options (Hick–Hyman law).
- **Strength:** 🟢 (classic, replicated)
- **Pebble:** max 3 primary choices per screen; one main action.

### S12
**Fast response keeps people engaged.** Response under ~400 ms keeps users in flow.
- **Source:** Doherty & Thadani (1982), IBM.
- **Strength:** 🟡 (old industry study, widely cited)
- **Pebble:** everything is local; no spinners; target < 100 ms per interaction.

### S13
**Worry postponement ("worry window").** Helps non-clinical worriers; in GAD it didn't beat simple
monitoring in one trial, but a metacognitive version beat waitlist.
- **Source:** Krzikalla et al. (2024), *Clinical Psychology in Europe*; Toronto Metropolitan University trial (NCT02806271).
- **Strength:** 🟠
- **Pebble:** v2, optional, labelled "may help some people".

### S14
**Self-guided apps have small effects and high drop-off.** Anxiety g ≈ 0.20 across 176 RCTs;
self-guided internet CBT effects shrink by 12 months (g ≈ 0.16).
- **Source:** Linardon et al. (2024), *World Psychiatry*; 2024 *Clinical Psychology Review* meta-analysis of 154 RCTs.
- **Strength:** 🟢
- **Pebble:** keep claims humble; Pebble is a tool, not treatment.

### S15
**The treatment gap.** 359 million people had an anxiety disorder in 2021; about 1 in 4 receive any
treatment; only ~41% recognise a need for care.
- **Source:** WHO anxiety fact sheet (2025); Alonso et al. (2018), World Mental Health Surveys.
- **Strength:** 🟢
- **Pebble:** why a free, private, low-barrier tool matters, and why we must point to real care.

---

## Things we deliberately don't claim
| Claim | Why not |
|---|---|
| "Dark mode reduces stress" | No solid evidence. We offer it for comfort only. |
| "Nature images heal" | Attention Restoration Theory (Kaplan, 1995) has mixed evidence. We use natural *themes*, not health claims. |
| "Blue light at night ruins sleep, so our night mode fixes it" | Effects of normal screen use are smaller than popular claims. The evening palette is for comfort. |
| "Pebble treats anxiety" | It doesn't. See [Ethics and claims](../08-safety-ethics/ethics-and-claims.md). |

## Adding a new finding
1. Find the original paper (not a blog about it).
2. Record n, population, design and main limitation.
3. Rate it honestly. When unsure, rate it lower.
4. Add it here **before** building the feature.

## Done when
Every psychological feature in the app links to an entry on this page.
