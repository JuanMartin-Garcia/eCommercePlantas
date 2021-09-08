function authMiddleware(req, res, next) {
	if (req.session.usuarioLogeado == undefined) {
		res.redirect('/users/login');
	}
	next();
}

module.exports = authMiddleware;