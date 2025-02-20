const express = require("express");
const jwt = require("jsonwebtoken");
const checkAuth = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.get('/dashboard',checkAuth, userController.dashboard);

module.exports = router;
