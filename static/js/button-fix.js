/**
 * Simple targeted fix for the download button only
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Applying targeted download button fix...');

  // Get the download button by ID
  const downloadButton = document.getElementById('download-button');
  const downloadForm = document.getElementById('download-form');

  if (downloadButton && downloadForm) {
    console.log('Found download button, applying fix...');

    // Add a flag to track if the form has been submitted
    let isSubmitting = false;

    // Simple button state management
    downloadButton.addEventListener('click', function(e) {
      // If already submitting, prevent multiple clicks
      if (isSubmitting) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Set submitting state
      isSubmitting = true;

      // Force blur to prevent stuck visual state
      setTimeout(() => {
        this.blur();
      }, 100);

      // Reset state after a delay (in case form doesn't submit)
      setTimeout(() => {
        isSubmitting = false;
      }, 1000);
    });

    // Visual feedback on form submission
    downloadForm.addEventListener('submit', function() {
      // Disable the button temporarily during submission
      downloadButton.disabled = true;

      // Re-enable it after a delay
      setTimeout(() => {
        downloadButton.disabled = false;
        downloadButton.blur();
      }, 1000);
    });
  }
});