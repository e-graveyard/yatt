FROM node:15.12.0-alpine AS base
MAINTAINER Caian R. Ertl <hi@caian.org>

RUN npm i -g npm@latest
RUN addgroup -S alan && adduser -S alan -G alan
RUN mkdir -p /home/alan
RUN chown alan:alan /home/alan
USER alan
WORKDIR /home/alan

FROM base AS build
USER root
COPY . .
RUN npm install
RUN npm run build:js
RUN chown -R alan:alan dist

FROM base AS dependencies
USER root
COPY package.json .
COPY package-lock.json .
RUN export NODE_ENV="production"
RUN npm install --only=production
RUN chown -R alan:alan node_modules

FROM dependencies AS run
USER alan
COPY --from=build ["/home/alan/dist", "./dist"]
ENTRYPOINT ["npm", "start"]
