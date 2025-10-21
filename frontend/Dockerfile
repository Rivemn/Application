# ===== Stage 1: Build =====
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
# Используем ci для более быстрой и надежной установки
RUN npm ci

# Копируем остальные файлы приложения
COPY . .

# Объявляем аргумент, который будет передан из docker-compose.yml
# Значение по умолчанию полезно для отладки
ARG BACKEND_URL=http://localhost/api

# === КЛЮЧЕВОЙ ШАГ ===
# Заменяем URL-заглушку в файле environment.ts на реальный URL из docker-compose
RUN sed -i "s|apiUrl: '.*'|apiUrl: '${BACKEND_URL}'|g" ./src/environments/environment.ts

# Собираем production-версию приложения
RUN npm run build -- --configuration production

# ===== Stage 2: Serve =====
FROM nginx:alpine

# Копируем готовую сборку из предыдущего этапа
# Путь /frontend/browser/ взят из вашего старого Dockerfile
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

# Копируем вашу конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]