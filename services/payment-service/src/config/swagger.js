const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Payment Service API',
      version: '1.0.0',
      description: 'Microservice for handling payments in the E-Commerce platform',
    },
    servers: [
      { url: 'http://localhost:3001', description: 'Direct access' },
    ],
    components: {
      schemas: {
        Payment: {
          type: 'object',
          properties: {
            id:         { type: 'string' },
            orderId:    { type: 'string' },
            customerId: { type: 'string' },
            amount:     { type: 'number' },
            currency:   { type: 'string' },
            method:     { type: 'string' },
            status:     { type: 'string' },
            createdAt:  { type: 'string' },
          },
        },
        CreatePaymentRequest: {
          type: 'object',
          required: ['orderId', 'customerId', 'amount', 'currency', 'method'],
          properties: {
            orderId:    { type: 'string' },
            customerId: { type: 'string' },
            amount:     { type: 'number' },
            currency:   { type: 'string' },
            method:     { type: 'string' },
          },
        },
        UpdateStatusRequest: {
          type: 'object',
          required: ['status'],
          properties: {
            status: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.routes.js'],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;