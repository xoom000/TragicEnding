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

  // Remove all existing event listeners by cloning
  const newButton = downloadButton.cloneNode(true);
  downloadButton.parentNode.replaceChild(newButton, downloadButton);
  
  const newForm = downloadForm.cloneNode(true);
  downloadForm.parentNode.replaceChild(newForm, downloadForm);
  
  // Get the new references
  const form = document.getElementById('download-form');
  const button = document.getElementById('download-button');
  const input = form.querySelector('input[name="song_url"]');
  
  // Disable all Bootstrap button behavior
  button.setAttribute('data-bs-toggle', '');
  button.classList.remove('btn');
  button.classList.add('btn', 'btn-primary', 'custom-button');
  
  // State management
  let isSubmitting = false;
  
  // Completely custom click handler
  button.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    
    if (isSubmitting) {
      console.log('Already submitting, ignoring click');
      return false;
    }
    
    // Validate input
    if (!input.value.trim()) {
      // Trigger validation
      const event = new Event('submit', { cancelable: true });
      form.dispatchEvent(event);
      return false;
    }
    
    // Submit the form
    isSubmitting = true;
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
    button.blur();
    
    // Remove all classes that might cause issues
    button.classList.remove('active', 'focus', 'clicked');
    
    // Submit the form programmatically
    setTimeout(() => {
      form.submit();
    }, 10);
  });
  
  // Prevent any other clicks from triggering this button
  document.addEventListener('click', function(e) {
    if (e.target !== button && !button.contains(e.target)) {
      button.blur();
      button.classList.remove('active', 'focus', 'clicked');
    }
  }, true);
  
  // Prevent form from being submitted any other way
  form.addEventListener('submit', function(e) {
    if (!isSubmitting) {
      e.preventDefault();
      button.click();
    }
  });
  
  // Prevent enter key from submitting when focused on button
  button.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      button.click();
    }
  });
  
  // Force remove focus from button periodically
  setInterval(() => {
    if (document.activeElement === button && !isSubmitting) {
      button.blur();
    }
  }, 100);
});