from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
import uuid

class CaseCreate(BaseModel):
    title: str = Field(..., example="Synthetic Media Hash Correlation Investigation")
    description: Optional[str] = Field(None, example="Synthetic case for testing multi-agent correlation.")
    synthetic_mode: bool = Field(True, description="Strict synthetic data flag.")

class CaseResponse(BaseModel):
    id: str
    title: str
    description: Optional[str] = None
    status: str
    synthetic_mode: bool
    created_at: str

class AgentJobCreate(BaseModel):
    case_id: str
    goal: str = Field(..., example="Analyze synthetic media hashes and correlate account entities.")

class AgentJobResponse(BaseModel):
    job_id: str
    case_id: str
    goal: str
    status: str
    current_stage: str # Observe, Plan, Delegate, Execute, Correlate, Verify, HumanReview
    created_at: str

class AuditLogItem(BaseModel):
    id: str
    case_id: str
    agent_name: str
    loop_stage: str
    action_details: Dict[str, Any]
    timestamp: str
