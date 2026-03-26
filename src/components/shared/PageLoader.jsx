import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const DOT_COLORS = ['#E63946', '#F4A261', '#2A9D8F', '#1A3A6B']

export default function PageLoader() {
  const [visible, setVisible] = useState(true)
  const [hiding, setHiding] = useState(false)
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Loading...')
  const [readyToHide, setReadyToHide] = useState(false)

  const isInitialLoad = useRef(true)
  const location = useLocation()

  useEffect(() => {
    setVisible(true)
    setHiding(false)
    setProgress(0)
    setLoadingText('Loading...')
    setReadyToHide(false)

    let minTimeDone = false
    let imagesDone = false
    const imageListeners = []

    const tryHide = () => {
      if (minTimeDone && imagesDone) {
        setProgress(100)
        setLoadingText('Done.')
        setReadyToHide(true)
      }
    }

    const markImagesDone = () => {
      imagesDone = true
      setProgress(100)
      setLoadingText('Done.')
      tryHide()
    }

    const minTimer = window.setTimeout(() => {
      minTimeDone = true
      tryHide()
    }, isInitialLoad.current ? 1800 : 500)

    const checkImages = () => {
      const images = Array.from(document.querySelectorAll('img'))

      if (images.length === 0) {
        markImagesDone()
        return
      }

      const unloaded = images.filter((img) => !img.complete)

      if (unloaded.length === 0) {
        markImagesDone()
        return
      }

      setProgress((prev) => Math.max(prev, 75))

      let loadedCount = 0
      const onLoad = () => {
        loadedCount += 1
        if (loadedCount >= unloaded.length) {
          markImagesDone()
        }
      }

      unloaded.forEach((img) => {
        img.addEventListener('load', onLoad, { once: true })
        img.addEventListener('error', onLoad, { once: true })
        imageListeners.push(() => {
          img.removeEventListener('load', onLoad)
          img.removeEventListener('error', onLoad)
        })
      })
    }

    const imageCheckTimer = window.setTimeout(checkImages, 100)

    const safetyTimer = window.setTimeout(() => {
      imagesDone = true
      minTimeDone = true
      setProgress(100)
      setLoadingText('Done.')
      tryHide()
    }, 6000)

    return () => {
      window.clearTimeout(minTimer)
      window.clearTimeout(imageCheckTimer)
      window.clearTimeout(safetyTimer)
      imageListeners.forEach((removeListener) => removeListener())
    }
  }, [location.pathname])

  useEffect(() => {
    if (!visible) return undefined

    const rampOne = window.setTimeout(() => {
      setProgress(30)
    }, 100)

    const rampTwo = window.setTimeout(() => {
      setProgress(60)
      setLoadingText('Almost ready...')
    }, isInitialLoad.current ? 800 : 250)

    return () => {
      window.clearTimeout(rampOne)
      window.clearTimeout(rampTwo)
    }
  }, [visible])

  useEffect(() => {
    if (progress !== 100 || !readyToHide) return undefined

    const hideTimer = window.setTimeout(() => {
      setHiding(true)
    }, 300)

    return () => window.clearTimeout(hideTimer)
  }, [progress, readyToHide])

  const handleTransitionEnd = (event) => {
    if (event.target !== event.currentTarget || !hiding) return

    isInitialLoad.current = false
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
            width: `${progress}%`,
            height: '100%',
            borderRadius: 2,
            background:
              'linear-gradient(90deg, #E63946, #F4A261, #2A9D8F, #1A3A6B)',
            transition: 'width 0.4s ease',
          }}
        />
      </div>

      <p
        style={{
          margin: '10px 0 0',
          fontFamily: "'Inter', sans-serif",
          fontSize: 11,
          fontWeight: 400,
          color: '#9ca3af',
          textAlign: 'center',
          letterSpacing: '0.04em',
          transition: 'opacity 0.3s ease',
        }}
      >
        {loadingText}
      </p>
    </div>
  )
}
