const { validationResult } = require('express-validator'); //Calculating...
const User = require('../models/User')


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
        User.create(req.body)
        return res.send('Todas las validaciones pasaron correctamente');
    },

    login: function (req, res){
        res.render("./users/login")
    },
    profile: function (req, res){
        return res.render('./users/')
    }
    
}

module.exports = usersController;