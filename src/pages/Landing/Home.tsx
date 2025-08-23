import { Link } from 'react-router-dom'
import { useGetAllRidesPublicQuery } from '../../api/rideApi'
import type { Ride } from '../../utils/types'
import { motion } from 'framer-motion'
import { ShieldCheck, Timer, DollarSign, Star, FileText, Truck, PhoneCall } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix marker icon
const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})
L.Marker.prototype.options.icon = defaultIcon

export default function Home() {
  const { data } = useGetAllRidesPublicQuery()
  const rides: Ride[] = data?.data || []

  const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

  const pickup: [number, number] = [23.8103, 90.4125]
  const destination: [number, number] = [23.7806, 90.2794]

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 relative overflow-hidden">
      {/* Floating shapes */}
      <div className="absolute -top-24 -left-12 w-60 h-60 bg-pink-300 rounded-full opacity-25 animate-pulse mix-blend-multiply"></div>
      <div className="absolute -bottom-24 -right-12 w-64 h-64 bg-yellow-300 rounded-full opacity-20 animate-pulse mix-blend-multiply"></div>
      <div className="absolute top-1/3 right-0 w-32 h-32 bg-indigo-300 rounded-full opacity-20 animate-pulse mix-blend-multiply"></div>

      <div className="max-w-6xl mx-auto space-y-20 relative z-10">

        {/* Hero */}
        <section className="text-white">
          <div className="px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl font-extrabold mb-6 text-indigo-700">
                Move Smarter with <span className="text-pink-500">RideX</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-700">
                Reliable rides for everyday travel — safe, fast, and affordable.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link to="/register" className="px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-300 to-pink-300 text-purple-800 font-semibold hover:from-yellow-400 hover:to-pink-400 transition shadow-lg">
                  Get Started
                </Link>
                <Link to="/features" className="px-6 py-3 rounded-lg border border-indigo-300 text-indigo-700 hover:bg-indigo-100 hover:text-purple-800 transition shadow">
                  See Features
                </Link>
              </div>
            </motion.div>
            <motion.img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"
              alt="Ride"
              className="rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            />
          </div>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12 text-indigo-700">Our Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <ShieldCheck size={40} />, title: "Safe Rides", desc: "Vetted drivers ensure your safety." },
              { icon: <Timer size={40} />, title: "Fast Service", desc: "Quick ride matching for your convenience." },
              { icon: <DollarSign size={40} />, title: "Affordable", desc: "Transparent pricing with no hidden fees." },
            ].map((f, i) => (
              <motion.div
                key={i}
                className="p-8 rounded-3xl bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100 shadow-lg hover:shadow-2xl text-center transform hover:-translate-y-2 transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <div className="mb-4 text-purple-700">{f.icon}</div>
                <h3 className="font-bold text-xl mb-2">{f.title}</h3>
                <p className="text-gray-700">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Preview Ride */}
        <section>
          <motion.h2 className="text-3xl font-bold text-center mb-6 text-indigo-700" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
            Preview Your Ride
          </motion.h2>
          <p className="text-center mb-8 text-gray-700">See your pickup to destination route live on map.</p>
          <motion.div
            className="rounded-3xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <MapContainer center={pickup} zoom={12} style={{ height: "400px", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={pickup}><Popup>Pickup: Dhaka</Popup></Marker>
              <Marker position={destination}><Popup>Destination: Dhanmondi</Popup></Marker>
              <Polyline positions={[pickup, destination]} color="purple" weight={5} />
            </MapContainer>
          </motion.div>
        </section>

        {/* Testimonials */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12 text-indigo-700">What Our Riders Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Ayesha", text: "RideX made my daily commute stress-free!" },
              { name: "Rahim", text: "Affordable rides and very safe." },
              { name: "Nusrat", text: "The drivers are always polite and professional." },
            ].map((t, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-2xl bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 shadow-lg hover:shadow-2xl text-center transform hover:-translate-y-1 transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <Star className="mx-auto text-yellow-500 mb-3" size={28} />
                <p className="italic mb-3">“{t.text}”</p>
                <h4 className="font-semibold text-indigo-700">{t.name}</h4>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Recent Rides */}
        {rides.length > 0 && (
          <section>
            <h3 className="font-bold text-3xl mb-6 text-indigo-700">Recent Requests (Public)</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {rides.slice(0, 6).map((r) => (
                <motion.div
                  key={r._id}
                  className="p-6 rounded-2xl bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="font-medium text-indigo-700">{r.pickupLocation} → {r.destination}</div>
                  <div className="text-sm text-gray-500 mt-2">{r.status}</div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Pricing Plans */}
        <section className="p-8 rounded-3xl shadow-inner bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100">
          <h2 className="text-3xl font-bold text-center mb-12 text-indigo-700">Pricing Plans</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[{ title: "Basic", price: "$2 / ride", desc: "Simple fare for everyday travel" },
              { title: "Premium", price: "$5 / ride", desc: "Priority ride with premium drivers" },
              { title: "Unlimited", price: "$50 / month", desc: "Unlimited rides for heavy users" },
            ].map((p, i) => (
              <motion.div
                key={i}
                className="p-8 rounded-2xl shadow-lg bg-white hover:shadow-2xl text-center transform hover:-translate-y-1 transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <h3 className="font-bold text-xl mb-2">{p.title}</h3>
                <p className="text-2xl font-extrabold text-indigo-700 mb-2">{p.price}</p>
                <p className="text-gray-600">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="p-8 rounded-3xl shadow-inner bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100">
          <h2 className="text-3xl font-bold text-center mb-12 text-indigo-700">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: <FileText size={36} />, title: "Request a Ride", desc: "Enter pickup & destination." },
              { icon: <Truck size={36} />, title: "Driver Assigned", desc: "A nearby driver accepts your ride." },
              { icon: <PhoneCall size={36} />, title: "Enjoy Your Ride", desc: "Sit back and reach safely." },
            ].map((s, i) => (
              <motion.div
                key={i}
                className="p-8 rounded-2xl shadow-lg bg-white transform hover:-translate-y-1 transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <div className="mb-4 text-indigo-600">{s.icon}</div>
                <h4 className="font-semibold text-lg mb-2">{s.title}</h4>
                <p className="text-gray-600">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact / CTA */}
        <section className="text-center p-12 rounded-3xl shadow-inner bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300">
          <h2 className="text-3xl font-bold mb-6 text-indigo-700">Ready to Ride?</h2>
          <p className="text-gray-700 mb-6">Join RideX today and experience smarter city travel!</p>
          <Link to="/register" className="px-8 py-4 bg-white text-purple-800 rounded-lg font-bold hover:bg-yellow-200 transition shadow-lg">
            Get Started Now
          </Link>
        </section>

      </div>
    </div>
  )
}
