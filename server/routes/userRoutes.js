const express = require('express');
const { registerUser, loginUser, getReferralCode, getMe, forgotPassword, verifyOtp, resetPassword } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.post('/forgotPassword',forgotPassword);
router.post('/verifyOtp', verifyOtp);
router.post('/resetPassword', resetPassword);
router.get('/referralCode', getReferralCode);

module.exports = router;