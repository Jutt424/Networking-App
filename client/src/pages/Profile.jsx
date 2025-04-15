import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaCopy, FaWallet, } from 'react-icons/fa';
import { PiHandDepositFill } from "react-icons/pi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { paymentAPI } from '../services/api';
import { toast, ToastContainer } from 'react-toastify';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [referralCode, setReferralCode] = useState('');
  const [wallet, setWallet] = useState(null);
  const navigate = useNavigate();
  const getInitial = (name) => name ? name.charAt(0).toUpperCase() : '?';

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const response = await paymentAPI.wallet.getUserWallet(user._id);
        console.log(response);
        setWallet(response.data);
      } catch (error) {
        console.error('Error fetching wallet:', error);
      }
    };
    fetchWallet();
  }, [user._id]);
  const handleCopy = () => {
    const referralLink = `http://localhost:5173/auth/signup?ref=${user._id}`;
    navigator.clipboard.writeText(referralLink)
      .then(() => {
        toast.success("Referral link copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy referral link.");
      });
  };


  return (
    <main className="min-h-screen bg-gray-900 text-white p-6 pb-24">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex items-center gap-4 bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="w-16 h-16 bg-cyan-500 text-black text-2xl font-bold flex items-center justify-center rounded-full">
            {getInitial(user?.name)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{user?.name || 'User'}</h1>
            <p className="text-gray-400">{user?.email || 'user@example.com'}</p>
          </div>
        </div>
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
        {/* User Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
    <FaWallet className="text-cyan-400 text-2xl mx-auto" />
    <p className="text-lg font-bold mt-2">{wallet?.balance || 0} $</p>
    <p className="text-gray-400 text-sm">Wallet Balance</p>
  </div>

  <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center justify-center flex flex-col items-center gap-2">
    <button
      onClick={() => navigate("/recharge")}
      className="bg-cyan-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-cyan-400 transition justify-center flex items-center gap-2"
    >
      <PiHandDepositFill className='text-xl' /> Deposit
    </button>
    <p className="text-gray-400 text-sm">Recharge Your Wallet</p>
  </div>

  <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center justify-center flex flex-col items-center gap-2">
    <button
      onClick={() => navigate("/withdraw")}
      className="bg-cyan-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-cyan-400 transition justify-center flex items-center gap-2"
    >
      <BiMoneyWithdraw className='text-xl' /> Withdraw
    </button>
    <p className="text-gray-400 text-sm">Withdraw Your Wallet</p>
  </div>
</div>


     {/* Referral Section */}
<div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg">
  <h2 className="text-xl font-bold text-white">Referral Program</h2>
  <p className="text-gray-400 mt-2">Invite friends and earn rewards!</p>

  {/* Make this section responsive */}
  <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-700 p-3 rounded-lg">
    <span className="text-cyan-400 font-mono break-all text-sm sm:text-base">
      {`http://localhost:5173/auth/signup?ref=${user._id}` || 'Generating...'}
    </span>
    
    <button
      onClick={handleCopy}
      className="bg-cyan-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-cyan-400 transition flex items-center gap-2 justify-center"
    >
      <FaCopy /> Copy Code
    </button>
  </div>
</div>

        <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-white">About App</h2>
          <p className="text-gray-400 mt-2">This app is a platform for users to earn rewards by inviting their friends and family.</p>
            <p className="">
              Introducing EazyTrade ( VIP Investment Platform ): Your Key to Guaranteed Daily Profits
              Are you tired of the volatility and uncertainty of cryptocurrency investments? Look no further than EazyTrade, the revolutionary new app that guarantees fixed daily profits, regardless of market fluctuations.

              How it Works
              1. Invest: Deposit your desired amount into the app, starting from as low as 30$
              2. Choose Your Plan: Select from our range of investment plans, each offering a fixed daily profit percentage.
              3. Auto-Invest: Our advanced algorithm will automatically invest your funds in a diversified portfolio of cryptocurrencies.
              4. Earn Daily Profits: Receive your fixed daily profits, guaranteed and unaffected by market volatility.
            </p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
