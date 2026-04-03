const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

// ─── NOTE: Do NOT add express.json() here - it breaks proxy for POST/PUT ──────

// ─── Swagger config ───────────────────────────────────────────────────────────
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Commerce API Gateway',
      version: '1.0.0',
      description: 'Single entry point for all E-Commerce microservices',
    },
    servers: [{ url: 'http://localhost:5000', description: 'API Gateway' }],
  },
  apis: ['./index.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ─── Logging ──────────────────────────────────────────────────────────────────
app.use((req, res, next) => {
  console.log(`[Gateway] ${req.method} ${req.path}`);
  next();
});

// ─── Payment Service Proxy ────────────────────────────────────────────────────

/**
 * @swagger
 * /api/payments:
 *   get:
 *     summary: Get all payments (via gateway)
 *     tags: [Payment Service]
 *     responses:
 *       200:
 *         description: List of payments
 *   post:
 *     summary: Create a payment (via gateway)
 *     tags: [Payment Service]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: order-001
 *               customerId:
 *                 type: string
 *                 example: cust-001
 *               amount:
 *                 type: number
 *                 example: 250.00
 *               currency:
 *                 type: string
 *                 example: USD
 *               method:
 *                 type: string
 *                 enum: [credit_card, debit_card, paypal, bank_transfer]
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       400:
 *         description: Missing or invalid fields
 *
 * /api/payments/{id}:
 *   get:
 *     summary: Get payment by ID (via gateway)
 *     tags: [Payment Service]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment found
 *       404:
 *         description: Payment not found
 *
 * /api/payments/{id}/status:
 *   put:
 *     summary: Update payment status (via gateway)
 *     tags: [Payment Service]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, completed, failed, refunded]
 *     responses:
 *       200:
 *         description: Payment status updated
 *       404:
 *         description: Payment not found
 */
app.use('/api/payments', createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true,
  pathRewrite: { '^/api/payments': '/payments' },
  selfHandleResponse: false,
}));

// ─── Health Check ─────────────────────────────────────────────────────────────
// express.json() only for non-proxy routes
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    service: 'api-gateway',
    status: 'UP',
    port: 5000,
    services: {
      payment: 'http://localhost:3001',
    }
  });
});

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.path} not found in gateway` });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
  console.log(`Gateway Swagger docs at http://localhost:${PORT}/api-docs`);
  console.log(`\nRegistered services:`);
  console.log(`  /api/payments -> http://localhost:3001/payments`);
});
