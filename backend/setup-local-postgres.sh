#!/bin/bash
set -e

echo "========================================================"
echo "  Setting up Local PostgreSQL for EcoFone"
echo "========================================================"

echo "[1/4] Installing PostgreSQL and tools via apt..."
sudo apt update
sudo apt install -y postgresql postgresql-contrib

echo "[2/4] Starting PostgreSQL service..."
sudo systemctl enable --now postgresql

echo "[3/4] Creating user 'ecofone_user' and database 'ecofone'..."
sudo -u postgres psql -c "DO \$\$ BEGIN IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'ecofone_user') THEN CREATE ROLE ecofone_user WITH LOGIN PASSWORD 'secure_password'; END IF; END \$\$;"
sudo -u postgres psql -tc "SELECT 1 FROM pg_database WHERE datname = 'ecofone'" | grep -q 1 || sudo -u postgres psql -c "CREATE DATABASE ecofone OWNER ecofone_user;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE ecofone TO ecofone_user;"

echo "[4/4] Applying Prisma schema and seeding initial records..."
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

npx prisma db push
node seed.js

echo "========================================================"
echo "  SUCCESS! PostgreSQL is installed and configured."
echo "========================================================"
