const mongoose = require('mongoose');
const databaseConfig = require(__path_configs + 'database');

var schema = new mongoose.Schema({ 
    code: String,
    lastPrice: Number,
    account:Number,
    method:String,
    status: String,
    cart: String,
    infoCutomer:String,
    card:String,
    codePromo:String,
    created: {
        user_id: Number,
        user_name: String,
        time: Date
    }
});

module.exports = mongoose.model(databaseConfig.col_check_out_shop, schema );