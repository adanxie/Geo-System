from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.content import Content
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class GenerateContentRequest(BaseModel):
    topic: str
    keywords: list[str] = []
    content_type: str = 'article'
    tone: str = 'professional'
    length: Optional[int] = 1000

class KeywordSuggestionRequest(BaseModel):
    topic: str
    platform: Optional[str] = None

@router.post("/generate")
def generate_content(
    request: GenerateContentRequest,
    current_user: User = Depends(get_current_user)
):
    optimized_content = f"""
    # {request.topic}
    
    ## 介绍
    
    这是关于{request.topic}的优化内容，包含了关键词：{', '.join(request.keywords)}。
    
    ## 详细内容
    
    GEO优化后的内容将在这里展示。AI生成的内容将符合目标平台的搜索优化规则。
    
    ## 总结
    
    {request.topic}是一个重要的主题，我们将持续优化以获得更好的AI搜索排名。
    """
    
    suggestions = [
        "建议增加更多相关关键词",
        "优化标题以提高可读性",
        "添加更多数据和案例支持"
    ]
    
    return {
        "content": optimized_content,
        "suggestions": suggestions,
        "estimated_score": 85
    }

@router.post("/optimize/{content_id}")
def optimize_content(
    content_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    content = db.query(Content).filter(
        Content.id == content_id,
        Content.user_id == current_user.id
    ).first()
    
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    
    optimized = f"[GEO优化版本]\n{content.content}"
    suggestions = [
        "优化了关键词密度",
        "改进了内容结构",
        "增强了AI可读性"
    ]
    
    return {
        "original_content": content.content,
        "optimized_content": optimized,
        "suggestions": suggestions,
        "score_improvement": 15
    }

@router.post("/suggest-keywords")
def suggest_keywords(
    request: KeywordSuggestionRequest,
    current_user: User = Depends(get_current_user)
):
    keywords = [
        f"{request.topic} 指南",
        f"{request.topic} 最佳实践",
        f"{request.topic} 教程",
        f"{request.topic} 入门",
        f"{request.topic} 技巧"
    ]
    
    return {
        "keywords": keywords,
        "platform": request.platform,
        "estimated_volume": [
            {"keyword": k, "estimated_search_volume": 1000 - i * 100} 
            for i, k in enumerate(keywords)
        ]
    }

@router.post("/analyze")
def analyze_content_api(
    content_data: dict,
    current_user: User = Depends(get_current_user)
):
    content = content_data.get('content', '')
    
    analysis = {
        "readability_score": 75,
        "keyword_density": 2.5,
        "content_length": len(content),
        "structure_score": 80,
        "geo_friendly_score": 70,
        "suggestions": [
            "建议增加段落分隔",
            "优化关键词分布",
            "添加更多副标题"
        ],
        "overall_score": 75
    }
    
    return analysis
