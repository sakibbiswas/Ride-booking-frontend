
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { updateUser } from '../../features/auth/authSlice'
import { useToggleOnlineMutation } from '../../api/driverApi'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

export default function DriverProfile() {
  const { user } = useAppSelector(s => s.auth)
  const dispatch = useAppDispatch()
  const [toggleOnline, { isLoading }] = useToggleOnlineMutation()

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    )
  }

  const handleToggle = async () => {
    try {
      const targetStatus = !user.isOnline
      const resp = await toggleOnline(targetStatus).unwrap()
      const newStatus = resp?.data?.isOnline ?? targetStatus
      dispatch(updateUser({ isOnline: newStatus }))
      toast.success(newStatus ? 'You are now online ✅' : 'You are now offline ⚠️')
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update status ❌')
    }
  }

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100 flex justify-center items-start">
      <motion.div
        className="w-full max-w-lg p-10 rounded-3xl bg-white shadow-2xl border border-indigo-200 space-y-6 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background floating circles for optimism */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-200 rounded-full opacity-25 animate-pulse"></div>

        <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center">
          🌟 My Profile
        </h2>

        <div className="space-y-3 text-gray-700">
          <div><span className="font-semibold">Name:</span> {user.name || '-'}</div>
          <div><span className="font-semibold">Email:</span> {user.email || '-'}</div>
          <div><span className="font-semibold">Role:</span> {user.role || '-'}</div>
          <div><span className="font-semibold">Approved:</span> {user.isApproved ? 'Yes ✅' : 'No ❌'}</div>
          <div><span className="font-semibold">Blocked:</span> {user.isBlocked ? 'Yes ❌' : 'No ✅'}</div>
        </div>

        <motion.div
          className="pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col items-start md:items-start">
            <div className="font-medium text-gray-700 mb-1">Driver Availability</div>
            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className={`inline-block px-4 py-1 rounded-full font-semibold text-sm shadow-lg
                ${user.isOnline ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
            >
              {user.isOnline ? 'Online ✅' : 'Offline ⚠️'}
            </motion.span>
          </div>

          <motion.button
            onClick={handleToggle}
            disabled={isLoading}
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0,0,0,0.2)' }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-2xl font-semibold shadow-lg text-white transition-colors w-full md:w-auto
              ${user.isOnline
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-green-500 hover:bg-green-600'
              } ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Updating...' : user.isOnline ? 'Go Offline' : 'Go Online'}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
