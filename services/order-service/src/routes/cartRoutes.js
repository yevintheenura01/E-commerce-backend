const express = require('express');
const {
  addCartItemHandler,
  getCartHandler,
  removeCartItemHandler,
  updateCartItemHandler
} = require('../controllers/cartController');

const router = express.Router();

router.get('/:userId', getCartHandler);
router.post('/:userId/items', addCartItemHandler);
router.patch('/:userId/items/:productId', updateCartItemHandler);
router.delete('/:userId/items/:productId', removeCartItemHandler);

module.exports = router;
