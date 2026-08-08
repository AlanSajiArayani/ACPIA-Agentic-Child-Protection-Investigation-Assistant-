import os
from fastapi import APIRouter, HTTPException, status
from app.services.graph.client import check_graph_connection, get_graph_driver
from app.services.graph.service import GraphService
from app.services.graph.importer import import_synthetic_dataset

router = APIRouter(prefix="/graph", tags=["Knowledge Graph"])

@router.get("/health")
async def graph_health_check():
    """Checks live connectivity to the Neo4j Graph Database."""
    is_connected = check_graph_connection()
    if not is_connected:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail={
                "status": "error",
                "graph": "unavailable",
                "message": "Failed to connect to Neo4j Graph Database."
            }
        )
    return {
        "status": "ok",
        "graph": "neo4j"
    }

@router.get("/entities/{entity_id}")
async def get_entity(entity_id: str):
    """Retrieve node details and properties for a given entity ID."""
    driver = get_graph_driver()
    with driver.session() as session:
        entity = GraphService.get_entity_by_id(session, entity_id)
        if not entity:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Entity with ID '{entity_id}' not found in knowledge graph."
            )
        return entity

@router.get("/entities/{entity_id}/relationships")
async def get_entity_relationships(entity_id: str):
    """Retrieve all direct relationships connected to an entity ID."""
    driver = get_graph_driver()
    with driver.session() as session:
        return GraphService.get_entity_relationships(session, entity_id)

@router.get("/path/{source_id}/{target_id}")
async def get_shortest_path(source_id: str, target_id: str):
    """Retrieve the shortest correlation path between two entity IDs."""
    driver = get_graph_driver()
    with driver.session() as session:
        path = GraphService.get_shortest_path(session, source_id, target_id)
        if not path["nodes"]:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"No path found between '{source_id}' and '{target_id}'."
            )
        return path

@router.post("/import/synthetic")
async def import_synthetic_graph():
    """Idempotently import synthetic dataset entities and relationships into Neo4j."""
    candidate_paths = [
        os.path.abspath(os.path.join(os.getcwd(), "data", "synthetic")),
        os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "data", "synthetic")),
        os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "data", "synthetic")),
        os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "synthetic")),
    ]
    data_dir = None
    for path in candidate_paths:
        if os.path.exists(path):
            data_dir = path
            break

    if not data_dir:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Synthetic data directory not found at candidate paths: {candidate_paths}"
        )
    driver = get_graph_driver()
    with driver.session() as session:
        return import_synthetic_dataset(session, data_dir)
