







import { useState } from 'react'
import type { User } from '../../api/userApi'

type Props = {
  me: User
  saving?: boolean
  onSave: (contacts: { name: string; phone: string }[]) => Promise<void>
}

export default function EmergencyContacts({ me, saving, onSave }: Props) {
  const [list, setList] = useState<{ name: string; phone: string }[]>(
    me.emergencyContacts?.length ? me.emergencyContacts : [{ name: '', phone: '' }]
  )

  const update = (i: number, key: 'name' | 'phone', val: string) => {
    const next = [...list]; next[i] = { ...next[i], [key]: val }; setList(next)
  }

  return (
    <div className="space-y-3">
      {list.map((c, i) => (
        <div key={i} className="grid md:grid-cols-2 gap-3">
          <input className="border rounded-lg px-3 py-2" placeholder="Name"  value={c.name}  onChange={(e) => update(i, 'name', e.target.value)} />
          <input className="border rounded-lg px-3 py-2" placeholder="Phone" value={c.phone} onChange={(e) => update(i, 'phone', e.target.value)} />
        </div>
      ))}

      <div className="flex gap-2">
        <button type="button" onClick={() => setList([...list, { name: '', phone: '' }])} className="px-3 py-1 rounded bg-gray-100">Add</button>
        <button type="button" onClick={() => setList(list.slice(0, -1))} disabled={list.length <= 1} className="px-3 py-1 rounded bg-gray-100 disabled:opacity-50">Remove</button>
        <button
          type="button"
          onClick={() => onSave(list)}
          disabled={saving}
          className="ml-auto px-4 py-2 rounded bg-pink-600 text-white disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save Contacts'}
        </button>
      </div>
    </div>
  )
}
