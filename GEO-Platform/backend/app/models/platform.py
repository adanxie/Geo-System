from sqlalchemy import Column, String, JSON, Boolean
from app.core.database import Base
import uuid

class Platform(Base):
    __tablename__ = "platforms"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(100), nullable=False)
    code = Column(String(50), unique=True, nullable=False)  # chatgpt, gemini, claude
    api_endpoint = Column(String(500))
    config = Column(JSON, default={})
    active = Column(Boolean, default=True)