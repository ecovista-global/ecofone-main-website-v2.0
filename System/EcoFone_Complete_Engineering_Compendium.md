# EcoFone (`ecofone.co.in`) — Complete Engineering Compendium

**Project:** EcoFone Official Portal — Ecovista Global Private Limited
**Contents:** v2.0 audit vulnerability analysis · SEO-safe DDoS/DB/backend optimization · v3.0 target stack · full 18-file `brain/` suite · AWS deployment optimization spec + code · AWS GitHub Actions CI/CD deployment spec
**Compiled:** 2026-10-24

---

## Table of Contents

**Part 1 — Audit, Strategy & Target Architecture**
- 1.1 Deep-Dive Vulnerability Analysis of the EcoFone v2.0 Audit Report (12 findings)
- 1.2 SEO-Safe DDoS Mitigation, Load Offloading, Database & Backend Optimization
- 1.3 Target Tech Stack (EcoFone v3.0) & Phased Build Order

**Part 2 — Complete `brain/` Engineering Documentation Suite (18 Files)**
- `00_MASTER_RULES.md` · `01_PRD.md` · `02_TRD.md` · `03_ARCHITECTURE.md` · `04_DATA_MODEL.md` · `05_DATA_SOURCES.md`
- `06_SCRAPING_SPEC.md` · `07_API_CONTRACT.md` · `08_UI_SPEC.md` · `09_ERROR_HANDLING.md` · `10_SECURITY.md` · `11_ADMOB_SPEC.md`
- `12_GITHUB_ACTIONS.md` · `13_TESTING.md` · `14_PRODUCTION_CHECKLIST.md` · `15_MICROTASKS.md` · `16_CHANGELOG.md` · `17_DECISIONS.md`

**Part 3 — AWS Deployment Optimization**
- 3.1 New Spec File: `brain/18_AWS_DEPLOYMENT_OPTIMIZATION.md`
- 3.2 Deployment Rules Added to `brain/00_MASTER_RULES.md` (Section 2.5)
- 3.3 Production Code Refactoring (`main.ts`, `prisma.service.ts`, `health.controller.ts`, `schema.prisma`, `next.config.mjs`, Dockerfiles, `json-fallback.ts`)

**Part 4 — AWS GitHub Actions CI/CD (New)**
- 4.1 New Spec File: `brain/19_AWS_GITHUB_ACTIONS_DEPLOY.md` (ECR + ECS zero-downtime pipeline, migration job, rollback)

---

# PART 1 — AUDIT, STRATEGY & TARGET ARCHITECTURE

An architectural and security analysis of the **EcoFone v2.0** audit report (`ecofone.co.in` — Ecovista Global Private Limited) reveals **12 hidden vulnerabilities and architectural bottlenecks** that must be remediated alongside a hardened DDoS, SEO, backend, and database optimization strategy, followed by the complete **18-file `brain/` engineering documentation suite** (`00_MASTER_RULES.md` through `17_DECISIONS.md`).

---

## 1.1 Deep-Dive Vulnerability Analysis of the EcoFone v2.0 Audit Report

While the current v2.0 baseline covers foundational security practices (Prisma parameterized queries, `crypto.timingSafeEqual` HMAC checks, and dynamic bundle splitting), a closer examination of the architecture exposes **12 critical, high, and medium-severity vulnerabilities**:

| ID | Severity | Vulnerability Identified in Audit Report | Architectural Flaw & Exploit Scenario | Exact Remediation Strategy |
| --- | --- | --- | --- | --- |
| **VULN-01** | **CRITICAL** | **14-Day Non-Revocable Admin JWT (`expiresIn: 14d`) & Shared HS256 Secret** | The report calls the JWT "stateful" while issuing an HS256 token with a 14-day expiry (`id: master_admin`, `role: ADMIN`). If an admin token leaks or a Sub-Admin is fired in `SubAdminModule`, their token remains valid for up to 14 days. Furthermore, sharing an HS256 symmetric secret across Next.js (`auth-guard.ts`) and NestJS (`AuthModule`) doubles the compromise surface. | Replace with **15-minute RS256/EdDSA Access Tokens** + **7-day Rotating Refresh Tokens** stored in `HttpOnly; Secure; SameSite=Strict` cookies, backed by a **Redis session revocation list** (`jti` denylist). |
| **VULN-02** | **CRITICAL** | **Inventory Reservation Denial-of-Service (Cart Hoarding Lockout)** | `EcommerceModule` flips `InventoryItem` from `AVAILABLE` to `RESERVED` inside a Prisma `$transaction` upon *checkout initiation* (before payment). Without an automated TTL expiration worker, a malicious bot can initiate checkout on every refurbished phone in the catalog and abandon the Razorpay modal—locking 100% of EcoFone's inventory out of stock indefinitely. | Implement `SELECT ... FOR UPDATE SKIP LOCKED` during reservation AND enqueue a **BullMQ delayed job (10-minute TTL)** that automatically reverts unpaid `RESERVED` items back to `AVAILABLE` and cancels stale orders. |
| **VULN-03** | **HIGH** | **Master Admin Plaintext Env Fallback (`process.env.MASTER_ADMIN_PASSWORD`)** | `AuthModule` authenticates `username: admin` against `SubAdmin` with a fallback to `process.env.MASTER_ADMIN_PASSWORD`. This creates a permanent backdoor that bypasses database RBAC, password rotation, MFA, and audit logs, while using a predictable `admin` username. | Remove `MASTER_ADMIN_PASSWORD` fallback entirely. Seed the initial super-admin via a one-time CLI migration script with an Argon2id/bcrypt (12 rounds) hash, custom non-default username, and mandatory TOTP MFA. |
| **VULN-04** | **HIGH** | **Proxy IP Exhaustion & Global Rate Limit Bottleneck (`10 req / 60s`)** | Next.js proxies `/api/v1/:path*` to NestJS. If NestJS `ThrottlerModule` reads the socket IP instead of a verified `CF-Connecting-IP` / `X-Forwarded-For` header, **all users share the Next.js server's IP**, causing the entire website to lock up after 10 requests per minute! Conversely, trusting `X-Forwarded-For` blindly allows attackers to spoof IPs. Also, 10 req/min breaks live catalog filtering on `/buy`. | Configure Express `app.set('trust proxy', 1)`, restrict NestJS ingress strictly to the Next.js internal network/Cloudflare IP ranges, move rate-limiting state to **Redis**, and split tiers: **Public Read (120 req/min)**, **Write/Forms (10 req/min)**, **Auth/OTP (5 req/15min)**. |
| **VULN-05** | **HIGH** | **`BotProtectionMiddleware` Breaking Webhooks & SEO Crawlers** | Rejecting requests based on a static User-Agent list (`python-requests`, `scrapy`) is bypassed in one line of code by real scrapers, while strict `Origin` / `Sec-Fetch-Site` checks will block legitimate server-to-server **Razorpay webhooks** (which originate from Razorpay's servers, not `ecofone.co.in`) and headless SEO/OpenGraph crawlers. | Whitelist `/api/v1/ecommerce/webhook/razorpay` from `Origin`/`Sec-Fetch-Site` checks (rely strictly on HMAC signature validation). Offload bot verification to **Cloudflare Bot Management + Turnstile** so verified search engine bots (`Googlebot`, `Bingbot`) pass via ASN/rDNS verification. |
| **VULN-06** | **HIGH** | **100KB Global Body Limit vs. Resume & Media Uploads** | The gateway enforces a global `100kb Body Limit`, yet `CareerModule` and `CmsModule` upload PDF resumes and store imagery to Cloudflare R2. Either uploads over 100KB fail in production, or multipart endpoints bypass the limit and expose the Node.js event loop to memory exhaustion and malicious file uploads. | Keep the 100KB JSON limit on the API, but stop proxying file binaries through NestJS. Issue **Cloudflare R2 Presigned PUT URLs** (restricted by MIME type, magic-byte validation worker, and 5MB max Content-Length) so browsers upload directly to R2. |
| **VULN-07** | **MEDIUM** | **Client-Side Certificate Forgery (`jsPDF` + `html2canvas`)** | Rendering official Ecovista internship/experience certificates (`EVG-INT-2026-XXXX`) in the client browser via `html2canvas` and `jsPDF` allows anyone to edit the DOM in Chrome DevTools before clicking "Download", producing a forged PDF with fake dates or titles. | Generate PDFs server-side (or via a Cloudflare Worker) using `@react-pdf/renderer` or `pdf-lib`, embed a **cryptographically signed QR code** pointing to `https://ecofone.co.in/verify-certificate?id=EVG-INT-2026-XXXX`, and cache the immutable PDF in Cloudflare R2. |
| **VULN-08** | **MEDIUM** | **Vulnerable `SheetJS (xlsx 0.18.5)` & Client-Side PII Dump** | `xlsx@0.18.5` has unpatched Prototype Pollution and ReDoS vulnerabilities (`CVE-2023-30533`, `CVE-2024-22363`). Additionally, client-side Excel generation forces the API to send bulk unpaginated PII (applicant resumes, phone numbers) to the browser. | Remove `xlsx@0.18.5` completely (use only `exceljs` or server-side streaming CSV/XLSX generation). Stream exports from NestJS with mandatory `SystemLog` audit entries and RBAC checks. |
| **VULN-09** | **MEDIUM** | **Dual-Sync Local JSON Fallback Split-Brain (`/data/*.json`)** | Falling back to `/data/*.json` on `/api/contact` or `/api/stores` during DB downtime creates split-brain state: contact leads written to local container disk are lost on the next deployment, and stale catalog/store JSON data misleads users. | Replace local file writes with **Redis Stale-While-Revalidate (SWR) cache** for read endpoints (`/stores`, `/cms/content`), and queue failed write payloads (`/contact`) into Redis/Dead-Letter Queue (DLQ) for automatic replay when PostgreSQL recovers. |
| **VULN-10** | **MEDIUM** | **Recursive Custom `XssMiddleware` Corruption & CPU Spike** | Recursively stripping HTML tags across all `req.body` strings breaks valid Markdown/HTML inside CMS blog posts (`/blog/[slug]`), silently alters passwords containing `<` or `>`, and risks call-stack exhaustion on deeply nested JSON payloads. | Replace naive regex stripping with **DOMPurify (`isomorphic-dompurify`)** applied strictly via declarative `@SanitizeHtml()` DTO decorators on user-facing text fields—never on password fields or raw HMAC payloads. |
| **VULN-11** | **MEDIUM** | **Synchronous Zoho SMTP Blocking Next.js Route Handlers** | Dispatching emails directly from Next.js API routes (`NextAPI --> Zoho Port 465`) blocks HTTP responses for 2–4 seconds and drops emails if Zoho rate-limits concurrent connections during traffic spikes. | Decouple email dispatch into a **BullMQ background queue** inside NestJS (`EmailWorker`) with exponential backoff retries (`3 attempts`) and dead-letter logging. |
| **VULN-12** | **LOW-MED** | **B-Tree Composite Index on `[latitude, longitude]` for Radial Store Search** | A standard PostgreSQL B-Tree composite index on `[latitude, longitude]` cannot perform true radial Haversine/KNN proximity sorting without scanning rows after the latitude range filter. | Enable PostgreSQL `PostGIS` (or `cube` + `earthdistance`) and create a **spatial `GIST` index** on store coordinates for sub-millisecond radius queries. |

---

## 1.2 SEO-Safe DDoS Mitigation, Load Offloading, Database & Backend Optimization

To ensure **EcoFone (`ecofone.co.in`)** achieves top Google rankings across India while surviving DDoS attacks, scraper swarms, and flash-sale spikes without compromising a single security guardrail:

### 1. How to Stop DDoS & Scrapers Without Hurting SEO (Verified Bot Architecture)

* **Layer 1: Cloudflare Anycast Edge + Verified Bot Allowlisting:**
  * Never block bots using naive `User-Agent` substring matching in NestJS. Instead, place Cloudflare WAF in front of `ecofone.co.in`.
  * Configure WAF rule: `If (cf.bot_management.verified_bot) Then ALLOW`. Cloudflare cryptographically verifies `Googlebot`, `Bingbot`, `Applebot`, `LinkedInBot`, and `WhatsApp` via **Reverse DNS (rDNS) and ASN ownership**, guaranteeing 0% false positives for SEO crawlers while blocking fake "Googlebot" scrapers at the edge.
* **Layer 2: Cloudflare Turnstile on High-Cost Interactive Wizards:**
  * Embed **Cloudflare Turnstile (Non-Intrusive / Invisible Mode)** on `/sell` (trade-in quote calculation), `/contact`, `/careers`, and `/franchise`. It requires zero visual puzzle solving for real humans, passes Core Web Vitals, and stops automated form spam and price-scraping bots before they ever hit NestJS.
* **Layer 3: Origin Cloaking (Authenticated Origin Pulls + Strict Firewall):**
  * Lock down port `443` (Next.js) and port `4012` (NestJS) using cloud security groups so the origin server **only accepts traffic from Cloudflare IP ranges** via Mutual TLS (mTLS Authenticated Origin Pulls). Attackers cannot bypass the CDN/WAF by hitting the raw server IP.

### 2. Server Load Offloading & Backend Optimization

* **95% Read Offloading via Next.js 15 ISR + On-Demand Tag Revalidation:**
  * All 77 public routes (`/`, `/buy`, `/blog/[slug]`, `/stores`, `/franchise`, `/faq`) are served from edge/ISR cache (`s-maxage=3600, stale-while-revalidate=86400`).
  * When an Admin updates a product price, blog post, or store in `/admin`, NestJS fires a signed webhook to Next.js `/api/revalidate` (`revalidateTag('catalog')`, `revalidateTag('stores')`), updating the static cache in `< 100ms` with **zero continuous database load**.
* **Redis Multi-Tier Caching (`ioredis`):**
  * Cache filtered catalog queries (`eco:catalog:{hash(queryParams)}`) for 5 minutes and CMS/Store payloads (`eco:cms:stores`) for 1 hour in Redis.
  * Automatically invalidate keys inside NestJS `EcommerceService` and `CmsService` mutations.
* **Event-Loop Protection in NestJS:**
  * Offload CPU/IO-heavy operations—Zoho SMTP emails, server-side Certificate PDF generation, R2 image optimization, and Excel exports—to **BullMQ worker threads**.
  * Migrate from standard `express` adapter to **Fastify (`@nestjs/platform-fastify`)** or keep Express tuned with `compression` (Brotli/Gzip at NGINX/Cloudflare level) and **Pino structured JSON logging** (replacing synchronous `console.log` calls which block the Node.js event loop under load).

### 3. Database Optimization (PostgreSQL 16 + Prisma 5.22+)

* **Connection Pooling (`PgBouncer`):**
  * Configure `DATABASE_URL` through **PgBouncer (Transaction Mode)** (`connection_limit=20` per NestJS instance, `pool_timeout=10`) while keeping `DIRECT_URL` for Prisma schema migrations.
* **High-Performance Indexing Strategy:**
  * **Full-Text & Fuzzy Catalog Search:** Add a PostgreSQL `GIN` index using `pg_trgm` on `DeviceModel.name` and `Brand.name` so `/buy` search queries execute in `< 2ms` without sequential `ILIKE '%iphone%'` table scans.
  * **Partial Indexes for Active Inventory:** Create a partial index `CREATE INDEX idx_inventory_available ON "InventoryItem" ("skuId", "storeId") WHERE status = 'AVAILABLE';`. Since sold items grow indefinitely over time, indexing *only* `AVAILABLE` items keeps checkout queries permanently fast.
  * **Spatial `GIST` Index for Store Locator:** Replace the B-Tree `[latitude, longitude]` index with a `GIST (ll_to_earth(latitude, longitude))` index for instant radial lookups on `/stores`.

### 4. Technical SEO Architecture (Zero-Compromise Ranking Engine)

* **Dynamic JSON-LD Schema Injection:**
  * `/buy` & `/buy/[slug]`: Inject `Product` + `AggregateOffer` schema (`itemCondition: "https://schema.org/RefurbishedCondition"`, live stock availability, warranty details).
  * `/stores`: Inject `MobilePhoneStore` / `LocalBusiness` schema with geo-coordinates, opening hours, and Lucknow HQ details (`505, JB Metro Heights, Kanpur Road, Lucknow – 226012`).
  * `/careers`: Inject `JobPosting` schema so open roles appear directly in **Google Jobs**.
  * `/faq` & `/blog/[slug]`: Inject `FAQPage`, `Article`, and `BreadcrumbList` schemas.

---

## 1.3 Target Tech Stack (EcoFone v3.0) & Architectural Build Order

### Future-Proof Target Tech Stack

* **Edge & Security:** Cloudflare DNS, WAF, DDoS L3/L4/L7 Protection, Bot Management, Turnstile, R2 Object Storage (Presigned URLs + Custom CDN Domain `cdn.ecofone.co.in`).
* **Frontend:** Next.js `15.5.28+` (App Router, Partial Prerendering, ISR `revalidateTag`), React `19.0.0`, TypeScript `5.6+` (Strict), Tailwind CSS `3.4+`, Lucide React.
* **Backend:** NestJS `10.x`, TypeScript `5.6+`, Pino Logger (`nestjs-pino`), BullMQ (Async Queues), `isomorphic-dompurify`, `@react-pdf/renderer`, `exceljs`.
* **Data & Caching:** PostgreSQL `16` + `PostGIS` / `pg_trgm`, PgBouncer Connection Pooler, Prisma ORM `5.22+`, Redis `7.4` (Cache + BullMQ + Rate Limiter + JWT Revocation List).
* **Integrations:** Razorpay (Orders + HMAC Webhooks), Zoho Mail SMTP (via BullMQ Worker), Google Maps Places/Routes API.

### Phased Architectural Build Order

1. **Phase 1 — Foundation, Data Model & Security Core:** Provision PostgreSQL 16 (`pg_trgm`, `earthdistance`), Redis 7, PgBouncer, and Prisma schema (`04_DATA_MODEL.md`). Implement RS256/EdDSA short-lived JWT + Redis Refresh Token rotation, Argon2id/bcrypt hashing, and RBAC guards (`10_SECURITY.md`).
2. **Phase 2 — Core Backend Engines & Async Workers:** Build `EcommerceModule` (atomic `FOR UPDATE SKIP LOCKED` reservation + 10-min BullMQ expiry worker), `TradeInModule` (valuation engine), `CertificateModule` (server-side QR-signed PDF), and `CmsModule` (R2 Presigned URLs + Redis SWR cache).
3. **Phase 3 — Frontend App Router, ISR & SEO Layer:** Build Next.js 15 pages with `revalidateTag` webhooks, JSON-LD structured data, dynamic `sitemap.ts`, and Turnstile-protected interactive forms (`08_UI_SPEC.md`).
4. **Phase 4 — Edge Hardening, CI/CD & E2E Verification:** Configure Cloudflare WAF rules, GitHub Actions CI/CD pipelines (`12_GITHUB_ACTIONS.md`), Playwright E2E revenue tests (`13_TESTING.md`), and execute the Production Go-Live Checklist (`14_PRODUCTION_CHECKLIST.md`).

---

# PART 2 — COMPLETE `brain/` ENGINEERING DOCUMENTATION SUITE (18 FILES)

Here are all **18 Markdown specification files** indicated in the reference directory structure (`brain/00_MASTER_RULES.md` through `brain/17_DECISIONS.md`), engineered specifically for the **EcoFone (`ecofone.co.in`)** monorepo.

---

## File 1: `brain/00_MASTER_RULES.md`

````markdown
# 00_MASTER_RULES.md — EcoFone Engineering & AI Agent Constitution
**Project:** EcoFone Official Portal (`ecofone.co.in`)  
**Parent Entity:** Ecovista Global Private Limited (CIN: U70109UP2020PTC138839)  
**Architecture:** Next.js 15.5+ (Frontend) + NestJS 10 (Backend) + PostgreSQL 16 + Redis 7  

---

## 1. Purpose of the `/brain` Directory
This directory is the **Single Source of Truth (SSOT)** for both human engineers and AI coding agents working on the EcoFone monorepo. Before modifying any file in `frontend/` or `backend/`, you MUST read and obey the constraints defined across `00_MASTER_RULES.md` through `17_DECISIONS.md`.

## 2. Non-Negotiable Coding & Architectural Commandments

### 2.1 Type Safety & Validation
1. **Zero `any` Policy:** TypeScript `strict: true` is enforced across `frontend/` and `backend/`. `npx tsc --noEmit` must pass with **0 errors** before any commit.
2. **Strict DTO Boundary:** Every NestJS controller endpoint MUST validate inputs using `class-validator` and `class-transformer` DTOs with global `ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true })`.
3. **Environment Validation:** Never read `process.env.*` directly in services. Use a typed `ConfigService` validated via Zod or Joi at application bootstrap.

### 2.2 Security Guardrails (Zero Compromise)
1. **No Hardcoded Secrets or Plaintext Fallbacks:** Never commit API keys, JWT secrets, or fallback passwords (e.g., `MASTER_ADMIN_PASSWORD` is strictly forbidden).
2. **Timing-Safe Comparisons:** All cryptographic HMAC checks (Razorpay webhooks, internal revalidation tokens) MUST use `crypto.timingSafeEqual` with prior byte-length verification.
3. **Password & Token Hygiene:** Enforce a 72-to-128 byte maximum password input ceiling prior to hashing. Issue short-lived Access Tokens (15m) + `HttpOnly; Secure; SameSite=Strict` Refresh Tokens (7d) backed by Redis revocation.
4. **File Uploads via Presigned URLs Only:** Never stream binary resumes or high-res images through the NestJS API body. Generate Cloudflare R2 Presigned PUT URLs with strict MIME/size constraints.
5. **XSS & Input Sanitization:** Apply `isomorphic-dompurify` via field-level `@SanitizeHtml()` decorators on rich-text/string DTO fields; never run destructive regex stripping on passwords or webhook signatures.

### 2.3 Database & Performance Rules
1. **No In-Memory Filtering:** All catalog searches, pagination (`take`/`skip` or cursor), and aggregations MUST execute inside PostgreSQL via Prisma `where` clauses.
2. **Atomic Inventory Locks:** Any transition of `InventoryItem` (`AVAILABLE` -> `RESERVED` -> `SOLD`) MUST run inside an interactive Prisma transaction with row locking and a 10-minute BullMQ expiration job.
3. **Dynamic Imports for Heavy Libraries:** Libraries > 50KB (`exceljs`, `@react-pdf/renderer`, map SDKs) must never be statically imported in client entry bundles.
4. **Asynchronous Side Effects:** SMTP emails (Zoho Mail), PDF generation, and audit webhook dispatches must be queued via BullMQ + Redis—never blocking the HTTP response cycle.

### 2.4 SEO & Crawlability Preservation
1. **Server-Rendered Public Pages:** All customer-facing pages (`/`, `/buy`, `/sell`, `/stores`, `/franchise`, `/blog/[slug]`, `/careers`, `/faq`) must render indexable HTML via SSR/ISR (`revalidateTag`) and inject valid JSON-LD structured data.
2. **Bot Protection Separation:** Never block search engine crawlers via naive User-Agent filters in application middleware; rely on Cloudflare Verified Bot ASN/rDNS rules and Turnstile tokens on mutation endpoints.
````

> **Note:** Section 2.5 (AWS & Container Deployment Commandments) is appended to this file — see Part 3, Section 3.2.

---

## File 2: `brain/01_PRD.md`

````markdown
# 01_PRD.md — Product Requirements Document (EcoFone v3.0)
**Product Name:** EcoFone Circular Re-Commerce & Franchise Portal (`ecofone.co.in`)  
**Owner:** Ecovista Global Private Limited (Lucknow HQ, Uttar Pradesh, India)  
**Target Market:** Pan-India B2C (Refurbished Smartphone Buyers/Sellers) & B2B (Franchise Investors, Internship/Staff Verification)  

---

## 1. Product Vision & Strategic Objectives
EcoFone bridges the trust deficit in India's ₹70,000+ Crore refurbished smartphone and repair market by combining **32-point certified device refurbishment**, **instant transparent trade-ins**, **6-month store warranties with a 3-day replacement window**, and a scalable **FICO/FOCO physical retail franchise network**.

### Core KPIs & Business Goals
- **Conversion Rate:** > 3.5% on `/buy` catalog checkouts and > 18% completion rate on the `/sell` 5-step trade-in wizard.
- **Franchise Lead Generation:** Capture, qualify, and calculate ROI for prospective Kiosk, Shop-in-Shop (SIS), and Exclusive Experience Store partners.
- **Organic Search Dominance:** Achieve Page-1 rankings for "buy refurbished phones India", "sell used phone instant cash", and "mobile store franchise India" with Core Web Vitals passing across 100% of 77+ routes.
- **Operational Uptime:** 99.95% availability with zero overselling on single-IMEI refurbished inventory.

---

## 2. User Personas & Core Journeys

| Persona | Primary Needs | Key Portal Flows |
| :--- | :--- | :--- |
| **1. Value-Conscious Buyer** | Certified refurbished phone, transparent cosmetic grading (`Superb`, `Good`, `Fair`), 6-month warranty, UPI/EMI checkout. | `/buy` -> Filter by Brand/RAM/Storage/Grade -> Reserve IMEI -> Razorpay Checkout -> Order Confirmation Email. |
| **2. Device Seller (Trade-In)** | Instant, fair buyback quote based on device age, screen health, and functional defects; doorstep pickup or store drop-off. | `/sell` -> Select Brand/Model/Variant -> 5-Step Diagnostic Wizard -> Instant Quote Lock -> Pickup Scheduling. |
| **3. Franchise Investor** | Clear capital requirements (₹20L–₹25L), FICO vs. FOCO comparison, payback period (18–30 months), ROI calculator. | `/franchise` -> Interactive ROI Calculator -> Tier Selection -> Submit Application -> HR/BD Email & Admin CRM Tracking. |
| **4. Repair & Warranty Customer** | Fast screen/battery replacement with 90-day spare warranty, nearby physical store directions. | `/services` & `/stores` -> GPS Nearest Store Locator -> Book Diagnostic / View Google Maps Route. |
| **5. Employer / Credential Verifier** | Instant tamper-proof verification of Ecovista internship/employment certificates (`EVG-INT-2026-XXXX`). | `/verify-certificate` -> Enter Credential ID / Scan QR -> View Verified Metadata & Download Signed PDF. |
| **6. Master Admin & Sub-Admins** | Granular RBAC management over inventory, orders, franchise leads, job applicants, blogs, stores, and security audit logs. | `/admin` -> Authenticated Console -> Manage 12 Domain Modules -> Export Audited Reports. |

---

## 3. Functional Scope by Module
1. **Refurbished E-Commerce (`/buy`):** Faceted filtering, real-time stock status per SKU/Store, 10-minute atomic cart reservation, Razorpay payment verification.
2. **Trade-In Valuation Engine (`/sell`):** Base price lookup minus algorithmic deduction weights (screen cracks, battery < 80%, motherboard/camera faults, missing box/charger).
3. **Franchise Acquisition Portal (`/franchise`):** Dynamic CAPEX/OPEX simulator for Kiosk, SIS, and Exclusive Stores; automated lead capture and status pipeline (`PENDING`, `APPROVED`, `REJECTED`).
4. **Store Locator (`/stores`):** PostGIS radial proximity search + interactive map routing.
5. **Credential Verification (`/verify-certificate`):** Public verification portal checking recipient name, tenure, CIN (`U70109UP2020PTC138839`), and signatory (`Rahul Verma`).
6. **Careers & ATS (`/careers`):** Job board, direct-to-R2 resume upload, applicant status workflow, and Excel export.
7. **Unified Enterprise CMS & RBAC (`/admin`):** 13 granular permission scopes (`franchise`, `contact`, `stores`, `team`, `logs`, `security`, `reviews`, `certificates`, `brands`, `services`, `research`, `careers`, `blogs`).
````

---

## File 3: `brain/02_TRD.md`

````markdown
# 02_TRD.md — Technical Requirements Document
**System:** EcoFone Monorepo (`frontend/` + `backend/`)  
**Compliance & SLAs:** 99.95% Uptime | P95 API Latency < 120ms | LCP < 1.8s | RPO < 1h | RTO < 15m  

---

## 1. Non-Functional Requirements (NFRs)

### 1.1 Performance & Scalability Benchmarks
- **Frontend Bundle Ceiling:** First-load JS on any public route MUST remain `< 95 KB` gzipped; Admin console initial shell `< 75 KB` via dynamic `import()` code-splitting.
- **API Throughput:** Public read endpoints (`/api/v1/ecommerce/catalog`, `/api/v1/cms/*`) must sustain **2,500 req/sec** via Cloudflare Edge + Redis SWR caching without saturating PostgreSQL.
- **Database Latency:** 95th percentile (`P95`) SQL execution time `< 15ms` for indexed catalog and store queries; connection pool managed via PgBouncer supporting up to 500 concurrent app connections mapped to 40 PostgreSQL server connections.

### 1.2 Availability, Caching & Resilience
- **Stale-While-Revalidate (SWR) Resilience:** Replace local `/data/*.json` filesystem writes with a **2-tier Redis + Next.js ISR cache**. If PostgreSQL undergoes maintenance, read endpoints serve cached Redis/ISR payloads seamlessly while write endpoints (`/contact`, `/franchise`) buffer payloads in a Redis stream (`eco:dlq:writes`) for guaranteed replay.
- **Cold-Start Reconnection:** `PrismaService` implements exponential backoff retry (`maxRetries: 3`, `initialDelay: 250ms`) with a deep `/api/v1/health` probe monitoring DB, Redis, and R2 latency.

### 1.3 SEO & Core Web Vitals Technical Mandate
- **Core Web Vitals:** LCP `< 1.8s`, INP `< 100ms`, CLS `< 0.05` across mobile and desktop viewports.
- **Rendering Strategy:**
  - **SSG + ISR (`revalidateTag`):** `/`, `/about`, `/services`, `/franchise`, `/faq`, `/terms-and-conditions`, `/blog`, `/blog/[slug]`, `/stores`, `/careers`.
  - **SSR + Edge Streaming (PPR):** `/buy` (dynamic query filters with static shell).
  - **CSR (Protected):** `/admin` (authenticated RBAC console, `robots: noindex, nofollow`).
- **Automated Sitemap & Robots:** Next.js `app/sitemap.ts` dynamically generates URLs for all 77+ static routes, active SKUs, and blog slugs.

---

## 2. System Constraints & Guardrails
- **Request Payload Limits:**
  - Standard JSON/URL-encoded API routes: **`100 KB` hard ceiling**.
  - CMS Blog Markdown payloads (`/api/v1/cms/blogs`): **`500 KB` ceiling** (Admin-authenticated only).
  - Resume & Media Uploads: Direct browser-to-Cloudflare R2 upload via Presigned URLs (**`5 MB` max for PDFs**, **`2 MB` max for WebP/AVIF images**).
- **Concurrency & Isolation:**
  - Inventory checkout reservations MUST execute using `SELECT id FROM "InventoryItem" WHERE "skuId" = $1 AND status = 'AVAILABLE' LIMIT 1 FOR UPDATE SKIP LOCKED` inside a Prisma transaction.
````

---

## File 4: `brain/03_ARCHITECTURE.md`

`````markdown
# 03_ARCHITECTURE.md — System Architecture & Build Order
**Pattern:** Modular Monorepo (Next.js 15 App Router + NestJS 10 Domain-Driven API + Redis/BullMQ + PostgreSQL 16)  

---

## 1. High-Level Production Topology

```mermaid
graph TD
    subgraph Edge Security & CDN [Cloudflare Enterprise Edge]
        CF_DNS["Cloudflare Anycast DNS & L3/L4 DDoS Shield"]
        CF_WAF["Cloudflare WAF + Verified Bot Allowlist + Turnstile"]
        CF_CDN["Edge Cache (Static Assets & ISR HTML)"]
    end

    subgraph Frontend Tier [Next.js 15.5.28 / React 19]
        NextSSR["Next.js App Router (SSR / ISR / PPR - 77+ Routes)"]
        NextReval["On-Demand Revalidation Webhook (/api/revalidate)"]
    end

    subgraph Backend Tier [NestJS 10 API - Port 4012]
        Ingress["Fastify/Express Gateway + Helmet + mTLS + 100KB Limit"]
        Guards["Redis Throttler + RBAC Guard + DOMPurify Pipe"]
        Modules["12 Domain Modules (Ecommerce, TradeIn, Franchise, CMS, Auth, etc.)"]
        BullWorker["BullMQ Background Workers (Email, PDF, Reservation Expiry)"]
    end

    subgraph Data, Cache & External Services
        Redis[("Redis 7.4 (Cache, Rate Limit, BullMQ, JWT Denylist)")]
        PgBouncer["PgBouncer Connection Pooler"]
        Postgres[("PostgreSQL 16 (PostGIS + pg_trgm)")]
        R2["Cloudflare R2 (Presigned Uploads & Signed PDFs)"]
        Razorpay["Razorpay Gateway & HMAC Webhooks"]
        Zoho["Zoho Mail SMTP (Port 465 SSL)"]
    end

    CF_DNS --> CF_WAF --> CF_CDN
    CF_CDN --> NextSSR
    CF_WAF -->|/api/v1/*| Ingress
    Ingress --> Guards --> Modules
    Modules --> Redis
    Modules --> PgBouncer --> Postgres
    Modules --> BullWorker
    BullWorker --> Zoho
    BullWorker --> R2
    BullWorker -->|Invalidate Tags| NextReval
    Modules --> Razorpay
```

---

## 2. Monorepo Directory Structure

```text
ecofone-monorepo/
├── brain/                          # 00_MASTER_RULES.md .. 17_DECISIONS.md (Engineering SSOT)
├── frontend/                       # Next.js 15.5.28 + React 19 + Tailwind CSS 3.4
│   ├── app/                        # 77+ App Router pages, layouts, sitemap.ts, robots.ts
│   ├── components/                 # UI primitives, SEO JSON-LD injectors, Turnstile widget
│   ├── lib/                        # API client, RS256/HMAC token verifier, formatting utils
│   └── public/                     # Optimized static vectors, favicons, manifest.json
├── backend/                        # NestJS 10.0.0 Enterprise API (Port 4012)
│   ├── prisma/
│   │   ├── schema.prisma           # 17 relational models + PostGIS & pg_trgm indexes
│   │   └── migrations/             # Deterministic SQL migration history
│   └── src/
│       ├── main.ts                 # Bootstrap, Helmet, CORS, Pino logger, ValidationPipe
│       ├── app.module.ts           # Root wiring of 12 domain modules + Redis/BullMQ
│       ├── common/                 # Guards, Interceptors, Exception Filters, Decorators
│       ├── queues/                 # BullMQ processors (email, reservation-ttl, pdf-gen)
│       └── [12-domain-modules]/    # auth, ecommerce, tradein, franchise, cms, career,
│                                   # certificate, contact, research, sub-admin, system-log, health
└── docker-compose.prod.yml         # Container orchestration (Next, Nest, Postgres, Redis, PgBouncer)
```

---

## 3. Architectural Build Order (Dependency Graph)

1. **Step 1 — Infrastructure & Data Layer:** Spin up PostgreSQL 16 (with `pg_trgm` and `earthdistance`), PgBouncer, and Redis 7. Run Prisma migrations (`04_DATA_MODEL.md`).
2. **Step 2 — Core Cross-Cutting Concerns (`backend/src/common/`):** Implement Pino structured logging, Global Exception Filter (`09_ERROR_HANDLING.md`), Redis Rate Limiter, RS256 Auth Guard, and `SystemLogService`.
3. **Step 3 — Foundational Auth & RBAC (`auth`, `sub-admin`, `system-log`):** Build Admin/Sub-Admin authentication, Refresh Token rotation, and the 13-permission RBAC guard.
4. **Step 4 — Storage & Async Workers (`queues`, `cms`):** Implement Cloudflare R2 Presigned URL service, BullMQ Zoho SMTP worker, and Server-Side Certificate PDF worker.
5. **Step 5 — Revenue & Lead Engines (`ecommerce`, `tradein`, `franchise`, `certificate`, `career`, `contact`):** Build atomic checkout reservation, Razorpay webhook verification, trade-in quote calculator, and franchise ROI engine.
6. **Step 6 — Next.js 15 Frontend & SEO Layer (`frontend/`):** Build public SSR/ISR routes, JSON-LD injectors, Turnstile integration, and the lazy-loaded `/admin` console.
`````

---

## File 5: `brain/04_DATA_MODEL.md`

`````markdown
# 04_DATA_MODEL.md — PostgreSQL 16 & Prisma Schema Specification
**ORM:** Prisma `5.22+` | **Database:** PostgreSQL `16` | **Extensions:** `pg_trgm`, `cube`, `earthdistance`  

---

## 1. Entity-Relationship Overview (17 Core Models)
1. **Identity & RBAC:** `User`, `SubAdmin`, `RefreshToken`, `SystemLog`, `SystemSetting`
2. **Catalog & Inventory:** `Brand`, `DeviceModel`, `DeviceVariant`, `SKU`, `InventoryItem`, `Store`
3. **Orders & Trade-In:** `Order`, `OrderItem`, `TradeInQuote`
4. **Growth, HR & CMS:** `FranchiseApplication`, `CareerJob`, `CareerApplication`, `Certificate`, `ContactMessage`, `BlogPost`, `ResearchArticle`, `CustomerReview`, `TeamMember`

---

## 2. Production Hardened `schema.prisma` (Key Models & Indexes)

```prisma
datasource db {
  provider   = "postgresql"
  url        = env("DATABASE_URL") // PgBouncer pooled connection
  directUrl  = env("DIRECT_URL")   // Direct connection for migrations
  extensions = [pg_trgm, cube, earthdistance]
}

generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["postgresqlExtensions"]
}

enum InventoryStatus {
  AVAILABLE
  RESERVED
  SOLD
  DEFECTIVE
}

enum OrderStatus {
  PENDING
  PAID
  FAILED
  EXPIRED
  REFUNDED
}

enum CosmeticGrade {
  SUPERB
  GOOD
  FAIR
}

model SubAdmin {
  id           String   @id @default(cuid())
  username     String   @unique
  passwordHash String   // Argon2id or bcrypt (12 rounds)
  role         String   @default("SUB_ADMIN") // MASTER_ADMIN | SUB_ADMIN
  permissions  String[] // ['franchise','contact','stores','team','logs','security','reviews','certificates','brands','services','research','careers','blogs']
  mfaSecret    String?
  isActive     Boolean  @default(true)
  lastLoginAt  DateTime?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Brand {
  id        String        @id @default(cuid())
  name      String        @unique
  slug      String        @unique
  logoUrl   String?
  models    DeviceModel[]
  @@index([name(ops: raw("gin_trgm_ops"))], type: Gin)
}

model DeviceModel {
  id             String          @id @default(cuid())
  brandId        String
  brand          Brand           @relation(fields: [brandId], references: [id])
  name           String
  slug           String          @unique
  baseTradeInInr Int             // Base buyback valuation in INR
  variants       DeviceVariant[]
  @@index([brandId])
  @@index([name(ops: raw("gin_trgm_ops"))], type: Gin)
}

model DeviceVariant {
  id        String @id @default(cuid())
  modelId   String
  model     DeviceModel @relation(fields: [modelId], references: [id])
  ramGb     Int
  storageGb Int
  color     String
  skus      SKU[]
  @@index([modelId, ramGb, storageGb])
}

model SKU {
  id            String          @id @default(cuid())
  skuCode       String          @unique
  variantId     String
  variant       DeviceVariant   @relation(fields: [variantId], references: [id])
  grade         CosmeticGrade
  priceInr      Int             // Selling price in INR
  mrpInr        Int
  warrantyMonths Int            @default(6)
  inventory     InventoryItem[]
  orderItems    OrderItem[]
  @@index([variantId, grade, priceInr])
}

model InventoryItem {
  id              String          @id @default(cuid())
  skuId           String
  sku             SKU             @relation(fields: [skuId], references: [id])
  storeId         String
  store           Store           @relation(fields: [storeId], references: [id])
  imei            String          @unique
  batteryHealthPct Int
  status          InventoryStatus @default(AVAILABLE)
  reservedUntil   DateTime?       // Populated with NOW() + 10 mins upon checkout
  orderItem       OrderItem?
  updatedAt       DateTime        @updatedAt
  @@index([skuId, status, reservedUntil])
  @@index([storeId, status])
}

model Store {
  id          String          @id @default(cuid())
  name        String
  slug        String          @unique
  city        String
  state       String
  address     String
  pincode     String
  phone       String
  latitude    Float
  longitude   Float
  tier        String          // KIOSK | SIS | EXCLUSIVE
  isActive    Boolean         @default(true)
  inventory   InventoryItem[]
  @@index([city, isActive])
  @@index([latitude, longitude]) // Paired with custom SQL GIST earthdistance index in migration
}

model Certificate {
  id             String   @id @default(cuid())
  credentialCode String   @unique // Format: EVG-INT-2026-XXXX
  recipientName  String
  roleTitle      String
  department     String
  startDate      DateTime
  endDate        DateTime
  cinNumber      String   @default("U70109UP2020PTC138839")
  signatoryName  String   @default("Rahul Verma")
  pdfR2Key       String?  // Server-rendered immutable PDF stored in Cloudflare R2
  signatureHash  String   // HMAC-SHA256 tamper-proof digest of credential fields
  issuedAt       DateTime @default(now())
  @@index([credentialCode])
}
```

## 3. Custom SQL Migration Optimizations

Every deployment executes the following raw PostgreSQL optimizations in `migrations/999_performance_indexes/migration.sql`:

```sql
-- 1. Partial Index for fast checkout lookup of only AVAILABLE stock
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_inventory_available_partial
ON "InventoryItem" ("skuId", "storeId")
WHERE status = 'AVAILABLE';

-- 2. Spatial GIST Index for sub-millisecond nearest store lookup
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_store_earthdistance_gist
ON "Store" USING GIST (ll_to_earth(latitude, longitude))
WHERE "isActive" = true;
```
`````

---

## File 6: `brain/05_DATA_SOURCES.md`

````markdown
# 05_DATA_SOURCES.md — Internal & External Data Sources Registry
**Project:** EcoFone Official Portal (`ecofone.co.in`)  

---

## 1. Primary Authoritative Data Sources

| Source ID | System / Provider | Protocol / SDK | Data Owned | Caching & Fallback Policy |
| :--- | :--- | :--- | :--- | :--- |
| **DS-01** | **PostgreSQL 16 (`ecofone`)** | Prisma 5.22 via PgBouncer | Users, SKUs, IMEIs, Orders, Trade-In Quotes, Franchise Leads, Certificates, Audit Logs. | Primary System of Record. Cached in Redis (TTL 5m–60m). Daily `pg_dump` encrypted snapshots to R2. |
| **DS-02** | **Redis 7.4 Cluster** | `ioredis` / BullMQ | Catalog SWR cache, Rate-limit counters, JWT revocation denylist, Async job queues, Write DLQ. | Ephemeral + AOF persistence (`appendfsync everysec`). |
| **DS-03** | **Cloudflare R2 Object Store** | `@aws-sdk/client-s3` | Candidate PDF resumes, signed Certificate PDFs, Store/Product WebP media. | Served via `cdn.ecofone.co.in` with `Cache-Control: public, max-age=31536000, immutable`. |
| **DS-04** | **Razorpay Payment API** | REST + HMAC-SHA256 Webhook | Order creation (`order_id`), UPI/Card/EMI capture status, settlement webhooks. | Verified via `crypto.timingSafeEqual` on `X-Razorpay-Signature`. Reconciled via cron poll if webhook delayed > 5m. |
| **DS-05** | **Zoho Mail Enterprise SMTP** | Nodemailer (`smtp.zoho.in:465` SSL) | Transactional order receipts, franchise pitch decks, HR applicant alerts. | Queued via BullMQ (`EmailQueue`) with 3 exponential retries. |
| **DS-06** | **Google Maps Platform** | Maps JS API + Geocoding | Store coordinates, interactive map pins, driving directions from user GPS. | Coordinates pre-geocoded and persisted in PostgreSQL `Store` table (`latitude`, `longitude`) on store creation to eliminate runtime geocoding costs. |

---

## 2. Data Sync & Cache Invalidation Matrix

| Data Entity | Redis Cache Key Pattern | Redis TTL | Next.js ISR Tag | Invalidation Trigger |
| :--- | :--- | :--- | :--- | :--- |
| **Refurbished Catalog** | `eco:catalog:v1:{queryHash}` | `300s` (5m) | `catalog` | Order checkout, SKU price update, IMEI status change. |
| **Physical Stores** | `eco:stores:active:all` | `3600s` (1h) | `stores` | Admin creates/updates/deactivates a Store in `CmsModule`. |
| **CMS Content & FAQs** | `eco:cms:bundle:v1` | `3600s` (1h) | `cms-content` | Admin modifies Testimonials, Team, Brands, or FAQs. |
| **Blog & Research Posts**| `eco:blog:slug:{slug}` | `86400s` (24h)| `blog-{slug}` | Admin publishes or edits a Markdown article. |
| **Certificates** | `eco:cert:{credentialCode}` | `86400s` (24h)| N/A (Dynamic API)| Admin issues or revokes a credential in `CertificateModule`. |
````

---

## File 7: `brain/06_SCRAPING_SPEC.md`

````markdown
# 06_SCRAPING_SPEC.md — Market Price Intelligence Ingestion & Anti-Scraping Defense Spec
**Project:** EcoFone Official Portal (`ecofone.co.in`)  

---

## Part A: Outbound Market Price Intelligence Worker (Internal Pricing Engine)
To keep EcoFone's `/sell` trade-in buyback quotes and `/buy` refurbished selling prices competitive across India without manual entry across 500+ smartphone variants, an isolated background worker ingests public benchmark pricing daily.

### 1. Architecture & Isolation Rules
- **Strict Separation:** The price intelligence worker runs as an isolated scheduled job (`02:30 AM IST` daily via BullMQ Cron) and NEVER runs inside user-facing request threads.
- **Target Benchmarks:** Publicly listed GSMArena device specifications (launch date, RAM/Storage tiers, model numbers) and aggregated Indian re-commerce market index feeds.
- **Validation Pipeline:**
  1. Fetch normalized JSON feed per `Brand` + `DeviceModel`.
  2. Calculate suggested `baseTradeInInr` and `priceInr` delta.
  3. **Circuit Breaker Guardrail:** If any automated market price delta exceeds **±15%** from the current database price, flag the SKU in `/admin` (`PriceAnomalyAlert`) for manual Master Admin approval instead of auto-updating.

---

## Part B: Inbound Anti-Scraping & Crawler Governance (Protecting EcoFone Data)
Competitors frequently attempt to scrape EcoFone's `/buy` catalog prices, `/sell` trade-in valuation matrix, and `/verify-certificate` database.

### 1. Multi-Layered Anti-Scraper Defense
1. **SEO Crawler Allowlisting (Zero SEO Penalty):**
   - Verified search engines (`Googlebot`, `Bingbot`, `Applebot`, `DuckDuckBot`, `LinkedInBot`) are permitted via **Cloudflare ASN + Reverse DNS verification** (`cf.bot_management.verified_bot`).
   - Public `/buy` and `/blog` HTML is fully indexable.
2. **Trade-In Matrix Protection (`/api/v1/tradein/quote`):**
   - Do NOT expose the full deduction formula weights in client-side JavaScript bundles.
   - The 5-step wizard submits answers alongside a single-use **Cloudflare Turnstile token** to `POST /api/v1/tradein/calculate`, returning only the final computed quote.
3. **Certificate Enumeration Prevention (`/api/v1/certificate/verify/:code`):**
   - Credential codes follow `EVG-INT-2026-XXXX` (where `XXXX` is a non-sequential 6-character alphanumeric cryptographic nano-ID in v3.0, migrating away from sequential integers).
   - Rate-limited to **5 lookups per 10 minutes per IP** via Redis sliding window to prevent brute-force enumeration of employee/intern records.
4. **Honeypot & Behavioral Trap:**
   - Hidden CSS link (`/api/v1/catalog/export-all-raw` with `display: none; aria-hidden: true`) on catalog pages (`robots.txt: Disallow: /api/v1/catalog/export-all-raw`). Any IP requesting this trap endpoint is automatically blacklisted in Redis (`eco:blacklist:ip:{ip}`) for 24 hours.
````

---

## File 8: `brain/07_API_CONTRACT.md`

`````markdown
# 07_API_CONTRACT.md — REST API Specification & Envelope Contract
**Base URL:** `https://ecofone.co.in/api/v1` (Proxied to NestJS Port `4012`)  
**Content-Type:** `application/json; charset=utf-8`  

---

## 1. Standard JSON Response Envelope
Every endpoint in the NestJS backend MUST return a deterministic envelope:

```typescript
// Success Envelope (200 OK / 201 Created)
interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta?: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
  requestId: string; // X-Correlation-ID (UUIDv4)
  timestamp: string; // ISO-8601 UTC
}

// Error Envelope (4xx / 5xx)
interface ApiErrorResponse {
  success: false;
  error: {
    code: string;      // e.g., "INVENTORY_ALREADY_RESERVED", "INVALID_CREDENTIALS"
    message: string;   // Safe, human-readable message
    details?: unknown; // Validation field errors (stripped in 500 internal errors)
  };
  requestId: string;
  timestamp: string;
}
```

---

## 2. Core Endpoint Contracts Across the 12 Modules

| Method & Path | Auth / Guard | Rate Limit | Request Payload / Query | Response & Side Effects |
| --- | --- | --- | --- | --- |
| `GET /health` | Public | 60 / min | None | Returns `{ dbStatus, dbLatencyMs, redisStatus, uptime }`. |
| `POST /auth/login` | Public + Turnstile | 5 / 15m | `{ username, password, mfaCode? }` (Password <= 128 bytes) | Sets `HttpOnly` Refresh Cookie; returns `{ accessToken, expiresIn: 900, permissions }`. |
| `POST /auth/refresh` | Cookie Guard | 20 / 15m | Reads `eco_refresh_token` cookie | Rotates refresh token in Redis; returns new `accessToken`. |
| `GET /ecommerce/catalog` | Public (Cached) | 120 / min | `?brand=apple&ram=8&storage=128&grade=SUPERB&minPrice=10000&maxPrice=50000&q=iphone&page=1&limit=12` | Paginated `SKU[]` with available stock counts per store. |
| `POST /ecommerce/checkout/initiate` | Public / User | 10 / min | `{ skuId, customerName, phone, email, shippingAddress }` | Locks 1 `AVAILABLE` IMEI -> `RESERVED` (10m TTL via BullMQ) + creates Razorpay `order_id`. |
| `POST /ecommerce/webhook/razorpay` | HMAC Guard | 300 / min | Raw JSON + `X-Razorpay-Signature` header | Verifies `timingSafeEqual` HMAC; flips Order -> `PAID`, IMEI -> `SOLD`; queues Zoho receipt. |
| `POST /tradein/quote` | Public + Turnstile | 15 / min | `{ variantId, screenCondition, bodyCondition, batteryOk, defects: string[], accessories: string[] }` | Computes deduction matrix in PostgreSQL; persists `TradeInQuote` (valid 7 days). |
| `POST /franchise/apply` | Public + Turnstile | 5 / hour | `{ fullName, phone, email, city, investmentTier: 'KIOSK'\|'SIS'\|'EXCLUSIVE', budgetInr }` | Persists application (`PENDING`), calculates projected ROI, queues HR & investor emails. |
| `GET /certificate/verify/:code` | Public | 5 / 10m | Param `code` (`EVG-INT-2026-XXXX`) | Validates `Certificate` record + `signatureHash`; returns verified metadata + signed R2 PDF URL. |
| `POST /career/presigned-url` | Public + Turnstile | 5 / hour | `{ fileName, mimeType: 'application/pdf', fileSizeBytes }` (`<= 5242880`) | Returns 5-minute Cloudflare R2 Presigned `PUT` URL + `r2ObjectKey`. |
| `POST /career/apply` | Public | 5 / hour | `{ jobId, fullName, email, phone, r2ObjectKey, coverNote }` | Verifies object exists in R2, saves `CareerApplication`, queues HR notification. |
| `GET /admin/export/:entity` | JWT + RBAC | 5 / 15m | Param `entity` (`applications` \| `franchise` \| `reviews`) | Logs action in `SystemLog`; streams `.xlsx` via `exceljs` directly from server. |
`````

---

## File 9: `brain/08_UI_SPEC.md`

````markdown
# 08_UI_SPEC.md — Design System, Component Architecture & UX Specification
**Framework:** Next.js `15.5.28` + React `19.0.0` + Tailwind CSS `3.4.0` + `lucide-react`  

---

## 1. Visual Identity & Design Tokens ("Sustainable Luxury Tech")
EcoFone blends environmental sustainability with premium consumer electronics trust:
- **Typography:**
  - **Headings (`--font-outfit`):** `Outfit` (600 SemiBold, 700 Bold) — geometric, high-contrast tech authority.
  - **Body & Data (`--font-inter`):** `Inter` (400 Regular, 500 Medium, `tabular-nums` for all INR pricing and ROI calculators).
- **Color Palette (Tailwind Theme Tokens):**
  - **Primary Brand Emerald:** `emerald-600` (`#059669`) / `emerald-500` (`#10B981`) — Circular economy & verified trust.
  - **Deep Obsidian Surface:** `slate-950` (`#020617`) / `slate-900` (`#0F172A`) — Hero sections, Franchise pitch cards, Dark-mode glassmorphism.
  - **Trust Gold Accent:** `amber-500` (`#F59E0B`) — "6-Month Warranty" badges, "32-Point Certified" seals, and star ratings.
  - **Semantic States:** Success `#10B981`, Warning `#F59E0B`, Danger `#EF4444`.

---

## 2. Key Interactive Experience Specs

### 2.1 Refurbished Catalog (`/buy`)
- **Sticky Faceted Filter Sidebar (Desktop) / Bottom Drawer (Mobile):** Instant URL search-param synchronization (`?brand=apple&grade=SUPERB`) using React 19 `useTransition` for non-blocking filter updates.
- **Cosmetic Grade Explainer Modal:** Interactive visual comparison showing exact housing/screen tolerances for `Superb` (Flawless), `Good` (Micro-scratches invisible at arm's length), and `Fair`.
- **Trust Bar on Every Product Card:** Displays `32-Point Checked`, `6-Month Store Warranty`, `3-Day Easy Exchange`, and battery health `> 85%`.

### 2.2 5-Step Trade-In Valuation Wizard (`/sell`)
1. **Step 1 (Brand & Model):** Instant debounced search (`200ms`) powered by PostgreSQL `pg_trgm`.
2. **Step 2 (Variant):** RAM / Storage pill selector.
3. **Step 3 (Display & Body):** Visual icon cards for screen touch, dead pixels, and frame dents.
4. **Step 4 (Functional Diagnostics):** Toggle grid (Cameras, Biometrics/FaceID, Battery < 80%, Speaker/Mic).
5. **Step 5 (Accessories & Instant Quote):** Original box/charger checkboxes -> Turnstile verification -> Instant animated INR payout reveal with pickup booking.

### 2.3 Franchise ROI Calculator (`/franchise`)
- Interactive sliders comparing **Kiosk (100–150 sq.ft)**, **Shop-in-Shop (SIS)**, and **Exclusive Experience Store** across **FICO (Company Operated)** and **FOCO** models, dynamically plotting monthly net profit (~₹60,000+), CAPEX (₹20L–₹25L), and payback window (18–30 months).

### 2.4 Admin Console (`/admin`)
- Strictly isolated behind server-side session verification.
- All 11 sub-managers (`BlogsManager`, `CareersManager`, `StoresManager`, `FranchiseManager`, `CertificatesManager`, etc.) are loaded via `next/dynamic` (`ssr: false`) based on the logged-in Sub-Admin's RBAC `permissions[]` array.
````

---

## File 10: `brain/09_ERROR_HANDLING.md`

````markdown
# 09_ERROR_HANDLING.md — Global Exception Handling, Resilience & Observability
**Backend Logger:** `nestjs-pino` (Structured JSON) | **Correlation Header:** `X-Correlation-ID`  

---

## 1. Correlation ID Tracing
1. Every incoming request at the Next.js edge or NestJS gateway is assigned a UUIDv4 `X-Correlation-ID` if not already present.
2. `nestjs-pino` automatically binds `requestId` to every log line emitted during that request lifecycle (including Prisma slow-query logs and BullMQ job payloads).
3. If an unhandled error occurs, the user receives the `requestId` in the UI toast so support engineers can locate the exact stack trace in `< 5 seconds`.

---

## 2. Standardized Domain Error Registry

| Error Code | HTTP Status | Trigger Condition | Client UX Recovery Behavior |
| :--- | :--- | :--- | :--- |
| `AUTH_INVALID_CREDENTIALS` | `401` | Wrong username/password or expired access token. | Clear local state; if access token expired, silently call `/api/v1/auth/refresh` once. |
| `AUTH_FORBIDDEN_SCOPE` | `403` | Sub-Admin lacks required permission (e.g., `franchise`) for the route. | Render restricted state in `/admin` and log unauthorized attempt in `SystemLog`. |
| `RATE_LIMIT_EXCEEDED` | `429` | IP or User exceeded Redis sliding-window threshold. | Read `Retry-After` header; show countdown timer on button. |
| `INVENTORY_OUT_OF_STOCK` | `409` | Concurrent user locked the last `AVAILABLE` IMEI milliseconds earlier. | Show "Just sold/reserved! Showing similar certified devices" and refresh SKU stock. |
| `PAYMENT_SIGNATURE_MISMATCH`| `400` | `crypto.timingSafeEqual` failed on Razorpay webhook/callback. | Reject transition, keep order `PENDING`, log critical security alert in `SystemLog`. |
| `CERTIFICATE_NOT_FOUND` | `404` | `EVG-INT-2026-XXXX` does not exist or `signatureHash` is invalid. | Display high-visibility red "Unverified / Invalid Credential" warning banner. |
| `UPSTREAM_DB_UNAVAILABLE` | `503` | PostgreSQL unreachable after 2 retry cycles. | Read routes serve Redis SWR cache; Write routes buffer into Redis DLQ stream and return `202 Accepted`. |

---

## 3. Global NestJS Exception Filter Rules
- **Zero Stack Trace Leaks:** In `NODE_ENV=production`, `AllExceptionsFilter` strips Prisma internal error codes (`P2002`, `P2025`, SQL table names) and raw stack traces before serializing the HTTP response.
- **Prisma Error Mapping:**
  - `P2002` (Unique constraint violation) -> Mapped to `409 Conflict` (`RESOURCE_ALREADY_EXISTS`).
  - `P2025` (Record not found) -> Mapped to `404 Not Found` (`RESOURCE_NOT_FOUND`).
````

---

## File 11: `brain/10_SECURITY.md`

`````markdown
# 10_SECURITY.md — Zero-Trust Security Architecture & Threat Remediation
**Project:** EcoFone Official Portal (`ecofone.co.in`)  

---

## 1. Threat Defense & Vulnerability Remediation Matrix

| Threat Vector | Legacy v2.0 Weakness | Hardened v3.0 Defense Implementation |
| :--- | :--- | :--- |
| **Token Compromise / Stale Admin Access** | 14-day HS256 JWT with shared secret; no revocation on termination. | **RS256 Asymmetric JWT (15m expiry)** + **7d Refresh Token** in `HttpOnly; Secure; SameSite=Strict` cookie + **Redis `jti` Revocation List**. |
| **Master Admin Env Backdoor** | Fallback to `process.env.MASTER_ADMIN_PASSWORD` with `username: admin`. | Env fallback completely excised. All admins authenticate via `SubAdmin` table using **Argon2id / bcrypt (12 rounds)** + **TOTP MFA** + non-default usernames. |
| **Bcrypt / Hash CPU Exhaustion** | Long password payloads locking Node.js crypto threads. | Hard **128-byte UTF-8 ceiling** enforced in `LoginDto` before hashing. |
| **Inventory Hoarding DoS** | Checkout locked `InventoryItem` to `RESERVED` permanently without payment. | Interactive transaction `FOR UPDATE SKIP LOCKED` + **BullMQ 10-minute delayed worker** that auto-releases unpaid `RESERVED` IMEIs. |
| **Proxy IP Spoofing / Global Lockout** | In-memory `ThrottlerModule (10 req/60s)` behind Next.js proxy. | `ThrottlerStorageRedisService` keyed on verified `CF-Connecting-IP` with mTLS Origin Pulls and route-specific rate tiers. |
| **Payment & Auth Side-Channel** | Standard `===` string comparison leaks byte timing. | Mandatory `crypto.timingSafeEqual` with prior `Buffer.byteLength` equality guard on all Razorpay HMACs and internal webhook secrets. |
| **Malicious File Uploads / Body DoS** | 100KB Express limit vs. multipart resume uploads through API. | API keeps strict `100kb` JSON limit. Resumes upload directly to **Cloudflare R2 via Presigned PUT URLs** (`Content-Type: application/pdf`, `Content-Length <= 5MB`). |
| **Client-Side Certificate Forgery** | Browser DOM manipulation prior to `html2canvas` / `jsPDF` export. | Certificates generated **server-side** via `@react-pdf/renderer`, embedded with HMAC-signed QR verification URL, and stored immutably in R2. |
| **XSS & Prototype Pollution** | Recursive regex tag stripper + vulnerable `xlsx@0.18.5`. | Removed `xlsx@0.18.5` (server-side `exceljs` only). Replaced regex middleware with `isomorphic-dompurify` `@SanitizeHtml()` DTO decorators. |

---

## 2. HTTP Security Headers (`Helmet` + Next.js Config)
```http
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), payment=(self "https://checkout.razorpay.com"), geolocation=(self)
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://checkout.razorpay.com https://challenges.cloudflare.com https://maps.googleapis.com; frame-src https://api.razorpay.com https://challenges.cloudflare.com; img-src 'self' data: https://cdn.ecofone.co.in https://*.googleapis.com; connect-src 'self' https://api.razorpay.com https://challenges.cloudflare.com;
```
`````

---

## File 12: `brain/11_ADMOB_SPEC.md`

````markdown
# 11_ADMOB_SPEC.md — Monetization, Partner Promotional Slots & Conversion Analytics Spec
**Project:** EcoFone Official Portal (`ecofone.co.in`)  
*(Note: Adapted from standard `11_ADMOB_SPEC.md` template for EcoFone's web/PWA e-commerce ecosystem: First-Party Promotional Inventory, Brand Co-Marketing Slots, and Attribution Analytics—Zero intrusive third-party ad networks that degrade conversion or CLS).*

---

## 1. First-Party Promotional & Co-Marketing Slot Architecture
To maximize ARPU without hurting e-commerce checkout conversion or Core Web Vitals (`CLS < 0.05`), EcoFone prohibits slow third-party display ad scripts on transactional routes (`/buy`, `/sell`, `/franchise`) and instead operates **First-Party Sponsored Brand & Cross-Sell Slots** managed via `CmsModule`:

| Slot ID | Placement Route | Dimensions & CLS Reservation | Monetization / Conversion Purpose |
| :--- | :--- | :--- | :--- |
| **`SLOT_BUY_TOP_BANNER`** | `/buy` (Catalog Header) | `min-h-[120px] md:min-h-[160px]` | Co-branded OEM Trade-In Boosters & Seasonal EMI Fest offers (Razorpay No-Cost EMI). |
| **`SLOT_CHECKOUT_ADDON`** | `/buy` (Cart Drawer) | `min-h-[88px]` | High-margin Accessory Cross-Sell (Tempered Glass, 20W Fast Adapter, Extended 12-Month Warranty Upgrade). |
| **`SLOT_BLOG_INLINE_CTA`** | `/blog/[slug]` (Every 4th H2) | `min-h-[140px]` | Contextual native widget: *"Check your old phone's instant buyback value in 30 seconds -> `/sell`"*. |
| **`SLOT_FRANCHISE_STICKY`**| `/blog` & `/research` Sidebar | `w-[300px] min-h-[250px]` | B2B Investor Lead Capture card promoting the EcoFone FICO Franchise model. |

---

## 2. Attribution, Funnel Analytics & Privacy Compliance
1. **Zero-CLS Slot Rendering:** All promotional banners reserve explicit aspect-ratio containers (`aspect-[16/5]`) in SSR HTML and load WebP/AVIF assets from `cdn.ecofone.co.in`.
2. **Server-Side Funnel Events:** Track `view_item`, `begin_checkout`, `purchase`, `generate_tradein_quote`, and `submit_franchise_lead` via first-party server events so ad-blockers do not skew marketing ROI attribution.
3. **Future Mobile App Readiness (PWA / Flutter Wrapper):** If EcoFone deploys a dedicated Android utility wrapper for diagnostic hardware testing, AdMob/partner SDKs are strictly disabled on checkout and diagnostic screens to preserve store trust.
````

---

## File 13: `brain/12_GITHUB_ACTIONS.md`

`````markdown
# 12_GITHUB_ACTIONS.md — CI/CD Pipelines, Automated Security Gates & Database Backups
**Repository:** EcoFone Monorepo (`frontend/` + `backend/`)  

---

## 1. Continuous Integration Workflow (`.github/workflows/ci-verify.yml`)
Triggered on every `pull_request` and push to `main` / `staging`:

```yaml
name: EcoFone CI Quality & Security Gate

on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main, staging]

jobs:
  typecheck-lint-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20.18.0'
          cache: 'npm'

      - name: Security Secret Scan (Gitleaks)
        uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Backend Install, Prisma Validate & Strict Typecheck
        working-directory: ./backend
        run: |
          npm ci
          npx prisma validate
          npx tsc --noEmit
          npm audit --audit-level=high

      - name: Frontend Install, Strict Typecheck & Production Build
        working-directory: ./frontend
        run: |
          npm ci
          npx tsc --noEmit
          npm run build
```

---

## 2. Automated PostgreSQL-to-Cloudflare-R2 Disaster Recovery Workflow (`.github/workflows/db-backup.yml`)

Executes daily at `01:00 AM IST` (`19:30 UTC`), streaming an encrypted compressed `pg_dump` snapshot directly to Cloudflare R2 with 30-day retention:

```yaml
name: Automated PostgreSQL Backup to Cloudflare R2

on:
  schedule:
    - cron: '30 19 * * *'
  workflow_dispatch:

jobs:
  pg-dump-to-r2:
    runs-on: ubuntu-latest
    steps:
      - name: Install PostgreSQL 16 Client & AWS CLI
        run: |
          sudo apt-get update
          sudo apt-get install -y postgresql-client awscli

      - name: Dump, Compress, Encrypt & Upload to R2
        env:
          DIRECT_URL: ${{ secrets.DIRECT_URL }}
          BACKUP_PASSPHRASE: ${{ secrets.BACKUP_PASSPHRASE }}
          AWS_ACCESS_KEY_ID: ${{ secrets.R2_BACKUP_ACCESS_KEY }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.R2_BACKUP_SECRET_KEY }}
          R2_ENDPOINT: ${{ secrets.R2_ENDPOINT }}
        run: |
          TIMESTAMP=$(date -u +"%Y-%m-%dT%H-%M-%SZ")
          FILENAME="ecofone_db_${TIMESTAMP}.sql.gz.gpg"
          pg_dump "$DIRECT_URL" --no-owner --no-acl | gzip -9 | gpg --batch --yes --passphrase "$BACKUP_PASSPHRASE" -c -o "/tmp/$FILENAME"
          aws s3 cp "/tmp/$FILENAME" "s3://ecofone-db-backups/daily/$FILENAME" --endpoint-url "$R2_ENDPOINT"
          rm -f "/tmp/$FILENAME"
```
`````

> **See also:** `brain/19_AWS_GITHUB_ACTIONS_DEPLOY.md` (Part 4) for the AWS ECR + ECS zero-downtime deployment pipeline.

---

## File 14: `brain/13_TESTING.md`

````markdown
# 13_TESTING.md — Automated Unit, Concurrency & End-to-End (E2E) Testing Spec
**Frameworks:** Jest + Supertest (Backend) | Playwright (Frontend & Revenue E2E) | k6 (Load & DDoS Simulation)  

---

## 1. Testing Pyramid & Coverage Mandates
1. **Unit Tests (Jest — Target >= 85% Coverage on Services):**
   - `TradeInService`: Verify exact rupee deductions across every combination of screen, body, battery, and functional defects.
   - `FranchiseService`: Verify OPEX, CAPEX, and break-even month calculations for Kiosk, SIS, and Exclusive tiers.
   - `AuthGuard` & `EcommerceService`: Verify `crypto.timingSafeEqual` rejects altered signatures, wrong buffer lengths, and expired timestamps.
2. **Concurrency & Race-Condition Tests (Jest + Testcontainers PostgreSQL):**
   - Fire **50 simultaneous `POST /api/v1/ecommerce/checkout/initiate`** requests for a `SKU` that has only **1 `AVAILABLE` `InventoryItem`**.
   - **Pass Criterion:** Exactly **1 request returns `201 Created`** (`RESERVED`), and **49 requests return `409 Conflict` (`INVENTORY_OUT_OF_STOCK`)** with zero double-reservations.

---

## 2. Critical Playwright E2E Revenue & Security Suites (`e2e/`)

| Suite ID | Flow Tested | Assertions Verified |
| :--- | :--- | :--- |
| **`E2E-01`** | **Refurbished Checkout & Razorpay Lifecycle (`/buy`)** | Filter by Brand -> Open SKU -> Initiate Checkout -> Verify IMEI becomes `RESERVED` -> Mock signed Razorpay webhook -> Verify Order becomes `PAID` and IMEI becomes `SOLD`. |
| **`E2E-02`** | **5-Step Trade-In Valuation Wizard (`/sell`)** | Complete all 5 steps -> Submit with test Turnstile token -> Assert accurate INR quote is persisted in `TradeInQuote` and displayed. |
| **`E2E-03`** | **Certificate Verification & Tamper Check (`/verify-certificate`)** | Query valid `EVG-INT-2026-XXXX` -> Assert green verified badge, Rahul Verma signatory, CIN `U70109UP2020PTC138839`, and valid server-rendered R2 PDF link. |
| **`E2E-04`** | **Admin RBAC Isolation & Audit Logging (`/admin`)** | Log in as a Sub-Admin with only `['blogs']` permission -> Attempt `GET /api/v1/admin/export/franchise` -> Assert `403 Forbidden` and verify unauthorized attempt is logged in `SystemLog`. |
````

---

## File 15: `brain/14_PRODUCTION_CHECKLIST.md`

````markdown
# 14_PRODUCTION_CHECKLIST.md — Go-Live Verification & Release Gate
**Project:** EcoFone Official Portal (`ecofone.co.in`)  

---

## 1. Security & Cryptography Gate
- [ ] `MASTER_ADMIN_PASSWORD` fallback removed from codebase and production environment variables.
- [ ] Admin JWT migrated to 15-minute RS256 Access Token + 7-day `HttpOnly; Secure; SameSite=Strict` Refresh Token with Redis revocation.
- [ ] `xlsx@0.18.5` removed from `frontend/package.json`; all exports routed through server-side `exceljs` with RBAC + `SystemLog` auditing.
- [ ] Cloudflare WAF active: Verified Bots (`cf.bot_management.verified_bot`) allowed; Turnstile enforced on `/sell`, `/contact`, `/franchise`, `/careers`, and `/auth/login`.
- [ ] Origin firewall locked down: Port `4012` (NestJS) and Port `3000` (Next.js) only accept traffic from Cloudflare mTLS / internal private subnet.
- [ ] Razorpay webhook endpoint (`/api/v1/ecommerce/webhook/razorpay`) excluded from browser `Origin` blocking and verified strictly via `crypto.timingSafeEqual`.

## 2. Database, Caching & Queue Gate
- [ ] PostgreSQL extensions `pg_trgm`, `cube`, and `earthdistance` enabled; partial `AVAILABLE` inventory index and spatial `GIST` store index created.
- [ ] `DATABASE_URL` routed through PgBouncer transaction pooler; `DIRECT_URL` configured for migrations and nightly R2 backups.
- [ ] BullMQ workers active for: (1) 10-minute `RESERVED` inventory expiration, (2) Zoho Mail SMTP delivery, and (3) Server-side Certificate PDF generation.

## 3. SEO & Performance Gate
- [ ] `npx tsc --noEmit` passes with 0 errors in both `frontend/` and `backend/`.
- [ ] Initial client JS bundle `< 90 KB` on `/` and `< 70 KB` on `/admin`.
- [ ] `https://ecofone.co.in/sitemap.xml` and `robots.txt` accessible and validated in Google Search Console.
- [ ] Google Rich Results Test passes for `Product`, `LocalBusiness`, `JobPosting`, `FAQPage`, and `Article` JSON-LD schemas.
````

---

## File 16: `brain/15_MICROTASKS.md`

````markdown
# 15_MICROTASKS.md — Granular Engineering Execution Backlog
**Format:** Atomic, independently testable tasks (< 4 hours each) ordered by dependency.  

---

## Epic 1: Critical Vulnerability Remediation (P0)
- [ ] **MT-101:** Remove the `process.env.MASTER_ADMIN_PASSWORD` fallback in `backend/src/auth/auth.service.ts`; enforce `SubAdmin` DB lookup with 128-byte ceiling and Argon2id/bcrypt verification.
- [ ] **MT-102:** Implement RS256 15m Access Token + 7d `HttpOnly` Refresh Token rotation backed by Redis `eco:auth:refresh:{userId}:{jti}` in `AuthModule` and `frontend/lib/auth-guard.ts`.
- [ ] **MT-103:** Configure `ThrottlerStorageRedisService` in `backend/src/app.module.ts`, enable `app.set('trust proxy', 1)` in `main.ts`, and apply route-tier `@Throttle()` decorators.
- [ ] **MT-104:** Update `BotProtectionMiddleware` to bypass `Origin`/`Sec-Fetch-Site` rejection on `/api/v1/ecommerce/webhook/razorpay` and verify Cloudflare Turnstile tokens on public POST forms.
- [ ] **MT-105:** Replace recursive regex `XssMiddleware` with `isomorphic-dompurify` `@SanitizeHtml()` property decorator on string DTO fields.
- [ ] **MT-106:** Uninstall `xlsx` (`0.18.5`) from `frontend/`; move applicant/franchise/review spreadsheet generation to server-side `exceljs` streaming endpoints with `SystemLog` recording.

## Epic 2: Concurrency, Storage & Worker Offloading (P1)
- [ ] **MT-201:** Refactor `EcommerceService.initiateCheckout` to use `SELECT ... FOR UPDATE SKIP LOCKED` and schedule a 10-minute BullMQ `release-expired-reservation` job.
- [ ] **MT-202:** Create `POST /api/v1/career/presigned-url` and `POST /api/v1/cms/presigned-url` issuing Cloudflare R2 Presigned PUT URLs (5MB PDF / 2MB WebP max).
- [ ] **MT-203:** Migrate Certificate PDF rendering from client-side `html2canvas`/`jsPDF` to a server-side `@react-pdf/renderer` service that embeds a signed verification QR code and caches the PDF in R2.
- [ ] **MT-204:** Move Zoho Mail SMTP dispatch out of Next.js API routes into a NestJS BullMQ `EmailProcessor` with 3 exponential backoff retries.

## Epic 3: Database, Caching & Technical SEO (P1)
- [ ] **MT-301:** Add `pg_trgm` GIN indexes on `Brand.name` and `DeviceModel.name`, partial index on `InventoryItem (status = 'AVAILABLE')`, and `earthdistance` GIST index on `Store`.
- [ ] **MT-302:** Replace `/data/*.json` fallback writes with Redis SWR caching (`eco:catalog:*`, `eco:stores:*`) and Next.js `/api/revalidate` (`revalidateTag`) hooks.
- [ ] **MT-303:** Add `app/sitemap.ts`, `app/robots.ts`, and reusable `<JsonLdSchema />` components for `Product`, `LocalBusiness`, `JobPosting`, and `FAQPage`.
````

---

## File 17: `brain/16_CHANGELOG.md`

````markdown
# 16_CHANGELOG.md — Architectural & Security Release History
All notable architectural, security, and performance changes to the **EcoFone (`ecofone.co.in`)** monorepo are documented in this file.

---

## [3.0.0] — 2026-10-24 (Zero-Trust Security, Redis/BullMQ & SEO Hardening Release)
### Security (Vulnerability Remediations)
- **Fixed VULN-01:** Replaced 14-day shared-secret HS256 JWTs with 15-minute RS256 Access Tokens + 7-day rotating `HttpOnly` Refresh Tokens backed by a Redis revocation denylist.
- **Fixed VULN-02:** Added `FOR UPDATE SKIP LOCKED` + a 10-minute BullMQ expiration worker to prevent unpaid checkout reservations from locking out catalog inventory.
- **Fixed VULN-03:** Removed plaintext `process.env.MASTER_ADMIN_PASSWORD` fallback; enforced DB-backed RBAC + TOTP MFA for Master Admin.
- **Fixed VULN-04 & VULN-05:** Migrated `ThrottlerModule` to Redis storage keyed on verified `CF-Connecting-IP`; integrated Cloudflare Turnstile and Verified Bot ASN allowlisting.
- **Fixed VULN-06, VULN-07 & VULN-08:** Migrated resume uploads to Cloudflare R2 Presigned URLs, moved Certificate PDF generation server-side with QR HMAC signatures, and removed vulnerable `xlsx@0.18.5`.
- **Fixed VULN-09, VULN-10 & VULN-11:** Replaced `/data/*.json` write fallbacks with Redis SWR + DLQ streams, replaced regex XSS stripping with `isomorphic-dompurify` DTO decorators, and moved Zoho SMTP to BullMQ workers.

### Performance & SEO
- Added PostgreSQL `pg_trgm` GIN search indexes, `AVAILABLE` partial inventory index, and `earthdistance` spatial `GIST` index for `/stores`.
- Added Next.js 15 `revalidateTag` on-demand ISR invalidation and comprehensive JSON-LD schemas (`Product`, `LocalBusiness`, `JobPosting`, `FAQPage`).

---

## [2.0.0] — 2026-10-01 (PostgreSQL Migration & Bundle Optimization Baseline)
- Migrated 12 NestJS modules (`auth`, `ecommerce`, `tradein`, `franchise`, `cms`, `certificate`, `career`, `contact`, `research`, `sub-admin`, `system-log`, `health`) to native PostgreSQL via Prisma 5.22.0 (17 models).
- Implemented dynamic `await import(...)` code-splitting on `/admin` (reduced bundle by 95.6% from `1,520 kB` to `67.3 kB`) and `/careers` (reduced by 94.9% from `840 kB` to `42.1 kB`).
- Enforced `crypto.timingSafeEqual` on Razorpay HMAC signatures and `O(1)` S3/R2 atomic counters in `SystemSetting`.
````

---

## File 18: `brain/17_DECISIONS.md`

````markdown
# 17_DECISIONS.md — Architecture Decision Records (ADRs)
**Project:** EcoFone Official Portal (`ecofone.co.in`)  

---

## ADR-001: Short-Lived RS256 Access Tokens + Redis Refresh Rotation over 14-Day HS256 JWTs
- **Status:** Accepted (Supersedes v2.0 Auth Design)
- **Context:** In v2.0, Admin tokens were signed with HS256 and valid for 14 days (`expiresIn: 14d`), sharing the same secret between Next.js and NestJS. Terminating a Sub-Admin or revoking permissions in `SubAdminModule` could not invalidate an already-issued token for two weeks.
- **Decision:** Issue 15-minute RS256 Access Tokens (verified by Next.js using only the public key) paired with a 7-day `HttpOnly; Secure; SameSite=Strict` Refresh Token tracked in Redis (`eco:auth:refresh:{userId}:{jti}`).
- **Consequences:** Immediate (< 15m or instant via Redis check) revocation when a Sub-Admin's permissions change, zero shared signing secrets on the frontend, and complete immunity to `localStorage` XSS token theft.

---

## ADR-002: Atomic `FOR UPDATE SKIP LOCKED` + 10-Minute BullMQ TTL for Refurbished Inventory
- **Status:** Accepted
- **Context:** Unlike new e-commerce where stock is a simple counter, refurbished smartphones are unique single-IMEI items (`InventoryItem`). Locking an item to `RESERVED` on checkout initiation without an automated release mechanism allowed abandoned carts or bots to lock 100% of available stock.
- **Decision:** Lock the specific IMEI row using `FOR UPDATE SKIP LOCKED`, set `reservedUntil = NOW() + INTERVAL '10 minutes'`, and enqueue a BullMQ delayed job (`delay: 600_000ms`) that checks if the associated Order is still `PENDING` and reverts the IMEI back to `AVAILABLE`.
- **Consequences:** Zero double-selling under high concurrency and automatic recovery from abandoned Razorpay checkouts.

---

## ADR-003: Cloudflare R2 Presigned PUT URLs + Server-Side PDF Rendering
- **Status:** Accepted
- **Context:** Streaming 5MB PDF resumes through NestJS conflicted with the 100KB JSON body limit and tied up Node.js memory, while client-side `html2canvas` + `jsPDF` certificate rendering allowed DOM manipulation prior to PDF generation.
- **Decision:** Use direct browser-to-R2 Presigned PUT URLs for all candidate/CMS uploads, and generate all official Ecovista certificates (`EVG-INT-2026-XXXX`) server-side via `@react-pdf/renderer` with an embedded HMAC-signed QR verification link.
- **Consequences:** 100% tamper-proof credentials, near-zero API bandwidth overhead, and zero egress fees via Cloudflare R2.

---

## ADR-004: Cloudflare Verified Bot ASN Allowlisting + Turnstile over Custom UA Regex Blocking
- **Status:** Accepted
- **Context:** Application-level User-Agent blacklisting (`python-requests`, `scrapy`) is trivially bypassed by scrapers changing their UA header, while strict `Origin` header checks risk blocking Razorpay server-to-server webhooks and legitimate search engine crawlers.
- **Decision:** Offload bot classification to Cloudflare Edge using cryptographic ASN/rDNS verification (`cf.bot_management.verified_bot`) for SEO crawlers (`Googlebot`, `Bingbot`) and require invisible Cloudflare Turnstile tokens on interactive mutation endpoints (`/sell`, `/franchise`, `/contact`, `/careers`).
- **Consequences:** Uninterrupted SEO indexing across all 77+ routes combined with enterprise L7 DDoS and price-scraper protection.
````

---

# PART 3 — AWS DEPLOYMENT OPTIMIZATION

To guarantee zero-downtime, error-free deployments on AWS while maximizing compute efficiency and keeping cloud costs low for **EcoFone (`ecofone.co.in`)**, below are:

1. **New File:** `brain/18_AWS_DEPLOYMENT_OPTIMIZATION.md` (extending the `brain/` documentation suite).
2. **Updated Rules:** Deployment-First Engineering Commandments added to `brain/00_MASTER_RULES.md`.
3. **Production Code Refactoring:** Drop-in updates for existing files (`backend/src/main.ts`, `backend/src/prisma.service.ts`, `backend/src/health/health.controller.ts`, `backend/prisma/schema.prisma`, `frontend/next.config.mjs`, and multi-stage `Dockerfile`s) to eliminate the most common AWS deployment failures.

---

## 3.1 New Specification File: `brain/18_AWS_DEPLOYMENT_OPTIMIZATION.md`

`````markdown
# 18_AWS_DEPLOYMENT_OPTIMIZATION.md — AWS Cloud Architecture, Cost & Zero-Downtime Deployment Spec
**Project:** EcoFone Official Portal (`ecofone.co.in`)  
**Primary AWS Region:** `ap-south-1` (Mumbai, India — < 25ms latency pan-India)  
**Compute Target:** AWS Graviton3/4 (`ARM64` — `t4g` / `c7g`) via AWS ECS Fargate or EC2 Auto-Scaling  

---

## 1. AWS Production Topology (Cloudflare Edge + AWS `ap-south-1`)

```mermaid
graph TD
    subgraph Cloudflare Edge [Global Anycast + WAF + R2]
        CF["Cloudflare WAF + DDoS Shield + Verified Bot Allowlist"]
        R2["Cloudflare R2 / AWS S3 (Resumes, Store Media, Signed PDFs)"]
    end

    subgraph AWS VPC [ap-south-1 Mumbai - Multi-AZ]
        subgraph Public Subnets [AZ-1a & AZ-1b]
            ALB["AWS Application Load Balancer (mTLS Origin Pulls Only)"]
            NAT["VPC Endpoints (S3, ECR, Secrets Manager, CloudWatch)"]
        end

        subgraph Private App Subnets [AZ-1a & AZ-1b — AWS Graviton ARM64]
            NextTask["ECS Service / EC2: Next.js 15.5.28 Standalone (Port 3000)"]
            NestTask["ECS Service / EC2: NestJS 10 API + BullMQ (Port 4012)"]
        end

        subgraph Private Data Subnets [AZ-1a & AZ-1b — Isolated]
            PgBouncer["RDS Proxy / PgBouncer Pooler"]
            RDS[("AWS RDS PostgreSQL 16 (Multi-AZ, Graviton db.t4g.medium)")]
            Redis[("AWS ElastiCache Redis 7.4 (Graviton cache.t4g.micro)")]
        end
    end

    CF -->|HTTPS 443 mTLS| ALB
    ALB -->|/*| NextTask
    ALB -->|/api/v1/*| NestTask
    NextTask -->|Internal Service Connect :4012| NestTask
    NestTask --> PgBouncer --> RDS
    NestTask --> Redis
    NextTask --> Redis
    NestTask --> R2
```

---

## 2. Ten Root Causes of AWS Deployment Failures & How EcoFone Eliminates Them

| # | Common AWS Deployment Failure | Root Cause in Next.js 15 / NestJS 10 | Mandatory EcoFone Prevention Rule |
| --- | --- | --- | --- |
| **1** | **Sporadic `502 Bad Gateway` on AWS ALB** | Node.js default `keepAliveTimeout` (`5s`) is shorter than AWS ALB default idle timeout (`60s`). ALB sends a request on a socket right as Node closes it. | Set `server.keepAliveTimeout = 65000` and `server.headersTimeout = 66000` in `backend/src/main.ts` and Next.js custom server/env. |
| **2** | **Prisma & `bcrypt` Crash on AWS Graviton (`ARM64`)** | Building on `x86_64` or missing OpenSSL 3.0 shared libraries (`libssl.so.3`) causes `PrismaClientInitializationError` or `bcrypt` segfaults on launch. | Explicitly declare `binaryTargets = ["native", "linux-musl-openssl-3.0.x", "linux-musl-arm64-openssl-3.0.x"]` in `schema.prisma` and install `openssl` in Alpine runner stages. |
| **3** | **Out-Of-Memory (`OOMKilled` Exit Code 137) During Build** | Pre-rendering 77 static Next.js 15 routes + heavy admin bundles (`exceljs`, `jspdf`) exceeds 2GB RAM during Docker build. | Enable `output: 'standalone'` in `next.config.mjs`, set `NODE_OPTIONS="--max-old-space-size=3072"` only at build time, and run production with `< 256MB` RSS. |
| **4** | **Dropped Payments During Rolling Deploys (`SIGTERM`)** | AWS ECS sends `SIGTERM` to old containers when deploying. Without shutdown hooks, in-flight Razorpay webhooks and DB transactions are killed mid-execution. | Call `app.enableShutdownHooks()` in NestJS `main.ts`, set ECS `stopTimeout: 30s`, and drain ALB connections (`deregistration_delay: 20s`). |
| **5** | **RDS `FATAL: remaining connection slots are reserved`** | Auto-scaling 4 NestJS tasks + Next.js SSR workers opens `4 * 15 = 60+` raw connections, exhausting RDS `db.t4g.micro/medium` limits. | Append `?connection_limit=10&pool_timeout=15&connect_timeout=10&sslmode=require` to `DATABASE_URL` and route through PgBouncer/RDS Proxy. |
| **6** | **Broken Migration Race Condition on Multi-Task Boot** | Running `prisma migrate deploy` inside `CMD` of 3 parallel ECS containers causes migration advisory lock deadlocks. | Run `npx prisma migrate deploy` (using `DIRECT_URL`) as a **single pre-deployment ECS RunTask / GitHub Action job** BEFORE rolling out new app containers. |
| **7** | **`EROFS: read-only file system` on JSON Fallbacks** | Hardened AWS ECS tasks run with `readonlyRootFilesystem: true`. Attempting to write to `frontend/data/*.json` crashes the route handler. | Never write runtime state to the container filesystem. Serve fallback reads in memory or Redis, and write temporary artifacts only to `/tmp`. |
| **8** | **Hardcoded `localhost:4012` Failing Across Containers** | In AWS ECS/Docker, `localhost` inside the Next.js container refers to Next.js itself, not the NestJS container. | Bind NestJS explicitly to `0.0.0.0:4012` (never `127.0.0.1`) and drive Next.js rewrites via runtime `INTERNAL_BACKEND_URL` (e.g., `http://ecofone-backend.local:4012`). |
| **9** | **Health Check Boot Loops (ECS Killing Waking Tasks)** | `/api/v1/health` checks PostgreSQL latency. If RDS takes 8 seconds to wake from cold start, ALB marks the container unhealthy and kills it repeatedly. | Separate **Liveness** (`GET /api/v1/health/live` — instant `200 OK` if Node event loop is responsive) from **Readiness** (`GET /api/v1/health` — deep DB/Redis check) with a `30s` ALB `healthCheckGracePeriod`. |
| **10** | **High AWS NAT Gateway & Egress Bills** | Pulling Docker images from ECR, uploading resumes to S3, or sending logs through a Managed NAT Gateway costs $0.045/GB. | Provision **Gateway VPC Endpoints** (Free) for S3 and **Interface Endpoints** or Cloudflare R2 (Zero Egress) + Graviton `ARM64` instances (40% better price-performance). |

---

## 3. AWS Cost & Performance Optimization Blueprint

1. **AWS Graviton (`ARM64`) First:** All Docker images are built for `linux/arm64` (`t4g.medium` for EC2/RDS/ElastiCache or `ARM64` Fargate), cutting AWS compute bills by **20%–40%** while improving Node.js V8 throughput.
2. **Next.js Standalone Output:** Reduces the production frontend container image from **`1.4 GB` to `~135 MB`**, cutting AWS ECR storage costs and slashing ECS task cold-start pull time from 45 seconds to **< 4 seconds**.
3. **AWS Secrets Manager / SSM Parameter Store Injection:** Zero `.env` files are baked into Docker images. All secrets (`DATABASE_URL`, `RAZORPAY_WEBHOOK_SECRET`, `JWT_PRIVATE_KEY`, `ZOHO_SMTP_PASS`) are injected at container startup via AWS SSM Parameter Store (`SecureString` — free tier for standard parameters).
`````

---

## 3.2 Deployment Rules Added to `brain/00_MASTER_RULES.md`

Add the following **Section 2.5** to your existing `brain/00_MASTER_RULES.md` (File 1 in Part 2) so every developer and AI agent enforces deployment safety on every commit:

````markdown
### 2.5 AWS & Container Deployment Commandments (Mandatory on Every Code Change)
1. **Host & Port Binding:** Backend services MUST bind to `0.0.0.0` (never `127.0.0.1` or `localhost`) and read ports from `process.env.PORT || 4012`.
2. **ALB Keep-Alive Alignment:** Any HTTP server exposed behind AWS ALB MUST configure `keepAliveTimeout >= 65000` (65s) and `headersTimeout >= 66000` (66s) to prevent AWS ALB `502 Bad Gateway` race conditions.
3. **Graceful Shutdown Compliance:** Every stateful service (`PrismaService`, `Redis`, `BullMQ`) MUST register `OnModuleDestroy` / `beforeApplicationShutdown` hooks, and `main.ts` MUST call `app.enableShutdownHooks()` so `SIGTERM` drains in-flight requests cleanly.
4. **Stateless & Read-Only Root Filesystem:** Assume the production container runs with `readonlyRootFilesystem: true` and scales horizontally (`N >= 2` instances). Never write runtime state, uploads, or fallback `.json` files to the project directory; use Redis, S3/R2, or `/tmp`.
5. **Native Binary Portability:** Never add an `npm` package with native C/C++ bindings without verifying `linux-musl-arm64` / `linux-musl-x64` compatibility in `Dockerfile` and `schema.prisma` `binaryTargets`.
6. **Build-Time vs. Runtime Env Separation:** In Next.js (`frontend/`), remember that `NEXT_PUBLIC_*` variables are baked at `next build` time. Any environment variable that changes per environment (staging vs. production URLs, internal API URLs, secrets) MUST be read dynamically on the server at runtime.
````

---

## 3.3 Existing Code Changes for Deployment Optimization

Below are the refactored versions of the core files referenced in the EcoFone audit report, hardened for AWS production deployment.

### 3.3.1 `backend/src/main.ts` — AWS ALB 502 Fix, Graceful `SIGTERM`, Proxy Trust & 100KB Ceiling

In the audit report, `backend/src/main.ts` bootstraps Express, Helmet, validation pipes, CORS, and the 100KB payload limit on Port `4012`. This updated version adds **AWS ALB keep-alive synchronization**, **`0.0.0.0` container binding**, **graceful `SIGTERM` shutdown hooks**, and **trusted reverse-proxy headers**:

```typescript
// File: backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import * as express from 'express';
import { Server } from 'http';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false, // Disabled so we can configure explicit 100kb limits below
  });

  // 1. AWS ALB & Cloudflare Reverse Proxy Trust
  // Required so ThrottlerModule reads real client IP (X-Forwarded-For / CF-Connecting-IP)
  // instead of locking out the AWS ALB or Next.js internal proxy IP.
  app.set('trust proxy', 1);

  // 2. Security Headers (Helmet)
  app.use(
    helmet({
      contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
      crossOriginEmbedderPolicy: false,
    }),
  );

  // 3. Preserve Raw Body for Razorpay Webhook HMAC Verification + Enforce 100kb Limit
  app.use(
    express.json({
      limit: '100kb',
      verify: (req: any, _res, buf) => {
        if (req.originalUrl?.includes('/webhook/razorpay')) {
          req.rawBody = Buffer.from(buf);
        }
      },
    }),
  );
  app.use(express.urlencoded({ extended: true, limit: '100kb' }));

  // 4. Strict CORS Configuration for EcoFone Domains
  const allowedOrigins = (
    process.env.CORS_ORIGINS || 'https://ecofone.co.in,https://www.ecofone.co.in'
  )
    .split(',')
    .map((origin) => origin.trim());

  app.enableCors({
    origin: (origin, callback) => {
      // Allow server-to-server requests (Next.js SSR, Razorpay Webhooks, AWS ALB Health Checks)
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${origin} not allowed by EcoFone CORS policy`), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Razorpay-Signature', 'X-Correlation-ID'],
  });

  // 5. Global Strict DTO Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // 6. Enable Graceful Shutdown Hooks for AWS ECS / Docker SIGTERM Draining
  app.enableShutdownHooks();

  const port = Number(process.env.PORT) || 4012;
  // CRITICAL FOR AWS ECS/DOCKER: Must bind to 0.0.0.0, never 127.0.0.1
  const server: Server = await app.listen(port, '0.0.0.0');

  // 7. CRITICAL AWS ALB 502 BAD GATEWAY FIX:
  // AWS ALB default idle timeout is 60s. Node default keepAliveTimeout is 5s.
  // Setting keepAliveTimeout to 65s and headersTimeout to 66s prevents ALB from
  // sending traffic on a socket that Node is simultaneously closing.
  server.keepAliveTimeout = 65_000;
  server.headersTimeout = 66_000;

  logger.log(`EcoFone Backend API listening on 0.0.0.0:${port} [ENV: ${process.env.NODE_ENV || 'development'}]`);
}

bootstrap();
```

---

### 3.3.2 `backend/src/prisma.service.ts` — AWS RDS Pool Management, Cold-Start Retry & Clean Shutdown

The audit report notes that `backend/src/prisma.service.ts` provides a lifecycle hook with a 2-stage cold-start auto-reconnect retry. This enhanced version prevents **AWS RDS connection exhaustion** across scaled containers and cleanly closes sockets on container termination:

```typescript
// File: backend/src/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  private isConnected = false;

  constructor() {
    super({
      datasources: {
        db: {
          url: PrismaService.buildAwsOptimizedUrl(process.env.DATABASE_URL || ''),
        },
      },
      log:
        process.env.NODE_ENV === 'production'
          ? ['error', 'warn']
          : ['query', 'info', 'warn', 'error'],
    });
  }

  /**
   * Ensures connection_limit and pool_timeout are always bounded on AWS ECS/EC2
   * so horizontal auto-scaling never exhausts AWS RDS PostgreSQL max_connections.
   */
  private static buildAwsOptimizedUrl(rawUrl: string): string {
    if (!rawUrl) return rawUrl;
    try {
      const parsed = new URL(rawUrl);
      if (!parsed.searchParams.has('connection_limit')) {
        parsed.searchParams.set('connection_limit', process.env.DB_POOL_SIZE || '10');
      }
      if (!parsed.searchParams.has('pool_timeout')) {
        parsed.searchParams.set('pool_timeout', '15');
      }
      if (!parsed.searchParams.has('connect_timeout')) {
        parsed.searchParams.set('connect_timeout', '10');
      }
      return parsed.toString();
    } catch {
      return rawUrl;
    }
  }

  async onModuleInit(): Promise<void> {
    await this.connectWithRetry(3, 1000);
  }

  /**
   * Cold-Start Auto-Reconnect Engine:
   * Retries connection with exponential backoff if AWS RDS / PostgreSQL is waking or failing over.
   */
  async connectWithRetry(maxRetries = 3, baseDelayMs = 1000): Promise<void> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await this.$connect();
        this.isConnected = true;
        this.logger.log(`PostgreSQL connected successfully on attempt ${attempt}/${maxRetries}`);
        return;
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        this.logger.warn(
          `PostgreSQL connection attempt ${attempt}/${maxRetries} failed: ${message}`,
        );
        if (attempt === maxRetries) {
          this.logger.error(
            'Exhausted initial PostgreSQL connection retries. Continuing startup in degraded mode so AWS ALB liveness check passes.',
          );
          return;
        }
        await new Promise((res) => setTimeout(res, baseDelayMs * Math.pow(2, attempt - 1)));
      }
    }
  }

  /**
   * Triggered automatically when AWS ECS / Docker sends SIGTERM during rolling deployments.
   */
  async onModuleDestroy(): Promise<void> {
    this.logger.log('SIGTERM received: Closing PostgreSQL connection pool gracefully...');
    await this.$disconnect();
    this.isConnected = false;
  }

  getConnectionStatus(): boolean {
    return this.isConnected;
  }
}
```

---

### 3.3.3 `backend/src/health/health.controller.ts` — AWS ALB Liveness vs. Readiness Probes

In the audit report, `health` exposes `/api/v1/health` with DB latency metrics. On AWS, if your ALB Target Group health check hits an endpoint that fails whenever RDS has a brief multi-AZ failover, AWS ALB will terminate all your application containers simultaneously! Separating `/api/v1/health/live` (for AWS container health checks) from `/api/v1/health` (for deep DB latency monitoring) prevents cascading outages:

```typescript
// File: backend/src/health/health.controller.ts
import { Controller, Get, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { SkipThrottle } from '@nestjs/throttler';
import { PrismaService } from '../prisma.service';

@SkipThrottle() // CRITICAL: Never rate-limit AWS ALB Health Check probes!
@Controller('api/v1/health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 1. Shallow Liveness Probe for AWS ALB / ECS Target Group Health Check
   * Always returns 200 OK in < 1ms if the Node.js event loop is alive.
   */
  @Get('live')
  @HttpCode(HttpStatus.OK)
  checkLiveness() {
    return {
      status: 'UP',
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * 2. Deep Readiness & Database Latency Probe (/api/v1/health)
   * Used by deployment verification pipelines and status monitors.
   */
  @Get()
  async checkReadiness(@Res() res: Response) {
    const start = performance.now();
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      const dbLatencyMs = Number((performance.now() - start).toFixed(2));

      return res.status(HttpStatus.OK).json({
        status: 'HEALTHY',
        database: 'CONNECTED',
        dbLatencyMs,
        memoryRssMb: Math.round(process.memoryUsage().rss / 1024 / 1024),
        uptimeSeconds: Math.floor(process.uptime()),
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      return res.status(HttpStatus.SERVICE_UNAVAILABLE).json({
        status: 'DEGRADED',
        database: 'DISCONNECTED',
        error: 'Database unreachable',
        timestamp: new Date().toISOString(),
      });
    }
  }
}
```

---

### 3.3.4 `backend/prisma/schema.prisma` — Generator Block for AWS Graviton (`ARM64`) & `x86_64`

Update the `generator client` block in `backend/prisma/schema.prisma` so Prisma compiles query engines for both local development and AWS Linux (`x86_64` and Graviton `ARM64` with OpenSSL 3.0):

```prisma
// File: backend/prisma/schema.prisma (Generator & Datasource Header)
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "linux-musl-openssl-3.0.x", "linux-musl-arm64-openssl-3.0.x", "debian-openssl-3.0.x", "linux-arm64-openssl-3.0.x"]
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL") // Pooled connection (RDS Proxy / PgBouncer)
  directUrl = env("DIRECT_URL")   // Direct RDS connection for 'npx prisma migrate deploy'
}
```

---

### 3.3.5 `frontend/next.config.mjs` — Standalone AWS Build, Runtime Backend Proxy & Bundle Splitting

The audit report highlights Next.js `15.5.28` with 77 static routes, `/api/v1/:path*` rewrites to Port `4012`, and bundle optimizations for `lucide-react`, `exceljs`, `jspdf`, and `html2canvas`. This `next.config.mjs` enables `output: 'standalone'` (shrinking your AWS Docker image by 90%) and uses runtime environment variables for internal AWS container routing:

```javascript
// File: frontend/next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. CRITICAL FOR AWS DOCKER/ECS: Produces a self-contained ~135MB server.js trace
  // instead of requiring the full 1.4GB node_modules tree in production.
  output: 'standalone',

  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,

  // 2. Optimize barrel-file imports to keep initial client bundles < 90kB
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // 3. Allow optimized WebP/AVIF rendering from Cloudflare R2 & AWS S3
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.r2.cloudflarestorage.com',
      },
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.ecofone.co.in',
      },
    ],
  },

  // 4. Proxy /api/v1/:path* to NestJS (Port 4012) using INTERNAL_BACKEND_URL
  // In AWS ECS/Docker, INTERNAL_BACKEND_URL points to the private NestJS service DNS
  // (e.g., http://backend:4012) while defaulting to http://127.0.0.1:4012 locally.
  async rewrites() {
    const internalBackendUrl =
      process.env.INTERNAL_BACKEND_URL || 'http://127.0.0.1:4012';
    return [
      {
        source: '/api/v1/:path*',
        destination: `${internalBackendUrl}/api/v1/:path*`,
      },
    ];
  },

  // 5. Edge & Browser Security Headers + Immutable Static Asset Caching for CloudFront/CF
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

---

### 3.3.6 Multi-Stage AWS Production Dockerfiles (`backend/Dockerfile` & `frontend/Dockerfile`)

#### `backend/Dockerfile` (Handles `bcrypt 6.0.0` native compilation + Prisma OpenSSL 3.0 + `dumb-init`)

```dockerfile
# File: backend/Dockerfile
# Stage 1: Dependencies & Native Addon Compilation (bcrypt 6.0.0 + Prisma 5.22.0)
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat openssl python3 make g++
WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma/
RUN npm ci
RUN npx prisma generate

# Stage 2: TypeScript Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
# Prune devDependencies so production image stays lightweight
RUN npm prune --omit=dev

# Stage 3: Hardened Non-Root AWS Production Runner
FROM node:20-alpine AS runner
RUN apk add --no-cache dumb-init openssl curl && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4012

COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nestjs:nodejs /app/package.json ./package.json

USER nestjs
EXPOSE 4012

# AWS ECS Container Health Check targeting the shallow Liveness probe
HEALTHCHECK --interval=30s --timeout=5s --start-period=25s --retries=3 \
  CMD curl -f http://127.0.0.1:4012/api/v1/health/live || exit 1

# dumb-init ensures SIGTERM from AWS ECS is forwarded cleanly to NestJS
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]
```

#### `frontend/Dockerfile` (Next.js 15.5.28 Standalone Build — Memory-Safe for 77 Static Routes)

```dockerfile
# File: frontend/Dockerfile
# Stage 1: Install Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Build 77 Static Routes with 3GB Heap Allocation to Prevent AWS CodeBuild OOM
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--max-old-space-size=3072"
RUN npm run build

# Stage 3: Minimal Standalone Runner (~135MB total image size)
FROM node:20-alpine AS runner
RUN apk add --no-cache dumb-init curl && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

COPY --from=builder /app/public ./public
# Copy standalone trace and static chunks
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Copy resilience JSON fallback data directory (Read-Only safe)
COPY --from=builder --chown=nextjs:nodejs /app/data ./data

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD curl -f http://127.0.0.1:3000/ || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
```

---

### 3.3.7 Read-Only Container Guard for the Next.js Resilience JSON Layer (`frontend/lib/json-fallback.ts`)

Because the audit report specifies a local JSON fallback layer (`frontend/data/*.json`) for `/api/stores`, `/api/cms/content`, `/api/research-articles`, and `/api/contact`, writing directly to `process.cwd() + '/data'` inside a locked-down AWS ECS container will throw an `EROFS` crash. Use this helper in those Next.js route handlers so reads work from `frontend/data/*.json` while fallback writes safely use `/tmp` when the root filesystem is read-only:

```typescript
// File: frontend/lib/json-fallback.ts
import { promises as fs } from 'fs';
import path from 'path';

const BUNDLED_DATA_DIR = path.join(process.cwd(), 'data');
const WRITABLE_TMP_DIR = '/tmp/ecofone-fallback-data';

/**
 * Safely reads fallback JSON data on AWS ECS (checks /tmp override first, then bundled /data/*.json)
 */
export async function readFallbackJson<T>(fileName: string, defaultValue: T): Promise<T> {
  const tmpFile = path.join(WRITABLE_TMP_DIR, fileName);
  const bundledFile = path.join(BUNDLED_DATA_DIR, fileName);

  for (const candidate of [tmpFile, bundledFile]) {
    try {
      const raw = await fs.readFile(candidate, 'utf-8');
      return JSON.parse(raw) as T;
    } catch {
      // Continue to next fallback location
    }
  }
  return defaultValue;
}

/**
 * Safely buffers fallback writes (e.g., /api/contact during DB maintenance) to /tmp
 * so AWS ECS tasks with readonlyRootFilesystem: true never crash with EROFS.
 */
export async function writeFallbackJson<T>(fileName: string, data: T): Promise<void> {
  try {
    await fs.mkdir(WRITABLE_TMP_DIR, { recursive: true });
    const tmpFile = path.join(WRITABLE_TMP_DIR, fileName);
    await fs.writeFile(tmpFile, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`[FallbackStorage] Failed to buffer ${fileName} in /tmp:`, err);
  }
}
```

> **Reminder:** per `VULN-09` / `MT-302` in Part 2, `/tmp` buffering is a stop-gap. The target state is Redis SWR for reads and a Redis DLQ stream for failed writes, since `/tmp` is lost on every task replacement.

---

# PART 4 — AWS GITHUB ACTIONS CI/CD (NEW)

This section answers the follow-up offered at the end of the AWS deployment document: the **GitHub Actions → AWS ECR → ECS zero-downtime deployment workflow**. It implements, as a pipeline, the ten prevention rules from `brain/18_AWS_DEPLOYMENT_OPTIMIZATION.md` (especially #4 SIGTERM drain, #6 single migration job, #9 liveness/readiness split). It complements, and does not replace, `brain/12_GITHUB_ACTIONS.md` (CI gate + R2 backups).

---

## 4.1 New Specification File: `brain/19_AWS_GITHUB_ACTIONS_DEPLOY.md`

`````markdown
# 19_AWS_GITHUB_ACTIONS_DEPLOY.md — GitHub Actions → AWS ECR → ECS Zero-Downtime Deployment Spec
**Project:** EcoFone Official Portal (`ecofone.co.in`)  
**Region:** `ap-south-1` (Mumbai) | **Runtime:** ECS Fargate `ARM64` (Graviton) | **Registry:** Amazon ECR  
**Depends on:** `12_GITHUB_ACTIONS.md` (CI gate), `18_AWS_DEPLOYMENT_OPTIMIZATION.md` (topology & failure rules)  

---

## 1. Pipeline Overview

```mermaid
graph LR
    PUSH["Push to main / manual dispatch"] --> CI["Job 1: verify (typecheck, prisma validate, audit, secret scan)"]
    CI --> BUILD["Job 2: build-push (buildx linux/arm64 -> ECR, tagged with git SHA)"]
    BUILD --> MIGRATE["Job 3: migrate (ONE ECS RunTask: prisma migrate deploy via DIRECT_URL)"]
    MIGRATE --> DEPLOY_BE["Job 4: deploy-backend (rolling, circuit breaker, wait for stability)"]
    DEPLOY_BE --> DEPLOY_FE["Job 5: deploy-frontend (rolling, circuit breaker, wait for stability)"]
    DEPLOY_FE --> SMOKE["Job 6: smoke-test (live + deep health + homepage)"]
    SMOKE -->|fail| ROLLBACK["Job 7: rollback (restore previous task definition revisions)"]
```

### Design Principles
1. **No long-lived AWS keys in GitHub.** Authentication uses GitHub OIDC → IAM role (`sts:AssumeRoleWithWebIdentity`).
2. **Immutable image tags.** Images are tagged with the full commit SHA; `latest` is never deployed.
3. **Migrations run exactly once** per release, as a single ECS one-off task, *before* new app tasks start (failure rule #6).
4. **Backward-compatible migrations only** (expand → deploy → contract). Because migrations run before the new code is live, the old code must keep working against the new schema during the rolling update.
5. **Rolling deploy with circuit breaker.** ECS rolls back automatically if new tasks fail health checks; the workflow additionally rolls back if post-deploy smoke tests fail.
6. **Graceful drain.** `stopTimeout: 30`, ALB `deregistration_delay: 20s`, NestJS `enableShutdownHooks()` and `dumb-init` guarantee in-flight Razorpay webhooks complete (failure rule #4).
7. **Serialized production deploys.** A `concurrency` group prevents two deploys from racing.

---

## 2. One-Time AWS Setup

### 2.1 ECR Repositories (immutable tags + scan on push)
```bash
for REPO in ecofone-backend ecofone-backend-migrator ecofone-frontend; do
  aws ecr create-repository \
    --repository-name "$REPO" \
    --image-tag-mutability IMMUTABLE \
    --image-scanning-configuration scanOnPush=true \
    --region ap-south-1
done
```

ECR lifecycle policy (keep the last 20 images per repo to control storage cost):
```json
{
  "rules": [
    {
      "rulePriority": 1,
      "description": "Keep last 20 images",
      "selection": { "tagStatus": "any", "countType": "imageCountMoreThan", "countNumber": 20 },
      "action": { "type": "expire" }
    }
  ]
}
```

### 2.2 GitHub OIDC Provider & Deploy Role
Create the OIDC provider `token.actions.githubusercontent.com` (audience `sts.amazonaws.com`) once per AWS account, then a role `ecofone-github-deploy` with this **trust policy** (replace `<ACCOUNT_ID>`, `<GITHUB_ORG>`, `<REPO>`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Federated": "arn:aws:iam::<ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com" },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": { "token.actions.githubusercontent.com:aud": "sts.amazonaws.com" },
        "StringLike":   { "token.actions.githubusercontent.com:sub": "repo:<GITHUB_ORG>/<REPO>:environment:production" }
      }
    }
  ]
}
```

Attach a **least-privilege** permissions policy allowing only:
- `ecr:GetAuthorizationToken` (resource `*`) and push/pull actions on the three ECR repos.
- `ecs:DescribeServices`, `ecs:DescribeTaskDefinition`, `ecs:RegisterTaskDefinition`, `ecs:UpdateService`, `ecs:RunTask`, `ecs:DescribeTasks`, `ecs:ListTasks` on the `ecofone-prod` cluster/services.
- `iam:PassRole` restricted to the ECS task role and task execution role ARNs (with `iam:PassedToService = ecs-tasks.amazonaws.com`).
- `logs:GetLogEvents` on the migration log group (to surface migration output on failure).

### 2.3 ECS Resources
| Resource | Name | Notes |
| :--- | :--- | :--- |
| Cluster | `ecofone-prod` | Fargate, Container Insights enabled |
| Service (API) | `ecofone-backend` | desired count >= 2, ARM64, ALB target group `/api/v1/*`, health check path `/api/v1/health/live` |
| Service (Web) | `ecofone-frontend` | desired count >= 2, ARM64, ALB target group `/*`, health check path `/` |
| Task Family (API) | `ecofone-backend` | `stopTimeout: 30`, `readonlyRootFilesystem: true` |
| Task Family (Web) | `ecofone-frontend` | `stopTimeout: 30`, `readonlyRootFilesystem: true` |
| Task Family (Migration) | `ecofone-migrate` | one-off, no service, no ALB |

**Service settings (both services):**
- `deploymentConfiguration`: `minimumHealthyPercent = 100`, `maximumPercent = 200`, `deploymentCircuitBreaker = { enable: true, rollback: true }`
- `healthCheckGracePeriodSeconds = 30`
- ALB target group `deregistration_delay.timeout_seconds = 20`
- Private subnets in two AZs; `assignPublicIp = DISABLED` (use VPC endpoints for ECR/S3/Logs/SSM to avoid NAT egress cost)

### 2.4 GitHub Environment, Secrets & Variables
Create a GitHub **Environment** named `production` (enable *required reviewers* for a manual approval gate).

**Environment variables (`vars.*`):**
| Variable | Example |
| :--- | :--- |
| `AWS_REGION` | `ap-south-1` |
| `AWS_ACCOUNT_ID` | `123456789012` |
| `ECS_CLUSTER` | `ecofone-prod` |
| `ECS_SERVICE_BACKEND` | `ecofone-backend` |
| `ECS_SERVICE_FRONTEND` | `ecofone-frontend` |
| `MIGRATE_TASK_FAMILY` | `ecofone-migrate` |
| `MIGRATE_SUBNETS` | `subnet-aaa,subnet-bbb` (private app subnets) |
| `MIGRATE_SECURITY_GROUP` | `sg-0123456789abcdef0` (allows egress to RDS 5432) |
| `NEXT_PUBLIC_SITE_URL` | `https://ecofone.co.in` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | `0x4AAAA...` (public key) |
| `SMOKE_BASE_URL` | `https://ecofone.co.in` |

**Environment secrets (`secrets.*`):**
| Secret | Purpose |
| :--- | :--- |
| `AWS_DEPLOY_ROLE_ARN` | `arn:aws:iam::<ACCOUNT_ID>:role/ecofone-github-deploy` |

> Runtime secrets (`DATABASE_URL`, `DIRECT_URL`, `RAZORPAY_WEBHOOK_SECRET`, `JWT_PRIVATE_KEY`, `ZOHO_SMTP_PASS`, …) live in **AWS SSM Parameter Store / Secrets Manager** and are injected by ECS at task start. They are **never** stored in GitHub and never baked into images.

---

## 3. Dockerfile Addition — Migrator Stage

The production runner prunes devDependencies, so the Prisma CLI is not available there. Add a dedicated `migrator` target to `backend/Dockerfile` **between the `builder` and `runner` stages** (so the default build target remains `runner`):

```dockerfile
# Stage 2.5: One-off migration image (contains Prisma CLI; never serves traffic)
FROM node:20-alpine AS migrator
RUN apk add --no-cache openssl libc6-compat
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY prisma ./prisma
ENV NODE_ENV=production
# DIRECT_URL (not the pooled DATABASE_URL) is injected by ECS from SSM for this task only
CMD ["npx", "prisma", "migrate", "deploy"]
```

---

## 4. ECS Task Definition Templates (stored in repo: `infra/ecs/`)

### 4.1 `infra/ecs/backend-taskdef.json`
`<ACCOUNT_ID>` placeholders are replaced by you once; the `image` field is rewritten by the workflow on every deploy.

```json
{
  "family": "ecofone-backend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "runtimePlatform": { "cpuArchitecture": "ARM64", "operatingSystemFamily": "LINUX" },
  "executionRoleArn": "arn:aws:iam::<ACCOUNT_ID>:role/ecofone-ecs-execution-role",
  "taskRoleArn": "arn:aws:iam::<ACCOUNT_ID>:role/ecofone-backend-task-role",
  "volumes": [],
  "containerDefinitions": [
    {
      "name": "backend",
      "image": "REPLACED_BY_WORKFLOW",
      "essential": true,
      "stopTimeout": 30,
      "readonlyRootFilesystem": true,
      "portMappings": [{ "containerPort": 4012, "protocol": "tcp" }],
      "environment": [
        { "name": "NODE_ENV", "value": "production" },
        { "name": "PORT", "value": "4012" },
        { "name": "CORS_ORIGINS", "value": "https://ecofone.co.in,https://www.ecofone.co.in" },
        { "name": "DB_POOL_SIZE", "value": "10" }
      ],
      "secrets": [
        { "name": "DATABASE_URL", "valueFrom": "arn:aws:ssm:ap-south-1:<ACCOUNT_ID>:parameter/ecofone/prod/DATABASE_URL" },
        { "name": "REDIS_URL", "valueFrom": "arn:aws:ssm:ap-south-1:<ACCOUNT_ID>:parameter/ecofone/prod/REDIS_URL" },
        { "name": "RAZORPAY_WEBHOOK_SECRET", "valueFrom": "arn:aws:ssm:ap-south-1:<ACCOUNT_ID>:parameter/ecofone/prod/RAZORPAY_WEBHOOK_SECRET" },
        { "name": "JWT_PRIVATE_KEY", "valueFrom": "arn:aws:ssm:ap-south-1:<ACCOUNT_ID>:parameter/ecofone/prod/JWT_PRIVATE_KEY" },
        { "name": "ZOHO_SMTP_PASS", "valueFrom": "arn:aws:ssm:ap-south-1:<ACCOUNT_ID>:parameter/ecofone/prod/ZOHO_SMTP_PASS" }
      ],
      "healthCheck": {
        "command": ["CMD-SHELL", "curl -f http://127.0.0.1:4012/api/v1/health/live || exit 1"],
        "interval": 30,
        "timeout": 5,
        "retries": 3,
        "startPeriod": 25
      },
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/ecofone-backend",
          "awslogs-region": "ap-south-1",
          "awslogs-stream-prefix": "backend"
        }
      }
    }
  ]
}
```

### 4.2 `infra/ecs/frontend-taskdef.json`
```json
{
  "family": "ecofone-frontend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "runtimePlatform": { "cpuArchitecture": "ARM64", "operatingSystemFamily": "LINUX" },
  "executionRoleArn": "arn:aws:iam::<ACCOUNT_ID>:role/ecofone-ecs-execution-role",
  "taskRoleArn": "arn:aws:iam::<ACCOUNT_ID>:role/ecofone-frontend-task-role",
  "volumes": [
    { "name": "tmp" },
    { "name": "next-cache" }
  ],
  "containerDefinitions": [
    {
      "name": "frontend",
      "image": "REPLACED_BY_WORKFLOW",
      "essential": true,
      "stopTimeout": 30,
      "readonlyRootFilesystem": true,
      "portMappings": [{ "containerPort": 3000, "protocol": "tcp" }],
      "mountPoints": [
        { "sourceVolume": "tmp", "containerPath": "/tmp", "readOnly": false },
        { "sourceVolume": "next-cache", "containerPath": "/app/.next/cache", "readOnly": false }
      ],
      "environment": [
        { "name": "NODE_ENV", "value": "production" },
        { "name": "PORT", "value": "3000" },
        { "name": "HOSTNAME", "value": "0.0.0.0" },
        { "name": "INTERNAL_BACKEND_URL", "value": "http://ecofone-backend.local:4012" }
      ],
      "secrets": [
        { "name": "REVALIDATE_SECRET", "valueFrom": "arn:aws:ssm:ap-south-1:<ACCOUNT_ID>:parameter/ecofone/prod/REVALIDATE_SECRET" }
      ],
      "healthCheck": {
        "command": ["CMD-SHELL", "curl -f http://127.0.0.1:3000/ || exit 1"],
        "interval": 30,
        "timeout": 5,
        "retries": 3,
        "startPeriod": 20
      },
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/ecofone-frontend",
          "awslogs-region": "ap-south-1",
          "awslogs-stream-prefix": "frontend"
        }
      }
    }
  ]
}
```

> **Why the two volumes?** With `readonlyRootFilesystem: true`, Next.js still needs a writable `/tmp` (used by the fallback layer in `frontend/lib/json-fallback.ts`) and a writable `.next/cache` (ISR / image optimization cache). Mounting ephemeral volumes there keeps the root filesystem locked down (failure rule #7).

### 4.3 `infra/ecs/migrate-taskdef.json`
```json
{
  "family": "ecofone-migrate",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "runtimePlatform": { "cpuArchitecture": "ARM64", "operatingSystemFamily": "LINUX" },
  "executionRoleArn": "arn:aws:iam::<ACCOUNT_ID>:role/ecofone-ecs-execution-role",
  "taskRoleArn": "arn:aws:iam::<ACCOUNT_ID>:role/ecofone-migrate-task-role",
  "containerDefinitions": [
    {
      "name": "migrate",
      "image": "REPLACED_BY_WORKFLOW",
      "essential": true,
      "environment": [{ "name": "NODE_ENV", "value": "production" }],
      "secrets": [
        { "name": "DATABASE_URL", "valueFrom": "arn:aws:ssm:ap-south-1:<ACCOUNT_ID>:parameter/ecofone/prod/DIRECT_URL" },
        { "name": "DIRECT_URL", "valueFrom": "arn:aws:ssm:ap-south-1:<ACCOUNT_ID>:parameter/ecofone/prod/DIRECT_URL" }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/ecofone-migrate",
          "awslogs-region": "ap-south-1",
          "awslogs-stream-prefix": "migrate"
        }
      }
    }
  ]
}
```

> For the migration task, `DATABASE_URL` is deliberately pointed at the **direct** (non-pooled) RDS endpoint as well: Prisma migrations take advisory locks and use session-level features that break behind a transaction-mode pooler such as PgBouncer / RDS Proxy.

---

## 5. The Deployment Workflow — `.github/workflows/aws-deploy.yml`

```yaml
name: EcoFone AWS Deploy (ECR + ECS Zero-Downtime)

on:
  push:
    branches: [main]
    paths:
      - 'backend/**'
      - 'frontend/**'
      - 'infra/ecs/**'
      - '.github/workflows/aws-deploy.yml'
  workflow_dispatch:
    inputs:
      skip_migrations:
        description: 'Skip prisma migrate deploy (use only if no schema change)'
        type: boolean
        default: false

# Only one production deploy at a time; never cancel a deploy that is mid-flight.
concurrency:
  group: ecofone-production-deploy
  cancel-in-progress: false

permissions:
  id-token: write   # required for GitHub OIDC -> AWS
  contents: read

env:
  AWS_REGION: ${{ vars.AWS_REGION }}
  ECR_REGISTRY: ${{ vars.AWS_ACCOUNT_ID }}.dkr.ecr.${{ vars.AWS_REGION }}.amazonaws.com
  IMAGE_TAG: ${{ github.sha }}

jobs:
  # ---------------------------------------------------------------------------
  # 1. VERIFY — fail fast before spending build minutes
  # ---------------------------------------------------------------------------
  verify:
    name: Verify (typecheck, prisma, audit)
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20.18.0'
          cache: 'npm'
          cache-dependency-path: |
            backend/package-lock.json
            frontend/package-lock.json

      - name: Secret scan (Gitleaks)
        uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Backend typecheck, prisma validate, audit
        working-directory: ./backend
        env:
          DATABASE_URL: postgresql://placeholder:placeholder@localhost:5432/placeholder
          DIRECT_URL: postgresql://placeholder:placeholder@localhost:5432/placeholder
        run: |
          npm ci
          npx prisma validate
          npx tsc --noEmit
          npm audit --audit-level=high

      - name: Frontend typecheck
        working-directory: ./frontend
        run: |
          npm ci
          npx tsc --noEmit

  # ---------------------------------------------------------------------------
  # 2. BUILD & PUSH — ARM64 images tagged with the commit SHA
  # ---------------------------------------------------------------------------
  build-push:
    name: Build & Push (${{ matrix.target.name }})
    needs: verify
    runs-on: ubuntu-latest
    environment: production
    strategy:
      fail-fast: true
      matrix:
        target:
          - { name: backend,          context: ./backend,  repo: ecofone-backend,          stage: runner }
          - { name: backend-migrator, context: ./backend,  repo: ecofone-backend-migrator, stage: migrator }
          - { name: frontend,         context: ./frontend, repo: ecofone-frontend,         stage: runner }
    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_DEPLOY_ROLE_ARN }}
          aws-region: ${{ env.AWS_REGION }}

      - name: Login to Amazon ECR
        uses: aws-actions/amazon-ecr-login@v2

      - name: Set up QEMU (cross-build ARM64 on x86 runner)
        uses: docker/setup-qemu-action@v3
        with:
          platforms: arm64

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Build and push ${{ matrix.target.name }} (linux/arm64)
        uses: docker/build-push-action@v6
        with:
          context: ${{ matrix.target.context }}
          target: ${{ matrix.target.stage }}
          platforms: linux/arm64
          push: true
          provenance: false
          tags: ${{ env.ECR_REGISTRY }}/${{ matrix.target.repo }}:${{ env.IMAGE_TAG }}
          cache-from: type=gha,scope=${{ matrix.target.name }}
          cache-to: type=gha,mode=max,scope=${{ matrix.target.name }}
          # NEXT_PUBLIC_* values are baked at build time (Master Rule 2.5 #6)
          build-args: |
            NEXT_PUBLIC_SITE_URL=${{ vars.NEXT_PUBLIC_SITE_URL }}
            NEXT_PUBLIC_TURNSTILE_SITE_KEY=${{ vars.NEXT_PUBLIC_TURNSTILE_SITE_KEY }}

  # ---------------------------------------------------------------------------
  # 3. MIGRATE — exactly ONE ECS task runs `prisma migrate deploy`
  # ---------------------------------------------------------------------------
  migrate:
    name: Database Migration (single RunTask)
    needs: build-push
    if: ${{ !(github.event_name == 'workflow_dispatch' && inputs.skip_migrations) }}
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_DEPLOY_ROLE_ARN }}
          aws-region: ${{ env.AWS_REGION }}

      - name: Render migration task definition
        id: render-migrate
        uses: aws-actions/amazon-ecs-render-task-definition@v1
        with:
          task-definition: infra/ecs/migrate-taskdef.json
          container-name: migrate
          image: ${{ env.ECR_REGISTRY }}/ecofone-backend-migrator:${{ env.IMAGE_TAG }}

      - name: Register migration task definition
        id: register-migrate
        run: |
          ARN=$(aws ecs register-task-definition \
            --cli-input-json "file://${{ steps.render-migrate.outputs.task-definition }}" \
            --query 'taskDefinition.taskDefinitionArn' --output text)
          echo "arn=$ARN" >> "$GITHUB_OUTPUT"

      - name: Run migration task and wait for completion
        run: |
          set -euo pipefail
          TASK_ARN=$(aws ecs run-task \
            --cluster "${{ vars.ECS_CLUSTER }}" \
            --launch-type FARGATE \
            --task-definition "${{ steps.register-migrate.outputs.arn }}" \
            --network-configuration "awsvpcConfiguration={subnets=[${{ vars.MIGRATE_SUBNETS }}],securityGroups=[${{ vars.MIGRATE_SECURITY_GROUP }}],assignPublicIp=DISABLED}" \
            --query 'tasks[0].taskArn' --output text)

          echo "Migration task started: $TASK_ARN"
          aws ecs wait tasks-stopped --cluster "${{ vars.ECS_CLUSTER }}" --tasks "$TASK_ARN"

          EXIT_CODE=$(aws ecs describe-tasks \
            --cluster "${{ vars.ECS_CLUSTER }}" --tasks "$TASK_ARN" \
            --query 'tasks[0].containers[0].exitCode' --output text)

          echo "Migration container exit code: $EXIT_CODE"
          if [ "$EXIT_CODE" != "0" ]; then
            echo "::error::prisma migrate deploy failed (exit $EXIT_CODE). Check CloudWatch log group /ecs/ecofone-migrate."
            exit 1
          fi

  # ---------------------------------------------------------------------------
  # 4. DEPLOY BACKEND — rolling update with circuit breaker
  # ---------------------------------------------------------------------------
  deploy-backend:
    name: Deploy Backend (NestJS)
    needs: [build-push, migrate]
    # Run even if migrate was intentionally skipped; never run if it failed.
    if: ${{ always() && needs.build-push.result == 'success' && (needs.migrate.result == 'success' || needs.migrate.result == 'skipped') }}
    runs-on: ubuntu-latest
    environment: production
    outputs:
      previous_taskdef: ${{ steps.capture.outputs.previous }}
    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_DEPLOY_ROLE_ARN }}
          aws-region: ${{ env.AWS_REGION }}

      - name: Capture currently running task definition (for rollback)
        id: capture
        run: |
          PREV=$(aws ecs describe-services \
            --cluster "${{ vars.ECS_CLUSTER }}" \
            --services "${{ vars.ECS_SERVICE_BACKEND }}" \
            --query 'services[0].taskDefinition' --output text)
          echo "previous=$PREV" >> "$GITHUB_OUTPUT"
          echo "Previous backend task definition: $PREV"

      - name: Render backend task definition
        id: render
        uses: aws-actions/amazon-ecs-render-task-definition@v1
        with:
          task-definition: infra/ecs/backend-taskdef.json
          container-name: backend
          image: ${{ env.ECR_REGISTRY }}/ecofone-backend:${{ env.IMAGE_TAG }}

      - name: Deploy to ECS and wait for service stability
        uses: aws-actions/amazon-ecs-deploy-task-definition@v2
        with:
          task-definition: ${{ steps.render.outputs.task-definition }}
          service: ${{ vars.ECS_SERVICE_BACKEND }}
          cluster: ${{ vars.ECS_CLUSTER }}
          wait-for-service-stability: true
          wait-for-minutes: 15

  # ---------------------------------------------------------------------------
  # 5. DEPLOY FRONTEND — after the API is healthy
  # ---------------------------------------------------------------------------
  deploy-frontend:
    name: Deploy Frontend (Next.js)
    needs: [build-push, deploy-backend]
    runs-on: ubuntu-latest
    environment: production
    outputs:
      previous_taskdef: ${{ steps.capture.outputs.previous }}
    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_DEPLOY_ROLE_ARN }}
          aws-region: ${{ env.AWS_REGION }}

      - name: Capture currently running task definition (for rollback)
        id: capture
        run: |
          PREV=$(aws ecs describe-services \
            --cluster "${{ vars.ECS_CLUSTER }}" \
            --services "${{ vars.ECS_SERVICE_FRONTEND }}" \
            --query 'services[0].taskDefinition' --output text)
          echo "previous=$PREV" >> "$GITHUB_OUTPUT"
          echo "Previous frontend task definition: $PREV"

      - name: Render frontend task definition
        id: render
        uses: aws-actions/amazon-ecs-render-task-definition@v1
        with:
          task-definition: infra/ecs/frontend-taskdef.json
          container-name: frontend
          image: ${{ env.ECR_REGISTRY }}/ecofone-frontend:${{ env.IMAGE_TAG }}

      - name: Deploy to ECS and wait for service stability
        uses: aws-actions/amazon-ecs-deploy-task-definition@v2
        with:
          task-definition: ${{ steps.render.outputs.task-definition }}
          service: ${{ vars.ECS_SERVICE_FRONTEND }}
          cluster: ${{ vars.ECS_CLUSTER }}
          wait-for-service-stability: true
          wait-for-minutes: 15

  # ---------------------------------------------------------------------------
  # 6. SMOKE TEST — verify the live site through Cloudflare -> ALB -> ECS
  # ---------------------------------------------------------------------------
  smoke-test:
    name: Post-Deploy Smoke Test
    needs: [deploy-backend, deploy-frontend]
    runs-on: ubuntu-latest
    steps:
      - name: Liveness, deep readiness and homepage checks
        env:
          BASE_URL: ${{ vars.SMOKE_BASE_URL }}
        run: |
          set -euo pipefail

          check() {
            local url="$1" expect="$2" attempts=10
            for i in $(seq 1 $attempts); do
              code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 10 "$url" || echo "000")
              echo "[$i/$attempts] $url -> $code"
              if [ "$code" = "$expect" ]; then return 0; fi
              sleep 6
            done
            echo "::error::Smoke test failed for $url (expected $expect)"
            return 1
          }

          check "$BASE_URL/api/v1/health/live" 200   # shallow liveness (event loop)
          check "$BASE_URL/api/v1/health"      200   # deep readiness (PostgreSQL / Redis)
          check "$BASE_URL/"                   200   # Next.js SSR/ISR homepage
          check "$BASE_URL/buy"                200   # dynamic catalog route
          check "$BASE_URL/robots.txt"         200   # SEO artefact

  # ---------------------------------------------------------------------------
  # 7. ROLLBACK — restore previous task definitions if smoke tests fail
  # ---------------------------------------------------------------------------
  rollback:
    name: Automatic Rollback
    needs: [deploy-backend, deploy-frontend, smoke-test]
    if: ${{ always() && needs.smoke-test.result == 'failure' }}
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Configure AWS credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_DEPLOY_ROLE_ARN }}
          aws-region: ${{ env.AWS_REGION }}

      - name: Roll back backend and frontend to previous task definitions
        run: |
          set -euo pipefail
          aws ecs update-service \
            --cluster "${{ vars.ECS_CLUSTER }}" \
            --service "${{ vars.ECS_SERVICE_BACKEND }}" \
            --task-definition "${{ needs.deploy-backend.outputs.previous_taskdef }}" >/dev/null

          aws ecs update-service \
            --cluster "${{ vars.ECS_CLUSTER }}" \
            --service "${{ vars.ECS_SERVICE_FRONTEND }}" \
            --task-definition "${{ needs.deploy-frontend.outputs.previous_taskdef }}" >/dev/null

          aws ecs wait services-stable \
            --cluster "${{ vars.ECS_CLUSTER }}" \
            --services "${{ vars.ECS_SERVICE_BACKEND }}" "${{ vars.ECS_SERVICE_FRONTEND }}"

          echo "::warning::Rolled back to previous task definitions. Database migrations were NOT reverted — they are expand-only by policy."
```

---

## 6. Operational Runbook

### 6.1 Manual Rollback (outside the pipeline)
```bash
# List recent revisions
aws ecs list-task-definitions --family-prefix ecofone-backend --sort DESC --max-items 5

# Point the service at a known-good revision
aws ecs update-service \
  --cluster ecofone-prod \
  --service ecofone-backend \
  --task-definition ecofone-backend:<GOOD_REVISION>

aws ecs wait services-stable --cluster ecofone-prod --services ecofone-backend
```

### 6.2 Migration Policy (Expand → Deploy → Contract)
| Phase | Allowed in a single release | Not allowed in the same release |
| :--- | :--- | :--- |
| **Expand** | Add nullable columns, add tables, add indexes (`CONCURRENTLY`), add enum values | Dropping or renaming anything the currently running code still reads |
| **Deploy** | Ship code that writes/reads the new structure | — |
| **Contract** | In a *later* release: drop unused columns/tables, add `NOT NULL` once backfilled | Combining with the expand step |

Rationale: the migration job runs *before* the rolling update, so for a few minutes old and new application versions share one schema. A rollback also never reverts migrations.

### 6.3 Failure Mode Reference
| Symptom in Actions | Likely Cause | Fix |
| :--- | :--- | :--- |
| `build-push` fails with `exec format error` | Building without `platforms: linux/arm64` / QEMU step missing | Keep the QEMU step; confirm ECS task uses `ARM64` |
| `migrate` exits non-zero | Schema drift, lock contention, or `DIRECT_URL` unreachable from the migration SG | Read `/ecs/ecofone-migrate` logs; verify SG egress to RDS `5432` |
| `deploy-*` hangs then fails | New tasks failing health check (circuit breaker triggered) | Check `/ecs/<service>` logs; confirm `/api/v1/health/live` is excluded from throttling and the ALB health path is correct |
| Sporadic `502` right after deploy | Node `keepAliveTimeout` < ALB idle timeout | Ensure `main.ts` sets `keepAliveTimeout = 65_000` / `headersTimeout = 66_000` |
| `EROFS: read-only file system` | Code writing to the container FS | Write only to `/tmp` or `.next/cache` (mounted volumes), or use Redis/R2 |
| `AccessDenied` on `ecs:RegisterTaskDefinition` / `iam:PassRole` | Deploy role missing permissions | Add `iam:PassRole` for task + execution roles only |
| `smoke-test` fails on `/api/v1/health` but `/live` passes | DB/Redis unreachable from new tasks | Inspect SSM secrets, RDS/ElastiCache security groups, `DATABASE_URL` pool params |

### 6.4 Pre-Go-Live Checklist for the Pipeline
- [ ] GitHub Environment `production` created with required reviewers.
- [ ] OIDC provider + `ecofone-github-deploy` role created; trust policy scoped to this repo and `environment:production`.
- [ ] Three ECR repos created with immutable tags and scan-on-push.
- [ ] `backend/Dockerfile` has the `migrator` stage; `frontend/Dockerfile` accepts `NEXT_PUBLIC_*` build args.
- [ ] `infra/ecs/*.json` committed with `<ACCOUNT_ID>` placeholders replaced.
- [ ] ECS services: circuit breaker on, `minimumHealthyPercent=100`, `maximumPercent=200`, grace period 30s, ALB deregistration delay 20s.
- [ ] All runtime secrets stored in SSM Parameter Store / Secrets Manager and referenced via `secrets[].valueFrom`.
- [ ] VPC endpoints (ECR api/dkr, S3 gateway, Logs, SSM) present so tasks need no NAT for image pulls.
- [ ] A dry-run via `workflow_dispatch` completed successfully against a staging cluster before enabling `push` to `main`.
`````

---

## End of Document

*Compiled sections: Part 1 (audit & strategy) · Part 2 (`brain/00`–`17`) · Part 3 (`brain/18` + Section 2.5 + AWS code) · Part 4 (`brain/19` AWS GitHub Actions deploy).*
