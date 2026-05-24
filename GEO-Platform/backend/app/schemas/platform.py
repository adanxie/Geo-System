from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PlatformCreate(BaseModel):
    name: str
    code: str
    api_endpoint: Optional[str] = None
    config: dict = {}

class PlatformUpdate(BaseModel):
    name: Optional[str] = None
    code: Optional[str] = None
    api_endpoint: Optional[str] = None
    config: Optional[dict] = None
    active: Optional[bool] = None

class PlatformResponse(BaseModel):
    id: str
    name: str
    code: str
    api_endpoint: Optional[str]
    config: dict
    active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True
