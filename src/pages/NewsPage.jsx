import { useState } from "react"
import PageWrapper from "../components/shared/PageWrapper"
import newsData from "../data/news.json"
import heroImage from "../../Gemini_Generated_Image_56nonr56nonr56no.png"

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState("All")
  const featured = newsData.find((n) => n.featured)
  const rest = newsData.filter((n) => !n.featured)
  const filtered = activeTab === "All" ? rest : rest.filter((n) => n.category === activeTab)
  const tabs = ["All", "Announcements", "Licensing", "Consumer", "Technology"]

  const categoryColor = (cat) =>
    (
      {
        Announcements: "#1A3A6B",
        Licensing: "#0F6E56",
        Consumer: "#1A3A6B",
        Technology: "#2E5FA3",
      }[cat] || "#1A3A6B"
    )

  return (
    <PageWrapper>
      <div style={{ background: "#ffffff", minHeight: "100vh" }}>
        <div
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(5, 8, 22, 0.58) 0%, rgba(5, 8, 22, 0.36) 40%, rgba(5, 8, 22, 0.72) 100%), url(${heroImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 24px 64px" }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.74)",
                fontFamily: "Inter, sans-serif",
                marginBottom: 16,
              }}
            >
              News & Updates
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexWrap: "wrap",
                gap: 24,
              }}
            >
              <h1
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "clamp(40px, 5vw, 64px)",
                  fontWeight: 800,
                  color: "#ffffff",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  margin: 0,
                }}
              >
                Staying Informed,
                <br />
                Staying Connected.
              </h1>
              <p
                style={{
                  fontSize: 16,
                  color: "rgba(255,255,255,0.82)",
                  maxWidth: 380,
                  lineHeight: 1.7,
                  fontFamily: "Inter, sans-serif",
                  margin: 0,
                }}
              >
                Official updates, regulatory decisions and announcements from BOCRA.
              </p>
            </div>
          </div>
        </div>

        <div style={{ borderBottom: "1px solid #e5e7eb" }}>
          <div
            className="news-tabs-row"
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "0 24px",
              display: "flex",
              gap: 0,
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "16px 24px",
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: "Inter, sans-serif",
                  color: activeTab === tab ? "#1A3A6B" : "#6b7280",
                  background: "none",
                  border: "none",
                  borderBottom: activeTab === tab ? "2px solid #1A3A6B" : "2px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  marginBottom: -1,
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {featured && (
          <div style={{ borderBottom: "1px solid #e5e7eb" }}>
            <div
              style={{
                maxWidth: 1280,
                margin: "0 auto",
                padding: "72px 24px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 80,
                alignItems: "center",
              }}
              className="news-featured-grid"
            >
              <div>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#9ca3af",
                    fontFamily: "Inter, sans-serif",
                    marginBottom: 16,
                  }}
                >
                  Featured / {featured.category}
                </p>
                <h2
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "clamp(28px, 3vw, 40px)",
                    fontWeight: 800,
                    color: "#111111",
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                    marginBottom: 16,
                  }}
                >
                  {featured.title}
                </h2>
                <p
                  style={{
                    fontSize: 16,
                    color: "#6b7280",
                    lineHeight: 1.7,
                    fontFamily: "Inter, sans-serif",
                    marginBottom: 24,
                  }}
                >
                  {featured.excerpt}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: "#6b7280",
                    fontFamily: "Inter, sans-serif",
                    marginBottom: 28,
                  }}
                >
                  {featured.date} / {featured.readTime}
                </p>
                <a
                  href="#"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "#1A3A6B",
                    color: "#ffffff",
                    padding: "12px 28px",
                    borderRadius: 50,
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: "Inter, sans-serif",
                    textDecoration: "none",
                  }}
                >
                  Read Full Story
                </a>
              </div>

              <div
                style={{
                  borderRadius: 24,
                  height: 340,
                  overflow: "hidden",
                  border: "1px solid #e5e7eb",
                }}
              >
                <img
                  src={featured.image}
                  alt={featured.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        )}

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 96px" }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#9ca3af",
              fontFamily: "Inter, sans-serif",
              padding: "40px 0 0",
              marginBottom: 0,
            }}
          >
            All Stories
          </p>

          {filtered.map((article) => (
            <a
              key={article.id}
              href="#"
              className="news-article-row"
              style={{
                display: "grid",
                gridTemplateColumns: "140px 1fr 100px 120px",
                gap: 40,
                alignItems: "start",
                padding: "32px 0",
                borderBottom: "1px solid #e5e7eb",
                textDecoration: "none",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.6"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1"
              }}
            >
              <p
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: categoryColor(article.category),
                  fontFamily: "Inter, sans-serif",
                  marginTop: 5,
                }}
              >
                {article.category}
              </p>

              <div>
                <h3
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#111111",
                    lineHeight: 1.3,
                    letterSpacing: "-0.01em",
                    marginBottom: 8,
                  }}
                >
                  {article.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "#6b7280",
                    lineHeight: 1.65,
                    fontFamily: "Inter, sans-serif",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {article.excerpt}
                </p>
              </div>

              <div
                style={{
                  width: 100,
                  height: 70,
                  borderRadius: 8,
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <div style={{ textAlign: "right", paddingTop: 4 }}>
                <p
                  style={{
                    fontSize: 12,
                    color: "#6b7280",
                    fontFamily: "Inter, sans-serif",
                    marginBottom: 4,
                  }}
                >
                  {article.date}
                </p>
                <p style={{ fontSize: 12, color: "#9ca3af", fontFamily: "Inter, sans-serif" }}>
                  {article.readTime}
                </p>
              </div>
            </a>
          ))}

          <div style={{ textAlign: "center", paddingTop: 48 }}>
            <button
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#1A3A6B",
                background: "none",
                border: "1px solid #1A3A6B",
                borderRadius: 50,
                padding: "12px 32px",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1A3A6B"
                e.currentTarget.style.color = "#ffffff"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "none"
                e.currentTarget.style.color = "#1A3A6B"
              }}
            >
              Load more stories
            </button>
          </div>
        </div>

        <style>{`
          @media (max-width: 760px) {
            .news-featured-grid {
              grid-template-columns: 1fr !important;
              gap: 32px !important;
              padding: 40px 24px !important;
            }
            .news-article-row {
              grid-template-columns: 1fr !important;
              gap: 12px !important;
              padding: 20px 0 !important;
            }
            .news-article-row > div:nth-child(3) {
              display: none;
            }
            .news-article-row > div:last-child {
              text-align: left !important;
            }
            .news-tabs-row {
              overflow-x: auto;
              -webkit-overflow-scrolling: touch;
            }
            .news-tabs-row button {
              white-space: nowrap;
              flex-shrink: 0;
            }
          }
        `}</style>
      </div>
    </PageWrapper>
  )
}
