const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Auth Service API",
      version: "1.0.0",
      description:
        "E-commerce Authentication Service - Handles user authentication and authorization",
      contact: {
        name: "E-commerce Team",
      },
    },
    servers: [
      {
        url: "http://localhost:4001",
        description: "Development server",
      },
      {
        url: "http://api.example.com",
        description: "Production server",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: { type: "string" },
            email: { type: "string", format: "email" },
            username: { type: "string" },
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
