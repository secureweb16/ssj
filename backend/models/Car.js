const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  modal: { type: String, required: true },
  type: { type: String, required: true },
  image: { type: String }, // URL or file path of the car image
});

module.exports = mongoose.model("Car", CarSchema);
