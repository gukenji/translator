import os
import subprocess


async def embed_subtitles_into_video(video_path: str, srt_path: str, output_path: str = None) -> str:

    if not os.path.exists(video_path):
        raise FileNotFoundError(f"Vídeo não encontrado: {video_path}")
    if not os.path.exists(srt_path):
        raise FileNotFoundError(f"Arquivo de legenda não encontrado: {srt_path}")

    if output_path is None:
        base, ext = os.path.splitext(video_path)
        output_path = f"{base}_subtitled{ext}"

    # Escapa caminhos com espaços
    safe_srt_path = srt_path.replace(" ", "\\ ")
    command = [
        "ffmpeg",
        "-i", video_path,
        "-vf", f"subtitles={safe_srt_path}",
        "-c:a", "copy",  # mantém o áudio original
        output_path
    ]

    try:
        subprocess.run(command, check=True)
        # os.remove(video_path)
    except subprocess.CalledProcessError as e:
        raise RuntimeError(f"Erro ao embutir legenda: {e}")

    return {"embedded_video_path": output_path}