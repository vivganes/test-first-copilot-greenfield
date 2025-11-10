import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

from app import create_app

@pytest.fixture(scope="session")
def app():
    app = create_app()
    app.config.from_object("config.testing")
    return app

@pytest.fixture(scope="session")
def engine(app):
    # Now read from Flask config instead of hardcoding
    engine = create_engine(app.config["SQLALCHEMY_DATABASE_URI"], future=True)
    yield engine
    engine.dispose()

@pytest.fixture(scope="session")
def connection(engine):
    connection = engine.raw_connection()
    yield connection
    connection.rollback()
    connection.close()

@pytest.fixture(scope="session")
def db_session(engine):
    connection = engine.connect()
    Session = sessionmaker(bind=connection)
    session = Session()
    yield session
    session.close()

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture(autouse=True)
def setup_database(connection, db_session):
    BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../..", "db"))
    with open(os.path.join(BASE_DIR, "cleanup.sql")) as f:
        connection.executescript(f.read())
    with open(os.path.join(BASE_DIR, "tables.sql")) as f:
        connection.executescript(f.read())
    db_session.commit()
    yield db_session
