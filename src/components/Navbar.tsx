
// src/components/Navbar.tsx
import { Link, NavLink, } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../features/auth/authSlice";
import { UserRole } from "../utils/types";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { user } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
//   const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // Public menu (only when not logged in)
  const menu = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/features", label: "Services" },
    { to: "/contact", label: "Contact" },
    { to: "/faq", label: "FAQ" },
  ];

  //  Dashboard route by role
  const dashboardRoute = () => {
    if (!user) return "/";
    if (user.role === UserRole.RIDER) return "/rider";
    if (user.role === UserRole.DRIVER) return "/driver";
    return "/admin";
  };

  //  Settings route by role
  const settingsRoute = () => {
    if (!user) return "/";
    if (user.role === UserRole.RIDER) return "/rider/settings";
    if (user.role === UserRole.DRIVER) return "/driver/settings";
    return "/admin/settings"; // << fixed for admin
  };

  return (
    <nav className="sticky top-0 z-40 bg-gradient-to-r from-white via-gray-200 to-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-bold text-2xl text-red-500">
          RideX
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center">
          {!user &&
            menu.map((m) => (
              <NavLink
                key={m.to}
                to={m.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl transition-colors ${
                    isActive
                      ? "bg-red-50 text-red-600"
                      : "hover:bg-gray-100 text-gray-700"
                  }`
                }
              >
                {m.label}
              </NavLink>
            ))}
        </div>

        {/* Desktop Auth / User actions */}
        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <NavLink
                to="/login"
                className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 shadow-sm"
              >
                Register
              </NavLink>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <NavLink
                to={settingsRoute()}
                className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50"
              >
                Settings
              </NavLink>
              <NavLink
                to={dashboardRoute()}
                className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50"
              >
                Dashboard
              </NavLink>
              <button
                onClick={() => dispatch(logout())}
                className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 shadow-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white shadow-xl border-t rounded-b-2xl"
          >
            <div className="flex flex-col px-4 py-4 gap-2">
              {!user &&
                menu.map((m) => (
                  <NavLink
                    key={m.to}
                    to={m.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-xl transition-colors ${
                        isActive
                          ? "bg-red-50 text-red-600"
                          : "hover:bg-gray-100 text-gray-700"
                      }`
                    }
                  >
                    {m.label}
                  </NavLink>
                ))}

              {!user ? (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 shadow-sm"
                  >
                    Register
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to={settingsRoute()}
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 text-left"
                  >
                    Settings
                  </NavLink>
                  <NavLink
                    to={dashboardRoute()}
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 text-left"
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={() => {
                      dispatch(logout());
                      setOpen(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 text-left shadow-sm"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
