import whisper
import os
import uuid
from fastapi import UploadFile


async def transcribe_audio(file: UploadFile):
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    RESULT_DIR = os.path.join(BASE_DIR, "result_files")
    os.makedirs(RESULT_DIR, exist_ok=True)

    temp_path = os.path.join(RESULT_DIR, f"{uuid.uuid4()}_{file.filename}")
    print("Arquivo salvo em:", temp_path)
    with open(temp_path, "wb") as f:
        f.write(await file.read())
    print("Arquivo existe?", os.path.exists(temp_path))

    model = whisper.load_model("tiny", device="cpu")
    print("Iniciando transcrição com Whisper...")

    result = model.transcribe(
        temp_path,
        task="translate",
        language="pt",
        verbose=False
    )
    print("Transcrição finalizada.")
    srt_path = temp_path + ".srt"
    with open(srt_path, "w") as srt_file:
        for i, segment in enumerate(result["segments"], start=1):
            start = format_timestamp(segment["start"])
            end = format_timestamp(segment["end"])
            text = segment["text"].strip()
            srt_file.write(f"{i}\n{start} --> {end}\n{text}\n\n")

    # 💬 Cria arquivo .txt (sem timestamps, só o texto traduzido)
    txt_path = temp_path + ".txt"
    with open(txt_path, "w") as txt_file:
        txt_file.write(result["text"])

    # 🧼 Remove o arquivo temporário original
    os.remove(temp_path)

    return {
        "text": result["text"],
        "srt_file": srt_path,
        "txt_file": txt_path
    }


def format_timestamp(seconds: float) -> str:
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    millis = int((seconds - int(seconds)) * 1000)
    return f"{hours:02}:{minutes:02}:{secs:02},{millis:03}"