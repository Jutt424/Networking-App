import React, { useState } from "react";
import { motion } from "framer-motion";

// Embedded Base64 SVG logos for each cryptocurrency (30x30 colored squares)
const bitcoinLogo = "https://cryptologos.cc/logos/bitcoin-btc-logo.png";
const ethereumLogo = "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=002";
const trxLogo = "https://cryptologos.cc/logos/tron-trx-logo.png?v=002";
const dogeLogo = "https://cryptologos.cc/logos/dogecoin-doge-logo.png?v=002";
const solanaLogo = "https://cryptologos.cc/logos/solana-sol-logo.png?v=040";
const xrpLogo = "https://cryptologos.cc/logos/xrp-xrp-logo.png?v=040";
const bnbLogo = "https://cryptologos.cc/logos/binance-coin-bnb-logo.png?v=002";
const maticLogo = "https://cryptologos.cc/logos/matic-network-matic-logo.png?v=002";

const investmentPlans = [
  {
    name: "Bitcoin",
    investment: "4k to 1080k",
    logo: bitcoinLogo,
    plans: [
      { amount: "4k", dailyProfit: 135 },
      { amount: "8k", dailyProfit: 270 },
      { amount: "12k", dailyProfit: 400 },
      { amount: "36k", dailyProfit: 1200 },
      { amount: "54k", dailyProfit: 1800 },
      { amount: "108k", dailyProfit: 3600 },
      { amount: "360k", dailyProfit: 12000 },
      { amount: "720k", dailyProfit: 24000 },
      { amount: "1080k", dailyProfit: 36000 },
    ],
  },
  {
    name: "Ethereum",
    investment: "4k to 720k",
    logo: ethereumLogo,
    plans: [
      { amount: "4k", dailyProfit: 135 },
      { amount: "8k", dailyProfit: 270 },
      { amount: "12k", dailyProfit: 400 },
      { amount: "36k", dailyProfit: 1200 },
      { amount: "54k", dailyProfit: 1800 },
      { amount: "108k", dailyProfit: 3600 },
      { amount: "360k", dailyProfit: 12000 },
      { amount: "720k", dailyProfit: 24000 },
    ],
  },
  {
    name: "TRX",
    investment: "4k to 360k",
    logo: trxLogo,
    plans: [
      { amount: "4k", dailyProfit: 135 },
      { amount: "8k", dailyProfit: 270 },
      { amount: "12k", dailyProfit: 400 },
      { amount: "36k", dailyProfit: 1200 },
      { amount: "54k", dailyProfit: 1800 },
      { amount: "108k", dailyProfit: 3600 },
      { amount: "360k", dailyProfit: 12000 },
    ],
  },
  {
    name: "Doge",
    investment: "4k to 36k",
    logo: dogeLogo,
    plans: [
      { amount: "4k", dailyProfit: 135 },
      { amount: "8k", dailyProfit: 270 },
      { amount: "12k", dailyProfit: 400 },
      { amount: "36k", dailyProfit: 1200 },
      { amount: "54k", dailyProfit: 1800 },
      { amount: "108k", dailyProfit: 3600 },
    ],
  },
  {
    name: "Solana",
    investment: "4k to 36k",
    logo: solanaLogo,
    plans: [
      { amount: "4k", dailyProfit: 135 },
      { amount: "8k", dailyProfit: 270 },
      { amount: "12k", dailyProfit: 400 },
      { amount: "36k", dailyProfit: 1200 },
      { amount: "54k", dailyProfit: 1800 },
    ],
  },
  {
    name: "XRP",
    investment: "4k to 36k",
    logo: xrpLogo,
    plans: [
      { amount: "4k", dailyProfit: 135 },
      { amount: "8k", dailyProfit: 270 },
      { amount: "12k", dailyProfit: 400 },
      { amount: "36k", dailyProfit: 1200 },
    ],
  },
  {
    name: "BNB",
    investment: "4k to 54k",
    logo: bnbLogo,
    plans: [
      { amount: "4k", dailyProfit: 135 },
      { amount: "8k", dailyProfit: 270 },
      { amount: "12k", dailyProfit: 400 },
    ],
  },
  {
    name: "Matic",
    investment: "4k to 108k",
    logo: maticLogo,
    plans: [
      { amount: "4k", dailyProfit: 135 },
      { amount: "8k", dailyProfit: 270 },
   
    ],
  },
];

const InvestmentPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showAllPlans, setShowAllPlans] = useState(false);

  return (
    <div className="bg-gray-900 text-white flex items-center justify-center">
      <motion.section 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mt-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {(showAllPlans ? investmentPlans : investmentPlans.slice(0, 3)).map((plan, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg h-auto">
              <div className="flex items-center space-x-3 mb-2">
                <img src={plan.logo} alt={`${plan.name} logo`} className="w-10 h-10" />
                <h3 className="text-2xl font-bold text-cyan-400">{plan.name}</h3>
              </div>
              <p className="text-gray-300">Investment: {plan.investment}</p>
              <button 
                className="mt-4 text-cyan-400 hover:text-cyan-300 underline"
                onClick={() => setSelectedPlan(plan)}
              >
                More Plans
              </button>
            </div>
          ))}
        </div>
        <button 
          className="mt-8 bg-cyan-500 px-6 py-3 rounded-md text-lg font-semibold hover:bg-cyan-400 transition"
          onClick={() => setShowAllPlans(!showAllPlans)}
        >
          {showAllPlans ? "Show Less" : "Explore More"}
        </button>
      </motion.section>

      {selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-3xl overflow-auto max-h-[80vh] relative">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4 text-center">
              {selectedPlan.name} - More Plans
            </h3>
            <table className="w-full text-sm text-left text-gray-300 border-collapse mt-2">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="p-2">Plan</th>
                  <th className="p-2">Investment</th>
                  <th className="p-2">Daily Profit</th>
                  <th className="p-2">Monthly Profit</th>
                  <th className="p-2">Yearly Profit</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedPlan.plans.map((p, i) => (
                  <tr key={i} className="border-b border-gray-700">
                    <td className="p-2">Plan {i + 1}</td>
                    <td className="p-2">{p.amount} Rs</td>
                    <td className="p-2 text-green-400">{p.dailyProfit} Rs</td>
                    <td className="p-2 text-green-400">{p.dailyProfit * 30} Rs</td>
                    <td className="p-2 text-green-400">{p.dailyProfit * 365} Rs</td>
                    <td className="p-2">
                      <button className="bg-cyan-500 px-3 py-1 rounded text-black font-semibold">
                        Invest Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button 
              className="mt-4 bg-red-500 px-4 py-2 rounded text-white block mx-auto"
              onClick={() => setSelectedPlan(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentPlan;
