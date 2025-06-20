import whisper
import os
import uuid
from fastapi import UploadFile
from app.enums import DeviceType, ModelType, InputLanguage, OutputSubtitleFormat, Method


async def generate_subtitle(file: UploadFile,
                            input_language: InputLanguage,
                            output_format: OutputSubtitleFormat,
                            model_type: ModelType,
                            method: Method,
                            device_type: DeviceType
                            ):
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    RESULT_DIR = os.path.join(BASE_DIR, "result_files")
    os.makedirs(RESULT_DIR, exist_ok=True)

    original_video_path = os.path.join(RESULT_DIR, f"{uuid.uuid4()}_{file.filename}")

    with open(original_video_path, "wb") as f:
        f.write(await file.read())

    model = whisper.load_model(model_type, device=device_type)

    result = model.transcribe(
        original_video_path,
        task=method,
        language=input_language,
        verbose=False
    )

    output_path = original_video_path + f".{output_format}"

    if output_format == OutputSubtitleFormat.srt:
        with open(output_path, "w") as f:
            for i, segment in enumerate(result["segments"], start=1):
                start = format_timestamp(segment["start"])
                end = format_timestamp(segment["end"])
                text = segment["text"].strip()
                f.write(f"{i}\n{start} --> {end}\n{text}\n\n")

    elif output_format == OutputSubtitleFormat.vtt:
        with open(output_path, "w") as f:
            f.write("WEBVTT\n\n")
            for segment in result["segments"]:
                start = format_timestamp(segment["start"]).replace(",", ".")
                end = format_timestamp(segment["end"]).replace(",", ".")
                text = segment["text"].strip()
                f.write(f"{start} --> {end}\n{text}\n\n")

    elif output_format == OutputSubtitleFormat.txt:
        with open(output_path, "w") as f:
            f.write(result["text"])

    elif output_format == OutputSubtitleFormat.tsv:
        with open(output_path, "w") as f:
            for segment in result["segments"]:
                f.write(f"{segment['start']}\t{segment['end']}\t{segment['text'].strip()}\n")

    elif output_format == OutputSubtitleFormat.json:
        import json
        with open(output_path, "w") as f:
            json.dump(result, f, ensure_ascii=False, indent=2)

    else:
        raise ValueError("Unsupported output format")

    # os.remove(original_video_path)

    return {
        "subtitle_path": output_path,
        "status": "success",
        "original_video_path": original_video_path
    }


def format_timestamp(seconds: float) -> str:
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    millis = int((seconds - int(seconds)) * 1000)
    return f"{hours:02}:{minutes:02}:{secs:02},{millis:03}"