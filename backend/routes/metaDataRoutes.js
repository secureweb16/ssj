const express = require("express");

const metaDataController =
  require("../controllers/metaDataController");

const multer = require("multer");

const router = express.Router();

/* MULTER SETUP */

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "uploads");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },

});

const upload = multer({ storage });

/* META DATA ROUTES */

// ADD META DATA

router.post(
  "/",
  upload.single("image"),
  metaDataController.addMetaData
);

// GET ALL META DATA

router.get(
  "/",
  metaDataController.getAllMetaData
);

// GET META DATA BY PAGE NAME

router.get(
  "/page/:page_name",
  metaDataController.getMetaDataByPage
);

// GET SINGLE META DATA BY ID

router.get(
  "/:id",
  metaDataController.getMetaDataById
);

// UPDATE META DATA

router.put(
  "/:id",
  upload.single("image"),
  metaDataController.updateMetaData
);

// DELETE META DATA

router.delete(
  "/:id",
  metaDataController.deleteMetaData
);
router.get("/slug/:slug(*)?", metaDataController.getMetaBySlug);
module.exports = router;