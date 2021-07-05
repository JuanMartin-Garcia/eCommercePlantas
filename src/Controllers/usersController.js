const usersController = {

    login: function (req, res){
        res.render("./users/login")
    },

    registro: function (req, res){
        res.render("./users/registro")
    },

    
    // aca tienen que agregar los dos nuevos html o EJS que pide el sprint.
    // hacerle las rutas y todo.
}

module.exports = usersController;