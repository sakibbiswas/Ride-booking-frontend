import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <footer className="relative bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white mt-16 overflow-hidden">
      {/* Floating colorful shapes */}
      <div className="absolute -top-16 -left-16 w-48 h-48 bg-pink-400 rounded-full opacity-20 animate-pulse mix-blend-multiply"></div>
      <div className="absolute -bottom-16 -right-16 w-60 h-60 bg-yellow-400 rounded-full opacity-15 animate-pulse mix-blend-multiply"></div>
      <div className="absolute top-1/3 right-0 w-32 h-32 bg-indigo-500 rounded-full opacity-20 animate-pulse mix-blend-multiply"></div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8 relative z-10"
      >
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-3 text-yellow-300">RideX</h2>
          <p className="text-gray-200">Safe, fast, and affordable rides for everyone.</p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="hover:text-yellow-300 transition transform hover:scale-110"><Facebook size={20} /></a>
            <a href="#" className="hover:text-yellow-300 transition transform hover:scale-110"><Twitter size={20} /></a>
            <a href="#" className="hover:text-yellow-300 transition transform hover:scale-110"><Instagram size={20} /></a>
            <a href="#" className="hover:text-yellow-300 transition transform hover:scale-110"><Linkedin size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3 text-indigo-200">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-yellow-300 transition transform hover:scale-105">Home</a></li>
            <li><a href="/features" className="hover:text-yellow-300 transition transform hover:scale-105">Features</a></li>
            <li><a href="/pricing" className="hover:text-yellow-300 transition transform hover:scale-105">Pricing</a></li>
            <li><a href="/contact" className="hover:text-yellow-300 transition transform hover:scale-105">Contact</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold mb-3 text-indigo-200">Legal</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-300 transition transform hover:scale-105">Terms of Service</a></li>
            <li><a href="#" className="hover:text-yellow-300 transition transform hover:scale-105">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-yellow-300 transition transform hover:scale-105">Refund Policy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold mb-3 text-indigo-200">Subscribe</h3>
          <p className="text-gray-200 mb-4">Get latest updates and offers.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-lg text-gray-800 focus:outline-none"
            />
            <button className="px-4 py-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 text-white rounded-lg font-semibold hover:scale-105 transition shadow-lg">
              Subscribe
            </button>
          </div>
        </div>
      </motion.div>

      {/* Footer Bottom */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="border-t border-white/20 mt-8 py-4 text-center text-gray-200 text-sm relative z-10"
      >
        &copy; {new Date().getFullYear()} RideX. All rights reserved.
      </motion.div>
    </footer>
  )
}
