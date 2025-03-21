const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  screenshot: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Recharge = mongoose.model('Recharge', paymentSchema);

module.exports = Recharge;
