const express = require('express');
const { registerUser, loginUser, getReferralCode, getMe, getAllUsers, getTotalWalletBalance, forgotPassword, verifyOtp, resetPassword, getReferredUsers } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.post('/forgotPassword',forgotPassword);
router.post('/verifyOtp', verifyOtp);
router.post('/resetPassword', resetPassword);
router.get('/referralCode', getReferralCode);
router.get('/allUsers', protect, getAllUsers);
router.get('/totalWalletBalance', protect, getTotalWalletBalance);
router.get('/getReferredUsers/:userId', protect, getReferredUsers);
module.exports = router;