const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Book = require('./book');
const User = require('./user')


const borrowing_detailSchema = new Schema({
    book_id:[{type: mongoose.Schema.Types.ObjectId, ref: Book},],
    user_id:{type: mongoose.Schema.Types.ObjectId, ref: User},
    type:{type: String, default:"waiting"},
    status:{type: String},
    borrow_date:{
        type:Date,
        default : Date.now
    },
    editor_id:{type: mongoose.Schema.Types.ObjectId, ref: User},
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