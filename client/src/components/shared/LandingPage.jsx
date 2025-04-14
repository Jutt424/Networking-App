import React from "react";
import { motion } from "framer-motion";
import InvestmentPlan from "./InvestmentPlan";
import { Link } from "react-router-dom";
import InvestmentTable from "./InvestmentTable";

const LandingPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-8">
      <header className="w-full max-w-6xl flex justify-between md:flex-row flex-col items-center py-6 gap-4">
        <h1 className="text-4xl font-bold text-cyan-400">VIP Investment Platform</h1>
        <Link to="/dashboard" className="bg-cyan-500 text-black px-6 py-2 rounded-md font-semibold hover:bg-cyan-400 transition">
          Get Started
        </Link>
      </header>
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mt-16"
      >
        <h2 className="text-5xl font-extrabold text-white mb-6">Invest in Crypto with Confidence</h2>
        <p className="text-lg text-gray-300 mb-8">Join the most trusted investment platform and grow your wealth with our exclusive VIP investment packages.</p>
        <Link to="/tasks" className="bg-cyan-500 text-black px-8 py-3 rounded-md text-lg font-semibold hover:bg-cyan-400 transition">
          Explore Packages
        </Link>
      </motion.section>

      {/* Live Profit Stats */}
      <section className="mt-20 max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-3xl font-bold text-cyan-400">$1M+</h3>
          <p className="text-gray-300 mt-2">Total Investments</p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-3xl font-bold text-cyan-400">500K+</h3>
          <p className="text-gray-300 mt-2">Happy Investors</p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-3xl font-bold text-cyan-400">$700K+</h3>
          <p className="text-gray-300 mt-2">Withdrawn Profits</p>
        </motion.div>
      </section>

      {/* Secure Investment Packages Overview */}
      <section className="mt-20 max-w-6xl w-full text-center">
        <h3 className="text-4xl font-bold text-cyan-400 mb-6">Choose Your Investment Package</h3>
        <InvestmentTable />
        <p className="text-lg text-gray-300 mb-8">Select from our best-in-class investment packages to start earning profits today.</p>
        <InvestmentPlan />
      </section>

      {/* Testimonials / Trusted By Thousands */}
      <section className="mt-20 max-w-6xl w-full text-center">
        <h3 className="text-4xl font-bold text-cyan-400 mb-6">Trusted by Thousands</h3>
        <p className="text-lg text-gray-300 mb-8">Our investors love our platform. Hear what they have to say:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-gray-300">"This platform changed my life! The profits are amazing."</p>
            <h4 className="text-cyan-400 font-bold mt-4">- John Doe</h4>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-gray-300">"Very secure and transparent investments. Love it!"</p>
            <h4 className="text-cyan-400 font-bold mt-4">- Jane Smith</h4>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-gray-300">"Fast withdrawals and great customer service!"</p>
            <h4 className="text-cyan-400 font-bold mt-4">- Alex Johnson</h4>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
