
import { Link } from 'react-router-dom'
import { useSystemStatsQuery } from '../../api/adminApi'
import Loader from '../../components/Loader'
import { motion } from 'framer-motion'

export default function AdminDashboard() {
  const { data, isLoading } = useSystemStatsQuery()

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100 relative overflow-hidden">
      {/* Floating background shapes */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-indigo-200 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-pink-200 rounded-full opacity-25 animate-pulse"></div>

      <div className="max-w-5xl mx-auto space-y-10 relative z-10">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center">🌟 Admin Panel</h1>

        {/* Stats */}
        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { label: 'Drivers', value: data?.totalDrivers ?? 0, from: 'from-indigo-400', to: 'to-purple-500' },
              { label: 'Approved', value: data?.approvedDrivers ?? 0, from: 'from-green-400', to: 'to-teal-500' },
              { label: 'Online', value: data?.onlineDrivers ?? 0, from: 'from-yellow-400', to: 'to-orange-500' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05, boxShadow: '0 15px 25px rgba(0,0,0,0.15)' }}
                className={`p-6 rounded-3xl bg-gradient-to-r ${stat.from} ${stat.to} text-white shadow-lg text-center`}
              >
                <div className="text-sm font-medium">{stat.label}</div>
                <div className="text-4xl font-extrabold mt-2">{stat.value}</div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Dashboard Links */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { label: 'Manage Users', to: '/admin/users', from: 'from-indigo-400', toColor: 'to-purple-500' },
            { label: 'All Rides', to: '/admin/rides', from: 'from-green-400', toColor: 'to-teal-500' },
            { label: 'Analytics', to: '/admin/analytics', from: 'from-yellow-400', toColor: 'to-orange-500' },
          ].map((link) => (
            <motion.div
              key={link.to}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.15)' }}
              whileTap={{ scale: 0.95 }}
              className="rounded-3xl transition"
            >
              <Link
                to={link.to}
                className={`block p-6 rounded-3xl bg-gradient-to-r ${link.from} ${link.toColor} text-white font-semibold text-center shadow-lg`}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
