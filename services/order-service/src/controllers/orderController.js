const { createOrder, getAllOrders, getOrderById, updateOrderStatus } = require('../services/orderService');  
  
const validStatuses = ['pending', 'paid', 'shipped', 'completed', 'cancelled'];  
  
function isValidOrderPayload(body) {  
  return body && body.userId && body.shippingAddress && Array.isArray(body.items) && body.items.length > 0;  
}  
  
async function createOrderHandler(req, res) {  
  try {  
    if (!isValidOrderPayload(req.body)) {  
      return res.status(400).json({ message: 'userId, shippingAddress and items are required' });  
    }  
  
    const order = await createOrder(req.body);  
    return res.status(201).json(order);  
  } catch (error) {  
    return res.status(500).json({ message: error.message });  
  }  
}  
  
async function getAllOrdersHandler(req, res) {  
  try {  
    const orders = await getAllOrders();  
    return res.status(200).json(orders);  
  } catch (error) {  
    return res.status(500).json({ message: error.message });  
  }  
}  
  
async function getOrderByIdHandler(req, res) {  
  try {  
    const order = await getOrderById(req.params.id);  
  
    if (!order) {  
      return res.status(404).json({ message: 'Order not found' });  
    }  
  
    return res.status(200).json(order);  
  } catch (error) {  
    return res.status(500).json({ message: error.message });  
  }  
}  
  
async function updateOrderStatusHandler(req, res) {  
  try {  
    const { status } = req.body;  
  
    if (!status || !validStatuses.includes(status)) {  
      return res.status(400).json({ message: 'A valid status is required' });  
    }  
  
    const updatedOrder = await updateOrderStatus(req.params.id, status);  
  
    if (!updatedOrder) {  
      return res.status(404).json({ message: 'Order not found' });  
    }  
  
    return res.status(200).json(updatedOrder);  
  } catch (error) {  
    return res.status(500).json({ message: error.message });  
  }  
}  
  
module.exports = {  
  createOrderHandler,  
  getAllOrdersHandler,  
  getOrderByIdHandler,  
  updateOrderStatusHandler  
}; 
