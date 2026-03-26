import { useState, useEffect, useRef } from 'react';
import { Search, X, Globe, CheckCircle, Shield, Radio, DollarSign, Map, Zap, MailWarning, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import bocraSvg from '../../assets/bocra.svg';

const missingServices = [
  {
    title: ".bw Domain Registry",
    desc: "Register and manage your official Botswana (.bw) domain name.",
    icon: Globe,
    to: "/services/domain",
    color: "#0f766e"
  },
  {
    title: "Type Approval Database",
    desc: "Search for approved telecommunications and radio equipment.",
    icon: CheckCircle,
    to: "/services/type-approval/database",
    color: "#1A3A6B"
  },
  {
    title: "UASF Portal",
    desc: "Universal Access & Service Fund - connecting rural Botswana.",
    icon: Zap,
    to: "/uasf",
    color: "#d97706"
  },
  {
    title: "Spectrum Management",
    desc: "Apply for radio frequency spectrum and view allocations.",
    icon: Radio,
    to: "/services/spectrum",
    color: "#0f766e"
  },
  {
    title: "Approved Tariffs",
    desc: "View regulated pricing and tariffs for telecom operators.",
    icon: DollarSign,
    to: "/tariffs",
    color: "#1A3A6B"
  },
  {
    title: "Cybersecurity (BDRCS)",
    desc: "Report incidents and view national cybersecurity guidelines.",
    icon: Shield,
    to: "/cybersecurity",
    color: "#dc2626"
  },
  {
    title: "File a Dispute/Complaint",
    desc: "Escalate unresolved issues with your service providers to BOCRA.",
    icon: MailWarning,
    to: "/portal/complaint/new",
    color: "#0f766e"
  },
  {
    title: "Network Coverage Maps",
    desc: "View mobile, radio, and TV broadcasting coverage across the country.",
    icon: Map,
    to: "/coverage",
    color: "#1A3A6B"
  }
];

export default function GovTaskbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <>
      {/* TRIGGER BUTTON (Top Right Taskbar) */}
      <div style={{ position: "fixed", top: 16, right: 28, zIndex: 99999, display: isMobile ? "none" : "block" }}>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            background: "#ffffff",
            color: "#050505",
            border: "1px solid rgba(0,0,0,0.07)",
            borderRadius: "50%",
            width: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 24px rgba(0,0,0,0.09)",
            transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.13)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.09)";
          }}
          aria-label="Open Services Menu"
        >
          <Menu size={18} strokeWidth={2.5} />
        </button>
      </div>

      {/* DROPDOWN OVERLAY */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          background: "rgba(255, 255, 255, 0.98)",
          zIndex: 100000,
          display: isOpen ? "flex" : "none",
          flexDirection: "column",
          overflowY: "auto",
          fontFamily: "'DM Sans', sans-serif",
          animation: "slideDown 0.8s cubic-bezier(0.22, 1, 0.36, 1)"
        }}
      >
        <div style={{ position: "absolute", top: 24, right: 32 }}>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: "rgba(0,0,0,0.05)",
              border: "none",
              borderRadius: "50%",
              width: 54,
              height: 54,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.2s, transform 0.2s",
              color: "#050505"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0,0,0,0.1)";
              e.currentTarget.style.transform = "rotate(90deg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0,0,0,0.05)";
              e.currentTarget.style.transform = "rotate(0deg)";
            }}
          >
            <X size={26} />
          </button>
        </div>

        <div className="govtaskbar-overlay-inner" style={{ width: "100%", maxWidth: 1000, margin: "0 auto", padding: "100px 32px 60px" }}>
          
          {/* HUGE SEARCH ICON & INPUT IN THE MIDDLE */}
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            
            {/* BOCRA LOGO */}
            <div style={{ marginBottom: 48 }}>
              <img src={bocraSvg} alt="BOCRA Logo" style={{ height: 56, width: "auto" }} />
            </div>

            <div style={{ display: "inline-flex", background: "rgba(15, 118, 110, 0.1)", color: "#0f766e", padding: 28, borderRadius: "50%", marginBottom: 32 }}>
              <Search size={54} strokeWidth={2} />
            </div>
            <form onSubmit={handleSearch} style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
              <input
                ref={inputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What service are you looking for?"
                className="govtaskbar-search-input"
                style={{
                  width: "100%",
                  fontSize: 28,
                  padding: "20px 0",
                  border: "none",
                  borderBottom: "3px solid #e2e8f0",
                  background: "transparent",
                  outline: "none",
                  fontWeight: 500,
                  color: "#0f172a",
                  textAlign: "center",
                  transition: "border-color 0.3s"
                }}
                onFocus={(e) => e.target.style.borderBottomColor = "#0f766e"}
                onBlur={(e) => e.target.style.borderBottomColor = "#e2e8f0"}
              />
            </form>
            <p style={{ color: "#64748b", marginTop: 20, fontSize: 16 }}>
              Try searching for "domain", "licence", or "complaint"
            </p>
          </div>

          {/* LIST OF SERVICES */}
          <div>
            <h3 style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.15em", color: "#94a3b8", fontWeight: 800, marginBottom: 32, textAlign: "center" }}>
              Essential Regulatory Services Directory
            </h3>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 24
            }}>
              {missingServices.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      navigate(service.to);
                      setIsOpen(false);
                    }}
                    style={{
                      background: "#ffffff",
                      border: "1px solid #f1f5f9",
                      borderRadius: 20,
                      padding: 24,
                      cursor: "pointer",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.03)",
                      transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 20
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-6px)";
                      e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.08)";
                      e.currentTarget.style.borderColor = "transparent";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.03)";
                      e.currentTarget.style.borderColor = "#f1f5f9";
                    }}
                  >
                    <div style={{ background: `${service.color}15`, color: service.color, padding: 14, borderRadius: 14 }}>
                      <Icon size={28} />
                    </div>
                    <div>
                      <h4 style={{ margin: "0 0 8px 0", fontSize: 17, color: "#0f172a", fontWeight: 700 }}>
                        {service.title}
                      </h4>
                      <p style={{ margin: 0, fontSize: 14, color: "#64748b", lineHeight: 1.6 }}>
                        {service.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 760px) {
          .govtaskbar-search-input {
            font-size: 20px !important;
          }
          .govtaskbar-overlay-inner {
            padding: 80px 16px 40px !important;
          }
        }
      `}</style>
    </>
  );
}
