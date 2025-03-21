import React, { useState, useContext } from "react";
import { BookCopy } from "lucide-react";
import { FaCopy } from "react-icons/fa";
import { paymentAPI } from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Recharge = () => {
  const [amount, setAmount] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [preview, setPreview] = useState(null); // Image preview ke liye
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const recharge = async () => {
    if (!amount || !screenshot) {
        alert("Please enter an amount and upload a screenshot!");
        return;
    }

    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("amount", amount);
    formData.append("screenshot", screenshot);

    console.log("FormData Entries:");
    for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]); // Yeh check karega ke screenshot aa raha hai ya nahi
    }

    try {
        setLoading(true);
        const response = await paymentAPI.recharge(formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("Recharge Successful:", response.data);
        alert("Recharge request submitted successfully!");
    } catch (error) {
        console.error("Recharge Error:", error);
        alert("Something went wrong! Please try again.");
    } finally {
        setLoading(false);
    }
};

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
      console.log("Selected file:", file);
      setScreenshot(file);
      setPreview(URL.createObjectURL(file)); // Preview ke liye
  }
};

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
        {/* Deposit Section */}
        <div className="bg-gray-800 shadow-lg rounded-2xl p-6 text-white">
          <h2 className="text-xl font-bold text-center mb-4">Deposit Amount</h2>
          <input
            type="number"
            placeholder="Enter the amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-600 bg-gray-700 rounded-lg px-4 py-2 focus:ring focus:ring-violet-500 focus:outline-none text-white"
          />
          <div className="mt-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-gray-600 bg-gray-700 rounded-lg px-4 py-2 text-white"
            />
          </div>
          {preview && (
            <div className="mt-4">
              <p className="font-medium">Preview:</p>
              <img src={preview} alt="Payment Screenshot" className="mt-2 rounded-lg border" />
            </div>
          )}
          <button
            disabled={!amount || !screenshot || loading}
            onClick={recharge}
            className={`w-full py-2 mt-4 rounded-lg font-semibold transition-colors ${amount && screenshot
                ? "bg-violet-600 hover:bg-violet-700"
                : "bg-gray-500 cursor-not-allowed"
              }`}
          >
            {loading ? "Processing..." : "Deposit"}
          </button>
        </div>

        {/* Recharge Instructions */}
        <div className="bg-gray-800 shadow-lg rounded-2xl p-6 text-white">
          <h3 className="text-lg font-bold mb-3 flex items-center">
            <BookCopy className="w-6 h-6 mr-2 text-violet-500" />Recharge Instructions
          </h3>
          <p className="mb-4">🔅 If you transfer the wrong amount, our company will not be responsible for the lost amount.</p>
          <p><span className="font-medium">Note:</span> Do not cancel the deposit order after the money has been transferred.</p>
          <p className="font-bold text-xl mt-4">Bank Details:</p>
          <div className="mt-4 space-y-3">
            {[
              { name: 'UBL', number: '1234-5678-9012' },
              { name: 'HBL', number: '2345-6789-0123' },
              { name: 'MCB', number: '3456-7890-1234' },
              { name: 'Allied Bank', number: '4567-8901-2345' }
            ].map((bank, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-700 p-3 rounded-lg">
                <span className="text-md font-medium">{bank.name}: {bank.number}</span>
                <button onClick={() => copyToClipboard(bank.number)} className="text-cyan-400 hover:text-cyan-300">
                  <FaCopy />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recharge;
