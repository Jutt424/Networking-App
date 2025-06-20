const Payment = require('../models/Payment.js');
const Wallet = require('../models/walletModel.js');
const User    = require('../models/userModel.js');

// const withdraw = async (req, res) => {
//   try {
//     const { paymentMethod, accountNumber, bankName, amount, userId=req.user._id } = req.body;

//     if (paymentMethod === 'Bank' && !bankName) {
//       return res.status(400).json({ message: 'Bank name is required for bank payments.' });
//     }

//     const wallet = await Wallet.findOne({ userId });
//     if (!wallet) {
//       return res.status(404).json({ message: 'Wallet not found.' });
//     }

//     if (wallet.wallet < amount) {
//       return res.status(400).json({ message: 'Insufficient wallet balance.' });
//     }

//     const payment = new Payment({
//       userId: userId,
//       paymentMethod,
//       accountNumber,
//       bankName,
//       amount,
//       status: 'pending',
//     });

//     await payment.save();

//     res.status(201).json({ message: 'Payment request submitted successfully', payment });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error processing payment', error });
//   }
// };

const withdraw = async (req, res) => {
  try {
    const {
      paymentMethod,
      accountNumber,
      bankName,
      amount,
      wantFee = false,              // from UI: true agar user fee agree karta hai
      userId = req.user._id
    } = req.body;

    // bankName validation
    if (paymentMethod === 'Bank' && !bankName) {
      return res.status(400).json({ message: 'Bank name is required for bank payments.' });
    }

    // load user + wallet
    const [user, wallet] = await Promise.all([
      User.findById(userId),
      Wallet.findOne({ userId })
    ]);
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found.' });
    }

    // decide fee vs free
    const canFree = !user.freeWithdrawUsed && user.referralsCount >= 2;
    let fee = 0;
    if (!canFree) {
      // free not allowed
      if (!wantFee) {
        return res.status(400).json({
          message: `Free withdraw not available. You have ${user.referralsCount} successful referrals.`,
          referralsCount: user.referralsCount
        });
      }
      fee = 5;
    }

    // balance check including fee
    const total = amount + fee;
    if (wallet.wallet < total) {
      return res.status(400).json({ message: 'Insufficient balance (including fee).' });
    }

    // create pending payment (actual wallet deduction on admin approval)
    const payment = new Payment({
      userId,
      paymentMethod,
      accountNumber,
      bankName,
      amount,
      fee,                       // store fee for later deduction
      status: 'pending',
    });
    await payment.save();

    return res.status(201).json({
      message: `Withdrawal request submitted${fee ? ` (with $${fee} fee)` : ''}.`,
      payment
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error processing withdrawal', error });
  }
};


// const updatePaymentStatus = async (req, res) => {
//   try {
//     const { paymentId } = req.params;
//     const { status } = req.body;

//     if (!['approved', 'rejected'].includes(status)) {
//       return res.status(400).json({ message: 'Invalid status value' });
//     }

//     const payment = await Payment.findByIdAndUpdate(paymentId, { status }, { new: true });
//     if (!payment) {
//       return res.status(404).json({ message: 'Payment not found' });
//     }

//     const { amount, userId } = payment; // ✅ Yeh sahi userId hai

//     if(status === 'approved') {
//       const wallet = await Wallet.findOne({ userId });
//       if (!wallet) {
//         return res.status(404).json({ message: 'Wallet not found' });
//       }
//       wallet.wallet -= amount;
//       await wallet.save();
//     }

//     res.status(200).json({ message: `Payment ${status} successfully`, payment });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error updating payment status', error });
//   }
// };

// controllers/withdrawController.js

const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { status }    = req.body;

    if (!['approved','rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    // 1) Load and update payment
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    payment.status = status;
    await payment.save();

    if (status === 'approved') {
      // 2) Load wallet & user
      const [wallet, user] = await Promise.all([
        Wallet.findOne({ userId: payment.userId }),
        User.findById(payment.userId),
      ]);
      if (!wallet) {
        return res.status(404).json({ message: 'Wallet not found.' });
      }

      // 3) Deduct amount + fee
      const totalDeduction = payment.amount + (payment.fee || 0);
      if (wallet.wallet < totalDeduction) {
        return res.status(400).json({ message: 'Insufficient balance for final deduction.' });
      }
      wallet.wallet -= totalDeduction;
      await wallet.save();

      // 4) If it was a free withdraw (fee === 0), flip the flags
      if (!payment.fee) {
        user.freeWithdrawUsed = true;
        user.referralsCount   = 0;
        await user.save();
      }
    }

    return res.status(200).json({ message: `Payment ${status} successfully`, payment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating payment status', error });
  }
};


const getPayments = async (req, res) => {
  try {
    const { status } = req.query;
    const userId = req.user._id; // Get user ID from authentication

    let filter = { userId }; // Only fetch payments of this user
    if (status) {
      filter.status = status;
    }

    const payments = await Payment.find(filter).sort({ createdAt: -1 });

    res.status(200).json({ message: 'Payments fetched successfully', payments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching payments', error });
  }
};

const getAllPayments = async (req, res) => {
  try {

    const payments = await Payment.find().populate('userId', 'name email').sort({ createdAt: -1 });
    const total = payments.length;
    res.status(200).json({ message: "All payments fetched successfully", payments, total });
  } catch (error) {
      console.error(error);
    res.status(500).json({ message: "Error fetching payments", error });
  }
};



module.exports = {
  withdraw,
  updatePaymentStatus,
  getPayments,
  getAllPayments
};
