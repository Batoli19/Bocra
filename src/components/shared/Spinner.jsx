export default function Spinner({ size='md' }) {
  const s = { sm:16, md:32, lg:48 }[size]
  return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', padding:48 }}>
      <div style={{ width:s, height:s, border:'3px solid #e2e8f0', borderTopColor:'#1A3A6B', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
      <style>{'@keyframes spin{to{transform:rotate(360deg)}}'}</style>
    </div>
  )
}
