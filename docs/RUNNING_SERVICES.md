# Running the Complete E-Commerce Backend

This guide shows how to run all services together with the API Gateway.

## Prerequisites

- Node.js >= 14.x
- MongoDB running and accessible
- npm or yarn

## Service Ports

| Service         | Direct Port | Gateway Route  | URL                                 |
| --------------- | ----------- | -------------- | ----------------------------------- |
| API Gateway     | 3000        | -              | http://localhost:3000               |
| Order Service   | 4003        | /order-service | http://localhost:3000/order-service |
| Auth Service    | 4001        | /auth          | http://localhost:3000/auth          |
| Product Service | 4004        | /products      | http://localhost:3000/products      |
| Payment Service | 4002        | /payments      | http://localhost:3000/payments      |

## Quick Start (All Services)

### Option 1: Run Each in Separate Terminal

**Terminal 1: Order Service**

```bash
cd services/order-service
npm install
npm start
# Runs on http://localhost:4003
# Swagger UI: http://localhost:4003/api-docs
```

**Terminal 2: API Gateway**

```bash
cd gateway
npm install
npm start
# Runs on http://localhost:3000
# Health: http://localhost:3000/health
```

Then open in browser:

- Swagger UI (Direct): http://localhost:4003/api-docs
- Gateway Health: http://localhost:3000/health

### Option 2: Using Docker Compose (Recommended)

```bash
cd infra
docker-compose up
```

This starts all services in containers.

## Example Requests

### Via API Gateway (Recommended)

**Create Order**

```bash
curl -X POST http://localhost:3000/order-service/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "items": [
      {
        "productId": "prod1",
        "name": "Laptop",
        "quantity": 1,
        "price": 50000
      }
    ],
    "shippingAddress": "123 Main St, City, Country"
  }'
```

**Get All Orders**

```bash
curl http://localhost:3000/order-service/orders
```

**Update Order Status**

```bash
curl -X PATCH http://localhost:3000/order-service/orders/{orderId}/status \
  -H "Content-Type: application/json" \
  -d '{"status": "shipped"}'
```

### Direct Access (Development Only)

**Get Orders (Direct)**

```bash
curl http://localhost:4003/orders
```

**Swagger UI (Direct)**

```
http://localhost:4003/api-docs
```

## Service Documentation

- **Order Service**: [services/order-service/README.md](../services/order-service/README.md)
- **Swagger Setup**: [docs/SWAGGER_SETUP_GUIDE.md](./SWAGGER_SETUP_GUIDE.md)
- **Gateway Setup**: [docs/GATEWAY_SETUP_GUIDE.md](./GATEWAY_SETUP_GUIDE.md)
- **Architecture**: [docs/architecture.md](./architecture.md)

## Stopping Services

**From docker-compose:**

```bash
docker-compose down
```

**From individual terminals:**

- Press `Ctrl+C` in each terminal

## Troubleshooting

### "Cannot find module" errors

```bash
# Install dependencies in each service
npm install
```

### "Port already in use"

- Check if service is already running
- Or change port in `.env` file

### MongoDB connection errors

- Ensure MongoDB is running
- Check `DB_URI` in service `.env` files

### Gateway not proxying requests

- Ensure order-service is running at http://localhost:4003
- Check gateway `.env` has correct `ORDER_SERVICE_URL`
- Check gateway/order-service URLs match

## Next Steps

1. **Implement other services**: Auth, Product, Payment
2. **Add authentication**: JWT validation in gateway middleware
3. **Add rate limiting**: Prevent abuse
4. **Add monitoring**: Log aggregation, metrics collection
5. **Deploy**: Use Docker, Kubernetes, or cloud platforms

## Performance Tips

- Use Swagger UI for interactive API testing: http://localhost:4003/api-docs
- Monitor service health: http://localhost:3000/health
- Check service logs for errors
- Consider caching frequently accessed data

## Development Workflow

1. Make changes to service code
2. With `nodemon` running, changes auto-reload
3. Test via Swagger UI or gateway
4. Repeat

For detailed setup of each component, see individual documentation files.
