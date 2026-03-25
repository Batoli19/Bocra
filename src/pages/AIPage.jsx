import { useState } from "react";
import PageWrapper from "../components/shared/PageWrapper";

const STARTER_PROMPTS = [
  "What services do you offer?",
  "How do I file a complaint?",
  "What documents do I need for a licence?",
  "Where are BOCRA offices?",
];

const LANGUAGES = ["English", "Setswana"];

export default function AIPage() {
  const [language, setLanguage] = useState("English");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! I’m your BOCRA Copilot. How can I help today?",
      subtext: "Ask about licensing, complaints, SIM registration, or scams.",
      sources: ["BOCRA website"],
    },
  ]);

  const pushMessage = (msg) => setMessages((m) => [...m, msg]);

  const handleSend = (text) => {
    const content = (text || input).trim();
    if (!content) return;
    pushMessage({ from: "user", text: content });
    setInput("");
    pushMessage({
      from: "bot",
      text: "Thanks — I’m pulling that information for you now.",
      subtext: "Source: BOCRA website",
      sources: ["BOCRA website"],
    });
  };

  return (
    <PageWrapper>
      <div
        style={{
          minHeight: "100vh",
          background:
            "radial-gradient(1200px 600px at 10% -10%, rgba(14,165,233,0.2), transparent), radial-gradient(900px 500px at 100% 0%, rgba(99,102,241,0.18), transparent), #0b0e14",
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
              alignItems: "start",
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
                BOCRA Copilot
              </div>
              <h1
                style={{
                  fontSize: "clamp(32px, 5vw, 52px)",
                  margin: "18px 0 12px",
                  fontWeight: 700,
                }}
              >
                A full‑page assistant for BOCRA.
              </h1>
              <p
                style={{
                  fontSize: 16,
                  color: "rgba(226,232,240,0.75)",
                  lineHeight: 1.6,
                }}
              >
                The Copilot provides guided answers, next steps, and trusted
                sources. Use it to navigate BOCRA services quickly and
                confidently.
              </p>

              <div style={{ marginTop: 22 }}>
                <div style={{ fontSize: 12, color: "rgba(226,232,240,0.6)" }}>
                  Language
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      style={{
                        border: "1px solid rgba(148,163,184,0.3)",
                        borderRadius: 999,
                        padding: "6px 12px",
                        fontSize: 12,
                        background:
                          language === lang
                            ? "rgba(14,165,233,0.25)"
                            : "rgba(255,255,255,0.06)",
                        color: "#f8fafc",
                        cursor: "pointer",
                      }}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 22 }}>
                <div style={{ fontSize: 12, color: "rgba(226,232,240,0.6)" }}>
                  Try a quick prompt
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
                  {STARTER_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleSend(prompt)}
                      style={{
                        border: "1px solid rgba(148,163,184,0.25)",
                        borderRadius: 999,
                        padding: "6px 12px",
                        fontSize: 12,
                        background: "rgba(255,255,255,0.06)",
                        color: "#f8fafc",
                        cursor: "pointer",
                      }}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div
              style={{
                background: "rgba(15, 23, 42, 0.7)",
                borderRadius: 24,
                padding: 24,
                border: "1px solid rgba(148,163,184,0.18)",
                boxShadow: "0 20px 60px rgba(15,23,42,0.4)",
                display: "flex",
                flexDirection: "column",
                minHeight: 520,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 14,
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 600 }}>Conversation</div>
                <div style={{ fontSize: 12, color: "rgba(226,232,240,0.6)" }}>
                  Mode: {language}
                </div>
              </div>
              <div style={{ display: "grid", gap: 12, flex: 1, overflowY: "auto" }}>
                {messages.map((msg, idx) => (
                  <div
                    key={`${msg.from}-${idx}`}
                    style={{
                      alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
                      maxWidth: "80%",
                      background:
                        msg.from === "user"
                          ? "rgba(14,165,233,0.3)"
                          : "rgba(255,255,255,0.06)",
                      borderRadius: 16,
                      padding: "10px 12px",
                      border: "1px solid rgba(148,163,184,0.15)",
                    }}
                  >
                    <div style={{ fontSize: 13, color: "#f8fafc" }}>{msg.text}</div>
                    {msg.subtext && (
                      <div style={{ fontSize: 11, color: "rgba(226,232,240,0.6)", marginTop: 6 }}>
                        {msg.subtext}
                      </div>
                    )}
                    {msg.sources && (
                      <div style={{ fontSize: 10, color: "rgba(226,232,240,0.45)", marginTop: 6 }}>
                        Source: {msg.sources.join(", ")}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div
                style={{
                  marginTop: 14,
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask BOCRA Copilot..."
                  style={{
                    flex: 1,
                    border: "1px solid rgba(148,163,184,0.3)",
                    borderRadius: 999,
                    padding: "10px 14px",
                    background: "rgba(2,6,23,0.7)",
                    color: "#f8fafc",
                    fontSize: 13,
                    outline: "none",
                  }}
                />
                <button
                  onClick={() => handleSend()}
                  style={{
                    background: "linear-gradient(135deg, #0ea5e9, #2563eb)",
                    padding: "10px 16px",
                    borderRadius: 999,
                    color: "white",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
