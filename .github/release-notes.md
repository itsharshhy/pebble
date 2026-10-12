A calm, private place to set your worries down, and see how many of them actually happened.
Everything stays in a file on your computer. No account, no internet.

## Download (pick one, under **Assets** below)
| Your computer | File |
|---|---|
| **Windows 10/11** | `Pebble_…_x64-setup.exe` (recommended) or `Pebble_…_x64_en-US.msi` |
| **Mac** (Apple Silicon M1–M4 and Intel) | `Pebble_…_universal.dmg` |
| **Linux** | `.deb` (Ubuntu, Debian), `.rpm` (Fedora), or `.AppImage` (any distribution) |

## Why your computer warns you, and how to get past it
Pebble is free and isn't code-signed yet (signing costs money every year). Windows, macOS and
browsers are cautious with unsigned apps, so you'll see a warning **once**. Pebble never connects
to the internet; its source code is in this repository.

### Windows
1. **If the browser blocks the download:**
   - **Edge** ("isn't commonly downloaded"): in the downloads list, hover the file → **…** → **Keep** → **Show more** → **Keep anyway**.
   - **Chrome** ("Suspicious download" or "unverified"): in the downloads list click **Keep** (or **Download suspicious file**).
2. Open the installer. On **"Windows protected your PC"**, click **More info** → **Run anyway**.
3. Follow the installer. Pebble appears in the Start menu.

### Mac
1. Open the `.dmg` and drag **Pebble** into **Applications**.
2. Open Pebble from Applications. macOS says it **can't verify** the app: click **Done** (or **OK**).
3. Open **System Settings → Privacy & Security**, scroll down to "Pebble was blocked…", click **Open Anyway**, enter your password, then **Open**.
4. Still says **"damaged"**? Open **Terminal** and run this once, then open Pebble again:
   ```
   xattr -cr /Applications/Pebble.app
   ```

### Linux
- `.deb`: `sudo apt install ./Pebble_…_amd64.deb`
- `.AppImage`: right-click → Properties → allow executing, or `chmod +x Pebble_…_amd64.AppImage`, then open it.

## What's new
See [CHANGELOG.md](https://github.com/itsharshhy/pebble/blob/main/CHANGELOG.md).

Pebble is a reflection tool, not medical care. If you're struggling, please reach out to someone you trust or a professional. Find a helpline: https://findahelpline.com · India: Tele-MANAS 14416.
