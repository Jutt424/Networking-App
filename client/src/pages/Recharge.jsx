import React, { useState, useContext } from "react";
import { BookCopy } from "lucide-react";
import { FaCopy } from "react-icons/fa";
import { paymentAPI } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import uzairQR from "../assets/uzairQR.jpg";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
const Recharge = () => {
  const [amount, setAmount] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [preview, setPreview] = useState(null); // Image preview ke liye
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success("Address copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy.");
      });
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

    // console.log("FormData Entries:");
    for (let pair of formData.entries()) {
      // console.log(pair[0], pair[1]); // Yeh check karega ke screenshot aa raha hai ya nahi
    }

    try {
      setLoading(true);
      const response = await paymentAPI.recharge(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log("Recharge Successful:", response.data);
      setIsDialogOpen(true);
      setTimeout(() => {
        navigate("/history");
      }, 2000);
    } catch (error) {
      console.error("Recharge Error:", error);
      toast.error("Something went wrong! Please try again.");
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
          <div className="mb-4 space-y-3">
            {[
              { name: 'TRC 20', number: 'TPuAtywHNgDJkGTZqqaSQDBdeZTfJhRzFN' },
              { name: 'TRC 20', number: 'TYiNMxjF6NzykpEt3iVRRJXTZS6S4t2DBh' },
            ].map((bank, index) => (
              <>
                <div key={index} className="flex justify-between items-center bg-gray-700 p-3 rounded-lg">
                  <span className="text-md font-medium">{bank.name}: <span className="text-cyan-400 text-xs">{bank.number}</span></span>
                  <button onClick={() => copyToClipboard(bank.number)} className="text-cyan-400 hover:text-cyan-300">
                    <FaCopy />
                  </button>
                </div>
                {/* <img src={uzairQR} alt="" className="w-full" /> */}
              </>
            ))}
          </div>
          <h3 className="text-lg font-bold mb-3 flex items-center">
            <BookCopy className="w-6 h-6 mr-2 text-violet-500" />Recharge Instructions
          </h3>
          <p className="mb-4">🔅 If you transfer the wrong amount, our company will not be responsible for the lost amount.</p>
          <p><span className="font-medium">Note:</span> Do not cancel the deposit order after the money has been transferred.</p>
          {/* <p className="font-bold text-xl mt-4">Binance Address:</p> */}

        </div>
      </div>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <Dialog.Panel className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-96 text-center">
          <Dialog.Title className="text-lg font-bold">Recharge Request Sent</Dialog.Title>
          <p className="mt-2 text-gray-300">Your recharge request is in process and sent to the admin.</p>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default Recharge;
