const util  = require('util');
const notify= require(__path_configs + 'notify');

const options = {
    name: { min: 5, max: 300 },
    title: { min: 5, max: 300 },
    ordering: { min: 0, max: 100 },
    link_product:{min: 0, max: 300},
    price:{value: 'novalue'},
    status: { value: 'novalue' },
    special: { value: 'novalue' },
    content: { min: 5, max: 20000 },
}

module.exports = {
   
    validator: (req) => {
        // NAME
        req.checkBody('name', util.format(notify.ERROR_NAME, options.name.min, options.name.max) )
            .isLength({ min: options.name.min, max: options.name.max })

         // LINK PRODUCT
        req.checkBody('link product', util.format(notify.ERROR_NAME, options.link_product.min, options.link_product.max) )
            .isLength({ min: options.link_product.min, max: options.link_product.max })

        // NAME
        req.checkBody('title', util.format(notify.ERROR_NAME, options.title.min, options.title.max) )
            .isLength({ min: options.title.min, max: options.title.max })

        // PRICE
        req.checkBody('price', notify.ERROR_STATUS)
          .isInt(options.price.value);

        // ORDERING
        req.checkBody('ordering', util.format(notify.ERROR_ORDERING, options.ordering.min, options.ordering.max))
            .isInt({gt: options.ordering.min, lt: options.ordering.max});
        
        // STATUS
        req.checkBody('status', notify.ERROR_STATUS)
            .isNotEqual(options.status.value);


        let errors = req.validationErrors() !== false ? req.validationErrors() : [];
        return errors;
    }
}