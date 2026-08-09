from fastapi import APIRouter, Query, HTTPException, status
from typing import Optional, Dict, Any
from app.services.evidence_service import search_evidence as perform_search, get_evidence_by_id as retrieve_evidence_by_id

router = APIRouter(prefix="/evidence", tags=["Evidence"])

@router.get("/search/")
@router.get("/search")
async def search_evidence(
    q: Optional[str] = Query(None, description="Search query string for evidence content, title, or ID"),
    evidence_type: Optional[str] = Query(None, description="Filter by evidence type (e.g., document, communication, event)"),
    limit: int = Query(20, ge=1, le=100, description="Maximum number of results to return")
) -> Dict[str, Any]:
    """
    Search synthetic evidence records by keyword, title, content, or related entities.
    """
    return perform_search(q=q, evidence_type=evidence_type, limit=limit)

@router.get("/{evidence_id}")
async def get_evidence_by_id(evidence_id: str) -> Dict[str, Any]:
    """
    Retrieve details for a specific evidence item by its ID.
    Returns HTTP 404 if the evidence item does not exist.
    """
    record = retrieve_evidence_by_id(evidence_id)
    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Evidence with ID '{evidence_id}' not found."
        )
    return record
