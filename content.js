// Confluence Cursor Fix - Content Script
// Fixes the cursor jump bug in Confluence edit mode

(function() {
    'use strict';
    
    let isEnabled = true; // Default to enabled
    let allowedUrls = []; // URLs where the fix should be active (empty = all sites)
    let originalHeight = null; // Store original height for reverting
    
    // Load settings from storage
    chrome.storage.sync.get(['enabled', 'allowedUrls'], (result) => {
        isEnabled = result.enabled !== false; // Default to true
        allowedUrls = result.allowedUrls || [];
        console.log('Confluence Cursor Fix: Loaded settings - enabled:', isEnabled, 'URLs:', allowedUrls);
        
        const onConfluence = isConfluencePage();
        
        // Notify background script about Confluence status
        chrome.runtime.sendMessage({ 
            action: 'updateIcon', 
            isConfluence: onConfluence 
        }).catch(() => {
            // Ignore errors if background script is not ready
        });
        
        if (isEnabled && onConfluence && isUrlAllowed()) {
            applyEditorFix();
        }
    });
    
    // Listen for messages from popup
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === 'toggleFix') {
            isEnabled = message.enabled;
            console.log('Confluence Cursor Fix: Toggle received - enabled:', isEnabled);
            
            if (isEnabled && isUrlAllowed()) {
                applyEditorFix();
            } else {
                removeEditorFix();
            }
            sendResponse({ success: true });
        } else if (message.action === 'updateSettings') {
            isEnabled = message.enabled;
            allowedUrls = message.allowedUrls || [];
            console.log('Confluence Cursor Fix: Settings updated - enabled:', isEnabled, 'URLs:', allowedUrls);
            
            if (isEnabled && isUrlAllowed()) {
                applyEditorFix();
            } else {
                removeEditorFix();
            }
            sendResponse({ success: true });
        }
    });
    
    // Check if current URL is in the allowed list
    function isUrlAllowed() {
        // If no URLs specified, allow all sites
        if (allowedUrls.length === 0) {
            return true;
        }
        
        const currentHost = window.location.hostname.toLowerCase();
        const currentUrl = window.location.href.toLowerCase();
        
        // Check if current URL matches any allowed URL
        return allowedUrls.some(allowedUrl => {
            return currentHost.includes(allowedUrl) || currentUrl.includes(allowedUrl);
        });
    }
    
    // Check if we're on a Confluence page
    function isConfluencePage() {
        return document.querySelector('meta[name="confluence-request-time"]') !== null ||
               document.querySelector('meta[name="application-name"][content="Confluence"]') !== null ||
               window.location.hostname.includes('confluence') ||
               document.querySelector('#wysiwygTextarea_ifr') !== null;
    }

    // Apply the fix to the editor
    function applyEditorFix() {
        if (!isEnabled || !isUrlAllowed()) {
            return false;
        }
        
        try {
            const iframe = document.getElementById('wysiwygTextarea_ifr');
            if (iframe) {
                const contentDoc = iframe.contentDocument || iframe.contentWindow?.document;
                if (contentDoc?.body?.style) {
                    // Store original height if not already stored
                    if (originalHeight === null) {
                        originalHeight = contentDoc.body.style.height;
                    }
                    contentDoc.body.style.height = 'auto';
                    console.log('Confluence Cursor Fix: Applied height fix to editor');
                    return true;
                }
            }
        } catch (e) {
            console.error('Confluence Cursor Fix: Error applying fix', e);
        }
        return false;
    }
    
    // Remove the fix from the editor
    function removeEditorFix() {
        try {
            const iframe = document.getElementById('wysiwygTextarea_ifr');
            if (iframe) {
                const contentDoc = iframe.contentDocument || iframe.contentWindow?.document;
                if (contentDoc?.body?.style) {
                    // Restore original height or remove the property
                    if (originalHeight !== null) {
                        contentDoc.body.style.height = originalHeight;
                    } else {
                        contentDoc.body.style.height = '';
                    }
                    console.log('Confluence Cursor Fix: Removed height fix from editor');
                    return true;
                }
            }
        } catch (e) {
            console.error('Confluence Cursor Fix: Error removing fix', e);
        }
        return false;
    }

    // Try to use Confluence's native event system if available
    function tryNativeEventBinding() {
        try {
            // Check if Confluence's require system is available
            if (typeof require === 'function') {
                const confluenceEvent = require('confluence/api/event');
                if (confluenceEvent && typeof confluenceEvent.bind === 'function') {
                    confluenceEvent.bind('rte-ready', () => {
                        console.log('Confluence Cursor Fix: RTE ready event fired');
                        if (isEnabled) {
                            applyEditorFix();
                        }
                    });
                    console.log('Confluence Cursor Fix: Bound to rte-ready event');
                    return true;
                }
            }
        } catch (e) {
            console.log('Confluence Cursor Fix: Native event binding not available, using fallback');
        }
        return false;
    }

    // Fallback: Monitor for editor iframe appearance
    function monitorForEditor() {
        let checkCount = 0;
        const maxChecks = 50; // Check for up to 25 seconds
        
        const intervalId = setInterval(() => {
            checkCount++;
            
            if (isEnabled && applyEditorFix()) {
                clearInterval(intervalId);
                console.log('Confluence Cursor Fix: Editor found and fixed');
            } else if (checkCount >= maxChecks) {
                clearInterval(intervalId);
                console.log('Confluence Cursor Fix: Editor not found after maximum checks');
            }
        }, 500);
    }

    // Use MutationObserver to detect when editor is added to DOM
    function observeEditorAddition() {
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.addedNodes.length) {
                    const iframe = document.getElementById('wysiwygTextarea_ifr');
                    if (iframe && isEnabled) {
                        // Wait a bit for iframe content to load
                        setTimeout(() => {
                            applyEditorFix();
                        }, 100);
                    }
                }
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        console.log('Confluence Cursor Fix: Observing DOM for editor');
    }

    // Initialize the fix
    function init() {
        if (!isConfluencePage()) {
            return;
        }
        
        if (!isUrlAllowed()) {
            console.log('Confluence Cursor Fix: URL not in allowed list, skipping');
            return;
        }

        console.log('Confluence Cursor Fix: Confluence page detected, initializing fix');

        // Try native event binding first
        const nativeBindingSuccess = tryNativeEventBinding();

        // Apply fix immediately if editor already exists (will check isEnabled internally)
        applyEditorFix();

        // Set up fallback monitoring
        if (!nativeBindingSuccess) {
            monitorForEditor();
        }

        // Always observe for editor addition (handles page navigation in SPAs)
        observeEditorAddition();

        // Re-apply fix when window is resized or focused (edge cases)
        window.addEventListener('focus', () => {
            if (isEnabled) {
                setTimeout(applyEditorFix, 100);
            }
        });
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

