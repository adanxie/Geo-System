from fastapi import APIRouter
from .auth import router as auth_router
from .users import router as users_router
from .campaigns import router as campaigns_router
from .contents import router as contents_router
from .platforms import router as platforms_router
from .rankings import router as rankings_router
from .analytics import router as analytics_router
from .ai import router as ai_router

router = APIRouter()

router.include_router(auth_router, prefix="/auth", tags=["auth"])
router.include_router(users_router, prefix="/users", tags=["users"])
router.include_router(campaigns_router, prefix="/campaigns", tags=["campaigns"])
router.include_router(contents_router, prefix="/contents", tags=["contents"])
router.include_router(platforms_router, prefix="/platforms", tags=["platforms"])
router.include_router(rankings_router, prefix="/rankings", tags=["rankings"])
router.include_router(analytics_router, prefix="/analytics", tags=["analytics"])
router.include_router(ai_router, prefix="/ai", tags=["ai"])
