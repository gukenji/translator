import os
import subprocess


def embed_subtitles_into_video(video_path: str, srt_path: str, output_path: str = None) -> str:
    """
    Embute uma legenda SRT em um vídeo usando ffmpeg.

    :param video_path: Caminho do arquivo de vídeo original.
    :param srt_path: Caminho do arquivo .srt.
    :param output_path: Caminho de saída (opcional). Se não for fornecido, gera um nome baseado no original.
    :return: Caminho do novo vídeo com legenda embutida.
    """
    if not os.path.exists(video_path):
        raise FileNotFoundError(f"Vídeo não encontrado: {video_path}")
    if not os.path.exists(srt_path):
        raise FileNotFoundError(f"Arquivo de legenda não encontrado: {srt_path}")

    if output_path is None:
        base, ext = os.path.splitext(video_path)
        output_path = f"{base}_legendado{ext}"

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
    except subprocess.CalledProcessError as e:
        raise RuntimeError(f"Erro ao embutir legenda: {e}")

    return output_path