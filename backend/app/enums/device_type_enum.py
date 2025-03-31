from enum import Enum


class DeviceType(str, Enum):
    cpu = "cpu"
    cuda = "cuda"