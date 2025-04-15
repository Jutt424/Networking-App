import React, { useState, useEffect } from "react";
import { paymentAPI, serverUrl } from "../../services/api";
import { ArrowBigLeft, CheckCircle, Link, XCircle } from "lucide-react";
import { FaMoneyCheckAlt } from "react-icons/fa";

const DepositRequests = () => {
  const token = localStorage.getItem('token');
  const [deposits, setDeposits] = useState([]);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (token) {
      const fetchDeposits = async () => {
        try {
          const response = await paymentAPI.getRecharges();
          const data = response.data;
          // console.log(data);
          setTotal(data.totalRecharges);
          setDeposits(data.recharges || []);
        } catch (error) {
          console.error('Failed to fetch deposits', error);
        }
      };
      fetchDeposits();
    }
  }, [token]);

  const updateStatus = (id, status) => {
    paymentAPI.updateRechargeStatus(id, status)
      .then(() => {
        setDeposits(deposits.map(deposit => deposit.id === id ? { ...deposit, status } : deposit));

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
    <div className="bg-gray-900 p-4 sm:p-6 min-h-screen">
   
    <div className="bg-gray-800 p-6 rounded-lg text-center shadow-lg max-w-md mx-auto">
      <FaMoneyCheckAlt className="text-cyan-400 text-3xl mx-auto" />
      <p className="text-xl font-bold mt-2 text-white ">{total}</p>
      <p className="text-gray-400">Total Deposits</p>
    </div>
    {/* Wrap table in scrollable container */}
    <div className="overflow-x-auto mt-8">
      <table className="min-w-full text-white">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="p-3 text-left whitespace-nowrap">User</th>
            <th className="p-3 text-left whitespace-nowrap">Email</th>
            <th className="p-3 text-left whitespace-nowrap">Amount</th>
            <th className="p-3 text-left whitespace-nowrap">Status</th>
            <th className="p-3 text-left whitespace-nowrap">Screenshot</th>
            <th className="p-3 text-left whitespace-nowrap">Date</th>
            <th className="p-3 text-left whitespace-nowrap">Action</th>
          </tr>
        </thead>
        <tbody>
          {deposits.map((deposit) => (
            <tr key={deposit.id} className="border-b border-gray-700">
              <td className="p-3">{deposit.userId.name}</td>
              <td className="p-3">{deposit.userId.email}</td>
              <td className="p-3">{deposit.amount}</td>
              <td className={`p-2 font-semibold ${deposit.status === "rejected" ? "text-red-400" : deposit.status === "approved" ? "text-green-400" : "text-yellow-400"}`}>
                {deposit.status}
              </td>
              <td className="p-3">
                <img
                  src={`${serverUrl}${deposit.screenshot}`}
                  alt="Screenshot"
                  className="w-24 h-24 cursor-pointer"
                  onClick={() => setPreviewSrc(`${serverUrl}${deposit.screenshot}`)}
                />
                {previewSrc && (
                  <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
                    onClick={() => setPreviewSrc(null)}
                  >
                    <img
                      src={previewSrc}
                      alt="Full Screenshot"
                      className="max-w-full max-h-full rounded-lg border-4 border-white shadow-xl"
                    />
                  </div>
                )}
              </td>
              <td className="p-2">
                {new Date(deposit.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>
              <td className="p-2">
                {deposit.status === "pending" ? (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      className="bg-green-600 px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-green-700"
                      onClick={() => handleApprove(deposit._id)}
                    >
                      <CheckCircle className="w-4 h-4" /> Approve
                    </button>
                    <button
                      className="bg-red-600 px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-red-700"
                      onClick={() => handleReject(deposit._id)}
                    >
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                  </div>
                ) : (
                  <span className="italic text-sm text-gray-400">Processed</span>
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

export default DepositRequests;
