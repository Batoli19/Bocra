import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, CheckCircle, Clock, DollarSign, HelpCircle, PhoneOff, Shield, ShieldX, WifiOff, Zap } from 'lucide-react'
import PageWrapper from '../../components/shared/PageWrapper'
import { useComplaints } from '../../context/ComplaintContext'

const steps = [
  { number: 1, label: 'Your Details' },
  { number: 2, label: 'The Issue' },
  { number: 3, label: 'Review & Submit' },
]

const providerTiles = [
  { title: 'Mascom Wireless', sub: 'Mascom network', value: 'Mascom Wireless', color: '#1A3A6B' },
  { title: 'Orange Botswana', sub: 'Orange network', value: 'Orange Botswana', color: '#ea580c' },
  { title: 'BTC Botswana', sub: 'BTC / Fibre', value: 'BTC Botswana', color: '#0F6E56' },
  { title: 'BOFINET', sub: 'National ISP', value: 'BOFINET', color: '#7c3aed' },
]

const categoryTiles = [
  { label: 'Slow Speeds', value: 'Slow Speeds', icon: Zap },
  { label: 'Call Drops', value: 'Call Drops', icon: PhoneOff },
  { label: 'Billing Dispute', value: 'Billing Dispute', icon: DollarSign },
  { label: 'No Service', value: 'No Service', icon: WifiOff },
  { label: 'Fraud / Scam', value: 'Fraud / Scam', icon: ShieldX },
  { label: 'Other', value: 'Other', icon: HelpCircle },
]

const promiseRows = [
  {
    icon: Shield,
    text: 'Your data is protected under the Data Protection Act 2018',
  },
  {
    icon: Clock,
    text: 'BOCRA responds within 48 hours of receiving your complaint',
  },
  {
    icon: CheckCircle,
    text: '98% of complaints resolved within 30 days',
  },
]

const inputBaseStyle = {
  width: '100%',
  padding: '13px 16px',
  border: '1.5px solid #e5e7eb',
  borderRadius: 10,
  fontSize: 15,
  color: '#111111',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  fontFamily: 'Inter, sans-serif',
}

const primaryButtonStyle = {
  width: '100%',
  border: 'none',
  borderRadius: 10,
  padding: '15px',
  background: '#1A3A6B',
  color: '#ffffff',
  fontSize: 16,
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'opacity 0.2s ease, transform 0.1s ease',
  fontFamily: "'Plus Jakarta Sans', sans-serif",
}

const ghostButtonStyle = {
  border: '1.5px solid #e5e7eb',
  borderRadius: 10,
  padding: '13px 24px',
  background: '#ffffff',
  color: '#6b7280',
  fontSize: 15,
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'border-color 0.2s ease, color 0.2s ease',
  fontFamily: 'Inter, sans-serif',
}

const labelStyle = {
  display: 'block',
  marginBottom: 6,
  color: '#374151',
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: '0.01em',
  fontFamily: 'Inter, sans-serif',
}

export default function NewComplaintPage() {
  const navigate = useNavigate()
  const { addComplaint } = useComplaints()
  const [step, setStep] = useState(1)
  const [focusedField, setFocusedField] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [submittedRef, setSubmittedRef] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    isp: '',
    category: '',
    description: '',
    contactedProvider: '',
  })

  const contextCopy = step === 1
    ? {
        headline: 'File a complaint in 3 minutes.',
        body: 'No login required. BOCRA will investigate your complaint and respond within 48 hours.',
      }
    : step === 2
      ? {
          headline: 'Tell us what went wrong.',
          body: 'Select your provider and describe the issue clearly — this helps BOCRA investigate faster.',
        }
      : {
          headline: 'Almost there.',
          body: 'Review your details before submitting. Your reference number will be generated instantly.',
        }
  const contextPanelCopy = {
    headline: contextCopy.headline,
    body: step === 2
      ? 'Select your provider and describe the issue clearly - this helps BOCRA investigate faster.'
      : contextCopy.body,
  }

  const getFieldStyle = (field) => ({
    ...inputBaseStyle,
    borderColor: focusedField === field ? '#1A3A6B' : '#e5e7eb',
    boxShadow: focusedField === field ? '0 0 0 3px rgba(26,58,107,0.08)' : 'none',
  })

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleStepOne = () => {
    if (!formData.name.trim() || !formData.phone.trim()) {
      return
    }

    setStep(2)
  }

  const handleStepTwo = () => {
    if (!formData.isp || !formData.category || !formData.description.trim()) {
      return
    }

    setStep(3)
  }

  const handleSubmit = () => {
    if (!agreed) {
      return
    }

    const ref = addComplaint(formData)
    setSubmittedRef(ref)
    setStep('success')
  }

  return (
    <PageWrapper fullWidth wrapperStyle={{ background: '#ffffff' }}>
      <>
        <section
          style={{
            background:
              "linear-gradient(rgba(10,22,40,0.18), rgba(10,22,40,0.28)), url('/Gemini_Generated_Image_ot2t2sot2t2sot2t.png') center/cover no-repeat",
            padding: '80px 0 0',
          }}
        >
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
              FILE A COMPLAINT
            </p>
            <h1 style={{ margin: '16px 0 0', color: '#ffffff', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              File a Complaint
              <br />
              with BOCRA.
            </h1>
            <p style={{ margin: '16px 0 0', maxWidth: 520, color: 'rgba(255,255,255,0.55)', fontSize: 17, lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
              No login required. Describe your issue and BOCRA will investigate your complaint within 48 hours - for free.
            </p>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 28 }}>
              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 50, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Shield size={14} color="rgba(255,255,255,0.5)" />
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>Data Protection Act 2018</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 50, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Clock size={14} color="rgba(255,255,255,0.5)" />
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>48hr response guarantee</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 50, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle size={14} color="rgba(255,255,255,0.5)" />
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>98% resolution rate</span>
              </div>
            </div>

            {step !== 'success' && (
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: 50,
                  padding: '8px 24px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0,
                  marginTop: 48,
                  marginBottom: -32,
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0 }}>
                  {steps.map((item, index) => {
                    const isActive = step === item.number;
                    const isCompleted = typeof step === 'number' && step > item.number;

                    const col = (
                      <div key={`col-${item.number}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: 14,
                            fontWeight: 700,
                            background: isCompleted ? '#0F6E56' : isActive ? '#1A3A6B' : '#ffffff',
                            color: isCompleted || isActive ? '#ffffff' : '#9ca3af',
                            border: isCompleted || isActive ? 'none' : '2px solid #e5e7eb',
                          }}
                        >
                          {isCompleted ? <Check size={16} color="#ffffff" /> : item.number}
                        </div>
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 12,
                            fontWeight: isActive ? 600 : 400,
                            color: isActive ? '#111111' : isCompleted ? '#0F6E56' : '#9ca3af',
                            marginTop: 8,
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item.label}
                        </span>
                      </div>
                    );

                    if (index === steps.length - 1) {
                      return col;
                    }

                    const line = (
                      <div
                        key={`line-${item.number}`}
                        style={{
                          height: 2,
                          flex: 1,
                          maxWidth: 80,
                          margin: '0 8px',
                          background: isCompleted ? '#0F6E56' : '#e5e7eb',
                        }}
                      />
                    );

                    return [col, line];
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

        <section style={{ background: '#ffffff', padding: '64px 0 80px' }}>
          <div className="complaint-form-panel" style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>

        {step === 1 && (
          <section>
            <p style={{ margin: '0 0 8px', color: '#9ca3af', fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
              Step 1 of 3
            </p>
            <h1 style={{ margin: '0 0 32px', fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: '#111111', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Tell us about yourself
            </h1>

            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(event) => updateField('name', event.target.value)}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField('')}
                style={getFieldStyle('name')}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Phone Number</label>
              <input
                type="text"
                placeholder="e.g. 71234567"
                value={formData.phone}
                onChange={(event) => updateField('phone', event.target.value)}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField('')}
                style={getFieldStyle('phone')}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Email Address</label>
              <input
                type="email"
                placeholder="Optional"
                value={formData.email}
                onChange={(event) => updateField('email', event.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField('')}
                style={getFieldStyle('email')}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Location/Town</label>
              <input
                type="text"
                value={formData.location}
                onChange={(event) => updateField('location', event.target.value)}
                onFocus={() => setFocusedField('location')}
                onBlur={() => setFocusedField('')}
                style={getFieldStyle('location')}
              />
            </div>

            <button type="button" onClick={handleStepOne} className="complaint-primary-button" style={{ ...primaryButtonStyle, marginTop: 8 }}>
              {"Continue ->"}
            </button>
          </section>
        )}

        {step === 2 && (
          <section>
            <p style={{ margin: '0 0 8px', color: '#9ca3af', fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
              Step 2 of 3
            </p>
            <h1 style={{ margin: '0 0 32px', fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: '#111111', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              What happened?
            </h1>

            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Service Provider</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
                {providerTiles.map((provider) => {
                  const selected = formData.isp === provider.value
                  return (
                    <button
                      key={provider.value}
                      type="button"
                      onClick={() => updateField('isp', provider.value)}
                      className={`complaint-provider-tile${selected ? ' is-selected' : ''}`}
                      style={{
                        position: 'relative',
                        border: selected ? '2px solid #1A3A6B' : '1.5px solid #e5e7eb',
                        borderRadius: 12,
                        padding: '16px 20px 16px 18px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        background: selected ? '#f8fbff' : '#ffffff',
                        textAlign: 'left',
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: 4,
                          borderRadius: '12px 0 0 12px',
                          background: provider.color,
                        }}
                      />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ color: '#111111', fontSize: 15, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{provider.title}</div>
                        <div style={{ marginTop: 2, color: '#9ca3af', fontSize: 12, fontFamily: 'Inter, sans-serif' }}>{provider.sub}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Issue Category</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
                {categoryTiles.map(({ label, value, icon: Icon }) => {
                  const selected = formData.category === value
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => updateField('category', value)}
                      className={`complaint-category-tile${selected ? ' is-selected' : ''}`}
                      style={{
                        border: selected ? '2px solid #1A3A6B' : '1.5px solid #e5e7eb',
                        borderRadius: 12,
                        padding: '16px 14px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        background: selected ? '#f8fbff' : '#ffffff',
                      }}
                    >
                      <div style={{ width: 36, height: 36, background: '#f8f9fa', borderRadius: 8, margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={18} color="#1A3A6B" />
                      </div>
                      <div style={{ color: '#111111', fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{label}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>Description</label>
              <textarea
                rows={5}
                placeholder="Describe your issue in as much detail as possible - dates, amounts, what you were told..."
                value={formData.description}
                onChange={(event) => updateField('description', event.target.value)}
                onFocus={() => setFocusedField('description')}
                onBlur={() => setFocusedField('')}
                style={{ ...getFieldStyle('description'), resize: 'none' }}
              />
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle}>Did you contact the provider first?</label>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {['Yes', 'No'].map((choice) => {
                  const selected = formData.contactedProvider === choice
                  return (
                    <button
                      key={choice}
                      type="button"
                      onClick={() => updateField('contactedProvider', choice)}
                      style={{
                        border: selected ? '1px solid #1A3A6B' : '1px solid #d1d5db',
                        borderRadius: 999,
                        padding: '10px 18px',
                        background: selected ? '#1A3A6B' : '#ffffff',
                        color: selected ? '#ffffff' : '#111827',
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {choice}
                    </button>
                  )
                })}
              </div>

              {formData.contactedProvider === 'No' && (
                <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 12, padding: 16, marginTop: 8, color: '#92400e', fontSize: 14, lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
                  BOCRA requires you to first contact your provider. We recommend calling their customer service before filing. You can still proceed.
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <button type="button" onClick={() => setStep(1)} className="complaint-ghost-button" style={{ ...ghostButtonStyle, width: 'auto' }}>
                {'<- Back'}
              </button>
              <button type="button" onClick={handleStepTwo} className="complaint-primary-button" style={primaryButtonStyle}>
                {"Continue ->"}
              </button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section>
            <p style={{ margin: '0 0 8px', color: '#9ca3af', fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
              Step 3 of 3
            </p>
            <h1 style={{ margin: '0 0 10px', fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', color: '#111111', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Review your complaint
            </h1>
            <p style={{ margin: '0 0 24px', color: '#6b7280', fontSize: 15, lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
              Please check everything is correct before submitting.
            </p>

            <div>
              <div style={{ marginBottom: 16, color: '#9ca3af', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                YOUR DETAILS
              </div>
              {[
                ['Full Name', formData.name],
                ['Phone Number', formData.phone],
                ['Email Address', formData.email || 'Not provided'],
                ['Location/Town', formData.location || 'Not provided'],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'flex-start', padding: '14px 0', borderBottom: '1px solid #f3f4f6' }}>
                  <span style={{ color: '#6b7280', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>{label}</span>
                  <span style={{ color: '#111111', fontSize: 14, fontWeight: 600, textAlign: 'right', whiteSpace: 'pre-wrap', fontFamily: 'Inter, sans-serif' }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 28 }}>
              <div style={{ marginBottom: 16, color: '#9ca3af', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                THE COMPLAINT
              </div>
              {[
                ['Service Provider', formData.isp],
                ['Issue Category', formData.category],
                ['Description', formData.description],
                ['Contacted Provider First', formData.contactedProvider || 'Not specified'],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'flex-start', padding: '14px 0', borderBottom: '1px solid #f3f4f6' }}>
                  <span style={{ color: '#6b7280', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>{label}</span>
                  <span style={{ color: '#111111', fontSize: 14, fontWeight: 600, textAlign: 'right', whiteSpace: 'pre-wrap', fontFamily: 'Inter, sans-serif' }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginTop: 24, color: '#374151', fontSize: 14, lineHeight: 1.5, fontFamily: 'Inter, sans-serif', cursor: 'pointer' }}>
              <span style={{ position: 'relative', width: 18, height: 18, minWidth: 18, marginTop: 1 }}>
                <input type="checkbox" checked={agreed} onChange={(event) => setAgreed(event.target.checked)} style={{ position: 'absolute', inset: 0, opacity: 0, margin: 0, cursor: 'pointer' }} />
                <span style={{ width: 18, height: 18, border: '1.5px solid #e5e7eb', borderRadius: 4, background: agreed ? '#1A3A6B' : '#ffffff', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {agreed && <Check size={12} color="#ffffff" />}
                </span>
              </span>
              <span>I confirm this complaint is accurate and I consent to BOCRA processing my personal data under the Data Protection Act 2018.</span>
            </label>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
              <button type="button" onClick={() => setStep(2)} className="complaint-ghost-button" style={ghostButtonStyle}>
                {'<- Edit'}
              </button>
              <button type="button" onClick={handleSubmit} className="complaint-primary-button" style={primaryButtonStyle}>
                {'Submit Complaint ->'}
              </button>
            </div>
          </section>
        )}

        {step === 'success' && (
          <section style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{ width: 72, height: 72, background: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <CheckCircle size={36} color="#0F6E56" />
            </div>
            <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em', color: '#111111', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Complaint Submitted
            </h1>
            <p style={{ margin: '8px 0 0', color: '#6b7280', fontSize: 16, lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
              BOCRA will review your complaint and respond within 48 hours.
            </p>

            <div style={{ background: '#0a1628', borderRadius: 16, padding: 28, textAlign: 'center', marginTop: 32 }}>
              <p style={{ margin: '0 0 12px', color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                YOUR REFERENCE NUMBER
              </p>
              <p style={{ margin: 0, color: '#ffffff', fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {submittedRef}
              </p>
              <p style={{ margin: '8px 0 0', color: 'rgba(255,255,255,0.4)', fontSize: 13, fontFamily: 'Inter, sans-serif' }}>
                Save this number to track your complaint
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 28 }}>
              <button type="button" onClick={() => navigate(`/portal/complaints?ref=${encodeURIComponent(submittedRef)}`)} className="complaint-primary-button" style={{ ...primaryButtonStyle, fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 15 }}>
                {"Track This Complaint ->"}
              </button>
              <button type="button" onClick={() => navigate('/')} className="complaint-ghost-button" style={{ ...ghostButtonStyle, width: '100%' }}>
                Return Home
              </button>
            </div>
          </section>
        )}

            <style>{`
            .complaint-primary-button:hover {
              opacity: 0.88;
              transform: translateY(-1px);
            }

            .complaint-primary-button:active {
              transform: scale(0.99);
            }

            .complaint-ghost-button:hover {
              border-color: #1A3A6B !important;
              color: #111111 !important;
            }

            .complaint-provider-tile,
            .complaint-category-tile {
              transition: all 0.15s ease;
            }

            .complaint-provider-tile:hover,
            .complaint-category-tile:hover {
              border-color: #1A3A6B !important;
              transform: translateY(-1px);
            }

            @media (max-width: 720px) {
              .complaint-form-panel {
                padding-inline: 20px !important;
              }

              .complaint-provider-tile,
              .complaint-category-tile {
                min-height: auto;
              }
            }
          `}</style>
          </div>
        </section>
      </>
    </PageWrapper>
  )
}
