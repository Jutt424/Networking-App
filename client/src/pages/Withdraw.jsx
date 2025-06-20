// import React, { useEffect, useState } from "react";
// import { BookCopy } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { Dialog } from "@headlessui/react";
// import { paymentAPI } from "../services/api";
// import { AuthContext } from "../context/AuthContext";
// import { useContext } from "react";
// import { toast, ToastContainer } from "react-toastify";
// const Withdraw = () => {
//   const [withdrawAmount, setWithdrawAmount] = useState("");
//   const [selectedMethod, setSelectedMethod] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [bankName, setBankName] = useState("");
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [wallet, setWallet] = useState(null);
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetchWallet = async () => {
//       try {
//         const response = await paymentAPI.wallet.getUserWallet(user._id);
//         console.log(response);
//         setWallet(response.data);
//       } catch (error) {
//         console.error('Error fetching wallet:', error);
//       }
//     };
//     fetchWallet();
//   }, [user._id]);

//   const handleWithdraw = () => {
//     if (!withdrawAmount || !selectedMethod || !accountNumber) {
//       toast.error("Please fill all the required fields!");
//       return;
//     }

//     if (parseFloat(withdrawAmount) < 15) {
//       toast.error("Minimum withdrawal amount is $15.");
//       return;
//     }

//   if(token){
//     const data = {
//       userId: user._id,
//       paymentMethod: selectedMethod,
//       accountNumber,
//       amount: withdrawAmount,
//       bankName: selectedMethod === "Bank" ? bankName : null
//     };
//     if (!wallet || wallet.balance < parseFloat(withdrawAmount)) {
//       toast.error("Insufficient wallet balance.");
//       return;
//     }
//     paymentAPI.withdraw(data);
//     setIsDialogOpen(true);
//     setTimeout(() => {
//       navigate("/history");
//     }, 2000);
//   }
//   };

//   return (
//     <div className="bg-gray-900 h-screen">
//       <div className="bg-gray-900 p-4 max-w-lg mx-auto space-y-6 text-white">
//         <div className="bg-gray-800 shadow-lg rounded-2xl p-6">
//           <h2 className="text-xl font-bold mb-4 text-center">Withdraw</h2>
//           <p className="text-xl font-bold mb-4 text-center">Minimum withdraw amount 15 $</p>
//           <ToastContainer
//           position="top-right"
//           autoClose={5000}
//           hideProgressBar={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="dark"
//           />
//           <div className="space-y-3 mb-4">
//             {["TRC 20"].map((method) => (
//               <label key={method} className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="radio"
//                   name="paymentMethod"
//                   value={method}
//                   checked={selectedMethod === method}
//                   onChange={() => setSelectedMethod(method)}
//                   className="accent-cyan-500"
//                 />
//                 <span className="text-gray-300">{method}</span>
//               </label>
//             ))}
//           </div>

//           {selectedMethod && (
//             <input
//               type="text"
//               placeholder="Enter your USDT Wallet Address (TRC 20)"
//               value={accountNumber}
//               onChange={(e) => setAccountNumber(e.target.value)}
//               className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring focus:ring-cyan-500 focus:outline-none"
//             />
//           )}

//           {selectedMethod === "Bank" && (
//             <div className="mt-4">
//               <input
//                 type="text"
//                 placeholder="Enter your bank name"
//                 value={bankName}
//                 onChange={(e) => setBankName(e.target.value)}
//                 className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring focus:ring-cyan-500 focus:outline-none"
//               />
//             </div>
//           )}

//           <div className="mt-4">
//             <input
//               type="number"
//               placeholder="Enter 15-10000 $"
//               value={withdrawAmount}
//               onChange={(e) => setWithdrawAmount(e.target.value)}
//               className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:ring focus:ring-cyan-500 focus:outline-none"
//             />
//           </div>

//           {/* Withdraw Button */}
//           <button
//             disabled={!withdrawAmount || !selectedMethod || !accountNumber || (selectedMethod === "Bank" && !bankName)}
//             onClick={handleWithdraw}
//             className={`w-full py-2 mt-4 rounded-lg text-black font-semibold transition-colors ${withdrawAmount && selectedMethod && accountNumber && (selectedMethod !== "Bank" || bankName)
//                 ? "bg-cyan-500 hover:bg-cyan-400"
//                 : "bg-gray-500 cursor-not-allowed"
//               }`}
//           >
//             Withdraw
//           </button>
//         </div>

//         <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <Dialog.Panel className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-96 text-center">
//             <Dialog.Title className="text-lg font-bold">Withdrawal Request Sent</Dialog.Title>
//             <p className="mt-2 text-gray-300">Your withdrawal request is in process</p>
//           </Dialog.Panel>
//         </Dialog>
//       </div>

//       <div className="flex items-center justify-center">
//         <div className="bg-gray-800 text-white shadow-lg rounded-2xl p-6 max-w-lg">
//           <h3 className="text-lg font-bold mb-3 flex">
//             <BookCopy className="w-6 h-6 text-violet-500 mr-2" /> Withdraw Instructions
//           </h3>
//           <ul className="list-disc list-inside space-y-2 text-sm">
//             <span className=""><span className="font-medium">Note: </span>When you withdraw, the request will be sent to the admin for approval. Feel free to reach out if you have any questions.</span>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Withdraw;

import React, { useEffect, useState, useContext } from "react";
import { BookCopy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { authAPI, paymentAPI, userAPI } from "../services/api"; // userAPI add karen
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";

const Withdraw = () => {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [wallet, setWallet] = useState(null);
  const [userData, setUserData] = useState({ referralsCount: 0, freeWithdrawUsed: false });

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [walletRes, meRes] = await Promise.all([
          paymentAPI.wallet.getUserWallet(user._id),
          authAPI.getProfile(),
        ]);

        setWallet(walletRes.data);
        setUserData({
          referralsCount: meRes.data.referralsCount,
          freeWithdrawUsed: meRes.data.freeWithdrawUsed,
        });

      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [user._id]);


  // determine if user can do a free withdraw
  const canFree = !userData.freeWithdrawUsed && userData.referralsCount >= 2;

  const handleWithdraw = async (wantFee = false) => {
    // 1) Validate inputs
    if (
      !withdrawAmount ||
      !selectedMethod ||
      !accountNumber ||
      (selectedMethod === "Bank" && !bankName)
    ) {
      toast.error("Please fill all the required fields!");
      return;
    }

    // 2) Parse and check minimum
    const amountNum = Number(withdrawAmount);
    if (!amountNum || amountNum < 15) {
      toast.error("Minimum withdrawal amount is $15.");
      return;
    }

    // 3) Fee logic
    const fee = wantFee ? 5 : 0;
    const needed = amountNum + fee;

    // 4) Debug logging
    console.log("Wallet object:", wallet);
    console.log("wallet.balance:", wallet?.balance, "needed:", needed);

    // 5) Balance check
    const available = Number(wallet?.balance) || 0;
    if (available < needed) {
      toast.error(`Insufficient wallet balance. You have $${available}, but need $${needed}.`);
      return;
    }

    // 6) Build payload
    const data = {
      userId: user._id,
      paymentMethod: selectedMethod,
      accountNumber,
      bankName: selectedMethod === "Bank" ? bankName : null,
      amount: amountNum,
      wantFee,
    };

    // 7) Submit
    try {
      await paymentAPI.withdraw(data);
      setIsDialogOpen(true);
      setTimeout(() => navigate("/history"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error submitting withdrawal");
    }
  };

  return (
    <div className="bg-gray-900 h-screen">
      <div className="bg-gray-900 p-4 max-w-lg mx-auto space-y-6 text-white">
        <div className="bg-gray-800 shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-2 text-center">Withdraw</h2>
          <p className="text-sm mb-4 text-center">
            Referrals: {userData.referralsCount} &nbsp;|&nbsp; Free Withdraw Used:{" "}
            {userData.freeWithdrawUsed ? "Yes" : "No"}
          </p>

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

          <div className="mt-4 space-y-2">
            {canFree ? (
              <button
                onClick={() => handleWithdraw(false)}
                className="w-full py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold"
              >
                Withdraw Free
              </button>
            ) : (
              <>
                <button
                  disabled
                  className="w-full py-2 rounded-lg bg-gray-500 text-gray-300 cursor-not-allowed"
                >
                  Free Withdraw Not Available
                </button>
                <button
                  onClick={() => handleWithdraw(true)}
                  className="w-full py-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-semibold"
                >
                  Withdraw with $5 Fee
                </button>
              </>
            )}
          </div>
        </div>

        {/* Confirmation Dialog */}
        <Dialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <Dialog.Panel className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-96 text-center">
            <Dialog.Title className="text-lg font-bold">Request Sent</Dialog.Title>
            <p className="mt-2 text-gray-300">Your withdrawal request is pending approval.</p>
          </Dialog.Panel>
        </Dialog>
      </div>

      {/* Withdraw Instructions */}
      <div className="flex items-center justify-center">
        <div className="bg-gray-800 text-white shadow-lg rounded-2xl p-6 max-w-lg">
          <h3 className="text-lg font-bold mb-3 flex items-center">
            <BookCopy className="w-6 h-6 text-violet-500 mr-2" /> Withdraw Instructions
          </h3>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Free withdraw available only if you have ≥2 successful referrals and haven’t used it yet.</li>
            <li>Otherwise, a $5 fee applies.</li>
            <li>All requests are sent for admin approval.</li>
          </ul>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Withdraw;

