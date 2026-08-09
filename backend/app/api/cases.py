from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from datetime import datetime, timezone
import uuid
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.schemas.cases import CaseCreate, CaseResponse, AgentJobCreate, AgentJobResponse
from app.services.case_service import CaseService

router = APIRouter(prefix="/cases", tags=["Cases"])

@router.get("", response_model=List[CaseResponse])
@router.get("/", response_model=List[CaseResponse])
async def list_cases(db: Session = Depends(get_db)):
    """List all synthetic investigation cases."""
    return CaseService.list_cases(db)

@router.post("", response_model=CaseResponse, status_code=status.HTTP_201_CREATED)
@router.post("/", response_model=CaseResponse, status_code=status.HTTP_201_CREATED)
async def create_synthetic_case(case_data: CaseCreate, db: Session = Depends(get_db)):
    """Create a new synthetic investigation case."""
    if not case_data.synthetic_mode:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="ACPIA operates exclusively in synthetic data mode."
        )
    return CaseService.create_case(db, case_data)

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
        created_at=datetime.now(timezone.utc)
    )
