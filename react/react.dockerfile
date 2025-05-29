FROM node:24.1.0

WORKDIR /app

# Copiar los archivos de configuración de npm
COPY ./package*.json ./

# Instalar las dependencias de npm
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]

