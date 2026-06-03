const express = require("express");
const jwt = require("jsonwebtoken");
const checkAuth = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.get('/dashboard',checkAuth, userController.dashboard);
router.post("/update-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "email and newPassword are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    return res.json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error) {
    console.error("Update Password Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});
module.exports = router;
