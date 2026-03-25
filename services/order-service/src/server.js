require('dotenv').config();  
const app = require('./app');  
const connectDB = require('./config/db');  
  
const PORT = process.env.PORT || 4003;  
  
async function startServer() {  
  try {  
    await connectDB();  
    app.listen(PORT, () => {  
      console.log('order-service running on port ' + PORT);  
    });  
  } catch (error) {  
    console.error('order-service failed to start', error.message);  
    process.exit(1);  
  }  
}  
  
startServer(); 
