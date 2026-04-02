# Swagger/OpenAPI Setup Guide

## Overview

This document provides setup instructions for integrating Swagger (OpenAPI) documentation into your microservices.

## What Was Done for Order Service

### 1. **Packages Installed**

```bash
npm install swagger-ui-express swagger-jsdoc
```

### 2. **Configuration Files Created**

- `src/config/swagger.js` - Central Swagger configuration using swagger-jsdoc

### 3. **Integration into Express App**

The app.js was updated to:

- Import swagger-ui-express and the swagger config
- Register Swagger UI middleware at `/api-docs` endpoint
- This creates an interactive API documentation interface

### 4. **JSDoc Comments Added**

Route files now include Swagger documentation comments that:

- Describe each endpoint
- Document request/response schemas
- Include parameter definitions
- Show error responses
- Organize endpoints with tags

## Setup Instructions for Other Services

### Step 1: Install Dependencies

If not already installed, run in each service directory:

```bash
npm install swagger-ui-express swagger-jsdoc
```

### Step 2: Copy Swagger Configuration

Swagger config files are already created for each service in `src/config/swagger.js`

### Step 3: Update App.js

Add the following to your service's app.js:

```javascript
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./config/swagger");

const app = express();
app.use(express.json());

// Swagger documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecs, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  }),
);

// Your routes here
app.use("/health", healthRoutes);
app.use("/auth", authRoutes); // or whatever your routes are

module.exports = app;
```

### Step 4: Add JSDoc Comments to Routes

For each route file, add Swagger documentation above the route definitions:

```javascript
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate user and return token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required: [email, password]
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 *     tags:
 *       - Authentication
 */
router.post("/login", loginHandler);
```

### Step 5: Update Swagger Config for Your Service

Edit `src/config/swagger.js` to:

- Update service title and description
- Add your service's routes to the `apis` array
- Add custom schema components specific to your service
- Configure correct port number in servers section

## Accessing Your Documentation

Once configured, visit:

- **Order Service**: http://localhost:4003/api-docs
- **Auth Service**: http://localhost:4001/api-docs
- **Payment Service**: http://localhost:4002/api-docs
- **Product Service**: http://localhost:4004/api-docs

## JSDoc Comment Structure

### Basic Endpoint Example

```javascript
/**
 * @swagger
 * /path:
 *   get:
 *     summary: Brief description
 *     description: Longer description
 *     parameters:
 *       - in: query
 *         name: paramName
 *         schema:
 *           type: string
 *         description: Parameter description
 *     responses:
 *       200:
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SchemaName'
 *       400:
 *         description: Bad request
 *     tags:
 *       - TagName
 */
```

### Parameters

- `in`: Where parameter appears (path, query, header, cookie)
- `name`: Parameter name
- `required`: true/false
- `schema`: Define the data type

### Request Body

```javascript
requestBody:
  required: true
  content:
    application/json:
      schema:
        type: object
        properties:
          fieldName:
            type: string
        required: [fieldName]
```

### Response Schemas

Reference reusable schemas from components section:

```javascript
schema: $ref: "#/components/schemas/Order";
```

## Common HTTP Methods in Swagger

| Method | Purpose             | Tag         |
| ------ | ------------------- | ----------- |
| GET    | Retrieve data       | query       |
| POST   | Create new resource | requestBody |
| PATCH  | Partial update      | requestBody |
| DELETE | Remove resource     | N/A         |
| PUT    | Full replacement    | requestBody |

## Response Status Codes

| Code | Meaning                              |
| ---- | ------------------------------------ |
| 200  | OK - Successful GET/PATCH            |
| 201  | Created - Successful POST            |
| 400  | Bad Request - Invalid input          |
| 401  | Unauthorized - Missing/invalid token |
| 404  | Not Found - Resource doesn't exist   |
| 500  | Internal Server Error                |

## Testing in Swagger UI

1. Open the documentation page
2. Expand an endpoint
3. Click "Try it out"
4. Fill in parameters/request body
5. Click "Execute"
6. View the response

## Tips for Better Documentation

1. **Use Descriptive Summaries**: Keep summaries under 120 characters
2. **Provide Examples**: Include example values in requests
3. **Document Error Responses**: Don't just document the happy path
4. **Use Tags**: Group related endpoints with the same tag
5. **Add Schema References**: Use reusable schema definitions
6. **Keep It Updated**: Update docs when API changes

## Example Service Template

Here's a basic structure for a new service:

```
service-name/
├── src/
│   ├── app.js              (Add Swagger UI here)
│   ├── server.js           (Entry point)
│   ├── config/
│   │   ├── db.js
│   │   └── swagger.js      (Already created)
│   ├── routes/             (Add JSDoc comments here)
│   │   └── serviceRoutes.js
│   ├── controllers/        (Optional: JSDoc for functions)
│   └── models/
├── package.json
└── README.md
```

## Resources

- [OpenAPI 3.0 Specification](https://spec.openapis.org/oas/v3.0.3)
- [swagger-jsdoc Documentation](https://github.com/Surnet/swagger-jsdoc)
- [Swagger UI Documentation](https://github.com/swagger-api/swagger-ui)
