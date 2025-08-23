import { useState } from 'react'
import { useRequestRideMutation } from '../../api/rideApi'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { MapPin, Flag } from 'lucide-react'

export default function RequestRide() {
  const [form, setForm] = useState({ pickupLocation:'', destination:'', pickupTime:'' })
  const [requestRide, { isLoading }] = useRequestRideMutation()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.pickupLocation || !form.destination) return toast.error('Pickup & Destination are required')
    try {
      await requestRide({ ...form, pickupTime: form.pickupTime || undefined }).unwrap()
      toast.success('Ride requested successfully! 🚗')
      setForm({ pickupLocation:'', destination:'', pickupTime:'' })
    } catch (e: any) {
      toast.error(e?.data?.message || 'Failed to request')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 border border-indigo-100"
      >
        <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-4">
          Request a Ride
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Fill in your ride details and get moving 🚀
        </p>

        <form onSubmit={submit} className="space-y-6">
          <div className="relative">
            <MapPin className="absolute left-4 top-3 text-indigo-400" />
            <input
              placeholder="Pickup location"
              value={form.pickupLocation}
              onChange={e => setForm({...form, pickupLocation:e.target.value})}
              className="w-full pl-12 px-5 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 placeholder-gray-400 text-gray-900 transition"
            />
          </div>

          <div className="relative">
            <Flag className="absolute left-4 top-3 text-pink-400" />
            <input
              placeholder="Destination"
              value={form.destination}
              onChange={e => setForm({...form, destination:e.target.value})}
              className="w-full pl-12 px-5 py-3 rounded-xl border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 placeholder-gray-400 text-gray-900 transition"
            />
          </div>

          <input
            type="datetime-local"
            value={form.pickupTime}
            onChange={e => setForm({...form, pickupTime:e.target.value})}
            className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 text-gray-900 transition"
          />

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transition transform disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Requesting...' : 'Request Ride'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

