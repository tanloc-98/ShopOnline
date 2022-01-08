const MainModel 	= require(__path_schemas + 'articleShop');
const FileHelpers = require(__path_helpers + 'file');

module.exports = {
    listItems: (params, options = null) => {
        let objWhere    = {};
        let sort		= {};
        let findItem    = 'name title thumbs status slug price special ordering created modified category.name color size';


        if(params.currentStatus !== 'all') objWhere.status = params.currentStatus;
        if(params.keyword !== '') objWhere.name = new RegExp(params.keyword, 'i');
        if(params.categoryID !== 'allvalue' && params.categoryID !== '') objWhere['category.id'] = params.categoryID;
        sort[params.sortField]  = params.sortType;
    
        return MainModel
            .find(objWhere)
            .select(findItem)
            .sort(sort)
            .skip((params.pagination.currentPage-1) * params.pagination.totalItemsPerPage)
            .limit(params.pagination.totalItemsPerPage);
    },
    listItemsSearch: (params, options = null) =>{
        let objWhere    = {};
        let sort		= {};
        if(params.keyword !== '') objWhere.name = new RegExp(params.keyword, 'i');

        return MainModel
            .find(objWhere)
            .select('id name slug title thumbs price color size category.name')
            .sort(sort)
            .limit(10);
    },

    searchProducts: (params,options = null) =>{
        let find = {};
        //article
        if (options.task == 'items-in-size'){
            find = {status:'active'}   
        }

        if (options.task == 'items-in-range'){ 
            let firstPrice = params.firstPrice
            let lastPrice = params.lastPrice
            find = {status:'active', 'price': {
                $gte: firstPrice,
                $lte: lastPrice
              }}   
        }


        return MainModel.find(find)
    },
    listItemsFrontend: (params = null, options = null) => {
        let find = {};
        let select = '';
        let limit = {};
        let sort = '';
        //FEATURES
        if(options.task === 'features'){
            find = {status:'active',special:'active'};
            select = 'id name slug title thumbs price color size category.name'
            limit = 6;
            sort = {'created.time': 'desc'};
        }
        if(options.task === 'popular'){
            find = {status:'active'};
            select = 'id name slug thumbs title price color size category.name'
            limit = 12;
            sort = {'created.time': 'desc'};
        } 
        //Category Items 
        if(options.task === 'category_items'){
            find = {status:'active','category.slug': params};
            select = 'id name slug thumbs title price color size category.name'
            limit = 12;
            sort = {'created.time': 'desc'};
        } 
         //Retaled Items 
        if(options.task === 'related_items'){
            find = {status:'active','slug': {$ne:params.slug},'category.slug': params.category.slug};
            select = 'id name slug thumbs title price color size category.name'
            limit = 5;
            sort = {'created.time': 'desc'};
        } 

        return MainModel.find(find).select(select).limit(limit).sort(sort);
    },
    getItem: (id, options = null) => {
        return MainModel.findById(id);
    },
    getListItemById: (ids, options = null) => {
        let newIds = []
        for(i = 0; i < ids.length; i++){
            newIds.push(ids[i].slice(1, -1));
        }
        return MainModel.find({ '_id': { $in: newIds } });
    },
    getItemFrontEnd:(id, options = null) =>{
        return MainModel.findById(id).select('id name slug thumbs title price color size category content');
    },
    countItem: (params, options = null) => {
        let objWhere    = {};
        if(params.categoryID !== 'allvalue' && params.categoryID !== '') objWhere['cateogry.id'] = params.categoryID; 
        if(params.currentStatus !== 'all') objWhere.status = params.currentStatus;
        if(params.keyword !== '') objWhere.name = new RegExp(params.keyword, 'i');

        return MainModel.count(objWhere);
    },


    
    changeStatus: (id, currentStatus, options = null) => {
        let status			= (currentStatus === "active") ? "inactive" : "active";
        let data 			= {
            status: status,
            modified: {
                user_id: 0,
                user_name: 0,
                time: Date.now()
            }
        }

        if(options.task == "update-one"){
            return MainModel.updateOne({_id: id}, data);
        }

        if(options.task == "update-multi"){
            data.status = currentStatus;
            return MainModel.updateMany({_id: {$in: id }}, data);
        }
    },
    
    changeSpecial: (id, currentSpecial, options = null) => {
        let special			= (currentSpecial === "active") ? "inactive" : "active";
        let data 			= {
            special: special,
            modified: {
                user_id: 0,
                user_name: 0,
                time: Date.now()
            }
        }

        if(options.task == "update-one"){
            return MainModel.updateOne({_id: id}, data);
        }

        if(options.task == "update-multi"){
            data.special = currentSpecial;
            return MainModel.updateMany({_id: {$in: id }}, data);
        }
    },
    changeOrdering: async (cids, orderings, options = null) => {
        let data = {
            ordering: parseInt(orderings), 
            modified:{
                user_id: 0,
                user_name: 0,
                time: Date.now()
                }
            };

        if(Array.isArray(cids)) {
            for(let index = 0; index < cids.length; index++) {
                data.ordering = parseInt(orderings[index]);
                await MainModel.updateOne({_id: cids[index]}, data)
            }
            return Promise.resolve("Success");
        }else{
            return MainModel.updateOne({_id: cids}, data);
        }
    },

    deleteItem:  async (id, options = null, item) => {
        let linkUploadImg = 'public/uploads/article/';
        
        if(options.task == "delete-one") {
            await MainModel.findById(id).then((item) =>{
                FileHelpers.remove(linkUploadImg, item.thumbs)
            })
            return MainModel.deleteOne({_id: id});
        }

        if(options.task == "delete-mutli") {
            if(Array.isArray(id)){
                for(let index = 0;index < id.length; index++){
                    await MainModel.findById(id[index]).then((item) =>{
                        FileHelpers.remove(linkUploadImg, item.thumbs)
                    })
                }
            }else{
                await MainModel.findById(id).then((item) =>{
                    FileHelpers.remove(linkUploadImg, item.thumbs)
                })
            }
            return MainModel.deleteMany({_id: {$in: id } });
        }
        if(options.task == "delete-img") {
            thumbs = item.thumbs.split(',')
            await FileHelpers.removeOne(linkUploadImg, item.thumb)
            return MainModel.updateOne({_id: item.id}, {
                thumbs: thumbs,
			});
        }
    },

    saveItem: (item, options = null) => {
        if(options.task == "add") {
            item.created = {
				user_id : 0,
				user_name: "admin",
				time: Date.now()
			}
            item.category = {
                id: item.category_id,
                name: item.category_name,
                slug: item.category_slug,
            }
			return new MainModel(item).save();
        }

        if(options.task == "edit") {
            return MainModel.updateOne({_id: item.id}, {
                ordering: parseInt(item.ordering),
                price: parseInt(item.price),
                size: item.size,
				name: item.name,
                slug: item.slug,
                title: item.title,
                status: item.status,
                special: item.special,
                color: item.color,
                content: item.content,
                thumbs: item.thumbs,
                category: {
                    id: item.category_id,
                    name: item.category_name,
                    slug: item.category_slug,
                },
				modified: {
					user_id : 0,
        			user_name: 0,
        			time: Date.now()
				}
			});
        }
        if(options.task == "change-category-name") {
            return MainModel.updateMany({'category.id': item.id}, {
				category: {
                    id: item.id,
					name: item.name,
                    slug: item.slug,
				},
			});
        }
    }
}