const mongoose = require('mongoose');
const databaseConfig = require(__path_configs + 'database');

var schema = new mongoose.Schema({ 
    name: String, 
    link_product: String,
    title: String,
    price:Number,
    thumb: String,
    status: String,
    ordering: Number,
    category: {
        id: String,
        name: String,
        slug:String,
    },
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

module.exports = mongoose.model(databaseConfig.col_slider, schema );