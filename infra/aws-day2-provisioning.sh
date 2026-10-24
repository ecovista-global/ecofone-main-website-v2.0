#!/usr/bin/env bash
# ==============================================================================
# EcoFone AWS Day 2 Provisioning Script
# Target Region: ap-south-1 (Mumbai)
# Reference: System/EcoFone_Complete_Engineering_Compendium.md
# ==============================================================================

set -euo pipefail

REGION="ap-south-1"
CLUSTER_NAME="ecofone-prod"
PREFIX="ecofone"

echo "=== [Step 1] Creating AWS ECR Repositories (Graviton ARM64 Ready) ==="
for repo in "ecofone-backend" "ecofone-backend-migrator" "ecofone-frontend"; do
  echo "Checking ECR repo: ${repo}..."
  aws ecr describe-repositories --repository-names "${repo}" --region "${REGION}" >/dev/null 2>&1 || \
    aws ecr create-repository \
      --repository-name "${repo}" \
      --region "${REGION}" \
      --image-scanning-configuration scanOnPush=true \
      --encryption-configuration encryptionType=AES256
done

echo "=== [Step 2] Creating CloudWatch Log Groups ==="
for group in "/ecs/ecofone-backend" "/ecs/ecofone-frontend" "/ecs/ecofone-migrator"; do
  echo "Checking Log Group: ${group}..."
  aws logs describe-log-groups --log-group-name-prefix "${group}" --region "${REGION}" | grep -q "${group}" || \
    aws logs create-log-group --log-group-name "${group}" --region "${REGION}"
  aws logs put-retention-policy --log-group-name "${group}" --retention-in-days 30 --region "${REGION}"
done

echo "=== [Step 3] Creating ECS Fargate Cluster ==="
aws ecs describe-clusters --clusters "${CLUSTER_NAME}" --region "${REGION}" | grep -q "${CLUSTER_NAME}" || \
  aws ecs create-cluster \
    --cluster-name "${CLUSTER_NAME}" \
    --region "${REGION}" \
    --capacity-providers FARGATE FARGATE_SPOT \
    --default-capacity-provider-strategy capacityProvider=FARGATE,weight=1

echo "=== [Step 4] Checking / Provisioning IAM Execution & Task Roles ==="
# Trust policy for ECS Tasks
TRUST_POLICY='{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Service": "ecs-tasks.amazonaws.com" },
      "Action": "sts:AssumeRole"
    }
  ]
}'

aws iam get-role --role-name ecofone-ecs-execution-role >/dev/null 2>&1 || {
  echo "Creating ecofone-ecs-execution-role..."
  aws iam create-role --role-name ecofone-ecs-execution-role --assume-role-policy-document "${TRUST_POLICY}"
  aws iam attach-role-policy --role-name ecofone-ecs-execution-role --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy
  
  # Allow reading SSM parameters under /ecofone/prod/*
  aws iam put-role-policy --role-name ecofone-ecs-execution-role --policy-name EcoFoneSSMReadAccess --policy-document '{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": ["ssm:GetParameters", "ssm:GetParameter", "secretsmanager:GetSecretValue", "kms:Decrypt"],
        "Resource": "*"
      }
    ]
  }'
}

aws iam get-role --role-name ecofone-backend-task-role >/dev/null 2>&1 || {
  echo "Creating ecofone-backend-task-role..."
  aws iam create-role --role-name ecofone-backend-task-role --assume-role-policy-document "${TRUST_POLICY}"
}

aws iam get-role --role-name ecofone-frontend-task-role >/dev/null 2>&1 || {
  echo "Creating ecofone-frontend-task-role..."
  aws iam create-role --role-name ecofone-frontend-task-role --assume-role-policy-document "${TRUST_POLICY}"
}

echo "=== [Step 5] Auto-Provisioning Core Secrets in SSM Parameter Store ==="
# Core auto-generated cryptographic tokens
for param in "ADMIN_SECRET" "JWT_SECRET" "REVALIDATE_SECRET" "RAZORPAY_WEBHOOK_SECRET"; do
  echo "Checking /ecofone/prod/${param}..."
  aws ssm get-parameter --name "/ecofone/prod/${param}" --region "${REGION}" >/dev/null 2>&1 || {
    echo "  -> Generating and storing secure token for /ecofone/prod/${param}..."
    RANDOM_VAL=$(openssl rand -hex 32)
    aws ssm put-parameter \
      --name "/ecofone/prod/${param}" \
      --value "${RANDOM_VAL}" \
      --type "SecureString" \
      --region "${REGION}"
  }
done

# Service integration placeholders (set if not already configured)
for param in "ZOHO_SMTP_PASS"; do
  echo "Checking /ecofone/prod/${param}..."
  aws ssm get-parameter --name "/ecofone/prod/${param}" --region "${REGION}" >/dev/null 2>&1 || {
    echo "  -> Setting initial placeholder for /ecofone/prod/${param}..."
    aws ssm put-parameter \
      --name "/ecofone/prod/${param}" \
      --value "PLACEHOLDER_SET_IN_AWS_CONSOLE" \
      --type "SecureString" \
      --region "${REGION}"
  }
done

echo ""
echo "=== Setup completed successfully! All SSM secrets are provisioned. Proceed with GitHub OIDC role and RDS/Redis setup. ==="
