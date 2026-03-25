const express = require('express');  
const { createOrderHandler, getAllOrdersHandler, getOrderByIdHandler, updateOrderStatusHandler } = require('../controllers/orderController');  
  
const router = express.Router();  
  
router.post('/', createOrderHandler);  
router.get('/', getAllOrdersHandler);  
router.get('/:id', getOrderByIdHandler);  
router.patch('/:id/status', updateOrderStatusHandler);  
  
 
module.exports = router; 
