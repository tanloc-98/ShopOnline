var express = require('express');
var router = express.Router();

const SliderModel 	= require(__path_models + 'slider');
const ArticleModel 	= require(__path_models + 'articleShop');
const BannerModel 	= require(__path_models + 'banner');
const ParamsHelpers = require(__path_helpers + 'params');

const folderView	 = __path_views_shop + 'pages/home/';
const layoutShop    = __path_views_shop + 'shop';

/* GET home page. */
router.get('/', async (req, res, next) => {
  let sliderItems = [];
  let popularItems = [];
  let bannerItem = [];

  /* SliderShow Items */
  await SliderModel.listItemsFrontend(null, {task: 'slider'} ).then( (items) => { sliderItems = items; });

   /* Popular Items */
   await ArticleModel.listItemsFrontend(null, {task: 'popular'} ).then( (items) => { popularItems = items; });

   /* Banner Items */
   await BannerModel.listItemsFrontend(null, {task: 'banner'} ).then( (items) => { bannerItem = items; });
  res.render(`${folderView}index`,{
    layout:layoutShop,
    sliderItems,
    popularItems,
    bannerItem
  });
});

router.get('/pagination(/status/:status)?', async (req, res, next) => {
  let params 		 	 = ParamsHelpers.createParam(req);

  await ArticleModel.countItem(params).then( (data) => { params.pagination.totalItems = data; });
  
  await ArticleModel.listItems(params).then( items => listItems = items)

  res.json({'items': listItems, 'params': params})
});

module.exports = router;
