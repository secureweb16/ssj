const { body, validationResult } = require("express-validator");

const MetaData = require("../models/MetaData");

/* Validation Rules */

const validateMetaData = [
  body("page_name")
    .notEmpty()
    .withMessage("Page Name is required"),

  body("page_url")
    .notEmpty()
    .withMessage("Page URL is required"),

  body("title")
    .notEmpty()
    .withMessage("Title is required"),

  body("description")
    .notEmpty()
    .withMessage("Description is required"),
];

/* Add Meta Data */

exports.addMetaData = [
  validateMetaData,

  async (req, res) => {
    try {

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      const {
        page_name,
        page_url,
        title,
        description,
      } = req.body;

      const image = req.file ? req.file.path : "";

      // CHECK EXISTING PAGE

      const existingPage = await MetaData.findOne({
        page_name,
      });

      if (existingPage) {
        return res.status(400).json({
          message: "Page metadata already exists",
        });
      }

      const newMetaData = new MetaData({
        page_name,
        page_url,
        title,
        description,
        image,
      });

      await newMetaData.save();

      res.status(201).json({
        message: "Metadata added successfully",
        metaData: newMetaData,
        success: true,
      });

    } catch (error) {

      console.error("Error adding metadata:", error);

      res.status(500).json({
        message: "Server error",
      });
    }
  },
];

/* Get All Metadata */

exports.getAllMetaData = async (req, res) => {
  try {

    const metaData = await MetaData.find();

    res.json({
      metaData,
      total: metaData.length,
      success: true,
    });

  } catch (error) {

    console.error("Error fetching metadata:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

/* Get Single Metadata By ID */

exports.getMetaDataById = async (req, res) => {
  try {

    const metaData = await MetaData.findById(req.params.id);

    if (!metaData) {
      return res.status(404).json({
        message: "Metadata not found",
      });
    }

    res.json(metaData);

  } catch (error) {

    console.error("Error fetching metadata:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

/* Get Metadata By Page Name */

exports.getMetaDataByPage = async (req, res) => {
  try {

    const metaData = await MetaData.findOne({
      page_name: req.params.page_name.toLowerCase(),
    });

    if (!metaData) {
      return res.status(404).json({
        message: "Metadata not found",
      });
    }

    res.json({
      metaData,
      success: true,
    });

  } catch (error) {

    console.error("Error fetching metadata:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

/* Update Metadata */

exports.updateMetaData = [
  validateMetaData,

  async (req, res) => {
    try {

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      const {
        page_name,
        page_url,
        title,
        description,
      } = req.body;

      let updateData = {
        page_name,
        page_url,
        title,
        description,
      };

      // UPDATE IMAGE

      if (req.file) {
        updateData.image = req.file.path;
      }

      // REMOVE IMAGE

      if (req.body.removeImage === "true") {
        updateData.image = "";
      }

      const updatedMetaData =
        await MetaData.findByIdAndUpdate(
          req.params.id,
          updateData,
          { new: true }
        );

      if (!updatedMetaData) {
        return res.status(404).json({
          message: "Metadata not found",
        });
      }

      res.json({
        message: "Metadata updated successfully",
        metaData: updatedMetaData,
        success: true,
      });

    } catch (error) {

      console.error("Error updating metadata:", error);

      res.status(500).json({
        message: "Server error",
      });
    }
  },
];

/* Delete Metadata */

exports.deleteMetaData = async (req, res) => {
  try {

    const deletedMetaData =
      await MetaData.findByIdAndDelete(req.params.id);

    if (!deletedMetaData) {
      return res.status(404).json({
        message: "Metadata not found",
      });
    }

    res.json({
      message: "Metadata deleted successfully",
      success: true,
    });

  } catch (error) {

    console.error("Error deleting metadata:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


exports.getMetaBySlug = async (req, res) => {
  try {
    let slug = req.params.slug || "";
    
    // Normalize for URL lookup (must start with /)
    let urlSlug = slug.startsWith("/") ? slug : "/" + slug;
    // Normalize for Name lookup (no leading slash, default to 'home' if empty)
    let nameSlug = (slug.startsWith("/") ? slug.substring(1) : slug) || "home";

    // Standardize home lookup: if slug is 'home', URL search should also check '/'
    let query = {
      $or: [
        { page_url: urlSlug },
        { page_name: nameSlug }
      ]
    };

    if (nameSlug === "home") {
      query.$or.push({ page_url: "/" });
    }

    const meta = await MetaData.findOne(query);

    if (!meta) {
      return res.status(404).json({
        message: `SEO not found for identifying slug: ${urlSlug} or ${nameSlug}`,
        success: false
      });
    }



    res.json({
      metaData: meta,
      success: true,
    });

  } catch (error) {
    console.error("Error in getMetaBySlug:", error);
    res.status(500).json({
      message: "Server error",
      success: false
    });
  }
};
