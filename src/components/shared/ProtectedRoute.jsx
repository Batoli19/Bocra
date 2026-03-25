import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
export default function ProtectedRoute({ role }) {
  const { isLoggedIn, role: userRole } = useAuth()
  if (!isLoggedIn) return <Navigate to="/login" replace />
  if (role && userRole !== role) return <Navigate to="/" replace />
  return <Outlet />
}
