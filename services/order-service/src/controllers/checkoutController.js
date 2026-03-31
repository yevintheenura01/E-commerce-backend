const { checkout } = require('../services/checkoutService'); 
 
async function checkoutHandler(req, res) { 
  try { 
    const { userId, shippingAddress } = req.body; 
 
    if (!userId || !shippingAddress) { 
      return res.status(400).json({ message: 'userId and shippingAddress are required' }); 
    } 
 
    const result = await checkout(userId, shippingAddress); 
    return res.status(201).json(result); 
  } catch (error) { 
    let statusCode = 500; 
 
    if (error.message === 'Cart is empty') { 
      statusCode = 400; 
    } 
 
    if (error.message === 'shippingAddress is required') { 
      statusCode = 400; 
    } 
 
    return res.status(statusCode).json({ message: error.message }); 
  } 
} 
 
module.exports = { 
  checkoutHandler 
};
