#!/bin/bash
set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Starting database initialization...${NC}"

DB_HOST="${POSTGRES_HOST}"
DB_PORT="${POSTGRES_PORT}"
DB_USER="${POSTGRES_USER}"
DB_PASSWORD="${POSTGRES_PASSWORD}"
DB_NAME="${POSTGRES_DB}"

export PGPASSWORD="$DB_PASSWORD"

# Wait for Postgres
until pg_isready -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" > /dev/null 2>&1; do
  echo -e "${YELLOW}Waiting for PostgreSQL...${NC}"
  sleep 1
done

echo -e "${GREEN}PostgreSQL is ready${NC}"

# -------------------------------
# Migration tracking table
# -------------------------------
psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "
CREATE TABLE IF NOT EXISTS _migrations (
  id SERIAL PRIMARY KEY,
  filename VARCHAR(255) UNIQUE NOT NULL,
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
"

# -------------------------------
# Apply SQL migrations
# -------------------------------
MIGRATIONS_DIR="/migrations"
if [ -d "$MIGRATIONS_DIR" ]; then
  for file in $(find "$MIGRATIONS_DIR" -name "*.sql" -type f | sort); do
    filename=$(basename "$file")
    applied=$(psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -t -c \
      "SELECT COUNT(*) FROM _migrations WHERE filename='$filename';" | xargs)

    if [ "$applied" -eq 0 ]; then
      echo -e "${YELLOW}Applying migration: $filename${NC}"
      psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f "$file"
      psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c \
        "INSERT INTO _migrations (filename) VALUES ('$filename');"
      echo -e "${GREEN}✓ Applied: $filename${NC}"
    else
      echo -e "${YELLOW}⊘ Skipped: $filename${NC}"
    fi
  done
fi

echo -e "${GREEN}Auth database initialization complete${NC}"
