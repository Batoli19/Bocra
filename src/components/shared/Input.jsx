export default function Input({ label, error, icon:Icon, style={}, ...props }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
      {label && <label style={{ fontSize:14, fontWeight:500, color:'#374151' }}>{label}</label>}
      <div style={{ position:'relative' }}>
        {Icon && <div style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'#9ca3af' }}><Icon size={16} /></div>}
        <input {...props} style={{ width:'100%', border:`1px solid ${error?'#f87171':'#d1d5db'}`, borderRadius:8, padding: Icon?'10px 12px 10px 34px':'10px 12px', fontSize:14, outline:'none', boxSizing:'border-box', ...style }}
          onFocus={e=>{e.target.style.borderColor='#1A3A6B';e.target.style.boxShadow='0 0 0 2px #D6E4F7'}}
          onBlur={e=>{e.target.style.borderColor=error?'#f87171':'#d1d5db';e.target.style.boxShadow='none'}} />
      </div>
      {error && <p style={{ fontSize:12, color:'#dc2626', margin:0 }}>{error}</p>}
    </div>
  )
}
