import React, { useState, useEffect } from "react";
import { paymentAPI, serverUrl } from "../../services/api";
import { CheckCircle, XCircle, Search, Filter, Download, Eye, Clock, AlertCircle, Image as ImageIcon } from "lucide-react";
import { FaMoneyCheckAlt, FaFilter, FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";

const DepositRequests = () => {
  const token = localStorage.getItem('token');
  const [deposits, setDeposits] = useState([]);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    totalAmount: 0
  });

  useEffect(() => {
    if (token) {
      setLoading(true);
      const fetchDeposits = async () => {
        try {
          const response = await paymentAPI.getRecharges();
          const data = response.data;
          setTotal(data.totalRecharges);
          setDeposits(data.recharges || []);
          
          // Calculate stats
          const pendingCount = (data.recharges || []).filter(dep => dep.status === "pending").length;
          const approvedCount = (data.recharges || []).filter(dep => dep.status === "approved").length;
          const rejectedCount = (data.recharges || []).filter(dep => dep.status === "rejected").length;
          const totalAmount = (data.recharges || []).reduce((sum, dep) => sum + (parseFloat(dep.amount) || 0), 0);
          
          setStats({
            pending: pendingCount,
            approved: approvedCount,
            rejected: rejectedCount,
            totalAmount: totalAmount
          });
          setLoading(false);
        } catch (error) {
          console.error('Failed to fetch deposits', error);
          setLoading(false);
        }
      };
      fetchDeposits();
    }
  }, [token]);

  const updateStatus = (id, status) => {
    paymentAPI.updateRechargeStatus(id, status)
      .then(() => {
        setDeposits(deposits.map(deposit => deposit._id === id ? { ...deposit, status } : deposit));
        // Update stats
        setStats(prev => ({
          ...prev,
          pending: status === "approved" || status === "rejected" ? prev.pending - 1 : prev.pending,
          approved: status === "approved" ? prev.approved + 1 : prev.approved,
          rejected: status === "rejected" ? prev.rejected + 1 : prev.rejected
        }));
      })
      .catch(err => console.error(err));
  };

  const handleApprove = (id) => {
    updateStatus(id, "approved");
  };

  const handleReject = (id) => {
    updateStatus(id, "rejected");
  };

  const filteredDeposits = deposits.filter((deposit) => {
    const matchesSearch = deposit.userId.name.toLowerCase().includes(search.toLowerCase()) ||
                         deposit.userId.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || deposit.status === filter;
    return matchesSearch && matchesFilter;
  });

  const statsCards = [
    {
      title: "Total Deposits",
      value: total,
      icon: FaMoneyCheckAlt,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-500/10"
    },
    {
      title: "Approved",
      value: stats.approved,
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10"
    },
    {
      title: "Total Amount",
      value: `$${stats.totalAmount.toLocaleString()}`,
      icon: FaMoneyCheckAlt,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10"
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
      approved: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      rejected: { color: "bg-red-100 text-red-800", icon: XCircle }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${config.color}`}>
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 rounded-xl border border-slate-600"
      >
        <h1 className="text-2xl font-bold text-white mb-2">Deposit Requests</h1>
        <p className="text-gray-300">Review and process user deposit requests with payment verification.</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/50"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`text-2xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-gray-400 text-sm mt-1">{stat.title}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by user name or email..."
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          {/* Filter Dropdown */}
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none bg-slate-700/50 border border-slate-600 text-white px-4 py-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </motion.div>

      {/* Deposits Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden"
      >
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">Deposit Requests</h3>
          <p className="text-gray-400 text-sm mt-1">
            {filteredDeposits.length} deposits found
          </p>
        </div>
        
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
              <p className="text-gray-400 mt-2">Loading deposits...</p>
            </div>
          ) : filteredDeposits.length === 0 ? (
            <div className="p-8 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No deposit requests found</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Screenshot
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {filteredDeposits.map((deposit) => (
                  <motion.tr
                    key={deposit._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-slate-700/30 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {deposit.userId.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">{deposit.userId.name}</div>
                          <div className="text-sm text-gray-400">{deposit.userId.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-lg font-semibold text-white">${deposit.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(deposit.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setPreviewSrc(`${serverUrl}${deposit.screenshot}`)}
                        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                      >
                        <ImageIcon className="w-4 h-4" />
                        View
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">
                        {new Date(deposit.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {deposit.status === "pending" ? (
                        <div className="flex items-center gap-2">
                          <button
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg flex items-center gap-1 transition-colors duration-200"
                            onClick={() => handleApprove(deposit._id)}
                          >
                            <CheckCircle className="w-4 h-4" />
                            Approve
                          </button>
                          <button
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg flex items-center gap-1 transition-colors duration-200"
                            onClick={() => handleReject(deposit._id)}
                          >
                            <XCircle className="w-4 h-4" />
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">Processed</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>

      {/* Image Preview Modal */}
      {previewSrc && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4"
          onClick={() => setPreviewSrc(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={previewSrc}
              alt="Payment Screenshot"
              className="max-w-full max-h-full rounded-lg border-4 border-white shadow-2xl"
            />
            <button
              onClick={() => setPreviewSrc(null)}
              className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors duration-200"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default DepositRequests;
