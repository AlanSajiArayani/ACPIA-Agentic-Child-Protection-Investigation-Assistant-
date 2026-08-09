from fastapi import APIRouter
from typing import List, Dict, Any
from app.models.case import AuditLogItem
from datetime import datetime, timezone

router = APIRouter(prefix="/agents", tags=["Agents"])

@router.get("/jobs/{job_id}/execution-tree")
async def get_execution_tree(job_id: str):
    """Retrieve the multi-stage execution tree for a running autonomous agent job."""
    return {
        "job_id": job_id,
        "stages": [
            {"stage": "Observe", "status": "completed", "details": "Ingested synthetic case context and entity graph."},
            {"stage": "Plan", "status": "completed", "details": "Formulated 3-step investigation plan using local LLM."},
            {"stage": "Delegate", "status": "completed", "details": "Delegated media analysis to MediaAgent."},
            {"stage": "Execute Tools", "status": "in_progress", "details": "Executing tool `match_synthetic_media_hash`."},
            {"stage": "Observe Results", "status": "pending", "details": "Awaiting tool execution output."},
            {"stage": "Correlate", "status": "pending", "details": "Pending Neo4j graph correlation step."},
            {"stage": "Verify", "status": "pending", "details": "Pending hypothesis verification."},
            {"stage": "Human Review", "status": "pending", "details": "Awaiting final investigator sign-off."}
        ]
    }

@router.get("/jobs/{job_id}/audit-logs", response_model=List[AuditLogItem])
async def get_job_audit_logs(job_id: str):
    """Fetch the immutable audit log trail for an agent execution job."""
    return [
        AuditLogItem(
            id="audit-001",
            case_id="case-synth-001",
            agent_name="PlannerAgent",
            loop_stage="Plan",
            action_details={"plan_steps": ["hash_matching", "graph_traversal", "vector_similarity"]},
            timestamp=datetime.now(timezone.utc).isoformat()
        )
    ]
