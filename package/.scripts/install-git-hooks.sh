#!/usr/bin/env sh

if [ "$NPM_CONFIG_PRODUCTION" ]; then
    pnpm run install:hooks
fi
