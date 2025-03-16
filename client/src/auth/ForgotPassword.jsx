import React, { useState } from "react";
import { FiMail } from "react-icons/fi";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../services/api"; // Import the forgotPassword API

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
    setErrors({ email: "" });
  };

 
  const validate = () => {
    let valid = true;
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "Invalid email address.";
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
        await authAPI.forgotPassword({ email });
        toast.success("Password reset link sent to your email!");
         navigate(`/auth/otp?email=${email}`);
        } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to send reset link. Please try again.";
        toast.error(errorMessage);
        console.error("Forgot password error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 transform transition duration-300 hover:scale-105">
        <h2 className="text-center text-3xl font-bold text-gray-800">
          Forgot Password
        </h2>
        <p className="text-center text-sm text-gray-500 mt-2">
          Enter your email address, and we’ll send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="mt-1 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <FiMail />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                disabled={loading}
                placeholder="Enter your email"
                className={`block w-full pl-10 pr-4 py-2 text-sm rounded-lg shadow-sm border ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
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
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            Remember your password? {" "}
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

export default ForgotPassword;
