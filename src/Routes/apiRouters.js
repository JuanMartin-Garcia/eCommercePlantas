const express = require("express");
const apiController = require("../Controllers/apiController")
const router = express.Router();

router.get("/products", apiController.productos);
router.get("/products/categories", apiController.productosCategoria);
router.get("/products/:id", apiController.productosDetalle);
router.get("/users", apiController.usuarios);
router.get("/users/:id", apiController.usuarioId)

module.exports = router;