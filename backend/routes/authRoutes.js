const express = require("express");
const jwt = require("jsonwebtoken");
const checkAuth = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');
const User = require('../models/User');
const router = express.Router();

router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.get('/dashboard',checkAuth, userController.dashboard);
router.post("/update-password", async (req, res) => {
  try {
    const { username, newPassword } = req.body;

    if (!username || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "username and newPassword are required",
      });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // plain password assign karo
    // schema ka pre('save') hook bcrypt hash karega
    user.password = newPassword;
    await user.save();

    return res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Update Password Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});
module.exports = router;
