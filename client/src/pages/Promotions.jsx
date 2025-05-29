import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FaCopy,  } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import ReferredUsersTable from '../components/ReferredUsersTable';

const Promotions = () => {
  const { user } = useContext(AuthContext);

  const referralLink = `https://eazytrade.xyz/auth/signup?ref=${user._id}`;


  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
      .then(() => toast.success("Referral link copied!"))
      .catch(() => toast.error("Failed to copy link"));
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white px-4 py-8 pb-24">
      <div className="max-w-5xl mx-auto space-y-8">

        <div className="text-center">
          <h1 className="text-3xl font-bold text-cyan-400">🎁 Promotions & Referral Program</h1>
          <p className="text-gray-400 mt-2">Invite friends & earn daily passive income</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-bold text-white">Your Referral Link</h2>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gray-700 p-3 rounded-lg">
            <span className="text-cyan-400 font-mono break-all text-sm sm:text-base">{referralLink}</span>
            <button
              onClick={handleCopy}
              className="bg-cyan-500 text-black px-4 py-2 rounded-md font-semibold hover:bg-cyan-400 flex items-center gap-2 justify-center"
            >
              <FaCopy /> Copy Link
            </button>
          </div>
        </div>

        <ReferredUsersTable />

        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-white mb-2">💡 How it Works</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Invite your friends using the referral link above.</li>
            <li>Once they deposit, you earn a commission instantly.</li>
            <li>You can track all your referrals in the table above.</li>
          </ul>
          <div className="mt-4 text-gray-400">
            <p><strong>EazyTrade</strong> is a VIP investment platform offering fixed daily profits. Enjoy hassle-free earning with our automated crypto investment system.</p>
          </div>
        </div>

        <ToastContainer theme="dark" position="top-right" />
      </div>
    </main>
  );
};

export default Promotions;
