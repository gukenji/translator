from enum import Enum


class ModelType(str, Enum):
    tiny = "tiny" 
    base = "base"
    small = "small"
    medium = "medium"
    large = "large"
    turbo = "turbo"