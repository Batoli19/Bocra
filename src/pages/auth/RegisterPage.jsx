import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { ArrowRight, Eye, EyeOff, ShieldCheck, BellRing, UserRoundPlus } from 'lucide-react'
import PageWrapper from '../../components/shared/PageWrapper'
import HeroImagePanel from '../../components/shared/HeroImagePanel'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'

const quickPoints = [
  {
    icon: UserRoundPlus,
    title: 'Create one citizen profile',
    description: 'Use one BOCRA account across complaints, applications, and future digital services.',
  },
  {
    icon: BellRing,
    title: 'Receive clearer updates',
    description: 'Keep your details in one place so follow-ups and service progress are easier to track.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure by default',
    description: 'Your registration opens a protected citizen portal experience built for service requests.',
  },
]

function resolvePortalRedirect(target) {
  if (!target || target === '/') return '/portal'
  if (target === '/portal/apply' || target === '/portal/applications') return '/portal'
  return target
}

export default function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirect = resolvePortalRedirect(searchParams.get('redirect') || '/portal')
  const loginHref = `/login${redirect && redirect !== '/' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`
  const { isLoggedIn, register } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (isLoggedIn) {
      navigate(redirect, { replace: true })
    }
  }, [isLoggedIn, navigate, redirect])

  const handleSubmit = (event) => {
    event.preventDefault()

    if (password.length < 8) {
      toast?.error('Use a password with at least 8 characters.')
      return
    }

    if (password !== confirmPassword) {
      toast?.error('Passwords do not match yet.')
      return
    }

    if (!acceptedTerms) {
      toast?.error('Please accept the portal terms to continue.')
      return
    }

    register({
      name: fullName,
      email,
      phone,
      role: 'citizen',
    })

    toast?.success('Account created. Redirecting to your BOCRA portal...')
    navigate(redirect)
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
      <section className="register-shell">
        <div className="register-grid">
          <div className="register-copy">
            <div className="register-eyebrow">Citizen Portal</div>
            <h1 className="register-title">Create your BOCRA account and start using services right away.</h1>
            <p className="register-description">
              Register once to file complaints, manage applications, and keep your contact details ready for updates.
            </p>

            <div className="register-pills">
              <span className="register-pill">Complaints</span>
              <span className="register-pill">Applications</span>
              <span className="register-pill">Service Tracking</span>
            </div>

            <div className="register-feature-panel">
              <div className="register-feature-list">
                {quickPoints.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="register-feature-row">
                    <div className="register-feature-icon">
                      <Icon size={18} />
                    </div>
                    <div>
                      <div className="register-feature-title">{title}</div>
                      <div className="register-feature-description">{description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="register-visual-wrap">
              <HeroImagePanel
                theme="navy"
                minHeight={360}
                pills={['Citizen onboarding', 'Secure profile', 'Digital Botswana']}
                style={{ borderRadius: 30 }}
              />
            </div>
          </div>

          <div className="register-card">
            <div className="register-card-header">
              <div className="register-card-kicker">New profile</div>
              <h2 className="register-card-title">Create your account</h2>
              <p className="register-card-description">
                Fill in your details below and we will take you straight into the portal.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="register-form">
              <div className="register-field">
                <label htmlFor="fullName" className="register-label">
                  Full name
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  className="register-input"
                  placeholder="Your full name"
                  autoComplete="name"
                />
              </div>

              <div className="register-field">
                <label htmlFor="email" className="register-label">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="register-input"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>

              <div className="register-field">
                <label htmlFor="phone" className="register-label">
                  Mobile number
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className="register-input"
                  placeholder="+267 71 234 567"
                  autoComplete="tel"
                />
              </div>

              <div className="register-field">
                <label htmlFor="password" className="register-label">
                  Password
                </label>
                <div className="register-password-wrap">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="register-input register-input-password"
                    placeholder="Create a password"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="register-password-toggle"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="register-field">
                <label htmlFor="confirmPassword" className="register-label">
                  Confirm password
                </label>
                <div className="register-password-wrap">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className="register-input register-input-password"
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="register-password-toggle"
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <label className="register-checkbox-row">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(event) => setAcceptedTerms(event.target.checked)}
                />
                <span>I confirm these details are mine and I want to create a BOCRA citizen account.</span>
              </label>

              <div className="register-meta">
                <span className="register-meta-chip">Redirect: {redirect}</span>
                <span className="register-meta-note">
                  Demo mode creates a local account in this browser and signs you in immediately.
                </span>
              </div>

              <button type="submit" className="register-submit">
                <span>Create Account</span>
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="register-footer">
              <span>Already have an account?</span>
              <Link to={loginHref} className="register-footer-link">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .register-shell {
          padding: 148px 24px 88px;
        }

        .register-grid {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1.12fr) minmax(360px, 460px);
          gap: 40px;
          align-items: stretch;
        }

        .register-copy {
          display: grid;
          align-content: start;
          gap: 22px;
          min-width: 0;
        }

        .register-eyebrow {
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

        .register-title {
          margin: 0;
          color: #0f172a;
          font-size: clamp(2.8rem, 5vw, 4.8rem);
          line-height: 0.98;
          letter-spacing: -0.05em;
          font-weight: 800;
          font-family: 'Plus Jakarta Sans', sans-serif;
          max-width: 760px;
        }

        .register-description {
          margin: 0;
          color: #64748b;
          font-size: 18px;
          line-height: 1.8;
          font-family: 'Inter', sans-serif;
          max-width: 640px;
        }

        .register-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .register-pill {
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

        .register-feature-panel {
          padding: 26px 28px;
          border-radius: 28px;
          background:
            radial-gradient(circle at top left, rgba(214,228,247,0.8), transparent 34%),
            linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,250,252,0.96) 100%);
          border: 1px solid rgba(15,23,42,0.08);
          box-shadow: 0 24px 56px rgba(15,23,42,0.06);
        }

        .register-feature-list {
          display: grid;
          gap: 18px;
        }

        .register-feature-row {
          display: grid;
          grid-template-columns: 42px minmax(0, 1fr);
          gap: 14px;
          align-items: start;
        }

        .register-feature-icon {
          width: 42px;
          height: 42px;
          border-radius: 14px;
          background: #eef4fb;
          color: #1a3a6b;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .register-feature-title {
          color: #0f172a;
          font-size: 15px;
          font-weight: 700;
          font-family: 'Plus Jakarta Sans', sans-serif;
          margin-bottom: 5px;
        }

        .register-feature-description {
          color: #64748b;
          font-size: 14px;
          line-height: 1.7;
          font-family: 'Inter', sans-serif;
        }

        .register-visual-wrap {
          margin-top: 4px;
        }

        .register-card {
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

        .register-card-header {
          margin-bottom: 24px;
        }

        .register-card-kicker {
          color: #1a3a6b;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-family: 'Inter', sans-serif;
          margin-bottom: 10px;
        }

        .register-card-title {
          margin: 0;
          color: #111827;
          font-size: 32px;
          line-height: 1.05;
          letter-spacing: -0.04em;
          font-weight: 800;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .register-card-description {
          margin: 12px 0 0;
          color: #64748b;
          font-size: 15px;
          line-height: 1.75;
          font-family: 'Inter', sans-serif;
        }

        .register-form {
          display: grid;
          gap: 18px;
        }

        .register-field {
          display: grid;
          gap: 9px;
        }

        .register-label {
          color: #334155;
          font-size: 13px;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
        }

        .register-password-wrap {
          position: relative;
        }

        .register-input {
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

        .register-input::placeholder {
          color: #94a3b8;
        }

        .register-input:focus {
          border-color: #8cb3de;
          box-shadow: 0 0 0 4px rgba(26,58,107,0.08);
          background: #ffffff;
        }

        .register-input-password {
          padding-right: 46px;
        }

        .register-password-toggle {
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

        .register-checkbox-row {
          display: grid;
          grid-template-columns: 18px minmax(0, 1fr);
          gap: 12px;
          align-items: start;
          color: #475569;
          font-size: 13px;
          line-height: 1.6;
          font-family: 'Inter', sans-serif;
        }

        .register-checkbox-row input {
          margin-top: 2px;
        }

        .register-meta {
          display: grid;
          gap: 10px;
          margin-top: 2px;
        }

        .register-meta-chip {
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

        .register-meta-note {
          color: #64748b;
          font-size: 12px;
          line-height: 1.7;
          font-family: 'Inter', sans-serif;
        }

        .register-submit {
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

        .register-submit:hover {
          transform: translateY(-1px);
          box-shadow: 0 24px 44px rgba(26,58,107,0.28);
        }

        .register-footer {
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

        .register-footer-link {
          color: #1a3a6b;
          font-weight: 700;
          text-decoration: none;
        }

        @media (max-width: 1080px) {
          .register-grid {
            grid-template-columns: 1fr;
          }

          .register-card {
            position: static;
          }
        }

        @media (max-width: 640px) {
          .register-shell {
            padding: 132px 18px 72px;
          }

          .register-title {
            font-size: clamp(2.3rem, 10vw, 3.4rem);
          }

          .register-feature-panel,
          .register-card {
            padding: 24px 20px;
            border-radius: 24px;
          }

          .register-card-title {
            font-size: 28px;
          }
        }
      `}</style>
    </PageWrapper>
  )
}
