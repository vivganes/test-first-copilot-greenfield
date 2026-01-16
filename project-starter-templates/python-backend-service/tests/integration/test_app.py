from app import app

def test_hello_endpoint():
    with app.test_client() as client:
        response = client.get("/hello")
        assert response.status_code == 200
        assert response.data.decode() == "Hello, World!"
