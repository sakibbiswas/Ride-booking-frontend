
import { useActiveRideQuery } from '../../api/driverApi'
import { useDriverUpdateRideStatusMutation } from '../../api/rideApi'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { money } from '../../utils/format'

export default function ActiveRide() {
  const { data: ride, isLoading, refetch } = useActiveRideQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 4000,
  })
  const [updateStatus] = useDriverUpdateRideStatusMutation()
  const [updating, setUpdating] = useState(false)

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-gray-500">
        Loading active ride...
      </div>
    )

  if (!ride)
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-6 rounded-3xl bg-yellow-50 text-yellow-800 shadow-lg text-center text-lg font-medium"
        >
          No active ride right now 🚗
        </motion.div>
      </div>
    )

  const next =
    ride.status === 'ACCEPTED' ? ('PICKED_UP' as const) :
    ride.status === 'PICKED_UP' ? ('COMPLETED' as const) :
    null

  const label = next === 'PICKED_UP' ? 'Picked Up' : next === 'COMPLETED' ? 'Complete' : null

  const statusColors: Record<string, string> = {
    REQUESTED: 'bg-indigo-100 text-indigo-800',
    ACCEPTED: 'bg-green-100 text-green-800',
    PICKED_UP: 'bg-yellow-100 text-yellow-800',
    COMPLETED: 'bg-blue-100 text-blue-800',
  }

  const onAdvance = async () => {
    if (!next) return
    try {
      setUpdating(true)
      await updateStatus({ id: ride._id, status: next }).unwrap()
      toast.success(`Ride ${next.toLowerCase()} successfully ✅`)
      refetch()
    } catch (e: any) {
      toast.error(e?.data?.message || 'Failed to update status')
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 border border-indigo-100"
      >
        <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center">
          Active Ride
        </h2>

        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          className="p-6 rounded-2xl bg-gradient-to-r from-indigo-50 via-white to-pink-50 shadow-md space-y-4"
        >
          <div className="flex flex-wrap justify-between items-center gap-2">
            <div className="font-semibold text-indigo-700 text-lg">
              {ride.pickupLocation} → {ride.destination}
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[ride.status]}`}>
              {ride.status}
            </span>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {ride.fare != null && <span>Fare: <b className="text-green-600">{money(ride.fare)}</b></span>}
          </div>

          <div className="text-xs text-gray-500 space-y-1">
            {ride.timestamps?.requestedAt && <div>Requested: {new Date(ride.timestamps.requestedAt).toLocaleString()}</div>}
            {ride.timestamps?.acceptedAt && <div>Accepted: {new Date(ride.timestamps.acceptedAt).toLocaleString()}</div>}
            {ride.timestamps?.pickedUpAt && <div>Picked Up: {new Date(ride.timestamps.pickedUpAt).toLocaleString()}</div>}
            {ride.timestamps?.completedAt && <div>Completed: {new Date(ride.timestamps.completedAt).toLocaleString()}</div>}
          </div>

          {next && (
            <motion.button
              onClick={onAdvance}
              disabled={updating}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              className={`mt-4 w-full py-3 rounded-2xl font-semibold text-white shadow-lg text-lg transition
                ${updating
                  ? 'bg-gray-400 cursor-not-allowed'
                  : next === 'PICKED_UP'
                    ? 'bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600'
                    : 'bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600'
                }`}
            >
              {updating ? 'Updating...' : label}
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}

