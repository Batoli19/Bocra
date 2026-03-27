import { createContext, useContext, useEffect, useState } from 'react'

const ApplicationContext = createContext()

const STORAGE_KEY = 'bocra_applications'
const VERSION_KEY = 'bocra_applications_v'
const CURRENT_VERSION = '2'

const generateRef = () => {
  const num = Math.floor(1000 + Math.random() * 9000)
  return `APP-BOCRA-2026-${num}`
}

const MOCK_APPLICATIONS = [
  { ref: 'APP-BOCRA-2026-1142', applicant: 'Kopano Broadband', type: 'Internet Service Provider', date: '2026-03-24', status: 'Application Received', officer: null },
  { ref: 'APP-BOCRA-2026-1138', applicant: 'Northern Signals', type: 'Broadcasting - Radio', date: '2026-03-23', status: 'Document Verification', officer: 'Officer Thato M.' },
  { ref: 'APP-BOCRA-2026-1129', applicant: 'Delta Courier', type: 'Postal / Courier - Class A', date: '2026-03-22', status: 'Licence Issued', officer: 'Officer Mpho K.' },
  { ref: 'APP-BOCRA-2026-0042', applicant: 'Kgosi Tech Solutions', type: 'Internet Service Provider Licence', date: '2026-03-01', status: 'Technical Assessment', officer: 'Officer Mpho K.' },
]

function loadApplications() {
  try {
    const storedVersion = localStorage.getItem(VERSION_KEY)
    if (storedVersion !== CURRENT_VERSION) {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.setItem(VERSION_KEY, CURRENT_VERSION)
      return MOCK_APPLICATIONS
    }
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : MOCK_APPLICATIONS
  } catch {
    return MOCK_APPLICATIONS
  }
}

export function ApplicationProvider({ children }) {
  const [applications, setApplications] = useState(() => loadApplications())

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(applications))
      localStorage.setItem(VERSION_KEY, CURRENT_VERSION)
    } catch {}
  }, [applications])

  const addApplication = (data) => {
    const ref = generateRef()
    const application = {
      ...data,
      ref,
      status: 'Application Received',
      date: new Date().toISOString().split('T')[0],
      officer: null,
    }

    setApplications((prev) => [application, ...prev])
    return { ref, application }
  }

  const getApplication = (ref) => applications.find((a) => a.ref === ref.toUpperCase().trim())

  const updateStatus = (ref, status) => {
    setApplications((prev) => prev.map((a) => (a.ref === ref ? { ...a, status } : a)))
  }

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === 'Application Received').length,
    assessing: applications.filter((a) => a.status === 'Technical Assessment' || a.status === 'Document Verification').length,
    issued: applications.filter((a) => a.status === 'Licence Issued').length,
  }

  return (
    <ApplicationContext.Provider value={{ applications, addApplication, getApplication, updateStatus, stats }}>
      {children}
    </ApplicationContext.Provider>
  )
}

export const useApplications = () => useContext(ApplicationContext)
