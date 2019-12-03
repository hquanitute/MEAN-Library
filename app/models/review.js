const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = mongoose.model('Review',reviewSchema);