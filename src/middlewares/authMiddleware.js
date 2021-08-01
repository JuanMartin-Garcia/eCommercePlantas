  
function authMiddleware(req, res, next) {
	if (!req.session.usuarioLogedo) {
		return res.redirect('/user/login');
	}
	next();
}

module.exports = authMiddleware;