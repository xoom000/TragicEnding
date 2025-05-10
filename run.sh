#!/bin/bash

# Activate virtual environment
source venv/bin/activate

# Ensure required packages are installed
pip install -r requirements.txt

# Run the Flask application directly without ngrok
echo "
 ☠️  A Tragic Ending ☠️
------------------------------
Your site will be available at:
http://127.0.0.1:5050

You can access it directly in your browser
------------------------------
"

# Run Flask in the foreground
python app.py