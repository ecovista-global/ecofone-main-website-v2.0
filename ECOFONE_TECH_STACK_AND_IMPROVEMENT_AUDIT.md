# 📱 EcoFone Platform: Comprehensive Tech Stack Audit & Engineering Improvement Roadmap

**Target Project:** EcoFone Official Web Portal & Systems (v2.0)  
**Parent Organization:** Ecovista Global Private Limited  
**Audit Date:** October 2026  
**Document Purpose:** Complete technical stack breakdown, architectural assessment, security vulnerability audit, and prioritized engineering improvement recommendations.

---

## 📑 Table of Contents
1. [Executive Overview & System Architecture](#1-executive-overview--system-architecture)
2. [Comprehensive Technology Stack Breakdown](#2-comprehensive-technology-stack-breakdown)
   - [Frontend Architecture](#frontend-architecture)
   - [Backend API Architecture](#backend-api-architecture)
   - [Database, Storage & Data Persistence Tier](#database-storage--data-persistence-tier)
   - [Email & External Integrations](#email--external-integrations)
   - [DevOps, Cloud Hosting & Tooling](#devops-cloud-hosting--tooling)
3. [Deep-Dive Audit: Where Improvements Are Needed](#3-deep-dive-audit-where-improvements-are-needed)
   - [🔴 Tier 1: Critical Security Vulnerabilities (Immediate Action Required)](#-tier-1-critical-security-vulnerabilities-immediate-action-required)
   - [🟠 Tier 2: Architecture & Data Persistence Flaws (Dual-Backend Split)](#-tier-2-architecture--data-persistence-flaws-dual-backend-split)
   - [🟡 Tier 3: Scalability & Performance Bottlenecks](#-tier-3-scalability--performance-bottlenecks)
   - [🔵 Tier 4: Code Quality, Technical Debt & Repository Hygiene](#-tier-4-code-quality-technical-debt--repository-hygiene)
   - [🟣 Tier 5: E-Commerce, Trade-In & Business Logic Gaps](#-tier-5-e-commerce-trade-in--business-logic-gaps)
4. [Actionable Implementation Roadmap (P0 to P2)](#4-actionable-implementation-roadmap-p0-to-p2)

---

## 1. Executive Overview & System Architecture

EcoFone operates a re-commerce platform for buying certified pre-owned smartphones, booking doorstep sell/trade-in valuations, applying for retail franchise partnerships (FICO/FOCO), and verifying corporate credentials.

### High-Level Architectural Diagram

```
+-----------------------------------------------------------------------------------+
|                                 CLIENT BROWSERS                                   |
|                        (Desktop, Tablet, iOS, Android Web)                        |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                        TIER 1: FRONTEND (Next.js 15)                             |
|                           Port 3000 / Vercel Edge                                 |
|                                                                                   |
|  • React 19 UI Components + Tailwind CSS + Lucide Icons                           |
|  • Next.js App Router (14 public routes + /admin CMS)                             |
|  • Client API Layer (frontend/lib/api.ts) with dual-backend fallback              |
|  • Next.js Route Handlers (/api/contact, /api/careers, /api/stores, etc.)         |
|  • Local Flat-File JSON Stores (frontend/data/*.json)                             |
|  • Local Uploads Storage (frontend/public/uploads/*)                              |
+--------------------+------------------------------------+-------------------------+
                     | Next.js Rewrites                   | Dual Zoho Mail
                     | /api/v1/:path*                     | SSL Port 465
                     v                                    v
+-----------------------------------------+   +-------------------------------------+
|        TIER 2: BACKEND (NestJS 10)      |   |       ENTERPRISE EMAIL RELAY        |
|        Port 4012 / Kloudbean Cloud      |   |  • future@ecofone.co.in (HR/Jobs)   |
|                                         |   |  • business@ecofone.co.in (Leads)   |
|  • Express Adapter + Helmet + Throttler |   +-------------------------------------+
|  • Auth & RBAC (JWT, Phone OTP, Google) |
|  • E-Commerce, SKUs & Inventory Engine  |
|  • Trade-In Diagnostic Pricing Engine   |
|  • Certificate Verification Service     |
|  • Cloudflare R2 S3 Object Storage API  |
+--------------------+--------------------+
                     |
                     | Prisma ORM 5
                     v
+-----------------------------------------------------------------------------------+
|                 TIER 3: DATABASE (PostgreSQL / Neon Serverless)                   |
|                                                                                   |
|  • Tables: User, SubAdmin, Store, FranchiseApplication, Brand, DeviceModel,       |
|    DeviceVariant, SKU, InventoryItem, Order, TradeInQuote, Certificate, etc.      |
+-----------------------------------------------------------------------------------+
```

---

## 2. Comprehensive Technology Stack Breakdown

### Frontend Architecture
| Layer / Tool | Technology / Package | Version | Purpose in EcoFone |
| :--- | :--- | :--- | :--- |
| **Framework** | [Next.js](https://nextjs.org/) (App Router) | `^15.0.0` | Core web application framework, SSR/SSG, routing, dynamic API routes |
| **UI Library** | [React](https://react.dev/) & React-DOM | `^19.0.0` | Client component rendering, reactive forms, interactive calculators |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `^5.0.0` | Static typing and interfaces |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `^3.4.0` | Utility-first responsive styling and brand theming |
| **CSS Plugins** | `@tailwindcss/typography`, `tailwindcss-animate` | `^0.5.20`, `^1.0.7` | Editorial typography styling and transition animations |
| **Post-Processing** | `postcss`, `autoprefixer` | `^8.4.0`, `^10.4.0` | CSS compilation and cross-browser vendor prefixing |
| **Icons** | [Lucide React](https://lucide.dev/) | `^0.300.0` | Vector UI icons |
| **Typography** | Google Fonts (`Inter`, `Plus Jakarta Sans`) | Embedded via `next/font` | Clean display headings and body typography |
| **Spreadsheet Handling** | `exceljs`, `xlsx` | `^4.4.0`, `^0.18.5` | Exporting career applications, franchise leads, and store audit sheets |
| **PDF & Canvas** | `jspdf`, `html2canvas`, `jimp` | `^4.2.1`, `^1.4.1`, `^1.6.1` | Client-side credential generation, DOM capture, certificate rendering |
| **Mail Dispatch** | `nodemailer` | `^10.1.0` | Direct SMTP dispatch from Next.js route handlers |
| **Class Utilities** | `clsx`, `tailwind-merge` | `^2.1.0`, `^2.2.0` | Dynamic CSS class concatenation and conflict resolution |

### Backend API Architecture
| Layer / Tool | Technology / Package | Version | Purpose in EcoFone |
| :--- | :--- | :--- | :--- |
| **Core Framework** | [NestJS](https://nestjs.com/) | `^10.0.0` | Modular enterprise REST API backend server |
| **HTTP Engine** | Express (`@nestjs/platform-express`) | `^10.0.0` | HTTP request/response pipeline |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `^5.2.2` | Strong typing, decorators, dependency injection |
| **Configuration** | `@nestjs/config` | `^4.0.4` | Global `.env` management |
| **Data Validation** | `class-validator`, `class-transformer` | `^0.14.0`, `^0.5.1` | DTO request body validation and type casting |
| **Security Headers** | `helmet` | `^8.3.0` | HTTP security headers (CSP, HSTS, X-Frame-Options) |
| **Rate Limiting** | `@nestjs/throttler` | `^6.5.0` | API rate limiting (60s window / 10 requests) |
| **Authentication** | `jsonwebtoken` (JWT), `bcrypt` | `^9.0.2`, `^6.0.0` | Password hashing, token signing, role verification |
| **Cloud Storage SDK** | `@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner` | `^3.500.0` | Uploads to Cloudflare R2 / AWS S3 buckets |
| **HTTP Client** | `axios`, `rxjs` | `^1.6.0`, `^7.8.1` | SMS provider webhooks, Razorpay API calls, Google OAuth token verification |

### Database, Storage & Data Persistence Tier
| Layer / Tool | Technology | Role & Details |
| :--- | :--- | :--- |
| **Database Engine** | [PostgreSQL](https://www.postgresql.org/) (Neon Serverless) | Cloud relational database for users, inventory, certificates, and logs |
| **ORM** | [Prisma ORM](https://www.prisma.io/) (`5.0.0`) | Schema definition, migration management, and type-safe query generation |
| **Object Storage** | Cloudflare R2 (S3-Compatible) | Resumes, hero banners, and certificate media assets |
| **Local Flat Files** | JSON storage (`frontend/data/*.json`) | Secondary persistent store for careers, stores, contact queries, and articles |
| **Local Disk Uploads** | Local Filesystem (`frontend/public/uploads/`) | Temporary upload folder for resumes, blogs, and store photography |

### Email & External Integrations
| Service | Provider / Target | Protocol / Endpoint | Purpose |
| :--- | :--- | :--- | :--- |
| **HR & Careers SMTP** | Zoho Mail (`future@ecofone.co.in`) | Port 465 (SSL) `smtp.zoho.in` | Job applications, candidate auto-responders, resume attachment delivery |
| **Business & Franchise SMTP** | Zoho Mail (`business@ecofone.co.in`) | Port 465 (SSL) `smtp.zoho.in` | Franchise inquiries, contact messages, customer acknowledgement |
| **Payment Gateway** | [Razorpay](https://razorpay.com/) | `https://api.razorpay.com/v1/orders` | Checkout order creation and payment signature verification |
| **SMS Gateways** | MSG91 / Twilio | REST API | Customer OTP generation and mobile verification |
| **Identity Provider** | Google Identity Platform | `https://oauth2.googleapis.com/tokeninfo` | Google Social Sign-In |
| **Maps Integration** | Google Maps API & regex resolver | URL extraction & embeds | Store locator geocoding and direction routing |

---

## 3. Deep-Dive Audit: Where Improvements Are Needed

### 🔴 Tier 1: Critical Security Vulnerabilities (Immediate Action Required)

#### 1. Plaintext Database Credentials & Master Passwords in Git
- **Problem:** In [`backend/vercel.json`](file:///home/nakul/Documents/Internship%20EcoFone/ecofone-main-website-v2.0/backend/vercel.json#L4-L8), the live Neon PostgreSQL connection string (including the live password `npg_EB9knm7bFeCf`), the `MASTER_ADMIN_PASSWORD="admin123"`, and the `JWT_SECRET` are stored directly in plaintext and committed to Git.
- **Problem:** In [`backend/src/auth/auth.service.ts:L205`](file:///home/nakul/Documents/Internship%20EcoFone/ecofone-main-website-v2.0/backend/src/auth/auth.service.ts#L205) and [`L284`](file:///home/nakul/Documents/Internship%20EcoFone/ecofone-main-website-v2.0/backend/src/auth/auth.service.ts#L284), hardcoded fallback passwords (`'Ecofone@123'`, `'admin123'`) are embedded in the authentication logic.
- **Risk:** Anyone with repository read access can connect directly to the production database, view customer PII, truncate tables, or authenticate as master administrator.
- **Remediation:**
  1. Immediately rotate the database password on Neon Console.
  2. Remove `backend/vercel.json` from Git tracking or strip the credentials block, configuring them strictly via cloud environment variables (e.g., Vercel / Kloudbean dashboard).
  3. Remove hardcoded fallback passwords from `auth.service.ts` and require strict environment variables.

#### 2. Plaintext Corporate Zoho SMTP Passwords Hardcoded in Code
- **Problem:** Multiple files contain hardcoded plaintext credentials for the company's official corporate email accounts:
  - [`frontend/app/api/contact/route.ts:L79`](file:///home/nakul/Documents/Internship%20EcoFone/ecofone-main-website-v2.0/frontend/app/api/contact/route.ts#L79): `const smtpPass = process.env.BUSINESS_SMTP_PASS || '4RvSXQTwhahz';`
  - [`frontend/app/api/franchise/lead/route.ts:L32`](file:///home/nakul/Documents/Internship%20EcoFone/ecofone-main-website-v2.0/frontend/app/api/franchise/lead/route.ts#L32): `const smtpPass = process.env.BUSINESS_SMTP_PASS || '4RvSXQTwhahz';`
  - [`frontend/app/api/careers/applications/route.ts:L39`](file:///home/nakul/Documents/Internship%20EcoFone/ecofone-main-website-v2.0/frontend/app/api/careers/applications/route.ts#L39): `const smtpPass = process.env.SMTP_PASS || '1jD5VQjdhRZx';`
  - [`UPDATES_2026-10-12.md:L26-L27`](file:///home/nakul/Documents/Internship%20EcoFone/ecofone-main-website-v2.0/UPDATES_2026-10-12.md#L26-L27): Markdown changelog actively documents passwords.
- **Risk:** The company's official email accounts (`business@ecofone.co.in`, `future@ecofone.co.in`) can be hijacked, used for phishing, or compromised by spammers.
- **Remediation:**
  1. Rotate both Zoho Mail account passwords immediately.
  2. Generate application-specific passwords in Zoho Security settings.
  3. Remove fallback password strings from source code and markdown documentation.

#### 3. Unauthenticated Public Endpoints Leaking Candidate & Customer PII
- **Problem:**
  - In [`frontend/app/api/careers/applications/route.ts:L149-L152`](file:///home/nakul/Documents/Internship%20EcoFone/ecofone-main-website-v2.0/frontend/app/api/careers/applications/route.ts#L149-L152):
    ```typescript
    export async function GET() {
      const apps = getApplications();
      return NextResponse.json(apps);
    }
    ```
  - In [`frontend/app/api/careers/download/route.ts:L20`](file:///home/nakul/Documents/Internship%20EcoFone/ecofone-main-website-v2.0/frontend/app/api/careers/download/route.ts#L20): `GET /api/careers/download` produces full Excel/CSV dumps of all candidates without checking authentication or session cookies.
  - In [`frontend/app/api/contact/route.ts:L34`](file:///home/nakul/Documents/Internship%20EcoFone/ecofone-main-website-v2.0/frontend/app/api/contact/route.ts#L34): `GET /api/contact` exposes all customer contact messages without auth.
- **Risk:** Any anonymous web crawler, competitor, or scraper can dump every job applicant's phone number, email, address, previous salary, expected salary, and private resume link (GDPR / DPDP compliance violation).
- **Remediation:**
  - Add authorization guards (JWT verification or NextAuth session check) on all `GET`, `PATCH`, and `DELETE` handlers for `/api/careers/*` and `/api/contact/*`.

#### 4. Payment Verification Bypass in E-Commerce Checkout
- **Problem:**
  - In [`backend/src/ecommerce/ecommerce.service.ts:L236-L238`](file:///home/nakul/Documents/Internship%20EcoFone/ecofone-main-website-v2.0/backend/src/ecommerce/ecommerce.service.ts#L236-L238):
    ```typescript
    const isMockBypass = razorpaySignature === 'rzp_mock_signature';
    if (signatureMatch || isMockBypass) {
      // Marks order as PAID and reserves inventory
    ```
  - In [`frontend/app/buy/page.tsx:L139-L155`](file:///home/nakul/Documents/Internship%20EcoFone/ecofone-main-website-v2.0/frontend/app/buy/page.tsx#L139-L155): The frontend checkout does not invoke the Razorpay Checkout SDK. It calls `setTimeout()` after 1.5s and sends `rzp_mock_signature`, automatically marking orders as paid without taking payment.
- **Risk:** If deployed live, anyone can place orders for expensive iPhones/Galaxies for free, depleting inventory records.
- **Remediation:**
  - Completely strip `isMockBypass` in production mode (`process.env.NODE_ENV === 'production'`).
  - Implement the official Razorpay Checkout client modal (`RazorpayCheckout.open()`) on the frontend to receive genuine payment signatures.

#### 5. Flawed Sub-Admin Password-Only Authentication
- **Problem:** In [`backend/src/sub-admin/sub-admin.service.ts:L77-L106`](file:///home/nakul/Documents/Internship%20EcoFone/ecofone-main-website-v2.0/backend/src/sub-admin/sub-admin.service.ts#L77-L106), sub-admins log in **without a username**:
  ```typescript
  async login(password: string) {
    const all = await this.prisma.subAdmin.findMany();
    for (const sa of all) {
      const match = await bcrypt.compare(password, sa.password);
      if (match) return { token, user: sa };
    }
  ```
- **Risk:**
  1. No username accountability.
  2. If two sub-admins set the same password, the first one in the table is returned.
  3. Looping `bcrypt.compare` over all table records is a CPU exhaustion vector (DoS) and allows timing attacks.
- **Remediation:**
  - Change sub-admin login to require both `username` and `password`, querying `findUnique({ where: { username } })` before running a single `bcrypt.compare`.

---

### 🟠 Tier 2: Architecture & Data Persistence Flaws (Dual-Backend Split)

#### 1. Architectural Split: Next.js JSON Files vs. NestJS PostgreSQL
- **Problem:**
  - EcoFone has two competing backends: Next.js route handlers writing to local `.json` files in `frontend/data/`, and a NestJS server writing to PostgreSQL with Prisma.
  - In [`frontend/lib/api.ts`](file:///home/nakul/Documents/Internship%20EcoFone/ecofone-main-website-v2.0/frontend/lib/api.ts#L119-L158), methods like `locateStores`, `addStore`, and `getResearchArticles` first try the local `/api/stores` route, and if that fails, fall back to `/api/v1/cms/stores` on NestJS!
- **Consequence:** Data updated in the admin panel gets written to one store while the other remains stale. There is no single source of truth.
- **Remediation:**
  - Consolidate persistence into PostgreSQL via Prisma. Remove the local JSON read/write logic and make Next.js route handlers simple proxies or migrate them entirely into the NestJS controllers.

#### 2. Ephemeral Local File Uploads on Cloud / Serverless
- **Problem:** Resumes ([`careers/upload/route.ts:L36-L50`](file:///home/nakul/Documents/Internship%20EcoFone/ecofone-main-website-v2.0/frontend/app/api/careers/upload/route.ts#L36-L50)), store storefront photos, and blog images are saved via `fs.writeFileSync()` to `public/uploads/` on the local container filesystem.
- **Consequence:** On serverless platforms (Vercel, AWS Lambda) or multi-container clusters (Kloudbean, Kubernetes, Railway), the filesystem is read-only or ephemeral. Files uploaded to one container are lost on restart or missing on other replicas.
- **Remediation:**
  - Stream all uploads directly to Cloudflare R2 / AWS S3 using presigned URLs or server-side S3 client uploads. Return permanent CDN URLs (`https://assets.ecofone.co.in/...`).

#### 3. In-Memory Rate Limiting Fails in Serverless / Multi-Instance Deployments
- **Problem:** [`frontend/lib/rate-limit.ts:L8`](file:///home/nakul/Documents/Internship%20EcoFone/ecofone-main-website-v2.0/frontend/lib/rate-limit.ts#L8) maintains an in-memory `Map<string, RateLimitRecord>`.
- **Consequence:** In serverless or multi-pod environments, memory is not shared between instances, making rate limits ineffective against brute-force attacks or submission spam. Additionally, trusting raw `x-forwarded-for` headers allows attackers to easily spoof IP addresses.
- **Remediation:**
  - Adopt Redis-based distributed rate limiting (e.g., Upstash Redis with `@upstash/ratelimit`).

---

### 🟡 Tier 3: Scalability & Performance Bottlenecks

#### 1. S3/R2 Bucket Exhaustive Scan on Every Single File Upload
- **Problem:** In [`backend/src/cms/cms.service.ts:L21-L71`](file:///home/nakul/Documents/Internship%20EcoFone/ecofone-main-website-v2.0/backend/src/cms/cms.service.ts#L21-L71):
  Every time a user or admin uploads a file, `getStorageUsage()` is executed:
  ```typescript
  while (isTruncated) {
    const response = await this.r2Client.send(
      new ListObjectsV2Command({ Bucket: bucketName, ContinuationToken: continuationToken })
    );
    // Sums every single object size across the entire bucket...
  }
  ```
- **Consequence:** As the platform grows to thousands of photos and resumes, every upload will perform dozens of paginated S3 requests, slowing upload latency to 10–30+ seconds, generating excessive Cloudflare/AWS API fees, and eventually timing out.
- **Remediation:**
  - Store total storage usage as an aggregated counter in PostgreSQL (`SystemSettings.totalStorageBytes`) and increment it atomically on each upload, avoiding full bucket scans.

#### 2. Unpaginated In-Memory E-Commerce Catalog Query
- **Problem:** In [`backend/src/ecommerce/ecommerce.service.ts:L18-L77`](file:///home/nakul/Documents/Internship%20EcoFone/ecofone-main-website-v2.0/backend/src/ecommerce/ecommerce.service.ts#L18-L77), `getCatalog()` runs:
  ```typescript
  const skus = await this.prisma.sKU.findMany({ include: { variant: ..., inventory: true } });
  ```
  It loads **every SKU and inventory record in the entire database** into Node.js process memory, and then runs JavaScript `.filter()` for brand, RAM, storage, price, etc.
- **Consequence:** Under moderate inventory growth (1,000+ SKUs), this query will saturate CPU and RAM, degrade response times, and eventually crash the backend process with out-of-memory errors.
- **Remediation:**
  - Move filtering (`brand`, `ram`, `price`) directly into Prisma's `where` query clause and add database-level pagination (`take`, `skip`).

#### 3. Massive Monolithic Admin Dashboard Component (5,725 Lines)
- **Problem:** [`frontend/app/admin/page.tsx`](file:///home/nakul/Documents/Internship%20EcoFone/ecofone-main-website-v2.0/frontend/app/admin/page.tsx) is a single file with **5,725 lines** and 289 KB of client-side code.
- **Consequence:**
  - Severe developer friction and high probability of merge conflicts.
  - Large initial JavaScript bundle size loaded on admin access.
  - Heavy re-renders across disparate admin tabs.
- **Remediation:**
  - Refactor tabs (Franchise Leads, Contact Messages, Security/Sub-Admins, System Logs, Certificates, Stores) into distinct route pages under `app/admin/(routes)/...` or independent, lazy-loaded components via `next/dynamic`.

#### 4. Heavy Libraries Loaded in Client Bundle
- **Problem:** Heavy dependencies like `exceljs` (55KB+ bare, 900KB unpacked), `jspdf` (33KB), `html2canvas`, and `xlsx` are imported top-level in client components.
- **Remediation:**
  - Dynamically import (`await import('exceljs')`) only when the user clicks the "Export Excel" or "Download Certificate" buttons.

---

### 🔵 Tier 4: Code Quality, Technical Debt & Repository Hygiene

#### 1. Ad-Hoc Monkeypatch and Scratch Scripts Committed to Git
- **Problem:** Several temporary patch scripts and database migration experiments remain in the codebase:
  - `frontend/patch_admin.py` (contains hardcoded local Windows paths: `d:\ecofone main website\frontend\app\admin\page.tsx`)
  - `frontend/patch_page.py`, `frontend/replace_grid.js`, `frontend/replace_process.js`, `frontend/fix_sis.js`, `frontend/compact_process.js`
  - `backend/check-admins.js`, `backend/clean-db.js`, `backend/delete-all-certificates.js`, `backend/test-login-api.js`, `backend/database_db.json`, `backend/db_backup.json`
  - `backend/deploy-kloudbean.js` (contains hardcoded deployment webhook secrets)
- **Remediation:**
  - Remove all scratch and one-off patch scripts. Add them to `.gitignore`.
  - Move persistent administration utilities to formal NPM scripts or NestJS CLI commands.

#### 2. Dead Code Left in Frontend: `page_head.tsx`
- **Problem:** [`frontend/page_head.tsx`](file:///home/nakul/Documents/Internship%20EcoFone/ecofone-main-website-v2.0/frontend/page_head.tsx) is an 813-line (55KB) file that was abandoned and explicitly excluded in `tsconfig.json` (`"exclude": ["node_modules", "page_head.tsx"]`).
- **Remediation:**
  - Delete `frontend/page_head.tsx` to keep the codebase clean.

#### 3. React Strict Mode Disabled
- **Problem:** In [`frontend/next.config.js:L3`](file:///home/nakul/Documents/Internship%20EcoFone/ecofone-main-website-v2.0/frontend/next.config.js#L3), `reactStrictMode: false` is configured.
- **Consequence:** Disabling strict mode masks component lifecycle issues, memory leaks, and side-effect race conditions in React 19.
- **Remediation:**
  - Re-enable `reactStrictMode: true` and address any component mount/unmount warnings.

---

### 🟣 Tier 5: E-Commerce, Trade-In & Business Logic Gaps

#### 1. Hardcoded Device Catalog on Sell / Buyback Page
- **Problem:** In [`frontend/app/sell/page.tsx:L18-L51`](file:///home/nakul/Documents/Internship%20EcoFone/ecofone-main-website-v2.0/frontend/app/sell/page.tsx#L18-L51), the device valuation workflow has hardcoded brands and models in React state:
  ```typescript
  const brands = [{ id: 'b1', name: 'Apple' }, { id: 'b2', name: 'Samsung' }, { id: 'b3', name: 'OnePlus' }];
  const models = { 'b1': [{ id: 'm1', name: 'iPhone 13' }, { id: 'm2', name: 'iPhone 14' }], ... };
  ```
  Only 4 devices exist across the entire interface. It does not fetch devices from the PostgreSQL `DeviceModel` and `DeviceVariant` tables.
- **Remediation:**
  - Connect `/sell` to `api.getBrands()` and `api.getModelsByBrand(brandId)` so that devices added via the Admin CMS automatically become available for trade-in quotes.

#### 2. Silent Failure in Franchise Application Form
- **Problem:** In [`frontend/components/franchise-lead-form.tsx:L122-L126`](file:///home/nakul/Documents/Internship%20EcoFone/ecofone-main-website-v2.0/frontend/components/franchise-lead-form.tsx#L122-L126):
  ```typescript
  } catch (err: any) {
    console.warn('Franchise application submission error:', err);
    // Fallback: still treat as recorded
    setStatus('success');
  }
  ```
  If the API call fails or the backend is offline, the error is swallowed and the UI still presents a "Success! Application Received" confirmation to the prospective investor.
- **Consequence:** High-value franchise leads (e.g. ₹20–50 Lakh inquiries) can be permanently lost without the user or the business team ever knowing.
- **Remediation:**
  - Show a clear error state prompting the user to retry or call the direct telephone helpline (+91 99199 65499) if submission fails.

#### 3. Unpersisted Franchise Lead Route
- **Problem:** In [`frontend/app/api/franchise/lead/route.ts`](file:///home/nakul/Documents/Internship%20EcoFone/ecofone-main-website-v2.0/frontend/app/api/franchise/lead/route.ts), the endpoint only dispatches an email via Nodemailer. If SMTP times out or credentials fail, the lead is not recorded in any database or file.
- **Remediation:**
  - Ensure every lead submission is persisted to the database first before attempting SMTP dispatch.

---

## 4. Actionable Implementation Roadmap (P0 to P2)

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PRIORITY ROADMAP MATRIX                         │
├────────────┬───────────────────────────────────────────────────────────┤
│     P0     │ • Rotate DB & SMTP credentials; clean vercel.json & code. │
│ (Critical) │ • Lock down unauthenticated PII endpoints (/api/careers). │
│            │ • Remove payment bypass backdoor in ecommerce service.    │
├────────────┼───────────────────────────────────────────────────────────┤
│     P1     │ • Unify dual-backend: Move all JSON storage to Postgres.   │
│   (High)   │ • Migrate local file uploads to Cloudflare R2 / S3.       │
│            │ • Replace S3 bucket-scan quota loop with DB counter.      │
│            │ • Fix sub-admin login to require username + password.     │
├────────────┼───────────────────────────────────────────────────────────┤
│     P2     │ • Modularize 5,725-line admin/page.tsx into sub-routes.   │
│  (Medium)  │ • Connect /sell trade-in catalog to database SKUs.        │
│            │ • Integrate official Razorpay client modal on /buy.       │
│            │ • Clean repo: remove dead page_head.tsx & patch scripts.  │
└────────────┴───────────────────────────────────────────────────────────┘
```

### Detailed Task Checklist

#### Phase 1: Security & Compliance Fixes (Estimated: 1–2 Days)
- [ ] **Rotate Credentials:**
  - [ ] Rotate Neon PostgreSQL password on `console.neon.tech`.
  - [ ] Rotate Zoho Mail passwords for `business@ecofone.co.in` and `future@ecofone.co.in`.
  - [ ] Generate random 256-bit `JWT_SECRET`.
- [ ] **Environment Variable Sanitization:**
  - [ ] Strip plaintext env blocks from `backend/vercel.json`.
  - [ ] Remove hardcoded fallback passwords from `auth.service.ts`, `contact/route.ts`, `franchise/lead/route.ts`, and `careers/applications/route.ts`.
- [ ] **Lock Down Sensitive Endpoints:**
  - [ ] Secure `GET /api/careers/applications` behind admin authentication.
  - [ ] Secure `GET /api/careers/download` behind admin authentication.
  - [ ] Secure `GET /api/contact` behind admin authentication.
- [ ] **Eliminate Payment Bypass:**
  - [ ] Remove `isMockBypass` in `ecommerce.service.ts`.
  - [ ] Remove hardcoded `rzp_mock_signature` in `frontend/app/buy/page.tsx`.

#### Phase 2: Architecture & Storage Unification (Estimated: 3–5 Days)
- [ ] **Single Source of Truth:**
  - [ ] Migrate careers applications, stores, contact messages, and research articles from local JSON files to Prisma PostgreSQL models.
  - [ ] Deprecate `frontend/data/*.json` and simplify `frontend/lib/api.ts` to call unified endpoints.
- [ ] **Cloud Storage for Uploads:**
  - [ ] Replace `fs.writeFileSync(destinationPath, buffer)` in `careers/upload/route.ts` with direct Cloudflare R2 / S3 upload.
  - [ ] Store file metadata in the database and return secure URLs.
- [ ] **Optimize Upload Quota:**
  - [ ] Replace `ListObjectsV2Command` loop in `cms.service.ts` with a tracked `totalBytes` field in the database.
- [ ] **Sub-Admin Authentication Refactor:**
  - [ ] Update `sub-admin.service.ts` to require `username` alongside `password`.

#### Phase 3: Performance, Refactoring & Cleanup (Estimated: 3–5 Days)
- [ ] **Admin Dashboard Modularization:**
  - [ ] Break down `frontend/app/admin/page.tsx` (5,725 lines) into independent tabs/routes.
- [ ] **Dynamic Trade-In Valuation:**
  - [ ] Connect `frontend/app/sell/page.tsx` to dynamic brand, model, and variant endpoints from the database.
- [ ] **E-Commerce Razorpay SDK:**
  - [ ] Load the official Razorpay JavaScript SDK and display the payment modal to customers.
- [ ] **Repository Cleanup:**
  - [ ] Delete `frontend/page_head.tsx`.
  - [ ] Delete `frontend/patch_admin.py`, `frontend/patch_page.py`, `frontend/replace_grid.js`, `frontend/replace_process.js`, `frontend/fix_sis.js`, `frontend/compact_process.js`.
  - [ ] Delete `backend/clean-db.js`, `backend/check-db.js`, `backend/delete-all-certificates.js`, `backend/test-login-api.js`, `backend/database_db.json`.
  - [ ] Add `.env*`, `*.log`, and patch scripts to `.gitignore`.

---

*This document was compiled through deep automated inspection of the EcoFone codebase repository. For technical questions or implementation assistance, refer to the individual component files referenced above.*
