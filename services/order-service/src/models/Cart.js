const mongoose = require('mongoose'); 
 
const cartItemSchema = new mongoose.Schema({ 
  productId: { type: String, required: true }, 
  name: { type: String, required: true }, 
  quantity: { type: Number, required: true, min: 1 }, 
  price: { type: Number, required: true, min: 0 } 
}, { _id: false }); 
 
const cartSchema = new mongoose.Schema({ 
  userId: { type: String, required: true, index: true }, 
  items: { 
    type: [cartItemSchema], 
    default: [] 
  }, 
  subtotal: { type: Number, required: true, default: 0, min: 0 } 
}, { timestamps: true }); 
 
cartSchema.index({ userId: 1 }, { unique: true }); 
 
module.exports = mongoose.model('Cart', cartSchema);
