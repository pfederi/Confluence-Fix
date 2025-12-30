// Background script for Confluence Cursor Fix
// Manages icon state based on current page

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        updateIcon(tabId, tab.url);
    }
});

// Listen for tab activation
chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    if (tab.url) {
        updateIcon(activeInfo.tabId, tab.url);
    }
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'updateIcon' && sender.tab) {
        updateIcon(sender.tab.id, sender.tab.url, message.isConfluence);
    }
});

// Update icon based on whether we're on a Confluence page
function updateIcon(tabId, url, isConfluence = null) {
    // If not explicitly told, check URL
    if (isConfluence === null) {
        isConfluence = checkIfConfluenceUrl(url);
    }
    
    if (isConfluence) {
        // Blue icon for Confluence pages
        chrome.action.setIcon({
            tabId: tabId,
            path: {
                "16": "icons/icon16.png",
                "48": "icons/icon48.png",
                "128": "icons/icon128.png"
            }
        });
        chrome.action.setTitle({
            tabId: tabId,
            title: "Confluence Cursor Fix - Active"
        });
    } else {
        // Gray icon for non-Confluence pages
        chrome.action.setIcon({
            tabId: tabId,
            path: {
                "16": "icons/icon16-gray.png",
                "48": "icons/icon48-gray.png",
                "128": "icons/icon128-gray.png"
            }
        });
        chrome.action.setTitle({
            tabId: tabId,
            title: "Confluence Cursor Fix - Inactive (not on Confluence)"
        });
    }
}

// Simple URL check for Confluence
function checkIfConfluenceUrl(url) {
    if (!url) return false;
    
    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname.toLowerCase();
        
        // Check if URL contains 'confluence'
        return hostname.includes('confluence') || 
               url.toLowerCase().includes('confluence');
    } catch (e) {
        return false;
    }
}

