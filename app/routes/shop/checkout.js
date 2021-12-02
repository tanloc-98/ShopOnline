var express = require('express');
var router = express.Router();

const checkoutModel 	= require(__path_models + 'checkout');
const StringHelpers = require(__path_helpers + 'string');
const nodemailer = require("nodemailer");

const folderView	 = __path_views_shop + 'pages/checkout/';
const layoutShop    = __path_views_shop + 'shop';

/* GET home page. */
router.get('/', async (req, res, next) => {
    res.render(`${folderView}index`,{
      layout:layoutShop,
    })
});

/* GET home page. */
router.post('/', async (req, res, next) => {
  let item = JSON.parse(JSON.stringify(req.body))
  let checkout = {}

  checkout.cart = item['checkout[cart]']
  checkout.infoCutomer = item['checkout[infoCutomer]']
  checkout.lastPrice = item['checkout[lastPrice]']
  checkout.method = item['checkout[method]']
  checkout.codePromo = item['checkout[codePromo]']
  checkout.status = "accepted";
  checkout.codeCheck  = StringHelpers.randomText(6);

  let customer =  JSON.parse(item['checkout[infoCutomer]'])
  let email = customer.email;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'tanloc21150@gmail.com',
      pass: 'loc123456',
    },
  });


  let mailOptions ={
    from: 'tanloc21150@gmail.com',
    to: `${email}`,
    subject: "Confirm", // Subject line
    text: "Confirm Orders", // plain text body
    html: `<b>Code check Product: ${checkout.codeCheck}</b>`,
  }

  transporter.sendMail(mailOptions, (error, info) =>{
    if(checkout.method === 'card'){
      checkout.card = item['checkout[card]']
      checkoutModel.saveItem(checkout,task = 'card').then((result) => {
      		res.json({'item': item})
      });
    }
    if(checkout.method === 'paypal' || checkout.method === 'bank'){
      checkout.account = item['checkout[account]']
        checkoutModel.saveItem(checkout,task = 'account').then((result) => {
          res.json({'item': item})
      });
    }
  })

  
});



module.exports = router;
