# Order Service 
 
This service handles the Order domain of the assignment and covers: 
 
- cart management 
- checkout 
- order creation and status updates 
 
## Endpoints 
 
- `GET /health` 
- `GET /cart/:userId` 
- `POST /cart/:userId/items` 
- `PATCH /cart/:userId/items/:productId` 
- `DELETE /cart/:userId/items/:productId` 
- `POST /checkout` 
- `GET /orders` 
- `POST /orders` 
- `GET /orders/:id` 
- `PATCH /orders/:id/status` 
 
## Notes 
 
- Each service should use its own database connection string. 
- This version keeps product details as a snapshot in cart and order records. 
- In a fuller microservice setup, checkout should also validate stock and trigger payment workflows through other services.
