#!/bin/sh

DPRINT_FILE="./dprint.json"

if [ -f "$DPRINT_FILE" ]; then
  echo "Error: $DPRINT_FILE already exists in the application root!" >&2
  exit 1
fi

echo "Creating $DPRINT_FILE in application root..."

cat <<EOF >"$DPRINT_FILE"
{
  "extends": "./node_modules/eslint-plugin-astige/dist/dprint.json"
}
EOF

echo "$DPRINT_FILE created successfully!"
