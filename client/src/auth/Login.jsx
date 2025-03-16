import React, { useState, useContext, useEffect } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login, loading, errorMessage, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Invalid email address.";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const success = await login(formData);
        if (success) {
          toast.success("Login successful!");
          navigate("/");
        } else if (errorMessage) {
          // Set password error if it's an authentication error
          if (errorMessage.toLowerCase().includes("password") || errorMessage.toLowerCase().includes("credentials")) {
            setErrors(prev => ({ ...prev, password: errorMessage }));
          }
          toast.error(errorMessage);
        }
      } catch (error) {
        setErrors(prev => ({ ...prev, password: "An error occurred during login" }));
        toast.error("An error occurred during login");
        console.error("Login error:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 transform transition duration-300 hover:scale-105">
        <h2 className="text-center text-3xl font-bold text-gray-800">
          Welcome Back
        </h2>
       
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                value={formData.email}
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

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <FiLock />
              </span>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                placeholder="Enter your password"
                className={`block w-full pl-10 pr-4 py-2 text-sm rounded-lg shadow-sm border ${
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
          <div className="flex justify-end">
            <Link
              to="/auth/forgot-password"
              className="text-purple-600 hover:underline text-sm hover:text-purple-800"
            >
              Forgot Password
            </Link>
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">
          Sign in to your account or{" "}
          <Link
            to="/auth/signup"
            className="text-purple-600 hover:underline hover:text-purple-800"
          >
            create a new one
          </Link>
        </p>
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
