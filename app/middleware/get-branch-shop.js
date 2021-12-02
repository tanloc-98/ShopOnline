const BranchModel 	= require(__path_models + 'branch');

module.exports = async(req, res, next) => {
    
    await BranchModel
        .listItemsFrontend(null, {task: 'bg-white'} )
        .then( (items) => { res.locals.bwBranchItems = items; });
    await BranchModel
        .listItemsFrontend(null, {task: 'bg-black'} )
        .then( (items) => { res.locals.bbBranchItems = items; });

    next();
}