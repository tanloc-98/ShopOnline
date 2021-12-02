var express = require('express');
var router = express.Router();

const UsersModel 	= require(__path_models + 'users');

const folderView	 = __path_views_shop + 'pages/register/';
const layoutShop    = __path_views_shop + 'shop';

/* GET home page. */
router.get('/', async (req, res, next) => {

  res.render(`${folderView}index`,{
    layout:layoutShop,
  });
});

router.post('/', async (req, res, next) => {
  let item = JSON.parse(JSON.stringify(req.body))
  item.ordering = 0;
  item.status = 'active';
  let user = []
  await UsersModel.saveItem(item, {task:'add'})
  res.json({'user': user})
});



module.exports = router;
