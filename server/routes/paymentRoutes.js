const express = require('express');
const { withdraw, updatePaymentStatus, getPayments, getAllPayments } = require('../controllers/paymentController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.post('/withdraw', protect, withdraw);
router.put('/update-status/:paymentId', protect, updatePaymentStatus);
router.get('/get-payments', protect, getPayments);
router.get('/get-all-payments', protect, getAllPayments);

module.exports = router;