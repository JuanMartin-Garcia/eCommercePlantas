const { validationResult } = require('express-validator'); //Calculating...
const User = require('../models/User');
const bcryptjs = require('bcryptjs');


const usersController = {

   

    registro: function (req, res){
        res.render("./users/registro")
    },

    processRegister: function (req, res){
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0){
            return res.render("./users/registro", {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
        let userInDB = User.findByField('email', req.body.email);

        if (userInDB) {
            return res.render("./users/registro", {
                errors: {
                    email:{
                        msg: 'Este email ya esta registrado'
                    }
                },
                oldData: req.body
            });
        }

        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password,10),
            avatar: req.file.filename
        }

        let userCreated = User.create(userToCreate);
        return res.redirect('/users/login')
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