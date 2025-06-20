from pydantic import BaseModel


class VideoDeleteRequest(BaseModel):
    video_path: str


class TransformVideoRequest(BaseModel):
    video_path: str
    output_type: str