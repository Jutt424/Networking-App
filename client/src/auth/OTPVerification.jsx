import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { authAPI } from "../services/api";

const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const handleChange = (e) => {
    setOtp(e.target.value);
    setErrors({ otp: "" });
  };

  const validate = () => {
    let valid = true;
    const newErrors = {};

    if (!otp.trim()) {
      newErrors.otp = "OTP is required.";
      valid = false;
    } else if (otp.length !== 4 || !/^[0-9]+$/.test(otp)) {
      newErrors.otp = "Invalid OTP. Must be a 4-digit number.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        setLoading(true);
        await authAPI.verifyOtp(otp, email);
        toast.success("OTP verified successfully!");
        navigate(`/auth/reset-password?email=${email}`);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          "Failed to verify OTP. Please try again.";
        toast.error(errorMessage);
        console.error("OTP verification error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 transform transition duration-300 hover:scale-105">
        <h2 className="text-center text-3xl font-bold text-gray-800">OTP Verification</h2>
        <p className="text-center text-sm text-gray-500 mt-2">
          Enter the 4-digit OTP sent to <strong>{email}</strong>.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="relative">
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700"
            >
              OTP
            </label>
            <div className="mt-1">
              <input
                id="otp"
                name="otp"
                type="text"
                value={otp}
                onChange={handleChange}
                disabled={loading}
                placeholder="Enter OTP"
                className={`block w-full px-4 py-2 text-sm rounded-lg shadow-sm border ${
                  errors.otp
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                }`}
              />
            </div>
            {errors.otp && (
              <p className="mt-1 text-sm text-red-600">{errors.otp}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            Didn’t receive an OTP?{" "}
            <button
              type="button"
              disabled={loading}
              onClick={() => toast.info("Resending OTP...")}
              className="text-purple-600 hover:underline hover:text-purple-800"
            >
              Resend OTP
            </button>
          </p>
          <p className="text-center text-sm text-gray-500 mt-2">
            Back to{" "}
            <Link
              to="/auth/login"
              className="text-purple-600 hover:underline hover:text-purple-800"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
