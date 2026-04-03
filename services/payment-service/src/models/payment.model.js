const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: [true, 'Order ID is required'],
    },
    customerId: {
      type: String,
      required: [true, 'Customer ID is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0.01, 'Amount must be greater than 0'],
    },
    currency: {
      type: String,
      required: [true, 'Currency is required'],
      uppercase: true,
    },
    method: {
      type: String,
      required: [true, 'Payment method is required'],
      enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer'],
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
