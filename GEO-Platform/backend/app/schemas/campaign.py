from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class CampaignCreate(BaseModel):
    name: str
    description: Optional[str] = None
    target_keywords: List[str] = []
    target_platforms: List[str] = []
    config: dict = {}
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None

class CampaignUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    target_keywords: Optional[List[str]] = None
    target_platforms: Optional[List[str]] = None
    status: Optional[str] = None
    config: Optional[dict] = None
    end_date: Optional[datetime] = None

class CampaignResponse(BaseModel):
    id: str
    name: str
    description: Optional[str]
    target_keywords: List[str]
    target_platforms: List[str]
    status: str
    config: dict
    start_date: Optional[datetime]
    end_date: Optional[datetime]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True