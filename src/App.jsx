import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/shared/ProtectedRoute'
import PageLoader from './components/shared/PageLoader'
import GuestAuthModal from './components/shared/GuestAuthModal'
import ScrollToTop from './components/shared/ScrollToTop'
import Spinner from './components/shared/Spinner'
import PolicyPage from './pages/PolicyPage'
import SecurityPage from './pages/SecurityPage'

const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const NewsPage = lazy(() => import('./pages/NewsPage'))
const NewsArticlePage = lazy(() => import('./pages/NewsArticlePage'))
const LicensingPage = lazy(() => import('./pages/LicensingPage'))
const DocumentsPage = lazy(() => import('./pages/DocumentsPage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const UASFPage = lazy(() => import('./pages/UASFPage'))
const QoSPage = lazy(() => import('./pages/QoSPage'))
const MapPage = lazy(() => import('./pages/MapPage'))
const AIPage = lazy(() => import('./pages/AIPage'))
const CIRTPage = lazy(() => import('./pages/CIRTPage'))
const VerifyPage = lazy(() => import('./pages/VerifyPage'))
const ConsultationsPage = lazy(() => import('./pages/ConsultationsPage'))
const TendersPage = lazy(() => import('./pages/TendersPage'))
const CareersPage = lazy(() => import('./pages/CareersPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const ConsumerPage = lazy(() => import('./pages/ConsumerPage'))
const TypeApprovalPage = lazy(() => import('./pages/TypeApprovalPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const LoginPage = lazy(() => import('./pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'))
const DashboardPage = lazy(() => import('./pages/portal/DashboardPage'))
const NewComplaintPage = lazy(() => import('./pages/portal/NewComplaintPage'))
const ComplaintDetailPage = lazy(() => import('./pages/portal/ComplaintDetailPage'))
const ComplaintTrackerPage = lazy(() => import('./pages/portal/ComplaintTrackerPage'))
const ApplyPage = lazy(() => import('./pages/portal/ApplyPage'))
const ApplicationsPage = lazy(() => import('./pages/portal/ApplicationsPage'))
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'))
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'))
const AdminComplaintsPage = lazy(() => import('./pages/admin/AdminComplaintsPage'))
const AdminApplicationsPage = lazy(() => import('./pages/admin/AdminApplicationsPage'))

function AppLoadingFallback() {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#ffffff' }}>
      <Spinner size="lg" />
    </div>
  )
}

export default function App() {
  return (
    <>
      <PageLoader />
      <GuestAuthModal />
      <ScrollToTop />
      <Suspense fallback={<AppLoadingFallback />}>
        <Routes>
          <Route path="/"              element={<HomePage />} />
          <Route path="/about"         element={<AboutPage />} />
          <Route path="/news"          element={<NewsPage />} />
          <Route path="/news/:slug"    element={<NewsArticlePage />} />
          <Route path="/licensing"     element={<LicensingPage />} />
          <Route path="/licensing/apply" element={<Navigate to="/login?redirect=/portal/apply&force=1" replace />} />
          <Route path="/consumer" element={<ConsumerPage />} />
          <Route path="/type-approval" element={<TypeApprovalPage />} />
          <Route path="/documents"     element={<DocumentsPage />} />
          <Route path="/search"        element={<SearchPage />} />
          <Route path="/uasf"          element={<UASFPage />} />
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
          <Route path="/complaint"     element={<Navigate to="/portal/complaint/new" replace />} />
          <Route path="/complaints"    element={<Navigate to="/portal/complaints" replace />} />
          <Route path="/privacy"       element={<PolicyPage />} />
          <Route path="/security"      element={<SecurityPage />} />

          <Route path="/portal" element={<ProtectedRoute role="citizen" />}>
            <Route index                element={<DashboardPage />} />
            <Route path="complaint/new" element={<NewComplaintPage />} />
            <Route path="complaints"    element={<ComplaintTrackerPage />} />
            <Route path="complaint/:id" element={<ComplaintDetailPage />} />
            <Route path="apply"         element={<ApplyPage />} />
            <Route path="applications"  element={<ApplicationsPage />} />
          </Route>

          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route element={<ProtectedRoute role="staff" />}>
            <Route path="/admin/complaints"   element={<AdminComplaintsPage />} />
            <Route path="/admin/applications" element={<AdminApplicationsPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  )
}
