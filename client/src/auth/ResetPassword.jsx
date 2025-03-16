import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { authAPI } from "../services/api"; // Import the resetPassword API

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
    setErrors({ ...errors, [name]: "" });
  };

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  
  const validate = () => {
    let valid = true;
    const newErrors = {};

    if (!password.trim()) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password.";
      valid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
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
        await authAPI.resetPassword({
          email: email,
          newPassword: password,
          confirmPassword: confirmPassword,
        });
        toast.success("Password has been reset successfully!");
        setPassword("");
        setConfirmPassword("");
        navigate("/auth/login");
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Failed to reset password. Please try again.";
        toast.error(errorMessage);
        console.error("Reset password error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 transform transition duration-300 hover:scale-105">
        <h2 className="text-center text-3xl font-bold text-gray-800">Reset Password</h2>
        <p className="text-center text-sm text-gray-500 mt-2">
          Enter your new password to reset your account.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
                disabled={loading}
                placeholder="Enter new password"
                className={`block w-full px-4 py-2 text-sm rounded-lg shadow-sm border ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                }`}
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="mt-1">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={handleChange}
                disabled={loading}
                placeholder="Confirm new password"
                className={`block w-full px-4 py-2 text-sm rounded-lg shadow-sm border ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                }`}
              />
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
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
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
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

export default ResetPassword;
