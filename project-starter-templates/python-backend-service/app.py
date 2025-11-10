from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)

# Set absolute path to the SQLite database file
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "db"))
DATABASE_PATH = os.path.join(BASE_DIR, "test.sqlite3")

# SQLite database configuration
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{DATABASE_PATH}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)


@app.route("/hello", methods=["GET"])
def hello():
    return "Hello, World!", 200



if __name__ == "__main__":
    app.run(port=8081, debug=True)