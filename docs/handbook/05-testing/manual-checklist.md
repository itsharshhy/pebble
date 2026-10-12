# Manual checklist
*Phase: Testing · Run the affected items every loop; run everything on **each system** before every release.*

Copy this list into the release Issue and tick it there, once for Windows, once for macOS and
once for Linux.

## Install and launch (U14)
- [ ] The installer from `build.yml` installs (macOS/Windows: the "Open anyway" steps in the README work)
- [ ] Pebble opens in under 1 second after the first launch, with no terminal window
- [ ] The window title, icon and name say "Pebble" (neutral, no worry imagery)
- [ ] Resizing to 360 × 560 and to full screen: no horizontal scroll, nothing cut off
- [ ] Ctrl+N (Cmd+N) opens New worry

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
- [ ] Each answer saves the correct status (open `pebble.json` in a text editor after quitting)
- [ ] "It happened" reveals the worse/expected follow-up
- [ ] Undo restores `open` within 8 s
- [ ] Let it go: animation (or fade with reduced motion); never shown as due again
- [ ] Nothing says "overdue"; nothing is red

## Garden (U5)
- [ ] With a known dataset (e.g. 4 didnt, 1 better, 2 happened, 3 letgo, 2 open) it shows **5 of 7**
- [ ] Fewer than 5 checked shows "Your garden is just starting"

## Data (U6)
- [ ] Export opens the system Save dialog suggesting `pebble-backup-YYYY-MM-DD.json`; "Backup saved." appears; the file contains all pebbles and settings
- [ ] Cancelling the Save or Open dialog changes nothing and shows nothing
- [ ] Round trip: export → delete everything → import → identical data
- [ ] Import of an invalid file changes nothing and shows the calm message
- [ ] Delete everything requires confirmation; Cancel keeps everything

## Persistence and dates
- [ ] Quit and reopen: everything still there
- [ ] Force-quit (Task Manager / Activity Monitor / `kill -9`) right after saving, reopen: everything still there
- [ ] `pebble.json` is in the data folder listed in [Architecture](../03-design/architecture.md#where-the-data-file-lives); `pebble.previous.json` appears after the second save
- [ ] Delete everything removes every `pebble*.json` file in that folder
- [ ] Timezone test ([Test strategy](test-strategy.md#high-risk-areas-test-these-hardest)) passes in UTC+5:30 and UTC−8

## Security and privacy
- [ ] Worry text `<img src=x onerror=alert(1)>` displays as plain text; no alert
- [ ] Inspector → Network (dev build): no outside requests at start or after any interaction
- [ ] CSP present in `src-tauri/tauri.conf.json` and `ui/index.html`; capabilities only `core:default`
- [ ] "Find a free helpline" and "Source code" open in the system browser, not inside Pebble
- [ ] No worry text appears in the window's address at any point (inspector)

## Comfort
- [ ] Palette: Follow system / Day / Evening all work and persist
- [ ] Breath pause off by default; when on: 4 s in, 6 s out, Skip visible
- [ ] Reduced motion (system setting): nothing moves except fades
- [ ] Evening palette follows the system's dark mode when set to "Follow system"

## Systems
- [ ] Windows 11 (and Windows 10 if available)
- [ ] macOS (Apple Silicon; Intel if available)
- [ ] Linux: Ubuntu (`.deb` or AppImage) and one other distribution if possible
- [ ] Browser preview still works (`python -m http.server --directory ui`) for development

## Done when
Every box is ticked for the release, or each unticked item has an Issue and a stated reason.
