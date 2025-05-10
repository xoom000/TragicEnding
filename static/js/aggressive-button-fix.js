/**
 * Aggressive fix for stuck download button
 * This completely overrides normal button behavior
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('Applying aggressive button fix...');

  const downloadForm = document.getElementById('download-form');
  const downloadButton = document.getElementById('download-button');
  const songInput = downloadForm ? downloadForm.querySelector('input[name="song_url"]') : null;

  if (!downloadForm || !downloadButton || !songInput) {
    console.error('Required elements not found');
    return;
  }

  // Remove all existing event listeners by completely recreating elements
  const originalButton = downloadButton;
  const originalForm = downloadForm;

  // Create completely new elements instead of cloning to avoid any lingering event handlers
  const newButton = document.createElement('button');
  newButton.id = 'download-button';
  newButton.className = 'custom-button'; // Skip Bootstrap classes entirely
  newButton.innerHTML = '<i class="fas fa-download"></i> Download';
  newButton.type = 'submit';

  // Preserve the input value before replacing the form
  const inputValue = songInput?.value || '';

  // Create a new form element instead of cloning
  const newForm = document.createElement('form');
  newForm.id = 'download-form';
  newForm.action = '/download';
  newForm.method = 'post';
  newForm.noValidate = true;

  // Create input container
  const inputDiv = document.createElement('div');
  inputDiv.className = 'mb-3';

  // Create new input
  const newInput = document.createElement('input');
  newInput.type = 'text';
  newInput.name = 'song_url';
  newInput.className = 'form-control';
  newInput.placeholder = 'Enter Spotify URL or song name';
  newInput.required = true;
  newInput.value = inputValue; // Restore value

  // Create button container
  const buttonDiv = document.createElement('div');
  buttonDiv.className = 'download-btn-container';

  // Assemble the DOM structure
  inputDiv.appendChild(newInput);
  buttonDiv.appendChild(newButton);
  newForm.appendChild(inputDiv);
  newForm.appendChild(buttonDiv);

  // Replace the original elements with our new ones
  downloadForm.parentNode.replaceChild(newForm, downloadForm);

  // Get references to the new elements
  const form = document.getElementById('download-form');
  const button = document.getElementById('download-button');
  const input = form.querySelector('input[name="song_url"]');

  // State management
  let isSubmitting = false;

  // Patch all element and document event handlers
  // Capture phase click handler to get ahead of other handlers
  button.addEventListener('click', function(e) {
    console.log('Button click intercepted in capture phase');
    // Block all event propagation
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    if (isSubmitting) {
      console.log('Already submitting, ignoring click');
      return false;
    }

    // Validate input
    if (!input.value.trim()) {
      // Trigger validation only - a custom event rather than interacting with the form directly
      input.classList.add('is-invalid');
      return false;
    }

    // Submit the form
    isSubmitting = true;
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
    button.blur();

    // Immediately detach from all tab related events by removing from tab order
    button.tabIndex = -1;

    // Remove all button state classes
    const allPossibleClasses = ['active', 'focus', 'clicked', 'btn-active', 'focus-visible', 'show'];
    button.classList.remove(...allPossibleClasses);

    // Prevent any access to the button while submitting
    button.style.pointerEvents = 'none';

    // Submit the form programmatically after a minimal delay
    setTimeout(() => {
      try {
        // Create completely new hidden form to avoid any potential issues
        const submitForm = document.createElement('form');
        submitForm.action = '/download';
        submitForm.method = 'post';
        submitForm.style.display = 'none';

        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'song_url';
        hiddenInput.value = input.value;

        submitForm.appendChild(hiddenInput);
        document.body.appendChild(submitForm);

        // Submit the clean form
        submitForm.submit();
      } catch (err) {
        console.error('Form submission error:', err);
        isSubmitting = false;
        location.reload(); // Reload as a last resort
      }
    }, 10);
  }, true); // true = capture phase

  // Override the addEventListener method for all elements in the document
  // This is extremely aggressive but necessary to prevent Bootstrap from adding handlers
  const originalAddEventListener = Element.prototype.addEventListener;
  Element.prototype.addEventListener = function(type, listener, options) {
    if ((type === 'click' || type === 'mousedown' || type === 'mouseup') &&
        (this === button || this === document || this === document.body)) {
      console.log(`Blocked attempt to add ${type} event handler to`, this);
      return;
    }
    return originalAddEventListener.apply(this, arguments);
  };

  // Also override document's addEventListener specifically
  const docAddEventListener = document.addEventListener;
  document.addEventListener = function(type, listener, options) {
    if (type === 'click' || type === 'mousedown' || type === 'mouseup') {
      console.log('Blocked attempt to add document click handler');
      return;
    }
    return docAddEventListener.apply(this, arguments);
  };

  // Aggressive cleanup - intercept existing document click handlers
  // by adding our own capture phase handler at the document level
  document.addEventListener('click', function(e) {
    // Check if click target is our button or inside it
    if (e.target === button || button.contains(e.target)) {
      console.log('Document level click intercepted for button');
      // Let our button handler manage it
      e.stopImmediatePropagation();
    }

    // Always make sure button doesn't have focus or active classes
    if (document.activeElement === button) {
      button.blur();
    }

    // Remove all button states just in case
    button.classList.remove('active', 'focus', 'clicked', 'btn-active');
  }, true); // true for capture phase

  // Prevent form from being submitted any other way
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!isSubmitting) {
      button.click();
    }
    return false;
  });

  // Prevent enter key from submitting when focused on button
  button.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      button.click();
    }
  });

  // Force remove focus from button continuously
  setInterval(() => {
    if (document.activeElement === button && !isSubmitting) {
      button.blur();
    }
    // Double-check button classes are clean
    button.classList.remove('active', 'focus', 'clicked', 'btn-active');
  }, 50); // Check more frequently

  // Special handling for tab navigation and bootstrap event delegation
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Tab' && !e.shiftKey) {
      // Prevent default tab behavior that might focus the button
      e.preventDefault();
      // Force focus to the next element after the button
      const allElements = Array.from(document.querySelectorAll('a, button, input, select, textarea'));
      const buttonIndex = allElements.indexOf(button);
      if (buttonIndex >= 0 && buttonIndex < allElements.length - 1) {
        allElements[buttonIndex + 1].focus();
      }
    }
  });

  // Complete disable of Bootstrap's event handlers
  // This attempts to unset whatever Bootstrap does to buttons
  setTimeout(() => {
    // Try to remove any data the Bootstrap JS might have attached
    delete button.dataset;
    button.removeAttribute('data-bs-toggle');
    button.removeAttribute('data-bs-target');
    button.removeAttribute('data-toggle');
    button.removeAttribute('data-target');
    button.removeAttribute('aria-expanded');
    button.removeAttribute('aria-pressed');
  }, 0);
});