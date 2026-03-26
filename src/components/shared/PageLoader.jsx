import { useEffect, useState } from 'react'

const DOT_COLORS = ['#E63946', '#F4A261', '#2A9D8F', '#1A3A6B']

export default function PageLoader() {
  const [visible, setVisible] = useState(true)
  const [hiding, setHiding] = useState(false)

  useEffect(() => {
    if (!visible) return undefined

    const timer = window.setTimeout(() => {
      setHiding(true)
    }, 3500)

    return () => window.clearTimeout(timer)
  }, [visible])

  const handleTransitionEnd = (event) => {
    if (event.target !== event.currentTarget || !hiding) return

    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      onTransitionEnd={handleTransitionEnd}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0,
        opacity: hiding ? 0 : 1,
        transition: 'opacity 0.4s ease',
        pointerEvents: hiding ? 'none' : 'all',
      }}
    >
      <div style={{ display: 'flex', gap: 10 }}>
        {DOT_COLORS.map((color, index) => (
          <div
            key={color}
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: color,
              opacity: 0,
              transform: 'translateY(12px) scale(0.6)',
              animation: 'dotReveal 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
              animationDelay: `${index * 120}ms`,
            }}
          />
        ))}
      </div>

      <div style={{ marginTop: 16, textAlign: 'center' }}>
        <p
          style={{
            margin: 0,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 28,
            fontWeight: 800,
            color: '#111111',
            letterSpacing: '-0.03em',
            opacity: 0,
            animation: 'fadeIn 0.5s ease forwards',
            animationDelay: '500ms',
          }}
        >
          BOCRA
        </p>
        <p
          style={{
            margin: '6px 0 0',
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            fontWeight: 600,
            color: '#9ca3af',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            opacity: 0,
            animation: 'fadeIn 0.4s ease forwards',
            animationDelay: '700ms',
          }}
        >
          Connect
        </p>
      </div>

      <div
        style={{
          marginTop: 32,
          width: 120,
          height: 2,
          background: '#f0f0f0',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: 0,
            height: '100%',
            borderRadius: 2,
            background:
              'linear-gradient(90deg, #E63946, #F4A261, #2A9D8F, #1A3A6B)',
            animation: 'progressFill 1s ease forwards',
            animationDelay: '600ms',
          }}
        />
      </div>
    </div>
  )
}
