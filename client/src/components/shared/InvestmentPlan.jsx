import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { investmentAPI } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import bitcoin from "../../assets/bitcoin.png";
import eth from "../../assets/ethereum.png";
import doge from "../../assets/doge.png";
import trx from "../../assets/tron-trx.png";
import solana from "../../assets/solana.png";
import trump from "../../assets/trump.jpg";
import pi500 from "../../assets/pi.jpg";
import bnb from "../../assets/bnb.png";
import xrp from "../../assets/xrp.png";
const logos = {
  XRP: xrp,
  Trump: trump,
  "Pi-200": pi500,
  Solana: solana,
  "Pi-500": pi500,
  BNB: bnb,
  Doge: doge,
  TRX: trx,
  ETH: eth,
  Bitcoin: bitcoin,
};


const seedPlans = [
  { coin: "XRP", investment: 30, dailyIncome: 1.5 },
  { coin: "Trump", investment: 100, dailyIncome: 4.5 },
  { coin: "Pi-200", investment: 200, dailyIncome: 8.5 },
  { coin: "Solana", investment: 300, dailyIncome: 12.5 },
  { coin: "Pi-500", investment: 500, dailyIncome: 20 },
  { coin: "BNB", investment: 1000, dailyIncome: 40 },
  { coin: "Doge", investment: 1800, dailyIncome: 70 },
  { coin: "TRX", investment: 5000, dailyIncome: 200 },
  { coin: "ETH", investment: 10000, dailyIncome: 380 },
  { coin: "Bitcoin", investment: 20000, dailyIncome: 720 },
];

const InvestmentPlan = () => {
  const [investedCoins, setInvestedCoins] = useState([]);

  const { user } = useContext(AuthContext);
  const userId = user._id;

  const handleInvest = async (coin, userId) => {
    try {
      await investmentAPI.investInPlan({ coin, userId });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchInvestedCoins = async () => {
      try {
        const response = await investmentAPI.getUserInvestments(userId);
        setInvestedCoins(response.data.investedCoins);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInvestedCoins();
  }, [userId]);


  return (
    <div className="bg-gray-900 text-white flex items-center justify-center min-h-screen px-4">
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center w-full max-w-6xl py-16"
      >
        <h2 className="text-4xl font-bold mb-10 text-cyan-400">Investment Plans</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {seedPlans.map((plan, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center"
            >
              <img
                src={logos[plan.coin] || "https://via.placeholder.com/40x40.png?text=?"}
                alt={plan.coin}
                className="w-12 h-12 mb-4 rounded-full object-contain bg-white p-1"
              />

              <h3 className="text-2xl font-semibold text-cyan-300 mb-2">
                {plan.coin}
              </h3>
              <p className="text-gray-300 mb-1">
                <strong>Investment:</strong> {plan.investment} $
              </p>
              <p className="text-green-400 mb-4">
                <strong>Daily Income:</strong> {plan.dailyIncome} $
              </p>
              {investedCoins.includes(plan.coin) ? (
                <span className="bg-green-600 text-white px-4 py-2 rounded font-bold cursor-default">
                  ✅ Invested
                </span>
              ) : (
                <button
                  onClick={() => handleInvest(plan.coin, userId)}
                  className="bg-cyan-500 hover:bg-cyan-400 px-4 py-2 rounded text-black font-bold"
                >
                  Invest Now
                </button>
              )}

            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default InvestmentPlan;
