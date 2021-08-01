function guestMiddleware(req, res, next) {
	if (req.session.usuarioLogeado) {
		return res.redirect('/user/profile');
	}
	next();
}

module.exports = guestMiddleware;