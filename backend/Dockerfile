# Usar uma imagem base Python
FROM python:3.10-slim

RUN apt-get update && apt-get install -y ffmpeg build-essential && apt-get clean

WORKDIR /app

COPY requirements.txt .

RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]