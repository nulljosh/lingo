#!/bin/zsh

set -euo pipefail

cd "$(dirname "$0")/.."

EMAIL="${POCKETBASE_SUPERUSER_EMAIL:-admin@lingo.local}"
PASSWORD="${POCKETBASE_SUPERUSER_PASSWORD:-lingo-local-admin}"

pocketbase superuser upsert "$EMAIL" "$PASSWORD" --dir pb_data
