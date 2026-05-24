from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.campaign import Campaign
from app.models.content import Content
from app.models.ranking_record import RankingRecord
from sqlalchemy import func
from datetime import datetime, timedelta

router = APIRouter()

@router.get("/dashboard")
def get_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role in ['admin', 'sales', 'operation', 'finance']:
        total_campaigns = db.query(Campaign).count()
        active_campaigns = db.query(Campaign).filter(Campaign.status == 'active').count()
        total_contents = db.query(Content).count()
    else:
        total_campaigns = db.query(Campaign).filter(Campaign.user_id == current_user.id).count()
        active_campaigns = db.query(Campaign).filter(
            Campaign.user_id == current_user.id,
            Campaign.status == 'active'
        ).count()
        total_contents = db.query(Content).filter(Content.user_id == current_user.id).count()
    
    thirty_days_ago = datetime.now() - timedelta(days=30)
    recent_rankings = db.query(RankingRecord).filter(
        RankingRecord.recorded_at >= thirty_days_ago
    ).count()
    
    return {
        "total_campaigns": total_campaigns,
        "active_campaigns": active_campaigns,
        "total_contents": total_contents,
        "recent_rankings": recent_rankings
    }

@router.get("/reports")
def get_reports(
    start_date: datetime | None = None,
    end_date: datetime | None = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return {
        "message": "Reports endpoint",
        "start_date": start_date,
        "end_date": end_date
    }
