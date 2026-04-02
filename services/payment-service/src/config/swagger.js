const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Payment Service API",
      version: "1.0.0",
      description:
        "E-commerce Payment Service - Handles payment processing and transactions",
      contact: {
        name: "E-commerce Team",
      },
    },
    servers: [
      {
        url: "http://localhost:4002",
        description: "Development server",
      },
      {
        url: "http://api.example.com",
        description: "Production server",
      },
    ],
    components: {
      schemas: {
        Payment: {
          type: "object",
          properties: {
            _id: { type: "string" },
            orderId: { type: "string" },
            userId: { type: "string" },
            amount: { type: "number" },
            status: {
              type: "string",
              enum: ["pending", "completed", "failed"],
            },
            method: {
              type: "string",
              enum: ["credit_card", "debit_card", "paypal"],
            },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: { type: "string" },
            error: { type: "string" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJsdoc(options);
module.exports = specs;
