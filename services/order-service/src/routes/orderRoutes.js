const express = require("express");
const {
  createOrderHandler,
  getAllOrdersHandler,
  getOrderByIdHandler,
  updateOrderStatusHandler,
  deleteOrderHandler,
} = require("../controllers/orderController");

const router = express.Router();

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     description: Create a new order with items and shipping address
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
 *               items:
 *                 type: array
 *                 description: Order items
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *                     price:
 *                       type: number
 *                     name:
 *                       type: string
 *               shippingAddress:
 *                 type: string
 *                 description: Delivery address
 *             required: [userId, items, shippingAddress]
 *           example:
 *             userId: "ee"
 *             items:
 *               - productId: "rt"
 *                 quantity: 1
 *                 price: 333
 *                 name: "Product Name"
 *             shippingAddress: "123 Main St, New York, NY 10001"
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request - missing required fields
 *       500:
 *         description: Internal server error
 *     tags:
 *       - Order
 *   get:
 *     summary: Get all orders with optional filters
 *     description: List all orders or filter by status/userId
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, confirmed, shipped, delivered]
 *         description: Filter by order status
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter by user ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *       500:
 *         description: Internal server error
 *     tags:
 *       - Order
 */
router.post("/", createOrderHandler);
router.get("/", getAllOrdersHandler);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     description: Retrieve a specific order by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 *     tags:
 *       - Order
 *   patch:
 *     summary: Update order status
 *     description: Update the status of an existing order
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, paid, shipped, completed, cancelled]
 *             required: [status]
 *           example:
 *             status: "shipped"
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request - invalid status
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 *     tags:
 *       - Order
 *   delete:
 *     summary: Delete an order
 *     description: Delete a specific order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 order:
 *                   $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 *     tags:
 *       - Order
 */
router.get("/:id", getOrderByIdHandler);
router.patch("/:id/status", updateOrderStatusHandler);
router.delete("/:id", deleteOrderHandler);

module.exports = router;
