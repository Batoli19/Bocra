# BOCRA Connect — Frontend MVP

> Official digital platform for the Botswana Communications Regulatory Authority  
> **Hackathon submission — BOCRA Youth Hackathon 2026**

---

## Table of Contents 1.1

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Getting Started](#3-getting-started)
4. [Project Structure](#4-project-structure)
5. [Design System](#5-design-system)
6. [Developer Task Assignments](#6-devloper-task-assignments)
7. [Routing & Page Map](#7-routing--page-map)
8. [Shared Components](#8-shared-components)
9. [Context & State](#9-context--state)
10. [Mock Data (No Backend Needed)](#10-mock-data-no-backend-needed)
11. [Git Workflow](#11-git-workflow)
12. [Coding Standards](#12-coding-standards)
13. [Environment Variables](#13-environment-variables)
14. [Deployment](#14-deployment)

---

## 1. Project Overview

BOCRA Connect is a modern, citizen-centric digital platform for the Botswana Communications Regulatory Authority. It replaces the current bocra.org.bw website with a fast, accessible, mobile-first experience that includes:

- Self-service complaint filing and tracking
- Online licence application wizard
- AI-powered regulatory assistant (Claude API)
- Live QoS dashboard and broadband coverage map
- English and Setswana language support

This repository is the **frontend MVP** — it runs entirely with mock JSON data so all four developers can build and demo pages without a live backend. When the API is ready, only the data fetching layer needs to change.

---

## 2. Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 18+ | UI framework |
| Vite | 5+ | Build tool (fast dev server) |
| React Router DOM | 6+ | Client-side routing |
| Tailwind CSS | 3+ | Utility-first styling |
| Chart.js + react-chartjs-2 | latest | QoS dashboard charts |
| Leaflet + react-leaflet | latest | Coverage map |
| React Hook Form | latest | All form handling |
| Lucide React | latest | Icon library |
| Axios | latest | HTTP requests (points to mock data for now) |

---

## 3. Getting Started and inst

### Prerequisites

- Node.js 18+ installed
- npm or yarn
- Git

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_ORG/bocra-connect.git
cd bocra-connect

# 2. Install dependencies
npm install

# 3. Copy environment file
cp .env.example .env

# 4. Start development server
npm run dev
```

The app will be running at **http://localhost:5173**

### Useful Commands

```bash
npm run dev        # Start dev server with hot reload
npm run build      # Production build
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
```

---

## 4. Project Structure

```
bocra-connect/
├── public/
│   ├── favicon.ico
│   └── bocra-logo.svg
│
├── src/
│   ├── components/
│   │   ├── shared/          ← BUILT BY DEV 1 FIRST — everyone imports from here
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── PageWrapper.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Spinner.jsx
│   │   │   ├── Toast.jsx
│   │   │   ├── Breadcrumb.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Textarea.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── FileUpload.jsx
│   │   │   ├── OTPInput.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── DataTable.jsx
│   │   │   ├── StatusTimeline.jsx
│   │   │   ├── KPICard.jsx
│   │   │   ├── Pagination.jsx
│   │   │   └── EmptyState.jsx
│   │   │
│   │   ├── public/          ← Dev 1: Homepage sections, News cards, etc.
│   │   ├── services/        ← Dev 2: Licensing, Documents, QoS components
│   │   ├── portal/          ← Dev 3: Complaint forms, Wizard steps, Tracker
│   │   ├── admin/           ← Dev 4: Admin tables, review panels
│   │   ├── ai/              ← Dev 4: Chat bubble, message bubbles
│   │   └── map/             ← Dev 4: Leaflet map, filter panels
│   │
│   ├── pages/               ← One file per route
│   │   ├── HomePage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── NewsPage.jsx
│   │   ├── NewsArticlePage.jsx
│   │   ├── LicensingPage.jsx
│   │   ├── ComplaintsPage.jsx
│   │   ├── DocumentsPage.jsx
│   │   ├── SearchPage.jsx
│   │   ├── QoSPage.jsx
│   │   ├── MapPage.jsx
│   │   ├── AIPage.jsx
│   │   ├── CIRTPage.jsx
│   │   ├── VerifyPage.jsx
│   │   ├── ConsultationsPage.jsx
│   │   ├── TendersPage.jsx
│   │   ├── CareersPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── NotFoundPage.jsx
│   │   ├── auth/
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── portal/
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── NewComplaintPage.jsx
│   │   │   ├── ComplaintDetailPage.jsx
│   │   │   ├── ComplaintsListPage.jsx
│   │   │   ├── ApplyPage.jsx
│   │   │   └── ApplicationsPage.jsx
│   │   └── admin/
│   │       ├── AdminLoginPage.jsx
│   │       ├── AdminDashboardPage.jsx
│   │       ├── AdminComplaintsPage.jsx
│   │       └── AdminApplicationsPage.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx      ← Manages user login state + role
│   │   ├── LanguageContext.jsx  ← EN / Setswana toggle
│   │   └── ToastContext.jsx     ← Global notifications
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useLanguage.js
│   │   └── useToast.js
│   │
│   ├── data/                    ← Mock JSON — replaces API calls during dev
│   │   ├── news.json
│   │   ├── tenders.json
│   │   ├── licenceTypes.json
│   │   ├── complaints.json
│   │   ├── applications.json
│   │   ├── qosMetrics.json
│   │   ├── documents.json
│   │   └── careers.json
│   │
│   ├── styles/
│   │   └── globals.css          ← Global CSS + Tailwind base imports
│   │
│   ├── utils/
│   │   ├── formatDate.js
│   │   ├── formatCurrency.js
│   │   └── mockFetch.js         ← Helper that simulates API delay + returns mock data
│   │
│   ├── App.jsx                  ← Root component + all React Router routes defined here
│   └── main.jsx                 ← Entry point
│
├── .env.example
├── .eslintrc.cjs
├── tailwind.config.js
├── vite.config.js
├── package.json
└── README.md
```

---

## 5. Design System

**THIS IS THE LAW.** Every developer must use these exact values. Do not use custom hex codes, do not use inline styles for colours. Use the Tailwind classes defined below.

### Colour Palette

```
Primary Blue:     #1A3A6B  →  bg-bocra-blue     text-bocra-blue
Accent Blue:      #2E5FA3  →  bg-bocra-accent    text-bocra-accent
Light Blue:       #D6E4F7  →  bg-bocra-light     text-bocra-light
Teal (success):   #0F6E56  →  bg-bocra-teal      text-bocra-teal
Teal Light:       #E1F5EE  →  bg-teal-50         text-teal-800
Amber (warning):  #BA7517  →  bg-amber-600       text-amber-600
Red (danger):     #A32D2D  →  bg-red-700         text-red-700
Text primary:     #1A1A1A  →  text-gray-900
Text secondary:   #5F5E5A  →  text-gray-500
Background:       #F8F9FC  →  bg-gray-50
White surface:    #FFFFFF  →  bg-white
Border:           #E2E8F0  →  border-gray-200
```

These are registered in `tailwind.config.js` under `theme.extend.colors`. Use them like this:

```jsx
// CORRECT
<button className="bg-bocra-blue text-white hover:bg-bocra-accent">
  Apply for Licence
</button>

// WRONG - never do this
<button style={{ backgroundColor: '#1A3A6B' }}>
  Apply for Licence
</button>
```

### Typography

```
Font: 'Plus Jakarta Sans' (heading) + 'Inter' (body)
Already imported in globals.css — do NOT change fonts.

Heading 1:  text-4xl font-bold text-gray-900
Heading 2:  text-3xl font-semibold text-gray-900
Heading 3:  text-xl font-semibold text-gray-800
Body large:  text-base text-gray-700 leading-relaxed
Body small:  text-sm text-gray-500
Caption:     text-xs text-gray-400
```

### Spacing & Layout

```
Page max width:     max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
Section padding:    py-16 (desktop)  py-10 (mobile)
Card padding:       p-6
Card border radius: rounded-2xl
Button border:      rounded-xl
Input border:       rounded-lg
```

### Component Import Pattern

Always import shared components from the barrel export:

```jsx
// CORRECT
import { Button, Card, Badge, Input } from '../components/shared'

// WRONG
import Button from '../components/shared/Button'
import Card from '../components/shared/Card'
```

---

## 6. Developer Task Assignments

### Dev 1 — Layout & Public Core
**Branch:** `dev1/layout-and-public`

**Day 1 (MUST finish before others start):**
- `src/components/shared/` — ALL shared components
- `src/components/shared/index.js` — barrel export file
- `tailwind.config.js` — colour tokens
- `src/styles/globals.css` — font imports + base styles
- `src/context/` — AuthContext, LanguageContext, ToastContext
- `src/App.jsx` — all routes defined (others just add page components)

**Day 2–6:**
- `HomePage.jsx` — hero, service grid, stats ticker, news preview
- `AboutPage.jsx`, `NewsPage.jsx`, `NewsArticlePage.jsx`
- `TendersPage.jsx`, `CareersPage.jsx`, `ContactPage.jsx`
- `NotFoundPage.jsx`

**Pages you own:** /, /about, /news, /news/:slug, /tenders, /careers, /contact, /404

---

### Dev 2 — Services & Information
**Branch:** `dev2/services-pages`

**Starts Day 1 afternoon** (after Dev 1 pushes shared components):
- `LicensingPage.jsx` — licence types grid, fee calculator
- `ComplaintsPage.jsx` — public overview, how-it-works, track by ref
- `DocumentsPage.jsx` — searchable table, PDF preview modal
- `SearchPage.jsx` — global search results, tabbed
- `QoSPage.jsx` — KPI cards, Chart.js graphs, ISP table
- `VerifyPage.jsx` — public licence lookup
- `CIRTPage.jsx` — cybersecurity alerts
- `ConsultationsPage.jsx` — open consultations

**Pages you own:** /licensing, /complaints, /documents, /search, /qos, /verify, /cirt, /consultations

---

### Dev 3 — Citizen Portal
**Branch:** `dev3/citizen-portal`

**Starts Day 1 afternoon** (after Dev 1 pushes shared components + AuthContext):
- `LoginPage.jsx`, `RegisterPage.jsx`
- `portal/DashboardPage.jsx`
- `portal/NewComplaintPage.jsx` — smart form + file upload
- `portal/ComplaintDetailPage.jsx` — status timeline
- `portal/ComplaintsListPage.jsx`
- `portal/ApplyPage.jsx` — 5-step wizard
- `portal/ApplicationsPage.jsx`

**Pages you own:** /login, /register, /portal, /portal/complaint/new, /portal/complaint/:id, /portal/complaints, /portal/apply, /portal/applications

---

### Dev 4 — AI, Map & Admin
**Branch:** `dev4/ai-map-admin`

**Starts Day 1 afternoon** (after Dev 1 pushes shared components):
- `src/components/ai/ChatBubble.jsx` — floating bubble (added to PageWrapper)
- `AIPage.jsx` — full chat interface
- `MapPage.jsx` — Leaflet coverage map
- `admin/AdminLoginPage.jsx`
- `admin/AdminDashboardPage.jsx`
- `admin/AdminComplaintsPage.jsx`
- `admin/AdminApplicationsPage.jsx`

**Pages you own:** /ai, /map, /admin/login, /admin, /admin/complaints, /admin/applications

---

## 7. Routing & Page Map

All routes are defined in `src/App.jsx`. **Do NOT create your own router setup.** Just create the page component and add the route to App.jsx.

```
PUBLIC ROUTES (no auth needed)
/                    → HomePage
/about               → AboutPage
/news                → NewsPage
/news/:slug          → NewsArticlePage
/licensing           → LicensingPage
/complaints          → ComplaintsPage
/documents           → DocumentsPage
/search              → SearchPage
/qos                 → QoSPage
/map                 → MapPage
/ai                  → AIPage
/cirt                → CIRTPage
/verify              → VerifyPage
/consultations       → ConsultationsPage
/tenders             → TendersPage
/careers             → CareersPage
/contact             → ContactPage

AUTH ROUTES
/login               → LoginPage
/register            → RegisterPage

CITIZEN PORTAL (requires login, role: citizen)
/portal              → DashboardPage
/portal/complaint/new → NewComplaintPage
/portal/complaint/:id → ComplaintDetailPage
/portal/complaints   → ComplaintsListPage
/portal/apply        → ApplyPage
/portal/applications → ApplicationsPage

ADMIN PORTAL (requires login, role: staff)
/admin/login         → AdminLoginPage
/admin               → AdminDashboardPage
/admin/complaints    → AdminComplaintsPage
/admin/applications  → AdminApplicationsPage

FALLBACK
*                    → NotFoundPage
```

---

## 8. Shared Components

All shared components live in `src/components/shared/`. Each one accepts standard props. Below are the key interfaces:

### Button

```jsx
import { Button } from '../components/shared'

<Button variant="primary" size="md" onClick={handleClick}>
  Apply Now
</Button>

// variants: "primary" | "secondary" | "ghost" | "danger"
// sizes: "sm" | "md" | "lg"
// also accepts: disabled, loading, icon, fullWidth
```

### Badge

```jsx
<Badge status="active" />
<Badge status="pending" />
<Badge status="resolved" />
<Badge status="rejected" />

// Automatically picks the right colour based on status string
// Custom: <Badge color="blue" label="Draft" />
```

### Card

```jsx
<Card>
  <Card.Header>Title here</Card.Header>
  <Card.Body>Content here</Card.Body>
  <Card.Footer>Actions here</Card.Footer>
</Card>

// Or simple: <Card className="p-6">...</Card>
```

### StatusTimeline

```jsx
<StatusTimeline steps={[
  { label: 'Received', date: '20 Mar 2026', done: true },
  { label: 'Under Review', date: '21 Mar 2026', done: true },
  { label: 'Resolved', date: null, done: false },
]} />
```

### KPICard

```jsx
<KPICard
  label="Complaints Resolved"
  value={1423}
  change={+12}
  changeLabel="this week"
  icon={CheckCircle}
/>
```

### DataTable

```jsx
<DataTable
  columns={[
    { key: 'ref', label: 'Reference' },
    { key: 'status', label: 'Status', render: (v) => <Badge status={v} /> },
    { key: 'date', label: 'Date' },
  ]}
  data={complaints}
  onRowClick={(row) => navigate(`/portal/complaint/${row.id}`)}
/>
```

---

## 9. Context & State

### AuthContext

Wraps the entire app. Provides:

```jsx
const { user, role, isLoggedIn, login, logout } = useAuth()

// user: { id, name, phone, role }
// role: 'citizen' | 'staff' | null
// isLoggedIn: boolean

// In any component:
import { useAuth } from '../hooks/useAuth'
```

**For the MVP** — login is simulated. When a user enters any phone number + "123456" as OTP, they get logged in as a citizen. Entering "staff@bocra.bw" logs in as staff. No real API call.

### LanguageContext

```jsx
const { lang, setLang, t } = useLanguage()

// lang: 'en' | 'tn'
// t('file_complaint') → returns English or Setswana string
// Translations live in src/data/translations.json
```

### ToastContext

```jsx
const { toast } = useToast()

toast.success('Complaint submitted successfully!')
toast.error('Something went wrong. Please try again.')
toast.info('Your application has been saved as a draft.')
```

---

## 10. Mock Data (No Backend Needed)

All pages fetch from `src/data/*.json` files using the `mockFetch` utility. This simulates an API call with a 400ms delay so loading states work correctly.

```jsx
// How to use mock data in your page
import { useState, useEffect } from 'react'
import { mockFetch } from '../utils/mockFetch'

function LicensingPage() {
  const [licences, setLicences] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    mockFetch('licenceTypes').then(data => {
      setLicences(data)
      setLoading(false)
    })
  }, [])

  if (loading) return <Spinner />
  return <div>...</div>
}
```

When the real API is ready, swap `mockFetch('licenceTypes')` for `axios.get('/api/licence-types')`. Nothing else in the component changes.

**Available mock datasets:**
- `mockFetch('news')` — array of news articles
- `mockFetch('tenders')` — array of tender items
- `mockFetch('licenceTypes')` — licence categories + fees
- `mockFetch('complaints')` — citizen's complaints list
- `mockFetch('applications')` — citizen's applications
- `mockFetch('qosMetrics')` — ISP quality data
- `mockFetch('documents')` — regulatory documents
- `mockFetch('careers')` — job listings

---

## 11. Git Workflow

We use **feature branches** — never commit directly to `main`.

```bash
# Start your work
git checkout main
git pull origin main
git checkout -b dev3/citizen-portal    ← use YOUR branch name

# Commit regularly (every time something works)
git add .
git commit -m "feat: add complaint filing form with category picker"

# Push your branch
git push origin dev3/citizen-portal

# When ready to merge — create a Pull Request on GitHub
# Tag the team in the PR for a quick review before merging
```

### Branch Names

```
dev1/layout-and-public
dev2/services-pages
dev3/citizen-portal
dev4/ai-map-admin
```

### Commit Message Format

```
feat: add complaint tracker page
fix: broken link on licensing page
style: align KPI cards on mobile
refactor: extract form validation to hook
```

### Merge Order (important!)

1. Dev 1 merges `shared components + App.jsx skeleton` FIRST
2. Everyone else pulls main before starting their pages
3. Merge in this order to avoid conflicts: Dev1 → Dev2 → Dev3 → Dev4

---

## 12. Coding Standards

### File Naming

```
Pages:       PascalCase + 'Page'   →  ComplaintDetailPage.jsx
Components:  PascalCase            →  StatusTimeline.jsx
Hooks:       camelCase + 'use'     →  useAuth.js
Utils:       camelCase             →  formatDate.js
Data:        camelCase             →  qosMetrics.json
```

### Component Structure (follow this template)

```jsx
// 1. Imports (external libs first, then internal)
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Badge } from '../components/shared'
import { useAuth } from '../hooks/useAuth'

// 2. Component definition
export default function MyPage() {

  // 3. Hooks
  const navigate = useNavigate()
  const { user } = useAuth()

  // 4. State
  const [loading, setLoading] = useState(false)

  // 5. Handlers
  const handleSubmit = () => { ... }

  // 6. Render
  return (
    <div className="...">
      ...
    </div>
  )
}
```

### Rules Everyone Must Follow

- **No inline styles** — use Tailwind classes only
- **No hardcoded colours** — use the design system tokens
- **Always handle loading state** — every data fetch shows a `<Spinner />`
- **Always handle empty state** — use `<EmptyState />` when list is empty
- **All forms use React Hook Form** — do not build custom form state
- **All icons from Lucide React** — no other icon library
- **Mobile-first** — build for small screens first, then add `md:` and `lg:` classes
- **Every interactive element needs a hover state** — buttons, cards, rows

---

## 13. Environment Variables

Copy `.env.example` to `.env` and fill in:

```bash
# App
VITE_APP_NAME=BOCRA Connect
VITE_APP_URL=http://localhost:5173

# AI (Claude API) — Dev 4 only, leave blank if not your task
VITE_ANTHROPIC_API_KEY=your_key_here

# Feature flags (set to 'true' to enable)
VITE_ENABLE_AI_CHAT=true
VITE_ENABLE_MAP=true
VITE_USE_MOCK_DATA=true   ← keep this true until real API is ready
```

---

## 14. Deployment

The MVP deploys to **Vercel** (free, automatic from GitHub).

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (first time — follow prompts)
vercel

# Deploy production
vercel --prod
```

Vercel auto-deploys on every push to `main`. Each pull request gets a preview URL.

**The submission URL (for the hackathon) will be the Vercel production URL.**  
Format: `https://bocra-connect.vercel.app`

---

## Contacts & Links

| Role | Name | Branch |
|---|---|---|
| Dev 1 — Layout | YOU | `dev1/layout-and-public` |
| Dev 2 — Services | TBD | `dev2/services-pages` |
| Dev 3 — Portal | TBD | `dev3/citizen-portal` |
| Dev 4 — AI & Admin | TBD | `dev4/ai-map-admin` |

**Submission deadline: 27 March 2026, 17:00 CAT**  
**Submit at: https://skillsranker.bih.co.bw**

---

*Built with purpose for every Motswana. BOCRA Connect — Secure. Fast. Accessible.*
not to be shared nor distributed


