# Accessibility testing
*Phase: Testing · Verifying the rules in [Accessibility](../03-design/accessibility.md).*

Automated tools catch only part of accessibility problems. Lighthouse is the floor; the manual
tests below are the real check.

## 1. Automated (5 minutes)
- Serve the browser preview (`python -m http.server 5317 --bind 127.0.0.1 --directory ui`), open it in Chrome → DevTools → **Lighthouse** → Category: Accessibility → Analyze. **Target ≥ 95.** (Lighthouse can't run inside the desktop window; the interface is the same.)
- Fix every flagged item, or document why it's a false positive.

## 2. Keyboard only (10 minutes)
Unplug or ignore the mouse.
- [ ] **Tab** reaches every button, link, chip and input in a logical order
- [ ] The focus ring is always visible and never hidden behind the nav
- [ ] **Enter / Space** activate buttons and chips
- [ ] **Esc** closes dialogs; focus returns to the button that opened them
- [ ] After a screen change, focus lands on the new screen's heading
- [ ] Complete the full loop: add → check back → answer → Garden → export

## 3. Screen reader (15 minutes)
Test **inside the desktop app** on each system, because each web view talks to its own screen reader:
- Windows: **Narrator** (Ctrl + Win + Enter) or free **NVDA**.
- macOS: **VoiceOver** (Cmd + F5).
- Linux: **Orca** (Super + Alt + S on GNOME).
- [ ] Each screen announces its title
- [ ] Buttons announce clear names ("Set a pebble down, button")
- [ ] Chips announce selected state ("In 3 days, toggle button, pressed")
- [ ] The closing line after answering is announced once
- [ ] The Garden reads as a full sentence
- [ ] Decorative pebbles and the pond are silent

## 4. Zoom and reflow (5 minutes)
- [ ] Browser zoom 200%: all content readable, no overlap
- [ ] Window at its minimum 360 px width: no horizontal scroll
- [ ] Text-spacing bookmarklet (line height 1.5, letter 0.12em, word 0.16em): nothing clipped

## 5. Motion and colour (5 minutes)
- [ ] System setting "reduce motion" on (or DevTools → Rendering emulation in the preview): only fades remain
- [ ] System dark mode on with Palette "Follow system": evening palette loads
- [ ] DevTools → Rendering → *Emulate vision deficiencies* (each type): all answers still distinguishable by text
- [ ] Any new colour pair measured ≥ 4.5:1 (text) / 3:1 (UI)

## Done when
All five sections pass and the Lighthouse score is recorded in the release notes.
