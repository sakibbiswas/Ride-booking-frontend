import { useState } from 'react'
import type { User } from '../../api/userApi'

type Props = {
  me: User
  role: User['role']
  submitting?: boolean
  onSubmit: (payload: Partial<User>) => Promise<void>
}

export default function ProfileForm({ me, role, submitting, onSubmit }: Props) {
  const [name, setName] = useState(me.name || '')
  const [phone, setPhone] = useState(me.phone || '')
  const [make, setMake] = useState(me.vehicle?.make || '')
  const [model, setModel] = useState(me.vehicle?.model || '')
  const [plate, setPlate] = useState(me.vehicle?.plate || '')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload: Partial<User> = { name, phone }
    if (role === 'driver') payload.vehicle = { make, model, plate }
    await onSubmit(payload)
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          placeholder="+8801XXXXXXXXX"
        />
      </div>

      {role === 'driver' && (
        <div className="grid md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Vehicle Make</label>
            <input value={make} onChange={(e) => setMake(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Vehicle Model</label>
            <input value={model} onChange={(e) => setModel(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Plate</label>
            <input value={plate} onChange={(e) => setPlate(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
          </div>
        </div>
      )}

      <button
        disabled={submitting}
        className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
      >
        {submitting ? 'Saving…' : 'Save Changes'}
      </button>
    </form>
  )
}
