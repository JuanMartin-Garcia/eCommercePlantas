const express = require("express");
const productsController = require("../Controllers/productsController");
const partialsController = require("../Controllers/partialsController");
const router = express.Router();

router.get("/", productsController.index);

module.exports = router;