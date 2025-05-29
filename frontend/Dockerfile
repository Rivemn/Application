# Build stage
FROM node:20.11.1 AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Serve stage
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/desk-booking-app /usr/share/nginx/html
