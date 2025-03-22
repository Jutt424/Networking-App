const express = require('express');
const { recharge, getRecharges } = require('../controllers/rechargeController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const fs = require('fs');

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

router.post('/', protect, upload.single('screenshot'), recharge);
router.get('/get-recharges', protect, getRecharges);

module.exports = router;