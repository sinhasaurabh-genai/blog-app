import json

from fastapi import HTTPException, status
from openai import OpenAI

from config import settings
from schemas import GenerateDraftRequest, GenerateDraftResponse

def generate_draft(payload: GenerateDraftRequest) -> GenerateDraftResponse:
    if not settings.openai_api_key:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Check OpenAI API key",
        )

    client = OpenAI(api_key=settings.openai_api_key)

    try:
        response = client.chat.completions.create(
            model=settings.openai_model,
            response_format={"type": "json_object"},
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a helpful blog writing assistant. "
                        "Return JSON with exactly two keys: title (string) and content (string). "
                        "The content should be a well-structured blog post with paragraphs, "
                        "roughly 400-600 words."
                    ),
                },
                {
                    "role": "user",
                    "content": (
                        f"Write a blog post about: {payload.topic}"
                    ),
                },
            ],
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"OpenAI request failed: {e}",
        ) from e

    print(f"response from LLM.....{response}")
    llmResponseContent = response.choices[0].message.content

    if not llmResponseContent:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="OpenAI returned an empty response",
        )

    try:
        data = json.loads(llmResponseContent)
        return GenerateDraftResponse(title=data["title"], content=data["content"])
    
    except (json.JSONDecodeError, KeyError) as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Invalid response from LLM",
        ) from e
