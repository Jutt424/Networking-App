const Recharge = require('../models/rechargeModal.js');
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
  
        const recharges = await recharge.find(filter).populate('userId', 'name email').sort({ createdAt: -1 });
        res.status(200).json({ message: 'Recharges fetched successfully', recharges });
  
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
  
        const recharge = await recharge.findByIdAndUpdate(id, { status }, { new: true });
  
        if (!recharge) {
            return res.status(404).json({ message: 'Recharge not found' });
        }
  
        res.status(200).json({ message: `Recharge ${status} successfully`, recharge });
  
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating recharge status', error });
    }
  };

  module.exports = {
    recharge,
    getRecharges,
    updateRechargeStatus,
  };
  