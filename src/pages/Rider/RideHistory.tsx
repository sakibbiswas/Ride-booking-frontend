
import { useState, useMemo } from 'react'
import { useMyRidesQuery, useCancelRideMutation, useDriverUpdateRideStatusMutation } from '../../api/rideApi'
import Loader from '../../components/Loader'
import toast from 'react-hot-toast'
import { money } from '../../utils/format'
import { useSelector } from 'react-redux'
import type { RideStatus, Ride } from '../../utils/types'
import { motion } from 'framer-motion'

const statusColors: Record<RideStatus, string> = {
  REQUESTED: 'bg-indigo-100 text-indigo-800',
  ACCEPTED: 'bg-green-100 text-green-800',
  PICKED_UP: 'bg-yellow-100 text-yellow-800',
  COMPLETED: 'bg-blue-100 text-blue-800',
  CANCELLED: 'bg-red-100 text-red-800',
}

const statusFilters: (RideStatus | 'ALL')[] = [
  'ALL',
  'REQUESTED',
  'ACCEPTED',
  'PICKED_UP',
  'COMPLETED',
  'CANCELLED',
]

export default function RideHistory() {
  const { data, isLoading, refetch } = useMyRidesQuery()
  const [cancelRide] = useCancelRideMutation()
  const [updateStatus] = useDriverUpdateRideStatusMutation()
  const [updating, setUpdating] = useState<string | null>(null)
  const userRole = useSelector((state: any) => state.auth.user?.role)

  // filters & pagination state
  const [filter, setFilter] = useState<'ALL' | RideStatus>('ALL')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  if (isLoading) return <Loader />
  const rides: Ride[] = data?.data || []

  // Apply filter
  const filteredRides = useMemo(() => {
    if (filter === 'ALL') return rides
    return rides.filter((r) => r.status === filter)
  }, [rides, filter])

  // Pagination logic
  const totalPages = Math.ceil(filteredRides.length / pageSize)
  const paginatedRides = filteredRides.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const onCancel = async (id: string) => {
    try {
      await cancelRide(id).unwrap()
      toast.success('Ride cancelled')
      refetch()
    } catch (e: any) {
      toast.error(e?.data?.message || 'Cancel failed')
    }
  }

  const onUpdateStatus = async (id: string, status: RideStatus) => {
    try {
      setUpdating(id)
      await updateStatus({ id, status }).unwrap()
      toast.success(`Ride ${status.toLowerCase()} successfully`)
      refetch()
    } catch (e: any) {
      toast.error(e?.data?.message || 'Status update failed')
    } finally {
      setUpdating(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50 px-4 py-10">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-indigo-700">My Rides</h1>

      {/* Filter + Page size */}
      <div className="flex flex-wrap items-center justify-between gap-4 max-w-5xl mx-auto mb-6">
        <div className="flex gap-2 flex-wrap">
          {statusFilters.map((s) => (
            <button
              key={s}
              onClick={() => {
                setFilter(s)
                setCurrentPage(1)
              }}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition transform hover:scale-105 shadow-sm ${
                filter === s
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
              setCurrentPage(1)
            }}
            className="px-3 py-2 rounded-xl border border-indigo-200 text-sm focus:ring-2 focus:ring-indigo-400"
          >
            {[5, 10, 20].map((size) => (
              <option key={size} value={size}>
                {size} / page
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Ride cards */}
      <div className="grid gap-6 max-w-5xl mx-auto">
        {paginatedRides.map((r) => (
          <motion.div
            key={r._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-2xl bg-white shadow-xl border border-indigo-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex-1">
              <div className="font-semibold text-indigo-700 text-lg mb-2">
                {r.pickupLocation} → {r.destination}
              </div>

              <div className="flex flex-wrap gap-2 mb-2 items-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[r.status]}`}>
                  {r.status}
                </span>
                <span className="text-gray-500 text-sm">Fare: {money(r.fare ?? 0)}</span>
              </div>

              <div className="text-xs text-gray-400 space-y-1">
                {r.timestamps?.requestedAt && <div>Requested: {new Date(r.timestamps.requestedAt).toLocaleString()}</div>}
                {r.timestamps?.acceptedAt && <div>Accepted: {new Date(r.timestamps.acceptedAt).toLocaleString()}</div>}
                {r.timestamps?.pickedUpAt && <div>Picked Up: {new Date(r.timestamps.pickedUpAt).toLocaleString()}</div>}
                {r.timestamps?.completedAt && <div>Completed: {new Date(r.timestamps.completedAt).toLocaleString()}</div>}
                {r.timestamps?.cancelledAt && <div className="text-red-500">Cancelled: {new Date(r.timestamps.cancelledAt).toLocaleString()}</div>}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-3 md:mt-0">
              {/* Rider actions */}
              {userRole === 'rider' && r.status === 'REQUESTED' && (
                <button
                  onClick={() => onCancel(r._id)}
                  className="px-4 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition transform hover:scale-105 shadow-sm"
                >
                  Cancel
                </button>
              )}

              {/* Driver actions */}
              {userRole === 'driver' && (
                <>
                  {r.status === 'REQUESTED' && (
                    <button
                      onClick={() => onUpdateStatus(r._id, 'ACCEPTED')}
                      className={`px-4 py-2 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition transform hover:scale-105 shadow-sm ${updating === r._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={updating === r._id}
                    >
                      Accept
                    </button>
                  )}
                  {r.status === 'ACCEPTED' && (
                    <button
                      onClick={() => onUpdateStatus(r._id, 'PICKED_UP')}
                      className={`px-4 py-2 rounded-xl bg-yellow-400 text-white font-semibold hover:bg-yellow-500 transition transform hover:scale-105 shadow-sm ${updating === r._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={updating === r._id}
                    >
                      Picked Up
                    </button>
                  )}
                  {r.status === 'PICKED_UP' && (
                    <button
                      onClick={() => onUpdateStatus(r._id, 'COMPLETED')}
                      className={`px-4 py-2 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition transform hover:scale-105 shadow-sm ${updating === r._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={updating === r._id}
                    >
                      Complete
                    </button>
                  )}
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-xl bg-white border border-indigo-200 text-indigo-600 hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <span className="text-sm font-medium text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-xl bg-white border border-indigo-200 text-indigo-600 hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}


