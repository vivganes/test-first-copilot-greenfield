from flask import json
from pytest import Session
from sqlalchemy import text


def test_hello_endpoint(client):
        response = client.get("api/v1/users/hello")
        assert response.status_code == 200
        assert response.json == {"message": "Hello, World!"}

def test_integration_placeholder(client, db_session):
        # API call to a non-existent endpoint
        payload = {"key": "value"}
        response = client.post(
        "/api/v1/non-existent",
        data=json.dumps(payload),
        content_type="application/json",
        )
        assert response.status_code == 404

        # We can also do a Direct DB query (like JdbcTemplate SELECT 1) to verify stuff if required
        result = db_session.execute(text("SELECT 1")).fetchone()
        assert result is not None