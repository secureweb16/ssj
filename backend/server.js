const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");
const emailRoutes = require("./routes/emailRoutes");
const path = require('path');
require('dotenv').config(); // Load environment variables from a .env file
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/email", emailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
