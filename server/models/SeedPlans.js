const mongoose = require('mongoose');
const Plan = require('./Plan');

const plans = [
  { coin: "XRP", investment: 30, dailyIncome: 1.5 },
  { coin: "SUI", investment: 50, dailyIncome: 2.10 },
  { coin: "Trump", investment: 100, dailyIncome: 4.5 },
  { coin: "Pi", investment: 200, dailyIncome: 8.5 },
  { coin: "Solana", investment: 300, dailyIncome: 12.5 },
  { coin: "dot", investment: 500, dailyIncome: 20 },
  { coin: "BNB", investment: 1000, dailyIncome: 40 },
  { coin: "Doge", investment: 1800, dailyIncome: 70 },
  { coin: "TRX", investment: 5000, dailyIncome: 200 },
  { coin: "ETH", investment: 10000, dailyIncome: 380 },
  { coin: "Bitcoin", investment: 20000, dailyIncome: 720 }
];

// mongoose.connect('mongodb://localhost:27017/rg_db')
//   .then(async () => {
//     await Plan.deleteMany(); // Clear previous
//     await Plan.insertMany(plans);
//     console.log("✅ Plans inserted!");
//     process.exit();
//   })
//   .catch(err => console.log("❌ Error:", err));


mongoose.connect('mongodb+srv://lowkey_jutt:nLxJRCgvJOytMe4F@easytrade.hybbseb.mongodb.net/rg_db?retryWrites=true&w=majority&appName=EasyTrade')
  .then(async () => {
    await Plan.deleteMany(); // Clear previous
    await Plan.insertMany(plans);
    console.log("✅ Plans inserted!");
    process.exit();
  })
  .catch(err => console.log("❌ Error:", err));