from flask import Flask, render_template, request, redirect, url_for, flash, send_from_directory
import os
import subprocess
import uuid
import shutil
import time
from werkzeug.utils import secure_filename
import json
from fpdf import FPDF

app = Flask(__name__)
app.secret_key = os.urandom(24)

# Configuration
DOWNLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'downloads')
TEMP_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'temp')
PLAYLIST_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'playlists')
ARTWORK_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'artwork')
TEMPLATE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'temp/templates')
VENV_PYTHON = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'venv/bin/python')

# Ensure directories exist
for folder in [DOWNLOAD_FOLDER, TEMP_FOLDER, PLAYLIST_FOLDER, ARTWORK_FOLDER, TEMPLATE_DIR]:
    os.makedirs(folder, exist_ok=True)

@app.route('/')
def index():
    # Get downloaded music files
    downloaded_files = [f for f in os.listdir(DOWNLOAD_FOLDER) if f.endswith('.mp3')]

    # Get playlists
    playlists = [f for f in os.listdir(PLAYLIST_FOLDER) if f.endswith('.json')]

    playlist_data = []
    for playlist in playlists:
        with open(os.path.join(PLAYLIST_FOLDER, playlist), 'r') as f:
            try:
                data = json.load(f)
                playlist_data.append({
                    'name': data.get('name', 'Unknown'),
                    'filename': playlist,
                    'song_count': len(data.get('songs', []))
                })
            except json.JSONDecodeError:
                continue

    # Get available artworks
    artworks = []
    for f in os.listdir(ARTWORK_FOLDER):
        if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
            # Make sure file exists and is readable
            if os.path.isfile(os.path.join(ARTWORK_FOLDER, f)):
                artworks.append(f)

    # Get saved CD templates
    template_files = [f for f in os.listdir(TEMPLATE_DIR) if f.endswith('.pdf')]

    cd_templates = []
    for template in template_files:
        info_file = os.path.join(TEMPLATE_DIR, f"{os.path.splitext(template)[0]}.json")
        if os.path.exists(info_file):
            try:
                with open(info_file, 'r') as f:
                    data = json.load(f)
                cd_templates.append({
                    'name': data.get('name', 'Unknown'),
                    'filename': template,
                    'created_at': data.get('created_at', 0)
                })
            except json.JSONDecodeError:
                cd_templates.append({
                    'name': 'Unknown',
                    'filename': template,
                    'created_at': 0
                })

    # Sort templates by creation time (newest first)
    cd_templates.sort(key=lambda x: x['created_at'], reverse=True)

    # Debug output
    print(f"Found {len(artworks)} artwork files: {artworks}")

    return render_template('index.html',
                          downloads=downloaded_files,
                          playlists=playlist_data,
                          artworks=artworks,
                          cd_templates=cd_templates)

@app.route('/download', methods=['POST'])
def download_song():
    song_url = request.form.get('song_url')
    if not song_url:
        flash('Please enter a Spotify URL or song name', 'error')
        return redirect(url_for('index'))
    
    # Create a unique temp directory for this download
    temp_dir = os.path.join(TEMP_FOLDER, str(uuid.uuid4()))
    os.makedirs(temp_dir, exist_ok=True)
    
    try:
        # Use spotdl to download the song
        cmd = [VENV_PYTHON, '-m', 'spotdl', 'download', song_url, '--output', temp_dir]
        process = subprocess.run(cmd, capture_output=True, text=True)
        
        if process.returncode != 0:
            flash(f'Error downloading song: {process.stderr}', 'error')
            return redirect(url_for('index'))
        
        # Move downloaded files to the download folder
        downloaded_files = [f for f in os.listdir(temp_dir) if f.endswith('.mp3')]
        
        if not downloaded_files:
            flash('No songs were downloaded', 'error')
            return redirect(url_for('index'))
        
        for file in downloaded_files:
            source = os.path.join(temp_dir, file)
            destination = os.path.join(DOWNLOAD_FOLDER, file)
            shutil.move(source, destination)
            
        flash(f'Successfully downloaded {len(downloaded_files)} songs', 'success')
        
    except Exception as e:
        flash(f'Error: {str(e)}', 'error')
    finally:
        # Clean up temp directory
        shutil.rmtree(temp_dir, ignore_errors=True)
    
    return redirect(url_for('index'))

@app.route('/create_playlist', methods=['POST'])
def create_playlist():
    playlist_name = request.form.get('playlist_name')
    selected_songs = request.form.getlist('selected_songs')
    
    if not playlist_name:
        flash('Please enter a playlist name', 'error')
        return redirect(url_for('index'))
    
    if not selected_songs:
        flash('Please select at least one song', 'error')
        return redirect(url_for('index'))
    
    # Create playlist data
    playlist_data = {
        'name': playlist_name,
        'songs': selected_songs
    }
    
    # Save playlist to file
    filename = secure_filename(f"{playlist_name}.json")
    with open(os.path.join(PLAYLIST_FOLDER, filename), 'w') as f:
        json.dump(playlist_data, f)
    
    flash(f'Playlist "{playlist_name}" created with {len(selected_songs)} songs', 'success')
    return redirect(url_for('index'))

@app.route('/playlist/<filename>')
def view_playlist(filename):
    try:
        with open(os.path.join(PLAYLIST_FOLDER, filename), 'r') as f:
            playlist_data = json.load(f)
        
        # Check if all songs in the playlist still exist
        songs = []
        for song in playlist_data.get('songs', []):
            if os.path.exists(os.path.join(DOWNLOAD_FOLDER, song)):
                songs.append(song)
        
        return render_template('playlist.html', 
                               playlist_name=playlist_data.get('name', 'Unknown'),
                               songs=songs,
                               playlist_file=filename)
    except (json.JSONDecodeError, FileNotFoundError):
        flash('Playlist not found or invalid', 'error')
        return redirect(url_for('index'))

@app.route('/delete_playlist/<filename>')
def delete_playlist(filename):
    try:
        os.remove(os.path.join(PLAYLIST_FOLDER, filename))
        flash(f'Playlist deleted', 'success')
    except FileNotFoundError:
        flash('Playlist not found', 'error')
    
    return redirect(url_for('index'))

@app.route('/delete_song/<filename>')
def delete_song(filename):
    try:
        os.remove(os.path.join(DOWNLOAD_FOLDER, filename))
        flash(f'Song deleted', 'success')
        
        # Also remove the song from all playlists
        for playlist_file in os.listdir(PLAYLIST_FOLDER):
            if playlist_file.endswith('.json'):
                try:
                    with open(os.path.join(PLAYLIST_FOLDER, playlist_file), 'r') as f:
                        playlist_data = json.load(f)
                    
                    if filename in playlist_data.get('songs', []):
                        playlist_data['songs'].remove(filename)
                        
                        with open(os.path.join(PLAYLIST_FOLDER, playlist_file), 'w') as f:
                            json.dump(playlist_data, f)
                except:
                    continue
    except FileNotFoundError:
        flash('Song not found', 'error')
    
    return redirect(url_for('index'))

@app.route('/play/<filename>')
def play_song(filename):
    return send_from_directory(DOWNLOAD_FOLDER, filename)

@app.route('/artwork/<filename>')
def get_artwork(filename):
    return send_from_directory(ARTWORK_FOLDER, filename)

@app.route('/upload_artwork', methods=['POST'])
def upload_artwork():
    if 'artwork' not in request.files:
        print("No artwork file part in request")
        return {'success': False, 'message': 'No file part'}, 400

    file = request.files['artwork']
    if file.filename == '':
        print("Empty file name received")
        return {'success': False, 'message': 'No selected file'}, 400

    if file:
        try:
            # Ensure the artwork file has content
            file_content = file.read()
            if len(file_content) == 0:
                print("Received empty file")
                return {'success': False, 'message': 'Empty file'}, 400

            # Reset file pointer after reading
            file.seek(0)

            # Save the file
            filename = secure_filename(file.filename)
            filepath = os.path.join(ARTWORK_FOLDER, filename)
            file.save(filepath)

            # Double-check the file was saved successfully
            if os.path.exists(filepath) and os.path.getsize(filepath) > 0:
                print(f"Successfully saved artwork: {filename} ({os.path.getsize(filepath)} bytes)")
                return {'success': True, 'filename': filename}
            else:
                print(f"File saved but empty or missing: {filepath}")
                return {'success': False, 'message': 'File saved but empty or missing'}, 500
        except Exception as e:
            print(f"Error saving artwork: {str(e)}")
            return {'success': False, 'message': f'Error: {str(e)}'}, 500

    return {'success': False, 'message': 'Error uploading file'}, 500

@app.route('/delete_artwork', methods=['POST'])
def delete_artwork():
    filename = request.form.get('filename')
    if not filename:
        return {'success': False, 'message': 'No filename provided'}, 400
    
    try:
        artwork_path = os.path.join(ARTWORK_FOLDER, filename)
        if os.path.exists(artwork_path):
            os.remove(artwork_path)
            return {'success': True}
        else:
            return {'success': False, 'message': 'File not found'}, 404
    except Exception as e:
        return {'success': False, 'message': str(e)}, 500

@app.route('/generate_cd', methods=['POST'])
def generate_cd():
    playlist_id = request.form.get('playlist_id')
    artwork_id = request.form.get('artwork_id')
    cd_title = request.form.get('cd_title', 'A Tragic Ending Collection')
    
    if not playlist_id:
        flash('Please select a playlist', 'error')
        return redirect(url_for('index'))
    
    try:
        # Load playlist data
        with open(os.path.join(PLAYLIST_FOLDER, playlist_id), 'r') as f:
            playlist_data = json.load(f)
        
        songs = playlist_data.get('songs', [])
        if not songs:
            flash('The selected playlist is empty', 'error')
            return redirect(url_for('index'))
        
        # Generate CD template
        template_filename = generate_cd_template(songs, artwork_id, cd_title)
        
        # Save template info
        template_info = {
            'name': cd_title,
            'playlist': playlist_id,
            'artwork': artwork_id,
            'created_at': time.time(),
            'filename': template_filename
        }
        
        template_info_path = os.path.join(TEMPLATE_DIR, f"{os.path.splitext(template_filename)[0]}.json")
        with open(template_info_path, 'w') as f:
            json.dump(template_info, f)
        
        flash('CD template generated successfully', 'success')
        return redirect(url_for('index'))
    except Exception as e:
        flash(f'Error generating CD template: {str(e)}', 'error')
        return redirect(url_for('index'))

@app.route('/download_template/<filename>')
def download_template(filename):
    return send_from_directory(TEMPLATE_DIR, filename)

@app.route('/delete_template/<filename>')
def delete_template(filename):
    try:
        template_path = os.path.join(TEMPLATE_DIR, filename)
        info_path = os.path.join(TEMPLATE_DIR, f"{os.path.splitext(filename)[0]}.json")
        
        if os.path.exists(template_path):
            os.remove(template_path)
        
        if os.path.exists(info_path):
            os.remove(info_path)
            
        flash('Template deleted successfully', 'success')
    except Exception as e:
        flash(f'Error deleting template: {str(e)}', 'error')
    
    return redirect(url_for('index'))

def generate_cd_template(playlist, artwork_file=None, title="A Tragic Ending Collection"):
    # Standard CD jewel case insert dimensions (in mm)
    # Front insert: 120mm x 120mm
    # Full insert (front, spine, back): 151mm x 118mm
    
    # Create PDF with mm as unit and exact jewel case insert size
    pdf = FPDF(unit='mm', format=(151, 118))
    pdf.add_page()
    
    # Set background color to black
    pdf.set_fill_color(0, 0, 0)
    pdf.rect(0, 0, 151, 118, 'F')
    
    # Draw dividing lines for front, spine, and back
    pdf.set_draw_color(255, 0, 132)  # Hot pink
    
    # Front cover is 120mm x 118mm, spine is 6mm, back cover is 25mm
    pdf.line(120, 0, 120, 118)  # Line between front and spine
    pdf.line(126, 0, 126, 118)  # Line between spine and back
    
    # FRONT COVER SECTION (0-120mm)
    # Add artwork if provided
    if artwork_file:
        artwork_path = os.path.join(ARTWORK_FOLDER, artwork_file)
        if os.path.exists(artwork_path):
            # Place artwork on the front cover (slightly inset to ensure it fits)
            pdf.image(artwork_path, x=5, y=5, w=110, h=108)
            
            # Add skull decorations over artwork corners
            pdf.set_text_color(255, 0, 132)  # Hot pink
            pdf.set_font("Arial", "", 12)
            pdf.text(5, 10, "☠")
            pdf.text(110, 10, "☠")
            pdf.text(5, 113, "☠")
            pdf.text(110, 113, "☠")
    else:
        # If no artwork, create a stylized front cover
        # Add title
        pdf.set_text_color(255, 0, 132)  # Hot pink
        pdf.set_font("Arial", "B", 20)
        pdf.set_xy(10, 30)
        
        # Break title into lines if needed
        words = title.split()
        current_line = ""
        y_pos = 40
        
        for word in words:
            test_line = current_line + " " + word if current_line else word
            if pdf.get_string_width(test_line) < 100:
                current_line = test_line
            else:
                pdf.set_xy(10, y_pos)
                pdf.cell(100, 10, current_line.strip(), 0, 1, "C")
                current_line = word
                y_pos += 12
        
        # Print the last line
        if current_line:
            pdf.set_xy(10, y_pos)
            pdf.cell(100, 10, current_line.strip(), 0, 1, "C")
        
        # Add decorative skulls
        for i in range(5):
            for j in range(5):
                if (i + j) % 2 == 0:  # Checkerboard pattern
                    pdf.set_text_color(255, 0, 132, 0.5)  # Semitransparent pink
                    pdf.set_xy(10 + i*25, 70 + j*10)
                    pdf.cell(10, 10, "☠", 0, 0, "C")
    
    # Add title to front cover
    pdf.set_text_color(255, 0, 132)
    pdf.set_font("Arial", "B", 14)
    pdf.set_xy(5, 5)
    pdf.cell(110, 10, title, 0, 1, "C")
    
    # SPINE SECTION (120-126mm)
    # Add spine text (rotated)
    pdf.set_fill_color(0, 0, 0)
    pdf.rect(120, 0, 6, 118, 'F')  # Black background for spine
    
    pdf.set_text_color(255, 0, 132)
    pdf.set_font("Arial", "B", 9)
    
    # Save position and rotation for spine text
    pdf.rotate(90, 123, 59)
    pdf.text(65, 120, f"☠ {title} ☠")
    pdf.rotate(0)
    
    # BACK COVER SECTION (126-151mm)
    # Add track list with gothic styling
    pdf.set_xy(128, 5)
    pdf.set_text_color(255, 0, 132)
    pdf.set_font("Arial", "B", 10)
    pdf.cell(20, 8, "☠ Track List ☠", 0, 1, "C")
    
    # Set track list background
    pdf.set_fill_color(20, 20, 20)  # Very dark gray
    pdf.rect(127, 14, 23, 100, 'F')
    
    # Add track list
    pdf.set_text_color(255, 255, 255)  # White text
    pdf.set_font("Arial", "", 6)
    
    y_pos = 16
    for i, track in enumerate(playlist, 1):
        track_name = os.path.basename(track)
        # Truncate long track names
        if len(track_name) > 25:
            track_name = track_name[:22] + "..."
            
        if i % 2 == 0:
            pdf.set_fill_color(30, 30, 30)  # Slightly lighter for alternating
            pdf.rect(127, y_pos-1, 23, 4, 'F')
            
        pdf.set_xy(128, y_pos)
        pdf.cell(21, 3, f"{i}. {track_name}", 0, 1)
        y_pos += 4
        
        # Only show first 24 tracks, then add "..." if more
        if i >= 24 and len(playlist) > 24:
            pdf.set_xy(128, y_pos)
            pdf.cell(21, 3, f"+ {len(playlist) - 24} more tracks...", 0, 1)
            break
    
    # Add decorative border around the back
    pdf.set_draw_color(255, 0, 132)  # Hot pink
    pdf.rect(126.5, 0.5, 24, 117, 'D')  # Draw border inside the edge
    
    # Add a note at the bottom of back cover
    pdf.set_font("Arial", "I", 6)
    pdf.set_text_color(255, 0, 132)
    pdf.set_xy(127, 114)
    pdf.cell(22, 3, "Created with A Tragic Ending", 0, 1, "C")
    
    # Save the PDF
    timestamp = int(time.time())
    pdf_filename = f"tragic_ending_{timestamp}.pdf"
    pdf_path = os.path.join(TEMPLATE_DIR, pdf_filename)
    pdf.output(pdf_path)
    
    return pdf_filename

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5050)