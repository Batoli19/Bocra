import { createContext, useState } from 'react'
export const AuthContext = createContext(null)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const login = (phone, otp) => {
    if (otp === '123456') {
      const role = phone.toLowerCase().includes('staff') ? 'staff' : 'citizen'
      setUser({ id: '1', name: role === 'staff' ? 'BOCRA Officer' : 'Kefilwe Mosweu', phone, role })
      return true
    }
    return false
  }
  const logout = () => setUser(null)
  return (
    <AuthContext.Provider value={{ user, role: user?.role || null, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
