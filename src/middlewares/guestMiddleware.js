function guestMiddleware(req, res, next) {
	if (req.session.usuarioLogeado != undefined) {
		
		res.redirect('/users/profile');
	}
	next();
}

module.exports = guestMiddleware;