const Wallet = require('../models/walletModel.js');

const getUserWallet = async (req, res) => {
  try {
    const { userId } = req.query;

    const wallet = await Wallet.findOne({ userId });

    if (!wallet) {
      // Optional: create wallet if not exists (or return null)
      return res.status(404).json({ message: 'Wallet not found' });
    }

    res.status(200).json({
      userId: wallet.userId,
      balance: wallet.wallet,
      lastRecharge: wallet.lastRecharge,
      lastWithdraw: wallet.lastWithdraw,
      lastWithdrawPaid: wallet.lastWithdrawPaid,
      updatedAt: wallet.updatedAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching wallet', error });
  }
};

module.exports = {
    getUserWallet
  };
  