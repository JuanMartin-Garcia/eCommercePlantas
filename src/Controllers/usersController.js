const { validationResult } = require('express-validator'); 
const bcryptjs = require('bcryptjs');
const db = require("../database/models");


const usersController = {

    registro: function (req, res){
        res.render("./users/registro")
    },

    processRegister: function (req, res){

        function invalidPassword(password){
            const isUpperCase = (s) => s.toLowerCase() != s
            const isLowerCase = (s) => s.toUpperCase() != s
            if(isUpperCase(password) && isLowerCase(password) ){
                return false
            }
                
        else { 
            return true            
              }

        }
    
        if(invalidPassword(req.body.password)){
            return res.render("./users/registro",{
                errors: {
                    password: {
                        msg: "La password debe tener una mayúscula y una minúscula"
                    }
                },
                oldData: req.body
            })
        }
        const resultValidation = validationResult(req);
        if(resultValidation.isEmpty()){
            db.usuarios.findOne({
                where: {
                    email: req.body.email
                    }
            })
            .then(function(usuario){
                if(usuario){
                    return res.render("./users/registro",{
                        errors: {
                            email: {
                                msg: "Email ya existe"
                            }
                        },
                        oldData: req.body
                    })
                }else{
                    db.usuarios.create({
                        fullName: req.body.fullName,
                        email: req.body.email,
                        password: bcryptjs.hashSync(req.body.password,10),
                        imagen: req.file.filename
                    })
                    .then(function(){
                        res.redirect('/users/login')
                    })
                    .catch(function(e){
                        console.log(e)
                    })
            }
            })
        }else{
            return res.render("users/registro", {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
    },

    login: function (req, res){
        res.render("./users/login")
    },
    
    loginProcess: (req, res) => {
        db.usuarios.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(function(usuario){
                if(usuario){
                  let usuariochequeado = bcryptjs.compareSync(req.body.password, usuario.password)

                  if (usuariochequeado) {
                    req.session.usuarioLogeado = usuario.id
                    return res.redirect("/users/profile")
                }
                  else {
                        res.render("/users/login",
                        {
                            errors: {
                                datosError: {
                                    msg: "Credenciales Incorrectas"
                                }
                            }
                        })
                }
                }
                else {
                    res.render("/users/login",
                    {
                        errors: {
                            datosError: {
                                msg: "Credenciales Incorrectas"
                            }
                        }
                    })
                }
            })
            .catch(function(error){
                console.log(error)
   
             })

    },
    
    profile: function (req, res){
        
         db.usuarios.findByPk(req.session.usuarioLogeado)
            
         .then(function(usuario){
            if(usuario){
                 res.render("users/profile", {userProfile: usuario})
             }
             else {
                 res.redirect("/users/registro")
             }
         })
         .catch(function(error){
            console.log(error)

         })
               
    },

    logout: (req, res) => {
		req.session.destroy();
		return res.redirect('/');
	}
    
}

module.exports = usersController;
