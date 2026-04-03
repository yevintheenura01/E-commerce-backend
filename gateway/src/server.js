require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
  console.log(`Available routes:`);
  console.log(`  - GET  http://localhost:${PORT}/health`);
  console.log(`  - GET  http://localhost:${PORT}/order-service/orders`);
  console.log(`  - POST http://localhost:${PORT}/order-service/orders`);
  console.log(`  - GET  http://localhost:${PORT}/order-service/orders/{id}`);
  console.log(
    `  - PATCH http://localhost:${PORT}/order-service/orders/{id}/status`,
  );
  console.log(`  - DELETE http://localhost:${PORT}/order-service/orders/{id}`);
});
