from fastapi import APIRouter, File, UploadFile, Form
import os
from pydantic import BaseModel
from app.enums import DeviceType, ModelType, InputLanguage, OutputFormat, Method
from fastapi.responses import FileResponse
from app.services import embed_subtitles_into_video, transcribe_audio

router = APIRouter()


@router.post("/process")
async def process_audio(input_language: InputLanguage = Form(...),
                        output_format: OutputFormat = Form(...),
                        model_type: ModelType = Form(...),
                        method: Method = Form(...),
                        device_type: DeviceType = Form(...),
                        file: UploadFile = File(...)
                        ):
    result = await transcribe_audio(file=file,
                                    input_language=input_language,
                                    output_format=output_format,
                                    model_type=model_type,
                                    method=method,
                                    device_type=device_type)
    return result


@router.get("/download")
def download_file(filepath: str):
    return FileResponse(filepath)


class EmbedSubtitleVideo(BaseModel):
    srt_path: str
    video_path: str


@router.post("/subtitle-video")
async def subtitle_video(request: EmbedSubtitleVideo):
    result = await embed_subtitles_into_video(video_path=request.video_path,
                                              srt_path=request.srt_path)
    return result


class VideoDeleteRequest(BaseModel):
    video_path: str

    
@router.post("/delete-video")
def delete_video(request: VideoDeleteRequest):
    video_path = request.video_path
    if os.path.exists(video_path):
        os.remove(video_path)
        return {"message": "Video successfully deleted"}
    return {"error": "File not found"}