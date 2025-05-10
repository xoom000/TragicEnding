/**
 * Button Isolation Layer
 * This script creates a complete isolation layer for the download button
 * to prevent any interference from Bootstrap or other scripts
 */
(function() {
  // Execute with highest priority (ensures this runs before aggressive-button-fix.js)
  const priority = setTimeout(function() {
    console.log('🔴 Initializing button isolation layer...');
    
    // Backup native functions that might be overridden
    const originalAddEventListener = Element.prototype.addEventListener;
    const originalRemoveEventListener = Element.prototype.removeEventListener;
    const originalQuerySelector = Element.prototype.querySelector;
    const originalGetElementById = document.getElementById;
    
    // Block Bootstrap from directly accessing our button through selectors
    document.getElementById = function(id) {
      const element = originalGetElementById.call(document, id);
      if (id === 'download-button') {
        console.log('🔴 Protected access to download button via getElementById');
        
        // Return a proxy that blocks certain operations
        return new Proxy(element, {
          get: function(target, prop) {
            if (prop === 'addEventListener') {
              return function(type, listener, options) {
                console.log(`🔴 Blocked external addEventListener "${type}" on button`);
                return null;
              };
            }
            return target[prop];
          },
          set: function(target, prop, value) {
            console.log(`🔴 Attempt to set ${prop} on download button blocked`);
            // Block most property changes
            if (prop !== 'value' && prop !== 'innerText' && prop !== 'innerHTML') {
              return true;
            }
            target[prop] = value;
            return true;
          }
        });
      }
      return element;
    };
    
    // Hijack global query selectors that might target our button
    Element.prototype.querySelector = function(selector) {
      if (selector.includes('#download-button') || 
          selector.includes('.btn') || 
          selector === 'button') {
        console.log(`🔴 Protected querySelector "${selector}"`);
        const result = originalQuerySelector.call(this, selector);
        if (result && result.id === 'download-button') {
          return null; // Hide the button from Bootstrap's selectors
        }
        return result;
      }
      return originalQuerySelector.call(this, selector);
    };
    
    // Clean up all existing click handlers on document
    try {
      // Create a new document body element to clear event handlers
      const oldBody = document.body;
      const newBody = oldBody.cloneNode(true);
      
      // Handle special post-clone setup for our button
      const downloadButton = newBody.querySelector('#download-button');
      if (downloadButton) {
        console.log('🔴 Transferring necessary button properties');
        // Clean it up
        downloadButton.classList.remove('btn', 'btn-primary');
        downloadButton.classList.add('custom-button');
        downloadButton.style.cssText = 'all: initial; display: inline-block; cursor: pointer;';
      }

      // Before replacing body, apply an isolation patch for Bootstrap events
      const bootstrapPatch = document.createElement('script');
      bootstrapPatch.textContent = `
        // Block Bootstrap button initialization
        if (typeof bootstrap !== 'undefined') {
          console.log('🔴 Applying Bootstrap patch');
          if (bootstrap.Button) {
            bootstrap.Button._instanceMap = new Map();
            bootstrap.Button.getOrCreateInstance = function() { 
              return { dispose: function() {} };
            };
          }
        }
      `;
      document.head.appendChild(bootstrapPatch);
      
      // Replace the body element to clear all event handlers
      // NOTE: This is a drastic approach that might cause issues with other scripts
      // Only do this if we're sure the button is still sticking after other fixes
      // oldBody.parentNode.replaceChild(newBody, oldBody);
      console.log('🔴 Isolation layer ready to perform body replacement if needed');
    } catch (err) {
      console.error('🔴 Error in button isolation layer:', err);
    }

    console.log('🔴 Button isolation layer initialized');
  }, 0);
})();