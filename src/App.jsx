import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/shared/ProtectedRoute'
import ScrollToTop from './components/shared/ScrollToTop'
import HomePage            from './pages/HomePage'
import AboutPage           from './pages/AboutPage'
import NewsPage            from './pages/NewsPage'
import NewsArticlePage     from './pages/NewsArticlePage'
import LicensingPage       from './pages/LicensingPage'
import DocumentsPage       from './pages/DocumentsPage'
import SearchPage          from './pages/SearchPage'
import UASFPage            from './pages/UASFPage'
import QoSPage             from './pages/QoSPage'
import MapPage             from './pages/MapPage'
import AIPage              from './pages/AIPage'
import CIRTPage            from './pages/CIRTPage'
import VerifyPage          from './pages/VerifyPage'
import ConsultationsPage   from './pages/ConsultationsPage'
import TendersPage         from './pages/TendersPage'
import CareersPage         from './pages/CareersPage'
import ContactPage         from './pages/ContactPage'
import ConsumerPage from './pages/ConsumerPage'
import TypeApprovalPage    from './pages/TypeApprovalPage'
import NotFoundPage        from './pages/NotFoundPage'
import LoginPage           from './pages/auth/LoginPage'
import RegisterPage        from './pages/auth/RegisterPage'
import DashboardPage       from './pages/portal/DashboardPage'
import NewComplaintPage    from './pages/portal/NewComplaintPage'
import ComplaintDetailPage from './pages/portal/ComplaintDetailPage'
import ComplaintTrackerPage from './pages/portal/ComplaintTrackerPage'
import ApplyPage           from './pages/portal/ApplyPage'
import ApplicationsPage    from './pages/portal/ApplicationsPage'
import AdminLoginPage          from './pages/admin/AdminLoginPage'
import AdminDashboardPage      from './pages/admin/AdminDashboardPage'
import AdminComplaintsPage     from './pages/admin/AdminComplaintsPage'
import AdminApplicationsPage   from './pages/admin/AdminApplicationsPage'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/"              element={<HomePage />} />
        <Route path="/about"         element={<AboutPage />} />
        <Route path="/news"          element={<NewsPage />} />
        <Route path="/news/:slug"    element={<NewsArticlePage />} />
        <Route path="/licensing"     element={<LicensingPage />} />
        <Route path="/licensing/apply" element={<ApplyPage />} />
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
        <Route path="/complaints"    element={<Navigate to="/portal/complaint/new" replace />} />
        <Route path="/portal/complaint/new" element={<NewComplaintPage />} />
        <Route path="/portal/complaints" element={<ComplaintTrackerPage />} />

        <Route path="/portal" element={<ProtectedRoute role="citizen" />}>
          <Route index                element={<DashboardPage />} />
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
    </>
  )
}
