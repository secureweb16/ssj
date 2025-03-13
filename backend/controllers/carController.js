const { body, validationResult } = require("express-validator");
const Car = require("../models/Car");

/* Validation Rules */
const validateCar = [
  body("company_name").notEmpty().withMessage("Company Name is required"),
  body("car_name").notEmpty().withMessage("Car Name is required"),
  body("modal").notEmpty().withMessage("Modal is required"),
  body("passengers").notEmpty().withMessage("Passengers Are required"),
  body("luggage_type").notEmpty().withMessage("Luggage Type is required"),
  body("type").notEmpty().withMessage("Type is required"),
  body("description").notEmpty().withMessage("Description is required"),
];

/* Add New Car */
exports.addCar = [
  validateCar,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      if (!req.file) {
        return res.status(400).json({ message: "Image is required!" });
      }
      const { company_name, car_name, modal, passengers, luggage_type, type, description } = req.body;
      const image = req.file.path;
      const newCar = new Car({ company_name, car_name, modal, passengers, luggage_type, type, description, image });
      await newCar.save();
      res.status(201).json({ message: "Car added successfully", car: newCar, success: true });
    } catch (error) {
      console.error("Error adding car:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
];

/* Get Car With Paginations */ 
exports.getAllCars = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and 10 items per page
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;
    const cars = await Car.find().skip(skip).limit(limitNumber);
    const totalCars = await Car.countDocuments();
    res.json({
      cars,
      totalCars,
      totalPages: Math.ceil(totalCars / limitNumber),
      currentPage: pageNumber,
    });
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// For Frontend
exports.getAllCarsFrontend = async (req, res) => {
  try {
    const cars = await Car.find();
    const totalCars = cars.length;
    res.json({
      cars,
      totalCars,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* Get a single car by ID */
exports.getCarById = async (req, res) => {
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
};

/* Update a car by ID */
exports.updateCar = [
  validateCar,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { company_name, car_name, modal, passengers, luggage_type, type, description } = req.body;
      let updateData = { company_name, car_name, modal, passengers, luggage_type, type, description };
      if (req.file) {
        updateData.image = req.file.path; // Update image if a new one is uploaded
      } else if (req.body.removeImage === "true") {
        updateData.image = null; // Remove image from database if requested
      }
      const updatedCar = await Car.findByIdAndUpdate(req.params.id, updateData, { new: true });
      if (!updatedCar) {
        return res.status(404).json({ message: "Car not found" });
      }
      res.json({ message: "Car updated successfully", car: updatedCar, success: true });
    } catch (error) {
      console.error("Error updating car:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
];

/* Delete a car by ID */
exports.deleteCar = async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json({ message: "Car deleted successfully", success: true });
  } catch (error) {
    console.error("Error deleting car:", error);
    res.status(500).json({ message: "Server error" });
  }
};