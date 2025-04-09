const Plan = require('../models/Plan');
const Investment = require('../models/Investment');
const Wallet = require('../models/walletModel');

const investInPlan = async (req, res) => {
  const { userId, coin } = req.body;

  const plan = await Plan.findOne({ coin });
  if (!plan) return res.status(400).json({ message: "Invalid coin" });

  const wallet = await Wallet.findOne({ userId });
  if (!wallet || wallet.wallet < plan.investment)
    return res.status(400).json({ message: "Insufficient wallet balance" });

  // Deduct money
  wallet.wallet -= plan.investment;
  await wallet.save();

  // Create investment
  await Investment.create({
    userId,
    planId: plan._id,
    amount: plan.investment,
    profitPerDay: plan.dailyIncome,
    nextProfitTime: new Date(Date.now() + 24 * 60 * 60 * 1000) // ✅ back to 24 hours
  });


  return res.json({ message: "Investment successful!" });
};

const getUserInvestments = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const investments = await Investment.find({ userId }).populate('planId');
  
      // Extract coin names
      const investedCoins = investments.map(inv => inv.planId.coin);
  
      res.json({ investedCoins });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching user investments" });
    }
  };

module.exports = { investInPlan, getUserInvestments };
