import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !/\S+@\S+\.\S+/.test(form.email) || !form.message) {
      toast.error("Please fill all fields with a valid email.");
      return;
    }
    toast.success("Message submitted! We will get back to you.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 px-4 py-16">
      {/* Floating colorful shapes */}
      <div className="absolute -top-24 -left-16 w-48 h-48 bg-pink-200 rounded-full opacity-25 animate-pulse mix-blend-multiply"></div>
      <div className="absolute -bottom-24 -right-16 w-60 h-60 bg-yellow-200 rounded-full opacity-20 animate-pulse mix-blend-multiply"></div>
      <div className="absolute top-1/3 right-0 w-32 h-32 bg-indigo-300 rounded-full opacity-20 animate-pulse mix-blend-multiply"></div>

      <div className="max-w-lg mx-auto relative z-10">
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200 hover:shadow-3xl transform hover:-translate-y-2 transition-all"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl font-extrabold text-indigo-700 text-center mb-2">
            Contact Us
          </h1>
          <p className="text-center text-gray-700 mb-6">
            We’d love to hear from you! Fill out the form below.
          </p>

          <form onSubmit={onSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50"
            />

            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50"
            />

            <textarea
              placeholder="Your Message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full p-3 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50"
            />

            <motion.button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-300 via-yellow-300 to-indigo-300 text-gray-900 font-semibold text-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message ✉️
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
