const util  = require('util');
const notify= require(__path_configs + 'notify');

const options = {
    name: { min: 1, max: 300 },
    price: { min: 1, max: 10000 },
    quantity: { min: 1, max: 100 },
    ordering: { min: 0, max: 100 },
    status: { value: 'novalue' },
}

module.exports = {
   
    validator: (req) => {
        // NAME
        req.checkBody('name', util.format(notify.ERROR_NAME, options.name.min, options.name.max) )
            .isLength({ min: options.name.min, max: options.name.max })

        // price
        req.checkBody('price', util.format(notify.ERROR_STATUS, options.price.min, options.price.max) )
            .isInt({ gt: options.price.min, lt: options.price.max })
        
        // ORDERING
        req.checkBody('ordering', util.format(notify.ERROR_ORDERING, options.ordering.min, options.ordering.max) )
            .isInt({ gt: options.ordering.min, lt: options.ordering.max })

        
        // ORDERING
        req.checkBody('quantity', util.format(notify.ERROR_ORDERING) )
        .isInt({ gt: options.quantity.min, lt: options.quantity.max })

        // STATUS
        req.checkBody('status', notify.ERROR_STATUS)
            .isNotEqual(options.status.value);

        let errors = req.validationErrors() !== false ? req.validationErrors() : [];
        return errors;
    }
}