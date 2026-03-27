import { useEffect, useState } from 'react'
import { BarChart2, Bell, FileText, LayoutDashboard, Plus, RefreshCw, Search, Settings, Users } from 'lucide-react'
import bocraSvg from '../../assets/bocra.svg'
import { useComplaints } from '../../context/ComplaintContext'
import { useApplications } from '../../context/ApplicationContext'

const dark = '#0a1628'
const border = '#e5e7eb'
const muted = '#6b7280'
const surface = '#f8f9fa'
const green = '#16a34a'
const filters = ['All', 'Pending', 'Under Review', 'Resolved']
const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, section: 'overview' },
  { label: 'Complaints', icon: FileText, section: 'complaints' },
  { label: 'Licensees', icon: Users, section: 'licensees' },
  { label: 'Analytics', icon: BarChart2, section: 'analytics' },
  { label: 'Settings', icon: Settings, section: 'settings' },
]

const registry = [
  { ref: 'LIC-2026-001', operator: 'Mascom Wireless', type: 'Telecommunications', class: 'Class 1', coverage: 'National', issued: '2018-04-01', expires: '2028-03-31', status: 'Active', fee: 'BWP 250,000' },
  { ref: 'LIC-2026-002', operator: 'Orange Botswana', type: 'Telecommunications', class: 'Class 1', coverage: 'National', issued: '2018-04-01', expires: '2028-03-31', status: 'Active', fee: 'BWP 250,000' },
  { ref: 'LIC-2026-003', operator: 'BeMobile', type: 'Telecommunications', class: 'Class 2', coverage: 'National', issued: '2019-06-15', expires: '2027-06-14', status: 'Active', fee: 'BWP 75,000' },
  { ref: 'LIC-2026-004', operator: 'BTC', type: 'Telecommunications', class: 'Class 1', coverage: 'National', issued: '2013-04-01', expires: '2026-03-31', status: 'Renewal Pending', fee: 'BWP 250,000' },
  { ref: 'LIC-2026-005', operator: 'Botswana Television', type: 'Broadcasting', class: 'TV', coverage: 'National', issued: '2015-01-01', expires: '2027-12-31', status: 'Active', fee: 'BWP 85,000' },
  { ref: 'LIC-2026-006', operator: 'Yarona FM', type: 'Broadcasting', class: 'Radio', coverage: 'National', issued: '2016-03-15', expires: '2026-03-14', status: 'Renewal Pending', fee: 'BWP 30,000' },
  { ref: 'LIC-2026-007', operator: 'DStv Botswana', type: 'Broadcasting', class: 'Cable TV', coverage: 'National', issued: '2014-07-01', expires: '2027-06-30', status: 'Active', fee: 'BWP 85,000' },
  { ref: 'LIC-2026-008', operator: 'Botswana Post', type: 'Postal Services', class: 'National Postal', coverage: 'National', issued: '2013-04-01', expires: '2028-03-31', status: 'Active', fee: 'BWP 12,000' },
  { ref: 'LIC-2026-009', operator: 'FedEx Botswana', type: 'Postal Services', class: 'Courier', coverage: 'National', issued: '2017-11-01', expires: '2027-10-31', status: 'Active', fee: 'BWP 12,000' },
  { ref: 'LIC-2026-010', operator: 'InfoCom', type: 'Internet Service Provider', class: 'ISP', coverage: 'National', issued: '2020-09-01', expires: '2025-08-31', status: 'Expired', fee: 'BWP 50,000' },
]

const licenceTypeOptions = [
  { label: 'All', value: 'all' },
  { label: 'Telecommunications', value: 'Telecommunications' },
  { label: 'Broadcasting', value: 'Broadcasting' },
  { label: 'Postal', value: 'Postal Services' },
  { label: 'ISP', value: 'Internet Service Provider' },
]

const loginInputStyle = {
  width: '100%',
  padding: '14px 16px',
  border: '1px solid #d1d5db',
  borderRadius: 14,
  fontSize: 15,
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'Inter, sans-serif',
}

const sectionStyle = {
  background: '#ffffff',
  border: `1px solid ${border}`,
  borderRadius: 12,
  overflow: 'hidden',
}

const sectionHeaderStyle = {
  padding: '32px 32px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: 16,
  flexWrap: 'wrap',
}

const sectionTitleStyle = {
  margin: 0,
  color: '#111111',
  fontSize: 22,
  fontWeight: 700,
  letterSpacing: '-0.02em',
  fontFamily: "'Plus Jakarta Sans', sans-serif",
}

const sectionNoteStyle = {
  margin: '6px 0 0',
  color: muted,
  fontSize: 14,
  lineHeight: 1.6,
  fontFamily: 'Inter, sans-serif',
}

const tableHeaderCellStyle = {
  padding: '0 16px 12px',
  color: '#94a3b8',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  textAlign: 'left',
  fontFamily: 'Inter, sans-serif',
  whiteSpace: 'nowrap',
}

const tableCellStyle = {
  padding: '16px',
  borderBottom: '1px solid #f1f5f9',
  color: '#6b7280',
  fontSize: 14,
  fontFamily: 'Inter, sans-serif',
  whiteSpace: 'nowrap',
}

const tableCellSoftStyle = {
  ...tableCellStyle,
  whiteSpace: 'normal',
}

const actionCellStyle = {
  ...tableCellStyle,
  textAlign: 'right',
}

const smallButtonStyle = {
  border: '1px solid #dbe1e8',
  borderRadius: 999,
  background: '#ffffff',
  color: '#334155',
  padding: '7px 12px',
  fontSize: 12,
  fontWeight: 700,
  cursor: 'pointer',
  fontFamily: 'Inter, sans-serif',
  whiteSpace: 'nowrap',
}

const primaryActionStyle = {
  ...smallButtonStyle,
  border: 'none',
  background: dark,
  color: '#ffffff',
}

const successActionStyle = {
  ...smallButtonStyle,
  border: 'none',
  background: '#dcfce7',
  color: '#166534',
}

const dangerActionStyle = {
  ...smallButtonStyle,
  border: 'none',
  background: '#fee2e2',
  color: '#b91c1c',
}

const warnActionStyle = {
  ...smallButtonStyle,
  border: 'none',
  background: '#fef3c7',
  color: '#92400e',
}

const filterPillStyle = (active) => ({
  border: 'none',
  borderRadius: 999,
  padding: '9px 14px',
  background: active ? dark : '#eef2f6',
  color: active ? '#ffffff' : '#475569',
  fontSize: 13,
  fontWeight: 700,
  cursor: 'pointer',
  fontFamily: 'Inter, sans-serif',
})

const statusStyle = (status) => status === 'Pending'
  ? { background: '#fef3c7', color: '#b45309' }
  : status === 'Under Review'
    ? { background: '#e2e8f0', color: '#334155' }
    : { background: '#dcfce7', color: '#166534' }

const priorityStyle = (priority) => priority === 'Critical'
  ? { background: '#fee2e2', color: '#b91c1c' }
  : priority === 'High'
    ? { background: '#ffedd5', color: '#c2410c' }
    : { background: '#eef2f7', color: '#475569' }

const licenceStatusStyle = (status) => status === 'Active'
  ? { background: '#dcfce7', color: '#166534' }
  : status === 'Renewal Pending'
    ? { background: '#fef3c7', color: '#b45309' }
    : status === 'Expired'
      ? { background: '#fee2e2', color: '#b91c1c' }
      : { background: '#eef2f7', color: '#475569' }

const badgeStyle = (colors) => ({
  ...colors,
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: 999,
  padding: '5px 10px',
  fontSize: 12,
  fontWeight: 700,
  fontFamily: 'Inter, sans-serif',
  whiteSpace: 'nowrap',
})

const emptyStateIconStyle = {
  width: 54,
  height: 54,
  borderRadius: 18,
  background: '#f3f4f6',
  color: '#9ca3af',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 16px',
}

const formatStaffName = (value) => {
  const raw = value.trim().split('@')[0].replace(/[._-]+/g, ' ').trim()
  const clean = raw || 'Demo Officer'
  return clean.split(/\s+/).map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join(' ')
}

const initialsOf = (name) => name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join('')

export default function AdminDashboardPage() {
  const { complaints, stats, updateStatus } = useComplaints()
  const { applications: pendingApps, updateStatus: updateAppStatus, refresh: refreshApps } = useApplications()
  const [adminLoggedIn, setAdminLoggedIn] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [staffId, setStaffId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [activeSection, setActiveSection] = useState('overview')
  const [activeFilter, setActiveFilter] = useState('All')
  const [adminName, setAdminName] = useState('Demo Officer')
  const [licenceTab, setLicenceTab] = useState('Active Licences')
  const [licensees, setLicensees] = useState(registry)
  const [complaintSearch, setComplaintSearch] = useState('')
  const [licenceSearch, setLicenceSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [selectedItem, setSelectedItem] = useState(null)
  const [itemType, setItemType] = useState('complaint')
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)

  const today = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())
  const resolutionRate = stats.total ? Math.round((stats.resolved / stats.total) * 100) : 0
  const reviewRate = stats.total ? Math.round(((stats.underReview + stats.resolved) / stats.total) * 100) : 0
  const priorityCounts = complaints.reduce((acc, complaint) => ({ ...acc, [complaint.priority]: (acc[complaint.priority] || 0) + 1 }), {})
  const complaintMatchesSearch = (complaint) => {
    const query = complaintSearch.toLowerCase()
    return !query || (
      complaint.name?.toLowerCase().includes(query) ||
      complaint.ref?.toLowerCase().includes(query) ||
      complaint.isp?.toLowerCase().includes(query) ||
      complaint.category?.toLowerCase().includes(query)
    )
  }
  const filteredComplaints = complaints.filter((complaint) => (
    complaintMatchesSearch(complaint) &&
    (activeFilter === 'All' || complaint.status === activeFilter)
  ))
  const filteredRegistry = licensees.filter((item) => (
    item.operator.toLowerCase().includes(licenceSearch.toLowerCase()) &&
    (typeFilter === 'all' || item.type === typeFilter)
  ))
  const activePending = pendingApps.filter(a => a.status !== 'Licence Issued' && a.status !== 'Rejected')
  const needsAttention = complaints.filter((complaint) => complaintMatchesSearch(complaint) && complaint.status === 'Pending').slice(0, 5)
  const recentActivity = complaints.filter((complaint) => complaintMatchesSearch(complaint) && complaint.status === 'Resolved').slice(-3).reverse()

  const kpis = [
    { key: 'total', label: 'Total Complaints', value: stats.total, note: `${priorityCounts.Critical || 0} critical in queue` },
    { key: 'pending', label: 'Pending Cases', value: stats.pending, note: `${stats.pending} waiting for first action` },
    { key: 'review', label: 'Under Review', value: stats.underReview, note: `${reviewRate}% touched by staff` },
    { key: 'resolved', label: 'Resolved', value: stats.resolved, note: `${resolutionRate}% resolution rate` },
  ]

  const licenceStats = [
    { key: 'active', label: 'Active', value: licensees.filter((item) => item.status === 'Active').length },
    { key: 'renewal', label: 'Pending Renewal', value: licensees.filter((item) => item.status === 'Renewal Pending').length },
    { key: 'expired', label: 'Expired', value: licensees.filter((item) => item.status === 'Expired').length },
    { key: 'applications', label: 'Applications', value: pendingApps.filter(a => a.status === 'Application Received' || a.status === 'Document Verification' || a.status === 'Technical Assessment').length },
  ]



  useEffect(() => {
    setPaymentConfirmed(false)
  }, [selectedItem])

  const openComplaintReview = (complaint) => {
    setSelectedItem(complaint)
    setItemType('complaint')
  }

  const openLicenceReview = (application) => {
    setSelectedItem(application)
    setItemType('licence')
  }

  const closeReviewPanel = () => {
    setSelectedItem(null)
  }

  const loginAs = () => {
    const name = formatStaffName(staffId)
    setAdminName(name)
    setAdminLoggedIn(true)
    setError('')
  }

  const handleLogin = () => {
    if (password === 'admin123') {
      loginAs()
      return
    }
    setError('Invalid credentials. Try password: admin123')
  }

  const feeForType = (type) => {
    if (type === 'Class 1 Network Operator Licence') return 'BWP 250,000'
    if (type === 'Class 2 Telecommunications Licence') return 'BWP 75,000'
    if (type === 'Internet Service Provider Licence' || type === 'Internet Service Provider') return 'BWP 50,000'
    if (type === 'Commercial Radio Broadcasting Licence' || type === 'Commercial Radio Licence') return 'BWP 30,000'
    if (type === 'Television Broadcasting Licence') return 'BWP 85,000'
    if (type === 'Postal/Courier Operator Licence' || type === 'Postal Services') return 'BWP 12,000'
    return 'BWP 8,500'
  }

  const renewLicence = (ref) => {
    setLicensees((prev) => prev.map((item) => (item.ref === ref ? { ...item, status: 'Active' } : item)))
  }

  const suspendLicence = (ref) => {
    setLicensees((prev) => prev.map((item) => (item.ref === ref ? { ...item, status: 'Suspended' } : item)))
  }

  const approvePendingApplication = (ref) => {
    const approved = pendingApps.find((item) => (item.ref || item.id) === ref)
    if (!approved) return

    const company = approved.company || approved.legalBusinessName || approved.applicant || 'Pending Applicant'
    const licType = approved.licenceType || approved.type || approved.category || 'Class 3 Service Licence'
    const coverage = approved.coverageType || approved.coverage || 'National'
    const submitted = approved.date || approved.submitted || approved.createdAt || new Date().toISOString().slice(0, 10)
    const nextExpiry = `${new Date().getFullYear() + 5}-12-31`

    setLicensees((prev) => [
      {
        ref: approved.ref,
        operator: company,
        type: licType === 'Internet Service Provider Licence'
          ? 'Internet Service Provider'
          : licType.includes('Broadcast')
            ? 'Broadcasting'
            : licType.includes('Postal') || licType.includes('Courier')
              ? 'Postal Services'
              : licType.includes('Telecommunications') || licType.includes('Network')
                ? 'Telecommunications'
                : licType,
        class: approved.licenceClass || approved.class || (licType.includes('Class 1') ? 'Class 1' : licType.includes('Class 2') ? 'Class 2' : licType.includes('Radio') ? 'Radio' : licType.includes('TV') ? 'TV' : 'Service'),
        coverage,
        issued: submitted,
        expires: approved.expires || nextExpiry,
        status: 'Active',
        fee: approved.fee || feeForType(licType),
      },
      ...prev,
    ])
    updateAppStatus(ref, 'Licence Issued')
  }

  const rejectPendingApplication = (ref) => {
    updateAppStatus(ref, 'Rejected')
  }

  const sectionTitle = activeSection === 'licensees'
    ? 'Licensees'
    : activeSection === 'complaints'
      ? 'Complaints'
      : activeSection === 'analytics'
        ? 'Analytics'
        : activeSection === 'settings'
          ? 'Settings'
          : 'Dashboard'

  const sectionDescription = activeSection === 'licensees'
    ? 'Review active licences, pending renewals, and applications awaiting approval.'
    : activeSection === 'complaints'
      ? `Welcome back, ${adminName}. Here's the live BOCRA complaints queue.`
      : activeSection === 'overview'
        ? `Welcome back, ${adminName}. Here's what needs attention today.`
        : 'This section now follows the BOCRA dashboard shell.'

  if (!adminLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: dark, padding: 24 }}>
        <div style={{ width: 420, background: '#ffffff', border: `1px solid ${border}`, borderRadius: 28, padding: 40, boxShadow: '0 30px 80px rgba(0,0,0,0.22)' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <img src={bocraSvg} alt="BOCRA" style={{ height: 56, width: 'auto' }} />
            <p style={{ color: muted, fontSize: 14, marginTop: 14, marginBottom: 0, fontFamily: 'Inter, sans-serif' }}>BOCRA Admin Dashboard</p>
          </div>
          <input placeholder="Staff Name or Email" style={loginInputStyle} value={staffId} onChange={(e) => setStaffId(e.target.value)} />
          <input placeholder="Password" type="password" style={{ ...loginInputStyle, marginTop: 12 }} value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <p style={{ color: '#b91c1c', fontSize: 13, marginTop: 8, marginBottom: 0, fontFamily: 'Inter, sans-serif' }}>{error}</p>}
          <button type="button" onClick={handleLogin} style={{ width: '100%', marginTop: 18, background: dark, color: '#ffffff', border: 'none', borderRadius: 999, padding: '14px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Sign In</button>
          <button type="button" onClick={loginAs} style={{ width: '100%', marginTop: 10, background: '#ffffff', color: '#111111', border: '1px solid #d1d5db', borderRadius: 999, padding: '12px', fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Skip Login (Demo Mode)</button>
          <p style={{ textAlign: 'center', fontSize: 12, color: '#9ca3af', marginTop: 16, marginBottom: 0, fontFamily: 'Inter, sans-serif' }}>Demo password: admin123</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <style>{`
        @media (max-width: 1260px) {
          .admin-kpis { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 960px) {
          .admin-shell { flex-direction: column; }
          .admin-side { width: 100% !important; }
          .admin-top,
          .admin-body { padding: 20px !important; }
        }
        @media (max-width: 720px) {
          .admin-kpis { grid-template-columns: 1fr !important; }
          .activity-row { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="admin-shell" style={{ display: 'flex', minHeight: '100vh', background: surface }}>
        <aside className="admin-side" style={{ width: 260, background: dark, color: '#ffffff', padding: '18px 16px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ padding: '10px 10px 18px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <img src={bocraSvg} alt="BOCRA" style={{ height: 42, width: 'auto', display: 'block' }} />
              <p style={{ margin: '12px 0 0', color: 'rgba(255,255,255,0.46)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Admin Dashboard</p>
            </div>
            <div style={{ marginTop: 22 }}>
              <div style={{ color: 'rgba(255,255,255,0.32)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 14, padding: '0 10px', fontFamily: 'Inter, sans-serif' }}>Overview</div>
              {navItems.map(({ label, icon: Icon, section }) => {
                const active = activeSection === section
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setActiveSection(section)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '12px 14px',
                      borderRadius: 14,
                      color: active ? '#ffffff' : 'rgba(255,255,255,0.72)',
                      background: active ? 'rgba(255,255,255,0.06)' : 'transparent',
                      border: 'none',
                      textAlign: 'left',
                      marginBottom: 6,
                      cursor: 'pointer',
                      fontSize: 14,
                      fontWeight: 600,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    <div style={{ width: 30, height: 30, borderRadius: 10, background: active ? 'rgba(22,163,74,0.14)' : 'rgba(255,255,255,0.04)', color: active ? green : 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={16} />
                    </div>
                    <span>{label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(22,163,74,0.14)', border: '1px solid rgba(22,163,74,0.24)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>{initialsOf(adminName)}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>{adminName}</div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, fontFamily: 'Inter, sans-serif' }}>BOCRA Staff Portal</div>
            </div>
          </div>
        </aside>

        <main style={{ flex: 1, overflow: 'auto', background: surface }}>
          <div className="admin-top" style={{ background: '#ffffff', borderBottom: `1px solid ${border}`, padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 360px', maxWidth: 440, position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
              <input
                value={complaintSearch}
                onChange={(e) => setComplaintSearch(e.target.value)}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#1A3A6B' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = border }}
                placeholder="Search complaints, refs, or officers..."
                style={{ width: '100%', padding: '14px 16px 14px 42px', borderRadius: 999, border: `1px solid ${border}`, background: '#f8fafc', boxSizing: 'border-box', outline: 'none', fontSize: 14, fontFamily: 'Inter, sans-serif' }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#166534', fontSize: 13, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: green }} />
                <span>System Online</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  const firstPending = complaints.find((complaint) => complaint.status === 'Pending')
                  if (firstPending) {
                    openComplaintReview(firstPending)
                  }
                }}
                style={{ background: '#1A3A6B', color: 'white', border: 'none', borderRadius: 50, padding: '8px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Inter, sans-serif' }}
              >
                <Plus size={14} />
                <span>New Review</span>
              </button>
              <button type="button" style={{ width: 40, height: 40, borderRadius: '50%', border: `1px solid ${border}`, background: '#ffffff', color: '#111111', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Bell size={18} />
              </button>
            </div>
          </div>

          <div className="admin-body" style={{ padding: 32 }}>
            <h1 style={{ margin: 0, color: '#111111', fontSize: 38, lineHeight: 1.02, fontWeight: 800, letterSpacing: '-0.04em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{sectionTitle}</h1>
            <p style={{ margin: '10px 0 24px', color: muted, fontSize: 16, lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>{sectionDescription}</p>
            {activeSection === 'overview' ? (
              <>
                <div className="admin-kpis" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 16 }}>
                  {kpis.map((card) => (
                    <div key={card.key} style={{ background: '#ffffff', border: `1px solid ${border}`, borderRadius: 12, padding: 20 }}>
                      <div style={{ color: '#94a3b8', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>{card.label}</div>
                      <div style={{ marginTop: 10, color: '#111111', fontSize: 32, lineHeight: 1, fontWeight: 800, letterSpacing: '-0.04em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{card.value}</div>
                      <div style={{ marginTop: 8, color: muted, fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{card.note}</div>
                    </div>
                  ))}
                </div>

                <div style={{ ...sectionStyle, marginTop: 20 }}>
                  <div style={sectionHeaderStyle}>
                    <div>
                      <h2 style={sectionTitleStyle}>Needs Attention</h2>
                      <p style={sectionNoteStyle}>Pending complaints that need the next action now.</p>
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Top 5 pending</div>
                  </div>
                  <div style={{ padding: '0 16px 12px', overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr>
                          {['Name', 'ISP', 'Category', 'Date', 'Action'].map((heading) => (
                            <th key={heading} style={tableHeaderCellStyle}>{heading}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {needsAttention.map((complaint) => (
                          <tr key={complaint.ref}>
                            <td style={{ ...tableCellSoftStyle, color: '#111111', fontWeight: 700 }}>{complaint.name}</td>
                            <td style={tableCellStyle}>{complaint.isp}</td>
                            <td style={tableCellSoftStyle}>{complaint.category}</td>
                            <td style={tableCellStyle}>{complaint.date}</td>
                            <td style={actionCellStyle}>
                              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, flexWrap: 'wrap' }}>
                                <button type="button" onClick={() => openComplaintReview(complaint)} style={primaryActionStyle}>Review</button>
                                <button type="button" onClick={() => updateStatus(complaint.ref, 'Resolved')} style={successActionStyle}>Resolve</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {needsAttention.length === 0 && (
                          <tr>
                            <td colSpan={5} style={{ padding: '18px 16px 24px', color: muted, fontSize: 14, textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>No pending complaints need attention right now.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div style={{ ...sectionStyle, marginTop: 20 }}>
                  <div style={sectionHeaderStyle}>
                    <div>
                      <h2 style={sectionTitleStyle}>Recent Activity</h2>
                      <p style={sectionNoteStyle}>Latest resolved complaints closed by the team.</p>
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Last 3 resolved</div>
                  </div>
                  <div style={{ padding: '0 32px 12px' }}>
                    {recentActivity.length === 0 ? (
                      <div style={{ padding: '0 0 20px', color: muted, fontSize: 14, textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>No recent resolved complaints yet.</div>
                    ) : (
                      recentActivity.map((complaint, index) => (
                        <div key={complaint.ref} className="activity-row" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr) minmax(0, 1.2fr) auto auto', gap: 16, alignItems: 'center', padding: '16px 0', borderBottom: index === recentActivity.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ color: '#111111', fontSize: 14, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>{complaint.name}</div>
                            <div style={{ marginTop: 3, color: muted, fontSize: 14, fontFamily: 'Inter, sans-serif' }}>{complaint.isp}</div>
                          </div>
                          <div style={{ color: muted, fontSize: 14, fontFamily: 'Inter, sans-serif' }}>{complaint.category}</div>
                          <div style={{ color: muted, fontSize: 14, fontFamily: 'Inter, sans-serif' }}>{complaint.date}</div>
                          <div><span style={badgeStyle(statusStyle(complaint.status))}>{complaint.status}</span></div>
                          <div><span style={badgeStyle(priorityStyle(complaint.priority))}>{complaint.priority}</span></div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            ) : activeSection === 'complaints' ? (
              <div style={sectionStyle}>
                <div style={sectionHeaderStyle}>
                  <div>
                    <h2 style={sectionTitleStyle}>Complaint Queue</h2>
                    <p style={sectionNoteStyle}>Filter the full complaint list and take action from one place.</p>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {filters.map((filter) => (
                      <button key={filter} type="button" onClick={() => setActiveFilter(filter)} style={filterPillStyle(activeFilter === filter)}>
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ padding: '0 16px 16px', overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        {['Reference', 'Name', 'ISP', 'Category', 'Date', 'Priority', 'Status', 'Action'].map((heading) => (
                          <th key={heading} style={tableHeaderCellStyle}>{heading}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredComplaints.map((complaint) => (
                        <tr key={complaint.ref}>
                          <td style={{ ...tableCellStyle, color: '#111111', fontWeight: 700 }}>{complaint.ref}</td>
                          <td style={{ ...tableCellSoftStyle, color: '#111111', fontWeight: 700 }}>{complaint.name}</td>
                          <td style={tableCellStyle}>{complaint.isp}</td>
                          <td style={tableCellSoftStyle}>{complaint.category}</td>
                          <td style={tableCellStyle}>{complaint.date}</td>
                          <td style={tableCellStyle}><span style={badgeStyle(priorityStyle(complaint.priority))}>{complaint.priority}</span></td>
                          <td style={tableCellStyle}><span style={badgeStyle(statusStyle(complaint.status))}>{complaint.status}</span></td>
                          <td style={actionCellStyle}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, flexWrap: 'wrap' }}>
                              <button type="button" onClick={() => openComplaintReview(complaint)} style={primaryActionStyle}>Review</button>
                              <button type="button" onClick={() => updateStatus(complaint.ref, 'Resolved')} style={successActionStyle}>Resolve</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredComplaints.length === 0 && (
                        <tr>
                          <td colSpan={8} style={{ padding: '18px 16px 24px', color: muted, fontSize: 14, textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>No complaints match the current filter.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : activeSection === 'licensees' ? (
              <>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
                  {licenceStats.map((item) => (
                    <div key={item.key} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#f8f9fa', border: '1px solid #e2e8f0', borderRadius: 999, padding: '8px 16px' }}>
                      <span style={{ color: '#64748b', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>{item.label}</span>
                      <span style={{ color: '#111111', fontSize: 16, fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item.value}</span>
                    </div>
                  ))}
                </div>

                <div style={sectionStyle}>
                  <div style={sectionHeaderStyle}>
                    <div>
                      <h2 style={sectionTitleStyle}>Licence Management</h2>
                      <p style={sectionNoteStyle}>Review active licensees and applications awaiting approval.</p>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                      {['Active Licences', 'Pending Applications'].map((tab) => (
                        <button key={tab} type="button" onClick={() => setLicenceTab(tab)} style={filterPillStyle(licenceTab === tab)}>
                          {tab}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          setRefreshing(true)
                          refreshApps()
                          setTimeout(() => setRefreshing(false), 600)
                        }}
                        title="Refresh applications"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          border: `1px solid ${border}`,
                          borderRadius: 999,
                          padding: '9px 14px',
                          background: '#ffffff',
                          color: '#475569',
                          fontSize: 13,
                          fontWeight: 700,
                          cursor: 'pointer',
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        <RefreshCw size={14} style={{ transition: 'transform 0.6s ease', transform: refreshing ? 'rotate(360deg)' : 'rotate(0deg)' }} />
                        Refresh
                      </button>
                    </div>
                  </div>

                  {licenceTab === 'Active Licences' ? (
                    <>
                      <div style={{ padding: '0 32px 20px', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                        <div style={{ flex: '1 1 280px', position: 'relative' }}>
                          <Search size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                          <input
                            value={licenceSearch}
                            onChange={(e) => setLicenceSearch(e.target.value)}
                            onFocus={(e) => { e.currentTarget.style.borderColor = '#1A3A6B' }}
                            onBlur={(e) => { e.currentTarget.style.borderColor = border }}
                            placeholder="Search by operator name"
                            style={{ width: '100%', padding: '14px 16px 14px 42px', borderRadius: 999, border: `1px solid ${border}`, background: '#f8fafc', boxSizing: 'border-box', outline: 'none', fontSize: 14, fontFamily: 'Inter, sans-serif' }}
                          />
                        </div>
                        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} style={{ padding: '13px 16px', borderRadius: 999, border: `1px solid ${border}`, background: '#ffffff', fontSize: 14, outline: 'none', fontFamily: 'Inter, sans-serif' }}>
                          {licenceTypeOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      </div>

                      <div style={{ padding: '0 16px 16px', overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <thead>
                            <tr>
                              {['Ref', 'Operator', 'Type', 'Class', 'Coverage', 'Expires', 'Fee', 'Status', 'Action'].map((heading) => (
                                <th key={heading} style={tableHeaderCellStyle}>{heading}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {filteredRegistry.map((item, index) => (
                              <tr key={item.ref} style={{ background: index % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                                <td style={{ ...tableCellStyle, color: '#64748b' }}>{item.ref}</td>
                                <td style={{ ...tableCellSoftStyle, color: '#111111', fontWeight: 700 }}>{item.operator}</td>
                                <td style={tableCellStyle}>{item.type}</td>
                                <td style={tableCellStyle}>{item.class}</td>
                                <td style={tableCellStyle}>{item.coverage}</td>
                                <td style={tableCellStyle}>{item.expires}</td>
                                <td style={tableCellStyle}>{item.fee}</td>
                                <td style={tableCellStyle}><span style={badgeStyle(licenceStatusStyle(item.status))}>{item.status}</span></td>
                                <td style={{ ...actionCellStyle, paddingTop: 14, paddingBottom: 14 }}>
                                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, flexWrap: 'wrap' }}>
                                    {(item.status === 'Renewal Pending' || item.status === 'Expired') && <button type="button" onClick={() => renewLicence(item.ref)} style={warnActionStyle}>Renew</button>}
                                    {item.status === 'Active' && <button type="button" onClick={() => suspendLicence(item.ref)} style={dangerActionStyle}>Suspend</button>}
                                    <button type="button" style={smallButtonStyle}>View</button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                            {filteredRegistry.length === 0 && (
                              <tr>
                                <td colSpan={9} style={{ padding: '18px 16px 24px', color: muted, fontSize: 14, textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>No licensees match the current search and filter.</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : activePending.length === 0 ? (
                    <div style={{ padding: '40px 32px 48px', textAlign: 'center' }}>
                      <div style={emptyStateIconStyle}><FileText size={26} /></div>
                      <div style={{ color: '#111111', fontSize: 24, fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>No pending applications</div>
                      <div style={{ marginTop: 8, color: muted, fontSize: 15, lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>New submissions from the licensing portal will appear here for review.</div>
                    </div>
                  ) : (
                    <div style={{ padding: '0 16px 16px', overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr>
                            {['Ref', 'Company', 'Licence Type', 'Date', 'Action'].map((heading) => (
                              <th key={heading} style={tableHeaderCellStyle}>{heading}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {activePending.map((item, index) => {
                            const ref = item.ref || item.id
                            const company = item.company || item.legalBusinessName || item.applicant || 'Pending Applicant'
                            const licenceType = item.licenceType || item.type || item.category || 'Class 3 Service Licence'
                            const date = item.date || item.submitted || item.createdAt || 'Pending'

                            return (
                              <tr key={ref} style={{ background: index % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                                <td style={{ ...tableCellStyle, color: '#64748b' }}>{ref}</td>
                                <td style={{ ...tableCellSoftStyle, color: '#111111', fontWeight: 700 }}>{company}</td>
                                <td style={tableCellSoftStyle}>{licenceType}</td>
                                <td style={tableCellStyle}>{date}</td>
                                <td style={{ ...actionCellStyle, paddingTop: 14, paddingBottom: 14 }}>
                                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, flexWrap: 'wrap' }}>
                                    <button type="button" onClick={() => openLicenceReview(item)} style={primaryActionStyle}>Review</button>
                                  </div>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div style={{ ...sectionStyle, padding: 32 }}>
                <div style={{ color: '#111111', fontSize: 30, fontWeight: 800, letterSpacing: '-0.03em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{sectionTitle}</div>
                <div style={{ marginTop: 8, color: muted, fontSize: 15, lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>This section follows the cleaner BOCRA admin shell. Operational data is centered in the Dashboard, Complaints, and Licensees tabs.</div>
                <div style={{ marginTop: 18, color: '#94a3b8', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>{today}</div>
              </div>
            )}
          </div>
        </main>
      </div>

      {selectedItem && (
        <div onClick={closeReviewPanel} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 1999 }} />
      )}

      {selectedItem && (
        <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 480, background: 'white', boxShadow: '-8px 0 32px rgba(0,0,0,0.12)', zIndex: 2000, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          <div style={{ padding: '24px 28px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 11, color: '#6b7280', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', margin: 0, fontFamily: 'Inter, sans-serif' }}>
                {itemType === 'complaint' ? 'Complaint Review' : 'Licence Application Review'}
              </p>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111', margin: '4px 0 0', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{selectedItem.ref}</h3>
            </div>
            <button
              type="button"
              onClick={closeReviewPanel}
              style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, padding: '8px 12px', cursor: 'pointer', fontSize: 18, color: '#666' }}
            >
              x
            </button>
          </div>

          {itemType === 'complaint' && (
            <div style={{ padding: '24px 28px', flex: 1 }}>
              {[
                ['Complainant', selectedItem.name],
                ['Phone', selectedItem.phone],
                ['Location', selectedItem.location],
                ['Service Provider', selectedItem.isp],
                ['Category', selectedItem.category],
                ['Date Filed', selectedItem.date],
                ['Priority', selectedItem.priority],
                ['Contacted Provider', selectedItem.contactedProvider || 'Yes'],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: 13, color: '#6b7280', fontFamily: 'Inter, sans-serif' }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#111', textAlign: 'right', fontFamily: 'Inter, sans-serif' }}>{value}</span>
                </div>
              ))}

              <div style={{ marginTop: 16 }}>
                <p style={{ fontSize: 11, color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>Description</p>
                <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6, background: '#f8f9fa', borderRadius: 10, padding: 16, margin: 0, fontFamily: 'Inter, sans-serif' }}>{selectedItem.description}</p>
              </div>

              <div style={{ marginTop: 20 }}>
                <p style={{ fontSize: 11, color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>Officer Notes</p>
                <textarea
                  placeholder="Add investigation notes..."
                  rows={3}
                  style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 10, padding: 12, fontSize: 14, resize: 'none', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }}
                />
              </div>

              <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button
                  type="button"
                  onClick={() => {
                    updateStatus(selectedItem.ref, 'Under Review')
                    closeReviewPanel()
                  }}
                  style={{ background: '#1A3A6B', color: 'white', border: 'none', borderRadius: 50, padding: '12px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
                >
                  Mark as Under Review
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateStatus(selectedItem.ref, 'Resolved')
                    closeReviewPanel()
                  }}
                  style={{ background: '#0F6E56', color: 'white', border: 'none', borderRadius: 50, padding: '12px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
                >
                  Resolve Complaint
                </button>
                <button
                  type="button"
                  onClick={closeReviewPanel}
                  style={{ background: 'white', color: '#dc2626', border: '1px solid #fecaca', borderRadius: 50, padding: '12px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
                >
                  Dismiss / Close
                </button>
              </div>
            </div>
          )}

          {itemType === 'licence' && (
            <div style={{ padding: '24px 28px', flex: 1 }}>
              {[
                ['Company', selectedItem.company || selectedItem.operator],
                ['Licence Type', selectedItem.type || selectedItem.licenceType],
                ['Coverage', selectedItem.coverage || selectedItem.coverageType || 'National'],
                ['Date Applied', selectedItem.date || selectedItem.issued],
                ['Annual Fee', selectedItem.fee || feeForType(selectedItem.type || selectedItem.licenceType || '')],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: 13, color: '#6b7280', fontFamily: 'Inter, sans-serif' }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#111', textAlign: 'right', fontFamily: 'Inter, sans-serif' }}>{value}</span>
                </div>
              ))}

              <div style={{ marginTop: 20, background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 12, padding: 16 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#92400e', margin: '0 0 8px', fontFamily: 'Inter, sans-serif' }}>Payment Verification Required</p>
                <p style={{ fontSize: 13, color: '#92400e', margin: 0, fontFamily: 'Inter, sans-serif' }}>Confirm that the applicant has paid the licence fee before approving.</p>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, cursor: 'pointer' }}>
                  <input type="checkbox" checked={paymentConfirmed} onChange={(e) => setPaymentConfirmed(e.target.checked)} />
                  <span style={{ fontSize: 13, color: '#92400e', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>I confirm payment of {selectedItem.fee || feeForType(selectedItem.type || selectedItem.licenceType || '')} has been received</span>
                </label>
              </div>

              <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button
                  type="button"
                  disabled={!paymentConfirmed}
                  onClick={() => {
                    approvePendingApplication(selectedItem.ref)
                    closeReviewPanel()
                  }}
                  style={{ background: paymentConfirmed ? '#0F6E56' : '#e5e7eb', color: paymentConfirmed ? 'white' : '#9ca3af', border: 'none', borderRadius: 50, padding: '12px', fontSize: 14, fontWeight: 600, cursor: paymentConfirmed ? 'pointer' : 'not-allowed', transition: 'all 0.2s', fontFamily: 'Inter, sans-serif' }}
                >
                  Approve & Issue Licence
                </button>
                <button
                  type="button"
                  onClick={() => {
                    rejectPendingApplication(selectedItem.ref)
                    closeReviewPanel()
                  }}
                  style={{ background: 'white', color: '#dc2626', border: '1px solid #fecaca', borderRadius: 50, padding: '12px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
                >
                  Reject Application
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
