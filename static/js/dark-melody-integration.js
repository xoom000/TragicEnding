/**
 * A Tragic Ending - Advanced UI Integration Script
 * This script enhances the gothic UI with advanced animations and effects
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Create decorative skulls
  createFloatingElements();

  // Initialize advanced UI effects
  initAnimations();

  // Fix download button issue specifically
  fixDownloadButtonIssue();

  // Fix all buttons across the app
  fixAllButtonStickingIssues();

  // Enhance buttons
  enhanceButtons();

  // Enhance form elements
  enhanceForms();

  // Add toast notification system
  initToastSystem();

  // Initialize audio visualizer (if playing music)
  initAudioVisualizer();

  // Initialize drawing canvas
  initDrawingCanvas();

  // Initialize CD template printing functionality
  initPrintFunctionality();

  // Initialize print size guide
  initPrintSizeGuide();
});

/**
 * Creates floating decorative elements in the background
 */
function createFloatingElements() {
  // Skull decorations are already added via HTML
  
  // Add glowing effect to the page title
  const pageTitle = document.querySelector('.navbar-brand');
  if (pageTitle) {
    pageTitle.classList.add('glowing-text');
  }
  
  // Add subtle animation to skull icons
  document.querySelectorAll('.skull-icon').forEach(skull => {
    skull.style.animation = 'pulse 3s infinite alternate';
  });
}

/**
 * Initializes various animations for UI elements
 */
function initAnimations() {
  // Add entrance animations for elements as they scroll into view
  const observerConfig = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerConfig);
  
  // Add animation to cards and list items
  document.querySelectorAll('.card, .list-group-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    item.style.transitionDelay = (index * 0.05) + 's';
    observer.observe(item);
  });
  
  // Add the style needed for the animations
  const style = document.createElement('style');
  style.textContent = '.animated-in { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);
  
  // Add hover animation to gothic borders
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.boxShadow = '0 0 30px rgba(255, 0, 132, 0.4)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = '0 0 15px rgba(255, 0, 132, 0.2)';
    });
  });
}

/**
 * Fix specifically for the download button issue
 * This handles the case where the button stays clicked
 * and gets triggered when clicking elsewhere
 */
function fixDownloadButtonIssue() {
  // Get the download form and button
  const downloadForm = document.querySelector('form[action="/download"]');
  const downloadButton = downloadForm?.querySelector('button[type="submit"]');

  if (downloadForm && downloadButton) {
    console.log('Adding specific fix for download button...');

    // 1. Ensure the form has a clean submission without side effects
    downloadForm.addEventListener('submit', function(e) {
      // Add a loading state to indicate it's working
      downloadButton.classList.add('is-submitting');
      downloadButton.disabled = true;

      // Add a small timeout to prevent immediate re-clicks
      setTimeout(() => {
        downloadButton.disabled = false;
        downloadButton.classList.remove('is-submitting');
      }, 1000);
    });

    // 2. Apply a higher specificity click handler to the download button
    downloadButton.addEventListener('mousedown', function(e) {
      // Mark this event as being handled
      e.stopPropagation();
      downloadButton.dataset.buttonPressed = 'true';

      // Remove pressed state on mouseup anywhere in the document
      document.addEventListener('mouseup', function clearButtonState() {
        downloadButton.dataset.buttonPressed = 'false';
        downloadButton.blur(); // Remove focus
        document.removeEventListener('mouseup', clearButtonState);
      }, { once: true });
    });

    // 3. Ensure the button releases if mouse moves outside
    downloadButton.addEventListener('mouseleave', function() {
      if (downloadButton.dataset.buttonPressed === 'true') {
        downloadButton.dataset.buttonPressed = 'false';
        downloadButton.blur(); // Remove focus state
      }
    });

    // 4. Create a containment area around the download form
    // This captures clicks outside the form and prevents bubbling
    const formContainer = downloadForm.closest('.card-body');
    if (formContainer) {
      formContainer.addEventListener('click', function(e) {
        // If clicking directly on the container (not on form elements)
        if (e.target === formContainer) {
          e.stopPropagation();
        }
      }, true); // Using capture phase
    }

    // 5. Add specific style to handle visual feedback
    const style = document.createElement('style');
    style.textContent = `
      .btn.is-submitting {
        opacity: 0.8;
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);
  }
}

/**
 * Fix all buttons in the application to prevent sticking issues
 * This is a comprehensive solution that works for all buttons and forms
 */
function fixAllButtonStickingIssues() {
  console.log('Applying comprehensive button fixes throughout the application...');

  // 1. Apply fixes to all form submit buttons
  document.querySelectorAll('form').forEach((form, formIndex) => {
    const submitButtons = form.querySelectorAll('button[type="submit"]');

    submitButtons.forEach((button, btnIndex) => {
      const buttonId = `form_${formIndex}_btn_${btnIndex}`;
      button.dataset.fixedButtonId = buttonId;

      // Fix mousedown/mouseup cycle
      button.addEventListener('mousedown', function() {
        const clearButtonState = function() {
          button.blur();
          document.removeEventListener('mouseup', clearButtonState);
          document.removeEventListener('click', clearButtonState);
        };

        // Add multiple event listeners to ensure the button state is cleared
        document.addEventListener('mouseup', clearButtonState, { once: true });
        document.addEventListener('click', clearButtonState, { once: true });
      });

      // Handle mouse leaving button area
      button.addEventListener('mouseleave', function() {
        button.blur();
      });

      // Force blur after click
      button.addEventListener('click', function() {
        setTimeout(() => button.blur(), 10);
      });
    });

    // Fix form container clicks
    const formContainer = form.closest('.card-body');
    if (formContainer) {
      formContainer.addEventListener('click', function(e) {
        if (e.target === formContainer || e.target === form) {
          // Stop propagation and blur all buttons
          e.stopPropagation();
          submitButtons.forEach(btn => btn.blur());
        }
      }, true);
    }
  });

  // 2. Apply fixes to all other buttons
  document.querySelectorAll('.btn').forEach((button, index) => {
    // Skip if already processed
    if (button.dataset.fixedButtonId) return;

    const buttonId = `other_btn_${index}`;
    button.dataset.fixedButtonId = buttonId;

    // Ensure button releases properly
    button.addEventListener('mousedown', function() {
      // Force blur when mouse up anywhere in document
      const clearButton = function() {
        button.blur();
        document.removeEventListener('mouseup', clearButton);
      };

      document.addEventListener('mouseup', clearButton, { once: true });
    });

    // Extra safeguards
    button.addEventListener('mouseleave', function() {
      button.blur();
    });

    button.addEventListener('click', function() {
      setTimeout(() => button.blur(), 10);
    });
  });

  // 3. Global document handler to reset all buttons
  document.addEventListener('click', function(e) {
    // If clicked outside a button, blur all buttons
    if (!e.target.classList.contains('btn') && !e.target.closest('.btn')) {
      document.querySelectorAll('.btn').forEach(btn => btn.blur());
    }
  }, true);

  // 4. Enhanced button styling to prevent stuck visual states
  const buttonStyles = document.createElement('style');
  buttonStyles.textContent = `
    /* Better visual styles for buttons */
    .btn:focus-visible {
      outline: none;
      box-shadow: 0 0 0 0.25rem rgba(255, 0, 132, 0.4);
    }

    .btn:not(:focus-visible) {
      outline: none !important;
      box-shadow: none !important;
    }

    /* Subtle press animation */
    .btn:active {
      transform: translateY(1px);
    }

    /* Prevent button from staying in "active" state */
    .btn:not(:active) {
      transform: translateY(0);
    }
  `;
  document.head.appendChild(buttonStyles);
}

/**
 * Enhances buttons with advanced effects
 */
function enhanceButtons() {
  // Store clicked state to prevent duplicate firing
  let buttonClickTracking = new Map();

  // Add ripple effect to buttons
  document.querySelectorAll('.btn').forEach(button => {
    // Create a unique identifier for this button
    const btnId = Math.random().toString(36).substring(2, 15);
    button.dataset.btnTrackId = btnId;

    button.addEventListener('click', function(e) {
      // Prevent the issue where clicking outside a container re-triggers the button
      if (buttonClickTracking.get(btnId) === true) {
        console.log('Preventing duplicate click on button');
        return;
      }

      // Mark this button as clicked
      buttonClickTracking.set(btnId, true);

      // Reset the clicked state after a short delay
      setTimeout(() => {
        buttonClickTracking.set(btnId, false);
      }, 300);

      // Only continue with the ripple effect if this is not a duplicate click
      if (e.target === button || button.contains(e.target)) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        button.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      }

      // Force remove focus after click processing to prevent "stuck" buttons
      setTimeout(() => {
        button.blur();
      }, 100);
    });

    // Add mousedown/mouseup handling to ensure buttons don't stay in active state
    button.addEventListener('mousedown', function() {
      document.addEventListener('mouseup', function clearButtonState() {
        button.blur(); // Force blur on mouseup
        document.removeEventListener('mouseup', clearButtonState);
      }, { once: true });
    });

    // Set initial tracking state
    buttonClickTracking.set(btnId, false);
  });

  // Prevent click propagation on card containers
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function(e) {
      // If the click is on the card but not on a button, prevent propagation
      if (!e.target.closest('.btn') && !e.target.classList.contains('btn')) {
        e.stopPropagation();

        // Ensure any active buttons inside this card lose focus
        const buttons = card.querySelectorAll('.btn');
        buttons.forEach(btn => btn.blur());
      }
    }, true); // Use capture phase for better event control
  });

  // Add event listeners to forms to prevent container clicks from submitting
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('click', function(e) {
      // If clicked directly on the form or container (not on an input or button), stop propagation
      if (e.target === form || e.target.classList.contains('card-body')) {
        e.stopPropagation();
        e.preventDefault();

        // Ensure no buttons remain in active/focused state
        const buttons = form.querySelectorAll('.btn');
        buttons.forEach(btn => btn.blur());
      }
    }, true); // Use capture phase for better event control
  });

  // Add ripple style
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    .btn {
      position: relative;
      overflow: hidden;
    }
    .ripple {
      position: absolute;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
      width: 100px;
      height: 100px;
      margin-left: -50px;
      margin-top: -50px;
    }
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(rippleStyle);
}

/**
 * Enhances form interactions
 */
function enhanceForms() {
  // Add focus effects to inputs
  document.querySelectorAll('input, textarea, select').forEach(input => {
    input.addEventListener('focus', () => {
      input.classList.add('input-focused');
    });
    
    input.addEventListener('blur', () => {
      input.classList.remove('input-focused');
    });
    
    // Add typing effect for text inputs
    if (input.type === 'text' || input.tagName === 'TEXTAREA') {
      input.addEventListener('input', () => {
        input.classList.add('gothic-typing');
        setTimeout(() => {
          input.classList.remove('gothic-typing');
        }, 500);
      });
    }
  });
  
  // Add styles for focus and typing effects
  const formStyles = document.createElement('style');
  formStyles.textContent = `
    .input-focused {
      box-shadow: 0 0 15px rgba(255, 0, 132, 0.4) !important;
    }
    .gothic-typing {
      background-color: rgba(255, 0, 132, 0.15) !important;
    }
  `;
  document.head.appendChild(formStyles);
  
  // Enhance checkboxes with custom styling
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.style.accentColor = '#ff0084';
  });
}

/**
 * Initialize drawing canvas with advanced features
 */
function initDrawingCanvas() {
  const canvas = document.getElementById('drawing-canvas');
  if (!canvas) return;

  console.log('Canvas found, initializing...');

  const ctx = canvas.getContext('2d');
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;

  // Set canvas dimensions
  function resizeCanvas() {
    const container = canvas.parentElement;
    canvas.width = container.offsetWidth;
    canvas.height = 400;

    // Fill with dark background
    ctx.fillStyle = '#333333';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add subtle pattern
    drawPattern();
  }

  // Draw subtle skull pattern on background
  function drawPattern() {
    ctx.save();
    ctx.globalAlpha = 0.05;
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ctx.fillStyle = '#ff0084';
      ctx.font = '20px Arial';
      ctx.fillText('☠', x, y);
    }
    ctx.restore();
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Drawing functions with advanced brush
  function startDrawing(e) {
    isDrawing = true;
    const coords = getCoordinates(e);
    lastX = coords[0];
    lastY = coords[1];

    // Draw a dot when just clicking
    ctx.beginPath();
    ctx.arc(lastX, lastY, ctx.lineWidth / 2, 0, Math.PI * 2);
    ctx.fillStyle = window.currentColor;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
  }

  function draw(e) {
    if (!isDrawing) return;

    const coords = getCoordinates(e);
    const x = coords[0];
    const y = coords[1];

    // Set line properties
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = window.currentColor;

    // Draw line
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    // Optional: Add slight glow effect for certain colors
    if (['#ff0084', '#ff00ff', '#9900cc'].includes(window.currentColor)) {
      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.shadowColor = window.currentColor;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fillStyle = window.currentColor;
      ctx.fill();
      ctx.restore();
    }

    lastX = x;
    lastY = y;
  }

  // Get coordinates whether mouse or touch event
  function getCoordinates(e) {
    const rect = canvas.getBoundingClientRect();

    if (e.type.includes('touch')) {
      return [
        e.touches[0].clientX - rect.left,
        e.touches[0].clientY - rect.top
      ];
    } else {
      return [
        e.clientX - rect.left,
        e.clientY - rect.top
      ];
    }
  }

  function stopDrawing() {
    isDrawing = false;
    ctx.beginPath(); // Reset path
  }

  // Event listeners for mouse
  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseout', stopDrawing);

  // Event listeners for touch
  canvas.addEventListener('touchstart', function(e) {
    e.preventDefault();
    startDrawing(e);
  });

  canvas.addEventListener('touchmove', function(e) {
    e.preventDefault();
    draw(e);
  });

  canvas.addEventListener('touchend', function(e) {
    e.preventDefault();
    stopDrawing();
  });

  // Color picker functionality
  document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', function() {
      // Remove selected class from all options
      document.querySelectorAll('.color-option').forEach(opt => {
        opt.classList.remove('selected');
      });

      // Add selected class to clicked option
      this.classList.add('selected');

      // Update current color
      window.currentColor = this.getAttribute('data-color');
      console.log('Color selected:', window.currentColor);
    });
  });

  // Clear canvas button
  const clearButton = document.getElementById('clear-canvas');
  if (clearButton) {
    clearButton.addEventListener('click', function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      resizeCanvas();
    });
  }

  // Save canvas button
  const saveButton = document.getElementById('save-canvas');
  if (saveButton) {
    saveButton.addEventListener('click', function() {
      const dataURL = canvas.toDataURL('image/png');
      const filename = `artwork_${Date.now()}.png`;

      // Create a form to submit the image
      const formData = new FormData();

      // Convert dataURL to blob
      fetch(dataURL)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], filename, { type: 'image/png' });
          formData.append('artwork', file);

          // Upload to server
          return fetch('/upload_artwork', {
            method: 'POST',
            body: formData
          });
        })
        .then(response => {
          if (response.ok) {
            alert('Artwork saved successfully!');
            // Reload the page to show the new artwork
            location.reload();
          } else {
            alert('Failed to save artwork.');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('An error occurred while saving the artwork.');
        });
    });
  }

  // Initialize artwork selection/deletion
  initArtworkHandlers();
}

/**
 * Initializes toast notification system
 */
function initToastSystem() {
  // Create container for toast messages
  const toastContainer = document.createElement('div');
  toastContainer.id = 'toast-container';
  toastContainer.style.position = 'fixed';
  toastContainer.style.bottom = '20px';
  toastContainer.style.right = '20px';
  toastContainer.style.zIndex = '9999';
  document.body.appendChild(toastContainer);
  
  // Define toast function in global scope
  window.showToast = function(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.innerHTML = message;
    
    // Style the toast
    toast.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    toast.style.color = '#fff';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '5px';
    toast.style.marginTop = '10px';
    toast.style.borderLeft = '4px solid #ff0084';
    toast.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    toast.style.transform = 'translateX(100%)';
    toast.style.opacity = '0';
    toast.style.transition = 'all 0.3s ease';
    
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
      toast.style.opacity = '1';
    }, 10);
    
    // Remove toast after duration
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)';
      toast.style.opacity = '0';
      setTimeout(() => {
        toastContainer.removeChild(toast);
      }, 300);
    }, duration);
  };
  
  // Add toast for form submissions
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', () => {
      const formAction = form.getAttribute('action');
      
      if (formAction) {
        if (formAction.includes('download')) {
          showToast('Downloading song from Spotify...', 'info');
        } else if (formAction.includes('playlist')) {
          showToast('Creating your playlist...', 'info');
        } else if (formAction.includes('artwork')) {
          showToast('Saving your artwork...', 'info');
        } else if (formAction.includes('generate')) {
          showToast('Generating your CD cover...', 'info');
        }
      }
    });
  });
}

/**
 * Initializes handlers for artwork selection and deletion
 */
function initArtworkHandlers() {
  // Delete artwork functionality
  document.querySelectorAll('.delete-artwork-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent triggering artwork selection
      const filename = this.getAttribute('data-filename');
      if (confirm('Are you sure you want to delete this artwork?')) {
        // Send delete request
        fetch('/delete_artwork', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 'filename=' + encodeURIComponent(filename)
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // Remove the item from the DOM
            this.closest('.col-4').remove();
            alert('Artwork deleted successfully!');
          } else {
            alert('Failed to delete artwork: ' + data.message);
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('An error occurred while deleting the artwork.');
        });
      }
    });
  });

  // Artwork selection for CD cover
  document.querySelectorAll('.artwork-item').forEach(item => {
    item.addEventListener('click', function() {
      // If already selected, deselect it
      if (this.classList.contains('selected')) {
        this.classList.remove('selected');
        window.selectedArtwork = null;

        // Clear the dropdown selection if it exists
        const artworkSelect = document.querySelector('select[name="artwork_id"]');
        if (artworkSelect) {
          artworkSelect.value = '';
        }
      } else {
        // Deselect any previously selected artwork
        document.querySelectorAll('.artwork-item').forEach(artItem => {
          artItem.classList.remove('selected');
        });

        // Select this artwork
        this.classList.add('selected');
        window.selectedArtwork = this.getAttribute('data-filename');

        // Update dropdown selection if it exists
        const artworkSelect = document.querySelector('select[name="artwork_id"]');
        if (artworkSelect) {
          artworkSelect.value = window.selectedArtwork;
        }

        // Update CD preview if it exists
        const cdPreview = document.getElementById('cd-preview');
        if (cdPreview) {
          cdPreview.style.backgroundImage = `url('/artwork/${window.selectedArtwork}')`;
          cdPreview.style.backgroundSize = 'cover';
          cdPreview.style.backgroundPosition = 'center';
        }
      }
    });
  });
}

/**
 * Initialize Print Size Guide button functionality
 * Shows a modal with information about CD jewel case dimensions and printing tips
 */
function initPrintSizeGuide() {
  const printInfoButton = document.getElementById('show-print-info');
  if (!printInfoButton) return;

  printInfoButton.addEventListener('click', function() {
    // Create modal content with size guide
    const modalContent = `
      <div class="print-modal">
        <h3>CD Jewel Case Printing Guide</h3>
        <div class="size-diagram">
          <div class="diagram-container">
            <div class="diagram-front">Front Cover<br>120mm x 118mm</div>
            <div class="diagram-spine">Spine<br>6mm</div>
            <div class="diagram-back">Back Cover<br>25mm x 118mm</div>
          </div>
        </div>
        <h4>Standard Dimensions:</h4>
        <ul>
          <li>Total insert: 151mm x 118mm</li>
          <li>Front cover: 120mm x 118mm</li>
          <li>Spine: 6mm wide</li>
          <li>Back cover: 25mm x 118mm</li>
        </ul>
        <h4>Printing Tips:</h4>
        <ul>
          <li>Use photo-quality paper (180-200gsm)</li>
          <li>Print at 100% scale (no scaling)</li>
          <li>Set printer to "high quality" or "photo" mode</li>
          <li>Enable background graphics printing</li>
          <li>After printing, carefully cut along the pink lines</li>
        </ul>
        <div class="print-controls">
          <button id="close-guide" class="btn btn-primary">Got It</button>
        </div>
      </div>
    `;

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'print-modal-overlay';
    modal.innerHTML = modalContent;
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    modal.style.zIndex = '9999';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';

    // Style the modal content
    const style = document.createElement('style');
    style.textContent = `
      .print-modal {
        background-color: var(--dark-gray);
        color: var(--white);
        padding: 20px;
        border-radius: 10px;
        border: 2px solid var(--hot-pink);
        max-width: 600px;
        box-shadow: 0 0 30px rgba(255, 0, 132, 0.6);
      }
      .print-modal h3 {
        color: var(--hot-pink);
        text-align: center;
        margin-bottom: 15px;
        font-family: 'New Rocker', cursive;
      }
      .print-modal h4 {
        color: var(--hot-pink);
        margin: 15px 0 5px 0;
      }
      .print-modal ul {
        margin-bottom: 20px;
      }
      .print-modal li {
        margin-bottom: 8px;
      }
      .print-controls {
        display: flex;
        justify-content: center;
        margin-top: 20px;
      }
      .size-diagram {
        margin: 20px 0;
      }
      .diagram-container {
        display: flex;
        width: 100%;
        height: 118px;
        margin: 10px 0;
        text-align: center;
      }
      .diagram-front {
        width: 120px;
        height: 118px;
        background-color: rgba(255, 0, 132, 0.1);
        border: 2px solid var(--hot-pink);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      .diagram-spine {
        width: 6px;
        height: 118px;
        background-color: rgba(255, 0, 132, 0.2);
        border-top: 2px solid var(--hot-pink);
        border-bottom: 2px solid var(--hot-pink);
        writing-mode: vertical-rl;
        text-orientation: mixed;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
      }
      .diagram-back {
        width: 25px;
        height: 118px;
        background-color: rgba(255, 0, 132, 0.1);
        border: 2px solid var(--hot-pink);
        border-left: none;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-size: 10px;
        padding: 5px;
      }
    `;
    document.head.appendChild(style);

    // Add modal to the document
    document.body.appendChild(modal);

    // Handle close button click
    document.getElementById('close-guide').addEventListener('click', function() {
      document.body.removeChild(modal);
    });
  });
}

/**
 * Initialize CD template printing functionality
 * This ensures the jewel case insert prints at the correct dimensions (151mm x 118mm)
 */
function initPrintFunctionality() {
  // Add event listeners to all print buttons
  document.querySelectorAll('.print-template').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();

      const filename = this.getAttribute('data-filename');
      const templateUrl = `/download_template/${filename}`;

      // Create a print-specific iframe to control print dimensions
      const printFrame = document.createElement('iframe');
      printFrame.style.position = 'fixed';
      printFrame.style.top = '-1000px';
      printFrame.style.left = '-1000px';
      printFrame.style.width = '151mm';  // Exact CD jewel case insert width
      printFrame.style.height = '118mm'; // Exact CD jewel case insert height
      printFrame.style.border = 'none';

      // Set iframe attributes for printing
      printFrame.setAttribute('src', templateUrl);
      printFrame.setAttribute('id', 'print-frame');

      // Add the iframe to the document
      document.body.appendChild(printFrame);

      // Show a modal with printing instructions
      const modalContent = `
        <div class="print-modal">
          <h3>CD Jewel Case Insert Printing</h3>
          <p>Please ensure the following print settings:</p>
          <ul>
            <li>Paper size: Letter or A4</li>
            <li>Scale: 100% (No scaling)</li>
            <li>Margins: None or Minimum</li>
            <li>Print background colors and images: Yes</li>
          </ul>
          <p>After printing, cut along the pink lines to create your jewel case insert.</p>
          <p><strong>Dimensions:</strong> 151mm x 118mm (standard CD jewel case)</p>
          <div class="print-controls">
            <button id="print-now" class="btn btn-primary">Print Now</button>
            <button id="cancel-print" class="btn btn-danger">Cancel</button>
          </div>
        </div>
      `;

      const modal = document.createElement('div');
      modal.className = 'print-modal-overlay';
      modal.innerHTML = modalContent;
      modal.style.position = 'fixed';
      modal.style.top = '0';
      modal.style.left = '0';
      modal.style.width = '100%';
      modal.style.height = '100%';
      modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      modal.style.zIndex = '9999';
      modal.style.display = 'flex';
      modal.style.alignItems = 'center';
      modal.style.justifyContent = 'center';

      // Style the modal content
      const style = document.createElement('style');
      style.textContent = `
        .print-modal {
          background-color: var(--dark-gray);
          color: var(--white);
          padding: 20px;
          border-radius: 10px;
          border: 2px solid var(--hot-pink);
          max-width: 500px;
          box-shadow: 0 0 30px rgba(255, 0, 132, 0.6);
        }
        .print-modal h3 {
          color: var(--hot-pink);
          text-align: center;
          margin-bottom: 15px;
          font-family: 'New Rocker', cursive;
        }
        .print-modal ul {
          margin-bottom: 20px;
        }
        .print-modal li {
          margin-bottom: 8px;
        }
        .print-controls {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }
      `;
      document.head.appendChild(style);

      // Add modal to the document
      document.body.appendChild(modal);

      // Handle print button click
      document.getElementById('print-now').addEventListener('click', function() {
        // Wait for iframe to load then print
        printFrame.onload = function() {
          try {
            printFrame.contentWindow.print();

            // Clean up after a delay to allow print dialog to appear
            setTimeout(() => {
              document.body.removeChild(modal);
              document.body.removeChild(printFrame);
            }, 1000);
          } catch (e) {
            console.error('Printing failed:', e);
            alert('Printing failed. Please try downloading the PDF instead.');
            document.body.removeChild(modal);
            document.body.removeChild(printFrame);
          }
        };

        // If iframe is already loaded, print it
        if (printFrame.contentDocument &&
            printFrame.contentDocument.readyState === 'complete') {
          printFrame.contentWindow.print();

          // Clean up after a delay
          setTimeout(() => {
            document.body.removeChild(modal);
            document.body.removeChild(printFrame);
          }, 1000);
        }
      });

      // Handle cancel button click
      document.getElementById('cancel-print').addEventListener('click', function() {
        document.body.removeChild(modal);
        document.body.removeChild(printFrame);
      });
    });
  });
}

/**
 * Initializes audio visualizer for music playback
 */
function initAudioVisualizer() {
  // Check if audio element exists
  const audioElement = document.querySelector('audio');
  if (!audioElement) return;

  // Create visualizer container
  const visualizerContainer = document.createElement('div');
  visualizerContainer.className = 'audio-visualizer';
  visualizerContainer.style.height = '50px';
  visualizerContainer.style.display = 'flex';
  visualizerContainer.style.alignItems = 'center';
  visualizerContainer.style.justifyContent = 'center';
  visualizerContainer.style.marginTop = '10px';

  // Create visualizer bars
  for (let i = 0; i < 20; i++) {
    const bar = document.createElement('div');
    bar.className = 'visualizer-bar';
    bar.style.width = '3px';
    bar.style.height = '3px';
    bar.style.margin = '0 2px';
    bar.style.backgroundColor = '#ff0084';
    bar.style.borderRadius = '1px';
    bar.style.transition = 'height 0.2s ease';
    visualizerContainer.appendChild(bar);
  }

  // Insert visualizer after audio player
  audioElement.parentNode.insertBefore(visualizerContainer, audioElement.nextSibling);

  // Animate visualizer bars randomly
  function animateVisualizer() {
    const bars = visualizerContainer.querySelectorAll('.visualizer-bar');

    bars.forEach(bar => {
      const height = Math.random() * 30 + 5;
      bar.style.height = height + 'px';

      // Color based on height
      const hue = 320 + (height / 40 * 20);
      bar.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
    });

    requestAnimationFrame(() => {
      if (audioElement.paused) {
        bars.forEach(bar => {
          bar.style.height = '3px';
        });
      } else {
        setTimeout(animateVisualizer, 100);
      }
    });
  }

  // Start animation when playing
  audioElement.addEventListener('play', animateVisualizer);
}