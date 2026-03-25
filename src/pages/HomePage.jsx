import { useEffect, useRef, useState } from "react";
import PageWrapper from "../components/shared/PageWrapper";
import HomePageSections from "../components/home/HomePageSections";

const sectors = [
  {
    name: "TELECOMMUNICATIONS",
    dot: "#3498db",
    hover: "rgba(52, 152, 219, 0.75)",
  },
  {
    name: "BROADCASTING",
    dot: "#2ecc71",
    hover: "rgba(46, 204, 113, 0.75)",
  },
  {
    name: "POSTAL SERVICES",
    dot: "#e74c3c",
    hover: "rgba(231, 76, 60, 0.75)",
  },
  {
    name: "INTERNET & ICT",
    dot: "#f39c12",
    hover: "rgba(243, 156, 18, 0.75)",
  },
];

export default function HomePage() {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
    <PageWrapper fullWidth>
      <section
        ref={sectionRef}
        style={{
          background: "#ffffff",
        }}
      >
        <div
          ref={heroRef}
          style={{
            width: "100%",
            height: "100vh",
            overflow: "hidden",
            display: "block",
            transition: "none",
            backgroundImage: "url(/PG9_Telecom_Tower_Sunset.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.45)",
            }}
          />

          <div
            className="home-hero-content"
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              paddingTop: "20vh",
              padding: "60px 48px",
            }}
          >
            <div className="home-hero-sector-list">
              {sectors.map(({ name, dot, hover }, i) => {
                const activeBackground =
                  hoveredIndex === i
                    ? hover
                    : hoveredIndex === null && i === 0
                      ? "rgba(0,100,60,0.7)"
                      : "transparent";

                return (
                  <div
                    key={name}
                    className="home-hero-sector-item"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      background: activeBackground,
                    }}
                  >
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: dot,
                        flexShrink: 0,
                      }}
                    />
                    <span className="home-hero-sector-text">{name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <div style={{ marginTop: 0 }}>
        <HomePageSections />
      </div>

      <style>{`
        .home-hero-sector-list {
          width: 100%;
          max-width: 420px;
        }

        .home-hero-sector-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px 18px 18px 0;
          border-top: 1px solid rgba(255,255,255,0.3);
          transition: background 0.2s ease;
        }

        .home-hero-sector-text {
          color: #ffffff;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          line-height: 1.2;
        }

        @media (max-width: 640px) {
          .home-hero-sector-item {
            padding: 14px 12px 14px 0;
          }

          .home-hero-sector-text {
            font-size: 14px;
            letter-spacing: 1.2px;
          }

          .home-hero-content {
            padding: 40px 20px !important;
          }
        }
      `}</style>
    </PageWrapper>
  );
}
