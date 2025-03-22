#!/bin/sh

set -e # Exit on error

npx dprint fmt
npx eslint --fix --quiet
