const db = require("../database/models");

const apiController = {

    productos: (req, res) => {
        db.productos.findAll()
           .then(function(productos){
               res.json({
                   productos: productos,
                   count: productos.length,
                   countByCategory: contarCategorias(productos),
               })
        })
        .catch(function(error){
            console.log(error)

         })
   },

   productosCategoria: (req, res) => {
       db.productos.findAll()
        .then(function(productos){
            res.json({
                total: Object.keys(contarCategorias(productos)).length
            })
        })
   },

   productosDetalle: (req, res) => {
   
        db.productos.findByPk(req.params.id)
            .then(function(productoEnDetalle){
                res.json (productoEnDetalle)
            })
            .catch(function(error){
                console.log(error)
   
             })
        
        },
    
    usuarios: (req, res) => {
        db.usuarios.findAll({attributes: { exclude: ['password', "admin"] }})
        .then(function(usuarios){ 
             
            res.json({
                usuarios: usuarios,
                count: usuarios.length,
            
            })
     })
     .catch(function(error){
         console.log(error)

      })
    },

    usuarioId: (req, res) => {
        
         db.usuarios.findByPk(req.params.id, {attributes: { exclude: ['password', "admin"] }})
                .then(function(usuario){
                    res.json (usuario)
                })
                .catch(function(error){
                    console.log(error)
       
                 })
            
            },
    
   
};

function contarCategorias(productos) {
    categorias = {}
    productos.forEach(p => {
    	if (p.categoria in categorias) {
      	categorias[p.categoria]++;
      } else {
      	categorias[p.categoria] = 1;
      } 
        
    });

    return categorias
}

module.exports = apiController;