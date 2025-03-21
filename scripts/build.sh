#!/bin/sh

# Verify we're in the correct project directory
if ! grep -q '"name": "eslint-plugin-astige"' package.json; then
  echo 'Error: Must run from eslint-plugin-astige project root'
  exit 1
fi

# Run tests first
if ! npm test; then
  echo 'Error: Tests failed. Build aborted.'
  exit 1
fi

# Clear the dist directory
rm -rf ./dist

# Run TypeScript compiler
npx tsc

# Copy manual files
cp ./dprint.json ./dist/
