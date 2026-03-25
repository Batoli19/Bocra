import { Check } from 'lucide-react'
export default function StatusTimeline({ steps=[] }) {
  return (
    <div style={{ display:'flex', flexDirection:'column' }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display:'flex', gap:16 }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
            <div style={{ width:32, height:32, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, background:step.done?'#0F6E56':'#e5e7eb', color:step.done?'white':'#9ca3af' }}>
              {step.done ? <Check size={14} /> : <span style={{ fontSize:12 }}>{i+1}</span>}
            </div>
            {i < steps.length-1 && <div style={{ width:2, flex:1, minHeight:32, background:step.done?'#0F6E56':'#e5e7eb', margin:'4px 0' }} />}
          </div>
          <div style={{ paddingBottom:24 }}>
            <p style={{ fontSize:14, fontWeight:500, color:step.done?'#111827':'#9ca3af', margin:0 }}>{step.label}</p>
            {step.date && <p style={{ fontSize:12, color:'#9ca3af', marginTop:2 }}>{step.date}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}
