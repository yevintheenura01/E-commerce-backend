const express = require("express");
const { proxyRequest } = require("../proxy/proxyHandler");
const services = require("../config/serviceConfig");

const router = express.Router();

/**
 * Route all /order-service/* requests to the order service
 */
router.all("/*", (req, res) => {
  proxyRequest(req, res, services.orderService.url, "/order-service");
});

module.exports = router;
