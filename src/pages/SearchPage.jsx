import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AlertCircle,
  ArrowRight,
  BarChart2,
  Building2,
  CheckSquare,
  FileText,
  Info,
  Map,
  Newspaper,
  Radio,
  Search,
  Shield,
  Users,
  X,
} from 'lucide-react'

const searchData = [
  {
    title: 'File a Complaint',
    desc: 'Report issues with your provider',
    route: '/portal/complaint/new',
    icon: 'AlertCircle',
  },
  {
    title: 'Type Approval',
    desc: 'Check if your device is certified',
    route: '/type-approval',
    icon: 'CheckSquare',
  },
  {
    title: 'Network Coverage Map',
    desc: 'View 2G/3G/4G coverage across Botswana',
    route: '/map',
    icon: 'Map',
  },
  {
    title: 'Consumer Rights',
    desc: 'Know your rights as a subscriber',
    route: '/consumer',
    icon: 'Users',
  },
  {
    title: 'Licensing',
    desc: 'Apply for a telecoms or broadcast licence',
    route: '/licensing',
    icon: 'FileText',
  },
  {
    title: 'Network Quality (QoS)',
    desc: 'Operator performance and ISP scorecards',
    route: '/qos',
    icon: 'BarChart2',
  },
  {
    title: 'Spectrum Management',
    desc: 'Frequency allocation and spectrum auctions',
    route: '/spectrum',
    icon: 'Radio',
  },
  {
    title: 'Cybersecurity (bwCIRT)',
    desc: 'Report cyber incidents and threats',
    route: '/cirt',
    icon: 'Shield',
  },
  {
    title: 'News & Consultations',
    desc: 'Latest BOCRA announcements',
    route: '/news',
    icon: 'Newspaper',
  },
  {
    title: 'About BOCRA',
    desc: 'Our mandate, leadership, and strategy',
    route: '/about',
    icon: 'Info',
  },
]

const popularServices = [
  { label: '.bw Domain Registry', icon: 'FileText', route: '/documents' },
  { label: 'Type Approval', icon: 'CheckSquare', route: '/type-approval' },
  { label: 'UASF Portal', icon: 'Building2', route: '/uasf' },
  { label: 'Spectrum Management', icon: 'Radio', route: '/spectrum' },
  { label: 'File a Complaint', icon: 'AlertCircle', route: '/portal/complaint/new' },
  { label: 'Network Coverage Map', icon: 'Map', route: '/map' },
  { label: 'Cybersecurity (bwCIRT)', icon: 'Shield', route: '/cirt' },
  { label: 'Network Quality (QoS)', icon: 'BarChart2', route: '/qos' },
]

const iconMap = {
  AlertCircle,
  BarChart2,
  Building2,
  CheckSquare,
  FileText,
  Info,
  Map,
  Newspaper,
  Radio,
  Shield,
  Users,
}

export default function SearchPage() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        navigate(-1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigate])

  const normalizedSearch = searchTerm.trim().toLowerCase()
  const filteredResults = normalizedSearch
    ? searchData.filter(
        (item) =>
          item.title.toLowerCase().includes(normalizedSearch) ||
          item.desc.toLowerCase().includes(normalizedSearch)
      )
    : []

  return (
    <>
      <style>{`
        .search-overlay {
          position: fixed;
          inset: 0;
          background: #09090B;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 80px 24px 40px;
          z-index: 9999;
          overflow-y: auto;
          box-sizing: border-box;
          font-family: 'Space Grotesk', 'DM Sans', sans-serif;
        }

        .search-overlay__grid {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-image: radial-gradient(circle, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        .search-overlay__close {
          position: fixed;
          top: 24px;
          right: 28px;
          display: flex;
          align-items: center;
          gap: 8px;
          z-index: 2;
        }

        .search-overlay__esc {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          padding: 3px 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.35);
          letter-spacing: 0.06em;
        }

        .search-overlay__close-btn {
          width: 32px;
          height: 32px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
        }

        .search-overlay__close-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(26, 58, 107, 0.7);
          color: #FFFFFF;
        }

        .search-overlay__content {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 600px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .search-overlay__logo {
          margin-bottom: 44px;
          text-align: center;
        }

        .search-overlay__logo img {
          height: 48px;
          width: auto;
          margin-bottom: 10px;
          filter: brightness(0) invert(1);
        }

        .search-overlay__logo-subtitle {
          margin: 0;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.25);
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .search-overlay__tagline {
          margin: 8px 0 0;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
          font-family: 'DM Sans', sans-serif;
        }

        .search-overlay__search-wrap {
          width: 100%;
          max-width: 600px;
          position: relative;
        }

        .search-overlay__search-icon {
          position: absolute;
          left: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.3);
          pointer-events: none;
        }

        .search-overlay__input {
          width: 100%;
          padding: 18px 18px 18px 52px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          box-sizing: border-box;
          outline: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 18px;
          font-weight: 500;
          color: #FFFFFF;
          caret-color: #FFFFFF;
          transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
        }

        .search-overlay__input::placeholder {
          color: rgba(255, 255, 255, 0.25);
        }

        .search-overlay__input:focus {
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 0 1px rgba(26, 58, 107, 0.35);
        }

        .search-overlay__hint {
          margin: 10px 0 0;
          text-align: center;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.2);
        }

        .search-overlay__popular {
          width: 100%;
          max-width: 600px;
          margin-top: 44px;
        }

        .search-overlay__label {
          margin: 0 0 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.25);
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .search-overlay__pill-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
        }

        .search-overlay__pill {
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.04);
          border-radius: 999px;
          padding: 9px 18px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.55);
          cursor: pointer;
          transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease, transform 0.15s ease;
        }

        .search-overlay__pill:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
          color: rgba(255, 255, 255, 0.9);
          transform: translateY(-1px);
        }

        .search-overlay__pill:focus-visible {
          outline: none;
          border-color: rgba(26, 58, 107, 0.75);
          box-shadow: 0 0 0 1px rgba(26, 58, 107, 0.45);
        }

        .search-overlay__results {
          width: 100%;
          max-width: 600px;
          margin-top: 12px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          overflow: hidden;
        }

        .search-overlay__result {
          width: 100%;
          padding: 14px 18px;
          border: 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          background: transparent;
          display: flex;
          align-items: center;
          gap: 14px;
          cursor: pointer;
          text-align: left;
          transition: background 0.12s ease;
          box-sizing: border-box;
        }

        .search-overlay__result:last-child {
          border-bottom: none;
        }

        .search-overlay__result:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .search-overlay__result:focus-visible {
          outline: none;
          background: rgba(255, 255, 255, 0.05);
          box-shadow: inset 0 0 0 1px rgba(26, 58, 107, 0.45);
        }

        .search-overlay__result-icon {
          width: 36px;
          height: 36px;
          flex: 0 0 36px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.06);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.45);
        }

        .search-overlay__result-copy {
          display: block;
          min-width: 0;
        }

        .search-overlay__result-title {
          display: block;
          margin: 0;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.85);
        }

        .search-overlay__result-desc {
          display: block;
          margin: 2px 0 0;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.35);
        }

        .search-overlay__result-arrow {
          margin-left: auto;
          color: rgba(255, 255, 255, 0.2);
          flex-shrink: 0;
        }

        .search-overlay__empty {
          margin: 0;
          padding: 32px;
          text-align: center;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.3);
        }

        @media (max-width: 640px) {
          .search-overlay {
            padding-top: 72px;
          }

          .search-overlay__close {
            top: 18px;
            right: 18px;
          }

          .search-overlay__logo img {
            height: 42px;
          }

          .search-overlay__logo-subtitle {
            font-size: 11px;
            line-height: 1.6;
          }
        }
      `}</style>

      <div className="search-overlay">
        <div className="search-overlay__grid" />

        <div className="search-overlay__close">
          <span className="search-overlay__esc">ESC</span>
          <button
            type="button"
            className="search-overlay__close-btn"
            aria-label="Close search"
            onClick={() => navigate(-1)}
          >
            <X size={15} />
          </button>
        </div>

        <div className="search-overlay__content">
          <div className="search-overlay__logo">
            <img src="/Bocra-footer-logo.png" alt="BOCRA" />
            <p className="search-overlay__logo-subtitle">
              Botswana Communications Regulatory Authority
            </p>
            <p className="search-overlay__tagline">Fair play for communications</p>
          </div>

          <div className="search-overlay__search-wrap">
            <Search className="search-overlay__search-icon" size={18} />
            <input
              autoFocus
              className="search-overlay__input"
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search services, regulations, topics..."
            />
          </div>

          <p className="search-overlay__hint">
            Try "complaint", "licence", or "spectrum"
          </p>

          {normalizedSearch ? (
            <div className="search-overlay__results">
              {filteredResults.length > 0 ? (
                filteredResults.map((result) => {
                  const Icon = iconMap[result.icon] || Info

                  return (
                    <button
                      key={result.route}
                      type="button"
                      className="search-overlay__result"
                      onClick={() => navigate(result.route)}
                    >
                      <span className="search-overlay__result-icon">
                        <Icon size={15} />
                      </span>

                      <span className="search-overlay__result-copy">
                        <span className="search-overlay__result-title">{result.title}</span>
                        <span className="search-overlay__result-desc">{result.desc}</span>
                      </span>

                      <ArrowRight className="search-overlay__result-arrow" size={14} />
                    </button>
                  )
                })
              ) : (
                <p className="search-overlay__empty">No results for "{searchTerm}"</p>
              )}
            </div>
          ) : (
            <div className="search-overlay__popular">
              <p className="search-overlay__label">Popular Services</p>
              <div className="search-overlay__pill-grid">
                {popularServices.map((service) => {
                  const Icon = iconMap[service.icon] || Info

                  return (
                    <button
                      key={service.label}
                      type="button"
                      className="search-overlay__pill"
                      onClick={() => navigate(service.route)}
                      style={
                        service.label === 'Type Approval' || service.label === 'Network Quality (QoS)'
                          ? {
                              borderColor: 'rgba(26, 58, 107, 0.28)',
                              color: 'rgba(255, 255, 255, 0.7)',
                            }
                          : undefined
                      }
                    >
                      <Icon size={13} color="currentColor" />
                      <span>{service.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

