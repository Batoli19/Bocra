import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useEffect, useState } from 'react'

export default function ProtectedRoute({ role }) {
  const { isLoggedIn, role: userRole, requireAuth } = useAuth()
  const location = useLocation()
  const [redirectHome, setRedirectHome] = useState(false)

  useEffect(() => {
    if (!isLoggedIn && !redirectHome) {
      const targetUrl = location.pathname + location.search
      requireAuth(targetUrl)
      setRedirectHome(true)
    }
  }, [isLoggedIn, location, requireAuth, redirectHome])

  if (!isLoggedIn) {
    if (redirectHome) {
      return <Navigate to="/" replace />
    }
    return null
  }
  
  if (role && userRole !== role) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
