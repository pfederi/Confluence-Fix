# Confluence Cursor Fix Browser Extension

This browser extension fixes the known bug in Confluence where the cursor unexpectedly jumps to the beginning of the page when editing long pages.

## The Problem

When editing a long Confluence page (scrollable both vertically and horizontally), the cursor sometimes jumps to the top of the page when you:
- Click far to the right of existing text
- Press Enter
- Press other keys

## The Solution

This extension automatically applies the official Atlassian workaround without requiring you to edit Custom HTML in Confluence. The fix sets the editor body height to `auto`, which resolves the cursor jump problem.

## Features

- ✅ **Automatic Cursor Jump Fix** - Works automatically on all Confluence pages
- ✅ **Toggle On/Off** - Easy enable/disable via extension icon
- ✅ **URL Whitelist** - Restrict to specific Confluence sites
- ✅ **Visual Indicator** - Blue icon on Confluence, gray on other sites
- ✅ **Notify Watchers Control** - Set default state for "Notify watchers" checkbox
- ✅ **No Data Collection** - Completely private and local
- ✅ **Cross-Browser** - Works on Chrome, Edge, Brave, Firefox, Opera

## Installation

### Chrome / Edge / Brave / Opera (Chromium-based browsers)

1. Download all extension files
2. Open your browser and navigate to:
   - **Chrome**: `chrome://extensions/`
   - **Edge**: `edge://extensions/`
   - **Brave**: `brave://extensions/`
   - **Opera**: `opera://extensions/`
3. Enable "Developer Mode" in the top right
4. Click "Load unpacked"
5. Select the folder containing the extension files

### Firefox

1. Download all extension files
2. Open Firefox and navigate to `about:debugging`
3. Click "This Firefox"
4. Click "Load Temporary Add-on"
5. Select the `manifest.json` file

**Note for Firefox**: Temporary add-ons are removed when Firefox restarts. For permanent installation, the extension must be signed by Mozilla.

## Usage

After installation, the extension works automatically:

1. Open a Confluence page
2. Switch to edit mode
3. The extension automatically detects the Confluence editor and applies the fix
4. You can now work normally without the cursor jumping

### Visual Indicators

The extension icon changes color based on the current page:

- **🔵 Blue Icon**: You're on a Confluence page - the fix is active
- **⚪ Gray Icon**: You're not on a Confluence page - the fix is inactive

Click the icon to see the current status and manage settings.

### Enabling/Disabling the Fix

You can toggle the fix on or off at any time:

1. Click the extension icon in your browser toolbar
2. Use the toggle switch to enable or disable the fix
3. The change takes effect immediately on all open Confluence pages

The extension remembers your preference and will maintain it across browser sessions.

### URL Whitelist

You can restrict the fix to specific Confluence sites:

1. Click the extension icon in your browser toolbar
2. In the "Active URLs" section, enter the URL or hostname of your Confluence site
   - Examples: `confluence.company.com`, `mycompany.atlassian.net`
3. Click "Add" to add the URL to the whitelist
4. The fix will only work on the specified URLs
5. To remove a URL, click the × button next to it

**Note:** If no URLs are added, the fix will work on all Confluence sites (default behavior).

### Notify Watchers Default

You can control the default state of the "Notify watchers" checkbox when editing Confluence pages:

1. Click the extension icon in your browser toolbar
2. In the "Notify Watchers" section, toggle "Notify watchers by default"
   - **On** (default): The checkbox will be checked when you edit a page
   - **Off**: The checkbox will be unchecked when you edit a page
3. The setting applies immediately to all Confluence pages

This is useful if you frequently edit pages and don't want to notify watchers every time.

## How It Works

The extension:
- Automatically detects Confluence pages
- Waits for the Rich Text Editor to load
- Applies the fix `contentDoc.body.style.height = 'auto'` to the editor iframe
- Continuously monitors the page to apply the fix even after page navigation

## Debugging

The extension writes log messages to the browser console. To check if it's working:

1. Open Developer Tools (F12)
2. Go to the "Console" tab
3. Look for messages starting with "Confluence Cursor Fix:"

Typical messages:
- `Confluence page detected, initializing fix` - Extension detected Confluence
- `Applied height fix to editor` - Fix was successfully applied
- `RTE ready event fired` - Confluence's native event was detected

## Compatibility

- **Browsers**: 
  - ✅ **Chrome, Edge, Brave, Opera** (Chromium-based): Full support, easy installation
  - ✅ **Firefox**: Full support, but requires reload after each restart
- **Confluence**: All versions with the known cursor jump bug
- **Manifest Version**: 3 (latest standard for Chrome/Edge), 2 (Firefox)

## Technical Details

The extension uses multiple strategies to reliably apply the fix:

1. **Native Event Binding**: Attempts to use Confluence's own `rte-ready` event
2. **Immediate Application**: Checks if the editor already exists on load
3. **Polling Fallback**: Monitors the page for up to 25 seconds after loading
4. **MutationObserver**: Detects when the editor is dynamically added to the page
5. **Focus Handler**: Re-applies the fix when the window gains focus

## Known Limitations

- The extension must run on all websites to detect Confluence instances on different domains
- In Firefox, temporary add-ons must be reloaded after each restart
- The fix is based on the official Atlassian workaround and should be safe, but has not been tested in all possible configurations

## Security and Privacy

This extension:
- Collects no data
- Sends no information to external servers
- Runs only locally in your browser
- Has access only to the current tab page
- Modifies only the CSS of the Confluence editor

## Source

This fix is based on the official Atlassian workaround for the cursor jump problem. The original workaround has been adapted for use as a browser extension.

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Ensure the extension is enabled
3. Try disabling and re-enabling the extension
4. Reload the Confluence page

## License

This extension is freely available and can be used and modified as desired.
