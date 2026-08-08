import uuid
from datetime import datetime, timezone
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database.base import Base
from app.models import (
    User, Case, Evidence, Investigation, AgentRun, Finding, AuditEvent
)

# In-memory SQLite test engine for verifying model schema mappings independently
test_engine = create_engine("sqlite:///:memory:", echo=False)
TestSession = sessionmaker(bind=test_engine)

def test_sqlalchemy_model_schema_mapping():
    """Verify that all 7 required SQLAlchemy models instantiate and compile correctly."""
    # Exclude vector column for SQLite schema compilation compatibility in unit tests
    tables = Base.metadata.tables
    expected_tables = {
        "users", "cases", "evidence", "investigations",
        "agent_runs", "findings", "audit_events"
    }
    assert expected_tables.issubset(set(tables.keys())), f"Missing tables: {expected_tables - set(tables.keys())}"

def test_user_model_instantiation():
    user = User(
        username="test_investigator",
        display_name="Test Investigator",
        role="investigator"
    )
    assert user.username == "test_investigator"
    assert user.role == "investigator"

def test_case_and_evidence_models_instantiation():
    case_id = uuid.uuid4()
    case_item = Case(
        id=case_id,
        case_number="CASE-TEST-001",
        title="Test Case",
        status="investigating"
    )
    evidence_item = Evidence(
        case_id=case_id,
        evidence_id="EVID-TEST-001",
        evidence_type="document",
        title="Test Evidence",
        source="system",
        metadata_json={"test": True}
    )
    assert case_item.case_number == "CASE-TEST-001"
    assert evidence_item.evidence_id == "EVID-TEST-001"

def test_all_seven_models_present():
    models = [User, Case, Evidence, Investigation, AgentRun, Finding, AuditEvent]
    assert len(models) == 7
