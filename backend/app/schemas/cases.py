from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
import uuid

class CaseCreate(BaseModel):
    title: str = Field(..., example="Synthetic Media Hash Correlation Investigation")
    description: Optional[str] = Field(None, example="Synthetic test case for multi-agent hash correlation.")
    status: str = Field(default="draft", example="draft")
    synthetic_mode: bool = Field(default=True)

class CaseResponse(BaseModel):
    id: uuid.UUID
    case_number: str
    title: str
    description: Optional[str] = None
    status: str
    synthetic_mode: bool = True
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class AgentJobCreate(BaseModel):
    goal: str = Field(..., example="Correlate suspect pseudonyms across synthetic messages and graph DB")

class AgentJobResponse(BaseModel):
    job_id: str
    case_id: str
    goal: str
    status: str = "running"
    current_stage: str = "Observe"
    created_at: datetime
