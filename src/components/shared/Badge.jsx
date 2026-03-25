const cfg = {
  active:       ['#f0fdf4','#166534','#bbf7d0'],
  approved:     ['#f0fdf4','#166534','#bbf7d0'],
  resolved:     ['#f0fdf4','#166534','#bbf7d0'],
  pending:      ['#fefce8','#854d0e','#fef08a'],
  under_review: ['#eff6ff','#1e40af','#bfdbfe'],
  received:     ['#eff6ff','#1e40af','#bfdbfe'],
  open:         ['#eff6ff','#1e40af','#bfdbfe'],
  rejected:     ['#fef2f2','#991b1b','#fecaca'],
  closed:       ['#f9fafb','#374151','#e5e7eb'],
  draft:        ['#f9fafb','#374151','#e5e7eb'],
}
export default function Badge({ status, label }) {
  const [bg, tc, bc] = cfg[status] || ['#f9fafb','#374151','#e5e7eb']
  return <span style={{ background:bg, color:tc, border:`1px solid ${bc}`, borderRadius:20, padding:'2px 10px', fontSize:12, fontWeight:500, display:'inline-flex', alignItems:'center' }}>{label||(status||'').replace(/_/g,' ')}</span>
}
