import uuid
from datetime import datetime, timezone
from typing import Dict, Any
from sqlalchemy import String, Text, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database.base import Base

class Finding(Base):
    __tablename__ = "findings"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    investigation_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("investigations.id", ondelete="CASCADE"), nullable=False, index=True)
    finding_text: Mapped[str] = mapped_column(Text, nullable=False)
    status: Mapped[str] = mapped_column(String(50), nullable=False, default="candidate") # candidate, verifying, verified, rejected, needs_review
    confidence: Mapped[float] = mapped_column(Float, nullable=False, default=0.0) # NOTE: Confidence is not proof of truth
    supporting_evidence_ids: Mapped[Dict[str, Any]] = mapped_column(JSON, default=list, nullable=False)
    contradicting_evidence_ids: Mapped[Dict[str, Any]] = mapped_column(JSON, default=list, nullable=False)
    generated_by: Mapped[str] = mapped_column(String(100), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)

    # Relationships
    investigation: Mapped["Investigation"] = relationship("Investigation", back_populates="findings")
