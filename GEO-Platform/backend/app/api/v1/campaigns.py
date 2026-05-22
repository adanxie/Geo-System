from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.user import User
from app.models.campaign import Campaign
from app.schemas.campaign import CampaignCreate, CampaignUpdate, CampaignResponse
from app.api.dependencies import get_current_user

router = APIRouter()

@router.get("/", response_model=List[CampaignResponse])
def get_campaigns(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    campaigns = db.query(Campaign).filter(Campaign.user_id == current_user.id).all()
    return campaigns

@router.post("/", response_model=CampaignResponse, status_code=status.HTTP_201_CREATED)
def create_campaign(
    campaign_in: CampaignCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    new_campaign = Campaign(
        user_id=current_user.id,
        name=campaign_in.name,
        description=campaign_in.description,
        target_keywords=campaign_in.target_keywords,
        target_platforms=campaign_in.target_platforms,
        config=campaign_in.config,
        start_date=campaign_in.start_date,
        end_date=campaign_in.end_date
    )
    db.add(new_campaign)
    db.commit()
    db.refresh(new_campaign)
    return new_campaign

@router.get("/{campaign_id}", response_model=CampaignResponse)
def get_campaign(
    campaign_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    campaign = db.query(Campaign).filter(
        Campaign.id == campaign_id,
        Campaign.user_id == current_user.id
    ).first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return campaign

@router.put("/{campaign_id}", response_model=CampaignResponse)
def update_campaign(
    campaign_id: str,
    campaign_in: CampaignUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    campaign = db.query(Campaign).filter(
        Campaign.id == campaign_id,
        Campaign.user_id == current_user.id
    ).first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    if campaign_in.name is not None:
        campaign.name = campaign_in.name
    if campaign_in.description is not None:
        campaign.description = campaign_in.description
    if campaign_in.target_keywords is not None:
        campaign.target_keywords = campaign_in.target_keywords
    if campaign_in.target_platforms is not None:
        campaign.target_platforms = campaign_in.target_platforms
    if campaign_in.status is not None:
        campaign.status = campaign_in.status
    if campaign_in.config is not None:
        campaign.config = campaign_in.config
    if campaign_in.end_date is not None:
        campaign.end_date = campaign_in.end_date
    
    db.commit()
    db.refresh(campaign)
    return campaign

@router.delete("/{campaign_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_campaign(
    campaign_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    campaign = db.query(Campaign).filter(
        Campaign.id == campaign_id,
        Campaign.user_id == current_user.id
    ).first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    db.delete(campaign)
    db.commit()
    return None

@router.post("/{campaign_id}/start")
def start_campaign(
    campaign_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    campaign = db.query(Campaign).filter(
        Campaign.id == campaign_id,
        Campaign.user_id == current_user.id
    ).first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    campaign.status = "active"
    db.commit()
    db.refresh(campaign)
    return campaign

@router.post("/{campaign_id}/pause")
def pause_campaign(
    campaign_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    campaign = db.query(Campaign).filter(
        Campaign.id == campaign_id,
        Campaign.user_id == current_user.id
    ).first()
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    campaign.status = "paused"
    db.commit()
    db.refresh(campaign)
    return campaign