# The Pebble Handbook
*A fact-based software engineering handbook for a calm, private prediction tracker for overthinkers.*

> **How to read this if you overthink:** you don't need all of it today. Read §0 and §1.
> Every other section waits until you're at that phase. Each phase ends with a **"Done when"**
> line. When it's true, stop polishing and move on.

---

## Contents
0. [The one-page summary](#0-the-one-page-summary)
1. [Principles](#1-principles)
2. [The science: what we know and how sure we are](#2-the-science)
3. [How we build: the SDLC we use](#3-how-we-build)
4. [Phase 1: Requirements](#4-phase-1--requirements)
5. [Phase 2: Design (architecture + calm design system)](#5-phase-2--design)
6. [Phase 3: Implementation](#6-phase-3--implementation)
7. [Phase 4: Testing (including the Calm Audit)](#7-phase-4--testing)
8. [Phase 5: Release](#8-phase-5--release)
9. [Phase 6: Maintenance and community](#9-phase-6--maintenance)
10. [Safety, ethics and privacy](#10-safety-ethics-and-privacy)
11. [Roadmap](#11-roadmap)
12. [Glossary for beginners](#12-glossary)
13. [References](#13-references)

---

## 0. The one-page summary

**What:** Pebble is a small web app. You write down a worry in one short line, like *"The
presentation will go badly"*, and choose a day to check back. On that day Pebble asks one
gentle question: **"Did it happen?"** Over weeks you build your own private record of how often
your worries came true.

**Why:** In a study that tracked worries this way, 91.4% did not come true. People whose worries
proved untrue more often improved more (LaFreniere & Newman, 2020). An anxious mind keeps
predicting and rarely collects the evidence. Pebble collects it.

**For whom:** Everyday overthinkers. People who want privacy. People whose therapist assigns
worry logs. **Not** a substitute for professional care, and not built for people in crisis.

**Promise:** Calm. Private. Free. No account, no tracking, no streaks, no guilt. Your data never
leaves your device.

**The metaphor:** each worry is a **pebble** you've been carrying. Checking back lets you set it
down. "Let it go" drops it into a still pond. Over time you see a quiet garden of stones you
no longer carry.

---

## 1. Principles

Every decision in this project is checked against these seven principles, in this order.
If two conflict, the higher one wins.

1. **Do no harm.** If a feature could make someone more anxious, it doesn't ship, however clever it is.
2. **Private by default.** No server, no analytics, no third-party requests. Ever, in v1.
3. **Calm over clever.** Fewer choices, slower motion, softer words. (§5.4)
4. **Evidence over vibes.** Every psychological feature cites its source *and* its evidence strength (§2).
5. **Small and finished beats big and perfect.** Ship v1 with five screens, not fifteen.
6. **Readable by a beginner.** Plain HTML, CSS and JavaScript. No framework until it's truly needed.
7. **The user owns everything.** One tap to export, one tap to delete it all.

---

## 2. The science

We use only ideas with research behind them, and we're **honest about how strong** that research
is. Ratings:
- 🟢 **Strong**: replicated, meta-analyses or large trials.
- 🟡 **Moderate**: solid studies, but limited samples or settings.
- 🟠 **Preliminary**: small or mixed studies. Use gently, mark it optional, never market it.

| # | Finding | How Pebble uses it | Evidence |
|---|---|---|---|
| S1 | **Worry outcome tracking.** 91.4% of tracked worries in people with GAD didn't come true; more disconfirmed worries went with bigger symptom drops (LaFreniere & Newman, 2020; n=29). | The core loop: worry → check date → "Did it happen?" | 🟡 Small clinical sample, 30-day follow-up. **Never** claim "91% of everyone's worries". |
| S2 | **Making a plan quiets intrusive thoughts.** Unfinished goals keep popping into mind (the Zeigarnik effect), but making a specific plan removed those intrusions even before any work was done (Masicampo & Baumeister, 2011). | Optional "One small next step?" field when you write a worry. | 🟡 Lab studies, several experiments. |
| S3 | **Writing tomorrow's to-do list before bed** helped people fall asleep faster than writing about tasks already done (Scullin et al., 2018). | "Evening unload" mode: a short pre-sleep brain dump. | 🟡 One well-run lab study (n=57). |
| S4 | **Naming a feeling ("affect labeling")** reduces amygdala response compared with other tasks (Lieberman et al., 2007). | One optional feeling word per worry (chips: *nervous, uneasy, dread, unsure...*). | 🟢 Replicated across many studies. |
| S5 | **Slow, exhale-focused breathing.** 5 minutes a day of cyclic sighing improved mood and lowered breathing rate more than mindfulness meditation in a 28-day RCT (Balban et al., 2023; n=108). Slow breathing near 6 breaths/min is widely studied (Lehrer & Gevirtz, 2014). | Optional 3-breath pause before check-backs; breathing circle at ~6 breaths/min with a longer exhale. | 🟡 RCT, but modest effects and arms not powered to prove superiority. |
| S6 | **Self-distancing.** Thinking about your problem as an outsider would ("What would you tell a friend?") reduces distress (Kross & Ayduk, 2017 review). | Optional "What would you tell a friend?" prompt. | 🟢 Many studies. |
| S7 | **Venting-only writing can maintain rumination.** Writing that also seeks understanding or coping works better (Baikie & Wilhelm, 2005). | Every flow ends in a step forward (plan, let go, or done). Never an open-ended "write more about how bad it is". | 🟡 |
| S8 | **Notifications increase inattention.** Turning alerts off for a week reduced inattention and hyperactivity symptoms (Kushlev et al., 2016; n=221). **Batching** to 3×/day beat both constant and zero notifications (Fitz et al., 2019). Note: a later Berlin study didn't replicate parts of this. | No notifications in v1. Later: **at most one** opt-in daily digest at a time the user picks. | 🟡 Mixed replication. |
| S9 | **Colour and arousal.** Saturation and brightness affect felt arousal more than hue; less saturated, lighter colours rate as more pleasant and less arousing; blue and green hues rate as pleasant (Valdez & Mehrabian, 1994). | Low-saturation sage, mist and sand palette. No pure red anywhere. | 🟡 Lab ratings of colour chips; cultural differences exist. |
| S10 | **People prefer curved shapes.** Sharp angles may read as mild threat (Bar & Neta, 2006). | Generous rounded corners, round "pebble" shapes. | 🟡 |
| S11 | **Choices slow decisions.** Decision time grows with the number of options (Hick–Hyman law). | Max **3 choices** on any screen. One main action per screen. | 🟢 |
| S12 | **Responsiveness.** Productivity and engagement rise when systems respond within ~400 ms (Doherty & Thadani, 1982). | Every tap responds instantly. No spinners, because everything is local. | 🟡 Old industry study, widely cited. |
| S13 | **Postponing worry to a set "worry window".** Helped non-clinical worriers; in GAD it wasn't better than simple monitoring in one trial, but a metacognitive version beat waitlist (Krzikalla et al., 2024). | v2, **optional**, clearly labelled "may help some people". | 🟠 Mixed. |
| S14 | **Self-guided mental-health apps have small effects** (anxiety g ≈ 0.20 across 176 RCTs; Linardon et al., 2024). | We keep our claims modest. Pebble is a tool, not a treatment. | 🟢 That's exactly why we stay humble. |

**What we deliberately don't claim:**
- That dark mode reduces stress. Evidence is weak; we offer it for comfort and follow the system setting.
- That nature images heal. Attention Restoration Theory (Kaplan, 1995) is interesting but mixed; we use
  gentle natural *themes*, not health claims.
- That Pebble treats anxiety. It doesn't.

---

## 3. How we build

### The model: small iterative loops
The **SDLC** (Software Development Life Cycle) is the series of phases every software project goes
through: **Requirements → Design → Implementation → Testing → Release → Maintenance**.

We don't do them once, in one long line (the "waterfall" model). We do **small loops**: one
feature at a time goes through every phase, then we start the next. This is the *iterative and
incremental* model, the basis of Agile practice. It's best for beginners, because you see
something working within days, and mistakes stay small.

```
 ┌──────────── one loop = one feature, ~1 week ────────────┐
 │ Requirement → Design → Build → Test → Release → Reflect │ → next feature
 └──────────────────────────────────────────────────────────┘
```

### Tools (all free)
| Need | Tool | Why |
|---|---|---|
| Write code | VS Code | Free, beginner-friendly, huge community |
| Save versions | Git | Industry standard; undo for your whole project |
| Host code | GitHub | Free, and the open-source home |
| Host the app | GitHub Pages | Free static hosting straight from the repo |
| Plan work | GitHub Issues + a Project board | Lives next to the code |
| AI pair-programmer | Claude Code | Explains every line; you approve every change |

### Working agreement (you + Claude)
- Claude explains **what** and **why** before writing code; you approve.
- Each change is small enough to understand in 5 minutes.
- You run it and see it yourself before it's saved (committed).

---

## 4. Phase 1: Requirements

### 4.1 Personas
| Persona | Situation | What they need from Pebble |
|---|---|---|
| **Asha, 24, the quiet overthinker** | Replays conversations at night and expects the worst at work. Never seen a therapist. | Private, fast, not "therapy-ish". Proof that her forecasts are often wrong. |
| **Leo, 35, the data person** | Likes numbers more than feelings talk. | A clear, honest tally; export to a spreadsheet. |
| **Mira, 29, in therapy** | Her therapist assigned a worry log. Paper gets lost. | A clean digital log she can show in sessions (export/print). |

### 4.2 User stories (v1)
Format: *As a … I want … so that …*. **Must** = v1. **Should** = v1 if time allows. **Could** = later.

| ID | Story | Priority |
|---|---|---|
| U1 | As a user I want to write a worry in one short line so that capturing it takes under 20 seconds. | Must |
| U2 | I want to pick a check-back date (tomorrow / in 3 days / in a week / custom). | Must |
| U3 | On the check-back day I want to see the worry and answer: *Didn't happen · Happened · Better than I feared · Worse than I feared*. | Must |
| U4 | I want to "Let it go" without answering, and never be asked again. | Must |
| U5 | I want a calm summary: how many worries didn't come true. | Must |
| U6 | I want to export all my data as a file and delete everything with one confirmed action. | Must |
| U7 | I want to optionally name the feeling (one word). | Should |
| U8 | I want to optionally add one small next step. | Should |
| U9 | I want an optional 3-breath pause before check-backs. | Should |
| U10 | I want an "Evening unload" mode before sleep. | Could |
| U11 | I want to tag worries by area (work, health, people, money, other). | Could |
| U12 | I want to lock the app with a passcode and encrypt my data. | Could (v2) |

### 4.3 Non-functional requirements
| Area | Requirement | Measured by |
|---|---|---|
| **Privacy** | Zero network requests after the page loads. No analytics, no external fonts or scripts. | Browser DevTools → Network tab shows nothing after load |
| **Performance** | Every interaction responds in < 100 ms; first load < 1 s on 4G. | Lighthouse Performance ≥ 95 |
| **Accessibility** | WCAG 2.2 level AA. | Lighthouse Accessibility ≥ 95 + manual keyboard test |
| **Offline** | Works with no internet after the first visit. | Turn off Wi-Fi and use it |
| **Calm** | Passes the Calm Audit (§7.3). | Checklist |
| **Size** | Whole app < 100 KB. | File sizes |

### 4.4 Out of scope for v1 (say no to these, kindly)
Accounts, cloud sync, AI, social sharing, mood charts, notifications, mobile app-store builds.

**Done when:** you've read the user stories and agree with the Must list.

---

## 5. Phase 2: Design

### 5.1 Architecture (simple on purpose)
```
 ┌───────────────── Your browser ─────────────────┐
 │  index.html  ← structure                       │
 │  style.css   ← the calm design system          │
 │  app.js      ← behaviour                       │
 │        │                                       │
 │        ▼                                       │
 │  localStorage  ← your data, on this device only│
 └────────────────────────────────────────────────┘
        No server. No database. No internet needed.
```
- **Why no framework (React and similar)?** Five screens don't need one, and plain JavaScript teaches you the fundamentals that every framework is built on.
- **Why localStorage?** It's built into every browser, is simple, and holds about 5 MB per site. That's roughly 25,000 worries.
- **The known risk:** if the user clears their browser data, everything is gone. **Mitigation:** a gentle monthly "Save a backup?" note and one-tap export. v2 moves to IndexedDB plus an installable PWA.

### 5.2 Data model
One list of worries, saved as JSON:
```json
{
  "version": 1,
  "worries": [
    {
      "id": "w_1739012345",
      "text": "The presentation will go badly",
      "createdAt": "2026-10-13T21:04:00Z",
      "checkOn": "2026-10-16",
      "feeling": "nervous",
      "nextStep": "Rehearse once tomorrow",
      "area": "work",
      "status": "open",
      "resolvedAt": null
    }
  ]
}
```
`status` is one of: `open`, `didnt`, `happened`, `better`, `worse`, `letgo`.
Text is capped at **140 characters**. That keeps capture quick and stops it turning into rumination (S7).

### 5.3 Screens and flow (5 screens)
```
  ┌─────────┐   + Add    ┌──────────┐  save   ┌─────────┐
  │  Today  │──────────▶│ New worry │───────▶│  Today   │
  └─────────┘            └──────────┘         └─────────┘
      │ "Ready to check" card
      ▼
  ┌──────────────┐ (optional) ┌──────────────┐
  │ Breath pause │──────────▶│  Check-back   │──▶ gentle closing line
  └──────────────┘            └──────────────┘
  Bottom nav: Today · Garden (summary) · Settings
```
| Screen | Single main action | Key content |
|---|---|---|
| **Today** | "Set a pebble down" (add) | Greeting by time of day; pebbles ready to check; nothing else |
| **New worry** | Save | One-line input → when to check (3 chips + custom) → optional feeling / next step, collapsed |
| **Check-back** | Answer | The one line only; 4 answers + "Let it go" |
| **Garden** | (none, just look) | Calm count: "34 checked · 31 didn't happen"; stones in a pond illustration |
| **Settings** | Export | Theme, breath pause on/off, export, delete all, "About & safety" |

### 5.4 The Calm Design System
Every rule has a reason. Change a rule only if you're replacing its reason.

#### Colour (S9: low saturation, no alarm colours)
| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#F6F3EE` (warm paper) | `#1B201F` | Page |
| `--surface` | `#FFFDF9` | `#232A28` | Cards |
| `--ink` | `#2F3833` | `#E7E3DB` | Main text (≈ 11:1 contrast) |
| `--ink-soft` | `#5F6963` | `#A9B1AB` | Secondary text (≥ 4.5:1, WCAG AA) |
| `--sage` | `#8FA89A` | `#7F9A8B` | Pebble shapes and decoration only. **Not for text backgrounds** (white on it is 2.5:1) |
| `--sage-deep` | `#56705F` | `#8FAF9C` | Primary button (white text 5.4:1 light; dark text 7.0:1 dark) |
| `--sage-wash` | `#E3EBE5` | `#2C3632` | Soft button backgrounds |
| `--mist` | `#DCE5EA` | `#2A3338` | Info, sky |
| `--sand` | `#EADFCF` | `#3A342C` | Warm highlights |
| `--clay` | `#C9A48E` | `#B08E79` | The only "attention" colour, used for "Happened". **No red, anywhere.** |

Rules: never pure black (#000) or pure white (#FFF) for large areas, because their harsh contrast is tiring. Body text must meet **4.5:1** contrast and UI elements **3:1** (WCAG 2.2, 1.4.3 / 1.4.11).

#### Typography
- **System fonts only:** `ui-rounded, "SF Pro Rounded", system-ui, "Segoe UI", sans-serif`. They're fast, private, and familiar. *Why not Google Fonts?* Loading them sends the user's IP address to Google. A Munich court ruled in 2022 that this violated GDPR (LG München I, 3 O 17493/20).
- Body **18 px**, line height **1.6** (WCAG 1.4.12 requires support for at least 1.5).
- Line length **45–70 characters** (classic readability guidance; Bringhurst).
- Weights: 400 and 600 only. No ALL CAPS, which reads as shouting.

#### Shape and space (S10)
- Corner radius: cards **24 px**, buttons **999 px** (pill), inputs **16 px**.
- Spacing scale: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64. Be generous, because white space lowers felt clutter.
- Touch targets at least **44 × 44 px** (Apple HIG; above the WCAG 2.2 minimum of 24 × 24).

#### Motion
- Durations 200–600 ms, easing `cubic-bezier(.4,0,.2,1)`. Nothing bounces, flashes or shakes.
- The **breath circle** grows over **4 s** (inhale) and shrinks over **6 s** (exhale): 6 breaths a minute, exhale longer (S5).
- "Let it go" animation: the pebble sinks into the pond, ripples fade (1.2 s).
- **`prefers-reduced-motion` is respected everywhere** (WCAG 2.3.3). Motion becomes simple fades.

#### Sound and haptics
Silent by default. Later: one optional soft chime on "Let it go", user-enabled only.

#### Words (voice and tone)
Pebble sounds like a calm friend, not a doctor, coach or cheerleader.

| ✅ Say | ❌ Never say | Why |
|---|---|---|
| "Set a pebble down" | "Log a worry" | Gentle, metaphorical, less clinical |
| "Ready when you are" | "3 overdue items!" | No pressure, no "overdue" |
| "That one didn't happen. Noted." | "Great job!! 🎉" | Calm acknowledgement; no over-reward |
| "That happened. That's hard. You got through it." | "Oops!" | Compassionate when the worry came true |
| "Let it go" | "Delete" | Release, not destruction |
| "Welcome back" | "You missed 5 days" | **No guilt, ever** |

Writing rules: sentence case, short sentences, second person ("you"), no exclamation marks, no emojis in system text.

#### Calm patterns we use
- **One thing at a time:** one main action per screen; at most 3 choices (S11).
- **Progressive disclosure:** optional fields stay folded away under "Add more (optional)".
- **Soft empty states:** "Nothing to carry today." with a small illustration.
- **Undo instead of "Are you sure?"** for small actions. A confirmation is used only for "Delete everything".
- **Time-aware greeting:** "Good evening" + a softer, dimmer palette after 21:00 (comfort, not a health claim).

#### Anti-patterns we ban (dark patterns and anxiety triggers)
Streaks · badges · red badges or counters · countdown timers · "overdue" · confetti ·
leaderboards · sharing prompts · pop-ups asking for ratings · infinite scroll · auto-playing sound.

### 5.5 Design deliverable
See [`design/preview.html`](../design/preview.html), a static preview of the palette, type and key cards.
Open it in any browser.

**Done when:** the preview feels calm to you, and to 2 other people (ask them: "How does this make you feel?").

---

## 6. Phase 3: Implementation

### 6.1 Folder structure
```
pebble/
├── index.html          the app
├── style.css           design system (tokens first)
├── app.js              logic
├── assets/             icons, illustrations (SVG)
├── design/preview.html design preview
├── docs/HANDBOOK.md    this file
├── AGENTS.md           instructions for AI helpers
├── README.md           front page on GitHub
└── LICENSE             MIT
```

### 6.2 Build order (each item = one loop from §3)
1. Static Today screen with fake data (HTML + CSS only)
2. Add a worry → save to localStorage → it shows on Today
3. Check-back screen + the 4 answers + Let it go
4. Garden summary
5. Settings: export, import, delete all
6. Optional fields (feeling, next step)
7. Breath pause
8. Dark mode + reduced motion polish

### 6.3 Coding standards (beginner-friendly)
- **Clear names over short names:** `checkOnDate`, not `cd`.
- **Comments explain *why*, not *what*.**
- **Functions do one thing,** and fit on one screen.
- **Never trust stored data:** validate after loading, because the user could edit an exported file.
- **Escape user text** before showing it (use `textContent`, never `innerHTML`, with user text). This prevents injection attacks (XSS).

### 6.4 Git workflow (the 5 commands you'll actually use)
```bash
git status                 # what changed?
git add .                  # stage everything
git commit -m "feat: add check-back screen"   # save a version
git push                   # upload to GitHub
git log --oneline          # see history
```
Commit messages follow **Conventional Commits**: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`.
Work on a branch for big features (`git switch -c feature/garden`) and merge when it works.

**Done when:** all Must stories work on your own phone and computer.

---

## 7. Phase 4: Testing

### 7.1 Manual test checklist (run before every release)
- [ ] Add a worry → it appears on Today
- [ ] Reload the page → it's still there
- [ ] Set check date to today → check-back card appears
- [ ] Each of the 4 answers + Let it go saves correctly
- [ ] Garden numbers are correct
- [ ] Export → open the file → it's readable JSON
- [ ] Delete all → confirm → empty; Cancel → nothing deleted
- [ ] Type `<script>alert(1)</script>` as a worry → shows as plain text, no popup
- [ ] Wi-Fi off → app still works
- [ ] DevTools → Network: zero requests after load

### 7.2 Accessibility tests
- Lighthouse (Chrome DevTools → Lighthouse) score ≥ 95
- Use the whole app with **keyboard only** (Tab, Enter, Esc)
- Zoom to 200% → nothing breaks (WCAG 1.4.4)
- Turn on "reduce motion" in your OS → no movement besides fades
- Try a screen reader (Windows Narrator: Ctrl + Win + Enter)

### 7.3 The Calm Audit
A feature fails if any answer is **No**:
1. Can a first-time user finish the main task without reading instructions?
2. Is there exactly one main action on screen?
3. Are there 3 or fewer choices?
4. Is every word kind, with no guilt, pressure or urgency?
5. Is there no red, no flashing, and no count of "missed" things?
6. Does motion respect reduced-motion?
7. Does the flow end in a step forward (not an open loop)?
8. Would you show this screen to someone having a bad day?

### 7.4 Testing with real people
Testing with **5 users** finds most usability problems (Nielsen & Landauer, 1993). Method:
give them one task ("add a worry and check it back"), stay quiet, and watch. Afterwards, ask:
*"How did that feel?"* Note where they hesitate. Never ask about their actual worries.

**Done when:** the checklist passes, Lighthouse ≥ 95, and 3 people found it calm.

---

## 8. Phase 5: Release
1. Repo → **Settings → Pages** → Source: `main` branch, `/root` → Save.
2. Your app goes live at `https://<username>.github.io/pebble/`.
3. Tag the version: `git tag v1.0.0 && git push --tags`, using **Semantic Versioning** (MAJOR.MINOR.PATCH).
4. Write release notes in plain words: what's new, and what's fixed.
5. Making the repo public is a **separate, deliberate decision**. Check §10 first.

---

## 9. Phase 6: Maintenance
- **Issues:** use labels `bug`, `idea`, `good first issue`, `calm-audit`.
- **Feedback without tracking:** we never collect analytics. Feedback comes only from GitHub Issues and people writing to you voluntarily.
- **Security:** no dependencies means almost nothing to patch. Add a `SECURITY.md` explaining how to report problems privately.
- **Contributions:** add a `CONTRIBUTING.md` and a Code of Conduct (Contributor Covenant) before going public.
- **Saying no:** every feature request goes through the Principles (§1) and the Calm Audit (§7.3). It's fine to close requests kindly.

---

## 10. Safety, ethics and privacy
- **Not medical care.** This appears in the README, the About screen and the first-run screen, in plain words.
- **Crisis line:** the About screen links to **findahelpline.com** (international directory). For India, **Tele-MANAS: 14416** (government mental-health helpline). Contributors should add their country's line.
- **When not to use it:** right after a traumatic event, writing about it in detail can increase distress (S7). The first-run screen says so gently.
- **Data:** stays on the device. Export is the user's choice. We never see anything.
- **Shoulder-surfing:** v2 adds an optional passcode and encrypted storage (Web Crypto API, AES-GCM).
- **Honesty in marketing:** claims must match §2 ratings. 🟠 items are never in marketing.

---

## 11. Roadmap
| Version | Theme | Contents |
|---|---|---|
| **v0** | Prove it | 14-day paper/notes test by the founder |
| **v1** | Core | Must + Should stories, GitHub Pages |
| **v1.x** | Comfort | Evening unload, areas, gentle backup reminder |
| **v2** | Trust | PWA (installable, offline), IndexedDB, passcode + encryption, one optional daily digest |
| **v3** | Optional AI | Bring-your-own-key AI that *suggests* worries from free-form journaling; off by default; consent every time |
| **Maybe** | Reach | Translations (Hindi first?), printable therapist report |

---

## 12. Glossary
| Term | Plain meaning |
|---|---|
| **Repository (repo)** | A project folder whose history Git tracks |
| **Commit** | A saved snapshot of your project, with a message |
| **Branch** | A parallel copy to try things without breaking the main one |
| **Push** | Upload your commits to GitHub |
| **SDLC** | The phases every software project goes through |
| **localStorage** | A small storage box inside the browser, one per website |
| **JSON** | A simple text format for data, readable by humans and computers |
| **PWA** | A website you can install like an app and use offline |
| **WCAG** | The world standard for accessible websites |
| **XSS** | An attack where text is tricked into running as code |
| **Effect size (g)** | How big a research effect is. 0.2 is small, 0.5 medium, 0.8 large |
| **RCT** | Randomized controlled trial, the strongest single-study design |

---

## 13. References
- Baikie, K. A., & Wilhelm, K. (2005). Emotional and physical health benefits of expressive writing. *Advances in Psychiatric Treatment, 11*(5), 338–346.
- Balban, M. Y., et al. (2023). Brief structured respiration practices enhance mood and reduce physiological arousal. *Cell Reports Medicine, 4*(1), 100895.
- Bar, M., & Neta, M. (2006). Humans prefer curved visual objects. *Psychological Science, 17*(8), 645–648.
- Doherty, W. J., & Thadani, A. J. (1982). *The economic value of rapid response time.* IBM.
- Fitz, N., Kushlev, K., et al. (2019). Batching smartphone notifications can improve well-being. *Computers in Human Behavior, 101*, 84–94.
- Kaplan, S. (1995). The restorative benefits of nature. *Journal of Environmental Psychology, 15*(3), 169–182.
- Kross, E., & Ayduk, O. (2017). Self-distancing: Theory, research, and current directions. *Advances in Experimental Social Psychology, 55*, 81–136.
- Krzikalla, C., et al. (2024). Worry postponement from the metacognitive perspective: A randomized waitlist-controlled trial. *Clinical Psychology in Europe.*
- Kushlev, K., Proulx, J., & Dunn, E. W. (2016). "Silence your phones": Smartphone notifications increase inattention and hyperactivity symptoms. *Proc. CHI 2016*, 1011–1020.
- LaFreniere, L. S., & Newman, M. G. (2020). Exposing worry's deceit: Percentage of untrue worries in generalized anxiety disorder treatment. *Behavior Therapy, 51*(3), 413–423.
- Lehrer, P. M., & Gevirtz, R. (2014). Heart rate variability biofeedback: How and why does it work? *Frontiers in Psychology, 5*, 756.
- Lieberman, M. D., et al. (2007). Putting feelings into words: Affect labeling disrupts amygdala activity. *Psychological Science, 18*(5), 421–428.
- Linardon, J., et al. (2024). Current evidence on the efficacy of mental health smartphone apps for symptoms of depression and anxiety: A meta-analysis of 176 RCTs. *World Psychiatry, 23*(1), 139–149.
- Masicampo, E. J., & Baumeister, R. F. (2011). Consider it done! Plan making can eliminate the cognitive effects of unfulfilled goals. *JPSP, 101*(4), 667–683.
- Nielsen, J., & Landauer, T. K. (1993). A mathematical model of the finding of usability problems. *Proc. INTERCHI '93*, 206–213.
- Scullin, M. K., et al. (2018). The effects of bedtime writing on difficulty falling asleep. *Journal of Experimental Psychology: General, 147*(1), 139–146.
- Valdez, P., & Mehrabian, A. (1994). Effects of color on emotions. *Journal of Experimental Psychology: General, 123*(4), 394–409.
- W3C (2023). *Web Content Accessibility Guidelines (WCAG) 2.2.*
- WHO (2025). *Anxiety disorders fact sheet.*

*Last reviewed: 2026-10-13. Re-check citations before making any public claim.*
