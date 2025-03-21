#!/bin/sh

# Exit on error
set -e

# Bandaid hide JSON parsing warning -Anthony 2025-03-21
# * https://github.com/nodejs/node/issues/51347#issuecomment-1875937539
NODE_OPTIONS='--no-warnings' npx eslint
