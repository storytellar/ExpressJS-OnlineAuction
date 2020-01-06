module.exports.adminRestrict = (req, res, next) => {
    if (!req.session.isAuthenticated) {
        return res.redirect(`/admin/login?retUrl=${req.originalUrl}`);
    }

    next();
}

module.exports.userRestrict = (req, res, next) => {
    if (!req.session.isAuthenticated) {
        console.log('You have not logined yet. ' + req);
        return res.redirect(`/user/login?retUrl=${req.originalUrl}`);
    }

    next();
}
