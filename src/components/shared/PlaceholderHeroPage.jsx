import { Link } from 'react-router-dom'
import HeroImagePanel from './HeroImagePanel'
import PageWrapper from './PageWrapper'

export default function PlaceholderHeroPage({
  eyebrow = 'BOCRA Service',
  title,
  description,
  route,
}) {
  return (
    <PageWrapper fullWidth wrapperStyle={{ background: '#ffffff' }}>
      <section style={{ background: '#ffffff', padding: '112px 0 88px' }}>
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 56,
            alignItems: 'center',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 16px',
                borderRadius: 999,
                background: '#D6E4F7',
                color: '#1A3A6B',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {eyebrow}
            </div>

            <h1
              style={{
                margin: '22px 0 0',
                color: '#111827',
                fontSize: 'clamp(2.6rem, 5vw, 4.5rem)',
                lineHeight: 1.02,
                letterSpacing: '-0.05em',
                fontWeight: 800,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                maxWidth: 700,
              }}
            >
              {title}
            </h1>

            <p
              style={{
                margin: '20px 0 0',
                color: '#6b7280',
                fontSize: 18,
                lineHeight: 1.75,
                fontFamily: 'Inter, sans-serif',
                maxWidth: 620,
              }}
            >
              {description}
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 12,
                marginTop: 30,
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '10px 16px',
                  borderRadius: 999,
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  color: '#475569',
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Route: {route}
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 12,
                marginTop: 34,
              }}
            >
              <Link
                to="/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '14px 26px',
                  borderRadius: 999,
                  background: '#111111',
                  color: '#ffffff',
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: 'none',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Back to Home
              </Link>

              <Link
                to="/search"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '14px 26px',
                  borderRadius: 999,
                  background: 'transparent',
                  border: '1px solid #d7dde5',
                  color: '#1A3A6B',
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: 'none',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Explore Services
              </Link>
            </div>
          </div>

          <HeroImagePanel minHeight={420} pills={['Regulation', 'Digital Botswana']} />
        </div>
      </section>
    </PageWrapper>
  )
}
