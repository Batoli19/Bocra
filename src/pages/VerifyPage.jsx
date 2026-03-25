import { useState } from "react";
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
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const filtered = SAMPLE_RESULTS.filter((item) =>
    item.number.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <PageWrapper fullWidth>
      <div
        style={{
          minHeight: "100vh",
          background:
            "radial-gradient(1100px 600px at 15% -10%, rgba(56,189,248,0.18), transparent), radial-gradient(900px 500px at 100% 0%, rgba(14,165,233,0.2), transparent), #0b0e14",
          color: "#f8fafc",
          padding: "80px 20px 96px",
          fontFamily: "'Space Grotesk', 'DM Sans', sans-serif",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ maxWidth: 620 }}>
            <div
              style={{
                display: "inline-flex",
                gap: 10,
                alignItems: "center",
                background: "rgba(15, 23, 42, 0.8)",
                border: "1px solid rgba(148,163,184,0.2)",
                padding: "6px 14px",
                borderRadius: 999,
                fontSize: 12,
                letterSpacing: 0.4,
                textTransform: "uppercase",
                color: "rgba(226,232,240,0.85)",
              }}
            >
              Licence verification
            </div>
            <h1
              style={{
                fontSize: "clamp(32px, 5vw, 52px)",
                margin: "18px 0 12px",
                fontWeight: 700,
              }}
            >
              Verify a licence in seconds.
            </h1>
            <p
              style={{
                fontSize: 16,
                color: "rgba(226,232,240,0.75)",
                lineHeight: 1.6,
              }}
            >
              Enter the licence number to confirm status, category, and expiry.
              Results shown below are sample data for demo purposes.
            </p>
          </div>

          <div
            style={{
              marginTop: 28,
              background: "rgba(15, 23, 42, 0.7)",
              borderRadius: 20,
              padding: "18px 20px",
              border: "1px solid rgba(148,163,184,0.18)",
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter licence number (e.g. BOCRA-2026-0847)"
              style={{
                flex: 1,
                minWidth: 220,
                border: "1px solid rgba(148,163,184,0.3)",
                borderRadius: 999,
                padding: "10px 16px",
                background: "rgba(2,6,23,0.7)",
                color: "#f8fafc",
                fontSize: 13,
                outline: "none",
              }}
            />
            <button
              onClick={() => setSubmitted(true)}
              style={{
                background: "linear-gradient(135deg, #0ea5e9, #2563eb)",
                padding: "10px 18px",
                borderRadius: 999,
                color: "white",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
              }}
            >
              Verify licence
            </button>
          </div>

          <div style={{ marginTop: 26 }}>
            <div style={{ fontSize: 13, color: "rgba(226,232,240,0.65)", marginBottom: 10 }}>
              Results
            </div>
            <div style={{ display: "grid", gap: 14 }}>
              {(submitted ? filtered : SAMPLE_RESULTS).map((item) => (
                <div
                  key={item.number}
                  style={{
                    background: "rgba(2, 6, 23, 0.8)",
                    borderRadius: 18,
                    padding: "18px 20px",
                    border: "1px solid rgba(148,163,184,0.2)",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                    gap: 12,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 11, color: "rgba(226,232,240,0.6)" }}>
                      Licence number
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{item.number}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "rgba(226,232,240,0.6)" }}>
                      Holder
                    </div>
                    <div style={{ fontSize: 13 }}>{item.holder}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "rgba(226,232,240,0.6)" }}>
                      Category
                    </div>
                    <div style={{ fontSize: 13 }}>{item.category}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "rgba(226,232,240,0.6)" }}>
                      Status
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: item.status === "Active" ? "#34d399" : "#fbbf24",
                      }}
                    >
                      {item.status}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "rgba(226,232,240,0.6)" }}>
                      Expiry
                    </div>
                    <div style={{ fontSize: 13 }}>{item.expiry}</div>
                  </div>
                </div>
              ))}
              {submitted && filtered.length === 0 && (
                <div
                  style={{
                    background: "rgba(15, 23, 42, 0.6)",
                    borderRadius: 18,
                    padding: "18px 20px",
                    border: "1px solid rgba(148,163,184,0.18)",
                    color: "rgba(226,232,240,0.7)",
                    fontSize: 13,
                  }}
                >
                  No matching licence found. Please check the number or contact BOCRA.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

