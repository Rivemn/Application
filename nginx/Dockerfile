# ===== Этап 1: Сборка Angular приложения =====
FROM node:20-alpine AS build

# Указываем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
# Это ускорит последующие сборки, если зависимости не менялись
COPY frontend/package*.json ./
RUN npm ci --legacy-peer-deps

# Копируем весь остальной код фронтенда
COPY frontend/ .

# Получаем URL бэкенда из docker-compose
ARG BACKEND_URL=/api
# Заменяем apiUrl в файле конфигурации для Docker
RUN sed -i "s|apiUrl: '.*'|apiUrl: '${BACKEND_URL}'|g" ./src/environments/environment.docker.ts

# Запускаем сборку Angular для продакшена
RUN npm run build

# ===== Этап 2: Финальный образ Nginx =====
FROM nginx:alpine

# Создаем папку для файлов проверки Certbot
RUN mkdir -p /var/www/certbot

# Копируем собранный фронтенд из первого этапа
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

# Открываем порты
EXPOSE 80 443

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
