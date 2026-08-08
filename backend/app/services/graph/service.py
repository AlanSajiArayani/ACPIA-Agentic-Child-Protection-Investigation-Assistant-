from typing import Dict, Any, List
from neo4j import Session
from app.services.graph import queries

class GraphService:
    @staticmethod
    def get_entity_by_id(session: Session, entity_id: str) -> Dict[str, Any]:
        result = session.run(queries.FIND_ENTITY_BY_ID, entity_id=entity_id)
        record = result.single()
        if not record:
            return {}
        return {
            "id": record["id"],
            "labels": list(record["labels"]),
            "properties": dict(record["properties"])
        }

    @staticmethod
    def get_entity_relationships(session: Session, entity_id: str) -> List[Dict[str, Any]]:
        result = session.run(queries.FIND_ENTITY_RELATIONSHIPS, entity_id=entity_id)
        relationships = []
        for record in result:
            relationships.append({
                "source_id": record["source_id"],
                "relationship_type": record["relationship_type"],
                "relationship_properties": dict(record["relationship_properties"]),
                "target_id": record["target_id"],
                "target_labels": list(record["target_labels"]),
                "target_properties": dict(record["target_properties"])
            })
        return relationships

    @staticmethod
    def get_shortest_path(session: Session, source_id: str, target_id: str) -> Dict[str, Any]:
        result = session.run(queries.FIND_SHORTEST_PATH, source_id=source_id, target_id=target_id)
        record = result.single()
        if not record:
            return {"nodes": [], "relationships": []}
        return {
            "nodes": record["nodes"],
            "relationships": record["relationships"]
        }
