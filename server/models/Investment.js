const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
  amount: { type: Number, required: true },
  profitPerDay: { type: Number, required: true },
  nextProfitTime: { type: Date, required: true }, // agla profit kab milay ga
  isCompleted: { type: Boolean, default: false } // agar limited duration ka plan ho
}, { timestamps: true });

module.exports = mongoose.model('Investment', investmentSchema);
