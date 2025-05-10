/**
 * Tragic Ending Form Validation System
 * 
 * Provides emotionally expressive validation messages that match
 * the gothic/emo aesthetic of the application.
 */

class TragicValidation {
  constructor() {
    this.initializeValidation();
    this.validationStyles = {
      warningClass: 'validation-warning',
      inputErrorClass: 'input-error',
      errorColor: '#ff0084', // Hot pink
      errorBorderColor: '#ff0084',
      errorBackground: 'rgba(255, 0, 132, 0.1)',
      fadeOutClass: 'fade-out'
    };

    // Default configuration
    this.config = {
      autoFadeMessages: true,    // Auto-fade messages after a delay
      fadeDelay: 5000,           // Time in ms before messages fade (5 seconds)
      fadeOutDuration: 400,      // Fade out animation duration in ms
      persistOnHover: true       // Keep message visible when hovered
    };

    // Message timers storage
    this.messageTimers = new Map();

    // Inject CSS for validation styling
    this.injectStyles();
  }

  // Add custom validation styles to the document
  // Styles are now in tragic-validation.css
  injectStyles() {
    // Note: We've moved this to a separate CSS file for better organization
    // and to follow proper separation of concerns
    console.log('Tragic validation initialized with external CSS');
  }

  // Initialize validation by adding novalidate to all forms and attaching event listeners
  initializeValidation() {
    // Disable native browser validation on all forms
    document.querySelectorAll('form').forEach(form => {
      form.setAttribute('novalidate', '');
      form.addEventListener('submit', this.validateForm.bind(this));
    });

    // Add input event listeners to show validation errors in real-time
    document.querySelectorAll('form input, form select, form textarea').forEach(input => {
      input.addEventListener('blur', event => {
        this.validateInput(event.target);
      });

      input.addEventListener('input', event => {
        // If the input has an error and the user starts typing, remove the error
        if (event.target.classList.contains(this.validationStyles.inputErrorClass)) {
          this.clearValidationError(event.target);
        }
      });
    });
  }

  // Full form validation on submit
  validateForm(event) {
    const form = event.target;
    let isValid = true;

    console.log(`Validating form: ${form.action}`);

    // Check each input in the form
    form.querySelectorAll('input, select, textarea').forEach(input => {
      console.log(`Validating input: ${input.name || 'unnamed'}, type: ${input.type}, required: ${input.hasAttribute('required')}`);
      if (!this.validateInput(input)) {
        isValid = false;
        console.log(`Validation failed for: ${input.name || 'unnamed'}`);
      }
    });

    // If validation fails, prevent form submission
    if (!isValid) {
      event.preventDefault();
      event.stopPropagation();
      console.log('Form validation failed, preventing submission');

      // Focus the first invalid input
      const firstInvalid = form.querySelector(`.${this.validationStyles.inputErrorClass}`);
      if (firstInvalid) {
        firstInvalid.focus();
      }
    } else {
      console.log('Form validation passed, allowing submission');
    }
  }

  // Validate a single input
  validateInput(input) {
    // Clear any existing validation messages
    this.clearValidationError(input);
    
    // Only validate inputs that aren't disabled, hidden, or readonly
    if (input.disabled || input.readOnly || input.type === 'hidden') {
      return true;
    }

    // Check each validation rule
    if (input.hasAttribute('required') && !input.value.trim()) {
      this.showValidationError(input, this.getEmotionalMessage('required', input));
      return false;
    }

    if (input.type === 'email' && input.value && !this.isValidEmail(input.value)) {
      this.showValidationError(input, this.getEmotionalMessage('email', input));
      return false;
    }

    if (input.minLength && input.value && input.value.length < input.minLength) {
      this.showValidationError(input, this.getEmotionalMessage('minLength', input, input.minLength));
      return false;
    }

    if (input.maxLength && input.value && input.value.length > input.maxLength) {
      this.showValidationError(input, this.getEmotionalMessage('maxLength', input, input.maxLength));
      return false;
    }

    if (input.min && input.value && Number(input.value) < Number(input.min)) {
      this.showValidationError(input, this.getEmotionalMessage('min', input, input.min));
      return false;
    }

    if (input.max && input.value && Number(input.value) > Number(input.max)) {
      this.showValidationError(input, this.getEmotionalMessage('max', input, input.max));
      return false;
    }

    if (input.pattern && input.value && !new RegExp(input.pattern).test(input.value)) {
      this.showValidationError(input, this.getEmotionalMessage('pattern', input));
      return false;
    }

    return true;
  }

  // Show validation error message
  showValidationError(input, message) {
    // Add error class to input
    input.classList.add(this.validationStyles.inputErrorClass);

    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = this.validationStyles.warningClass;
    errorElement.textContent = message;

    // Insert error after the input or its parent form-group if it exists
    const parent = input.closest('.form-group') || input.closest('.mb-3') || input.parentElement;
    parent.appendChild(errorElement);

    // Add a slight shake animation to the input
    input.animate([
      { transform: 'translateX(0)' },
      { transform: 'translateX(-5px)' },
      { transform: 'translateX(5px)' },
      { transform: 'translateX(-3px)' },
      { transform: 'translateX(3px)' },
      { transform: 'translateX(0)' }
    ], {
      duration: 300,
      easing: 'ease-in-out'
    });

    // Set up auto-fade for this message if enabled
    if (this.config.autoFadeMessages) {
      this.setupMessageFading(errorElement, input);
    }
  }

  // Setup auto-fading functionality for validation messages
  setupMessageFading(messageElement, relatedInput) {
    // Generate a unique ID for this message
    const messageId = Date.now().toString() + Math.random().toString(36).substr(2, 5);

    // Store the message element for reference
    messageElement.dataset.messageId = messageId;

    // Clear any existing timer for this element
    if (this.messageTimers.has(messageId)) {
      clearTimeout(this.messageTimers.get(messageId));
    }

    // If persistOnHover is enabled, set up mouse events
    if (this.config.persistOnHover) {
      messageElement.addEventListener('mouseenter', () => {
        // Clear the fade timer when hovered
        if (this.messageTimers.has(messageId)) {
          clearTimeout(this.messageTimers.get(messageId));
          this.messageTimers.delete(messageId);
        }

        // Make sure the message is fully visible
        messageElement.classList.remove(this.validationStyles.fadeOutClass);
      });

      messageElement.addEventListener('mouseleave', () => {
        // Restart the fade timer when mouse leaves
        const timer = setTimeout(() => {
          this.fadeOutMessage(messageElement, relatedInput);
        }, this.config.fadeDelay / 2); // Use shorter delay after hover

        this.messageTimers.set(messageId, timer);
      });
    }

    // Set the main fade timer
    const timer = setTimeout(() => {
      this.fadeOutMessage(messageElement, relatedInput);
    }, this.config.fadeDelay);

    this.messageTimers.set(messageId, timer);
  }

  // Fade out and remove a validation message
  fadeOutMessage(messageElement, relatedInput) {
    // Add the fade-out class
    messageElement.classList.add(this.validationStyles.fadeOutClass);

    // Remove the element after animation completes
    setTimeout(() => {
      // Only remove if parent still exists
      if (messageElement.parentNode) {
        messageElement.parentNode.removeChild(messageElement);
      }

      // If the input is still focused, keep the error class
      if (relatedInput && document.activeElement !== relatedInput) {
        relatedInput.classList.remove(this.validationStyles.inputErrorClass);
      }
    }, this.config.fadeOutDuration);

    // Clear the timer reference
    if (messageElement.dataset.messageId) {
      this.messageTimers.delete(messageElement.dataset.messageId);
    }
  }

  // Clear validation error
  clearValidationError(input) {
    // Remove error class
    input.classList.remove(this.validationStyles.inputErrorClass);
    
    // Remove any existing error messages
    const parent = input.closest('.form-group') || input.closest('.mb-3') || input.parentElement;
    const errors = parent.querySelectorAll(`.${this.validationStyles.warningClass}`);
    errors.forEach(error => error.remove());
  }

  // Get an emotional, styled message based on validation type
  getEmotionalMessage(validationType, input, value = null) {
    const inputName = input.name || 
                     input.getAttribute('placeholder') || 
                     input.previousElementSibling?.textContent || 
                     'This field';
    
    const messages = {
      // Required field messages
      required: [
        `${inputName} remains empty, like your darkest thoughts.`,
        `Your silence speaks volumes, but ${inputName} needs words.`,
        `The void of ${inputName} echoes your emptiness.`,
        `${inputName} is an emotional void waiting to be filled.`,
        `${inputName} begs for your darkness to be shared.`
      ],
      
      // Email validation messages
      email: [
        `The spirit of ${inputName} rejects your offering.`,
        `Your email address is as broken as promises.`,
        `This email will never reach the other side.`,
        `Your email's pain is visible in its broken form.`
      ],
      
      // Min length messages
      minLength: [
        `${inputName} needs at least ${value} characters to express its pain.`,
        `Your emotions in ${inputName} are too brief to feel.`,
        `${inputName} yearns for at least ${value} characters of your darkness.`
      ],
      
      // Max length messages
      maxLength: [
        `Even darkness has limits. ${inputName} accepts only ${value} characters.`,
        `Your pain in ${inputName} overflows beyond the ${value} character limit.`,
        `${inputName} is drowning in your ${value}+ character outpouring.`
      ],
      
      // Min value messages
      min: [
        `${inputName} needs to be at least ${value} to feed your darkness.`,
        `${inputName} cries for a value of at least ${value}.`,
        `The shadows require ${inputName} to be at least ${value}.`
      ],
      
      // Max value messages
      max: [
        `${inputName} must remain below ${value}, like buried emotions.`,
        `Even your darkest thoughts can't push ${inputName} beyond ${value}.`,
        `${inputName} cannot bear the weight of a value beyond ${value}.`
      ],
      
      // Pattern messages
      pattern: [
        `${inputName} rejects your format like society rejects our pain.`,
        `${inputName} requires a different form of expression.`,
        `The pattern of ${inputName} does not match your chaotic input.`
      ]
    };
    
    // Get random message of the appropriate type
    const messageArray = messages[validationType] || messages.required;
    return messageArray[Math.floor(Math.random() * messageArray.length)];
  }

  // Email validation regex
  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

// Initialize the validation system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.tragicValidation = new TragicValidation();
});