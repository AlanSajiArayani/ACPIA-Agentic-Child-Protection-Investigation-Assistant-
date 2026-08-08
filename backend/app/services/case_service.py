from typing import List
from ..models.case import CaseCreate, CaseResponse
import uuid
from datetime import datetime

class CaseService:
    @staticmethod
    async def list_cases() -> List[CaseResponse]:
        return [
            CaseResponse(
                id="case-synth-001",
                title="Synthetic Media Hash Correlation Investigation",
                description="Synthetic test case for multi-agent hash correlation and graph network discovery.",
                status="active",
                synthetic_mode=True,
                created_at=datetime.utcnow().isoformat() + "Z"
            )
        ]

    @staticmethod
    async def create_case(case_data: CaseCreate) -> CaseResponse:
        new_id = f"case-synth-{str(uuid.uuid4())[:8]}"
        return CaseResponse(
            id=new_id,
            title=case_data.title,
            description=case_data.description,
            status="active",
            synthetic_mode=True,
            created_at=datetime.utcnow().isoformat() + "Z"
        )
