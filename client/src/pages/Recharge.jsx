import React, { useState } from "react";
import { BookCopy, CheckCircle } from "lucide-react";
import { FaCopy } from "react-icons/fa";

const Recharge = () => {
  const [amount, setAmount] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setScreenshot(URL.createObjectURL(file));
    }
  };
  return (
    <div className="bg-gray-900">
      <div className="p-4 max-w-lg mx-auto space-y-6">
        {/* Deposit Section */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">Deposit Amount</h2>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Enter the amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>
          <button
            disabled={!amount}
            className={`w-full py-2 rounded-lg text-white font-semibold transition-colors ${
              amount ? "bg-violet-600 hover:bg-violet-700" : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Deposit
          </button>
        </div>

        {/* Recharge Instructions */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-3 text-gray-800 flex"> <BookCopy className="w-6 h-6 mr-1 text-violet-500 mr-2" />Recharge Instructions</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
            <li className="mb-4 list-none">🔅 If you transfer the wrong amount our company will not be responsible for the lost amount.</li>
            <span className=""><span className="font-medium text-gray-800">Note: </span> do not cancel the Deposit order after the money has been transferred.</span>
          </ul>
          <p className="font-bold text-xl mt-2">Bank Details:</p>
          <div className="mt-4 space-y-3">
            {[{
              name: 'UBL', number: '1234-5678-9012'
            }, {
              name: 'HBL', number: '2345-6789-0123'
            }, {
              name: 'MCB', number: '3456-7890-1234'
            }, {
              name: 'Allied Bank', number: '4567-8901-2345'
            }].map((bank, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                <span className="text-md font-medium text-gray-800">{bank.name}: {bank.number}</span>
                <button onClick={() => copyToClipboard(bank.number)} className="text-cyan-500 hover:text-cyan-600">
                  <FaCopy />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Deposit History */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-3 text-gray-800">Deposit History</h3>
          <div className="border-t border-gray-300 pt-3 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-gray-800">Time</span>
              <span className="text-gray-700">2025-01-23 21:55:46</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-gray-800">Order number</span>
              <span className="text-gray-700">RC2025012321554697768177c</span>
            </div>
            <div className="mt-4">
              <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-blue-200 focus:outline-none" />
            </div>
            {screenshot && (
              <div className="mt-4">
                <p className="text-gray-800 font-medium">Preview:</p>
                <img src={screenshot} alt="Payment Screenshot" className="mt-2 rounded-lg border" />
              </div>
            )}
            <button
              disabled={!screenshot}
              className={`w-full mt-4 py-2 rounded-lg text-white font-semibold transition-colors ${
                screenshot ? "bg-violet-600 hover:bg-violet-700" : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Submit Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recharge;
