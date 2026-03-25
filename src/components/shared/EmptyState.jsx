import { Inbox } from 'lucide-react'
export default function EmptyState({ title='Nothing here yet', description='', action }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'64px 24px', textAlign:'center' }}>
      <div style={{ background:'#f1f5f9', borderRadius:16, padding:16, marginBottom:16 }}><Inbox size={32} color="#94a3b8" /></div>
      <h3 style={{ fontWeight:600, color:'#374151', marginBottom:4 }}>{title}</h3>
      {description && <p style={{ fontSize:14, color:'#9ca3af', maxWidth:280 }}>{description}</p>}
      {action && <div style={{ marginTop:16 }}>{action}</div>}
    </div>
  )
}
