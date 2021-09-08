function usuarioLogeadoMiddleware(req, res, next){
    if(req.session.usuarioLogeado != undefined){
        console.log("hola")
        res.locals.logeado = req.session.usuarioLogeado
    }
    next()
}

module.exports = usuarioLogeadoMiddleware