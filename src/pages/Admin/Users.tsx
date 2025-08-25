

import Loader from '../../components/Loader'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { useGetAllUsersQuery, type User } from '../../api/userApi'
import {
  useApproveDriverMutation,
  useSuspendDriverMutation,
  useBlockDriverMutation,
} from '../../api/adminApi'

export default function Users() {
  const { data, isLoading, refetch } = useGetAllUsersQuery()
  const [approve] = useApproveDriverMutation()
  const [suspend] = useSuspendDriverMutation()
  const [blockDriver] = useBlockDriverMutation()

  if (isLoading) return <Loader />

  const users: User[] = data?.data ?? []

  const onApprove = async (id: string) => {
    try {
      await approve(id).unwrap()
      toast.success('Approved ✅')
      refetch()
    } catch {
      toast.error('Failed to approve ❌')
    }
  }

  const onSuspend = async (id: string) => {
    try {
      await suspend(id).unwrap()
      toast.success('Suspended ⚠️')
      refetch()
    } catch {
      toast.error('Failed to suspend ❌')
    }
  }

  const onBlock = async (id: string) => {
    try {
      await blockDriver(id).unwrap()
      toast.success('Blocked 🚫')
      refetch()
    } catch {
      toast.error('Failed to block ❌')
    }
  }

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-4 text-center">🌟 Users</h1>

        <div className="overflow-auto rounded-2xl shadow-lg bg-white border border-indigo-100">
          <table className="min-w-[800px] w-full table-auto border-collapse">
            <thead className="bg-indigo-100">
              <tr>
                <th className="p-3 text-left border-b border-indigo-200">Name</th>
                <th className="p-3 text-left border-b border-indigo-200">Email</th>
                <th className="p-3 text-left border-b border-indigo-200">Role</th>
                <th className="p-3 text-left border-b border-indigo-200">Approved</th>
                <th className="p-3 text-left border-b border-indigo-200">Blocked</th>
                <th className="p-3 text-left border-b border-indigo-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <motion.tr
                  key={u._id}
                  whileHover={{ scale: 1.02, boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                  className="transition-transform even:bg-indigo-50"
                >
                  <td className="p-3 border-b">{u.name}</td>
                  <td className="p-3 border-b">{u.email}</td>
                  <td className="p-3 border-b capitalize">{u.role}</td>
                  <td className="p-3 border-b">
                    <span
                      className={`px-2 py-1 rounded-full font-medium text-sm ${
                        u.isApproved ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                      }`}
                    >
                      {u.isApproved ? 'Yes ✅' : 'No ❌'}
                    </span>
                  </td>
                  <td className="p-3 border-b">
                    <span
                      className={`px-2 py-1 rounded-full font-medium text-sm ${
                        u.isBlocked ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'
                      }`}
                    >
                      {u.isBlocked ? 'Yes ❌' : 'No ✅'}
                    </span>
                  </td>

                  {/* Actions Column: always show all buttons */}
                  <td className="p-3 border-b">
                    {u.role === 'driver' && (
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => onApprove(u._id)}
                          className="px-3 py-1 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold shadow"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => onSuspend(u._id)}
                          className="px-3 py-1 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold shadow"
                        >
                          Suspend
                        </button>

                        <button
                          onClick={() => onBlock(u._id)}
                          className="px-3 py-1 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow"
                        >
                          Block
                        </button>
                      </div>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
