import PageWrapper from '../components/shared/PageWrapper'

const features = [
  { icon: '🔒', title: 'TLS 1.3 Encryption', desc: 'All data transmitted between your browser and our servers is encrypted using TLS 1.3 — the same standard used by major financial institutions.' },
  { icon: '🛡️', title: 'DPA 2018 Compliant', desc: "We process all personal data in strict accordance with Botswana's Data Protection Act 2018. Your data is never sold or shared without explicit consent." },
  { icon: '🔐', title: 'ISO 27001 Aligned', desc: 'Our information security practices are aligned with ISO 27001 international standards for information security management systems.' },
  { icon: '♿', title: 'WCAG 2.1 Accessible', desc: 'BOCRA Connect meets Web Content Accessibility Guidelines 2.1 Level AA ensuring access for all citizens including those with disabilities.' },
  { icon: '⏱️', title: 'Session Management', desc: 'Automatic session timeout after 30 minutes of inactivity protects your account from unauthorized access on shared or public devices.' },
  { icon: '🧹', title: 'Input Sanitization', desc: 'All user inputs are sanitized before processing to prevent cross-site scripting (XSS) and injection attacks on every form submission.' },
]

export default function SecurityPage() {
  return (
    <PageWrapper>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '60px 24px' }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', color: '#9ca3af', textTransform: 'uppercase', marginBottom: 12 }}>SECURITY</p>
        <h1 style={{ fontSize: 40, fontWeight: 800, color: '#111', margin: '0 0 16px' }}>Security & Data Protection</h1>
        <p style={{ fontSize: 18, color: '#6b7280', marginBottom: 60, maxWidth: 600, lineHeight: 1.7 }}>
          How BOCRA Connect protects every citizen's data and ensures regulatory compliance across all interactions.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40, marginBottom: 80 }}>
          {features.map(f => (
            <div key={f.title}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111', margin: '0 0 10px' }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#1A3A6B', borderRadius: 20, padding: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: 'white', margin: '0 0 8px' }}>Report a Security Issue</h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', margin: 0 }}>Found a vulnerability? Contact our security team immediately.</p>
          </div>
          <a href="mailto:security@bocra.org.bw" style={{ background: 'white', color: '#1A3A6B', textDecoration: 'none', borderRadius: 50, padding: '12px 24px', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
            security@bocra.org.bw
          </a>
        </div>
      </div>
    </PageWrapper>
  )
}
