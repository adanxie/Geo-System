from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.ranking_record import RankingRecord
from app.models.campaign import Campaign
from app.core.security import get_current_user
from app.models.user import User
from app.schemas.ranking import RankingRecordResponse

router = APIRouter()

@router.get("/", response_model=List[RankingRecordResponse])
def get_ranking_records(
    campaign_id: str | None = None,
    platform_id: str | None = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(RankingRecord)
    
    if campaign_id:
        campaign = db.query(Campaign).filter(
            Campaign.id == campaign_id,
            Campaign.user_id == current_user.id
        ).first()
        if not campaign:
            raise HTTPException(status_code=404, detail="Campaign not found")
        query = query.filter(RankingRecord.campaign_id == campaign_id)
    
    if platform_id:
        query = query.filter(RankingRecord.platform_id == platform_id)
    
    records = query.order_by(RankingRecord.recorded_at.desc()).all()
    return records

@router.post("/refresh")
def refresh_rankings(
    campaign_id: str | None = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return {
        "message": "Rank refresh initiated",
        "status": "pending"
    }

