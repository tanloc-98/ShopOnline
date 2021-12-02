var express = require('express');
var router = express.Router();


const shippingModel 	= require(__path_models + 'feeShipping');

const folderView	 = __path_views_shop + 'pages/cartAddress/';
const layoutShop    = __path_views_shop + 'shop';

/* GET home page. */
router.get('/', async (req, res, next) => {
    res.render(`${folderView}index`,{
      layout:layoutShop,
    })
});

router.get('/fee-shipping', async (req, res, next) => {

  await shippingModel.listItemsFrontend(null, task = "shipping").then( items =>
    res.json({'items' : items})
  )

});
module.exports = router;
