
import { useState, useEffect } from 'react';
import { useLoginMutation, useMeQuery } from '../../api/authApi';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCredentials } from '../../features/auth/authSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../../utils/types';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token, user } = useAppSelector((s) => s.auth);

  const { data: me } = useMeQuery(undefined, { skip: !token });

  useEffect(() => {
    if (token && me) {
      dispatch(setCredentials({ token, user: me.data || me }));
      redirect(me.data || me);
    }
  }, [me, token]);

  const redirect = (u: any) => {
    if (u.isBlocked) return navigate('/status');
    if (u.role === UserRole.RIDER) navigate('/rider');
    else if (u.role === UserRole.DRIVER) navigate('/driver');
    else navigate('/admin');
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(form).unwrap();
      dispatch(setCredentials({ token: res.token, user: res.user }));
      toast.success('Logged in successfully');
      redirect(res.user);
    } catch (err: any) {
      toast.error(err?.data?.message || 'Login failed');
    }
  };

  if (user) return null;

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
          Welcome Back!
        </h1>
        <p className="text-center text-gray-600 mb-8 text-lg">
          Sign in to continue your ride with <span className="font-semibold text-pink-500">RideX</span> 🚗
        </p>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 text-gray-900 placeholder-gray-400 transition"
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 text-gray-900 placeholder-gray-400 transition pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-indigo-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

       
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition transform disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        {/* Footer CTA */}
        <p className="text-center text-gray-500 mt-6 text-sm">
          Don’t have an account?{' '}
          <a href="/register" className="text-indigo-600 font-medium hover:underline">
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
}
