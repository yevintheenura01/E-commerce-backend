const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Product Service API",
      version: "1.0.0",
      description:
        "E-commerce Product Service - Manages product catalog and inventory",
      contact: {
        name: "E-commerce Team",
      },
    },
    servers: [
      {
        url: "http://localhost:4004",
        description: "Development server",
      },
      {
        url: "http://api.example.com",
        description: "Production server",
      },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
            stock: { type: "integer" },
            category: { type: "string" },
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
