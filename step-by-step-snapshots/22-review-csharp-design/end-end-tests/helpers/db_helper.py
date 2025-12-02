import os
import sqlite3
from sqlite3 import Error
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class DBHelper:
    def __init__(self):
        self.db_url = os.getenv("DB_URL")
        if not self.db_url:
            raise ValueError("DB_URL not set in environment variables.")
        self.conn = None

    def connect(self):
        """Establish a database connection, creating parent directory if needed."""
        try:
            db_path = self.db_url
            # Handle connection string like 'sqlite:///test.sqlite3'
            if db_path.startswith('sqlite:///'):
                db_path = db_path.replace('sqlite:///', '', 1)
            # If absolute path, handle Windows drive letter
            if db_path.startswith('/') and os.name == 'nt':
                db_path = db_path.lstrip('/')
            # Ensure parent directory exists
            parent_dir = os.path.dirname(db_path)
            if parent_dir and not os.path.exists(parent_dir):
                os.makedirs(parent_dir, exist_ok=True)
            self.conn = sqlite3.connect(db_path)
            return self.conn
        except Error as e:
            print(f"Error connecting to database: {e}")
            return None

    def execute_query(self, query, params=None):
        """Execute a write query (INSERT, UPDATE, DELETE)."""
        if self.conn is None:
            self.connect()
        try:
            cur = self.conn.cursor()
            if params:
                cur.execute(query, params)
            else:
                cur.execute(query)
            self.conn.commit()
            return True
        except Error as e:
            print(f"Error executing query: {e}")
            return False

    def fetch_query(self, query, params=None):
        """Execute a read query (SELECT) and return results."""
        if self.conn is None:
            self.connect()
        try:
            cur = self.conn.cursor()
            if params:
                cur.execute(query, params)
            else:
                cur.execute(query)
            return cur.fetchall()
        except Error as e:
            print(f"Error fetching query: {e}")
            return []

    def execute_query_from_file(self, file_path):
        """Execute SQL commands from a file."""
        if self.conn is None:
            self.connect()
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                sql_script = f.read()
            cur = self.conn.cursor()
            cur.executescript(sql_script)  # allows multiple statements
            self.conn.commit()
            return True
        except (Error, FileNotFoundError) as e:
            print(f"Error executing query from file: {e}")
            return False
        
    def close(self):
        """Close the database connection."""
        if self.conn:
            self.conn.close()
            self.conn = None
