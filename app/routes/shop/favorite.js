var express = require('express');
var router = express.Router();

const ParamsHelpers = require(__path_helpers + 'params');
const ArticleModel 	= require(__path_models + 'articleShop');

const folderView	 = __path_views_shop + 'pages/favorite/';
const layoutShop    = __path_views_shop + 'shop';

/* GET home page. */
router.get('/', async (req, res, next) => {

  res.render(`${folderView}index`,{
    layout:layoutShop,
  });
});

router.post('/', async (req, res, next) => {
  let favoriteItems = [];
  let ids = JSON.parse(JSON.stringify(req.body.favorite)).split(',')
  
  await ArticleModel.getListItemById(ids,null).then( (items) => { favoriteItems = items; });
  res.json(favoriteItems)
});
module.exports = router;
