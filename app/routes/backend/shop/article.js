var express = require('express');
var router 	= express.Router();

const controllerName = "article";

const systemConfig  = require(__path_configs + 'system');
const MainModel 	= require(__path_models + 'articleShop');
const CategoryModel = require(__path_models + 'categoriesShop');
const MainValidate	= require(__path_validates + 'articleshop');
const UtilsHelpers 	= require(__path_helpers + 'utils');
const NotifyHelpers = require(__path_helpers + 'notify');
const FileHelpers   = require(__path_helpers + 'file');
const ParamsHelpers = require(__path_helpers + 'params');
const notify  		= require(__path_configs + 'notify');


const linkIndex		 = '/' + systemConfig.prefixAdmin + `/shop/${controllerName}/`;
const pageTitleIndex = UtilsHelpers.capitalize(controllerName) + ' Management';
const pageTitleAdd   = pageTitleIndex + ' - Add';
const pageTitleEdit  = pageTitleIndex + ' - Edit';
const folderView	 = __path_views_admin + `pages/shop/${controllerName}/`;	
const uploadThumb	 = FileHelpers.uploadMulti('thumbs', controllerName);
const folderLink     = `public/uploads/${controllerName}/`
// List items
router.get('(/status/:status)?', async (req, res, next) => {
	let params 		 	 = ParamsHelpers.createParam(req);
	let statusFilter = await UtilsHelpers.createFilterStatus(params.currentStatus, 'articleShop');
	await MainModel.countItem(params).then( (data) => { params.pagination.totalItems = data; });

	let categoryItems	= [];
	await CategoryModel.listItemsInSelectbox().then((items)=> {
		categoryItems = items;
		categoryItems.unshift({_id: 'allvalue', name: 'All category'});
	});

	MainModel.listItems(params)
		.then( (items) => {
			res.render(`${folderView}list`, {
				pageTitle: pageTitleIndex,
				controllerName,
				items,
				statusFilter,
				params,
				categoryItems,
			});
		});
});

// Change status
router.get('/change-status/:id/:status', (req, res, next) => {
	let currentStatus	= ParamsHelpers.getParam(req.params, 'status', 'active'); 
	let id				= ParamsHelpers.getParam(req.params, 'id', ''); 

	MainModel.changeStatus(id, currentStatus, {task: "update-one"}).then((result)=> {
		res.json({'currentStatus': currentStatus, 'message': notify.CHANGE_STATUS_SUCCESS, 'id': id})
	})
});

// Change status - Multi
router.post('/change-status/:status', (req, res, next) => {
	let currentStatus	= ParamsHelpers.getParam(req.params, 'status', 'active'); 
	MainModel.changeStatus(req.body.cid, currentStatus, {task: "update-multi"})
	.then((result) => NotifyHelpers.show(req, res, linkIndex, {task: 'change-multi-status', total: result.n}));
});

// Change special
router.get('/change-special/:id/:special', (req, res, next) => {
	let currentSpecial	= ParamsHelpers.getParam(req.params, 'special', 'active'); 
	let id				= ParamsHelpers.getParam(req.params, 'id', ''); 
	MainModel.changeSpecial(id, currentSpecial, {task: "update-one"}).then((result)=> {
		res.json({'currentSpecial': currentSpecial, 'id': id})
	})
});


// Change ordering - Multi
router.post('/change-ordering', (req, res, next) => {
	let cids 		= req.body.cid;
	let orderings 	= req.body.ordering;
	
	MainModel.changeOrdering(cids, orderings, null)
	.then((result)=> NotifyHelpers.show(req, res, linkIndex, {task: 'change-ordering'}));
});

// Delete
router.get('/delete/:id', async (req, res, next) => {
	let id				= ParamsHelpers.getParam(req.params, 'id', ''); 
	MainModel.deleteItem(id, {task: 'delete-one'} )
	.then((result) => NotifyHelpers.show(req, res, linkIndex, {task: 'delete'}));
});

// Delete - Multi
router.post('/delete', (req, res, next) => {
	MainModel.deleteItem(req.body.cid, {task: 'delete-mutli'} )
	.then((result) =>  NotifyHelpers.show(req, res, linkIndex, {task: 'delete-multi', total: result.n}));
});

router.post('/delete-img', async (req, res, next) => {
	req.body = JSON.parse(JSON.stringify(req.body));
	let item = req.body;

	await MainModel.deleteItem(null, {task:'delete-img'}, item).then((result) => {
		res.json({'item': item, 'notify' : notify.DELETE_IMG_SUCCESS})
	});
})
// FORM

router.get(('/form(/:id)?'), async (req, res, next) => {
	let id		= ParamsHelpers.getParam(req.params, 'id', '');
	let item	= {name: '', ordering: 0, status: 'novalue', category_id: '', category_name: '',category_slug: ''}
	let errors  = null;

	let categoryItems	= [];
	await CategoryModel.listItemsInSelectbox().then((items)=> {
		categoryItems = items;
		
		categoryItems.unshift({_id: 'allvalue', name: 'All category'});
	});
	
	if(id === '') { // ADD
		res.render(`${folderView}form`, { pageTitle: pageTitleAdd, controllerName, item, errors, categoryItems});
	}else { // EDIT
		MainModel.getItem(id).then( (item) =>{
			item.category_id = item.category.id;
			item.category_name = item.category.name;
			item.category_slug = item.category.slug;
			res.render(`${folderView}form`, { pageTitle: pageTitleEdit, controllerName, item, errors, categoryItems});
		});	
	}
});
// SAVE = ADD EDIT
router.post('/save', async(req, res, next) => {

	uploadThumb(req, res, async (errUpload) => {
		req.body = JSON.parse(JSON.stringify(req.body));
		let item = Object.assign(req.body);
		let taskCurrent	= (typeof item !== "undefined" && item.id !== "") ? "edit" : "add";
		let errors = MainValidate.validator(req, errUpload, taskCurrent);
		if(errors.length > 0) { 
			let pageTitle = (taskCurrent == "add") ? pageTitleAdd : pageTitleEdit;
			let filesName = [];

			for(i = 0; i < req.files.length; i++){
				filesName.push(req.files[i].filename);
			}
			
			if(req.files != undefined) FileHelpers.remove(folderLink,filesName); // xóa tấm hình khi form không hợp lệ

			let categoryItems	= [];
			await CategoryModel.listItemsInSelectbox().then((items)=> {
				categoryItems = items;
				categoryItems.unshift({_id: 'allvalue', name: 'All category'});
			});
			res.json({'errors': errors})
		}else {
			let message = (taskCurrent == "add") ? NotifyHelpers.EDIT_SUCCESS : NotifyHelpers.EDIT_SUCCESS;
			// if(req.files == undefined){
			// 	item.thumb = item.image_old;
			// }else{
			// 	item.thumb = req.file.filename;
			// 	if(taskCurrent == "edit") FileHelpers.removeOne(folderLink, item.image_old);
			// }
			var arrayThumb = []
			var valueImg   = item.valueImg.split(',')
			if(valueImg === undefined){
				for(let idx = 0; idx < req.files.length; idx++) {
					arrayThumb.push(req.files[idx].filename);
				}	
			}{
				arrayThumb = valueImg;
				for(let idx = 0; idx < req.files.length; idx++) {
					arrayThumb.push(req.files[idx].filename);
				}
			}

			for( var i = 0; i < arrayThumb.length; i++){ 
                                   
				if ( arrayThumb[i] === 'undefined') { 
					arrayThumb.splice(i, 1); 
					i--; 
				}
			}
		
			item.thumbs = arrayThumb;

			MainModel.saveItem(item, {task: taskCurrent}).then((result) => 
				{res.json({'item': item , notify: notify.SEND_SUCCESS })}
			);
		}
		
	});
});

// SORT
router.get(('/sort/:sort_field/:sort_type'), (req, res, next) => {
	req.session.sort_field		= ParamsHelpers.getParam(req.params, 'sort_field', 'ordering');
	req.session.sort_type		= ParamsHelpers.getParam(req.params, 'sort_type', 'asc');
	res.redirect(linkIndex);
});

// FILTER CATEGORY
router.get(('/filter-category/:category_id'), (req, res, next) => {
	req.session.category_id		= ParamsHelpers.getParam(req.params, 'category_id', '');
	res.redirect(linkIndex);
});



module.exports = router;
