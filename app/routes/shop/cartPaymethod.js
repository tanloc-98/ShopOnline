var express = require('express');
var router = express.Router();

const promotionModel 	= require(__path_models + 'promotion');
const notify 	= require(__path_configs + 'notify');

const folderView	 = __path_views_shop + 'pages/cartPaymethod/';
const layoutShop    = __path_views_shop + 'shop';

/* GET home page. */
router.get('/', async (req, res, next) => {
    res.render(`${folderView}index`,{
      layout:layoutShop,
    })
});

/* GET home page. */
router.post('/check-code-promotion', async (req, res, next) => {
  req.body = JSON.parse(JSON.stringify(req.body));
  let code = Object.assign(req.body);	
  let listCode = []
  let codeCheck = []
  await promotionModel.listCodePromotion().then( item => listCode = item)

  for(let i = 0; i < listCode.length; i++){
    if(listCode[i].code === code.promotion){
      codeCheck = JSON.parse(JSON.stringify(listCode[i]));
      break
    }
  }
  if(codeCheck.code === undefined){
    res.json({'error': notify.ERROR_CODE_PROMOTION})
  }else{
    res.json(codeCheck)
  }
});



module.exports = router;
