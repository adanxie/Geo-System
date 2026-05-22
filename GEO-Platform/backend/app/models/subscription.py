from sqlalchemy import Column, String, DateTime, ForeignKey, JSON, DECIMAL, Boolean
from sqlalchemy.sql import func
from app.core.database import Base
import uuid

class Plan(Base):
    __tablename__ = "plans"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(100), nullable=False)
    description = Column(Text)
    price_monthly = Column(DECIMAL(10, 2))
    price_yearly = Column(DECIMAL(10, 2))
    features = Column(JSON, default=[])
    max_campaigns = Column(Integer)
    max_platforms = Column(Integer)
    active = Column(Boolean, default=True)

class Subscription(Base):
    __tablename__ = "subscriptions"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    plan_id = Column(String(36), ForeignKey("plans.id"), nullable=False)
    status = Column(String(50), default="active")  # active, cancelled, expired
    start_date = Column(DateTime, default=func.now())
    end_date = Column(DateTime)
    metadata = Column(JSON, default={})