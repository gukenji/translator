from fastapi import APIRouter, File, UploadFile
from app.services.whisper_service import transcribe_audio

router = APIRouter()

@router.post("/process")
async def process_audio(file: UploadFile = File(...)):
    result = await transcribe_audio(file)
    return result