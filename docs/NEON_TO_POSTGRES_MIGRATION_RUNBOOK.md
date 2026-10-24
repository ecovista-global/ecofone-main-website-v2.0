# EcoFone — Neon Serverless to Native PostgreSQL Migration Runbook

**Document Version:** 1.0.0  
**Target Architecture:** Native PostgreSQL (Self-Hosted Linux / AWS RDS / DigitalOcean Managed PostgreSQL)  
**Prerequisites:** PostgreSQL client utilities (`pg_dump`, `pg_restore`, `psql`) version 15 or higher.

---

## 1. Architecture Overview & Context

EcoFone was initially connected to Neon Serverless PostgreSQL (`ep-blue-sun-adp2jl9q-pooler.c-2.us-east-1.aws.neon.tech`). To eliminate cold-start latency, cloud vendor lock-in, connection pooler drops, and establish full data sovereignty, the database is transitioning to a dedicated native PostgreSQL instance.

### Target Specifications:
- **Engine:** PostgreSQL 15.x or 16.x
- **Collation / Encoding:** `UTF-8`
- **Default Port:** `5432`
- **Connection Mode:** `DATABASE_URL` (application runtime) & `DIRECT_URL` (Prisma migrations)

---

## 2. Pre-Migration Checklist

1. [ ] **Target Database Provisioned:** Target database `ecofone` created with owner role `ecofone_user`.
2. [ ] **Firewall & Security Groups:** Port `5432` accessible from backend API host IP with TLS/SSL configured.
3. [ ] **PostgreSQL Client Tools:** Verify `pg_dump` and `pg_restore` versions:
   ```bash
   pg_dump --version
   pg_restore --version
   ```
4. [ ] **Set Connection Environment Variables:**
   ```bash
   export SOURCE_NEON_URL="postgresql://neondb_owner:YOUR_SOURCE_PASSWORD@ep-blue-sun-adp2jl9q-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"
   export TARGET_POSTGRES_URL="postgresql://ecofone_user:YOUR_TARGET_PASSWORD@your-db-host:5432/ecofone?sslmode=prefer"
   ```

---

## 3. Step-by-Step Migration Execution

### Step 3.1: Pre-Migration Row Count Snapshot (Source Database)
Execute on the source Neon DB to record baseline row counts:
```bash
psql "$SOURCE_NEON_URL" -c "
SELECT relname AS table_name, n_live_tup AS row_count 
FROM pg_stat_user_tables 
ORDER BY table_name;
" > source_neon_row_counts.txt

cat source_neon_row_counts.txt
```

### Step 3.2: Export Full Database Dump
Create a compressed custom-format dump including all schemas, tables, indices, and constraints:
```bash
pg_dump \
  --verbose \
  --format=custom \
  --no-owner \
  --no-privileges \
  --blobs \
  --dbname="$SOURCE_NEON_URL" \
  --file=ecofone_neon_production_backup_$(date +%Y%m%d_%H%M%S).dump
```

*Verification:*
```bash
ls -lh ecofone_neon_production_backup_*.dump
```

### Step 3.3: Restore Dump into Native PostgreSQL
Restore schema and data into the target native PostgreSQL database:
```bash
pg_restore \
  --verbose \
  --clean \
  --if-exists \
  --no-owner \
  --no-privileges \
  --dbname="$TARGET_POSTGRES_URL" \
  ecofone_neon_production_backup_*.dump
```
> **Note:** Any warnings regarding schema ownership or public role creation can be safely ignored as `--no-owner` and `--no-privileges` are enforced.

### Step 3.4: Re-align PostgreSQL Sequences
If any table uses sequences (such as serial/bigserial keys), synchronize them to prevent primary key collision:
```bash
psql "$TARGET_POSTGRES_URL" -c "
DO \$\$
DECLARE
    seq RECORD;
BEGIN
    FOR seq IN 
        SELECT table_name, column_name, column_default 
        FROM information_schema.columns 
        WHERE column_default LIKE 'nextval%'
    LOOP
        EXECUTE format('SELECT setval(%L, COALESCE((SELECT MAX(%I) FROM %I), 1))', 
            substring(seq.column_default from '''([^'']+)'''), 
            seq.column_name, 
            seq.table_name);
    END LOOP;
END \$\$;
"
```

---

## 4. Post-Migration Verification & Reconciliation

### Step 4.1: Row Count Comparison
Execute count comparison against the target database:
```bash
psql "$TARGET_POSTGRES_URL" -c "
SELECT relname AS table_name, n_live_tup AS row_count 
FROM pg_stat_user_tables 
ORDER BY table_name;
" > target_postgres_row_counts.txt

# Compare source vs target
diff -u source_neon_row_counts.txt target_postgres_row_counts.txt
```

### Step 4.2: Prisma Schema Validation
Run Prisma client generation and schema validation against the target database:
```bash
cd backend
DATABASE_URL="$TARGET_POSTGRES_URL" DIRECT_URL="$TARGET_POSTGRES_URL" npx prisma db pull --print
```

---

## 5. Application Switchover

1. **Update Backend `.env`:**
   ```env
   DATABASE_URL="postgresql://ecofone_user:YOUR_TARGET_PASSWORD@your-db-host:5432/ecofone?schema=public&sslmode=prefer"
   DIRECT_URL="postgresql://ecofone_user:YOUR_TARGET_PASSWORD@your-db-host:5432/ecofone?schema=public&sslmode=prefer"
   ```

2. **Verify NestJS Database Connectivity via `/api/v1/health`:**
   ```bash
   curl -s http://localhost:4012/api/v1/health | jq .
   ```
   *Expected response (HTTP 200):*
   ```json
   {
     "status": "healthy",
     "timestamp": "2026-10-23T11:50:00.000Z",
     "uptimeSeconds": 120,
     "database": {
       "status": "up",
       "latencyMs": 4
     }
   }
   ```

---

## 6. Rollback Procedure

If the native PostgreSQL database experiences unexpected downtime or network failure during the migration window:
1. Revert `DATABASE_URL` in `backend/.env` to the source Neon connection string.
2. Restart the NestJS backend service.
3. Validate service restoration via `curl http://localhost:4012/api/v1/health`.
4. Inspect logs for any connection anomalies.
