from fastapi import APIRouter
from typing import List, Dict, Any

router = APIRouter(prefix="/tools", tags=["Tools"])

@router.get("/")
async def list_registered_tools():
    """List all registered, sandboxed agent execution tools."""
    return [
        {
            "name": "match_synthetic_media_hash",
            "category": "media",
            "description": "Compares target perceptual hash against synthetic media database records.",
            "parameters": {"target_hash": "string", "threshold": "int"}
        },
        {
            "name": "vector_similarity_search",
            "category": "text",
            "description": "Performs cosine similarity search across synthetic pgvector embeddings.",
            "parameters": {"query_vector": "array", "top_k": "int"}
        },
        {
            "name": "neo4j_entity_lookup",
            "category": "network",
            "description": "Queries Neo4j synthetic entity relationship graph for multi-hop linkages.",
            "parameters": {"entity_id": "string", "max_depth": "int"}
        }
    ]
