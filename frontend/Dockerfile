# Usar uma imagem base Node.js
FROM node:18

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos de dependência primeiro (para melhor cache)
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Expor a porta de desenvolvimento (React normalmente usa 3000)
EXPOSE 3000

# Rodar em modo de desenvolvimento com hot reload
CMD ["npm", "start"]