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
    nextProfitTime: new Date(Date.now() + 24 * 60 * 60 * 1000) // ✅ 1 minute

  });


  return res.json({ message: "Investment successful!" });
};

const getUserInvestments = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const investments = await Investment.find({ userId }).populate('planId');
  
      // Extract coin names
      const investedCoins = investments
      .filter(inv => inv.planId)
      .map(inv => inv.planId.coin);
  
      res.json({ investedCoins });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching user investments" });
    }
  };
  const getUserInvestmentProfits = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const investments = await Investment.find({ userId }).populate('planId');
  
      const investmentDetails = investments.map((inv) => {
        if (!inv.planId) return null;
  
        const now = new Date();
        const investedOn = new Date(inv.createdAt);
        const timeDiff = now - investedOn;
        const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  
        const totalProfitEarned = daysPassed * inv.profitPerDay;
  
        return {
          coin: inv.planId.coin,
          investedAmount: inv.amount,
          dailyProfit: inv.profitPerDay,
          nextProfitTime: inv.nextProfitTime,
          investedOn,
          daysPassed,
          totalProfitEarned
        };
      }).filter(item => item !== null);
  
      return res.json({ investments: investmentDetails });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetching investment profits" });
    }
  };
  
module.exports = { investInPlan, getUserInvestments, getUserInvestmentProfits };
