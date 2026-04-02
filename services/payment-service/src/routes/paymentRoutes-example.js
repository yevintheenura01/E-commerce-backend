/**
 * EXAMPLE: Payment Service Routes with Swagger Documentation
 */

const express = require("express");
// const paymentController = require('../controllers/paymentController');

const router = express.Router();

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Process a payment
 *     description: Create and process a new payment for an order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *               userId:
 *                 type: string
 *               amount:
 *                 type: number
 *               method:
 *                 type: string
 *                 enum: [credit_card, debit_card, paypal]
 *               cardLastFour:
 *                 type: string
 *             required: [orderId, userId, amount, method]
 *     responses:
 *       201:
 *         description: Payment processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Bad request - invalid payment data
 *       500:
 *         description: Payment processing failed
 *     tags:
 *       - Payments
 */
// router.post('/', paymentController.processPayment);

/**
 * @swagger
 * /payments/{id}:
 *   get:
 *     summary: Get payment details
 *     description: Retrieve details of a specific payment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       404:
 *         description: Payment not found
 *     tags:
 *       - Payments
 */
// router.get('/:id', paymentController.getPayment);

/**
 * @swagger
 * /payments/{id}/refund:
 *   post:
 *     summary: Refund a payment
 *     description: Process a refund for a completed payment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *               amount:
 *                 type: number
 *             required: [reason]
 *     responses:
 *       200:
 *         description: Refund processed successfully
 *       400:
 *         description: Bad request - cannot refund this payment
 *       404:
 *         description: Payment not found
 *     tags:
 *       - Payments
 */
// router.post('/:id/refund', paymentController.refundPayment);

module.exports = router;
