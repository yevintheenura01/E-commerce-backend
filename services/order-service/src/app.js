const express = require('express');
const cartRoutes = require('./routes/cartRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const orderRoutes = require('./routes/orderRoutes');
const notFound = require('./middlewares/notFound');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ service: 'order-service', status: 'ok' });
});

app.use('/cart', cartRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/orders', orderRoutes);
app.use(notFound);

module.exports = app;
