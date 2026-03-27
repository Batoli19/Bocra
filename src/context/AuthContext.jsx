import { createContext, useState } from 'react'
export const AuthContext = createContext(null)

const STORAGE_KEY = 'bocra_user'

function readStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredUser())
  const [authModalTarget, setAuthModalTarget] = useState(null)

  const persistUser = (nextUser) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
    setUser(nextUser)
    return true
  }

  const login = (arg1, arg2) => {
    let nextUser = null

    if (typeof arg1 === 'object' && arg1 !== null) {
      nextUser = {
        id: arg1.id || '1',
        name: arg1.name || 'Kefilwe Mosweu',
        email: arg1.email || '',
        phone: arg1.phone || '',
        role: arg1.role || 'citizen',
      }
    } else if (typeof arg1 === 'string' && typeof arg2 === 'string') {
      if (arg2 !== '123456') return false
      const role = arg1.toLowerCase().includes('staff') ? 'staff' : 'citizen'
      nextUser = {
        id: '1',
        name: role === 'staff' ? 'BOCRA Officer' : 'Kefilwe Mosweu',
        phone: arg1,
        role,
      }
    } else {
      return false
    }

    return persistUser(nextUser)
  }

  const register = ({ name, email, phone, role = 'citizen' }) => {
    const nextUser = {
      id: `${Date.now()}`,
      name: name?.trim() || 'BOCRA Citizen',
      email: email?.trim() || '',
      phone: phone?.trim() || '',
      role,
    }

    return persistUser(nextUser)
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

  const requireAuth = (targetUrl) => {
    if (user) {
      window.location.href = targetUrl;
      return true;
    } else {
      setAuthModalTarget(targetUrl);
      return false;
    }
  }

  const closeAuthModal = () => {
    setAuthModalTarget(null);
  }

  const contextValue = {
    user,
    role: user?.role || null,
    isLoggedIn: !!user,
    login,
    register,
    logout,
    authModalTarget,
    requireAuth,
    closeAuthModal
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}
