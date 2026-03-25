import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  FileText,
  Shield,
  Search,
  Wifi,
  TrendingUp,
  BookOpen,
} from "lucide-react";
import Spinner from "../shared/Spinner";
import { mockFetch } from "../../utils/mockFetch";
import { formatDate } from "../../utils/formatDate";
import { useHomeChat } from "../shared/PageWrapper";

const quickActions = [
  { label: "File a Complaint", to: "/portal/complaint/new" },
  { label: "Apply for Licence", to: "/portal/apply" },
  { label: "Track Your Case", to: "/portal/complaints" },
];

const stats = [
  { value: "1,423", label: "Complaints Resolved" },
  { value: "3,891", label: "Licences Active" },
  { value: "98.2%", label: "Network Uptime" },
  { value: "48hrs", label: "Avg Response Time" },
];

const services = [
  {
    title: "File Complaint",
    description: "Report telecom, postal, or broadcasting service issues quickly.",
    to: "/portal/complaint/new",
    icon: FileText,
    color: "#0f766e",
  },
  {
    title: "Apply Licence",
    description: "Start a new licence application through the citizen portal.",
    to: "/portal/apply",
    icon: Shield,
    color: "#1A3A6B",
  },
  {
    title: "Verify Licence",
    description: "Confirm licence validity using the BOCRA verification tools.",
    to: "/verify",
    icon: Search,
    color: "#0f766e",
  },
  {
    title: "Coverage Map",
    description: "Explore service coverage and network reach across Botswana.",
    to: "/map",
    icon: Wifi,
    color: "#1A3A6B",
  },
  {
    title: "QoS Dashboard",
    description: "Review performance indicators and service quality trends.",
    to: "/qos",
    icon: TrendingUp,
    color: "#0f766e",
  },
  {
    title: "Documents",
    description: "Browse public notices, guidelines, and regulatory documents.",
    to: "/documents",
    icon: BookOpen,
    color: "#1A3A6B",
  },
];

const steps = [
  {
    number: "01",
    title: "Create Account",
    description: "Sign in once to access complaints, applications, and support tools.",
  },
  {
    number: "02",
    title: "Submit Your Request",
    description: "Choose a service, complete the form, and attach any required details.",
  },
  {
    number: "03",
    title: "Track in Real Time",
    description: "Follow progress, receive updates, and return whenever you need.",
  },
];

function SectionLabel({ children, centered = false }) {
  return (
    <div
      style={{
        fontSize: 12,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "#94a3b8",
        fontWeight: 700,
        marginBottom: 20,
        textAlign: centered ? "center" : "left",
      }}
    >
      {children}
    </div>
  );
}

export default function HomePageSections() {
  const [newsItems, setNewsItems] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [newsError, setNewsError] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const statsRef = useRef(null);
  const homeChat = useHomeChat();
  const setShowHint = homeChat?.setShowHint;
  const chatDismissed = homeChat?.chatDismissed;

  useEffect(() => {
    let active = true;

    const loadNews = async () => {
      setLoadingNews(true);
      setNewsError(false);

      try {
        const items = await mockFetch("news");
        if (!active) return;

        const latest = [...items]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 3);

        setNewsItems(latest);
      } catch {
        if (!active) return;
        setNewsError(true);
      } finally {
        if (active) {
          setLoadingNews(false);
        }
      }
    };

    loadNews();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (chatDismissed || !statsRef.current) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setChatOpen(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, [chatDismissed]);

  useEffect(() => {
    if (!chatDismissed) {
      setShowHint?.(chatOpen);
    }
  }, [chatOpen, setShowHint, chatDismissed]);

  useEffect(() => {
    return () => {
      setShowHint?.(false);
    };
  }, [setShowHint]);

  return (
    <>
      <div style={{ background: "#ffffff" }}>
        <section className="home-sections-block">
          <div className="home-sections-shell">
            <SectionLabel>Quick Actions</SectionLabel>
            <div>
              {quickActions.map(({ label, to }) => (
                <Link key={label} to={to} className="home-quick-link">
                  <span className="home-quick-text">{label}</span>
                  <ArrowRight className="home-quick-arrow" size={22} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="home-sections-block">
          <div className="home-sections-shell">
            <div
              ref={statsRef}
              style={{
                padding: "60px 0",
              }}
            >
              <SectionLabel>At A Glance</SectionLabel>
              <div className="home-stats-grid">
                {stats.map(({ value, label }) => (
                  <div key={label} className="home-stat-item">
                    <div className="home-stat-value">{value}</div>
                    <div className="home-stat-label">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="home-sections-block">
          <div className="home-sections-shell">
            <SectionLabel>Services</SectionLabel>
            <div className="home-services-grid">
              {services.map(({ title, description, to, icon: Icon, color }) => (
                <Link key={title} to={to} className="home-service-link">
                  <div className="home-service-icon" style={{ color }}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="home-service-title">{title}</div>
                    <div className="home-service-description">{description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="home-sections-block">
          <div className="home-sections-shell">
            <SectionLabel>How It Works</SectionLabel>
            <div className="home-steps-grid">
              {steps.map(({ number, title, description }) => (
                <div key={number} className="home-step-item">
                  <div className="home-step-number">{number}</div>
                  <div className="home-step-content">
                    <div className="home-step-title">{title}</div>
                    <div className="home-step-description">{description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="home-sections-block">
          <div className="home-sections-shell">
            <SectionLabel>Latest News</SectionLabel>
            {loadingNews ? (
              <Spinner size="md" />
            ) : newsError ? (
              <div className="home-news-empty">
                News is unavailable right now. Please try again shortly.
              </div>
            ) : (
              <div className="home-news-grid">
                {newsItems.map(({ slug, category, title, date }) => (
                  <Link key={slug} to={`/news/${slug}`} className="home-news-link">
                    <div className="home-news-pill">{category}</div>
                    <div className="home-news-title">{title}</div>
                    <div className="home-news-date">{formatDate(date)}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      <style>{`
        .home-sections-block {
          padding: 96px 24px;
        }

        .home-sections-shell {
          max-width: 1280px;
          margin: 0 auto;
        }

        .home-quick-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 26px 0;
          color: #0f172a;
          text-decoration: none;
          border-bottom: 1px solid rgba(148, 163, 184, 0.35);
          transition: color 0.2s ease;
        }

        .home-quick-link:first-child {
          border-top: 1px solid rgba(148, 163, 184, 0.35);
        }

        .home-quick-link:hover {
          color: #1A3A6B;
        }

        .home-quick-text {
          font-size: clamp(1.8rem, 3.2vw, 2.7rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.04em;
        }

        .home-quick-arrow {
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }

        .home-quick-link:hover .home-quick-arrow {
          transform: translateX(6px);
        }

        .home-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 28px;
          align-items: start;
        }

        .home-stat-item {
          text-align: left;
        }

        .home-stat-value {
          font-size: clamp(2rem, 4vw, 3.4rem);
          line-height: 0.95;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.05em;
          margin-bottom: 10px;
        }

        .home-stat-label {
          font-size: 0.95rem;
          color: #64748b;
        }

        .home-services-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 28px 44px;
        }

        .home-service-link {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 16px;
          align-items: start;
          color: #0f172a;
          text-decoration: none;
        }

        .home-service-icon {
          width: 22px;
          height: 22px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 3px;
        }

        .home-service-title {
          font-size: 1.15rem;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 6px;
          text-decoration: underline;
          text-decoration-color: transparent;
          text-underline-offset: 0.2em;
          transition: text-decoration-color 0.2s ease, color 0.2s ease;
        }

        .home-service-link:hover .home-service-title {
          color: #1A3A6B;
          text-decoration-color: currentColor;
        }

        .home-service-description {
          color: #64748b;
          line-height: 1.6;
        }

        .home-steps-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 28px;
        }

        .home-step-item {
          position: relative;
          min-height: 220px;
          padding-top: 40px;
        }

        .home-step-number {
          position: absolute;
          top: 0;
          left: 0;
          font-size: clamp(4.5rem, 10vw, 7rem);
          line-height: 0.85;
          font-weight: 700;
          color: rgba(148, 163, 184, 0.22);
          letter-spacing: -0.08em;
          pointer-events: none;
        }

        .home-step-content {
          position: relative;
          z-index: 1;
          padding-top: 58px;
          max-width: 280px;
        }

        .home-step-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 10px;
        }

        .home-step-description {
          color: #64748b;
          line-height: 1.7;
        }

        .home-news-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 28px;
        }

        .home-news-link {
          display: block;
          text-decoration: none;
          color: inherit;
        }

        .home-news-pill {
          width: fit-content;
          padding: 7px 12px;
          border-radius: 999px;
          background: rgba(15, 118, 110, 0.12);
          color: #0f766e;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .home-news-title {
          font-size: 1.45rem;
          line-height: 1.2;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 12px;
          transition: color 0.2s ease;
        }

        .home-news-link:hover .home-news-title {
          color: #1A3A6B;
        }

        .home-news-date {
          color: #64748b;
          font-size: 0.95rem;
        }

        .home-news-empty {
          color: #64748b;
          font-size: 1rem;
          line-height: 1.7;
        }

        @media (max-width: 960px) {
          .home-stats-grid,
          .home-news-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .home-services-grid,
          .home-steps-grid {
            grid-template-columns: 1fr;
          }

          .home-step-item {
            min-height: 180px;
          }
        }

        @media (max-width: 640px) {
          .home-sections-block {
            padding: 96px 20px;
          }

          .home-stats-grid,
          .home-services-grid,
          .home-news-grid,
          .home-steps-grid {
            grid-template-columns: 1fr;
          }

          .home-quick-link {
            padding: 22px 0;
          }

          .home-quick-text {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </>
  );
}
