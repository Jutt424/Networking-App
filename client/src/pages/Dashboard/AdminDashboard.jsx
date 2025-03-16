import React from "react";
import { FaUsers, FaMoneyCheckAlt, FaWallet, FaChartBar } from "react-icons/fa";
import { BiMoneyWithdraw } from "react-icons/bi";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 space-y-6">
        <h1 className="text-xl font-bold text-cyan-400 text-center">Admin Panel</h1>
        <nav className="space-y-4">
          <a href="#" className="flex items-center gap-3 text-cyan-400 hover:text-white">
            <FaUsers /> Users
          </a>
          <Link to="/withdraw-requests" className="flex items-center gap-3 text-cyan-400 hover:text-white">
            <BiMoneyWithdraw /> Withdraw Requests
          </Link>
          <Link to="/deposit-requests" className="flex items-center gap-3 text-cyan-400 hover:text-white">
            <FaWallet /> Deposits
          </Link>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h2>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg text-center shadow-lg">
            <FaUsers className="text-cyan-400 text-3xl mx-auto" />
            <p className="text-xl font-bold mt-2">1,254</p>
            <p className="text-gray-400">Total Users</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center shadow-lg">
            <BiMoneyWithdraw className="text-cyan-400 text-3xl mx-auto" />
            <p className="text-xl font-bold mt-2">15</p>
            <p className="text-gray-400">Pending Withdrawals</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center shadow-lg">
            <FaMoneyCheckAlt className="text-cyan-400 text-3xl mx-auto" />
            <p className="text-xl font-bold mt-2">Rs 450,000</p>
            <p className="text-gray-400">Total Deposits</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
