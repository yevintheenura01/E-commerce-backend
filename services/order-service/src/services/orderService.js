const Order = require('../models/Order');  
  
function calculateTotal(items) {  
  return items.reduce((sum, item) => sum + item.quantity * item.price, 0);  
}  
  
async function createOrder(payload) {  
  const totalAmount = calculateTotal(payload.items);  
  
  return Order.create({  
    userId: payload.userId,  
    items: payload.items,  
    shippingAddress: payload.shippingAddress,  
    totalAmount,  
    status: 'pending'  
  });  
}  
  
async function getAllOrders() {  
  return Order.find().sort({ createdAt: -1 });  
}  
  
async function getOrderById(orderId) {  
  return Order.findById(orderId);  
}  
  
async function updateOrderStatus(orderId, status) {  
  return Order.findByIdAndUpdate(  
    orderId,  
    { status },  
    { new: true, runValidators: true }  
  );  
}  
  
module.exports = {  
  createOrder,  
  getAllOrders,  
  getOrderById,  
  updateOrderStatus  
};
