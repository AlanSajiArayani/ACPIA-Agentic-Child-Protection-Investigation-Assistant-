from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["service"] == "acpia-backend"

def test_database_health_endpoint():
    response = client.get("/health/db")
    # Response code will be 200 if Postgres is running, or 503 if unavailable in local unit test environment
    assert response.status_code in (200, 503)
    data = response.json()
    if response.status_code == 200:
        assert data["status"] == "ok"
        assert data["database"] == "postgresql"
    else:
        assert "detail" in data
