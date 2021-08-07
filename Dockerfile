FROM node:15.12.0-alpine AS base
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
RUN npm i --only=production
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

FROM prod-deps AS run
USER turing
COPY --from=build ["/home/turing/dist", "./dist"]
CMD ["npm", "run", "start:cond"]
