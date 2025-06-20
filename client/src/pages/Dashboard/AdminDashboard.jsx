import React, { useState, useEffect } from "react";
import { FaUsers, FaWallet, FaChartLine, FaCog, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { BiMoneyWithdraw } from "react-icons/bi";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: FaChartLine,
      current: location.pathname === '/dashboard'
    },
    {
      name: 'Users',
      href: '/dashboard',
      icon: FaUsers,
      current: location.pathname === '/dashboard'
    },
    {
      name: 'Withdraw Requests',
      href: '/dashboard/withdraw-requests',
      icon: BiMoneyWithdraw,
      current: location.pathname === '/dashboard/withdraw-requests'
    },
    {
      name: 'Deposits',
      href: '/dashboard/deposit-requests',
      icon: FaWallet,
      current: location.pathname === '/dashboard/deposit-requests'
    },
  ];

  const Sidebar = () => (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 p-6 space-y-6 flex flex-col fixed h-full z-50 shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold text-white">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            EazyTrade
          </span>
          <span className="text-xs block text-gray-400 mt-1">Admin Panel</span>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-gray-400 hover:text-white transition-colors"
        >
          <FaTimes size={20} />
        </button>
      </div>

      {/* Admin Info */}
      <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </span>
          </div>
          <div>
            <p className="text-white font-medium text-sm">{user?.name || 'Admin'}</p>
            <p className="text-gray-400 text-xs">{user?.email || 'admin@eazytrade.com'}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                item.current
                  ? 'bg-gradient-to-r from-cyan-500 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-slate-700 hover:text-white'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon className={`text-lg ${item.current ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-700 pt-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-200 w-full group"
        >
          <FaSignOutAlt className="text-lg text-gray-400 group-hover:text-white" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </motion.aside>
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 1024) && <Sidebar />}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Top Bar */}
        <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-700"
              >
                <FaBars size={20} />
              </button>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white">
                  {navigation.find(item => item.current)?.name || 'Dashboard'}
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                  Welcome back, {user?.name || 'Admin'}
                </p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="bg-slate-700/50 px-4 py-2 rounded-lg border border-slate-600">
                <p className="text-xs text-gray-400">Last Login</p>
                <p className="text-sm font-medium text-white">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
