import React from "react";
import bitcoin from "../../assets/bitcoin.png";
import eth from "../../assets/ethereum.png";
import doge from "../../assets/doge.png";
import trx from "../../assets/tron-trx.png";
import solana from "../../assets/solana.png";
import trump from "../../assets/trump.jpg";
import pi500 from "../../assets/pi.jpg";
import bnb from "../../assets/bnb.png";
import xrp from "../../assets/xrp.png";
import sui from "../../assets/sui.png";

const logos = {
  XRP: xrp,
  SUI: sui,
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
  { coin: "XRP", investment: 30, dailyIncome: 1.5, monthlyIncome: 45 },
  { coin: "SUI", investment: 50, dailyIncome: 2.1, monthlyIncome: 63 },
  { coin: "Trump", investment: 100, dailyIncome: 4.5, monthlyIncome: 135 },
  { coin: "Pi-200", investment: 200, dailyIncome: 8.5, monthlyIncome: 255 },
  { coin: "Solana", investment: 300, dailyIncome: 12.5, monthlyIncome: 375 },
  { coin: "Pi-500", investment: 500, dailyIncome: 20, monthlyIncome: 600 },
  { coin: "BNB", investment: 1000, dailyIncome: 40, monthlyIncome: 1200 },
  { coin: "Doge", investment: 1800, dailyIncome: 70, monthlyIncome: 2100 },
  { coin: "TRX", investment: 5000, dailyIncome: 200, monthlyIncome: 6000 },
  { coin: "ETH", investment: 10000, dailyIncome: 380, monthlyIncome: 11400 },
  { coin: "Bitcoin", investment: 20000, dailyIncome: 720, monthlyIncome: 21600 },
];


const InvestmentTable = () => {
  return (
    <div className="p-6 bg-[#0F172A] text-white">
      <h2 className="text-2xl font-semibold mb-6 text-cyan-400">Available Investment Plans</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-cyan-900/60 text-cyan-200 text-sm uppercase tracking-wider">
              <th className="p-3 text-left">Coin</th>
              <th className="p-3 text-left">Investment ($)</th>
              <th className="p-3 text-left">Daily Income ($)</th>
              <th className="p-3 text-left">Monthy Income ($)</th>
            </tr>
          </thead>
          <tbody>
            {seedPlans.map((plan, index) => (
              <tr
                key={index}
                className="border-b border-cyan-800/30 hover:bg-cyan-800/20 transition duration-300"
              >
                <td className="p-3 flex items-center gap-3">
                  <img src={logos[plan.coin]} alt={plan.coin} className="w-6 h-6 rounded-full" />
                  <span>{plan.coin}</span>
                </td>
                <td className="p-3">${plan.investment}</td>
                <td className="p-3 text-green-400 font-medium">${plan.dailyIncome}</td>
                <td className="p-3 text-green-400 font-medium">${plan.monthlyIncome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvestmentTable;
