# Quick Start Guide

## Step 1: Create Icons

1. Open `icons/download-icons.html` in your browser (just double-click it)
2. Click the "Generate & Download All Icons" button
3. Six PNG files will be downloaded:
   - Blue icons: `icon16.png`, `icon48.png`, `icon128.png`
   - Gray icons: `icon16-gray.png`, `icon48-gray.png`, `icon128-gray.png`
4. Move all six files to the `icons/` folder (replace existing placeholder files)

## Step 2: Install Extension

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
