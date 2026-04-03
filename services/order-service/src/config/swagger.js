const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Order Service API",
      version: "1.0.0",
      description:
        "E-commerce Order Service - Manages orders (Create, Read, Update, Delete)",
      contact: {
        name: "E-commerce Team",
      },
    },
    servers: [
      {
        url: "http://localhost:4003",
        description: "Development server",
      },
      {
        url: "http://api.example.com",
        description: "Production server",
      },
    ],
    components: {
      schemas: {
        OrderItem: {
          type: "object",
          properties: {
            productId: { type: "string" },
            name: { type: "string" },
            quantity: { type: "integer", minimum: 1 },
            price: { type: "number", minimum: 0 },
          },
          required: ["productId", "name", "quantity", "price"],
        },
        Order: {
          type: "object",
          properties: {
            _id: { type: "string" },
            userId: { type: "string" },
            items: {
              type: "array",
              items: { $ref: "#/components/schemas/OrderItem" },
            },
            shippingAddress: { type: "string" },
            totalAmount: { type: "number" },
            status: {
              type: "string",
              enum: ["pending", "paid", "shipped", "completed", "cancelled"],
            },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
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
  apis: ["./src/routes/orderRoutes.js"],
};

const specs = swaggerJsdoc(options);
module.exports = specs;
