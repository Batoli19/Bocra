import React, { useState } from 'react';
import PageWrapper from '../components/shared/PageWrapper';
import { CheckCircle } from 'lucide-react';

export default function UASFPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email) {
      setSubmitted(true);
    }
  };

  return (
    <PageWrapper>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1) }
          50% { opacity: 0.4; transform: scale(0.75) }
        }
      `}</style>
      <div style={{
        backgroundColor: "white",
        minHeight: "100vh"
      }}>
        <div style={{
          maxWidth: "680px",
          margin: "0 auto",
          padding: "80px 24px",
          textAlign: "center"
        }}>
          {/* SECTION 1 - STATUS PILL */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "#D6E4F7",
            borderRadius: "50px",
            padding: "8px 20px",
            marginBottom: "32px"
          }}>
            <div style={{
              width: "8px",
              height: "8px",
              background: "#0F6E56",
              borderRadius: "50%",
              animation: "pulse 2s infinite"
            }} />
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: "12px",
              color: "#1A3A6B",
              letterSpacing: "0.08em",
              textTransform: "uppercase"
            }}>
              Portal Launching Q3 2026
            </span>
          </div>

          {/* SECTION 2 - HEADLINE */}
          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(40px, 6vw, 72px)",
            color: "#111",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            marginBottom: "20px"
          }}>
            <div style={{ display: "block" }}>Universal Access</div>
            <div style={{ display: "block", color: "#1A3A6B" }}>&amp; Service Fund</div>
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: "17px",
            color: "#6b7280",
            lineHeight: 1.7,
            maxWidth: "480px",
            margin: "0 auto 48px"
          }}>
            The UASF Portal will give citizens, schools, and communities direct access to Botswana's digital inclusion fund.
          </p>

          {/* SECTION 3 - THE IMAGE */}
          <img 
            src="/Gemini_Generated_Image_qh7lliqh7lliqh7l.png"
            alt="UASF Portal Concept"
            style={{
              width: "100%",
              maxWidth: "680px",
              height: "320px",
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "20px",
              margin: "0 auto 48px",
              display: "block"
            }}
          />

          {/* SECTION 4 - NOTIFY FORM */}
          <div style={{
            margin: "0 auto",
            maxWidth: "480px"
          }}>
            {submitted ? (
              <div>
                <CheckCircle 
                  size={32} 
                  color="#0F6E56" 
                  style={{ display: "inline-block", marginBottom: "12px" }} 
                />
                <h3 style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "20px",
                  color: "#111",
                  margin: "0 0 6px 0"
                }}>
                  You're on the list!
                </h3>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  color: "#6b7280",
                  margin: 0
                }}>
                  We'll email you when the UASF portal launches.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: "13px",
                  color: "#374151",
                  marginBottom: "12px",
                  textAlign: "left"
                }}>
                  Get notified when we launch:
                </div>
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px"
                }}>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    style={{
                      flex: 1,
                      minWidth: "160px",
                      border: "1.5px solid #e5e7eb",
                      borderRadius: "8px",
                      padding: "12px 16px",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                      color: "#111",
                      outline: "none"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#1A3A6B"}
                    onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    style={{
                      flex: 2,
                      minWidth: "200px",
                      border: "1.5px solid #e5e7eb",
                      borderRadius: "8px",
                      padding: "12px 16px",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: "14px",
                      color: "#111",
                      outline: "none"
                    }}
                    onFocus={(e) => e.target.style.borderColor = "#1A3A6B"}
                    onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    background: "#1A3A6B",
                    color: "white",
                    borderRadius: "8px",
                    padding: "13px",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                    width: "100%",
                    border: "none",
                    cursor: "pointer",
                    marginTop: "10px",
                    transition: "opacity 0.2s"
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = "0.88"}
                  onMouseLeave={(e) => e.target.style.opacity = "1"}
                >
                  Notify Me When Live &rarr;
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
