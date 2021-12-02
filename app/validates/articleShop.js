const util  = require('util');
const notify= require(__path_configs + 'notify');

const options = {
    name: { min: 1, max: 300 },
    title: { min: 1, max: 300 },
    price: { min: 1, max: 10000 },
    ordering: { min: 0, max: 100 },
    size: { min: 1, max: 300 },
    color: { min: 1, max: 300 },
    status: { value: 'novalue' },
    special: { value: 'novalue' },
    content: { min: 5, max: 20000 },
}

module.exports = {
   
    validator: (req) => {
        // NAME
        req.checkBody('name', util.format(notify.ERROR_NAME, options.name.min, options.name.max) )
            .isLength({ min: options.name.min, max: options.name.max })

        // title
        req.checkBody('title', util.format(notify.ERROR_NAME, options.title.min, options.title.max) )
            .isLength({ min: options.title.min, max: options.title.max })

        // price
        req.checkBody('price', util.format(notify.ERROR_STATUS) )
            .isInt({ gt: options.price.min, lt: options.price.max })

        // size
        req.checkBody('size', util.format(notify.ERROR_STATUS) )
            .isLength({ gt: options.size.min, lt: options.size.max })
        
         //COLOR
         req.checkBody('color', util.format(notify.ERROR_STATUS) )
         .isLength({ gt: options.color.min, lt: options.color.max })

        // ORDERING
        req.checkBody('ordering', util.format(notify.ERROR_ORDERING, options.ordering.min, options.ordering.max))
            .isInt({gt: options.ordering.min, lt: options.ordering.max});
        
        // STATUS
        req.checkBody('status', notify.ERROR_STATUS)
            .isNotEqual(options.status.value);

        // special
        req.checkBody('special', notify.ERROR_SPECIAL)
            .isNotEqual(options.special.value);

        // CONTENT
        req.checkBody('content', util.format(notify.ERROR_NAME, options.content.min, options.content.max) )
            .isLength({ min: options.content.min, max: options.content.max });

        let errors = req.validationErrors() !== false ? req.validationErrors() : [];
        return errors;
    }
}