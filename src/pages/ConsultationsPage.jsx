import { useState } from "react";
import PageWrapper from "../components/shared/PageWrapper";

const CONSULTATIONS = [
  {
    title: "Spectrum allocation review 2026",
    status: "Open",
    deadline: "30 Apr 2026",
    summary: "Seeking input on spectrum allocation priorities and licensing terms.",
  },
  {
    title: "Consumer protection guidelines update",
    status: "Open",
    deadline: "15 May 2026",
    summary: "Proposed updates to complaint handling and QoS reporting.",
  },
  {
    title: "Postal services modernization",
    status: "Closing soon",
    deadline: "05 Apr 2026",
    summary: "Feedback on service coverage, standards, and innovation initiatives.",
  },
];

export default function ConsultationsPage() {
  const [selected, setSelected] = useState(CONSULTATIONS[0]);

  return (
    <PageWrapper fullWidth>
      <div
        style={{
          minHeight: "100vh",
          background:
            "radial-gradient(1100px 600px at 15% -10%, rgba(14,165,233,0.18), transparent), radial-gradient(900px 500px at 100% 0%, rgba(99,102,241,0.18), transparent), #0b0e14",
          color: "#f8fafc",
          padding: "80px 20px 96px",
          fontFamily: "'Space Grotesk', 'DM Sans', sans-serif",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ maxWidth: 640 }}>
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
              Public consultations
            </div>
            <h1
              style={{
                fontSize: "clamp(32px, 5vw, 52px)",
                margin: "18px 0 12px",
                fontWeight: 700,
              }}
            >
              Share your input on BOCRA proposals.
            </h1>
            <p
              style={{
                fontSize: 16,
                color: "rgba(226,232,240,0.75)",
                lineHeight: 1.6,
              }}
            >
              BOCRA invites industry, consumers, and stakeholders to contribute
              to regulatory proposals. Choose a consultation and submit your
              comments below.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 18,
              marginTop: 30,
            }}
          >
            {CONSULTATIONS.map((item) => (
              <button
                key={item.title}
                onClick={() => setSelected(item)}
                style={{
                  textAlign: "left",
                  background:
                    selected.title === item.title
                      ? "rgba(14,165,233,0.25)"
                      : "rgba(2, 6, 23, 0.8)",
                  borderRadius: 18,
                  padding: "18px 20px",
                  border: "1px solid rgba(148,163,184,0.2)",
                  color: "#f8fafc",
                  cursor: "pointer",
                }}
              >
                <div style={{ fontSize: 12, color: "#7dd3fc", fontWeight: 600 }}>
                  {item.status}
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, marginTop: 6 }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 12, color: "rgba(226,232,240,0.7)", marginTop: 6 }}>
                  Deadline: {item.deadline}
                </div>
              </button>
            ))}
          </div>

          <div
            style={{
              marginTop: 32,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 18,
            }}
          >
            <div
              style={{
                background: "rgba(15, 23, 42, 0.6)",
                borderRadius: 18,
                padding: "20px 22px",
                border: "1px solid rgba(148,163,184,0.18)",
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 600 }}>{selected.title}</div>
              <div style={{ fontSize: 12, color: "rgba(226,232,240,0.7)", marginTop: 8 }}>
                {selected.summary}
              </div>
              <div
                style={{
                  marginTop: 12,
                  fontSize: 12,
                  color: "rgba(226,232,240,0.6)",
                }}
              >
                Deadline: {selected.deadline}
              </div>
            </div>
            <form
              style={{
                background: "rgba(2, 6, 23, 0.8)",
                borderRadius: 18,
                padding: "20px 22px",
                border: "1px solid rgba(148,163,184,0.2)",
                display: "grid",
                gap: 12,
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 600 }}>
                Submit a comment
              </div>
              <input
                placeholder="Full name"
                style={{
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: "1px solid rgba(148,163,184,0.3)",
                  background: "rgba(15,23,42,0.6)",
                  color: "#f8fafc",
                  fontSize: 13,
                  outline: "none",
                }}
              />
              <input
                placeholder="Email address"
                style={{
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: "1px solid rgba(148,163,184,0.3)",
                  background: "rgba(15,23,42,0.6)",
                  color: "#f8fafc",
                  fontSize: 13,
                  outline: "none",
                }}
              />
              <textarea
                rows={4}
                placeholder="Share your feedback..."
                style={{
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: "1px solid rgba(148,163,184,0.3)",
                  background: "rgba(15,23,42,0.6)",
                  color: "#f8fafc",
                  fontSize: 13,
                  outline: "none",
                  resize: "vertical",
                }}
              />
              <button
                type="button"
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
                Submit comment
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

