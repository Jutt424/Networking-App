import React, { useState } from "react";
import { motion } from "framer-motion";

const AdminPanel = () => {
  const [packages, setPackages] = useState([
    { name: "Crown V1", price: 4500, daily: 150, monthly: 4500 },
    { name: "Crown V2", price: 12000, daily: 400, monthly: 12000 },
    { name: "Crown V3", price: 36000, daily: 1200, monthly: 36000 },
  ]);
  const [withdrawRequests, setWithdrawRequests] = useState([
    { id: 1, user: "John Doe", amount: 500, bank: "Bank XYZ - 12345", status: "pending" },
  ]);
  const [wallets, setWallets] = useState([
    { id: 1, user: "John Doe", balance: 5000 },
    { id: 2, user: "Jane Smith", balance: 12000 },
  ]);

  const handleUpdatePackage = (index, field, value) => {
    const updatedPackages = [...packages];
    updatedPackages[index][field] = value;
    setPackages(updatedPackages);
  };

  const handleApproveWithdraw = (id) => {
    setWithdrawRequests(withdrawRequests.map(req => req.id === id ? { ...req, status: "approved" } : req));
    alert("Withdrawal Approved!");
  };

  const handleUpdateWallet = (id, amount) => {
    setWallets(wallets.map(wallet => wallet.id === id ? { ...wallet, balance: wallet.balance + amount } : wallet));
    alert("Wallet Updated Successfully!");
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <header className="w-full max-w-6xl mx-auto flex justify-between items-center py-6 border-b border-gray-700">
        <h1 className="text-4xl font-extrabold text-yellow-400">Admin Panel</h1>
      </header>
      
      {/* Manage Packages */}
      <section className="max-w-6xl mx-auto mt-10">
        <h3 className="text-3xl font-bold text-yellow-400 text-center mb-6">Manage Investment Packages</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <motion.div key={index} className="bg-gray-800 p-6 rounded-lg text-center shadow-md hover:shadow-lg transition">
              <h4 className="text-2xl font-bold text-yellow-400">{pkg.name}</h4>
              <input
                type="number"
                value={pkg.price}
                onChange={(e) => handleUpdatePackage(index, "price", Number(e.target.value))}
                className="mt-2 p-2 w-full bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                type="number"
                value={pkg.daily}
                onChange={(e) => handleUpdatePackage(index, "daily", Number(e.target.value))}
                className="mt-2 p-2 w-full bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                type="number"
                value={pkg.monthly}
                onChange={(e) => handleUpdatePackage(index, "monthly", Number(e.target.value))}
                className="mt-2 p-2 w-full bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button className="mt-4 bg-green-500 text-black px-6 py-2 rounded-md font-semibold hover:bg-green-400 transition">
                Save Changes
              </button>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Approve Withdrawals */}
      <section className="max-w-6xl mx-auto mt-16">
        <h3 className="text-3xl font-bold text-yellow-400 text-center mb-6">Approve Withdrawals</h3>
        <div className="grid grid-cols-1 gap-6">
          {withdrawRequests.map(req => (
            <motion.div key={req.id} className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <p className="text-lg text-gray-300">{req.user} requested <span className="text-yellow-400">${req.amount}</span></p>
              <p className="text-gray-400">Bank: {req.bank}</p>
              {req.status === "pending" ? (
                <button onClick={() => handleApproveWithdraw(req.id)} className="mt-4 bg-yellow-500 text-black px-6 py-2 rounded-md font-semibold hover:bg-yellow-400 transition">
                  Approve Withdrawal
                </button>
              ) : (
                <p className="text-green-400 mt-2">Approved</p>
              )}
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Update Wallets */}
      <section className="max-w-6xl mx-auto mt-16">
        <h3 className="text-3xl font-bold text-yellow-400 text-center mb-6">Manually Update Wallets</h3>
        <div className="grid grid-cols-1 gap-6">
          {wallets.map(wallet => (
            <motion.div key={wallet.id} className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <p className="text-lg text-gray-300">{wallet.user}</p>
              <p className="text-yellow-400">Balance: ${wallet.balance.toLocaleString()}</p>
              <input
                type="number"
                placeholder="Enter amount"
                onChange={(e) => handleUpdateWallet(wallet.id, Number(e.target.value))}
                className="mt-2 p-2 w-full bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button className="mt-4 bg-blue-500 text-black px-6 py-2 rounded-md font-semibold hover:bg-blue-400 transition">
                Update Wallet
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;
