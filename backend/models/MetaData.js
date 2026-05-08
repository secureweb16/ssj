const mongoose = require("mongoose");

const MetaDataSchema = new mongoose.Schema(
  {

    page_name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    page_url: {
      type: String,
      required: true,
    },

    // SEO TITLE
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // SEO META DESCRIPTION
    description: {
      type: String,
      required: true,
      trim: true,
    },

    // SEO / SOCIAL IMAGE
    image: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MetaData", MetaDataSchema);