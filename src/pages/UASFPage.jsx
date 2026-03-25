import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Bell,
  Building2,
  CheckCircle,
  ClipboardList,
  Map,
  Users,
} from 'lucide-react'
import PageWrapper from '../components/shared/PageWrapper'
import HeroImagePanel from '../components/shared/HeroImagePanel'

const impactStats = [
  {
    value: '1%',
    label: 'Levy collected from every licensed telecoms operator in Botswana',
  },
  {
    value: '68',
    label: 'Primary schools connected with internet, tablets, and computer hardware',
  },
  {
    value: '30min',
    label: 'Free daily Wi-Fi provided to citizens at hospitals, bus ranks, and malls',
  },
]

const portalFeatures = [
  {
    icon: ClipboardList,
    title: 'Grant Applications',
    description: 'Schools, clinics, and community centres apply online for connectivity funding',
  },
  {
    icon: Map,
    title: 'Project Tracker',
    description: 'Track every funded UASF project by district - spend, status, and impact',
  },
  {
    icon: Building2,
    title: 'Operator Contributions',
    description: "Transparent reporting of each operator's 1% levy contribution and how it was spent",
  },
  {
    icon: Users,
    title: 'Community Reporting',
    description: 'Citizens report underserved areas directly to BOCRA for prioritisation',
  },
]

const projects = [
  {
    status: 'Completed',
    district: 'Multiple Districts',
    title: 'Public Wi-Fi Hotspot Programme',
    description:
      'Free 30-minute daily Wi-Fi deployed at 47 public locations including hospitals, bus ranks, and shopping centres nationwide.',
    stats: [
      { value: '47 sites', label: 'Coverage footprint' },
      { value: '2 Mbps min', label: 'Guaranteed speed' },
    ],
  },
  {
    status: 'Completed',
    district: 'Kgalagadi, Ghanzi',
    title: 'Schools Connectivity Phase 1',
    description:
      '68 primary schools in underserved districts equipped with internet, educational tablets, and computer labs.',
    stats: [
      { value: '68 schools', label: 'Sites equipped' },
      { value: '4,200 learners', label: 'Students reached' },
    ],
  },
  {
    status: 'In Progress',
    district: 'North East',
    title: 'Rural Base Station Upgrades',
    description:
      "Upgrading 2G base stations to minimum 3G in 23 rural villages identified as digitally excluded by BOCRA's coverage audit.",
    stats: [
      { value: '23 villages', label: 'Target communities' },
      { value: 'Q4 2026 target', label: 'Delivery milestone' },
    ],
  },
]

const sectionLabelStyle = {
  margin: 0,
  color: '#1A3A6B',
  fontSize: 12,
  fontWeight: 600,
  fontFamily: 'Inter, sans-serif',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
}

const sectionTitleStyle = {
  margin: '16px 0 0',
  color: '#111111',
  fontSize: 'clamp(30px, 4vw, 48px)',
  lineHeight: 1.08,
  letterSpacing: '-0.03em',
  fontWeight: 800,
  fontFamily: "'Plus Jakarta Sans', sans-serif",
}

const sectionSubtextStyle = {
  margin: '16px 0 0',
  color: '#6b7280',
  fontSize: 16,
  lineHeight: 1.7,
  maxWidth: 560,
  fontFamily: 'Inter, sans-serif',
}

const baseButtonStyle = {
  minHeight: 52,
  padding: '14px 32px',
  borderRadius: 999,
  fontSize: 15,
  fontWeight: 600,
  fontFamily: 'Inter, sans-serif',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease, transform 0.2s ease',
}

export default function UASFPage() {
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!name.trim() || !email.trim()) {
      return
    }

    setSubmitted(true)
  }

  return (
    <PageWrapper fullWidth hideChat wrapperStyle={{ background: '#ffffff' }}>
      <style>{`
        .uasf-page {
          width: 100%;
          background: #ffffff;
        }

        .uasf-shell {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          box-sizing: border-box;
        }

        .uasf-section {
          width: 100%;
        }

        .uasf-about-grid,
        .uasf-project-grid,
        .uasf-form-row {
          display: grid;
        }

        .uasf-about-grid {
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 64px;
          align-items: center;
        }

        .uasf-project-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
          margin-top: 48px;
        }

        .uasf-hero-actions,
        .uasf-cta-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .uasf-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 24px;
          box-sizing: border-box;
        }

        .uasf-form-row {
          grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
          gap: 12px;
        }

        .uasf-input {
          width: 100%;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 12px 16px;
          box-sizing: border-box;
          font-size: 14px;
          color: #111111;
          background: #ffffff;
          font-family: Inter, sans-serif;
          transition: border-color 0.2s ease;
        }

        .uasf-input::placeholder {
          color: #6b7280;
        }

        .uasf-input:focus {
          outline: none;
          border-color: #1A3A6B;
        }

        .uasf-button:hover {
          transform: translateY(-1px);
        }

        .uasf-button:focus-visible,
        .uasf-input:focus-visible {
          outline: 2px solid #D6E4F7;
          outline-offset: 2px;
        }

        .uasf-button {
          border: 1px solid transparent;
        }

        .uasf-project-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }

        .uasf-project-stats {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .uasf-pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #0F6E56;
          animation: uasfPulse 2s infinite;
        }

        @keyframes uasfPulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(0.75);
          }
        }

        @media (max-width: 1080px) {
          .uasf-about-grid,
          .uasf-project-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 720px) {
          .uasf-shell {
            padding: 0 20px;
          }

          .uasf-hero-actions,
          .uasf-cta-actions,
          .uasf-form-row {
            grid-template-columns: 1fr;
            flex-direction: column;
          }

          .uasf-hero-actions > *,
          .uasf-cta-actions > *,
          .uasf-form-row > * {
            width: 100%;
          }
        }
      `}</style>

      <div className="uasf-page">
        <section className="uasf-section" style={{ background: '#ffffff', padding: '120px 0 80px' }}>
          <div className="uasf-shell" style={{ textAlign: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#D6E4F7',
                borderRadius: 999,
                padding: '8px 20px',
                marginBottom: 28,
              }}
            >
              <span className="uasf-pulse-dot" />
              <span
                style={{
                  color: '#1A3A6B',
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                Portal launching Q3 2026
              </span>
            </div>

            <h1
              style={{
                margin: '0 auto 24px',
                maxWidth: 700,
                color: '#111111',
                fontSize: 'clamp(40px, 6vw, 72px)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                fontWeight: 800,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Universal Access
              <br />
              <span style={{ color: '#1A3A6B' }}>&amp; Service Fund</span>
            </h1>

            <p
              style={{
                margin: '0 auto 48px',
                maxWidth: 560,
                color: '#6b7280',
                fontSize: 18,
                lineHeight: 1.7,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              The UASF Portal will give citizens, schools, and communities direct access to
              Botswana&apos;s digital inclusion fund - apply for connectivity grants, track
              funded projects, and hold operators accountable.
            </p>

            <div className="uasf-hero-actions">
              <button
                type="button"
                className="uasf-button"
                onClick={() => scrollToSection('uasf-notify')}
                style={{
                  ...baseButtonStyle,
                  background: '#1A3A6B',
                  color: '#ffffff',
                  borderColor: '#1A3A6B',
                }}
              >
                <Bell size={16} />
                <span>Notify Me When Live</span>
              </button>

              <button
                type="button"
                className="uasf-button"
                onClick={() => scrollToSection('uasf-about')}
                style={{
                  ...baseButtonStyle,
                  background: 'transparent',
                  color: '#6b7280',
                  borderColor: '#e5e7eb',
                }}
              >
                <span>Learn About UASF</span>
                <ArrowRight size={16} />
              </button>
            </div>

            <div style={{ maxWidth: 980, margin: '56px auto 0' }}>
              <HeroImagePanel
                minHeight={340}
                pills={['Inclusion fund', 'Last-mile connectivity']}
              />
            </div>
          </div>
        </section>

        <section
          id="uasf-about"
          className="uasf-section"
          style={{ background: '#f8f9fa', padding: '80px 0', scrollMarginTop: 100 }}
        >
          <div className="uasf-shell">
            <p style={sectionLabelStyle}>About the Fund</p>
            <h2 style={sectionTitleStyle}>Connecting Every Corner of Botswana</h2>
            <p style={sectionSubtextStyle}>
              The Universal Access and Service Fund collects a 1% levy from all licensed
              operators and invests it directly into digital infrastructure for underserved
              communities.
            </p>

            <div className="uasf-about-grid" style={{ marginTop: 56 }}>
              <div>
                {impactStats.map((stat) => (
                  <div
                    key={stat.value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 24,
                      padding: '20px 0',
                      borderBottom: '1px solid #e5e7eb',
                    }}
                  >
                    <div
                      style={{
                        color: '#1A3A6B',
                        fontSize: 40,
                        lineHeight: 1,
                        fontWeight: 800,
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        flexShrink: 0,
                      }}
                    >
                      {stat.value}
                    </div>
                    <p
                      style={{
                        margin: 0,
                        maxWidth: 240,
                        color: '#6b7280',
                        fontSize: 15,
                        lineHeight: 1.5,
                        fontFamily: 'Inter, sans-serif',
                        textAlign: 'right',
                      }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div>
                <h3
                  style={{
                    margin: '0 0 20px',
                    color: '#111111',
                    fontSize: 20,
                    fontWeight: 700,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  What the Portal Will Enable
                </h3>

                {portalFeatures.map((feature) => {
                  const Icon = feature.icon

                  return (
                    <div
                      key={feature.title}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 14,
                        padding: '16px 0',
                        borderBottom: '1px solid #e5e7eb',
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 8,
                          background: '#D6E4F7',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={18} color="#1A3A6B" />
                      </div>
                      <div>
                        <p
                          style={{
                            margin: 0,
                            color: '#111111',
                            fontSize: 14,
                            fontWeight: 600,
                            fontFamily: 'Inter, sans-serif',
                          }}
                        >
                          {feature.title}
                        </p>
                        <p
                          style={{
                            margin: '3px 0 0',
                            color: '#6b7280',
                            fontSize: 13,
                            lineHeight: 1.5,
                            fontFamily: 'Inter, sans-serif',
                          }}
                        >
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="uasf-section" style={{ background: '#ffffff', padding: '80px 0' }}>
          <div className="uasf-shell">
            <p style={sectionLabelStyle}>Funded Projects</p>
            <h2 style={sectionTitleStyle}>What the UASF Has Built</h2>
            <p style={sectionSubtextStyle}>
              A preview of the projects that will be fully tracked and reported through this
              portal.
            </p>

            <div className="uasf-project-grid">
              {projects.map((project) => (
                <article key={project.title} className="uasf-card">
                  <div className="uasf-project-top">
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        borderRadius: 999,
                        padding: '4px 12px',
                        background: '#D6E4F7',
                        color: project.status === 'Completed' ? '#0F6E56' : '#1A3A6B',
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {project.status}
                    </span>

                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        borderRadius: 999,
                        padding: '4px 12px',
                        background: '#f8f9fa',
                        color: '#6b7280',
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: '0.03em',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {project.district}
                    </span>
                  </div>

                  <div style={{ marginTop: 16 }}>
                    <h3
                      style={{
                        margin: 0,
                        color: '#111111',
                        fontSize: 17,
                        lineHeight: 1.35,
                        fontWeight: 700,
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                      }}
                    >
                      {project.title}
                    </h3>
                    <p
                      style={{
                        margin: '8px 0 0',
                        color: '#6b7280',
                        fontSize: 14,
                        lineHeight: 1.6,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {project.description}
                    </p>
                  </div>

                  <div
                    style={{
                      marginTop: 20,
                      paddingTop: 16,
                      borderTop: '1px solid #e5e7eb',
                    }}
                  >
                    <div className="uasf-project-stats">
                      {project.stats.map((stat) => (
                        <div key={stat.value}>
                          <p
                            style={{
                              margin: 0,
                              color: '#1A3A6B',
                              fontSize: 15,
                              fontWeight: 700,
                              fontFamily: 'Inter, sans-serif',
                            }}
                          >
                            {stat.value}
                          </p>
                          <p
                            style={{
                              margin: '4px 0 0',
                              color: '#6b7280',
                              fontSize: 12,
                              lineHeight: 1.5,
                              fontFamily: 'Inter, sans-serif',
                            }}
                          >
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="uasf-notify"
          className="uasf-section"
          style={{ background: '#f8f9fa', padding: '80px 0', scrollMarginTop: 100 }}
        >
          <div
            className="uasf-shell"
            style={{ maxWidth: 600, textAlign: 'center', paddingLeft: 24, paddingRight: 24 }}
          >
            <p style={sectionLabelStyle}>Stay Informed</p>
            <h2 style={sectionTitleStyle}>Get Notified When the Portal Launches</h2>
            <p style={{ ...sectionSubtextStyle, marginLeft: 'auto', marginRight: 'auto' }}>
              Be the first to apply for connectivity funding or track UASF projects in your
              district.
            </p>

            <div className="uasf-card" style={{ marginTop: 40 }}>
              {submitted ? (
                <div aria-live="polite" style={{ padding: '12px 0' }}>
                  <CheckCircle size={32} color="#0F6E56" />
                  <p
                    style={{
                      margin: '14px 0 8px',
                      color: '#111111',
                      fontSize: 18,
                      fontWeight: 700,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    You&apos;re on the list!
                  </p>
                  <p
                    style={{
                      margin: 0,
                      color: '#6b7280',
                      fontSize: 14,
                      lineHeight: 1.6,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    We&apos;ll email you when the UASF portal launches.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="uasf-form-row">
                    <input
                      type="text"
                      className="uasf-input"
                      placeholder="Your full name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                    />
                    <input
                      type="email"
                      className="uasf-input"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="uasf-button"
                    style={{
                      marginTop: 12,
                      width: '100%',
                      minHeight: 50,
                      background: '#1A3A6B',
                      color: '#ffffff',
                      border: '1px solid #1A3A6B',
                      borderRadius: 8,
                      fontSize: 14,
                      fontWeight: 600,
                      fontFamily: 'Inter, sans-serif',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      cursor: 'pointer',
                    }}
                  >
                    <span>Notify Me When Live</span>
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="uasf-section" style={{ background: '#1A3A6B', padding: '64px 0' }}>
          <div className="uasf-shell" style={{ textAlign: 'center' }}>
            <h2
              style={{
                margin: 0,
                color: '#ffffff',
                fontSize: 32,
                lineHeight: 1.15,
                fontWeight: 700,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Questions About the UASF?
            </h2>
            <p
              style={{
                margin: '12px auto 0',
                maxWidth: 560,
                color: 'rgba(255,255,255,0.65)',
                fontSize: 16,
                lineHeight: 1.7,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Contact BOCRA&apos;s universal access team directly or read the fund&apos;s mandate
              in the CRA Act.
            </p>

            <div className="uasf-cta-actions" style={{ marginTop: 28 }}>
              <button
                type="button"
                className="uasf-button"
                onClick={() => navigate('/contact')}
                style={{
                  ...baseButtonStyle,
                  minHeight: 48,
                  padding: '12px 28px',
                  fontSize: 14,
                  background: '#ffffff',
                  color: '#1A3A6B',
                  borderColor: '#ffffff',
                }}
              >
                <span>Contact BOCRA</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                className="uasf-button"
                onClick={() => navigate('/documents')}
                style={{
                  ...baseButtonStyle,
                  minHeight: 48,
                  padding: '12px 28px',
                  fontSize: 14,
                  background: 'transparent',
                  color: '#ffffff',
                  borderColor: 'rgba(255,255,255,0.3)',
                }}
              >
                <span>Read the CRA Act</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  )
}
