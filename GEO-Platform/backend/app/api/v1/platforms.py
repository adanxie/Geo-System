from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.platform import Platform
from app.core.security import get_current_user
from app.models.user import User
from app.schemas.platform import PlatformCreate, PlatformUpdate, PlatformResponse

router = APIRouter()

@router.get("/", response_model=List[PlatformResponse])
def get_platforms(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    platforms = db.query(Platform).filter(Platform.active == True).all()
    return platforms

@router.get("/{platform_id}", response_model=PlatformResponse)
def get_platform(
    platform_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    platform = db.query(Platform).filter(
        Platform.id == platform_id,
        Platform.active == True
    ).first()
    if not platform:
        raise HTTPException(status_code=404, detail="Platform not found")
    return platform

@router.post("/", response_model=PlatformResponse)
def create_platform(
    platform_data: PlatformCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role not in ['admin', 'operation']:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    existing = db.query(Platform).filter(Platform.code == platform_data.code).first()
    if existing:
        raise HTTPException(status_code=400, detail="Platform code already exists")
    
    new_platform = Platform(
        name=platform_data.name,
        code=platform_data.code,
        api_endpoint=platform_data.api_endpoint,
        config=platform_data.config
    )
    db.add(new_platform)
    db.commit()
    db.refresh(new_platform)
    return new_platform

@router.put("/{platform_id}", response_model=PlatformResponse)
def update_platform(
    platform_id: str,
    platform_data: PlatformUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role not in ['admin', 'operation']:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    platform = db.query(Platform).filter(Platform.id == platform_id).first()
    if not platform:
        raise HTTPException(status_code=404, detail="Platform not found")
    
    update_data = platform_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(platform, key, value)
    
    db.commit()
    db.refresh(platform)
    return platform

