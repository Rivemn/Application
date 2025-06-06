# Build stage
FROM node:20.11.1 AS build

WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


RUN npm run build --prod


FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/desk-booking-app/browser /usr/share/nginx/html
