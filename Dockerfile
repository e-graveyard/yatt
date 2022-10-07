# ...
FROM node:16.15-buster-slim AS base
LABEL maintainer="Caian Ertl <hi@caian.org>"

ARG DOCKER_DEFAULT_USER=turing
ENV DOCKER_DEFAULT_USER $DOCKER_DEFAULT_USER

ARG DOCKER_USER_HOME_DIR=/home/${DOCKER_DEFAULT_USER}
ENV DOCKER_USER_HOME_DIR $DOCKER_USER_HOME_DIR

WORKDIR /

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
        "${DOCKER_USER_HOME_DIR}"


# ...
FROM base AS package
COPY package/package.json .
COPY package/package-lock.json .
COPY package/.scripts .scripts


# ...
FROM package AS prod-deps
RUN npm install --omit=dev


# ...
FROM package AS dev-deps
RUN npm install


# ...
FROM dev-deps AS build
COPY package/src src
COPY package/tsconfig.json .
COPY package/.swcrc .
RUN npm run build:js


# ...
FROM package AS run
USER ${DOCKER_DEFAULT_USER}

WORKDIR ${DOCKER_USER_HOME_DIR}/node_modules
COPY --from=prod-deps --chown=${DOCKER_DEFAULT_USER}:${DOCKER_DEFAULT_USER} /node_modules .

WORKDIR ${DOCKER_USER_HOME_DIR}/dist
COPY --from=build --chown=${DOCKER_DEFAULT_USER}:${DOCKER_DEFAULT_USER} /dist .

ENTRYPOINT ["node", "."]
