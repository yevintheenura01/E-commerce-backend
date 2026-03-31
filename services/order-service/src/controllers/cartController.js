const { 
  addItemToCart, 
  getCartByUserId, 
  removeCartItem, 
  updateCartItem 
} = require('../services/cartService'); 
 
function isMissingUserId(userId) { 
  return !userId || !String(userId).trim(); 
} 
 
async function getCartHandler(req, res) { 
  try { 
    if (isMissingUserId(req.params.userId)) { 
      return res.status(400).json({ message: 'userId is required' }); 
    } 
 
    const cart = await getCartByUserId(req.params.userId); 
    return res.status(200).json(cart); 
  } catch (error) { 
    return res.status(500).json({ message: error.message }); 
  } 
} 
 
async function addCartItemHandler(req, res) { 
  try { 
    if (isMissingUserId(req.params.userId)) { 
      return res.status(400).json({ message: 'userId is required' }); 
    } 
 
    const cart = await addItemToCart(req.params.userId, req.body); 
    return res.status(200).json(cart); 
  } catch (error) { 
    return res.status(400).json({ message: error.message }); 
  } 
} 
 
async function updateCartItemHandler(req, res) { 
  try { 
    if (isMissingUserId(req.params.userId)) { 
      return res.status(400).json({ message: 'userId is required' }); 
    } 
 
    const cart = await updateCartItem(req.params.userId, req.params.productId, req.body.quantity); 
 
    if (!cart) { 
      return res.status(404).json({ message: 'Cart item not found' }); 
    } 
 
    return res.status(200).json(cart); 
  } catch (error) { 
    return res.status(400).json({ message: error.message }); 
  } 
} 
 
async function removeCartItemHandler(req, res) { 
  try { 
    if (isMissingUserId(req.params.userId)) { 
      return res.status(400).json({ message: 'userId is required' }); 
    } 
 
    const cart = await removeCartItem(req.params.userId, req.params.productId); 
 
    if (!cart) { 
      return res.status(404).json({ message: 'Cart item not found' }); 
    } 
 
    return res.status(200).json(cart); 
  } catch (error) { 
    return res.status(500).json({ message: error.message }); 
  } 
} 
 
module.exports = { 
  addCartItemHandler, 
  getCartHandler, 
  removeCartItemHandler, 
  updateCartItemHandler 
};
