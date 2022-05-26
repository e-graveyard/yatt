#!/usr/bin/env sh

if [ -z "$NPM_CONFIG_PRODUCTION" ]; then
    npm run install:hooks
fi
