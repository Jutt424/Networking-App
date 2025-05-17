const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const sendEmail = require("../utils/sendEmail");
const Wallet = require('../models/walletModel');
require("dotenv").config()
// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, referredBy } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please add all fields' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      referredBy: referredBy || null,
    });

    await Wallet.create({ userId: user._id });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        referralCode: user.referralCode,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



const getReferralCode = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(401).json({ message: "Not authorized, user not found in request" });
    }

    console.log("User ID from Token:", req.body.email);

    const user = await User.findOne({ email: req.body.email });
    console.log("User Found in DB:", user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ referralCode: user.referralCode });
  } catch (error) {
    console.error("Error in getReferralCode:", error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};



// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);
    user.otp = otp;
    await user.save();

    const message = `Your OTP for password reset is: ${otp}`;
    await sendEmail(user.email, "Password Reset OTP", message);

    res.status(200).json({ message: "OTP sent to your email." });

  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const verifyOtp = async (req, res) => {
  try {
      const { email, otp } = req.body;

      const user = await User.findOne({ email }).lean();
      
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      if (user.otp !== otp) {
          return res.status(400).json({ message: "Invalid OTP" });
      }

    
      user.otp = null;
      const userUpdated = {...user};
      delete userUpdated._id;
      await User.findOneAndUpdate({_id: user._id}, {...userUpdated});

      res.status(200).json({ message: "OTP verified successfully", user: user });
  } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ message: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    // Validate input
    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update the user's password
    user.password = newPassword;
    user.otp = null; // Clear OTP
    // user.otpExpires = null; // Clear OTP expiration
    await user.save();

    res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ message: "Server error" });
  }
};


const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    const total = await User.countDocuments();

    res.status(200).json({
      totalUsers: total,
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};



const getTotalWalletBalance = async (req, res) => {
  try {
    const result = await Wallet.aggregate([
      {
        $group: {
          _id: null,
          totalBalance: { $sum: "$wallet" }
        }
      }
    ]);

    const totalBalance = result[0]?.totalBalance || 0;

    res.status(200).json({ totalWalletBalance: totalBalance });
  } catch (error) {
    console.error("Error calculating total wallet balance:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


module.exports = {
  registerUser,
  loginUser,
  getMe,
  forgotPassword,
  verifyOtp,
  resetPassword,
  getReferralCode,
  getAllUsers,
  getTotalWalletBalance
};