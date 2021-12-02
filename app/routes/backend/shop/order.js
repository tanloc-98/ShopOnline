var express = require('express');
var router 	= express.Router();

const controllerName = "order";

const systemConfig  = require(__path_configs + 'system');
const UtilsHelpers 	= require(__path_helpers + 'utils');
const CheckoutModel 	= require(__path_models + 'checkout');
const ParamsHelpers = require(__path_helpers + 'params');
const NotifyHelpers = require(__path_helpers + 'notify');
const notify  		= require(__path_configs + 'notify');

const linkIndex		 = '/' + systemConfig.prefixAdmin + `/shop/${controllerName}/`;
const pageTitleIndex = UtilsHelpers.capitalize(controllerName) + ' Management';
const folderView	 = __path_views_admin + `pages/shop/${controllerName}/`;
const folderLink     = `public/uploads/${controllerName}/`
// List items
router.get('/', async (req, res, next) => {
	let items = []

	let order_status =  systemConfig.status_order

	await CheckoutModel.listItems().then( item =>
		items = item
	)

	res.render(`${folderView}list`, {
		pageTitle: pageTitleIndex,
		folderLink,
		order_status,
		items,
		controllerName
	});
});

router.get('/change-status/:id/:status', async (req, res, next) => {
	let currentStatus	= ParamsHelpers.getParam(req.params, 'status', 'active'); 
	let id				= ParamsHelpers.getParam(req.params, 'id', ''); 
	CheckoutModel.changeStatus(id, currentStatus, {task: "update-one"}).then((result)=> {
		res.json({'currentStatus': currentStatus, 'message': notify.CHANGE_STATUS_SUCCESS, 'id': id})
	})

});

router.get('/detele/:id', async (req, res, next) => {
	let id				= ParamsHelpers.getParam(req.params, 'id', ''); 
	CheckoutModel.deleteItem(id, {task: 'delete-one'} )
	.then((result) => NotifyHelpers.show(req, res, linkIndex, {task: 'delete'}));
});

module.exports = router;
