const Investment = require('../models/Investment');
const Wallet = require('../models/walletModel');

const distributeProfits = async () => {
  try {
    const now = new Date();

    const investments = await Investment.find({
      nextProfitTime: { $lte: now },
      isCompleted: false
    });
    console.log('The Investments ---->>>', investments.length);

    for (const investment of investments) {
      const wallet = await Wallet.findOne({ userId: investment.userId });
      investment.totalProfitDistributed += investment.profitPerDay; // ✅ add this line
      if (wallet) {
        wallet.wallet += investment.profitPerDay;
        await wallet.save();

        // investment.nextProfitTime = new Date(now.getTime() + 1 * 60 * 1000); // ✅ next run after 1 minute

        investment.nextProfitTime = new Date(now.getTime() + 24 * 60 * 60 * 1000); // ✅ next run after 24 hours


        await investment.save();

        console.log(`✅ Profit added for user ${investment.userId}`);
      } else {
        console.log(`⚠️ Wallet not found for user ${investment.userId}`);
      }
    }

    console.log("✅ Profit job completed");
  } catch (err) {
    console.error("❌ Cron Error:", err.message);
  }
};

module.exports = distributeProfits;
