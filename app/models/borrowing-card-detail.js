const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category = require('./category');
const Publisher = require('./publisher');
const Language = require('./language');
const BookLocation = require('./book_location');
const Author = require('./author');
const Book = require('./book');

const categorySchema = require('./category');

const borrowing_detailSchema = new Schema({
    book_id:[{type: mongoose.Schema.Types.ObjectId, ref: 'books'},],
    user_id:{type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    type:{type: String, default:"waiting"},
    status:{type: String},
    borrow_date:{
        type:Date,
        default : Date.now
    },
    editor_id:{type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    create_date:{
        type:Date,
        default : Date.now
    },
    update_date:{
        type:Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Borrowing_detail',borrowing_detailSchema)