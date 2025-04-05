from pydantic import BaseModel


class VideoDeleteRequest(BaseModel):
    video_path: str