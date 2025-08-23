import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export default function About() {
  const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

  return (
    <div className="min-h-screen px-6 py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 relative overflow-hidden">
      {/* Floating colorful blobs */}
      <div className="absolute -top-20 -left-10 w-40 h-40 bg-pink-200 rounded-full opacity-25 animate-pulse mix-blend-multiply"></div>
      <div className="absolute -bottom-20 -right-10 w-48 h-48 bg-yellow-200 rounded-full opacity-20 animate-pulse mix-blend-multiply"></div>
      <div className="absolute top-1/3 right-0 w-32 h-32 bg-indigo-300 rounded-full opacity-20 animate-pulse mix-blend-multiply"></div>

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">

        {/* Header */}
        <motion.h1
          className="text-5xl font-extrabold text-center text-indigo-700 mb-6"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
        >
          About <span className="text-pink-500">RideX</span>
        </motion.h1>

        {/* Intro */}
        <motion.p
          className="text-lg text-gray-700 text-center mb-12 leading-relaxed max-w-3xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          RideX is a next-gen ride-sharing platform born in{" "}
          <span className="font-semibold">Dhaka</span>, built with one vision:{" "}
          <span className="italic">making city rides safer, faster, and smarter.</span>{" "}
          We connect riders and drivers through technology that works seamlessly
          and transparently.
        </motion.p>

        {/* Mission / Values / Vision */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Mission */}
          <motion.div
            className="rounded-3xl shadow-lg p-6 hover:scale-105 hover:shadow-2xl transition bg-gradient-to-tr from-indigo-100 to-indigo-200 border border-indigo-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-xl font-semibold text-indigo-700 mb-3">🚀 Our Mission</h2>
            <p className="text-gray-700">
              To redefine urban mobility by creating a reliable, affordable, and
              eco-friendly ride-sharing ecosystem for millions of people across
              Bangladesh.
            </p>
          </motion.div>

          {/* Values */}
          <motion.div
            className="rounded-3xl shadow-lg p-6 hover:scale-105 hover:shadow-2xl transition bg-gradient-to-tr from-pink-100 to-pink-200 border border-pink-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-pink-700 mb-3">💡 Our Values</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Safety first for both riders & drivers</li>
              <li>Transparency in pricing & policies</li>
              <li>Innovation for smarter city rides</li>
              <li>Empowering drivers with better earnings</li>
            </ul>
          </motion.div>

          {/* Vision */}
          <motion.div
            className="rounded-3xl shadow-lg p-6 hover:scale-105 hover:shadow-2xl transition bg-gradient-to-tr from-green-100 to-green-200 border border-green-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-green-700 mb-3">🌍 Our Vision</h2>
            <p className="text-gray-700">
              To become Bangladesh’s most trusted mobility platform, reducing
              traffic stress and shaping smarter cities for the future.
            </p>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="mt-16 text-center p-12 rounded-3xl shadow-lg bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ delay: 0.4 }}
        >
          <p className="text-lg font-medium text-indigo-700 mb-6">
            Together, let’s move Dhaka{" "}
            <span className="font-semibold text-pink-500">smarter</span> 🚖
          </p>
          <Link
            to="/register"
            className="px-8 py-4 bg-white text-purple-800 rounded-lg font-bold hover:bg-yellow-200 transition shadow-lg"
          >
            Join RideX Now
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
