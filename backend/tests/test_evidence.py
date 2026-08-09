from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_evidence_search_account_001():
    """Verify search for Account_001 returns 200, count >= 1, and includes EVID-MSG-001."""
    response = client.get("/evidence/search/?q=Account_001&limit=10")
    assert response.status_code == 200
    data = response.json()
    assert data["query"] == "Account_001"
    assert data["count"] > 0
    assert len(data["results"]) <= 10

    evidence_ids = [item["evidence_id"] for item in data["results"]]
    assert "EVID-MSG-001" in evidence_ids

def test_evidence_search_no_trailing_slash():
    """Verify search works for /evidence/search without trailing slash."""
    response = client.get("/evidence/search?q=Account_001&limit=10")
    assert response.status_code == 200
    data = response.json()
    assert data["count"] > 0

def test_evidence_lookup_evid_msg_001():
    """Verify GET /evidence/EVID-MSG-001 returns 200 and all required schema fields."""
    response = client.get("/evidence/EVID-MSG-001")
    assert response.status_code == 200
    data = response.json()
    assert data["evidence_id"] == "EVID-MSG-001"
    assert data["evidence_type"] == "communication"
    assert "title" in data
    assert "description" in data
    assert "content" in data
    assert "related_entities" in data
    assert "source" in data
    assert "timestamp" in data
    assert "case_id" in data
    assert "Account_001" in data["related_entities"]

def test_evidence_lookup_nonexistent():
    """Verify GET /evidence/DOES-NOT-EXIST returns 404."""
    response = client.get("/evidence/DOES-NOT-EXIST")
    assert response.status_code == 404
    data = response.json()
    assert "detail" in data

if __name__ == "__main__":
    test_evidence_search_account_001()
    test_evidence_search_no_trailing_slash()
    test_evidence_lookup_evid_msg_001()
    test_evidence_lookup_nonexistent()
    print("All evidence tests passed successfully!")
