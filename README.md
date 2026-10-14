# EcoFone Official Web Portal & Systems Documentation

> **EcoFone** is a flagship re-commerce brand under **Ecovista Global Private Limited**, revolutionizing sustainable consumer electronics through certified pre-owned smartphones, 32-point hardware diagnostics, franchise experience centers, and nationwide buyback programs.

---

## 📌 Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [October 14, 2026 Updates (Latest)](#october-14-2026-updates-latest)
   - [Contact Us Page Redesign](#contact-us-page-redesign)
4. [October 13, 2026 Updates](#october-13-2026-updates)
   - [Interactive Resume Upload ("Upload from Drive / Device")](#1-interactive-resume-upload-upload-from-drive--device)
   - [Job Openings Restructuring (7 Core Roles)](#2-job-openings-restructuring-7-core-roles)
   - [UI / UX Brand Harmonization](#3-ui--ux-brand-harmonization)
   - [SEO & Google Jobs Schema.org Optimization](#4-seo--google-jobs-schemaorg-optimization)
5. [October 12, 2026 Infrastructure Updates](#october-12-2026-infrastructure-updates)
   - [Dual Zoho SMTP Integration](#dual-zoho-smtp-integration)
   - [Data Segregation & Rate Limiting](#data-segregation--rate-limiting)
   - [Server-Side Excel Exporter](#server-side-excel-exporter)
6. [Directory Structure](#directory-structure)
7. [API Endpoints Reference](#api-endpoints-reference)
8. [Running Locally](#running-locally)

---

## 🚀 Project Overview
- **Domain:** `ecofone.co.in`
- **Parent Company:** Ecovista Global Private Limited
- **Official Inboxes:**
  - `future@ecofone.co.in` (Talent Acquisition, Careers & Hiring)
  - `business@ecofone.co.in` (Customer Support, Franchise & Partner Enquiries)

---

## 🛠 Tech Stack
- **Framework:** Next.js 15 (App Router, Server Components & Route Handlers)
- **Frontend:** React 18, TypeScript, Tailwind CSS, Lucide Icons
- **Mail Services:** Nodemailer over secure SSL (`smtp.zoho.in:465`)
- **Data Persistence:** JSON-based persistent storage (`data/careers_jobs.json`, `data/careers_applications.json`, `data/franchise_leads.json`)
- **Excel Export:** `exceljs` & `xlsx`

---

## 🌟 October 14, 2026 Updates (Latest)

### Contact Us Page Redesign
- **Top Header**: Clean header with `Contact EcoFone HQ` in brand orange accent with balanced top padding directly below the navbar (removed "GET IN TOUCH" badge for minimal clutter).
- **3 Horizontal Value Cards**:
  - `Quick Response`: Replies within 24 hours.
  - `Dedicated Support`: Guidance at every step.
  - `Visit Our Office`: Meet team in person.
- **Inquiry Form Card**: Left column with `SEND US A MESSAGE`, `We're here to help`, custom input fields with left icons & red asterisks (`*`), and orange `Send Message →` button.
- **Corporate Office Banner**: Right column top card in deep forest green (`#062c21`) with EcoFone building architecture, office address, phone, and email.
- **Interactive Map Card**: Right column bottom card with embedded Google Map of Lucknow HQ and `Open in Maps ↗` button.
- **Mesh Background**: Subtle gradient glows and margin dot matrix patterns.

---

## 🌟 October 13, 2026 Updates

### 1. Interactive Resume Upload ("Upload from Drive / Device")
Previously, candidates were asked to paste a raw Google Drive URL link. This has been completely upgraded into an interactive dual-mode CV attachment interface:

- **Mode 1: "Upload File / Drive" (Default Active)**:
  - Supports **PDF, DOC, DOCX** (up to 10MB).
  - Triggers the native system file chooser, allowing candidates on mobile (Android/iOS) and desktop to select directly from **Google Drive**, **Local Storage**, **Files**, or **Downloads**.
  - Interactive drag-and-drop drop-zone with warm brand borders (`border-orange-300`).
  - Real-time uploading state with animated spinner and processing notice.
  - Emerald confirmation card displaying the file name, calculated size (e.g., `1.24 MB`), `Uploaded ✓` pill, and a `Change` button.
- **Mode 2: "Google Drive Link" (Toggle Option)**:
  - Candidates who already have a copied Drive link can easily toggle and paste it.
  - Notice alert: *"Please ensure your Google Drive link permission is set to: Anyone with the link can view"*.
- **Backend File Upload API (`/api/careers/upload`)**:
  - Validates file MIME types, extensions, and enforces a 10MB limit.
  - Stores sanitized, timestamped files in `public/uploads/resumes/`.
  - Returns direct URL and metadata for application binding.
- **Direct Email Attachment to HR**:
  - In `/api/careers/applications`, uploaded files are attached directly to the outgoing Nodemailer dispatch.
  - The Talent Acquisition team at `future@ecofone.co.in` receives the candidate's actual CV attached to the email, eliminating the need to request Drive viewing permissions.
- **Universal Availability**:
  - Implemented both in the inline **General Application Section** (`#general-application`) and inside each job's **Application Modal**.

---

### 2. Job Openings Restructuring (7 Core Roles)
Standardized all career listings into `data/careers_jobs.json` and unified the UI:

| Role Title | Department | Work Mode | Experience | Key Responsibilities |
| :--- | :--- | :--- | :--- | :--- |
| **Franchise Sales Manager (FSM)** | Franchise & Business Expansion | Full Time (Hybrid / Field) | 2 - 5 Years | In-person offline investor meetings & Google Meets, pitching unit economics & ROI models, closing franchise agreements. |
| **Business Development Associate (BDA)** | Sales & Franchise Acquisition | Full Time (In-Office) | 0 - 2 Years | Cold outreach (**60 to 100+ outbound calls/day**), lead qualification, introducing initial franchise plan, scheduling meetings. |
| **Store Promoter & Front Manager Officer (FMO)** | Retail & Store Ops | Full Time (Store Floor) | 0 - 3 Years | Walk-in customer dealing, hospitality, 32-point diagnostic explanation, old device buyback valuations, POS counter billing. |
| **Business Growth Partner (BGP) - Freelance** | Franchise Expansion (Freelance) | Remote / Flexible | Open to All | **High commission-based freelance role**; introducing retail entrepreneurs and closing franchise partner deals. |
| **IT Specialist & Full Stack Software Engineer** | IT & Tech Development | Full Time (Hybrid) | 1 - 4 Years | Core web architecture (Next.js, TypeScript, REST APIs), CRM pipelines, automated diagnostics suites, POS integrations. |
| **Social Media & Content Strategist** | Marketing & Social Media | Full Time (Studio/HQ) | 1 - 3 Years | Viral short-form video content (Reels/Shorts), phone unboxings, refurbishment teardowns, customer story campaigns. |
| **Management & Tech Intern (All Categories)** | Emerging Talent & Internship | 3 - 6 Months Internship | Freshers / Students | Circular economy hands-on experience across Marketing, Sales, Tech, QA, and Retail; Certificate + Stipend + PPO. |

---

### 3. UI / UX Brand Harmonization
- **Unified List View**: Removed artificial filter buttons and opportunities banners so all current openings are presented together cleanly.
- **Uniform Card Styling**: Removed distracting orange highlight border on the first card for a clean, consistent card deck.
- **Brand Accent Heading**: Updated main title with EcoFone warm orange: `Current <span className="text-[#ea580c]">Open Roles</span>`.
- **Top Navigation Polish**: Kept navbar clean without clutter; Careers remains accessible in the footer and sitemap.

---

### 4. SEO & Google Jobs Schema.org Optimization
- Integrated dynamic JSON-LD `JobPosting` schema for each active opening:
  - `hiringOrganization`: Ecovista Global Private Limited (EcoFone)
  - `jobLocation`: Lucknow HQ & Remote Pan-India
  - `datePosted`, `validThrough`, and `employmentType`
- Enhanced sitemap indexing and search metadata targeting terms: *"EcoFone jobs"*, *"EcoFone careers"*, *"Ecovista Global hiring"*.

---

## 📬 October 12, 2026 Infrastructure Updates

### Dual Zoho SMTP Integration
Configured two independent, SSL-secured corporate Zoho Mail accounts on port `465`:
- **`future@ecofone.co.in`**: Careers submissions, candidate auto-responders, and talent acquisition alerts.
- **`business@ecofone.co.in`**: Customer support, franchise applications, and partnership leads.

### Data Segregation & Rate Limiting
- Isolated job applications into `data/careers_applications.json` and franchise inquiries into `data/franchise_leads.json`.
- Sliding-window rate limiting guard (max 5 submissions per 10 minutes per IP) protects all public endpoints from spam.

### Server-Side Excel Exporter
- Dedicated route `/api/careers/download` enables HR and admin staff to export all candidate applications into formatted Excel (`.xlsx`) files with date filters and status markers.

---

## 📂 Directory Structure

```text
ecofone main website/
├── README.md                          <-- Master project documentation
├── UPDATES_2026-10-12.md              <-- October 12 infrastructure log
├── UPDATES_2026-10-13.md              <-- October 13 careers & upload log
├── backend/                           <-- Ancillary server utilities
└── frontend/                          <-- Main Next.js 15 Web Application
    ├── app/
    │   ├── api/
    │   │   ├── careers/
    │   │   │   ├── applications/      <-- Application submission & SMTP mailer
    │   │   │   ├── download/          <-- Excel export endpoint
    │   │   │   ├── openings/          <-- Dynamic job positions API
    │   │   │   └── upload/            <-- Resume file upload endpoint
    │   │   └── ...
    │   ├── careers/
    │   │   ├── layout.tsx             <-- Google Jobs Schema.org & SEO metadata
    │   │   └── page.tsx               <-- Careers page & dual-mode CV upload UI
    │   └── ...
    ├── components/                    <-- Reusable UI components
    ├── data/
    │   ├── careers_applications.json  <-- Candidate submissions store
    │   └── careers_jobs.json          <-- Live job postings store
    ├── lib/
    │   ├── api.ts                     <-- Frontend client API wrapper
    │   ├── email-templates.ts         <-- Branded EcoFone email generator
    │   └── rate-limit.ts              <-- Sliding-window IP limiter
    └── public/
        └── uploads/
            └── resumes/               <-- Stored candidate CV files
```

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/careers/openings` | Returns all active job positions. |
| `POST` | `/api/careers/upload` | Uploads CV document (`.pdf`, `.doc`, `.docx` <= 10MB) to `/uploads/resumes/`. |
| `POST` | `/api/careers/applications` | Records job application and dispatches email with attached CV to `future@ecofone.co.in`. |
| `GET` | `/api/careers/applications` | Retrieves stored applications for admin dashboard. |
| `GET` | `/api/careers/download` | Exports application records to `.xlsx` Excel sheet. |

---

## 💻 Running Locally

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Server will start on [http://localhost:3000](http://localhost:3000).  
The careers portal can be accessed directly at [http://localhost:3000/careers](http://localhost:3000/careers).
