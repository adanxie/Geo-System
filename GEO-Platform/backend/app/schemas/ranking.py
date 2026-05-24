from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class RankingRecordResponse(BaseModel):
    id: str
    campaign_id: str
    content_id: Optional[str]
    platform_id: str
    keyword: str
    rank_position: Optional[int]
    metrics: dict
    recorded_at: datetime
    
    class Config:
        from_attributes = True
