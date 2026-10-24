# Graph Report - ecofone-main-website-v2.0  (2026-10-24)

## Corpus Check
- 203 files · ~205,219 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 8, .example 1, .prisma 1)

## Summary
- 1714 nodes · 2962 edges · 109 communities (79 shown, 30 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 164 edges (avg confidence: 0.9)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7ab3cd2c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Roles
- verifyAdminAuth
- blogs.ts
- frontend/package.json
- backend/package.json
- Detailed Daily Log of Completed Engineering Phases
- admin/page.tsx
- react
- PART 2 — COMPLETE `brain/` ENGINEERING DOCUMENTATION SUITE (18 FILES)
- CareerModule
- 3. Deep-Dive Audit: Where Improvements Are Needed
- 6. Backend Deep-Dive (NestJS & Prisma ORM)
- lucide-react
- EcommerceService
- AuthService
- CareerService
- app/page.tsx
- SubAdminService
- @nestjs/common
- PrismaService
- FranchiseService
- ContactService
- aws-deploy.yml
- with
- ResearchService
- system-log.module.ts
- TradeInService
- EcoFone Official Web Portal & Systems Documentation
- compilerOptions
- careers/page.tsx
- EcoFone Editorial Architecture & Social Integration Changelog
- compilerOptions
- EcoFone Website & Email Operations Changelog
- CertificateController
- ref_fs
- auth.service.ts
- EcoFone — Neon Serverless to Native PostgreSQL Migration Runbook
- 4. Detailed Component Engineering
- SubmitReviewDto
- buy/page.tsx
- environment
- build-push
- 3. Deep-Dive Audit: Where Improvements Are Needed
- name
- EcoFone Production Deployment Playbook (AWS ap-south-1 Mumbai)
- 3. Detailed Component Engineering
- 📱 EcoFone Comprehensive Project Documentation & Architecture Blueprint
- backend
- CreateSubAdminDto
- seed-json-to-postgres.js
- ApplyFranchiseDto
- services
- postgres
- seed.js
- frontend
- healthcheck
- content/route.ts
- CreateCertificateDto
- deploy-frontend
- jobs
- Authentic Research & Market Publication Images (`/` Homepage)
- franchise.controller.ts
- scripts
- HealthController
- SchedulePickupDto
- migrator
- about/page.tsx
- page_head.tsx
- EcoFone Updates & Enhancements Changelog
- EcoFone_Complete_Engineering_Compendium.md
- CheckoutDto
- build
- 📱 EcoFone Comprehensive Project Documentation & Architecture Blueprint
- deploy-backend
- migrate
- rollback
- 3.3 Existing Code Changes for Deployment Optimization
- careers/upload/route.ts
- EcoFone Updates & Enhancements Changelog
- LocationTier
- 1.2 SEO-Safe DDoS Mitigation, Load Offloading, Database & Backend Optimization
- 🛡️ EcoFone Comprehensive System Architecture & Deep-Dive Audit Report
- app.module.ts
- index.ts
- env
- XssMiddleware
- EcoFone Codebase Remediation, Stack Upgrade & PostgreSQL Migration Report
- EcoFone Codebase Remediation, Stack Upgrade & PostgreSQL Migration Report
- api.ts
- reviews-carousel.tsx
- vercel.json
- next.config.js
- EcoFone Frontend Application Documentation
- aws-day2-provisioning.sh
- compact_process.js
- check-admins.js
- replace_grid.js
- replace_process.js
- check-db.js
- clean-db.js
- delete-all-certificates.js
- CreateSystemLogDto
- PART 3 — AWS DEPLOYMENT OPTIMIZATION

## God Nodes (most connected - your core abstractions)
1. `react` - 59 edges
2. `Roles()` - 58 edges
3. `CmsService` - 52 edges
4. `@nestjs/common` - 46 edges
5. `next` - 43 edges
6. `PrismaService` - 42 edges
7. `CmsController` - 38 edges
8. `api` - 28 edges
9. `with` - 27 edges
10. `verifyAdminAuth()` - 27 edges

## Surprising Connections (you probably didn't know these)
- `E-Commerce Marketplace & Checkout (`/buy`)` --references--> `AuthModule`  [INFERRED]
  ECOFONE_COMPLETE_PROJECT_DOCUMENTATION.md → backend/src/auth/auth.module.ts
- `E-Commerce Marketplace & Checkout (`/buy`)` --references--> `AuthModule`  [INFERRED]
  System/ECOFONE_COMPLETE_PROJECT_DOCUMENTATION.md → backend/src/auth/auth.module.ts
- `5. Phase 5: Stack Upgrades & Vulnerability Remediation (`fix/phase-5-upgrades`)` --references--> `CmsService`  [INFERRED]
  logs/update_2026-10-23_12-45_nakul.md → backend/src/cms/cms.service.ts
- `1. `AuthModule` ([`backend/src/auth/`](file:///home/nakul/Documents/Internship%20EcoFone/ecofone-main-website-v2.0/backend/src/auth/))` --references--> `AuthModule`  [INFERRED]
  System/ECOFONE_SYSTEM_ARCHITECTURE_AND_FULL_AUDIT_REPORT.md → backend/src/auth/auth.module.ts
- `1.1 Deep-Dive Vulnerability Analysis of the EcoFone v2.0 Audit Report` --references--> `CareerModule`  [INFERRED]
  System/EcoFone_Complete_Engineering_Compendium.md → backend/src/career/career.module.ts

## Import Cycles
- None detected.

## Communities (109 total, 30 thin omitted)

### Community 0 - "Roles"
Cohesion: 0.05
Nodes (3): Roles(), CmsController, CmsService

### Community 1 - "verifyAdminAuth"
Cohesion: 0.08
Nodes (55): DELETE(), dispatchEmailToHr(), GET(), getApplications(), PATCH(), POST(), saveApplications(), DATA_FILE (+47 more)

### Community 2 - "blogs.ts"
Cohesion: 0.06
Nodes (53): DELETE(), GET(), PUT(), calculateReadingTime(), DATA_FILE, DELETE(), formatDateToReadable(), generateSlug() (+45 more)

### Community 3 - "frontend/package.json"
Cohesion: 0.05
Nodes (52): CareersManager(), dependencies, @aws-sdk/client-s3@^3.1156.0, clsx@^2.1.0, exceljs@^4.4.0, html2canvas@^1.4.1, jimp@^1.6.1, jspdf@^4.2.1 (+44 more)

### Community 4 - "backend/package.json"
Cohesion: 0.07
Nodes (40): dependencies, @aws-sdk/client-s3@^3.500.0, @aws-sdk/s3-request-presigner@^3.500.0, class-transformer@^0.5.1, class-validator@^0.14.0, helmet@^8.3.0, @nestjs/cli@^10.0.0, @nestjs/common@^10.0.0 (+32 more)

### Community 5 - "Detailed Daily Log of Completed Engineering Phases"
Cohesion: 0.20
Nodes (9): 1. Phase 1: P0 Security & Credential Hygiene (`fix/phase-1-security`), 2. Phase 2: Neon to Native PostgreSQL Migration (`fix/phase-2-postgres-migration`), 4. Phase 4: Performance, Razorpay SDK & Bundle Optimization (`fix/phase-4-performance`), 5. Phase 5: Stack Upgrades & Vulnerability Remediation (`fix/phase-5-upgrades`), 6. Phase 6: Final Verification & Security Posture (`fix/phase-6-verification`), Active Local Servers, Detailed Daily Log of Completed Engineering Phases, EcoFone Updates & Enhancements Changelog (+1 more)

### Community 6 - "admin/page.tsx"
Cohesion: 0.08
Nodes (31): BlogsManager(), BlogsManagerProps, PLACEMENT_OPTIONS, PRESET_IMAGES, BrandsManager(), DashboardOverview(), DashboardOverviewProps, FaqsManager() (+23 more)

### Community 7 - "react"
Cohesion: 0.06
Nodes (19): GOOGLE_JOBS_STRUCTURED_DATA, metadata, metadata, inter, metadata, plusJakarta, RootLayout(), metadata (+11 more)

### Community 8 - "PART 2 — COMPLETE `brain/` ENGINEERING DOCUMENTATION SUITE (18 FILES)"
Cohesion: 0.11
Nodes (19): File 10: `brain/09_ERROR_HANDLING.md`, File 11: `brain/10_SECURITY.md`, File 12: `brain/11_ADMOB_SPEC.md`, File 13: `brain/12_GITHUB_ACTIONS.md`, File 14: `brain/13_TESTING.md`, File 15: `brain/14_PRODUCTION_CHECKLIST.md`, File 16: `brain/15_MICROTASKS.md`, File 17: `brain/16_CHANGELOG.md` (+11 more)

### Community 9 - "CareerModule"
Cohesion: 0.19
Nodes (13): CareerModule, ContactModule, ResearchModule, 1. Executive Summary, 2. Complete Audit Findings & Resolution Matrix, Key Milestones Delivered:, Store, 3. Phase 3: Architecture & Storage Unification (`fix/phase-3-architecture`) (+5 more)

### Community 10 - "3. Deep-Dive Audit: Where Improvements Are Needed"
Cohesion: 0.05
Nodes (38): 1. Ad-Hoc Monkeypatch and Scratch Scripts Committed to Git, 1. Architectural Split: Next.js JSON Files vs. NestJS PostgreSQL, 1. Executive Overview & System Architecture, 1. Hardcoded Device Catalog on Sell / Buyback Page, 1. Plaintext Database Credentials & Master Passwords in Git, 1. S3/R2 Bucket Exhaustive Scan on Every Single File Upload, 2. Comprehensive Technology Stack Breakdown, 2. Dead Code Left in Frontend: `page_head.tsx` (+30 more)

### Community 11 - "6. Backend Deep-Dive (NestJS & Prisma ORM)"
Cohesion: 0.40
Nodes (5): Database Schema & Data Entities, Supporting Models:, ResearchArticle, Database Schema & Data Entities, Supporting Models:

### Community 12 - "lucide-react"
Cohesion: 0.11
Nodes (21): capitalize(), CityFranchisePage(), FRANCHISE_CITIES, generateMetadata(), Props, FranchisePage(), metadata, ChooseFranchiseModel() (+13 more)

### Community 14 - "AuthService"
Cohesion: 0.12
Nodes (7): AuthController, ChangeMasterAdminPasswordDto, GoogleLoginDto, MasterAdminLoginDto, SendOtpDto, VerifyOtpDto, AuthService

### Community 16 - "app/page.tsx"
Cohesion: 0.09
Nodes (22): Interactive UI Components, calculateRoiMetrics(), HomePage(), cards, DifferentCarousel(), InvestorModel(), MarketOpportunity(), DEFAULT_DATA (+14 more)

### Community 18 - "@nestjs/common"
Cohesion: 0.17
Nodes (12): @nestjs/throttler@^6.5.0, ROLES_KEY, RolesGuard, CreateCareerApplicationDto, CreateCareerJobDto, ContactController, CreateContactDto, CreateResearchArticleDto (+4 more)

### Community 19 - "PrismaService"
Cohesion: 0.15
Nodes (5): CertificateService, CheckoutInput, EcommerceService, PrismaService, SystemLogModule

### Community 22 - "aws-deploy.yml"
Cohesion: 0.09
Nodes (21): concurrency, cancel-in-progress, group, env, AWS_REGION, ECR_REGISTRY, IMAGE_TAG, skip_migrations (+13 more)

### Community 23 - "with"
Cohesion: 0.09
Nodes (22): with, aws-region, build-args, cache, cache-dependency-path, cache-from, cache-to, cluster (+14 more)

### Community 27 - "EcoFone Official Web Portal & Systems Documentation"
Cohesion: 0.10
Nodes (20): 1. Interactive Resume Upload ("Upload from Drive / Device"), 2. Job Openings Restructuring (7 Core Roles), 3. UI / UX Brand Harmonization, 4. SEO & Google Jobs Schema.org Optimization, 🔌 API Endpoints Reference, Authentic Market Research & Editorial Images, Contact Us Page Redesign, Data Segregation & Rate Limiting (+12 more)

### Community 28 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, experimentalDecorators, forceConsistentCasingInFileNames, incremental (+10 more)

### Community 29 - "careers/page.tsx"
Cohesion: 0.39
Nodes (5): CareersPage(), DEFAULT_JOBS, JobPosition, ContactPage(), submitToGoogleForm()

### Community 30 - "EcoFone Editorial Architecture & Social Integration Changelog"
Cohesion: 0.10
Nodes (20): SUB_NAV_ITEMS, SubNavItem, TechByteSubnav(), 10. Quality Assurance & Git Compliance, 1. Executive Summary, 2. Editorial Layout & Grid Architecture (`/blog` & `/blog/[slug]`), 3. Anti-AI Visual Refinement & Studio Photography, 4. Brand Color System Integration (+12 more)

### Community 31 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 32 - "EcoFone Website & Email Operations Changelog"
Cohesion: 0.11
Nodes (18): 1. Executive Summary, 2. Dual Zoho SMTP Setup & Authentication, 3. Careers & Hiring Portal (`/careers`), 4. Dedicated Careers Excel Exporter, 5. Contact Us & Franchise Routing, 6. Rate Limiting Security (`frontend/lib/rate-limit.ts`), 7. Branded Email Templates & Auto-Responders, 8. Footer Clean-up (+10 more)

### Community 34 - "ref_fs"
Cohesion: 0.11
Nodes (6): content, buffer, content, lines, content, content

### Community 35 - "auth.service.ts"
Cohesion: 0.12
Nodes (7): prisma, bcrypt@^6.0.0, jsonwebtoken@^9.0.2, prisma, prisma, bcrypt, jsonwebtoken

### Community 36 - "EcoFone — Neon Serverless to Native PostgreSQL Migration Runbook"
Cohesion: 0.13
Nodes (14): 1. Architecture Overview & Context, 2. Pre-Migration Checklist, 3. Step-by-Step Migration Execution, 4. Post-Migration Verification & Reconciliation, 5. Application Switchover, 6. Rollback Procedure, EcoFone — Neon Serverless to Native PostgreSQL Migration Runbook, Step 3.1: Pre-Migration Row Count Snapshot (Source Database) (+6 more)

### Community 37 - "4. Detailed Component Engineering"
Cohesion: 0.13
Nodes (14): 1. Executive Summary, 2. Architecture & Data Flow, 3. Sidebar Categorization & Navigation Structure, 4. Detailed Component Engineering, 5. Modified & Created Files Inventory, 6. Verification, Testing & Git Compliance, A. Hero & Homepage CMS (`hero-cms-manager.tsx`), B. Store Locator & Outlets CMS (`stores-manager.tsx`) (+6 more)

### Community 38 - "SubmitReviewDto"
Cohesion: 0.24
Nodes (5): ApplyJobDto, ChatMessageDto, CreateStoreDto, SubmitReviewDto, UpdateReviewDto

### Community 39 - "buy/page.tsx"
Cohesion: 0.38
Nodes (4): BuyCatalogPage(), SKUDetail, EmiCalculator(), EmiCalculatorProps

### Community 40 - "environment"
Cohesion: 0.16
Nodes (14): environment, CORS_ORIGINS, DATABASE_URL, DIRECT_URL, HOSTNAME, INITIAL_ADMIN_PASSWORD, INTERNAL_BACKEND_URL, JWT_SECRET (+6 more)

### Community 41 - "build-push"
Cohesion: 0.15
Nodes (13): environment, name, needs, runs-on, strategy, build-push, target, fail-fast (+5 more)

### Community 42 - "3. Deep-Dive Audit: Where Improvements Are Needed"
Cohesion: 0.05
Nodes (38): 1. Ad-Hoc Monkeypatch and Scratch Scripts Committed to Git, 1. Architectural Split: Next.js JSON Files vs. NestJS PostgreSQL, 1. Executive Overview & System Architecture, 1. Hardcoded Device Catalog on Sell / Buyback Page, 1. Plaintext Database Credentials & Master Passwords in Git, 1. S3/R2 Bucket Exhaustive Scan on Every Single File Upload, 2. Comprehensive Technology Stack Breakdown, 2. Dead Code Left in Frontend: `page_head.tsx` (+30 more)

### Community 43 - "name"
Cohesion: 0.35
Nodes (12): steps, steps, steps, steps, steps, steps, id, name (+4 more)

### Community 44 - "EcoFone Production Deployment Playbook (AWS ap-south-1 Mumbai)"
Cohesion: 0.17
Nodes (11): 1. Prerequisites Checklist, 2. Infrastructure Provisioning (Day 1 / Morning), 3. GitHub Actions OIDC Authentication Setup, 4. Application Load Balancer & DNS Configuration, 5. Local Smoke Test (Docker Compose), 6. Zero-Downtime Deployment Sequence, EcoFone Production Deployment Playbook (AWS ap-south-1 Mumbai), Step 2.1: Run Base AWS Resources Setup (+3 more)

### Community 45 - "3. Detailed Component Engineering"
Cohesion: 0.17
Nodes (11): 1. Executive Summary, 2. Architecture & Data Flow, 3. Detailed Component Engineering, 4. Modified & Created Files Inventory, 5. Verification, Testing & Git Compliance, A. Dedicated 3-Column Comparison Grid (`franchise-detailed-models.tsx`), B. Deployment Roadmap with Watermark Numerals (`#deployment-roadmap`), C. Progressive Disclosure & Collapsible Capital Allocation (+3 more)

### Community 46 - "📱 EcoFone Comprehensive Project Documentation & Architecture Blueprint"
Cohesion: 0.06
Nodes (30): 10. Environment Variables & Configuration, 11. Deployment & Local Setup Guide, 12 Dedicated Management Panels:, 1. Executive Summary & Brand Vision, 2. High-Level System Architecture, 3. Technology Stack, 4. Project Directory Layout, 5. Frontend Deep-Dive (Next.js 15) (+22 more)

### Community 47 - "backend"
Cohesion: 0.18
Nodes (11): container_name, depends_on, ports, read_only, restart, tmpfs, migrator, redis (+3 more)

### Community 48 - "CreateSubAdminDto"
Cohesion: 0.40
Nodes (4): CreateSubAdminDto, ResetSubAdminPasswordDto, SubAdminLoginDto, VerifySubAdminPasswordDto

### Community 49 - "seed-json-to-postgres.js"
Cohesion: 0.42
Nodes (9): DATA_DIR, loadJson(), main(), prisma, seedCareerApplications(), seedCareerJobs(), seedContactMessages(), seedResearchArticles() (+1 more)

### Community 51 - "services"
Cohesion: 0.20
Nodes (9): container_name, image, ports, restart, services, redis, version, volumes (+1 more)

### Community 52 - "postgres"
Cohesion: 0.20
Nodes (10): POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_USER, container_name, environment, image, ports, restart (+2 more)

### Community 53 - "seed.js"
Cohesion: 0.25
Nodes (5): main(), runScript(), altMainJsPath, mainJsPath, setup-local-postgres.sh script

### Community 54 - "frontend"
Cohesion: 0.22
Nodes (9): condition, backend, container_name, depends_on, ports, read_only, restart, tmpfs (+1 more)

### Community 55 - "healthcheck"
Cohesion: 0.50
Nodes (9): healthcheck, healthcheck, interval, retries, start_period, test, timeout, healthcheck (+1 more)

### Community 56 - "content/route.ts"
Cohesion: 0.42
Nodes (7): dynamic, GET(), PUT(), revalidate, getCmsFilePath(), getWebsiteCms(), saveWebsiteCms()

### Community 58 - "deploy-frontend"
Cohesion: 0.25
Nodes (8): outputs, environment, name, needs, outputs, runs-on, deploy-frontend, previous_taskdef

### Community 59 - "jobs"
Cohesion: 0.25
Nodes (8): jobs, smoke-test, verify, name, needs, runs-on, name, runs-on

### Community 60 - "Authentic Research & Market Publication Images (`/` Homepage)"
Cohesion: 0.25
Nodes (7): Authentic Research & Market Publication Images (`/` Homepage), EcoFone Updates & Enhancements Changelog, Features & Implementation:, Key Changes Implemented:, Overview, Overview, Store Locator Redesign & Full Admin Panel CMS (`/` Homepage & `/admin`)

### Community 61 - "franchise.controller.ts"
Cohesion: 0.16
Nodes (9): BACKEND_CONFIG, FRONTEND_CONFIG, main(), triggerWebhook(), axios@^1.6.0, RoiParams, DiagnosticInput, SchedulePickupInput (+1 more)

### Community 62 - "scripts"
Cohesion: 0.29
Nodes (7): scripts, build, postinstall, prestart, start, start:dev, start:prod

### Community 65 - "migrator"
Cohesion: 0.29
Nodes (7): postgres, container_name, depends_on, read_only, tmpfs, condition, migrator

### Community 66 - "about/page.tsx"
Cohesion: 0.43
Nodes (5): AboutPage(), isValidSocialLink(), MOCK_TEAM_MEMBERS, ScrollReveal(), ScrollRevealProps

### Community 68 - "EcoFone Updates & Enhancements Changelog"
Cohesion: 0.29
Nodes (6): 1. Resume Upload Experience ("Upload from Drive / Device"), 2. Updated Job Openings & Role Structure, 3. SEO & Google Jobs Optimization, EcoFone Updates & Enhancements Changelog, Problem Solved:, What Was Implemented:

### Community 69 - "EcoFone_Complete_Engineering_Compendium.md"
Cohesion: 0.18
Nodes (10): 4.1 New Specification File: `brain/19_AWS_GITHUB_ACTIONS_DEPLOY.md`, DIRECT_URL (not the pooled DATABASE_URL) is injected by ECS from SSM for this task only, EcoFone (`ecofone.co.in`) — Complete Engineering Compendium, End of Document, List recent revisions, Only one production deploy at a time; never cancel a deploy that is mid-flight., PART 4 — AWS GITHUB ACTIONS CI/CD (NEW), Point the service at a known-good revision (+2 more)

### Community 70 - "CheckoutDto"
Cohesion: 0.47
Nodes (3): CatalogFilterDto, CheckoutDto, PaymentVerifyDto

### Community 71 - "build"
Cohesion: 0.60
Nodes (6): build, context, dockerfile, target, build, build

### Community 72 - "📱 EcoFone Comprehensive Project Documentation & Architecture Blueprint"
Cohesion: 0.06
Nodes (30): 10. Environment Variables & Configuration, 11. Deployment & Local Setup Guide, 12 Dedicated Management Panels:, 1. Executive Summary & Brand Vision, 2. High-Level System Architecture, 3. Technology Stack, 4. Project Directory Layout, 5. Frontend Deep-Dive (Next.js 15) (+22 more)

### Community 73 - "deploy-backend"
Cohesion: 0.33
Nodes (6): environment, if, name, needs, runs-on, deploy-backend

### Community 74 - "migrate"
Cohesion: 0.33
Nodes (6): migrate, environment, if, name, needs, runs-on

### Community 75 - "rollback"
Cohesion: 0.33
Nodes (6): rollback, environment, if, name, needs, runs-on

### Community 76 - "3.3 Existing Code Changes for Deployment Optimization"
Cohesion: 0.20
Nodes (10): 3.3.1 `backend/src/main.ts` — AWS ALB 502 Fix, Graceful `SIGTERM`, Proxy Trust & 100KB Ceiling, 3.3.2 `backend/src/prisma.service.ts` — AWS RDS Pool Management, Cold-Start Retry & Clean Shutdown, 3.3.3 `backend/src/health/health.controller.ts` — AWS ALB Liveness vs. Readiness Probes, 3.3.4 `backend/prisma/schema.prisma` — Generator Block for AWS Graviton (`ARM64`) & `x86_64`, 3.3.5 `frontend/next.config.mjs` — Standalone AWS Build, Runtime Backend Proxy & Bundle Splitting, 3.3.6 Multi-Stage AWS Production Dockerfiles (`backend/Dockerfile` & `frontend/Dockerfile`), 3.3.7 Read-Only Container Guard for the Next.js Resilience JSON Layer (`frontend/lib/json-fallback.ts`), 3.3 Existing Code Changes for Deployment Optimization (+2 more)

### Community 78 - "EcoFone Updates & Enhancements Changelog"
Cohesion: 0.40
Nodes (4): Contact Us Page Redesign (`/contact`), EcoFone Updates & Enhancements Changelog, Research & Market Articles Image Fix (`/` Homepage), What Was Built:

### Community 79 - "LocationTier"
Cohesion: 0.50
Nodes (4): LocationTier, TIER_A, TIER_B, TIER_C

### Community 80 - "1.2 SEO-Safe DDoS Mitigation, Load Offloading, Database & Backend Optimization"
Cohesion: 0.22
Nodes (9): FAQPage(), 1.2 SEO-Safe DDoS Mitigation, Load Offloading, Database & Backend Optimization, 1.3 Target Tech Stack (EcoFone v3.0) & Architectural Build Order, 1. How to Stop DDoS & Scrapers Without Hurting SEO (Verified Bot Architecture), 2. Server Load Offloading & Backend Optimization, 3. Database Optimization (PostgreSQL 16 + Prisma 5.22+), 4. Technical SEO Architecture (Zero-Compromise Ranking Engine), Future-Proof Target Tech Stack (+1 more)

### Community 81 - "🛡️ EcoFone Comprehensive System Architecture & Deep-Dive Audit Report"
Cohesion: 0.18
Nodes (10): 1. Monorepo Structure & Technology Stack, 3. Frontend Architecture & App Router Structure, 6. Performance & Bundle Optimizations, 7. Recommendations for Long-Term Roadmap, 8. Audit Verification Sign-Off, Architectural Resilience: The Dual-Sync Layer, Bundle Optimization Results, 🛡️ EcoFone Comprehensive System Architecture & Deep-Dive Audit Report (+2 more)

### Community 82 - "app.module.ts"
Cohesion: 0.08
Nodes (25): AuthModule, CertificateModule, CmsModule, BotProtectionMiddleware, EcommerceModule, FranchiseModule, HealthModule, SubAdminModule (+17 more)

### Community 83 - "index.ts"
Cohesion: 0.11
Nodes (8): getApp(), handler(), server, @nestjs/core@^10.0.0, AppModule, HttpExceptionFilter, bootstrap(), @nestjs/core

### Community 84 - "env"
Cohesion: 0.50
Nodes (4): BASE_URL, DATABASE_URL, DIRECT_URL, env

### Community 85 - "XssMiddleware"
Cohesion: 0.32
Nodes (4): XssMiddleware, 1. Timing-Safe Cryptographic Guards, 2. Sanitization & Anti-Bot Middleware, 4. Security Posture & Vulnerability Analysis

### Community 86 - "EcoFone Codebase Remediation, Stack Upgrade & PostgreSQL Migration Report"
Cohesion: 0.29
Nodes (6): 3. New Findings Identified During Remediation, 4. Git Branch & Commit Trajectory, 5. Verification Commands & Health Status, 6. Post-Remediation Security Posture, 7. Next Steps & External Team Actions, EcoFone Codebase Remediation, Stack Upgrade & PostgreSQL Migration Report

### Community 87 - "EcoFone Codebase Remediation, Stack Upgrade & PostgreSQL Migration Report"
Cohesion: 0.29
Nodes (6): 3. New Findings Identified During Remediation, 4. Git Branch & Commit Trajectory, 5. Verification Commands & Health Status, 6. Post-Remediation Security Posture, 7. Next Steps & External Team Actions, EcoFone Codebase Remediation, Stack Upgrade & PostgreSQL Migration Report

### Community 88 - "api.ts"
Cohesion: 0.09
Nodes (14): Application, DEPARTMENTS, JOB_TYPES, JobPosition, DeviceItem, SellPage(), CertificateData, VerifyCertificatePage() (+6 more)

### Community 89 - "reviews-carousel.tsx"
Cohesion: 0.40
Nodes (3): FALLBACK_REVIEWS, Review, ReviewsCarousel()

### Community 100 - "compact_process.js"
Cohesion: 0.50
Nodes (3): content, endIndex, startIndex

### Community 102 - "replace_grid.js"
Cohesion: 0.50
Nodes (3): content, endIndex, startIndex

### Community 103 - "replace_process.js"
Cohesion: 0.50
Nodes (3): content, endIndex, startIndex

### Community 108 - "PART 3 — AWS DEPLOYMENT OPTIMIZATION"
Cohesion: 0.67
Nodes (3): 3.1 New Specification File: `brain/18_AWS_DEPLOYMENT_OPTIMIZATION.md`, 3.2 Deployment Rules Added to `brain/00_MASTER_RULES.md`, PART 3 — AWS DEPLOYMENT OPTIMIZATION

## Knowledge Gaps
- **3 isolated node(s):** `TIER_A`, `TIER_B`, `TIER_C`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 731 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **30 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `react` to `verifyAdminAuth`, `blogs.ts`, `ref_fs`, `frontend/package.json`, `page_head.tsx`, `admin/page.tsx`, `lucide-react`, `careers/upload/route.ts`, `app/page.tsx`, `content/route.ts`, `careers/page.tsx`, `EcoFone Editorial Architecture & Social Integration Changelog`?**
  _High betweenness centrality (0.132) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `CmsService` (e.g. with `5. Phase 5: Stack Upgrades & Vulnerability Remediation (`fix/phase-5-upgrades`)` and `2. Server Load Offloading & Backend Optimization`) actually correct?**
  _`CmsService` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `TIER_A`, `TIER_B`, `TIER_C` to the rest of the system?**
  _3 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Roles` be split into smaller, more focused modules?**
  _Cohesion score 0.05268414481897628 - nodes in this community are weakly interconnected._
- **Why does `CmsService` connect `Roles` to `ref_fs`, `Detailed Daily Log of Completed Engineering Phases`, `1.2 SEO-Safe DDoS Mitigation, Load Offloading, Database & Backend Optimization`, `@nestjs/common`, `PrismaService`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Should `verifyAdminAuth` be split into smaller, more focused modules?**
  _Cohesion score 0.0792838874680307 - nodes in this community are weakly interconnected._
- **Why does `@prisma/client` connect `@nestjs/common` to `auth.service.ts`, `backend/package.json`, `check-admins.js`, `check-db.js`, `clean-db.js`, `delete-all-certificates.js`, `seed-json-to-postgres.js`, `PrismaService`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._