import { useAppSelector } from '../../app/hooks'

export default function AccountStatus() {
  const { user } = useAppSelector(s => s.auth)
  const msg = user?.isBlocked
    ? 'Your account is blocked. Please contact support.'
    : 'Your account status requires attention.'
  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-3">Account Status</h1>
      <div className="p-4 border rounded-xl bg-red-50 text-red-700">{msg}</div>
    </div>
  )
}
