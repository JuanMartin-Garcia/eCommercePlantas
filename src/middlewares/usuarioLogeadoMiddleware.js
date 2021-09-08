function usuarioLogeadoMiddleware(req, res, next){
    if(req.session.usuarioLogeado != undefined){
        
        res.locals.logeado = req.session.usuarioLogeado
    }
    next()
}

module.exports = usuarioLogeadoMiddleware