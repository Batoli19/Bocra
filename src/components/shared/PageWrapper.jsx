import { createContext, useContext, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const HomeChatContext = createContext(null)

export function useHomeChat() {
  return useContext(HomeChatContext)
}

export default function PageWrapper({
  children,
  fullWidth = false,
  hideChat = false,
  wrapperStyle = {},
}) {
  const [showHint, setShowHint] = useState(false)
  const [chatDismissed, setChatDismissed] = useState(false)

  return (
    <HomeChatContext.Provider value={{ showHint, setShowHint, chatDismissed, setChatDismissed }}>
      <div
        style={{
          minHeight:'100vh',
          display:'flex',
          flexDirection:'column',
          background:'#f8fafc',
          width: '100%',
          overflowX: 'hidden',
          boxSizing: 'border-box',
          ...wrapperStyle,
        }}
      >
        <Navbar
          showHint={showHint}
          hideChat={hideChat}
          onChatClose={() => {
            setShowHint(false)
            setChatDismissed(true)
          }}
        />
        <main style={{ flex:1, ...(fullWidth ? {} : { maxWidth:1280, margin:'0 auto', width:'100%', padding:'40px 24px' }) }}>
          {children}
        </main>
        <Footer />
      </div>
    </HomeChatContext.Provider>
  )
}
