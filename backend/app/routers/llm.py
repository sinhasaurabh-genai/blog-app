from fastapi import APIRouter

from schemas import GenerateDraftRequest, GenerateDraftResponse
from graph import generate_draft

router = APIRouter(prefix="/llm", tags=["llm"])


@router.post("/generate", response_model=GenerateDraftResponse)
def generate_post_draft(payload: GenerateDraftRequest):
    return generate_draft(payload)
