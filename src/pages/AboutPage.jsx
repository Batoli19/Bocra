import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageWrapper from "../components/shared/PageWrapper";
import bathopiLuke from "../../management/Bathopi_luke.jpg";
import bonnieMine from "../../management/Bonnie_mine.jpg";
import joyceIsaMolwane from "../../management/Joyce-Isa-molwane.jpg";
import maitseoRatladi from "../../management/Maitseo_ratladi.jpg";
import martinMokgware from "../../management/Martin_mokgware.jpg";
import murphySetshwane from "../../management/Murphy_setshwane.jpg";
import peterTladinyane from "../../management/Peter_tladinyane.jpg";
import tebogoMmoshe from "../../management/Tebogo_mmoshe.jpg";

const regulatedSectors = [
  {
    title: "Telecommunications",
    description: "Licensing, spectrum oversight, and service quality across communications networks.",
    accent: "#3498db",
    hover: "rgba(52, 152, 219, 0.86)",
    soft: "rgba(52, 152, 219, 0.12)",
  },
  {
    title: "Broadcasting",
    description: "Regulation of broadcasting services, content distribution, and industry standards.",
    accent: "#2ecc71",
    hover: "rgba(46, 204, 113, 0.82)",
    soft: "rgba(46, 204, 113, 0.12)",
  },
  {
    title: "Postal Services",
    description: "Oversight of postal operators, service access, and public interest obligations.",
    accent: "#e74c3c",
    hover: "rgba(231, 76, 60, 0.86)",
    soft: "rgba(231, 76, 60, 0.12)",
  },
  {
    title: "Internet & ICT",
    description: "Digital infrastructure, internet services, and broader ICT ecosystem enablement.",
    accent: "#f39c12",
    hover: "rgba(243, 156, 18, 0.86)",
    soft: "rgba(243, 156, 18, 0.14)",
  },
];

const values = [
  {
    title: "Excellence",
    description: "We pursue high standards in regulation, delivery, and public service.",
  },
  {
    title: "Proactiveness",
    description: "We anticipate change and respond early to sector and citizen needs.",
  },
  {
    title: "Integrity",
    description: "We act with fairness, transparency, and accountability in every decision.",
  },
  {
    title: "People",
    description: "We place citizens, communities, and industry participants at the centre.",
  },
  {
    title: "Innovation",
    description: "We support modern thinking that advances Botswana's digital future.",
  },
];

const leaders = [
  {
    name: "Martin Mokgware",
    role: "Chief Executive Officer",
    image: martinMokgware,
    summary:
      "Leads BOCRA's strategic direction, organisational delivery, and execution of the regulator's public mandate.",
  },
  {
    name: "Bathopi Luke",
    role: "Board Member",
    image: bathopiLuke,
    summary:
      "Supports governance oversight and board-level review of regulatory priorities, risk, and performance.",
  },
  {
    name: "Bonnie Mine",
    role: "Board Member",
    image: bonnieMine,
    summary:
      "Contributes to balanced decision-making across public interest, sector development, and accountability.",
  },
  {
    name: "Joyce Isa Molwane",
    role: "Board Member",
    image: joyceIsaMolwane,
    summary:
      "Provides leadership input on institutional stewardship, policy alignment, and responsible oversight.",
  },
  {
    name: "Maitseo Ratladi",
    role: "Board Member",
    image: maitseoRatladi,
    summary:
      "Strengthens board deliberations through strategic guidance, governance review, and stakeholder awareness.",
  },
  {
    name: "Murphy Setshwane",
    role: "Board Member",
    image: murphySetshwane,
    summary:
      "Supports board continuity through governance insight focused on service quality and regulatory impact.",
  },
  {
    name: "Peter Tladinyane",
    role: "Board Member",
    image: peterTladinyane,
    summary:
      "Brings board-level scrutiny to governance matters, institutional priorities, and performance stewardship.",
  },
  {
    name: "Tebogo Mmoshe",
    role: "Board Member",
    image: tebogoMmoshe,
    summary:
      "Contributes to board oversight with attention to strategy, public confidence, and sector resilience.",
  },
];

const stats = [
  { value: "2013", label: "Year Established" },
  { value: "4", label: "Sectors Regulated" },
  { value: "13", label: "Years of Service" },
  { value: "8", label: "Leadership Members" },
];

function SectionLabel({ children }) {
  return (
    <div
      style={{
        fontSize: 12,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "#94a3b8",
        fontWeight: 700,
        marginBottom: 20,
      }}
    >
      {children}
    </div>
  );
}

function Shell({ children, style }) {
  return (
    <div
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "0 24px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function AboutPage() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const [featuredLeader, ...boardLeaders] = leaders;

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return undefined;

    const onScroll = () => {
      const p = Math.min(window.scrollY / 600, 1);
      el.style.width = `${100 - p * 40}%`;
      el.style.height = `${100 - p * 40}vh`;
      el.style.marginLeft = "auto";
      el.style.marginRight = "auto";
      el.style.borderRadius = `${p * 50}%`;
      el.style.overflow = "hidden";
    };
    window.addEventListener("scroll", onScroll);

    const vidObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            videoRef.current.play().catch(() => {});
          } else if (videoRef.current) {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.1 }
    );
    if (el) vidObserver.observe(el);

    return () => {
      window.removeEventListener("scroll", onScroll);
      vidObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ background: "white" }}>
      <PageWrapper fullWidth>
        <section
          style={{
            background: "white",
            display: "flex",
            alignItems: "flex-end",
            minHeight: "100vh",
          }}
        >
          <div
            ref={heroRef}
            style={{
              width: "100%",
              height: "100vh",
              overflow: "hidden",
              backgroundColor: "white",
              position: "relative",
            }}
          >
            <video
              ref={videoRef}
              src="/Animation_Request_And_Generation.mp4"
              autoPlay
              loop
              muted
              playsInline
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 0,
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.45)",
              }}
            />

          </div>
        </section>

        <div
          style={{
            background: "#ffffff",
            color: "#0f172a",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <section className="about-regulate-section">
            <Shell>
              <div className="about-regulate-stage">
                <SectionLabel>What We Regulate</SectionLabel>
                <div className="about-regulate-list">
                  {regulatedSectors.map(({ title, description, accent, hover, soft }) => (
                    <div
                      key={title}
                      className="about-regulate-row"
                      style={{
                        "--sector-accent": accent,
                        "--sector-hover": hover,
                        "--sector-soft": soft,
                      }}
                    >
                      <span className="about-regulate-dot" />
                      <div className="about-regulate-copy">
                        <div className="about-regulate-title">{title}</div>
                        <div className="about-regulate-description">{description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Shell>
          </section>

        <section style={{ padding: "80px 0" }}>
          <Shell>
            <SectionLabel>Purpose</SectionLabel>
            <div className="about-purpose-grid">
              <div className="about-purpose-column">
                <div className="about-purpose-title">Mission</div>
                <p className="about-purpose-text">
                  To regulate the communications sector in a transparent, fair, and forward-looking
                  manner that protects the public interest and enables inclusive national growth.
                </p>
              </div>
              <div className="about-purpose-column">
                <div className="about-purpose-title">Vision</div>
                <p className="about-purpose-text">
                  A trusted, modern regulator shaping a resilient communications environment for a
                  connected Botswana.
                </p>
              </div>
            </div>
          </Shell>
        </section>

        <section style={{ padding: "64px 0" }}>
          <Shell>
            <SectionLabel>Our Values</SectionLabel>
            <div className="about-values-grid">
              {values.map(({ title, description }) => (
                <div key={title} className="about-value-item">
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#111827",
                      marginBottom: 10,
                    }}
                  >
                    {title}
                  </div>
                  <div
                    style={{
                      color: "#6b7280",
                      fontSize: 14,
                      lineHeight: 1.7,
                    }}
                  >
                    {description}
                  </div>
                </div>
              ))}
            </div>
          </Shell>
        </section>

        <section className="team-section">
          {/* Subtle background glow */}
          <div style={{
            position: "absolute",
            top: "-20%",
            left: "-10%",
            width: "50%",
            height: "50%",
            background: "radial-gradient(circle, rgba(15,110,86,0.15) 0%, transparent 70%)",
            pointerEvents: "none"
          }} />

          <div className="team-container">
            <div className="team-header-sticky">
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(40px, 5vw, 56px)",
                color: "#fff",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: "24px"
              }}>
                Meet The Board
              </div>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px",
                color: "#9ca3af",
                lineHeight: 1.6,
                marginBottom: "32px",
                maxWidth: "320px"
              }}>
                BOCRA is governed by a board appointed by the Minister responsible for communications in Botswana.
              </p>
              
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {["Leadership", "Governance", "Oversight"].map((tag, i) => (
                  <span key={tag} className="reveal-on-scroll team-tag" style={{ animationDelay: `${i * 0.1}s` }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="team-board-layout">
              <div className="team-featured reveal-on-scroll">
                <div className="team-featured-divider" />
                <div className="team-card team-card-featured">
                  <div className="team-card-flip-inner">
                    <div className="team-card-face team-card-front">
                      <div className="team-card-image-wrapper team-card-image-wrapper-featured">
                        <img src={featuredLeader.image} alt={featuredLeader.name} className="team-card-image" />
                        <div className="team-card-overlay" />
                      </div>
                      <div className="team-card-info team-card-info-featured">
                        <h3 className="team-card-name team-card-name-featured">{featuredLeader.name}</h3>
                        <p className="team-card-role team-card-role-featured">{featuredLeader.role}</p>
                      </div>
                    </div>

                    <div className="team-card-face team-card-back team-card-back-featured">
                      <div className="team-card-back-label">Leadership Summary</div>
                      <div className="team-card-back-title">{featuredLeader.name}</div>
                      <p className="team-card-back-text">{featuredLeader.summary}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="team-grid">
                {boardLeaders.map((leader, index) => (
                  <div key={leader.name} className="team-card reveal-on-scroll" style={{ animationDelay: `${(index + 1) * 0.1}s` }}>
                    <div className="team-card-flip-inner">
                      <div className="team-card-face team-card-front">
                        <div className="team-card-image-wrapper">
                          <img src={leader.image} alt={leader.name} className="team-card-image" />
                          <div className="team-card-overlay" />
                        </div>
                        <div className="team-card-info">
                          <h3 className="team-card-name">{leader.name}</h3>
                          <p className="team-card-role">{leader.role}</p>
                        </div>
                      </div>

                      <div className="team-card-face team-card-back">
                        <div className="team-card-back-label">Board Role</div>
                        <div className="team-card-back-title">{leader.name}</div>
                        <p className="team-card-back-text">{leader.summary}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: "64px 0", background: "#f8f9fa" }}>
          <Shell>
            <div className="about-stats-grid">
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <div
                    style={{
                      fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
                      lineHeight: 0.95,
                      fontWeight: 700,
                      color: "#0f172a",
                      letterSpacing: "-0.05em",
                      marginBottom: 10,
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      color: "#64748b",
                      fontSize: 15,
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </Shell>
        </section>

        <section style={{ padding: "80px 0 112px" }}>
          <Shell>
            <div className="about-banner">
              <div style={{ maxWidth: 700 }}>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "clamp(2rem, 4vw, 3.1rem)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.04em",
                    color: "#111827",
                    fontWeight: 700,
                  }}
                >
                  BOCRA Strategic Plan 2024-2029
                </h2>
                <p
                  style={{
                    margin: "18px 0 0",
                    color: "#6b7280",
                    fontSize: 18,
                    lineHeight: 1.7,
                  }}
                >
                  Placing Botswana at the centre of the global digital economy.
                </p>
              </div>

              <Link
                to="/documents"
                className="about-report-button"
              >
                <span>Download Annual Report</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </Shell>
        </section>
        </div>

        <style>{`
        .about-regulate-section {
          padding: 88px 0;
          background: #ffffff;
        }

        .about-regulate-stage {
          position: relative;
          padding: 0;
        }

        .about-regulate-stage::before {
          content: "";
          position: absolute;
          top: 54px;
          left: 10px;
          bottom: 18px;
          width: 1px;
          background:
            linear-gradient(180deg, rgba(148,163,184,0.22) 0%, rgba(148,163,184,0.08) 100%);
          pointer-events: none;
        }

        .about-regulate-stage > * {
          position: relative;
          z-index: 1;
        }

        .about-regulate-stage > div:first-child {
          color: #94a3b8 !important;
          margin-bottom: 30px !important;
        }

        .about-regulate-list {
          display: grid;
          gap: 18px;
        }

        .about-regulate-row {
          display: grid;
          grid-template-columns: 34px minmax(0, 1fr);
          gap: 18px;
          align-items: start;
          padding: 14px 0 14px 0;
          border-top: 1px solid rgba(15,23,42,0.08);
          position: relative;
          overflow: hidden;
          transition: transform 0.35s ease;
        }

        .about-regulate-list .about-regulate-row:first-child {
          border-top: none;
        }

        .about-regulate-row::before {
          content: "";
          position: absolute;
          inset: 8px -18px;
          border-radius: 24px;
          background: linear-gradient(90deg, var(--sector-soft) 0%, rgba(255,255,255,0) 82%);
          opacity: 0;
          transform: scaleX(0.96);
          transform-origin: left center;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .about-regulate-row > * {
          position: relative;
          z-index: 1;
        }

        .about-regulate-row:hover {
          transform: translateX(10px);
        }

        .about-regulate-row:hover::before {
          opacity: 1;
          transform: scaleX(1);
        }

        .about-regulate-dot {
          width: 20px;
          height: 20px;
          border-radius: 999px;
          background: var(--sector-accent);
          box-shadow:
            0 0 0 8px rgba(255,255,255,0.95),
            0 10px 26px var(--sector-soft);
          flex-shrink: 0;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          margin-left: 0;
          margin-top: 12px;
        }

        .about-regulate-copy {
          display: grid;
          gap: 8px;
        }

        .about-regulate-title {
          font-size: clamp(1.5rem, 2.6vw, 2rem);
          font-weight: 700;
          color: #0f172a;
          transition: color 0.3s ease, transform 0.3s ease;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .about-regulate-description {
          color: #64748b;
          font-size: 0.98rem;
          line-height: 1.8;
          max-width: 760px;
          transition: color 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
        }

        .about-regulate-row:hover .about-regulate-dot {
          transform: scale(1.12);
          box-shadow:
            0 0 0 10px rgba(255,255,255,1),
            0 14px 32px var(--sector-hover);
        }

        .about-regulate-row:hover .about-regulate-title,
        .about-regulate-row:hover .about-regulate-description {
          color: #0f172a;
          transform: translateX(4px);
        }

        .about-purpose-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 48px;
        }

        .about-purpose-column {
          min-width: 0;
        }

        .about-purpose-column:first-child {
          padding-right: 48px;
          border-right: 1px solid #e5e7eb;
        }

        .about-purpose-column:last-child {
          padding-left: 0;
        }

        .about-purpose-title {
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #94a3b8;
          font-weight: 700;
          margin-bottom: 18px;
        }

        .about-purpose-text {
          margin: 0;
          font-size: clamp(1.45rem, 3vw, 2.2rem);
          line-height: 1.25;
          color: #111827;
          letter-spacing: -0.03em;
          max-width: 560px;
        }

        .about-values-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
        }

        .about-value-item {
          padding: 0 20px;
        }

        .about-value-item + .about-value-item {
          border-left: 1px solid #e5e7eb;
        }

        .about-value-item:first-child {
          padding-left: 0;
        }

        .about-value-item:last-child {
          padding-right: 0;
        }

        .team-section {
          background: #000000;
          padding: 100px 0;
          position: relative;
          overflow: hidden;
        }

        .team-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .team-header-sticky {
          position: relative;
        }

        .team-tag {
          padding: 6px 14px;
          border-radius: 20px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          font-size: 12px;
          color: #d1d5db;
          font-family: 'Inter', sans-serif;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 32px 24px;
        }

        .team-board-layout {
          display: grid;
          gap: 40px;
        }

        .team-featured {
          display: grid;
          gap: 28px;
          justify-items: center;
        }

        .team-featured-divider {
          width: min(100%, 780px);
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 18%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.18) 82%, transparent 100%);
        }

        .team-card {
          cursor: pointer;
          perspective: 1400px;
        }

        .team-card-featured {
          width: min(100%, 340px);
        }

        .team-card-flip-inner {
          position: relative;
          min-height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .team-card:hover .team-card-flip-inner {
          transform: rotateY(180deg) translateY(-6px);
        }

        .team-card-face {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 16px;
          overflow: hidden;
          min-height: 100%;
        }

        .team-card-front {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .team-card-back {
          position: absolute;
          inset: 0;
          transform: rotateY(180deg);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 24px;
          border: 1px solid rgba(255,255,255,0.08);
          background:
            radial-gradient(circle at top left, rgba(15,110,86,0.26), transparent 42%),
            linear-gradient(180deg, #0b1320 0%, #060a10 100%);
          box-shadow: 0 18px 50px rgba(0,0,0,0.24);
        }

        .team-card-image-wrapper {
          position: relative;
          aspect-ratio: 4 / 4.8;
          border-radius: 12px;
          overflow: hidden;
          background: #111;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .team-card-image-wrapper-featured {
          aspect-ratio: 4 / 4.9;
        }

        .team-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          filter: grayscale(20%) brightness(0.9);
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), filter 0.7s ease;
        }

        .team-card:hover .team-card-image {
          transform: scale(1.06);
          filter: grayscale(0%) brightness(1);
        }

        .team-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%);
          pointer-events: none;
          opacity: 0.5;
          transition: opacity 0.5s ease;
        }

        .team-card:hover .team-card-overlay {
          opacity: 0;
        }

        .team-card-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .team-card-info-featured {
          text-align: center;
          align-items: center;
        }

        .team-card-name {
          margin: 0;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.01em;
          transition: color 0.3s ease;
        }

        .team-card:hover .team-card-name {
          color: #0F6E56;
        }

        .team-card-name-featured {
          font-size: clamp(26px, 3vw, 34px);
          font-weight: 500;
          color: #4da4ff;
        }

        .team-card-role {
          margin: 0;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: #9ca3af;
        }

        .team-card-role-featured {
          font-size: 16px;
          color: #e5e7eb;
        }

        .team-card-back-label {
          margin-bottom: 10px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: rgba(148,163,184,0.9);
          font-family: 'Inter', sans-serif;
          font-weight: 700;
        }

        .team-card-back-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 22px;
          line-height: 1.1;
          color: #ffffff;
          font-weight: 700;
          margin-bottom: 14px;
        }

        .team-card-back-text {
          margin: 0;
          color: rgba(226,232,240,0.88);
          font-size: 14px;
          line-height: 1.7;
          max-width: 28ch;
          font-family: 'Inter', sans-serif;
        }

        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal-on-scroll.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        @media (min-width: 960px) {
          .team-container {
            grid-template-columns: 320px 1fr;
            gap: 64px;
            align-items: start;
          }
          .team-header-sticky {
            position: sticky;
            top: 120px;
          }
        }

        @media (min-width: 1024px) {
          .team-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 40px 24px;
          }
        }

        .about-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 28px;
        }

        .about-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
        }

        .about-report-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 22px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          background: #ffffff;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.2s, transform 0.15s;
          white-space: nowrap;
          letter-spacing: 0.01em;
          border: 1px solid #d1d5db;
        }

        .about-report-button:hover {
          background: #ffffff;
          transform: translateY(-1px);
        }



        @media (max-width: 960px) {
          .about-purpose-grid,
          .about-stats-grid,
          .about-banner {
            grid-template-columns: 1fr;
          }

          .about-banner {
            display: grid;
          }

          .about-purpose-column:first-child {
            padding-right: 0;
            padding-bottom: 32px;
            border-right: none;
            border-bottom: 1px solid #e5e7eb;
          }

          .about-values-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 24px 0;
          }

          .about-value-item {
            padding: 0 18px 0 0;
          }

          .about-value-item + .about-value-item {
            border-left: none;
          }

          .about-value-item:nth-child(2n) {
            padding: 0 0 0 18px;
            border-left: 1px solid #e5e7eb;
          }
        }

        @media (max-width: 640px) {
          .about-regulate-section {
            padding: 72px 0;
          }

          .about-regulate-stage {
            padding: 0;
          }

          .about-regulate-row {
            grid-template-columns: 28px 1fr;
            gap: 14px;
            padding: 18px 0;
          }

          .about-regulate-dot {
            width: 16px;
            height: 16px;
            margin-top: 10px;
          }

          .about-regulate-title {
            font-size: 1.15rem;
            letter-spacing: 0.03em;
          }

          .about-regulate-description {
            font-size: 0.92rem;
            line-height: 1.7;
          }

          .about-purpose-grid,
          .about-stats-grid,
          .team-grid {
            grid-template-columns: 1fr;
          }

          .team-featured {
            justify-items: stretch;
          }

          .team-card-featured {
            width: 100%;
          }

          .team-card-back {
            padding: 20px;
          }

          .about-values-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .about-value-item:nth-child(2n) {
            border-left: 1px solid #e5e7eb;
          }
        }
      `}</style>
      </PageWrapper>
    </div>
  );
}
