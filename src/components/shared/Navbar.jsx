// Owner: Dev 1  |  Component: Navbar
// Inspired by Cubex.com - floating pill nav + chat bubble

import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Search, X, Menu, Globe, LogOut, ChevronDown, User, LayoutDashboard } from "lucide-react";
import bocraSvg from "../../assets/bocra.svg";
import ChatBubble from "../../chatbot/ChatBubble";
import { useLanguage } from "../../hooks/useLanguage";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar({ showHint = false, onChatClose, hideChat = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const language = useLanguage();
  const { isLoggedIn, user, logout, requireAuth } = useAuth();
  const lang = language?.lang || "en";
  const setLang = language?.setLang;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setScrollProgress(Math.min(y / 180, 1));
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    setOpen(false);
    setActiveDropdown(null);
    setProfileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
  };

  const getUserInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
  };
  const navBackgroundAlpha = 1 - scrollProgress * 0.78;
  const navBorderAlpha = 0.07 - scrollProgress * 0.03;
  const navShadowAlpha = 0.09 - scrollProgress * 0.04;
  const navBackground = `rgba(255,255,255,${navBackgroundAlpha.toFixed(2)})`;
  const navBorder = `1px solid rgba(0,0,0,${Math.max(navBorderAlpha, 0.03).toFixed(2)})`;
  const navShadow = scrolled
    ? `0 8px 32px rgba(0,0,0,${Math.max(navShadowAlpha + 0.02, 0.06).toFixed(2)}), 0 1px 4px rgba(0,0,0,0.05)`
    : `0 4px 24px rgba(0,0,0,${Math.max(navShadowAlpha, 0.05).toFixed(2)}), 0 1px 3px rgba(0,0,0,0.05)`;

  const navLinks = [
    { label: "About", href: "/about" },
    {
      label: "Services",
      href: "/consumer",
      children: [
        { label: "Consumer Protection", href: "/consumer" },
        { label: "Quality of Service (QoS)", href: "/qos" },
        { label: "Type Approval", href: "https://typeapproval.bocra.org.bw/" },
        { label: "Cybersecurity (bwCIRT)", href: "https://www.cirt.org.bw/about" },
        { label: "UASF Programs", href: "/uasf" },
        { label: "Network Coverage Map", href: "/map" },
        { label: "File a Complaint", href: "/portal/complaint/new", secure: true },
        { label: "Privacy Policy", href: "/privacy" },
      ],
    },
    {
      label: "Licensing",
      href: "/licensing",
      children: [
        { label: "Licensing Overview", href: "/licensing" },
        { label: "Apply for Licence", href: "/licensing", secure: true },
        { label: "Check Licence Status", href: "/verify" },
        { label: "Documents Checklist", href: "/documents" },
      ],
    },
    { label: "Consumer", href: "/consumer" },
    { label: "News", href: "/news" },
    { label: "Register Domain", href: "https://nic.net.bw/" },
  ];

  const mobileMenuLinks = [
    ["About", "/about"],
    ["Consumer Protection", "/consumer"],
    ["QoS Dashboard", "/qos"],
    ["Type Approval", "https://typeapproval.bocra.org.bw/"],
    ["Apply for Licence", "/licensing", true],
    ["Check Licence Status", "/verify"],
    ["Coverage Map", "/map"],
    ["News", "/news"],
    ["Register Domain", "https://nic.net.bw/"],
  ];


  return (
    <>
      <div
        style={{
          position: "fixed",
          top: scrolled ? 14 : 22,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
          width: isMobile ? "calc(100% - 20px)" : "calc(100% - 32px)",
          maxWidth: 1240,
          transition: "top 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <nav
          style={{
            position: "relative",
            background: navBackground,
            backdropFilter: "blur(18px) saturate(180%)",
            WebkitBackdropFilter: "blur(18px) saturate(180%)",
            borderRadius: isMobile ? 28 : 999,
            padding: isMobile ? "10px 16px" : "10px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: navShadow,
            border: navBorder,
            transition: "background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
            maxWidth: '1280px',
            margin: '0 auto',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <img
              src={bocraSvg}
              alt="BOCRA Logo"
              style={{
                height: isMobile ? 44 : 56,
                width: "auto",
                display: "block",
                objectFit: "contain",
              }}
            />
          </Link>

          <div
            style={{
              display: isMobile ? "none" : "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <ul
              style={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              {navLinks.map((link) => (
                <li
                  key={link.label}
                  style={{ position: "relative" }}
                >
                  {(() => {
                    const isExternal = link.href.startsWith("http");
                    const commonProps = {
                      onClick: (event) => {
                        if (link.children) {
                          event.preventDefault();
                          setActiveDropdown((prev) =>
                            prev === link.label ? null : link.label
                          );
                        } else if (link.secure && !requireAuth(link.href)) {
                          event.preventDefault();
                        }
                      },
                      onMouseEnter: (event) => {
                        event.currentTarget.style.background = "rgba(0,0,0,0.05)";
                        event.currentTarget.style.color = "#0B1F3A";
                      },
                      onMouseLeave: (event) => {
                        if (activeDropdown !== link.label) {
                          event.currentTarget.style.background = "transparent";
                          event.currentTarget.style.color = "#1a2e44";
                        }
                      },
                      style: {
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "8px 14px",
                        borderRadius: 999,
                        fontSize: 13,
                        fontWeight: 500,
                        color: "#1a2e44",
                        textDecoration: "none",
                        transition: "background 0.18s, color 0.18s",
                        background:
                          activeDropdown === link.label
                            ? "rgba(0,0,0,0.05)"
                            : "transparent",
                        fontFamily: "'DM Sans', sans-serif",
                        whiteSpace: "nowrap",
                      }
                    };

                    const childrenIcon = link.children && (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        style={{
                          transition: "transform 0.2s",
                          transform:
                            activeDropdown === link.label
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                          opacity: 0.45,
                        }}
                      >
                        <path
                          d="M2 3.5L5 6.5L8 3.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    );

                    return isExternal ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" {...commonProps}>
                        {link.label}
                        {childrenIcon}
                      </a>
                    ) : (
                      <Link to={link.href} {...commonProps}>
                        {link.label}
                        {childrenIcon}
                      </Link>
                    );
                  })()}

                  {link.children && activeDropdown === link.label && (
                    <div
                      style={{
                        position: "absolute",
                        top: "calc(100% + 8px)",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "#ffffff",
                        borderRadius: 14,
                        padding: "6px",
                        boxShadow:
                          "0 12px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
                        border: "1px solid rgba(0,0,0,0.07)",
                        minWidth: 210,
                        zIndex: 100,
                        animation: "dropIn 0.18s ease",
                      }}
                    >
                      {link.children.map((child) => {
                        const isChildExternal = child.href.startsWith("http");
                        const childStyle = {
                          display: "block",
                          padding: "8px 12px",
                          borderRadius: 9,
                          fontSize: 12,
                          color: "#1a2e44",
                          textDecoration: "none",
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 400,
                          transition: "background 0.15s",
                          whiteSpace: "nowrap",
                        };
                        const handleMouseEnter = (event) => {
                          event.currentTarget.style.background = "rgba(0,0,0,0.04)";
                        };
                        const handleMouseLeave = (event) => {
                          event.currentTarget.style.background = "transparent";
                        };
                        const handleClick = (event) => {
                          setActiveDropdown(null);
                          if (child.secure && !requireAuth(child.href)) {
                            event.preventDefault();
                          }
                        };

                        return isChildExternal ? (
                          <a
                            key={child.label}
                            href={child.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={childStyle}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => setActiveDropdown(null)}
                          >
                            {child.label}
                          </a>
                        ) : (
                          <Link
                            key={child.label}
                            to={child.href}
                            style={childStyle}
                            onClick={handleClick}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: isMobile ? 6 : 8,
            }}
          >
            {!isMobile && (
              <button
                type="button"
                onClick={() => setLang?.(lang === "en" ? "tn" : "en")}
                aria-label={`Switch language from ${lang.toUpperCase()}`}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: 12,
                  color: "#1a2e44",
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  padding: "8px 10px",
                  borderRadius: 999,
                }}
              >
                <Globe size={14} />
                {lang.toUpperCase()}
              </button>
            )}

            <Link
              to="/search"
              aria-label="Open search"
              style={{
                width: isMobile ? 34 : 38,
                height: isMobile ? 34 : 38,
                borderRadius: "50%",
                background: "#eef2f7",
                color: "#1A3A6B",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Search size={16} />
            </Link>

            <button
              type="button"
              onClick={() => requireAuth("/portal/complaint/new")}
              style={{
                padding: isMobile ? "8px 14px" : "10px 20px",
                borderRadius: 999,
                fontSize: isMobile ? 12 : 14,
                fontWeight: 600,
                color: "#ffffff",
                background: "#050505",
                border: "1px solid rgba(255,255,255,0.08)",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                transition: "background 0.2s, transform 0.15s",
                whiteSpace: "nowrap",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.background = "#111827";
                event.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.background = "#050505";
                event.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {isMobile ? "Complaint" : "File Complaint"}
            </button>

            {isLoggedIn && user ? (
              <div style={{ position: "relative" }}>
                <button
                  type="button"
                  onClick={() => setProfileOpen((prev) => !prev)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: isMobile ? "4px" : "4px 10px 4px 4px",
                    borderRadius: 999,
                    background: "rgba(0,0,0,0.03)",
                    border: "1px solid rgba(0,0,0,0.05)",
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                >
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      background: "#1A3A6B",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 700,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {getUserInitials(user.name)}
                  </div>
                  {!isMobile && (
                    <ChevronDown size={14} color="#1A3A6B" style={{ transform: profileOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                  )}
                </button>

                {profileOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 12px)",
                      right: 0,
                      width: 260,
                      background: "#ffffff",
                      borderRadius: 20,
                      boxShadow: "0 16px 48px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
                      border: "1px solid rgba(0,0,0,0.06)",
                      padding: 16,
                      zIndex: 100,
                      animation: "dropIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    <div style={{ padding: "0 8px 16px", borderBottom: "1px solid #f1f5f9", marginBottom: 12 }}>
                      <div style={{ fontSize: 13, color: "#64748b", marginBottom: 4, fontFamily: "'Inter', sans-serif" }}>Welcome back,</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{user.name}</div>
                      <div style={{ fontSize: 13, color: "#64748b", marginTop: 2, fontFamily: "'Inter', sans-serif" }}>{user.email || user.phone || 'Citizen Portal'}</div>
                    </div>
                    
                    <div style={{ display: "grid", gap: 4 }}>
                      <Link
                        to="/portal"
                        onClick={() => setProfileOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "10px 12px",
                          borderRadius: 12,
                          color: "#1e293b",
                          textDecoration: "none",
                          fontSize: 14,
                          fontWeight: 500,
                          fontFamily: "'Inter', sans-serif",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "#f1f5f9"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                      >
                        <LayoutDashboard size={18} color="#1A3A6B" />
                        My Dashboard
                      </Link>
                      
                      <button
                        type="button"
                        onClick={handleLogout}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "10px 12px",
                          borderRadius: 12,
                          color: "#dc2626",
                          background: "transparent",
                          border: "none",
                          fontSize: 14,
                          fontWeight: 500,
                          fontFamily: "'Inter', sans-serif",
                          cursor: "pointer",
                          transition: "background 0.15s",
                          textAlign: "left",
                          width: "100%",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "#fef2f2"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                      >
                        <LogOut size={18} color="#dc2626" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ position: "relative" }}>
                <button
                  type="button"
                  onClick={() => setProfileOpen((prev) => !prev)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "4px",
                    borderRadius: 999,
                    background: "rgba(0,0,0,0.03)",
                    border: "1px solid rgba(0,0,0,0.05)",
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  title="Guest Mode"
                >
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      background: "#f1f5f9",
                      color: "#000000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <User size={16} />
                  </div>
                </button>

                {profileOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 12px)",
                      right: 0,
                      width: 260,
                      background: "#ffffff",
                      borderRadius: 20,
                      boxShadow: "0 16px 48px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
                      border: "1px solid rgba(0,0,0,0.06)",
                      padding: 16,
                      zIndex: 100,
                      animation: "dropIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                  >
                    <div style={{ padding: "0 8px 16px", borderBottom: "1px solid #f1f5f9", marginBottom: 12 }}>
                      <div style={{ fontSize: 13, color: "#64748b", marginBottom: 4, fontFamily: "'Inter', sans-serif" }}>Guest Mode</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Welcome to BOCRA</div>
                      <div style={{ fontSize: 13, color: "#64748b", marginTop: 2, fontFamily: "'Inter', sans-serif" }}>Sign in for full access</div>
                    </div>
                    
                    <div style={{ display: "grid", gap: 4 }}>
                      <Link
                        to="/login"
                        onClick={() => setProfileOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          padding: "10px 12px",
                          borderRadius: 12,
                          color: "#ffffff",
                          background: "#1A3A6B",
                          textDecoration: "none",
                          fontSize: 14,
                          fontWeight: 500,
                          fontFamily: "'Inter', sans-serif",
                          transition: "background 0.15s",
                          textAlign: "center",
                        }}
                      >
                        Sign In / Register
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              aria-label={open ? "Close menu" : "Open menu"}
              style={{
                display: isMobile ? "flex" : "none",
                background: "none",
                border: "none",
                cursor: "pointer",
                alignItems: "center",
                justifyContent: "center",
                padding: 4,
                width: 34,
                height: 34,
                borderRadius: "50%",
                color: "#0b1f3a",
              }}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {open && isMobile && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: "white",
                borderRadius: "0 0 20px 20px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                padding: "8px 16px 16px",
                marginTop: 8,
                zIndex: 100,
                animation: "mobileNavDropIn 0.22s ease",
              }}
            >
              {mobileMenuLinks.map(([label, href, secure]) => {
                const isExternal = href.startsWith("http");
                const commonProps = {
                  onClick: (e) => {
                    setOpen(false);
                    if (secure && !requireAuth(href)) {
                      e.preventDefault();
                    }
                  },
                  style: {
                    display: "block",
                    padding: "12px 16px",
                    color: "#111",
                    textDecoration: "none",
                    fontSize: 15,
                    fontWeight: 500,
                    borderBottom: "1px solid #f1f5f9",
                    borderRadius: 8,
                    fontFamily: "'DM Sans', sans-serif",
                  }
                };

                return isExternal ? (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" {...commonProps}>
                    {label}
                  </a>
                ) : (
                  <Link key={href} to={href} {...commonProps}>
                    {label}
                  </Link>
                );
              })}
            </div>
          )}
        </nav>
      </div>

      {!hideChat && <ChatBubble showHint={showHint} onClose={onChatClose} />}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes dropIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        @keyframes mobileNavDropIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
