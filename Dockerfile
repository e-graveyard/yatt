# ...
FROM node:18.7.0-buster-slim AS base
LABEL maintainer="Caian Ertl <hi@caian.org>"

ARG DOCKER_DEFAULT_USER=turing
ENV DOCKER_DEFAULT_USER $DOCKER_DEFAULT_USER

ARG DOCKER_USER_HOME_DIR=/home/${DOCKER_DEFAULT_USER}
ENV DOCKER_USER_HOME_DIR $DOCKER_USER_HOME_DIR

RUN groupadd "${DOCKER_DEFAULT_USER}" \
    && useradd \
        -rm \
        -d "${DOCKER_USER_HOME_DIR}" \
        -s /bin/bash \
        -g "${DOCKER_DEFAULT_USER}" "${DOCKER_DEFAULT_USER}" \
    && mkdir -p \
        "${DOCKER_USER_HOME_DIR}" \
    && chown -R \
        "${DOCKER_DEFAULT_USER}:${DOCKER_DEFAULT_USER}" \
        "${DOCKER_USER_HOME_DIR}" \
    && npm install --location=global "npm@8.13.0" \
    && npm install --location=global "pnpm@7.5.0"

WORKDIR ${DOCKER_USER_HOME_DIR}
USER ${DOCKER_DEFAULT_USER}


# ...
FROM base AS package
COPY package/package.json .
COPY package/pnpm-lock.yaml .
COPY package/.scripts .scripts


# ...
FROM package AS prod-deps
RUN NODE_ENV="production" pnpm i


# ...
FROM package AS dev-deps
RUN pnpm i


# ...
FROM dev-deps AS build
COPY package/src src
COPY package/tsconfig.json .
COPY package/.swcrc .
RUN pnpm run build:js


# ...
FROM package AS run
COPY --from=prod-deps ${DOCKER_USER_HOME_DIR}/node_modules node_modules
COPY --from=build ${DOCKER_USER_HOME_DIR}/dist dist
ENTRYPOINT ["node", "dist"]
