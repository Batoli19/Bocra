export const KB_ENTRIES = [
  {
    id: "services_offered",
    topic: "services",
    keywords: [
      "services",
      "services you offer",
      "what services do you offer",
      "what services do you provide",
      "what do you offer",
      "what are your services",
      "bocra services",
    ],
    answer:
      "BOCRA’s services focus on regulating and supporting Botswana’s communications sector. Key areas include licensing, type approval, consumer protection, complaints handling, and verification.",
    sections: {
      overview: "Here are the main BOCRA service areas.",
      steps: [
        "Licensing: telecoms, broadcasting, and postal services.",
        "Type approval: device/equipment compliance.",
        "Consumer protection: rights, QoS, and dispute support.",
        "Complaints: report and track service issues.",
        "Verification: licence and application status checks.",
        "SIM registration guidance and scam reporting support.",
      ],
      next_action: "Which area would you like help with?",
    },
    examples: [
      "What services do you offer?",
      "Help me with licensing.",
      "I need to file a complaint.",
    ],
    sources: ["BOCRA website"],
  },
  {
    id: "about_bocra",
    topic: "about",
    keywords: [
      "what is bocra",
      "what does bocra do",
      "about bocra",
      "bocra role",
      "bocra mandate",
      "bocra all about",
    ],
    answer:
      "BOCRA was established under the Communications Regulatory Authority Act, 2012, and began operating on 1 April 2013. It regulates Botswana’s communications sector, including telecommunications, ICTs, radio communications, broadcasting, and postal services.",
    sections: {
      overview:
        "BOCRA is Botswana’s communications sector regulator, created by the CRA Act, 2012.",
      steps: [
        "Established under the Communications Regulatory Authority Act, 2012.",
        "Operational from 1 April 2013.",
        "Regulates telecommunications, ICTs, radio communications, broadcasting, and postal services.",
      ],
      next_action: "Would you like me to open the About page?",
    },
    examples: [
      "What does BOCRA do?",
      "Tell me about BOCRA.",
    ],
    action: { label: "About BOCRA", href: "/about" },
    sources: ["https://www.bocra.org.bw/profile"],
  },
  {
    id: "complaints",
    topic: "complaint",
    keywords: [
      "complaint",
      "report",
      "overcharged",
      "billing",
      "service issue",
      "network issue",
      "slow internet",
      "no service",
      "dropped calls",
      "poor service",
      "tletlebo",
      "ngongorego",
      "mathata",
    ],
    answer:
      "You can file a complaint about telecom, broadcasting, or postal service issues.\n\nSteps:\n- Describe the issue clearly\n- Include dates, provider name, and reference numbers\n- Submit through the complaints form\n\nIf you want, I can open the complaints page.",
    examples: [
      "Mascom is overcharging me for data.",
      "Orange network keeps dropping calls.",
      "BTC internet has been down for two days.",
    ],
    action: { label: "Complaints Page", href: "/complaints" },
    sources: ["BOCRA website"],
  },
  {
    id: "licensing",
    topic: "licensing",
    keywords: ["licence", "license", "licensing", "permit", "apply"],
    answer:
      "Licensing covers telecoms, broadcasting, and postal services.\n\nIf you tell me the service type, I can guide the requirements. I can also open the licensing page.",
    action: { label: "Licensing Page", href: "/licensing" },
    sources: ["BOCRA website"],
  },
  {
    id: "consumer_rights",
    topic: "consumer",
    keywords: [
      "consumer rights",
      "rights",
      "qos",
      "quality of service",
      "unfair charges",
      "misleading",
      "contract dispute",
      "ditshwanelo",
      "tshegetso",
      "dira tshiamolao",
    ],
    answer:
      "I can help with consumer rights and quality-of-service questions. Tell me your specific issue and I will summarize the relevant guidance.",
    examples: [
      "What are my rights if my service is constantly down?",
      "Can I dispute unfair charges?",
    ],
    action: { label: "Quality of Service", href: "/qos" },
    sources: ["BOCRA website"],
  },
  {
    id: "sim_registration",
    topic: "sim",
    keywords: ["sim registration", "register sim", "sim card", "activate sim", "sim"],
    answer:
      "SIM registration requires valid identification and completing the registration process with your service provider. I can guide you on the typical steps or open the relevant page.",
    examples: [
      "How do I register a SIM card?",
      "Ke batla go ngodisa SIM ya me.",
    ],
    action: { label: "Documents", href: "/documents" },
    sources: ["BOCRA website"],
  },
  {
    id: "scam_reporting",
    topic: "scam",
    keywords: ["scam", "fraud", "phishing", "sim swap", "spam", "suspicious message"],
    answer:
      "If you suspect a scam or fraud, document the details and report it promptly. I can guide you on the steps or open the complaints page.",
    examples: [
      "I received a phishing SMS asking for my PIN.",
      "Someone tried a SIM swap on my number.",
    ],
    action: { label: "Complaints Page", href: "/complaints" },
    sources: ["BOCRA website"],
  },
  {
    id: "contact_location_hours",
    topic: "contact",
    keywords: [
      "where is bocra",
      "location",
      "address",
      "office hours",
      "operating hours",
      "opening hours",
      "office time",
      "hours",
      "where are your offices",
      "where are bocra offices",
      "where are bocra offices located",
      "bocra offices",
      "bocra office",
      "office location",
      "head office",
      "headquarters",
    ],
    answer:
      "BOCRA’s headquarters are in Gaborone at Plot 50671, Independence Avenue. Main contact: +267 395 7755; email: info@bocra.org.bw. Operating hours are not listed on the contact page, so it’s best to confirm by phone or email.",
    sections: {
      overview:
        "BOCRA headquarters location and how to reach them.",
      steps: [
        "Address: Plot 50671, Independence Avenue, Gaborone, Botswana.",
        "Phone: +267 395 7755.",
        "Email: info@bocra.org.bw.",
        "Operating hours are not listed on the contact page; confirm by phone or email.",
      ],
      next_action: "Do you want me to open the contact page?",
    },
    examples: [
      "Where are BOCRA offices?",
      "What are BOCRA operating hours?",
    ],
    action: { label: "Contact", href: "/contact" },
    extras: {
      map: {
        label: "Open Map",
        href: "https://maps.google.com/?q=Plot%2050671%20Independence%20Avenue%20Gaborone%20Botswana",
      },
      call: {
        label: "Call now",
        href: "tel:+2673957755",
      },
    },
    sources: [
      "https://www.bocra.org.bw/bocra-contact-details",
    ],
  },
];
