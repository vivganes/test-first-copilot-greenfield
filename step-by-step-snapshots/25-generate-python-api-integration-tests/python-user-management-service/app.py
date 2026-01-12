from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os


def create_app():
    app = Flask(__name__)

    env = os.getenv("FLASK_ENV", "development")  # default to development
    if env == "testing":
        app.config.from_object("config.testing")
    elif env == "development":
        app.config.from_object("config.development")

    from src.api.routes import user_management_bp
    app.register_blueprint(user_management_bp, url_prefix="/api/v1/users")
    return app


if __name__ == "__main__":
    app = create_app()
    app.run(port=8081, debug=True)