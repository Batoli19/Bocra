import PageWrapper from "../components/shared/PageWrapper";

const ALERTS = [
  {
    level: "High",
    title: "SIM swap attempts reported",
    body: "Increase monitoring for unusual account changes and reset requests.",
  },
  {
    level: "Medium",
    title: "Phishing campaigns targeting mobile wallets",
    body: "Warn customers about fake SMS links and verify sender IDs.",
  },
  {
    level: "Low",
    title: "Routine patch advisory",
    body: "Apply vendor patches for network devices and customer portals.",
  },
];

const ADVISORIES = [
  {
    title: "Protecting customer data",
    body: "Enforce MFA, rotate credentials, and audit data access regularly.",
  },
  {
    title: "Incident reporting",
    body: "Report cyber incidents within 24 hours through bwCIRT.",
  },
  {
    title: "Awareness campaigns",
    body: "Train staff and customers on safe digital practices.",
  },
];

export default function CIRTPage() {
  return (
    <PageWrapper fullWidth>
      <div
        style={{
          minHeight: "100vh",
          background:
            "radial-gradient(1100px 600px at 15% -10%, rgba(99,102,241,0.2), transparent), radial-gradient(900px 500px at 100% 0%, rgba(14,165,233,0.2), transparent), #0b0e14",
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
              bwCIRT
            </div>
            <h1
              style={{
                fontSize: "clamp(32px, 5vw, 52px)",
                margin: "18px 0 12px",
                fontWeight: 700,
              }}
            >
              Cybersecurity alerts and guidance.
            </h1>
            <p
              style={{
                fontSize: 16,
                color: "rgba(226,232,240,0.75)",
                lineHeight: 1.6,
              }}
            >
              Stay ahead of digital threats with bwCIRT advisories, incident
              reporting, and response guidance for industry partners and the
              public.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 18,
              marginTop: 32,
              marginBottom: 40,
            }}
          >
            {ALERTS.map((alert) => (
              <div
                key={alert.title}
                style={{
                  background: "rgba(2, 6, 23, 0.8)",
                  borderRadius: 18,
                  padding: "18px 20px",
                  border: "1px solid rgba(148,163,184,0.2)",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color:
                      alert.level === "High"
                        ? "#f87171"
                        : alert.level === "Medium"
                        ? "#fbbf24"
                        : "#34d399",
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  {alert.level} alert
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, marginTop: 6 }}>
                  {alert.title}
                </div>
                <div style={{ fontSize: 12, color: "rgba(226,232,240,0.7)", marginTop: 8 }}>
                  {alert.body}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 18,
              marginBottom: 40,
            }}
          >
            {ADVISORIES.map((advice) => (
              <div
                key={advice.title}
                style={{
                  background: "rgba(15, 23, 42, 0.6)",
                  borderRadius: 18,
                  padding: "18px 20px",
                  border: "1px solid rgba(148,163,184,0.18)",
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 600 }}>{advice.title}</div>
                <div style={{ fontSize: 12, color: "rgba(226,232,240,0.7)", marginTop: 8 }}>
                  {advice.body}
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
                Report a cyber incident
              </div>
              <div style={{ fontSize: 13, color: "rgba(226,232,240,0.7)", marginTop: 6 }}>
                Contact bwCIRT to report cybersecurity incidents or request assistance.
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a
                href="mailto:info@bocra.org.bw"
                style={{
                  background: "#0ea5e9",
                  padding: "10px 18px",
                  borderRadius: 999,
                  color: "white",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Email bwCIRT
              </a>
              <a
                href="/contact"
                style={{
                  border: "1px solid rgba(148,163,184,0.4)",
                  padding: "10px 18px",
                  borderRadius: 999,
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Contact BOCRA
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

