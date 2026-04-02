const express = require("express");
const { checkoutHandler } = require("../controllers/checkoutController");

const router = express.Router();

/**
 * @swagger
 * /checkout:
 *   post:
 *     summary: Checkout the cart and create an order
 *     description: Process the checkout, convert cart to order, and clear the cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: User ID
 *               shippingAddress:
 *                 type: object
 *                 description: Delivery address
 *                 properties:
 *                   street:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   postalCode:
 *                     type: string
 *                   country:
 *                     type: string
 *               items:
 *                 type: array
 *                 description: Items being purchased
 *                 items:
 *                   $ref: '#/components/schemas/CartItem'
 *             required: [userId, shippingAddress, items]
 *           example:
 *             userId: "user123"
 *             shippingAddress:
 *               street: "123 Main St"
 *               city: "New York"
 *               state: "NY"
 *               postalCode: "10001"
 *               country: "USA"
 *             items:
 *               - productId: "prod1"
 *                 quantity: 2
 *                 price: 29.99
 *     responses:
 *       201:
 *         description: Checkout completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderId:
 *                   type: string
 *                 message:
 *                   type: string
 *                 order:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request - missing required fields (userId, shippingAddress, items)
 *       404:
 *         description: Cart or user not found
 *       500:
 *         description: Internal server error
 *     tags:
 *       - Checkout
 */
router.post("/", checkoutHandler);

module.exports = router;
