const express = require ("express");
const router = express.Router();
const  uploadImages  = require("../controllers/imageControllers");

router.route("/").post(uploadImages);

module.exports = router;