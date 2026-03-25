import { useMemo, useState } from 'react'
import {
  Search,
  Download,
  FileText,
  Calendar,
  HardDrive,
  Clock,
  BookOpen,
  FileX,
  AlertCircle,
  ExternalLink,
  ChevronRight,
} from 'lucide-react'
import documents from '../data/documents.json'
import PageWrapper from '../components/shared/PageWrapper'

const categories = ['All', 'Legislation', 'Regulations', 'Policies', 'Reports']

function openDocument(url) {
  window.open(url, '_blank', 'noopener,noreferrer')
}

function scrollToLibrary() {
  document.getElementById('all-documents')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const featuredDocuments = useMemo(() => documents.filter((document) => document.featured), [])

  const filteredDocs = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    return documents.filter((document) => {
      const matchesSearch =
        query.length === 0 ||
        [document.title, document.shortTitle, document.description]
          .join(' ')
          .toLowerCase()
          .includes(query)

      const matchesCategory = activeCategory === 'All' || document.category === activeCategory

      return matchesSearch && matchesCategory
    })
  }, [activeCategory, searchTerm])

  const handleAnnualReportsClick = () => {
    setActiveCategory('Reports')
    scrollToLibrary()
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setActiveCategory('All')
  }

  const handleRowKeyDown = (event, url) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openDocument(url)
    }
  }

  return (
    <PageWrapper fullWidth wrapperStyle={{ background: '#ffffff' }}>
      <div className="documents-page-shell">
        <style>{`
          .documents-page-shell {
            --doc-primary: #1A3A6B;
            --doc-accent: #2E5FA3;
            --doc-light: #D6E4F7;
            --doc-teal: #0F6E56;
            --doc-heading: #111111;
            --doc-body: #6b7280;
            --doc-alt: #f8f9fa;
            --doc-white: #ffffff;
            --doc-border: #e5e7eb;
            --doc-red: #dc2626;
            --doc-muted: #9ca3af;
            color: var(--doc-heading);
            background: var(--doc-white);
          }

          .documents-page-shell * {
            box-sizing: border-box;
          }

          .documents-container {
            width: 100%;
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 24px;
          }

          .documents-section-label {
            margin: 0 0 16px;
            color: var(--doc-muted);
            font-family: Inter, sans-serif;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.1em;
            text-transform: uppercase;
          }

          .documents-hero {
            padding: 100px 0 60px;
            background:
              linear-gradient(135deg, rgba(5, 8, 22, 0.58) 0%, rgba(5, 8, 22, 0.34) 38%, rgba(5, 8, 22, 0.74) 100%),
              url('/hero-documents-optimized.jpg') center center / cover no-repeat;
          }

          .documents-hero-grid {
            display: grid;
            grid-template-columns: minmax(0, 58fr) minmax(0, 42fr);
            gap: 64px;
            align-items: center;
          }

          .documents-hero-title {
            margin: 0;
            color: var(--doc-white);
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: clamp(36px, 5vw, 58px);
            font-weight: 800;
            line-height: 1.05;
            letter-spacing: -0.025em;
          }

          .documents-hero-copy {
            max-width: 460px;
            margin: 20px 0 0;
            color: rgba(255, 255, 255, 0.82);
            font-family: Inter, sans-serif;
            font-size: 17px;
            font-weight: 400;
            line-height: 1.75;
          }

          .documents-hero-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-top: 36px;
          }

          .documents-primary-button,
          .documents-secondary-button,
          .documents-clear-button,
          .documents-cta-primary,
          .documents-cta-secondary {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            border: 0;
            border-radius: 50px;
            cursor: pointer;
            font-family: Inter, sans-serif;
            font-size: 14px;
            font-weight: 600;
            line-height: 1;
            text-decoration: none;
            transition: opacity 0.2s ease, background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
          }

          .documents-primary-button,
          .documents-secondary-button {
            padding: 14px 28px;
          }

          .documents-primary-button {
            background: var(--doc-primary);
            color: var(--doc-white);
          }

          .documents-secondary-button,
          .documents-clear-button {
            background: rgba(255, 255, 255, 0.14);
            color: var(--doc-white);
            border: 1px solid rgba(255, 255, 255, 0.16);
          }

          .documents-primary-button:hover,
          .documents-secondary-button:hover,
          .documents-clear-button:hover,
          .documents-cta-primary:hover,
          .documents-cta-secondary:hover {
            opacity: 0.85;
          }

          .documents-stats {
            width: 100%;
          }

          .documents-hero-aside {
            display: grid;
            gap: 28px;
          }

          .documents-stat-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 24px;
            padding: 22px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          }

          .documents-stat-row:last-child {
            border-bottom: 0;
          }

          .documents-stat-value {
            color: var(--doc-white);
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 42px;
            font-weight: 800;
            letter-spacing: -0.03em;
            line-height: 1;
          }

          .documents-stat-label {
            max-width: 180px;
            margin: 0;
            color: rgba(255, 255, 255, 0.78);
            font-family: Inter, sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 1.5;
            text-align: right;
          }

          .documents-featured-section {
            padding: 64px 0;
            background: var(--doc-alt);
          }

          .documents-section-title {
            margin: 0;
            color: var(--doc-heading);
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 36px;
            font-weight: 700;
            letter-spacing: -0.02em;
            line-height: 1.15;
          }

          .documents-section-copy {
            margin: 12px 0 40px;
            color: var(--doc-body);
            font-family: Inter, sans-serif;
            font-size: 15px;
            font-weight: 400;
            line-height: 1.7;
          }

          .documents-featured-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 20px;
          }

          .documents-featured-card {
            display: flex;
            flex-direction: column;
            height: 100%;
            padding: 28px;
            background: var(--doc-white);
            border: 1px solid var(--doc-border);
            border-radius: 16px;
            cursor: pointer;
            transition: border-color 0.2s ease;
          }

          .documents-featured-card:hover {
            border-color: var(--doc-primary);
          }

          .documents-featured-top {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 20px;
          }

          .documents-featured-badges,
          .documents-row-badges {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
          }

          .documents-category-badge,
          .documents-tag-pill,
          .documents-consultation-pill {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            border-radius: 50px;
            font-family: Inter, sans-serif;
            white-space: nowrap;
          }

          .documents-category-badge {
            padding: 5px 14px;
            background: var(--doc-light);
            color: var(--doc-primary);
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.06em;
            text-transform: uppercase;
          }

          .documents-tag-pill {
            padding: 5px 12px;
            background: var(--doc-alt);
            border: 1px solid var(--doc-border);
            color: var(--doc-body);
            font-size: 11px;
            font-weight: 500;
          }

          .documents-consultation-pill {
            padding: 5px 12px;
            background: var(--doc-white);
            border: 1px solid var(--doc-red);
            color: var(--doc-red);
            font-size: 11px;
            font-weight: 600;
          }
          .documents-featured-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 48px;
            background: var(--doc-light);
            border-radius: 12px;
            color: var(--doc-primary);
          }

          .documents-featured-title {
            margin: 16px 0 0;
            color: var(--doc-heading);
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 18px;
            font-weight: 700;
            line-height: 1.3;
          }

          .documents-featured-description {
            flex: 1;
            margin: 10px 0 0;
            color: var(--doc-body);
            font-family: Inter, sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 1.65;
          }

          .documents-featured-meta,
          .documents-row-meta {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 16px;
          }

          .documents-featured-meta {
            margin-top: 20px;
            padding-top: 16px;
            border-top: 1px solid var(--doc-border);
          }

          .documents-meta-item {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            color: var(--doc-muted);
            font-family: Inter, sans-serif;
            font-size: 12px;
            font-weight: 400;
            line-height: 1.5;
          }

          .documents-featured-download {
            width: 100%;
            margin-top: 16px;
            padding: 13px;
            border: 0;
            border-radius: 8px;
            background: var(--doc-primary);
            color: var(--doc-white);
            cursor: pointer;
            font-family: Inter, sans-serif;
            font-size: 13px;
            font-weight: 600;
            transition: opacity 0.2s ease;
          }

          .documents-featured-download:hover {
            opacity: 0.85;
          }

          .documents-library {
            padding: 64px 0 0;
            background: var(--doc-white);
          }

          .documents-library-controls {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
            margin-bottom: 32px;
          }

          .documents-search-wrap {
            position: relative;
            flex: 1;
            min-width: 220px;
          }

          .documents-search-icon {
            position: absolute;
            left: 14px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--doc-muted);
            pointer-events: none;
          }

          .documents-search-input {
            width: 100%;
            padding: 12px 16px 12px 42px;
            border: 1px solid var(--doc-border);
            border-radius: 8px;
            outline: none;
            background: var(--doc-white);
            color: var(--doc-heading);
            font-family: Inter, sans-serif;
            font-size: 14px;
            font-weight: 400;
            transition: border-color 0.15s ease;
          }

          .documents-search-input::placeholder {
            color: var(--doc-muted);
          }

          .documents-search-input:focus {
            border-color: var(--doc-primary);
          }

          .documents-filter-pills {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
          }

          .documents-filter-pill {
            padding: 8px 18px;
            border-radius: 50px;
            border: 1px solid var(--doc-border);
            background: var(--doc-white);
            color: var(--doc-body);
            cursor: pointer;
            font-family: Inter, sans-serif;
            font-size: 13px;
            font-weight: 600;
            transition: border-color 0.15s ease, color 0.15s ease, background-color 0.15s ease;
          }

          .documents-filter-pill:hover {
            border-color: var(--doc-primary);
            color: var(--doc-primary);
          }

          .documents-filter-pill.is-active {
            background: var(--doc-primary);
            border-color: var(--doc-primary);
            color: var(--doc-white);
          }

          .documents-results-count {
            margin-left: auto;
            color: var(--doc-muted);
            font-family: Inter, sans-serif;
            font-size: 13px;
            font-weight: 400;
          }

          .documents-list {
            border-top: 1px solid var(--doc-border);
          }

          .documents-list-row {
            padding: 24px 0;
            border-bottom: 1px solid var(--doc-border);
            cursor: pointer;
          }

          .documents-list-row-inner {
            display: flex;
            align-items: center;
            gap: 24px;
            padding: 24px;
            margin: 0 -24px;
            border-radius: 8px;
            transition: background 0.15s ease;
          }

          .documents-list-row:hover .documents-list-row-inner,
          .documents-list-row:focus-within .documents-list-row-inner {
            background: var(--doc-alt);
          }

          .documents-row-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 52px;
            min-width: 52px;
            height: 52px;
            border: 1px solid var(--doc-border);
            border-radius: 12px;
            background: var(--doc-alt);
            color: var(--doc-primary);
          }

          .documents-row-content {
            flex: 1;
            min-width: 240px;
          }

          .documents-row-badges .documents-category-badge,
          .documents-row-badges .documents-tag-pill,
          .documents-row-badges .documents-consultation-pill {
            padding-top: 3px;
            padding-bottom: 3px;
            font-size: 10px;
          }

          .documents-row-title {
            margin: 6px 0 0;
            color: var(--doc-heading);
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 16px;
            font-weight: 600;
            line-height: 1.3;
          }

          .documents-row-meta {
            margin-top: 6px;
          }

          .documents-row-action {
            flex-shrink: 0;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            padding: 10px 20px;
            border: 0;
            border-radius: 50px;
            background: var(--doc-light);
            color: var(--doc-primary);
            cursor: pointer;
            font-family: Inter, sans-serif;
            font-size: 13px;
            font-weight: 600;
            transition: background-color 0.15s ease, color 0.15s ease;
          }

          .documents-row-action:hover {
            background: var(--doc-primary);
            color: var(--doc-white);
          }
          .documents-empty-state {
            padding: 64px 0;
            text-align: center;
          }

          .documents-empty-title {
            margin: 0;
            color: var(--doc-heading);
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 20px;
            font-weight: 600;
          }

          .documents-empty-copy {
            margin: 8px 0 0;
            color: var(--doc-body);
            font-family: Inter, sans-serif;
            font-size: 15px;
            font-weight: 400;
            line-height: 1.6;
          }

          .documents-clear-button {
            margin-top: 20px;
            padding: 12px 24px;
          }

          .documents-callout-wrap {
            padding: 64px 24px 0;
            background: var(--doc-white);
          }

          .documents-callout {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 32px;
            margin: 0 auto 64px;
            padding: 48px 40px;
            border: 1px solid var(--doc-border);
            border-radius: 16px;
            background: var(--doc-alt);
          }

          .documents-callout-left {
            display: flex;
            align-items: flex-start;
            gap: 16px;
          }

          .documents-callout-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 48px;
            min-width: 48px;
            height: 48px;
            border-radius: 12px;
            background: var(--doc-light);
            color: var(--doc-primary);
          }

          .documents-callout-title {
            margin: 0;
            color: var(--doc-heading);
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 16px;
            font-weight: 700;
            line-height: 1.4;
          }

          .documents-callout-copy {
            margin: 6px 0 0;
            color: var(--doc-body);
            font-family: Inter, sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 1.6;
          }

          .documents-callout-link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: var(--doc-primary);
            font-family: Inter, sans-serif;
            font-size: 14px;
            font-weight: 600;
            text-decoration: none;
            white-space: nowrap;
          }

          .documents-callout-link:hover {
            opacity: 0.85;
          }

          .documents-cta-section {
            padding: 0 24px 96px;
            background: var(--doc-white);
          }

          .documents-cta-strip {
            max-width: 1280px;
            margin: 0 auto;
            padding: 64px 40px;
            border-radius: 16px;
            background: var(--doc-primary);
            text-align: center;
          }

          .documents-cta-title {
            margin: 0;
            color: var(--doc-white);
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 34px;
            font-weight: 700;
            letter-spacing: -0.02em;
            line-height: 1.2;
          }

          .documents-cta-copy {
            margin: 14px auto 0;
            max-width: 620px;
            color: rgba(255, 255, 255, 0.65);
            font-family: Inter, sans-serif;
            font-size: 16px;
            font-weight: 400;
            line-height: 1.7;
          }

          .documents-cta-actions {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 12px;
            margin-top: 32px;
          }

          .documents-cta-primary,
          .documents-cta-secondary {
            padding: 13px 30px;
          }

          .documents-cta-primary {
            background: var(--doc-white);
            color: var(--doc-primary);
          }

          .documents-cta-secondary {
            background: transparent;
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: var(--doc-white);
          }

          @media (max-width: 1100px) {
            .documents-featured-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .documents-results-count {
              width: 100%;
              margin-left: 0;
            }
          }

          @media (max-width: 900px) {
            .documents-hero-grid {
              grid-template-columns: 1fr;
              gap: 32px;
            }

            .documents-stat-label {
              text-align: left;
            }

            .documents-list-row-inner {
              align-items: flex-start;
              flex-wrap: wrap;
            }

            .documents-row-action {
              margin-left: 76px;
            }

            .documents-callout {
              flex-direction: column;
              align-items: flex-start;
            }
          }

          @media (max-width: 720px) {
            .documents-hero {
              padding: 84px 0 52px;
            }

            .documents-featured-section,
            .documents-library {
              padding-top: 52px;
            }

            .documents-featured-grid {
              grid-template-columns: 1fr;
            }

            .documents-stat-row {
              flex-direction: column;
              align-items: flex-start;
            }

            .documents-stat-label {
              max-width: none;
            }

            .documents-list-row-inner {
              padding: 20px;
              margin: 0;
            }

            .documents-row-icon {
              width: 48px;
              min-width: 48px;
              height: 48px;
            }

            .documents-row-action {
              width: 100%;
              margin-left: 0;
            }

            .documents-callout,
            .documents-cta-strip {
              padding: 32px 24px;
            }

            .documents-callout-wrap,
            .documents-cta-section {
              padding-left: 16px;
              padding-right: 16px;
            }
          }
        `}</style>

        <section className="documents-hero">
          <div className="documents-container">
            <div className="documents-hero-grid">
              <div>
                <p className="documents-section-label" style={{ color: 'rgba(255, 255, 255, 0.74)' }}>Publications &amp; Documents</p>
                <h1 className="documents-hero-title">
                  Official Documents,
                  <br />
                  Regulations &amp; Reports
                </h1>
                <p className="documents-hero-copy">
                  Every BOCRA publication in one place - legislation, annual reports, broadband data,
                  and policy frameworks. All documents are real, current, and free to download.
                </p>
                <div className="documents-hero-actions">
                  <button className="documents-primary-button" type="button" onClick={scrollToLibrary}>
                    <FileText size={16} />
                    Browse All Documents
                  </button>
                  <button className="documents-secondary-button" type="button" onClick={handleAnnualReportsClick}>
                    Annual Reports
                  </button>
                </div>
              </div>

              <div className="documents-hero-aside">
                <div className="documents-stats" aria-label="Document library highlights" style={{ background: 'rgba(3, 7, 18, 0.44)', border: '1px solid rgba(255, 255, 255, 0.12)', borderRadius: 28, padding: '8px 28px', backdropFilter: 'blur(12px)' }}>
                  <div className="documents-stat-row">
                    <span className="documents-stat-value">12</span>
                    <p className="documents-stat-label">Real documents from the official BOCRA website</p>
                  </div>
                  <div className="documents-stat-row">
                    <span className="documents-stat-value">5</span>
                    <p className="documents-stat-label">Annual reports available for download right now</p>
                  </div>
                  <div className="documents-stat-row">
                    <span className="documents-stat-value">Free</span>
                    <p className="documents-stat-label">No login, no paywall - open access to all citizens</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="documents-featured-section">
          <div className="documents-container">
            <p className="documents-section-label">Essential Reading</p>
            <h2 className="documents-section-title">Start With These</h2>
            <p className="documents-section-copy">
              Our most accessed documents - verified, current, and directly downloadable.
            </p>

            <div className="documents-featured-grid">
              {featuredDocuments.map((document) => (
                <article
                  key={document.id}
                  className="documents-featured-card"
                  onClick={() => openDocument(document.downloadUrl)}
                >
                  <div className="documents-featured-top">
                    <span className="documents-category-badge">{document.category}</span>
                    <div className="documents-featured-badges">
                      {document.tag ? <span className="documents-tag-pill">{document.tag}</span> : null}
                      {document.consultation ? (
                        <span className="documents-consultation-pill">
                          <AlertCircle size={12} />
                          Consultation
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="documents-featured-icon">
                    <FileText size={22} />
                  </div>

                  <h3 className="documents-featured-title">{document.title}</h3>
                  <p className="documents-featured-description">{document.description}</p>

                  <div className="documents-featured-meta">
                    <span className="documents-meta-item">
                      <HardDrive size={13} />
                      {document.fileSize}
                    </span>
                    <span className="documents-meta-item">
                      <BookOpen size={13} />
                      {document.pages} pages
                    </span>
                    <span className="documents-meta-item">
                      <Clock size={13} />
                      {document.readTime}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="documents-featured-download"
                    onClick={(event) => {
                      event.stopPropagation()
                      openDocument(document.downloadUrl)
                    }}
                  >
                    <Download size={15} />
                    Download PDF
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="documents-library" id="all-documents">
          <div className="documents-container">
            <p className="documents-section-label">Complete Library</p>

            <div className="documents-library-controls">
              <div className="documents-search-wrap">
                <Search size={16} className="documents-search-icon" />
                <input
                  type="search"
                  className="documents-search-input"
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>

              <div className="documents-filter-pills">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`documents-filter-pill ${activeCategory === category ? 'is-active' : ''}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <p className="documents-results-count">{filteredDocs.length} documents</p>
            </div>

            {filteredDocs.length > 0 ? (
              <div className="documents-list">
                {filteredDocs.map((document) => (
                  <article
                    key={document.id}
                    className="documents-list-row"
                    role="button"
                    tabIndex={0}
                    onClick={() => openDocument(document.downloadUrl)}
                    onKeyDown={(event) => handleRowKeyDown(event, document.downloadUrl)}
                  >
                    <div className="documents-list-row-inner">
                      <div className="documents-row-icon">
                        <FileText size={22} />
                      </div>

                      <div className="documents-row-content">
                        <div className="documents-row-badges">
                          <span className="documents-category-badge">{document.category}</span>
                          {document.tag ? <span className="documents-tag-pill">{document.tag}</span> : null}
                          {document.consultation ? (
                            <span className="documents-consultation-pill">
                              <AlertCircle size={12} />
                              Consultation
                            </span>
                          ) : null}
                        </div>

                        <h3 className="documents-row-title">{document.title}</h3>

                        <div className="documents-row-meta">
                          <span className="documents-meta-item">
                            <Calendar size={12} />
                            {document.date}
                          </span>
                          <span className="documents-meta-item">
                            <HardDrive size={12} />
                            {document.fileSize}
                          </span>
                          <span className="documents-meta-item">
                            <Clock size={12} />
                            {document.readTime}
                          </span>
                          <span className="documents-meta-item">
                            <BookOpen size={12} />
                            {document.pages} pages
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="documents-row-action"
                        onClick={(event) => {
                          event.stopPropagation()
                          openDocument(document.downloadUrl)
                        }}
                      >
                        <Download size={14} />
                        Download
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="documents-empty-state">
                <FileX size={48} color="#e5e7eb" style={{ marginBottom: 16 }} />
                <h3 className="documents-empty-title">No documents found</h3>
                <p className="documents-empty-copy">Try searching something else or select &quot;All&quot;</p>
                <button type="button" className="documents-clear-button" onClick={handleClearFilters}>
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="documents-callout-wrap">
          <div className="documents-container">
            <div className="documents-callout">
              <div className="documents-callout-left">
                <div className="documents-callout-icon">
                  <ExternalLink size={22} />
                </div>
                <div>
                  <h3 className="documents-callout-title">All documents link directly to bocra.org.bw</h3>
                  <p className="documents-callout-copy">
                    Every download opens a verified PDF from BOCRA&apos;s official government server.
                    No third-party hosting. No paywalls.
                  </p>
                </div>
              </div>

              <a
                className="documents-callout-link"
                href="https://www.bocra.org.bw"
                target="_blank"
                rel="noreferrer"
              >
                Visit BOCRA Website
                <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </section>

        <section className="documents-cta-section">
          <div className="documents-cta-strip">
            <h2 className="documents-cta-title">Can&apos;t Find What You Need?</h2>
            <p className="documents-cta-copy">
              Contact BOCRA&apos;s legal and policy team directly or request a specific document by
              email.
            </p>
            <div className="documents-cta-actions">
              <a className="documents-cta-primary" href="/contact">
                Contact BOCRA -&gt;
              </a>
              <a className="documents-cta-secondary" href="mailto:info@bocra.org.bw">
                info@bocra.org.bw
              </a>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}

