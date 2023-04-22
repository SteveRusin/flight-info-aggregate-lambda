#todo finish int tests

FROM node:18.14.0-slim AS build

COPY package*.json ./src

WORKDIR /src

RUN npm ci

COPY . .

RUN npm run build:ci

FROM build AS prune

ENV NODE_ENV=production
RUN npm prune --production --verbose
