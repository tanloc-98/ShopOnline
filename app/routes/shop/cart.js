var express = require('express');
var router = express.Router();

const ParamsHelpers = require(__path_helpers + 'params');
const ArticleModel 	= require(__path_models + 'articleShop');

const folderView	 = __path_views_shop + 'pages/cart/';
const layoutShop    = __path_views_shop + 'shop';

/* GET home page. */
router.get('/', async (req, res, next) => {
    res.render(`${folderView}index`,{
      layout:layoutShop,
    })
});

router.post('/add-to-cart', async (req, res, next) => {
  req.body =   JSON.parse(JSON.stringify(req.body))
  let item = req.body;
  let itemNew = []
  let quantity = 0;
  
  await ArticleModel.getItem(item.id,null).then( item =>{
      itemNew = item
  })

  let infoItem = {'name': itemNew.name,  'thumb': itemNew.thumbs[0],'price':itemNew.price, 'quantity': quantity}
  let cartItem = {"id": item.id,"color": item.color,"size":item.size, "info": infoItem}

  res.json(cartItem);
});

module.exports = router;
