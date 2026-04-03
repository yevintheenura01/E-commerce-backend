const VALID_METHODS = ['credit_card', 'debit_card', 'paypal', 'bank_transfer'];
const VALID_STATUSES = ['pending', 'completed', 'failed', 'refunded'];

const validateCreatePayment = (req, res, next) => {
  const { orderId, customerId, amount, currency, method } = req.body;

  if (!orderId || !customerId || !amount || !currency || !method) {
    return res.status(400).json({
      message: 'Missing required fields: orderId, customerId, amount, currency, method',
    });
  }

  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ message: 'Amount must be a positive number' });
  }

  if (!VALID_METHODS.includes(method)) {
    return res.status(400).json({
      message: `Invalid method. Must be one of: ${VALID_METHODS.join(', ')}`,
    });
  }

  next();
};

const validateUpdateStatus = (req, res, next) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({
      message: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`,
    });
  }

  next();
};

module.exports = { validateCreatePayment, validateUpdateStatus };
