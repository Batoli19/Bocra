import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import bocraSvg from "../assets/bocra.svg";
import { QUICK_ACTIONS } from "./intentData";
import { matchIntent } from "./intentRouter";
import { matchKb } from "./kbRouter";
import { KB_ENTRIES } from "./kbData";
import licenceTypes from "../data/licenceTypes.json";

export default function ChatBubble({ showHint = false, expanded = false, forceOpen = expanded, onClose }) {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(true);
  const messagesEndRef = useRef(null);
  const [context, setContext] = useState({ topic: null, pendingAction: null });
  const [licenceWizard, setLicenceWizard] = useState({
    active: false,
    step: 0,
    category: null,
  });
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi there! I’m your BOCRA help desk assistant. How can I help today?",
      followUp:
        "BOCRA helps keep communications fair and in order. Ask me about licensing, complaints, SIM registration, or scams.",
      options: ["Licensing", "Complaints", "SIM registration", "Contact BOCRA"],
    },
  ]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [chipMode, setChipMode] = useState(null);
  const FAQ_QUESTIONS = [
    "What services do you offer?",
    "Where are BOCRA offices?",
    "How do I file a complaint?",
    "How do I register a SIM card?",
  ];

  const apiUrl = "";
  const aiEnabled = false;
  const contactSources = ["https://www.bocra.org.bw/bocra-contact-details"];

  const formatSource = (url) => {
    if (!url) return "BOCRA website";
    if (url.includes("bocra.org.bw")) return "BOCRA website";
    if (url.includes("customerportal.bocra.org.bw"))
      return "BOCRA customer portal";
    if (url.includes("typeapproval.bocra.org.bw"))
      return "BOCRA type approval portal";
    return "BOCRA source";
  };

  useEffect(() => {
    const t = setTimeout(() => setTyping(false), 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!aiEnabled) setError("");
  }, [aiEnabled]);

  useEffect(() => {
    setOpen(forceOpen);
  }, [forceOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (open || expanded) {
      setTimeout(scrollToBottom, 50);
    }
  }, [messages, typing, open, expanded]);

  const pushBot = (text, action) => {
    setMessages((m) => [...m, { from: "bot", text, action }]);
  };

  const pushBotRich = ({ text, action, sources, followUp, sections, examples, extras }) => {
    setMessages((m) => [
      ...m,
      { from: "bot", text, action, sources, followUp, sections, examples, extras },
    ]);
  };

  const withReceptionTone = (text) => {
    if (!text) return text;
    const prefixes = ["Got it.", "Happy to help.", "Certainly.", "Thanks for checking."];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    return `${prefix} ${text}`;
  };

  const pushBotOptions = ({ text, options }) => {
    setMessages((m) => [
      ...m,
      { from: "bot", text, options },
    ]);
  };

  const pushUser = (text) => {
    setMessages((m) => [...m, { from: "user", text }]);
  };

  const isYes = (text) =>
    /^(yes|yep|yeah|ok|okay|correct|sure)$/i.test(text.trim());
  const isNo = (text) => /^(no|nope|not really)$/i.test(text.trim());
  const isGreeting = (text) =>
    /(hello|hi|hey|dumela)/i.test(text.trim());
  const isInfoRequest = (text) =>
    /(documents|requirements|fees|cost|price|penalty|fine|timeline|process|steps)/i.test(
      text.trim()
    );
  const isInternalHref = (href) => typeof href === "string" && href.startsWith("/");
  const isNavigationRequest = (text) =>
    /(take me to|open|go to|navigate|show me|visit|bring me)/i.test(text.trim());
  const isThereRequest = (text) =>
    /(there|open it|take me there|go there|that page)/i.test(text.trim());
  const isLicenceQuery = (text) =>
    /(licen[cs]e|licensing|permit|register)/i.test(text.trim());
  const isLicenceFinderRequest = (text) =>
    /(find my licence|find my license|which licence|which license|recommend.*licen|need.*licen|start.*station|start.*radio|isp|postal operator|mvno)/i.test(
      text.trim()
    );

  const isVague = (text) =>
    /^(help|assist|support|question|info|information|hey|hi|hello)$/i.test(
      text.trim()
    ) || text.trim().length <= 4;

  const isUpset = (text) =>
    /(angry|frustrated|upset|annoyed|terrible|bad service|disappointed|not happy|complain|hate|rude)/i.test(
      text.trim()
    );

  const politeCloser = (text) =>
    `${text}\n\nIs there anything else I can do for you today?`;

  const detectProvider = (text) => {
    const t = text.toLowerCase();
    if (t.includes("mascom")) return "Mascom";
    if (t.includes("orange")) return "Orange";
    if (t.includes("btc") || t.includes("botswana telecommunications")) return "BTC";
    return null;
  };

  const detectComplaintType = (text) => {
    const t = text.toLowerCase();
    if (/(scam|fraud|phishing|sim swap|spam|suspicious)/.test(t)) return "scam";
    if (/(overcharged|billing|charged|invoice|refund|fee)/.test(t)) return "billing";
    if (/(slow|no service|down|outage|dropped|network|coverage)/.test(t)) return "network";
    return "general";
  };

  const complaintChecklist = (type) => {
    if (type === "scam") {
      return [
        "Screenshot the suspicious message or call details.",
        "Note the sender number, time, and platform used.",
        "Do not share PINs or OTPs with anyone.",
        "Report to your provider and BOCRA.",
      ];
    }
    if (type === "billing") {
      return [
        "Have your account number or phone number ready.",
        "Keep recent invoices or transaction records.",
        "Note dates and amounts in dispute.",
        "Describe the expected resolution (refund, adjustment).",
      ];
    }
    if (type === "network") {
      return [
        "Record dates, times, and locations of the issue.",
        "Note the provider and service type (voice/data).",
        "Capture screenshots or speed tests if possible.",
        "List any reference number from the provider.",
      ];
    }
    return [
      "Describe the issue clearly in one or two sentences.",
      "Include dates, times, and the provider name.",
      "Attach any reference number or proof (if available).",
      "State the resolution you want.",
    ];
  };

  const buildComplaintDraft = ({ issue, provider }) => {
    const safeProvider = provider || "[Provider name]";
    const issueLine = issue || "[Describe the issue]";
    return [
      "Complaint Draft",
      `Provider: ${safeProvider}`,
      `Issue: ${issueLine}`,
      "Date(s): [Add dates/times]",
      "Account/Number: [Add phone or account number]",
      "Details: [Brief description + evidence]",
      "Desired resolution: [Refund / Restore service / Investigate]",
    ].join("\n");
  };

  const categoryMap = {
    postal: "Postal",
    internet: "Internet",
    isp: "Internet",
    broadcasting: "Broadcasting",
    radio: "Broadcasting",
    telecoms: "Telecoms",
    telecom: "Telecoms",
    mvno: "Telecoms",
  };

  const detectCategory = (text) => {
    const t = text.toLowerCase();
    for (const key of Object.keys(categoryMap)) {
      if (t.includes(key)) return categoryMap[key];
    }
    return null;
  };

  const formatFee = (fee) => {
    if (fee == null) return "Not listed";
    return `P${Number(fee).toLocaleString("en-BW")}`;
  };

  const findLicence = (text) => {
    const t = text.toLowerCase();
    const aliasMap = {
      "isp": "Internet Service Provider",
      "internet service provider": "Internet Service Provider",
      "radio license": "Broadcasting Licence FM Radio",
      "radio licence": "Broadcasting Licence FM Radio",
      "fm radio": "Broadcasting Licence FM Radio",
      "broadcasting licence": "Broadcasting Licence FM Radio",
      "postal operator": "Class A Postal Operator",
      "postal licence": "Class A Postal Operator",
      "postal license": "Class A Postal Operator",
      "mvno": "Mobile Virtual Network Operator",
      "virtual network operator": "Mobile Virtual Network Operator",
    };
    for (const alias of Object.keys(aliasMap)) {
      if (t.includes(alias)) {
        const name = aliasMap[alias].toLowerCase();
        const exact = licenceTypes.find(
          (l) => String(l.name || "").toLowerCase() === name
        );
        if (exact) return exact;
      }
    }
    let best = null;
    for (const lic of licenceTypes) {
      const name = String(lic.name || "").toLowerCase();
      if (!name) continue;
      if (t.includes(name)) return lic;
      const tokens = name.split(/\s+/).filter(Boolean);
      const hits = tokens.filter((tk) => t.includes(tk)).length;
      if (hits >= 2 && (!best || hits > best.hits)) {
        best = { lic, hits };
      }
    }
    return best ? best.lic : null;
  };

  const startLicenceWizard = () => {
    setLicenceWizard({ active: true, step: 1, category: null });
    pushBotRich({
      text: "Let’s find the right licence for you.",
      sections: {
        overview: "Choose your service type to get a recommendation.",
        steps: [
          "Postal",
          "Internet (ISP)",
          "Broadcasting (FM Radio)",
          "Telecoms (MVNO)",
        ],
        next_action: "Tell me the service type or tap a button below.",
      },
    });
  };

  const finishLicenceWizard = (category) => {
    const matches = licenceTypes.filter(
      (l) => String(l.category).toLowerCase() === String(category).toLowerCase()
    );
    if (matches.length === 0) {
      pushBotRich({
        text: "I could not find a licence for that category.",
        followUp: "Try Postal, Internet, Broadcasting, or Telecoms.",
      });
      return;
    }
    const lic = matches[0];
    const steps = [
      `Category: ${lic.category || "Not listed"}`,
      `Fee: ${formatFee(lic.fee)}`,
      `Duration: ${lic.duration || "Not listed"}`,
      `Requirements: ${Array.isArray(lic.requirements) ? lic.requirements.join(", ") : "Not listed"}`,
    ];
    pushBotRich({
      text: `Recommended licence: ${lic.name}.`,
      sections: {
        overview: `${lic.name} licence details`,
        steps,
        next_action: "Would you like to open the licensing page?",
      },
      sources: ["BOCRA licensing data (src/data/licenceTypes.json)"],
    });
    setContext({
      topic: "licensing",
      pendingAction: {
        label: "Licensing Page",
        href: "/licensing",
        sources: ["BOCRA website"],
      },
    });
  };

  const buildHistory = () => {
    const recent = messages.slice(-6);
    return recent.map((m) => ({
      role: m.from === "user" ? "user" : "assistant",
      content: m.text,
    }));
  };

  const disambiguateIntent = async (query) => {
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "disambiguate", message: query }),
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  };

  const send = async (override) => {
    const text = (override ?? input).trim();
    if (!text) return;
    setError("");
    pushUser(text);
    setInput("");
    setTyping(true);
    await new Promise((r) => setTimeout(r, 500));
    setTyping(false);

    if (context.pendingAction && (isYes(text) || isThereRequest(text))) {
      if (isInternalHref(context.pendingAction.href)) {
        navigate(context.pendingAction.href);
        pushBotRich({
          text: `Opening ${context.pendingAction.label}.`,
          sources: context.pendingAction.sources,
          followUp: "Anything else I can help with?",
        });
      }
      setContext({ topic: context.topic, pendingAction: null });
      return;
    }

    if (context.pendingAction) {
      if (isYes(text)) {
        pushBotRich({
          text: `Here is the link to ${context.pendingAction.label}.`,
          action: {
            label: context.pendingAction.label,
            href: context.pendingAction.href,
          },
          sources: context.pendingAction.sources,
          followUp: "Do you need help with anything else?",
        });
        setContext({ topic: context.topic, pendingAction: null });
        return;
      }
      if (isNo(text)) {
        pushBotRich({
          text: "No problem. Which area do you want help with?",
          followUp:
            "You can choose Licensing, Complaints, Contact, or Verification.",
        });
        setContext({ topic: null, pendingAction: null });
        return;
      }
    }

    if (isGreeting(text)) {
      pushBotRich({
        text: "Hello! I can guide you to the right BOCRA page and answer common requests.",
        followUp:
          "What would you like to do: Licensing, Complaints, Contact, or Verify a licence?",
      });
      return;
    }

    if (licenceWizard.active) {
      const cat = detectCategory(text);
      if (cat) {
        finishLicenceWizard(cat);
        setLicenceWizard({ active: false, step: 0, category: null });
        return;
      }
      pushBotRich({
        text: "Which service type fits best?",
        followUp: "Choose Postal, Internet (ISP), Broadcasting, or Telecoms.",
      });
      return;
    }

    if (isInfoRequest(text) && context.topic) {
      pushBotRich({
        text: `I do not have that information for ${context.topic} in this build.`,
        followUp:
          "I can take you to the contact page or connect you with BOCRA.",
      });
      setContext({
        topic: context.topic,
        pendingAction: {
          label: "Contact",
          href: "/contact",
          sources: ["App routes (src/App.jsx)"],
        },
      });
      return;
    }

    const intent = matchIntent(text);
    let kb = matchKb(text);
    if (!kb) {
      const t = text.toLowerCase();
      if (t.includes("bocra") && (t.includes("office") || t.includes("offices") || t.includes("located") || t.includes("address") || t.includes("hours"))) {
        kb = KB_ENTRIES.find((e) => e.id === "contact_location_hours") || kb;
      }
    }

    if (isLicenceFinderRequest(text)) {
      startLicenceWizard();
      return;
    }

    // Always answer contact/location and about questions from trusted KB
    if (kb && (kb.topic === "contact" || kb.topic === "about")) {
      const provider = detectProvider(text);
      pushBotRich({
        text: provider
          ? politeCloser(
              withReceptionTone(`${kb.answer}\n\nDetected provider: ${provider}.`)
            )
          : politeCloser(withReceptionTone(kb.answer)),
        action: kb.action,
        sources: kb.sources,
        examples: kb.examples,
        sections: kb.sections,
        extras: kb.extras,
        followUp:
          kb.topic === "contact"
            ? "Do you want me to open the contact page?"
            : "Do you want me to open the About page?",
      });
      setContext({
        topic: kb.topic,
        pendingAction: kb.action
          ? { ...kb.action, sources: kb.sources }
          : null,
      });
      return;
    }

    // Prefer AI for contact/location questions when available

    const licMatch = findLicence(text);
    if (licMatch && (isLicenceQuery(text) || context.topic === "licensing")) {
      const lic = licMatch;
        const steps = [
          `Category: ${lic.category || "Not listed"}`,
          `Fee: ${formatFee(lic.fee)}`,
          `Duration: ${lic.duration || "Not listed"}`,
          `Requirements: ${Array.isArray(lic.requirements) ? lic.requirements.join(", ") : "Not listed"}`,
        ];
        pushBotRich({
          text: `Here are the details for ${lic.name}.`,
          sections: {
            overview: `${lic.name} licence details`,
            steps,
            next_action: "Would you like to open the licensing page?",
          },
          sources: ["BOCRA licensing data (src/data/licenceTypes.json)"],
        });
        setContext({
          topic: "licensing",
          pendingAction: { label: "Licensing Page", href: "/licensing", sources: ["BOCRA website"] },
        });
        return;
    }
    if (isLicenceQuery(text)) {
      pushBotRich({
        text:
          "Which licence are you asking about? I can help with Postal, Internet Service Provider, FM Radio Broadcasting, or MVNO.",
        followUp: "Tell me the licence name and I will provide the fee, duration, and requirements.",
      });
      setContext({ topic: "licensing", pendingAction: null });
      return;
    }

    if (isNavigationRequest(text) && intent?.action?.type === "navigate") {
      if (isInternalHref(intent.action.href)) {
        pushBotRich({
          text: `I can take you to the ${intent.action.label}. Is that correct?`,
          sources: intent.sources,
          followUp: "Reply yes to open it, or ask a question instead.",
        });
        setContext({
          topic: intent.topic,
          pendingAction: {
            label: intent.action.label,
            href: intent.action.href,
            sources: intent.sources,
          },
        });
      } else {
        pushBotRich({
          text:
            "I can answer your question directly, but I will not redirect you outside this site.",
          sources: intent.sources,
          followUp: "What would you like to know?",
        });
      }
      return;
    }

    if (!aiEnabled && kb) {
      const provider = detectProvider(text);
      const complaintType =
        kb.topic === "complaint" || kb.topic === "scam" || kb.topic === "consumer"
          ? detectComplaintType(text)
          : null;
      const draft =
        kb.topic === "complaint" || kb.topic === "scam" || kb.topic === "consumer"
          ? buildComplaintDraft({ issue: text, provider })
          : null;
      setTyping(false);
      pushBotRich({
        text: provider
          ? politeCloser(
              withReceptionTone(`${kb.answer}\n\nDetected provider: ${provider}.`)
            )
          : politeCloser(withReceptionTone(kb.answer)),
        action: kb.action,
        sources: kb.sources,
        examples: kb.examples,
        sections:
          complaintType && kb.sections
            ? {
                ...kb.sections,
                steps: complaintChecklist(complaintType),
                next_action: "Would you like me to open the complaints page or draft a complaint?",
              }
            : kb.sections,
        extras: draft
          ? {
              ...(kb.extras || {}),
              complaintDraft: {
                label: "Copy draft",
                content: draft,
              },
            }
          : kb.extras,
        followUp:
          kb.topic === "contact"
            ? "Do you want me to open the contact page?"
            : "Do you want me to open the related page?",
      });
      setContext({
        topic: kb.topic,
        pendingAction: kb.action
          ? { ...kb.action, sources: kb.sources }
          : null,
      });
      return;
    }

    if (!aiEnabled && intent) {
      const provider = detectProvider(text);
      const complaintType =
        intent.topic === "complaint" || intent.topic === "scam" || intent.topic === "consumer"
          ? detectComplaintType(text)
          : null;
      const draft =
        intent.topic === "complaint" || intent.topic === "scam" || intent.topic === "consumer"
          ? buildComplaintDraft({ issue: text, provider })
          : null;
      setTyping(false);
      pushBotRich({
        text: provider
          ? politeCloser(
              withReceptionTone(`${intent.response}\n\nDetected provider: ${provider}.`)
            )
          : politeCloser(withReceptionTone(intent.response)),
        action: intent.action,
        sources: intent.sources,
        sections:
          complaintType
            ? {
                overview: "Here’s a quick checklist to help you prepare.",
                steps: complaintChecklist(complaintType),
                next_action: "Would you like me to open the complaints page or draft a complaint?",
              }
            : null,
        extras: draft
          ? {
              complaintDraft: {
                label: "Copy draft",
                content: draft,
              },
            }
          : null,
        followUp:
          complaintType
            ? "Do you want me to open the complaints page?"
            : "Do you want help with anything else?",
      });
      setContext({ topic: intent.topic, pendingAction: null });
      return;
    }

    if (!aiEnabled) {
      setTyping(false);
      pushBotRich({
        text: politeCloser(
          "I am not sure I understood. I can guide you to Licensing, Complaints, Contact, or Verification."
        ),
        followUp: "Which one would you like?",
      });
      return;
    }

    if (isVague(text)) {
      const disamb = await disambiguateIntent(text);
      if (disamb && Array.isArray(disamb.options) && disamb.options.length > 0) {
        pushBotOptions({
          text: disamb.question || "Which option best matches your request?",
          options: disamb.options,
        });
        return;
      }
    }

    const postAction =
      intent?.action && isInternalHref(intent.action.href)
        ? { ...intent.action, sources: intent.sources }
        : kb?.action && isInternalHref(kb.action.href)
        ? { ...kb.action, sources: kb.sources }
        : null;

    setTyping(true);
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: buildHistory(),
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      const reply = data?.reply;
      const sections = data?.sections || null;
      const sources = Array.isArray(data?.sources) ? data.sources : [];
      if (!reply || sources.length === 0) {
        pushBotRich({
          text: politeCloser(
            "I do not have verified information for that question yet. Please contact BOCRA for details."
          ),
          action: { label: "Contact", href: "/contact" },
          sources: contactSources,
          followUp: "Do you want me to open the contact page?",
        });
        setContext({
          topic: context.topic,
          pendingAction: {
            label: "Contact",
            href: "/contact",
            sources: ["https://www.bocra.org.bw/bocra-contact-details"],
          },
        });
        return;
      }
      const gentlePrefix = isUpset(text) ? "I’m sorry about that. " : "";
      pushBotRich({
        text: politeCloser(`${gentlePrefix}${reply}`),
        sections,
        sources,
        followUp: postAction
          ? `Do you want me to open the ${postAction.label}?`
          : "Anything else I can help with?",
      });
      setContext({
        topic: intent?.topic || kb?.topic || context.topic,
        pendingAction: postAction,
      });
    } catch (e) {
      setError("AI service is unavailable right now.");
      pushBotRich({
        text:
          "I am having trouble reaching the AI service. Please try again or use the quick actions.",
        followUp: "Would you like help with Licensing, Complaints, or Contact?",
      });
    } finally {
      setTyping(false);
    }
  };

  const isOpen = expanded || open;
  const handleClose = () => {
    if (expanded) {
      onClose?.();
      return;
    }
    setOpen(false);
    onClose?.();
  };

  return (
    <>
      <div
        style={{
          ...(expanded
            ? {
                position: "fixed",
                top: "100px",
                right: "24px",
                bottom: "auto",
                height: "380px",
                width: "420px",
                zIndex: 10000,
                background: "#ffffff",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                borderRadius: "16px",
              }
            : {
                position: "fixed",
                top: "auto",
                right: 24,
                bottom: 24,
                transform: "none",
                zIndex: 10000,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 16,
              }),
        }}
      >
        {/* CHAT WINDOW */}
        {isOpen && (
          <div
            style={{
              width: expanded ? "100%" : 320,
              height: expanded ? "100%" : "auto",
              maxHeight: expanded ? "none" : "calc(100vh - 120px)",
              flex: expanded ? 1 : "none",
              background: expanded ? "#ffffff" : "#0b0d12",
              borderRadius: expanded ? 16 : 20,
              boxShadow: expanded
                ? "none"
                : "0 24px 64px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.08)",
              border: expanded ? "none" : "1px solid rgba(255,255,255,0.08)",
              overflow: "hidden",
              animation: "bubbleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              fontFamily: "'DM Sans', sans-serif",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div
              style={{
                background: expanded ? "#ffffff" : "#050505",
                borderBottom: expanded ? "1px solid #f1f5f9" : "none",
                padding: "16px 18px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  height: 28,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <img
                  src={bocraSvg}
                  alt="BOCRA Logo"
                  style={{
                    height: 28,
                    width: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: expanded ? "#111" : "#fff",
                    lineHeight: 1.2,
                  }}
                >
                  Connect
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: expanded ? "#666" : "rgba(255,255,255,0.62)",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#00C4A0",
                      display: "inline-block",
                      animation: "pulseDot 1.6s infinite",
                    }}
                  />
                  Online now
                </div>
              </div>
              <button
                onClick={handleClose}
                style={{
                  marginLeft: "auto",
                  background: expanded ? "transparent" : "rgba(255,255,255,0.08)",
                  border: "none",
                  borderRadius: "50%",
                  width: 28,
                  height: 28,
                  cursor: "pointer",
                  color: expanded ? "#666" : "rgba(255,255,255,0.76)",
                  fontSize: 16,
                  display: expanded ? "flex" : "none",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = expanded
                    ? "#f8f9fa"
                    : "rgba(255,255,255,0.2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = expanded
                    ? "transparent"
                    : "rgba(255,255,255,0.1)")
                }
              >
                x
              </button>
            </div>

            {/* Messages */}
            <div
              className="chat-messages-scroll"
              style={{
                background: expanded ? "#ffffff" : "transparent",
                padding: "14px 14px 6px",
                flex: 1,
                minHeight: 0,
                maxHeight: expanded ? "none" : 350,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent:
                      msg.from === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "80%",
                      padding: "9px 13px",
                      borderRadius:
                        msg.from === "user"
                          ? "14px 14px 2px 14px"
                          : "14px 14px 14px 2px",
                      background:
                        msg.from === "user"
                          ? expanded
                            ? "#1A3A6B"
                            : "#050505"
                          : expanded
                            ? "#f1f5f9"
                            : "rgba(255,255,255,0.08)",
                      color:
                        msg.from === "user"
                          ? "#ffffff"
                          : expanded
                            ? "#111"
                            : "#f8fafc",
                      fontSize: 13,
                      lineHeight: 1.5,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {msg.text}
                    {msg.action && isInternalHref(msg.action.href) && (
                      <button
                        onClick={() => navigate(msg.action.href)}
                        style={{
                          display: "inline-block",
                          marginTop: 8,
                          fontSize: 12,
                          color: "#e5e7eb",
                          textDecoration: "underline",
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                        }}
                      >
                        {msg.action.label}
                      </button>
                    )}
                    {msg.followUp && (
                      <div
                        style={{
                          marginTop: 8,
                          fontSize: 12,
                          color: "rgba(255,255,255,0.7)",
                        }}
                      >
                        {msg.followUp}
                      </div>
                    )}
                    {msg.sections && (
                      <div
                        style={{
                          marginTop: 8,
                          fontSize: 12,
                          color: "rgba(255,255,255,0.85)",
                          display: "flex",
                          flexDirection: "column",
                          gap: 6,
                        }}
                      >
                        {msg.sections.overview && (
                          <div>
                            <strong style={{ fontWeight: 600 }}>Overview:</strong>{" "}
                            {msg.sections.overview}
                          </div>
                        )}
                        {Array.isArray(msg.sections.steps) &&
                          msg.sections.steps.length > 0 && (
                            <div>
                              <strong style={{ fontWeight: 600 }}>Steps:</strong>
                              <div style={{ marginTop: 4 }}>
                                {msg.sections.steps.map((s, i) => (
                                  <div key={i} style={{ marginBottom: 2 }}>
                                    {i + 1}. {s}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        {msg.sections.next_action && (
                          <div>
                            <strong style={{ fontWeight: 600 }}>
                              Next action:
                            </strong>{" "}
                            {msg.sections.next_action}
                          </div>
                        )}
                      </div>
                    )}
                    {msg.text &&
                      msg.text.includes("contact details") &&
                      msg.sources &&
                      msg.sources.some((s) => s.includes("bocra-contact-details")) && (
                        <div
                          style={{
                            marginTop: 8,
                            fontSize: 12,
                            color: "rgba(255,255,255,0.85)",
                          }}
                        >
                          Overview: BOCRA contact details and in-person complaint visit hours are available.
                        </div>
                      )}
                    {msg.examples && msg.examples.length > 0 && (
                      <div
                        style={{
                          marginTop: 8,
                          fontSize: 11,
                          color: "rgba(255,255,255,0.7)",
                        }}
                      >
                        <strong style={{ fontWeight: 600 }}>Examples:</strong>
                        <div style={{ marginTop: 4 }}>
                          {msg.examples.map((ex, i) => (
                            <div key={i} style={{ marginBottom: 2 }}>
                              - {ex}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {msg.extras && (
                      <div
                        style={{
                          marginTop: 8,
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 8,
                        }}
                      >
                        {msg.extras.map && (
                          <a
                            href={msg.extras.map.href}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              border: "1px solid rgba(255,255,255,0.2)",
                              borderRadius: 999,
                              padding: "6px 12px",
                              fontSize: 12,
                              color: "#ffffff",
                              textDecoration: "none",
                              background: "rgba(255,255,255,0.08)",
                            }}
                          >
                            {msg.extras.map.label}
                          </a>
                        )}
                        {msg.extras.call && (
                          <a
                            href={msg.extras.call.href}
                            style={{
                              border: "1px solid rgba(255,255,255,0.2)",
                              borderRadius: 999,
                              padding: "6px 12px",
                              fontSize: 12,
                              color: "#ffffff",
                              textDecoration: "none",
                              background: "rgba(255,255,255,0.08)",
                            }}
                          >
                            {msg.extras.call.label}
                          </a>
                        )}
                        {msg.extras.complaintDraft && (
                          <button
                            onClick={() => {
                              if (navigator?.clipboard?.writeText) {
                                navigator.clipboard.writeText(
                                  msg.extras.complaintDraft.content
                                );
                              }
                            }}
                            style={{
                              border: "1px solid rgba(255,255,255,0.2)",
                              borderRadius: 999,
                              padding: "6px 12px",
                              fontSize: 12,
                              color: "#ffffff",
                              background: "rgba(255,255,255,0.08)",
                              cursor: "pointer",
                            }}
                          >
                            {msg.extras.complaintDraft.label}
                          </button>
                        )}
                      </div>
                    )}
                    {msg.extras?.complaintDraft?.content && (
                      <div
                        style={{
                          marginTop: 8,
                          fontSize: 11,
                          color: "rgba(255,255,255,0.7)",
                          whiteSpace: "pre-line",
                          border: "1px solid rgba(255,255,255,0.12)",
                          borderRadius: 12,
                          padding: "8px 10px",
                        }}
                      >
                        {msg.extras.complaintDraft.content}
                      </div>
                    )}
                    {msg.options && msg.options.length > 0 && (
                      <div
                        style={{
                          marginTop: 8,
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 6,
                        }}
                      >
                        {msg.options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => send(opt)}
                            style={{
                              border: "1px solid rgba(255,255,255,0.12)",
                              borderRadius: 999,
                              padding: "6px 10px",
                              fontSize: 11,
                              background: "rgba(255,255,255,0.04)",
                              color: "#e5e7eb",
                              cursor: "pointer",
                            }}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                    {msg.sources && msg.sources.length > 0 && (
                      <div
                        style={{
                          marginTop: 8,
                          fontSize: 10,
                          color: "rgba(255,255,255,0.55)",
                        }}
                      >
                        Source:{" "}
                        {Array.from(
                          new Set(msg.sources.map(formatSource))
                        ).join(", ")}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <div
                    style={{
                      background: expanded ? "#f1f5f9" : "rgba(255,255,255,0.08)",
                      borderRadius: "14px 14px 14px 2px",
                      padding: "11px 16px",
                      display: "flex",
                      gap: 4,
                      alignItems: "center",
                    }}
                  >
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: expanded ? "#94a3b8" : "#d1d5db",
                          display: "inline-block",
                          animation: "typingDot 1.2s infinite",
                          animationDelay: `${d * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick actions */}
            {!typing && (
              <div
                className="chat-chip-panel"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  padding: "0 14px 8px",
                }}
              >
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    className="chip-toggle"
                    onClick={() =>
                      setChipMode((prev) => (prev === "faq" ? null : "faq"))
                    }
                    style={{
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: 999,
                      padding: "6px 12px",
                      fontSize: 11,
                      background:
                        chipMode === "faq"
                          ? "rgba(255,255,255,0.2)"
                          : "rgba(255,255,255,0.06)",
                      color: "#ffffff",
                      cursor: "pointer",
                    }}
                  >
                    Quick FAQs
                  </button>
                  <button
                    className="chip-toggle"
                    onClick={() =>
                      setChipMode((prev) => (prev === "actions" ? null : "actions"))
                    }
                    style={{
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: 999,
                      padding: "6px 12px",
                      fontSize: 11,
                      background:
                        chipMode === "actions"
                          ? "rgba(255,255,255,0.2)"
                          : "rgba(255,255,255,0.06)",
                      color: "#ffffff",
                      cursor: "pointer",
                    }}
                  >
                    Quick Actions
                  </button>
                </div>
                {!chipMode && (
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>
                    Choose a panel to keep the chat clean.
                  </div>
                )}
                {chipMode === "faq" && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {FAQ_QUESTIONS.map((label) => (
                      <button
                        className="chip-pill"
                        key={`faq-${label}`}
                        onClick={() => send(label)}
                        style={{
                          border: "1px solid rgba(255,255,255,0.2)",
                          borderRadius: 999,
                          padding: "6px 10px",
                          fontSize: 11,
                          background: "rgba(255,255,255,0.08)",
                          color: "#ffffff",
                          cursor: "pointer",
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
                {chipMode === "actions" && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {QUICK_ACTIONS.map((label) => (
                      <button
                        className="chip-pill"
                        key={label}
                        onClick={() => send(label)}
                        style={{
                          border: "1px solid rgba(255,255,255,0.12)",
                          borderRadius: 999,
                          padding: "6px 10px",
                          fontSize: 11,
                          background: "rgba(255,255,255,0.04)",
                          color: "#e5e7eb",
                          cursor: "pointer",
                        }}
                      >
                        {label}
                      </button>
                    ))}
                    {licenceWizard.active &&
                      ["Postal", "Internet", "Broadcasting", "Telecoms"].map(
                        (label) => (
                          <button
                            className="chip-pill"
                            key={label}
                            onClick={() => send(label)}
                            style={{
                              border: "1px solid rgba(255,255,255,0.2)",
                              borderRadius: 999,
                              padding: "6px 10px",
                              fontSize: 11,
                              background: "rgba(255,255,255,0.08)",
                              color: "#ffffff",
                              cursor: "pointer",
                            }}
                          >
                            {label}
                          </button>
                        )
                      )}
                  </div>
                )}
              </div>
            )}

            {/* Input */}
            <div
              style={{
                padding: "10px 12px 12px",
                background: expanded ? "#ffffff" : "transparent",
                borderTop: expanded
                  ? "1px solid #f1f5f9"
                  : "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Type a message..."
                style={{
                  flex: 1,
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 999,
                  padding: "9px 14px",
                  fontSize: 13,
                  outline: "none",
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#f8fafc",
                  background: "rgba(255,255,255,0.05)",
                }}
              />
              <button
                onClick={send}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "#050505",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 2L11 13"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 2L15 22L11 13L2 9L22 2Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            {error && (
              <div
                style={{
                  padding: "0 14px 12px",
                  fontSize: 11,
                  color: "#fca5a5",
                }}
              >
                {error}
              </div>
            )}
          </div>
        )}

        {/* TRIGGER BUTTON */}
        {!expanded && (
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            {/* Pop-up Hint */}
            {showHint && !open && (
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: "calc(100% + 18px)",
                  transform: "translateX(-50%)",
                  whiteSpace: "nowrap",
                  background: "#ffffff",
                  color: "#050505",
                  padding: "14px 22px",
                  borderRadius: "18px",
                  border: "2px solid rgba(5,5,5,0.08)",
                  fontSize: "16px",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  boxShadow: "0 16px 40px rgba(0,0,0,0.2)",
                  animation: "hintPop 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  minHeight: 60,
                  zIndex: 2,
                }}
                onClick={() => setOpen((o) => !o)}
              >
                <span>Need help logging an issue?</span>
                <span style={{ fontSize: 16 }}>👋</span>
                <div style={{
                  position: "absolute",
                  left: "50%",
                  bottom: "-9px",
                  transform: "translateX(-50%) rotate(45deg)",
                  width: 14,
                  height: 14,
                  background: "#ffffff",
                  borderRadius: "2px",
                  borderRight: "2px solid rgba(5,5,5,0.08)",
                  borderBottom: "2px solid rgba(5,5,5,0.08)",
                }} />
              </div>
            )}

            <button
              onClick={() => setOpen((o) => !o)}
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "#050505",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 32px rgba(0,0,0,0.35)",
              transition: "transform 0.2s, background 0.2s",
              position: "relative",
            }}
          >
            {open ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            {/* Notification dot */}
            {!open && (
              <span
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  width: 9,
                  height: 9,
                  background: "#9ca3af",
                  borderRadius: "50%",
                  border: "2px solid white",
                  animation: "pulseDot 1.6s infinite",
                }}
              />
            )}
          </button>
          </div>
        )}
      </div>

      {/* Chat-only animations and scrollbars */}
      <style>{`
        .chat-messages-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(150, 150, 150, 0.4) transparent;
        }
        .chat-messages-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .chat-messages-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-messages-scroll::-webkit-scrollbar-thumb {
          background: rgba(150, 150, 150, 0.4);
          border-radius: 10px;
        }
        .chat-messages-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(150, 150, 150, 0.6);
        }

        @keyframes hintPop {
          from { opacity: 0; transform: translateX(10px) scale(0.95); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes bubbleIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes typingDot {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.4; }
          40%            { transform: scale(1);   opacity: 1;   }
        }
        @keyframes pulseDot {
          0%,100% { box-shadow: 0 0 0 0 rgba(0,196,160,0.5); }
          50%     { box-shadow: 0 0 0 5px rgba(0,196,160,0); }
        }
        .chat-chip-panel .chip-toggle,
        .chat-chip-panel .chip-pill {
          transition: transform 0.15s ease, background 0.2s ease, border-color 0.2s ease;
        }
        .chat-chip-panel .chip-toggle:hover,
        .chat-chip-panel .chip-pill:hover {
          transform: translateY(-1px);
          border-color: rgba(255,255,255,0.35);
        }
        .chat-chip-panel .chip-toggle:active,
        .chat-chip-panel .chip-pill:active {
          transform: translateY(0);
        }
      `}</style>
    </>
  );
}
