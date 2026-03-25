import { useState } from "react";
import PageWrapper from "../../components/shared/PageWrapper";

const STAFF = ["Naledi M.", "Kagiso R.", "Tebogo L.", "Dineo P."];

const COMPLAINTS = [
  {
    id: "CMP-2026-0847",
    customer: "M. Dube",
    provider: "Mascom",
    issue: "Billing dispute",
    status: "Open",
    priority: "High",
    submitted: "24 Mar 2026",
  },
  {
    id: "CMP-2026-0834",
    customer: "S. Nkwe",
    provider: "Orange",
    issue: "No service",
    status: "In Review",
    priority: "Medium",
    submitted: "23 Mar 2026",
  },
  {
    id: "CMP-2026-0821",
    customer: "T. Moeti",
    provider: "BTC",
    issue: "Slow internet",
    status: "Resolved",
    priority: "Low",
    submitted: "22 Mar 2026",
  },
];

export default function AdminComplaintsPage() {
  const [selectedStaff, setSelectedStaff] = useState(STAFF[0]);

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
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
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
                Admin | Complaints queue
              </div>
              <h1
                style={{
                  fontSize: "clamp(28px, 4vw, 46px)",
                  margin: "16px 0 10px",
                  fontWeight: 700,
                }}
              >
                Review and assign complaints.
              </h1>
              <p style={{ color: "rgba(226,232,240,0.7)" }}>
                Assign a staff member and update statuses as cases progress.
              </p>
            </div>
            <div
              style={{
                background: "rgba(15, 23, 42, 0.7)",
                borderRadius: 16,
                padding: "14px 16px",
                border: "1px solid rgba(148,163,184,0.2)",
                minWidth: 220,
              }}
            >
              <div style={{ fontSize: 12, color: "rgba(226,232,240,0.6)" }}>
                Assign to
              </div>
              <select
                value={selectedStaff}
                onChange={(e) => setSelectedStaff(e.target.value)}
                style={{
                  width: "100%",
                  marginTop: 8,
                  padding: "8px 10px",
                  background: "rgba(2,6,23,0.7)",
                  color: "#f8fafc",
                  border: "1px solid rgba(148,163,184,0.3)",
                  borderRadius: 10,
                  fontSize: 13,
                }}
              >
                {STAFF.map((person) => (
                  <option key={person} value={person}>
                    {person}
                  </option>
                ))}
              </select>
            </div>
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
                gridTemplateColumns: "1.2fr 1fr 1fr 1fr 0.8fr 0.8fr 0.8fr",
                padding: "12px 16px",
                fontSize: 12,
                color: "rgba(226,232,240,0.6)",
                background: "rgba(15, 23, 42, 0.6)",
              }}
            >
              <div>Complaint ID</div>
              <div>Customer</div>
              <div>Provider</div>
              <div>Issue</div>
              <div>Status</div>
              <div>Priority</div>
              <div>Action</div>
            </div>
            {COMPLAINTS.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1fr 1fr 1fr 0.8fr 0.8fr 0.8fr",
                  padding: "14px 16px",
                  borderTop: "1px solid rgba(148,163,184,0.12)",
                  fontSize: 13,
                }}
              >
                <div>{item.id}</div>
                <div>{item.customer}</div>
                <div>{item.provider}</div>
                <div>{item.issue}</div>
                <div>{item.status}</div>
                <div>{item.priority}</div>
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
                  Assign
                </button>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 22,
              fontSize: 12,
              color: "rgba(226,232,240,0.5)",
            }}
          >
            Assigned staff: {selectedStaff}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
