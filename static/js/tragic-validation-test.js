/**
 * Test cases for the Tragic Validation system
 */
document.addEventListener('DOMContentLoaded', function() {
  // Only run tests if we're in development mode
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('Running validation tests...');
    
    // Wait for the validation system to initialize
    setTimeout(() => {
      testValidation();
    }, 500);
  }
});

function testValidation() {
  // Test case for required fields
  console.log('Testing required field validation...');
  const songUrlInput = document.querySelector('input[name="song_url"]');
  if (songUrlInput) {
    // Test empty field
    songUrlInput.value = '';
    const event = new Event('blur');
    songUrlInput.dispatchEvent(event);
    
    // Log the result
    setTimeout(() => {
      const errorMessage = songUrlInput.parentElement.querySelector('.validation-warning');
      console.log('Required field test result:', errorMessage ? 'PASSED ✓' : 'FAILED ✗');
      
      // Test valid input clears error
      songUrlInput.value = 'test song';
      songUrlInput.dispatchEvent(new Event('input'));
      songUrlInput.dispatchEvent(new Event('blur'));
      
      setTimeout(() => {
        const errorAfterInput = songUrlInput.parentElement.querySelector('.validation-warning');
        console.log('Error clearing test result:', !errorAfterInput ? 'PASSED ✓' : 'FAILED ✗');
      }, 100);
    }, 100);
  }
  
  // Test case for playlist name field
  console.log('Testing playlist field validation...');
  const playlistNameInput = document.querySelector('input[name="playlist_name"]');
  if (playlistNameInput) {
    // Test empty field
    playlistNameInput.value = '';
    const event = new Event('blur');
    playlistNameInput.dispatchEvent(event);
    
    // Log the result
    setTimeout(() => {
      const errorMessage = playlistNameInput.closest('.input-group').parentElement.querySelector('.validation-warning');
      console.log('Playlist name required test result:', errorMessage ? 'PASSED ✓' : 'FAILED ✗');
      
      // Test valid input clears error
      playlistNameInput.value = 'My Emo Playlist';
      playlistNameInput.dispatchEvent(new Event('input'));
      playlistNameInput.dispatchEvent(new Event('blur'));
      
      setTimeout(() => {
        const errorAfterInput = playlistNameInput.closest('.input-group').parentElement.querySelector('.validation-warning');
        console.log('Playlist error clearing test result:', !errorAfterInput ? 'PASSED ✓' : 'FAILED ✗');
      }, 100);
    }, 100);
  }
  
  // Test case for CD Generation form
  console.log('Testing CD generation form validation...');
  const playlistSelectInput = document.querySelector('select[name="playlist_id"]');
  if (playlistSelectInput) {
    // Test empty selection
    playlistSelectInput.value = '';
    const event = new Event('blur');
    playlistSelectInput.dispatchEvent(event);
    
    // Log the result
    setTimeout(() => {
      const errorMessage = playlistSelectInput.parentElement.querySelector('.validation-warning');
      console.log('CD playlist selection required test result:', errorMessage ? 'PASSED ✓' : 'FAILED ✗');
      
      // Test valid input clears error (if we have at least one playlist available)
      const firstOption = playlistSelectInput.querySelector('option:not([value=""])');
      if (firstOption) {
        playlistSelectInput.value = firstOption.value;
        playlistSelectInput.dispatchEvent(new Event('input'));
        playlistSelectInput.dispatchEvent(new Event('blur'));
        
        setTimeout(() => {
          const errorAfterInput = playlistSelectInput.parentElement.querySelector('.validation-warning');
          console.log('CD selection error clearing test result:', !errorAfterInput ? 'PASSED ✓' : 'FAILED ✗');
        }, 100);
      }
    }, 100);
  }
}