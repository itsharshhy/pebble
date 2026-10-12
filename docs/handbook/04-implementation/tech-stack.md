# Tech stack
*Phase: Implementation · What we use, and why each choice fits a fast, calm, private desktop app.*

| Layer | Choice | Why | Decision |
|---|---|---|---|
| App shell | **Tauri 2** (Rust) | Native installers for Windows, macOS and Linux; usually under 15 MB; starts fast; small memory use | [ADR-009](../03-design/decisions.md) |
| Shell language | **Rust** (stable, 2021 edition) | Fast and memory-safe; the code that guards people's data can't crash with a null pointer or buffer overflow | ADR-009 |
| Structure | **HTML5** | Semantic elements give accessibility for free | [ADR-001](../03-design/decisions.md) |
| Style | **CSS** (custom properties, grid, flexbox, `color-mix()`, `backdrop-filter`, media queries) | Tokens in one place; no preprocessor needed | ADR-001 |
| Behaviour | **JavaScript** (ES2020+, ES modules) | Runs in every system web view; no build step | ADR-001 |
| Storage | **One JSON file** on disk, written atomically by Rust | Survives browser cleanups and crashes | [ADR-010](../03-design/decisions.md) |
| Fonts | **System fonts** (rounded sans + system serif for display) | Private, instant, nothing to download | [ADR-003](../03-design/decisions.md), [ADR-012](../03-design/decisions.md) |
| Routing | **Hash routing** | Works in the app and the browser preview | [ADR-006](../03-design/decisions.md) |
| Distribution | **GitHub Actions** builds installers on each system | No server; no hosting | [ADR-011](../03-design/decisions.md) |
| Testing | `cargo test` (Rust) · `node tests/tests.js` and `tests/index.html` (JavaScript) · manual checklists | No test framework to install | [Test strategy](../05-testing/test-strategy.md) |
| Lint and format | `cargo fmt`, `cargo clippy -D warnings` | Built into Rust; no extra tools | [Coding standards](coding-standards.md) |
| Crypto (v2) | Rust crates reviewed by an ADR (e.g. `aes-gcm`, `argon2`) | Audited, maintained | [Privacy and security](../03-design/privacy-security.md) |

## Rust crates we depend on (and why each is allowed)
Every crate is a dependency someone else maintains. Each one needs a reason. Adding one needs an ADR.
| Crate | Why |
|---|---|
| `tauri`, `tauri-build` | The app shell itself |
| `tauri-plugin-dialog` | Native Save and Open dialogs for backups (U6) |
| `tauri-plugin-opener` | Opens the fixed help links in the person's own browser |
| `serde_json` | Checks that what we save is real JSON |
| `tempfile` *(tests only)* | Throwaway folders for storage tests |

`Cargo.lock` is committed so every build uses exactly the same versions.

## Which web engine runs the interface
| System | Engine | Notes |
|---|---|---|
| Windows 10 and 11 | **WebView2** (Chromium-based) | Already on Windows 11; the installer adds it on Windows 10 if missing |
| macOS 10.15+ | **WKWebView** (Safari's engine) | Built in |
| Linux | **WebKitGTK 4.1** | Installed as a package dependency (`libwebkit2gtk-4.1`) |

So we test against Chromium **and** WebKit. Features we rely on are supported by both:
| Feature | Used for | Fallback |
|---|---|---|
| CSS custom properties | Design tokens | — (universal) |
| `color-mix()` | Soft tints | A plain hex declared first |
| `backdrop-filter` | Frosted nav | Solid `--bg` declared first |
| `prefers-reduced-motion` | Calm fallback | Motion only inside `@media (prefers-reduced-motion: no-preference)` |
| `prefers-color-scheme` | Evening palette | Day palette |
| `<dialog>` | Confirmations | — |
| ES modules | Splitting the interface | — |

## What we deliberately don't use (and when we'd reconsider)
| Not using | Reconsider when |
|---|---|
| Electron | Never: too heavy for a calm, fast app |
| React / Vue / Svelte | More than ~10 screens or complex shared state |
| Node.js, npm, bundlers | Only if a real need appears, with an ADR. The Tauri CLI comes from Cargo, so Node isn't needed |
| TypeScript | When a contributor joins and types would prevent real bugs |
| CSS frameworks | Never. Our design system *is* the framework |
| Analytics, crash reporting, auto-updater | Never by default ([Principles](../00-foundation/principles.md)). An opt-in update check needs an ADR |

## Done when
`cargo tauri build` produces an installer on each system, and the app makes zero network requests.
