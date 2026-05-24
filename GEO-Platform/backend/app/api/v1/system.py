from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.system_config import SystemConfig
from app.models.user import User
from app.core.security import get_current_user
from app.schemas.system_config import (
    SystemConfigCreate, 
    SystemConfigUpdate, 
    SystemConfigResponse,
    ThemeConfig
)
import json

router = APIRouter()

@router.get("/config/{key}", response_model=SystemConfigResponse)
def get_config(
    key: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    config = db.query(SystemConfig).filter(
        SystemConfig.key == key,
        SystemConfig.is_active == True
    ).first()
    if not config:
        raise HTTPException(status_code=404, detail="Configuration not found")
    return config

@router.get("/configs", response_model=List[SystemConfigResponse])
def get_all_configs(
    category: str | None = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(SystemConfig).filter(SystemConfig.is_active == True)
    if category:
        query = query.filter(SystemConfig.category == category)
    configs = query.all()
    return configs

@router.post("/config", response_model=SystemConfigResponse)
def create_config(
    config_data: SystemConfigCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role not in ['admin', 'operation']:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    existing = db.query(SystemConfig).filter(SystemConfig.key == config_data.key).first()
    if existing:
        raise HTTPException(status_code=400, detail="Configuration key already exists")
    
    new_config = SystemConfig(
        key=config_data.key,
        value=config_data.value,
        description=config_data.description,
        category=config_data.category
    )
    db.add(new_config)
    db.commit()
    db.refresh(new_config)
    return new_config

@router.put("/config/{key}", response_model=SystemConfigResponse)
def update_config(
    key: str,
    config_data: SystemConfigUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role not in ['admin', 'operation']:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    config = db.query(SystemConfig).filter(SystemConfig.key == key).first()
    if not config:
        raise HTTPException(status_code=404, detail="Configuration not found")
    
    update_data = config_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(config, field, value)
    
    db.commit()
    db.refresh(config)
    return config

@router.get("/theme", response_model=ThemeConfig)
def get_theme_config(
    db: Session = Depends(get_db)
):
    theme_config = {
        "primary_color": "#2563eb",
        "secondary_color": "#3b82f6",
        "accent_color": "#a855f7",
        "background_color": "#ffffff",
        "text_color": "#1f2937",
        "border_color": "#e5e7eb"
    }
    
    configs = db.query(SystemConfig).filter(
        SystemConfig.key.like('theme_%'),
        SystemConfig.is_active == True
    ).all()
    
    for config in configs:
        key = config.key.replace('theme_', '')
        if key in theme_config and config.value:
            try:
                theme_config[key] = config.value
            except:
                pass
    
    return theme_config

@router.post("/theme")
def update_theme_config(
    theme_data: ThemeConfig,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role not in ['admin', 'operation']:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    theme_keys = [
        ('theme_primary_color', theme_data.primary_color),
        ('theme_secondary_color', theme_data.secondary_color),
        ('theme_accent_color', theme_data.accent_color),
        ('theme_background_color', theme_data.background_color),
        ('theme_text_color', theme_data.text_color),
        ('theme_border_color', theme_data.border_color),
    ]
    
    for key, value in theme_keys:
        config = db.query(SystemConfig).filter(SystemConfig.key == key).first()
        if config:
            config.value = value
        else:
            config = SystemConfig(
                key=key,
                value=value,
                description=f"Theme {key.replace('theme_', '')}",
                category='theme'
            )
            db.add(config)
    
    db.commit()
    return {"message": "Theme configuration updated successfully"}
