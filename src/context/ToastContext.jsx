import { createContext, useState, useCallback } from 'react'
export const ToastContext = createContext(null)
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const add = useCallback((message, type = 'info') => {
    const id = Date.now()
    setToasts(p => [...p, { id, message, type }])
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 4000)
  }, [])
  const toast = { success: m => add(m,'success'), error: m => add(m,'error'), info: m => add(m,'info') }
  const bg = { success:'#f0fdf4', error:'#fef2f2', info:'#eff6ff' }
  const tc = { success:'#166534', error:'#991b1b', info:'#1e40af' }
  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div style={{ position:'fixed', top:16, right:16, zIndex:9999, display:'flex', flexDirection:'column', gap:8 }}>
        {toasts.map(t => (
          <div key={t.id} style={{ background:bg[t.type], color:tc[t.type], border:`1px solid ${tc[t.type]}33`, borderRadius:12, padding:'10px 16px', fontSize:13, fontWeight:500, maxWidth:320, boxShadow:'0 2px 8px rgba(0,0,0,0.1)' }}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
