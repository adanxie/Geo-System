from fastapi import APIRouter
from .auth import router as auth_router
from .users import router as users_router
from .campaigns import router as campaigns_router
from .contents import router as contents_router

router = APIRouter()

router.include_router(auth_router, prefix="/auth", tags=["auth"])
router.include_router(users_router, prefix="/users", tags=["users"])
router.include_router(campaigns_router, prefix="/campaigns", tags=["campaigns"])
router.include_router(contents_router, prefix="/contents", tags=["contents"])