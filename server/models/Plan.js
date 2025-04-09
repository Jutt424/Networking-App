const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  coin: { type: String, required: true },
  investment: { type: Number, required: true },
  dailyIncome: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Plan', planSchema);
