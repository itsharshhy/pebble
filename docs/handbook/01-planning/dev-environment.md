# Dev environment
*Phase: Planning · Set up once. About 20 minutes.*

## What you need
| Tool | Why | Install (Windows) | Status |
|---|---|---|---|
| **Git** | Saves versions | git-scm.com | ✅ installed |
| **GitHub CLI (`gh`)** | Talks to GitHub from the terminal | `winget install --id GitHub.cli` | ✅ installed and logged in |
| **VS Code** | Code editor | `winget install --id Microsoft.VisualStudioCode` | To do |
| **A modern browser** | Running and testing | Chrome, Edge or Firefox | ✅ |
| **Python 3** | Tiny local web server (already on most setups) | python.org | ✅ |

**No Node.js, no npm, no build tools.** That's deliberate ([ADR-001](../03-design/decisions.md)).

## Get the code
```bash
gh repo clone itsharshhy/pebble
```
```bash
cd pebble
```

## Run Pebble locally
Browsers restrict some features on `file://` pages, so serve the folder over a local address:
```bash
python -m http.server 5317 --bind 127.0.0.1
```
Then open **http://localhost:5317** in your browser. Press **Ctrl + C** in the terminal to stop.

## Browser DevTools (your best friend)
Press **F12** in Chrome or Edge.
| Tab | Use it for |
|---|---|
| **Elements** | See and live-edit HTML and CSS |
| **Console** | See errors; try JavaScript |
| **Network** | Confirm **zero** outside requests (privacy check) |
| **Application → Local Storage** | See exactly what Pebble has stored |
| **Lighthouse** | Accessibility and performance scores |
| **Rendering → Emulate prefers-reduced-motion / prefers-color-scheme** | Test calm fallbacks and the evening palette |

## Recommended VS Code settings
- Extension: **Live Server** (optional alternative to the Python server).
- Extension: **Prettier** for consistent formatting (editor-only; not a project dependency).
- Setting: *Files: Insert Final Newline* on; *Files: Trim Trailing Whitespace* on.

## Windows-specific notes
- If `gh` isn't recognised in a terminal opened *before* install, open a new terminal or restart.
- Very long folder paths can break Git ("Filename too long"). Fix per repo: `git config core.longpaths true`.
- Git warns "LF will be replaced by CRLF". That's harmless line-ending conversion; ignore it.

## Done when
Pebble runs at http://localhost:5317 and DevTools shows zero outside network requests.
