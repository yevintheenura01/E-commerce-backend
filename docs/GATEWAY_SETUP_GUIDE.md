# API Gateway Setup Guide

## Overview

The API Gateway acts as a single entry point for all microservice requests. It routes requests from clients to the appropriate microservices and handles cross-cutting concerns like CORS and request logging.

## Architecture

```
Client Requests
      |
      v
API Gateway (Port 3000)
      |
      +---> /order-service/* ----> Order Service (Port 4003)
      +---> /auth/*          ----> Auth Service (Port 4001)
      +---> /products/*      ----> Product Service (Port 4004)
      +---> /payments/*      ----> Payment Service (Port 4002)
```

## Files Overview

### `package.json`

- Main dependencies:
  - **express**: Web server framework
  - **http-proxy**: HTTP proxy for forwarding requests
  - **cors**: Cross-Origin Resource Sharing
  - **dotenv**: Environment variable management

### `src/config/serviceConfig.js`

- Centralizes microservice URLs
- Allows configuration via environment variables
- Easy to update service endpoints

### `src/proxy/proxyHandler.js`

- **createProxy()**: Creates reusable proxy instances
- **proxyRequest()**: Handles request forwarding to target services
- Error handling for unavailable services
- Path prefix stripping (e.g., removes `/order-service` before proxying)

### `src/routes/orderServiceRoutes.js`

- Registers routes for order-service
- All `/order-service/*` requests go through this router
- Uses `router.all()` to handle all HTTP methods (GET, POST, PATCH, DELETE, etc.)

### `src/routes/index.js`

- Main route aggregator
- Registers all service routers
- Health check endpoint at `/health`

### `src/app.js`

- Express application setup
- Middleware configuration (CORS, JSON parsing, logging)
- Error handling

### `src/server.js`

- Server entry point
- Starts gateway on port 3000 (configurable via PORT env var)
- Logs available routes

## Installation & Setup

### 1. Install Dependencies

```bash
cd gateway
npm install
```

### 2. Configure Environment Variables

```bash
# Copy example to actual .env file
cp .env.example .env

# Or create .env with:
PORT=3000
ORDER_SERVICE_URL=http://localhost:4003
AUTH_SERVICE_URL=http://localhost:4001
PRODUCT_SERVICE_URL=http://localhost:4004
PAYMENT_SERVICE_URL=http://localhost:4002
NODE_ENV=development
```

### 3. Ensure Order Service is Running

```bash
# In another terminal
cd services/order-service
npm start
```

Order service should be running on **http://localhost:4003**

### 4. Start the Gateway

```bash
npm start
# Or for development with auto-reload:
npm run dev
```

Gateway will start on **http://localhost:3000**

## Testing the Gateway

### Health Check

```bash
curl http://localhost:3000/health
```

Response:

```json
{
  "gateway": "api-gateway",
  "status": "ok",
  "services": {
    "orderService": "http://localhost:4003",
    "authService": "http://localhost:4001",
    "productService": "http://localhost:4004",
    "paymentService": "http://localhost:4002"
  }
}
```

### Order Service via Gateway

#### Create Order

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

#### Get All Orders

```bash
curl http://localhost:3000/order-service/orders
```

#### Get Order by ID

```bash
curl http://localhost:3000/order-service/orders/{orderId}
```

#### Update Order Status

```bash
curl -X PATCH http://localhost:3000/order-service/orders/{orderId}/status \
  -H "Content-Type: application/json" \
  -d '{"status": "shipped"}'
```

#### Delete Order

```bash
curl -X DELETE http://localhost:3000/order-service/orders/{orderId}
```

## Dual Access Pattern

### Direct Access (Order Service)

```
http://localhost:4003/orders
http://localhost:4003/orders/{id}
```

### Gateway Access (Recommended for Production)

```
http://localhost:3000/order-service/orders
http://localhost:3000/order-service/orders/{id}
```

**Benefits of Gateway Access:**

- Single entry point for all services
- Load balancing ready
- Service discovery
- Centralized logging and monitoring
- Rate limiting and security policies

## How It Works

1. **Client sends request** to gateway with `/order-service` prefix

   ```
   POST http://localhost:3000/order-service/orders
   ```

2. **Gateway receives request** at `:3000/order-service/orders`

3. **Route matcher** finds `/order-service` route in `src/routes/index.js`

4. **Proxy handler** strips `/order-service` prefix and forwards to order-service

   ```
   POST http://localhost:4003/orders
   ```

5. **Order service** handles the request normally

6. **Response** is sent back through gateway to client

## Adding New Services

To proxy a new microservice through the gateway:

1. Update `src/config/serviceConfig.js` with service URL and routes
2. Create a new router file (e.g., `src/routes/productServiceRoutes.js`)
3. Register it in `src/routes/index.js`:
   ```javascript
   router.use("/product-service", productServiceRoutes);
   ```

## Troubleshooting

### Service Unavailable (503)

- Ensure the target microservice is running
- Check `ORDER_SERVICE_URL` in `.env` matches actual service address
- Check firewall/network connectivity

### Request Timeout

- Target service may be slow or unresponsive
- Check service logs for errors
- Increase timeout if needed (modify `proxyHandler.js`)

### CORS Errors

- CORS is already enabled in `src/app.js`
- If issues persist, check client headers

### Port Already in Use

- Change `PORT` in `.env` or command line:
  ```bash
  PORT=8000 npm start
  ```

## Production Considerations

- Update service URLs in `.env` to actual domain names
- Implement authentication/JWT validation in middleware
- Add rate limiting
- Implement request/response logging
- Add service health monitoring
- Consider caching strategies
