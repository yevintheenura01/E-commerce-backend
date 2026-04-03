const PaymentService = require('../services/payment.service');

const PaymentController = {
  getAllPayments: async (req, res) => {
    try {
      const payments = await PaymentService.getAllPayments();
      res.status(200).json(payments);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
    }
  },

  getPaymentById: async (req, res) => {
    try {
      const payment = await PaymentService.getPaymentById(req.params.id);
      res.status(200).json(payment);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
    }
  },

  createPayment: async (req, res) => {
    try {
      const payment = await PaymentService.createPayment(req.body);
      res.status(201).json(payment);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
    }
  },

  updatePaymentStatus: async (req, res) => {
    try {
      const payment = await PaymentService.updatePaymentStatus(req.params.id, req.body.status);
      res.status(200).json(payment);
    } catch (err) {
      res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
    }
  },
};

module.exports = PaymentController;
