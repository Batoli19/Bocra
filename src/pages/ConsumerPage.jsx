import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DollarSign,
  Wifi,
  WifiOff,
  MapPin,
  Shield,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import PageWrapper from "../components/shared/PageWrapper";
import { useAuth } from "../hooks/useAuth";

const issueOptions = [
  {
    id: "billing",
    title: "My bill was wrong",
    icon: DollarSign,
    right:
      "Under Section 42 of the CRA Act 2012, you have the right to accurate billing and transparent charges.",
    action:
      "BOCRA can investigate your billing complaint and compel {provider} to correct disputed charges or explain them within 30 days.",
  },
  {
    id: "internet",
    title: "My internet is slow or keeps dropping",
    icon: Wifi,
    right:
      "Under the CRA Act 2012, you have the right to service quality that reasonably matches what was advertised to you.",
    action:
      "BOCRA can assess service quality records and require {provider} to fix persistent performance failures within 30 days.",
  },
  {
    id: "disconnect",
    title: "I was disconnected unfairly",
    icon: WifiOff,
    right:
      "Under the CRA Act 2012, you have the right to fair notice and due process before service is suspended or disconnected.",
    action:
      "BOCRA can review whether {provider} followed proper procedure and direct reconnection or a corrective remedy where appropriate.",
  },
  {
    id: "coverage",
    title: "I can't get signal in my area",
    icon: MapPin,
    right:
      "Under the CRA Act 2012, you have the right to clear, truthful coverage information and fair consideration of service accessibility concerns.",
    action:
      "BOCRA can review coverage obligations, investigate the service claim, and require {provider} to provide a formal resolution path.",
  },
  {
    id: "privacy",
    title: "My privacy was violated",
    icon: Shield,
    right:
      "Under the CRA Act 2012, you have the right to confidentiality of your communications data and protection from unauthorized disclosure.",
    action:
      "BOCRA can investigate the privacy breach and compel {provider} to account for what happened and implement corrective action.",
  },
  {
    id: "unfair",
    title: "I was treated unfairly by my provider",
    icon: AlertCircle,
    right:
      "Under the CRA Act 2012, you have the right to fair treatment, non-discriminatory service, and accessible complaint handling.",
    action:
      "BOCRA can review how {provider} handled your case and order a proper consumer resolution if standards were not followed.",
  },
];

const providers = ["Mascom", "Orange Botswana", "BeMobile", "BTC"];

const providerReportCards = [
  { name: "Mascom", grade: "A", color: "#0F6E56", speed: "32.1 Mbps", uptime: "98.9%", complaints: "12" },
  { name: "Orange Botswana", grade: "B+", color: "#1A3A6B", speed: "29.5 Mbps", uptime: "98.4%", complaints: "18" },
  { name: "BeMobile", grade: "B", color: "#1A3A6B", speed: "24.8 Mbps", uptime: "97.6%", complaints: "24" },
  { name: "BTC", grade: "A+", color: "#0F6E56", speed: "95.2 Mbps", uptime: "99.5%", complaints: "4" },
];

const complaintSteps = [
  { number: "01", title: "Contact your provider first", description: "Give them a fair chance to fix the issue directly and keep their response." },
  { number: "02", title: "Gather your evidence", description: "Save receipts, screenshots, messages, reference numbers, and timelines." },
  { number: "03", title: "File with BOCRA", description: "Submit your complaint online with the details and documents you collected." },
  { number: "04", title: "We investigate and resolve", description: "BOCRA reviews the complaint and pushes for a formal outcome." },
];

const checklistItems = [
  "Contract duration and exit penalties",
  "Data speeds advertised vs guaranteed",
  "Fair usage policy limits",
  "Billing cycle and payment methods",
  "Service coverage in your area",
  "Complaint resolution process",
  "Data privacy policy",
  "Price change notification period",
];

function SectionLabel({ children, centered = false }) {
  return (
    <div
      style={{
        fontSize: 12,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "#7b8794",
        fontWeight: 700,
        marginBottom: 18,
        textAlign: centered ? "center" : "left",
      }}
    >
      {children}
    </div>
  );
}

function Shell({ children, style }) {
  return (
    <div
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "0 32px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function ConsumerPage() {
  const navigate = useNavigate();
  const { requireAuth } = useAuth();
  const [step, setStep] = useState(1);
  const [issue, setIssue] = useState(null);
  const [provider, setProvider] = useState("");
  const [contacted, setContacted] = useState("");
  const [checked, setChecked] = useState([]);

  const selectedIssue = issueOptions.find((item) => item.id === issue);
  const checkerStepLabel = step === "result" ? "Result" : `Step ${step} of 3`;
  const activeProgress = step === "result" ? 3 : step;

  const toggleChecklistItem = (item) => {
    setChecked((current) =>
      current.includes(item) ? current.filter((entry) => entry !== item) : [...current, item]
    );
  };

  const resetChecker = () => {
    setStep(1);
    setIssue(null);
    setProvider("");
    setContacted("");
  };

  const scrollToChecker = () => {
    document.getElementById("consumer-rights-checker")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <PageWrapper fullWidth wrapperStyle={{ background: "#ffffff" }}>
      <div
        style={{
          background: "#ffffff",
          color: "#0f172a",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "128px 0",
            background: "#0a1628",
          }}
        >
          <img
            src="/hero-consumer-optimized.jpg"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(5, 8, 22, 0.58) 0%, rgba(5, 8, 22, 0.34) 38%, rgba(5, 8, 22, 0.74) 100%)" }} />
          <Shell style={{ position: "relative", zIndex: 1 }}>
            <div className="consumer-hero-grid">
              <div>
                <div
                  style={{
                    fontSize: 12,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.76)",
                    fontWeight: 700,
                    marginBottom: 18,
                    textAlign: "left",
                  }}
                >
                  Consumer Protection
                </div>
                <h1
                  style={{
                    margin: 0,
                    fontSize: "clamp(2.8rem, 6vw, 4.3rem)",
                    lineHeight: 1.02,
                    letterSpacing: "-0.05em",
                    color: "#ffffff",
                    maxWidth: 760,
                    fontWeight: 700,
                  }}
                >
                  Your rights as a communications consumer in Botswana are protected by law.
                </h1>
                <p
                  style={{
                    margin: "28px 0 0",
                    maxWidth: 680,
                    fontSize: 20,
                    lineHeight: 1.7,
                    color: "rgba(255,255,255,0.82)",
                  }}
                >
                  BOCRA enforces the CRA Act 2012 so every Motswana receives fair, quality
                  communications services.
                </p>
                <div className="consumer-button-row" style={{ marginTop: 34 }}>
                  <button
                    type="button"
                    onClick={() => requireAuth("/portal/complaint/new")}
                    className="consumer-primary-button"
                  >
                    <span>File a Complaint</span>
                    <ArrowRight size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={scrollToChecker}
                    className="consumer-ghost-button"
                  >
                    <span>Check My Rights</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              <div className="consumer-hero-right">
                <div className="consumer-stat-chip consumer-stat-chip-one">
                  <div className="consumer-stat-value">1,423</div>
                  <div className="consumer-stat-label">Complaints Resolved</div>
                </div>
                <div className="consumer-stat-chip consumer-stat-chip-two">
                  <div className="consumer-stat-value">98%</div>
                  <div className="consumer-stat-label">Resolution Rate</div>
                </div>
                <div className="consumer-stat-chip consumer-stat-chip-three">
                  <div className="consumer-stat-value">48hrs</div>
                  <div className="consumer-stat-label">Avg Response</div>
                </div>
              </div>
            </div>
          </Shell>
        </section>

        <section
          id="consumer-rights-checker"
          style={{ padding: "80px 0", background: "#f8f9fa" }}
        >
          <Shell style={{ textAlign: "center" }}>
            <SectionLabel centered>Know Your Rights</SectionLabel>
            <div
              style={{
                color: "#7b8794",
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                marginBottom: 18,
              }}
            >
              {checkerStepLabel}
            </div>
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(2rem, 5vw, 3.3rem)",
                letterSpacing: "-0.04em",
                color: "#111827",
                fontWeight: 700,
              }}
            >
              What happened to you?
            </h2>

            <div className="consumer-progress-dots" aria-hidden="true">
              {[1, 2, 3].map((item) => (
                <span
                  key={item}
                  className="consumer-progress-dot"
                  style={{
                    background: item <= activeProgress ? "#1A3A6B" : "#d7dde5",
                    transform: item === activeProgress ? "scale(1.15)" : "scale(1)",
                  }}
                />
              ))}
            </div>

            <div style={{ marginTop: 34 }}>
              {step === 1 && (
                <div className="consumer-checker-grid">
                  {issueOptions.map(({ id, title, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      className="consumer-choice-tile"
                      onClick={() => {
                        setIssue(id);
                        setStep(2);
                      }}
                    >
                      <Icon size={24} color="#1A3A6B" />
                      <span>{title}</span>
                    </button>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="consumer-step-question">Who is your provider?</div>
                  <div className="consumer-provider-grid">
                    {providers.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className="consumer-choice-tile"
                        onClick={() => {
                          setProvider(item);
                          setStep(3);
                        }}
                      >
                        <span>{item}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <div className="consumer-step-question">Did you contact them first?</div>
                  <div className="consumer-contact-grid">
                    <button
                      type="button"
                      className="consumer-choice-tile"
                      onClick={() => {
                        setContacted("yes");
                        setStep("result");
                      }}
                    >
                      <span>Yes, they didn&apos;t help me</span>
                    </button>
                    <button
                      type="button"
                      className="consumer-choice-tile"
                      onClick={() => {
                        setContacted("no");
                        setStep("result");
                      }}
                    >
                      <span>No, I haven&apos;t yet</span>
                    </button>
                  </div>
                </div>
              )}

              {step === "result" && selectedIssue && (
                <div className="consumer-result-card">
                  <CheckCircle size={42} color="#0F6E56" />
                  <h3
                    style={{
                      margin: "20px 0 12px",
                      fontSize: "clamp(1.7rem, 3vw, 2.3rem)",
                      color: "#111827",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    Here&apos;s what you can do
                  </h3>
                  <p className="consumer-result-copy">
                    <strong>Your right:</strong> {selectedIssue.right}
                  </p>
                  <p className="consumer-result-copy">
                    <strong>What BOCRA can do:</strong>{" "}
                    {selectedIssue.action.replace("{provider}", provider)}
                  </p>

                  {contacted === "no" && (
                    <div className="consumer-warning-callout">
                      Contact {provider} first. BOCRA requires you try to resolve directly before
                      escalating.
                    </div>
                  )}

                  <div
                    className="consumer-button-row"
                    style={{ justifyContent: "center", marginTop: 28 }}
                  >
                    <button
                      type="button"
                      onClick={() => requireAuth("/portal/complaint/new")}
                      className="consumer-primary-button"
                    >
                      <span>File This Complaint Now</span>
                      <ArrowRight size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={resetChecker}
                      className="consumer-text-button"
                    >
                      Start over
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Shell>
        </section>

        <section style={{ padding: "80px 0", background: "#ffffff" }}>
          <Shell>
            <SectionLabel>How Is Your Provider Performing?</SectionLabel>
            <div className="consumer-section-head">
              <h2 className="consumer-section-title">ISP Report Card</h2>
              <p className="consumer-section-copy">
                Live performance data from BOCRA&apos;s quality monitoring system.
              </p>
            </div>
            <div className="consumer-report-grid">
              {providerReportCards.map(({ name, grade, color, speed, uptime, complaints }) => (
                <div key={name} className="consumer-report-card">
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#111827",
                      marginBottom: 18,
                    }}
                  >
                    {name}
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(2.6rem, 4vw, 3.4rem)",
                      fontWeight: 700,
                      lineHeight: 1,
                      color,
                      marginBottom: 20,
                    }}
                  >
                    {grade}
                  </div>
                  <div className="consumer-metric-row">
                    <span>Avg Speed:</span>
                    <strong>{speed}</strong>
                  </div>
                  <div className="consumer-metric-row">
                    <span>Uptime:</span>
                    <strong>{uptime}</strong>
                  </div>
                  <div className="consumer-metric-row">
                    <span>Complaints per 1000 users:</span>
                    <strong>{complaints}</strong>
                  </div>
                  <Link to="/qos" className="consumer-inline-link">
                    View full report <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </Shell>
        </section>

        <section style={{ padding: "80px 0", background: "#ffffff" }}>
          <Shell>
            <SectionLabel>The Process</SectionLabel>
            <div className="consumer-section-head">
              <h2 className="consumer-section-title">How complaints work</h2>
            </div>
            <div className="consumer-process-grid">
              {complaintSteps.map(({ number, title, description }) => (
                <div key={number} className="consumer-process-item">
                  <div className="consumer-process-number">{number}</div>
                  <div className="consumer-process-title">{title}</div>
                  <div className="consumer-process-copy">{description}</div>
                </div>
              ))}
            </div>
          </Shell>
        </section>

        <section style={{ padding: "80px 0", background: "#f8f9fa" }}>
          <Shell>
            <SectionLabel>Contract Checklist</SectionLabel>
            <div className="consumer-section-head">
              <h2 className="consumer-section-title">
                What to check before signing with any provider.
              </h2>
              <p className="consumer-section-copy">Use this checklist every time.</p>
            </div>
            <div className="consumer-checklist-grid">
              {checklistItems.map((item) => {
                const isChecked = checked.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleChecklistItem(item)}
                    className="consumer-checklist-item"
                    style={{
                      background: isChecked ? "rgba(15,110,86,0.08)" : "#ffffff",
                    }}
                  >
                    <span
                      className="consumer-check-icon"
                      style={{
                        background: isChecked ? "#0F6E56" : "#e5e7eb",
                      }}
                    >
                      {isChecked && <CheckCircle size={14} color="#ffffff" />}
                    </span>
                    <span>{item}</span>
                  </button>
                );
              })}
            </div>
            <div style={{ marginTop: 28 }}>
              <div className="consumer-checklist-progress-meta">{checked.length}/8 items reviewed</div>
              <div className="consumer-checklist-progress-track">
                <div
                  className="consumer-checklist-progress-fill"
                  style={{ width: `${(checked.length / checklistItems.length) * 100}%` }}
                />
              </div>
              {checked.length === checklistItems.length && (
                <div className="consumer-checklist-success">
                  You&apos;re informed! File a complaint if any of these were misrepresented.
                </div>
              )}
            </div>
          </Shell>
        </section>

        <section style={{ padding: "64px 0", background: "#ffffff" }}>
          <Shell>
            <div className="consumer-action-strip">
              <button 
                onClick={() => requireAuth("/portal/complaint/new")} 
                className="consumer-action-row"
                style={{ background: 'none', border: 'none', width: '100%', cursor: 'pointer', textAlign: 'left', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <span>File a Complaint</span>
                <ChevronRight size={18} />
              </button>
              <button 
                onClick={() => requireAuth("/portal/complaints")} 
                className="consumer-action-row"
                style={{ background: 'none', border: 'none', width: '100%', cursor: 'pointer', textAlign: 'left', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <span>Track My Complaint</span>
                <ChevronRight size={18} />
              </button>
              <Link to="/contact" className="consumer-action-row">
                <span>Contact BOCRA</span>
                <ChevronRight size={18} />
              </Link>
            </div>
          </Shell>
        </section>
      </div>

      <style>{`
        .consumer-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.5fr) minmax(320px, 1fr);
          gap: 56px;
          align-items: center;
        }

        .consumer-button-row {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          align-items: center;
        }

        .consumer-primary-button,
        .consumer-ghost-button,
        .consumer-text-button {
          border: none;
          background: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
        }

        .consumer-primary-button,
        .consumer-ghost-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 22px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.01em;
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
        }

        .consumer-primary-button {
          color: #ffffff;
          background: #111111;
          box-shadow: 0 14px 30px rgba(17, 17, 17, 0.14);
        }

        .consumer-ghost-button {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .consumer-primary-button:hover,
        .consumer-ghost-button:hover,
        .consumer-choice-tile:hover,
        .consumer-action-row:hover,
        .consumer-checklist-item:hover,
        .consumer-inline-link:hover {
          transform: translateY(-2px);
        }

        .consumer-hero-right {
          position: relative;
          min-height: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .consumer-hero-artwork {
          width: 100%;
        }

        .consumer-stat-chip {
          position: absolute;
          background: rgba(255, 255, 255, 0.92);
          padding: 20px 22px;
          border-radius: 20px;
          box-shadow: 0 22px 50px rgba(26, 58, 107, 0.12);
          min-width: 190px;
        }

        .consumer-stat-chip-one {
          top: 18%;
          left: 0;
        }

        .consumer-stat-chip-two {
          top: 8%;
          right: 6%;
        }

        .consumer-stat-chip-three {
          bottom: 12%;
          left: 18%;
        }

        .consumer-stat-value {
          font-size: 2rem;
          line-height: 1;
          font-weight: 700;
          letter-spacing: -0.05em;
          color: #1A3A6B;
          margin-bottom: 8px;
        }

        .consumer-stat-label {
          color: #6b7280;
          font-size: 14px;
          line-height: 1.5;
        }

        .consumer-progress-dots {
          margin-top: 22px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        .consumer-progress-dot {
          width: 12px;
          height: 12px;
          border-radius: 999px;
          transition: all 0.2s ease;
        }

        .consumer-checker-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .consumer-provider-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }

        .consumer-contact-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          max-width: 820px;
          margin: 0 auto;
        }

        .consumer-choice-tile {
          width: 100%;
          min-height: 150px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          gap: 16px;
          text-align: left;
          background: #ffffff;
          border: 2px solid #e5e7eb;
          border-radius: 16px;
          padding: 24px;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: #111827;
          transition: border-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
        }

        .consumer-choice-tile:hover {
          border-color: #1A3A6B;
          box-shadow: 0 20px 40px rgba(26, 58, 107, 0.08);
        }

        .consumer-step-question {
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          color: #111827;
          margin-bottom: 24px;
        }

        .consumer-result-card {
          max-width: 600px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
        }

        .consumer-result-copy {
          margin: 0 0 14px;
          color: #4b5563;
          font-size: 16px;
          line-height: 1.8;
          text-align: left;
        }

        .consumer-warning-callout {
          margin-top: 18px;
          background: #fff4cc;
          color: #8a6500;
          border-radius: 14px;
          padding: 16px 18px;
          text-align: left;
          line-height: 1.6;
          font-weight: 500;
        }

        .consumer-text-button {
          color: #1A3A6B;
          font-size: 15px;
          font-weight: 700;
          padding: 10px 0;
        }

        .consumer-section-head {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
          gap: 32px;
          align-items: end;
          margin-bottom: 34px;
        }

        .consumer-section-title {
          margin: 0;
          font-size: clamp(2rem, 4vw, 3rem);
          line-height: 1.02;
          letter-spacing: -0.04em;
          color: #111827;
        }

        .consumer-section-copy {
          margin: 0;
          color: #6b7280;
          font-size: 16px;
          line-height: 1.8;
        }

        .consumer-report-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .consumer-report-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 24px;
        }

        .consumer-metric-row {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          font-size: 14px;
          color: #6b7280;
          padding: 8px 0;
        }

        .consumer-metric-row strong {
          color: #111827;
          font-weight: 700;
        }

        .consumer-inline-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 18px;
          text-decoration: none;
          color: #1A3A6B;
          font-size: 14px;
          font-weight: 700;
          transition: transform 0.18s ease;
        }

        .consumer-process-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 26px;
        }

        .consumer-process-item {
          position: relative;
          min-height: 220px;
          padding-top: 34px;
        }

        .consumer-process-number {
          position: absolute;
          top: 0;
          left: 0;
          font-size: clamp(4rem, 8vw, 5.4rem);
          line-height: 0.9;
          font-weight: 700;
          letter-spacing: -0.08em;
          color: rgba(26, 58, 107, 0.08);
          pointer-events: none;
        }

        .consumer-process-title {
          position: relative;
          z-index: 1;
          margin-top: 42px;
          margin-bottom: 12px;
          color: #111827;
          font-size: 1.12rem;
          font-weight: 700;
        }

        .consumer-process-copy {
          position: relative;
          z-index: 1;
          color: #6b7280;
          line-height: 1.8;
        }

        .consumer-checklist-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .consumer-checklist-item {
          display: flex;
          align-items: center;
          gap: 16px;
          width: 100%;
          padding: 20px 22px;
          border: none;
          border-radius: 18px;
          cursor: pointer;
          text-align: left;
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          color: #111827;
          box-shadow: 0 14px 32px rgba(15, 23, 42, 0.06);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }

        .consumer-check-icon {
          width: 28px;
          height: 28px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .consumer-checklist-progress-meta {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 10px;
        }

        .consumer-checklist-progress-track {
          height: 10px;
          background: #e5e7eb;
          border-radius: 999px;
          overflow: hidden;
        }

        .consumer-checklist-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #0F6E56 0%, #1A3A6B 100%);
          border-radius: 999px;
        }

        .consumer-checklist-success {
          margin-top: 14px;
          color: #0F6E56;
          font-weight: 700;
        }

        .consumer-action-strip {
          border-top: 1px solid #e5e7eb;
          border-bottom: 1px solid #e5e7eb;
        }

        .consumer-action-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 26px 0;
          text-decoration: none;
          color: #111827;
          font-size: clamp(1.25rem, 2vw, 1.65rem);
          font-weight: 700;
          transition: transform 0.18s ease;
        }

        .consumer-action-row + .consumer-action-row {
          border-top: 1px solid #e5e7eb;
        }

        @media (max-width: 1100px) {
          .consumer-hero-grid,
          .consumer-section-head {
            grid-template-columns: 1fr 1fr;
          }

          .consumer-provider-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (min-width: 900px) {
          .consumer-checker-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .consumer-report-grid,
          .consumer-process-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }

        @media (max-width: 760px) {
          .consumer-hero-grid,
          .consumer-section-head,
          .consumer-checklist-grid,
          .consumer-process-grid,
          .consumer-report-grid,
          .consumer-contact-grid,
          .consumer-checker-grid,
          .consumer-provider-grid {
            grid-template-columns: 1fr;
          }

          .consumer-hero-right {
            min-height: 360px;
            display: block;
          }

          .consumer-stat-chip {
            position: relative;
            top: auto;
            left: auto;
            right: auto;
            bottom: auto;
            margin-bottom: 14px;
            width: 100%;
          }

          .consumer-hero-artwork {
            margin-bottom: 24px;
          }

          .consumer-choice-tile,
          .consumer-checklist-item {
            min-height: auto;
          }
        }

        @media (max-width: 640px) {
          .consumer-result-card {
            padding: 24px;
          }

          .consumer-button-row {
            align-items: stretch;
          }

          .consumer-primary-button,
          .consumer-ghost-button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </PageWrapper>
  );
}
