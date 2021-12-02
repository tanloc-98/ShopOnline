var express = require('express');
var router = express.Router();

const checkoutModel 	= require(__path_models + 'checkout');
const notify 	= require(__path_configs + 'notify');

const folderView	 = __path_views_shop + 'pages/tracking/';
const layoutShop    = __path_views_shop + 'shop';

/* GET home page. */
router.get('/', async (req, res, next) => {
    res.render(`${folderView}index`,{
      layout:layoutShop,
    })
});

router.post('/check-orders', async (req, res, next) => {
  let code = JSON.parse(JSON.stringify(req.body))
  let itemCheck = []
  await checkoutModel.getItemByCode(code,null).then(item => itemCheck = JSON.parse(JSON.stringify(item)))
  

  if(itemCheck.length === 0){
    res.json({error: notify.ERROR_CODE_PROMOTION})
  }else{
    res.json({'items': itemCheck})
  }

});



module.exports = router;
