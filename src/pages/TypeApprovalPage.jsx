import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import PageWrapper from "../components/shared/PageWrapper"
import {
  FileText, MapPin, Upload, Award, CheckCircle, FileDown,
  Search, ChevronDown, ChevronUp, ArrowRight, Shield, Globe,
  Smartphone, Wifi, Bluetooth, Radio, Cpu, Server,
  Satellite, Zap, Monitor, Clock, BadgeCheck, ArrowUpRight
} from "lucide-react"

/* ═══ SCROLL-REVEAL HOOK ═══ */
function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

/* ═══ ANIMATED COUNTER ═══ */
function Counter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const num = parseInt(end.replace(/[^0-9]/g, ""))
        const steps = 60
        const inc = num / steps
        let current = 0
        const timer = setInterval(() => {
          current += inc
          if (current >= num) { setCount(num); clearInterval(timer) }
          else setCount(Math.floor(current))
        }, duration / steps)
      }
    }, { threshold: 0.3 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [end, duration])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

/* ═══ DATA ═══ */
const approvedDevices = [
  { approvalNo: "BW-TA-2024-0891", brand: "Samsung", model: "Galaxy S24", category: "Mobile Phone", date: "12 Jan 2024", status: "Approved" },
  { approvalNo: "BW-TA-2024-0745", brand: "Apple", model: "iPhone 15 Pro", category: "Mobile Phone", date: "8 Nov 2023", status: "Approved" },
  { approvalNo: "BW-TA-2025-0023", brand: "Huawei", model: "AX3 Pro", category: "Router/Modem", date: "3 Feb 2025", status: "Approved" },
  { approvalNo: "BW-TA-2024-1102", brand: "TP-Link", model: "Archer AX73", category: "Router/Modem", date: "15 Mar 2024", status: "Approved" },
  { approvalNo: "BW-TA-2025-0187", brand: "Xiaomi", model: "Buds 4 Pro", category: "Bluetooth", date: "20 Jun 2025", status: "Approved" },
  { approvalNo: "BW-TA-2023-0654", brand: "Nokia", model: "5710 XpressAudio", category: "Mobile Phone", date: "1 Jul 2023", status: "Approved" },
  { approvalNo: "BW-TA-2022-0312", brand: "Motorola", model: "Moto G32", category: "Mobile Phone", date: "14 Apr 2022", status: "Approved" },
  { approvalNo: "BW-TA-2021-0198", brand: "Netgear", model: "Nighthawk R7000", category: "Router/Modem", date: "9 Sep 2021", status: "Expired" },
]
const deviceCategories = ["All Categories", "Mobile Phone", "Router/Modem", "Bluetooth", "Broadcasting", "IoT", "Network Infrastructure", "Satellite", "Amateur Radio", "CCTV"]

const faqData = [
  { q: "How long does the process take?", a: "15 working days from complete submission. Complex cases may take longer." },
  { q: "Does my certificate expire?", a: "No — certificates are valid indefinitely unless technical specs change." },
  { q: "Can I use a foreign test report?", a: "Yes, from any ILAC-accredited lab meeting ITU Region 1 standards." },
  { q: "What if I import without approval?", a: "BOCRA can seize non-compliant devices. Customs also checks for approval during import." },
  { q: "Do I need a local office?", a: "Yes — a local repair centre or registered office in Botswana is mandatory." },
  { q: "Can a foreign company apply?", a: "Yes, but the local repair centre requirement must still be met." },
  { q: "What is ITU Region 1?", a: "Africa and Europe. Certificates from Ofcom, ICASA, CE mark, etc. are accepted by BOCRA." },
]

const equipmentGrid = [
  { Icon: Smartphone, name: "Mobile Phones", color: "#1A3A6B" },
  { Icon: Wifi, name: "Routers & Modems", color: "#2E5FA3" },
  { Icon: Bluetooth, name: "Bluetooth", color: "#0F6E56" },
  { Icon: Radio, name: "Broadcasting", color: "#1A3A6B" },
  { Icon: Cpu, name: "IoT & Smart", color: "#2E5FA3" },
  { Icon: Server, name: "Infrastructure", color: "#0F6E56" },
  { Icon: Satellite, name: "Satellite", color: "#1A3A6B" },
  { Icon: Zap, name: "Amateur Radio", color: "#2E5FA3" },
  { Icon: Monitor, name: "CCTV & Security", color: "#0F6E56" },
]

const steps = [
  { num: "01", title: "Prepare", sub: "Documents & specs", Icon: FileText, color: "#1A3A6B" },
  { num: "02", title: "Local Presence", sub: "Repair centre in BW", Icon: MapPin, color: "#2E5FA3" },
  { num: "03", title: "Submit & Pay", sub: "Online or in person", Icon: Upload, color: "#0F6E56" },
  { num: "04", title: "Get Certified", sub: "Valid indefinitely", Icon: Award, color: "#1A3A6B" },
]

const feeRows = [
  { type: "Mobile Phones & Tablets", fee: "P 2,500" },
  { type: "Routers & Modems", fee: "P 1,800" },
  { type: "Bluetooth / Short Range", fee: "P 1,200" },
  { type: "Broadcasting Equipment", fee: "P 4,500" },
  { type: "IoT / Smart Devices", fee: "P 1,500" },
  { type: "Network Infrastructure", fee: "P 6,000" },
  { type: "Satellite Equipment", fee: "P 5,500" },
  { type: "Amateur Radio", fee: "P 800" },
]

const requiredDocs = [
  { name: "Application Form", note: "Download below or collect at BOCRA" },
  { name: "Technical Specifications", note: "Frequency, power output, modulation" },
  { name: "Regional Type Approval Certificate", note: "From ITU Region 1 authority" },
  { name: "Declaration of Conformity", note: "Signed by original manufacturer" },
]

/* ═══ SECTION LABEL ═══ */
const SectionLabel = ({ children }) => (
  <p style={{
    fontSize: 11, fontWeight: 600, letterSpacing: "0.1em",
    color: "#9ca3af", textTransform: "uppercase", marginBottom: 12,
    fontFamily: "Inter, sans-serif"
  }}>{children}</p>
)

/* ═══════════════════════ MAIN COMPONENT ═══════════════════════ */
export default function TypeApprovalPage() {
  const [openFaq, setOpenFaq] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [activeStep, setActiveStep] = useState(0)
  const [heroLoaded, setHeroLoaded] = useState(false)

  useEffect(() => { setTimeout(() => setHeroLoaded(true), 100) }, [])

  // Auto-rotate active step
  useEffect(() => {
    const timer = setInterval(() => setActiveStep(p => (p + 1) % 4), 4000)
    return () => clearInterval(timer)
  }, [])

  const [catRef, catVis] = useReveal()
  const [stepRef, stepVis] = useReveal()
  const [reqRef, reqVis] = useReveal()
  const [devRef, devVis] = useReveal()
  const [faqRef, faqVis] = useReveal()

  const filteredDevices = approvedDevices.filter(d => {
    const s = searchTerm.toLowerCase()
    const matchSearch = !s || d.brand.toLowerCase().includes(s) || d.model.toLowerCase().includes(s) || d.approvalNo.toLowerCase().includes(s)
    const matchCat = selectedCategory === "All Categories" || d.category === selectedCategory
    return matchSearch && matchCat
  })

  return (
    <PageWrapper fullWidth>
      <style>{`
        @keyframes float { 0%,100% { transform: translateY(0px) } 50% { transform: translateY(-12px) } }
        @keyframes pulse { 0%,100% { opacity: 0.4 } 50% { opacity: 0.8 } }
        @keyframes slideUp { from { opacity:0; transform:translateY(40px) } to { opacity:1; transform:translateY(0) } }
        @keyframes slideLeft { from { opacity:0; transform:translateX(60px) } to { opacity:1; transform:translateX(0) } }
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes scaleIn { from { opacity:0; transform:scale(0.8) } to { opacity:1; transform:scale(1) } }
        @keyframes shimmer { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }
        @keyframes progressFill { from { width: 0% } to { width: 100% } }
        @keyframes dotPulse { 0%,100% { transform:scale(1); opacity:0.5 } 50% { transform:scale(1.5); opacity:1 } }
        .ta-card { transition: all 0.3s cubic-bezier(0.4,0,0.2,1); }
        .ta-card:hover { transform: translateY(-6px) !important; border-color: #1A3A6B !important; }
        .ta-step { transition: all 0.4s cubic-bezier(0.4,0,0.2,1); cursor: pointer; }
        .ta-step:hover { transform: scale(1.03); }
        .ta-row { transition: all 0.2s ease; }
        .ta-row:hover { background: #f8f9fa; }
        .ta-faq-btn { transition: all 0.2s ease; }
        .ta-faq-btn:hover .ta-faq-q { color: #1A3A6B !important; }
        .ta-eq-item { transition: all 0.3s cubic-bezier(0.4,0,0.2,1); cursor: default; }
        .ta-eq-item:hover { transform: translateY(-4px); background: #ffffff !important; border-color: #1A3A6B !important; }
      `}</style>

      <div style={{ background: "#ffffff", overflow: "hidden" }}>

        {/* ═══ HERO ═══ */}
        <div style={{ position: "relative", minHeight: "90vh", display: "flex", alignItems: "center", overflow: "hidden", backgroundImage: "linear-gradient(135deg, rgba(5, 8, 22, 0.62) 0%, rgba(5, 8, 22, 0.34) 42%, rgba(5, 8, 22, 0.76) 100%), url('/hero-documents-optimized.jpg')", backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
          {/* Decorative background */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <div style={{ position: "absolute", top: "10%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "#D6E4F7", opacity: 0.3, animation: "float 8s ease-in-out infinite" }} />
            <div style={{ position: "absolute", bottom: "15%", right: "15%", width: 200, height: 200, borderRadius: "50%", background: "#D6E4F7", opacity: 0.2, animation: "float 6s ease-in-out infinite 1s" }} />
            <div style={{ position: "absolute", top: "60%", left: "3%", width: 120, height: 120, borderRadius: "50%", background: "#D6E4F7", opacity: 0.15, animation: "float 7s ease-in-out infinite 0.5s" }} />
            {/* Grid dots */}
            <div style={{ position: "absolute", top: "20%", right: "8%", display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16 }}>
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "#1A3A6B", opacity: 0.08, animation: `dotPulse ${2 + (i % 3)}s ease-in-out infinite ${i * 0.15}s` }} />
              ))}
            </div>
          </div>

          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "120px 24px 80px", width: "100%", position: "relative", zIndex: 1, display: "flex", gap: 64, alignItems: "center", flexWrap: "wrap" }}>
            {/* Left */}
            <div style={{ flex: "1 1 55%", minWidth: 340, opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.4,0,0.2,1)" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.16)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 50, padding: "6px 16px", marginBottom: 24, backdropFilter: "blur(10px)" }}>
                <Shield size={14} color="#ffffff" />
                <span style={{ fontSize: 12, fontWeight: 600, color: "#ffffff", fontFamily: "Inter, sans-serif", letterSpacing: "0.05em" }}>
                  BOCRA TYPE APPROVAL
                </span>
              </div>
              <h1 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(40px, 5.5vw, 64px)", fontWeight: 800, color: "#ffffff",
                lineHeight: 1.08, maxWidth: 580, margin: "0 0 20px 0", letterSpacing: "-0.03em"
              }}>
                Certify Your
                <span style={{ display: "block", color: "#dbeafe" }}>
                  Equipment
                </span>
                for Botswana
              </h1>
              <p style={{
                fontSize: 17, fontWeight: 400, color: "rgba(255,255,255,0.82)", lineHeight: 1.7,
                maxWidth: 480, margin: "0 0 36px 0", fontFamily: "Inter, sans-serif"
              }}>
                Section 84 of the CRA Act requires all communications devices to be certified before sale or use in Botswana.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link to="/portal/apply" style={{
                  background: "#1A3A6B", color: "#fff", borderRadius: 50,
                  padding: "14px 28px", fontWeight: 600, fontSize: 14,
                  textDecoration: "none", fontFamily: "Inter, sans-serif",
                  display: "inline-flex", alignItems: "center", gap: 8,
                  border: "none", transition: "all 0.2s"
                }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-2px)" }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)" }}
                >
                  Apply Now <ArrowRight size={16} />
                </Link>
                <a href="#approved-devices" style={{
                  background: "rgba(255,255,255,0.14)", color: "#ffffff", borderRadius: 50,
                  padding: "14px 28px", fontWeight: 600, fontSize: 14,
                  textDecoration: "none", fontFamily: "Inter, sans-serif",
                  display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(255,255,255,0.18)",
                  transition: "all 0.2s"
                }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-2px)" }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)" }}
                >
                  Search Devices <Search size={15} />
                </a>
              </div>
            </div>

            {/* Right — Animated stat cards */}
            <div style={{ flex: "1 1 40%", minWidth: 280, opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateX(0)" : "translateX(50px)", transition: "all 1s cubic-bezier(0.4,0,0.2,1) 0.3s" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { icon: BadgeCheck, value: "3400", suffix: "+", label: "Approved Device Models", delay: 0 },
                  { icon: Clock, value: "15", suffix: " days", label: "Average Processing Time", delay: 0.15 },
                  { icon: Globe, value: "84", suffix: "", label: "CRA Act Section Authority", delay: 0.3 },
                ].map((stat, i) => (
                  <div key={i} style={{
                    background: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 16,
                    padding: "24px 28px", display: "flex", alignItems: "center", gap: 20, backdropFilter: "blur(10px)",
                    animation: heroLoaded ? `slideLeft 0.6s ease ${stat.delay + 0.4}s both` : "none"
                  }} className="ta-card">
                    <div style={{
                      width: 52, height: 52, borderRadius: 14, background: "#D6E4F7",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0
                    }}>
                      <stat.icon size={24} color="#1A3A6B" />
                    </div>
                    <div>
                      <p style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: 32, fontWeight: 800, color: "#1A3A6B",
                        margin: 0, lineHeight: 1
                      }}>
                        <Counter end={stat.value} suffix={stat.suffix} />
                      </p>
                      <p style={{ fontFamily: "Inter", fontSize: 13, color: "#6b7280", margin: "4px 0 0 0" }}>
                        {stat.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══ SECTION 2 — EQUIPMENT CATEGORIES ═══ */}
        <div ref={catRef} style={{ background: "#f8f9fa", padding: "80px 0" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
            <SectionLabel>WHAT NEEDS APPROVAL</SectionLabel>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 36, fontWeight: 700, color: "#111111",
              margin: "0 0 12px 0"
            }}>Equipment Categories</h2>
            <p style={{
              fontSize: 16, color: "#6b7280", fontFamily: "Inter, sans-serif",
              maxWidth: 500, margin: "0 auto 48px", lineHeight: 1.6
            }}>
              All radio and telecom equipment requires BOCRA certification before import, sale, or use.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16, maxWidth: 900, margin: "0 auto" }}>
              {equipmentGrid.map(({ Icon, name, color }, i) => (
                <div key={i} className="ta-eq-item" style={{
                  background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 16,
                  padding: "28px 16px", display: "flex", flexDirection: "column",
                  alignItems: "center", gap: 12,
                  opacity: catVis ? 1 : 0, transform: catVis ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.5s cubic-bezier(0.4,0,0.2,1) ${i * 0.06}s`
                }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 14, background: "#D6E4F7",
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <Icon size={24} color={color} />
                  </div>
                  <span style={{
                    fontFamily: "Inter, sans-serif", fontSize: 13, fontWeight: 600,
                    color: "#111111", textAlign: "center"
                  }}>{name}</span>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 13, color: "#9ca3af", fontFamily: "Inter", marginTop: 32 }}>
              Receiver-only devices may be exempt — BOCRA still issues approvals for customs clearance.
            </p>
          </div>
        </div>

        {/* ═══ SECTION 3 — INTERACTIVE PROCESS ═══ */}
        <div ref={stepRef} style={{ background: "#ffffff", padding: "80px 0" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <SectionLabel>HOW IT WORKS</SectionLabel>
              <h2 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 36, fontWeight: 700, color: "#111111", margin: 0
              }}>4 Steps to Get Certified</h2>
            </div>

            {/* Step selector strip */}
            <div style={{ display: "flex", gap: 0, maxWidth: 800, margin: "0 auto 48px", position: "relative" }}>
              {/* Progress bar bg */}
              <div style={{ position: "absolute", top: 24, left: 30, right: 30, height: 3, background: "#e5e7eb", borderRadius: 2 }} />
              {/* Progress bar fill */}
              <div style={{ position: "absolute", top: 24, left: 30, height: 3, background: "#1A3A6B", borderRadius: 2, width: `${(activeStep / 3) * (100 - 7.5)}%`, transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)" }} />

              {steps.map((step, i) => (
                <div key={i} className="ta-step" onClick={() => setActiveStep(i)} style={{
                  flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
                  position: "relative", zIndex: 1
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%",
                    background: i <= activeStep ? "#1A3A6B" : "#ffffff",
                    border: `2px solid ${i <= activeStep ? "#1A3A6B" : "#e5e7eb"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                    transform: i === activeStep ? "scale(1.15)" : "scale(1)"
                  }}>
                    <step.Icon size={20} color={i <= activeStep ? "#ffffff" : "#9ca3af"} style={{ transition: "color 0.3s" }} />
                  </div>
                  <span style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 700,
                    color: i === activeStep ? "#1A3A6B" : "#9ca3af", transition: "color 0.3s",
                    textAlign: "center"
                  }}>{step.title}</span>
                </div>
              ))}
            </div>

            {/* Active step detail card */}
            <div style={{
              maxWidth: 700, margin: "0 auto",
              background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 20,
              padding: "40px 48px", position: "relative", overflow: "hidden",
              animation: "scaleIn 0.4s ease"
            }} key={activeStep}>
              {/* Decorative accent */}
              <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 4, background: steps[activeStep].color }} />
              <div style={{ display: "flex", alignItems: "flex-start", gap: 24 }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 16, background: "#D6E4F7",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                }}>
                  {(() => { const I = steps[activeStep].Icon; return <I size={28} color="#1A3A6B" /> })()}
                </div>
                <div>
                  <span style={{
                    display: "inline-block", background: "#D6E4F7", color: "#1A3A6B",
                    fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: 50,
                    fontFamily: "Inter", marginBottom: 12, letterSpacing: "0.05em"
                  }}>STEP {steps[activeStep].num}</span>
                  <h3 style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 24, fontWeight: 700, color: "#111111", margin: "8px 0 10px 0"
                  }}>{steps[activeStep].title}</h3>
                  <p style={{
                    fontFamily: "Inter, sans-serif", fontSize: 15, color: "#6b7280",
                    lineHeight: 1.7, margin: 0
                  }}>
                    {activeStep === 0 && "Gather your completed application form, equipment technical specs, a Type Approval certificate from ITU Region 1, and a manufacturer's Declaration of Conformity."}
                    {activeStep === 1 && "You must have a local repair centre or registered office in Botswana. This is mandatory — equipment must be serviceable locally."}
                    {activeStep === 2 && "Submit via BOCRA Connect or in person at Plot 50671, Independence Avenue, Gaborone. Pay the fee for your equipment category."}
                    {activeStep === 3 && "BOCRA assesses against Botswana spectrum allocation and ITU standards. Approved certificates are valid indefinitely."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ SECTION 4 — REQUIREMENTS & FEES (TABBED) ═══ */}
        <div ref={reqRef} style={{ background: "#f8f9fa", padding: "80px 0" }}>
          <div style={{
            maxWidth: 1280, margin: "0 auto", padding: "0 24px",
            display: "flex", gap: 48, flexWrap: "wrap",
            opacity: reqVis ? 1 : 0, transform: reqVis ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s cubic-bezier(0.4,0,0.2,1)"
          }}>
            {/* Left — Documents */}
            <div style={{ flex: "1 1 50%", minWidth: 320 }}>
              <SectionLabel>WHAT YOU NEED</SectionLabel>
              <h2 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 36, fontWeight: 700, color: "#111111", margin: "0 0 24px 0"
              }}>Required Documents</h2>

              {requiredDocs.map((doc, i) => (
                <div key={i} style={{
                  display: "flex", gap: 14, padding: "18px 0",
                  borderBottom: "1px solid #e5e7eb", alignItems: "flex-start",
                  opacity: reqVis ? 1 : 0, transform: reqVis ? "translateX(0)" : "translateX(-20px)",
                  transition: `all 0.5s ease ${i * 0.1 + 0.2}s`
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8, background: "#d1fae5",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                  }}>
                    <CheckCircle size={16} color="#0F6E56" />
                  </div>
                  <div>
                    <p style={{ fontFamily: "Inter", fontSize: 15, fontWeight: 600, color: "#111111", margin: 0 }}>
                      {doc.name}
                    </p>
                    <p style={{ fontFamily: "Inter", fontSize: 13, color: "#6b7280", margin: "4px 0 0 0" }}>
                      {doc.note}
                    </p>
                  </div>
                </div>
              ))}

              <div style={{
                display: "flex", alignItems: "center", gap: 12, padding: "18px 0",
                borderTop: "1px solid #e5e7eb"
              }}>
                <FileDown size={20} color="#1A3A6B" />
                <a href="#" style={{
                  fontFamily: "Inter", fontSize: 14, fontWeight: 600, color: "#1A3A6B",
                  textDecoration: "none", display: "flex", alignItems: "center", gap: 6
                }}>
                  Download Application Form <ArrowUpRight size={14} />
                </a>
                <span style={{
                  background: "#D6E4F7", color: "#1A3A6B", fontSize: 11,
                  fontWeight: 600, padding: "3px 10px", borderRadius: 50, fontFamily: "Inter"
                }}>Jan 2026</span>
              </div>
            </div>

            {/* Right — Fees */}
            <div style={{ flex: "1 1 45%", minWidth: 320 }}>
              <SectionLabel>FEE SCHEDULE</SectionLabel>
              <h2 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 36, fontWeight: 700, color: "#111111", margin: "0 0 24px 0"
              }}>Application Fees</h2>

              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "10px 0", fontSize: 12, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", fontFamily: "Inter", borderBottom: "1px solid #e5e7eb" }}>Equipment Type</th>
                    <th style={{ textAlign: "right", padding: "10px 0", fontSize: 12, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", fontFamily: "Inter", borderBottom: "1px solid #e5e7eb" }}>Fee (BWP)</th>
                  </tr>
                </thead>
                <tbody>
                  {feeRows.map((row, i) => (
                    <tr key={i} className="ta-row">
                      <td style={{ padding: "14px 0", fontFamily: "Inter", fontSize: 14, color: "#111111", borderBottom: "1px solid #e5e7eb" }}>{row.type}</td>
                      <td style={{ padding: "14px 0", fontFamily: "Inter", fontSize: 14, fontWeight: 600, color: "#1A3A6B", textAlign: "right", borderBottom: "1px solid #e5e7eb" }}>{row.fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p style={{ fontSize: 13, color: "#9ca3af", fontFamily: "Inter", marginTop: 16 }}>
                Non-refundable. Rejected applications may resubmit.
              </p>
            </div>
          </div>
        </div>

        {/* ═══ SECTION 5 — DEVICE REGISTRY ═══ */}
        <div ref={devRef} id="approved-devices" style={{ background: "#ffffff", padding: "80px 0" }}>
          <div style={{
            maxWidth: 1280, margin: "0 auto", padding: "0 24px",
            opacity: devVis ? 1 : 0, transform: devVis ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s cubic-bezier(0.4,0,0.2,1)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
              <div>
                <SectionLabel>APPROVED DEVICES REGISTRY</SectionLabel>
                <h2 style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 36, fontWeight: 700, color: "#111111", margin: 0
                }}>Search Certified Equipment</h2>
              </div>
              <p style={{ fontSize: 13, color: "#9ca3af", fontFamily: "Inter", margin: 0 }}>
                Updated quarterly · {approvedDevices.filter(d => d.status === "Approved").length} active
              </p>
            </div>

            {/* Search + Filter */}
            <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 260, position: "relative", display: "flex", alignItems: "center" }}>
                <Search size={16} color="#9ca3af" style={{ position: "absolute", left: 14 }} />
                <input
                  type="text" placeholder="Search brand, model, or approval number…"
                  value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                  style={{
                    width: "100%", border: "1px solid #e5e7eb", borderRadius: 12,
                    padding: "14px 16px 14px 40px", fontSize: 14, fontFamily: "Inter",
                    outline: "none", background: "#ffffff", color: "#111111",
                    transition: "border-color 0.2s"
                  }}
                  onFocus={e => e.target.style.borderColor = "#1A3A6B"}
                  onBlur={e => e.target.style.borderColor = "#e5e7eb"}
                />
              </div>
              <select
                value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
                style={{
                  border: "1px solid #e5e7eb", borderRadius: 12, padding: "14px 16px",
                  fontSize: 14, fontFamily: "Inter", background: "#ffffff", color: "#111111",
                  cursor: "pointer", outline: "none", minWidth: 180
                }}
              >
                {deviceCategories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Results */}
            {filteredDevices.length === 0 ? (
              <div style={{ textAlign: "center", padding: "64px 0" }}>
                <Search size={40} color="#e5e7eb" style={{ marginBottom: 16 }} />
                <p style={{ color: "#6b7280", fontSize: 15, fontFamily: "Inter" }}>
                  No devices found matching your search.
                </p>
              </div>
            ) : (
              <div style={{ overflowX: "auto", border: "1px solid #e5e7eb", borderRadius: 16 }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#f8f9fa" }}>
                      {["Approval No.", "Brand", "Model", "Category", "Date", "Status"].map(col => (
                        <th key={col} style={{
                          textAlign: "left", padding: "14px 16px", fontSize: 11, fontWeight: 600,
                          color: "#9ca3af", textTransform: "uppercase", fontFamily: "Inter",
                          whiteSpace: "nowrap", borderBottom: "1px solid #e5e7eb"
                        }}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDevices.map((d, i) => (
                      <tr key={i} className="ta-row" style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "14px 16px", fontSize: 13, fontFamily: "'Plus Jakarta Sans'", fontWeight: 600, color: "#1A3A6B", whiteSpace: "nowrap" }}>{d.approvalNo}</td>
                        <td style={{ padding: "14px 16px", fontSize: 14, fontFamily: "Inter", color: "#111111" }}>{d.brand}</td>
                        <td style={{ padding: "14px 16px", fontSize: 14, fontFamily: "Inter", color: "#111111" }}>{d.model}</td>
                        <td style={{ padding: "14px 16px", fontSize: 14, fontFamily: "Inter", color: "#6b7280" }}>{d.category}</td>
                        <td style={{ padding: "14px 16px", fontSize: 13, fontFamily: "Inter", color: "#9ca3af", whiteSpace: "nowrap" }}>{d.date}</td>
                        <td style={{ padding: "14px 16px" }}>
                          <span style={{
                            display: "inline-block",
                            background: d.status === "Approved" ? "#d1fae5" : "#fee2e2",
                            color: d.status === "Approved" ? "#0F6E56" : "#dc2626",
                            fontSize: 11, fontWeight: 600, padding: "4px 14px",
                            borderRadius: 50, fontFamily: "Inter"
                          }}>{d.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* ═══ SECTION 6 — FAQ ═══ */}
        <div ref={faqRef} style={{ background: "#f8f9fa", padding: "80px 0" }}>
          <div style={{
            maxWidth: 720, margin: "0 auto", padding: "0 24px",
            opacity: faqVis ? 1 : 0, transform: faqVis ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s cubic-bezier(0.4,0,0.2,1)"
          }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <SectionLabel>FAQ</SectionLabel>
              <h2 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 36, fontWeight: 700, color: "#111111", margin: 0
              }}>Common Questions</h2>
            </div>

            {faqData.map((faq, i) => (
              <div key={i} style={{
                borderBottom: "1px solid #e5e7eb",
                opacity: faqVis ? 1 : 0, transform: faqVis ? "translateY(0)" : "translateY(10px)",
                transition: `all 0.4s ease ${i * 0.07}s`
              }}>
                <button
                  className="ta-faq-btn"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%", display: "flex", justifyContent: "space-between",
                    alignItems: "center", padding: "20px 0", cursor: "pointer",
                    background: "none", border: "none", textAlign: "left"
                  }}
                >
                  <span className="ta-faq-q" style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 16, fontWeight: 600, color: openFaq === i ? "#1A3A6B" : "#111111",
                    transition: "color 0.2s", paddingRight: 16
                  }}>{faq.q}</span>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: openFaq === i ? "#D6E4F7" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, transition: "all 0.3s"
                  }}>
                    {openFaq === i
                      ? <ChevronUp size={18} color="#1A3A6B" />
                      : <ChevronDown size={18} color="#9ca3af" />
                    }
                  </div>
                </button>
                <div style={{
                  maxHeight: openFaq === i ? 200 : 0,
                  overflow: "hidden",
                  transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)"
                }}>
                  <p style={{
                    fontFamily: "Inter, sans-serif", fontSize: 15, color: "#6b7280",
                    lineHeight: 1.7, margin: 0, paddingBottom: 20
                  }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ SECTION 7 — CTA STRIP ═══ */}
        <div style={{ background: "#1A3A6B", padding: "80px 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
          {/* Decorative elements */}
          <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
          <div style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />

          <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, color: "#ffffff",
              margin: 0, lineHeight: 1.15
            }}>
              Ready to Get Your Device Certified?
            </h2>
            <p style={{
              fontFamily: "Inter", fontSize: 16, color: "rgba(255,255,255,0.6)",
              marginTop: 16, lineHeight: 1.6
            }}>
              Apply through BOCRA Connect or reach us at info@bocra.org.bw · +267 395 7755
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 36, flexWrap: "wrap" }}>
              <Link to="/portal/apply" style={{
                background: "#ffffff", color: "#1A3A6B", borderRadius: 50,
                padding: "14px 32px", fontWeight: 700, fontSize: 14,
                textDecoration: "none", fontFamily: "Inter", border: "none",
                display: "inline-flex", alignItems: "center", gap: 8,
                transition: "all 0.2s"
              }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-2px)" }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)" }}
              >
                Start Application <ArrowRight size={16} />
              </Link>
              <a href="#" style={{
                background: "transparent", color: "#ffffff", borderRadius: 50,
                padding: "14px 32px", fontWeight: 600, fontSize: 14,
                textDecoration: "none", fontFamily: "Inter",
                border: "1px solid rgba(255,255,255,0.3)",
                display: "inline-flex", alignItems: "center", gap: 8,
                transition: "all 0.2s"
              }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-2px)" }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)" }}
              >
                Download Form <FileDown size={15} />
                n              </a>
            </div>
          </div>
        </div>

      </div>
    </PageWrapper>
  )
}
