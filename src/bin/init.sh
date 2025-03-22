#!/bin/sh

set -e # Exit on error

DPRINT_FILE="./dprint.json"
ESLINT_CONFIG="./eslint.config.ts"
ESLINT_LEGACY_CONFIG="./.eslintrc.cjs"

if [ -f "$DPRINT_FILE" ]; then
  echo "Error: $DPRINT_FILE already exists in the application root!" >&2
  exit 1
fi

if [ -f "$ESLINT_CONFIG" ]; then
  echo "Error: $ESLINT_CONFIG already exists in the application root!" >&2
  exit 1
fi

# Remove ESLint config if it exists
if [ -f "$ESLINT_LEGACY_CONFIG" ]; then
  echo "Removing $ESLINT_LEGACY_CONFIG configuration (probably there from T3 initialization)..."
  rm "$ESLINT_LEGACY_CONFIG"
  echo "$ESLINT_LEGACY_CONFIG removed successfully!"
fi

echo "Creating $DPRINT_FILE in application root..."
cat <<EOF >"$DPRINT_FILE"
{
  "extends": "./node_modules/eslint-plugin-astige/dist/dprint.json"
}
EOF
echo "$DPRINT_FILE created successfully!"

# TODO: Fixed so FlatConfig.Config[] does something. Fix in repos (only astige-finance?) that use the old setup.
# TODO: * It had /dist/ in the path, and that seemed to break things ...
# TODO: * - Anthony 2025-03-22
echo "Creating $ESLINT_CONFIG in application root..."
cat <<EOF >"$ESLINT_CONFIG"
// eslint-disable-next-line canonical/filename-match-exported
import { type FlatConfig } from "@typescript-eslint/utils/ts-eslint";
import * as astige from "eslint-plugin-astige";

/*
const SEVERITY = {
  ERROR: "error",
  OFF: "off",
  WARN: "warn",
} as const;
*/

const config: FlatConfig.Config[] = [
  ...astige.configs["astige-ignore"],
  ...astige.auto,
];

export default config;
EOF
echo "$ESLINT_CONFIG created successfully!"
