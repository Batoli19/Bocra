// BOCRA Connect — Files Only (no npm installs)
// Run: node write-files.cjs
const fs = require('fs')
const path = require('path')

const G = '\x1b[32m', Y = '\x1b[33m', B = '\x1b[34m', R = '\x1b[0m'
const log  = (m) => console.log(`${G}  ✓ ${m}${R}`)
const step = (m) => console.log(`\n${Y}${m}${R}`)

function mkdir(p) { fs.mkdirSync(p, { recursive: true }) }
function write(filePath, content) {
  mkdir(path.dirname(filePath))
  fs.writeFileSync(filePath, content, 'utf8')
  log(filePath)
}

console.log(`\n${B}  Writing all BOCRA Connect files...${R}`)

step('[1/4] Config files...')

write('tailwind.config.js',
`/** @type {import('tailwindcss').Config} */
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
    },
  },
  plugins: [],
}
`)

write('postcss.config.js',
`export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`)

write('vite.config.js',
`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
})
`)

write('index.html',
`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>BOCRA Connect</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`)

write('.gitignore',
`node_modules
dist
.env
.DS_Store
`)

if (!fs.existsSync('.env')) {
  write('.env',
`VITE_APP_NAME=BOCRA Connect
VITE_USE_MOCK_DATA=true
`)
}

step('[2/4] Folders + source files...')

// folders
;[
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
].forEach(mkdir)

write('src/styles/globals.css',
`@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body { font-family: 'Inter', sans-serif; }
  h1,h2,h3,h4,h5,h6 { font-family: 'Plus Jakarta Sans', sans-serif; }
}
`)

write('src/main.jsx',
`import React from 'react'
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

write('src/App.jsx',
`import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/shared/ProtectedRoute'
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
import LoginPage           from './pages/auth/LoginPage'
import RegisterPage        from './pages/auth/RegisterPage'
import DashboardPage       from './pages/portal/DashboardPage'
import NewComplaintPage    from './pages/portal/NewComplaintPage'
import ComplaintDetailPage from './pages/portal/ComplaintDetailPage'
import ComplaintsListPage  from './pages/portal/ComplaintsListPage'
import ApplyPage           from './pages/portal/ApplyPage'
import ApplicationsPage    from './pages/portal/ApplicationsPage'
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
      <Route path="/login"         element={<LoginPage />} />
      <Route path="/register"      element={<RegisterPage />} />

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

step('[3/4] Context, hooks, utils, mock data...')

write('src/context/AuthContext.jsx',
`import { createContext, useState } from 'react'
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

write('src/context/LanguageContext.jsx',
`import { createContext, useState } from 'react'
export const LanguageContext = createContext(null)
const T = {
  en: { login:'Login', logout:'Logout', file_complaint:'File a Complaint', apply_licence:'Apply for Licence', my_dashboard:'My Dashboard' },
  tn: { login:'Tsena', logout:'Tswa', file_complaint:'Bega Ipelego', apply_licence:'Kopa Laesense', my_dashboard:'Phanele ya me' },
}
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')
  const t = (key) => T[lang][key] || T.en[key] || key
  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
}
`)

write('src/context/ToastContext.jsx',
`import { createContext, useState, useCallback } from 'react'
export const ToastContext = createContext(null)
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const add = useCallback((message, type = 'info') => {
    const id = Date.now()
    setToasts(p => [...p, { id, message, type }])
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 4000)
  }, [])
  const toast = { success: m => add(m,'success'), error: m => add(m,'error'), info: m => add(m,'info') }
  const bg = { success:'#f0fdf4', error:'#fef2f2', info:'#eff6ff' }
  const tc = { success:'#166534', error:'#991b1b', info:'#1e40af' }
  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div style={{ position:'fixed', top:16, right:16, zIndex:9999, display:'flex', flexDirection:'column', gap:8 }}>
        {toasts.map(t => (
          <div key={t.id} style={{ background:bg[t.type], color:tc[t.type], border:\`1px solid \${tc[t.type]}33\`, borderRadius:12, padding:'10px 16px', fontSize:13, fontWeight:500, maxWidth:320, boxShadow:'0 2px 8px rgba(0,0,0,0.1)' }}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
`)

write('src/hooks/useAuth.js',     `import { useContext } from 'react'\nimport { AuthContext } from '../context/AuthContext'\nexport const useAuth = () => useContext(AuthContext)\n`)
write('src/hooks/useLanguage.js', `import { useContext } from 'react'\nimport { LanguageContext } from '../context/LanguageContext'\nexport const useLanguage = () => useContext(LanguageContext)\n`)
write('src/hooks/useToast.js',    `import { useContext } from 'react'\nimport { ToastContext } from '../context/ToastContext'\nexport const useToast = () => useContext(ToastContext)\n`)

write('src/utils/formatDate.js',
`export const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-BW', { day:'numeric', month:'short', year:'numeric' }) : '—'
export const timeAgo = (d) => { const days = Math.floor((Date.now()-new Date(d))/86400000); return days===0?'Today':days===1?'Yesterday':days<7?\`\${days} days ago\`:formatDate(d) }
`)
write('src/utils/formatCurrency.js',
`export const formatBWP = (n) => new Intl.NumberFormat('en-BW',{style:'currency',currency:'BWP'}).format(n)\n`)
write('src/utils/mockFetch.js',
`const cache = {}
export const mockFetch = async (resource) => {
  if (cache[resource]) return cache[resource]
  const mod = await import(\`../data/\${resource}.json\`)
  await new Promise(r => setTimeout(r, 300))
  cache[resource] = mod.default
  return mod.default
}
`)

// mock data
write('src/data/news.json', JSON.stringify([
  { id:'1', slug:'5g-spectrum-2026', title:'BOCRA Announces 5G Spectrum Auction', category:'Announcements', date:'2026-03-10', excerpt:'Bids open for 5G spectrum allocation across major urban centres.', author:'BOCRA Communications' },
  { id:'2', slug:'consumer-rights-campaign', title:'Consumer Rights Campaign Launched', category:'Consumer Protection', date:'2026-03-05', excerpt:'Nationwide awareness campaign on telecommunications consumer rights.', author:'BOCRA Communications' },
  { id:'3', slug:'broadband-report-q1', title:'Q1 2026 Broadband Coverage Report', category:'Reports', date:'2026-02-28', excerpt:'74% broadband coverage across Botswana households.', author:'Research Division' },
  { id:'4', slug:'phishing-advisory', title:'Cybersecurity Advisory: Phishing Campaign', category:'bwCIRT', date:'2026-03-15', excerpt:'Advisory on phishing targeting mobile banking users.', author:'bwCIRT' },
], null, 2))

write('src/data/tenders.json', JSON.stringify([
  { id:'T001', title:'Supply and Delivery of ICT Equipment 2026', status:'open', closingDate:'2026-04-10', category:'ICT', reference:'BOCRA/T/001/2026' },
  { id:'T002', title:'Consultancy: Spectrum Management System', status:'open', closingDate:'2026-04-05', category:'Consultancy', reference:'BOCRA/T/002/2026' },
  { id:'T003', title:'Office Cleaning Services — HQ', status:'closed', closingDate:'2026-02-15', category:'Services', reference:'BOCRA/T/003/2025' },
], null, 2))

write('src/data/licenceTypes.json', JSON.stringify([
  { id:'1', name:'Class A Postal Operator', category:'Postal', fee:25000, duration:'5 years', requirements:['Company registration (CIPA)','Tax clearance (BURS)','Operational capacity proof','Technical certificate'] },
  { id:'2', name:'Internet Service Provider', category:'Internet', fee:50000, duration:'5 years', requirements:['Company registration','Network infrastructure plan','Tax clearance'] },
  { id:'3', name:'Broadcasting Licence FM Radio', category:'Broadcasting', fee:35000, duration:'5 years', requirements:['Content plan','Frequency plan','Company registration','Tax clearance'] },
  { id:'4', name:'Mobile Virtual Network Operator', category:'Telecoms', fee:75000, duration:'5 years', requirements:['Host MNO agreement','Company registration','Financial capacity'] },
], null, 2))

write('src/data/complaints.json', JSON.stringify([
  { id:'BOCRA-2026-001', category:'Billing Dispute', isp:'Mascom Wireless', status:'under_review', description:'Charged twice for the same data bundle.', date:'2026-03-10' },
  { id:'BOCRA-2026-002', category:'Poor Network Quality', isp:'BeMobile', status:'resolved', description:'No 4G signal for 2 weeks in Tlokweng.', date:'2026-02-25' },
  { id:'BOCRA-2026-003', category:'Service Disconnection', isp:'Orange Botswana', status:'received', description:'Disconnected without prior notice.', date:'2026-03-16' },
], null, 2))

write('src/data/applications.json', JSON.stringify([
  { id:'APP-2026-001', licenceType:'Class A Postal Operator', status:'under_review', submittedDate:'2026-03-05', reference:'BOCRA/APP/001/2026', fee:25000 },
  { id:'APP-2026-002', licenceType:'Internet Service Provider', status:'approved', submittedDate:'2026-02-10', reference:'BOCRA/APP/002/2026', fee:50000 },
], null, 2))

write('src/data/qosMetrics.json', JSON.stringify({
  summary: { avgDownloadMbps:28.4, avgLatencyMs:42, avgUptime:98.2, complaintsThisMonth:143 },
  byISP: [
    { name:'Mascom Wireless', downloadMbps:32.1, latencyMs:38, uptimePct:98.9, complaints:48 },
    { name:'Orange Botswana', downloadMbps:29.5, latencyMs:41, uptimePct:98.4, complaints:52 },
    { name:'BeMobile',        downloadMbps:24.8, latencyMs:49, uptimePct:97.6, complaints:31 },
    { name:'BTC Fibre',       downloadMbps:95.2, latencyMs:12, uptimePct:99.5, complaints:12 },
  ],
  monthlyComplaints:[{month:'Oct',count:98},{month:'Nov',count:112},{month:'Dec',count:87},{month:'Jan',count:134},{month:'Feb',count:119},{month:'Mar',count:143}],
}, null, 2))

write('src/data/documents.json', JSON.stringify([
  { id:'1', title:'Communications Regulatory Authority Act, 2012', type:'Legislation', year:2012, size:'1.2MB' },
  { id:'2', title:'Postal Services Regulations, 2021', type:'Regulation', year:2021, size:'840KB' },
  { id:'3', title:'Consumer Protection Guidelines, 2023', type:'Guidelines', year:2023, size:'560KB' },
  { id:'4', title:'Spectrum Management Policy, 2022', type:'Policy', year:2022, size:'1.8MB' },
  { id:'5', title:'Annual Report 2024-2025', type:'Report', year:2025, size:'4.2MB' },
], null, 2))

write('src/data/careers.json', JSON.stringify([
  { id:'1', title:'Senior ICT Officer', department:'Technology', type:'Full-time', location:'Gaborone', closing:'2026-04-15' },
  { id:'2', title:'Legal Counsel', department:'Legal', type:'Full-time', location:'Gaborone', closing:'2026-04-20' },
  { id:'3', title:'Research Analyst', department:'Research & Policy', type:'Full-time', location:'Gaborone', closing:'2026-04-10' },
], null, 2))

step('[4/4] Shared components + all 25 page stubs...')

// COLOURS (using inline styles to avoid Tailwind purge issues during setup)
const BLUE   = '#1A3A6B'
const ACCENT = '#2E5FA3'
const LIGHT  = '#D6E4F7'
const TEAL   = '#0F6E56'

write('src/components/shared/ProtectedRoute.jsx',
`import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
export default function ProtectedRoute({ role }) {
  const { isLoggedIn, role: userRole } = useAuth()
  if (!isLoggedIn) return <Navigate to="/login" replace />
  if (role && userRole !== role) return <Navigate to="/" replace />
  return <Outlet />
}
`)

write('src/components/shared/Navbar.jsx',
`import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Globe, User, LogOut } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useLanguage } from '../../hooks/useLanguage'

const links = [
  ['About', '/about'], ['Licensing', '/licensing'], ['Complaints', '/complaints'],
  ['Documents', '/documents'], ['News', '/news'], ['QoS', '/qos'], ['AI Help', '/ai'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { isLoggedIn, user, logout, role } = useAuth()
  const { lang, setLang, t } = useLanguage()
  const navigate = useNavigate()

  const nav = { background:'${BLUE}', color:'white', boxShadow:'0 2px 8px rgba(0,0,0,0.15)', position:'sticky', top:0, zIndex:40 }
  const logoBox = { background:'white', borderRadius:8, width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }
  const linkStyle = { color:'rgba(255,255,255,0.8)', textDecoration:'none', padding:'6px 12px', borderRadius:8, fontSize:14, transition:'all 0.15s' }
  const loginBtn = { background:'white', color:'${BLUE}', border:'none', borderRadius:8, padding:'6px 16px', fontSize:14, fontWeight:600, cursor:'pointer' }
  const iconBtn = { background:'none', border:'none', color:'rgba(255,255,255,0.8)', cursor:'pointer', padding:6, borderRadius:8 }

  return (
    <nav style={nav}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between', height:64 }}>
        <Link to="/" style={{ display:'flex', alignItems:'center', gap:12, textDecoration:'none', color:'white' }}>
          <div style={logoBox}><span style={{ color:'${BLUE}', fontWeight:700, fontSize:10, lineHeight:1 }}>BOCRA</span></div>
          <div className="hidden sm:block">
            <div style={{ fontWeight:700, fontSize:14, lineHeight:1.2 }}>BOCRA Connect</div>
            <div style={{ fontSize:11, opacity:0.65 }}>Communications Regulatory Authority</div>
          </div>
        </Link>

        <div className="hidden lg:flex" style={{ gap:4 }}>
          {links.map(([label, href]) => <Link key={href} to={href} style={linkStyle}>{label}</Link>)}
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <button onClick={() => setLang(lang==='en'?'tn':'en')} style={{...iconBtn, fontSize:12, display:'flex', alignItems:'center', gap:4}}>
            <Globe size={14} />{lang.toUpperCase()}
          </button>
          {isLoggedIn ? (
            <>
              <Link to={role==='staff'?'/admin':'/portal'} style={{ display:'flex', alignItems:'center', gap:6, background:'rgba(255,255,255,0.2)', color:'white', textDecoration:'none', borderRadius:8, padding:'6px 12px', fontSize:13 }}>
                <User size={14} /><span className="hidden sm:inline">{user?.name?.split(' ')[0]}</span>
              </Link>
              <button onClick={() => { logout(); navigate('/') }} style={iconBtn}><LogOut size={16} /></button>
            </>
          ) : (
            <button onClick={() => navigate('/login')} style={loginBtn}>{t('login')}</button>
          )}
          <button onClick={() => setOpen(!open)} className="lg:hidden" style={iconBtn}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div style={{ background:'${ACCENT}', borderTop:'1px solid rgba(255,255,255,0.15)', padding:'12px 24px', display:'flex', flexDirection:'column', gap:4 }}>
          {links.map(([label, href]) => (
            <Link key={href} to={href} onClick={() => setOpen(false)} style={{ ...linkStyle, display:'block' }}>{label}</Link>
          ))}
        </div>
      )}
    </nav>
  )
}
`)

write('src/components/shared/Footer.jsx',
`import { Link } from 'react-router-dom'
export default function Footer() {
  return (
    <footer style={{ background:'${BLUE}', color:'rgba(255,255,255,0.7)', marginTop:'auto' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'48px 24px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:32, marginBottom:40 }}>
          <div style={{ gridColumn:'span 2' }}>
            <div style={{ fontWeight:700, fontSize:18, color:'white', marginBottom:8 }}>BOCRA Connect</div>
            <p style={{ fontSize:14, lineHeight:1.7, maxWidth:300, marginBottom:16 }}>Regulating telecommunications, broadcasting, postal and internet services in Botswana in the public interest.</p>
            <p style={{ fontSize:12 }}>Plot 50671 Independence Ave, Gaborone</p>
            <p style={{ fontSize:12 }}>Tel: +267 3957755 · info@bocra.org.bw</p>
          </div>
          <div>
            <p style={{ fontWeight:600, color:'white', marginBottom:12, fontSize:14 }}>Services</p>
            {[['Licensing','/licensing'],['File a Complaint','/complaints'],['Documents','/documents'],['Verify Licence','/verify'],['Coverage Map','/map']].map(([l,h])=>(
              <div key={h} style={{ marginBottom:8 }}><Link to={h} style={{ color:'rgba(255,255,255,0.65)', fontSize:14, textDecoration:'none' }}>{l}</Link></div>
            ))}
          </div>
          <div>
            <p style={{ fontWeight:600, color:'white', marginBottom:12, fontSize:14 }}>Organisation</p>
            {[['About BOCRA','/about'],['News & Events','/news'],['Tenders','/tenders'],['Careers','/careers'],['Contact','/contact']].map(([l,h])=>(
              <div key={h} style={{ marginBottom:8 }}><Link to={h} style={{ color:'rgba(255,255,255,0.65)', fontSize:14, textDecoration:'none' }}>{l}</Link></div>
            ))}
          </div>
        </div>
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.15)', paddingTop:20, display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:8 }}>
          <p style={{ fontSize:12, opacity:0.5 }}>© 2026 Botswana Communications Regulatory Authority. All rights reserved.</p>
          <p style={{ fontSize:12, opacity:0.5, fontStyle:'italic' }}>Imagine Botswana without BOCRA.</p>
        </div>
      </div>
    </footer>
  )
}
`)

write('src/components/shared/PageWrapper.jsx',
`import Navbar from './Navbar'
import Footer from './Footer'
export default function PageWrapper({ children, fullWidth = false }) {
  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', background:'#f8fafc' }}>
      <Navbar />
      <main style={{ flex:1, ...(fullWidth ? {} : { maxWidth:1280, margin:'0 auto', width:'100%', padding:'40px 24px' }) }}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
`)

write('src/components/shared/Button.jsx',
`import { Loader2 } from 'lucide-react'
const V = {
  primary:   { background:'${BLUE}', color:'white', border:'none' },
  secondary: { background:'${LIGHT}', color:'${BLUE}', border:'none' },
  ghost:     { background:'transparent', color:'${BLUE}', border:'1px solid ${BLUE}' },
  danger:    { background:'#dc2626', color:'white', border:'none' },
  teal:      { background:'${TEAL}', color:'white', border:'none' },
}
const S = { sm:'6px 12px', md:'10px 20px', lg:'14px 28px' }
const FS = { sm:12, md:14, lg:16 }
export default function Button({ children, variant='primary', size='md', loading=false, disabled=false, fullWidth=false, icon:Icon, onClick, type='button', style={} }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled||loading}
      style={{ ...V[variant], padding:S[size], fontSize:FS[size], fontWeight:600, borderRadius:10, cursor:disabled||loading?'not-allowed':'pointer', opacity:disabled||loading?0.5:1, display:'inline-flex', alignItems:'center', gap:6, justifyContent:'center', width:fullWidth?'100%':'auto', transition:'opacity 0.15s', ...style }}>
      {loading ? <Loader2 size={16} style={{ animation:'spin 1s linear infinite' }} /> : Icon && <Icon size={16} />}
      {children}
    </button>
  )
}
`)

write('src/components/shared/Badge.jsx',
`const cfg = {
  active:       ['#f0fdf4','#166534','#bbf7d0'],
  approved:     ['#f0fdf4','#166534','#bbf7d0'],
  resolved:     ['#f0fdf4','#166534','#bbf7d0'],
  pending:      ['#fefce8','#854d0e','#fef08a'],
  under_review: ['#eff6ff','#1e40af','#bfdbfe'],
  received:     ['#eff6ff','#1e40af','#bfdbfe'],
  open:         ['#eff6ff','#1e40af','#bfdbfe'],
  rejected:     ['#fef2f2','#991b1b','#fecaca'],
  closed:       ['#f9fafb','#374151','#e5e7eb'],
  draft:        ['#f9fafb','#374151','#e5e7eb'],
}
export default function Badge({ status, label }) {
  const [bg, tc, bc] = cfg[status] || ['#f9fafb','#374151','#e5e7eb']
  return <span style={{ background:bg, color:tc, border:\`1px solid \${bc}\`, borderRadius:20, padding:'2px 10px', fontSize:12, fontWeight:500, display:'inline-flex', alignItems:'center' }}>{label||(status||'').replace(/_/g,' ')}</span>
}
`)

write('src/components/shared/Card.jsx',
`export default function Card({ children, className='', onClick, hover=false, style={} }) {
  return (
    <div onClick={onClick}
      style={{ background:'white', borderRadius:16, border:'1px solid #e2e8f0', cursor:onClick?'pointer':'default', transition:'box-shadow 0.15s, border-color 0.15s', ...style }}
      onMouseEnter={hover?e=>{e.currentTarget.style.boxShadow='0 4px 12px rgba(0,0,0,0.08)';e.currentTarget.style.borderColor='#cbd5e1'}:null}
      onMouseLeave={hover?e=>{e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor='#e2e8f0'}:null}
      className={className}>
      {children}
    </div>
  )
}
Card.Header = ({children,style={}}) => <div style={{padding:'16px 24px',borderBottom:'1px solid #f1f5f9',...style}}>{children}</div>
Card.Body   = ({children,style={}}) => <div style={{padding:'16px 24px',...style}}>{children}</div>
Card.Footer = ({children,style={}}) => <div style={{padding:'16px 24px',borderTop:'1px solid #f1f5f9',...style}}>{children}</div>
`)

write('src/components/shared/Input.jsx',
`export default function Input({ label, error, icon:Icon, style={}, ...props }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
      {label && <label style={{ fontSize:14, fontWeight:500, color:'#374151' }}>{label}</label>}
      <div style={{ position:'relative' }}>
        {Icon && <div style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'#9ca3af' }}><Icon size={16} /></div>}
        <input {...props} style={{ width:'100%', border:\`1px solid \${error?'#f87171':'#d1d5db'}\`, borderRadius:8, padding: Icon?'10px 12px 10px 34px':'10px 12px', fontSize:14, outline:'none', boxSizing:'border-box', ...style }}
          onFocus={e=>{e.target.style.borderColor='${BLUE}';e.target.style.boxShadow='0 0 0 2px ${LIGHT}'}}
          onBlur={e=>{e.target.style.borderColor=error?'#f87171':'#d1d5db';e.target.style.boxShadow='none'}} />
      </div>
      {error && <p style={{ fontSize:12, color:'#dc2626', margin:0 }}>{error}</p>}
    </div>
  )
}
`)

write('src/components/shared/KPICard.jsx',
`export default function KPICard({ label, value, change, changeLabel, icon:Icon, color='blue' }) {
  const iconColors = { blue:['${LIGHT}','${BLUE}'], teal:['#d1fae5','${TEAL}'], amber:['#fef3c7','#b45309'], red:['#fee2e2','#b91c1c'] }
  const [ibg, ic] = iconColors[color] || iconColors.blue
  return (
    <div style={{ background:'white', borderRadius:16, border:'1px solid #e2e8f0', padding:24 }}>
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
        <div>
          <p style={{ fontSize:13, color:'#6b7280', marginBottom:4 }}>{label}</p>
          <p style={{ fontSize:32, fontWeight:700, color:'#111827', margin:0 }}>{value}</p>
          {change!==undefined && <p style={{ fontSize:12, marginTop:4, color:change>=0?'#16a34a':'#dc2626' }}>{change>=0?'+':''}{change} {changeLabel}</p>}
        </div>
        {Icon && <div style={{ background:ibg, color:ic, padding:12, borderRadius:10 }}><Icon size={20} /></div>}
      </div>
    </div>
  )
}
`)

write('src/components/shared/Spinner.jsx',
`export default function Spinner({ size='md' }) {
  const s = { sm:16, md:32, lg:48 }[size]
  return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', padding:48 }}>
      <div style={{ width:s, height:s, border:'3px solid #e2e8f0', borderTopColor:'${BLUE}', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
      <style>{'@keyframes spin{to{transform:rotate(360deg)}}'}</style>
    </div>
  )
}
`)

write('src/components/shared/EmptyState.jsx',
`import { Inbox } from 'lucide-react'
export default function EmptyState({ title='Nothing here yet', description='', action }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'64px 24px', textAlign:'center' }}>
      <div style={{ background:'#f1f5f9', borderRadius:16, padding:16, marginBottom:16 }}><Inbox size={32} color="#94a3b8" /></div>
      <h3 style={{ fontWeight:600, color:'#374151', marginBottom:4 }}>{title}</h3>
      {description && <p style={{ fontSize:14, color:'#9ca3af', maxWidth:280 }}>{description}</p>}
      {action && <div style={{ marginTop:16 }}>{action}</div>}
    </div>
  )
}
`)

write('src/components/shared/Modal.jsx',
`import { X } from 'lucide-react'
export default function Modal({ open, onClose, title, children, size='md' }) {
  if (!open) return null
  const maxW = { sm:440, md:540, lg:720, xl:960 }[size]
  return (
    <div style={{ position:'fixed', inset:0, zIndex:50, display:'flex', alignItems:'center', justifyContent:'center', padding:16 }}>
      <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.4)' }} onClick={onClose} />
      <div style={{ position:'relative', background:'white', borderRadius:16, boxShadow:'0 20px 60px rgba(0,0,0,0.15)', width:'100%', maxWidth:maxW, maxHeight:'90vh', overflow:'auto' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 24px', borderBottom:'1px solid #f1f5f9' }}>
          <h3 style={{ fontWeight:600, color:'#111827', margin:0 }}>{title}</h3>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', padding:4, borderRadius:8, color:'#6b7280' }}><X size={18} /></button>
        </div>
        <div style={{ padding:'16px 24px' }}>{children}</div>
      </div>
    </div>
  )
}
`)

write('src/components/shared/StatusTimeline.jsx',
`import { Check } from 'lucide-react'
export default function StatusTimeline({ steps=[] }) {
  return (
    <div style={{ display:'flex', flexDirection:'column' }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display:'flex', gap:16 }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
            <div style={{ width:32, height:32, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, background:step.done?'${TEAL}':'#e5e7eb', color:step.done?'white':'#9ca3af' }}>
              {step.done ? <Check size={14} /> : <span style={{ fontSize:12 }}>{i+1}</span>}
            </div>
            {i < steps.length-1 && <div style={{ width:2, flex:1, minHeight:32, background:step.done?'${TEAL}':'#e5e7eb', margin:'4px 0' }} />}
          </div>
          <div style={{ paddingBottom:24 }}>
            <p style={{ fontSize:14, fontWeight:500, color:step.done?'#111827':'#9ca3af', margin:0 }}>{step.label}</p>
            {step.date && <p style={{ fontSize:12, color:'#9ca3af', marginTop:2 }}>{step.date}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}
`)

write('src/components/shared/Breadcrumb.jsx',
`import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
export default function Breadcrumb({ items=[] }) {
  return (
    <nav style={{ display:'flex', alignItems:'center', gap:4, fontSize:14, color:'#6b7280', marginBottom:24 }}>
      {items.map((item, i) => (
        <span key={i} style={{ display:'flex', alignItems:'center', gap:4 }}>
          {i > 0 && <ChevronRight size={14} color="#d1d5db" />}
          {item.href ? <Link to={item.href} style={{ color:'#6b7280', textDecoration:'none' }}>{item.label}</Link> : <span style={{ color:'#111827', fontWeight:500 }}>{item.label}</span>}
        </span>
      ))}
    </nav>
  )
}
`)

write('src/components/shared/index.js',
`export { default as PageWrapper }    from './PageWrapper'
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
function stub(name, owner, route, depth=1) {
  const up = '../'.repeat(depth)
  return `import PageWrapper from '${up}components/shared/PageWrapper'
// Owner: ${owner}  |  Route: ${route}
export default function ${name}() {
  return (
    <PageWrapper>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'96px 24px', textAlign:'center' }}>
        <div style={{ background:'#D6E4F7', color:'#1A3A6B', fontSize:12, fontWeight:600, padding:'4px 16px', borderRadius:20, marginBottom:20 }}>
          ${owner}
        </div>
        <h1 style={{ fontSize:36, fontWeight:700, color:'#111827', margin:'0 0 12px' }}>${name}</h1>
        <p style={{ color:'#9ca3af', fontSize:14, margin:0 }}>
          Route: <code style={{ background:'#f1f5f9', padding:'2px 8px', borderRadius:6, color:'#475569' }}>${route}</code>
        </p>
        <p style={{ color:'#d1d5db', fontSize:12, marginTop:12 }}>Replace this with your page content</p>
      </div>
    </PageWrapper>
  )
}
`
}

write('src/pages/HomePage.jsx',        stub('HomePage',        'Dev 1','/'))
write('src/pages/AboutPage.jsx',       stub('AboutPage',       'Dev 1','/about'))
write('src/pages/NewsPage.jsx',        stub('NewsPage',        'Dev 1','/news'))
write('src/pages/NewsArticlePage.jsx', stub('NewsArticlePage', 'Dev 1','/news/:slug'))
write('src/pages/TendersPage.jsx',     stub('TendersPage',     'Dev 1','/tenders'))
write('src/pages/CareersPage.jsx',     stub('CareersPage',     'Dev 1','/careers'))
write('src/pages/ContactPage.jsx',     stub('ContactPage',     'Dev 1','/contact'))
write('src/pages/NotFoundPage.jsx',    stub('NotFoundPage',    'Dev 1','/404'))
write('src/pages/LicensingPage.jsx',     stub('LicensingPage',     'Dev 2','/licensing'))
write('src/pages/ComplaintsPage.jsx',    stub('ComplaintsPage',    'Dev 2','/complaints'))
write('src/pages/DocumentsPage.jsx',     stub('DocumentsPage',     'Dev 2','/documents'))
write('src/pages/SearchPage.jsx',        stub('SearchPage',        'Dev 2','/search'))
write('src/pages/QoSPage.jsx',           stub('QoSPage',           'Dev 2','/qos'))
write('src/pages/VerifyPage.jsx',        stub('VerifyPage',        'Dev 2','/verify'))
write('src/pages/CIRTPage.jsx',          stub('CIRTPage',          'Dev 2','/cirt'))
write('src/pages/ConsultationsPage.jsx', stub('ConsultationsPage', 'Dev 2','/consultations'))
write('src/pages/AIPage.jsx',  stub('AIPage',  'Dev 4','/ai'))
write('src/pages/MapPage.jsx', stub('MapPage', 'Dev 4','/map'))
write('src/pages/auth/LoginPage.jsx',    stub('LoginPage',    'Dev 3','/login',2))
write('src/pages/auth/RegisterPage.jsx', stub('RegisterPage', 'Dev 3','/register',2))
write('src/pages/portal/DashboardPage.jsx',       stub('DashboardPage',       'Dev 3','/portal',2))
write('src/pages/portal/NewComplaintPage.jsx',    stub('NewComplaintPage',    'Dev 3','/portal/complaint/new',2))
write('src/pages/portal/ComplaintDetailPage.jsx', stub('ComplaintDetailPage', 'Dev 3','/portal/complaint/:id',2))
write('src/pages/portal/ComplaintsListPage.jsx',  stub('ComplaintsListPage',  'Dev 3','/portal/complaints',2))
write('src/pages/portal/ApplyPage.jsx',           stub('ApplyPage',           'Dev 3','/portal/apply',2))
write('src/pages/portal/ApplicationsPage.jsx',    stub('ApplicationsPage',    'Dev 3','/portal/applications',2))
write('src/pages/admin/AdminLoginPage.jsx',        stub('AdminLoginPage',        'Dev 4','/admin/login',2))
write('src/pages/admin/AdminDashboardPage.jsx',    stub('AdminDashboardPage',    'Dev 4','/admin',2))
write('src/pages/admin/AdminComplaintsPage.jsx',   stub('AdminComplaintsPage',   'Dev 4','/admin/complaints',2))
write('src/pages/admin/AdminApplicationsPage.jsx', stub('AdminApplicationsPage', 'Dev 4','/admin/applications',2))

console.log(`
\x1b[32m============================================\x1b[0m
\x1b[32m  All files written successfully!\x1b[0m
\x1b[32m============================================\x1b[0m

  \x1b[34mnpm run dev\x1b[0m

  Open: \x1b[34mhttp://localhost:5173\x1b[0m

  Login test  →  any phone + OTP \x1b[34m123456\x1b[0m
  Admin test  →  phone "staff123" + OTP \x1b[34m123456\x1b[0m
`)
