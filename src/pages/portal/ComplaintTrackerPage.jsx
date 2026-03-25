import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import PageWrapper from '../../components/shared/PageWrapper'
import { useComplaints } from '../../context/ComplaintContext'

const searchInputStyle = {
  flex: 1,
  padding: '14px 20px',
  border: '2px solid #e5e7eb',
  borderRadius: 50,
  fontSize: 15,
  outline: 'none',
  fontFamily: 'Inter, sans-serif',
}

const ghostButtonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #d1d5db',
  borderRadius: 999,
  padding: '14px 20px',
  background: '#ffffff',
  color: '#111111',
  fontSize: 15,
  fontWeight: 600,
  cursor: 'pointer',
  textDecoration: 'none',
  fontFamily: 'Inter, sans-serif',
}

const statusStyles = {
  Pending: {
    background: '#fef3c7',
    color: '#b45309',
  },
  'Under Review': {
    background: '#dbeafe',
    color: '#1d4ed8',
  },
  Resolved: {
    background: '#dcfce7',
    color: '#15803d',
  },
}

function TimelineStep({ item, isLast }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: item.done ? '#16a34a' : '#ffffff',
            border: item.done ? '1px solid #16a34a' : '2px solid #d1d5db',
            marginTop: 4,
            boxSizing: 'border-box',
          }}
        />
        {!isLast && (
          <div
            style={{
              width: 2,
              flex: 1,
              minHeight: 42,
              marginTop: 8,
              background: item.done ? '#16a34a' : 'transparent',
              borderLeft: item.done ? 'none' : '2px dashed #d1d5db',
            }}
          />
        )}
      </div>
      <div style={{ paddingBottom: isLast ? 0 : 22 }}>
        <div style={{ color: '#111827', fontSize: 15, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>
          {item.label}
        </div>
        <div style={{ marginTop: 4, color: '#6b7280', fontSize: 13, lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
          {item.desc}
        </div>
      </div>
    </div>
  )
}

export default function ComplaintTrackerPage() {
  const { getComplaint } = useComplaints()
  const [searchParams] = useSearchParams()
  const [searchRef, setSearchRef] = useState('')
  const [complaint, setComplaint] = useState(null)
  const [notFound, setNotFound] = useState(false)

  const handleSearch = (nextRef) => {
    const candidate = (nextRef ?? searchRef).trim().toUpperCase()

    if (!candidate) {
      setComplaint(null)
      setNotFound(false)
      return
    }

    setSearchRef(candidate)
    const result = getComplaint(candidate)
    setComplaint(result || null)
    setNotFound(!result)
  }

  useEffect(() => {
    const initialRef = searchParams.get('ref')
    if (initialRef) {
      handleSearch(initialRef)
    }
  }, [searchParams])

  const timelineSteps = complaint
    ? [
        { label: 'Complaint Filed', desc: 'Your complaint was received by BOCRA', done: true },
        { label: 'Under Review', desc: 'A BOCRA officer has been assigned', done: complaint.status !== 'Pending' },
        { label: 'Investigation', desc: 'We are investigating with the operator', done: complaint.status === 'Resolved' },
        { label: 'Resolved', desc: 'Your complaint has been resolved', done: complaint.status === 'Resolved' },
      ]
    : []

  const badgeStyle = statusStyles[complaint?.status] || statusStyles.Pending

  return (
    <PageWrapper fullWidth wrapperStyle={{ background: '#ffffff' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '60px 24px' }}>
        <p style={{ margin: 0, color: '#9ca3af', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
          COMPLAINT TRACKER
        </p>
        <h1 style={{ margin: '12px 0 10px', fontSize: 36, fontWeight: 800, color: '#111111', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Track Your Complaint
        </h1>
        <p style={{ margin: 0, color: '#6b7280', fontSize: 15, lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
          Enter your reference number to see the latest status of your complaint.
        </p>

        <div style={{ display: 'flex', gap: 12, marginTop: 32, marginBottom: 12 }}>
          <input
            value={searchRef}
            onChange={(event) => setSearchRef(event.target.value)}
            placeholder="e.g. BOCRA-2026-0847"
            style={searchInputStyle}
            onKeyDown={(event) => event.key === 'Enter' && handleSearch()}
          />
          <button
            type="button"
            onClick={() => handleSearch()}
            style={{ background: '#1A3A6B', color: '#ffffff', border: 'none', borderRadius: 50, padding: '14px 28px', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
          >
            Track
          </button>
        </div>

        <p style={{ margin: '0 0 40px', color: '#9ca3af', fontSize: 13, lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
          {'Try: BOCRA-2026-0001 \u00b7 BOCRA-2026-0003 \u00b7 BOCRA-2026-0005'}
        </p>

        {notFound && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: 20, color: '#b91c1c', fontSize: 14, lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
            No complaint found with this reference number. Please check and try again.
          </div>
        )}

        {complaint && (
          <div>
            <div style={{ border: '1px solid #e5e7eb', borderRadius: 20, overflow: 'hidden' }}>
              <div style={{ background: '#1A3A6B', padding: '20px 28px', color: '#ffffff', display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.68)', fontSize: 12, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
                    Complaint
                  </div>
                  <div style={{ marginTop: 6, fontSize: 24, fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {complaint.ref}
                  </div>
                </div>
                <span style={{ ...badgeStyle, padding: '8px 14px', borderRadius: 999, fontSize: 13, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>
                  {complaint.status}
                </span>
              </div>

              <div style={{ padding: 28 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 18 }}>
                  {[
                    ['Category', complaint.category],
                    ['ISP', complaint.isp],
                    ['Date Filed', complaint.date],
                    ['Location', complaint.location || 'Not provided'],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <div style={{ color: '#9ca3af', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                        {label}
                      </div>
                      <div style={{ marginTop: 8, color: '#111827', fontSize: 15, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>
                        {value}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 24 }}>
                  <div style={{ color: '#9ca3af', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                    Description
                  </div>
                  <div style={{ marginTop: 8, color: '#6b7280', fontSize: 15, lineHeight: 1.7, fontStyle: 'italic', fontFamily: 'Inter, sans-serif' }}>
                    {complaint.description}
                  </div>
                </div>

                <div style={{ marginTop: 32 }}>
                  <div style={{ color: '#111827', fontSize: 18, fontWeight: 800, marginBottom: 18, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Complaint Journey
                  </div>
                  <div>
                    {timelineSteps.map((item, index) => (
                      <TimelineStep key={item.label} item={item} isLast={index === timelineSteps.length - 1} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {complaint.status === 'Resolved' && (
              <div style={{ marginTop: 18, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: 18, color: '#166534', fontSize: 14, fontWeight: 600, lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
                {'\u2713 This complaint was resolved. We hope your issue has been addressed.'}
              </div>
            )}

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24 }}>
              <Link to="/portal/complaint/new" style={ghostButtonStyle}>
                {'File Another Complaint ->'}
              </Link>
              <Link to="/contact" style={ghostButtonStyle}>
                {'Contact BOCRA ->'}
              </Link>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
