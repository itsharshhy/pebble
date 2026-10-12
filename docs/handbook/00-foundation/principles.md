# Principles
*Phase: Foundation · Every decision, in every phase, is checked against these.*

Seven principles, **in priority order**. When two conflict, the higher one wins.

## 1. Do no harm
If a feature could make a vulnerable person more anxious, it doesn't ship, however clever,
popular or requested it is.
- ✅ Check-backs show one short line, never the full original entry.
- ❌ "Your worst week" summary. It invites rumination.
- **Test:** *Would I show this screen to someone having a bad day?*

## 2. Private by default
There's no server, no analytics, no network request of any kind, and no account. Data lives in
one file on the person's own computer. Any future network feature must be opt-in, off by default, and
explained in plain words before it's turned on.
- ✅ System fonts. Loading Google Fonts would send the user's IP address to Google.
- ✅ A security policy that lets the interface talk only to Pebble's own Rust side.
- ❌ "Anonymous" analytics. They're never truly anonymous, and we don't need them.

## 3. Calm over clever
Fewer choices, slower motion, softer words. A calm interface has nothing that shouts, flashes,
counts down or competes for attention.
- ✅ One main action per screen.
- ❌ Streaks, badges, confetti, red counters.

## 4. Evidence over vibes
Every psychological feature cites research **and** its strength ([Science](science.md)). If
evidence is weak, the feature is optional and never mentioned in marketing.
- ✅ "Breath pause (optional)", backed by an RCT of modest size.
- ❌ "Scientifically proven to cure anxiety."

## 5. Small and finished beats big and perfect
v1 has five screens. A finished small thing teaches more and helps more than an unfinished big one.
- ✅ Ship the core loop, then add comfort features.
- ❌ Starting AI features before the basic loop works.

## 6. Fast, and readable by a beginner
Pebble should open in under a second and answer every click in under 100 ms. The interface is
plain HTML, CSS and JavaScript with no framework and no build step; the Rust shell is a few small,
commented files. Comments explain *why*. If a beginner can't follow a change, the change is too
big or too clever.

## 7. The user owns everything
One click to export everything as a readable file, saved wherever the person chooses. One
confirmed action to delete everything. No lock-in, no hidden copies.

## How to use these
When unsure, write the decision as a sentence and test it against principles 1 to 7 in order.
The first principle it breaks is the reason to say no. If it breaks none, do it, but small.

## Done when
You can name the top three principles without looking.
