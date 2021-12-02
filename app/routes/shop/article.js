var express = require('express');
var router = express.Router();

const ParamsHelpers = require(__path_helpers + 'params');
const ArticleModel 	= require(__path_models + 'articleShop');

const folderView	 = __path_views_shop + 'pages/article/';
const layoutShop    = __path_views_shop + 'shop';

/* GET home page. */
router.get('/:slug/:id', async (req, res, next) => {
  const id = req.originalUrl.split('/')[3]
  let itemById     = [];
  let itemsRelated = [];

  //Items get by ID
  await ArticleModel.getItemFrontEnd(id,null).then( item =>{
    itemById = item
  })
  //Related Items
  await ArticleModel.listItemsFrontend(itemById,{task:'related_items'}).then( item =>{
    itemsRelated = item
  })

  res.render(`${folderView}index`,{
    layout:layoutShop,
    search:true,
    itemById,
    itemsRelated
  });
});





module.exports = router;
