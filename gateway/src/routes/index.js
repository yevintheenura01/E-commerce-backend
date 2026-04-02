const express = require("express");
const orderServiceRoutes = require("./orderServiceRoutes");

const router = express.Router();

// Service routes
router.use("/order-service", orderServiceRoutes);

// Health check
router.get("/health", (req, res) => {
  res.status(200).json({
    gateway: "api-gateway",
    status: "ok",
    services: {
      orderService: "http://localhost:4003",
      authService: "http://localhost:4001",
      productService: "http://localhost:4004",
      paymentService: "http://localhost:4002",
    },
  });
});

module.exports = router;
