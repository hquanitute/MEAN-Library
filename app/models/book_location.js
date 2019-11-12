const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const book_locationSchema = new Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    create_date:{
        type: Date,
        default :Date.now
    },
    update_date:{
        type:Date
    }
});

module.exports = mongoose.model('Book_location',book_locationSchema)