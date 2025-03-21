const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const { forgotPassword, verifyOtp, resetPassword, getReferralCode } = require('./controllers/userController');
const paymentRoutes = require('./routes/paymentRoutes');
const rechargeRoutes = require('./routes/rechargeRoutes');
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174'], // Add your Vite dev server port
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Connect Database
connectDB();

// Routes
app.use('/api/users', userRoutes);

app.post('/api/forgotPassword', forgotPassword);
app.post('/api/verifyOtp', verifyOtp);
app.post('/api/resetPassword', resetPassword);
app.post('/api/referralCode', getReferralCode);

app.use('/api/payments', paymentRoutes);
app.use('/api/recharge', rechargeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: process.env.NODE_ENV === 'development' 
      ? err.message 
      : 'Something went wrong!' 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));