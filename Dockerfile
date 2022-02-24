FROM node:16-alpine AS base
LABEL maintainer="Caian Ertl <hi@caian.org>"

RUN apk add --no-cache curl
RUN curl -sL https://unpkg.com/@pnpm/self-installer | node
RUN addgroup -S turing && adduser -S turing -G turing
RUN mkdir -p /home/turing
RUN chown turing:turing /home/turing

WORKDIR /home/turing
COPY package.json .
COPY pnpm-lock.yaml .

# ...
FROM base AS prod-deps
RUN curl -sf https://gobinaries.com/tj/node-prune | sh

RUN pnpm i --prod
RUN node-prune
RUN chown -R turing:turing node_modules package.json pnpm-lock.yaml

# ...
FROM base AS dev-deps
RUN pnpm i

# ...
FROM dev-deps AS build
COPY src src
COPY tsconfig.json .
COPY .swcrc .

RUN pnpm run build:js
RUN chown -R turing:turing dist

# ...
FROM base AS run
USER turing

COPY --from=prod-deps ["/home/turing/node_modules", "./node_modules"]
COPY --from=build ["/home/turing/dist", "./dist"]
ENTRYPOINT ["pnpm", "start"]
