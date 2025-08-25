import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { UserRole } from '../utils/types'

export default function RoleGuard({ allow }: { allow: UserRole[] }) {
  const { user } = useAppSelector(s => s.auth)
  if (!user) return <Navigate to="/login" replace />
  if (!allow.includes(user.role)) return <Navigate to="/" replace />
  if (user.role === UserRole.DRIVER && user.isOnline === false) {
  
  }
  return <Outlet />
}














