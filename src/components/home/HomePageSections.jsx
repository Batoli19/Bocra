import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BarChart2,
  BookOpen,
  FileText,
  Map,
  Search,
} from "lucide-react";
import Spinner from "../shared/Spinner";
import { mockFetch } from "../../utils/mockFetch";
import { formatDate } from "../../utils/formatDate";
import { useHomeChat } from "../shared/PageWrapper";
import portalHeroImage from "../../../Gemini_Generated_Image_ot2t2sot2t2sot2t.png";
import newsImageOne from "../../../07-03-2026_government-addresses-fuel-security-concerns-_1772892887_image_main_90430.jpg";
import newsImageTwo from "../../../24-03-2026_lobatse-council-to-maximise-existing-revenue-streams_1774335125_image_main_90697.jpeg";

const authHref = (dst) =>
  JSON.parse(localStorage.getItem("bocra_user") || "null")
    ? dst
    : `/login?redirect=${dst}`;
const applyLicenceHref = "/licensing";

const quickActions = [
  { label: "File a Complaint", to: authHref("/portal/complaint/new") },
  { label: "Apply for Licence", to: applyLicenceHref },
  { label: "Track Your Case", to: authHref("/portal/complaints") },
];

const stats = [
  { id: "resolved", value: 1423, label: "Complaints Resolved", animate: true },
  { id: "active", value: 3891, label: "Licences Active", animate: true },
  { id: "uptime", value: "98.2%", label: "Network Uptime", animate: false },
  { id: "response", value: "48hrs", label: "Avg Response Time", animate: false },
];

const services = [
  {
    title: "File a Complaint",
    description: "Report telecom, postal, or broadcasting issues",
    to: "/portal/complaint/new",
    icon: FileText,
  },
  {
    title: "Apply for Licence",
    description: "Start a new licence application online",
    to: applyLicenceHref,
    icon: Award,
  },
  {
    title: "Verify a Licence",
    description: "Confirm licence validity instantly",
    to: "/verify",
    icon: Search,
  },
  {
    title: "Coverage Map",
    description: "Explore 2G/3G/4G coverage across Botswana",
    to: "/map",
    icon: Map,
  },
  {
    title: "QoS Dashboard",
    description: "Review network performance and ISP scorecards",
    to: "/qos",
    icon: BarChart2,
  },
  {
    title: "Documents & Regulations",
    description: "Browse all public notices and regulatory documents",
    to: "/documents",
    icon: BookOpen,
  },
];

const serviceColumns = [services.slice(0, 3), services.slice(3, 6)];
const homepageNewsImages = [newsImageOne, newsImageTwo];

const steps = [
  {
    number: "01",
    title: "Create Account",
    description:
      "Sign in once to access complaints, applications, and all support tools.",
    to: "/register",
  },
  {
    number: "02",
    title: "Submit Your Request",
    description:
      "Choose a service, complete the form, and attach any required documents.",
  },
  {
    number: "03",
    title: "Track in Real Time",
    description:
      "Follow your case progress, receive updates, and return anytime.",
  },
];

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

const formatCount = (value) =>
  new Intl.NumberFormat("en-US").format(Math.round(value));

const getNewsAccent = (category = "") => {
  switch (String(category).toUpperCase()) {
    case "LICENSING":
      return "#1A3A6B";
    case "ANNOUNCEMENTS":
      return "#0F6E56";
    case "CONSUMER":
      return "#2E5FA3";
    default:
      return "#1A3A6B";
  }
};

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
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [statCounts, setStatCounts] = useState({ resolved: 0, active: 0 });
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
    if (!statsRef.current || statsAnimated) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, [statsAnimated]);

  useEffect(() => {
    if (!statsAnimated) return undefined;

    let frameId = 0;
    const duration = 1800;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = easeOutCubic(progress);

      setStatCounts({
        resolved: 1423 * eased,
        active: 3891 * eased,
      });

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [statsAnimated]);

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

        <section className="home-stats-section">
          <div ref={statsRef} className="home-stats-inner">
            <div className="home-stats-kicker">AT A GLANCE</div>
            <div className="home-stats-row">
              {stats.map(({ id, value, label, animate }) => (
                <div
                  key={id}
                  className={`home-stat-item${statsAnimated ? " is-visible" : ""}`}
                >
                  <div className="home-stat-value">
                    {animate ? formatCount(statCounts[id]) : value}
                  </div>
                  <div className="home-stat-label">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="home-sections-block home-services-section">
          <div className="home-sections-shell">
            <SectionLabel>SERVICES</SectionLabel>
            <h2 className="home-section-heading">
              Everything You Need,
              <br />
              In One Place.
            </h2>

            <div className="home-services-columns">
              {serviceColumns.map((column, index) => (
                <div key={`column-${index}`} className="home-services-column">
                  {column.map(({ title, description, to, icon: Icon }) => (
                    <Link key={title} to={to} className="home-service-row">
                      <div className="home-service-icon-box">
                        <Icon size={20} />
                      </div>
                      <div className="home-service-copy">
                        <div className="home-service-title">{title}</div>
                        <div className="home-service-description">{description}</div>
                      </div>
                      <ArrowRight className="home-service-arrow" size={16} />
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="home-sections-block home-steps-section">
          <div className="home-sections-shell">
            <SectionLabel>HOW IT WORKS</SectionLabel>
            <div className="home-steps-row">
              {steps.map(({ number, title, description, to }) => {
                const content = (
                  <>
                    <span className="home-step-number">{number}</span>
                    <div className="home-step-title">{title}</div>
                    <div className="home-step-description">{description}</div>
                  </>
                );

                if (to) {
                  return (
                    <Link key={number} to={to} className="home-step-item home-step-link">
                      {content}
                    </Link>
                  );
                }

                return (
                  <div key={number} className="home-step-item">
                    {content}
                  </div>
                );
              })}
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
                {newsItems.map(({ slug, category, title, date, image }, index) => (
                  <Link key={slug} to="/news" className="home-news-link">
                    <div
                      className="home-news-accent"
                      style={{ background: getNewsAccent(category) }}
                    />
                    <div className="home-news-image-wrap">
                      <img
                        src={homepageNewsImages[index] || image}
                        alt={title}
                        className="home-news-image"
                      />
                    </div>
                    <div className="home-news-card-body">
                      <div className="home-news-pill">{category}</div>
                      <div className="home-news-title">{title}</div>
                      <div className="home-news-date">{formatDate(date)}</div>
                      <div className="home-news-readmore">
                        <span>Read more</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      <style>{`
        .home-sections-block {
          padding: 80px 0;
        }

        .home-sections-shell {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
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

        .home-stats-section {
          width: 100%;
          background: url(${portalHeroImage});
          padding: 64px 40px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .home-stats-inner {
          max-width: 1280px;
          margin: 0 auto;
        }

        .home-stats-kicker {
          margin-bottom: 40px;
          text-align: center;
          font-family: "Inter", sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
        }

        .home-stats-row {
          display: flex;
          align-items: stretch;
        }

        .home-stat-item {
          flex: 1;
          padding: 0 32px;
          text-align: center;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .home-stat-item.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .home-stat-item + .home-stat-item {
          border-left: 1px solid rgba(255,255,255,0.08);
        }

        .home-stat-value {
          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: clamp(48px, 6vw, 72px);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.04em;
          color: #ffffff;
        }

        .home-stat-label {
          margin-top: 10px;
          font-family: "Inter", sans-serif;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0.02em;
          color: rgba(255,255,255,0.45);
        }

        .home-services-section {
          background: #ffffff;
        }

        .home-section-heading {
          margin: 0 0 48px;
          color: #111111;
          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 800;
          line-height: 1.02;
          letter-spacing: -0.025em;
        }

        .home-services-columns {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 40px;
        }

        .home-services-column {
          display: flex;
          flex-direction: column;
        }

        .home-service-row {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          padding: 24px 0;
          border-bottom: 1px solid #e5e7eb;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          color: inherit;
        }

        .home-service-icon-box {
          width: 44px;
          height: 44px;
          min-width: 44px;
          border-radius: 10px;
          background: #f8f9fa;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1A3A6B;
          transition: background 0.2s ease;
        }

        .home-service-copy {
          min-width: 0;
        }

        .home-service-title {
          color: #111111;
          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 17px;
          font-weight: 700;
          transition: color 0.2s ease;
        }

        .home-service-description {
          margin-top: 4px;
          color: #6b7280;
          font-family: "Inter", sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.6;
        }

        .home-service-arrow {
          margin-left: auto;
          flex-shrink: 0;
          color: #9ca3af;
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .home-service-row:hover .home-service-title {
          color: #1A3A6B;
        }

        .home-service-row:hover .home-service-icon-box {
          background: #D6E4F7;
        }

        .home-service-row:hover .home-service-arrow {
          transform: translateX(4px);
          color: #1A3A6B;
        }

        .home-steps-section {
          background: url(${portalHeroImage});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .home-steps-row {
          display: flex;
          gap: 0;
        }

        .home-step-item {
          flex: 1;
          padding: 0 40px;
          border-right: 1px solid #e5e7eb;
          text-decoration: none;
          color: inherit;
        }

        .home-step-item:last-child {
          border-right: none;
        }

        .home-step-link {
          transition: transform 0.2s ease;
        }

        .home-step-link:hover {
          transform: translateY(-2px);
        }

        .home-step-link:hover .home-step-title {
          color: #1A3A6B;
        }

        .home-step-number {
          display: block;
          margin-bottom: -16px;
          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 80px;
          font-weight: 800;
          line-height: 1;
          color: #f0f0f0;
        }

        .home-step-title {
          margin-bottom: 10px;
          color: #ffffff;
          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 20px;
          font-weight: 700;
          transition: color 0.2s ease;
          text-shadow: 0 10px 24px rgba(15, 23, 42, 0.24);
        }

        .home-step-description {
          max-width: 260px;
          color: rgba(255,255,255,0.88);
          font-family: "Inter", sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.65;
          text-shadow: 0 8px 20px rgba(15, 23, 42, 0.24);
        }

        .home-news-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 28px;
        }

        .home-news-link {
          display: flex;
          flex-direction: column;
          min-height: 100%;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }

        .home-news-link:hover {
          border-color: #1A3A6B;
          transform: translateY(-3px);
        }

        .home-news-accent {
          height: 6px;
          width: 100%;
        }

        .home-news-image-wrap {
          height: 180px;
          overflow: hidden;
          background: #f3f4f6;
        }

        .home-news-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .home-news-card-body {
          display: flex;
          flex: 1;
          flex-direction: column;
          padding: 24px;
        }

        .home-news-pill {
          width: fit-content;
          margin-bottom: 14px;
          padding: 4px 12px;
          border-radius: 50px;
          background: #D6E4F7;
          color: #1A3A6B;
          font-family: "Inter", sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .home-news-title {
          margin-bottom: 10px;
          color: #111111;
          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 17px;
          font-weight: 700;
          line-height: 1.35;
        }

        .home-news-date {
          margin-bottom: 12px;
          color: #9ca3af;
          font-family: "Inter", sans-serif;
          font-size: 13px;
          font-weight: 400;
        }

        .home-news-readmore {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 4px;
          color: #1A3A6B;
          font-family: "Inter", sans-serif;
          font-size: 13px;
          font-weight: 600;
        }

        .home-news-empty {
          color: #64748b;
          font-size: 1rem;
          line-height: 1.7;
        }

        @media (max-width: 960px) {
          .home-stats-row {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 24px;
          }

          .home-stat-item {
            padding: 0;
          }

          .home-stat-item + .home-stat-item {
            border-left: none;
          }

          .home-services-columns,
          .home-news-grid {
            grid-template-columns: 1fr;
          }

          .home-steps-row {
            flex-direction: column;
          }

          .home-step-item {
            padding: 0 0 28px;
            border-right: none;
            border-bottom: 1px solid #e5e7eb;
          }

          .home-step-item:last-child {
            padding-bottom: 0;
            border-bottom: none;
          }
        }

        @media (max-width: 640px) {
          .home-sections-shell {
            padding: 0 20px;
          }

          .home-stats-section {
            padding: 64px 20px;
          }

          .home-stats-row {
            grid-template-columns: 1fr;
          }

          .home-quick-link {
            padding: 22px 0;
          }

          .home-quick-text {
            font-size: 1.75rem;
          }

          .home-service-row {
            gap: 16px;
          }

          .home-step-number {
            font-size: 64px;
          }
        }
      `}</style>
    </>
  );
}
