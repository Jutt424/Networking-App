import React, { useState, useEffect } from 'react';
import { paymentAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const History = () => {
    const [pendingWithdrawals, setPendingWithdrawals] = useState([]);  
    const [pendingRecharges, setPendingRecharges] = useState([]);
    const { user } = useContext(AuthContext);
    // console.log(user);
    const token = localStorage.getItem('token');
    useEffect(() => {
    if (token) {
        const fetchPendingWithdrawals = async () => {
            try {
                const response = await paymentAPI.getPayments({ userId: user._id });
                const data = await response.data;
                console.log(data);
                setPendingWithdrawals(data.payments || []);
            } catch (error) {
                console.error('Failed to fetch pending withdrawals', error);
            }
        };
        fetchPendingWithdrawals();
    }

    }, [token]);

    useEffect(() => {
        if (token) {
            const fetchUserRecharges = async () => {
                try {
                    const response = await paymentAPI.getUserRecharges({ userId: user._id });
                    const data = await response.data;
                    // console.log(data);
                    setPendingRecharges(data.recharges || []);
                } catch (error) {
                    console.error('Failed to fetch user recharges', error);
                }
            };
            fetchUserRecharges();
        }
    }, [token]);

    return (
        <main className="min-h-screen bg-gray-900 text-white p-6 pb-24">
            <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
                <h2 className="text-xl font-bold text-white">Pending Withdrawals</h2>
                
                {pendingWithdrawals.length > 0 ? (
                    <ul className="mt-4 space-y-3">
                        {pendingWithdrawals.map((withdrawal, index) => (
                            <li key={index} className="bg-gray-700 p-3 rounded-lg flex justify-between">
                                <div>
                                    <p className="font-semibold text-white">Rs: {withdrawal.amount}</p>
                                    <p className="text-gray-400 text-sm">Method: {withdrawal.paymentMethod}</p>

                                    {/* ✅ Bank Name Only if Payment Method is Bank Account */}
                                    {withdrawal.paymentMethod === "Bank" && (
                                        <p className="text-gray-400 text-sm">Bank: {withdrawal.bankName || "N/A"}</p>
                                    )}

                                    {/* ✅ Account Number Display */}
                                    <p className="text-gray-400 text-sm">Account: {withdrawal.accountNumber}</p>
                                </div>
                                {withdrawal.status === "pending" && <span className="text-yellow-400">{withdrawal.status}</span>}
                                {withdrawal.status === "approved" && <span className="text-green-400">{withdrawal.status}</span>}
                                {withdrawal.status === "rejected" && <span className="text-red-400">{withdrawal.status}</span>}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-400 mt-2">No pending withdrawals.</p>
                )}
            </div>
            <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
                <h2 className="text-xl font-bold text-white">Pending Recharges</h2>
                
                {pendingRecharges.length > 0 ? (
                    <ul className="mt-4 space-y-3">
                        {pendingRecharges.map((recharge, index) => (
                            <li key={index} className="bg-gray-700 p-3 rounded-lg flex justify-between">
                                <div>
                                    <p className="font-semibold text-white">Rs: {recharge.amount}</p>

                                    {/* ✅ Bank Name Only if Payment Method is Bank Account */}
                                    {recharge.paymentMethod === "Bank" && (
                                        <p className="text-gray-400 text-sm">Bank: {recharge.bankName || "N/A"}</p>
                                    )}
                                </div>
                                {recharge.status === "pending" && <span className="text-yellow-400">{recharge.status}</span>}
                                {recharge.status === "approved" && <span className="text-green-400">{recharge.status}</span>}
                                {recharge.status === "rejected" && <span className="text-red-400">{recharge.status}</span>}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-400 mt-2">No pending withdrawals.</p>
                )}
            </div>
        </main>
    );
}

export default History;
