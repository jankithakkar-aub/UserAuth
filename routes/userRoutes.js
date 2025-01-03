const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { validateUserRegistration, validateUserLogin, handleUserValidationErrors} = require('../middleware/validation');

const router = express.Router();

// Route for user registration with validation middleware
router.post('/register', validateUserRegistration, handleUserValidationErrors, registerUser); 

// Route for user login with validation middleware
router.post('/login', validateUserLogin, handleUserValidationErrors, loginUser);

module.exports = router;