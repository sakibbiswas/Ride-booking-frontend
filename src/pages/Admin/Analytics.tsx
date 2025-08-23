import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import Loader from '../../components/Loader';
import { motion } from 'framer-motion';

type RideVol = { date: string; rides: number };
type Rev = { date: string; revenue: number };
type PieItem = { name: string; value: number };

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [rideVolume, setRideVolume] = useState<RideVol[]>([]);
  const [revenue, setRevenue] = useState<Rev[]>([]);
  const [driverActivity, setDriverActivity] = useState<PieItem[]>([]);
  const [topDrivers, setTopDrivers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const COLORS: Record<string, string> = {
    Online: '#10B981',
    Offline: '#EF4444',
  };

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/v1/admin/analytics', {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
          },
        });
        const text = await res.text();
        let body;
        try {
          body = JSON.parse(text);
        } catch {
          throw new Error('Invalid JSON response: ' + text.slice(0, 200));
        }
        if (!res.ok) throw new Error(body?.message || `HTTP ${res.status}`);
        const d = body.data;
        setRideVolume(d.rideVolume || []);
        setRevenue(d.revenue || []);
        setDriverActivity(d.driverActivity || []);
        setTopDrivers(d.topDrivers || []);
      } catch (err: any) {
        console.error(err);
        setError(err?.message || 'Failed to load analytics');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="p-4 border rounded-xl text-red-600 text-center">{error}</div>
      </div>
    );

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-indigo-50 via-pink-50 to-yellow-50 relative overflow-hidden">
      {/* Floating optimism circles */}
      <div className="absolute -top-16 -left-10 w-40 h-40 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-10 w-48 h-48 bg-yellow-200 rounded-full opacity-15 animate-pulse"></div>

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        <h1 className="text-3xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-500">
          🌟 Analytics Dashboard
        </h1>

        {/* Ride Volume */}
        <motion.div className="bg-white shadow-xl rounded-3xl p-6 mb-6" whileHover={{ scale: 1.01 }}>
          <h2 className="text-xl font-semibold mb-3 text-indigo-600">Ride Volume (Last 7 days)</h2>
          <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer>
              <LineChart data={rideVolume}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="rides" stroke="#3B82F6" strokeWidth={3} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Revenue */}
        <motion.div className="bg-white shadow-xl rounded-3xl p-6 mb-6" whileHover={{ scale: 1.01 }}>
          <h2 className="text-xl font-semibold mb-3 text-green-600">Revenue (Completed rides - Last 7 days)</h2>
          <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer>
              <BarChart data={revenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#10B981" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Driver Activity */}
        <motion.div className="bg-white shadow-xl rounded-3xl p-6 mb-6" whileHover={{ scale: 1.01 }}>
          <h2 className="text-xl font-semibold mb-3 text-pink-600">Driver Activity</h2>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={driverActivity}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {driverActivity.map((slice, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[slice.name] || '#8884d8'} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top Drivers */}
        <motion.div className="bg-white shadow-xl rounded-3xl p-6" whileHover={{ scale: 1.01 }}>
          <h2 className="text-xl font-semibold mb-3 text-yellow-600">Top Drivers (30 days)</h2>
          {topDrivers.length === 0 ? (
            <div className="text-gray-500">No data available.</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {topDrivers.map((d) => (
                <motion.div
                  key={d.driverId}
                  className="p-4 bg-gradient-to-r from-indigo-100 via-pink-100 to-yellow-100 rounded-2xl shadow-md flex justify-between items-center transition"
                  whileHover={{ scale: 1.03, boxShadow: '0 10px 20px rgba(0,0,0,0.15)' }}
                >
                  <div>
                    <div className="font-semibold text-indigo-700">{d.name ?? d.email ?? 'Unknown'}</div>
                    <div className="text-sm text-gray-600">
                      Rides: {d.rides} · Revenue: ৳{d.revenue}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
