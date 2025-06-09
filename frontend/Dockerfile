
# Steg 1: Bygg React-appen
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Steg 2: Servera med nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Öppna port 80
EXPOSE 80
