const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const productController = require("../controllers/productController");

// Example routes
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

module.exports = router;
