# Graph Report - ecofone-main-website-v2.0  (2026-10-24)

## Corpus Check
- 219 files · ~217,351 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 8, .example 1, .prisma 1)

## Summary
- 1828 nodes · 3185 edges · 125 communities (89 shown, 36 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 176 edges (avg confidence: 0.9)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3e0d33a8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- CmsService
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
- api
- EcoFone Editorial Architecture & Social Integration Changelog
- compilerOptions
- EcoFone Website & Email Operations Changelog
- CertificateController
- ref_fs
- ecommerce.service.ts
- EcoFone — Neon Serverless to Native PostgreSQL Migration Runbook
- 4. Detailed Component Engineering
- SubmitReviewDto
- store-locator-section.tsx
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
- next
- CreateCertificateDto
- deploy-frontend
- jobs
- Authentic Research & Market Publication Images (`/` Homepage)
- dependencies
- scripts
- HealthController
- SchedulePickupDto
- migrator
- Roles
- CmsController
- EcoFone Updates & Enhancements Changelog
- gallery-manager.tsx
- CheckoutDto
- build
- 📱 EcoFone Comprehensive Project Documentation & Architecture Blueprint
- deploy-backend
- migrate
- rollback
- EcoFone 30-Slot Horizontal Masonry Drag-and-Drop Gallery Engine Changelog
- Detailed Daily Log of Completed Engineering Phases
- EcoFone Updates & Enhancements Changelog
- LocationTier
- Detailed Daily Log of Completed Engineering Phases
- 🛡️ EcoFone Comprehensive System Architecture & Deep-Dive Audit Report
- app.module.ts
- index.ts
- env
- XssMiddleware
- EcoFone Codebase Remediation, Stack Upgrade & PostgreSQL Migration Report
- EcoFone Codebase Remediation, Stack Upgrade & PostgreSQL Migration Report
- api.ts
- Detailed Daily Log of Completed Engineering Phases
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
- main.ts
- careers-manager.tsx
- stores-manager.tsx
- 9. Key Business Workflows
- 9. Key Business Workflows
- roadmap-carousel.tsx
- 11. Deployment & Local Setup Guide
- 3. Technology Stack
- 10. Environment Variables & Configuration
- @aws-sdk/client-s3@^3.500.0
- @aws-sdk/s3-request-presigner@^3.500.0
- class-transformer@^0.5.1
- @nestjs/cli@^10.0.0
- @nestjs/schematics@^10.0.0
- rxjs@^7.8.1
- @types/express@^4.17.21

## God Nodes (most connected - your core abstractions)
1. `Roles()` - 62 edges
2. `react` - 62 edges
3. `CmsService` - 58 edges
4. `next` - 49 edges
5. `@nestjs/common` - 46 edges
6. `CmsController` - 43 edges
7. `PrismaService` - 42 edges
8. `lucide-react` - 29 edges
9. `api` - 28 edges
10. `with` - 27 edges

## Surprising Connections (you probably didn't know these)
- `E-Commerce Marketplace & Checkout (`/buy`)` --references--> `AuthModule`  [INFERRED]
  ECOFONE_COMPLETE_PROJECT_DOCUMENTATION.md → backend/src/auth/auth.module.ts
- `E-Commerce Marketplace & Checkout (`/buy`)` --references--> `AuthModule`  [INFERRED]
  System/ECOFONE_COMPLETE_PROJECT_DOCUMENTATION.md → backend/src/auth/auth.module.ts
- `5. Phase 5: Stack Upgrades & Vulnerability Remediation (`fix/phase-5-upgrades`)` --references--> `CmsService`  [INFERRED]
  logs/update_2026-10-23_12-45_nakul.md → backend/src/cms/cms.service.ts
- `1. `AuthModule` ([`backend/src/auth/`](file:///home/nakul/Documents/Internship%20EcoFone/ecofone-main-website-v2.0/backend/src/auth/))` --references--> `AuthModule`  [INFERRED]
  System/ECOFONE_SYSTEM_ARCHITECTURE_AND_FULL_AUDIT_REPORT.md → backend/src/auth/auth.module.ts
- `2. Complete Audit Findings & Resolution Matrix` --references--> `CareerModule`  [INFERRED]
  ECOFONE_REMEDIATION_REPORT.md → backend/src/career/career.module.ts

## Import Cycles
- None detected.

## Communities (125 total, 36 thin omitted)

### Community 1 - "verifyAdminAuth"
Cohesion: 0.08
Nodes (58): DELETE(), dispatchEmailToHr(), GET(), getApplications(), PATCH(), POST(), saveApplications(), DATA_FILE (+50 more)

### Community 2 - "blogs.ts"
Cohesion: 0.06
Nodes (53): DELETE(), GET(), PUT(), calculateReadingTime(), DATA_FILE, DELETE(), formatDateToReadable(), generateSlug() (+45 more)

### Community 3 - "frontend/package.json"
Cohesion: 0.05
Nodes (53): dependencies, @aws-sdk/client-s3@^3.1156.0, clsx@^2.1.0, @dnd-kit/core@^6.3.1, exceljs@^4.4.0, html2canvas@^1.4.1, jimp@^1.6.1, jspdf@^4.2.1 (+45 more)

### Community 4 - "backend/package.json"
Cohesion: 0.15
Nodes (12): helmet@^8.3.0, prisma@^5.0.0, @types/bcrypt@^6.0.0, description, main, name, prisma, seed (+4 more)

### Community 5 - "Detailed Daily Log of Completed Engineering Phases"
Cohesion: 0.20
Nodes (9): 1. Phase 1: P0 Security & Credential Hygiene (`fix/phase-1-security`), 2. Phase 2: Neon to Native PostgreSQL Migration (`fix/phase-2-postgres-migration`), 4. Phase 4: Performance, Razorpay SDK & Bundle Optimization (`fix/phase-4-performance`), 5. Phase 5: Stack Upgrades & Vulnerability Remediation (`fix/phase-5-upgrades`), 6. Phase 6: Final Verification & Security Posture (`fix/phase-6-verification`), Active Local Servers, Detailed Daily Log of Completed Engineering Phases, EcoFone Updates & Enhancements Changelog (+1 more)

### Community 6 - "admin/page.tsx"
Cohesion: 0.08
Nodes (26): BlogsManager(), BlogsManagerProps, PLACEMENT_OPTIONS, PRESET_IMAGES, BrandsManager(), DashboardOverview(), DashboardOverviewProps, FaqsManager() (+18 more)

### Community 7 - "react"
Cohesion: 0.12
Nodes (13): inter, metadata, plusJakarta, RootLayout(), metadata, SECTIONS, CopyrightYear(), LayoutClientWrapper() (+5 more)

### Community 8 - "PART 2 — COMPLETE `brain/` ENGINEERING DOCUMENTATION SUITE (18 FILES)"
Cohesion: 0.05
Nodes (42): 3.1 New Specification File: `brain/18_AWS_DEPLOYMENT_OPTIMIZATION.md`, 3.2 Deployment Rules Added to `brain/00_MASTER_RULES.md`, 3.3.1 `backend/src/main.ts` — AWS ALB 502 Fix, Graceful `SIGTERM`, Proxy Trust & 100KB Ceiling, 3.3.2 `backend/src/prisma.service.ts` — AWS RDS Pool Management, Cold-Start Retry & Clean Shutdown, 3.3.3 `backend/src/health/health.controller.ts` — AWS ALB Liveness vs. Readiness Probes, 3.3.4 `backend/prisma/schema.prisma` — Generator Block for AWS Graviton (`ARM64`) & `x86_64`, 3.3.5 `frontend/next.config.mjs` — Standalone AWS Build, Runtime Backend Proxy & Bundle Splitting, 3.3.6 Multi-Stage AWS Production Dockerfiles (`backend/Dockerfile` & `frontend/Dockerfile`) (+34 more)

### Community 9 - "CareerModule"
Cohesion: 0.19
Nodes (12): ContactModule, ResearchModule, 1. Executive Summary, 2. Complete Audit Findings & Resolution Matrix, Key Milestones Delivered:, Store, 3. Phase 3: Architecture & Storage Unification (`fix/phase-3-architecture`), 1. Executive Summary (+4 more)

### Community 10 - "3. Deep-Dive Audit: Where Improvements Are Needed"
Cohesion: 0.05
Nodes (38): 1. Ad-Hoc Monkeypatch and Scratch Scripts Committed to Git, 1. Architectural Split: Next.js JSON Files vs. NestJS PostgreSQL, 1. Executive Overview & System Architecture, 1. Hardcoded Device Catalog on Sell / Buyback Page, 1. Plaintext Database Credentials & Master Passwords in Git, 1. S3/R2 Bucket Exhaustive Scan on Every Single File Upload, 2. Comprehensive Technology Stack Breakdown, 2. Dead Code Left in Frontend: `page_head.tsx` (+30 more)

### Community 11 - "6. Backend Deep-Dive (NestJS & Prisma ORM)"
Cohesion: 0.22
Nodes (9): 6. Backend Deep-Dive (NestJS & Prisma ORM), Database Schema & Data Entities, Security, Throttling & Bot Protection, Supporting Models:, ResearchArticle, 6. Backend Deep-Dive (NestJS & Prisma ORM), Database Schema & Data Entities, Security, Throttling & Bot Protection (+1 more)

### Community 12 - "lucide-react"
Cohesion: 0.11
Nodes (21): capitalize(), CityFranchisePage(), FRANCHISE_CITIES, generateMetadata(), Props, FranchisePage(), metadata, ChooseFranchiseModel() (+13 more)

### Community 13 - "EcommerceService"
Cohesion: 0.07
Nodes (12): EcommerceController, EcommerceService, FAQPage(), metadata, 1.2 SEO-Safe DDoS Mitigation, Load Offloading, Database & Backend Optimization, 1.3 Target Tech Stack (EcoFone v3.0) & Architectural Build Order, 1. How to Stop DDoS & Scrapers Without Hurting SEO (Verified Bot Architecture), 2. Server Load Offloading & Backend Optimization (+4 more)

### Community 14 - "AuthService"
Cohesion: 0.12
Nodes (7): AuthController, ChangeMasterAdminPasswordDto, GoogleLoginDto, MasterAdminLoginDto, SendOtpDto, VerifyOtpDto, AuthService

### Community 15 - "CareerService"
Cohesion: 0.11
Nodes (4): CareerController, CareerService, CreateCareerApplicationDto, CreateCareerJobDto

### Community 16 - "app/page.tsx"
Cohesion: 0.11
Nodes (19): AboutPage(), isValidSocialLink(), MOCK_TEAM_MEMBERS, calculateRoiMetrics(), HomePage(), cards, DifferentCarousel(), GallerySection() (+11 more)

### Community 18 - "@nestjs/common"
Cohesion: 0.35
Nodes (6): ROLES_KEY, RolesGuard, class-validator, @nestjs/common, @nestjs/throttler, @prisma/client

### Community 19 - "PrismaService"
Cohesion: 0.13
Nodes (5): CertificateService, RoiParams, PrismaService, jsonwebtoken, @nestjs/config

### Community 21 - "ContactService"
Cohesion: 0.12
Nodes (3): ContactController, ContactService, CreateContactDto

### Community 22 - "aws-deploy.yml"
Cohesion: 0.09
Nodes (21): concurrency, cancel-in-progress, group, env, AWS_REGION, ECR_REGISTRY, IMAGE_TAG, skip_migrations (+13 more)

### Community 23 - "with"
Cohesion: 0.09
Nodes (22): with, aws-region, build-args, cache, cache-dependency-path, cache-from, cache-to, cluster (+14 more)

### Community 24 - "ResearchService"
Cohesion: 0.13
Nodes (3): ResearchController, CreateResearchArticleDto, ResearchService

### Community 27 - "EcoFone Official Web Portal & Systems Documentation"
Cohesion: 0.11
Nodes (18): 1. Interactive Resume Upload ("Upload from Drive / Device"), 2. Job Openings Restructuring (7 Core Roles), 3. UI / UX Brand Harmonization, 4. SEO & Google Jobs Schema.org Optimization, 🔌 API Endpoints Reference, Contact Us Page Redesign, Data Segregation & Rate Limiting, 📂 Directory Structure (+10 more)

### Community 28 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, experimentalDecorators, forceConsistentCasingInFileNames, incremental (+10 more)

### Community 29 - "api"
Cohesion: 0.14
Nodes (11): CareersPage(), DEFAULT_JOBS, JobPosition, ContactPage(), DeviceItem, SellPage(), GALLERY_ITEMS, GalleryItem (+3 more)

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
Cohesion: 0.09
Nodes (7): ALLOWED_EXTENSIONS, content, buffer, content, lines, content, content

### Community 35 - "ecommerce.service.ts"
Cohesion: 0.09
Nodes (12): prisma, BACKEND_CONFIG, FRONTEND_CONFIG, main(), triggerWebhook(), prisma, prisma, CheckoutInput (+4 more)

### Community 36 - "EcoFone — Neon Serverless to Native PostgreSQL Migration Runbook"
Cohesion: 0.13
Nodes (14): 1. Architecture Overview & Context, 2. Pre-Migration Checklist, 3. Step-by-Step Migration Execution, 4. Post-Migration Verification & Reconciliation, 5. Application Switchover, 6. Rollback Procedure, EcoFone — Neon Serverless to Native PostgreSQL Migration Runbook, Step 3.1: Pre-Migration Row Count Snapshot (Source Database) (+6 more)

### Community 37 - "4. Detailed Component Engineering"
Cohesion: 0.13
Nodes (14): 1. Executive Summary, 2. Architecture & Data Flow, 3. Sidebar Categorization & Navigation Structure, 4. Detailed Component Engineering, 5. Modified & Created Files Inventory, 6. Verification, Testing & Git Compliance, A. Hero & Homepage CMS (`hero-cms-manager.tsx`), B. Store Locator & Outlets CMS (`stores-manager.tsx`) (+6 more)

### Community 38 - "SubmitReviewDto"
Cohesion: 0.26
Nodes (5): ApplyJobDto, ChatMessageDto, CreateStoreDto, SubmitReviewDto, UpdateReviewDto

### Community 39 - "store-locator-section.tsx"
Cohesion: 0.11
Nodes (17): 5. Frontend Deep-Dive (Next.js 15), Interactive UI Components, Next.js Route Handlers (API Routes), Public Web Pages & Routes, BuyCatalogPage(), SKUDetail, EmiCalculator(), EmiCalculatorProps (+9 more)

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
Cohesion: 0.12
Nodes (15): 10. Environment Variables & Configuration, 12 Dedicated Management Panels:, 1. Executive Summary & Brand Vision, 2. High-Level System Architecture, 4. Project Directory Layout, 7. Enterprise Email & Communications Infrastructure, 8. Admin CMS Dashboard (`/admin`), Backend (`backend/.env`) (+7 more)

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

### Community 56 - "next"
Cohesion: 0.07
Nodes (28): DELETE(), dynamic, GET(), PUT(), dynamic, PUT(), dynamic, POST() (+20 more)

### Community 58 - "deploy-frontend"
Cohesion: 0.25
Nodes (8): outputs, environment, name, needs, outputs, runs-on, deploy-frontend, previous_taskdef

### Community 59 - "jobs"
Cohesion: 0.25
Nodes (8): jobs, smoke-test, verify, name, needs, runs-on, name, runs-on

### Community 60 - "Authentic Research & Market Publication Images (`/` Homepage)"
Cohesion: 0.25
Nodes (7): Authentic Research & Market Publication Images (`/` Homepage), EcoFone Updates & Enhancements Changelog, Features & Implementation:, Key Changes Implemented:, Overview, Overview, Store Locator Redesign & Full Admin Panel CMS (`/` Homepage & `/admin`)

### Community 61 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, axios@^1.6.0, bcrypt@^6.0.0, class-validator@^0.14.0, jsonwebtoken@^9.0.2, @nestjs/common@^10.0.0, @nestjs/config@^4.0.4, @nestjs/throttler@^6.5.0 (+7 more)

### Community 62 - "scripts"
Cohesion: 0.29
Nodes (7): scripts, build, postinstall, prestart, start, start:dev, start:prod

### Community 65 - "migrator"
Cohesion: 0.29
Nodes (7): postgres, container_name, depends_on, read_only, tmpfs, condition, migrator

### Community 68 - "EcoFone Updates & Enhancements Changelog"
Cohesion: 0.29
Nodes (6): 1. Resume Upload Experience ("Upload from Drive / Device"), 2. Updated Job Openings & Role Structure, 3. SEO & Google Jobs Optimization, EcoFone Updates & Enhancements Changelog, Problem Solved:, What Was Implemented:

### Community 69 - "gallery-manager.tsx"
Cohesion: 0.19
Nodes (15): DragOverlayCard(), GalleryItem, GalleryManager(), GallerySlot(), GallerySlotProps, getCleanCaption(), getCropAspectForSize(), getGridStyleFromSize() (+7 more)

### Community 70 - "CheckoutDto"
Cohesion: 0.47
Nodes (3): CatalogFilterDto, CheckoutDto, PaymentVerifyDto

### Community 71 - "build"
Cohesion: 0.60
Nodes (6): build, context, dockerfile, target, build, build

### Community 72 - "📱 EcoFone Comprehensive Project Documentation & Architecture Blueprint"
Cohesion: 0.11
Nodes (18): 11. Deployment & Local Setup Guide, 12 Dedicated Management Panels:, 1. Executive Summary & Brand Vision, 2. High-Level System Architecture, 3. Technology Stack, 4. Project Directory Layout, 7. Enterprise Email & Communications Infrastructure, 8. Admin CMS Dashboard (`/admin`) (+10 more)

### Community 73 - "deploy-backend"
Cohesion: 0.33
Nodes (6): environment, if, name, needs, runs-on, deploy-backend

### Community 74 - "migrate"
Cohesion: 0.33
Nodes (6): migrate, environment, if, name, needs, runs-on

### Community 75 - "rollback"
Cohesion: 0.33
Nodes (6): rollback, environment, if, name, needs, runs-on

### Community 76 - "EcoFone 30-Slot Horizontal Masonry Drag-and-Drop Gallery Engine Changelog"
Cohesion: 0.10
Nodes (19): 11. Expansion to Company Life & Clean Minimalist Hover Refinement, 12. Spacing Optimization Between Store Locator & Moments Gallery, 13. Header Navigation Cleanup, 1. Executive Summary, 2. Horizontal Masonry & Strict Swap Drag-and-Drop Architecture, 3. Interactive Image Cropper & Utility Engine, 4. Full-Stack API & Storage Layer, 5. Admin Dashboard Integration (`frontend/app/admin/...`) (+11 more)

### Community 77 - "Detailed Daily Log of Completed Engineering Phases"
Cohesion: 0.20
Nodes (9): 1. Phase 1: AWS Invariant Hardening & Network Portability, 3. Phase 3: Multi-Stage Docker Containerization (AWS Graviton ARM64 Ready), 4. Phase 4: VULN-03 Remediation & Automated Database Migrations, 5. Phase 5: CI/CD Pipeline & Cloud Infrastructure As Code, 6. Phase 6: Orchestration, Testing & Verification, Active Local Servers & Services, Detailed Daily Log of Completed Engineering Phases, EcoFone Updates & Enhancements Changelog (+1 more)

### Community 78 - "EcoFone Updates & Enhancements Changelog"
Cohesion: 0.40
Nodes (4): Contact Us Page Redesign (`/contact`), EcoFone Updates & Enhancements Changelog, Research & Market Articles Image Fix (`/` Homepage), What Was Built:

### Community 79 - "LocationTier"
Cohesion: 0.50
Nodes (4): LocationTier, TIER_A, TIER_B, TIER_C

### Community 80 - "Detailed Daily Log of Completed Engineering Phases"
Cohesion: 0.20
Nodes (9): 1. Phase 1: AWS Invariant Hardening & Network Portability, 3. Phase 3: Multi-Stage Docker Containerization (AWS Graviton ARM64 Ready), 4. Phase 4: VULN-03 Remediation & Automated Database Migrations, 5. Phase 5: CI/CD Pipeline & Cloud Infrastructure As Code, 6. Phase 6: Orchestration, Testing & Verification, Active Local Servers & Services, Detailed Daily Log of Completed Engineering Phases, EcoFone Updates & Enhancements Changelog (+1 more)

### Community 81 - "🛡️ EcoFone Comprehensive System Architecture & Deep-Dive Audit Report"
Cohesion: 0.17
Nodes (11): 1. Monorepo Structure & Technology Stack, 2. Backend Architecture & Module Deep-Dive, 3. Frontend Architecture & App Router Structure, 6. Performance & Bundle Optimizations, 7. Recommendations for Long-Term Roadmap, 8. Audit Verification Sign-Off, Architectural Resilience: The Dual-Sync Layer, Bundle Optimization Results (+3 more)

### Community 82 - "app.module.ts"
Cohesion: 0.08
Nodes (22): AuthModule, CareerModule, CertificateModule, CmsModule, BotProtectionMiddleware, EcommerceModule, FranchiseModule, HealthModule (+14 more)

### Community 83 - "index.ts"
Cohesion: 0.18
Nodes (7): getApp(), handler(), server, @nestjs/core@^10.0.0, @nestjs/platform-express@^10.0.0, @nestjs/core, @nestjs/platform-express

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
Cohesion: 0.12
Nodes (11): CertificateData, VerifyCertificatePage(), fetchVerification(), FALLBACK_REVIEWS, Review, ReviewsCarousel(), MOCK_CUSTOMERS, MOCK_INVESTORS (+3 more)

### Community 89 - "Detailed Daily Log of Completed Engineering Phases"
Cohesion: 0.20
Nodes (9): 1. Phase 1: AWS Invariant Hardening & Network Portability, 3. Phase 3: Multi-Stage Docker Containerization (AWS Graviton ARM64 Ready), 4. Phase 4: VULN-03 Remediation & Automated Database Migrations, 5. Phase 5: CI/CD Pipeline & Cloud Infrastructure As Code, 6. Phase 6: Orchestration, Testing & Verification, Active Local Servers & Services, Detailed Daily Log of Completed Engineering Phases, EcoFone Updates & Enhancements Changelog (+1 more)

### Community 100 - "compact_process.js"
Cohesion: 0.50
Nodes (3): content, endIndex, startIndex

### Community 102 - "replace_grid.js"
Cohesion: 0.50
Nodes (3): content, endIndex, startIndex

### Community 103 - "replace_process.js"
Cohesion: 0.50
Nodes (3): content, endIndex, startIndex

### Community 108 - "main.ts"
Cohesion: 0.28
Nodes (3): AppModule, HttpExceptionFilter, bootstrap()

### Community 109 - "careers-manager.tsx"
Cohesion: 0.22
Nodes (7): Application, CareersManager(), DEPARTMENTS, JOB_TYPES, JobPosition, xlsx@^0.18.5, xlsx

### Community 110 - "stores-manager.tsx"
Cohesion: 0.29
Nodes (6): PRESET_IMAGES, StoreData, StoresManager(), Authentic Market Research & Editorial Images, 🌟 October 15, 2026 Updates (Latest), Store Locator Redesign & Full Admin Panel CMS (`/` Homepage & `/admin`)

### Community 111 - "9. Key Business Workflows"
Cohesion: 0.33
Nodes (6): 9. Key Business Workflows, Careers Portal & Dual-Mode CV Upload (`/careers`), Certificate Verification Engine (`/verify-certificate`), Device Buyback / Trade-In Engine (`/sell`), E-Commerce Marketplace & Checkout (`/buy`), Franchise Partner Acquisition & ROI Calculator (`/franchise`)

### Community 112 - "9. Key Business Workflows"
Cohesion: 0.33
Nodes (6): 9. Key Business Workflows, Careers Portal & Dual-Mode CV Upload (`/careers`), Certificate Verification Engine (`/verify-certificate`), Device Buyback / Trade-In Engine (`/sell`), E-Commerce Marketplace & Checkout (`/buy`), Franchise Partner Acquisition & ROI Calculator (`/franchise`)

### Community 115 - "11. Deployment & Local Setup Guide"
Cohesion: 0.67
Nodes (3): 11. Deployment & Local Setup Guide, Running Backend Locally:, Running Frontend Locally:

### Community 116 - "3. Technology Stack"
Cohesion: 0.67
Nodes (3): 3. Technology Stack, Backend REST API, Frontend Application

### Community 117 - "10. Environment Variables & Configuration"
Cohesion: 0.67
Nodes (3): 10. Environment Variables & Configuration, Backend (`backend/.env`), Frontend (`frontend/.env.local` or Cloud Environment)

## Knowledge Gaps
- **3 isolated node(s):** `TIER_A`, `TIER_B`, `TIER_C`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 784 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **36 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `verifyAdminAuth`, `blogs.ts`, `ref_fs`, `frontend/package.json`, `gallery-manager.tsx`, `admin/page.tsx`, `react`, `lucide-react`, `EcommerceService`, `app/page.tsx`, `api`, `EcoFone Editorial Architecture & Social Integration Changelog`?**
  _High betweenness centrality (0.174) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `CmsService` (e.g. with `5. Phase 5: Stack Upgrades & Vulnerability Remediation (`fix/phase-5-upgrades`)` and `2. Server Load Offloading & Backend Optimization`) actually correct?**
  _`CmsService` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `TIER_A`, `TIER_B`, `TIER_C` to the rest of the system?**
  _3 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `CmsService` be split into smaller, more focused modules?**
  _Cohesion score 0.06456456456456457 - nodes in this community are weakly interconnected._
- **Why does `@prisma/client` connect `@nestjs/common` to `ecommerce.service.ts`, `backend/package.json`, `check-admins.js`, `SubmitReviewDto`, `check-db.js`, `clean-db.js`, `delete-all-certificates.js`, `seed-json-to-postgres.js`, `PrismaService`, `dependencies`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **Should `verifyAdminAuth` be split into smaller, more focused modules?**
  _Cohesion score 0.07511737089201878 - nodes in this community are weakly interconnected._
- **Why does `CmsService` connect `CmsService` to `ref_fs`, `CmsController`, `Roles`, `Detailed Daily Log of Completed Engineering Phases`, `SubmitReviewDto`, `EcommerceService`, `.applyToJob`, `PrismaService`?**
  _High betweenness centrality (0.080) - this node is a cross-community bridge._