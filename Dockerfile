FROM node:18.14.0-alpine AS build

RUN apk update && apk add bash

WORKDIR app

COPY package*.json ./

RUN npm ci

COPY ./ ./

RUN npm run build:ci
