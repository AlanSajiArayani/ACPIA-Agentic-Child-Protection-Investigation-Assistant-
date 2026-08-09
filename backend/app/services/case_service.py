from typing import List
import uuid
from datetime import datetime, timezone
from sqlalchemy.orm import Session
from app.models.cases import Case
from app.schemas.cases import CaseCreate, CaseResponse

class CaseService:
    @staticmethod
    def list_cases(db: Session) -> List[CaseResponse]:
        cases = db.query(Case).all()
        if not cases:
            # Return initial synthetic demonstration case if database table is empty
            synth_id = uuid.uuid4()
            now = datetime.now(timezone.utc)
            return [
                CaseResponse(
                    id=synth_id,
                    case_number="CASE-SYNTH-001",
                    title="Synthetic Media Hash Correlation Investigation",
                    description="Synthetic test case for multi-agent hash correlation and graph network discovery.",
                    status="investigating",
                    synthetic_mode=True,
                    created_at=now,
                    updated_at=now
                )
            ]
        return [CaseResponse.model_validate(c) for c in cases]

    @staticmethod
    def create_case(db: Session, case_data: CaseCreate) -> CaseResponse:
        now = datetime.now(timezone.utc)
        case_num = f"CASE-SYNTH-{str(uuid.uuid4())[:8].upper()}"
        db_case = Case(
            case_number=case_num,
            title=case_data.title,
            description=case_data.description,
            status=case_data.status,
            created_at=now,
            updated_at=now
        )
        db.add(db_case)
        db.commit()
        db.refresh(db_case)
        return CaseResponse.model_validate(db_case)
