const mongoose = require('mongoose');  
  
const orderItemSchema = new mongoose.Schema({  
  productId: { type: String, required: true },  
  name: { type: String, required: true },  
  quantity: { type: Number, required: true, min: 1 },  
  price: { type: Number, required: true, min: 0 }  
}, { _id: false });  
  
const orderSchema = new mongoose.Schema({  
  userId: { type: String, required: true },  
  items: {  
    type: [orderItemSchema],  
    required: true,  
    validate: [(value) => Array.isArray(value) && value.length > 0, 'At least one order item is required']  
  },  
  totalAmount: { type: Number, required: true, min: 0 },  
  status: {  
    type: String,  
    enum: ['pending', 'paid', 'shipped', 'completed', 'cancelled'],  
    default: 'pending'  
  },  
  shippingAddress: { type: String, required: true }  
}, { timestamps: true });  
  
module.exports = mongoose.model('Order', orderSchema); 
