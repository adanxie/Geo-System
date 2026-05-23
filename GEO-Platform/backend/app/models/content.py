from sqlalchemy import Column, String, Text, JSON, DateTime, ForeignKey, DECIMAL
from sqlalchemy.sql import func
from app.core.database import Base
import uuid

class Content(Base):
    __tablename__ = "contents"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    title = Column(String(500), nullable=False)
    content = Column(Text)
    content_type = Column(String(50))  # article, webpage, pdf, etc.
    source_url = Column(String(1000))
    metadata = Column(JSON, default={})
    geo_score = Column(DECIMAL(5, 2))
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

class ContentVersion(Base):
    __tablename__ = "content_versions"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    content_id = Column(String(36), ForeignKey("contents.id"), nullable=False)
    version = Column(Integer, nullable=False)
    content = Column(Text)
    diff = Column(JSON)
    created_by = Column(String(36), ForeignKey("users.id"))
    created_at = Column(DateTime, default=func.now())