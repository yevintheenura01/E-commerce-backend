# System Architecture

Gateway routes:
- /api/auth/* > auth-service
- /api/products/* > product-service
- /api/orders/* > order-service
- /api/payments/* > payment-service

Databases:
- auth-db
- product-db
- order-db
- payment-db

Each service should keep this structure:
service-name/
  package.json
  .env.example
  openapi.yaml
  README.md
  src/
    config/
    controllers/
    middlewares/
    models/
    routes/
    services/
    docs/
