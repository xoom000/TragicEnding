/**
 * Simplified download button fix
 */
document.addEventListener('DOMContentLoaded', function() {
  const downloadForm = document.getElementById('download-form');
  const downloadButton = document.getElementById('download-button');

  if (downloadForm && downloadButton) {
    // Prevent form submission via Enter key if input is empty
    downloadForm.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !downloadForm.querySelector('input[name="song_url"]').value.trim()) {
        e.preventDefault();
      }
    });

    // Handle form submission
    downloadForm.addEventListener('submit', function(e) {
      // Don't prevent default - let the form submit normally
      
      // Disable button immediately
      downloadButton.disabled = true;
      downloadButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
      
      // Force blur after a short delay
      setTimeout(() => {
        downloadButton.blur();
      }, 100);
    });

    // Prevent mousedown state from sticking
    downloadButton.addEventListener('mousedown', function(e) {
      // Use mouseup on window to ensure it always fires
      const handleMouseUp = function() {
        downloadButton.blur();
        window.removeEventListener('mouseup', handleMouseUp);
      };
      window.addEventListener('mouseup', handleMouseUp);
    });

    // Touch events for mobile
    downloadButton.addEventListener('touchstart', function(e) {
      const handleTouchEnd = function() {
        downloadButton.blur();
        window.removeEventListener('touchend', handleTouchEnd);
      };
      window.addEventListener('touchend', handleTouchEnd);
    });
  }
});