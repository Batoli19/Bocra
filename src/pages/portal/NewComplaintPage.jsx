import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, CheckCircle } from 'lucide-react'
import PageWrapper from '../../components/shared/PageWrapper'
import { useComplaints } from '../../context/ComplaintContext'

const steps = [
  { number: 1, label: 'Your Details' },
  { number: 2, label: 'The Issue' },
  { number: 3, label: 'Review & Submit' },
]

const inputBaseStyle = {
  width: '100%',
  padding: '12px 16px',
  border: '1px solid #e5e7eb',
  borderRadius: 10,
  fontSize: 15,
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'Inter, sans-serif',
}

const primaryButtonStyle = {
  width: '100%',
  border: 'none',
  borderRadius: 999,
  padding: '14px 20px',
  background: '#111111',
  color: '#ffffff',
  fontSize: 15,
  fontWeight: 700,
  cursor: 'pointer',
  fontFamily: 'Inter, sans-serif',
}

const ghostButtonStyle = {
  border: '1px solid #d1d5db',
  borderRadius: 999,
  padding: '14px 20px',
  background: '#ffffff',
  color: '#111111',
  fontSize: 15,
  fontWeight: 600,
  cursor: 'pointer',
  fontFamily: 'Inter, sans-serif',
}

const labelStyle = {
  display: 'block',
  marginBottom: 8,
  color: '#111827',
  fontSize: 14,
  fontWeight: 600,
  fontFamily: 'Inter, sans-serif',
}

const dividerStyle = {
  height: 1,
  background: '#e5e7eb',
  margin: '16px 0',
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

  const getFieldStyle = (field) => ({
    ...inputBaseStyle,
    borderColor: focusedField === field ? '#1A3A6B' : '#e5e7eb',
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
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '60px 24px' }}>
        {step !== 'success' && (
          <div style={{ marginBottom: 40, padding: '32px 0 0' }}>
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

        {step === 1 && (
          <section>
            <p style={{ margin: 0, color: '#9ca3af', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
              Step 1 of 3
            </p>
            <h1 style={{ margin: '12px 0 32px', fontSize: 28, fontWeight: 800, color: '#111111', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Tell us about yourself
            </h1>

            <div style={{ marginBottom: 20 }}>
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

            <div style={{ marginBottom: 20 }}>
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

            <div style={{ marginBottom: 20 }}>
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

            <div style={{ marginBottom: 28 }}>
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

            <button type="button" onClick={handleStepOne} style={primaryButtonStyle}>
              {"Continue ->"}
            </button>
          </section>
        )}

        {step === 2 && (
          <section>
            <h1 style={{ margin: '12px 0 32px', fontSize: 28, fontWeight: 800, color: '#111111', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              What happened?
            </h1>

            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Service Provider</label>
              <select
                value={formData.isp}
                onChange={(event) => updateField('isp', event.target.value)}
                onFocus={() => setFocusedField('isp')}
                onBlur={() => setFocusedField('')}
                style={getFieldStyle('isp')}
              >
                <option value="">Select provider</option>
                <option value="Mascom Wireless">Mascom Wireless</option>
                <option value="Orange Botswana">Orange Botswana</option>
                <option value="BeMobile">BeMobile</option>
                <option value="BTC Fibre">BTC Fibre</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Issue Category</label>
              <select
                value={formData.category}
                onChange={(event) => updateField('category', event.target.value)}
                onFocus={() => setFocusedField('category')}
                onBlur={() => setFocusedField('')}
                style={getFieldStyle('category')}
              >
                <option value="">Select category</option>
                <option value="Billing Dispute">Billing Dispute</option>
                <option value="Poor Coverage">Poor Coverage</option>
                <option value="Slow Speeds">Slow Speeds</option>
                <option value="Unfair Disconnection">Unfair Disconnection</option>
                <option value="Privacy Violation">Privacy Violation</option>
                <option value="Misleading Advertising">Misleading Advertising</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div style={{ marginBottom: 20 }}>
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
              <button type="button" onClick={() => setStep(1)} style={{ ...ghostButtonStyle, width: 'auto' }}>
                {'<- Back'}
              </button>
              <button type="button" onClick={handleStepTwo} style={primaryButtonStyle}>
                {"Continue ->"}
              </button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section>
            <h1 style={{ margin: '12px 0 10px', fontSize: 28, fontWeight: 800, color: '#111111', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Review your complaint
            </h1>
            <p style={{ margin: '0 0 24px', color: '#6b7280', fontSize: 15, lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
              Please check everything is correct before submitting.
            </p>

            <div style={{ border: '1px solid #e5e7eb', borderRadius: 16, padding: 28 }}>
              {[
                ['Full Name', formData.name],
                ['Phone Number', formData.phone],
                ['Email Address', formData.email || 'Not provided'],
                ['Location/Town', formData.location || 'Not provided'],
                ['Service Provider', formData.isp],
                ['Issue Category', formData.category],
                ['Description', formData.description],
                ['Contacted Provider First', formData.contactedProvider || 'Not specified'],
              ].map(([label, value], index, items) => (
                <div key={label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'flex-start' }}>
                    <span style={{ color: '#6b7280', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>{label}</span>
                    <span style={{ color: '#111111', fontSize: 14, fontWeight: 700, textAlign: 'right', whiteSpace: 'pre-wrap', fontFamily: 'Inter, sans-serif' }}>
                      {value}
                    </span>
                  </div>
                  {index < items.length - 1 && <div style={dividerStyle} />}
                </div>
              ))}
            </div>

            <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginTop: 24, color: '#374151', fontSize: 14, lineHeight: 1.6, fontFamily: 'Inter, sans-serif', cursor: 'pointer' }}>
              <input type="checkbox" checked={agreed} onChange={(event) => setAgreed(event.target.checked)} style={{ marginTop: 3 }} />
              <span>I confirm this complaint is accurate and I consent to BOCRA processing my personal data under the Data Protection Act 2018.</span>
            </label>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
              <button type="button" onClick={() => setStep(2)} style={ghostButtonStyle}>
                {'<- Edit'}
              </button>
              <button type="button" onClick={handleSubmit} style={{ ...primaryButtonStyle, background: '#1A3A6B' }}>
                Submit Complaint
              </button>
            </div>
          </section>
        )}

        {step === 'success' && (
          <section style={{ textAlign: 'center', padding: '36px 0 12px' }}>
            <div style={{ width: 80, height: 80, background: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
              <CheckCircle size={40} color="#16a34a" />
            </div>
            <h1 style={{ margin: '24px 0 10px', fontSize: 34, fontWeight: 800, color: '#111111', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Complaint Submitted
            </h1>
            <p style={{ margin: 0, color: '#6b7280', fontSize: 15, lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>
              Your complaint has been received and will be reviewed within 48 hours.
            </p>

            <div style={{ background: '#f8f9fa', borderRadius: 12, padding: 20, textAlign: 'center', marginTop: 24 }}>
              <p style={{ margin: 0, color: '#9ca3af', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                YOUR REFERENCE NUMBER
              </p>
              <p style={{ margin: '10px 0 8px', color: '#1A3A6B', fontSize: 28, fontWeight: 800, letterSpacing: '2px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {submittedRef}
              </p>
              <p style={{ margin: 0, color: '#6b7280', fontSize: 13, fontFamily: 'Inter, sans-serif' }}>
                Save this number to track your complaint status
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
              <button type="button" onClick={() => navigate(`/portal/complaints?ref=${encodeURIComponent(submittedRef)}`)} style={{ ...primaryButtonStyle, background: '#1A3A6B' }}>
                {"Track This Complaint ->"}
              </button>
              <button type="button" onClick={() => navigate('/')} style={ghostButtonStyle}>
                Return Home
              </button>
            </div>
          </section>
        )}
      </div>
    </PageWrapper>
  )
}
