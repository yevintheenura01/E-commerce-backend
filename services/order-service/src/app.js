const express = require('express');  
const orderRoutes = require('./routes/orderRoutes');  
  
const app = express();  
  
app.use(express.json());  
  
app.get('/health', (req, res) => {  
  res.status(200).json({ service: 'order-service', status: 'ok' });  
});  
  
app.use('/orders', orderRoutes);  
  
module.exports = app; 
