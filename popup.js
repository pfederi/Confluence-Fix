// Popup script for Confluence Cursor Fix

document.addEventListener('DOMContentLoaded', async () => {
    const toggle = document.getElementById('enableToggle');
    const status = document.getElementById('status');
    const urlInput = document.getElementById('urlInput');
    const addUrlBtn = document.getElementById('addUrlBtn');
    const urlList = document.getElementById('urlList');
    
    let allowedUrls = [];
    let isOnConfluence = false;
    let currentUrl = '';
    
    // Get current tab info
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.url) {
        currentUrl = tab.url;
        isOnConfluence = checkIfConfluenceUrl(currentUrl);
    }
    
    // Load current state
    const result = await chrome.storage.sync.get(['enabled', 'allowedUrls']);
    const isEnabled = result.enabled !== false; // Default to true
    allowedUrls = result.allowedUrls || [];
    
    toggle.checked = isEnabled;
    updateStatus(isEnabled, isOnConfluence);
    renderUrlList();
    
    // Listen for toggle changes
    toggle.addEventListener('change', async (e) => {
        const enabled = e.target.checked;
        await chrome.storage.sync.set({ enabled });
        updateStatus(enabled, isOnConfluence);
        notifyAllTabs();
    });
    
    // Add URL
    addUrlBtn.addEventListener('click', () => {
        addUrl();
    });
    
    // Add URL on Enter key
    urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addUrl();
        }
    });
    
    function addUrl() {
        const url = urlInput.value.trim();
        if (!url) return;
        
        // Clean up URL (remove protocol, trailing slashes, etc.)
        const cleanUrl = url
            .replace(/^https?:\/\//, '')
            .replace(/\/$/, '')
            .toLowerCase();
        
        if (cleanUrl && !allowedUrls.includes(cleanUrl)) {
            allowedUrls.push(cleanUrl);
            saveUrls();
            urlInput.value = '';
            renderUrlList();
            notifyAllTabs();
        }
    }
    
    function removeUrl(url) {
        allowedUrls = allowedUrls.filter(u => u !== url);
        saveUrls();
        renderUrlList();
        notifyAllTabs();
    }
    
    async function saveUrls() {
        await chrome.storage.sync.set({ allowedUrls });
    }
    
    function renderUrlList() {
        urlList.innerHTML = '';
        
        allowedUrls.forEach(url => {
            const item = document.createElement('div');
            item.className = 'url-item';
            
            const text = document.createElement('span');
            text.className = 'url-text';
            text.textContent = url;
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-btn';
            removeBtn.textContent = '×';
            removeBtn.title = 'Remove';
            removeBtn.addEventListener('click', () => removeUrl(url));
            
            item.appendChild(text);
            item.appendChild(removeBtn);
            urlList.appendChild(item);
        });
    }
    
    async function notifyAllTabs() {
        const tabs = await chrome.tabs.query({});
        tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, { 
                action: 'updateSettings',
                enabled: toggle.checked,
                allowedUrls: allowedUrls
            }).catch(() => {
                // Ignore errors for tabs that don't have the content script
            });
        });
    }
    
    function updateStatus(enabled, onConfluence) {
        if (!onConfluence) {
            status.className = 'status disabled';
            status.innerHTML = '⚠️ Not on a Confluence page<br><small style="font-size: 11px; margin-top: 5px; display: block;">The fix only works on Confluence sites</small>';
        } else if (enabled) {
            status.className = 'status enabled';
            status.textContent = '✓ Fix is enabled and active';
        } else {
            status.className = 'status disabled';
            status.textContent = '✗ Fix is disabled';
        }
    }
    
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
});

