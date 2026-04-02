/**
 * EXAMPLE: Auth Service App Configuration with Swagger
 *
 * Replace the actual content of auth-service/src/app.js with this pattern
 * once the service is being implemented. Update route names as needed.
 */

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./config/swagger");
// Import your route files here
// const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());

// Swagger documentation endpoint
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecs, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  }),
);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ service: "auth-service", status: "ok" });
});

// Your routes here (uncomment when implementing)
// app.use('/auth', authRoutes);
// app.use('/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal server error",
    error: err.message,
  });
});

module.exports = app;
