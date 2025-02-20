const express = require("express");
const carController = require("../controllers/carController");
const multer = require("multer");
const router = express.Router();

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Save images in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Car Routes
router.post("/", upload.single("image"), carController.addCar);
router.get("/", carController.getAllCars);
router.get("/:id", carController.getCarById);
router.put("/:id", upload.single("image"), carController.updateCar);
router.delete("/:id", carController.deleteCar);

module.exports = router;
