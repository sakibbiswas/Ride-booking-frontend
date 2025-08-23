
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { updateUser } from '../../features/auth/authSlice'
import { useToggleOnlineMutation } from '../../api/driverApi'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

export default function DriverPanel() {
  const { user } = useAppSelector(s => s.auth)
  const dispatch = useAppDispatch()
  const [toggleOnline, { isLoading }] = useToggleOnlineMutation()
  const [showProfile, setShowProfile] = useState(false)

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Loading user data...</p>
      </div>
    )
  }

  const handleToggleOnline = async () => {
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

  const options = [
    { label: 'Incoming Requests', to: '/driver/incoming', from: 'from-indigo-400', toColor: 'to-purple-500' },
    { label: 'Active Ride', to: '/driver/active', from: 'from-green-400', toColor: 'to-teal-500' },
    { label: 'Earnings', to: '/driver/earnings', from: 'from-yellow-400', toColor: 'to-orange-500' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100 px-4 py-10 relative overflow-hidden">
      {/* Background accent circles */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-200 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-yellow-200 rounded-full opacity-25 animate-pulse"></div>

      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl font-extrabold text-indigo-700">🚗 Driver Panel</h1>
          <div className="flex gap-4">
            <motion.button
              onClick={handleToggleOnline}
              disabled={isLoading}
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-3 rounded-2xl font-semibold shadow-lg text-white transition-colors
                ${user.isOnline ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 hover:bg-gray-500'}
                ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Updating...' : user.isOnline ? 'Online ✅' : 'Offline ⚠️'}
            </motion.button>

            <motion.button
              onClick={() => setShowProfile(prev => !prev)}
              whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(0,0,0,0.15)' }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-3 rounded-2xl font-semibold shadow-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              {showProfile ? 'Hide Profile' : 'View Profile'}
            </motion.button>
          </div>
        </div>

        {/* Offline Warning */}
        {!user.isOnline && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4 rounded-2xl bg-yellow-50 border border-yellow-200 text-yellow-800 shadow-lg text-center font-medium"
          >
            You are offline. Go online to receive ride requests ⚡
          </motion.div>
        )}

        {/* Profile Section */}
        {showProfile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 border rounded-3xl bg-white shadow-xl space-y-4"
          >
            <h2 className="text-2xl font-bold text-indigo-700 text-center"> My Profile</h2>
            <div className="space-y-2 text-gray-700">
              <div><span className="font-semibold">Name:</span> {user.name || '-'}</div>
              <div><span className="font-semibold">Email:</span> {user.email || '-'}</div>
              <div><span className="font-semibold">Role:</span> {user.role || '-'}</div>
              <div><span className="font-semibold">Approved:</span> {user.isApproved ? 'Yes ✅' : 'No ❌'}</div>
              <div><span className="font-semibold">Blocked:</span> {user.isBlocked ? 'Yes ❌' : 'No ✅'}</div>
            </div>

            <div className="pt-4 border-t flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <div className="font-medium text-gray-700">Driver Availability</div>
                <motion.span
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className={`inline-block mt-1 px-3 py-1 rounded-full font-semibold text-sm shadow-lg
                    ${user.isOnline ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                >
                  {user.isOnline ? 'Online ✅' : 'Offline ⚠️'}
                </motion.span>
              </div>

              <motion.button
                onClick={handleToggleOnline}
                disabled={isLoading}
                whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(0,0,0,0.2)' }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-3 rounded-2xl font-semibold shadow-lg text-white transition-colors
                  ${user.isOnline ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}
                  ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Updating...' : user.isOnline ? 'Go Offline' : 'Go Online'}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Dashboard Options */}
        <div className="grid md:grid-cols-3 gap-6">
          {options.map(opt => (
            <motion.div key={opt.to} whileHover={{ scale: 1.05 }} className="rounded-3xl shadow-lg transition">
              <Link
                to={opt.to}
                className={`block p-6 rounded-3xl bg-gradient-to-r ${opt.from} ${opt.toColor} text-white font-bold text-center shadow-xl`}
              >
                {opt.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
