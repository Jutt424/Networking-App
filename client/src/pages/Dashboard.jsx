import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [walletBalance, setWalletBalance] = useState(5000);
  const [investment, setInvestment] = useState([]);
  const [profit, setProfit] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [bankDetails, setBankDetails] = useState("");
  const [depositAmount, setDepositAmount] = useState(0);

  const investmentPackages = [
    { name: "Crown V1", price: 4500, daily: 150, monthly: 4500 },
    { name: "Crown V2", price: 12000, daily: 400, monthly: 12000 },
    { name: "Crown V3", price: 36000, daily: 1200, monthly: 36000 },
  ];

  const handleInvest = (pkg) => {
    if (walletBalance >= pkg.price) {
      setWalletBalance(walletBalance - pkg.price);
      setInvestment([...investment, { ...pkg, startDate: new Date() }]);
      alert(`Successfully invested in ${pkg.name}!`);
    } else {
      alert("Insufficient balance! Please recharge your wallet.");
    }
  };

  const handleWithdraw = () => {
    if (withdrawAmount > 0 && withdrawAmount <= walletBalance) {
      alert(`Withdrawal request of $${withdrawAmount} sent! Admin will process it.`);
      setWalletBalance(walletBalance - withdrawAmount);
      setWithdrawAmount(0);
      setBankDetails("");
    } else {
      alert("Invalid withdrawal amount.");
    }
  };

  const handleDeposit = () => {
    if (depositAmount > 0) {
      alert(`Deposit request of $${depositAmount} sent! Admin will approve it soon.`);
      setDepositAmount(0);
    } else {
      alert("Invalid deposit amount.");
    }
  };

  useEffect(() => {
    const calculateProfit = () => {
      let totalProfit = investment.reduce((acc, pkg) => acc + pkg.daily, 0);
      setProfit(totalProfit);
      setWalletBalance((prev) => prev + totalProfit);
    };

    const profitInterval = setInterval(() => {
      calculateProfit();
    }, 86400000);

    return () => clearInterval(profitInterval);
  }, [investment]);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <header className="w-full max-w-6xl mx-auto flex justify-between items-center py-6">
        <h1 className="text-3xl font-bold text-yellow-400">User Dashboard</h1>
      </header>
      
      {/* Wallet Balance & Profit */}
      <section className="max-w-6xl mx-auto text-center mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-yellow-400">Wallet Balance</h3>
          <p className="text-4xl font-extrabold mt-4">${walletBalance.toLocaleString()}</p>
        </motion.div>
        <motion.div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-green-400">Daily Profit</h3>
          <p className="text-4xl font-extrabold mt-4">${profit.toLocaleString()}</p>
        </motion.div>
      </section>

      {/* Deposit Section */}
      <section className="max-w-6xl mx-auto mt-16 text-center">
        <h3 className="text-3xl font-bold text-yellow-400 mb-6">Deposit Funds</h3>
        <input
          type="number"
          value={depositAmount}
          onChange={(e) => setDepositAmount(Number(e.target.value))}
          placeholder="Enter amount to deposit"
          className="p-3 w-64 bg-gray-800 text-white rounded-md border border-gray-600 mb-4"
        />
        <button
          className="bg-green-500 text-black px-6 py-3 rounded-md font-semibold hover:bg-green-400 transition"
          onClick={handleDeposit}
        >
          Deposit Now
        </button>
      </section>
      
      {/* Withdrawal Section */}
      <section className="max-w-6xl mx-auto mt-16 text-center">
        <h3 className="text-3xl font-bold text-yellow-400 mb-6">Withdraw Funds</h3>
        <input
          type="number"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(Number(e.target.value))}
          placeholder="Enter amount to withdraw"
          className="p-3 w-64 bg-gray-800 text-white rounded-md border border-gray-600 mb-4"
        />
        <input
          type="text"
          value={bankDetails}
          onChange={(e) => setBankDetails(e.target.value)}
          placeholder="Enter Bank Details"
          className="p-3 w-64 bg-gray-800 text-white rounded-md border border-gray-600 mb-4"
        />
        <button
          className="bg-yellow-500 text-black px-6 py-3 rounded-md font-semibold hover:bg-yellow-400 transition"
          onClick={handleWithdraw}
        >
          Withdraw Now
        </button>
      </section>
      
      {/* Investment Packages */}
      <section className="max-w-6xl mx-auto mt-16">
        <h3 className="text-3xl font-bold text-yellow-400 text-center mb-8">Available Investment Packages</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {investmentPackages.map((pkg, index) => (
            <motion.div key={index} className="bg-gray-800 p-6 rounded-lg text-center shadow-lg">
              <h4 className="text-2xl font-bold text-yellow-400">{pkg.name}</h4>
              <p className="text-lg text-gray-300 mt-2">Price: ${pkg.price.toLocaleString()}</p>
              <p className="text-lg text-green-400 mt-2">Daily Profit: ${pkg.daily}</p>
              <p className="text-lg text-blue-400 mt-2">Monthly Profit: ${pkg.monthly}</p>
              <button className="mt-4 bg-yellow-500 text-black px-6 py-2 rounded-md font-semibold hover:bg-yellow-400 transition" onClick={() => handleInvest(pkg)}>
                Invest Now
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;