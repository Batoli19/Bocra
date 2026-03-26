import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Building2, Check, CheckCircle, CheckCircle2, Globe, Landmark, Mail, Radio, Search, Shield, User, Wifi } from 'lucide-react'
import PageWrapper from '../components/shared/PageWrapper'

const tabs = [
  { id: 'finder', label: 'Find My Licence' },
  { id: 'apply', label: 'Apply' },
  { id: 'track', label: 'Track Application' },
  { id: 'verify', label: 'Verify & Registry' },
]

const applicantOptions = [
  { value: 'individual', label: 'Individual / Sole Trader' },
  { value: 'company', label: 'Registered Company' },
  { value: 'government', label: 'Government / Parastatal' },
]

const applicantCardMeta = {
  individual: {
    icon: User,
    description:
      'A private citizen or sole proprietor applying for a personal or small business communications licence.',
  },
  company: {
    icon: Building2,
    description:
      'A registered Botswana company (CIPA) applying for a commercial telecoms, broadcasting, or postal licence.',
  },
  government: {
    icon: Landmark,
    description:
      'A government ministry, department, or state-owned enterprise requiring a communications authorisation.',
  },
}

const serviceOptions = [
  { value: 'telecom', label: 'Mobile/Telecom Network' },
  { value: 'isp', label: 'Internet Service Provider' },
  { value: 'radio', label: 'Radio Broadcasting' },
  { value: 'tv', label: 'TV Broadcasting' },
  { value: 'postal', label: 'Postal/Courier Service' },
  { value: 'device', label: 'Device Importing/Selling' },
]

const serviceCardMeta = {
  isp: {
    icon: Wifi,
    title: 'Internet Service Provider',
    description: 'Provide fixed or mobile internet services to consumers or businesses in Botswana.',
    fee: 'P 15,000',
  },
  radio: {
    icon: Radio,
    title: 'Broadcasting Licence',
    description: 'Operate a radio station, TV channel, or community broadcasting service.',
    fee: 'P 25,000',
  },
  postal: {
    icon: Mail,
    title: 'Postal / Courier Service',
    description: 'Operate a Class A or Class B postal or courier delivery service.',
    fee: 'P 12,000',
  },
  telecom: {
    icon: Globe,
    title: 'MVNO / Telecom Operator',
    description: 'Mobile Virtual Network Operator or full telecommunications service provider.',
    fee: 'P 50,000',
  },
  tv: {
    icon: Radio,
    title: 'Television Broadcasting',
    description: 'Operate a television, satellite, or specialist broadcast service in Botswana.',
    fee: 'P 25,000',
  },
  device: {
    icon: Shield,
    title: 'Type Approval Certificate',
    description: 'Import, distribute, or sell communications equipment requiring BOCRA compliance approval.',
    fee: 'P 2,500',
  },
}

const coverageOptions = [
  { value: 'local', label: 'Local (one district)' },
  { value: 'regional', label: 'Regional (multiple districts)' },
  { value: 'national', label: 'National' },
]

const licenceMap = {
  'company-telecom-national': {
    name: 'Class 1 Network Operator Licence',
    licenceClass: 'Class 1 Telecommunications Licence',
    fee: 'BWP 250,000',
    days: '90',
    docs: ['CIPA Certificate', 'PPRA Registration', 'Tax Clearance', 'Technical Network Plan', 'Financial Statements'],
  },
  'company-telecom-regional': {
    name: 'Class 2 Telecommunications Licence',
    licenceClass: 'Class 2 Telecommunications Licence',
    fee: 'BWP 75,000',
    days: '60',
    docs: ['CIPA Certificate', 'PPRA Registration', 'Tax Clearance', 'Technical Plan'],
  },
  'company-isp-national': {
    name: 'Internet Service Provider Licence',
    licenceClass: 'Internet Service Provider Authorisation',
    fee: 'BWP 50,000',
    days: '45',
    docs: ['CIPA Certificate', 'Tax Clearance', 'Technical Infrastructure Plan', 'Security Policy Document'],
  },
  'company-radio-national': {
    name: 'Commercial Radio Broadcasting Licence',
    licenceClass: 'Commercial Broadcasting Licence',
    fee: 'BWP 30,000',
    days: '60',
    docs: ['CIPA Certificate', 'Content Policy', 'Technical Frequency Plan', 'Editorial Policy'],
  },
  'company-tv-national': {
    name: 'Television Broadcasting Licence',
    licenceClass: 'National Television Broadcasting Licence',
    fee: 'BWP 85,000',
    days: '90',
    docs: ['CIPA Certificate', 'Content Policy', 'Technical Plan', 'Financial Capacity Proof'],
  },
  'company-postal-national': {
    name: 'Postal/Courier Operator Licence',
    licenceClass: 'National Postal Operator Licence',
    fee: 'BWP 12,000',
    days: '30',
    docs: ['CIPA Certificate', 'Tax Clearance', 'Operations Plan'],
  },
  'individual-device-local': {
    name: 'Type Approval Certificate',
    licenceClass: 'Type Approval / Device Compliance',
    fee: 'BWP 2,500',
    days: '21',
    docs: ['Omang Copy', 'Device Technical Specifications', 'Import Permit'],
  },
}

const defaultLicence = {
  name: 'Class 3 Service Licence',
  licenceClass: 'Class 3 Service Licence',
  fee: 'BWP 8,500',
  days: '30',
  docs: ['CIPA Certificate', 'Tax Clearance', 'Business Plan'],
}

const licenceOptions = [
  'Class 1 Network Operator Licence',
  'Class 2 Telecommunications Licence',
  'Internet Service Provider Licence',
  'Commercial Radio Broadcasting Licence',
  'Television Broadcasting Licence',
  'Postal/Courier Operator Licence',
  'Type Approval Certificate',
  'Class 3 Service Licence',
]

const applicationSteps = [
  { number: 1, label: 'Business Details' },
  { number: 2, label: 'Technical & Coverage' },
  { number: 3, label: 'Review & Fee' },
]

const finderSteps = [
  { number: 1, label: 'Who are you?' },
  { number: 2, label: 'Licence type' },
  { number: 3, label: 'Requirements' },
]

const licenceOverviewItems = [
  {
    icon: Wifi,
    title: 'Internet & Telecoms',
    description: 'ISP, MVNO, and telecoms operator licences',
    to: '/licensing',
  },
  {
    icon: Radio,
    title: 'Broadcasting',
    description: 'Radio, TV, community and satellite broadcasting',
    to: '/licensing',
  },
  {
    icon: Mail,
    title: 'Postal Services',
    description: 'Class A and Class B courier and postal operators',
    to: '/licensing',
  },
  {
    icon: Shield,
    title: 'Special Authorisations',
    description: 'Amateur radio, type approval, spectrum licences',
    to: '/documents',
  },
]

const trackingSteps = [
  'Application Received',
  'Document Verification',
  'Technical Assessment',
  'Fee Invoice Sent',
  'Licence Issued',
]

const mockApplications = [
  {
    ref: 'APP-BOCRA-2026-0042',
    company: 'Kgosi Tech Solutions',
    type: 'Internet Service Provider Licence',
    status: 'Technical Assessment',
    date: '2026-03-01',
    officer: 'Officer Mpho K.',
  },
  {
    ref: 'APP-BOCRA-2026-0078',
    company: 'Motswana Broadcasting Co',
    type: 'Commercial Radio Licence',
    status: 'Document Verification',
    date: '2026-03-15',
    officer: 'Officer Thato M.',
  },
]

const registry = [
  { operator: 'Mascom Wireless', type: 'Telecommunications', class: 'Class 1', coverage: 'National', issued: '2018-04-01', expires: '2028-03-31', status: 'Active' },
  { operator: 'Orange Botswana', type: 'Telecommunications', class: 'Class 1', coverage: 'National', issued: '2018-04-01', expires: '2028-03-31', status: 'Active' },
  { operator: 'BeMobile', type: 'Telecommunications', class: 'Class 2', coverage: 'National', issued: '2019-06-15', expires: '2027-06-14', status: 'Active' },
  { operator: 'BTC', type: 'Telecommunications', class: 'Class 1', coverage: 'National', issued: '2013-04-01', expires: '2026-03-31', status: 'Renewal Pending' },
  { operator: 'Botswana Television', type: 'Broadcasting', class: 'TV', coverage: 'National', issued: '2015-01-01', expires: '2027-12-31', status: 'Active' },
  { operator: 'Yarona FM', type: 'Broadcasting', class: 'Radio', coverage: 'National', issued: '2016-03-15', expires: '2026-03-14', status: 'Renewal Pending' },
  { operator: 'DStv Botswana', type: 'Broadcasting', class: 'Cable TV', coverage: 'National', issued: '2014-07-01', expires: '2027-06-30', status: 'Active' },
  { operator: 'InfoCom', type: 'Internet Service Provider', class: 'ISP', coverage: 'National', issued: '2020-09-01', expires: '2025-08-31', status: 'Expired' },
  { operator: 'Botswana Post', type: 'Postal Services', class: 'National Postal', coverage: 'National', issued: '2013-04-01', expires: '2028-03-31', status: 'Active' },
  { operator: 'FedEx Botswana', type: 'Postal Services', class: 'Courier', coverage: 'National', issued: '2017-11-01', expires: '2027-10-31', status: 'Active' },
]

const inputStyle = {
  width: '100%',
  padding: '13px 16px',
  border: '1px solid #d1d5db',
  borderRadius: 14,
  fontSize: 15,
  color: '#111827',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'Inter, sans-serif',
  background: '#ffffff',
}

const labelStyle = {
  display: 'block',
  marginBottom: 8,
  color: '#111827',
  fontSize: 14,
  fontWeight: 600,
  fontFamily: 'Inter, sans-serif',
}

const primaryButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  border: 'none',
  borderRadius: 999,
  padding: '14px 22px',
  background: '#1A3A6B',
  color: '#ffffff',
  fontSize: 15,
  fontWeight: 700,
  cursor: 'pointer',
  textDecoration: 'none',
  fontFamily: 'Inter, sans-serif',
}

const secondaryButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  border: '1px solid #d1d5db',
  borderRadius: 999,
  padding: '14px 22px',
  background: '#ffffff',
  color: '#111827',
  fontSize: 15,
  fontWeight: 600,
  cursor: 'pointer',
  textDecoration: 'none',
  fontFamily: 'Inter, sans-serif',
}

const typeFilterOptions = ['All', 'Telecommunications', 'Broadcasting', 'Postal', 'ISP']

const statusBadgeStyles = {
  Active: { background: '#dcfce7', color: '#166534', border: '#bbf7d0' },
  'Renewal Pending': { background: '#fef3c7', color: '#b45309', border: '#fcd34d' },
  Expired: { background: '#fee2e2', color: '#b91c1c', border: '#fecaca' },
  'Application Received': { background: '#dbeafe', color: '#1d4ed8', border: '#bfdbfe' },
  'Document Verification': { background: '#fef3c7', color: '#92400e', border: '#fde68a' },
  'Technical Assessment': { background: '#ede9fe', color: '#6d28d9', border: '#ddd6fe' },
  'Fee Invoice Sent': { background: '#cffafe', color: '#0f766e', border: '#99f6e4' },
  'Licence Issued': { background: '#dcfce7', color: '#166534', border: '#bbf7d0' },
}

function TileButton({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        border: selected ? '2px solid #1A3A6B' : '1px solid #e5e7eb',
        background: selected ? '#f0f7ff' : '#ffffff',
        color: '#111827',
        borderRadius: 20,
        padding: '22px 18px',
        minHeight: 96,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 700,
        cursor: 'pointer',
        boxShadow: selected ? '0 12px 32px rgba(26,58,107,0.08)' : 'none',
        transition: 'all 0.2s ease',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {label}
    </button>
  )
}

function ChoiceCard({ title, description, icon: Icon, selected, onClick, fee }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`licensing-choice-card${selected ? ' is-selected' : ''}`}
      style={{ minHeight: fee ? 228 : 216 }}
    >
      {selected && (
        <span className="licensing-choice-badge">
          <Check size={12} />
        </span>
      )}
      <span className="licensing-choice-icon-box">
        <Icon size={22} />
      </span>
      <span className="licensing-choice-title">{title}</span>
      <span className="licensing-choice-description">{description}</span>
      {fee && <span className="licensing-choice-fee">{fee}</span>}
    </button>
  )
}

function Stepper({ currentStep, steps = applicationSteps }) {
  return (
    <div style={{ marginBottom: 42 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        {steps.map((item, index) => {
          const isActive = currentStep === item.number
          const isCompleted = typeof currentStep === 'number' && currentStep > item.number
          const fill = isCompleted ? '#0F6E56' : isActive ? '#1A3A6B' : '#d1d5db'

          return (
            <div key={item.number} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div style={{ display: 'grid', justifyItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: fill,
                    color: '#ffffff',
                    fontSize: 14,
                    fontWeight: 700,
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {isCompleted ? <Check size={16} /> : item.number}
                </div>
                <span
                  style={{
                    color: isActive || isCompleted ? '#111827' : '#9ca3af',
                    fontSize: 12,
                    fontWeight: 600,
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {item.label}
                </span>
              </div>
              {index < applicationSteps.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: 2,
                    margin: '0 12px 28px',
                    background: typeof currentStep === 'number' && currentStep > item.number ? '#0F6E56' : '#e5e7eb',
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function FormField({ label, children }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  )
}

function TrackingTimelineStep({ label, description, done, current, isLast }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: done ? '#16a34a' : current ? '#1A3A6B' : '#ffffff',
            border: done ? '1px solid #16a34a' : current ? '1px solid #1A3A6B' : '2px solid #d1d5db',
            marginTop: 4,
            boxSizing: 'border-box',
          }}
        />
        {!isLast && (
          <div
            style={{
              width: 2,
              flex: 1,
              minHeight: 44,
              marginTop: 8,
              background: done ? '#16a34a' : 'transparent',
              borderLeft: done ? 'none' : '2px dashed #d1d5db',
            }}
          />
        )}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : 22 }}>
        <div style={{ color: '#111827', fontSize: 15, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>{label}</div>
        <div style={{ marginTop: 4, color: '#6b7280', fontSize: 13, lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
          {description}
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }) {
  const style = statusBadgeStyles[status] || { background: '#f3f4f6', color: '#374151', border: '#e5e7eb' }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 999,
        padding: '7px 12px',
        border: `1px solid ${style.border}`,
        background: style.background,
        color: style.color,
        fontSize: 12,
        fontWeight: 700,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {status}
    </span>
  )
}

function getTrackingIndex(status) {
  const index = trackingSteps.indexOf(status)
  return index === -1 ? 0 : index
}

function resolveTypeFilter(entry, filterType) {
  if (filterType === 'All') {
    return true
  }

  if (filterType === 'Postal') {
    return entry.type === 'Postal Services'
  }

  if (filterType === 'ISP') {
    return entry.type === 'Internet Service Provider'
  }

  return entry.type === filterType
}

export default function LicensingPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('finder')

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('bocra_user') || 'null')
    if (activeTab === 'apply' && !user) {
      navigate('/login?redirect=/licensing')
    }
  }, [activeTab, navigate])

  const [q1, setQ1] = useState('')
  const [q2, setQ2] = useState('')
  const [q3, setQ3] = useState('')
  const [result, setResult] = useState(null)
  const [appStep, setAppStep] = useState(1)
  const [appConsent, setAppConsent] = useState(false)
  const [submittedReference, setSubmittedReference] = useState('')
  const [submittedApplications, setSubmittedApplications] = useState([])
  const [appData, setAppData] = useState({
    legalBusinessName: '',
    registrationNumber: '',
    ppraNumber: '',
    taxClearanceNumber: '',
    physicalAddress: '',
    contactPersonName: '',
    contactPhone: '',
    contactEmail: '',
    licenceType: '',
    serviceArea: '',
    infrastructureDescription: '',
    customerEstimate: '',
    coverageType: '',
    usesSpectrum: 'No',
    frequencyRange: '',
  })
  const [trackQuery, setTrackQuery] = useState('')
  const [trackedApplication, setTrackedApplication] = useState(null)
  const [trackNotFound, setTrackNotFound] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('All')
  const [registryChecked, setRegistryChecked] = useState(false)

  useEffect(() => {
    if (!q1 || !q2 || !q3) {
      setResult(null)
      return
    }

    const key = `${q1}-${q2}-${q3}`
    setResult(licenceMap[key] || defaultLicence)
  }, [q1, q2, q3])

  const allApplications = [...submittedApplications, ...mockApplications]
  const normalizedRegistryQuery = searchQuery.trim().toLowerCase()
  const registryRows = registry.filter((entry) => {
    const matchesSearch = normalizedRegistryQuery ? entry.operator.toLowerCase().includes(normalizedRegistryQuery) : true
    return matchesSearch && resolveTypeFilter(entry, filterType)
  })
  const verifyMatches = normalizedRegistryQuery
    ? registryRows.some((entry) => entry.status === 'Active' || entry.status === 'Renewal Pending')
    : true

  const updateAppField = (field, value) => {
    setAppData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === 'usesSpectrum' && value === 'No' ? { frequencyRange: '' } : {}),
    }))
  }

  const handleStartApplication = () => {
    navigate('/login?redirect=/portal/apply&force=1')
  }

  const handleTrackSearch = (nextRef) => {
    const candidate = (nextRef ?? trackQuery).trim().toUpperCase()

    if (!candidate) {
      setTrackQuery('')
      setTrackedApplication(null)
      setTrackNotFound(false)
      return
    }

    setTrackQuery(candidate)
    const match = allApplications.find((application) => application.ref.toUpperCase() === candidate)
    setTrackedApplication(match || null)
    setTrackNotFound(!match)
  }

  const handleVerifySearch = () => {
    setRegistryChecked(Boolean(normalizedRegistryQuery))
  }

  const handleSubmitApplication = () => {
    if (!appConsent) {
      return
    }

    const reference = `APP-BOCRA-2026-${String(Math.floor(1000 + Math.random() * 9000)).padStart(4, '0')}`
    const applicationRecord = {
      ref: reference,
      company: appData.legalBusinessName || 'New Applicant',
      type: appData.licenceType || 'Class 3 Service Licence',
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      ...appData,
    }
    const submittedApplication = {
      ...applicationRecord,
      status: 'Application Received',
      officer: 'Officer assignment pending',
    }

    if (typeof window !== 'undefined') {
      const existingApplications = JSON.parse(localStorage.getItem('bocra_applications') || '[]')
      localStorage.setItem('bocra_applications', JSON.stringify([applicationRecord, ...existingApplications]))
    }

    setSubmittedApplications((prev) => [submittedApplication, ...prev])
    setSubmittedReference(reference)
    setTrackedApplication(submittedApplication)
    setTrackQuery(reference)
    setTrackNotFound(false)
    setAppStep('success')
  }

  const trackingIndex = trackedApplication ? getTrackingIndex(trackedApplication.status) : -1
  const selectedApplicant = applicantOptions.find((option) => option.value === q1)
  const selectedService = serviceOptions.find((option) => option.value === q2)
  const finderStep = !q1 ? 1 : !result ? 2 : 3

  return (
    <PageWrapper fullWidth wrapperStyle={{ background: '#ffffff' }}>
      <>
        <section
          style={{
            background:
              "linear-gradient(rgba(10,22,40,0.26), rgba(10,22,40,0.38)), url('/Gemini_Generated_Image_ot2t2sot2t2sot2t.png') center/cover no-repeat",
            padding: '80px 0 0',
          }}
        >
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
            <p
              style={{
                margin: 0,
                color: 'rgba(255,255,255,0.35)',
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              LICENSING
            </p>
            <h1
              style={{
                margin: '16px 0 0',
                maxWidth: 780,
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Apply, track, and verify BOCRA licences in one place.
            </h1>
            <p
              style={{
                margin: '16px 0 0',
                maxWidth: 600,
                color: 'rgba(255,255,255,0.55)',
                fontSize: 17,
                lineHeight: 1.7,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Use the licence explorer to find the right authorisation, complete your application in guided steps, track progress, and verify active operators in Botswana&apos;s communications sector.
            </p>

            <div
              style={{
                display: 'inline-flex',
                flexWrap: 'wrap',
                gap: 4,
                padding: 6,
                marginTop: 48,
                marginBottom: -32,
                background: '#ffffff',
                borderRadius: 50,
                boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                position: 'relative',
                zIndex: 2,
              }}
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`licensing-hero-tab${isActive ? ' is-active' : ''}`}
                    style={{
                      border: 'none',
                      borderRadius: 50,
                      padding: '10px 22px',
                      background: isActive ? '#1A3A6B' : 'transparent',
                      color: isActive ? '#ffffff' : '#6b7280',
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '72px 24px 88px' }}>

        {activeTab === 'finder' && (
          <section style={{ padding: '64px 0 80px' }}>
            <div style={{ maxWidth: 860, margin: '0 auto' }}>
              <Stepper currentStep={finderStep} steps={finderSteps} />

              <h2
                style={{
                  margin: 0,
                  color: '#111111',
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                What licence do you need?
              </h2>
              <p
                style={{
                  margin: '8px 0 32px',
                  color: '#6b7280',
                  fontSize: 16,
                  lineHeight: 1.7,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Answer 3 quick questions and we&apos;ll tell you exactly which BOCRA licence applies to you.
              </p>

              <div style={{ display: 'grid', gap: 36 }}>
                <div>
                  <h3
                    style={{
                      margin: '0 0 8px',
                      color: '#111111',
                      fontSize: 28,
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    Who are you?
                  </h3>
                  <p style={{ margin: '0 0 32px', color: '#6b7280', fontSize: 16, fontFamily: 'Inter, sans-serif' }}>
                    Select the applicant type that best matches your request.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                    {applicantOptions.map((option) => (
                      <ChoiceCard
                        key={option.value}
                        title={option.label}
                        description={applicantCardMeta[option.value].description}
                        icon={applicantCardMeta[option.value].icon}
                        selected={q1 === option.value}
                        onClick={() => {
                          setQ1(option.value)
                          setQ2('')
                          setQ3('')
                          setResult(null)
                        }}
                      />
                    ))}
                  </div>
                </div>

                {q1 && (
                  <div>
                    <h3
                      style={{
                        margin: '0 0 8px',
                        color: '#111111',
                        fontSize: 28,
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                      }}
                    >
                      Licence type
                    </h3>
                    <p style={{ margin: '0 0 32px', color: '#6b7280', fontSize: 16, fontFamily: 'Inter, sans-serif' }}>
                      Choose the service area you want to license under BOCRA.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                      {serviceOptions.map((option) => {
                        const meta = serviceCardMeta[option.value]
                        return (
                          <ChoiceCard
                            key={option.value}
                            title={meta?.title || option.label}
                            description={meta?.description || option.label}
                            icon={meta?.icon || Globe}
                            fee={meta?.fee}
                            selected={q2 === option.value}
                            onClick={() => {
                              setQ2(option.value)
                              setQ3('')
                              setResult(null)
                            }}
                          />
                        )
                      })}
                    </div>
                  </div>
                )}

                {q2 && (
                  <div>
                    <h3
                      style={{
                        margin: '0 0 8px',
                        color: '#111111',
                        fontSize: 28,
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                      }}
                    >
                      Intended coverage
                    </h3>
                    <p style={{ margin: '0 0 24px', color: '#6b7280', fontSize: 16, fontFamily: 'Inter, sans-serif' }}>
                      Tell us how wide your planned service footprint will be.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                      {coverageOptions.map((option) => (
                        <TileButton key={option.value} label={option.label} selected={q3 === option.value} onClick={() => setQ3(option.value)} />
                      ))}
                    </div>
                  </div>
                )}

                {result && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28, alignItems: 'start' }}>
                    <div>
                      <p style={{ margin: 0, color: '#9ca3af', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                        Recommended licence
                      </p>
                      <h3 style={{ margin: '12px 0 8px', color: '#111111', fontSize: 30, fontWeight: 800, letterSpacing: '-0.03em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {result.name}
                      </h3>
                      <p style={{ margin: 0, color: '#6b7280', fontSize: 16, lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
                        {result.licenceClass}
                      </p>

                      <div style={{ marginTop: 32 }}>
                        <div style={{ color: '#111111', fontSize: 22, fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          What you&apos;ll need
                        </div>
                        <div style={{ marginTop: 18 }}>
                          {result.docs.map((doc) => (
                            <div key={doc} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid #e5e7eb', color: '#111111', fontSize: 15, fontFamily: 'Inter, sans-serif' }}>
                              <CheckCircle2 size={16} color="#0F6E56" />
                              <span>{doc}</span>
                            </div>
                          ))}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid #e5e7eb', color: '#111111', fontSize: 15, fontFamily: 'Inter, sans-serif' }}>
                            <CheckCircle2 size={16} color="#0F6E56" />
                            <span>Application fee: {result.fee.replace('BWP', 'P')}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <aside style={{ background: '#f8f9fa', borderRadius: 16, padding: 28, border: '1px solid #e5e7eb' }}>
                      <p style={{ margin: 0, color: '#9ca3af', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                        Your Selection
                      </p>
                      <div style={{ marginTop: 18, display: 'grid', gap: 14 }}>
                        <div>
                          <div style={{ color: '#6b7280', fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>Entity type</div>
                          <div style={{ marginTop: 4, color: '#111111', fontSize: 16, fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{selectedApplicant?.label}</div>
                        </div>
                        <div>
                          <div style={{ color: '#6b7280', fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>Licence type</div>
                          <div style={{ marginTop: 4, color: '#111111', fontSize: 16, fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{serviceCardMeta[q2]?.title || selectedService?.label}</div>
                        </div>
                      </div>

                      <div style={{ marginTop: 24, color: '#1A3A6B', fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {result.fee.replace('BWP', 'P')}
                      </div>

                      <button type="button" onClick={handleStartApplication} style={{ width: '100%', marginTop: 24, border: 'none', borderRadius: 8, padding: 14, background: '#1A3A6B', color: '#ffffff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                        {'Proceed to Application ->'}
                      </button>
                      <p style={{ margin: '14px 0 0', color: '#9ca3af', fontSize: 12, lineHeight: 1.6, textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
                        You&apos;ll need a BOCRA Connect account to submit your application.
                      </p>
                    </aside>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'apply' && (
          <section style={{ marginTop: 34 }}>
            <div style={{ maxWidth: 860 }}>
              {appStep !== 'success' && <Stepper currentStep={appStep} />}

              {appStep === 1 && (
                <div style={{ border: '1px solid #e5e7eb', borderRadius: 24, padding: '30px clamp(20px, 4vw, 34px)', background: '#ffffff' }}>
                  <p style={{ margin: 0, color: '#9ca3af', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                    Step 1 of 3
                  </p>
                  <h2 style={{ margin: '12px 0 28px', color: '#111111', fontSize: 30, fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Business Details
                  </h2>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
                    <FormField label="Legal Business Name">
                      <input value={appData.legalBusinessName} onChange={(event) => updateAppField('legalBusinessName', event.target.value)} style={inputStyle} />
                    </FormField>
                    <FormField label="Registration Number (CIPA)">
                      <input value={appData.registrationNumber} onChange={(event) => updateAppField('registrationNumber', event.target.value)} style={inputStyle} />
                    </FormField>
                    <FormField label="PPRA Number">
                      <input value={appData.ppraNumber} onChange={(event) => updateAppField('ppraNumber', event.target.value)} style={inputStyle} />
                    </FormField>
                    <FormField label="Tax Clearance Number">
                      <input value={appData.taxClearanceNumber} onChange={(event) => updateAppField('taxClearanceNumber', event.target.value)} style={inputStyle} />
                    </FormField>
                    <FormField label="Physical Address">
                      <input value={appData.physicalAddress} onChange={(event) => updateAppField('physicalAddress', event.target.value)} style={inputStyle} />
                    </FormField>
                    <FormField label="Contact Person Name">
                      <input value={appData.contactPersonName} onChange={(event) => updateAppField('contactPersonName', event.target.value)} style={inputStyle} />
                    </FormField>
                    <FormField label="Contact Phone">
                      <input value={appData.contactPhone} onChange={(event) => updateAppField('contactPhone', event.target.value)} style={inputStyle} />
                    </FormField>
                    <FormField label="Contact Email">
                      <input type="email" value={appData.contactEmail} onChange={(event) => updateAppField('contactEmail', event.target.value)} style={inputStyle} />
                    </FormField>
                  </div>

                  <div style={{ marginTop: 18 }}>
                    <FormField label="Licence Type applying for">
                      <select value={appData.licenceType} onChange={(event) => updateAppField('licenceType', event.target.value)} style={inputStyle}>
                        <option value="">Select licence type</option>
                        {licenceOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </FormField>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 28 }}>
                    <button type="button" onClick={() => setAppStep(2)} style={primaryButtonStyle}>
                      {'Continue ->'}
                    </button>
                  </div>
                </div>
              )}

              {appStep === 2 && (
                <div style={{ border: '1px solid #e5e7eb', borderRadius: 24, padding: '30px clamp(20px, 4vw, 34px)', background: '#ffffff' }}>
                  <p style={{ margin: 0, color: '#9ca3af', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                    Step 2 of 3
                  </p>
                  <h2 style={{ margin: '12px 0 28px', color: '#111111', fontSize: 30, fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Technical &amp; Coverage
                  </h2>

                  <div style={{ display: 'grid', gap: 18 }}>
                    <FormField label="Proposed service area">
                      <input value={appData.serviceArea} onChange={(event) => updateAppField('serviceArea', event.target.value)} style={inputStyle} />
                    </FormField>

                    <FormField label="Technical infrastructure description">
                      <textarea
                        rows={5}
                        value={appData.infrastructureDescription}
                        onChange={(event) => updateAppField('infrastructureDescription', event.target.value)}
                        style={{ ...inputStyle, resize: 'vertical', minHeight: 140 }}
                      />
                    </FormField>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
                      <FormField label="Estimated number of customers">
                        <input value={appData.customerEstimate} onChange={(event) => updateAppField('customerEstimate', event.target.value)} style={inputStyle} />
                      </FormField>

                      <FormField label="Coverage type">
                        <select value={appData.coverageType} onChange={(event) => updateAppField('coverageType', event.target.value)} style={inputStyle}>
                          <option value="">Select coverage type</option>
                          <option value="Local">Local</option>
                          <option value="Regional">Regional</option>
                          <option value="National">National</option>
                        </select>
                      </FormField>
                    </div>

                    <FormField label="Will you be using radio frequency spectrum?">
                      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                        {['Yes', 'No'].map((choice) => {
                          const selected = appData.usesSpectrum === choice
                          return (
                            <button
                              key={choice}
                              type="button"
                              onClick={() => updateAppField('usesSpectrum', choice)}
                              style={{
                                border: selected ? '1px solid #1A3A6B' : '1px solid #d1d5db',
                                borderRadius: 999,
                                padding: '10px 18px',
                                background: selected ? '#1A3A6B' : '#ffffff',
                                color: selected ? '#ffffff' : '#111827',
                                fontSize: 14,
                                fontWeight: 700,
                                cursor: 'pointer',
                                fontFamily: 'Inter, sans-serif',
                              }}
                            >
                              {choice}
                            </button>
                          )
                        })}
                      </div>
                    </FormField>

                    {appData.usesSpectrum === 'Yes' && (
                      <FormField label="Frequency range">
                        <input value={appData.frequencyRange} onChange={(event) => updateAppField('frequencyRange', event.target.value)} style={inputStyle} />
                      </FormField>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between', flexWrap: 'wrap', marginTop: 28 }}>
                    <button type="button" onClick={() => setAppStep(1)} style={secondaryButtonStyle}>
                      &lt;- Back
                    </button>
                    <button type="button" onClick={() => setAppStep(3)} style={primaryButtonStyle}>
                      {'Continue ->'}
                    </button>
                  </div>
                </div>
              )}

              {appStep === 3 && (
                <div style={{ border: '1px solid #e5e7eb', borderRadius: 24, padding: '30px clamp(20px, 4vw, 34px)', background: '#ffffff' }}>
                  <p style={{ margin: 0, color: '#9ca3af', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                    Step 3 of 3
                  </p>
                  <h2 style={{ margin: '12px 0 10px', color: '#111111', fontSize: 30, fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Review &amp; Fee
                  </h2>
                  <p style={{ margin: '0 0 24px', color: '#6b7280', fontSize: 15, lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
                    Confirm your details before BOCRA issues the application reference.
                  </p>

                  <div style={{ border: '1px solid #e5e7eb', borderRadius: 18, padding: 24 }}>
                    {[
                      ['Legal Business Name', appData.legalBusinessName || 'Not provided'],
                      ['Registration Number (CIPA)', appData.registrationNumber || 'Not provided'],
                      ['PPRA Number', appData.ppraNumber || 'Not provided'],
                      ['Tax Clearance Number', appData.taxClearanceNumber || 'Not provided'],
                      ['Physical Address', appData.physicalAddress || 'Not provided'],
                      ['Contact Person Name', appData.contactPersonName || 'Not provided'],
                      ['Contact Phone', appData.contactPhone || 'Not provided'],
                      ['Contact Email', appData.contactEmail || 'Not provided'],
                      ['Licence Type', appData.licenceType || 'Not selected'],
                      ['Proposed service area', appData.serviceArea || 'Not provided'],
                      ['Technical infrastructure description', appData.infrastructureDescription || 'Not provided'],
                      ['Estimated number of customers', appData.customerEstimate || 'Not provided'],
                      ['Coverage type', appData.coverageType || 'Not selected'],
                      ['Using radio frequency spectrum', appData.usesSpectrum],
                      ['Frequency range', appData.usesSpectrum === 'Yes' ? appData.frequencyRange || 'Not provided' : 'Not applicable'],
                    ].map(([label, value], index, items) => (
                      <div key={label}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'flex-start' }}>
                          <span style={{ color: '#6b7280', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>{label}</span>
                          <span style={{ color: '#111111', fontSize: 14, fontWeight: 700, textAlign: 'right', whiteSpace: 'pre-wrap', fontFamily: 'Inter, sans-serif' }}>
                            {value}
                          </span>
                        </div>
                        {index < items.length - 1 && <div style={{ height: 1, background: '#e5e7eb', margin: '14px 0' }} />}
                      </div>
                    ))}
                  </div>

                  <div style={{ background: '#f0f7ff', border: '1px solid #bfdbfe', borderRadius: 16, padding: 24, marginTop: 24 }}>
                    <div style={{ display: 'grid', gap: 10, color: '#1f2937', fontSize: 15, fontFamily: 'Inter, sans-serif' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18 }}>
                        <span>Application Fee:</span>
                        <strong>BWP 50,000</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18 }}>
                        <span>Processing Fee:</span>
                        <strong>BWP 2,500</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18 }}>
                        <span>Annual Licence Fee:</span>
                        <strong>BWP 15,000</strong>
                      </div>
                    </div>
                    <div style={{ height: 1, background: '#93c5fd', margin: '18px 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18, color: '#1A3A6B', fontSize: 20, fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      <span>Total Due:</span>
                      <span>BWP 67,500</span>
                    </div>
                    <p style={{ margin: '14px 0 0', color: '#1e3a8a', fontSize: 14, lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
                      Payment will be collected upon approval. You will receive an invoice via email.
                    </p>
                  </div>

                  <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginTop: 24, color: '#374151', fontSize: 14, lineHeight: 1.7, fontFamily: 'Inter, sans-serif', cursor: 'pointer' }}>
                    <input type="checkbox" checked={appConsent} onChange={(event) => setAppConsent(event.target.checked)} style={{ marginTop: 3 }} />
                    <span>I confirm the information supplied is accurate and I authorise BOCRA to process this licensing application.</span>
                  </label>

                  <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between', flexWrap: 'wrap', marginTop: 24 }}>
                    <button type="button" onClick={() => setAppStep(2)} style={secondaryButtonStyle}>
                      &lt;- Edit
                    </button>
                    <button type="button" onClick={handleSubmitApplication} style={primaryButtonStyle}>
                      {'Submit Application ->'}
                    </button>
                  </div>
                </div>
              )}

              {appStep === 'success' && (
                <div style={{ border: '1px solid #e5e7eb', borderRadius: 24, padding: '42px clamp(20px, 4vw, 34px)', background: '#ffffff', textAlign: 'center' }}>
                  <div style={{ width: 80, height: 80, background: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                    <CheckCircle size={42} color="#16a34a" />
                  </div>
                  <h2 style={{ margin: '24px 0 10px', color: '#111111', fontSize: 34, fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Application Submitted
                  </h2>
                  <p style={{ margin: 0, color: '#6b7280', fontSize: 15, lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
                    Your licensing request has been received. BOCRA will review your submission and contact you if additional documents are required.
                  </p>

                  <div style={{ background: '#f8fafc', borderRadius: 16, padding: 22, marginTop: 24 }}>
                    <p style={{ margin: 0, color: '#9ca3af', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                      APPLICATION REFERENCE
                    </p>
                    <p style={{ margin: '10px 0 8px', color: '#1A3A6B', fontSize: 30, fontWeight: 800, letterSpacing: '1px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {submittedReference}
                    </p>
                    <p style={{ margin: 0, color: '#6b7280', fontSize: 13, fontFamily: 'Inter, sans-serif' }}>
                      Use this number to track your application status.
                    </p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('track')
                        handleTrackSearch(submittedReference)
                      }}
                      style={primaryButtonStyle}
                    >
                      {'Track Your Application ->'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {activeTab === 'track' && (
          <section style={{ marginTop: 34 }}>
            <div style={{ maxWidth: 760 }}>
              <p style={{ margin: 0, color: '#9ca3af', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                APPLICATION TRACKER
              </p>
              <h2 style={{ margin: '12px 0 10px', fontSize: 36, fontWeight: 800, color: '#111111', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Track Application
              </h2>
              <p style={{ margin: 0, color: '#6b7280', fontSize: 15, lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
                Enter your BOCRA application reference to see the latest licensing status.
              </p>

              <div style={{ display: 'flex', gap: 12, marginTop: 30, marginBottom: 12, flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: 260 }}>
                  <Search size={18} color="#9ca3af" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    value={trackQuery}
                    onChange={(event) => setTrackQuery(event.target.value)}
                    placeholder="e.g. APP-BOCRA-2026-0042"
                    style={{ ...inputStyle, borderRadius: 999, paddingLeft: 46 }}
                    onKeyDown={(event) => event.key === 'Enter' && handleTrackSearch()}
                  />
                </div>
                <button type="button" onClick={() => handleTrackSearch()} style={primaryButtonStyle}>
                  Track
                </button>
              </div>

              <p style={{ margin: '0 0 34px', color: '#9ca3af', fontSize: 13, lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
                Try: APP-BOCRA-2026-0042 · APP-BOCRA-2026-0078
              </p>

              {trackNotFound && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 14, padding: 20, color: '#b91c1c', fontSize: 14, lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
                  No application found with this reference number. Please check the reference and try again.
                </div>
              )}

              {trackedApplication && (
                <div style={{ border: '1px solid #e5e7eb', borderRadius: 20, overflow: 'hidden', background: '#ffffff' }}>
                  <div style={{ background: '#1A3A6B', padding: '22px 28px', color: '#ffffff', display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>Application</div>
                      <div style={{ marginTop: 6, fontSize: 24, fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{trackedApplication.ref}</div>
                    </div>
                    <StatusBadge status={trackedApplication.status} />
                  </div>

                  <div style={{ padding: 28 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 18 }}>
                      {[
                        ['Applicant', trackedApplication.company],
                        ['Licence Type', trackedApplication.type],
                        ['Submitted', trackedApplication.date],
                        ['Assigned Officer', trackedApplication.officer],
                      ].map(([label, value]) => (
                        <div key={label}>
                          <div style={{ color: '#9ca3af', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                            {label}
                          </div>
                          <div style={{ marginTop: 8, color: '#111827', fontSize: 15, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>{value}</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginTop: 32 }}>
                      <div style={{ color: '#111827', fontSize: 18, fontWeight: 800, marginBottom: 18, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Application Journey
                      </div>
                      {trackingSteps.map((step, index) => (
                        <TrackingTimelineStep
                          key={step}
                          label={step}
                          description={
                            step === 'Application Received'
                              ? 'BOCRA has logged your application and reference number.'
                              : step === 'Document Verification'
                                ? 'Submitted documents are being checked for completeness.'
                                : step === 'Technical Assessment'
                                  ? 'Technical and regulatory review is underway.'
                                  : step === 'Fee Invoice Sent'
                                    ? 'An invoice has been prepared and issued to the applicant.'
                                    : 'Your licence certificate is ready for issuance.'
                          }
                          done={index <= trackingIndex}
                          current={index === trackingIndex}
                          isLast={index === trackingSteps.length - 1}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {activeTab === 'verify' && (
          <section style={{ marginTop: 34 }}>
            <div style={{ display: 'grid', gap: 26 }}>
              <div style={{ border: '1px solid #e5e7eb', borderRadius: 24, padding: '30px clamp(20px, 4vw, 34px)', background: '#ffffff' }}>
                <h2 style={{ margin: 0, color: '#111111', fontSize: 32, fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Is this operator licensed?
                </h2>
                <p style={{ margin: '10px 0 0', color: '#6b7280', fontSize: 16, lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
                  Enter an operator name or licence number to verify their registration.
                </p>

                <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
                  <div style={{ position: 'relative', flex: 1, minWidth: 260 }}>
                    <Search size={18} color="#9ca3af" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      value={searchQuery}
                      onChange={(event) => {
                        setSearchQuery(event.target.value)
                        setRegistryChecked(false)
                      }}
                      placeholder="Search operator name"
                      style={{ ...inputStyle, borderRadius: 999, paddingLeft: 46 }}
                      onKeyDown={(event) => event.key === 'Enter' && handleVerifySearch()}
                    />
                  </div>
                  <button type="button" onClick={handleVerifySearch} style={primaryButtonStyle}>
                    Verify
                  </button>
                </div>

                {!verifyMatches && registryChecked && (
                  <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 14, padding: 18, marginTop: 18, color: '#b91c1c', fontSize: 14, lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
                    No active licence found for this operator. <Link to="/portal/complaint/new" style={{ color: '#b91c1c', fontWeight: 700 }}>Report an unlicensed operator -&gt;</Link>
                  </div>
                )}
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: 18 }}>
                  <div>
                    <p style={{ margin: 0, color: '#9ca3af', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                      ACTIVE LICENCE REGISTRY
                    </p>
                    <p style={{ margin: '10px 0 0', color: '#6b7280', fontSize: 15, lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
                      All licensed operators in Botswana&apos;s communications sector
                    </p>
                  </div>

                  <div style={{ minWidth: 220 }}>
                    <label style={{ ...labelStyle, marginBottom: 6 }}>Filter by type</label>
                    <select value={filterType} onChange={(event) => setFilterType(event.target.value)} style={inputStyle}>
                      {typeFilterOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ border: '1px solid #e5e7eb', borderRadius: 16, overflow: 'hidden', background: '#ffffff' }}>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 960 }}>
                      <thead>
                        <tr style={{ background: '#f8fafc' }}>
                          {['Operator', 'Licence Type', 'Class', 'Coverage', 'Issued', 'Expires', 'Status'].map((heading) => (
                            <th
                              key={heading}
                              style={{
                                textAlign: 'left',
                                padding: '16px 18px',
                                borderBottom: '1px solid #e5e7eb',
                                color: '#374151',
                                fontSize: 13,
                                fontWeight: 700,
                                fontFamily: 'Inter, sans-serif',
                              }}
                            >
                              {heading}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {registryRows.map((entry) => {
                          const isHighlighted = registryChecked && normalizedRegistryQuery && entry.operator.toLowerCase().includes(normalizedRegistryQuery)

                          return (
                            <tr key={`${entry.operator}-${entry.expires}`} style={{ background: isHighlighted ? '#eff6ff' : '#ffffff' }}>
                              <td style={{ padding: '16px 18px', borderBottom: '1px solid #f1f5f9', color: '#111827', fontSize: 14, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>{entry.operator}</td>
                              <td style={{ padding: '16px 18px', borderBottom: '1px solid #f1f5f9', color: '#374151', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>{entry.type}</td>
                              <td style={{ padding: '16px 18px', borderBottom: '1px solid #f1f5f9', color: '#374151', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>{entry.class}</td>
                              <td style={{ padding: '16px 18px', borderBottom: '1px solid #f1f5f9', color: '#374151', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>{entry.coverage}</td>
                              <td style={{ padding: '16px 18px', borderBottom: '1px solid #f1f5f9', color: '#374151', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>{entry.issued}</td>
                              <td style={{ padding: '16px 18px', borderBottom: '1px solid #f1f5f9', color: '#374151', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>{entry.expires}</td>
                              <td style={{ padding: '16px 18px', borderBottom: '1px solid #f1f5f9' }}>
                                <StatusBadge status={entry.status} />
                              </td>
                            </tr>
                          )
                        })}

                        {registryRows.length === 0 && (
                          <tr>
                            <td colSpan={7} style={{ padding: '28px 18px', textAlign: 'center', color: '#6b7280', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>
                              No registry entries match the current search and filter.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        </div>

        {activeTab === 'finder' && (
          <section style={{ background: '#f8f9fa', padding: '80px 0' }}>
            <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
              <p style={{ margin: 0, color: '#9ca3af', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                ALL LICENCE CATEGORIES
              </p>
              <h2 style={{ margin: '12px 0 0', color: '#111111', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                What Does BOCRA License?
              </h2>

              <div style={{ marginTop: 40 }}>
                {licenceOverviewItems.map(({ icon: Icon, title, description, to }) => (
                  <Link key={title} to={to} className="licensing-overview-row">
                    <div className="licensing-overview-icon">
                      <Icon size={20} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div className="licensing-overview-title">{title}</div>
                      <div className="licensing-overview-description">{description}</div>
                    </div>
                    <ArrowRight className="licensing-overview-arrow" size={18} />
                  </Link>
                ))}
              </div>

              <div style={{ marginTop: 48, background: '#1A3A6B', borderRadius: 28, padding: 'clamp(28px, 5vw, 64px)', color: '#ffffff' }}>
                <h3 style={{ margin: 0, fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Ready to Apply?
                </h3>
                <p style={{ margin: '14px 0 0', maxWidth: 620, color: 'rgba(255,255,255,0.76)', fontSize: 16, lineHeight: 1.75, fontFamily: 'Inter, sans-serif' }}>
                  Start your application online or contact BOCRA&apos;s licensing team for guidance.
                </p>

                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 28 }}>
                  <button
                    type="button"
                    onClick={handleStartApplication}
                    style={{
                      border: 'none',
                      borderRadius: 999,
                      padding: '14px 24px',
                      background: '#ffffff',
                      color: '#111111',
                      fontSize: 15,
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {'Start Application ->'}
                  </button>
                  <Link
                    to="/contact"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 999,
                      padding: '14px 24px',
                      border: '1px solid rgba(255,255,255,0.35)',
                      color: '#ffffff',
                      textDecoration: 'none',
                      fontSize: 15,
                      fontWeight: 600,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    Contact Licensing Team
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        <style>{`
          .licensing-hero-tab:hover:not(.is-active) {
            color: #111111 !important;
            background: rgba(0,0,0,0.04) !important;
          }

          .licensing-choice-card {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
            width: 100%;
            padding: 28px 24px;
            border-radius: 16px;
            border: 1.5px solid #e5e7eb;
            background: #ffffff;
            cursor: pointer;
            transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
            text-align: left;
          }

          .licensing-choice-card:hover {
            border-color: #1A3A6B;
            transform: translateY(-2px);
          }

          .licensing-choice-card.is-selected {
            border: 2px solid #1A3A6B;
            background: #f8fbff;
          }

          .licensing-choice-badge {
            position: absolute;
            top: 14px;
            right: 14px;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: #1A3A6B;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .licensing-choice-icon-box {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            background: #D6E4F7;
            color: #1A3A6B;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s ease, color 0.2s ease;
          }

          .licensing-choice-card:hover .licensing-choice-icon-box,
          .licensing-choice-card.is-selected .licensing-choice-icon-box {
            background: #1A3A6B;
            color: #ffffff;
          }

          .licensing-choice-title {
            color: #111111;
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 16px;
            font-weight: 700;
            line-height: 1.3;
          }

          .licensing-choice-description {
            color: #6b7280;
            font-family: 'Inter', sans-serif;
            font-size: 13px;
            line-height: 1.55;
          }

          .licensing-choice-fee {
            margin-top: auto;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 6px 10px;
            border-radius: 999px;
            background: #f8f9fa;
            color: #6b7280;
            font-family: 'Inter', sans-serif;
            font-size: 12px;
            font-weight: 500;
          }

          .licensing-overview-row {
            display: flex;
            align-items: center;
            gap: 18px;
            padding: 24px 0;
            color: inherit;
            text-decoration: none;
            border-bottom: 1px solid #e5e7eb;
            transition: color 0.2s ease, transform 0.2s ease;
          }

          .licensing-overview-row:hover {
            color: #1A3A6B;
            transform: translateX(2px);
          }

          .licensing-overview-icon {
            width: 46px;
            height: 46px;
            min-width: 46px;
            border-radius: 12px;
            background: #ffffff;
            color: #1A3A6B;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .licensing-overview-title {
            color: #111111;
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 18px;
            font-weight: 700;
          }

          .licensing-overview-description {
            margin-top: 4px;
            color: #6b7280;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            line-height: 1.6;
          }

          .licensing-overview-arrow {
            margin-left: auto;
            color: #9ca3af;
            transition: transform 0.2s ease, color 0.2s ease;
          }

          .licensing-overview-row:hover .licensing-overview-arrow {
            transform: translateX(4px);
            color: #1A3A6B;
          }

          @media (max-width: 900px) {
            .licensing-overview-row {
              align-items: flex-start;
            }
          }

          @media (max-width: 720px) {
            .licensing-overview-row {
              gap: 14px;
            }
          }
        `}</style>
      </>
    </PageWrapper>
  )
}
