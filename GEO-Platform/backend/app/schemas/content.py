from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ContentCreate(BaseModel):
    title: str
    content: Optional[str] = None
    content_type: Optional[str] = "article"
    source_url: Optional[str] = None
    metadata: dict = {}

class ContentUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    content_type: Optional[str] = None
    source_url: Optional[str] = None
    metadata: Optional[dict] = None

class ContentResponse(BaseModel):
    id: str
    title: str
    content: Optional[str]
    content_type: Optional[str]
    source_url: Optional[str]
    metadata: dict
    geo_score: Optional[float]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True