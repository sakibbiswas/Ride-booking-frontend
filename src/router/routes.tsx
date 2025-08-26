import { Route, Routes, Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Landing/Home'
import About from '../pages/Landing/About'
import Features from '../pages/Landing/Features'
import Contact from '../pages/Landing/Contact'
import FAQ from '../pages/Landing/FAQ'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import ProtectedRoute from '../components/ProtectedRoute'
import RoleGuard from '../components/RoleGuard'
import { UserRole } from '../utils/types'

// Rider pages
import RiderDashboard from '../pages/Rider/RiderDashboard'
import RequestRide from '../pages/Rider/RequestRide'
import RideHistory from '../pages/Rider/RideHistory'
import RiderProfile from '../pages/Rider/Profile'

// Driver pages
import DriverDashboard from '../pages/Driver/DriverDashboard'
import IncomingRequests from '../pages/Driver/IncomingRequests'
import ActiveRide from '../pages/Driver/ActiveRide'
import Earnings from '../pages/Driver/Earnings'
import DriverProfile from '../pages/Driver/Profile'


// Admin pages
import AdminDashboard from '../pages/Admin/AdminDashboard'
import Users from '../pages/Admin/Users'
import Rides from '../pages/Admin/Rides'
import Analytics from '../pages/Admin/Analytics'

// Shared
import AccountStatus from '../pages/Status/AccountStatus'
import SettingsPage from '../pages/settings/SettingsPage'

export default function RoutesConfig() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="features" element={<Features />} />
        <Route path="contact" element={<Contact />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="status" element={<AccountStatus />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* 🔒 Protected Routes */}
        <Route element={<ProtectedRoute />}>
          
          {/* Rider Routes */}
          <Route element={<RoleGuard allow={[UserRole.RIDER]} />}>
            <Route path="rider" element={<RiderDashboard />} />
            <Route path="rider/request" element={<RequestRide />} />
            <Route path="rider/history" element={<RideHistory />} />
            <Route path="rider/profile" element={<RiderProfile />} />
            <Route path="rider/settings" element={<SettingsPage />} />
          </Route>

          {/* Driver Routes */}
          <Route element={<RoleGuard allow={[UserRole.DRIVER]} />}>
            <Route path="driver" element={<DriverDashboard />} />
            <Route path="driver/incoming" element={<IncomingRequests />} />
            <Route path="driver/active" element={<ActiveRide />} />
            
            <Route path="driver/earnings" element={<Earnings />} />
            <Route path="driver/profile" element={<DriverProfile />} />
            <Route path="driver/settings" element={<SettingsPage />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<RoleGuard allow={[UserRole.ADMIN]} />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/users" element={<Users />} />
            <Route path="admin/rides" element={<Rides />} />
            <Route path="admin/analytics" element={<Analytics />} />
            <Route path="admin/settings" element={<SettingsPage />} />
          </Route>
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
