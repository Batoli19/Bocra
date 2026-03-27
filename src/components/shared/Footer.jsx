import { Link } from 'react-router-dom'
import bocraSvg from '../../assets/bocra.svg'

const footerLinkStyle = {
  color: 'rgba(255,255,255,0.68)',
  fontSize: 14,
  textDecoration: 'none',
  lineHeight: 1.8,
}

export default function Footer() {
  return (
    <footer
      style={{
        background:
          'radial-gradient(circle at top left, rgba(20,77,116,0.55), transparent 34%), linear-gradient(180deg, #0b1016 0%, #05080c 100%)',
        color: 'rgba(255,255,255,0.72)',
        marginTop: 'auto',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 -24px 60px rgba(2,6,23,0.45)',
        position: 'relative',
      }}
    >
      <div
        style={{
          height: 18,
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0))',
        }}
      />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 24px 28px', width: '100%', boxSizing: 'border-box' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 32,
            alignItems: 'start',
            marginBottom: 56,
          }}
        >
          <div style={{ maxWidth: 540 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '8px 14px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                marginBottom: 18,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.72)',
                }}
              >
                BOCRA Connect
              </span>
            </div>

            <p
              style={{
                fontSize: 28,
                lineHeight: 1.15,
                color: '#ffffff',
                maxWidth: 540,
                marginBottom: 18,
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
              }}
            >
              Regulating communications with clarity, trust, and a modern public
              experience.
            </p>

            <p style={{ fontSize: 15, lineHeight: 1.8, maxWidth: 440, marginBottom: 18 }}>
              Botswana Communications Regulatory Authority supports
              telecommunications, broadcasting, postal, and internet services in
              the public interest.
            </p>

            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginBottom: 6 }}>
              Plot 50671 Independence Ave, Gaborone
            </p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>
              Tel: +267 3957755 | info@bocra.org.bw
            </p>
          </div>

          <div>
            <p
              style={{
                fontWeight: 600,
                color: '#ffffff',
                marginBottom: 14,
                fontSize: 14,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Services
            </p>
            {[['Licensing', '/licensing'], ['File a Complaint', '/portal/complaint/new'], ['Documents', '/documents'], ['Verify Licence', '/verify'], ['Coverage Map', '/map']].map(([label, href]) => (
              <div key={href}>
                <Link to={href} style={footerLinkStyle}>
                  {label}
                </Link>
              </div>
            ))}
          </div>

          <div>
            <p
              style={{
                fontWeight: 600,
                color: '#ffffff',
                marginBottom: 14,
                fontSize: 14,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Organisation
            </p>
            {[['About BOCRA', '/about'], ['News & Events', '/news'], ['Tenders', '/tenders'], ['Careers', '/careers'], ['Contact', '/contact']].map(([label, href]) => (
              <div key={href}>
                <Link to={href} style={footerLinkStyle}>
                  {label}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 32, paddingTop: 24 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 20 }}>
            {[
              '🔒 SSL Encrypted',
              '🛡️ DPA 2018 Compliant',
              '♿ WCAG 2.1 AA',
              '🔐 ISO 27001 Aligned',
              '✅ BOCRA Verified',
            ].map(label => (
              <span key={label} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 50, padding: '5px 14px', fontSize: 11, color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>
                {label}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/privacy" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="/security" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Security</a>
            <a href="/contact" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Contact</a>
          </div>
        </div>

        <div
          style={{
            paddingTop: 28,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 8,
            marginBottom: 36,
          }}
        >
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>
            (c) 2026 Botswana Communications Regulatory Authority. All rights reserved.
          </p>
          <p
            style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.45)',
              fontStyle: 'italic',
            }}
          >
            Imagine Botswana without BOCRA.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src={bocraSvg}
            alt="BOCRA Logo"
            style={{
              width: 'min(860px, 96vw)',
              height: 'auto',
              display: 'block',
              objectFit: 'contain',
              filter: 'grayscale(1) brightness(2.2)',
              opacity: 0.9,
            }}
          />
        </div>
      </div>
    </footer>
  )
}
