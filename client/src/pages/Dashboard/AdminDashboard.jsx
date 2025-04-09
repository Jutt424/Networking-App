import React, { useEffect, useState } from "react";
import { FaUsers, FaMoneyCheckAlt, FaWallet, FaChartBar } from "react-icons/fa";
import { BiMoneyWithdraw } from "react-icons/bi";
import { Link } from "react-router-dom";
import { userAPI } from "../../services/api";
import { Search } from "lucide-react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [search, setSearch] = useState("");
  const allUsers = () => {
    userAPI.getAllUsers().then((res) => {
      setUsers(res.data.users);
      setTotalUsers(res.data.totalUsers);
    });
  };
  useEffect(() => {
    allUsers();
  }, []);
  const [totalWalletBalance, setTotalWalletBalance] = useState(0);
  const allPayments = () => {
    userAPI.getTotalWalletBalance().then((res) => {
      setTotalWalletBalance(res.data.totalWalletBalance);
      
    });
  };
  useEffect(() => {
    allPayments();
  }, []);
  return (
    <>
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
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg text-center shadow-lg">
            <FaUsers className="text-cyan-400 text-3xl mx-auto" />
            <p className="text-xl font-bold mt-2">{totalUsers}</p>
            <p className="text-gray-400">Total Users</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center shadow-lg">
            <FaMoneyCheckAlt className="text-cyan-400 text-3xl mx-auto" />
            <p className="text-xl font-bold mt-2">$ {totalWalletBalance}</p>
            <p className="text-gray-400">Total Revenue</p>
          </div>
        </div>
            {/* Search Bar */}
     <div className="relative mb-6 max-w-md">
        <input
          type="text"
          placeholder="Search by user..."
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:ring focus:ring-cyan-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="absolute right-3 top-2 text-gray-400" />
      </div>

       {/* ✅ User Table */}
  <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-x-auto">
    <table className="w-full text-left">
      <thead>
        <tr className="border-b border-gray-700">
          <th className="p-2">User</th>
          <th className="p-2">Email</th>
          <th className="p-2">Created At</th>
        </tr>
      </thead>
      <tbody>
        {users
          .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()))
          .map((user) => (
            <tr key={user._id} className="border-b border-gray-700">
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>
            </tr>
        ))}
      </tbody>
    </table>
  </div>
      </main>
    </div>
 
    </>
  );
};

export default AdminDashboard;
