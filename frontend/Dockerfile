# ===== Stage 1: Build =====
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci

ARG NODE_ENV=production
ARG BACKEND_URL=http://localhost:5000

ENV NODE_ENV=$NODE_ENV
ENV BACKEND_URL=$BACKEND_URL

COPY . .
RUN npm run build -- --configuration production

# ===== Stage 2: Nginx serve =====
FROM nginx:alpine

# 🎯 КОПИРУЕМ ИМЕННО ИЗ ПАПКИ /browser
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

# ✅ УСТАНАВЛИВАЕМ ПРАВИЛЬНЫЕ ПРАВА
RUN chown -R nginx:nginx /usr/share/nginx/html

# Настраиваем nginx для SPA
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80 не обязателен, но для ясности можно оставить
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
