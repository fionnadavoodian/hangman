# app.py
from flask import Flask
import subprocess
import sys

app = Flask(__name__)


@app.route("/run-hangman", methods=["GET"])
def run_hangman():
    try:
        # whether it's python, python3, or an absolute path to python.exe on Windows
        subprocess.Popen(
            [sys.executable, " python /Users/fionnadavoodian/Desktop/hangman/hangman_python/hangman.py"])
        return "Hangman GUI started", 200
    except Exception as e:
        return f"An error occurred: {e}", 500


if __name__ == "__main__":
    app.run(debug=True)
