var express = require('express');
var router = express.Router();

const middleAuthentication = require(__path_middleware + 'auth');

router.use('/', require('./home'));
router.use('/dashboard', require('./dashboard'));
router.use('/contact', require('./contact'));
router.use('/items', require('./items'));
router.use('/groups', require('./groups'));
router.use('/users', require('./users'));
router.use('/news/categories', require('./news/categories'));
router.use('/news/article', require('./news/article'));
router.use('/shop/categories', require('./shop/categories'));
router.use('/shop/article', require('./shop/article'));
router.use('/shop/slider', require('./shop/slider'));
router.use('/shop/branch', require('./shop/branch'));
router.use('/shop/banner', require('./shop/banner'));
router.use('/shop/fee-shipping', require('./shop/feeShipping'));
router.use('/shop/promotion', require('./shop/promotion'));
router.use('/shop/order', require('./shop/order'));
router.use('/shop/subscribe', require('./shop/subscribe'));
router.use('/rss', require('./rss'));

module.exports = router;
