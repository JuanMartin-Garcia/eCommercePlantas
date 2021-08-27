const { validationResult } = require('express-validator'); 
const bcryptjs = require('bcryptjs');
const db = require("../database/models");


const usersController = {

    registro: function (req, res){
        res.render("./users/registro")
    },

    processRegister: function (req, res){
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
                        oldeData: req.body
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
        let comprobar = 0
        for (let i = 0; i < User.length; i++) {

             if (User[i].email == req.body.email) {
                var UserToLogin = User[i]

                    if (UserToLogin) {
                        let passwordChecked = bcryptjs.compareSync(req.body.password, UserToLogin.password);

                            if(passwordChecked){
                                
                                req.session.usuarioLogeado = UserToLogin.id
                                comprobar = 1
                    }
               }
        }
    }   
            if (comprobar == 1){
            res.redirect('/users/profile')
    }
            else{
            console.log("No lo encontro") 
    }
       
                
},

    profile: function (req, res){
        let comprobante = 0
        let UserObj = null
        for (let i = 0; i < User.length; i++){
            
            if(User[i].id == req.session.usuarioLogeado){
            comprobante = 1
            UserObj = User[i]
            }
           
        }
        
        if(comprobante == 1){
            res.render('users/profile', {userProfile: UserObj})
        }
        
        else {
            
            res.redirect("/users/registro")

       }
        
    },

    logout: (req, res) => {
		req.session.destroy();
		return res.redirect('/');
	}
    
}

module.exports = usersController;
