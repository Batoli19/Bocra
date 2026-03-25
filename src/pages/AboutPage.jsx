import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, Radio, Tv, Wifi } from "lucide-react";
import PageWrapper from "../components/shared/PageWrapper";

const regulatedSectors = [
  {
    icon: Radio,
    title: "Telecommunications",
    description: "Licensing, spectrum oversight, and service quality across communications networks.",
  },
  {
    icon: Tv,
    title: "Broadcasting",
    description: "Regulation of broadcasting services, content distribution, and industry standards.",
  },
  {
    icon: Mail,
    title: "Postal Services",
    description: "Oversight of postal operators, service access, and public interest obligations.",
  },
  {
    icon: Wifi,
    title: "Internet & ICT",
    description: "Digital infrastructure, internet services, and broader ICT ecosystem enablement.",
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
  { name: "Dr. Bokamoso Basutli", title: "Chairperson" },
  { name: "Mr. Moabi Pusumane", title: "Board Member" },
  { name: "Ms. Montle Phuthego", title: "Board Member" },
  { name: "Mr. Kgomotso Tshekiso", title: "Board Member" },
  { name: "Ms. Boitumelo Ratshipa", title: "Board Member" },
  { name: "Mr. Tshegofatso Pule", title: "Board Member" },
  { name: "Ms. Thato Mmereki", title: "Board Member" },
];

const stats = [
  { value: "2013", label: "Year Established" },
  { value: "4", label: "Sectors Regulated" },
  { value: "13", label: "Years of Service" },
  { value: "7", label: "Board Members" },
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

function getInitials(name) {
  return name
    .replace(/\./g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function AboutPage() {
  const heroRef = useRef(null);

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
    return () => window.removeEventListener("scroll", onScroll);
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
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "url(/Akanya_Botswana.png)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center top",
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
          <section style={{ padding: "80px 0" }}>
            <Shell>
              <SectionLabel>What We Regulate</SectionLabel>
              <div>
                {regulatedSectors.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="about-regulate-row">
                    <div className="about-regulate-icon">
                      <Icon size={20} />
                    </div>
                    <div className="about-regulate-title">{title}</div>
                    <div className="about-regulate-description">{description}</div>
                  </div>
                ))}
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

        <section style={{ padding: "80px 0" }}>
          <Shell>
            <SectionLabel>Leadership</SectionLabel>
            <div className="about-leadership-grid">
              {leaders.map(({ name, title }) => (
                <div key={name}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "#D6E4F7",
                      color: "#1A3A6B",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      marginBottom: 16,
                    }}
                  >
                    {getInitials(name)}
                  </div>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#111827",
                      marginBottom: 6,
                    }}
                  >
                    {name}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: "#6b7280",
                    }}
                  >
                    {title}
                  </div>
                </div>
              ))}
            </div>
          </Shell>
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
        .about-regulate-row {
          display: grid;
          grid-template-columns: 48px minmax(220px, 300px) minmax(0, 1fr);
          gap: 24px;
          align-items: center;
          padding: 24px 0;
          border-bottom: 1px solid #e5e7eb;
        }

        .about-regulate-icon {
          width: 40px;
          height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #1A3A6B;
          flex-shrink: 0;
        }

        .about-regulate-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: #111827;
        }

        .about-regulate-description {
          color: #6b7280;
          font-size: 0.98rem;
          line-height: 1.7;
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

        .about-leadership-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 32px;
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

        @media (min-width: 900px) {
          .about-leadership-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 960px) {
          .about-regulate-row {
            grid-template-columns: 40px 1fr;
          }

          .about-regulate-description {
            grid-column: 2;
          }

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
          .about-regulate-row {
            gap: 14px;
            padding: 22px 0;
          }

          .about-regulate-title {
            font-size: 1.15rem;
          }

          .about-purpose-grid,
          .about-stats-grid,
          .about-leadership-grid {
            grid-template-columns: 1fr;
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
