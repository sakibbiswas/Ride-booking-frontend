
import { useAcceptRideMutation, useListRequestedRidesQuery } from '../../api/driverApi'
import { useAppSelector } from '../../app/hooks'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function IncomingRequests() {
  const { user } = useAppSelector(s => s.auth)
  const online = !!user?.isOnline

  const { data = [], isLoading, refetch } = useListRequestedRidesQuery(undefined, {
    pollingInterval: online ? 4000 : 0,
    refetchOnMountOrArgChange: true,
  })
  const [acceptRide] = useAcceptRideMutation()
  const [acceptingId, setAcceptingId] = useState<string | null>(null)

  if (!online) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-6 border rounded-3xl bg-yellow-50 text-yellow-800 text-center shadow-xl"
        >
          Go online to see incoming requests 🚗
        </motion.div>
      </div>
    )
  }

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center px-4 text-gray-500">
        Loading requests...
      </div>
    )

  const onAccept = async (id: string) => {
    try {
      setAcceptingId(id)
      await acceptRide(id).unwrap()
      toast.success('Ride accepted ✅')
      refetch()
    } catch (e: any) {
      toast.error(e?.data?.message || 'Failed to accept')
    } finally {
      setAcceptingId(null)
    }
  }

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-8 text-center">
          Incoming Ride Requests
        </h1>

        <div className="grid gap-6">
          {data.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-gray-500 text-center py-8 text-lg"
            >
              No requests right now. Relax and wait 
            </motion.div>
          )}

          {data.map((r: any) => (
            <motion.div
              key={r._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.03 }}
              className="p-6 rounded-3xl bg-gradient-to-r from-indigo-50 via-white to-pink-50 shadow-lg border border-indigo-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition"
            >
              <div>
                <div className="font-semibold text-indigo-700 text-lg mb-1">
                  {r.pickupLocation} → {r.destination}
                </div>
                <div className="text-sm text-gray-500">
                  Requested at: {r.timestamps?.requestedAt ? new Date(r.timestamps.requestedAt).toLocaleString() : '-'}
                </div>
              </div>

              <motion.button
                onClick={() => onAccept(r._id)}
                disabled={acceptingId === r._id}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-2xl text-white font-semibold shadow-lg transition transform
                  ${acceptingId === r._id 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600'
                  }`}
              >
                {acceptingId === r._id ? 'Accepting...' : 'Accept'}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

