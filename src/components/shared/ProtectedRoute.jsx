import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function ProtectedRoute({ role }) {
  const { isLoggedIn, role: userRole } = useAuth()
  const location = useLocation()

  if (!isLoggedIn) {
    const redirectUrl = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/login?redirect=${redirectUrl}`} replace />
  }
  
  if (role && userRole !== role) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
