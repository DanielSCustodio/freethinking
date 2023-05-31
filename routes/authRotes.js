const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

//Get
router.get('/login', AuthController.login);
router.get('/register', AuthController.register);
router.get('/logout', AuthController.logout);

//Post
router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);

module.exports = router;
