const Cart = require('../models/Cart'); 
 
function calculateSubtotal(items) { 
  return items.reduce((sum, item) => sum + (item.quantity * item.price), 0); 
} 
 
function normalizeCart(cart) { 
  cart.subtotal = calculateSubtotal(cart.items); 
  return cart; 
} 
 
function validateCartItem(item) { 
  if (!item) { 
    return false; 
  } 
 
  if (!item.productId || !item.name) { 
    return false; 
  } 
 
  if (!Number.isFinite(Number(item.quantity))) { 
    return false; 
  } 
 
  if (Number(item.quantity) <= 0) { 
    return false; 
  } 
 
  if (!Number.isFinite(Number(item.price))) { 
    return false; 
  } 
 
  if (Number(item.price) < 0) { 
    return false; 
  } 
 
  return true; 
} 
 
async function getOrCreateCart(userId) { 
  let cart = await Cart.findOne({ userId }); 
 
  if (!cart) { 
    cart = await Cart.create({ userId, items: [], subtotal: 0 }); 
  } 
 
  return cart; 
} 
 
async function getCartByUserId(userId) { 
  return getOrCreateCart(userId); 
}
 
async function addItemToCart(userId, payload) { 
  if (!validateCartItem(payload)) { 
    throw new Error('productId, name, quantity and price are required'); 
  } 
 
  const cart = await getOrCreateCart(userId); 
  const existingItem = cart.items.find((item) => item.productId === payload.productId); 
 
  if (existingItem) { 
    existingItem.quantity += Number(payload.quantity); 
    existingItem.price = Number(payload.price); 
    existingItem.name = payload.name; 
  } else { 
    cart.items.push({ 
      productId: payload.productId, 
      name: payload.name, 
      quantity: Number(payload.quantity), 
      price: Number(payload.price) 
    }); 
  } 
 
  normalizeCart(cart); 
  await cart.save(); 
  return cart; 
} 
 
async function updateCartItem(userId, productId, quantity) { 
  if (!Number.isFinite(Number(quantity))) { 
    throw new Error('quantity must be a number greater than or equal to 0'); 
  } 
 
  if (Number(quantity) < 0) { 
    throw new Error('quantity must be a number greater than or equal to 0'); 
  } 
 
  const cart = await getOrCreateCart(userId); 
  const item = cart.items.find((entry) => entry.productId === productId); 
 
  if (!item) { 
    return null; 
  } 
 
  if (Number(quantity) === 0) { 
    cart.items = cart.items.filter((entry) => entry.productId !== productId); 
  } else { 
    item.quantity = Number(quantity); 
  } 
 
  normalizeCart(cart); 
  await cart.save(); 
  return cart; 
} 
 
async function removeCartItem(userId, productId) { 
  const cart = await getOrCreateCart(userId); 
  const originalLength = cart.items.length; 
 
  cart.items = cart.items.filter((entry) => entry.productId !== productId); 
 
  if (cart.items.length === originalLength) { 
    return null; 
  } 
 
  normalizeCart(cart); 
  await cart.save(); 
  return cart; 
} 
 
async function clearCart(userId) { 
  const cart = await getOrCreateCart(userId); 
  cart.items = []; 
  cart.subtotal = 0; 
  await cart.save(); 
  return cart; 
} 
 
module.exports = { 
  addItemToCart, 
  clearCart, 
  getCartByUserId, 
  removeCartItem, 
  updateCartItem 
};
