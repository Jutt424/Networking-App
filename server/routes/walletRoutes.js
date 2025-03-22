const express = require('express');
const { getUserWallet } = require('../controllers/walletController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.get('/get-wallet', protect, getUserWallet);

module.exports = router;