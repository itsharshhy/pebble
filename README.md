# Pebble
**A calm, private place to set your worries down, and see how many of them actually happened.**
A desktop app for Windows, macOS and Linux.

You write a worry in one line. You choose a day to look back. On that day Pebble asks one
gentle question: *Did it happen?* Over time you build your own quiet record of how often your
mind's forecasts came true.

> Pebble is based on the Worry Outcome Journal, a technique studied in anxiety research. In one
> small study of people with generalised anxiety, 91.4% of tracked worries didn't come true
> (LaFreniere & Newman, 2020). Your own record may look different.

## Why Pebble is different
- **Private:** no account, no server, no internet. Your words stay in a file on your computer, and Pebble's security settings block it from sending anything anywhere.
- **Calm:** no streaks, no badges, no red, no "you missed 5 days". Ever.
- **Fast and light:** built with [Tauri](https://tauri.app) and Rust; the Linux installer is under 3 MB.
- **Evidence-based:** every feature cites its research and how strong that research is. See the [Science page](docs/handbook/00-foundation/science.md).
- **Free and open source** (MIT).

## Status
🌱 Version 0.1.0, in testing. Not yet released.

## Install
**Download:** [latest release](https://github.com/itsharshhy/pebble/releases/latest) (built by GitHub Actions) for:
| System | File |
|---|---|
| Windows 10/11 | `Pebble_x.y.z_x64-setup.exe` or `.msi` |
| macOS 10.15+ (Apple Silicon and Intel) | `Pebble_x.y.z_universal.dmg` |
| Linux | `.deb` (Ubuntu, Debian), `.rpm` (Fedora), `.AppImage` (anywhere) |

Pebble isn't code-signed yet, so the first launch shows a warning ([step-by-step help](.github/release-notes.md)):
- **macOS:** open Pebble once, then System Settings → Privacy & Security → **Open Anyway**.
- **Windows:** on "Windows protected your PC", choose **More info** → **Run anyway**.

## Run it from source
You need Rust and the Tauri CLI ([full setup](docs/handbook/01-planning/dev-environment.md)):
```bash
cargo install tauri-cli --version "^2" --locked
```
```bash
cargo tauri dev
```

## Not medical care
Pebble is a reflection tool, not medical care. If you're struggling, please reach out to someone
you trust or a professional. Find a helpline in your country at [findahelpline.com](https://findahelpline.com).
India: Tele-MANAS **14416** (free, 24/7).

## Contributing
Read the [Handbook](docs/handbook/README.md). Every change must pass the [Calm Audit](docs/handbook/05-testing/calm-audit.md).
