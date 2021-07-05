const usersController = require("../Controllers/usersController");

const express = require("express");
const router = express.Router();

router.get("/login", usersController.login);
router.get("/registro", usersController.registro);

module.exports = router;