import { useState } from "react";
import { RefreshCw } from "lucide-react";
import PageWrapper from "../../components/shared/PageWrapper";
import { useApplications } from "../../context/ApplicationContext";

export default function AdminApplicationsPage() {
  const { applications, updateStatus, refresh } = useApplications();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    refresh();
    setTimeout(() => setRefreshing(false), 600);
  };
  return (
    <PageWrapper>
      <div
        style={{
          minHeight: "100vh",
          background:
            "radial-gradient(1100px 600px at 10% -10%, rgba(14,165,233,0.18), transparent), radial-gradient(900px 500px at 100% 0%, rgba(99,102,241,0.18), transparent), #0b0e14",
          color: "#f8fafc",
          padding: "80px 20px 96px",
          fontFamily: "'Space Grotesk', 'DM Sans', sans-serif",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
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
              Admin | Applications review
            </div>
            <h1
              style={{
                fontSize: "clamp(28px, 4vw, 46px)",
                margin: "16px 0 10px",
                fontWeight: 700,
              }}
            >
              Review licence applications.
            </h1>
            <p style={{ color: "rgba(226,232,240,0.7)" }}>
              Inspect submitted documents and approve or reject applications.
            </p>
            <button
              type="button"
              onClick={handleRefresh}
              title="Refresh applications"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginTop: 16,
                border: "1px solid rgba(148,163,184,0.25)",
                borderRadius: 999,
                padding: "10px 20px",
                fontSize: 13,
                fontWeight: 700,
                background: "rgba(255,255,255,0.06)",
                color: "#f8fafc",
                cursor: "pointer",
                fontFamily: "'Space Grotesk', sans-serif",
                transition: "background 0.2s ease",
              }}
            >
              <RefreshCw size={15} style={{ transition: "transform 0.6s ease", transform: refreshing ? "rotate(360deg)" : "rotate(0deg)" }} />
              Refresh
            </button>
          </div>

          <div
            style={{
              marginTop: 28,
              background: "rgba(2, 6, 23, 0.8)",
              borderRadius: 18,
              border: "1px solid rgba(148,163,184,0.2)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 1.2fr 1.4fr 0.8fr 0.9fr 1fr",
                padding: "12px 16px",
                fontSize: 12,
                color: "rgba(226,232,240,0.6)",
                background: "rgba(15, 23, 42, 0.6)",
              }}
            >
              <div>Application ID</div>
              <div>Applicant</div>
              <div>Category</div>
              <div>Submitted</div>
              <div>Status</div>
              <div>Action</div>
            </div>
            {applications.map((item) => (
              <div
                key={item.ref}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.1fr 1.2fr 1.4fr 0.8fr 0.9fr 1fr",
                  padding: "14px 16px",
                  borderTop: "1px solid rgba(148,163,184,0.12)",
                  fontSize: 13,
                }}
              >
                <div>{item.ref}</div>
                <div>{item.applicant}</div>
                <div>{item.type}</div>
                <div>{item.date}</div>
                <div>{item.status}</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button
                    type="button"
                    style={{
                      border: "1px solid rgba(148,163,184,0.25)",
                      borderRadius: 999,
                      padding: "6px 10px",
                      fontSize: 12,
                      background: "rgba(255,255,255,0.06)",
                      color: "#f8fafc",
                      cursor: "pointer",
                    }}
                  >
                    Review docs
                  </button>
                  <button
                    type="button"
                    onClick={() => updateStatus(item.ref, 'Licence Issued')}
                    style={{
                      border: "1px solid rgba(16,185,129,0.5)",
                      borderRadius: 999,
                      padding: "6px 10px",
                      fontSize: 12,
                      background: "rgba(16,185,129,0.15)",
                      color: "#34d399",
                      cursor: "pointer",
                    }}
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => updateStatus(item.ref, 'Rejected')}
                    style={{
                      border: "1px solid rgba(248,113,113,0.5)",
                      borderRadius: 999,
                      padding: "6px 10px",
                      fontSize: 12,
                      background: "rgba(248,113,113,0.12)",
                      color: "#fca5a5",
                      cursor: "pointer",
                    }}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
