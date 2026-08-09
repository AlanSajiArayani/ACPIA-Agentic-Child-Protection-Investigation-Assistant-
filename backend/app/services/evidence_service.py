import json
import os
from typing import List, Dict, Any, Optional

def find_synthetic_data_dir() -> str:
    """Locates the authoritative synthetic data directory across candidate paths."""
    candidate_paths = [
        os.path.abspath(os.path.join(os.getcwd(), "data", "synthetic")),
        os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "data", "synthetic")),
        os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "data", "synthetic")),
        os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "synthetic")),
    ]
    for path in candidate_paths:
        if os.path.exists(path):
            return path
    raise FileNotFoundError(f"Synthetic data directory not found in candidate paths: {candidate_paths}")

def load_all_synthetic_evidence() -> List[Dict[str, Any]]:
    """Loads all synthetic evidence records (messages, documents, events) into unified dictionaries."""
    data_dir = find_synthetic_data_dir()
    evidence_list: List[Dict[str, Any]] = []

    # 1. Messages (communication evidence)
    messages_path = os.path.join(data_dir, "messages.json")
    if os.path.exists(messages_path):
        with open(messages_path, "r", encoding="utf-8") as f:
            messages_data = json.load(f)
            for msg in messages_data:
                ev_id = msg.get("evidence_id")
                if not ev_id:
                    continue

                related = []
                if msg.get("sender"):
                    related.append(msg.get("sender"))
                if msg.get("recipient"):
                    related.append(msg.get("recipient"))
                for ent in msg.get("referenced_entities", []):
                    if ent not in related:
                        related.append(ent)
                for evt in msg.get("referenced_event_ids", []):
                    if evt not in related:
                        related.append(evt)
                for loc in msg.get("referenced_location_ids", []):
                    if loc not in related:
                        related.append(loc)

                record = {
                    "evidence_id": ev_id,
                    "evidence_type": "communication",
                    "title": f"Synthetic Communication {ev_id}",
                    "description": msg.get("message", ""),
                    "content": msg.get("message", ""),
                    "related_entities": related,
                    "source": f"Message Intercept ({msg.get('sender')} -> {msg.get('recipient')})",
                    "timestamp": msg.get("timestamp", ""),
                    "case_id": "CASE-001"
                }
                evidence_list.append(record)

    # 2. Documents
    docs_dir = os.path.join(data_dir, "documents")
    if os.path.exists(docs_dir):
        for fname in sorted(os.listdir(docs_dir)):
            if fname.endswith(".json"):
                fpath = os.path.join(docs_dir, fname)
                with open(fpath, "r", encoding="utf-8") as f:
                    doc = json.load(f)
                    ev_id = doc.get("evidence_id")
                    if not ev_id:
                        continue

                    related = []
                    if doc.get("author"):
                        related.append(doc.get("author"))
                    for ent in doc.get("referenced_entities", []):
                        if ent not in related:
                            related.append(ent)
                    for evt in doc.get("referenced_event_ids", []):
                        if evt not in related:
                            related.append(evt)

                    record = {
                        "evidence_id": ev_id,
                        "evidence_type": "document",
                        "title": doc.get("title", f"Synthetic Document {ev_id}"),
                        "description": doc.get("summary", ""),
                        "content": doc.get("content_body", ""),
                        "related_entities": related,
                        "source": f"Document Audit ({doc.get('author')})",
                        "timestamp": doc.get("timestamp", ""),
                        "case_id": "CASE-001",
                        "document_id": doc.get("document_id")
                    }
                    evidence_list.append(record)

    # 3. Events
    events_path = os.path.join(data_dir, "events.json")
    if os.path.exists(events_path):
        with open(events_path, "r", encoding="utf-8") as f:
            events_data = json.load(f)
            for evt in events_data:
                ev_id = evt.get("evidence_id") or evt.get("event_id")
                if not ev_id:
                    continue

                related = []
                if evt.get("event_id") and evt.get("event_id") not in related:
                    related.append(evt.get("event_id"))
                if evt.get("location_id") and evt.get("location_id") not in related:
                    related.append(evt.get("location_id"))
                for ent in evt.get("involved_entities", []):
                    if ent not in related:
                        related.append(ent)
                for src in evt.get("source_evidence_ids", []):
                    if src not in related:
                        related.append(src)

                record = {
                    "evidence_id": ev_id,
                    "evidence_type": "event",
                    "title": f"Event Record {evt.get('event_id')}",
                    "description": evt.get("description", ""),
                    "content": evt.get("description", ""),
                    "related_entities": related,
                    "source": f"Event Log ({evt.get('event_id')})",
                    "timestamp": evt.get("timestamp", ""),
                    "case_id": "CASE-001",
                    "event_id": evt.get("event_id")
                }
                evidence_list.append(record)

    return evidence_list

def search_evidence(
    q: Optional[str] = None,
    evidence_type: Optional[str] = None,
    limit: int = 20
) -> Dict[str, Any]:
    """Searches evidence records matching query keyword, type, and returns limited results."""
    records = load_all_synthetic_evidence()

    if evidence_type:
        records = [r for r in records if r.get("evidence_type", "").lower() == evidence_type.lower()]

    if q:
        q_lower = q.lower()
        matched = []
        for r in records:
            ev_id = r.get("evidence_id", "").lower()
            evt_id = r.get("event_id", "").lower() if r.get("event_id") else ""
            doc_id = r.get("document_id", "").lower() if r.get("document_id") else ""
            title = r.get("title", "").lower()
            desc = r.get("description", "").lower()
            content = r.get("content", "").lower()
            related = [str(ent).lower() for ent in r.get("related_entities", [])]

            if (
                q_lower in ev_id
                or q_lower in evt_id
                or q_lower in doc_id
                or q_lower in title
                or q_lower in desc
                or q_lower in content
                or any(q_lower in ent for ent in related)
            ):
                matched.append(r)
        records = matched

    results = records[:limit]
    return {
        "query": q,
        "count": len(results),
        "results": results
    }

def get_evidence_by_id(evidence_id: str) -> Optional[Dict[str, Any]]:
    """Retrieves an evidence record by its evidence_id, event_id, or document_id."""
    records = load_all_synthetic_evidence()
    target_lower = evidence_id.lower()
    for r in records:
        if r.get("evidence_id", "").lower() == target_lower:
            return r
        if r.get("event_id") and r.get("event_id", "").lower() == target_lower:
            return r
        if r.get("document_id") and r.get("document_id", "").lower() == target_lower:
            return r
    return None
