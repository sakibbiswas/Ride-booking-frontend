import { Users, CarFront, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function Features() {
  const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  const list = [
    {
      title: "Rider",
      icon: <CarFront className="w-8 h-8 text-pink-600" />,
      color: "from-pink-50 to-pink-100 border-pink-200",
      text: "text-pink-700",
      items: [
        "Request ride instantly",
        "View ride history & filters",
        "Manage profile & password",
      ],
    },
    {
      title: "Driver",
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      color: "from-indigo-50 to-indigo-100 border-indigo-200",
      text: "text-indigo-700",
      items: [
        "Go Online / Offline anytime",
        "Accept or reject ride requests",
        "Track earnings with charts",
      ],
    },
    {
      title: "Admin",
      icon: <ShieldCheck className="w-8 h-8 text-green-600" />,
      color: "from-green-50 to-green-100 border-green-200",
      text: "text-green-700",
      items: [
        "Approve / suspend drivers",
        "Monitor rides & analytics",
        "Manage all users & roles",
      ],
    },
  ];

  return (
    <div className="relative min-h-screen px-6 py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 overflow-hidden">
      {/* Floating colorful blobs */}
      <div className="absolute -top-24 -left-16 w-48 h-48 bg-pink-200 rounded-full opacity-25 animate-pulse mix-blend-multiply"></div>
      <div className="absolute -bottom-24 -right-16 w-60 h-60 bg-yellow-200 rounded-full opacity-20 animate-pulse mix-blend-multiply"></div>
      <div className="absolute top-1/3 right-0 w-32 h-32 bg-indigo-300 rounded-full opacity-20 animate-pulse mix-blend-multiply"></div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-16">
        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center text-indigo-700"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
        >
          Platform <span className="text-pink-500">Features</span>
        </motion.h2>
        <motion.p
          className="text-center text-gray-700 mb-14 max-w-2xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Explore the powerful features that make <span className="font-semibold text-indigo-600">RideX</span> seamless
          for Riders, Drivers & Admins.
        </motion.p>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {list.map((card, i) => (
            <motion.div
              key={card.title}
              className={`rounded-3xl shadow-lg p-8 bg-gradient-to-tr ${card.color} border relative group hover:shadow-2xl transform hover:-translate-y-2 transition`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white rounded-full shadow-md">{card.icon}</div>
                <h3 className={`text-2xl font-bold ${card.text}`}>{card.title}</h3>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {card.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Extra Highlight & CTA */}
        <motion.div
          className="mt-20 text-center space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xl font-medium text-gray-700">
            Built for <span className="text-pink-600 font-semibold">Riders</span>,{" "}
            <span className="text-indigo-600 font-semibold">Drivers</span> &{" "}
            <span className="text-green-600 font-semibold">Admins</span> — all in
            one seamless platform
          </p>
          <button className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition transform">
            Get Started Today
          </button>
        </motion.div>
      </div>
    </div>
  );
}
