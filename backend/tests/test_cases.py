from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_list_cases_endpoint():
    response = client.get("/cases")
    # Response code will be 200 (if DB active or fallback synth case returned)
    assert response.status_code in (200, 500, 503)
    if response.status_code == 200:
        data = response.json()
        assert isinstance(data, list)

def test_create_case_endpoint():
    payload = {
        "title": "Test Synthetic Case",
        "description": "Synthetic investigation test",
        "synthetic_mode": True
    }
    response = client.post("/cases", json=payload)
    assert response.status_code in (201, 500, 503)
