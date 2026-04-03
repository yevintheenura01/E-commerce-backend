# Product Service (MVC)

A Node.js product service built with Express and MongoDB using MVC architecture.

## Tech Stack
- Express.js
- MongoDB (Mongoose)
- Node.js

## Project Structure
- `models/` - Database models and DB interactions
- `controllers/` - Request handlers and business logic
- `routes/` - API endpoints
- `config/` - Database configuration

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm run dev
   ```

## Environment Variables
Create a `.env` file with:
```env
PORT=5000
MONGODB_URI=mongodb+srv://productdb:productdb@cluster0.8mrw83t.mongodb.net/?appName=Cluster0
```

## API Endpoints
Base URL: `http://localhost:5000/api/products`

1. Add product
   - `POST /`
   - Body:
   ```json
   {
     "name": "Laptop",
     "price": 1200,
     "description": "16GB RAM, 512GB SSD",
     "category": "Electronics",
     "stock": 10
   }
   ```

2. Get all products
   - `GET /`

3. Get product by ID
   - `GET /:id`

4. Update product
   - `PUT /:id`

5. Delete product
   - `DELETE /:id`
