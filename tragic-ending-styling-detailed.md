# A Tragic Ending Station - Detailed Styling Implementation Guide

## Overview
The current Ngrok site requires a complete styling overhaul to match the gothic/emo theme defined in the comprehensive-fix.sh script. This document provides concrete code examples and implementation details.

## Critical Requirement
**The site must be called "A Tragic Ending" instead of "Dark Melody Station" throughout all code.**

## HTML Structure and Head Section

Replace the current head section with this (making sure to change "Dark Melody" to "A Tragic Ending"):

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>🖤 A Tragic Ending 🖤</title>
  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- Font Awesome for icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">
  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Creepster&family=EB+Garamond&family=New+Rocker&family=Sedgwick+Ave+Display&display=swap" rel="stylesheet">
  <!-- CSS styles will go here -->
</head>
```

## Complete CSS Styling

Add this complete CSS styling block (replace the entire style section):

```css
/* Emo Goth Teen Theme */
:root {
  --hot-pink: #ff0084;
  --dark-pink: #d6006c;
  --black: #000000;
  --dark-gray: #222222;
  --light-gray: #444444;
  --white: #ffffff;
  --purple: #660066;
  --accent: #b700ff;
}

body { 
  background-color: var(--black);
  font-family: 'EB Garamond', serif;
  color: var(--white);
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><path d="M30,10 L15,25 L30,40 L15,55 L30,70 L15,85 L30,100" stroke="%233c003c" fill="none" stroke-width="0.5" /></svg>'), url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><text x="0" y="30" font-family="Arial" font-size="10" fill="%23ff0084" opacity="0.1">&#x2620;</text></svg>');
}

.navbar { 
  background: linear-gradient(45deg, var(--black), var(--dark-gray), var(--hot-pink));
  border-bottom: 2px solid var(--hot-pink);
  box-shadow: 0 4px 10px rgba(255, 0, 132, 0.3);
}

.navbar-brand { 
  font-family: 'New Rocker', cursive;
  font-weight: bold;
  font-size: 1.8rem;
  text-shadow: 0 0 5px var(--hot-pink);
  letter-spacing: 1px;
}

.nav-link {
  font-family: 'Creepster', cursive;
  font-size: 1.3rem;
  color: var(--white) !important;
  transition: all 0.3s;
  text-shadow: 0 0 3px var(--hot-pink);
}

.nav-link:hover, .nav-link.active {
  color: var(--hot-pink) !important;
  transform: scale(1.05);
  text-shadow: 0 0 8px var(--hot-pink);
}

.card {
  background-color: var(--dark-gray);
  border: 1px solid var(--hot-pink);
  box-shadow: 0 0 15px rgba(255, 0, 132, 0.2);
  border-radius: 10px;
  margin-bottom: 20px;
}

.card-header { 
  background: linear-gradient(90deg, var(--black), var(--dark-pink));
  color: var(--white); 
  font-family: 'Sedgwick Ave Display', cursive;
  font-size: 1.4rem;
  border-bottom: 1px solid var(--hot-pink);
  padding: 0.7rem 1rem;
  display: flex;
  align-items: center;
}

.card-header::before {
  content: "☠️";
  margin-right: 10px;
}

.btn-primary { 
  background-color: var(--hot-pink); 
  border-color: var(--dark-pink); 
  font-weight: bold;
  box-shadow: 0 0 10px rgba(255, 0, 132, 0.4);
  transition: all 0.3s;
}

.btn-primary:hover { 
  background-color: var(--dark-pink);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 0, 132, 0.6);
}

.btn-danger { 
  background: linear-gradient(45deg, var(--black), var(--hot-pink)); 
  border-color: var(--hot-pink);
  font-weight: bold;
  box-shadow: 0 0 10px rgba(255, 0, 132, 0.4);
  transition: all 0.3s;
}

.btn-danger:hover { 
  background: linear-gradient(45deg, var(--hot-pink), var(--dark-pink));
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 0, 132, 0.6);
}

.btn-success {
  background: linear-gradient(45deg, #660066, #990099);
  border-color: #990099;
  transition: all 0.3s;
}

.btn-success:hover {
  background: linear-gradient(45deg, #990099, #cc00cc);
  transform: translateY(-2px);
}

.btn-outline-danger {
  color: var(--hot-pink);
  border-color: var(--hot-pink);
}

.btn-outline-danger:hover {
  background-color: var(--hot-pink);
  color: var(--white);
}

.btn-outline-light {
  color: var(--white);
  border-color: var(--hot-pink);
}

.btn-outline-light:hover {
  background-color: var(--hot-pink);
  color: var(--white);
}

.drop-zone {
  border: 3px dashed var(--hot-pink);
  border-radius: 10px;
  padding: 25px;
  text-align: center;
  transition: all 0.3s ease;
  background-color: rgba(255, 0, 132, 0.05);
  position: relative;
}

.drop-zone:hover, .drop-zone.dragover {
  background-color: rgba(255, 0, 132, 0.1);
  box-shadow: 0 0 20px rgba(255, 0, 132, 0.3) inset;
}

.drop-zone::before, .drop-zone::after {
  content: "☠️";
  position: absolute;
  opacity: 0.1;
  font-size: 2.5rem;
}

.drop-zone::before {
  top: 10px;
  left: 10px;
}

.drop-zone::after {
  bottom: 10px;
  right: 10px;
}

.drop-zone-prompt {
  font-size: 1.3rem;
  color: var(--hot-pink);
  margin-bottom: 15px;
  font-weight: bold;
  text-shadow: 0 0 5px rgba(255, 0, 132, 0.3);
}

.drop-zone-input {
  display: none;
}

.artwork-preview {
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(255, 0, 132, 0.6);
  border: 2px solid var(--hot-pink);
}

.artwork-item {
  position: relative;
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

.artwork-item::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 0, 132, 0.2), transparent 70%);
}

.artwork-item:hover {
  transform: scale(1.05) rotate(2deg);
  z-index: 1;
}

.artwork-item.selected {
  border: 2px solid var(--hot-pink);
  box-shadow: 0 0 20px rgba(255, 0, 132, 0.6);
}

.delete-artwork-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 10;
  background-color: var(--dark-pink);
  color: white;
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  font-size: 12px;
  line-height: 1;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  transition: all 0.2s;
}

.delete-artwork-btn:hover {
  opacity: 1;
  transform: scale(1.1);
  background-color: var(--hot-pink);
}

.track-list {
  max-height: 400px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--hot-pink) var(--dark-gray);
}

.track-list::-webkit-scrollbar {
  width: 8px;
}

.track-list::-webkit-scrollbar-track {
  background: var(--dark-gray);
}

.track-list::-webkit-scrollbar-thumb {
  background-color: var(--hot-pink);
  border-radius: 10px;
}

.list-group-item {
  background-color: var(--light-gray);
  color: var(--white);
  border-color: var(--black);
  transition: all 0.2s;
}

.list-group-item:hover {
  background-color: rgba(255, 0, 132, 0.2);
}

.playlist-item {
  cursor: grab;
  background-color: var(--light-gray);
  border-left: 4px solid var(--hot-pink);
}

.playlist-item:active {
  cursor: grabbing;
}

.cd-preview {
  width: 280px;
  height: 280px;
  margin: 0 auto 30px auto;
  background-color: var(--dark-gray);
  border-radius: 50%;
  box-shadow: 0 0 30px rgba(255, 0, 132, 0.5);
  position: relative;
  overflow: hidden;
  border: 1px solid var(--hot-pink);
  animation: glow 3s infinite alternate;
}

@keyframes glow {
  0% {
    box-shadow: 0 0 10px rgba(255, 0, 132, 0.4);
  }
  100% {
    box-shadow: 0 0 30px rgba(255, 0, 132, 0.7);
  }
}

.cd-center {
  position: absolute;
  width: 30%;
  height: 30%;
  border-radius: 50%;
  background: radial-gradient(circle, var(--dark-gray), var(--black));
  top: 35%;
  left: 35%;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 0, 132, 0.3);
}

.cd-center::before {
  content: "☠️";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.2rem;
  color: var(--hot-pink);
}

#canvas-container {
  position: relative;
  width: 100%;
  height: 400px;
  background-color: rgba(0, 0, 0, 0.8);
  border: 2px solid var(--hot-pink);
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0 0 15px rgba(255, 0, 132, 0.3) inset;
  z-index: 10;
}

#drawing-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: crosshair;
}

.color-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
  justify-content: center;
}

.color-option {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid var(--dark-gray);
  transition: all 0.2s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.color-option:hover {
  transform: scale(1.1);
}

.color-option.selected {
  border-color: var(--white);
  box-shadow: 0 0 10px var(--hot-pink);
}

.tab-content {
  padding: 20px 0;
}

input[type="text"], .form-control {
  background-color: var(--light-gray);
  border: 1px solid var(--hot-pink);
  color: var(--white);
  box-shadow: 0 0 5px rgba(255, 0, 132, 0.2) inset;
}

input[type="text"]:focus, .form-control:focus {
  background-color: var(--light-gray);
  border-color: var(--hot-pink);
  box-shadow: 0 0 0 0.2rem rgba(255, 0, 132, 0.25);
  color: var(--white);
}

::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.alert-info {
  background-color: rgba(0, 0, 0, 0.7);
  border-color: var(--hot-pink);
  color: var(--white);
}

.text-muted {
  color: rgba(255, 255, 255, 0.6) !important;
}

.progress {
  background-color: var(--dark-gray);
}

.progress-bar {
  background-color: var(--hot-pink);
}

/* Nav tabs styling */
.nav-tabs {
  border-bottom: 1px solid var(--hot-pink);
}

.nav-tabs .nav-link {
  color: var(--white);
  background-color: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  font-family: 'EB Garamond', serif;
  font-size: 1.1rem;
}

.nav-tabs .nav-link:hover {
  border-color: transparent transparent var(--hot-pink) transparent;
  color: var(--hot-pink);
}

.nav-tabs .nav-link.active {
  color: var(--hot-pink);
  background-color: transparent;
  border-color: transparent transparent var(--hot-pink) transparent;
  font-weight: bold;
}

/* Fun skull decorations */
.skull-decoration {
  position: fixed;
  font-size: 2rem;
  color: var(--hot-pink);
  opacity: 0.1;
  z-index: -1;
  text-shadow: 0 0 5px var(--hot-pink);
  animation: float 10s infinite ease-in-out;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.1;
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
    opacity: 0.2;
  }
}

/* Dropdown styling */
.dropdown-menu {
  background-color: var(--dark-gray);
  border: 1px solid var(--hot-pink);
  box-shadow: 0 0 15px rgba(255, 0, 132, 0.3);
}

.dropdown-item {
  color: var(--white);
}

.dropdown-item:hover, .dropdown-item:focus {
  background-color: rgba(255, 0, 132, 0.2);
  color: var(--white);
}
```

## Main Page Structure (Body)

Replace the body with this structure (changing "Dark Melody" to "A Tragic Ending"):

```html
<body>
  <!-- Decorative skulls -->
  <div class="skull-decoration" style="top: 15%; left: 5%;">☠️</div>
  <div class="skull-decoration" style="top: 35%; right: 8%; animation-delay: 2s;">☠️</div>
  <div class="skull-decoration" style="bottom: 20%; left: 12%; animation-delay: 4s;">☠️</div>
  <div class="skull-decoration" style="bottom: 40%; right: 15%; animation-delay: 6s;">☠️</div>
  
  <nav class="navbar navbar-expand-lg navbar-dark mb-4">
    <div class="container-fluid">
      <span class="navbar-brand">🖤 A Tragic Ending 🖤</span>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" id="music-tab-btn" data-bs-toggle="pill" href="#music-tab" role="tab">Music</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="artwork-tab-btn" data-bs-toggle="pill" href="#artwork-tab" role="tab">Artwork</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="burn-tab-btn" data-bs-toggle="pill" href="#burn-tab" role="tab">Burn CD</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  
  <!-- Main container structure follows... -->
```

## Canvas Drawing JavaScript (Critical)

Ensure this JavaScript is included at the bottom of the page:

```javascript
// Initialize variables
let selectedArtwork = null;
let currentColor = '#000000';

document.addEventListener('DOMContentLoaded', function() {
  // Fix for tab navigation (ensuring it works correctly)
  const navItems = document.querySelectorAll('.nav-link[data-bs-toggle="pill"]');
  navItems.forEach(navItem => {
    navItem.addEventListener('click', function() {
      const target = document.querySelector(this.getAttribute('href'));
      document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('show', 'active');
      });
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
      });
      this.classList.add('active');
      target.classList.add('show', 'active');
    });
  });
  
  // Initialize drawing canvas - COMPLETELY REWRITTEN
  const canvas = document.getElementById('drawing-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    
    // Fill with dark background on start
    function initCanvas() {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = 400;
      ctx.fillStyle = '#333333';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    initCanvas();
    window.addEventListener('resize', initCanvas);
    
    // Drawing functions
    function startDrawing(e) {
      isDrawing = true;
      draw(e); // Draw a dot when clicked
    }
    
    function draw(e) {
      if (!isDrawing) return;
      
      // Get correct coordinates based on event type
      let x, y;
      
      if (e.type === 'touchmove' || e.type === 'touchstart') {
        // Touch event
        const rect = canvas.getBoundingClientRect();
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
      } else {
        // Mouse event
        const rect = canvas.getBoundingClientRect();
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
      }
      
      // Draw
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.strokeStyle = currentColor;
      
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
    
    function stopDrawing() {
      isDrawing = false;
      ctx.beginPath(); // Start a new path next time
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
    
    // Clear canvas
    document.getElementById('clear-canvas').addEventListener('click', function() {
      ctx.fillStyle = '#333333';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
    });
    
    // Save canvas
    document.getElementById('save-canvas').addEventListener('click', function() {
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
}
```

## Back-end Changes

The template generation function in app.py must be updated to use "A Tragic Ending" instead of "Dark Melody":

```python
def generate_cd_template(playlist, artwork_file=None, title="A Tragic Ending Collection"):
    pdf = FPDF()
    pdf.add_page()
    
    # Set up the PDF with gothic styling
    pdf.set_text_color(0, 0, 0)
    pdf.set_font("Arial", "B", 24)
    pdf.cell(0, 10, title, 0, 1, "C")
    
    # Add artwork if provided
    if artwork_file:
        artwork_path = os.path.join(ARTWORK_DIR, artwork_file)
        if os.path.exists(artwork_path):
            pdf.image(artwork_path, x=10, y=30, w=90, h=90)
            
            # Add skull decorations around the artwork
            pdf.set_text_color(255, 0, 132)  # Hot pink
            pdf.set_font("Arial", "", 20)
            pdf.text(10, 30, "☠")
            pdf.text(100, 30, "☠")
            pdf.text(10, 120, "☠")
            pdf.text(100, 120, "☠")
    
    # Add CD spine text (rotated)
    pdf.rotate(90, 10, 150)
    pdf.set_text_color(255, 0, 132)
    pdf.set_font("Arial", "B", 12)
    pdf.text(70, 10, f"☠ {title} ☠")
    pdf.rotate(0)
    
    # Add track list with gothic styling
    pdf.set_xy(10, 140)
    pdf.set_text_color(255, 0, 132)
    pdf.set_font("Arial", "B", 16)
    pdf.cell(0, 10, "☠ Track List ☠", 0, 1, "C")
    
    pdf.set_text_color(0, 0, 0)
    pdf.set_font("Arial", "", 10)
    
    # Create a box for the track list
    pdf.set_fill_color(240, 240, 240)
    pdf.rect(15, 155, 180, 110, "DF")
    
    # Add tracks with alternating background
    y_pos = 160
    for i, track in enumerate(playlist, 1):
        track_name = os.path.basename(track)
        if i % 2 == 0:
            pdf.set_fill_color(220, 220, 220)
            pdf.rect(15, y_pos-2, 180, 8, "F")
        pdf.set_xy(20, y_pos)
        pdf.cell(170, 5, f"{i}. {track_name}", 0, 1)
        y_pos += 8
    
    # Add decorative skulls at the bottom
    pdf.set_text_color(255, 0, 132)
    pdf.set_xy(10, 270)
    pdf.cell(0, 10, "☠ ☠ ☠ ☠ ☠ ☠ ☠ ☠ ☠ ☠ ☠ ☠ ☠", 0, 1, "C")
    
    # Add a note
    pdf.set_font("Arial", "I", 8)
    pdf.set_text_color(100, 100, 100)
    pdf.set_xy(10, 280)
    pdf.cell(0, 5, "Created with A Tragic Ending", 0, 1, "C")
    
    # Save the PDF
    timestamp = int(time.time())
    pdf_filename = f"tragic_ending_{timestamp}.pdf"
    pdf_path = os.path.join(TEMPLATE_DIR, pdf_filename)
    pdf.output(pdf_path)
    
    return pdf_filename
```

## All File Paths and References

Change all instances of "dark_melody" to "tragic_ending" in any file paths, IDs, or variable names:

- Change all PDF filename prefixes: 
  ```python
  pdf_filename = f"tragic_ending_{timestamp}.pdf"
  ```

- Update any log files or paths:
  ```python
  LOGFILE="/tmp/tragic_ending_fix.log"
  ```

- Update any IDs or class names specific to the application name

## Additional Elements

1. The CD Preview with animations:
```html
<div class="cd-preview" id="cd-preview">
  <div class="cd-center"></div>
</div>
```

2. Color picker for drawing:
```html
<div class="color-picker">
  <div class="color-option selected" style="background-color: #000000;" data-color="#000000"></div>
  <div class="color-option" style="background-color: #ff0084;" data-color="#ff0084"></div>
  <div class="color-option" style="background-color: #ffffff;" data-color="#ffffff"></div>
  <div class="color-option" style="background-color: #9900cc;" data-color="#9900cc"></div>
  <div class="color-option" style="background-color: #ff3399;" data-color="#ff3399"></div>
  <div class="color-option" style="background-color: #cc0000;" data-color="#cc0000"></div>
  <div class="color-option" style="background-color: #00ff00;" data-color="#00ff00"></div>
  <div class="color-option" style="background-color: #0000ff;" data-color="#0000ff"></div>
  <div class="color-option" style="background-color: #ffff00;" data-color="#ffff00"></div>
  <div class="color-option" style="background-color: #ff00ff;" data-color="#ff00ff"></div>
</div>
```

## Implementation Strategy

1. Start by replacing the full HTML template from the script
2. Perform a global search and replace for "Dark Melody" to "A Tragic Ending"
3. Update all file prefixes from "dark_melody_" to "tragic_ending_"
4. Test the canvas drawing functionality
5. Test the artwork upload and delete functions
6. Verify the PDF generation uses the correct name

The comprehensive-fix.sh contains a complete, working implementation. The most efficient approach is to extract the entire solution rather than making incremental changes.
