import React, { useState, useEffect } from "react";
import { paymentAPI } from "../../services/api";

const DepositRequests = () => {
  const token = localStorage.getItem('token');
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    if (token) {
      const fetchDeposits = async () => {
        try {
          const response = await paymentAPI .getRecharges();
          const data = await response.data;
          console.log(data);
          setDeposits(data.payments || []);
        } catch (error) {
          console.error('Failed to fetch deposits', error);
        }
      };
      fetchDeposits();
    }
  }, [token]);
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg min-h-screen">
      <h2 className="text-2xl font-bold text-cyan-400 mb-4">Deposit Requests</h2>
      <table className="w-full text-white">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="p-3 text-left">User</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {deposits.map((deposit) => (
            <tr key={deposit.id} className="border-b border-gray-700">
              <td className="p-3">{deposit.user}</td>
              <td className="p-3">{deposit.amount}</td>
              <td className={`p-3 ${deposit.status === "Pending" ? "text-yellow-400" : deposit.status === "Approved" ? "text-green-400" : "text-red-400"}`}>
                {deposit.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepositRequests;
