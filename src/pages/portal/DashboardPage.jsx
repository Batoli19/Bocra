import { Link } from 'react-router-dom'
import { ArrowRight, BellRing, FileText, FolderKanban, UserRound } from 'lucide-react'
import PageWrapper from '../../components/shared/PageWrapper'
import { useAuth } from '../../hooks/useAuth'
import portalHeroImage from '../../../Gemini_Generated_Image_ot2t2sot2t2sot2t.png'

const actions = [
  {
    title: 'File a Complaint',
    description: 'Report a telecom, postal, or broadcasting issue with guided steps.',
    href: '/portal/complaint/new',
    icon: FileText,
  },
  {
    title: 'Track Complaints',
    description: 'Review submitted cases and follow the latest progress updates.',
    href: '/portal/complaints',
    icon: FolderKanban,
  },
  {
    title: 'Browse Services',
    description: 'Return to the public site and open other BOCRA service information.',
    href: '/',
    icon: ArrowRight,
  },
]

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <PageWrapper
      fullWidth
      wrapperStyle={{
        background:
          'linear-gradient(180deg, #f8fbff 0%, #f2f6fb 42%, #ffffff 100%)',
      }}
    >
      <section className="portal-shell">
        <div className="portal-hero">
          <div className="portal-kicker">Citizen Portal</div>
          <h1 className="portal-title">Welcome to your BOCRA account.</h1>
          <p className="portal-description">
            Your account is ready. From here you can submit complaints, review your activity, and move through BOCRA services without starting over each time.
          </p>

          <div className="portal-highlight-row">
            <div className="portal-highlight-card">
              <div className="portal-highlight-icon">
                <UserRound size={18} />
              </div>
              <div>
                <div className="portal-highlight-label">Signed in as</div>
                <div className="portal-highlight-value">{user?.name || 'BOCRA Citizen'}</div>
              </div>
            </div>

            <div className="portal-highlight-card">
              <div className="portal-highlight-icon">
                <BellRing size={18} />
              </div>
              <div>
                <div className="portal-highlight-label">Contact</div>
                <div className="portal-highlight-value">{user?.email || user?.phone || 'Details saved locally'}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="portal-actions-grid">
          {actions.map(({ title, description, href, icon: Icon }) => (
            <Link key={title} to={href} className="portal-action-card">
              <div className="portal-action-icon">
                <Icon size={18} />
              </div>
              <div className="portal-action-title">{title}</div>
              <div className="portal-action-description">{description}</div>
              <div className="portal-action-link">
                Open
                <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <style>{`
        .portal-shell {
          max-width: 1240px;
          margin: 0 auto;
          padding: 148px 24px 88px;
        }

        .portal-hero {
          padding: 34px;
          border-radius: 32px;
          background:
            linear-gradient(135deg, rgba(4,12,24,0.86) 0%, rgba(13,41,86,0.72) 52%, rgba(6,14,28,0.78) 100%),
            url(${portalHeroImage});
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 30px 72px rgba(15,23,42,0.14);
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .portal-kicker {
          display: inline-flex;
          align-items: center;
          padding: 8px 16px;
          border-radius: 999px;
          background: rgba(255,255,255,0.14);
          color: #ffffff;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-family: 'Inter', sans-serif;
          border: 1px solid rgba(255,255,255,0.2);
          backdrop-filter: blur(10px);
        }

        .portal-title {
          margin: 20px 0 0;
          color: #ffffff;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          line-height: 0.98;
          letter-spacing: -0.05em;
          font-weight: 800;
          font-family: 'Plus Jakarta Sans', sans-serif;
          max-width: 760px;
        }

        .portal-description {
          margin: 18px 0 0;
          max-width: 760px;
          color: rgba(226,232,240,0.94);
          font-size: 18px;
          line-height: 1.8;
          font-family: 'Inter', sans-serif;
        }

        .portal-highlight-row {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
          margin-top: 28px;
        }

        .portal-highlight-card {
          display: grid;
          grid-template-columns: 44px minmax(0, 1fr);
          gap: 14px;
          align-items: center;
          padding: 18px 20px;
          border-radius: 22px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.16);
          backdrop-filter: blur(12px);
        }

        .portal-highlight-icon {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: rgba(255,255,255,0.18);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .portal-highlight-label {
          color: rgba(226,232,240,0.78);
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-family: 'Inter', sans-serif;
        }

        .portal-highlight-value {
          margin-top: 6px;
          color: #ffffff;
          font-size: 18px;
          font-weight: 700;
          line-height: 1.4;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .portal-actions-grid {
          margin-top: 28px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
        }

        .portal-action-card {
          display: grid;
          gap: 16px;
          padding: 26px;
          border-radius: 28px;
          background: #ffffff;
          border: 1px solid rgba(15,23,42,0.08);
          box-shadow: 0 24px 56px rgba(15,23,42,0.06);
          text-decoration: none;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }

        .portal-action-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 30px 62px rgba(15,23,42,0.10);
        }

        .portal-action-icon {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          background: #f1f5f9;
          color: #1a3a6b;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .portal-action-title {
          color: #0f172a;
          font-size: 22px;
          font-weight: 800;
          line-height: 1.1;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .portal-action-description {
          color: #64748b;
          font-size: 14px;
          line-height: 1.8;
          font-family: 'Inter', sans-serif;
        }

        .portal-action-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #1a3a6b;
          font-size: 14px;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
        }

        @media (max-width: 960px) {
          .portal-highlight-row,
          .portal-actions-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .portal-shell {
            padding: 132px 18px 72px;
          }

          .portal-hero,
          .portal-action-card {
            padding: 22px 20px;
            border-radius: 24px;
          }

          .portal-title {
            font-size: clamp(2.2rem, 11vw, 3.2rem);
          }
        }
      `}</style>
    </PageWrapper>
  )
}
