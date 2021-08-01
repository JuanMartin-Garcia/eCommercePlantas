const { validationResult } = require('express-validator'); //Calculating...
const bcryptjs = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const userFilePath = path.join(__dirname, '../database/usuariosDatos.json');
const User = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));




const usersController = {

   

    registro: function (req, res){
        res.render("./users/registro")
    },

    processRegister: function (req, res){
        const resultValidation = validationResult(req);

        if (resultValidation.isEmpty()){
        // let userInDB = User.findByField('email', req.body.email);

        // if (userInDB) {
        //     return res.render("./users/registro", {
        //         errors: {
        //             email:{
        //                 msg: 'Este email ya esta registrado'
        //             }
        //         },
        //         oldData: req.body
        //     });
        // }
        

        let userToCreate = {
            id: User.length + 1,
            ...req.body,
            password: bcryptjs.hashSync(req.body.password,10),
            avatar: req.file.filename
        } 
        //escribir el json aca, pusheando el objeto userToCreat al user
        User.push(userToCreate)
        fs.writeFileSync(userFilePath, JSON.stringify(User, null, ' '));
        
        return res.redirect('/users/login')
        }
        else{
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
       
                
    }

,

    profile: function (req, res){
        let comprobrante = 0
        let UserObj = {}
        for (let i = 0; i < User.length; i++){
            
            if(User[i].id == req.session.usuarioLogeado){
            comprobante = 1
            UserObj = User[i]
            }
           
        }
        
        if(comprobante ==1){
            res.render('./users/profile', {userProfile: UserObj})
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
