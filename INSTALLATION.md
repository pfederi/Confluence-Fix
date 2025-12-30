# Quick Start Guide

## Step 1: Install Extension

### For Chrome, Edge, Brave:

1. Open `chrome://extensions/` (or `edge://extensions/` or `brave://extensions/`)
2. Enable "Developer mode" in the top right
3. Click "Load unpacked"
4. Select this folder

### For Firefox:

1. Open `about:debugging`
2. Click "This Firefox"
3. Click "Load Temporary Add-on"
4. Select the `manifest.json` file

## Step 2: Pin to Toolbar (Recommended)

Pin the extension to your toolbar for easy access. The icon will change color to indicate when you're on a Confluence page.

### Chrome

1. Click the **Extensions icon** (puzzle piece) in the top-right corner
2. Find "Confluence Cursor Fix" in the list
3. Click the **pin icon** (📌) next to it
4. The extension icon will now appear in your toolbar

### Edge

1. Click the **Extensions icon** (puzzle piece) in the top-right corner
2. Find "Confluence Cursor Fix" in the list
3. Click the **eye icon** (👁️) next to it
4. The extension icon will now appear in your toolbar

### Brave

1. Click the **Extensions icon** (puzzle piece) in the top-right corner
2. Find "Confluence Cursor Fix" in the list
3. Click the **pin icon** (📌) next to it
4. The extension icon will now appear in your toolbar

### Firefox

1. Right-click on the toolbar (next to the address bar)
2. Select "Customize Toolbar"
3. Find the "Confluence Cursor Fix" icon in the list
4. Drag it to your desired position in the toolbar
5. Click "Done"

### Opera

1. Click the **Extensions icon** in the top-right corner
2. Find "Confluence Cursor Fix" in the list
3. Click the **pin icon** next to it
4. The extension icon will now appear in your toolbar

### What the Icon Shows

- **🔵 Blue Icon**: You're on a Confluence page - the fix is active
- **⚪ Gray Icon**: You're not on a Confluence page - the fix is inactive

Click the icon at any time to toggle the fix on/off, manage URLs, or check the status.

## Step 3: Test

1. Open a Confluence page
2. Switch to edit mode
3. The cursor should no longer jump!

## Verification

Open the browser console (F12) and look for:
```
Confluence Cursor Fix: Confluence page detected, initializing fix
Confluence Cursor Fix: Applied height fix to editor
```

If you see these messages, the extension is working!
