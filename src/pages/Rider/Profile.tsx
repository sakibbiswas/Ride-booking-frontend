import { useAppSelector } from '../../app/hooks'
import { motion } from 'framer-motion'
import { User } from 'lucide-react'

export default function Profile() {
  const { user } = useAppSelector((s) => s.auth)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 px-4 py-12 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="bg-indigo-100 rounded-full p-4 mb-4">
            <User size={48} className="text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-indigo-700 text-center">
            {user?.name || 'My Profile'}
          </h1>
          <p className="text-gray-600 text-center mt-1">
            {user?.email}
          </p>
        </div>

        <div className="space-y-4">
          {[
            { label: 'Role', value: user?.role, bg: 'bg-yellow-50', text: 'text-yellow-800' },
            { label: 'Approved', value: user?.isApproved ? 'Yes' : 'No', bg: 'bg-green-50', text: 'text-green-800' },
            { label: 'Blocked', value: user?.isBlocked ? 'Yes' : 'No', bg: 'bg-red-50', text: 'text-red-800' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className={`flex justify-between items-center p-3 rounded-lg ${item.bg} hover:shadow-md transition`}
              whileHover={{ scale: 1.02 }}
            >
              <span className={`font-semibold ${item.text}`}>{item.label}:</span>
              <span className="text-gray-900">{item.value}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

