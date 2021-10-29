FROM node:16.13.0-alpine AS base
MAINTAINER Caian R. Ertl <hi@caian.org>

RUN npm i -g npm@latest
RUN addgroup -S turing && adduser -S turing -G turing
RUN mkdir -p /home/turing
RUN chown turing:turing /home/turing
USER turing
WORKDIR /home/turing

FROM base AS package
USER root
COPY package.json .
COPY package-lock.json .

FROM package AS prod-deps
RUN apk add --no-cache curl
RUN curl -sf https://gobinaries.com/tj/node-prune | sh
RUN NODE_ENV="production" npm i --only=production
RUN node-prune
RUN chown -R turing:turing node_modules package.json package-lock.json

FROM package AS dev-deps
RUN npm i
RUN npm i --save-dev @swc/core-linux-musl

FROM dev-deps AS build
COPY src src
COPY tsconfig.json .
COPY .swcrc .
RUN npm run build:js
RUN chown -R turing:turing dist

FROM package AS run
USER turing
COPY --from=prod-deps ["/home/turing/node_modules", "./node_modules"]
COPY --from=build ["/home/turing/dist", "./dist"]
ENTRYPOINT ["npm", "start"]
