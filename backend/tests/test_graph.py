import os
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.services.graph.client import check_graph_connection, get_graph_driver
from app.services.graph.service import GraphService
from app.services.graph.importer import import_synthetic_dataset

client = TestClient(app)

def test_graph_health_endpoint():
    """Verify GET /graph/health returns HTTP 200 or 503 depending on live container status."""
    response = client.get("/graph/health")
    assert response.status_code in (200, 503)
    data = response.json()
    if response.status_code == 200:
        assert data["status"] == "ok"
        assert data["graph"] == "neo4j"

@pytest.mark.skipif(not check_graph_connection(), reason="Requires live Neo4j database container")
def test_create_and_retrieve_entity():
    """Test creating and retrieving a test synthetic node in Neo4j."""
    driver = get_graph_driver()
    with driver.session() as session:
        # Create entity
        session.run("MERGE (p:Person {id: 'TEST_PERSON_999'}) SET p.display_name = 'Test Person'")
        
        # Retrieve via service
        entity = GraphService.get_entity_by_id(session, "TEST_PERSON_999")
        assert entity["id"] == "TEST_PERSON_999"
        assert "Person" in entity["labels"]
        assert entity["properties"]["display_name"] == "Test Person"
        
        # Clean up test node
        session.run("MATCH (p:Person {id: 'TEST_PERSON_999'}) DETACH DELETE p")

@pytest.mark.skipif(not check_graph_connection(), reason="Requires live Neo4j database container")
def test_create_and_retrieve_relationship():
    """Test creating and retrieving a relationship between synthetic nodes in Neo4j."""
    driver = get_graph_driver()
    with driver.session() as session:
        # Create test nodes & edge
        session.run("MERGE (p:Person {id: 'TEST_P1'})")
        session.run("MERGE (a:Account {id: 'TEST_A1'})")
        session.run("MATCH (p:Person {id: 'TEST_P1'}), (a:Account {id: 'TEST_A1'}) MERGE (p)-[r:OWNS]->(a)")
        
        # Retrieve relationships
        rels = GraphService.get_entity_relationships(session, "TEST_P1")
        assert len(rels) > 0
        assert rels[0]["relationship_type"] == "OWNS"
        assert rels[0]["target_id"] == "TEST_A1"
        
        # Clean up
        session.run("MATCH (n) WHERE n.id IN ['TEST_P1', 'TEST_A1'] DETACH DELETE n")

@pytest.mark.skipif(not check_graph_connection(), reason="Requires live Neo4j database container")
def test_synthetic_data_import_idempotency():
    """Test running synthetic dataset import twice to verify ZERO duplicate nodes are created."""
    data_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "data", "synthetic"))
    assert os.path.exists(data_dir), f"Synthetic dataset directory missing at {data_dir}"
    
    driver = get_graph_driver()
    with driver.session() as session:
        # Run 1st import
        res1 = import_synthetic_dataset(session, data_dir)
        assert res1["status"] == "success"
        
        # Count nodes after 1st import
        count_res1 = session.run("MATCH (n) RETURN count(n) AS total_nodes").single()["total_nodes"]
        
        # Run 2nd import (Idempotent execution test)
        res2 = import_synthetic_dataset(session, data_dir)
        assert res2["status"] == "success"
        
        # Count nodes after 2nd import
        count_res2 = session.run("MATCH (n) RETURN count(n) AS total_nodes").single()["total_nodes"]
        
        # Verify ZERO duplicate nodes created
        assert count_res1 == count_res2, f"Idempotency failed! Node count changed from {count_res1} to {count_res2}"
