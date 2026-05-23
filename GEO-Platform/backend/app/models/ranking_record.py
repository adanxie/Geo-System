from sqlalchemy import Column, String, Integer, JSON, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.core.database import Base
import uuid

class RankingRecord(Base):
    __tablename__ = "ranking_records"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    campaign_id = Column(String(36), ForeignKey("campaigns.id"), nullable=False)
    content_id = Column(String(36), ForeignKey("contents.id"))
    platform_id = Column(String(36), ForeignKey("platforms.id"), nullable=False)
    keyword = Column(String(500), nullable=False)
    rank_position = Column(Integer)
    metrics = Column(JSON, default={})
    recorded_at = Column(DateTime, default=func.now())

class OptimizationLog(Base):
    __tablename__ = "optimization_logs"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    campaign_id = Column(String(36), ForeignKey("campaigns.id"), nullable=False)
    content_id = Column(String(36), ForeignKey("contents.id"))
    action_type = Column(String(100))
    before_state = Column(JSON)
    after_state = Column(JSON)
    suggestions = Column(Text)
    created_at = Column(DateTime, default=func.now())