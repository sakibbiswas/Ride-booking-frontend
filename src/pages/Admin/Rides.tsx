
import { useGetAllRidesPublicQuery } from '../../api/rideApi'
import Loader from '../../components/Loader'
import { motion } from 'framer-motion'
import { FaCarSide, FaCheckCircle } from 'react-icons/fa'

export default function Rides() {
  const { data, isLoading } = useGetAllRidesPublicQuery()
  if (isLoading) return <Loader />
  const rides = data?.data || []

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50 relative overflow-hidden">
      {/* Floating circles for optimism */}
      <div className="absolute -top-16 -left-10 w-40 h-40 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-10 w-48 h-48 bg-yellow-200 rounded-full opacity-15 animate-pulse"></div>

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center">🌟 All Rides</h1>

        {rides.length === 0 && (
          <div className="text-gray-500 text-center py-10 text-lg">No rides available right now. Relax and wait! 🌈</div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rides.map((r) => (
            <motion.div
              key={r._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: '0 15px 25px rgba(0,0,0,0.2)' }}
              className="p-6 rounded-3xl bg-gradient-to-r from-indigo-100 via-pink-100 to-yellow-100 shadow-xl border border-indigo-200 relative overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-2 text-indigo-700 text-lg font-semibold">
                <FaCarSide className="text-xl" />
                {r.pickupLocation} → {r.destination}
              </div>

              <div className={`flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full
                ${r.status === 'COMPLETED' ? 'bg-green-200 text-green-800' : r.status === 'PICKED_UP' ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-700'}
              `}>
                {r.status === 'COMPLETED' && <FaCheckCircle />}
                <span>Status: {r.status}</span>
              </div>

              {/* Gradient highlight animation */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

