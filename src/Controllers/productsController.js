const db = require("../database/models");

const productsController = {


    index: (req, res) => {
         db.productos.findAll()
            .then(function(productos){
                res.render('./partials/index', { productos: productos })
         })
         .catch(function(error){
             console.log(error)

          })
    },

    listaProductos: (req,res)=>{
        db.productos.findAll()
            .then(function(productos){
                res.render('./products/list', { productos: productos })
            })
            .catch(function(error){
                console.log(error)
   
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
            .catch(function(error){
                console.log(error)
   
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
        .catch(function(error){
            console.log(error)

         })
    },
    
    /* EDICION DE PRODUCTO */

    editarProducto: function(req, res) {
        db.productos.findByPk(req.params.id)
            .then(function(productoEncontrado){
                res.render('./products/editProduct', { productoEnDetalle: productoEncontrado });
            })
            .catch(function(error){
                console.log(error)
   
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
        .catch(function(error){
            console.log(error)

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
        .catch(function(error){
            console.log(error)

         })
    }

};
module.exports = productsController;