/**
 * Final button sanity check script
 * This runs after all other scripts to ensure the button is in a clean state
 */
(function() {
  console.log('🧹 Running final button sanity check...');
  
  // Wait until all scripts have executed
  setTimeout(() => {
    const button = document.getElementById('download-button');
    const form = document.getElementById('download-form');
    
    if (!button || !form) {
      console.log('🧹 Button or form not found, aborting sanity check');
      return;
    }
    
    console.log('🧹 Performing final button cleanup');
    
    // Ensure button has the correct class
    if (!button.classList.contains('custom-button')) {
      button.className = 'custom-button';
    }
    
    // Remove any lingering Bootstrap attributes
    [
      'data-bs-toggle', 'data-bs-target', 'data-toggle', 'data-target',
      'aria-pressed', 'aria-expanded', 'aria-controls'
    ].forEach(attr => {
      if (button.hasAttribute(attr)) {
        button.removeAttribute(attr);
      }
    });
    
    // Set up final protections against event handling
    const buttonProtection = setInterval(() => {
      if (!button || !document.body.contains(button)) {
        clearInterval(buttonProtection);
        return;
      }
      
      // Clean up any state that might have been added after our fix
      button.classList.remove('active', 'focus', 'btn-active');
      
      // If the button gets focused but it's not in the process of being clicked,
      // force it to blur
      if (document.activeElement === button && 
          !button.classList.contains('clicking') && 
          !button.disabled) {
        button.blur();
      }
    }, 50);
    
    // Create emergency event handler
    document.addEventListener('click', function(e) {
      // Only run if it's not clicking on the button itself
      if (e.target !== button && !button.contains(e.target)) {
        // Make absolutely sure the button is cleared
        button.classList.remove('active', 'focus', 'clicked', 'btn-active');
        button.blur();
      }
    }, true);
    
    console.log('🧹 Final button sanity check complete');
    
    // Double-check if Bootstrap is interfering
    if (typeof bootstrap !== 'undefined' && bootstrap.Button) {
      console.log('🧹 Checking for Bootstrap Button instances');
      try {
        // Disable Bootstrap Button initialization for our button
        bootstrap.Button._jQueryInterface = function() {
          console.log('🧹 Blocked Bootstrap jQuery interface');
          return null;
        };
      } catch (err) {
        console.error('🧹 Error checking Bootstrap:', err);
      }
    }
    
    // Try to debug common issues if they occur
    console.log('🧹 Setup debug monitor');
    setInterval(() => {
      // Check for common issues
      const computedStyle = window.getComputedStyle(button);
      if (computedStyle.backgroundColor !== 'rgb(255, 0, 132)' && 
          !button.disabled) {
        console.warn('🧹 Button style override detected!', {
          backgroundColor: computedStyle.backgroundColor
        });
        // Force reset the button style
        button.style.backgroundColor = '#ff0084';
      }
      
      // Check if the button has been re-assigned classes
      if (!button.classList.contains('custom-button')) {
        console.warn('🧹 Button class override detected!');
        button.className = 'custom-button';
      }
    }, 1000);
  }, 500);
})();