const MainModel 	= require(__path_schemas + 'checkout');
const FileHelpers = require(__path_helpers + 'file');

module.exports = {
    listItems: (params, options = null) => {
        let objWhere    = {};
        let sort		= {};
        let findItem    = '_id created code cart infoCutomer lastPrice method codePromo status account card';
    
        return MainModel
            .find(objWhere)
            .select(findItem)
            .sort(sort)
    },
    listItemsSearch: (params, options = null) =>{
        let objWhere    = {};
        let sort		= {};
        if(params.keyword !== '') objWhere.name = new RegExp(params.keyword, 'i');

        return MainModel
            .find(objWhere)
            .select('_id created cart code infoCutomer lastPrice method codePromo status account card')
            .sort(sort)
            .limit(10);
    },
    getItemByCode: (params, options = null) => {
        return MainModel.find({'code': params.code});
    },
    getItem: (id, options = null) => {
        return MainModel.findById(id);
    },
    getItemFrontEnd:(id, options = null) =>{
        return MainModel.findById(id).select('created cart infoCutomer lastPrice method codePromo status account card');
    },
   
    changeStatus: (id, currentStatus, options = null) => {
        let status			= currentStatus
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

    deleteItem: (id, options = null) => {
        if(options.task == "delete-one") {
            return MainModel.deleteOne({_id: id});
        }

        if(options.task == "delete-mutli") {
            return MainModel.remove({_id: {$in: id } });
        }
    },

    saveItem: (item, options = null) => {
            item.code = item.codeCheck
            if(options.task === 'card'){
                item.card = item.card
            }
            if(options.task === 'account'){
                item.account = item.accountBank
            }
            item.created = {
                user_id : 0,
				user_name: "admin",
				time: Date.now()
			}
            return new MainModel(item).save();
    }
}