# Usar uma imagem base Node.js
FROM node:14

# Definir o diretório de trabalho
WORKDIR /app

# Copiar arquivos de configuração e instalar dependências
COPY package*.json ./
RUN npm install

# Copiar o restante do código do frontend
COPY . .

# Construir o aplicativo para produção
RUN npm run build

# Servir o aplicativo usando um servidor web estático (por exemplo, serve)
RUN npm install -g serve

# Expor a porta que o aplicativo usará
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["serve", "-s", "build", "-l", "3000"]
