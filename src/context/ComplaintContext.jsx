import { createContext, useContext, useEffect, useState } from 'react'

const ComplaintContext = createContext()

const generateRef = () => {
  const num = Math.floor(1000 + Math.random() * 9000)
  return `BOCRA-2026-${num}`
}

const MOCK_COMPLAINTS = [
  { ref: 'BOCRA-2026-0001', name: 'Keabetswe Molebatsi', phone: '71234567', isp: 'Mascom Wireless', category: 'Billing Dispute', description: 'I was charged twice for my monthly data bundle in February 2026.', status: 'Resolved', date: '2026-03-01', location: 'Gaborone', priority: 'Medium', assignedTo: 'Officer Thato M.' },
  { ref: 'BOCRA-2026-0002', name: 'Oarabile Setshogo', phone: '76543210', isp: 'Orange Botswana', category: 'Poor Coverage', description: 'No signal at all in Mochudi village center for the past 3 weeks.', status: 'Under Review', date: '2026-03-10', location: 'Mochudi', priority: 'High', assignedTo: 'Officer Mpho K.' },
  { ref: 'BOCRA-2026-0003', name: 'Tshepiso Kgomotso', phone: '74567890', isp: 'BeMobile', category: 'Slow Speeds', description: 'My 4G speeds are consistently below 1 Mbps despite paying for 20 Mbps.', status: 'Pending', date: '2026-03-18', location: 'Francistown', priority: 'Medium', assignedTo: null },
  { ref: 'BOCRA-2026-0004', name: 'Boitumelo Nkwe', phone: '72345678', isp: 'Mascom Wireless', category: 'Unfair Disconnection', description: 'My line was disconnected without any prior notice or outstanding balance.', status: 'Pending', date: '2026-03-20', location: 'Lobatse', priority: 'High', assignedTo: null },
  { ref: 'BOCRA-2026-0005', name: 'Kagiso Mothibi', phone: '77654321', isp: 'BTC Fibre', category: 'Privacy Violation', description: 'My personal data was shared with third parties without my consent.', status: 'Under Review', date: '2026-03-22', location: 'Gaborone', priority: 'Critical', assignedTo: 'Officer Thato M.' },
]

export function ComplaintProvider({ children }) {
  const [complaints, setComplaints] = useState(() => {
    try {
      const stored = localStorage.getItem('bocra_complaints')
      return stored ? JSON.parse(stored) : MOCK_COMPLAINTS
    } catch {
      return MOCK_COMPLAINTS
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('bocra_complaints', JSON.stringify(complaints))
    } catch {}
  }, [complaints])

  const addComplaint = (data) => {
    const ref = generateRef()
    const complaint = {
      ...data,
      ref,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      priority: 'Medium',
      assignedTo: null,
    }

    setComplaints((prev) => [complaint, ...prev])
    return ref
  }

  const getComplaint = (ref) => complaints.find((c) => c.ref === ref.toUpperCase().trim())

  const updateStatus = (ref, status) => {
    setComplaints((prev) => prev.map((c) => (c.ref === ref ? { ...c, status } : c)))
  }

  const stats = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === 'Pending').length,
    underReview: complaints.filter((c) => c.status === 'Under Review').length,
    resolved: complaints.filter((c) => c.status === 'Resolved').length,
  }

  return (
    <ComplaintContext.Provider value={{ complaints, addComplaint, getComplaint, updateStatus, stats }}>
      {children}
    </ComplaintContext.Provider>
  )
}

export const useComplaints = () => useContext(ComplaintContext)
