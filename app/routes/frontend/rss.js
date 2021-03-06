var express = require('express');
var router = express.Router();
var RSSCombiner = require('rss-combiner');
var fs = require('fs');
var https = require('https');
require('https').globalAgent.options.rejectUnauthorized = false;
var parseString = require('xml2js').parseString;

const contactConfig  = require(__path_configs + 'contact');
const RssModel 	= require(__path_models + 'rss');

const folderView	 = __path_views_blog + 'pages/rss/';
const layoutBlog    = __path_views_blog + 'frontend';

function xmlToJson(url, callback) {
  var req = https.get(url, function(res) {
    var xml = '';
    
    res.on('data', function(chunk) {
      xml += chunk;
    });
    
    res.on('error', function(e) {
      callback(e, null);
    }); 
    
    res.on('timeout', function(e) {
      callback(e, null);
    }); 
    
    res.on('end', function() {
      parseString(xml, function(err, result) {
        callback(null, result);
      });
    });
  });
}

/* GET rss page. */
router.get('/', async (req, res, next) => {

  let linkRss = [];
  let contact = contactConfig;
  await RssModel.listItemsFrontend(null, {task: 'link-rss'}).then( items =>
    items.forEach( item =>{
      linkRss = [...linkRss, item.link]
    })
  );

  var feedConfig = {
    title: 'asd',
    size: 20,
    feeds: linkRss,
    pubDate: new Date()
  };

  await RSSCombiner(feedConfig, function (err, combinedFeed) {
    if (err) {
      console.error(err);
    } else {
      const itemsNewsRss = combinedFeed.item().items;
        res.render(`${folderView}index`,{
          layout:layoutBlog,
          top_post:false,
          itemsNewsRss,
          contact,
          pageTitle:'Tin tức tổng hợp',
          titleCategory:false,
          titleArticle:false,
        });
    }
  });
});


router.get('/gold', async (req, res, next) => {
  var url  = "https://www.sjc.com.vn/xml/tygiavang.xml";

  await xmlToJson(url, function(err, data){
    
    let items = data.root.ratelist[0].city[0].item;
    res.json(items);
  })
});

router.get('/coin', async (req, res, next) => {
  const rp = require('request-promise');
  const requestOptions = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    qs: {
      'start': '1',
      'limit': '10',
      'convert': 'USD'
    },
    headers: {
      'X-CMC_PRO_API_KEY': 'cfaabb5d-1d15-4c79-be1d-1d99f661e1b7'
    },
    json: true,
    gzip: true
  };

  await rp(requestOptions).then(response => {
    res.json(response.data);
  })

});
module.exports = router;
