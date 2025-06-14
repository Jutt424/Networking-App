import React, { useEffect, useState } from "react";
import { BookCopy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { paymentAPI } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
const Withdraw = () => {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [wallet, setWallet] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('token');

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

  const handleWithdraw = () => {
    if (!withdrawAmount || !selectedMethod || !accountNumber) {
      toast.error("Please fill all the required fields!");
      return;
    }
    
    if (parseFloat(withdrawAmount) < 15) {
      toast.error("Minimum withdrawal amount is $15.");
      return;
    }
    
  if(token){
    const data = {
      userId: user._id,
      paymentMethod: selectedMethod,
      accountNumber,
      amount: withdrawAmount,
      bankName: selectedMethod === "Bank" ? bankName : null
    };
    if (!wallet || wallet.balance < parseFloat(withdrawAmount)) {
      toast.error("Insufficient wallet balance.");
      return;
    }
    paymentAPI.withdraw(data);
    setIsDialogOpen(true);
    setTimeout(() => {
      navigate("/history");
    }, 2000);
  }
  };

  return (
    <div className="bg-gray-900 h-screen">
      <div className="bg-gray-900 p-4 max-w-lg mx-auto space-y-6 text-white">
        <div className="bg-gray-800 shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4 text-center">Withdraw</h2>
          <p className="text-xl font-bold mb-4 text-center">Minimum withdraw amount 15 $</p>
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
          <div className="space-y-3 mb-4">
            {["TRC 20"].map((method) => (
              <label key={method} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={selectedMethod === method}
                  onChange={() => setSelectedMethod(method)}
                  className="accent-cyan-500"
                />
                <span className="text-gray-300">{method}</span>
              </label>
            ))}
          </div>

          {selectedMethod && (
            <input
              type="text"
              placeholder="Enter your USDT Wallet Address (TRC 20)"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring focus:ring-cyan-500 focus:outline-none"
            />
          )}

          {selectedMethod === "Bank" && (
            <div className="mt-4">
              <input
                type="text"
                placeholder="Enter your bank name"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring focus:ring-cyan-500 focus:outline-none"
              />
            </div>
          )}

          <div className="mt-4">
            <input
              type="number"
              placeholder="Enter 15-10000 $"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring focus:ring-cyan-500 focus:outline-none"
            />
          </div>

          {/* Withdraw Button */}
          <button
            disabled={!withdrawAmount || !selectedMethod || !accountNumber || (selectedMethod === "Bank" && !bankName)}
            onClick={handleWithdraw}
            className={`w-full py-2 mt-4 rounded-lg text-black font-semibold transition-colors ${withdrawAmount && selectedMethod && accountNumber && (selectedMethod !== "Bank" || bankName)
                ? "bg-cyan-500 hover:bg-cyan-400"
                : "bg-gray-500 cursor-not-allowed"
              }`}
          >
            Withdraw
          </button>
        </div>

        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <Dialog.Panel className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-96 text-center">
            <Dialog.Title className="text-lg font-bold">Withdrawal Request Sent</Dialog.Title>
            <p className="mt-2 text-gray-300">Your withdrawal request is in process</p>
          </Dialog.Panel>
        </Dialog>
      </div>

      <div className="flex items-center justify-center">
        <div className="bg-gray-800 text-white shadow-lg rounded-2xl p-6 max-w-lg">
          <h3 className="text-lg font-bold mb-3 flex">
            <BookCopy className="w-6 h-6 text-violet-500 mr-2" /> Withdraw Instructions
          </h3>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <span className=""><span className="font-medium">Note: </span>When you withdraw, the request will be sent to the admin for approval. Feel free to reach out if you have any questions.</span>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
