const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category = require('./category');
const Publisher = require('./publisher');
const Language = require('./language');
const BookLocation = require('./book_location');
const Author = require('./author');
const Book = require('./book');
const Review = require('./review');
const categorySchema = require('./category');
const User= require('./user');

const reviewSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    date:{
        type:Date,
        default:Date.now
    },
    comment:{
        type:String
    }
})

const book_detailSchema = new Schema({
    reviews:[reviewSchema],
    lsCategories:[{type: mongoose.Schema.Types.ObjectId, ref: Category}],
    publisher:{type: mongoose.Schema.Types.ObjectId, ref: Publisher},
    language:{type: mongoose.Schema.Types.ObjectId, ref: Language},
    book_location:{type: mongoose.Schema.Types.ObjectId, ref: BookLocation},
    author:{type: mongoose.Schema.Types.ObjectId, ref: Author},
    book:{type: mongoose.Schema.Types.ObjectId, ref: Book},
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