import PageWrapper from '../components/shared/PageWrapper'

const sections = [
  { title: '1. Data Controller', content: 'Botswana Communications Regulatory Authority (BOCRA) is the data controller responsible for your personal information collected through this platform, registered under the Communications Regulatory Authority Act, 2012.' },
  { title: '2. What Data We Collect', content: 'We collect your full name, Omang/ID number, phone number, email address, location, and complaint or application details — only when voluntarily provided through our forms.' },
  { title: '3. How We Use Your Data', content: 'Your data is used solely for processing complaints, licence applications, and regulatory communications. We do not sell, share or transfer your personal data to third parties except where required by law or with your explicit consent.' },
  { title: '4. Data Protection Act 2018 Compliance', content: 'BOCRA processes all personal data in accordance with the Botswana Data Protection Act 2018. You have the right to access, correct, or request deletion of your personal data at any time by contacting dataprotection@bocra.org.bw' },
  { title: '5. Data Security', content: 'All data transmitted through this platform is encrypted using TLS 1.3. Access to personal data is restricted to authorised BOCRA staff only. We conduct regular security audits aligned with ISO 27001 information security standards.' },
  { title: '6. Contact Us', content: 'For data protection concerns contact our Data Protection Officer at: dataprotection@bocra.org.bw | +267 395 7755 | Plot 50671 Independence Avenue, Gaborone, Botswana.' },
]

export default function PolicyPage() {
  return (
    <PageWrapper>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '60px 24px' }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', color: '#9ca3af', textTransform: 'uppercase', marginBottom: 12 }}>LEGAL</p>
        <h1 style={{ fontSize: 40, fontWeight: 800, color: '#111', margin: '0 0 8px' }}>Privacy Policy</h1>
        <p style={{ fontSize: 16, color: '#6b7280', marginBottom: 8 }}>Last updated: March 2026</p>
        <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, marginBottom: 40, paddingBottom: 40, borderBottom: '1px solid #e5e7eb' }}>
          In accordance with the Data Protection Act 2018 of Botswana, BOCRA Connect is committed to protecting your privacy and handling your personal data responsibly.
        </p>
        {sections.map(s => (
          <div key={s.title} style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111', marginBottom: 12 }}>{s.title}</h2>
            <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, margin: 0 }}>{s.content}</p>
          </div>
        ))}
      </div>
    </PageWrapper>
  )
}
