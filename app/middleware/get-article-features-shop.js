const ArticleModel 	= require(__path_models + 'articleShop');

module.exports = async(req, res, next) => {
    
    await ArticleModel
        .listItemsFrontend(null, {task: 'features'} )
        .then( (items) => { res.locals.featuresItems = items; });
    next();
}