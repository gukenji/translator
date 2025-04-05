from fastapi import APIRouter, File, UploadFile, Form
import os
from pydantic import BaseModel
from app.enums import DeviceType, ModelType, InputLanguage, OutputFormat, Method
from fastapi.responses import FileResponse
from app.services import embed_subtitles_into_video, generate_subtitle
from app.models import VideoDeleteRequest
router = APIRouter()


@router.post("/process")
async def process(input_language: InputLanguage = Form(...),
                  output_format: OutputFormat = Form(...),
                  model_type: ModelType = Form(...),
                  method: Method = Form(...),
                  device_type: DeviceType = Form(...),
                  file: UploadFile = File(...),
                  embed_subtitle: bool = Form(...)
                  ):
    subtitle_file = await generate_subtitle(file=file,
                                            input_language=input_language,
                                            output_format=output_format,
                                            model_type=model_type,
                                            method=method,
                                            device_type=device_type)
    
    embedded_subtitle = {}

    if embed_subtitle and subtitle_file["status"] == "success":
        embedded_subtitle = await embed_subtitles_into_video(video_path=subtitle_file["original_video_path"],
                                                             srt_path=subtitle_file["subtitle_path"])
    
    os.remove(subtitle_file["original_video_path"])

    return {**subtitle_file, **embedded_subtitle}


@router.get("/download")
def download_file(filepath: str):
    return FileResponse(filepath)


@router.post("/delete-video")
def delete_video(request: VideoDeleteRequest):
    video_path = request.video_path
    if os.path.exists(video_path):
        os.remove(video_path)
        return {"message": "Video successfully deleted"}
    return {"error": "File not found"}