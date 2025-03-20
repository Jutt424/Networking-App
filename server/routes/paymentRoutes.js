const express = require('express');
const { withdraw, updatePaymentStatus, getPayments } = require('../controllers/paymentController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      const uploadPath = 'uploads/';
      if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.post('/withdraw', protect, upload.single('screenshot'), withdraw);
router.put('/update-status/:paymentId', protect, updatePaymentStatus);
router.get('/get-payments', protect, getPayments);

module.exports = router;