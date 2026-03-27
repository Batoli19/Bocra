import PageWrapper from '../../components/shared/PageWrapper'
import { useApplications } from '../../context/ApplicationContext'

const statusStyles = {
  'Application Received': { background: '#dbeafe', color: '#1d4ed8' },
  'Document Verification': { background: '#fef3c7', color: '#b45309' },
  'Technical Assessment': { background: '#ede9fe', color: '#6d28d9' },
  'Fee Invoice Sent': { background: '#cffafe', color: '#0f766e' },
  'Licence Issued': { background: '#dcfce7', color: '#15803d' },
  'Rejected': { background: '#fee2e2', color: '#b91c1c' },
}

export default function ApplicationsPage() {
  const { applications } = useApplications()

  return (
    <PageWrapper fullWidth wrapperStyle={{ background: '#ffffff' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 24px' }}>
        <p style={{ margin: 0, color: '#9ca3af', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
          MY APPLICATIONS
        </p>
        <h1 style={{ margin: '12px 0 32px', fontSize: 36, fontWeight: 800, color: '#111111', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Licence Applications
        </h1>
        
        {applications.length === 0 ? (
          <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 16, padding: '48px 24px', textAlign: 'center' }}>
            <p style={{ color: '#6b7280', fontSize: 16, fontFamily: 'Inter, sans-serif' }}>You have no open applications.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 16 }}>
            {applications.map(app => {
              const badgeStyle = statusStyles[app.status] || { background: '#f3f4f6', color: '#374151' }
              return (
                <div key={app.ref} style={{ border: '1px solid #e5e7eb', borderRadius: 16, padding: 24, display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ color: '#111827', fontSize: 18, fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{app.type}</div>
                    <div style={{ color: '#6b7280', fontSize: 14, marginTop: 4, fontFamily: 'Inter, sans-serif' }}>Ref: {app.ref} &bull; Submitted: {app.date}</div>
                    <div style={{ color: '#374151', fontSize: 14, marginTop: 4, fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Applicant: {app.applicant}</div>
                  </div>
                  <div>
                    <span style={{ ...badgeStyle, padding: '8px 16px', borderRadius: 999, fontSize: 13, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>
                      {app.status}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
