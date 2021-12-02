var express = require('express');
var router = express.Router();

const ParamsHelpers = require(__path_helpers + 'params');
const ArticleModel 	= require(__path_models + 'articleShop');

const folderView	 = __path_views_shop + 'pages/category/';
const layoutShop    = __path_views_shop + 'shop';

/* GET home page. */
router.get('/category', async (req, res, next) => {
  let popularItems = [];

  /* Popular Items */
  await ArticleModel.listItemsFrontend(null, {task: 'popular'} ).then( (items) => { popularItems = items; });

  res.render(`${folderView}index`,{
    layout:layoutShop,
    popularItems,
  });
});

router.post('/:slug', async (req, res, next) => {
  let slug      = ParamsHelpers.getParam(req.params, 'slug', '');
  let categoryItems = [];
  /* Popular Items */
  await ArticleModel.listItemsFrontend(slug, {task: 'category_items'} ).then( (items) => { categoryItems = items; });
  res.json({'items': categoryItems})
});

router.get('/search', async (req, res, next) => {
  let search = req.query;
  let listItemsSearch = [];
  let itemsNew = []
  await ArticleModel.searchProducts(null,task='items-in-size').then( items =>{itemsNew = items})
  if(search.hasOwnProperty('keyword')){
    await ArticleModel.listItemsSearch(search,null).then( items =>{listItemsSearch = items})
  }

  if(search.hasOwnProperty('size')){
    listItemsSearch = itemsNew.filter(item => item.size.includes(search.size))
  }
  if(search.hasOwnProperty('color')){
    listItemsSearch = itemsNew.filter(item => item.color.includes(search.color))
  }
  if(search.hasOwnProperty('firstPrice') && search.hasOwnProperty('lastPrice')){
    await ArticleModel.searchProducts(search, {task: 'items-in-range'}).then(items => listItemsSearch = items)
  }
  res.json(listItemsSearch)
});

module.exports = router;
