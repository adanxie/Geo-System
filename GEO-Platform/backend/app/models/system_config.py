from sqlalchemy import Column, String, Text, DateTime, Boolean
from sqlalchemy.sql import func
from app.core.database import Base
import uuid

class SystemConfig(Base):
    __tablename__ = "system_configs"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    key = Column(String(100), unique=True, nullable=False, index=True)
    value = Column(Text)
    description = Column(String(500))
    category = Column(String(50), default='general')
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
