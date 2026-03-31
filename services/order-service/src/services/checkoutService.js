const { clearCart, getCartByUserId } = require('./cartService');
const { createOrder } = require('./orderService');

async function checkout(userId, shippingAddress) {
  const cart = await getCartByUserId(userId);

  if (!shippingAddress) {
    throw new Error('shippingAddress is required');
  }

  if (!cart.items.length) {
    throw new Error('Cart is empty');
  }

  const order = await createOrder({
    userId,
    items: cart.items.map((item) => ({
      productId: item.productId,
      name: item.name,
      quantity: item.quantity,
      price: item.price
    })),
    shippingAddress
  });

  await clearCart(userId);

  return {
    message: 'Checkout completed successfully',
    order
  };
}

module.exports = {
  checkout
};
