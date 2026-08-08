from fastapi import APIRouter, HTTPException, status
from typing import List
from ..models.case import CaseCreate, CaseResponse, AgentJobCreate, AgentJobResponse
from ..services.case_service import CaseService
from datetime import datetime
import uuid

router = APIRouter(prefix="/cases", tags=["Cases"])

@router.get("/", response_model=List[CaseResponse])
async def list_cases():
    """List all active synthetic investigation cases."""
    return await CaseService.list_cases()

@router.post("/", response_model=CaseResponse, status_code=status.HTTP_201_CREATED)
async def create_synthetic_case(case_data: CaseCreate):
    """Create a new synthetic investigation case."""
    if not case_data.synthetic_mode:
        raise HTTPException(
            status_code=400,
            detail="ACPIA operates exclusively in synthetic data mode."
        )
    return await CaseService.create_case(case_data)

@router.post("/{case_id}/agent-jobs", response_model=AgentJobResponse)
async def submit_agent_goal(case_id: str, job_data: AgentJobCreate):
    """Submit a high-level investigation goal to trigger the autonomous agent control loop."""
    job_id = f"job-{str(uuid.uuid4())[:8]}"
    return AgentJobResponse(
        job_id=job_id,
        case_id=case_id,
        goal=job_data.goal,
        status="running",
        current_stage="Observe",
        created_at=datetime.utcnow().isoformat() + "Z"
    )
