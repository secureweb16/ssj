const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();
// Fixed credentials (email and password)
const fixedEmail = process.env.FIXED_EMAIL;
const fixedPassword = process.env.FIXED_PASSWORD;
// const fixedEmail = "admin@example.com";
// const fixedPassword = "password123";

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log('email-',fixedEmail);
    console.log('password-',fixedPassword);
    if (email === fixedEmail && password === fixedPassword) {
    try {
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
};

// Signup function to create a new user
exports.signup = async (req, res) => {
    const { email, password } = req.body;
    console.log('email',req.body);
    console.log('password',password);
    if (!email || !password ) {
        return res.status(400).json({ message: "Please provide email, password, and name." });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
        });
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '8h',
        });
        return res.status(201).json({
            message: "Signup successful",
            token,
        });
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// Dashboard access - protected route
exports.dashboard = (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({
            message: 'Welcome to the Admin Dashboard',
            user: decoded.username,
        });
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
};
