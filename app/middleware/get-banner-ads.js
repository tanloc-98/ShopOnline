const BannerModel 	= require(__path_models + 'banner');
const contactConfig  = require(__path_configs + 'contact');

module.exports = async(req, res, next) => {
    
    await BannerModel
        .listItemsFrontend(null, {task: 'banner'} )
        .then( (items) => { res.locals.bannerItem = items; });
    res.locals.contact = contactConfig
    next();
}