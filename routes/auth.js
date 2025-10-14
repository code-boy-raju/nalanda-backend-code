const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registerValidators, loginValidators } = require('../utils/validators');

router.post('/register', registerValidators, authController.register);
router.post('/login', loginValidators, authController.login);

module.exports = router;
