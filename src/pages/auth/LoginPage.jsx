import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { ArrowRight, Eye, EyeOff, ShieldCheck, FileText, BellRing } from 'lucide-react'
import PageWrapper from '../../components/shared/PageWrapper'
import HeroImagePanel from '../../components/shared/HeroImagePanel'
import { useAuth } from '../../hooks/useAuth'

const quickPoints = [
  {
    icon: FileText,
    title: 'Submit complaints faster',
    description: 'Open cases, upload supporting details, and keep every reference in one place.',
  },
  {
    icon: BellRing,
    title: 'Track progress clearly',
    description: 'Follow complaint and service-request milestones without guessing what happens next.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure citizen access',
    description: 'Use one BOCRA profile to move between services with a more consistent experience.',
  },
]

function resolvePortalRedirect(target) {
  if (!target || target === '/') return '/'
  if (target === '/portal/apply' || target === '/portal/applications') return '/portal'
  return target
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirect = resolvePortalRedirect(searchParams.get('redirect') || '/')
  const forceLogin = searchParams.get('force') === '1'
  const registerHref = `/register${redirect && redirect !== '/' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`
  const { isLoggedIn, login } = useAuth()

  useEffect(() => {
    if (isLoggedIn && !forceLogin) {
      navigate(redirect, { replace: true })
    }
  }, [forceLogin, isLoggedIn, navigate, redirect])

  const handleLogin = (event) => {
    event.preventDefault()

    const ok = login({
      email,
      name: email.split('@')[0]?.replace(/[._-]+/g, ' ') || 'BOCRA Citizen',
      role: 'citizen',
    })

    if (ok) {
      navigate(redirect)
    }
  }

  return (
    <PageWrapper
      fullWidth
      hideChat
      wrapperStyle={{
        background:
          'linear-gradient(180deg, #f8fbff 0%, #f4f7fb 46%, #ffffff 100%)',
      }}
    >
      <section className="login-shell">
        <div className="login-grid">
          <div className="login-copy">
            <div className="login-eyebrow">Citizen Portal</div>
            <h1 className="login-title">Sign in to manage your BOCRA services with clarity.</h1>
            <p className="login-description">
              Access complaints, applications, and service follow-ups from one cleaner BOCRA account space.
            </p>

            <div className="login-pills">
              <span className="login-pill">Complaints</span>
              <span className="login-pill">Applications</span>
              <span className="login-pill">Tracking</span>
            </div>

            <div className="login-feature-panel">
              <div className="login-feature-list">
                {quickPoints.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="login-feature-row">
                    <div className="login-feature-icon">
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="login-feature-title">{title}</div>
                      <div className="login-feature-description">{description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="login-visual-wrap">
              <HeroImagePanel
                theme="navy"
                minHeight={360}
                pills={['Secure sign-in', 'Citizen services', 'Digital Botswana']}
                style={{ borderRadius: 30 }}
              />
            </div>
          </div>

          <div className="login-card">
            <div className="login-card-header">
              <div className="login-card-kicker">Welcome back</div>
              <h2 className="login-card-title">Log in to BOCRA</h2>
              <p className="login-card-description">
                Use your email and password to continue into the citizen portal.
              </p>
            </div>

            <form onSubmit={handleLogin} className="login-form">
              <div className="login-field">
                <label htmlFor="email" className="login-label">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="login-input"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>

              <div className="login-field">
                <div className="login-label-row">
                  <label htmlFor="password" className="login-label">
                    Password
                  </label>
                  <Link to="/contact" className="login-inline-action">
                    Forgot password?
                  </Link>
                </div>

                <div className="login-password-wrap">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="login-input login-input-password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="login-password-toggle"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="login-meta">
                <span className="login-meta-chip">Redirect: {redirect}</span>
                <span className="login-meta-note">Demo access accepts any valid email and password.</span>
              </div>

              <button type="submit" className="login-submit">
                <span>Continue to Portal</span>
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="login-footer">
              <span>New to BOCRA?</span>
              <Link to={registerHref} className="login-footer-link">
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .login-shell {
          padding: 148px 24px 88px;
        }

        .login-grid {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1.12fr) minmax(360px, 460px);
          gap: 40px;
          align-items: stretch;
        }

        .login-copy {
          display: grid;
          align-content: start;
          gap: 22px;
          min-width: 0;
        }

        .login-eyebrow {
          display: inline-flex;
          align-items: center;
          width: fit-content;
          padding: 8px 16px;
          border-radius: 999px;
          background: #d6e4f7;
          color: #1a3a6b;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-family: 'Inter', sans-serif;
        }

        .login-title {
          margin: 0;
          color: #0f172a;
          font-size: clamp(2.8rem, 5vw, 4.8rem);
          line-height: 0.98;
          letter-spacing: -0.05em;
          font-weight: 800;
          font-family: 'Plus Jakarta Sans', sans-serif;
          max-width: 760px;
        }

        .login-description {
          margin: 0;
          color: #64748b;
          font-size: 18px;
          line-height: 1.8;
          font-family: 'Inter', sans-serif;
          max-width: 640px;
        }

        .login-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .login-pill {
          display: inline-flex;
          align-items: center;
          padding: 10px 16px;
          border-radius: 999px;
          background: rgba(255,255,255,0.8);
          border: 1px solid rgba(15,23,42,0.08);
          color: #475569;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          box-shadow: 0 10px 24px rgba(15,23,42,0.04);
        }

        .login-feature-panel {
          padding: 26px 28px;
          border-radius: 28px;
          background:
            radial-gradient(circle at top left, rgba(214,228,247,0.8), transparent 34%),
            linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,0.96) 100%);
          border: 1px solid rgba(15,23,42,0.08);
          box-shadow: 0 24px 56px rgba(15,23,42,0.06);
        }

        .login-feature-list {
          display: grid;
          gap: 18px;
        }

        .login-feature-row {
          display: grid;
          grid-template-columns: 42px minmax(0, 1fr);
          gap: 14px;
          align-items: start;
        }

        .login-feature-icon {
          width: 42px;
          height: 42px;
          border-radius: 14px;
          background: #eef4fb;
          color: #1a3a6b;
          display: flex;
          align-items: center;
          justifyContent: center;
        }

        .login-feature-title {
          color: #0f172a;
          font-size: 15px;
          font-weight: 700;
          font-family: 'Plus Jakarta Sans', sans-serif;
          margin-bottom: 5px;
        }

        .login-feature-description {
          color: #64748b;
          font-size: 14px;
          line-height: 1.7;
          font-family: 'Inter', sans-serif;
        }

        .login-visual-wrap {
          margin-top: 4px;
        }

        .login-card {
          align-self: start;
          padding: 34px;
          border-radius: 30px;
          background: rgba(255,255,255,0.96);
          border: 1px solid rgba(15,23,42,0.08);
          box-shadow:
            0 32px 70px rgba(15,23,42,0.10),
            inset 0 1px 0 rgba(255,255,255,0.85);
          backdrop-filter: blur(14px);
          position: sticky;
          top: 132px;
        }

        .login-card-header {
          margin-bottom: 24px;
        }

        .login-card-kicker {
          color: #1a3a6b;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-family: 'Inter', sans-serif;
          margin-bottom: 10px;
        }

        .login-card-title {
          margin: 0;
          color: #111827;
          font-size: 32px;
          line-height: 1.05;
          letter-spacing: -0.04em;
          font-weight: 800;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .login-card-description {
          margin: 12px 0 0;
          color: #64748b;
          font-size: 15px;
          line-height: 1.75;
          font-family: 'Inter', sans-serif;
        }

        .login-form {
          display: grid;
          gap: 18px;
        }

        .login-field {
          display: grid;
          gap: 9px;
        }

        .login-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        .login-label {
          color: #334155;
          font-size: 13px;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
        }

        .login-inline-action {
          text-decoration: none;
          color: #1a3a6b;
          font-size: 12px;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
        }

        .login-password-wrap {
          position: relative;
        }

        .login-input {
          width: 100%;
          padding: 15px 16px;
          border-radius: 16px;
          border: 1px solid #d8e0ea;
          background: #fbfdff;
          color: #0f172a;
          font-size: 14px;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
        }

        .login-input::placeholder {
          color: #94a3b8;
        }

        .login-input:focus {
          border-color: #8cb3de;
          box-shadow: 0 0 0 4px rgba(26,58,107,0.08);
          background: #ffffff;
        }

        .login-input-password {
          padding-right: 46px;
        }

        .login-password-toggle {
          position: absolute;
          top: 50%;
          right: 14px;
          transform: translateY(-50%);
          width: 28px;
          height: 28px;
          border: none;
          background: transparent;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .login-meta {
          display: grid;
          gap: 10px;
          margin-top: 2px;
        }

        .login-meta-chip {
          display: inline-flex;
          align-items: center;
          width: fit-content;
          padding: 8px 12px;
          border-radius: 999px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #475569;
          font-size: 12px;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
        }

        .login-meta-note {
          color: #64748b;
          font-size: 12px;
          line-height: 1.7;
          font-family: 'Inter', sans-serif;
        }

        .login-submit {
          margin-top: 4px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 15px 20px;
          border-radius: 18px;
          border: none;
          background: linear-gradient(135deg, #0f172a 0%, #1a3a6b 100%);
          color: #ffffff;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          box-shadow: 0 18px 38px rgba(26,58,107,0.22);
          transition: transform 0.15s ease, box-shadow 0.2s ease;
        }

        .login-submit:hover {
          transform: translateY(-1px);
          box-shadow: 0 24px 44px rgba(26,58,107,0.28);
        }

        .login-footer {
          margin-top: 22px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          color: #64748b;
          font-size: 13px;
          font-family: 'Inter', sans-serif;
        }

        .login-footer-link {
          color: #1a3a6b;
          font-weight: 700;
          text-decoration: none;
        }

        @media (max-width: 1080px) {
          .login-grid {
            grid-template-columns: 1fr;
          }

          .login-card {
            position: static;
          }
        }

        @media (max-width: 640px) {
          .login-shell {
            padding: 132px 18px 72px;
          }

          .login-title {
            font-size: clamp(2.3rem, 10vw, 3.4rem);
          }

          .login-feature-panel,
          .login-card {
            padding: 24px 20px;
            border-radius: 24px;
          }

          .login-card-title {
            font-size: 28px;
          }
        }
      `}</style>
    </PageWrapper>
  )
}
