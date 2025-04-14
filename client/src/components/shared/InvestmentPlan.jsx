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
import sui from "../../assets/sui.png";
import dot from "../../assets/dot.png";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { toast, ToastContainer } from "react-toastify";



const logos = {
  XRP: xrp,
  SUI: sui,
  Trump: trump,
  "Pi": pi500,
  Solana: solana,
  "dot": dot,
  BNB: bnb,
  Doge: doge,
  TRX: trx,
  ETH: eth,
  Bitcoin: bitcoin,
};


const seedPlans = [
  { coin: "XRP", investment: 30, dailyIncome: 1.5 },
  { coin: "SUI", investment: 50, dailyIncome: 2.10 },
  { coin: "Trump", investment: 100, dailyIncome: 4.5 },
  { coin: "Pi", investment: 200, dailyIncome: 8.5 },
  { coin: "Solana", investment: 300, dailyIncome: 12.5 },
  { coin: "dot", investment: 500, dailyIncome: 20 },
  { coin: "BNB", investment: 1000, dailyIncome: 40 },
  { coin: "Doge", investment: 1800, dailyIncome: 70 },
  { coin: "TRX", investment: 5000, dailyIncome: 200 },
  { coin: "ETH", investment: 10000, dailyIncome: 380 },
  { coin: "Bitcoin", investment: 20000, dailyIncome: 720 },
];

const InvestmentPlan = () => {
  const [investedCoins, setInvestedCoins] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const { user } = useContext(AuthContext);
  const userId = user._id;

  const confirmInvest = async () => {
    try {
      await investmentAPI.investInPlan({ coin: selectedCoin, userId });
      setIsDialogOpen(false);
      setSelectedCoin(null);
      toast.success("Investment successful!");
    } catch (error) {
      toast.error("Insufficient balance, Please Recharge");
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
    <>
    <div className="bg-gray-900 text-white flex items-center justify-center min-h-screen px-4">
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center w-full max-w-6xl py-16"
      >
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
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
                  Invested
                </span> 
              ) : (
                <button
                  onClick={() => {
                    setSelectedCoin(plan.coin);
                    setIsDialogOpen(true);
                  }}
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
    <Transition appear show={isDialogOpen} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={() => setIsDialogOpen(false)}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </Transition.Child>
  
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                Confirm Investment
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Are you sure you want to invest in <span className="font-semibold">{selectedCoin}</span>?
                </p>
              </div>
  
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-500"
                  onClick={confirmInvest}
                >
                  Invest
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
  </>
  );
};

export default InvestmentPlan;
