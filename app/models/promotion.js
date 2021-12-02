const MainModel 	= require(__path_schemas + 'promotion');

module.exports = {
    listItems: (params, options = null) => {
        let objWhere    = {};
        let sort		= {};
        let findItem    = 'name price quantity code status ordering';


        if(params.currentStatus !== 'all') objWhere.status = params.currentStatus;
        if(params.keyword !== '') objWhere.name = new RegExp(params.keyword, 'i');
        sort[params.sortField]  = params.sortType;
    
        return MainModel
            .find(objWhere)
            .select(findItem)
            .sort(sort)
            .skip((params.pagination.currentPage-1) * params.pagination.totalItemsPerPage)
            .limit(params.pagination.totalItemsPerPage);
    },
    listCodePromotion: (params = null, options = null) => {
        let find = {status: "active"}
        let select = 'name code price'

        return MainModel.find(find).select(select);
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

    deleteItem:  async (id, options = null, item) => {
        let linkUploadImg = 'public/uploads/article/';
        
        if(options.task == "delete-one") {
            return MainModel.deleteOne({_id: id});
        }

        if(options.task == "delete-mutli") {
            return MainModel.deleteMany({_id: {$in: id } });
        }
    },

    saveItem: (item, options = null) => {
        if(options.task == "add") {
            item.created = {
				user_id : 0,
				user_name: "admin",
				time: Date.now()
			}
			return new MainModel(item).save();
        }

        if(options.task == "edit") {
            return MainModel.updateOne({_id: item.id}, {
                price: parseInt(item.price),
                ordering: parseInt(item.ordering),
                qunatity: parseInt(item.qunatity),
				name: item.name,
                status: item.status,
				modified: {
					user_id : 0,
        			user_name: 0,
        			time: Date.now()
				}
			});
        }
    }
}