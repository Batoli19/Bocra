/**
 * BOCRA Connect — Project Setup Script
 * Works on Windows, Mac, and Linux
 * Run with:  node setup.js
 */

const fs   = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const G = '\x1b[32m', Y = '\x1b[33m', B = '\x1b[34m', R = '\x1b[0m'
const log  = (msg) => console.log(`${G}  ✓ ${msg}${R}`)
const step = (msg) => console.log(`\n${Y}${msg}${R}`)
const info = (msg) => console.log(`${B}  ${msg}${R}`)

console.log(`\n${B}============================================${R}`)
console.log(`${B}  BOCRA Connect — Windows/Mac/Linux Setup  ${R}`)
console.log(`${B}============================================${R}`)

// ─── helpers ────────────────────────────────────────────────────────────────
function mkdir(p) {
  fs.mkdirSync(p, { recursive: true })
}

function write(filePath, content) {
  mkdir(path.dirname(filePath))
  fs.writeFileSync(filePath, content.trimStart(), 'utf8')
}

function run(cmd) {
  execSync(cmd, { stdio: 'inherit', shell: true })
}

// ─── Step 1: package.json ────────────────────────────────────────────────────
step('[1/6] Creating package.json...')

write('package.json', `
{
  "name": "bocra-connect",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext js,jsx"
  }
}
`)
log('package.json created')

// ─── Step 2: Install dependencies ────────────────────────────────────────────
step('[2/6] Installing npm packages (this takes 1-2 minutes)...')
info('Installing vite + react...')
run('npm install vite @vitejs/plugin-react react react-dom')

info('Installing routing + forms + charts + map...')
run('npm install react-router-dom react-hook-form axios lucide-react chart.js react-chartjs-2 leaflet react-leaflet')

info('Installing tailwind...')
run('npm install -D tailwindcss postcss autoprefixer')

log('All packages installed')

// ─── Step 3: Config files ─────────────────────────────────────────────────────
step('[3/6] Writing config files...')

write('vite.config.js', `
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
})
`)

write('tailwind.config.js', `
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
    },
  },
  plugins: [],
}
`)

write('.env.example', `
VITE_APP_NAME=BOCRA Connect
VITE_APP_URL=http://localhost:5173
VITE_ANTHROPIC_API_KEY=your_key_here
VITE_USE_MOCK_DATA=true
`)

if (!fs.existsSync('.env')) fs.copyFileSync('.env.example', '.env')

write('.gitignore', `
node_modules
dist
.env
.DS_Store
*.local
`)

write('index.html', `
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
`)

log('Config files written')

// ─── Step 4: Folders ──────────────────────────────────────────────────────────
step('[4/6] Creating folder structure...')
const folders = [
  'src/components/shared',
  'src/components/public',
  'src/components/services',
  'src/components/portal',
  'src/components/admin',
  'src/components/ai',
  'src/components/map',
  'src/pages/auth',
  'src/pages/portal',
  'src/pages/admin',
  'src/context',
  'src/hooks',
  'src/data',
  'src/styles',
  'src/utils',
  'public',
]
folders.forEach(mkdir)
log('All folders created')

// ─── Step 5: Source files ─────────────────────────────────────────────────────
step('[5/6] Writing all source files...')

// STYLES
write('src/styles/globals.css', `
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
}

.leaflet-container {
  height: 100%;
  width: 100%;
  border-radius: 1rem;
}
`)

// MAIN ENTRY
write('src/main.jsx', `
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/globals.css'
import { AuthProvider }     from './context/AuthContext'
import { LanguageProvider } from './context/LanguageContext'
import { ToastProvider }    from './context/ToastContext'

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
`)

// APP ROUTER
write('src/App.jsx', `
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/shared/ProtectedRoute'

// Public
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
// Auth
import LoginPage           from './pages/auth/LoginPage'
import RegisterPage        from './pages/auth/RegisterPage'
// Portal
import DashboardPage       from './pages/portal/DashboardPage'
import NewComplaintPage    from './pages/portal/NewComplaintPage'
import ComplaintDetailPage from './pages/portal/ComplaintDetailPage'
import ComplaintsListPage  from './pages/portal/ComplaintsListPage'
import ApplyPage           from './pages/portal/ApplyPage'
import ApplicationsPage    from './pages/portal/ApplicationsPage'
// Admin
import AdminLoginPage          from './pages/admin/AdminLoginPage'
import AdminDashboardPage      from './pages/admin/AdminDashboardPage'
import AdminComplaintsPage     from './pages/admin/AdminComplaintsPage'
import AdminApplicationsPage   from './pages/admin/AdminApplicationsPage'

export default function App() {
  return (
    <Routes>
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

      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/portal" element={<ProtectedRoute role="citizen" />}>
        <Route index                element={<DashboardPage />} />
        <Route path="complaint/new" element={<NewComplaintPage />} />
        <Route path="complaint/:id" element={<ComplaintDetailPage />} />
        <Route path="complaints"    element={<ComplaintsListPage />} />
        <Route path="apply"         element={<ApplyPage />} />
        <Route path="applications"  element={<ApplicationsPage />} />
      </Route>

      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<ProtectedRoute role="staff" />}>
        <Route index               element={<AdminDashboardPage />} />
        <Route path="complaints"   element={<AdminComplaintsPage />} />
        <Route path="applications" element={<AdminApplicationsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
`)

// CONTEXT FILES
write('src/context/AuthContext.jsx', `
import { createContext, useState } from 'react'
export const AuthContext = createContext(null)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const login = (phone, otp) => {
    if (otp === '123456') {
      const role = phone.toLowerCase().includes('staff') ? 'staff' : 'citizen'
      setUser({ id: '1', name: role === 'staff' ? 'BOCRA Officer' : 'Kefilwe Mosweu', phone, role })
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
`)

write('src/context/LanguageContext.jsx', `
import { createContext, useState } from 'react'
export const LanguageContext = createContext(null)
const T = {
  en: { home:'Home', about:'About', news:'News & Events', licensing:'Licensing', complaints:'Complaints', documents:'Documents', contact:'Contact', file_complaint:'File a Complaint', apply_licence:'Apply for Licence', track_complaint:'Track Complaint', login:'Login', register:'Register', logout:'Logout', my_dashboard:'My Dashboard' },
  tn: { home:'Gae', about:'Ka ga Rona', news:'Dikgang le Ditiragalo', licensing:'Laesense', complaints:'Diipelego', documents:'Dikwalo', contact:'Ikgolaganya', file_complaint:'Bega Ipelego', apply_licence:'Kopa Laesense', track_complaint:'Sala Morago ga Ipelego', login:'Tsena', register:'Ikwadise', logout:'Tswa', my_dashboard:'Phanele ya me' },
}
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')
  const t = (key) => T[lang][key] || T.en[key] || key
  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
}
`)

write('src/context/ToastContext.jsx', `
import { createContext, useState, useCallback } from 'react'
export const ToastContext = createContext(null)
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const add = useCallback((message, type = 'info') => {
    const id = Date.now()
    setToasts(p => [...p, { id, message, type }])
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 4000)
  }, [])
  const toast = { success: m => add(m,'success'), error: m => add(m,'error'), info: m => add(m,'info') }
  const styles = { success:'bg-green-50 border-green-200 text-green-800', error:'bg-red-50 border-red-200 text-red-800', info:'bg-blue-50 border-blue-200 text-blue-800' }
  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map(t => <div key={t.id} className={\`border rounded-xl px-4 py-3 text-sm font-medium shadow-sm max-w-sm \${styles[t.type]}\`}>{t.message}</div>)}
      </div>
    </ToastContext.Provider>
  )
}
`)

// HOOKS
write('src/hooks/useAuth.js',     `import { useContext } from 'react'\nimport { AuthContext } from '../context/AuthContext'\nexport const useAuth = () => useContext(AuthContext)\n`)
write('src/hooks/useLanguage.js', `import { useContext } from 'react'\nimport { LanguageContext } from '../context/LanguageContext'\nexport const useLanguage = () => useContext(LanguageContext)\n`)
write('src/hooks/useToast.js',    `import { useContext } from 'react'\nimport { ToastContext } from '../context/ToastContext'\nexport const useToast = () => useContext(ToastContext)\n`)

// UTILS
write('src/utils/formatDate.js', `
export const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-BW', { day:'numeric', month:'short', year:'numeric' }) : '—'
export const timeAgo = (d) => { const days = Math.floor((Date.now()-new Date(d))/86400000); return days===0?'Today':days===1?'Yesterday':days<7?\`\${days} days ago\`:formatDate(d) }
`)
write('src/utils/formatCurrency.js', `
export const formatBWP = (n) => new Intl.NumberFormat('en-BW',{style:'currency',currency:'BWP'}).format(n)
`)
write('src/utils/mockFetch.js', `
const cache = {}
export const mockFetch = async (resource) => {
  if (cache[resource]) return cache[resource]
  const mod = await import(\`../data/\${resource}.json\`)
  await new Promise(r => setTimeout(r, 350))
  cache[resource] = mod.default
  return mod.default
}
`)

// MOCK DATA
write('src/data/news.json', JSON.stringify([
  { id:'1', slug:'bocra-spectrum-auction-2026', title:'BOCRA Announces 5G Spectrum Auction for 2026', category:'Announcements', date:'2026-03-10', excerpt:'BOCRA has announced the opening of bids for 5G spectrum allocation across Botswana major urban centres.', author:'BOCRA Communications' },
  { id:'2', slug:'consumer-protection-campaign', title:'Consumer Rights Campaign Launched Nationwide', category:'Consumer Protection', date:'2026-03-05', excerpt:'A nationwide awareness campaign on telecommunications consumer rights has been launched.', author:'BOCRA Communications' },
  { id:'3', slug:'broadband-coverage-report-q1', title:'Q1 2026 Broadband Coverage Report Published', category:'Reports', date:'2026-02-28', excerpt:'The latest broadband penetration statistics show 74% coverage of Botswana households.', author:'Research Division' },
  { id:'4', slug:'cyber-security-advisory-march', title:'Cybersecurity Advisory: Phishing Campaign Targeting Batswana', category:'bwCIRT', date:'2026-03-15', excerpt:'bwCIRT has issued an advisory regarding a phishing campaign targeting mobile banking users.', author:'bwCIRT' },
], null, 2))

write('src/data/tenders.json', JSON.stringify([
  { id:'T001', title:'Supply and Delivery of ICT Equipment 2026', status:'open', closingDate:'2026-04-10', category:'ICT', reference:'BOCRA/T/001/2026' },
  { id:'T002', title:'Consultancy Services: Spectrum Management System', status:'open', closingDate:'2026-04-05', category:'Consultancy', reference:'BOCRA/T/002/2026' },
  { id:'T003', title:'Office Cleaning Services — Gaborone HQ', status:'closed', closingDate:'2026-02-15', category:'Services', reference:'BOCRA/T/003/2025' },
], null, 2))

write('src/data/licenceTypes.json', JSON.stringify([
  { id:'1', name:'Class A Postal Operator', category:'Postal', fee:25000, duration:'5 years', description:'For large-scale postal and courier operations across Botswana.', requirements:['Company registration (CIPA)','Valid tax clearance (BURS)','Proof of operational capacity','Technical competency certificate'] },
  { id:'2', name:'Internet Service Provider', category:'Internet', fee:50000, duration:'5 years', description:'For providing broadband internet services to consumers.', requirements:['Company registration','Network infrastructure plan','Tax clearance','Spectrum licence if applicable'] },
  { id:'3', name:'Broadcasting Licence — FM Radio', category:'Broadcasting', fee:35000, duration:'5 years', description:'For operating FM radio broadcasting services.', requirements:['Broadcasting content plan','Technical frequency plan','Company registration','Tax clearance'] },
  { id:'4', name:'Mobile Virtual Network Operator', category:'Telecoms', fee:75000, duration:'5 years', description:'For operating mobile virtual network services.', requirements:['Host MNO agreement','Company registration','Financial capacity proof','Tax clearance'] },
], null, 2))

write('src/data/complaints.json', JSON.stringify([
  { id:'BOCRA-2026-001', category:'Billing Dispute', isp:'Mascom Wireless', status:'under_review', description:'Charged twice for the same data bundle.', date:'2026-03-10', lastUpdate:'2026-03-14' },
  { id:'BOCRA-2026-002', category:'Poor Network Quality', isp:'BeMobile', status:'resolved', description:'No 4G signal for 2 weeks in Tlokweng area.', date:'2026-02-25', lastUpdate:'2026-03-08' },
  { id:'BOCRA-2026-003', category:'Service Disconnection', isp:'Orange Botswana', status:'received', description:'Disconnected without prior notice despite being up to date on payments.', date:'2026-03-16', lastUpdate:'2026-03-16' },
], null, 2))

write('src/data/applications.json', JSON.stringify([
  { id:'APP-2026-001', licenceType:'Class A Postal Operator', status:'under_review', submittedDate:'2026-03-05', reference:'BOCRA/APP/001/2026', fee:25000 },
  { id:'APP-2026-002', licenceType:'Internet Service Provider', status:'approved', submittedDate:'2026-02-10', reference:'BOCRA/APP/002/2026', fee:50000, certificateUrl:'/certificates/ISP-2026-002.pdf' },
], null, 2))

write('src/data/qosMetrics.json', JSON.stringify({
  summary: { avgDownloadMbps:28.4, avgLatencyMs:42, avgUptime:98.2, complaintsThisMonth:143 },
  byISP: [
    { name:'Mascom Wireless', downloadMbps:32.1, latencyMs:38, uptimePct:98.9, complaints:48, coverage:89 },
    { name:'Orange Botswana', downloadMbps:29.5, latencyMs:41, uptimePct:98.4, complaints:52, coverage:85 },
    { name:'BeMobile',        downloadMbps:24.8, latencyMs:49, uptimePct:97.6, complaints:31, coverage:78 },
    { name:'BTC (Fibre)',     downloadMbps:95.2, latencyMs:12, uptimePct:99.5, complaints:12, coverage:34 },
  ],
  monthlyComplaints: [
    {month:'Oct',count:98},{month:'Nov',count:112},{month:'Dec',count:87},
    {month:'Jan',count:134},{month:'Feb',count:119},{month:'Mar',count:143},
  ],
}, null, 2))

write('src/data/documents.json', JSON.stringify([
  { id:'1', title:'Communications Regulatory Authority Act, 2012', type:'Legislation', year:2012, size:'1.2MB', url:'#' },
  { id:'2', title:'Postal Services Regulations, 2021', type:'Regulation', year:2021, size:'840KB', url:'#' },
  { id:'3', title:'Consumer Protection Guidelines, 2023', type:'Guidelines', year:2023, size:'560KB', url:'#' },
  { id:'4', title:'Spectrum Management Policy, 2022', type:'Policy', year:2022, size:'1.8MB', url:'#' },
  { id:'5', title:'Annual Report 2024–2025', type:'Report', year:2025, size:'4.2MB', url:'#' },
], null, 2))

write('src/data/careers.json', JSON.stringify([
  { id:'1', title:'Senior ICT Officer', department:'Technology', type:'Full-time', location:'Gaborone', closing:'2026-04-15' },
  { id:'2', title:'Legal Counsel', department:'Legal', type:'Full-time', location:'Gaborone', closing:'2026-04-20' },
  { id:'3', title:'Research Analyst', department:'Research & Policy', type:'Full-time', location:'Gaborone', closing:'2026-04-10' },
], null, 2))

// SHARED COMPONENTS
write('src/components/shared/ProtectedRoute.jsx', `
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
export default function ProtectedRoute({ role }) {
  const { isLoggedIn, role: userRole } = useAuth()
  if (!isLoggedIn) return <Navigate to="/login" replace />
  if (role && userRole !== role) return <Navigate to="/" replace />
  return <Outlet />
}
`)

write('src/components/shared/Button.jsx', `
import { Loader2 } from 'lucide-react'
const V = { primary:'bg-bocra-blue text-white hover:bg-bocra-accent', secondary:'bg-bocra-light text-bocra-blue hover:bg-blue-200', ghost:'bg-transparent text-bocra-blue border border-bocra-blue hover:bg-bocra-light', danger:'bg-red-600 text-white hover:bg-red-700', teal:'bg-bocra-teal text-white hover:opacity-90' }
const S = { sm:'px-3 py-1.5 text-xs', md:'px-5 py-2.5 text-sm', lg:'px-7 py-3.5 text-base' }
export default function Button({ children, variant='primary', size='md', loading=false, disabled=false, fullWidth=false, icon:Icon, onClick, type='button', className='' }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled||loading}
      className={\`inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed \${V[variant]} \${S[size]} \${fullWidth?'w-full':''} \${className}\`}>
      {loading ? <Loader2 size={16} className="animate-spin" /> : Icon && <Icon size={16} />}
      {children}
    </button>
  )
}
`)

write('src/components/shared/Badge.jsx', `
const C = { active:'bg-green-50 text-green-700 border-green-200', approved:'bg-green-50 text-green-700 border-green-200', resolved:'bg-green-50 text-green-700 border-green-200', pending:'bg-yellow-50 text-yellow-700 border-yellow-200', under_review:'bg-blue-50 text-blue-700 border-blue-200', received:'bg-blue-50 text-blue-700 border-blue-200', open:'bg-blue-50 text-blue-700 border-blue-200', rejected:'bg-red-50 text-red-700 border-red-200', closed:'bg-gray-50 text-gray-600 border-gray-200', expired:'bg-red-50 text-red-700 border-red-200', draft:'bg-gray-50 text-gray-600 border-gray-200' }
export default function Badge({ status, label }) {
  const cls = C[status] || 'bg-gray-50 text-gray-600 border-gray-200'
  const lbl = label || status?.replace('_',' ')
  return <span className={\`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border \${cls}\`}>{lbl}</span>
}
`)

write('src/components/shared/Card.jsx', `
export default function Card({ children, className='', onClick, hover=false }) {
  return <div onClick={onClick} className={\`bg-white rounded-2xl border border-gray-200 \${hover?'hover:shadow-md hover:border-gray-300 cursor-pointer transition-all':''} \${className}\`}>{children}</div>
}
Card.Header = ({ children, className='' }) => <div className={\`px-6 py-4 border-b border-gray-100 \${className}\`}>{children}</div>
Card.Body   = ({ children, className='' }) => <div className={\`px-6 py-4 \${className}\`}>{children}</div>
Card.Footer = ({ children, className='' }) => <div className={\`px-6 py-4 border-t border-gray-100 \${className}\`}>{children}</div>
`)

write('src/components/shared/Input.jsx', `
export default function Input({ label, error, icon:Icon, className='', ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative">
        {Icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Icon size={16} /></div>}
        <input {...props} className={\`w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-bocra-blue focus:ring-1 focus:ring-bocra-blue transition-colors \${Icon?'pl-9':''} \${error?'border-red-400':''} \${className}\`} />
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}
`)

write('src/components/shared/Spinner.jsx', `
export default function Spinner({ size='md', className='' }) {
  const s = { sm:'h-4 w-4', md:'h-8 w-8', lg:'h-12 w-12' }
  return <div className={\`flex items-center justify-center py-12 \${className}\`}><div className={\`\${s[size]} animate-spin rounded-full border-2 border-bocra-light border-t-bocra-blue\`}/></div>
}
`)

write('src/components/shared/EmptyState.jsx', `
import { Inbox } from 'lucide-react'
export default function EmptyState({ title='Nothing here yet', description='', action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="p-4 bg-gray-100 rounded-2xl mb-4"><Inbox size={32} className="text-gray-400" /></div>
      <h3 className="font-heading font-semibold text-gray-700 mb-1">{title}</h3>
      {description && <p className="text-sm text-gray-400 max-w-xs">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
`)

write('src/components/shared/KPICard.jsx', `
export default function KPICard({ label, value, change, changeLabel, icon:Icon, color='blue' }) {
  const colors = { blue:'bg-bocra-light text-bocra-blue', teal:'bg-teal-50 text-bocra-teal', amber:'bg-amber-50 text-amber-700', red:'bg-red-50 text-red-700' }
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900 font-heading">{value}</p>
          {change !== undefined && <p className={\`text-xs mt-1 \${change>=0?'text-green-600':'text-red-600'}\`}>{change>=0?'+':''}{change} {changeLabel}</p>}
        </div>
        {Icon && <div className={\`p-3 rounded-xl \${colors[color]}\`}><Icon size={20} /></div>}
      </div>
    </div>
  )
}
`)

write('src/components/shared/StatusTimeline.jsx', `
import { Check } from 'lucide-react'
export default function StatusTimeline({ steps=[] }) {
  return (
    <div className="flex flex-col">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className={\`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 \${step.done?'bg-bocra-teal':'bg-gray-200'}\`}>
              {step.done ? <Check size={14} className="text-white" /> : <span className="text-xs text-gray-400">{i+1}</span>}
            </div>
            {i < steps.length-1 && <div className={\`w-0.5 h-8 \${step.done?'bg-bocra-teal':'bg-gray-200'}\`} />}
          </div>
          <div className="pb-6">
            <p className={\`text-sm font-medium \${step.done?'text-gray-900':'text-gray-400'}\`}>{step.label}</p>
            {step.date && <p className="text-xs text-gray-400 mt-0.5">{step.date}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}
`)

write('src/components/shared/Modal.jsx', `
import { X } from 'lucide-react'
export default function Modal({ open, onClose, title, children, size='md' }) {
  if (!open) return null
  const sizes = { sm:'max-w-md', md:'max-w-lg', lg:'max-w-2xl', xl:'max-w-4xl' }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className={\`relative bg-white rounded-2xl shadow-xl w-full \${sizes[size]} max-h-[90vh] overflow-auto\`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-heading font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 transition-colors"><X size={18} className="text-gray-500" /></button>
        </div>
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  )
}
`)

write('src/components/shared/Breadcrumb.jsx', `
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
export default function Breadcrumb({ items=[] }) {
  return (
    <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight size={14} className="text-gray-300" />}
          {item.href ? <Link to={item.href} className="hover:text-bocra-blue transition-colors">{item.label}</Link> : <span className="text-gray-900 font-medium">{item.label}</span>}
        </span>
      ))}
    </nav>
  )
}
`)

write('src/components/shared/Navbar.jsx', `
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Globe, User, LogOut } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useLanguage } from '../../hooks/useLanguage'

const navLinks = [
  { label:'About', href:'/about' },
  { label:'Licensing', href:'/licensing' },
  { label:'Complaints', href:'/complaints' },
  { label:'Documents', href:'/documents' },
  { label:'News', href:'/news' },
  { label:'QoS', href:'/qos' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { isLoggedIn, user, logout, role } = useAuth()
  const { lang, setLang, t } = useLanguage()
  const navigate = useNavigate()
  const handleLogout = () => { logout(); navigate('/') }

  return (
    <nav className="bg-bocra-blue text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
              <span className="text-bocra-blue font-bold text-xs leading-none">BOCRA</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-heading font-bold text-sm leading-tight">BOCRA Connect</p>
              <p className="text-xs text-blue-200">Communications Regulatory Authority</p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(l => (
              <Link key={l.href} to={l.href} className="px-3 py-2 rounded-lg text-sm text-blue-100 hover:text-white hover:bg-bocra-accent transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setLang(lang==='en'?'tn':'en')} className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs text-blue-200 hover:text-white hover:bg-bocra-accent transition-colors">
              <Globe size={14} />{lang.toUpperCase()}
            </button>
            {isLoggedIn ? (
              <>
                <Link to={role==='staff'?'/admin':'/portal'} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-bocra-accent text-sm hover:opacity-90 transition-opacity">
                  <User size={14} /><span className="hidden sm:inline">{user?.name?.split(' ')[0]}</span>
                </Link>
                <button onClick={handleLogout} className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-bocra-accent transition-colors"><LogOut size={16} /></button>
              </>
            ) : (
              <Link to="/login" className="px-4 py-1.5 bg-white text-bocra-blue rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">{t('login')}</Link>
            )}
            <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-lg hover:bg-bocra-accent transition-colors">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="lg:hidden bg-bocra-accent border-t border-blue-700 px-4 py-3 flex flex-col gap-1">
          {navLinks.map(l => (
            <Link key={l.href} to={l.href} onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg text-sm text-blue-100 hover:text-white hover:bg-bocra-blue transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
`)

write('src/components/shared/Footer.jsx', `
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
            <p className="text-sm text-blue-200 leading-relaxed max-w-xs">Regulating telecommunications, broadcasting, postal and internet services in Botswana in the public interest.</p>
            <p className="text-xs text-blue-300 mt-4">Plot 50671 Independence Ave, Gaborone, Botswana</p>
            <p className="text-xs text-blue-300">Tel: +267 3957755 · info@bocra.org.bw</p>
          </div>
          <div>
            <p className="font-medium text-white text-sm mb-3">Services</p>
            <div className="flex flex-col gap-1.5">
              {[['Licensing','/licensing'],['File a Complaint','/complaints'],['Documents','/documents'],['Verify Licence','/verify'],['Coverage Map','/map']].map(([l,h]) => (
                <Link key={h} to={h} className="text-sm text-blue-200 hover:text-white transition-colors">{l}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="font-medium text-white text-sm mb-3">Organisation</p>
            <div className="flex flex-col gap-1.5">
              {[['About BOCRA','/about'],['News & Events','/news'],['Tenders','/tenders'],['Careers','/careers'],['Contact','/contact']].map(([l,h]) => (
                <Link key={h} to={h} className="text-sm text-blue-200 hover:text-white transition-colors">{l}</Link>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-blue-700 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-blue-300">© 2026 Botswana Communications Regulatory Authority. All rights reserved.</p>
          <p className="text-xs text-blue-300 italic">Imagine Botswana without BOCRA.</p>
        </div>
      </div>
    </footer>
  )
}
`)

write('src/components/shared/PageWrapper.jsx', `
import Navbar from './Navbar'
import Footer from './Footer'
export default function PageWrapper({ children, fullWidth=false }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className={\`flex-1 \${fullWidth?'':'max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10'}\`}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
`)

// BARREL EXPORT
write('src/components/shared/index.js', `
export { default as PageWrapper }    from './PageWrapper'
export { default as Navbar }         from './Navbar'
export { default as Footer }         from './Footer'
export { default as Button }         from './Button'
export { default as Badge }          from './Badge'
export { default as Card }           from './Card'
export { default as KPICard }        from './KPICard'
export { default as Input }          from './Input'
export { default as Spinner }        from './Spinner'
export { default as EmptyState }     from './EmptyState'
export { default as StatusTimeline } from './StatusTimeline'
export { default as Breadcrumb }     from './Breadcrumb'
export { default as Modal }          from './Modal'
export { default as ProtectedRoute } from './ProtectedRoute'
`)

// PAGE STUBS
function pageStub(name, owner, route, portal = false) {
  const importPath = portal ? '../../components/shared/PageWrapper' : '../components/shared/PageWrapper'
  return `
import PageWrapper from '${importPath}'

// Owner: ${owner}
// Route: ${route}
// TODO: build this page

export default function ${name}() {
  return (
    <PageWrapper>
      <div className="py-20 text-center">
        <span className="inline-block bg-bocra-light text-bocra-blue text-xs font-medium px-3 py-1 rounded-full mb-4">${owner}</span>
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">${name}</h1>
        <p className="text-gray-400 text-sm">Route: <code className="bg-gray-100 px-2 py-0.5 rounded">${route}</code></p>
      </div>
    </PageWrapper>
  )
}
`
}

// Dev 1
write('src/pages/HomePage.jsx',        pageStub('HomePage',        'Dev 1', '/'))
write('src/pages/AboutPage.jsx',       pageStub('AboutPage',       'Dev 1', '/about'))
write('src/pages/NewsPage.jsx',        pageStub('NewsPage',        'Dev 1', '/news'))
write('src/pages/NewsArticlePage.jsx', pageStub('NewsArticlePage', 'Dev 1', '/news/:slug'))
write('src/pages/TendersPage.jsx',     pageStub('TendersPage',     'Dev 1', '/tenders'))
write('src/pages/CareersPage.jsx',     pageStub('CareersPage',     'Dev 1', '/careers'))
write('src/pages/ContactPage.jsx',     pageStub('ContactPage',     'Dev 1', '/contact'))
write('src/pages/NotFoundPage.jsx',    pageStub('NotFoundPage',    'Dev 1', '/404'))

// Dev 2
write('src/pages/LicensingPage.jsx',     pageStub('LicensingPage',     'Dev 2', '/licensing'))
write('src/pages/ComplaintsPage.jsx',    pageStub('ComplaintsPage',    'Dev 2', '/complaints'))
write('src/pages/DocumentsPage.jsx',     pageStub('DocumentsPage',     'Dev 2', '/documents'))
write('src/pages/SearchPage.jsx',        pageStub('SearchPage',        'Dev 2', '/search'))
write('src/pages/QoSPage.jsx',           pageStub('QoSPage',           'Dev 2', '/qos'))
write('src/pages/VerifyPage.jsx',        pageStub('VerifyPage',        'Dev 2', '/verify'))
write('src/pages/CIRTPage.jsx',          pageStub('CIRTPage',          'Dev 2', '/cirt'))
write('src/pages/ConsultationsPage.jsx', pageStub('ConsultationsPage', 'Dev 2', '/consultations'))

// Dev 3
write('src/pages/auth/LoginPage.jsx',    pageStub('LoginPage',    'Dev 3', '/login'))
write('src/pages/auth/RegisterPage.jsx', pageStub('RegisterPage', 'Dev 3', '/register'))
write('src/pages/portal/DashboardPage.jsx',       pageStub('DashboardPage',       'Dev 3', '/portal', true))
write('src/pages/portal/NewComplaintPage.jsx',    pageStub('NewComplaintPage',    'Dev 3', '/portal/complaint/new', true))
write('src/pages/portal/ComplaintDetailPage.jsx', pageStub('ComplaintDetailPage', 'Dev 3', '/portal/complaint/:id', true))
write('src/pages/portal/ComplaintsListPage.jsx',  pageStub('ComplaintsListPage',  'Dev 3', '/portal/complaints', true))
write('src/pages/portal/ApplyPage.jsx',           pageStub('ApplyPage',           'Dev 3', '/portal/apply', true))
write('src/pages/portal/ApplicationsPage.jsx',    pageStub('ApplicationsPage',    'Dev 3', '/portal/applications', true))

// Dev 4
write('src/pages/AIPage.jsx',  pageStub('AIPage',  'Dev 4', '/ai'))
write('src/pages/MapPage.jsx', pageStub('MapPage', 'Dev 4', '/map'))
write('src/pages/admin/AdminLoginPage.jsx',        pageStub('AdminLoginPage',        'Dev 4', '/admin/login', true))
write('src/pages/admin/AdminDashboardPage.jsx',    pageStub('AdminDashboardPage',    'Dev 4', '/admin', true))
write('src/pages/admin/AdminComplaintsPage.jsx',   pageStub('AdminComplaintsPage',   'Dev 4', '/admin/complaints', true))
write('src/pages/admin/AdminApplicationsPage.jsx', pageStub('AdminApplicationsPage', 'Dev 4', '/admin/applications', true))

log('All source files written')

// ─── Done ─────────────────────────────────────────────────────────────────────
step('[6/6] Done!')
console.log(`
${G}============================================${R}
${G}  Setup complete! Next steps:${R}
${G}============================================${R}

  ${B}npm run dev${R}      ← start the app
  ${B}http://localhost:5173${R}

  ${Y}Dev 1 — build your pages in src/pages/${R}
  ${Y}Everyone else — pull from GitHub then start your pages${R}

  ${G}All 25 pages are live as stubs right now.${R}
  ${G}Login test: any phone + OTP "123456"${R}
  ${G}Admin test: type "staff" in phone + OTP "123456"${R}
`)
