var sellerModel = require('../models/seller.model');
const moment = require("moment");
moment.locale("vi");

module.exports.welcome = async (req, res) => {
    if (!res.locals.login)
        res.redirect('/seller/login');
    else
        res.render('seller/index');
};

module.exports.login = async (req, res) => {
    if (req.session.isSeller) {
        res.redirect('seller/mngr');
    }
    else {
        res.render("seller/login", { layout: false });
    }
}

module.exports.postLogin = async (req, res) => {
    const seller = await sellerModel.getUser(req.body.sellerName);

    if (seller === null) {
        return res.render("seller/login", { layout: false, err_message: 'Invalid name or password!' });
    }

    const isValid = sellerModel.isValid(req.body.password, seller.password);
    if (!isValid) {
        console.log("fail " + req.body.password + " vs " + seller.password);
        return res.render("seller/login", { layout: false, err_message: 'Invalid name or password!' });
    }

    if (seller.isSeller == 0) {
        return res.render("seller/login", { layout: false, err_message: 'Invalid name or password!' });
    }

    delete seller.password;
    req.session.isSeller = true;
    req.session.authSeller = seller;


    res.redirect('/seller/mngr');
}

module.exports.logout = async (req, res) => {
    req.session.isSeller = false;
    req.session.authSeller = null;

    res.redirect('/seller/login');
}

module.exports.mngr = async (req, res) => {
    const sellerInfo = req.session.authSeller;
    const productOnSaleRaw = await sellerModel.productOnsale(sellerInfo.id);
    const productSoldRaw = await sellerModel.productSold(sellerInfo.id);

    const productOnSale = productOnSaleRaw.map(row => {
        return {
            ID: row.id,
            itemName: row.prodName,
            price: row.giahientai.toLocaleString({
                style: 'currency',
                currency: 'VND'
            }),
            top1: row.bestbidder,
            postDate: row.ngaydang.toLocaleString("vi-VN"),
            timeLeft: moment(row.ketthuc).from(row.ngaydang),
            numOfBid: row.bids,
            imgLink: row.imgLink
        }
    });

    const productSold = productSoldRaw.map(row => {
        return {
            ID: row.id,
            itemName: row.prodName,
            price: row.giahientai.toLocaleString({
                style: 'currency',
                currency: 'VND'
            }),
            top1: row.bestbidder,
            postDate: row.ngaydang.toLocaleString("vi-VN"),
            timeLeft: moment(row.ketthuc).from(row.ngaydang),
            numOfBid: row.bids,
            imgLink: row.imgLink
        }
    });

    res.render("seller/mngr", {layout: false, productOnSale: productOnSale, productSold: productSold});
}