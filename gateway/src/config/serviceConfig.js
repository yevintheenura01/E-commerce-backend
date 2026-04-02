// Service URLs - configure your microservices here
const services = {
  orderService: {
    url: process.env.ORDER_SERVICE_URL || "http://localhost:4003",
    routes: ["/orders", "/health"],
  },
  authService: {
    url: process.env.AUTH_SERVICE_URL || "http://localhost:4001",
    routes: ["/auth", "/users"],
  },
  productService: {
    url: process.env.PRODUCT_SERVICE_URL || "http://localhost:4004",
    routes: ["/products"],
  },
  paymentService: {
    url: process.env.PAYMENT_SERVICE_URL || "http://localhost:4002",
    routes: ["/payments"],
  },
};

module.exports = services;
