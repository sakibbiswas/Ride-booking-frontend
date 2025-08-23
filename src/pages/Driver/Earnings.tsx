
import { useEarningsQuery } from '../../api/driverApi'
import Loader from '../../components/Loader'
import { money } from '../../utils/format'
import { motion } from 'framer-motion'
import { FaCarSide, FaDollarSign } from 'react-icons/fa'

export default function Earnings() {
  const { data, isLoading } = useEarningsQuery()

  if (isLoading) return <Loader />
  const total = data?.totalEarnings ?? 0
  const count = data?.rideCount ?? 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100 px-4 py-12 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-10 border border-indigo-200"
      >
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-8 text-center">
          Earnings Overview
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Completed Rides Card */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
            className="p-6 rounded-3xl bg-gradient-to-r from-green-300 to-green-500 text-white shadow-xl flex flex-col items-center justify-center gap-3 hover:scale-105 transition-transform"
          >
            <FaCarSide className="text-4xl" />
            <div className="text-lg font-semibold">Completed Rides</div>
            <div className="text-4xl font-extrabold">{count}</div>
          </motion.div>

          {/* Total Earnings Card */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="p-6 rounded-3xl bg-gradient-to-r from-yellow-300 to-orange-400 text-white shadow-xl flex flex-col items-center justify-center gap-3 hover:scale-105 transition-transform"
          >
            <FaDollarSign className="text-4xl" />
            <div className="text-lg font-semibold">Total Earnings</div>
            <div className="text-4xl font-extrabold">{money(total)}</div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

