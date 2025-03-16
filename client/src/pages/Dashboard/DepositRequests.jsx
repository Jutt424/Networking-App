import React from "react";

const DepositRequests = () => {
  // Dummy Data
  const deposits = [
    { id: 1, user: "Ali Khan", amount: "Rs 10,000", status: "Pending" },
    { id: 2, user: "Sara Ahmed", amount: "Rs 25,000", status: "Approved" },
    { id: 3, user: "Usman Raza", amount: "Rs 15,000", status: "Rejected" },
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
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
