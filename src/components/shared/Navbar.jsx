// Owner: Dev 1  |  Component: Navbar
// Inspired by Cubex.com - floating pill nav + chat bubble

import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, X, Menu } from "lucide-react";
import bocraSvg from "../../assets/bocra.svg";
import ChatBubble from "../../chatbot/ChatBubble";

export default function Navbar({ showHint = false, onChatClose, hideChat = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

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
        { label: "File a Complaint", href: "/portal/complaint/new" },
      ],
    },
    {
      label: "Licensing",
      href: "/licensing",
      children: [
        { label: "Licensing Overview", href: "/licensing" },
        { label: "Apply for Licence", href: "/licensing/apply" },
        { label: "Check Licence Status", href: "/verify" },
        { label: "Documents Checklist", href: "/documents" },
      ],
    },
    { label: "Consumer", href: "/consumer" },
    { label: "News", href: "/news" },
    { label: "Contact", href: "/contact" },
  ];

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) return;
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    setSearchQuery("");
    setSearchOpen(false);
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: scrolled ? 14 : 22,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
          width: "calc(100% - 32px)",
          maxWidth: 1240,
          transition: "top 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <nav
          style={{
            background: "#ffffff",
            borderRadius: 999,
            padding: "10px 10px 10px 24px",
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
              className="navbar-logo"
              style={{
                height: 56,
                width: "auto",
                display: "block",
                objectFit: "contain",
              }}
            />
          </Link>

          {/* Desktop nav links — hidden on mobile via CSS */}
          <div
            className="navbar-desktop-links"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
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
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(0,0,0,0.05)";
                      e.currentTarget.style.color = "#0B1F3A";
                    }}
                    onMouseLeave={(e) => {
                      if (activeDropdown !== link.label) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#1a2e44";
                      }
                    }}
                    onClick={(e) => {
                      if (link.children) {
                        e.preventDefault();
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
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(0,0,0,0.04)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
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

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {searchOpen ? (
                <form
                  onSubmit={handleSearchSubmit}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 8px 6px 12px",
                    borderRadius: 999,
                    background: "#f8fafc",
                    border: "1px solid rgba(11,31,58,0.1)",
                    boxShadow: "0 10px 25px rgba(15,23,42,0.1)",
                    transition: "box-shadow 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      minWidth: 190,
                    }}
                  >
                    <Search
                      size={15}
                      strokeWidth={2}
                      aria-hidden="true"
                      style={{ color: "rgba(11,31,58,0.55)", flexShrink: 0 }}
                    />
                    <input
                      ref={searchInputRef}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search BOCRA"
                      style={{
                        border: "none",
                        outline: "none",
                        background: "transparent",
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 500,
                        fontSize: 13,
                        color: "#0b1f3a",
                        minWidth: 150,
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSearchOpen(false);
                    }}
                    aria-label="Close search"
                    style={{
                      border: "none",
                      background: "transparent",
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "rgba(11,31,58,0.55)",
                      transition: "background 0.2s ease, color 0.2s ease",
                    }}
                  >
                    <X size={15} strokeWidth={2} aria-hidden="true" />
                  </button>
                  <button
                    type="submit"
                    style={{
                      border: "none",
                      background: "#0B1F3A",
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 4px 14px rgba(15,23,42,0.35)",
                    }}
                    aria-label="Search BOCRA"
                  >
                    <Search size={15} strokeWidth={2} aria-hidden="true" />
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  aria-label="Open search"
                  style={{
                    border: "none",
                    background: "rgba(5,9,12,0.35)",
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 6px 20px rgba(5,9,12,0.25)",
                    transition: "background 0.2s ease",
                  }}
                >
                  <Search
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                    style={{ color: "#f8fafc" }}
                  />
                </button>
              )}
            </div>
          </div>

          {/* Right side: hamburger (mobile) + CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={() => navigate("/search")}
              aria-label="Open search"
              className="navbar-mobile-menu-btn"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                display: "none",
                alignItems: "center",
              }}
            >
              <Menu size={24} color="#0b1f3a" />
            </button>
            <a
              href="/portal/complaint/new"
              className="navbar-cta-btn navbar-cta-desktop"
              style={{
                padding: "10px 20px",
                borderRadius: 999,
                fontSize: 13,
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
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#111827";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#050505";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              File Complaint
            </a>
          </div>
        </nav>
      </div>

      {!hideChat && <ChatBubble showHint={showHint} onClose={onChatClose} />}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes dropIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }



        /* Show the burger menu button on all screens */
        .navbar-mobile-menu-btn {
          display: flex !important;
        }

        @media (max-width: 960px) {
          .navbar-desktop-links {
            display: none !important;
          }
          .navbar-cta-desktop {
            display: none !important;
          }
          .navbar-logo {
            height: 44px !important;
          }
        }

        @media (max-width: 480px) {
          .navbar-logo {
            height: 36px !important;
          }
        }
      `}</style>
    </>
  );
}
