const mongoose = require('mongoose');
const databaseConfig = require(__path_configs + 'database');

var schema = new mongoose.Schema({ 
    name: String, 
    title:String,
    status: String,
    ordering: Number,
    price: Number,
    color:String,
    size:String,
    slug:String,
    content: String,
    special:String,
    thumbs: [String],
    slug:String,
    category: {
        id: String,
        name: String,
        slug:String
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

module.exports = mongoose.model(databaseConfig.col_article_shop, schema );