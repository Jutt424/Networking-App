const express = require('express');
const { withdraw, updatePaymentStatus, getPayments,} = require('../controllers/paymentController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.post('/withdraw', protect, withdraw);
router.put('/update-status/:paymentId', protect, updatePaymentStatus);
router.get('/get-payments', protect, getPayments);

module.exports = router;