const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

// Define the POST route to send email
router.post('/email', emailController.sendEmail);
router.post('/contact-us', emailController.sendContactEmail);

module.exports = router;
