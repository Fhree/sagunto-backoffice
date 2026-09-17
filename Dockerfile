# Fase 1: Construccion
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Compilamos Angular en modo produccion
RUN npm run build --configuration=production

# Fase 2: Servidor Web Nginx
FROM nginx:alpine AS final
COPY --from=build /app/dist/sagunto-backoffice/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80