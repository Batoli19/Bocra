import { Link } from "react-router-dom";
import PageWrapper from "../components/shared/PageWrapper";

const STEPS = [
  {
    title: "Describe the issue",
    body: "Explain what happened, when it started, and which provider is involved.",
  },
  {
    title: "Attach proof",
    body: "Add reference numbers, screenshots, or invoices if available.",
  },
  {
    title: "Submit and track",
    body: "Send your complaint and track progress in your portal.",
  },
];

const ISSUE_TYPES = [
  {
    title: "Billing & charges",
    body: "Overcharging, unexpected fees, disputed invoices.",
  },
  {
    title: "Network quality",
    body: "No service, dropped calls, poor coverage, slow internet.",
  },
  {
    title: "Service conduct",
    body: "Unfair treatment, misleading information, unresolved issues.",
  },
  {
    title: "Scams & fraud",
    body: "Phishing, SIM swap attempts, suspicious messages.",
  },
];

const CHECKLIST = [
  "Provider name and account/phone number",
  "Dates, times, and locations",
  "Reference numbers (if any)",
  "Screenshots or proof (optional)",
  "Desired resolution",
];

const FAQS = [
  {
    q: "Do I need to contact my provider first?",
    a: "Yes. Try to resolve with your provider and keep reference numbers.",
  },
  {
    q: "How long does it take?",
    a: "Timelines vary by case type. You will receive updates in the portal.",
  },
  {
    q: "Can I follow up on my complaint?",
    a: "Yes, track your complaint status in the complaints portal.",
  },
];

export default function ComplaintsPage() {
  return (
    <PageWrapper fullWidth>
      <div
        style={{
          minHeight: "100vh",
          background:
            "radial-gradient(1100px 600px at 15% -10%, rgba(148,163,184,0.18), transparent), radial-gradient(900px 500px at 100% 0%, rgba(14,165,233,0.2), transparent), #0b0e14",
          color: "#f8fafc",
          padding: "80px 20px 96px",
          fontFamily: "'Space Grotesk', 'DM Sans', sans-serif",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 28,
              alignItems: "center",
              marginBottom: 46,
            }}
          >
            <div>
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
                Complaints & dispute help
              </div>
              <h1
                style={{
                  fontSize: "clamp(32px, 5vw, 52px)",
                  margin: "18px 0 12px",
                  fontWeight: 700,
                }}
              >
                File a complaint with confidence.
              </h1>
              <p
                style={{
                  fontSize: 16,
                  color: "rgba(226,232,240,0.75)",
                  lineHeight: 1.6,
                  maxWidth: 520,
                }}
              >
                BOCRA helps resolve issues with telecoms, broadcasting, and postal
                services. Use this page to understand the process and submit a
                complete complaint.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap" }}>
                <Link
                  to="/portal/complaint/new"
                  style={{
                    background: "linear-gradient(135deg, #0ea5e9, #2563eb)",
                    padding: "10px 18px",
                    borderRadius: 999,
                    color: "white",
                    fontWeight: 600,
                    textDecoration: "none",
                    boxShadow: "0 12px 30px rgba(37,99,235,0.35)",
                  }}
                >
                  File a complaint
                </Link>
                <Link
                  to="/portal/complaints"
                  style={{
                    border: "1px solid rgba(148,163,184,0.4)",
                    padding: "10px 18px",
                    borderRadius: 999,
                    color: "white",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  Track a complaint
                </Link>
              </div>
            </div>
            <div
              style={{
                background: "rgba(15, 23, 42, 0.7)",
                borderRadius: 24,
                padding: 24,
                border: "1px solid rgba(148,163,184,0.18)",
                boxShadow: "0 20px 60px rgba(15,23,42,0.4)",
              }}
            >
              <div style={{ fontSize: 14, color: "rgba(226,232,240,0.7)" }}>
                Common issues we handle
              </div>
              <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
                {ISSUE_TYPES.map((issue) => (
                  <div
                    key={issue.title}
                    style={{
                      padding: "12px 14px",
                      borderRadius: 16,
                      background: "rgba(30,41,59,0.6)",
                      border: "1px solid rgba(148,163,184,0.15)",
                    }}
                  >
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{issue.title}</div>
                    <div style={{ fontSize: 12, color: "rgba(226,232,240,0.7)" }}>
                      {issue.body}
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/contact"
                style={{
                  display: "inline-flex",
                  marginTop: 16,
                  fontSize: 13,
                  color: "#7dd3fc",
                  textDecoration: "none",
                }}
              >
                Contact support →
              </Link>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 18,
              marginBottom: 42,
            }}
          >
            {STEPS.map((step, idx) => (
              <div
                key={step.title}
                style={{
                  background: "rgba(15, 23, 42, 0.55)",
                  borderRadius: 18,
                  padding: "18px 20px",
                  border: "1px solid rgba(148,163,184,0.18)",
                }}
              >
                <div style={{ fontSize: 12, color: "#7dd3fc", fontWeight: 600 }}>
                  Step {idx + 1}
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, marginTop: 6 }}>
                  {step.title}
                </div>
                <div style={{ fontSize: 13, color: "rgba(226,232,240,0.7)", marginTop: 6 }}>
                  {step.body}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 18,
              marginBottom: 42,
            }}
          >
            <div
              style={{
                background: "rgba(2, 6, 23, 0.8)",
                borderRadius: 18,
                padding: "18px 20px",
                border: "1px solid rgba(148,163,184,0.2)",
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 600 }}>Complaint checklist</div>
              <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
                {CHECKLIST.map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      gap: 8,
                      alignItems: "center",
                      fontSize: 12,
                      color: "rgba(226,232,240,0.8)",
                    }}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: "#38bdf8" }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                style={{
                  background: "rgba(15, 23, 42, 0.6)",
                  borderRadius: 18,
                  padding: "18px 20px",
                  border: "1px solid rgba(148,163,184,0.18)",
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 600 }}>{faq.q}</div>
                <div style={{ fontSize: 12, color: "rgba(226,232,240,0.7)", marginTop: 8 }}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              background: "linear-gradient(135deg, rgba(14,165,233,0.2), rgba(99,102,241,0.2))",
              borderRadius: 22,
              padding: "26px 28px",
              border: "1px solid rgba(148,163,184,0.25)",
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>
                Ready to file your complaint?
              </div>
              <div style={{ fontSize: 13, color: "rgba(226,232,240,0.7)", marginTop: 6 }}>
                Use the portal to submit and track your case.
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link
                to="/portal/complaint/new"
                style={{
                  background: "#0ea5e9",
                  padding: "10px 18px",
                  borderRadius: 999,
                  color: "white",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Submit now
              </Link>
              <Link
                to="/contact"
                style={{
                  border: "1px solid rgba(148,163,184,0.4)",
                  padding: "10px 18px",
                  borderRadius: 999,
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Contact BOCRA
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

