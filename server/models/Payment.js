const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  paymentMethod: { type: String, enum: ['JazzCash', 'EasyPaisa', 'Bank'], required: true },
  accountNumber: { type: String, required: true },
  bankName: { type: String, default: null }, // Only for bank payments
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }, // Default 'pending'
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
