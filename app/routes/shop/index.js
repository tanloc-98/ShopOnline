var express = require('express');
var router = express.Router();

const middleBranchBw       = require(__path_middleware + 'get-branch-shop');
const middleItemsFeatures     = require(__path_middleware + 'get-article-features-shop');
const middleBanner     = require(__path_middleware + 'get-banner-ads');

router.use('/auth', require('./auth'));
router.use('/',middleBranchBw,middleItemsFeatures,middleBanner, require('./home'));
router.use('/cart-products', require('./cart'));
router.use('/cart-address', require('./cartAddress'));
router.use('/payment-method', require('./cartPaymethod'));
router.use('/register', require('./register'));
router.use('/check-out', require('./checkout'));
router.use('/tracking', require('./tracking'));
router.use('/favorite', require('./favorite'));
router.use('/', require('./category'));
router.use('/', require('./article'));

module.exports = router;