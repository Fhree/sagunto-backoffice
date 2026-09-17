# Fase 1: Construcción
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Compilamos Angular en modo producción
RUN npm run build --configuration=production

# Fase 2: Servidor Web Nginx
FROM nginx:alpine AS final
# OJO: Cambia "sagunto-front" por el nombre real de tu proyecto
COPY --from=build /app/dist/sagunto-front/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80