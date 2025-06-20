import os
import ffmpeg
from fastapi import UploadFile
import uuid
from pathlib import Path
from app.enums import OutputVideoFormat

async def transform_video_extension(file: UploadFile, output_format: OutputVideoFormat) -> dict:
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    RESULT_DIR = os.path.join(BASE_DIR, "result_files")
    os.makedirs(RESULT_DIR, exist_ok=True)

    original_filename = f"{uuid.uuid4().hex}_{file.filename}"
    original_video_path = os.path.join(RESULT_DIR, original_filename)

    with open(original_video_path, "wb") as f:
        f.write(await file.read())

    base_name, _ = os.path.splitext(original_filename)
    output_filename = f"{base_name}.{output_format.value}"
    output_path = os.path.join(RESULT_DIR, output_filename)

    ffmpeg.input(original_video_path).output(output_path).run()

    return {
        "formated_video_path": output_path,
        "public_path": f"/result_files/{output_filename}"
    }
