export default function KPICard({ label, value, change, changeLabel, icon:Icon, color='blue' }) {
  const iconColors = { blue:['#D6E4F7','#1A3A6B'], teal:['#d1fae5','#0F6E56'], amber:['#fef3c7','#b45309'], red:['#fee2e2','#b91c1c'] }
  const [ibg, ic] = iconColors[color] || iconColors.blue
  return (
    <div style={{ background:'white', borderRadius:16, border:'1px solid #e2e8f0', padding:24 }}>
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
        <div>
          <p style={{ fontSize:13, color:'#6b7280', marginBottom:4 }}>{label}</p>
          <p style={{ fontSize:32, fontWeight:700, color:'#111827', margin:0 }}>{value}</p>
          {change!==undefined && <p style={{ fontSize:12, marginTop:4, color:change>=0?'#16a34a':'#dc2626' }}>{change>=0?'+':''}{change} {changeLabel}</p>}
        </div>
        {Icon && <div style={{ background:ibg, color:ic, padding:12, borderRadius:10 }}><Icon size={20} /></div>}
      </div>
    </div>
  )
}
