const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Fixed credentials (email and password)
const fixedEmail = "admin@example.com";
const fixedPassword = "password123"; // Store in a more secure way for production, such as bcrypt


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Match the email and password with fixed details
  if (email === fixedEmail && password === fixedPassword) {
    try {
      // Generate a JWT token (You can change the payload as per your requirements)
      const token = jwt.sign({ user: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "8h",
      });

      return res.status(200).json({
        message: "Login successful",
        token,
      });
    } catch (error) {
      console.error("Login Error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  } else {
    return res.status(400).json({ message: "Invalid email or password" });
  }
});

module.exports = router;
