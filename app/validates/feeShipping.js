const util  = require('util');
const notify= require(__path_configs + 'notify');

const options = {
    method: { min: 1, max: 300 },
    price: { min: 1, max: 10000 },
    status: { value: 'novalue' },
}

module.exports = {
   
    validator: (req) => {
        // NAME
        req.checkBody('method', util.format(notify.ERROR_NAME, options.method.min, options.method.max) )
            .isLength({ min: options.method.min, max: options.method.max })

        // price
        req.checkBody('price', util.format(notify.ERROR_STATUS) )
            .isInt({ gt: options.price.min, lt: options.price.max })

        // STATUS
        req.checkBody('status', notify.ERROR_STATUS)
            .isNotEqual(options.status.value);

        let errors = req.validationErrors() !== false ? req.validationErrors() : [];
        return errors;
    }
}