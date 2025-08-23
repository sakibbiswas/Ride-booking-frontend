import { useState } from 'react';
import { useRegisterMutation } from '../../api/authApi';
import { UserRole } from '../../utils/types';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Register() {
  const [form, setForm] = useState<{name:string; email:string; password:string; role:UserRole}>({
    name:'', email:'', password:'', role: UserRole.RIDER
  });
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !/\S+@\S+\.\S+/.test(form.email) || form.password.length < 6) {
      toast.error('Provide valid name, email and password (min 6).'); 
      return;
    }
    try {
      await register(form).unwrap();
      toast.success('Registered! Please login.');
      navigate('/login');
    } catch (e: any) {
      toast.error(e?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-indigo-100 via-pink-50 to-yellow-50 overflow-hidden">
      {/* Floating colorful shapes */}
      <div className="absolute -top-20 -left-16 w-48 h-48 bg-pink-200 rounded-full opacity-25 animate-pulse mix-blend-multiply"></div>
      <div className="absolute -bottom-20 -right-16 w-60 h-60 bg-yellow-200 rounded-full opacity-20 animate-pulse mix-blend-multiply"></div>
      <div className="absolute top-1/3 right-0 w-32 h-32 bg-indigo-300 rounded-full opacity-20 animate-pulse mix-blend-multiply"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md bg-white shadow-2xl rounded-3xl p-10 border border-indigo-100"
      >
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-4">
          Create Account
        </h1>
        <p className="text-center text-gray-600 mb-8 text-lg">
          Join <span className="font-semibold text-pink-500">RideX</span> and start your journey today 🚗
        </p>

        {/* Form */}
        <form onSubmit={submit} className="space-y-6">
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={e => setForm({...form, name:e.target.value})}
            className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 text-gray-900 placeholder-gray-400 transition"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({...form, email:e.target.value})}
            className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 text-gray-900 placeholder-gray-400 transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({...form, password:e.target.value})}
            className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 text-gray-900 placeholder-gray-400 transition"
          />
          <select
            value={form.role}
            onChange={e => setForm({...form, role: e.target.value as UserRole})}
            className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 text-gray-900 placeholder-gray-400 transition"
          >
            <option value={UserRole.RIDER}>Rider</option>
            <option value={UserRole.DRIVER}>Driver</option>
          </select>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition transform disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Submitting...' : 'Register'}
          </button>
        </form>

        {/* Footer CTA */}
        <p className="text-center text-gray-500 mt-6 text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  )
}
