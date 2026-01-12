from flask import Flask
# from flask_sqlalchemy import SQLAlchemy  # GH Copilot code - removed unused import
from flask_cors import CORS
import os


def create_app():
    app = Flask(__name__)

    env = os.getenv("FLASK_ENV", "development")  # default to development
    if env == "testing":
        app.config.from_object("config.testing")
    elif env == "development":
        app.config.from_object("config.development")

    # GH Copilot code - starts
    # Enable CORS for localhost
    CORS(app, origins=["http://localhost", "http://localhost:4200", "http://127.0.0.1", "http://127.0.0.1:4200"])
    # GH Copilot code - end

    from src.api.routes import user_management_bp
    app.register_blueprint(user_management_bp)

    # Attach db_session to app config for API usage
    from sqlalchemy import create_engine
    from sqlalchemy.orm import sessionmaker
    engine = create_engine(app.config["SQLALCHEMY_DATABASE_URI"], future=True)
    Session = sessionmaker(bind=engine)
    session = Session()
    app.config["DB_SESSION"] = session
    return app


if __name__ == "__main__":
    app = create_app()
    app.run(port=8081, debug=True)