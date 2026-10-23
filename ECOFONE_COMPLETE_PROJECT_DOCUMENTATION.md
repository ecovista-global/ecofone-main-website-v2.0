# 📱 EcoFone Comprehensive Project Documentation & Architecture Blueprint
**Version:** 2.0 (Production Release)  
**Parent Organization:** Ecovista Global Private Limited  
**Brand:** EcoFone (`ecofone.co.in`)  
**Headquarters:** JB Metro Heights, Transport Nagar, Kanpur Road, Lucknow, Uttar Pradesh  
**Last Updated:** October 2026  

---

## 📑 Table of Contents
1. [Executive Summary & Brand Vision](#1-executive-summary--brand-vision)
2. [High-Level System Architecture](#2-high-level-system-architecture)
3. [Technology Stack](#3-technology-stack)
4. [Project Directory Layout](#4-project-directory-layout)
5. [Frontend Deep-Dive (Next.js 15)](#5-frontend-deep-dive-nextjs-15)
   - [Public Web Pages & Routes](#public-web-pages--routes)
   - [Interactive UI Components](#interactive-ui-components)
   - [Next.js Route Handlers (API Routes)](#nextjs-route-handlers-api-routes)
   - [Client-Side Libraries & Utilities](#client-side-libraries--utilities)
6. [Backend Deep-Dive (NestJS & Prisma ORM)](#6-backend-deep-dive-nestjs--prisma-orm)
   - [Database Schema & Data Entities](#database-schema--data-entities)
   - [Core REST API Modules](#core-rest-api-modules)
   - [Security, Throttling & Bot Protection](#security-throttling--bot-protection)
7. [Enterprise Email & Communications Infrastructure](#7-enterprise-email--communications-infrastructure)
   - [Dual Zoho SMTP Architecture](#dual-zoho-smtp-architecture)
   - [Two-Way Notification Pattern & Branded HTML Templates](#two-way-notification-pattern--branded-html-templates)
8. [Admin CMS Dashboard (`/admin`)](#8-admin-cms-dashboard-admin)
9. [Key Business Workflows](#9-key-business-workflows)
   - [Device Buyback / Trade-In Engine (`/sell`)](#device-buyback--trade-in-engine-sell)
   - [E-Commerce Marketplace & Checkout (`/buy`)](#e-commerce-marketplace--checkout-buy)
   - [Franchise Partner Acquisition & ROI Calculator (`/franchise`)](#franchise-partner-acquisition--roi-calculator-franchise)
   - [Careers Portal & Dual-Mode CV Upload (`/careers`)](#careers-portal--dual-mode-cv-upload-careers)
   - [Certificate Verification Engine (`/verify-certificate`)](#certificate-verification-engine-verify-certificate)
10. [Environment Variables & Configuration](#10-environment-variables--configuration)
11. [Deployment & Local Setup Guide](#11-deployment--local-setup-guide)

---

## 1. Executive Summary & Brand Vision

**EcoFone** is a premier sustainable consumer electronics re-commerce brand founded under **Ecovista Global Private Limited**. EcoFone addresses the massive electronic waste footprint and escalating smartphone prices in India by establishing a trustworthy, organized circular economy ecosystem.

### Core Business Pillars:
1. **Certified Pre-Owned Smartphones:** Multi-brand refurbished devices (Apple iPhone, Samsung Galaxy, OnePlus) backed by a 32-point comprehensive hardware diagnostic certification, 6-month replacement warranty, and 7-day money-back guarantee.
2. **Instant Buyback / Sell Old Mobile:** Transparent online valuation tool factoring in physical wear, screen damage, camera, battery, and functional health, with complimentary doorstep pickup and instant cash dispatch.
3. **Franchise Retail Experience Centers:** Turnkey franchise models (Standard Outlets, Shop-In-Shop [SIS], and Kiosks) operating under FICO (Franchise Invested, Company Operated) and FOCO (Franchise Operated, Company Owned) frameworks with real-time ROI forecasting.
4. **Credentialing & Certification:** In-house validation portal authenticating employee experience, internship credentials, and excellence awards issued by Ecovista Global.

---

## 2. High-Level System Architecture

The EcoFone platform is architected as a modern decoupled full-stack ecosystem:

```
                            +-----------------------------------------------+
                            |                 WEB BROWSER                   |
                            |   (Desktop, Tablet, Android / iOS Devices)    |
                            +-----------------------+-----------------------+
                                                    |
                                                    v
                            +-----------------------------------------------+
                            |         Next.js 15 App Router Frontend        |
                            |           Port 3000 / Vercel Edge             |
                            | - React 19 UI Components                      |
                            | - Tailwind CSS & Lucide Icons                 |
                            | - Next.js Route Handlers (/api/*)             |
                            | - Sliding-window IP Rate Limiter              |
                            | - Local JSON Stores (resilience fallback)     |
                            +-----------+-----------------------+-----------+
                                        |                       |
                     Next.js Rewrites   |                       |  Zoho Mail SSL
                     (/api/v1/:path*)   |                       |  (Port 465)
                                        v                       v
            +---------------------------------------+   +-------------------+
            |       NestJS REST API Backend         |   |  Dual Zoho SMTP   |
            |     Port 4012 / Kloudbean Cloud       |   | - future@...      |
            | - Helmet Security & Throttler         |   | - business@...    |
            | - RBAC Guard & JWT Authentication     |   +-------------------+
            | - Dynamic Pricing & Valuation Logic   |
            | - Razorpay Order Integration          |
            | - Cloudflare R2 Document Storage      |
            +-------------------+-------------------+
                                |
                                | Prisma ORM 5
                                v
            +---------------------------------------+
            |      PostgreSQL Neon Cloud DB         |
            | - Users, Roles & SubAdmins            |
            | - Stores & Device SKUs Inventory      |
            | - Orders & TradeIn Quotes             |
            | - Certificates & Audit Logs           |
            +---------------------------------------+
```

### Resilient Dual-Layer API Strategy
The client API library (`frontend/lib/api.ts`) implements a robust dual-path resolution:
- **Primary:** Routes through same-origin `/api/v1/*`, automatically rewritten by Next.js to the local or configured NestJS server.
- **Failover:** If SSR loopback or proxy fails, the client seamlessly falls back to the live production NestJS cloud cluster at `https://nextjs-642200683.kloudbeansite.com/api/v1`.
- **Hybrid Local Storage:** Critical standalone modules (Careers applications, store locations, and contact messages) persist locally in JSON files inside `frontend/data/` to guarantee zero data loss even during database maintenance.

---

## 3. Technology Stack

### Frontend Application
- **Core Framework:** [Next.js 15](https://nextjs.org/) (App Router, Server Components & Client Components)
- **Library:** React 19, TypeScript 5
- **Styling:** Tailwind CSS 3.4, `@tailwindcss/typography`, `tailwindcss-animate`
- **Typography:** `Inter` (Body sans-serif) and `Plus Jakarta Sans` (Display headings)
- **Icons:** `lucide-react`
- **Document & Media Processing:** `exceljs`, `xlsx`, `jspdf`, `html2canvas`, `jimp`
- **Mailing:** `nodemailer` with direct attachment piping

### Backend REST API
- **Framework:** [NestJS 10](https://nestjs.com/) (Express HTTP adapter)
- **Language:** TypeScript 5
- **Database & ORM:** PostgreSQL, [Prisma ORM 5](https://www.prisma.io/)
- **Security:** `helmet`, `@nestjs/throttler`, custom XSS sanitizer, Anti-bot request fingerprinting
- **Authentication:** `jsonwebtoken` (JWT), `bcrypt`, Phone OTP verification
- **Validation:** `class-validator`, `class-transformer`
- **Cloud Storage:** `@aws-sdk/client-s3` (compatible with Cloudflare R2 & AWS S3)

---

## 4. Project Directory Layout

```text
ecofone-main-website-v2.0/
├── README.md                          # Master GitHub overview
├── ECOFONE_COMPLETE_PROJECT_DOCUMENTATION.md # This complete technical manual
├── UPDATES_2026-10-12.md              # Infrastructure & Zoho SMTP changelog
├── UPDATES_2026-10-13.md              # Careers & Resume Upload changelog
├── UPDATES_2026-10-14.md              # Contact Us page redesign changelog
├── UPDATES_2026-10-15.md              # Store Locator & Market research changelog
│
├── backend/                           # NestJS REST API Server
│   ├── api/                           # Vercel serverless entry point
│   │   └── index.ts
│   ├── data/                          # Seed datasets
│   │   └── research_articles.json
│   ├── prisma/                        # Database schema definition
│   │   └── schema.prisma
│   ├── src/                           # NestJS application source code
│   │   ├── auth/                      # Authentication & RBAC guards
│   │   ├── certificate/               # Credential generation & validation
│   │   ├── cms/                       # Stores, team, blogs, reviews, AI chat
│   │   ├── common/                    # Filters, middleware & decorators
│   │   ├── ecommerce/                 # Catalog, SKU inventory & orders
│   │   ├── franchise/                 # Franchise applications & ROI logic
│   │   ├── sub-admin/                 # Sub-admin RBAC management
│   │   ├── system-log/                # Audit trail logging
│   │   ├── tradein/                   # Old phone valuation & pickup scheduling
│   │   ├── app.module.ts              # Root application module
│   │   ├── main.ts                    # Server bootstrap & middleware setup
│   │   └── prisma.service.ts          # Database client provider
│   ├── package.json
│   ├── server.js                      # Production startup wrapper
│   └── tsconfig.json
│
└── frontend/                          # Next.js 15 Web Application
    ├── app/                           # App Router pages & API routes
    │   ├── about/                     # About EcoFone & leadership team
    │   ├── admin/                     # Full Admin CMS Panel (12 sections)
    │   ├── api/                       # Next.js route handlers
    │   │   ├── careers/               # Job openings, upload, download, apps
    │   │   ├── contact/               # Contact message submission & mailer
    │   │   ├── franchise/             # Franchise lead capture
    │   │   └── stores/                # Store locator CMS endpoints
    │   ├── blog/                      # Recommerce news & market analysis
    │   ├── buy/                       # Refurbished smartphone marketplace
    │   ├── careers/                   # Job listings & dual-mode CV upload
    │   ├── contact/                   # Contact HQ & interactive Google Map
    │   ├── faq/                       # Frequently asked questions
    │   ├── franchise/                 # Franchise investment models & calculator
    │   ├── sell/                      # Sell old phone diagnostic quotation
    │   ├── stores/                    # Store locator redirect
    │   ├── terms-and-conditions/      # Legal terms, warranty & returns
    │   ├── verify-certificate/        # Certificate verification & PDF viewer
    │   ├── globals.css                # Global CSS variables & keyframes
    │   ├── layout.tsx                 # Root layout, Schema.org SEO, navbar, footer
    │   ├── page.tsx                   # Homepage / Landing page
    │   ├── robots.ts                  # Search engine crawl directives
    │   └── sitemap.ts                 # Dynamic XML sitemap generator
    ├── components/                    # Reusable React UI components
    │   ├── different-carousel.tsx     # Value proposition carousel
    │   ├── emi-calculator.tsx         # Monthly installment estimator
    │   ├── franchise-detailed-models.tsx # Standard, SIS & Kiosk deep-dives
    │   ├── franchise-lead-form.tsx    # Multi-step franchise inquiry form
    │   ├── investor-model.tsx         # Investor comparison breakdown
    │   ├── layout-client-wrapper.tsx  # Dynamic layout padding & route wrappers
    │   ├── market-opportunity.tsx     # Real market research infographics
    │   ├── navbar.tsx                 # Responsive header navigation
    │   ├── revenue-streamdesk.tsx     # 3-way revenue stream infographic
    │   ├── reviews-carousel.tsx       # Customer review carousel
    │   ├── scroll-reveal.tsx          # Intersection-observer reveal animations
    │   ├── service-carousel.tsx       # Core service showcase
    │   ├── split-reviews.tsx          # Dual Customer/Investor testimonials
    │   ├── store-locator-section.tsx  # Homepage 3-in-a-row store cards
    │   ├── top-brands.tsx             # Brand logo scroller (Apple, Samsung, etc.)
    │   └── whatsapp-widget.tsx        # Floating instant WhatsApp support
    ├── data/                          # Persistent JSON stores
    │   ├── blogs.ts                   # Static blog articles
    │   ├── careers_applications.json  # Stored job applications
    │   ├── careers_jobs.json          # Active job postings
    │   ├── contact_messages.json      # Stored contact messages
    │   └── stores.json                # Stored store locations
    ├── lib/                           # Helper libraries
    │   ├── api.ts                     # Full client API SDK
    │   ├── email-templates.ts         # Branded HTML email template generator
    │   ├── google-forms.ts            # CRM Google Sheets sync fallback
    │   └── rate-limit.ts              # IP sliding-window rate limiter
    └── public/                        # Static assets, branding & uploads
        ├── uploads/                   # Uploaded CV files and store photos
        ├── logo.png                   # Official EcoFone brand logo
        └── ...                        # Authentic editorial research images
```

---

## 5. Frontend Deep-Dive (Next.js 15)

### Public Web Pages & Routes

| Route | Page Purpose | Key Features |
| :--- | :--- | :--- |
| `/` | **Main Homepage** | Hero with dynamic typewriter effect, interactive FICO/FOCO ROI simulator, authentic news research visual cards, 3-outlet store locator, split customer/investor reviews, interactive FAQ accordion. |
| `/buy` | **Refurbished Catalog** | Filter devices by Brand (Apple, Samsung, OnePlus), Grade (`LIKE_NEW`, `EXCELLENT`, `GOOD`, `FAIR`), and search term. Integrated EMI calculator and phone OTP checkout modal. |
| `/sell` | **Sell Old Phone (Trade-In)** | 3-step valuation wizard: Brand/Model selection -> 5-point defect checklist (Screen, Body, Battery, Camera, Network) -> Instant price offer -> Doorstep pickup booking. |
| `/franchise` | **Franchise Expansion** | Complete investor deck: Standard Outlets, Shop-In-Shop (SIS), and Kiosk models. Unit economics, margin structures, FAQ schema, and instant lead application form. |
| `/careers` | **Talent Portal** | Unified presentation of 7 core positions, in-app role application modal, inline Open Candidacy box, dual-mode resume attachment (Upload vs Drive link), and Google Jobs Schema.org JSON-LD. |
| `/contact` | **Contact Headquarters** | Clean header below navbar, 3 value pills (24h Reply, Dedicated Support, Visit Office), validated query form, dark-green Corporate Office card, and interactive Google Maps embed. |
| `/about` | **About EcoFone** | Mission, vision, circular economy environmental impact, diagnostics pipeline summary, executive leadership directory with verified LinkedIn links. |
| `/blog` & `/[slug]` | **Recommerce News** | Market research deep-dives, industry growth trends, reading time, author tags, and structured article schemas. |
| `/verify-certificate` | **Credential Verification** | Input box for Certificate UID leading to `/[uid]` verification view with cryptographic details, authorized signatory, and printable PDF generation (`jspdf`/`html2canvas`). |
| `/terms-and-conditions`| **Legal & Policies** | Comprehensive legal guidelines covering 6-month warranty claims, 7-day returns, device grading standards, and franchise compliance. |

### Interactive UI Components
- **`StoreLocatorSection`:** 3-store grid carousel displaying actual store photography, `● Open Now` status badge, address, operating hours, direct `📞 Call Store` button, and `📍 Get Directions` Google Maps link. "View all stores" expands inline without redirecting.
- **`MarketOpportunity`:** Displays genuine editorial photographs and charts from **Counterpoint Research**, **Business Standard**, and **Times of India**, with zero broken image fallback resilience.
- **`EmiCalculator`:** Interactive sliders computing monthly installments across varying tenure (3, 6, 9, 12 months) and interest rates.
- **`FranchiseLeadForm`:** Multi-step wizard validating investment budget, city, commercial space availability, and synchronizing with Zoho SMTP.
- **`WhatsAppWidget`:** Persistent bottom-right floating badge initiating instant WhatsApp conversation with EcoFone customer care.

### Next.js Route Handlers (API Routes)

1. **`POST /api/careers/upload`:** Accepts `.pdf`, `.doc`, `.docx` files up to 10MB, validates MIME types, saves to `public/uploads/resumes/`, and returns direct URL metadata.
2. **`POST /api/careers/applications`:** Enforces IP rate limiting, records candidate data into `careers_applications.json`, attaches the uploaded resume directly, and sends dual emails via `future@ecofone.co.in`.
3. **`GET /api/careers/download`:** Generates styled `.xlsx` workbooks with dropdown status validation (`PENDING`, `SHORTLISTED`, `HIRED`, `REJECTED`) or `.csv` exports for HR management.
4. **`GET, POST, PUT, DELETE /api/careers/openings`:** CRUD operations for live career listings stored in `careers_jobs.json`.
5. **`POST /api/contact`:** Enforces rate limiting, saves messages into `contact_messages.json`, and dispatches emails to `business@ecofone.co.in`.
6. **`POST /api/franchise/lead`:** Dispatches investor inquiry emails to `business@ecofone.co.in` with detailed budget and space parameters.
7. **`GET, POST, PUT, DELETE /api/stores`:** Complete store locator management with photo uploads (`/api/stores/upload`).

---

## 6. Backend Deep-Dive (NestJS & Prisma ORM)

### Database Schema & Data Entities
The PostgreSQL database (managed via `backend/prisma/schema.prisma`) houses the complete data model:

```
+------------------------------------------------------------------------+
|                                  USER                                  |
| id (UUID) | email | phone (Unique) | name | passwordHash | role (Enum) |
+-------------------+--------------------+-------------------------------+
                    |                    |
          +---------+                    +---------+
          |                                        |
          v                                        v
+-------------------+                    +-------------------------------+
|       STORE       |                    |             ORDER             |
| id | name         |                    | id | customerId | totalAmount |
| address | lat/lng |                    | paymentStatus | paymentId     |
| type ("LIVE")     |                    | status (PROCESSING/DELIVERED) |
+---------+---------+                    +---------------+---------------+
          |                                              |
          v                                              v
+-------------------+                    +-------------------------------+
|   INVENTORYITEM   |                    |           ORDERITEM           |
| id | imei (Unique)|<-------------------+ id | orderId | skuId           |
| status (AVAILABLE)|                    | price                         |
+---------+---------+                    +-------------------------------+
          |
          v
+-------------------+        +--------------------+        +-------------+
|        SKU        |------->|   DEVICEVARIANT    |------->| DEVICEMODEL |
| id | grade (Enum) |        | id | ram | storage |        | id | specs  |
| basePrice         |        | color              |        +------+------+
| dealerPrice       |        +---------+----------+               |
+-------------------+                  |                          v
                                       v                   +-------------+
                             +--------------------+        |    BRAND    |
                             |    TRADEINQUOTE    |        | id | name   |
                             | id | offeredPrice  |        | slug        |
                             | defects checklist  |        +-------------+
                             +--------------------+
```

#### Supporting Models:
- **`Certificate`:** Stores credential verification data (`uid`, `recipientName`, `type`, `role`, `startDate`, `endDate`, `authorizedSignatory`, `cin`).
- **`Review`:** Customer and investor feedback with approval flags (`PENDING`, `APPROVED`, `REJECTED`), verified purchase badges, and administrative replies.
- **`SubAdmin`:** RBAC credentials storing arrays of permitted administrative tabs (e.g. `['franchise', 'stores', 'careers']`).
- **`SystemLog`:** Immutable audit trails recording operator, action, role, and timestamps.
- **`ResearchArticle`:** Industry analysis metadata, publication sources, and local illustration paths.

### Core REST API Modules
- **`AuthModule` (`/api/v1/auth`):**
  - Mobile OTP issuance and cryptographic verification.
  - Master Admin login and password rotation.
  - Sub-Admin authentication and JWT session creation.
- **`EcommerceModule` (`/api/v1/ecommerce`):**
  - Catalog querying with dynamic filtering (`getCatalog`).
  - Single SKU inspection with live warehouse inventory count.
  - Order checkout initialization and Razorpay cryptographic signature verification.
- **`TradeInModule` (`/api/v1/tradein`):**
  - Dynamic algorithmic valuation deducting standard percentages for cracked screens, battery health degradation, body scuffs, camera malfunction, or cellular issues.
  - Doorstep logistics pickup scheduling.
- **`FranchiseModule` (`/api/v1/franchise`):**
  - Lead submission ingestion and status updates (`PENDING` -> `APPROVED` -> `REJECTED`).
  - Unit economics calculation engine for FICO and FOCO models.
- **`CmsModule` (`/api/v1/cms`):**
  - Haversine-based store distance locator (`locateStores?lat=...&lng=...`).
  - Review moderation pipeline.
  - AI chat qualifier for customer and franchise prospective inquiries.
- **`CertificateModule` (`/api/v1/certificate`):**
  - Issues tamper-proof credentials with unique UID hashes.
  - Public validation endpoint queried by the frontend verification portal.

### Security, Throttling & Bot Protection
1. **Helmet HTTP Headers:** Enforces `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, and `Strict-Transport-Security`.
2. **Global Validation Pipe:** Strips non-whitelisted payload properties (`whitelist: true, forbidNonWhitelisted: true`) with strict DTO typing.
3. **XSS Sanitizer Middleware:** Deep-cleans incoming request bodies and query parameters, stripping HTML tags and JavaScript injection patterns.
4. **Anti-Bot Fingerprinting:** Inspects user agents and request velocities to block malicious scrapers.
5. **Rate Limiting:** Enforces sliding-window ceilings (10 requests per minute on sensitive backend endpoints; 5 requests per 10 minutes on public frontend forms).

---

## 7. Enterprise Email & Communications Infrastructure

### Dual Zoho SMTP Architecture
EcoFone separates communication streams into two dedicated corporate Zoho Mail inboxes operating over secure SSL on port `465`:

```
               [ INCOMING SUBMISSION ]
                          |
         +----------------+----------------+
         |                                 |
         v                                 v
[ Careers / Job Apps ]          [ Contact / Franchise ]
         |                                 |
         v                                 v
  future@ecofone.co.in           business@ecofone.co.in
         |                                 |
  +------+------+                   +------+------+
  |             |                   |             |
  v             v                   v             v
Internal    Candidate            Internal      Customer
Alert       Auto-Reply           Alert         Auto-Reply
(With CV)   Confirmation         (Lead Spec)   Confirmation
```

### Two-Way Notification Pattern & Branded HTML Templates
Configured in `frontend/lib/email-templates.ts`:
- **Branded Design System:** Deep forest-green header gradient (`#052e16` -> `#064e3b`), prominent inline EcoFone logo (`cid:ecofonelogo`), and brand orange accent line (`#ea580c`).
- **Internal Alerts:** Dispatches full candidate credentials or investor parameters directly to company executives.
- **Candidate & Customer Auto-Responders:** Immediately sends a polite branded confirmation acknowledging receipt, summarizing submitted details, and stating a 24-48 hour response SLA.
- **Direct CV Attachment:** Uploaded candidate resumes are attached directly to the Nodemailer dispatch, eliminating manual Google Drive permission requests.

---

## 8. Admin CMS Dashboard (`/admin`)

The Admin CMS is a comprehensive enterprise dashboard protected by Master Admin and Sub-Admin RBAC authentication:

### 12 Dedicated Management Panels:
1. **Franchise Leads (`franchise`):** View all investor applications, filter by status, inspect investment capacity, and download consolidated spreadsheets.
2. **Contact Inquiries (`contact`):** Independent customer query desk, reply tracking, and inquiry status toggling.
3. **Store Locator Manager (`stores`):** Add, edit, or delete store outlets, configure addresses, operating hours, contact phone, storefront images, and live `Open Now` / `Closed` badges.
4. **Careers & Hiring CMS (`careers`):** 
   - Manage live job listings (title, department, requirements, active status).
   - Candidate applications table with status dropdowns (`PENDING`, `REVIEWING`, `SHORTLISTED`, `HIRED`, `REJECTED`).
   - One-click Excel `.xlsx` / `.csv` export.
5. **Customer & Investor Reviews (`reviews`):** Moderate public reviews, approve or reject submissions, attach `Verified Buyer` badges, and post official company responses.
6. **Certificate Generator (`certificates`):** Create verifiable internship or employment certificates with auto-generated UIDs, registered office details, and printable formats.
7. **Executive Team (`team`):** Manage executive team member cards, biographical descriptions, and social profile links.
8. **Top Brands (`brands`):** Manage brand partner logos displayed in the homepage carousel.
9. **Research & Articles (`research`):** Configure market research citations, publishers, and graphic links.
10. **Services CMS (`services`):** Configure the core service offerings highlighted on the landing page.
11. **System Audit Logs (`logs`):** Immutable log of all administrative actions taken within the system.
12. **Security & Sub-Admins (`security`):** Create sub-admin accounts with granular checkbox permissions restricting access to specific dashboard tabs.

---

## 9. Key Business Workflows

### Device Buyback / Trade-In Engine (`/sell`)
1. User selects Brand (e.g. Apple) -> Model (e.g. iPhone 14) -> Variant (e.g. 128GB Midnight).
2. Diagnostic checklist captures defects across Screen, Body, Battery, Camera, and Network.
3. Pricing algorithm deducts percentage penalties from the base SKU value and calculates instant quote.
4. User enters pickup address and selects preferred collection date.
5. Quote is registered in the database, and an operations team member is dispatched for physical verification and instant payout.

### E-Commerce Marketplace & Checkout (`/buy`)
1. User navigates catalog filtered by brand or cosmetic grade.
2. User selects desired phone and inspects device specifications, warranty terms, and EMI options.
3. Clicking "Buy Now" triggers the checkout flow:
   - User inputs mobile number.
   - 4-digit OTP is generated and verified via `AuthModule`.
   - Order is recorded with payment status `PENDING`.
   - Razorpay payment modal is presented.
   - Upon payment completion, signature is verified server-side, inventory status changes to `RESERVED` / `SOLD`, and tracking details are dispatched.

### Franchise Partner Acquisition & ROI Calculator (`/franchise`)
1. User explores differences between Standard, Shop-In-Shop, and Kiosk models.
2. Interactive calculator models projected monthly profits and payback periods based on investment amount and FICO vs FOCO frameworks.
3. Prospect fills out multi-step inquiry form.
4. Request is saved, rate limits are enforced, internal alert is sent to `business@ecofone.co.in`, and an automated confirmation is returned to the applicant.

### Careers Portal & Dual-Mode CV Upload (`/careers`)
1. Candidate views 7 standardized openings or chooses the General Application box.
2. Clicking "Apply" opens the application modal.
3. Candidate chooses between:
   - **Upload File / Drive (Default):** Selects file directly from system storage or Google Drive (up to 10MB; PDF/DOC/DOCX). File uploads via `/api/careers/upload`.
   - **Google Drive Link:** Toggles input to paste an existing public Google Drive link.
4. Form submit stores application in `careers_applications.json`, attaches the CV file, and emails EcoFone Talent Acquisition (`future@ecofone.co.in`).
5. HR manages applicants in `/admin` and exports records via `/api/careers/download`.

### Certificate Verification Engine (`/verify-certificate`)
1. Recipient or third-party background verification officer enters Certificate UID.
2. System queries database/service and fetches certified details.
3. Displays official credentials with seal, authorized signatory, CIN, and issue dates.
4. Provides instant high-fidelity PDF download rendered client-side via `html2canvas` and `jspdf`.

---

## 10. Environment Variables & Configuration

### Frontend (`frontend/.env.local` or Cloud Environment)
```env
# Server Connections
BACKEND_URL=http://127.0.0.1:4012
INTERNAL_BACKEND_URL=http://127.0.0.1:4012

# Zoho Mail SMTP - Careers & Talent Acquisition
SMTP_HOST=smtp.zoho.in
SMTP_PORT=465
SMTP_USER=future@ecofone.co.in
SMTP_PASS=<REDACTED_APP_PASSWORD>
HR_EMAIL=future@ecofone.co.in

# Zoho Mail SMTP - Business & Franchise Leads
BUSINESS_SMTP_HOST=smtp.zoho.in
BUSINESS_SMTP_PORT=465
BUSINESS_SMTP_USER=business@ecofone.co.in
BUSINESS_SMTP_PASS=<REDACTED_APP_PASSWORD>
BUSINESS_EMAIL=business@ecofone.co.in

# Optional Google Maps API Key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
```

### Backend (`backend/.env`)
```env
# PostgreSQL Connection
DATABASE_URL="postgresql://user:password@localhost:5432/ecofone?sslmode=prefer"
POSTGRES_PRISMA_URL="postgresql://user:password@localhost:5432/ecofone?sslmode=prefer"

# JWT Secret Key
JWT_SECRET="replace_with_strong_random_secret_in_production"

# Cloudflare R2 / AWS S3 Storage
R2_ACCOUNT_ID="your_account_id"
R2_ACCESS_KEY_ID="your_access_key"
R2_SECRET_ACCESS_KEY="your_secret_key"
R2_BUCKET_NAME="ecofone-bucket"
R2_PUBLIC_DOMAIN="https://pub-yourdomain.r2.dev"

# Port
PORT=4012
```

---

## 11. Deployment & Local Setup Guide

### Running Frontend Locally:
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
- Web portal will be available at: `http://localhost:3000`
- Admin panel can be accessed at: `http://localhost:3000/admin`
- Careers portal can be accessed at: `http://localhost:3000/careers`

### Running Backend Locally:
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Generate Prisma Client & Run Migrations
npx prisma generate

# Start NestJS backend in development mode
npm run start:dev
```
- NestJS REST API will listen at: `http://localhost:4012/api/v1`

---

*Compiled by Antigravity AI Engineering for Ecovista Global Private Limited (EcoFone).*
