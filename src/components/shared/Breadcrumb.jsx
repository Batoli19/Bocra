import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
export default function Breadcrumb({ items=[] }) {
  return (
    <nav style={{ display:'flex', alignItems:'center', gap:4, fontSize:14, color:'#6b7280', marginBottom:24 }}>
      {items.map((item, i) => (
        <span key={i} style={{ display:'flex', alignItems:'center', gap:4 }}>
          {i > 0 && <ChevronRight size={14} color="#d1d5db" />}
          {item.href ? <Link to={item.href} style={{ color:'#6b7280', textDecoration:'none' }}>{item.label}</Link> : <span style={{ color:'#111827', fontWeight:500 }}>{item.label}</span>}
        </span>
      ))}
    </nav>
  )
}
