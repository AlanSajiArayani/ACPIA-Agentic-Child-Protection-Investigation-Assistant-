import json
import os
from typing import Dict, Any
from neo4j import Session
from app.services.graph import queries

def import_synthetic_dataset(session: Session, data_dir: str) -> Dict[str, Any]:
    """
    Reads synthetic dataset from data_dir and idempotently MERGES nodes & relationships into Neo4j.
    Returns counts of imported nodes and relationships.
    """
    nodes_imported = 0
    relationships_imported = 0

    # 1. Import People & Devices
    people_path = os.path.join(data_dir, "people.json")
    if os.path.exists(people_path):
        with open(people_path, "r", encoding="utf-8") as f:
            people_list = json.load(f)
            for person in people_list:
                session.run(
                    queries.MERGE_PERSON_NODE,
                    id=person["person_id"],
                    display_name=person["display_name"]
                )
                nodes_imported += 1

                # Associated Devices
                for dev_id in person.get("associated_device_ids", []):
                    session.run(queries.MERGE_DEVICE_NODE, id=dev_id, device_type="Mobile/Laptop")
                    session.run(queries.MERGE_RELATION_PERSON_USES_DEVICE, person_id=person["person_id"], device_id=dev_id)
                    nodes_imported += 1
                    relationships_imported += 1

    # 2. Import Accounts & Link to People
    accounts_path = os.path.join(data_dir, "accounts.json")
    if os.path.exists(accounts_path):
        with open(accounts_path, "r", encoding="utf-8") as f:
            accounts_list = json.load(f)
            for acc in accounts_list:
                session.run(
                    queries.MERGE_ACCOUNT_NODE,
                    id=acc["account_id"],
                    platform=acc["platform_name"],
                    handle=acc.get("handle", "")
                )
                nodes_imported += 1

                if "owner_person_id" in acc:
                    session.run(
                        queries.MERGE_RELATION_PERSON_OWNS_ACCOUNT,
                        person_id=acc["owner_person_id"],
                        account_id=acc["account_id"]
                    )
                    relationships_imported += 1

    # 3. Import Locations
    locations_path = os.path.join(data_dir, "locations.json")
    if os.path.exists(locations_path):
        with open(locations_path, "r", encoding="utf-8") as f:
            locations_list = json.load(f)
            for loc in locations_list:
                session.run(
                    queries.MERGE_LOCATION_NODE,
                    id=loc["location_id"],
                    name=loc["fictional_name"],
                    latitude=loc.get("latitude", 0.0),
                    longitude=loc.get("longitude", 0.0)
                )
                nodes_imported += 1

    # 4. Import Messages (Evidence & Communication)
    messages_path = os.path.join(data_dir, "messages.json")
    if os.path.exists(messages_path):
        with open(messages_path, "r", encoding="utf-8") as f:
            messages_list = json.load(f)
            for msg in messages_list:
                ev_id = msg["evidence_id"]
                session.run(
                    queries.MERGE_EVIDENCE_NODE,
                    id=ev_id,
                    evidence_type="communication",
                    title=f"Synthetic Communication {ev_id}"
                )
                nodes_imported += 1

                # Account Communication
                session.run(
                    queries.MERGE_RELATION_ACCOUNT_COMMUNICATED,
                    sender_id=msg["sender"],
                    recipient_id=msg["recipient"],
                    evidence_id=ev_id,
                    timestamp=msg.get("timestamp", "")
                )
                relationships_imported += 1

                # References to Entities & Locations
                for ref_ent in msg.get("referenced_entities", []):
                    session.run(queries.MERGE_RELATION_EVIDENCE_REFERENCES_ENTITY, evidence_id=ev_id, entity_id=ref_ent)
                    relationships_imported += 1

                for ref_loc in msg.get("referenced_location_ids", []):
                    session.run(queries.MERGE_RELATION_EVIDENCE_REFERENCES_ENTITY, evidence_id=ev_id, entity_id=ref_loc)
                    relationships_imported += 1

    # 5. Import Events
    events_path = os.path.join(data_dir, "events.json")
    if os.path.exists(events_path):
        with open(events_path, "r", encoding="utf-8") as f:
            events_list = json.load(f)
            for evt in events_list:
                evt_id = evt["event_id"]
                session.run(
                    queries.MERGE_EVENT_NODE,
                    id=evt_id,
                    timestamp=evt["timestamp"],
                    description=evt["description"]
                )
                nodes_imported += 1

                if "location_id" in evt:
                    session.run(queries.MERGE_RELATION_EVENT_OCCURRED_AT, event_id=evt_id, location_id=evt["location_id"])
                    relationships_imported += 1

                for entity_id in evt.get("involved_entities", []):
                    if entity_id.startswith("Person_"):
                        session.run(queries.MERGE_RELATION_PERSON_INVOLVED_IN_EVENT, person_id=entity_id, event_id=evt_id)
                        relationships_imported += 1

                for src_ev in evt.get("source_evidence_ids", []):
                    session.run(queries.MERGE_RELATION_EVIDENCE_SUPPORTS_EVENT, evidence_id=src_ev, event_id=evt_id)
                    relationships_imported += 1

    # 6. Import Documents
    docs_dir = os.path.join(data_dir, "documents")
    if os.path.exists(docs_dir):
        for doc_file in os.listdir(docs_dir):
            if doc_file.endswith(".json"):
                with open(os.path.join(docs_dir, doc_file), "r", encoding="utf-8") as f:
                    doc = json.load(f)
                    ev_id = doc["evidence_id"]
                    session.run(
                        queries.MERGE_EVIDENCE_NODE,
                        id=ev_id,
                        evidence_type="document",
                        title=doc["title"]
                    )
                    nodes_imported += 1

                    for ref_ent in doc.get("referenced_entities", []):
                        session.run(queries.MERGE_RELATION_EVIDENCE_REFERENCES_ENTITY, evidence_id=ev_id, entity_id=ref_ent)
                        relationships_imported += 1

                    for ref_evt in doc.get("referenced_event_ids", []):
                        session.run(queries.MERGE_RELATION_EVIDENCE_SUPPORTS_EVENT, evidence_id=ev_id, event_id=ref_evt)
                        relationships_imported += 1

    return {
        "status": "success",
        "nodes_processed": nodes_imported,
        "relationships_processed": relationships_imported
    }
