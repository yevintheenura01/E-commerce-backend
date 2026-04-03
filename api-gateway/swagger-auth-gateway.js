const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth Service API via API Gateway",
      version: "1.0.0",
      description: "Authentication microservice accessed through the API Gateway",
    },
    servers: [
      {
        url: "http://localhost:4000/auth",
        description: "Auth Service via API Gateway",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        RegisterRequest: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
            role: { type: "string", example: "customer" },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string" },
            password: { type: "string" },
          },
        },
        UpdateMeRequest: {
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
          },
        },
      },
    },
    paths: {
      "/api/auth/register": {
        post: {
          tags: ["Auth via Gateway"],
          summary: "Register a new user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/RegisterRequest",
                },
              },
            },
          },
          responses: {
            201: {
              description: "User registered successfully",
            },
          },
        },
      },
      "/api/auth/login": {
        post: {
          tags: ["Auth via Gateway"],
          summary: "Login user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginRequest",
                },
              },
            },
          },
          responses: {
            200: {
              description: "Login successful",
            },
          },
        },
      },
      "/api/auth/me": {
        get: {
          tags: ["Auth via Gateway"],
          summary: "Get current logged in user",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Current user details",
            },
          },
        },
        put: {
          tags: ["Auth via Gateway"],
          summary: "Update current logged in user",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: false,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UpdateMeRequest",
                },
              },
            },
          },
          responses: {
            200: {
              description: "User updated successfully",
            },
          },
        },
        delete: {
          tags: ["Auth via Gateway"],
          summary: "Delete current logged in user",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "User account deleted successfully",
            },
          },
        },
      },
      "/api/auth/validate": {
        get: {
          tags: ["Auth via Gateway"],
          summary: "Validate JWT token",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Token is valid",
            },
          },
        },
      },
      "/api/auth/users": {
        get: {
          tags: ["Auth via Gateway"],
          summary: "Get all users (admin only)",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "List of users",
            },
          },
        },
      },
    },
  },
  apis: [],
};

module.exports = swaggerJsdoc(options);