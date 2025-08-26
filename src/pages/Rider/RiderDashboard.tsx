
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import SOSButton from '../../components/SOSButton';
import { API_BASE_URL } from '../../utils/constants';

export default function RiderDashboard() {
  const { user, token } = useAppSelector((s) => s.auth);
  const [onlineDrivers, setOnlineDrivers] = useState<number | null>(null);

  useEffect(() => {
    const fetchOnlineDrivers = async () => {
      if (!token) return;

      try {
        const res = await fetch(`${API_BASE_URL}/rides/online-drivers`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          setOnlineDrivers(0);
          return;
        }

        const data = await res.json();
        setOnlineDrivers(data.success ? data.onlineDrivers ?? 0 : 0);
      } catch (err) {
        console.error(err);
        setOnlineDrivers(0);
      }
    };

    fetchOnlineDrivers();
  }, [token]);

  const options = [
    { label: 'Request a Ride', to: '/rider/request', from: 'from-indigo-400', toColor: 'to-purple-500' },
    { label: 'Ride History', to: '/rider/history', from: 'from-pink-400', toColor: 'to-red-500' },
    { label: 'Profile', to: '/rider/profile', from: 'from-yellow-400', toColor: 'to-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-2">
          Welcome, {user?.name}
        </h1>
        <p className="text-gray-600 mb-6 text-lg">
          What would you like to do today?
        </p>

        {/* Online Drivers Card */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          className="p-6 rounded-2xl bg-green-50 shadow-md border border-green-100 mb-8"
        >
          <p className="text-lg font-semibold text-gray-700">
            Online Drivers:{' '}
            <span className="text-green-600 text-xl font-bold">
              {onlineDrivers !== null ? onlineDrivers : '...'}
            </span>
          </p>
        </motion.div>

        {/* Rider Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {options.map((opt) => (
            <motion.div key={opt.to} whileHover={{ scale: 1.05 }}>
              <Link
                to={opt.to}
                className={`block p-6 rounded-2xl bg-gradient-to-r ${opt.from} ${opt.toColor} text-white font-semibold shadow-lg text-center transition`}
              >
                {opt.label}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* SOS Button */}
        <SOSButton
          phone="999"
          contactWhatsApp="8801631479509"
          visible={true}
        />
      </motion.div>
    </div>
  );
}
