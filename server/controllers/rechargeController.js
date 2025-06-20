const Recharge = require('../models/rechargeModal.js');
const Wallet = require('../models/walletModel.js');
const User = require('../models/userModel.js');
const recharge = async (req, res) => {
    try {
        const { amount } = req.body;
        const userId = req.user._id; // Get user ID from authentication
        if (!req.file) {
            return res.status(400).json({ message: 'Screenshot is required' });
        }
  
        const screenshotPath = `/uploads/${req.file.filename}`;
  
        const recharge = new Recharge({
            userId,
            amount,
            screenshot: screenshotPath,
            status: 'pending'
        });
  
        await recharge.save();
        res.status(201).json({ message: 'Recharge request submitted', recharge });
  
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error processing recharge', error });
    }
  };
  
  const getRecharges = async (req, res) => {
    try {
      const { status } = req.query;
      let filter = {};
      if (status) {
        filter.status = status;
      }
  
      const recharges = await Recharge.find(filter)
        .populate('userId', 'name email')
        .sort({ createdAt: -1 });
  
      const total = await Recharge.countDocuments(filter); // ✅ count based on filter
  
      res.status(200).json({ 
        message: 'Recharges fetched successfully', 
        totalRecharges: total, // ✅ total added here
        recharges 
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching recharges', error });
    }
  };
  
  
  const updateRechargeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
  
        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }
  
        const updatedRecharge = await Recharge.findByIdAndUpdate(id, { status }, { new: true });
        if (status === 'approved') {
          let wallet = await Wallet.findOne({ userId: updatedRecharge.userId });
        
          if (wallet) {
            // Add recharge amount
            wallet.wallet += updatedRecharge.amount;
            wallet.lastRecharge = new Date().toISOString();
          } else {
            // First-time wallet create
            wallet = new Wallet({
              userId: updatedRecharge.userId,
              wallet: updatedRecharge.amount,
              lastRecharge: new Date().toISOString(),
              lastWithdrawPaid: false,
            });
          }
        
          // 🟢 Now handle referral commission on first recharge
          const user = await User.findById(updatedRecharge.userId);
          if (user?.referredBy && !wallet.firstRechargeDone) {
            // ✅ Mark first recharge done
            wallet.firstRechargeDone = true;
        
            // ✅ Add $2 to referrer wallet
            await Wallet.updateOne(
              { userId: user.referredBy },
              { $inc: { wallet: 2 } },
              { upsert: true }
            );

            // increment referrer's referralsCount
            await User.findByIdAndUpdate(
              user.referredBy,
              { $inc: { referralsCount: 1 } }
            );
          }
        
          await wallet.save();
        }
        
        if (!updatedRecharge) {
            return res.status(404).json({ message: 'Recharge not found' });
        }
  
        res.status(200).json({ message: `Recharge ${status} successfully`, updatedRecharge });
  
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating recharge status', error });
    }
  };
  const getUserRecharges = async (req, res) => {
    try {
      const { status } = req.query;
      const userId = req.user._id;
  
      let filter = { userId };
      if (status) {
        filter.status = status;
      }
  
      const recharges = await Recharge.find(filter).sort({ createdAt: -1 });
  
      res.status(200).json({ message: 'User recharges fetched successfully', recharges });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching user recharges', error });
    }
  };
  

  module.exports = {
    recharge,
    getRecharges,
    updateRechargeStatus,
    getUserRecharges,
  };
  