const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");

const metaDataRoutes = require("./routes/metaDataRoutes");
const emailRoutes = require("./routes/emailRoutes");
const path = require('path');

const sitemapRoute = require('./routes/sitemap');
require('dotenv').config(); // Load environment variables from a .env file
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', sitemapRoute);

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/cars/frontend", carRoutes);
app.use("/api", emailRoutes);
app.use("/api/meta-data", metaDataRoutes);

const PORT = process.env.PORT || 5000;
const generateSitemap = require("./scripts/generateSitemap");

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    generateSitemap(); // ✅ Generate sitemap on startup
});
