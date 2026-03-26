// Owner: Dev 1  |  Component: Navbar
// Inspired by Cubex.com - floating pill nav + chat bubble

import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Search, X, Menu, Globe } from "lucide-react";
import bocraSvg from "../../assets/bocra.svg";
import ChatBubble from "../../chatbot/ChatBubble";
import { useLanguage } from "../../hooks/useLanguage";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar({ showHint = false, onChatClose, hideChat = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const language = useLanguage();
  const { isLoggedIn } = useAuth();
  const lang = language?.lang || "en";
  const setLang = language?.setLang;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
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
  }, [location.pathname]);

  const applyLoginHref = "/login?redirect=/portal/apply&force=1";

  const navLinks = [
    { label: "About", href: "/about" },
    {
      label: "Services",
      href: "/consumer",
      children: [
        { label: "Consumer Protection", href: "/consumer" },
        { label: "Quality of Service (QoS)", href: "/qos" },
        { label: "Type Approval", href: "/type-approval" },
        { label: "Cybersecurity (bwCIRT)", href: "/cirt" },
        { label: "UASF Programs", href: "/uasf" },
        { label: "Network Coverage Map", href: "/map" },
        { label: "File a Complaint", href: isLoggedIn ? "/portal/complaint/new" : "/login?redirect=/portal/complaint/new" },
      ],
    },
    {
      label: "Licensing",
      href: "/licensing",
      children: [
        { label: "Licensing Overview", href: "/licensing" },
        { label: "Apply for Licence", href: applyLoginHref },
        { label: "Check Licence Status", href: "/verify" },
        { label: "Documents Checklist", href: "/documents" },
      ],
    },
    { label: "Consumer", href: "/consumer" },
    { label: "News", href: "/news" },
    { label: "Contact", href: "/contact" },
  ];

  const mobileMenuLinks = [
    ["About", "/about"],
    ["Consumer Protection", "/consumer"],
    ["QoS Dashboard", "/qos"],
    ["Type Approval", "/type-approval"],
    ["Apply for Licence", applyLoginHref],
    ["Check Licence Status", "/verify"],
    ["Coverage Map", "/map"],
    ["News", "/news"],
    ["Contact", "/contact"],
  ];

  const mobilePrimaryLinks = [
    { label: "About", href: "/about" },
    { label: "Licensing", href: "/licensing" },
    { label: "Documents", href: "/documents" },
    { label: "Coverage Map", href: "/map" },
    { label: "News", href: "/news" },
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
            background: "#ffffff",
            borderRadius: isMobile ? 28 : 999,
            padding: isMobile ? "10px 12px 10px 16px" : "10px 10px 10px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: scrolled
              ? "0 8px 32px rgba(0,0,0,0.13), 0 1px 4px rgba(0,0,0,0.07)"
              : "0 4px 24px rgba(0,0,0,0.09), 0 1px 3px rgba(0,0,0,0.05)",
            border: "1px solid rgba(0,0,0,0.07)",
            transition: "box-shadow 0.3s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: isMobile ? 6 : 0,
              minWidth: 0,
              flex: isMobile ? "1 1 auto" : "0 1 auto",
              flexShrink: 1,
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

            {isMobile && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 1,
                  minWidth: 0,
                  flex: 1,
                  overflow: "hidden",
                }}
              >
                {mobilePrimaryLinks.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: 0,
                      padding: "2px 1px",
                      borderRadius: 8,
                      fontSize: 8,
                      fontWeight: 600,
                      lineHeight: 1,
                      textAlign: "center",
                      color: "#1a2e44",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                      letterSpacing: "-0.03em",
                      background:
                        location.pathname === item.href
                          ? "rgba(0,0,0,0.05)"
                          : "transparent",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

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
                  onMouseEnter={() =>
                    link.children && setActiveDropdown(link.label)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={link.href}
                    style={{
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
                    }}
                    onMouseEnter={(event) => {
                      event.currentTarget.style.background = "rgba(0,0,0,0.05)";
                      event.currentTarget.style.color = "#0B1F3A";
                    }}
                    onMouseLeave={(event) => {
                      if (activeDropdown !== link.label) {
                        event.currentTarget.style.background = "transparent";
                        event.currentTarget.style.color = "#1a2e44";
                      }
                    }}
                    onClick={(event) => {
                      if (link.children) {
                        event.preventDefault();
                        setActiveDropdown((prev) =>
                          prev === link.label ? null : link.label
                        );
                      }
                    }}
                  >
                    {link.label}
                    {link.children && (
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
                    )}
                  </Link>

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
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          style={{
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
                          }}
                          onMouseEnter={(event) => {
                            event.currentTarget.style.background = "rgba(0,0,0,0.04)";
                          }}
                          onMouseLeave={(event) => {
                            event.currentTarget.style.background = "transparent";
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
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

            <Link
              to={isLoggedIn ? "/portal/complaint/new" : "/login?redirect=/portal/complaint/new"}
              style={{
                padding: isMobile ? "8px 14px" : "10px 20px",
                borderRadius: 999,
                fontSize: isMobile ? 12 : 14,
                fontWeight: 600,
                color: "#ffffff",
                background: "#050505",
                textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif",
                transition: "background 0.2s, transform 0.15s",
                whiteSpace: "nowrap",
                letterSpacing: "0.01em",
                border: "1px solid rgba(255,255,255,0.08)",
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
            </Link>

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
              {mobileMenuLinks.map(([label, href]) => (
                <Link
                  key={href}
                  to={href}
                  onClick={() => setOpen(false)}
                  style={{
                    display: "block",
                    padding: "12px 16px",
                    color: "#111",
                    textDecoration: "none",
                    fontSize: 15,
                    fontWeight: 500,
                    borderBottom: "1px solid #f1f5f9",
                    borderRadius: 8,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {label}
                </Link>
              ))}
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
