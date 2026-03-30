require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const authGatewaySwagger = require("./swagger-auth-gateway");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("API Gateway is running");
});

app.use("/auth/api-docs", swaggerUi.serve, swaggerUi.setup(authGatewaySwagger));

app.use(
  "/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path) => path.replace(/^\/auth/, ""),
  })
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});