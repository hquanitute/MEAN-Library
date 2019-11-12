const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category = require('./category');
const Publisher = require('./publisher');
const Language = require('./language');
const BookLocation = require('./book_location');
const Author = require('./author');
const Book = require('./book');

const categorySchema = require('./category');

const book_detailSchema = new Schema({
    lsCategories:[{type: mongoose.Schema.Types.ObjectId, ref: 'categories'},],
    publisher:{type: mongoose.Schema.Types.ObjectId, ref: 'publishers'},
    language:{type: mongoose.Schema.Types.ObjectId, ref: 'languages'},
    book_location:{type: mongoose.Schema.Types.ObjectId, ref: 'book_locations'},
    author:{type: mongoose.Schema.Types.ObjectId, ref: 'authors'},
    book:{type: mongoose.Schema.Types.ObjectId, ref: 'books'},
    create_date:{
        type:Date,
        default : Date.now
    },
    update_date:{
        type:Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Book_detail',book_detailSchema)