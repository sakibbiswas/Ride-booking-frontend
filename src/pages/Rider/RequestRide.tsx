
// src/pages/rides/RequestRide.tsx
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Flag } from 'lucide-react'
import toast from 'react-hot-toast'
import {
  useEstimateFareQuery,
  useCreateRideMutation,
  useCreatePaymentIntentMutation,
} from '../../api/rideApi'
import type { PaymentMethod } from '../../api/rideApi' //  type-only import

export default function RequestRide() {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [pickupTime, setPickupTime] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash')
  const [offerFare, setOfferFare] = useState<number | ''>('')

  const canEstimate = pickup.trim() !== '' && destination.trim() !== ''
  const { data: estData, isFetching: estimating } = useEstimateFareQuery(
    { pickup, destination },
    { skip: !canEstimate }
  )
  const estimate = estData?.data

  const [createRide, { isLoading: creating }] = useCreateRideMutation()
  const [createIntent, { isLoading: paying }] = useCreatePaymentIntentMutation()

  const finalFare = useMemo(() => {
    if (!estimate?.estimatedFare) return undefined
    if (offerFare === '') return estimate.estimatedFare
    const num = Number(offerFare) || estimate.estimatedFare
    return Math.max(num, 0)
  }, [estimate, offerFare])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!pickup || !destination) return toast.error('Pickup & Destination required')
    try {
      const rideResp = await createRide({
        pickupLocation: pickup,
        destination,
        pickupTime,
        paymentMethod,
        offerFare: typeof offerFare === 'number' ? offerFare : undefined,
      }).unwrap()

      if (paymentMethod === 'card') {
        await createIntent({ rideId: rideResp.data._id, method: 'card' }).unwrap()
        toast.success('Payment authorized. Ride requested!')
      } else {
        toast.success('Ride requested!')
      }

      setPickup('')
      setDestination('')
      setPickupTime('')
      setOfferFare('')
    } catch (e: any) {
      toast.error(e?.data?.message || 'Failed to request ride')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-indigo-100"
      >
        <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-4">Request a Ride</h1>
        <p className="text-center text-gray-600 mb-6">Fill in your ride details and get moving 🚀</p>

        <form onSubmit={submit} className="space-y-4">
          <div className="relative">
            <MapPin className="absolute left-4 top-3 text-indigo-400" />
            <input
              placeholder="Pickup location"
              value={pickup}
              onChange={e => setPickup(e.target.value)}
              className="w-full pl-12 px-5 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 placeholder-gray-400 text-gray-900 transition"
            />
          </div>

          <div className="relative">
            <Flag className="absolute left-4 top-3 text-pink-400" />
            <input
              placeholder="Destination"
              value={destination}
              onChange={e => setDestination(e.target.value)}
              className="w-full pl-12 px-5 py-3 rounded-xl border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 placeholder-gray-400 text-gray-900 transition"
            />
          </div>

          <input
            type="datetime-local"
            value={pickupTime}
            onChange={e => setPickupTime(e.target.value)}
            className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 text-gray-900 transition"
          />

          <div className="grid md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value as PaymentMethod)}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="wallet">Wallet</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Offer Fare (Optional)</label>
              <input
                type="number"
                min={0}
                value={offerFare}
                onChange={e => setOfferFare(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="৳"
              />
            </div>
          </div>

          <div className="rounded-xl bg-indigo-50 p-3 text-sm">
            <div className="font-medium">Estimated Fare</div>
            <div>
              {estimating
                ? 'Calculating…'
                : estimate
                ? `৳${estimate.estimatedFare} · ${estimate.distanceKm} km · ~${estimate.durationMin} min`
                : 'Enter pickup & destination'}
            </div>
            {finalFare !== undefined && (
              <div className="mt-1">Final fare (with offer): <b>৳{finalFare}</b></div>
            )}
          </div>

          <button
            type="submit"
            disabled={creating || paying}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {creating || paying ? 'Processing…' : 'Request Ride'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
