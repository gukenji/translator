# Usar uma imagem base Python
FROM python:3.8-slim

# Instalar dependências do sistema se necessário
RUN apt-get update && apt-get install -y bash

# Definir o diretório de trabalho
WORKDIR /app

# Copiar arquivos de requisitos e instalar dependências Python
COPY requirements.txt .
RUN pip install -r requirements.txt
RUN pip install openai-whisper

# Copiar o código do backend
COPY . .

# Tornar o script executável
RUN chmod +x whisper_script.sh

# Expor a porta que o Flask usará
EXPOSE 5000

# Comando para iniciar o aplicativo
CMD ["python", "app.py"]
