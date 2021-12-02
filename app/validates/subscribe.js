const util  = require('util');
const notify= require(__path_configs + 'notify');

const options = {
    name: { min: 1, max: 300 },
    email: { min: 5, max: 300 },
    status: { value: 'novalue' },
}

module.exports = {
   
    validator: (req) => {
        // NAME
        req.checkBody('name', util.format(notify.ERROR_NAME, options.name.min, options.name.max) )
            .isLength({ min: options.name.min, max: options.name.max })

         // EMAIL
        req.checkBody('email', util.format(notify.ERROR_NAME, options.email.min, options.email.max) )
            .isLength({ min: options.email.min, max: options.email.max })

        
        // STATUS
        req.checkBody('status', notify.ERROR_STATUS)
            .isNotEqual(options.status.value);


        let errors = req.validationErrors() !== false ? req.validationErrors() : [];
        return errors;
    }
}