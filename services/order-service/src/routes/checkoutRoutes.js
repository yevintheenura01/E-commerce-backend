const express = require('express');
const { checkoutHandler } = require('../controllers/checkoutController');

const router = express.Router();

router.post('/', checkoutHandler);

module.exports = router;
