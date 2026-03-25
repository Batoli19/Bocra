import { X } from 'lucide-react'
export default function Modal({ open, onClose, title, children, size='md' }) {
  if (!open) return null
  const maxW = { sm:440, md:540, lg:720, xl:960 }[size]
  return (
    <div style={{ position:'fixed', inset:0, zIndex:50, display:'flex', alignItems:'center', justifyContent:'center', padding:16 }}>
      <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.4)' }} onClick={onClose} />
      <div style={{ position:'relative', background:'white', borderRadius:16, boxShadow:'0 20px 60px rgba(0,0,0,0.15)', width:'100%', maxWidth:maxW, maxHeight:'90vh', overflow:'auto' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 24px', borderBottom:'1px solid #f1f5f9' }}>
          <h3 style={{ fontWeight:600, color:'#111827', margin:0 }}>{title}</h3>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', padding:4, borderRadius:8, color:'#6b7280' }}><X size={18} /></button>
        </div>
        <div style={{ padding:'16px 24px' }}>{children}</div>
      </div>
    </div>
  )
}
