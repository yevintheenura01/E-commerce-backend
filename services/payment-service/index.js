require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const paymentRoutes = require('./src/routes/payment.routes');
const setupDocs = require('./src/docs/swagger');

const app = express();

// ─── Connect to MongoDB ───────────────────────────────────────────────────────
connectDB();

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json());

// ─── Swagger Docs ─────────────────────────────────────────────────────────────
setupDocs(app);

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/payments', paymentRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ service: 'payment-service', status: 'UP', port: 3001 });
});

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.path} not found` });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Payment Service running on http://localhost:${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});

module.exports = app;
