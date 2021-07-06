const fs = require('fs');
const { reset } = require('nodemon');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/productosDatos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const productsController = {


    index: (req, res) => {
        res.render('./partials/index', { productos: products })
    },

    carrito: function(req, res) {
        res.render("./products/carrito")
    },

    /*  VER PRODUCTO DETALLE */

    detalle: function(req, res) {
        let idProducto = req.params.id;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == idProducto) {
                var productoEncontrado = products[i];
            }
        }
        res.render('./products/detalle-producto', { productoEnDetalle: productoEncontrado });
    },

    /* AÑADIR PRODUCTO - MUESTRA */

    añadirProducto: function(req, res) {
        res.render("./products/addProduct")
    },

    /* AÑADIR PRODUCTO - METODO DE GUARDADO */

    guardar: function(req, res) {
        let nombreImagen = req.file.filename;
        let idNuevo = products[products.length - 1].id + 1;
        let nuevoObjeto = Object.assign({ id: idNuevo }, req.body, { imagen: nombreImagen });
        products.push(nuevoObjeto);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
        res.redirect('/');
    },

    /* EDICION DE PRODUCTO */

    editarProducto: function(req, res) {
        let idProducto = req.params.id;

        for (let i = 0; i < products.length; i++) {
            if (products[i].id == idProducto) {
                var productoEncontrado = products[i];
            }
        }
        res.render('./products/editProduct', { productoEnDetalle: productoEncontrado });

    },

    /* METODO ACTUALIZACION DE PRODUCTO */
    actualizar: function(req, res) {

        let valoresNuevos = req.body;
        let idProducto = req.params.id;


        for (let i = 0; i < products.length; i++) {
            if (products[i].id == idProducto) {

                products[i].nombre = valoresNuevos.nombre;
                products[i].precio = valoresNuevos.precio;
                products[i].categoría = valoresNuevos.categoría;
                products[i].descripcion = valoresNuevos.descripcion;
                products[i].imagen = valoresNuevos.imagen;

                var productoEncontrado = products[i];

                break;
            }
        }

        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));

        res.render('./products/detalle-producto', { productoEnDetalle: productoEncontrado })

    },
    /* ELIMINAR PRODUCTO */

    eliminar: function(req, res) {
        let idProducto = req.params.id;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == idProducto) {
                var nombreImagen = products[i].image;
                products.splice(i, 1);
                break;
            }
        }

        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
        fs.unlinkSync(path.join(__dirname, '../../public/img' + nombreImagen));

        res.render('index', { productos: products });
    }

};

module.exports = productsController;