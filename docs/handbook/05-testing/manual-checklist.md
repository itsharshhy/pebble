# Manual checklist
*Phase: Testing · Run the affected items every loop; run everything before every release.*

Copy this list into the release Issue and tick it there.

## Capture (U1, U2)
- [ ] "Set a pebble down" opens New worry with the cursor in the text field
- [ ] Save is disabled when the field is empty or only spaces
- [ ] Counter appears after 120 characters; input stops at 140
- [ ] Default date chip is "In 3 days"
- [ ] "Pick a date" blocks past dates and dates beyond 1 year
- [ ] Saving returns to Today; the pebble appears under Resting
- [ ] Cancel with text asks "Leave without saving?"; without text it just leaves

## Check-back (U3, U4, U13)
- [ ] A pebble whose date is today appears under "Ready to look at"
- [ ] Check-back shows only the one-line text (+ next step softly, if any)
- [ ] Each answer saves the correct status (inspect in DevTools → Application → Local Storage)
- [ ] "It happened" reveals the worse/expected follow-up
- [ ] Undo restores `open` within 8 s
- [ ] Let it go: animation (or fade with reduced motion); never shown as due again
- [ ] Nothing says "overdue"; nothing is red

## Garden (U5)
- [ ] With a known dataset (e.g. 4 didnt, 1 better, 2 happened, 3 letgo, 2 open) it shows **5 of 7**
- [ ] Fewer than 5 checked shows "Your garden is just starting"

## Data (U6)
- [ ] Export downloads `pebble-backup-YYYY-MM-DD.json` containing all pebbles and settings
- [ ] Round trip: export → delete everything → import → identical data
- [ ] Import of an invalid file changes nothing and shows the calm message
- [ ] Delete everything requires confirmation; Cancel keeps everything

## Persistence and dates
- [ ] Reload: everything still there
- [ ] Close and reopen the browser: everything still there
- [ ] Timezone test ([Test strategy](test-strategy.md#high-risk-areas-test-these-hardest)) passes in UTC+5:30 and UTC−8

## Security and privacy
- [ ] Worry text `<img src=x onerror=alert(1)>` displays as plain text; no alert
- [ ] DevTools → Network after reload: only same-origin files; nothing after interaction
- [ ] CSP `<meta>` present in `index.html`
- [ ] No worry text appears in the URL at any point

## Comfort
- [ ] Palette: Follow system / Day / Evening all work and persist
- [ ] Breath pause off by default; when on: 4 s in, 6 s out, Skip visible
- [ ] Reduced motion (OS setting or DevTools emulation): nothing moves except fades

## Devices and browsers
- [ ] Chrome · Edge · Firefox · Safari (desktop)
- [ ] Android Chrome · iOS Safari
- [ ] 320 px width: no horizontal scroll

## Done when
Every box is ticked for the release, or each unticked item has an Issue and a stated reason.
