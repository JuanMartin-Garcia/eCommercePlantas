const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/productosDatos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const db = require("../database/models");

const productsController = {


    index: (req, res) => {
         db.productos.findAll()
            .then(function(productos){
                res.render('./partials/index', { productos: productos })
         })
              
    },

    listaProductos: (req,res)=>{
        db.productos.findAll()
            .then(function(productos){
                res.render('./products/list', { productos: productos })
            })
       
    },

    carrito: function(req, res) {
        res.render("./products/carrito")
    },

    /*  VER PRODUCTO DETALLE */

    detalle: function(req, res) {
        db.productos.findByPk(req.params.id)
            .then(function(productoEnDetalle){
                res.render('./products/detalle-producto', { productoEnDetalle: productoEnDetalle });
            })
        
    },

    /* AÑADIR PRODUCTO - MUESTRA */

    añadirProducto: function(req, res) {
        res.render("./products/addProduct")
    },

    /* AÑADIR PRODUCTO - METODO DE GUARDADO */

    guardar: function(req, res) {
        db.productos.create({
            nombre: req.body.nombre,
            precio: req.body.precio,
            categoria: req.body.categoria,
            descripcion: req.body.descripcion,
            imagen: req.file.filename

        })
        .then(function(){
            res.redirect('/');
        })
    },
    
    /* EDICION DE PRODUCTO */

    editarProducto: function(req, res) {
        db.productos.findByPk(req.params.id)
            .then(function(productoEncontrado){
                res.render('./products/editProduct', { productoEnDetalle: productoEncontrado });
            })
        

    },

    /* METODO ACTUALIZACION DE PRODUCTO */
    actualizar: function(req, res) {
        db.productos.update({
            nombre: req.body.nombre,
            precio: req.body.precio,
            categoria: req.body.categoria,
            descripcion: req.body.descripcion,
            imagen: (!req.file) ? db.productos.imagen : req.file.filename

        },
        {
            where:{
                id:req.params.id
            }
        })
        .then(function(){
            res.redirect("/products/detalle-producto/" + req.params.id)
        })
    },
        
     /* ELIMINAR PRODUCTO */

    eliminar: function(req, res) {
        db.productos.destroy({
            where:{
                id:req.params.id
            }
        })
        .then(function(){
            res.redirect('/');
        })
        
    }

};
        // let idProducto = req.params.id;
        // for (let i = 0; i < products.length; i++) {
        //     if (products[i].id == idProducto) {
        //         var nombreImagen = products[i].imagen;
        //         products.splice(i, 1);
        //         break;
        //     }
        // }

        // fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
        // fs.unlinkSync(path.join(__dirname, "../../public/img/"+ nombreImagen));

module.exports = productsController;