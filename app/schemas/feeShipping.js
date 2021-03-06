const mongoose = require('mongoose');
const databaseConfig = require(__path_configs + 'database');

var schema = new mongoose.Schema({ 
    method: String, 
    status: String,
    price: Number,
    created: {
        user_id: Number,
        user_name: String,
        time: Date
    },
    modified: {
        user_id: Number,
        user_name: String,
        time: Date
    }
});

module.exports = mongoose.model(databaseConfig.col_fee_shipping_shop, schema );