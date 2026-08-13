from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict


class PostBase(BaseModel):
    title: str = Field(min_length=1, max_length=500)
    content: str = Field(min_length=1)


class PostCreate(PostBase):
    pass


class PostUpdate(PostBase):
    pass


class PostResponse(PostBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class GenerateDraftRequest(BaseModel):
    topic: str = Field(min_length=1, max_length=500)


class GenerateDraftResponse(BaseModel):
    title: str
    content: str

