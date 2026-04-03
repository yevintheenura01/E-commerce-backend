const Payment = require('../models/payment.model');

const PaymentService = {
  getAllPayments: async () => {
    return await Payment.find();
  },

  getPaymentById: async (id) => {
    const payment = await Payment.findById(id);
    if (!payment) throw { status: 404, message: 'Payment not found' };
    return payment;
  },

  createPayment: async (data) => {
    const { orderId, customerId, amount, currency, method } = data;

    if (!orderId || !customerId || !amount || !currency || !method) {
      throw { status: 400, message: 'Missing required fields: orderId, customerId, amount, currency, method' };
    }

    const payment = new Payment({ orderId, customerId, amount, currency, method });
    return await payment.save();
  },

  updatePaymentStatus: async (id, status) => {
    const validStatuses = ['pending', 'completed', 'failed', 'refunded'];

    if (!status || !validStatuses.includes(status)) {
      throw { status: 400, message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` };
    }

    const payment = await Payment.findByIdAndUpdate(
      id,
      { status },
      { new: true } // return updated document
    );

    if (!payment) throw { status: 404, message: 'Payment not found' };
    return payment;
  },
};

module.exports = PaymentService;
