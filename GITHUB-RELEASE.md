# Confluence Cursor Fix v1.0.2

Fix the annoying cursor jump bug in Confluence edit mode with this browser extension.

## 🎯 What This Extension Does

When editing long Confluence pages, the cursor sometimes jumps to the top of the page unexpectedly. This extension applies the official Atlassian workaround automatically, so you can edit without interruptions.

## ✨ Features

- ✅ **Automatic Fix** - Works automatically on all Confluence pages
- ✅ **Toggle On/Off** - Easy enable/disable via extension icon
- ✅ **URL Whitelist** - Restrict to specific Confluence sites
- ✅ **Visual Indicator** - Blue icon on Confluence, gray on other sites
- ✅ **No Data Collection** - Completely private and local
- ✅ **Cross-Browser** - Works on Chrome, Edge, Brave, Firefox, Opera

## 📦 Installation

1. **Download** `confluence-cursor-fix-extension.zip` from this release
2. **Extract** the ZIP file to a folder on your computer
3. **Install** in your browser:
   - **Chrome/Edge/Brave**: Go to `chrome://extensions/` → Enable "Developer mode" → "Load unpacked" → Select the extracted folder
   - **Firefox**: Rename `manifest-firefox.json` to `manifest.json` → Go to `about:debugging` → "Load Temporary Add-on" → Select `manifest.json`

📖 **Detailed instructions**: See `INSTALLATION.md` in the ZIP file

## 🎨 How It Works

The extension icon changes color based on the current page:

- **🔵 Blue Icon** = You're on a Confluence page - fix is active
- **⚪ Gray Icon** = You're not on a Confluence page - fix is inactive

Click the icon to:
- Toggle the fix on/off
- Add/remove URLs from the whitelist
- Check the current status

## 🔒 Privacy & Security

- ✅ No data collection
- ✅ No external connections
- ✅ Only modifies CSS on Confluence pages
- ✅ Open source - review the code yourself

## 📋 Requirements

- **Chrome** 88+ / **Edge** 88+ / **Brave** / **Opera** (Chromium-based browsers)
- **Firefox** 57+

## 🐛 Known Issues

- Firefox: Temporary add-ons are removed when the browser restarts (requires reload)

## 📝 What's Included

- Extension files (manifest, scripts, icons)
- Complete documentation (README.md, INSTALLATION.md)
- Firefox configuration (manifest-firefox.json)

## 🙏 Credits

Based on the official Atlassian workaround for the Confluence cursor jump bug.

## 📄 License

Free to use and modify.

---

**Need help?** Check the `README.md` or `INSTALLATION.md` files included in the ZIP.

