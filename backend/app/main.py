from fastapi import FastAPI
from app.api import endpoints
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
import re

app = FastAPI()

STATIC_DIR = os.path.join("app", "services", "result_files")
app.mount("/result_files", StaticFiles(directory=STATIC_DIR), name="result_files")

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"http:\/\/(localhost|127\.0\.0\.1|192\.168\.\d{1,3}\.\d{1,3})(:3000)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(endpoints.router)