// Simple and direct canvas drawing functionality
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('drawing-canvas');
  if (!canvas) return;
  
  console.log('Canvas found, initializing with direct script...');
  
  // Get canvas context
  const ctx = canvas.getContext('2d');
  
  // Set canvas size
  function setCanvasSize() {
    const container = canvas.parentElement;
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    
    // Fill with dark background
    ctx.fillStyle = '#333333';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  
  setCanvasSize();
  window.addEventListener('resize', setCanvasSize);
  
  // Track drawing state
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  
  // Get current color
  function getCurrentColor() {
    const selected = document.querySelector('.color-option.selected');
    return selected ? selected.getAttribute('data-color') : '#ff0084';
  }
  
  // Drawing functions
  function startDrawing(e) {
    isDrawing = true;
    const coords = getCoordinates(e);
    lastX = coords[0];
    lastY = coords[1];
    
    // Draw a dot
    ctx.beginPath();
    ctx.arc(lastX, lastY, 3, 0, Math.PI * 2);
    ctx.fillStyle = getCurrentColor();
    ctx.fill();
    
    // Debug output
    console.log(`Started drawing at ${lastX}, ${lastY} with color ${getCurrentColor()}`);
  }
  
  function draw(e) {
    if (!isDrawing) return;
    
    const coords = getCoordinates(e);
    const x = coords[0];
    const y = coords[1];
    
    // Debug output 
    console.log(`Drawing at ${x}, ${y}`);
    
    // Set line properties
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = getCurrentColor();
    
    // Draw line
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    
    lastX = x;
    lastY = y;
  }
  
  function stopDrawing() {
    isDrawing = false;
  }
  
  // Helper to get coordinates from event
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
  
  // Event listeners
  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseout', stopDrawing);
  
  // Touch events
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
  
  // Color picker
  document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', function() {
      document.querySelectorAll('.color-option').forEach(opt => {
        opt.classList.remove('selected');
      });
      this.classList.add('selected');
      console.log('Color selected:', this.getAttribute('data-color'));
    });
  });
  
  // Clear button
  const clearButton = document.getElementById('clear-canvas');
  if (clearButton) {
    clearButton.addEventListener('click', function() {
      ctx.fillStyle = '#333333';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      console.log('Canvas cleared');
    });
  }
  
  // Save button
  const saveButton = document.getElementById('save-canvas');
  if (saveButton) {
    saveButton.addEventListener('click', function() {
      console.log('Saving canvas...');
      
      try {
        const dataURL = canvas.toDataURL('image/png');
        const filename = `artwork_${Date.now()}.png`;

        console.log('Canvas size:', canvas.width, 'x', canvas.height);
        console.log('Data URL length:', dataURL.length);

        // Check if canvas has content
        if (dataURL === 'data:image/png;base64,') {
          alert('Canvas is empty. Please draw something first.');
          return;
        }

        // Create form data
        const formData = new FormData();

        // Convert dataURL to blob using newer method
        const byteString = atob(dataURL.split(',')[1]);
        const mimeType = dataURL.split(',')[0].split(':')[1].split(';')[0];
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
          uint8Array[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([arrayBuffer], {type: mimeType});
        console.log('Created blob manually:', blob.size, 'bytes');

        const file = new File([blob], filename, { type: 'image/png' });
        formData.append('artwork', file);

        // Debug - add text field to confirm form data is populated
        formData.append('debug', 'Canvas data appended');

        // Upload to server
        console.log('Sending artwork to server...');
        fetch('/upload_artwork', {
          method: 'POST',
          body: formData
        })
          .then(response => {
            if (response.ok) {
              console.log('Artwork saved successfully');
              alert('Artwork saved successfully!');
              location.reload();
            } else {
              console.error('Server responded with error');
              alert('Failed to save artwork.');
            }
          })
          .catch(error => {
            console.error('Error during save:', error);
            alert('An error occurred while saving the artwork.');
          });
      } catch (err) {
        console.error('Exception during save:', err);
        alert('Error creating artwork image.');
      }
    });
  }
});