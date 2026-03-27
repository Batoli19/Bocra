import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, X, UserX } from 'lucide-react'
import bocraSvg from '../../assets/bocra.svg'

export default function GuestAuthModal() {
  const { authModalTarget, closeAuthModal } = useAuth()
  const navigate = useNavigate()

  if (!authModalTarget) return null

  const handleContinue = () => {
    closeAuthModal()
    const redirectUrl = encodeURIComponent(authModalTarget)
    navigate(`/login?redirect=${redirectUrl}`)
  }

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Backdrop */}
      <div 
        onClick={closeAuthModal}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(5, 8, 22, 0.65)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          animation: 'fadeIn 0.2s ease-out'
        }}
      />

      {/* Modal Content */}
      <div 
        style={{
          position: 'relative',
          background: '#ffffff',
          borderRadius: 24,
          width: '100%',
          maxWidth: 440,
          boxShadow: '0 24px 64px rgba(0,0,0,0.2)',
          overflow: 'hidden',
          animation: 'scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <button
          onClick={closeAuthModal}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.04)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#64748b',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.08)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.04)'}
        >
          <X size={18} />
        </button>

        <div style={{ padding: '40px 32px 32px', textAlign: 'center' }}>
          <div 
            style={{
              width: 80,
              height: 80,
              borderRadius: 24,
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              border: '1px solid rgba(26,58,107,0.1)',
              boxShadow: '0 12px 32px rgba(26,58,107,0.08)'
            }}
          >
            <img 
              src={bocraSvg} 
              alt="BOCRA" 
              style={{ width: 56, height: 'auto', objectFit: 'contain' }} 
            />
          </div>

          <h2 
            style={{
              margin: '0 0 12px',
              fontSize: 24,
              fontWeight: 800,
              color: '#0b1f3a',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              letterSpacing: '-0.03em'
            }}
          >
            Authentication Required
          </h2>
          
          <p 
            style={{
              margin: '0 auto',
              fontSize: 15,
              lineHeight: 1.6,
              color: '#4b5563',
              maxWidth: '96%'
            }}
          >
            To access BOCRA's finest and perform secure actions like filing complaints or applying for licences, you need to login first.
          </p>

          <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <button
              onClick={handleContinue}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                width: '100%',
                padding: '16px 24px',
                borderRadius: 16,
                background: '#1A3A6B',
                color: '#ffffff',
                border: 'none',
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 4px 14px rgba(26,58,107,0.2)',
                letterSpacing: '0.01em'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(26,58,107,0.3)'
                e.currentTarget.style.background = '#14315c'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(26,58,107,0.2)'
                e.currentTarget.style.background = '#1A3A6B'
              }}
            >
              Continue to BOCRA Consumer Portal
              <ChevronRight size={18} />
            </button>
            
            <button
              onClick={closeAuthModal}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                width: '100%',
                padding: '16px 24px',
                borderRadius: 16,
                background: '#f8fafc',
                color: '#64748b',
                border: '1px solid #e2e8f0',
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#0f172a'
                e.currentTarget.style.background = '#f1f5f9'
                e.currentTarget.style.borderColor = '#cbd5e1'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#64748b'
                e.currentTarget.style.background = '#f8fafc'
                e.currentTarget.style.borderColor = '#e2e8f0'
              }}
            >
              <UserX size={18} />
              Stay in Guest Mode
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  )
}
