# Glossary
*Phase: Foundation · Plain-language meanings. Add a word whenever one confuses you.*

## Software and process
| Term | Plain meaning |
|---|---|
| **SDLC** | Software Development Life Cycle: the phases every project goes through (plan, require, design, build, test, release, maintain). |
| **Iteration / loop** | One small pass through every phase for one feature. |
| **User story** | A feature written from the user's view: *As a…, I want…, so that…* |
| **Acceptance criteria** | The exact conditions that prove a story is done. |
| **Definition of Done** | The checklist every piece of work must pass before it counts as finished. |
| **ADR** | Architecture Decision Record: a short note saying what we decided and why. |
| **MoSCoW** | Must / Should / Could / Won't: a way to prioritise. |
| **Scope creep** | When a project keeps growing because "just one more feature". |

## Code
| Term | Plain meaning |
|---|---|
| **HTML** | The structure of a page (headings, buttons, text). |
| **CSS** | The look of a page (colours, sizes, spacing, motion). |
| **JavaScript (JS)** | The behaviour of a page (what happens on click, saving data). |
| **DOM** | The browser's live model of the page, which JS can change. |
| **Function** | A named block of code that does one job. |
| **Variable** | A named box holding a value. |
| **JSON** | A simple text format for data, readable by people and computers. |
| **localStorage** | A small storage box in the browser. Pebble uses it only in the browser preview. |
| **Framework** | A big pre-built toolkit (e.g. React). We don't use one. |
| **Dependency** | Someone else's code your project relies on. The interface has none; the Rust shell has a few, each justified. |

## Desktop app
| Term | Plain meaning |
|---|---|
| **Desktop app** | A program you install on Windows, macOS or Linux, rather than a website. |
| **Tauri** | The toolkit Pebble is built with: a small Rust program that shows an HTML interface in the system's own web view. |
| **Web view** | The part of the operating system that can draw web pages inside an app (WebView2 on Windows, WKWebView on macOS, WebKitGTK on Linux). |
| **Rust** | A fast programming language that prevents whole families of crashes and security bugs. Pebble's shell is written in it. |
| **Cargo** | Rust's tool for building, testing and downloading crates. |
| **Crate** | A Rust library (a dependency). Listed in `Cargo.toml`, pinned in `Cargo.lock`. |
| **IPC / command** | How the interface asks the Rust side to do something ("save this"). Inter-process communication. |
| **Capability / permission** | A Tauri rule listing what the interface may ask for. Pebble's is the smallest: `core:default`. |
| **Atomic write** | Saving to a temporary file and then swapping it in, so a crash can never leave half a file. |
| **App data folder** | The place each system keeps an app's files for the current user. |
| **Installer / bundle** | The file people download: `.exe`/`.msi` (Windows), `.dmg` (macOS), `.deb`/`.rpm`/`.AppImage` (Linux). |
| **Code signing** | A paid digital signature that tells macOS and Windows who made an app, so they don't warn people. |
| **CI (continuous integration)** | Robots (GitHub Actions) that run the checks on every push. |
| **Artifact** | A file a CI run produces and keeps for download, e.g. an installer. |
| **clippy / rustfmt** | Rust's built-in code checker and formatter. |

## Git and GitHub
| Term | Plain meaning |
|---|---|
| **Repository (repo)** | A project folder whose history Git tracks. |
| **Commit** | A saved snapshot with a message. |
| **Branch** | A parallel copy for trying things safely. |
| **Merge** | Bringing a branch's changes back into main. |
| **Push / pull** | Upload to / download from GitHub. |
| **Remote (origin)** | The copy of the repo on GitHub. |
| **Issue** | A to-do, bug or idea tracked on GitHub. |
| **Pull request (PR)** | A proposed change, reviewed before merging. |
| **GitHub Actions** | GitHub's robots that run checks and build installers. |
| **Release** | A published version on GitHub with its installers attached. |

## Design and accessibility
| Term | Plain meaning |
|---|---|
| **Design token** | A named design value (e.g. `--sage`) reused everywhere. |
| **Contrast ratio** | How different text is from its background (WCAG AA needs 4.5:1 for text). |
| **WCAG** | Web Content Accessibility Guidelines, the world standard for accessible sites. |
| **Screen reader** | Software that reads the screen aloud for blind or low-vision users. |
| **Reduced motion** | A device setting that asks apps to minimise animation. |
| **Progressive disclosure** | Showing advanced options only when asked for. |
| **Dark pattern** | A design that tricks or pressures users (streak guilt, fake urgency). |

## Security
| Term | Plain meaning |
|---|---|
| **XSS** | Cross-site scripting: tricking a page into running text as code. |
| **CSP** | Content Security Policy: a rule telling the browser what the page may load. |
| **Threat model** | A list of who might misuse the app or data, and how we defend. |

## Research
| Term | Plain meaning |
|---|---|
| **RCT** | Randomised controlled trial, the strongest single-study design. |
| **Meta-analysis** | A study combining many studies. |
| **n** | Number of participants. |
| **Effect size (g)** | How big an effect is: 0.2 small, 0.5 medium, 0.8 large. |
| **GAD** | Generalised anxiety disorder. |
| **CBT** | Cognitive behavioural therapy. |
| **Replication** | Repeating a study to see if the result holds. |
