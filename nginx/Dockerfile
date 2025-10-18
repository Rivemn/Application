# nginx/Dockerfile
FROM nginx:alpine

# Копируем шаблон конфига и proxy_params
COPY nginx.prod.template.conf /etc/nginx/templates/nginx.prod.template.conf
COPY proxy_params /etc/nginx/proxy_params

# Убираем стандартный конфиг
RUN rm /etc/nginx/conf.d/default.conf

EXPOSE 80 443

# При старте контейнера:
# 1. Берем шаблон /etc/nginx/templates/nginx.prod.template.conf
# 2. Подставляем в него переменные окружения (например ${DOMAIN})
# 3. Сохраняем результат в /etc/nginx/nginx.conf
# 4. Запускаем Nginx
CMD ["/bin/sh", "-c", "envsubst '${DOMAIN}' < /etc/nginx/templates/nginx.prod.template.conf > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"]