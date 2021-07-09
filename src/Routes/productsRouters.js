const express = require("express");
const path = require('path');
const router = express.Router();
const multer = require("multer");
const multerDiskStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../../public/img/'));
    },
    filename: function(req, file, cb) {
        let imageName = 'img' + '-' + file.originalname;
        cb(null, imageName);
    }
});

const uploadFile = multer({ storage: multerDiskStorage });
const productsController = require("../Controllers/productsController");


/*** MUESTRA LISTADO DE PRODUCTOS ***/
router.get("/", productsController.index)

/*** AÑADIR PRODUCTO ***/
router.get("/addProduct", productsController.añadirProducto);
router.post("/addProduct", uploadFile.single('imagenProducto'), productsController.guardar);

/* VER CARRITO */
router.get("/carrito", productsController.carrito);

/* VER PRODUCTO */
router.get("/detalle-producto/:id", productsController.detalle);

/* EDITAR PRODUCTO */
router.get("/editProduct/:id", productsController.editarProducto);
router.post("/editProduct/:id", productsController.actualizar);

router.get("/list", productsController.listaProductos);

/*** ELIMINAR UN PRODUCTO***/
router.post('/delete/:id', productsController.eliminar);

module.exports = router;