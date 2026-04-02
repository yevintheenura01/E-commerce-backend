const express = require("express");
const {
  addCartItemHandler,
  getCartHandler,
  removeCartItemHandler,
  updateCartItemHandler,
} = require("../controllers/cartController");

const router = express.Router();

/**
 * @swagger
 * /cart/{userId}:
 *   get:
 *     summary: Get the current cart for a user
 *     description: Retrieve the shopping cart for a specific user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Cart fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Internal server error
 *     tags:
 *       - Cart
 */
router.get("/:userId", getCartHandler);

/**
 * @swagger
 * /cart/{userId}/items:
 *   post:
 *     summary: Add an item to the cart
 *     description: Add a product to the user's shopping cart
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *               price:
 *                 type: number
 *             required: [productId, quantity, price]
 *     responses:
 *       200:
 *         description: Item added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Bad request - invalid input
 *       500:
 *         description: Internal server error
 *     tags:
 *       - Cart
 */
router.post("/:userId/items", addCartItemHandler);

/**
 * @swagger
 * /cart/{userId}/items/{productId}:
 *   patch:
 *     summary: Update a cart item quantity
 *     description: Modify the quantity of a product in the cart
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 minimum: 0
 *             required: [quantity]
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Bad request - invalid quantity
 *       404:
 *         description: Item or cart not found
 *       500:
 *         description: Internal server error
 *     tags:
 *       - Cart
 *   delete:
 *     summary: Remove a cart item
 *     description: Remove a product from the shopping cart
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Cart item removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Item or cart not found
 *       500:
 *         description: Internal server error
 *     tags:
 *       - Cart
 */
router.patch("/:userId/items/:productId", updateCartItemHandler);
router.delete("/:userId/items/:productId", removeCartItemHandler);

module.exports = router;
