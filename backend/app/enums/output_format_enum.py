from enum import Enum


class OutputSubtitleFormat(str, Enum):
    txt = "txt"
    vtt = "vtt"
    srt = "srt"
    tsv = "tsv"
    json = "json"


class OutputVideoFormat(str, Enum):
    ts = "ts"
    mp4 = "mp4"
    mpeg = "mpeg"