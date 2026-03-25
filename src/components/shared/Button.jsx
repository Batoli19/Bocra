import { Loader2 } from 'lucide-react'
const V = {
  primary:   { background:'#1A3A6B', color:'white', border:'none' },
  secondary: { background:'#D6E4F7', color:'#1A3A6B', border:'none' },
  ghost:     { background:'transparent', color:'#1A3A6B', border:'1px solid #1A3A6B' },
  danger:    { background:'#dc2626', color:'white', border:'none' },
  teal:      { background:'#0F6E56', color:'white', border:'none' },
}
const S = { sm:'6px 12px', md:'10px 20px', lg:'14px 28px' }
const FS = { sm:12, md:14, lg:16 }
export default function Button({ children, variant='primary', size='md', loading=false, disabled=false, fullWidth=false, icon:Icon, onClick, type='button', style={} }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled||loading}
      style={{ ...V[variant], padding:S[size], fontSize:FS[size], fontWeight:600, borderRadius:10, cursor:disabled||loading?'not-allowed':'pointer', opacity:disabled||loading?0.5:1, display:'inline-flex', alignItems:'center', gap:6, justifyContent:'center', width:fullWidth?'100%':'auto', transition:'opacity 0.15s', ...style }}>
      {loading ? <Loader2 size={16} style={{ animation:'spin 1s linear infinite' }} /> : Icon && <Icon size={16} />}
      {children}
    </button>
  )
}
