from enum import Enum


class OutputFormat(str, Enum):
    txt = "txt"
    vtt = "vtt"
    srt = "srt"
    tsv = "tsv"
    json = "json"