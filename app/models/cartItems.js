const MainModel 	= require(__path_schemas + 'cartItems');
const FileHelpers = require(__path_helpers + 'file');

module.exports = {
    listItems: (params, options = null) => {
        let objWhere    = {};
        let sort		= {};
        let findItem    = 'id name title thumbs status slug price special ordering created modified category.name sale color size quantity';


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
            .select('name slug title thumbs status price special ordering created modified category')
            .sort(sort)
            .limit(10);
    },

    searchProducts: (params,options = null) =>{
        let find = {};
        //article
        if (options.task == 'items-in-size'){ 
            let size = params.size;
            find = {status:'active'}   
        }

        if (options.task == 'items-in-range'){ 
            let firstPrice = params.firstPrice.split("$");
            let lastPrice = params.lastPrice.split("$");
            find = {status:'active', 'price': {
                $gte: firstPrice[1],
                $lte: lastPrice[1]
              }}   
        }


        return MainModel.find(find)
    },
    listItemsFrontend: (params = null, options = null) => {
        let find = {};
        let select = '';
        let limit = {};
        let sort = '';
        //article
        if (options.task == 'item-article'){
            limit = 1;    
            find = {status:'active', 'slug': params}   
        }

        //FEATURES
        if(options.task === 'items-features'){
            find = {status:'active'};
            limit = 8;
            sort = {'created.time': 'desc'};
        }      

        //All Products
        if(options.task === 'all-products'){
            find = {status:'active'};
            limit = 12;
            sort = {'created.time': 'desc'};
        }
        //All Products
        if(options.task === 'items-category'){
            find = {status:'active','category.slug' : params.slug};
            limit = 12;
            sort = {'created.time': 'desc'};
        }
        //category
        if (options.task == 'items-in-category'){
            limit = 4;
            find = {status:'active', 'category.slug': params.slug};
            sort = {'created.time': 'desc'};   
        }      


        return MainModel.find(find).select(select).limit(limit).sort(sort);
    }
    ,
    
    getItem: (id, options = null) => {
        return MainModel.findById(id);
    },

    getItemFrontEnd:(id, options = null) =>{
        return MainModel.findById(id).select('name slug title thumb status created decription category.name category.id');
    },

    countItem: (params, options = null) => {
        let objWhere    = {};
        if(params.categoryID !== 'allvalue' && params.categoryID !== '') objWhere['cateogry.id'] = params.categoryID; 
        if(params.currentStatus !== 'all') objWhere.status = params.currentStatus;
        if(params.keyword !== '') objWhere.name = new RegExp(params.keyword, 'i');

        return MainModel.count(objWhere);
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
           
			return new MainModel(item).save();
        }
    }
}