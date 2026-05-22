from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.user import User
from app.models.content import Content
from app.schemas.content import ContentCreate, ContentUpdate, ContentResponse
from app.api.dependencies import get_current_user

router = APIRouter()

@router.get("/", response_model=List[ContentResponse])
def get_contents(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    contents = db.query(Content).filter(Content.user_id == current_user.id).all()
    return contents

@router.post("/", response_model=ContentResponse, status_code=status.HTTP_201_CREATED)
def create_content(
    content_in: ContentCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    new_content = Content(
        user_id=current_user.id,
        title=content_in.title,
        content=content_in.content,
        content_type=content_in.content_type,
        source_url=content_in.source_url,
        metadata=content_in.metadata
    )
    db.add(new_content)
    db.commit()
    db.refresh(new_content)
    return new_content

@router.get("/{content_id}", response_model=ContentResponse)
def get_content(
    content_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    content = db.query(Content).filter(
        Content.id == content_id,
        Content.user_id == current_user.id
    ).first()
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    return content

@router.put("/{content_id}", response_model=ContentResponse)
def update_content(
    content_id: str,
    content_in: ContentUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    content = db.query(Content).filter(
        Content.id == content_id,
        Content.user_id == current_user.id
    ).first()
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    
    if content_in.title is not None:
        content.title = content_in.title
    if content_in.content is not None:
        content.content = content_in.content
    if content_in.content_type is not None:
        content.content_type = content_in.content_type
    if content_in.source_url is not None:
        content.source_url = content_in.source_url
    if content_in.metadata is not None:
        content.metadata = content_in.metadata
    
    db.commit()
    db.refresh(content)
    return content

@router.delete("/{content_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_content(
    content_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    content = db.query(Content).filter(
        Content.id == content_id,
        Content.user_id == current_user.id
    ).first()
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    
    db.delete(content)
    db.commit()
    return None

@router.post("/{content_id}/analyze")
def analyze_content(
    content_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    content = db.query(Content).filter(
        Content.id == content_id,
        Content.user_id == current_user.id
    ).first()
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    
    analysis = {
        "content_id": content.id,
        "title": content.title,
        "analysis": {
            "length": len(content.content) if content.content else 0,
            "readability": "medium",
            "keyword_density": 2.5,
            "suggestions": [
                "建议增加更多相关关键词",
                "建议优化内容结构",
                "建议增加内容深度"
            ]
        },
        "geo_score": 75.5
    }
    
    content.geo_score = 75.5
    db.commit()
    
    return analysis

@router.post("/{content_id}/optimize")
def optimize_content(
    content_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    content = db.query(Content).filter(
        Content.id == content_id,
        Content.user_id == current_user.id
    ).first()
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    
    optimization = {
        "content_id": content.id,
        "original_content": content.content[:200] + "..." if content.content else "",
        "optimized_content": "优化后的内容示例...",
        "changes": [
            "优化了标题关键词",
            "增加了相关主题内容",
            "改善了内容结构"
        ],
        "geo_score_improvement": "+15%"
    }
    
    content.geo_score = (content.geo_score or 0) + 15
    db.commit()
    
    return optimization