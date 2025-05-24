# Build stage
FROM node:20.11.1 AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Serve stage
FROM nginx:alpine
COPY --from=build /app/dist/desk-booking-app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
