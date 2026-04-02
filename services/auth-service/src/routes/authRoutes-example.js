/**
 * EXAMPLE: Auth Service Routes with Swagger Documentation
 *
 * Add JSDoc comments like this above your route handlers.
 * Once swagger.js is configured, these comments will automatically
 * appear in the Swagger UI at /api-docs
 */

const express = require("express");
// const { loginHandler, registerHandler } = require('../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user with email and password, return JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *             required: [email, password]
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid credentials
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *     tags:
 *       - Authentication
 */
// router.post('/login', loginHandler);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: User registration
 *     description: Create a new user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *             required: [email, username, password, confirmPassword]
 *     responses:
 *       201:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request or user already exists
 *       500:
 *         description: Internal server error
 *     tags:
 *       - Authentication
 */
// router.post('/register', registerHandler);

module.exports = router;
