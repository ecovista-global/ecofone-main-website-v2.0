# EcoFone Production Deployment Playbook (AWS ap-south-1 Mumbai)
**Single Source of Truth Reference:** `System/EcoFone_Complete_Engineering_Compendium.md`  
**Target Timeline:** 1–2 Days  
**Target Architecture:** AWS Graviton ARM64 (`t4g.medium` RDS, `cache.t4g.micro` ElastiCache, ECS Fargate ARM64, Next.js Standalone, Cloudflare WAF)

---

## 1. Prerequisites Checklist

| Component | Target Spec | Description |
| :--- | :--- | :--- |
| **AWS CLI** | v2.x configured | Access to AWS account in `ap-south-1` |
| **AWS Region** | `ap-south-1` | Mumbai (Lowest latency for Indian users) |
| **Domain** | `ecofone.co.in` | Managed via Cloudflare DNS |
| **CI/CD** | GitHub Actions | Workflows located in `.github/workflows/aws-deploy.yml` |

---

## 2. Infrastructure Provisioning (Day 1 / Morning)

### Step 2.1: Run Base AWS Resources Setup
Execute the automated provisioning script to create ECR repos, Log Groups, ECS Cluster, and IAM roles:
```bash
cd ecofone-main-website-v2.0
./infra/aws-day2-provisioning.sh
```

### Step 2.2: Provision RDS PostgreSQL 16 (Graviton ARM64)
- **Engine:** PostgreSQL 16.3+
- **Instance Class:** `db.t4g.medium` (2 vCPU, 4GB RAM)
- **Multi-AZ:** Enabled (Production high availability)
- **Subnets:** Isolated private DB subnets (2 AZs)
- **Security Group:** Inbound 5432 ONLY from `ecofone-ecs-tasks-sg`
- **Initial Database Name:** `ecofone`

### Step 2.3: Provision ElastiCache Redis 7.4 (Graviton ARM64)
- **Engine:** Redis 7.4+
- **Node Type:** `cache.t4g.micro` (or `cache.t4g.small` with read replicas)
- **Security Group:** Inbound 6379 ONLY from `ecofone-backend-task-sg`
- **Transit Encryption (TLS):** Enabled

### Step 2.4: Populate AWS SSM Parameter Store
Run the following commands with your real credentials:
```bash
REGION="ap-south-1"

# Database Connection (Pooled & Direct)
aws ssm put-parameter --name "/ecofone/prod/DATABASE_URL" --type "SecureString" --value "postgresql://user:pass@ecofone-rds.ap-south-1.rds.amazonaws.com:5432/ecofone?schema=public&sslmode=require" --region $REGION --overwrite
aws ssm put-parameter --name "/ecofone/prod/DIRECT_URL" --type "SecureString" --value "postgresql://user:pass@ecofone-rds.ap-south-1.rds.amazonaws.com:5432/ecofone?schema=public&sslmode=require" --region $REGION --overwrite

# Redis Cache
aws ssm put-parameter --name "/ecofone/prod/REDIS_URL" --type "SecureString" --value "rediss://ecofone-redis.ap-south-1.cache.amazonaws.com:6379" --region $REGION --overwrite

# Security & Secrets
aws ssm put-parameter --name "/ecofone/prod/JWT_SECRET" --type "SecureString" --value "$(openssl rand -hex 32)" --region $REGION --overwrite
aws ssm put-parameter --name "/ecofone/prod/ADMIN_SECRET" --type "SecureString" --value "$(openssl rand -hex 32)" --region $REGION --overwrite
aws ssm put-parameter --name "/ecofone/prod/REVALIDATE_SECRET" --type "SecureString" --value "$(openssl rand -hex 24)" --region $REGION --overwrite

# Integrations
aws ssm put-parameter --name "/ecofone/prod/CASHFREE_APP_ID" --type "SecureString" --value "PROD_CASHFREE_APP_ID" --region $REGION --overwrite
aws ssm put-parameter --name "/ecofone/prod/CASHFREE_SECRET_KEY" --type "SecureString" --value "PROD_CASHFREE_SECRET_KEY" --region $REGION --overwrite
aws ssm put-parameter --name "/ecofone/prod/SHIPROCKET_EMAIL" --type "SecureString" --value "shipping@ecofone.co.in" --region $REGION --overwrite
aws ssm put-parameter --name "/ecofone/prod/SHIPROCKET_PASSWORD" --type "SecureString" --value "PROD_PASSWORD" --region $REGION --overwrite
aws ssm put-parameter --name "/ecofone/prod/BUSINESS_SMTP_USER" --type "SecureString" --value "business@ecofone.co.in" --region $REGION --overwrite
aws ssm put-parameter --name "/ecofone/prod/BUSINESS_SMTP_PASS" --type "SecureString" --value "ZOHO_PROD_PASS" --region $REGION --overwrite
```

---

## 3. GitHub Actions OIDC Authentication Setup

Configure keyless, credential-free deployment via AWS OpenID Connect (OIDC):

1. **Create GitHub OIDC Provider in AWS IAM:**
   - Provider URL: `https://token.actions.githubusercontent.com`
   - Audience: `sts.amazonaws.com`

2. **Create IAM Role `ecofone-github-deploy`:**
   Trust Policy:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Principal": {
           "Federated": "arn:aws:iam::<ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com"
         },
         "Action": "sts:AssumeRoleWithWebIdentity",
         "Condition": {
           "StringEquals": {
             "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
           },
           "StringLike": {
             "token.actions.githubusercontent.com:sub": "repo:<YOUR_GITHUB_ORG>/<YOUR_REPO>:*"
           }
         }
       }
     ]
   }
   ```

3. **Set GitHub Repository Secrets & Variables:**
   - Secret: `AWS_DEPLOY_ROLE_ARN` = `arn:aws:iam::<ACCOUNT_ID>:role/ecofone-github-deploy`
   - Secret: `ECR_REGISTRY` = `<ACCOUNT_ID>.dkr.ecr.ap-south-1.amazonaws.com`
   - Secret: `CLOUDFLARE_ZONE_ID` = `<ZONE_ID>`
   - Secret: `CLOUDFLARE_API_TOKEN` = `<TOKEN>`
   - Secret: `SLACK_WEBHOOK_URL` = `<WEBHOOK>` (Optional)

---

## 4. Application Load Balancer & DNS Configuration

1. **ALB Listeners & Target Groups:**
   - **Target Group `ecofone-backend-tg`:** Port `4012`, Health Check Path `/api/v1/health/live`, Unhealthy threshold `2`.
   - **Target Group `ecofone-frontend-tg`:** Port `3000`, Health Check Path `/`, Unhealthy threshold `2`.
   - **ALB Rule 1:** Path `/api/*` -> Forward to `ecofone-backend-tg`.
   - **ALB Rule Default:** Forward to `ecofone-frontend-tg`.

2. **Cloudflare WAF & Edge Routing:**
   - Add CNAME for `ecofone.co.in` and `www.ecofone.co.in` -> `<ALB-DNS-NAME>.amazonaws.com`.
   - Cloudflare Proxy: **Orange Cloud (Proxied)**.
   - SSL/TLS: **Full (Strict)** with Cloudflare Origin CA certificate on ALB.
   - Cloudflare WAF Rule: Enforce Turnstile verification on interactive form endpoints (`/api/contact`, `/api/careers/apply`).

---

## 5. Local Smoke Test (Docker Compose)

Before triggering the first cloud deployment, test the exact production multi-stage images locally:
```bash
# Build and run Postgres, Redis, Migrator, Backend, and Frontend:
docker compose up --build

# Verify in another terminal:
curl -i http://localhost:4012/api/v1/health/live
curl -i http://localhost:3000/
```

---

## 6. Zero-Downtime Deployment Sequence

When code is pushed to `main`:
1. **Stage 1 (Verify):** TypeScript strict compilation check + Lint.
2. **Stage 2 (Build & Push):** Multi-arch Docker Buildx builds ARM64 images (`ecofone-backend`, `ecofone-frontend`, `ecofone-backend-migrator`) and pushes with immutable SHA tags to Amazon ECR.
3. **Stage 3 (Database Migration & Auto-Admin Seeding):** Runs `ecofone-migrator` as an **isolated single-task execution** using `DIRECT_URL`. Deploys all schema migrations and automatically initializes the production Master Admin in PostgreSQL using `/ecofone/prod/ADMIN_SECRET` if not already present. Zero manual task intervention required.
4. **Stage 4 (Backend Rolling Update):** Deploys new backend tasks to ECS Fargate with `minimumHealthyPercent: 100`.
5. **Stage 5 (Frontend Rolling Update):** Deploys new Next.js standalone tasks to ECS Fargate with `minimumHealthyPercent: 100`.
6. **Stage 6 (Smoke Test):** Probes `/api/v1/health/live` and `/` through Cloudflare origin.
7. **Stage 7 (Rollback on Failure):** Reverts ECS task definitions to previous steady state automatically if smoke test fails.
