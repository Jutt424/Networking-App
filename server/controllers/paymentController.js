const Payment = require('../models/Payment.js');

const withdraw = async (req, res) => {
  try {
    const { paymentMethod, accountNumber, bankName, amount, userId=req.user._id } = req.body;

    if (paymentMethod === 'Bank' && !bankName) {
      return res.status(400).json({ message: 'Bank name is required for bank payments.' });
    }

    const payment = new Payment({
      userId: userId,
      paymentMethod,
      accountNumber,
      bankName,
      amount,
      status: 'pending',
    });

    await payment.save();

    res.status(201).json({ message: 'Payment request submitted successfully', payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing payment', error });
  }
};


const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { status } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const payment = await Payment.findByIdAndUpdate(paymentId, { status }, { new: true });

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json({ message: `Payment ${status} successfully`, payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating payment status', error });
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


module.exports = {
  withdraw,
  updatePaymentStatus,
  getPayments,
};
