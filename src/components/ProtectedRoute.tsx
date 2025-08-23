import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'

export default function ProtectedRoute() {
  const { token, user } = useAppSelector(s => s.auth)
  if (!token || !user) return <Navigate to="/login" replace />
  if (user.isBlocked) return <Navigate to="/status" replace />
  return <Outlet />
}
