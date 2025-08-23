
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../features/auth/authSlice";
import { UserRole } from "../utils/types";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { user } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const menu = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/faq", label: "FAQ" },
    { to: "/features", label: "Services" },
  ];

  const gotoDashboard = () => {
    if (!user) return;
    if (user.role === UserRole.RIDER) navigate("/rider");
    else if (user.role === UserRole.DRIVER) navigate("/driver");
    else navigate("/admin");
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
          {menu.map((m) => (
            <NavLink
              key={m.to}
              to={m.to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl transition-colors ${
                  isActive ? "bg-red-50 text-red-600" : "hover:bg-gray-100"
                }`
              }
            >
              {m.label}
            </NavLink>
          ))}
        </div>

        {/* Auth / Dashboard buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <NavLink
                to="/login"
                className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition-colors"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors shadow-sm"
              >
                Register
              </NavLink>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={gotoDashboard}
                className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Dashboard
              </button>
              <button
                onClick={() => dispatch(logout())}
                className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors shadow-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown with Animation */}
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
              {menu.map((m) => (
                <NavLink
                  key={m.to}
                  to={m.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-xl transition-colors ${
                      isActive ? "bg-red-50 text-red-600" : "hover:bg-gray-100"
                    }`
                  }
                >
                  {m.label}
                </NavLink>
              ))}

              {/* Auth buttons (Mobile) */}
              {!user ? (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition-colors"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors shadow-sm"
                  >
                    Register
                  </NavLink>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      gotoDashboard();
                      setOpen(false);
                    }}
                    className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors text-left"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      dispatch(logout());
                      setOpen(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors text-left shadow-sm"
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
