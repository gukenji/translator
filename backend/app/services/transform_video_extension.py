import os
import subprocess


async def transform_video_extension(video_path: str, srt_path: str, output_path: str | None = None) -> dict[str, str]:

    if not os.path.exists(video_path):
        raise FileNotFoundError(f"Video not found: {video_path}")
    if not os.path.exists(srt_path):
        raise FileNotFoundError(f"Subtitle file not found: {srt_path}")

    if output_path is None:
        base, ext = os.path.splitext(video_path)
        output_path = f"{base}_subtitled{ext}"

    safe_srt_path = srt_path.replace(" ", "\\ ")
    command = [
        "ffmpeg",
        "-i", video_path,
        "-vf", f"subtitles={safe_srt_path}",
        "-c:a", "copy",  
        output_path
    ]
    filename = os.path.basename(output_path)
    public_path = f"/result_files/{filename}"
    try:
        subprocess.run(command, check=True)
    except subprocess.CalledProcessError as e:
        raise RuntimeError(f"Error while embedding subtitle file: {e}")

    return {"embedded_video_path": output_path,
            "public_path": public_path}