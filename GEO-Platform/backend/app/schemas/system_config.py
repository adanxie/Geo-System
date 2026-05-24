from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class SystemConfigCreate(BaseModel):
    key: str
    value: str
    description: Optional[str] = None
    category: str = 'general'

class SystemConfigUpdate(BaseModel):
    value: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    is_active: Optional[bool] = None

class SystemConfigResponse(BaseModel):
    id: str
    key: str
    value: Optional[str]
    description: Optional[str]
    category: str
    is_active: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class ThemeConfig(BaseModel):
    primary_color: str = "#2563eb"
    secondary_color: str = "#3b82f6"
    accent_color: str = "#a855f7"
    background_color: str = "#ffffff"
    text_color: str = "#1f2937"
    border_color: str = "#e5e7eb"
