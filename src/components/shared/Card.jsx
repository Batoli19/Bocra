export default function Card({ children, className='', onClick, hover=false, style={} }) {
  return (
    <div onClick={onClick}
      style={{ background:'white', borderRadius:16, border:'1px solid #e2e8f0', cursor:onClick?'pointer':'default', transition:'box-shadow 0.15s, border-color 0.15s', ...style }}
      onMouseEnter={hover?e=>{e.currentTarget.style.boxShadow='0 4px 12px rgba(0,0,0,0.08)';e.currentTarget.style.borderColor='#cbd5e1'}:null}
      onMouseLeave={hover?e=>{e.currentTarget.style.boxShadow='none';e.currentTarget.style.borderColor='#e2e8f0'}:null}
      className={className}>
      {children}
    </div>
  )
}
Card.Header = ({children,style={}}) => <div style={{padding:'16px 24px',borderBottom:'1px solid #f1f5f9',...style}}>{children}</div>
Card.Body   = ({children,style={}}) => <div style={{padding:'16px 24px',...style}}>{children}</div>
Card.Footer = ({children,style={}}) => <div style={{padding:'16px 24px',borderTop:'1px solid #f1f5f9',...style}}>{children}</div>
