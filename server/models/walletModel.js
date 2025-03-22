const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  wallet: {
    type: Number,
    default: 0,
  },
  lastWithdraw: { type: Date, default: new Date() },
  lastRecharge: { type: Date, default: new Date() },
  lastWithdrawPaid: { type: Boolean, default: false },

}, { timestamps: true });

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;

