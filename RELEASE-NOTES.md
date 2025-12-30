# Confluence Cursor Fix - Release Package

## What's Included

This ZIP file contains everything you need to install the Confluence Cursor Fix browser extension.

### Files in this package:

- `manifest.json` - Chrome/Edge/Brave configuration
- `manifest-firefox.json` - Firefox configuration (rename to `manifest.json` for Firefox)
- `background.js` - Background service worker
- `content.js` - Content script that applies the fix
- `popup.html` - Extension popup interface
- `popup.js` - Popup functionality
- `icons/` - All required icons (blue and gray versions)

## Installation

### Chrome / Edge / Brave / Opera

1. Extract the ZIP file to a folder on your computer
2. Open your browser and go to:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
   - Brave: `brave://extensions/`
3. Enable "Developer mode" (top right)
4. Click "Load unpacked"
5. Select the extracted folder

### Firefox

1. Extract the ZIP file to a folder on your computer
2. Rename `manifest-firefox.json` to `manifest.json` (replace the existing file)
3. Open Firefox and go to `about:debugging`
4. Click "This Firefox"
5. Click "Load Temporary Add-on"
6. Select the `manifest.json` file from the extracted folder

**Note**: In Firefox, temporary add-ons are removed when the browser restarts.

## Features

- ✅ Fixes the cursor jump bug in Confluence edit mode
- ✅ Toggle on/off via extension icon
- ✅ URL whitelist to restrict to specific Confluence sites
- ✅ Visual indicator (blue icon on Confluence, gray on other sites)
- ✅ Works on all Confluence versions

## Version

Version 1.0.1

## Support

For issues or questions, please refer to the README.md file or create an issue on GitHub.

