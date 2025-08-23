import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const DATA = [
  { q: "How do I request a ride?", a: "Register as Rider, then go to Rider → Request." },
  { q: "How are drivers approved?", a: "Admins verify and set driver status to approved." },
  { q: "How do I see my earnings?", a: "Drivers can view Earnings page for totals & charts." },
  { q: "Can I schedule a ride in advance?", a: "Yes, Riders can schedule rides for future dates and times." },
  { q: "How do I reset my password?", a: "Go to Profile → Settings → Reset Password." },
  { q: "Is my payment information secure?", a: "Yes, all transactions are processed with industry-standard encryption." },
  { q: "How do I contact my driver?", a: "Once a ride is accepted, you can call or message the driver directly from the app." },
  { q: "What happens if I cancel a ride?", a: "Riders can cancel before a driver accepts without any charge. After acceptance, a small cancellation fee may apply." },
  { q: "Can drivers reject ride requests?", a: "Yes, drivers can choose to accept or reject requests based on availability." },
  { q: "How do admins manage users?", a: "Admins can approve, suspend, or update any Rider or Driver accounts." },
];

export default function FAQ() {
  const [search, setSearch] = useState("");
  const items = useMemo(
    () => DATA.filter((d) => d.q.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 px-4 py-16">
      {/* Floating colorful blobs */}
      <div className="absolute -top-24 -left-16 w-48 h-48 bg-pink-200 rounded-full opacity-25 animate-pulse mix-blend-multiply"></div>
      <div className="absolute -bottom-24 -right-16 w-60 h-60 bg-yellow-200 rounded-full opacity-20 animate-pulse mix-blend-multiply"></div>
      <div className="absolute top-1/3 right-0 w-32 h-32 bg-indigo-300 rounded-full opacity-20 animate-pulse mix-blend-multiply"></div>

      <div className="max-w-3xl mx-auto relative z-10 space-y-12">
        {/* Heading */}
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-center text-indigo-700"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
        >
          Frequently Asked <span className="text-pink-500">Questions</span>
        </motion.h1>

        <motion.p
          className="text-center text-gray-700 max-w-xl mx-auto leading-relaxed"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Find quick answers about <span className="text-pink-600 font-semibold">rides</span>,{" "}
          <span className="text-indigo-600 font-semibold">drivers</span>, and{" "}
          <span className="text-green-600 font-semibold">earnings</span>.
        </motion.p>

        {/* Search Input */}
        <motion.input
          className="w-full border border-indigo-200 p-3 rounded-xl mb-6 shadow-sm focus:ring-2 focus:ring-indigo-300 outline-none bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50"
          placeholder="🔍 Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          transition={{ delay: 0.3 }}
        />

        {/* FAQ List */}
        <div className="space-y-4">
          {items.map((d, i) => (
            <motion.details
              key={i}
              className="group rounded-3xl p-5 border border-gray-200 bg-gradient-to-r from-pink-50 via-indigo-50 to-green-50 shadow-sm hover:shadow-lg transition transform hover:-translate-y-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: i * 0.1 }}
            >
              <summary className="flex items-center justify-between cursor-pointer text-lg font-semibold text-gray-800">
                {d.q}
                <ChevronDown className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180" />
              </summary>
              <p className="text-gray-700 mt-3 leading-relaxed">{d.a}</p>
            </motion.details>
          ))}

          {items.length === 0 && (
            <motion.p
              className="text-center text-gray-500 italic"
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              transition={{ duration: 0.5 }}
            >
              No results found ❌
            </motion.p>
          )}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center p-8 rounded-3xl bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ delay: 0.5 }}
        >
          <p className="text-lg text-indigo-700 mb-4">
            Still have questions?{" "}
            <span className="font-semibold text-pink-500">Contact Support</span> 💬
          </p>
          <Link
            to="/contact"
            className="px-8 py-3 rounded-lg bg-white text-purple-800 font-bold hover:bg-yellow-200 transition shadow-md hover:shadow-xl"
          >
            Reach Out Now
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
