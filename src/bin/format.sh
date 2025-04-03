#!/bin/sh

set -e # Exit on error

echo "Formatting with dprint..."
npx dprint fmt
# Run eslint to fix issues, but suppress all linting output (warnings and errors).
# Redirect stdout and stderr to /dev/null.
# '|| true' prevents the script from exiting if eslint finds errors (non-zero exit code).
echo "Formatting with eslint --fix..."
npx eslint --fix --quiet >/dev/null 2>&1 || true
