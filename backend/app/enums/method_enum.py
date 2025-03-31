from enum import Enum


class Method(str, Enum):
    transcribe = "transcribe"
    translate = "translate"