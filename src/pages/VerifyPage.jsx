import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/shared/PageWrapper";

const SAMPLE_RESULTS = [
  {
    number: "BOCRA-2026-0847",
    holder: "Kopano Broadband (Pty) Ltd",
    status: "Active",
    category: "Internet Service Provider",
    expiry: "30 Sep 2027",
  },
  {
    number: "BOCRA-2025-0312",
    holder: "Northern Signals",
    status: "Pending Renewal",
    category: "FM Radio Broadcasting",
    expiry: "15 Jun 2026",
  },
];

export default function VerifyPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const filtered = SAMPLE_RESULTS.filter((item) =>
    item.number.toLowerCase().includes(query.trim().toLowerCase())
  );

  const getStatusStyles = (status) => {
    switch (status) {
      case "Active":
        return { color: "#0F6E56", background: "rgba(15,110,86,0.08)" };
      case "Pending Renewal":
        return { color: "#d97706", background: "rgba(217,119,6,0.08)" };
      case "Expired":
      case "Suspended":
        return { color: "#dc2626", background: "rgba(220,38,38,0.08)" };
      default:
        return { color: "#111", background: "#e5e7eb" };
    }
  };

  return (
    <PageWrapper fullWidth>
      <style>{`
        .verify-results-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
          align-items: center;
        }
        @media (max-width: 768px) {
          .verify-results-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 480px) {
          .verify-results-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      
      <div style={{ background: "#ffffff", minHeight: "100vh" }}>
        
        {/* SECTION 1 - DARK HERO */}
        <section style={{ background: "linear-gradient(rgba(10,22,40,0.26), rgba(10,22,40,0.38)), url('/hero-complaints.webp') center/cover no-repeat", padding: "80px 0 64px" }}>
          <div className="page-container">
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: "11px",
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              LICENCE VERIFICATION
            </div>
            <h1
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(36px, 5vw, 64px)",
                color: "white",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                margin: 0,
              }}
            >
              <div style={{ display: "block" }}>Verify a Licence</div>
              <div style={{ display: "block" }}>in Seconds.</div>
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: "17px",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.7,
                maxWidth: "500px",
                marginTop: "16px",
                marginBottom: 0,
              }}
            >
              Enter a licence number to confirm status, category, and expiry date for any BOCRA-licensed operator.
            </p>

            <div
              style={{
                marginTop: "40px",
                background: "white",
                borderRadius: "14px",
                padding: "6px 6px 6px 20px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                maxWidth: "600px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
              }}
            >
              <Search size={16} color="#9ca3af" style={{ flexShrink: 0 }} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. BOCRA-2026-0847"
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: "15px",
                  color: "#111",
                  background: "transparent",
                  padding: "8px 0",
                }}
              />
              <button
                type="button"
                onClick={() => setSubmitted(true)}
                style={{
                  background: "#1A3A6B",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  padding: "12px 24px",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Verify Licence &rarr;
              </button>
            </div>
          </div>
        </section>

        {/* CONDITIONALLY RENDER RESULTS OR EMPTY STATE */}
        {submitted ? (
          /* SECTION 2 - RESULTS */
          <section style={{ background: "white", padding: "64px 0 80px" }}>
            <div className="page-container">
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: "11px",
                  color: "#9ca3af",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "20px",
                }}
              >
                RESULTS
              </div>
              
              {filtered.length > 0 ? (
                filtered.map((item) => {
                  const statusStyle = getStatusStyles(item.status);
                  return (
                    <div
                      key={item.number}
                      className="verify-results-grid"
                      style={{
                        background: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "16px",
                        padding: "24px 28px",
                        marginBottom: "12px",
                      }}
                    >
                      <div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "11px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>
                          Licence Number
                        </div>
                        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "15px", color: "#111" }}>
                          {item.number}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "11px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>
                          Holder
                        </div>
                        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "15px", color: "#111" }}>
                          {item.holder}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "11px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>
                          Category
                        </div>
                        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "15px", color: "#111" }}>
                          {item.category}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "11px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>
                          Status
                        </div>
                        <div
                          style={{
                            display: "inline-block",
                            padding: "4px 12px",
                            borderRadius: "50px",
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 600,
                            fontSize: "12px",
                            color: statusStyle.color,
                            background: statusStyle.background,
                          }}
                        >
                          {item.status}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "11px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>
                          Expiry
                        </div>
                        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "15px", color: "#111" }}>
                          {item.expiry}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div style={{ padding: "40px", textAlign: "center", border: "1px dashed #e5e7eb", borderRadius: "16px", color: "#6b7280", fontFamily: "'Inter', sans-serif" }}>
                  No matching licence found. Please check the number and try again.
                </div>
              )}
            </div>
          </section>
        ) : (
          /* SECTION 3 - EMPTY / DEFAULT STATE */
          <section style={{ background: "#f8f9fa", padding: "64px 0" }}>
            <div className="page-container">
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: "11px",
                  color: "#9ca3af",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "32px",
                }}
              >
                HOW TO VERIFY
              </div>
              
              <div style={{ display: "flex", flexDirection: "column" }}>
                {[
                  {
                    step: "01",
                    title: "Find the Licence Number",
                    desc: "Numbers follow the format BOCRA-YYYY-XXXX and appear on official BOCRA correspondence."
                  },
                  {
                    step: "02",
                    title: "Enter and Verify",
                    desc: "Type the licence number above and click Verify — results appear instantly showing holder, category, and expiry."
                  },
                  {
                    step: "03",
                    title: "Check the Status",
                    desc: "Active means the licence is valid. Pending Renewal means it expires soon. Expired means the operator is unlicensed."
                  }
                ].map((item, index, arr) => (
                  <div
                    key={item.step}
                    style={{
                      display: "flex",
                      gap: "20px",
                      padding: "20px 0",
                      borderBottom: index === arr.length - 1 ? "none" : "1px solid #e5e7eb",
                    }}
                  >
                    <div
                      style={{
                        background: "#D6E4F7",
                        color: "#1A3A6B",
                        borderRadius: "50px",
                        padding: "4px 12px",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 700,
                        fontSize: "12px",
                        height: "max-content",
                      }}
                    >
                      {item.step}
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 600,
                          fontSize: "15px",
                          color: "#111",
                        }}
                      >
                        {item.title}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 400,
                          fontSize: "14px",
                          color: "#6b7280",
                          lineHeight: 1.6,
                          marginTop: "4px",
                        }}
                      >
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 4 - CTA STRIP */}
        <section
          style={{
            background: "#1A3A6B",
            padding: "64px 40px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: "32px",
              color: "white",
              margin: 0,
            }}
          >
            Found an Unlicensed Operator?
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              color: "rgba(255,255,255,0.65)",
              marginTop: "12px",
              marginBottom: "32px",
              lineHeight: 1.6,
            }}
          >
            Report operators providing communications services without a valid BOCRA licence.
          </p>
          <button
            type="button"
            onClick={() => navigate('/portal/complaint/new')}
            style={{
              background: "white",
              color: "#1A3A6B",
              borderRadius: "50px",
              padding: "12px 28px",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            File a Complaint &rarr;
          </button>
        </section>

      </div>
    </PageWrapper>
  );
}
