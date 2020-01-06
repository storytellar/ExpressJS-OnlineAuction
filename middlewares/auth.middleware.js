module.exports = function restrict(req, res, next) {
    if (!req.session.isAuthenticated) {
        return res.redirect(`/admin/login?retUrl=${req.originalUrl}`);
    }

    next();
}
