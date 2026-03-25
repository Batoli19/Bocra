#!/bin/bash

# =============================================================================
#  BOCRA CONNECT — Project Structure Setup Script
#  Run this ONCE inside your cloned repo root:  bash setup.sh
#  Creates all folders + starter files with real code stubs
# =============================================================================

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo ""
echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}  BOCRA Connect — Project Setup${NC}"
echo -e "${BLUE}============================================${NC}"
echo ""

# ── Install dependencies ──────────────────────────────────────────────────────
echo -e "${YELLOW}[1/6] Installing npm packages...${NC}"
npm install react-router-dom @vitejs/plugin-react chart.js react-chartjs-2 \
  leaflet react-leaflet react-hook-form axios lucide-react 2>/dev/null
npm install -D tailwindcss postcss autoprefixer 2>/dev/null
echo -e "${GREEN}  ✓ Packages installed${NC}"

# ── Tailwind init (if not already done) ──────────────────────────────────────
if [ ! -f "tailwind.config.js" ]; then
  npx tailwindcss init -p 2>/dev/null
fi

# ── Create all directories ────────────────────────────────────────────────────
echo -e "${YELLOW}[2/6] Creating folder structure...${NC}"

mkdir -p src/components/shared
mkdir -p src/components/public
mkdir -p src/components/services
mkdir -p src/components/portal
mkdir -p src/components/admin
mkdir -p src/components/ai
mkdir -p src/components/map
mkdir -p src/pages/auth
mkdir -p src/pages/portal
mkdir -p src/pages/admin
mkdir -p src/context
mkdir -p src/hooks
mkdir -p src/data
mkdir -p src/styles
mkdir -p src/utils
mkdir -p public

echo -e "${GREEN}  ✓ Folders created${NC}"

# =============================================================================
#  CONFIG FILES
# =============================================================================
echo -e "${YELLOW}[3/6] Writing config files...${NC}"

# ── tailwind.config.js ────────────────────────────────────────────────────────
cat > tailwind.config.js << 'TAILWIND'
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bocra: {
          blue:   '#1A3A6B',
          accent: '#2E5FA3',
          light:  '#D6E4F7',
          teal:   '#0F6E56',
        },
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body:    ['"Inter"', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
TAILWIND

# ── vite.config.js ────────────────────────────────────────────────────────────
cat > vite.config.js << 'VITE'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
})
VITE

# ── .env.example ─────────────────────────────────────────────────────────────
cat > .env.example << 'ENV'
VITE_APP_NAME=BOCRA Connect
VITE_APP_URL=http://localhost:5173
VITE_ANTHROPIC_API_KEY=your_key_here
VITE_ENABLE_AI_CHAT=true
VITE_ENABLE_MAP=true
VITE_USE_MOCK_DATA=true
ENV

[ ! -f ".env" ] && cp .env.example .env

# ── index.html ────────────────────────────────────────────────────────────────
cat > index.html << 'HTML'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>BOCRA Connect</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
HTML

echo -e "${GREEN}  ✓ Config files written${NC}"

# =============================================================================
#  STYLES
# =============================================================================
cat > src/styles/globals.css << 'CSS'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    font-family: 'Inter', sans-serif;
    @apply bg-gray-50 text-gray-900 antialiased;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
}

@layer components {
  .page-container {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
  .section-padding {
    @apply py-16;
  }
}

/* Leaflet map fix */
.leaflet-container {
  height: 100%;
  width: 100%;
  border-radius: 1rem;
}
CSS

# =============================================================================
#  MAIN ENTRY + APP ROUTER
# =============================================================================
cat > src/main.jsx << 'MAIN'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/globals.css'
import { AuthProvider } from './context/AuthContext'
import { LanguageProvider } from './context/LanguageContext'
import { ToastProvider } from './context/ToastContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
MAIN

cat > src/App.jsx << 'APP'
import { Routes, Route } from 'react-router-dom'

// ── Public pages ──────────────────────────────────────────────────────────────
import HomePage            from './pages/HomePage'
import AboutPage           from './pages/AboutPage'
import NewsPage            from './pages/NewsPage'
import NewsArticlePage     from './pages/NewsArticlePage'
import LicensingPage       from './pages/LicensingPage'
import ComplaintsPage      from './pages/ComplaintsPage'
import DocumentsPage       from './pages/DocumentsPage'
import SearchPage          from './pages/SearchPage'
import QoSPage             from './pages/QoSPage'
import MapPage             from './pages/MapPage'
import AIPage              from './pages/AIPage'
import CIRTPage            from './pages/CIRTPage'
import VerifyPage          from './pages/VerifyPage'
import ConsultationsPage   from './pages/ConsultationsPage'
import TendersPage         from './pages/TendersPage'
import CareersPage         from './pages/CareersPage'
import ContactPage         from './pages/ContactPage'
import NotFoundPage        from './pages/NotFoundPage'

// ── Auth ──────────────────────────────────────────────────────────────────────
import LoginPage           from './pages/auth/LoginPage'
import RegisterPage        from './pages/auth/RegisterPage'

// ── Citizen portal ────────────────────────────────────────────────────────────
import DashboardPage       from './pages/portal/DashboardPage'
import NewComplaintPage    from './pages/portal/NewComplaintPage'
import ComplaintDetailPage from './pages/portal/ComplaintDetailPage'
import ComplaintsListPage  from './pages/portal/ComplaintsListPage'
import ApplyPage           from './pages/portal/ApplyPage'
import ApplicationsPage    from './pages/portal/ApplicationsPage'

// ── Admin portal ──────────────────────────────────────────────────────────────
import AdminLoginPage       from './pages/admin/AdminLoginPage'
import AdminDashboardPage   from './pages/admin/AdminDashboardPage'
import AdminComplaintsPage  from './pages/admin/AdminComplaintsPage'
import AdminApplicationsPage from './pages/admin/AdminApplicationsPage'

// ── Route guards ──────────────────────────────────────────────────────────────
import ProtectedRoute from './components/shared/ProtectedRoute'

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/"              element={<HomePage />} />
      <Route path="/about"         element={<AboutPage />} />
      <Route path="/news"          element={<NewsPage />} />
      <Route path="/news/:slug"    element={<NewsArticlePage />} />
      <Route path="/licensing"     element={<LicensingPage />} />
      <Route path="/complaints"    element={<ComplaintsPage />} />
      <Route path="/documents"     element={<DocumentsPage />} />
      <Route path="/search"        element={<SearchPage />} />
      <Route path="/qos"           element={<QoSPage />} />
      <Route path="/map"           element={<MapPage />} />
      <Route path="/ai"            element={<AIPage />} />
      <Route path="/cirt"          element={<CIRTPage />} />
      <Route path="/verify"        element={<VerifyPage />} />
      <Route path="/consultations" element={<ConsultationsPage />} />
      <Route path="/tenders"       element={<TendersPage />} />
      <Route path="/careers"       element={<CareersPage />} />
      <Route path="/contact"       element={<ContactPage />} />

      {/* Auth */}
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Citizen portal — protected */}
      <Route path="/portal" element={<ProtectedRoute role="citizen" />}>
        <Route index                     element={<DashboardPage />} />
        <Route path="complaint/new"      element={<NewComplaintPage />} />
        <Route path="complaint/:id"      element={<ComplaintDetailPage />} />
        <Route path="complaints"         element={<ComplaintsListPage />} />
        <Route path="apply"              element={<ApplyPage />} />
        <Route path="applications"       element={<ApplicationsPage />} />
      </Route>

      {/* Admin — protected */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<ProtectedRoute role="staff" />}>
        <Route index              element={<AdminDashboardPage />} />
        <Route path="complaints"  element={<AdminComplaintsPage />} />
        <Route path="applications" element={<AdminApplicationsPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
APP

# =============================================================================
#  CONTEXT FILES
# =============================================================================
echo -e "${YELLOW}[4/6] Writing context, hooks, utils, mock data...${NC}"

cat > src/context/AuthContext.jsx << 'AUTH'
import { createContext, useState } from 'react'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = (phone, otp) => {
    // MVP mock — any phone + "123456" = citizen login
    // "staff" keyword = staff login
    if (otp === '123456') {
      const role = phone.includes('staff') ? 'staff' : 'citizen'
      const mockUser = {
        id: '1',
        name: role === 'staff' ? 'BOCRA Officer' : 'Kefilwe Mosweu',
        phone,
        role,
      }
      setUser(mockUser)
      return true
    }
    return false
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, role: user?.role || null, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
AUTH

cat > src/context/LanguageContext.jsx << 'LANG'
import { createContext, useState } from 'react'

export const LanguageContext = createContext(null)

const translations = {
  en: {
    home: 'Home',
    about: 'About',
    news: 'News & Events',
    licensing: 'Licensing',
    complaints: 'Complaints',
    documents: 'Documents',
    contact: 'Contact',
    file_complaint: 'File a Complaint',
    apply_licence: 'Apply for Licence',
    track_complaint: 'Track Complaint',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    my_dashboard: 'My Dashboard',
  },
  tn: {
    home: 'Gae',
    about: 'Ka ga Rona',
    news: 'Dikgang le Ditiragalo',
    licensing: 'Laesense',
    complaints: 'Diipelego',
    documents: 'Dikwalo',
    contact: 'Ikgolaganya',
    file_complaint: 'Bega Ipelego',
    apply_licence: 'Kopa Laesense',
    track_complaint: 'Sala Morago ga Ipelego',
    login: 'Tsena',
    register: 'Ikwadise',
    logout: 'Tswa',
    my_dashboard: 'Phanele ya me',
  },
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')
  const t = (key) => translations[lang][key] || translations['en'][key] || key

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
LANG

cat > src/context/ToastContext.jsx << 'TOAST'
import { createContext, useState, useCallback } from 'react'

export const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000)
  }, [])

  const toast = {
    success: (msg) => addToast(msg, 'success'),
    error:   (msg) => addToast(msg, 'error'),
    info:    (msg) => addToast(msg, 'info'),
  }

  const typeStyles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error:   'bg-red-50 border-red-200 text-red-800',
    info:    'bg-blue-50 border-blue-200 text-blue-800',
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map(t => (
          <div key={t.id} className={`border rounded-xl px-4 py-3 text-sm font-medium shadow-sm ${typeStyles[t.type]} max-w-sm`}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
TOAST

# =============================================================================
#  HOOKS
# =============================================================================
cat > src/hooks/useAuth.js << 'HOOK'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
export const useAuth = () => useContext(AuthContext)
HOOK

cat > src/hooks/useLanguage.js << 'HOOK'
import { useContext } from 'react'
import { LanguageContext } from '../context/LanguageContext'
export const useLanguage = () => useContext(LanguageContext)
HOOK

cat > src/hooks/useToast.js << 'HOOK'
import { useContext } from 'react'
import { ToastContext } from '../context/ToastContext'
export const useToast = () => useContext(ToastContext)
HOOK

# =============================================================================
#  UTILS
# =============================================================================
cat > src/utils/formatDate.js << 'UTIL'
export const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-BW', {
    day: 'numeric', month: 'short', year: 'numeric'
  })
}
export const timeAgo = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  return formatDate(dateStr)
}
UTIL

cat > src/utils/formatCurrency.js << 'UTIL'
export const formatBWP = (amount) =>
  new Intl.NumberFormat('en-BW', { style: 'currency', currency: 'BWP' }).format(amount)
UTIL

cat > src/utils/mockFetch.js << 'UTIL'
// Simulates an API call with realistic delay
// Replace with real axios calls when backend is ready

const cache = {}

export const mockFetch = async (resource) => {
  if (cache[resource]) return cache[resource]

  const module = await import(`../data/${resource}.json`)
  const data = module.default

  await new Promise(resolve => setTimeout(resolve, 350)) // simulate network

  cache[resource] = data
  return data
}
UTIL

# =============================================================================
#  MOCK DATA FILES
# =============================================================================
cat > src/data/news.json << 'JSON'
[
  { "id": "1", "slug": "bocra-spectrum-auction-2026", "title": "BOCRA Announces 5G Spectrum Auction for 2026", "category": "Announcements", "date": "2026-03-10", "excerpt": "BOCRA has announced the opening of bids for 5G spectrum allocation across Botswana's major urban centres.", "author": "BOCRA Communications" },
  { "id": "2", "slug": "consumer-protection-campaign", "title": "Consumer Rights Campaign Launched Nationwide", "category": "Consumer Protection", "date": "2026-03-05", "excerpt": "A nationwide awareness campaign on telecommunications consumer rights has been launched by BOCRA.", "author": "BOCRA Communications" },
  { "id": "3", "slug": "broadband-coverage-report-q1", "title": "Q1 2026 Broadband Coverage Report Published", "category": "Reports", "date": "2026-02-28", "excerpt": "The latest broadband penetration statistics show 74% coverage of Botswana households.", "author": "Research Division" },
  { "id": "4", "slug": "cyber-security-advisory-march", "title": "Cybersecurity Advisory: Phishing Campaign Targeting Batswana", "category": "bwCIRT", "date": "2026-03-15", "excerpt": "BOCRA's bwCIRT division has issued an advisory regarding a phishing campaign targeting mobile banking users.", "author": "bwCIRT" }
]
JSON

cat > src/data/tenders.json << 'JSON'
[
  { "id": "T001", "title": "Supply and Delivery of ICT Equipment 2026", "status": "open", "closingDate": "2026-04-10", "category": "ICT", "reference": "BOCRA/T/001/2026" },
  { "id": "T002", "title": "Consultancy Services: Spectrum Management System", "status": "open", "closingDate": "2026-04-05", "category": "Consultancy", "reference": "BOCRA/T/002/2026" },
  { "id": "T003", "title": "Office Cleaning Services — Gaborone HQ", "status": "closed", "closingDate": "2026-02-15", "category": "Services", "reference": "BOCRA/T/003/2025" }
]
JSON

cat > src/data/licenceTypes.json << 'JSON'
[
  { "id": "1", "name": "Class A Postal Operator", "category": "Postal", "fee": 25000, "duration": "5 years", "description": "For large-scale postal and courier operations across Botswana.", "requirements": ["Company registration (CIPA)", "Valid tax clearance (BURS)", "Proof of operational capacity", "Technical competency certificate"] },
  { "id": "2", "name": "Internet Service Provider", "category": "Internet", "fee": 50000, "duration": "5 years", "description": "For providing broadband internet services to consumers.", "requirements": ["Company registration", "Network infrastructure plan", "Tax clearance", "Spectrum licence if applicable"] },
  { "id": "3", "name": "Broadcasting Licence — FM Radio", "category": "Broadcasting", "fee": 35000, "duration": "5 years", "description": "For operating FM radio broadcasting services.", "requirements": ["Broadcasting content plan", "Technical frequency plan", "Company registration", "Tax clearance"] },
  { "id": "4", "name": "Mobile Virtual Network Operator", "category": "Telecoms", "fee": 75000, "duration": "5 years", "description": "For operating mobile virtual network services.", "requirements": ["Host MNO agreement", "Company registration", "Financial capacity proof", "Tax clearance"] }
]
JSON

cat > src/data/complaints.json << 'JSON'
[
  { "id": "BOCRA-2026-001", "category": "Billing Dispute", "isp": "Mascom Wireless", "status": "under_review", "description": "Charged twice for the same data bundle.", "date": "2026-03-10", "lastUpdate": "2026-03-14" },
  { "id": "BOCRA-2026-002", "category": "Poor Network Quality", "isp": "BeMobile", "status": "resolved", "description": "No 4G signal for 2 weeks in Tlokweng area.", "date": "2026-02-25", "lastUpdate": "2026-03-08" },
  { "id": "BOCRA-2026-003", "category": "Service Disconnection", "isp": "Orange Botswana", "status": "received", "description": "Disconnected without prior notice despite being up to date on payments.", "date": "2026-03-16", "lastUpdate": "2026-03-16" }
]
JSON

cat > src/data/applications.json << 'JSON'
[
  { "id": "APP-2026-001", "licenceType": "Class A Postal Operator", "status": "under_review", "submittedDate": "2026-03-05", "reference": "BOCRA/APP/001/2026", "fee": 25000 },
  { "id": "APP-2026-002", "licenceType": "Internet Service Provider", "status": "approved", "submittedDate": "2026-02-10", "reference": "BOCRA/APP/002/2026", "fee": 50000, "certificateUrl": "/certificates/ISP-2026-002.pdf" }
]
JSON

cat > src/data/qosMetrics.json << 'JSON'
{
  "summary": { "avgDownloadMbps": 28.4, "avgLatencyMs": 42, "avgUptime": 98.2, "complaintsThisMonth": 143 },
  "byISP": [
    { "name": "Mascom Wireless", "downloadMbps": 32.1, "latencyMs": 38, "uptimePct": 98.9, "complaints": 48, "coverage": 89 },
    { "name": "Orange Botswana", "downloadMbps": 29.5, "latencyMs": 41, "uptimePct": 98.4, "complaints": 52, "coverage": 85 },
    { "name": "BeMobile", "downloadMbps": 24.8, "latencyMs": 49, "uptimePct": 97.6, "complaints": 31, "coverage": 78 },
    { "name": "BTC (Fibre)", "downloadMbps": 95.2, "latencyMs": 12, "uptimePct": 99.5, "complaints": 12, "coverage": 34 }
  ],
  "monthlyComplaints": [
    { "month": "Oct", "count": 98 }, { "month": "Nov", "count": 112 },
    { "month": "Dec", "count": 87 }, { "month": "Jan", "count": 134 },
    { "month": "Feb", "count": 119 }, { "month": "Mar", "count": 143 }
  ]
}
JSON

cat > src/data/documents.json << 'JSON'
[
  { "id": "1", "title": "Communications Regulatory Authority Act, 2012", "type": "Legislation", "year": 2012, "size": "1.2MB", "url": "#" },
  { "id": "2", "title": "Postal Services Regulations, 2021", "type": "Regulation", "year": 2021, "size": "840KB", "url": "#" },
  { "id": "3", "title": "Consumer Protection Guidelines, 2023", "type": "Guidelines", "year": 2023, "size": "560KB", "url": "#" },
  { "id": "4", "title": "Spectrum Management Policy, 2022", "type": "Policy", "year": 2022, "size": "1.8MB", "url": "#" },
  { "id": "5", "title": "Annual Report 2024–2025", "type": "Report", "year": 2025, "size": "4.2MB", "url": "#" }
]
JSON

cat > src/data/careers.json << 'JSON'
[
  { "id": "1", "title": "Senior ICT Officer", "department": "Technology", "type": "Full-time", "location": "Gaborone", "closing": "2026-04-15" },
  { "id": "2", "title": "Legal Counsel", "department": "Legal", "type": "Full-time", "location": "Gaborone", "closing": "2026-04-20" },
  { "id": "3", "title": "Research Analyst", "department": "Research & Policy", "type": "Full-time", "location": "Gaborone", "closing": "2026-04-10" }
]
JSON

# =============================================================================
#  SHARED COMPONENTS
# =============================================================================
echo -e "${YELLOW}[5/6] Writing shared components and page stubs...${NC}"

# ── PageWrapper ───────────────────────────────────────────────────────────────
cat > src/components/shared/PageWrapper.jsx << 'COMP'
import Navbar from './Navbar'
import Footer from './Footer'

export default function PageWrapper({ children, fullWidth = false }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className={`flex-1 ${fullWidth ? '' : 'max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10'}`}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
COMP

# ── Navbar ────────────────────────────────────────────────────────────────────
cat > src/components/shared/Navbar.jsx << 'COMP'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Globe, User, LogOut, ChevronDown } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useLanguage } from '../../hooks/useLanguage'

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Licensing', href: '/licensing' },
  { label: 'Complaints', href: '/complaints' },
  { label: 'Documents', href: '/documents' },
  { label: 'News', href: '/news' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isLoggedIn, user, logout, role } = useAuth()
  const { lang, setLang, t } = useLanguage()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-bocra-blue text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
              <span className="text-bocra-blue font-bold text-xs">BOCRA</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-heading font-bold text-sm leading-tight">BOCRA Connect</p>
              <p className="text-xs text-blue-200">Botswana Communications Regulatory Authority</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.href} to={link.href}
                className="px-3 py-2 rounded-lg text-sm text-blue-100 hover:text-white hover:bg-bocra-accent transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'tn' : 'en')}
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs text-blue-200 hover:text-white hover:bg-bocra-accent transition-colors">
              <Globe size={14} />
              {lang === 'en' ? 'EN' : 'TN'}
            </button>

            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Link to={role === 'staff' ? '/admin' : '/portal'}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-bocra-accent text-sm hover:opacity-90 transition-opacity">
                  <User size={14} />
                  <span className="hidden sm:inline">{user?.name?.split(' ')[0]}</span>
                </Link>
                <button onClick={handleLogout}
                  className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-bocra-accent transition-colors">
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link to="/login"
                className="px-4 py-1.5 bg-white text-bocra-blue rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                {t('login')}
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-bocra-accent transition-colors">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-bocra-accent border-t border-blue-700 px-4 py-3 flex flex-col gap-1">
          {navLinks.map(link => (
            <Link key={link.href} to={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-blue-100 hover:text-white hover:bg-bocra-blue transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
COMP

# ── Footer ────────────────────────────────────────────────────────────────────
cat > src/components/shared/Footer.jsx << 'COMP'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-bocra-blue text-blue-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-bocra-blue font-bold text-xs">B</span>
              </div>
              <span className="font-heading font-bold text-white">BOCRA Connect</span>
            </div>
            <p className="text-sm text-blue-200 leading-relaxed max-w-xs">
              Botswana Communications Regulatory Authority — regulating telecommunications, broadcasting, postal and internet services in the public interest.
            </p>
            <p className="text-xs text-blue-300 mt-4">Plot 50671 Independence Ave, Gaborone, Botswana</p>
            <p className="text-xs text-blue-300">Tel: +267 3957755 · info@bocra.org.bw</p>
          </div>
          <div>
            <p className="font-medium text-white text-sm mb-3">Services</p>
            <div className="flex flex-col gap-1.5">
              {[['Licensing', '/licensing'], ['File a Complaint', '/complaints'], ['Documents', '/documents'], ['Verify Licence', '/verify'], ['Coverage Map', '/map']].map(([l, h]) => (
                <Link key={h} to={h} className="text-sm text-blue-200 hover:text-white transition-colors">{l}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="font-medium text-white text-sm mb-3">About</p>
            <div className="flex flex-col gap-1.5">
              {[['About BOCRA', '/about'], ['News & Events', '/news'], ['Tenders', '/tenders'], ['Careers', '/careers'], ['Contact', '/contact']].map(([l, h]) => (
                <Link key={h} to={h} className="text-sm text-blue-200 hover:text-white transition-colors">{l}</Link>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-blue-700 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-blue-300">© 2026 Botswana Communications Regulatory Authority. All rights reserved.</p>
          <p className="text-xs text-blue-300 italic">Imagine the world without order. Imagine Botswana without BOCRA.</p>
        </div>
      </div>
    </footer>
  )
}
COMP

# ── Button ────────────────────────────────────────────────────────────────────
cat > src/components/shared/Button.jsx << 'COMP'
import { Loader2 } from 'lucide-react'

const variants = {
  primary:   'bg-bocra-blue text-white hover:bg-bocra-accent',
  secondary: 'bg-bocra-light text-bocra-blue hover:bg-blue-200',
  ghost:     'bg-transparent text-bocra-blue border border-bocra-blue hover:bg-bocra-light',
  danger:    'bg-red-600 text-white hover:bg-red-700',
  teal:      'bg-bocra-teal text-white hover:opacity-90',
}
const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

export default function Button({
  children, variant = 'primary', size = 'md', loading = false,
  disabled = false, fullWidth = false, icon: Icon, onClick, type = 'button', className = ''
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {loading ? <Loader2 size={16} className="animate-spin" /> : Icon && <Icon size={16} />}
      {children}
    </button>
  )
}
COMP

# ── Badge ─────────────────────────────────────────────────────────────────────
cat > src/components/shared/Badge.jsx << 'COMP'
const statusConfig = {
  active:       { label: 'Active',        className: 'bg-green-50 text-green-700 border-green-200' },
  approved:     { label: 'Approved',      className: 'bg-green-50 text-green-700 border-green-200' },
  resolved:     { label: 'Resolved',      className: 'bg-green-50 text-green-700 border-green-200' },
  pending:      { label: 'Pending',       className: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  under_review: { label: 'Under Review',  className: 'bg-blue-50 text-blue-700 border-blue-200' },
  received:     { label: 'Received',      className: 'bg-blue-50 text-blue-700 border-blue-200' },
  open:         { label: 'Open',          className: 'bg-blue-50 text-blue-700 border-blue-200' },
  rejected:     { label: 'Rejected',      className: 'bg-red-50 text-red-700 border-red-200' },
  closed:       { label: 'Closed',        className: 'bg-gray-50 text-gray-600 border-gray-200' },
  expired:      { label: 'Expired',       className: 'bg-red-50 text-red-700 border-red-200' },
  draft:        { label: 'Draft',         className: 'bg-gray-50 text-gray-600 border-gray-200' },
}

export default function Badge({ status, label, color }) {
  const config = statusConfig[status] || { label: label || status, className: 'bg-gray-50 text-gray-600 border-gray-200' }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className}`}>
      {label || config.label}
    </span>
  )
}
COMP

# ── Card ──────────────────────────────────────────────────────────────────────
cat > src/components/shared/Card.jsx << 'COMP'
export default function Card({ children, className = '', onClick, hover = false }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-gray-200 ${hover ? 'hover:shadow-md hover:border-gray-300 cursor-pointer transition-all' : ''} ${className}`}
    >
      {children}
    </div>
  )
}

Card.Header = function CardHeader({ children, className = '' }) {
  return <div className={`px-6 py-4 border-b border-gray-100 ${className}`}>{children}</div>
}
Card.Body = function CardBody({ children, className = '' }) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>
}
Card.Footer = function CardFooter({ children, className = '' }) {
  return <div className={`px-6 py-4 border-t border-gray-100 ${className}`}>{children}</div>
}
COMP

# ── KPICard ───────────────────────────────────────────────────────────────────
cat > src/components/shared/KPICard.jsx << 'COMP'
export default function KPICard({ label, value, change, changeLabel, icon: Icon, color = 'blue' }) {
  const colors = {
    blue:  'bg-bocra-light text-bocra-blue',
    teal:  'bg-teal-50 text-bocra-teal',
    amber: 'bg-amber-50 text-amber-700',
    red:   'bg-red-50 text-red-700',
  }
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900 font-heading">{value}</p>
          {change !== undefined && (
            <p className={`text-xs mt-1 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? '+' : ''}{change} {changeLabel}
            </p>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl ${colors[color]}`}>
            <Icon size={20} />
          </div>
        )}
      </div>
    </div>
  )
}
COMP

# ── Input ─────────────────────────────────────────────────────────────────────
cat > src/components/shared/Input.jsx << 'COMP'
export default function Input({ label, error, icon: Icon, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative">
        {Icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Icon size={16} /></div>}
        <input
          {...props}
          className={`w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-bocra-blue focus:ring-1 focus:ring-bocra-blue transition-colors ${Icon ? 'pl-9' : ''} ${error ? 'border-red-400' : ''} ${className}`}
        />
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}
COMP

# ── Spinner ───────────────────────────────────────────────────────────────────
cat > src/components/shared/Spinner.jsx << 'COMP'
export default function Spinner({ size = 'md', className = '' }) {
  const s = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' }
  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <div className={`${s[size]} animate-spin rounded-full border-2 border-bocra-light border-t-bocra-blue`} />
    </div>
  )
}
COMP

# ── EmptyState ────────────────────────────────────────────────────────────────
cat > src/components/shared/EmptyState.jsx << 'COMP'
import { Inbox } from 'lucide-react'

export default function EmptyState({ title = 'Nothing here yet', description = '', action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="p-4 bg-gray-100 rounded-2xl mb-4">
        <Inbox size={32} className="text-gray-400" />
      </div>
      <h3 className="font-heading font-semibold text-gray-700 mb-1">{title}</h3>
      {description && <p className="text-sm text-gray-400 max-w-xs">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
COMP

# ── StatusTimeline ────────────────────────────────────────────────────────────
cat > src/components/shared/StatusTimeline.jsx << 'COMP'
import { Check } from 'lucide-react'

export default function StatusTimeline({ steps = [] }) {
  return (
    <div className="flex flex-col gap-0">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${step.done ? 'bg-bocra-teal' : 'bg-gray-200'}`}>
              {step.done ? <Check size={14} className="text-white" /> : <span className="text-xs text-gray-400">{i + 1}</span>}
            </div>
            {i < steps.length - 1 && <div className={`w-0.5 h-8 ${step.done ? 'bg-bocra-teal' : 'bg-gray-200'}`} />}
          </div>
          <div className="pb-6">
            <p className={`text-sm font-medium ${step.done ? 'text-gray-900' : 'text-gray-400'}`}>{step.label}</p>
            {step.date && <p className="text-xs text-gray-400 mt-0.5">{step.date}</p>}
            {step.note && <p className="text-xs text-gray-500 mt-1 bg-gray-50 rounded-lg px-2 py-1">{step.note}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}
COMP

# ── Breadcrumb ────────────────────────────────────────────────────────────────
cat > src/components/shared/Breadcrumb.jsx << 'COMP'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight size={14} className="text-gray-300" />}
          {item.href ? (
            <Link to={item.href} className="hover:text-bocra-blue transition-colors">{item.label}</Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
COMP

# ── Modal ─────────────────────────────────────────────────────────────────────
cat > src/components/shared/Modal.jsx << 'COMP'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, children, size = 'md' }) {
  if (!open) return null
  const sizes = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className={`relative bg-white rounded-2xl shadow-xl w-full ${sizes[size]} max-h-[90vh] overflow-auto`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-heading font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
            <X size={18} className="text-gray-500" />
          </button>
        </div>
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  )
}
COMP

# ── ProtectedRoute ────────────────────────────────────────────────────────────
cat > src/components/shared/ProtectedRoute.jsx << 'COMP'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function ProtectedRoute({ role }) {
  const { isLoggedIn, role: userRole } = useAuth()

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }
  if (role && userRole !== role) {
    return <Navigate to="/" replace />
  }
  return <Outlet />
}
COMP

# ── Barrel export ─────────────────────────────────────────────────────────────
cat > src/components/shared/index.js << 'COMP'
export { default as PageWrapper }      from './PageWrapper'
export { default as Navbar }           from './Navbar'
export { default as Footer }           from './Footer'
export { default as Button }           from './Button'
export { default as Badge }            from './Badge'
export { default as Card }             from './Card'
export { default as KPICard }          from './KPICard'
export { default as Input }            from './Input'
export { default as Spinner }          from './Spinner'
export { default as EmptyState }       from './EmptyState'
export { default as StatusTimeline }   from './StatusTimeline'
export { default as Breadcrumb }       from './Breadcrumb'
export { default as Modal }            from './Modal'
export { default as ProtectedRoute }   from './ProtectedRoute'
COMP

# =============================================================================
#  PAGE STUBS — all pages with proper shell so they run immediately
# =============================================================================

# helper: write a page stub
write_page() {
  local FILE=$1
  local NAME=$2
  local OWNER=$3
  local ROUTE=$4
  cat > "$FILE" << STUB
import PageWrapper from '../components/shared/PageWrapper'

// 🔧 Owner: ${OWNER}
// 📍 Route: ${ROUTE}
// TODO: Build this page

export default function ${NAME}() {
  return (
    <PageWrapper>
      <div className="py-20 text-center">
        <div className="inline-block bg-bocra-light text-bocra-blue text-xs font-medium px-3 py-1 rounded-full mb-4">
          ${OWNER}
        </div>
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">${NAME}</h1>
        <p className="text-gray-500 text-sm">Route: <code className="bg-gray-100 px-2 py-0.5 rounded">${ROUTE}</code></p>
      </div>
    </PageWrapper>
  )
}
STUB
}

# Dev 1 pages
write_page "src/pages/HomePage.jsx"          "HomePage"          "Dev 1" "/"
write_page "src/pages/AboutPage.jsx"         "AboutPage"         "Dev 1" "/about"
write_page "src/pages/NewsPage.jsx"          "NewsPage"          "Dev 1" "/news"
write_page "src/pages/NewsArticlePage.jsx"   "NewsArticlePage"   "Dev 1" "/news/:slug"
write_page "src/pages/TendersPage.jsx"       "TendersPage"       "Dev 1" "/tenders"
write_page "src/pages/CareersPage.jsx"       "CareersPage"       "Dev 1" "/careers"
write_page "src/pages/ContactPage.jsx"       "ContactPage"       "Dev 1" "/contact"
write_page "src/pages/NotFoundPage.jsx"      "NotFoundPage"      "Dev 1" "/404"

# Dev 2 pages
write_page "src/pages/LicensingPage.jsx"     "LicensingPage"     "Dev 2" "/licensing"
write_page "src/pages/ComplaintsPage.jsx"    "ComplaintsPage"    "Dev 2" "/complaints"
write_page "src/pages/DocumentsPage.jsx"     "DocumentsPage"     "Dev 2" "/documents"
write_page "src/pages/SearchPage.jsx"        "SearchPage"        "Dev 2" "/search"
write_page "src/pages/QoSPage.jsx"           "QoSPage"           "Dev 2" "/qos"
write_page "src/pages/VerifyPage.jsx"        "VerifyPage"        "Dev 2" "/verify"
write_page "src/pages/CIRTPage.jsx"          "CIRTPage"          "Dev 2" "/cirt"
write_page "src/pages/ConsultationsPage.jsx" "ConsultationsPage" "Dev 2" "/consultations"

# Dev 3 pages
write_page "src/pages/auth/LoginPage.jsx"    "LoginPage"         "Dev 3" "/login"
write_page "src/pages/auth/RegisterPage.jsx" "RegisterPage"      "Dev 3" "/register"
write_page "src/pages/portal/DashboardPage.jsx"       "DashboardPage"       "Dev 3" "/portal"
write_page "src/pages/portal/NewComplaintPage.jsx"    "NewComplaintPage"    "Dev 3" "/portal/complaint/new"
write_page "src/pages/portal/ComplaintDetailPage.jsx" "ComplaintDetailPage" "Dev 3" "/portal/complaint/:id"
write_page "src/pages/portal/ComplaintsListPage.jsx"  "ComplaintsListPage"  "Dev 3" "/portal/complaints"
write_page "src/pages/portal/ApplyPage.jsx"           "ApplyPage"           "Dev 3" "/portal/apply"
write_page "src/pages/portal/ApplicationsPage.jsx"    "ApplicationsPage"    "Dev 3" "/portal/applications"

# Dev 4 pages
write_page "src/pages/AIPage.jsx"            "AIPage"                 "Dev 4" "/ai"
write_page "src/pages/MapPage.jsx"           "MapPage"                "Dev 4" "/map"
write_page "src/pages/admin/AdminLoginPage.jsx"       "AdminLoginPage"       "Dev 4" "/admin/login"
write_page "src/pages/admin/AdminDashboardPage.jsx"   "AdminDashboardPage"   "Dev 4" "/admin"
write_page "src/pages/admin/AdminComplaintsPage.jsx"  "AdminComplaintsPage"  "Dev 4" "/admin/complaints"
write_page "src/pages/admin/AdminApplicationsPage.jsx" "AdminApplicationsPage" "Dev 4" "/admin/applications"

echo -e "${GREEN}  ✓ All page stubs written${NC}"

# =============================================================================
#  DONE
# =============================================================================
echo ""
echo -e "${YELLOW}[6/6] Finalising...${NC}"
echo ""
echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}  Setup complete!${NC}"
echo -e "${GREEN}============================================${NC}"
echo ""
echo -e "  Start dev server:  ${BLUE}npm run dev${NC}"
echo -e "  Open browser:      ${BLUE}http://localhost:5173${NC}"
echo ""
echo -e "  Shared components: ${YELLOW}src/components/shared/${NC}"
echo -e "  Mock data:         ${YELLOW}src/data/*.json${NC}"
echo -e "  Your pages:        ${YELLOW}src/pages/${NC}"
echo ""
echo -e "${GREEN}  All 25 page stubs ready. Each shows owner + route.${NC}"
echo -e "${GREEN}  Dev 1: build shared/ first, then everyone else can start.${NC}"
echo ""
