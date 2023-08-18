# --------------> The build image
FROM node:current-alpine AS build
WORKDIR /app
COPY package*.json .
RUN npm ci --production
COPY . .
RUN npm run build

# --------------> The production image
FROM nginx:1-alpine
COPY docker/ /
COPY --from=build /app/build /var/www/rls-manual-ui