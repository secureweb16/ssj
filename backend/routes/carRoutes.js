const express = require("express");
const Car = require("../models/Car");
const multer = require("multer");

const router = express.Router();

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save images in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// @route   POST /api/cars
// @desc    Add a new car
// @access  Public (no auth middleware)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, modal, type } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Image is required!" });
    }
    const image = req.file ? req.file.path : null;

    const newCar = new Car({ name, modal, type, image });
    await newCar.save();

    res.status(201).json({ message: "Car added successfully", car: newCar ,success:true });
  } catch (error) {
    console.error("Error adding car:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/cars
// @desc    Get all cars
// @access  Public
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/cars/:id
// @desc    Get a single car by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json(car);
  } catch (error) {
    console.error("Error fetching car:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT /api/cars/:id
// @desc    Update a car by ID
// @access  Public (no auth middleware)
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, modal, type } = req.body;
    let updateData = { name, modal, type };

    if (req.file) {
      updateData.image = req.file.path; // Update image if a new one is uploaded
    } else if (req.body.removeImage === "true") {
      updateData.image = null; // Remove image from database if requested
    }

    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json({ message: "Car updated successfully", car: updatedCar, success: true });
  } catch (error) {
    console.error("Error updating car:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// @route   DELETE /api/cars/:id
// @desc    Delete a car by ID
// @access  Public (no auth middleware)
router.delete("/:id", async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json({ message: "Car deleted successfully",success:true });
  } catch (error) {
    console.error("Error deleting car:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
