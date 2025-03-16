import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserEdit, FaLock, FaSignOutAlt, FaCopy, FaWallet, FaRegHeart, FaHistory } from 'react-icons/fa';
import { PiHandDepositFill } from "react-icons/pi";
import { BiMoneyWithdraw } from "react-icons/bi";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [referralCode, setReferralCode] = useState('');
  const [pendingWithdrawals, setPendingWithdrawals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReferralCode = async () => {
      try {
        const response = await fetch('/api/user/referral');
        const data = await response.json();
        setReferralCode(data.referralCode);
      } catch (error) {
        console.error('Failed to fetch referral code', error);
      }
    };

    const fetchPendingWithdrawals = async () => {
      try {
        const response = await fetch('/api/user/pending-withdrawals');
        const data = await response.json();
        setPendingWithdrawals(data.withdrawals || []);
      } catch (error) {
        console.error('Failed to fetch pending withdrawals', error);
      }
    };

    fetchReferralCode();
    fetchPendingWithdrawals();
  }, []);

  const getInitial = (name) => name ? name.charAt(0).toUpperCase() : '?';

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

        {/* User Stats Section */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <FaWallet className="text-cyan-400 text-2xl mx-auto" />
            <p className="text-lg font-bold mt-2">$337</p>
            <p className="text-gray-400 text-sm">Wallet Balance</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center justify-center flex flex-col items-center gap-2">
            <button onClick={()=>navigate("/recharge")} className="bg-cyan-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-cyan-400 transition justify-center flex items-center gap-2">
            <PiHandDepositFill className='text-xl' /> Deposit
            </button>
            <p className="text-gray-400 text-sm">Recharge Your Wallet</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center justify-center flex flex-col items-center gap-2">
            <button onClick={()=>navigate("/withdraw")} className="bg-cyan-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-cyan-400 transition justify-center flex items-center gap-2">
            <BiMoneyWithdraw className='text-xl' /> Withdraw
            </button>
            <p className="text-gray-400 text-sm">Withdraw Your Wallet</p>
          </div>
        </div>

        {/* Referral Section */}
        <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-white">Referral Program</h2>
          <p className="text-gray-400 mt-2">Invite friends and earn rewards!</p>
          <div className="mt-4 flex items-center justify-between bg-gray-700 p-3 rounded-lg">
            <span className="text-cyan-400 font-mono">{referralCode || 'Generating...'}</span>
            <button className="bg-cyan-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-cyan-400 transition flex items-center gap-2">
              <FaCopy /> Copy Code
            </button>
          </div>
        </div>

        {/* Pending Withdrawals Section */}
        <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-white">Pending Withdrawals</h2>
          {pendingWithdrawals.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {pendingWithdrawals.map((withdrawal, index) => (
                <li key={index} className="bg-gray-700 p-3 rounded-lg flex justify-between">
                  <div>
                    <p className="font-semibold text-white">Rs{withdrawal.amount}</p>
                    <p className="text-gray-400 text-sm">Method: {withdrawal.method}</p>
                  </div>
                  <span className="text-yellow-400">Pending</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 mt-2">No pending withdrawals.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Profile;
