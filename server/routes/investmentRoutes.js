const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { investInPlan, getUserInvestments } = require('../controllers/investmentController');


router.post('/invest', protect, investInPlan);
router.get('/getUserInvestments/:userId', protect, getUserInvestments);

module.exports = router;