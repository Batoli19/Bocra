const themes = {
  light: {
    background: 'linear-gradient(145deg, #0c1220 0%, #111827 55%, #1f2937 100%)',
    border: '1px solid rgba(15, 23, 42, 0.12)',
    shadow: '0 34px 80px rgba(15, 23, 42, 0.18)',
    overlay:
      'linear-gradient(135deg, rgba(5, 8, 22, 0.16) 0%, rgba(5, 8, 22, 0.06) 42%, rgba(5, 8, 22, 0.55) 100%)',
  },
  dark: {
    background: 'linear-gradient(145deg, #04070f 0%, #0a1628 45%, #0f172a 100%)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    shadow: '0 34px 80px rgba(2, 6, 23, 0.34)',
    overlay:
      'linear-gradient(145deg, rgba(5, 8, 22, 0.2) 0%, rgba(5, 8, 22, 0.08) 40%, rgba(5, 8, 22, 0.62) 100%)',
  },
  navy: {
    background: 'linear-gradient(145deg, #06101d 0%, #0a1628 52%, #10213b 100%)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    shadow: '0 34px 80px rgba(2, 6, 23, 0.36)',
    overlay:
      'linear-gradient(135deg, rgba(4, 10, 20, 0.2) 0%, rgba(4, 10, 20, 0.06) 35%, rgba(4, 10, 20, 0.64) 100%)',
  },
}

export default function HeroImagePanel({
  theme = 'light',
  minHeight = 320,
  style,
  className = '',
  pills = ['Digital infrastructure', 'Connected Botswana'],
}) {
  const palette = themes[theme] ?? themes.light

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        minHeight,
        width: '100%',
        borderRadius: 28,
        overflow: 'hidden',
        background: palette.background,
        border: palette.border,
        boxShadow: palette.shadow,
        isolation: 'isolate',
        ...style,
      }}
    >
      <img
        src="/bocra-hero-tech.png"
        alt="BOCRA digital infrastructure visual"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: palette.overlay,
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at top left, rgba(52, 211, 153, 0.24), transparent 32%), radial-gradient(circle at bottom right, rgba(255, 255, 255, 0.14), transparent 30%)',
          mixBlendMode: 'screen',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 20,
          right: 20,
          bottom: 18,
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          zIndex: 1,
        }}
      >
        {pills.map((pill) => (
          <span
            key={pill}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '8px 12px',
              borderRadius: 999,
              background: 'rgba(3, 7, 18, 0.62)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: 'rgba(255, 255, 255, 0.88)',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.01em',
              fontFamily: 'Inter, sans-serif',
              backdropFilter: 'blur(10px)',
            }}
          >
            {pill}
          </span>
        ))}
      </div>
    </div>
  )
}
