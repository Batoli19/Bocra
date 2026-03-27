import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { Shield, Lock, ChevronRight, X } from 'lucide-react'

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

        <div style={{ padding: '40px 32px 32px' }}>
          <div 
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: '#f0fdf4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24,
              border: '1px solid #dcfce7'
            }}
          >
            <Shield size={28} color="#16a34a" />
          </div>

          <h2 
            style={{
              margin: '0 0 12px',
              fontSize: 22,
              fontWeight: 700,
              color: '#0f172a',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              letterSpacing: '-0.02em'
            }}
          >
            Authentication Required
          </h2>
          
          <p 
            style={{
              margin: 0,
              fontSize: 15,
              lineHeight: 1.6,
              color: '#475569'
            }}
          >
            To access the best of BOCRA and perform secure actions like filing complaints or applying for licences, you must be logged in.
          </p>

          <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button
              onClick={handleContinue}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                width: '100%',
                padding: '14px 24px',
                borderRadius: 14,
                background: '#1A3A6B',
                color: '#ffffff',
                border: 'none',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 4px 12px rgba(26,58,107,0.15)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(26,58,107,0.25)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(26,58,107,0.15)'
              }}
            >
              Continue to Login
              <ChevronRight size={18} />
            </button>
            
            <button
              onClick={closeAuthModal}
              style={{
                width: '100%',
                padding: '14px 24px',
                borderRadius: 14,
                background: 'transparent',
                color: '#64748b',
                border: 'none',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#0f172a'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
            >
              Cancel
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
