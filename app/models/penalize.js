const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user')
const Book= require('./book')
const penalizeSchema = new Schema({
    book:{
        type: mongoose.Schema.Types.ObjectId, ref: Book
    },
    reason:{
        type: String
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId, ref: User
    },
    editor_id:{
        type: String
    },
    penalize_date:{
        type: Date,
        default: Date.now
    },
    create_date:{
        type: Date,
        default: Date.now
    },
    update_date:{
        type: Date,
        default: Date.now
    }

});

penalizeSchema.pre('save', function(next){
    return next();
});

module.exports = mongoose.model("Penalize", penalizeSchema);