import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, Search } from "lucide-react";

const WithdrawRequests = () => {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Fetch withdraw requests from API (Replace with actual API call)
    setRequests([
      { id: 1, user: "Ali Khan", amount: "Rs5000", method: "JazzCash", status: "Pending" },
      { id: 2, user: "Sara Ahmed", amount: "Rs3000", method: "Bank Transfer", status: "Completed" },
    ]);
  }, []);

  const handleApprove = (id) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: "Completed" } : req));
  };

  const handleReject = (id) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: "Rejected" } : req));
  };

  return (
    <div className="bg-gray-900 min-h-screen p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Withdraw Requests</h2>
      
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
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.filter(req => req.user.toLowerCase().includes(search.toLowerCase())).map((req) => (
              <tr key={req.id} className="border-b border-gray-700">
                <td className="p-2">{req.user}</td>
                <td className="p-2">{req.amount}</td>
                <td className="p-2">{req.method}</td>
                <td className={`p-2 font-semibold ${req.status === "Pending" ? "text-yellow-400" : req.status === "Completed" ? "text-green-400" : "text-red-400"}`}>{req.status}</td>
                <td className="p-2 flex gap-2">
                  {req.status === "Pending" && (
                    <>
                      <button
                        className="bg-green-600 px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-green-700"
                        onClick={() => handleApprove(req.id)}
                      >
                        <CheckCircle className="w-4 h-4" /> Approve
                      </button>
                      <button
                        className="bg-red-600 px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-red-700"
                        onClick={() => handleReject(req.id)}
                      >
                        <XCircle className="w-4 h-4" /> Reject
                      </button>
                    </>
                  )}
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
