# Accessibility testing
*Phase: Testing · Verifying the rules in [Accessibility](../03-design/accessibility.md).*

Automated tools catch only part of accessibility problems. Lighthouse is the floor; the manual
tests below are the real check.

## 1. Automated (5 minutes)
- Chrome DevTools → **Lighthouse** → Category: Accessibility → Analyze. **Target ≥ 95.**
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
- Windows: **Narrator** (Ctrl + Win + Enter) or free **NVDA**. macOS / iOS: **VoiceOver** (Cmd + F5 / triple-click side button). Android: **TalkBack**.
- [ ] Each screen announces its title
- [ ] Buttons announce clear names ("Set a pebble down, button")
- [ ] Chips announce selected state ("In 3 days, toggle button, pressed")
- [ ] The closing line after answering is announced once
- [ ] The Garden reads as a full sentence
- [ ] Decorative pebbles and the pond are silent

## 4. Zoom and reflow (5 minutes)
- [ ] Browser zoom 200%: all content readable, no overlap
- [ ] 320 px width: no horizontal scroll (DevTools device toolbar)
- [ ] Text-spacing bookmarklet (line height 1.5, letter 0.12em, word 0.16em): nothing clipped

## 5. Motion and colour (5 minutes)
- [ ] DevTools → Rendering → *Emulate prefers-reduced-motion: reduce*: only fades remain
- [ ] *Emulate prefers-color-scheme: dark*: evening palette loads
- [ ] DevTools → Rendering → *Emulate vision deficiencies* (each type): all answers still distinguishable by text
- [ ] Any new colour pair measured ≥ 4.5:1 (text) / 3:1 (UI)

## Done when
All five sections pass and the Lighthouse score is recorded in the release notes.
