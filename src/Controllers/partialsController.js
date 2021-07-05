const partialsController = {

        index: function (req, res){
            res.render("./partials/index")
        },

        footer: function (req, res){
            res.render("./partials/footer")
        },

        header: function (req, res){
            res.render("./partials/header")
        },

}

module.exports = partialsController;