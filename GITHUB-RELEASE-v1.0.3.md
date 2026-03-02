# Confluence Cursor Fix v1.0.3

## 🎉 New Feature: Notify Watchers Control

This release adds a new feature to control the default state of the "Notify watchers" checkbox when editing Confluence pages.

## ✨ What's New

### Notify Watchers Control
- **New Toggle in Popup**: Control whether "Notify watchers" is checked by default
- **Automatic Management**: Extension automatically sets the checkbox state when you edit a page
- **Persistent Setting**: Your preference is saved and applied to all Confluence pages

### Why This Matters
If you frequently edit Confluence pages and don't want to notify watchers every time, you can now set the default to unchecked. No more manually unchecking the box for every edit!

## 📦 Installation

1. **Download** `confluence-cursor-fix-extension.zip` from this release
2. **Extract** the ZIP file to a folder on your computer
3. **Install** in your browser:
   - **Chrome/Edge/Brave**: Go to `chrome://extensions/` → Enable "Developer mode" → "Load unpacked" → Select the extracted folder
   - **Firefox**: Rename `manifest-firefox.json` to `manifest.json` → Go to `about:debugging` → "Load Temporary Add-on" → Select `manifest.json`

📖 **Detailed instructions**: See `INSTALLATION.md` in the ZIP file

## 🎯 All Features

- ✅ **Automatic Cursor Jump Fix** - Works automatically on all Confluence pages
- ✅ **Toggle On/Off** - Easy enable/disable via extension icon
- ✅ **URL Whitelist** - Restrict to specific Confluence sites
- ✅ **Visual Indicator** - Blue icon on Confluence, gray on other sites
- ✅ **Notify Watchers Control** - Set default state for "Notify watchers" checkbox ⭐ NEW
- ✅ **No Data Collection** - Completely private and local
- ✅ **Cross-Browser** - Works on Chrome, Edge, Brave, Firefox, Opera

## 📋 Changelog

### v1.0.3 (2025-03-02)
- **New Feature: Notify Watchers Control** - Set default state for "Notify watchers" checkbox when editing pages
- **UI Enhancement**: Added new toggle in popup to control notify watchers default
- **Automatic Checkbox Management**: Extension automatically sets and maintains the checkbox state

### v1.0.2 (2025-12-30)
- **Improved Fix Stability**: Enhanced CSS fixes with additional properties (minHeight, overflow)
- **Better HTML Element Handling**: Fix now also applies to documentElement for more consistent behavior
- **Simplified Approach**: Removed aggressive periodic checks for better performance

### v1.0.1 (2025-12-30)
- Initial release with toggle, URL whitelist, and dynamic icons

## 🔒 Privacy & Security

- ✅ No data collection
- ✅ No external connections
- ✅ Only modifies CSS on Confluence pages
- ✅ Open source - review the code yourself

---

**Need help?** Check the `README.md` or `INSTALLATION.md` files included in the ZIP.
