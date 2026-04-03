const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../config/swagger');

const setupDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('Swagger docs available at http://localhost:3001/api-docs');
};

module.exports = setupDocs;
