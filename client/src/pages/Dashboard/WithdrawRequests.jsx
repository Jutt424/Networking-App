import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, Search } from "lucide-react";
import { paymentAPI } from "../../services/api";
import { BiMoneyWithdraw } from "react-icons/bi";

const WithdrawRequests = () => {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    paymentAPI.getAllPayments()
      .then(res => {
        // console.log(res.data);
        setRequests(res.data.payments)
        setTotal(res.data.total)
      })
      .catch(err => console.error(err));
  }, []);

  const updateStatus = (id, status) => {
    paymentAPI.updatePaymentStatus(id, status)
      .then(() => {
        setRequests(requests.map(req => req.id === id ? { ...req, status } : req));
      })
      .catch(err => console.error(err));
  };

  const handleApprove = (id) => {
    updateStatus(id, "approved");
  };

  const handleReject = (id) => {
    updateStatus(id, "rejected");
  };

  return (
    <div className="bg-gray-900 min-h-screen p-6 text-white">
      <div className="bg-gray-800 p-6 rounded-lg text-center shadow-lg max-w-md">
        <BiMoneyWithdraw className="text-cyan-400 text-3xl mx-auto" />
        <p className="text-xl font-bold mt-2 text-white">{total}</p>
        <p className="text-gray-400">Total Withdrawals</p>
      </div>
      <h2 className="text-2xl font-bold mb-4 mt-8">Withdraw Requests</h2>

      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search by user..."
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:ring focus:ring-cyan-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="absolute right-3 top-2 text-gray-400" />
      </div>

      {/* Withdraw Requests Table */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-2">User</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Method</th>
              <th className="p-2">Status</th>
              <th className="p-2">Created At</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(request => (
              <tr key={request._id} className="border-b border-gray-700">
                <td className="p-2">{request.userId.name}</td>
                <td className="p-2">{request.amount}</td>
                <td className="p-2">{request.paymentMethod}</td>
                <td className={`p-2 font-semibold ${request.status === "rejected" ? "text-red-400" : request.status === "approved" ? "text-green-400" : "text-yellow-400"}`}>{request.status}</td>
                <td className="p-2 flex gap-2">
                </td>
                <td className="p-2 flex gap-2"> {new Date(request.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}</td>
                <td className="p-2">
                  <div className="flex gap-2">
                    <button
                      className="bg-green-600 px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-green-700"
                      onClick={() => handleApprove(request._id)}
                    >
                      <CheckCircle className="w-4 h-4" /> Approve
                    </button>
                    <button
                      className="bg-red-600 px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-red-700"
                      onClick={() => handleReject(request._id)}
                    >
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WithdrawRequests;
