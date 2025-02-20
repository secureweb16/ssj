const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  company_name: { type: String, required: true },
  car_name: { type: String, required: true },
  modal: { type: String, required: true },
  passengers: { type: String, required: true },
  luggage_type: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String }, // URL or file path of the car image
});

module.exports = mongoose.model("Car", CarSchema);
