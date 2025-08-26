
import { useState } from 'react'

type Props = {
  loading?: boolean
  onChange: (payload: { currentPassword: string; newPassword: string }) => Promise<void>
}

export default function ChangePasswordForm({ loading, onChange }: Props) {
  const [currentPassword, setCurrent] = useState('')
  const [newPassword, setNew] = useState('')
  const [confirm, setConfirm] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword.length < 6) return alert('Password must be at least 6 characters')
    if (newPassword !== confirm) return alert('Passwords do not match')
    await onChange({ currentPassword, newPassword })
    setCurrent(''); setNew(''); setConfirm('')
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium mb-1">Current Password</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrent(e.target.value)}
          required
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNew(e.target.value)}
          required
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Confirm New Password</label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <button
        disabled={loading}
        className="px-5 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50"
      >
        {loading ? 'Updating…' : 'Change Password'}
      </button>
    </form>
  )
}
