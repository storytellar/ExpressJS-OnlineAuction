module.exports.adminRestrict = (req, res, next) => {
    if (!req.session.isAdmin) {
        return res.redirect(`/admin/login?retUrl=${req.originalUrl}`);
    }

    next();
}

module.exports.userRestrict = (req, res, next) => {
    if (!req.session.isUser) {
        return res.redirect(`/user/login?retUrl=${req.originalUrl}`);
    }

    next();
}

module.exports.sellerRestrict = (req, res, next) => {
    if (!req.session.isSeller) {
        return res.redirect(`/seller/login?retUrl=${req.originalUrl}`);
    }

    next();
}