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
        let userToLogin = User.findByField('email', req.body.email);
        

    },

    profile: function (req, res){
        return res.render('./users/')
    }
    
}

module.exports = usersController;